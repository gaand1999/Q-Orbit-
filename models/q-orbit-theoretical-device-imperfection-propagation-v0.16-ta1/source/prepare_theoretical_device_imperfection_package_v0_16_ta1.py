#!/usr/bin/env python3
"""Prepare controlled-input metadata for Q-Orbit V0.16-TA1.

This helper performs no physical acquisition and does not alter controlled
predecessor files. It records deterministic file identity for package audit.
"""

from __future__ import annotations

import csv
import hashlib
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CONTROLLED = ROOT / "controlled_inputs"
OUTPUT = ROOT / "data_processed/Q-Orbit_V0.16-TA1_Controlled_Input_Index.csv"


PURPOSE = {
    "v0.6": "Frozen finite-key fixture, loss curve, baseline and reference implementation",
    "v0.7": "Controlled engineering screening ranges for the coupled grid",
    "v0.11r1": "Handbook Chapters 6 and 7 method and claim boundary",
    "v0.12": "Protocol profile, model input contract, limitation register and audit",
    "v0.13": "Independent numerical-comparison contract, limitations and audit",
    "v0.15-ea1": "Evidence-acquisition identity and proof that physical evidence remains absent",
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> int:
    rows = []
    files = sorted(path for path in CONTROLLED.rglob("*") if path.is_file())
    for index, path in enumerate(files, 1):
        relative = path.relative_to(CONTROLLED)
        predecessor = relative.parts[0]
        rows.append({
            "controlled_input_id": f"CI-016-{index:03d}",
            "predecessor_version": predecessor,
            "file_name": path.name,
            "controlled_path": relative.as_posix(),
            "sha256": sha256(path),
            "size_bytes": path.stat().st_size,
            "purpose": PURPOSE[predecessor],
            "identity_state": "HASH-RECORDED",
        })
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT.open("w", newline="", encoding="utf-8") as stream:
        writer = csv.DictWriter(stream, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)
    if len(rows) != 17:
        raise RuntimeError(f"Expected 17 controlled inputs, found {len(rows)}")
    print(f"controlled_inputs={len(rows)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
