#!/usr/bin/env python3
"""Finalize Q-Orbit V0.16-TA1 artifact identities and ZIP package."""

from __future__ import annotations

import hashlib
import json
import zipfile
from pathlib import Path


WORKSPACE = Path("/workspace/scratch/7928ba9ec53f")
ROOT = WORKSPACE / "deliverables/q-orbit-theoretical-device-imperfection-propagation-v0.16-ta1"
ZIP_PATH = WORKSPACE / "deliverables/Q-Orbit_Theoretical_Device_Imperfection_Propagation_V0.16-TA1.zip"
ARTIFACT_MANIFEST = ROOT / "Q-Orbit_Theoretical_Device_Imperfection_Propagation_Artifact_Manifest_V0.16-TA1.json"
CHECKSUMS = ROOT / "SHA256SUMS.txt"


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def included_files(*, include_manifest: bool) -> list[Path]:
    excluded = {CHECKSUMS, ARTIFACT_MANIFEST}
    files = []
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix == ".pyc" or "__pycache__" in path.parts:
            continue
        if path in excluded and not (include_manifest and path == ARTIFACT_MANIFEST):
            continue
        files.append(path)
    return sorted(files, key=lambda item: item.relative_to(ROOT).as_posix())


def role(relative: str) -> str:
    if relative.endswith(".xlsx"):
        return "WORKBOOK"
    if relative.endswith("_Report_V0.16-TA1.md"):
        return "PRIMARY-REPORT"
    if "Chapter_6_7_Theoretical_Insert" in relative:
        return "HANDBOOK-INSERT"
    if "Final_Audit" in relative:
        return "FINAL-AUDIT"
    if relative.startswith("controlled_inputs/"):
        return "CONTROLLED-INPUT"
    if relative.startswith("data_processed/"):
        return "PROCESSED-DATA"
    if relative.startswith("runs/"):
        return "RUN-RECORD"
    if relative.startswith("source/"):
        return "REPRODUCTION-SOURCE"
    if relative.startswith("previews/"):
        return "VISUAL-QA"
    return "PACKAGE-CONTROL"


def main() -> int:
    audit = json.loads((ROOT / "Q-Orbit_Theoretical_Device_Imperfection_Propagation_Final_Audit_V0.16-TA1.json").read_text(encoding="utf-8"))
    if audit["result"] != "PASS-THEORETICAL-ANALYSIS-PACKAGE" or audit["failure_count"] != 0:
        raise RuntimeError("Refusing to finalize a package without a passing final audit")

    artifacts = []
    for path in included_files(include_manifest=False):
        relative = path.relative_to(ROOT).as_posix()
        artifacts.append({
            "artifact_id": f"ART-016-{len(artifacts)+1:03d}",
            "relative_path": relative,
            "role": role(relative),
            "size_bytes": path.stat().st_size,
            "sha256": sha256(path),
        })
    manifest = {
        "package_id": "QO-THEORETICAL-DEVICE-IMPERFECTION-PROPAGATION-V0.16-TA1",
        "version": "V0.16-TA1",
        "date": "2026-08-25",
        "artifact_count": len(artifacts),
        "artifacts": artifacts,
    }
    ARTIFACT_MANIFEST.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    checksum_files = included_files(include_manifest=True)
    CHECKSUMS.write_text(
        "".join(f"{sha256(path)}  {path.relative_to(ROOT).as_posix()}\n" for path in checksum_files),
        encoding="utf-8",
    )

    archive_root = ROOT.name
    with zipfile.ZipFile(ZIP_PATH, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for path in sorted([item for item in ROOT.rglob("*") if item.is_file() and item.suffix != ".pyc" and "__pycache__" not in item.parts], key=lambda item: item.relative_to(ROOT).as_posix()):
            archive.write(path, f"{archive_root}/{path.relative_to(ROOT).as_posix()}")

    print(json.dumps({
        "artifact_count": len(artifacts),
        "checksum_count": len(checksum_files),
        "zip_path": str(ZIP_PATH),
        "zip_size_bytes": ZIP_PATH.stat().st_size,
        "zip_sha256": sha256(ZIP_PATH),
    }, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
