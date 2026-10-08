# Reproducibility and source integrity

## Checks performed for this repository

- The 64 entries in the original V0.16-TA1 `SHA256SUMS.txt` matched the extracted archive bytes.
- Imported source artifacts are recorded in [SOURCE_MANIFEST.sha256](SOURCE_MANIFEST.sha256), with original filenames and bytes preserved.
- The 1,681-row screen can be inspected directly from CSV. Counts and recorded metrics in the main README are sourced from the preserved package.
- Repository preparation does not claim a fresh end-to-end model run, new experimental evidence, or resolution of the historical scientific blockers.

## Verify the frozen package

From the repository root:

```bash
cd models/q-orbit-theoretical-device-imperfection-propagation-v0.16-ta1
shasum -a 256 -c SHA256SUMS.txt
```

On Linux, `sha256sum -c SHA256SUMS.txt` is an alternative.

To check all imported artifacts, run this from the repository root:

```bash
shasum -a 256 -c docs/SOURCE_MANIFEST.sha256
```

## Re-execute the model

The original environment record names Python 3.12.13, NumPy 2.3.5, and SciPy 1.17.0. The original `requirements-lock.txt` includes a Python version line and descriptive comments; it is an environment record, not a ready-to-install requirements file.

Use a separate working copy because the model writes results into `data_processed/` and `runs/`. In that copy, from the model-package directory:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install numpy==2.3.5 scipy==1.17.0
python source/run_theoretical_device_imperfection_model_v0_16_ta1.py
```

Inspect the generated regression CSV and run summary after execution. An identical environment and matching results must be checked before describing a run as reproduced.

## Provenance and historical boundaries

The repository combines original Google Drive research documents, delivery artifacts, a static prototype, and the frozen model extracted from `Q-Orbit_Kimi_Core_Research_Input.zip`. No Drive access URLs or local working paths are added to the public index.

The imported documents span multiple versions and dates. Some documents report missing inputs at the time they were written; the archived model package now contains controlled input files, but their presence does not silently close historical review findings. The original `PRIVATE-BLOCKED`, `QUARANTINED`, and `ZERO-RELEASED` labels are retained as source data. Publication of a research repository does not assert hardware or security approval.

Private website-source bundles, empty folders, Apple Pages/Numbers sources, conversion intermediates, and redundant ZIP copies remain outside this repository preparation. Original Drive files are preserved.
