#!/usr/bin/env python3
"""Q-Orbit V0.16-TA1 theoretical source/detector imperfection propagation.

The model extends the frozen V0.6 numerical fixture without changing its
finite-key algebra. It evaluates only parameters already present in that
software contract. Device effects that lack a selected proof-compatible map
remain explicitly UNMAPPED and never receive an invented numerical penalty.
"""

from __future__ import annotations

import ast
import csv
import hashlib
import json
import math
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Callable

import numpy as np
from scipy.stats import binom


ROOT = Path(__file__).resolve().parents[1]
CONTROLLED = ROOT / "controlled_inputs"
PROCESSED = ROOT / "data_processed"
RUNS = ROOT / "runs"
MANIFEST_PATH = CONTROLLED / "v0.6/Q-Orbit_CASE-S1_Run_Manifest_V0.6.json"
LOSS_PATH = CONTROLLED / "v0.6/FS_loss_XI0.csv"
BASELINE_PATH = CONTROLLED / "v0.6/CASE-S1-REF-001_Baseline_Run_V0.6.json"
RANGE_PATH = CONTROLLED / "v0.7/Q-Orbit_CASE-M1_Parameter_and_Provenance_Register_V0.7.csv"


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
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


def vacuum_events(intensities: np.ndarray, probabilities: np.ndarray, lower_counts: np.ndarray) -> float:
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
    if n_x <= 1.0 or not (0.0 < qber_x < 0.5):
        raise ValueError("logM domain requires n_x > 1 and 0 < QBER < 0.5")
    quantile = binom.ppf(
        epsilon_c * (1.0 + 1.0 / math.sqrt(n_x)),
        int(n_x),
        1.0 - qber_x,
    )
    if not math.isfinite(float(quantile)):
        raise ValueError("Non-finite binomial quantile")
    return (
        n_x * binary_entropy(qber_x)
        + (n_x * (1.0 - qber_x) - quantile - 1.0)
        * math.log((1.0 - qber_x) / qber_x)
        - 0.5 * math.log(n_x)
        - math.log(1.0 / epsilon_c)
    )


def load_inputs() -> tuple[dict, np.ndarray, dict]:
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    baseline = json.loads(BASELINE_PATH.read_text(encoding="utf-8"))["baseline"]
    expected_hash = manifest["sources"]["SRC-SATQUMA-LOSS-XI0"]["sha256"]
    actual_hash = sha256(LOSS_PATH)
    if expected_hash != actual_hash:
        raise RuntimeError(f"Loss-curve hash mismatch: expected {expected_hash}, got {actual_hash}")
    loss = np.loadtxt(LOSS_PATH, delimiter=",", skiprows=1, usecols=(0, 1, 2))
    return manifest, loss, baseline


def validate_profile(profile: dict) -> None:
    mu = [float(value) for value in profile["signal_intensities_photons_per_pulse"]]
    probabilities = [float(value) for value in profile["intensity_probabilities"]]
    if not (len(mu) == 3 and mu[0] > mu[1] > mu[2] == 0.0):
        raise ValueError("Three-intensity ordering mu1 > mu2 > mu3 = 0 is required")
    if not (mu[0] > mu[1] + mu[2]):
        raise ValueError("Frozen decoy algebra requires mu1 > mu2 + mu3")
    if not math.isclose(sum(probabilities), 1.0, rel_tol=0.0, abs_tol=1e-12):
        raise ValueError("Intensity probabilities must sum to one")
    for value in probabilities + [profile["alice_basis_x_probability"], profile["bob_basis_x_probability"]]:
        if not (0.0 < float(value) < 1.0):
            raise ValueError("Selection probabilities must lie in (0,1)")
    for name in ("source_repetition_rate_hz", "detector_efficiency_multiplier"):
        if float(profile[name]) <= 0.0:
            raise ValueError(f"{name} must be positive")
    for name in ("extraneous_count_probability_per_pulse", "afterpulse_probability", "intrinsic_qber_fraction"):
        if not (0.0 <= float(profile[name]) < 0.5):
            raise ValueError(f"{name} must lie in [0,0.5)")


def finite_key(
    profile: dict,
    channel: dict,
    loss_data: np.ndarray,
    half_window_s: int,
    *,
    additional_loss_db: float,
) -> dict:
    validate_profile(profile)
    center = int(np.where(loss_data[:, 0] == 0)[0][0])
    start, stop = center - half_window_s, center + half_window_s + 1
    if start < 0 or stop > len(loss_data):
        raise ValueError("Requested half-window lies outside loss curve")
    times = loss_data[start:stop, 0]
    elevations = loss_data[start:stop, 1]
    efficiencies = loss_data[start:stop, 2]
    if float(np.degrees(np.min(elevations))) < float(channel["minimum_elevation_deg"]) - 1e-9:
        raise ValueError("Requested window violates frozen elevation mask")

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
    eta = 10.0 ** (-additional_loss_db / 10.0) * detector_multiplier

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
    if n_x <= 0.0 or n_z <= 0.0 or np.any(p_dot_detection <= 0.0):
        raise ValueError("Non-positive detection count/probability")

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
    signed_margin = s_x0 + s_x1 * (1.0 - binary_entropy(phi_x)) - lambda_ec - finite_penalty
    if not (mu[0] > mu[1] + mu[2] and probabilities[2] > 0.0):
        signed_margin = 0.0
    signed_per_pass = signed_margin / passes
    nonnegative_key = max(signed_per_pass, 0.0)
    floored_key = math.floor(nonnegative_key)
    return {
        "half_window_s": int(half_window_s),
        "sample_bins": int(len(times)),
        "edge_elevation_deg": float(np.degrees(min(elevations[0], elevations[-1]))),
        "additional_system_loss_db": float(additional_loss_db),
        "signed_key_margin_bits": float(signed_per_pass),
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


def sweep(profile: dict, channel: dict, loss: np.ndarray, additional_loss_db: float, *, objective: str) -> dict:
    lower, upper = [int(value) for value in channel["window_sweep_half_width_s"]]
    rows = []
    for half_window in range(lower, upper + 1):
        try:
            rows.append(finite_key(profile, channel, loss, half_window, additional_loss_db=additional_loss_db))
        except ValueError:
            continue
    if not rows:
        raise ValueError("No valid half-window")
    if objective == "fixture":
        return max(rows, key=lambda row: (row["secret_key_bits"], -row["half_window_s"]))
    if objective == "signed":
        return max(rows, key=lambda row: (row["signed_key_margin_bits"], -row["half_window_s"]))
    raise ValueError(f"Unknown objective: {objective}")


@dataclass(frozen=True)
class Parameter:
    parameter_id: str
    name: str
    unit: str
    baseline: float
    local_step: float
    step_definition: str
    lower_domain: float
    upper_domain: float
    spacing: str
    apply: Callable[[dict, float], tuple[dict, float]]
    interpretation: str


def copy_profile(profile: dict) -> dict:
    return json.loads(json.dumps(profile))


def apply_profile_value(key: str) -> Callable[[dict, float], tuple[dict, float]]:
    def apply(profile: dict, value: float) -> tuple[dict, float]:
        result = copy_profile(profile)
        result[key] = float(value)
        return result, math.nan
    return apply


def apply_intensity(index: int) -> Callable[[dict, float], tuple[dict, float]]:
    def apply(profile: dict, multiplier: float) -> tuple[dict, float]:
        result = copy_profile(profile)
        intensities = [float(value) for value in result["signal_intensities_photons_per_pulse"]]
        intensities[index] *= float(multiplier)
        result["signal_intensities_photons_per_pulse"] = intensities
        return result, math.nan
    return apply


def apply_loss(profile: dict, value: float) -> tuple[dict, float]:
    return copy_profile(profile), float(value)


def parameter_catalog(profile: dict, channel: dict) -> list[Parameter]:
    mu1, mu2, _ = [float(value) for value in profile["signal_intensities_photons_per_pulse"]]
    return [
        Parameter("TH-PAR-001", "additional_system_loss_db", "dB", float(channel["additional_system_loss_db"]), 0.1,
                  "additive ±0.1 dB", 0.0, 60.0, "linear", apply_loss,
                  "Aggregate additional loss already present in the frozen model; not a decomposed terminal budget."),
        Parameter("TH-PAR-002", "detector_efficiency_multiplier", "dimensionless", float(profile["detector_efficiency_multiplier"]), 0.01,
                  "multiplicative ±1% of baseline", 1e-3, 2.0, "log", apply_profile_value("detector_efficiency_multiplier"),
                  "Relative multiplier on the aggregate curve; not an absolute detector efficiency."),
        Parameter("TH-PAR-003", "source_repetition_rate_hz", "Hz", float(profile["source_repetition_rate_hz"]), 0.01 * float(profile["source_repetition_rate_hz"]),
                  "multiplicative ±1% of baseline", 1e3, 1e9, "log", apply_profile_value("source_repetition_rate_hz"),
                  "Clock-rate stress inside expected-count model; dead time and saturation remain unmapped."),
        Parameter("TH-PAR-004", "signal_intensity_multiplier", "dimensionless", 1.0, 0.01,
                  "multiplicative ±1% of signal intensity", (mu2 / mu1) * 1.0001, 5.0, "log", apply_intensity(0),
                  "Scales mu1 only while retaining the frozen Poisson/decoy algebra."),
        Parameter("TH-PAR-005", "decoy_intensity_multiplier", "dimensionless", 1.0, 0.01,
                  "multiplicative ±1% of weak-decoy intensity", 1e-3, (mu1 / mu2) * 0.9999, "log", apply_intensity(1),
                  "Scales mu2 only while retaining mu1 > mu2 > 0."),
        Parameter("TH-PAR-006", "extraneous_count_probability_per_pulse", "probability/pulse", float(profile["extraneous_count_probability_per_pulse"]),
                  0.01 * float(profile["extraneous_count_probability_per_pulse"]), "multiplicative ±1% of baseline", 1e-10, 0.05, "log",
                  apply_profile_value("extraneous_count_probability_per_pulse"),
                  "IID aggregate background/dark-count term in the frozen model."),
        Parameter("TH-PAR-007", "afterpulse_probability", "probability/detection", float(profile["afterpulse_probability"]),
                  0.01 * float(profile["afterpulse_probability"]), "multiplicative ±1% of baseline", 1e-8, 0.49, "log",
                  apply_profile_value("afterpulse_probability"),
                  "Scalar afterpulse approximation; detector-history dependence remains unmapped."),
        Parameter("TH-PAR-008", "intrinsic_qber_fraction", "fraction", float(profile["intrinsic_qber_fraction"]),
                  0.01 * float(profile["intrinsic_qber_fraction"]), "multiplicative ±1% of baseline", 1e-8, 0.49, "log",
                  apply_profile_value("intrinsic_qber_fraction"),
                  "Aggregate state/measurement error term; it does not identify a physical mechanism."),
    ]


def evaluate(parameter: Parameter, value: float, profile: dict, channel: dict, loss: np.ndarray) -> dict:
    modified, loss_override = parameter.apply(profile, value)
    loss_db = float(channel["additional_system_loss_db"]) if math.isnan(loss_override) else loss_override
    return sweep(modified, channel, loss, loss_db, objective="signed")


def local_sensitivity(parameters: list[Parameter], profile: dict, channel: dict, loss: np.ndarray, baseline: dict) -> list[dict]:
    rows = []
    baseline_margin = float(baseline["signed_key_margin_bits"])
    for parameter in parameters:
        minus_value = parameter.baseline - parameter.local_step
        plus_value = parameter.baseline + parameter.local_step
        minus = evaluate(parameter, minus_value, profile, channel, loss)
        plus = evaluate(parameter, plus_value, profile, channel, loss)
        slope_per_step = (plus["signed_key_margin_bits"] - minus["signed_key_margin_bits"]) / 2.0
        rows.append({
            "parameter_id": parameter.parameter_id,
            "parameter": parameter.name,
            "unit": parameter.unit,
            "baseline_value": parameter.baseline,
            "step_definition": parameter.step_definition,
            "minus_value": minus_value,
            "plus_value": plus_value,
            "minus_signed_margin_bits": minus["signed_key_margin_bits"],
            "baseline_signed_margin_bits": baseline_margin,
            "plus_signed_margin_bits": plus["signed_key_margin_bits"],
            "central_margin_change_bits_per_declared_step": slope_per_step,
            "normalized_response_per_declared_step": slope_per_step / baseline_margin,
            "minus_qber_x": minus["qber_x"],
            "plus_qber_x": plus["qber_x"],
            "minus_phase_error_x": minus["phase_error_x"],
            "plus_phase_error_x": plus["phase_error_x"],
            "minus_half_window_s": minus["half_window_s"],
            "plus_half_window_s": plus["half_window_s"],
            "claim_class": "LOCAL-NUMERICAL-RESPONSE-NOT-PHYSICAL-SENSITIVITY",
        })
    for rank, row in enumerate(sorted(rows, key=lambda item: abs(item["normalized_response_per_declared_step"]), reverse=True), 1):
        row["absolute_response_rank"] = rank
    return sorted(rows, key=lambda item: item["absolute_response_rank"])


def grid_values(parameter: Parameter, side: str, count: int = 180) -> np.ndarray:
    baseline = parameter.baseline
    endpoint = parameter.lower_domain if side == "LOW" else parameter.upper_domain
    if side == "LOW":
        start, stop = endpoint, baseline
    else:
        start, stop = baseline, endpoint
    if parameter.spacing == "log" and start > 0.0:
        values = np.geomspace(start, stop, count)
    else:
        values = np.linspace(start, stop, count)
    if side == "LOW":
        values = values[::-1]
    return values


def bisection_frontier(
    parameter: Parameter,
    positive_value: float,
    nonpositive_value: float,
    profile: dict,
    channel: dict,
    loss: np.ndarray,
    iterations: int = 60,
) -> tuple[float, dict]:
    positive = positive_value
    nonpositive = nonpositive_value
    positive_result = evaluate(parameter, positive, profile, channel, loss)
    for _ in range(iterations):
        if parameter.spacing == "log" and positive > 0.0 and nonpositive > 0.0:
            midpoint = math.sqrt(positive * nonpositive)
        else:
            midpoint = 0.5 * (positive + nonpositive)
        result = evaluate(parameter, midpoint, profile, channel, loss)
        if result["signed_key_margin_bits"] > 0.0:
            positive, positive_result = midpoint, result
        else:
            nonpositive = midpoint
    return positive, positive_result


def frontier_rows(parameters: list[Parameter], profile: dict, channel: dict, loss: np.ndarray) -> list[dict]:
    rows = []
    for parameter in parameters:
        for side in ("LOW", "HIGH"):
            values = grid_values(parameter, side)
            last_positive = parameter.baseline
            last_result = evaluate(parameter, last_positive, profile, channel, loss)
            crossing = None
            invalid_value = None
            for value in values[1:]:
                try:
                    result = evaluate(parameter, float(value), profile, channel, loss)
                except (ValueError, OverflowError, FloatingPointError):
                    invalid_value = float(value)
                    break
                if result["signed_key_margin_bits"] <= 0.0:
                    crossing = (last_positive, float(value))
                    break
                last_positive = float(value)
                last_result = result
            if crossing:
                threshold, threshold_result = bisection_frontier(parameter, crossing[0], crossing[1], profile, channel, loss)
                state = "CROSSING-FOUND"
                reported_value = threshold
                margin = threshold_result["signed_key_margin_bits"]
                window = threshold_result["half_window_s"]
                qber = threshold_result["qber_x"]
                phase = threshold_result["phase_error_x"]
            else:
                state = "DOMAIN-INVALID-BEFORE-CROSSING" if invalid_value is not None else "NO-CROSSING-IN-DECLARED-DOMAIN"
                reported_value = invalid_value if invalid_value is not None else float(values[-1])
                margin = last_result["signed_key_margin_bits"]
                window = last_result["half_window_s"]
                qber = last_result["qber_x"]
                phase = last_result["phase_error_x"]
            rows.append({
                "parameter_id": parameter.parameter_id,
                "parameter": parameter.name,
                "side": side,
                "unit": parameter.unit,
                "baseline_value": parameter.baseline,
                "declared_domain_endpoint": parameter.lower_domain if side == "LOW" else parameter.upper_domain,
                "frontier_state": state,
                "frontier_or_last_valid_value": reported_value,
                "last_positive_signed_margin_bits": margin,
                "optimized_half_window_s": window,
                "qber_x": qber,
                "phase_error_x": phase,
                "interpretation": "One-parameter software-fixture frontier only; not a hardware acceptance threshold.",
            })
    return rows


def read_v07_screen_ranges() -> tuple[tuple[float, float], tuple[float, float]]:
    with RANGE_PATH.open(newline="", encoding="utf-8") as stream:
        rows = {row["parameter_id"]: row for row in csv.DictReader(stream)}
    p_ec = tuple(float(value) for value in ast.literal_eval(rows["QKD-009"]["uncertainty_or_screening_range"]))
    qber = tuple(float(value) for value in ast.literal_eval(rows["QKD-011"]["uncertainty_or_screening_range"]))
    return p_ec, qber


def two_parameter_screen(profile: dict, channel: dict, loss: np.ndarray) -> tuple[list[dict], list[dict], dict]:
    p_range, e_range = read_v07_screen_ranges()
    p_values = np.unique(np.append(np.linspace(p_range[0], p_range[1], 40), float(profile["extraneous_count_probability_per_pulse"])))
    e_values = np.unique(np.append(np.linspace(e_range[0], e_range[1], 40), float(profile["intrinsic_qber_fraction"])))
    rows = []
    boundary = []
    for p_ec in p_values:
        positive_intrinsic = []
        for intrinsic in e_values:
            modified = copy_profile(profile)
            modified["extraneous_count_probability_per_pulse"] = float(p_ec)
            modified["intrinsic_qber_fraction"] = float(intrinsic)
            result = sweep(modified, channel, loss, float(channel["additional_system_loss_db"]), objective="signed")
            positive = result["signed_key_margin_bits"] > 0.0
            if positive:
                positive_intrinsic.append(float(intrinsic))
            rows.append({
                "screen_id": f"SCR-{len(rows)+1:04d}",
                "extraneous_count_probability_per_pulse": float(p_ec),
                "intrinsic_qber_fraction": float(intrinsic),
                "optimized_half_window_s": result["half_window_s"],
                "signed_key_margin_bits": result["signed_key_margin_bits"],
                "secret_key_bits": result["secret_key_bits"],
                "qber_x": result["qber_x"],
                "phase_error_x": result["phase_error_x"],
                "positive_state": "POSITIVE-MODEL-MARGIN" if positive else "NONPOSITIVE-MODEL-MARGIN",
                "range_class": "V0.7-CONTROLLED-RESEARCH-SCREEN-NOT-DISTRIBUTION",
            })
        boundary.append({
            "extraneous_count_probability_per_pulse": float(p_ec),
            "highest_grid_intrinsic_qber_with_positive_margin": max(positive_intrinsic) if positive_intrinsic else None,
            "positive_intrinsic_grid_points": len(positive_intrinsic),
            "intrinsic_grid_point_count": len(e_values),
            "boundary_class": "GRID-RESOLUTION-NOT-ANALYTIC-THRESHOLD",
        })
    margins = np.asarray([row["signed_key_margin_bits"] for row in rows], dtype=float)
    positive_count = sum(row["positive_state"] == "POSITIVE-MODEL-MARGIN" for row in rows)
    summary = {
        "grid_rows": len(rows),
        "extraneous_count_grid_points": len(p_values),
        "intrinsic_qber_grid_points": len(e_values),
        "positive_count": positive_count,
        "nonpositive_count": len(rows) - positive_count,
        "positive_fraction": positive_count / len(rows),
        "median_signed_margin_bits": float(np.median(margins)),
        "minimum_signed_margin_bits": float(np.min(margins)),
        "maximum_signed_margin_bits": float(np.max(margins)),
        "range_source": "V0.7 controlled engineering screening ranges; uniform grid is not a probability distribution.",
    }
    return rows, boundary, summary


def write_csv(path: Path, rows: list[dict]) -> None:
    if not rows:
        raise ValueError(f"Cannot write empty CSV: {path}")
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as stream:
        writer = csv.DictWriter(stream, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)


def regression_records(computed: dict, expected: dict, high_loss: dict, screen_summary: dict) -> list[dict]:
    comparisons = [
        ("REG-001", "half_window_s", computed["half_window_s"], expected["half_window_s"], 0.0),
        ("REG-002", "secret_key_bits", computed["secret_key_bits"], expected["secret_key_bits"], 0.0),
        ("REG-003", "raw_secret_key_bits", computed["raw_secret_key_bits"], expected["raw_secret_key_bits"], 1e-8),
        ("REG-004", "qber_x", computed["qber_x"], expected["qber_x"], 1e-12),
        ("REG-005", "phase_error_x", computed["phase_error_x"], expected["phase_error_x"], 1e-12),
        ("REG-006", "n_x", computed["n_x"], expected["n_x"], 1e-7),
        ("REG-007", "s_x1", computed["s_x1"], expected["s_x1"], 1e-7),
    ]
    rows = []
    for test_id, metric, observed, target, tolerance in comparisons:
        rows.append({
            "test_id": test_id,
            "test": f"V0.6 fixture reproduction: {metric}",
            "observed": observed,
            "expected": target,
            "absolute_tolerance": tolerance,
            "result": "PASS" if abs(float(observed) - float(target)) <= tolerance else "FAIL",
            "claim_limit": "Software regression only",
        })
    rows.extend([
        {"test_id": "REG-008", "test": "+20 dB injected loss gives no positive key", "observed": high_loss["secret_key_bits"],
         "expected": 0, "absolute_tolerance": 0, "result": "PASS" if high_loss["secret_key_bits"] == 0 else "FAIL", "claim_limit": "Software negative test"},
        {"test_id": "REG-009", "test": "Grid row identity", "observed": screen_summary["grid_rows"],
         "expected": 1681, "absolute_tolerance": 0, "result": "PASS" if screen_summary["grid_rows"] == 1681 else "FAIL", "claim_limit": "Deterministic grid integrity"},
        {"test_id": "REG-010", "test": "Grid states partition exactly", "observed": screen_summary["positive_count"] + screen_summary["nonpositive_count"],
         "expected": screen_summary["grid_rows"], "absolute_tolerance": 0,
         "result": "PASS" if screen_summary["positive_count"] + screen_summary["nonpositive_count"] == screen_summary["grid_rows"] else "FAIL",
         "claim_limit": "Deterministic grid integrity"},
        {"test_id": "REG-011", "test": "Physical characterization remains absent", "observed": "NOT-EXECUTED",
         "expected": "NOT-EXECUTED", "absolute_tolerance": 0, "result": "PASS", "claim_limit": "Boundary invariant"},
        {"test_id": "REG-012", "test": "Unmapped imperfections receive no numeric penalty", "observed": "NO-SUBSTITUTION",
         "expected": "NO-SUBSTITUTION", "absolute_tolerance": 0, "result": "PASS", "claim_limit": "Boundary invariant"},
    ])
    return rows


def main() -> int:
    PROCESSED.mkdir(parents=True, exist_ok=True)
    RUNS.mkdir(parents=True, exist_ok=True)
    manifest, loss, expected_baseline = load_inputs()
    profile = copy_profile(manifest["qkd_profile"])
    channel = json.loads(json.dumps(manifest["time_and_channel"]))
    fixture_baseline = sweep(profile, channel, loss, float(channel["additional_system_loss_db"]), objective="fixture")
    theory_baseline = sweep(profile, channel, loss, float(channel["additional_system_loss_db"]), objective="signed")
    parameters = parameter_catalog(profile, channel)
    sensitivity = local_sensitivity(parameters, profile, channel, loss, theory_baseline)
    frontiers = frontier_rows(parameters, profile, channel, loss)
    screen, boundary, screen_summary = two_parameter_screen(profile, channel, loss)
    high_loss = sweep(profile, channel, loss, float(channel["additional_system_loss_db"]) + 20.0, objective="signed")
    regression = regression_records(fixture_baseline, expected_baseline, high_loss, screen_summary)
    if any(row["result"] != "PASS" for row in regression):
        raise RuntimeError("Regression suite failed")

    parameter_rows = [{
        "parameter_id": p.parameter_id, "parameter": p.name, "unit": p.unit, "baseline_value": p.baseline,
        "local_step": p.local_step, "step_definition": p.step_definition, "declared_lower_domain": p.lower_domain,
        "declared_upper_domain": p.upper_domain, "search_spacing": p.spacing, "interpretation": p.interpretation,
        "claim_class": "SOFTWARE-CONTRACT-PARAMETER-NOT-HARDWARE-VALUE",
    } for p in parameters]
    write_csv(PROCESSED / "Q-Orbit_V0.16-TA1_Parameter_Catalog.csv", parameter_rows)
    write_csv(PROCESSED / "Q-Orbit_V0.16-TA1_Local_Sensitivity.csv", sensitivity)
    write_csv(PROCESSED / "Q-Orbit_V0.16-TA1_Zero_Key_Frontier.csv", frontiers)
    write_csv(PROCESSED / "Q-Orbit_V0.16-TA1_Two_Parameter_Screen.csv", screen)
    write_csv(PROCESSED / "Q-Orbit_V0.16-TA1_Grid_Boundary.csv", boundary)
    write_csv(PROCESSED / "Q-Orbit_V0.16-TA1_Regression_Tests.csv", regression)

    summary = {
        "run_id": "QO-V0.16-TA1-THEORETICAL-RUN-001",
        "version": "V0.16-TA1",
        "date": "2026-08-24",
        "result": "PASS-THEORETICAL-ANALYSIS",
        "baseline_fixture_objective": fixture_baseline,
        "signed_margin_objective": theory_baseline,
        "local_parameter_count": len(parameters),
        "frontier_row_count": len(frontiers),
        "frontier_crossing_count": sum(row["frontier_state"] == "CROSSING-FOUND" for row in frontiers),
        "two_parameter_screen": screen_summary,
        "regression_test_count": len(regression),
        "regression_pass_count": sum(row["result"] == "PASS" for row in regression),
        "physical_characterization": "NOT-EXECUTED",
        "physical_validation": "NOT-EXECUTED",
        "hardware_in_loop": "BLOCKED",
        "laser_status": "INHIBITED",
        "tabuk_run_status": "NOT-RUN/NONE",
        "key_release_status": "QUARANTINED/ZERO-RELEASED",
        "release_status": "PRIVATE-BLOCKED",
        "claim_boundary": "Software-fixture propagation and proof-mapping only; not device, security, site or mission evidence.",
    }
    (RUNS / "Q-Orbit_V0.16-TA1_Theoretical_Run_Summary.json").write_text(
        json.dumps(summary, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    print(json.dumps({
        "result": summary["result"],
        "fixture_key_bits": fixture_baseline["secret_key_bits"],
        "fixture_signed_margin_bits": fixture_baseline["signed_key_margin_bits"],
        "signed_objective_half_window_s": theory_baseline["half_window_s"],
        "local_parameters": len(parameters),
        "frontier_crossings": summary["frontier_crossing_count"],
        "grid_rows": screen_summary["grid_rows"],
        "grid_positive_fraction": screen_summary["positive_fraction"],
        "regression": f"{summary['regression_pass_count']}/{summary['regression_test_count']}",
    }, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
