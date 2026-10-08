#!/usr/bin/env python3
"""Q-Orbit CASE-S1 deterministic finite-key reference simulation.

This is a separate internal reimplementation of the equations and conventions
retained in the research-baseline manifest. It intentionally operates on the
author-distributed SatQuMA v1.0.0 modeled reference curve so its numerical
output can be compared with the retained author code without treating that
curve as Q-Orbit mission, orbit, site, or hardware evidence.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import math
import os
import platform
import sys
from copy import deepcopy
from pathlib import Path

import numpy as np
import scipy
from scipy.stats import binom


ROOT = Path(__file__).resolve().parents[1]
MANIFEST_PATH = ROOT / "Q-Orbit_CASE-S1_Run_Manifest_V0.6.json"
LOSS_PATH = ROOT / "third_party" / "satquma-v1.0.0" / "FS_loss_XI0.csv"
os.environ.setdefault("MPLCONFIGDIR", "/tmp/qorbit-sim-g1-matplotlib")


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def binary_entropy(value: float) -> float:
    if value <= 0.0 or value >= 1.0:
        return 0.0
    return -value * math.log2(value) - (1.0 - value) * math.log2(1.0 - value)


def tau(photon_number: int, intensities: np.ndarray, probabilities: np.ndarray) -> float:
    terms = probabilities * np.exp(-intensities) * np.power(intensities, photon_number)
    return float(np.sum(terms) / math.factorial(photon_number))


def chernoff_bounds(
    intensities: np.ndarray,
    probabilities: np.ndarray,
    observed: np.ndarray,
    epsilon_s: float,
) -> tuple[np.ndarray, np.ndarray]:
    beta = math.log(21.0 / epsilon_s)
    lower_delta = 0.5 * beta + np.sqrt(2.0 * observed * beta + 0.25 * beta**2)
    upper_delta = beta + np.sqrt(2.0 * observed * beta + beta**2)
    lower = np.exp(intensities) * (observed - lower_delta) / probabilities
    upper = np.exp(intensities) * (observed + upper_delta) / probabilities
    return lower, upper


def vacuum_events(
    intensities: np.ndarray,
    probabilities: np.ndarray,
    lower_counts: np.ndarray,
) -> float:
    mu2, mu3 = intensities[1], intensities[2]
    return tau(0, intensities, probabilities) * (
        mu2 * lower_counts[2] - mu3 * lower_counts[1]
    ) / (mu2 - mu3)


def single_photon_events(
    intensities: np.ndarray,
    probabilities: np.ndarray,
    lower_counts: np.ndarray,
    upper_counts: np.ndarray,
    s0_value: float,
) -> float:
    mu1, mu2, mu3 = intensities
    numerator = mu1 * (
        lower_counts[1]
        - upper_counts[2]
        - ((mu2**2 - mu3**2) / mu1**2)
        * (upper_counts[0] - s0_value / tau(0, intensities, probabilities))
    )
    denominator = mu1 * (mu2 - mu3) - mu2**2 + mu3**2
    return tau(1, intensities, probabilities) * numerator / denominator


def single_photon_errors(
    intensities: np.ndarray,
    probabilities: np.ndarray,
    lower_errors: np.ndarray,
    upper_errors: np.ndarray,
) -> float:
    mu2, mu3 = intensities[1], intensities[2]
    return tau(1, intensities, probabilities) * (
        upper_errors[1] - lower_errors[2]
    ) / (mu2 - mu3)


def gamma_correction(epsilon_s: float, ratio: float, z_single: float, x_single: float) -> float:
    first = max(
        (z_single + x_single) * (1.0 - ratio) * ratio
        / (z_single * x_single * math.log(2.0)),
        0.0,
    )
    second = max(
        (z_single + x_single) * 21.0**2
        / (z_single * x_single * (1.0 - ratio) * ratio * epsilon_s**2),
        1.0,
    )
    return math.sqrt(first * math.log2(second))


def error_correction_logm(n_x: float, qber_x: float, epsilon_c: float) -> float:
    quantile = binom.ppf(
        epsilon_c * (1.0 + 1.0 / math.sqrt(n_x)),
        int(n_x),
        1.0 - qber_x,
    )
    return (
        n_x * binary_entropy(qber_x)
        + (n_x * (1.0 - qber_x) - quantile - 1.0)
        * math.log((1.0 - qber_x) / qber_x)
        - 0.5 * math.log(n_x)
        - math.log(1.0 / epsilon_c)
    )


def load_inputs() -> tuple[dict, np.ndarray]:
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    expected = manifest["sources"]["SRC-SATQUMA-LOSS-XI0"]["sha256"]
    actual = sha256(LOSS_PATH)
    if actual != expected:
        raise RuntimeError(f"Loss-file hash mismatch: expected {expected}, got {actual}")

    data = np.loadtxt(LOSS_PATH, delimiter=",", skiprows=1, usecols=(0, 1, 2))
    if data.shape != (693, 3):
        raise RuntimeError(f"Unexpected loss-file shape: {data.shape}")
    if np.count_nonzero(data[:, 0] == 0) != 1:
        raise RuntimeError("Loss file must contain exactly one t=0 row")
    return manifest, data


def validate_profile(manifest: dict) -> None:
    profile = manifest["qkd_profile"]
    mus = profile["signal_intensities_photons_per_pulse"]
    probs = profile["intensity_probabilities"]
    if not (mus[0] > mus[1] > mus[2] == 0.0):
        raise ValueError("Intensity ordering mu1 > mu2 > mu3 = 0 is required")
    if not math.isclose(sum(probs), 1.0, rel_tol=0.0, abs_tol=1e-15):
        raise ValueError("Intensity probabilities must sum to one")
    for value in probs + [profile["alice_basis_x_probability"], profile["bob_basis_x_probability"]]:
        if not (0.0 < value < 1.0):
            raise ValueError("All non-vacuum selection probabilities must lie in (0,1)")
    if profile["error_correction_model"].lower().find("logm") < 0:
        raise ValueError("This implementation is frozen to the logM error-correction model")


def finite_key(
    manifest: dict,
    loss_data: np.ndarray,
    half_window_s: int,
    *,
    additional_loss_db: float | None = None,
) -> dict:
    validate_profile(manifest)
    profile = manifest["qkd_profile"]
    channel = manifest["time_and_channel"]

    center = int(np.where(loss_data[:, 0] == 0)[0][0])
    start, stop = center - half_window_s, center + half_window_s + 1
    if start < 0 or stop > len(loss_data):
        raise ValueError("Requested half-window lies outside the retained loss curve")

    times = loss_data[start:stop, 0]
    elevations = loss_data[start:stop, 1]
    efficiencies = loss_data[start:stop, 2]
    if float(np.degrees(np.min(elevations))) < channel["minimum_elevation_deg"] - 1e-9:
        raise ValueError("Requested half-window violates the frozen elevation mask")

    mu = np.asarray(profile["signal_intensities_photons_per_pulse"], dtype=float)
    probabilities = np.asarray(profile["intensity_probabilities"], dtype=float)
    p_ax = float(profile["alice_basis_x_probability"])
    p_bx = float(profile["bob_basis_x_probability"])
    epsilon_s = float(profile["secrecy_parameter"])
    epsilon_c = float(profile["correctness_parameter"])
    p_ec = float(profile["extraneous_count_probability_per_pulse"])
    p_ap = float(profile["afterpulse_probability"])
    intrinsic_error = float(profile["intrinsic_qber_fraction"])
    detector_multiplier = float(profile["detector_efficiency_multiplier"])
    passes = int(channel["number_of_passes"])
    pulses_per_slot = passes * float(profile["source_repetition_rate_hz"])
    loss_db = float(channel["additional_system_loss_db"] if additional_loss_db is None else additional_loss_db)
    eta = 10.0 ** (-loss_db / 10.0) * detector_multiplier

    exp_loss = np.exp(-np.outer(mu, efficiencies) * eta)
    detection = (1.0 + p_ap) * (1.0 - (1.0 - 2.0 * p_ec) * exp_loss)
    errors = p_ec + 0.5 * p_ap * detection + intrinsic_error * (1.0 - exp_loss)

    weighted_detection = probabilities[:, None] * detection
    p_dot_detection = probabilities @ detection
    p_dot_error = probabilities @ errors

    n_x_by_intensity_time = p_ax * p_bx * pulses_per_slot * weighted_detection
    n_z_by_intensity_time = (1.0 - p_ax) * (1.0 - p_bx) * pulses_per_slot * weighted_detection
    n_x_by_intensity = np.sum(n_x_by_intensity_time, axis=1)
    n_z_by_intensity = np.sum(n_z_by_intensity_time, axis=1)
    n_x = float(np.sum(n_x_by_intensity))
    n_z = float(np.sum(n_z_by_intensity))

    m_x_by_time = p_dot_error * np.sum(n_x_by_intensity_time, axis=0) / p_dot_detection
    m_z_by_time = p_dot_error * np.sum(n_z_by_intensity_time, axis=0) / p_dot_detection
    m_z_by_intensity_time = weighted_detection * m_z_by_time / p_dot_detection
    m_x = float(np.sum(m_x_by_time))
    m_z = float(np.sum(m_z_by_time))
    m_z_by_intensity = np.sum(m_z_by_intensity_time, axis=1)

    n_x_lower, n_x_upper = chernoff_bounds(mu, probabilities, n_x_by_intensity, epsilon_s)
    n_z_lower, n_z_upper = chernoff_bounds(mu, probabilities, n_z_by_intensity, epsilon_s)
    m_z_lower, m_z_upper = chernoff_bounds(mu, probabilities, m_z_by_intensity, epsilon_s)

    numeric_floor = 1e-10
    machine_epsilon = sys.float_info.epsilon
    s_x0 = max(vacuum_events(mu, probabilities, n_x_lower), numeric_floor)
    s_z0 = max(vacuum_events(mu, probabilities, n_z_lower), numeric_floor)
    s_x1 = max(single_photon_events(mu, probabilities, n_x_lower, n_x_upper, s_x0), numeric_floor)
    s_z1 = max(single_photon_events(mu, probabilities, n_z_lower, n_z_upper, s_z0), numeric_floor)
    v_z1 = min(max(single_photon_errors(mu, probabilities, m_z_lower, m_z_upper), numeric_floor), m_z)
    ratio = min(v_z1 / s_z1, 1.0 - machine_epsilon)
    phi_x = min(ratio + gamma_correction(epsilon_s, ratio, s_z1, s_x1), 0.5)
    qber_x = m_x / n_x
    lambda_ec = error_correction_logm(n_x, qber_x, epsilon_c)
    finite_penalty = 6.0 * math.log2(21.0 / epsilon_s) + math.log2(2.0 / epsilon_c)

    raw_key = s_x0 + s_x1 * (1.0 - binary_entropy(phi_x)) - lambda_ec - finite_penalty
    if not (mu[0] > mu[1] + mu[2] and probabilities[2] > 0.0):
        raw_key = 0.0
    nonnegative_key = max(raw_key, 0.0) / passes
    floored_key = math.floor(nonnegative_key)

    zenith_efficiency = float(loss_data[center, 2])
    total_zenith_loss = -10.0 * math.log10(zenith_efficiency) + loss_db
    return {
        "half_window_s": int(half_window_s),
        "sample_bins": int(len(times)),
        "window_start_s": int(np.min(times)),
        "window_end_s": int(np.max(times)),
        "edge_elevation_deg": float(np.degrees(min(elevations[0], elevations[-1]))),
        "additional_system_loss_db": loss_db,
        "total_zenith_loss_db": total_zenith_loss,
        "raw_secret_key_bits": float(nonnegative_key),
        "secret_key_bits": int(floored_key),
        "qber_x": float(qber_x),
        "phase_error_x": float(phi_x),
        "n_x": n_x,
        "n_z": n_z,
        "m_x": m_x,
        "lambda_ec_bits": float(lambda_ec),
        "s_x0": float(s_x0),
        "s_x1": float(s_x1),
        "v_z1": float(v_z1),
        "s_z1": float(s_z1),
        "mean_photon_number": float(probabilities @ mu),
        "finite_penalty_bits": float(finite_penalty),
    }


def sweep_windows(manifest: dict, loss_data: np.ndarray, additional_loss_db: float | None = None) -> tuple[dict, list[dict]]:
    lower, upper = manifest["time_and_channel"]["window_sweep_half_width_s"]
    rows = [finite_key(manifest, loss_data, dt, additional_loss_db=additional_loss_db) for dt in range(lower, upper + 1)]
    best = max(rows, key=lambda row: (row["secret_key_bits"], -row["half_window_s"]))
    return best, rows


def evaluate_outcomes(
    secret_key_bits: int,
    gates: dict[str, str],
    *,
    physical_ready: bool = True,
    configuration_valid: bool = True,
    coordination_allowed: bool = True,
    ekm_left: str = "COMMITTED",
    ekm_right: str = "COMMITTED",
    delivery_attempted: bool = False,
    consumer_binding_valid: bool = True,
    ack_left: bool = False,
    ack_right: bool = False,
    release_record_present: bool = True,
) -> dict:
    out_1 = "POSITIVE" if physical_ready else "FAILED"
    values = list(gates.values())
    if not configuration_valid:
        out_2 = "INVALID-RUN"
    elif not physical_ready:
        out_2 = "REJECTED"
    elif any(value == "UNKNOWN" for value in values):
        out_2 = "INDETERMINATE"
    elif any(value == "FAIL" for value in values):
        out_2 = "REJECTED"
    elif secret_key_bits <= 0:
        out_2 = "NO-KEY"
    else:
        out_2 = "POSITIVE"

    quarantine = False
    if out_2 != "POSITIVE" or not coordination_allowed:
        out_3 = "NOT-ATTEMPTED"
    elif ekm_left == "COMMITTED" and ekm_right == "COMMITTED":
        out_3 = "POSITIVE"
    elif "UNKNOWN" in (ekm_left, ekm_right) or ekm_left != ekm_right:
        out_3 = "AMBIGUOUS-QUARANTINED"
        quarantine = True
    else:
        out_3 = "FAILED"

    if not delivery_attempted:
        out_4 = "NOT-ATTEMPTED"
    elif not consumer_binding_valid:
        out_4 = "FAILED-DENIED"
    elif ack_left and ack_right and out_3 == "POSITIVE":
        out_4 = "POSITIVE"
    elif ack_left != ack_right:
        out_4 = "AMBIGUOUS-HOLD"
    else:
        out_4 = "FAILED"

    return {
        "run_validity": "VALID" if configuration_valid else "INVALID",
        "OUT-1": out_1,
        "OUT-2": out_2,
        "OUT-3": out_3,
        "OUT-4": out_4,
        "quarantine": quarantine,
        "technical_release_readiness": "ELIGIBLE" if release_record_present else "INCOMPLETE",
        "release_authority": "NOT-AUTHORIZED",
        "distribution_state": "PRIVATE-BLOCKED",
    }


def plain_gate_map(manifest: dict) -> dict[str, str]:
    result = {}
    for key, value in manifest["baseline_gates"].items():
        result[key] = value.split()[0]
    return result


def run_negative_suite(manifest: dict, loss_data: np.ndarray, baseline: dict) -> list[dict]:
    base_gates = plain_gate_map(manifest)
    cases: list[tuple[str, str, dict, dict]] = []

    gates = deepcopy(base_gates); gates["GATE-001_authentication"] = "FAIL"
    cases.append(("NEG-01", "Classical authentication failure", {"gates": gates}, {"OUT-2": "REJECTED", "OUT-3": "NOT-ATTEMPTED"}))
    gates = deepcopy(base_gates); gates["GATE-005_data_freshness"] = "FAIL"
    cases.append(("NEG-02", "Stale decision data", {"gates": gates}, {"OUT-2": "REJECTED"}))
    gates = deepcopy(base_gates); gates["GATE-006_data_conflict"] = "UNKNOWN"
    cases.append(("NEG-03", "Conflicting decision data", {"gates": gates}, {"OUT-2": "INDETERMINATE"}))

    high_loss_best, _ = sweep_windows(manifest, loss_data, additional_loss_db=20.0)
    cases.append(("NEG-04", "Finite-key rejection at injected +20 dB excess loss", {"gates": deepcopy(base_gates), "secret_key_bits": high_loss_best["secret_key_bits"]}, {"OUT-2": "NO-KEY"}))
    gates = deepcopy(base_gates); gates["GATE-003_device_health_calibration"] = "UNKNOWN"
    cases.append(("NEG-05", "Unknown device/calibration state", {"gates": gates}, {"OUT-2": "INDETERMINATE"}))
    cases.append(("NEG-06", "Parameter-register/configuration mismatch", {"gates": deepcopy(base_gates), "configuration_valid": False}, {"run_validity": "INVALID", "OUT-2": "INVALID-RUN"}))
    cases.append(("NEG-07", "Partial EKM commit", {"gates": deepcopy(base_gates), "ekm_left": "COMMITTED", "ekm_right": "UNKNOWN"}, {"OUT-3": "AMBIGUOUS-QUARANTINED", "quarantine": True}))
    cases.append(("NEG-08", "Wrong consumer binding", {"gates": deepcopy(base_gates), "delivery_attempted": True, "consumer_binding_valid": False}, {"OUT-4": "FAILED-DENIED"}))
    cases.append(("NEG-09", "One-sided delivery acknowledgement", {"gates": deepcopy(base_gates), "delivery_attempted": True, "ack_left": True, "ack_right": False}, {"OUT-4": "AMBIGUOUS-HOLD"}))
    cases.append(("NEG-10", "AQMO loss without preauthorization", {"gates": deepcopy(base_gates), "coordination_allowed": False}, {"OUT-3": "NOT-ATTEMPTED"}))
    gates = deepcopy(base_gates); gates["GATE-008_evidence_continuity"] = "FAIL"
    cases.append(("NEG-11", "Evidence-continuity failure", {"gates": gates}, {"OUT-2": "REJECTED"}))
    cases.append((
        "NEG-12",
        "Release record absent",
        {"gates": deepcopy(base_gates), "release_record_present": False},
        {"technical_release_readiness": "INCOMPLETE", "distribution_state": "PRIVATE-BLOCKED"},
    ))

    results = []
    for case_id, condition, kwargs, expected in cases:
        secret_key_bits = int(kwargs.pop("secret_key_bits", baseline["secret_key_bits"]))
        outcomes = evaluate_outcomes(secret_key_bits, **kwargs)
        passed = all(outcomes.get(key) == value for key, value in expected.items())
        results.append({
            "case_id": case_id,
            "condition": condition,
            "expected_safe_control": expected,
            "observed": outcomes,
            "injected_secret_key_bits": secret_key_bits if case_id == "NEG-04" else None,
            "safe_control_satisfied": passed,
        })
    return results


def write_csv(path: Path, rows: list[dict], fields: list[str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        writer.writerows({field: row.get(field) for field in fields} for row in rows)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write-artifacts", action="store_true")
    args = parser.parse_args()

    manifest, loss_data = load_inputs()
    baseline, window_rows = sweep_windows(manifest, loss_data)
    baseline_gates = plain_gate_map(manifest)
    baseline_outcomes = evaluate_outcomes(baseline["secret_key_bits"], baseline_gates)
    negative_results = run_negative_suite(manifest, loss_data, baseline)

    repeat_baseline, repeat_rows = sweep_windows(manifest, loss_data)
    deterministic_match = baseline == repeat_baseline and window_rows == repeat_rows
    if not deterministic_match:
        raise RuntimeError("Deterministic rerun did not reproduce the baseline exactly")

    loss_rows = []
    for extra_loss in range(10, 23):
        best, _ = sweep_windows(manifest, loss_data, additional_loss_db=float(extra_loss))
        loss_rows.append(best)

    record = {
        "run_id": "QO-RBV-CASE-S1-REF-001-RUN-002",
        "date": manifest["date"],
        "case_id": manifest["case_id"],
        "reporting_class": manifest["reporting_class"],
        "gate_state": manifest["gate_state"],
        "manifest_sha256": sha256(MANIFEST_PATH),
        "loss_file_sha256": sha256(LOSS_PATH),
        "implementation": "Q-Orbit separate internal reimplementation V0.6",
        "environment": {
            "python": platform.python_version(),
            "numpy": np.__version__,
            "scipy": scipy.__version__,
            "platform": platform.platform(),
        },
        "selection_statement": "Best integer half-window in 1..221 s for the frozen fixed protocol inputs; not a global protocol optimum.",
        "baseline": baseline,
        "outcomes": baseline_outcomes,
        "deterministic_rerun_exact": deterministic_match,
        "limitations": manifest["claim_boundary"],
        "release_control": manifest["release_control"],
    }

    summary = {
        "suite_id": "QO-SIM-NEG-SUITE-001",
        "date": manifest["date"],
        "case_count": len(negative_results),
        "safe_control_pass_count": sum(item["safe_control_satisfied"] for item in negative_results),
        "all_safe_controls_satisfied": all(item["safe_control_satisfied"] for item in negative_results),
        "cases": negative_results,
    }

    if args.write_artifacts:
        (ROOT / "runs").mkdir(exist_ok=True)
        (ROOT / "data").mkdir(exist_ok=True)
        (ROOT / "figures").mkdir(exist_ok=True)
        (ROOT / "runs" / "CASE-S1-REF-001_Baseline_Run_V0.6.json").write_text(json.dumps(record, indent=2) + "\n", encoding="utf-8")
        (ROOT / "runs" / "CASE-S1_Negative_Case_Results_V0.6.json").write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")
        write_csv(
            ROOT / "data" / "CASE-S1_Window_Sweep_V0.6.csv",
            window_rows,
            ["half_window_s", "sample_bins", "edge_elevation_deg", "total_zenith_loss_db", "secret_key_bits", "raw_secret_key_bits", "qber_x", "phase_error_x", "n_x", "lambda_ec_bits", "s_x0", "s_x1"],
        )
        write_csv(
            ROOT / "data" / "CASE-S1_Loss_Sensitivity_V0.6.csv",
            loss_rows,
            ["additional_system_loss_db", "total_zenith_loss_db", "half_window_s", "edge_elevation_deg", "secret_key_bits", "qber_x", "phase_error_x"],
        )

    print(json.dumps({
        "case_id": manifest["case_id"],
        "selected_half_window_s": baseline["half_window_s"],
        "secret_key_bits": baseline["secret_key_bits"],
        "qber_x": baseline["qber_x"],
        "phase_error_x": baseline["phase_error_x"],
        "negative_cases": len(negative_results),
        "safe_controls_satisfied": summary["safe_control_pass_count"],
        "deterministic_rerun_exact": deterministic_match,
    }, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
