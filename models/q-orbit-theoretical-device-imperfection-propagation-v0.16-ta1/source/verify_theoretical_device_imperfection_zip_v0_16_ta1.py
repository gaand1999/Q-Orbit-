#!/usr/bin/env python3
"""Verify the finalized Q-Orbit V0.16-TA1 ZIP and deterministic rerun."""

from __future__ import annotations

import csv
import hashlib
import json
import shutil
import subprocess
import tempfile
import zipfile
from pathlib import Path


WORKSPACE = Path("/workspace/scratch/7928ba9ec53f")
ZIP_PATH = WORKSPACE / "deliverables/Q-Orbit_Theoretical_Device_Imperfection_Propagation_V0.16-TA1.zip"
PYTHON = Path(__import__("sys").executable)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> int:
    temp = Path(tempfile.mkdtemp(prefix="qorbit-v016-verify-"))
    try:
        with zipfile.ZipFile(ZIP_PATH) as archive:
            bad_member = archive.testzip()
            if bad_member is not None:
                raise RuntimeError(f"CRC failure in {bad_member}")
            archive.extractall(temp)
        roots = [path for path in temp.iterdir() if path.is_dir()]
        if len(roots) != 1:
            raise RuntimeError(f"Expected one archive root, found {len(roots)}")
        root = roots[0]

        checksum_failures = []
        with (root / "SHA256SUMS.txt").open(encoding="utf-8") as stream:
            checksum_rows = [line.rstrip("\n") for line in stream if line.strip()]
        for line in checksum_rows:
            expected, relative = line.split("  ", 1)
            path = root / relative
            if not path.exists() or sha256(path) != expected:
                checksum_failures.append(relative)
        if checksum_failures:
            raise RuntimeError(f"Checksum failures: {checksum_failures}")

        generated = [
            "data_processed/Q-Orbit_V0.16-TA1_Parameter_Catalog.csv",
            "data_processed/Q-Orbit_V0.16-TA1_Local_Sensitivity.csv",
            "data_processed/Q-Orbit_V0.16-TA1_Zero_Key_Frontier.csv",
            "data_processed/Q-Orbit_V0.16-TA1_Two_Parameter_Screen.csv",
            "data_processed/Q-Orbit_V0.16-TA1_Grid_Boundary.csv",
            "data_processed/Q-Orbit_V0.16-TA1_Regression_Tests.csv",
            "runs/Q-Orbit_V0.16-TA1_Theoretical_Run_Summary.json",
        ]
        before = {relative: sha256(root / relative) for relative in generated}
        completed = subprocess.run(
            [str(PYTHON), str(root / "source/run_theoretical_device_imperfection_model_v0_16_ta1.py")],
            cwd=root,
            check=True,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
        )
        after = {relative: sha256(root / relative) for relative in generated}
        rerun_failures = [relative for relative in generated if before[relative] != after[relative]]
        if rerun_failures:
            raise RuntimeError(f"Deterministic rerun changed outputs: {rerun_failures}")

        summary = json.loads((root / "runs/Q-Orbit_V0.16-TA1_Theoretical_Run_Summary.json").read_text(encoding="utf-8"))
        with (root / "data_processed/Q-Orbit_V0.16-TA1_Regression_Tests.csv").open(newline="", encoding="utf-8") as stream:
            regression = list(csv.DictReader(stream))
        result = {
            "result": "PASS-ZIP-AND-DETERMINISTIC-RERUN",
            "zip_sha256": sha256(ZIP_PATH),
            "checksum_rows": len(checksum_rows),
            "rerun_output_hashes_unchanged": len(generated),
            "regression": f"{sum(row['result'] == 'PASS' for row in regression)}/{len(regression)}",
            "grid_rows": summary["two_parameter_screen"]["grid_rows"],
            "grid_positive_count": summary["two_parameter_screen"]["positive_count"],
            "stdout": completed.stdout.strip(),
        }
        print(json.dumps(result, indent=2))
    finally:
        shutil.rmtree(temp)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
