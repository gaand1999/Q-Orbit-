#!/usr/bin/env python3
"""Independent package audit for Q-Orbit V0.16-TA1.

The audit recomputes package identities and summaries from serialized outputs.
It does not import the analysis implementation.
"""

from __future__ import annotations

import csv
import hashlib
import json
import math
import statistics
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path


WORKSPACE = Path("/workspace/scratch/7928ba9ec53f")
ROOT = WORKSPACE / "deliverables/q-orbit-theoretical-device-imperfection-propagation-v0.16-ta1"
DATA = ROOT / "data_processed"
RUN = ROOT / "runs/Q-Orbit_V0.16-TA1_Theoretical_Run_Summary.json"
MANIFEST = ROOT / "Q-Orbit_Theoretical_Device_Imperfection_Propagation_Manifest_V0.16-TA1.json"
WORKBOOK = ROOT / "Q-Orbit_Theoretical_Device_Imperfection_Propagation_Workbook_V0.16-TA1.xlsx"
OUTPUT_WORKBOOK = WORKSPACE / "outputs/7928ba9ec53f/Q-Orbit_Theoretical_Device_Imperfection_Propagation_Workbook_V0.16-TA1.xlsx"
AUDIT_PATH = ROOT / "Q-Orbit_Theoretical_Device_Imperfection_Propagation_Final_Audit_V0.16-TA1.json"

ORIGINAL_ROOTS = {
    "v0.6": WORKSPACE / "deliverables/q-orbit-research-baseline-v0.6",
    "v0.7": WORKSPACE / "deliverables/q-orbit-mission-case-evidence-v0.7",
    "v0.11r1": WORKSPACE / "deliverables/q-orbit-review-remediation-v0.11r1",
    "v0.12": WORKSPACE / "deliverables/q-orbit-qkd-terminal-model-validation-v0.12",
    "v0.13": WORKSPACE / "deliverables/q-orbit-independent-model-comparison-v0.13",
    "v0.15-ea1": WORKSPACE / "deliverables/q-orbit-serialized-source-detector-evidence-acquisition-v0.15-ea1",
}


def read_csv(name: str) -> list[dict[str, str]]:
    with (DATA / name).open(newline="", encoding="utf-8") as stream:
        return list(csv.DictReader(stream))


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def locate_original(version: str, file_name: str) -> Path:
    candidates = [path for path in ORIGINAL_ROOTS[version].rglob(file_name) if "controlled_inputs" not in path.parts]
    if len(candidates) != 1:
        raise RuntimeError(f"Expected one original for {version}/{file_name}, found {len(candidates)}")
    return candidates[0]


def workbook_metadata(path: Path) -> dict:
    with zipfile.ZipFile(path) as archive:
        workbook_xml = archive.read("xl/workbook.xml")
        root = ET.fromstring(workbook_xml)
        ns = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
        sheet_names = [node.attrib["name"] for node in root.findall("m:sheets/m:sheet", ns)]
        formulas = 0
        error_tokens = []
        for name in archive.namelist():
            if name.startswith("xl/worksheets/sheet") and name.endswith(".xml"):
                text = archive.read(name).decode("utf-8")
                formulas += text.count("<x:f>") + text.count("<f>")
                for token in ("#REF!", "#DIV/0!", "#VALUE!", "#NAME?", "#N/A"):
                    if token in text:
                        error_tokens.append({"part": name, "token": token})
        calc = root.find("m:calcPr", ns)
        calc_state = dict(calc.attrib) if calc is not None else {}
    return {
        "sheet_names": sheet_names,
        "formula_count": formulas,
        "formula_error_tokens": error_tokens,
        "calc_state": calc_state,
    }


def main() -> int:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    run = json.loads(RUN.read_text(encoding="utf-8"))
    parameters = read_csv("Q-Orbit_V0.16-TA1_Parameter_Catalog.csv")
    local = read_csv("Q-Orbit_V0.16-TA1_Local_Sensitivity.csv")
    frontiers = read_csv("Q-Orbit_V0.16-TA1_Zero_Key_Frontier.csv")
    grid = read_csv("Q-Orbit_V0.16-TA1_Two_Parameter_Screen.csv")
    boundary = read_csv("Q-Orbit_V0.16-TA1_Grid_Boundary.csv")
    regression = read_csv("Q-Orbit_V0.16-TA1_Regression_Tests.csv")
    mapping = read_csv("Q-Orbit_V0.16-TA1_Imperfection_to_Proof_Mapping.csv")
    limitations = read_csv("Q-Orbit_V0.16-TA1_Limitation_Register.csv")
    gates = read_csv("Q-Orbit_V0.16-TA1_Gate_Register.csv")
    claims = read_csv("Q-Orbit_V0.16-TA1_Claim_Boundary_Register.csv")
    sources = read_csv("Q-Orbit_V0.16-TA1_Source_Register.csv")
    controlled = read_csv("Q-Orbit_V0.16-TA1_Controlled_Input_Index.csv")

    checks = []

    def check(check_id: str, description: str, condition: bool, observed, expected) -> None:
        checks.append({
            "check_id": check_id,
            "description": description,
            "result": "PASS" if condition else "FAIL",
            "observed": observed,
            "expected": expected,
        })

    expected_manifest = {
        "package_id": "QO-THEORETICAL-DEVICE-IMPERFECTION-PROPAGATION-V0.16-TA1",
        "version": "V0.16-TA1",
        "result": "PASS-THEORETICAL-ANALYSIS",
        "controlled_input_count": 17,
        "mapped_scalar_parameter_count": 8,
        "proof_mapping_row_count": 16,
        "unmapped_mapping_row_count": 7,
        "frontier_row_count": 16,
        "frontier_crossing_count": 10,
        "grid_row_count": 1681,
        "grid_positive_count": 568,
        "grid_nonpositive_count": 1113,
        "regression_test_count": 12,
        "regression_pass_count": 12,
        "workbook_sheet_count": 17,
        "workbook_formula_count": 79,
        "physical_characterization": "NOT-EXECUTED",
        "hardware_in_loop": "BLOCKED",
        "laser_status": "INHIBITED",
        "tabuk_run_status": "NOT-RUN/NONE",
        "key_release_status": "QUARANTINED/ZERO-RELEASED",
        "release_status": "PRIVATE-BLOCKED",
    }
    observed_manifest = {key: manifest.get(key) for key in expected_manifest}
    check("AUD-016-001", "Manifest controlling values", observed_manifest == expected_manifest, observed_manifest, expected_manifest)

    baseline = run["baseline_fixture_objective"]
    expected_baseline = {
        "half_window_s": 102,
        "secret_key_bits": 41338,
        "signed_key_margin_bits": 41338.62418456675,
        "qber_x": 0.017422686665352745,
        "phase_error_x": 0.09270161340569935,
        "n_x": 492818.0901525894,
        "s_x1": 183803.04893680647,
    }
    baseline_ok = all(
        baseline[key] == target if isinstance(target, int) else math.isclose(float(baseline[key]), target, rel_tol=0.0, abs_tol=1e-12 if abs(target) < 1 else 1e-8)
        for key, target in expected_baseline.items()
    )
    check("AUD-016-002", "Exact frozen-fixture reproduction", baseline_ok, {key: baseline[key] for key in expected_baseline}, expected_baseline)

    regression_state = {"rows": len(regression), "pass": sum(row["result"] == "PASS" for row in regression)}
    check("AUD-016-003", "Regression and boundary-invariant suite", regression_state == {"rows": 12, "pass": 12}, regression_state, {"rows": 12, "pass": 12})

    ranks = sorted(int(row["absolute_response_rank"]) for row in local)
    local_state = {"rows": len(local), "ranks": ranks, "rank_1": local[0]["parameter"] if local else None}
    check("AUD-016-004", "Eight local responses with contiguous ranks and expected leader", local_state == {"rows": 8, "ranks": list(range(1, 9)), "rank_1": "additional_system_loss_db"}, local_state, {"rows": 8, "ranks": list(range(1, 9)), "rank_1": "additional_system_loss_db"})

    frontier_state = {
        "rows": len(frontiers),
        "crossings": sum(row["frontier_state"] == "CROSSING-FOUND" for row in frontiers),
        "unique_parameter_side": len({(row["parameter_id"], row["side"]) for row in frontiers}),
    }
    check("AUD-016-005", "Complete two-sided one-parameter frontier set", frontier_state == {"rows": 16, "crossings": 10, "unique_parameter_side": 16}, frontier_state, {"rows": 16, "crossings": 10, "unique_parameter_side": 16})

    frontier_lookup = {(row["parameter"], row["side"]): row for row in frontiers}
    selected_frontiers = {
        "additional_loss_high": float(frontier_lookup[("additional_system_loss_db", "HIGH")]["frontier_or_last_valid_value"]),
        "extraneous_counts_high": float(frontier_lookup[("extraneous_count_probability_per_pulse", "HIGH")]["frontier_or_last_valid_value"]),
        "intrinsic_qber_high": float(frontier_lookup[("intrinsic_qber_fraction", "HIGH")]["frontier_or_last_valid_value"]),
    }
    expected_frontiers = {
        "additional_loss_high": 14.507927510764345,
        "extraneous_counts_high": 8.958206093312436e-7,
        "intrinsic_qber_high": 0.013335017073411072,
    }
    frontier_values_ok = all(math.isclose(selected_frontiers[key], value, rel_tol=0.0, abs_tol=max(1e-15, abs(value) * 1e-12)) for key, value in expected_frontiers.items())
    check("AUD-016-006", "Selected frontier values reproduce exactly within numerical tolerance", frontier_values_ok, selected_frontiers, expected_frontiers)

    grid_pairs = {(float(row["extraneous_count_probability_per_pulse"]), float(row["intrinsic_qber_fraction"])) for row in grid}
    margins = [float(row["signed_key_margin_bits"]) for row in grid]
    positive = sum(row["positive_state"] == "POSITIVE-MODEL-MARGIN" for row in grid)
    nonpositive = sum(row["positive_state"] == "NONPOSITIVE-MODEL-MARGIN" for row in grid)
    grid_state = {
        "rows": len(grid), "unique_pairs": len(grid_pairs), "positive": positive, "nonpositive": nonpositive,
        "positive_fraction": positive / len(grid), "median": statistics.median(margins), "finite": all(math.isfinite(value) for value in margins),
    }
    expected_grid = {"rows": 1681, "unique_pairs": 1681, "positive": 568, "nonpositive": 1113, "positive_fraction": 568 / 1681, "median": -2624.946810258186, "finite": True}
    grid_ok = all(grid_state[key] == value if key not in {"positive_fraction", "median"} else math.isclose(grid_state[key], value, rel_tol=0.0, abs_tol=1e-12) for key, value in expected_grid.items())
    check("AUD-016-007", "Coupled grid identity, partition, median and finiteness", grid_ok, grid_state, expected_grid)

    grid_range = {
        "p_ec_min": min(pair[0] for pair in grid_pairs), "p_ec_max": max(pair[0] for pair in grid_pairs),
        "qber_min": min(pair[1] for pair in grid_pairs), "qber_max": max(pair[1] for pair in grid_pairs),
    }
    expected_range = {"p_ec_min": 1e-7, "p_ec_max": 2e-6, "qber_min": 0.003, "qber_max": 0.015}
    check("AUD-016-008", "Grid uses exact controlled V0.7 screening ranges", grid_range == expected_range, grid_range, expected_range)

    boundary_state = {
        "rows": len(boundary),
        "blank_boundaries": sum(row["highest_grid_intrinsic_qber_with_positive_margin"] == "" for row in boundary),
        "all_classified": all(row["boundary_class"] == "GRID-RESOLUTION-NOT-ANALYTIC-THRESHOLD" for row in boundary),
    }
    check("AUD-016-009", "Boundary is complete and explicitly resolution-limited", boundary_state == {"rows": 41, "blank_boundaries": 21, "all_classified": True}, boundary_state, {"rows": 41, "blank_boundaries": 21, "all_classified": True})

    unmapped = [row for row in mapping if row["current_mapping_state"].startswith("UNMAPPED")]
    mapping_state = {
        "rows": len(mapping), "unmapped": len(unmapped),
        "unmapped_without_substitution": sum(row["numeric_penalty_applied"] == "NO-SUBSTITUTION" for row in unmapped),
    }
    check("AUD-016-010", "All unmapped imperfections receive no invented penalty", mapping_state == {"rows": 16, "unmapped": 7, "unmapped_without_substitution": 7}, mapping_state, {"rows": 16, "unmapped": 7, "unmapped_without_substitution": 7})

    limitation_state = {"rows": len(limitations), "unmapped_blocking": sum(row["status"] == "UNMAPPED-BLOCKING" for row in limitations), "private_blocked": sum(row["status"] == "PRIVATE-BLOCKED" for row in limitations)}
    check("AUD-016-011", "Limitations retain blocking proof and release states", limitation_state == {"rows": 15, "unmapped_blocking": 5, "private_blocked": 1}, limitation_state, {"rows": 15, "unmapped_blocking": 5, "private_blocked": 1})

    gate_lookup = {row["gate_id"]: row["current_state"] for row in gates}
    expected_gates = {
        "TA-G01": "PASS-CONTROLLED", "TA-G02": "PASS-THEORETICAL", "TA-G03": "PASS-THEORETICAL", "TA-G04": "PASS-THEORETICAL",
        "TA-G05": "BLOCKED", "TA-G06": "BLOCKED", "TA-G07": "NOT-EXECUTED", "TA-G08": "BLOCKED", "TA-G09": "NOT-RUN/NONE",
        "TA-G10": "QUARANTINED/ZERO-RELEASED", "TA-G11": "PRIVATE-BLOCKED",
    }
    check("AUD-016-012", "Fail-closed theoretical gate lattice", gate_lookup == expected_gates, gate_lookup, expected_gates)

    claim_state = {"rows": len(claims), "prohibited": sum(row["disposition"] == "PROHIBITED" for row in claims), "permitted_or_qualified": sum(row["disposition"].startswith("PERMITTED") for row in claims)}
    check("AUD-016-013", "Claim boundary preserves permitted and prohibited classes", claim_state == {"rows": 14, "prohibited": 9, "permitted_or_qualified": 5}, claim_state, {"rows": 14, "prohibited": 9, "permitted_or_qualified": 5})

    source_state = {"rows": len(sources), "primary": sum(row["source_type"] == "PRIMARY-PAPER" for row in sources), "controlled": sum(row["source_type"] == "CONTROLLED-INTERNAL" for row in sources)}
    check("AUD-016-014", "Source register has distinct primary and controlled sources", source_state == {"rows": 10, "primary": 4, "controlled": 6}, source_state, {"rows": 10, "primary": 4, "controlled": 6})

    controlled_failures = []
    for row in controlled:
        copied = ROOT / "controlled_inputs" / row["controlled_path"]
        original = locate_original(row["predecessor_version"], row["file_name"])
        copied_hash = sha256(copied)
        original_hash = sha256(original)
        if copied_hash != row["sha256"] or original_hash != row["sha256"] or copied.stat().st_size != int(row["size_bytes"]):
            controlled_failures.append({"id": row["controlled_input_id"], "copied": copied_hash, "original": original_hash, "index": row["sha256"]})
    controlled_state = {"rows": len(controlled), "failures": controlled_failures}
    check("AUD-016-015", "Seventeen controlled predecessor copies match index and originals", controlled_state == {"rows": 17, "failures": []}, controlled_state, {"rows": 17, "failures": []})

    expected_sheets = ["Read Me", "Summary", "Baseline", "Parameters", "Local Response", "Frontiers", "Grid Summary", "Grid Boundary", "Grid Screen", "Regression", "Proof Mapping", "Limitations", "Gates", "Claims", "Sources", "Controlled Inputs", "Audit"]
    workbook_state = workbook_metadata(WORKBOOK)
    workbook_ok = (
        workbook_state["sheet_names"] == expected_sheets
        and workbook_state["formula_count"] == 79
        and not workbook_state["formula_error_tokens"]
        and workbook_state["calc_state"].get("calcMode") == "auto"
        and workbook_state["calc_state"].get("fullCalcOnLoad") == "1"
        and workbook_state["calc_state"].get("forceFullCalc") == "1"
    )
    check("AUD-016-016", "Workbook sheet, formula, error-token and calculation controls", workbook_ok, workbook_state, {"sheet_names": expected_sheets, "formula_count": 79, "formula_error_tokens": [], "calcMode": "auto", "fullCalcOnLoad": "1", "forceFullCalc": "1"})

    workbook_copy_state = {"package_sha256": sha256(WORKBOOK), "output_sha256": sha256(OUTPUT_WORKBOOK), "same": sha256(WORKBOOK) == sha256(OUTPUT_WORKBOOK)}
    check("AUD-016-017", "Output and packaged workbook are identical", workbook_copy_state["same"], workbook_copy_state, {"same": True})

    previews = sorted((ROOT / "previews").glob("*.png"))
    preview_state = {"count": len(previews), "nonempty": sum(path.stat().st_size > 0 for path in previews), "names": [path.name for path in previews]}
    check("AUD-016-018", "All workbook sheets have nonempty visual-QA renders", preview_state["count"] == 17 and preview_state["nonempty"] == 17, preview_state, {"count": 17, "nonempty": 17})

    required_files = [
        ROOT / "Q-Orbit_Theoretical_Device_Imperfection_Propagation_Report_V0.16-TA1.md",
        ROOT / "Q-Orbit_Engineering_Design_Handbook_V0.16-TA1_Chapter_6_7_Theoretical_Insert.md",
        ROOT / "README.md", ROOT / "requirements-lock.txt", WORKBOOK,
        ROOT / "source/run_theoretical_device_imperfection_model_v0_16_ta1.py",
    ]
    file_state = {path.name: path.exists() and path.stat().st_size > 0 for path in required_files}
    check("AUD-016-019", "Required human- and machine-readable deliverables exist", all(file_state.values()), file_state, {path.name: True for path in required_files})

    boundary_invariants = {
        "physical_characterization": run["physical_characterization"], "physical_validation": run["physical_validation"],
        "hardware_in_loop": run["hardware_in_loop"], "laser_status": run["laser_status"], "tabuk_run_status": run["tabuk_run_status"],
        "key_release_status": run["key_release_status"], "release_status": run["release_status"],
    }
    expected_invariants = {
        "physical_characterization": "NOT-EXECUTED", "physical_validation": "NOT-EXECUTED", "hardware_in_loop": "BLOCKED",
        "laser_status": "INHIBITED", "tabuk_run_status": "NOT-RUN/NONE", "key_release_status": "QUARANTINED/ZERO-RELEASED", "release_status": "PRIVATE-BLOCKED",
    }
    check("AUD-016-020", "Physical, Tabuk, laser, key and publication invariants remain blocked", boundary_invariants == expected_invariants, boundary_invariants, expected_invariants)

    failures = [row for row in checks if row["result"] != "PASS"]
    audit = {
        "audit_id": "QO-V0.16-TA1-INDEPENDENT-AUDIT",
        "package_id": manifest["package_id"],
        "version": manifest["version"],
        "audit_date": "2026-08-25",
        "result": "PASS-THEORETICAL-ANALYSIS-PACKAGE" if not failures else "FAIL-PACKAGE-AUDIT",
        "scope": "Independent serialization, numerical-summary, formula, provenance and claim-boundary audit only.",
        "explicit_nonclaims": manifest["explicit_nonclaims"],
        "check_count": len(checks),
        "pass_count": len(checks) - len(failures),
        "failure_count": len(failures),
        "checks": checks,
    }
    AUDIT_PATH.write_text(json.dumps(audit, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"result": audit["result"], "checks": len(checks), "pass": audit["pass_count"], "fail": audit["failure_count"]}, indent=2))
    if failures:
        raise RuntimeError(f"Package audit failed: {[row['check_id'] for row in failures]}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
