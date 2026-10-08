# Q-Orbit V0.16-TA1

This private package performs deterministic theoretical propagation of source/detector parameters already present in the frozen V0.6 finite-key software fixture and maps omitted imperfections to explicit proof obligations.

## What it establishes

- exact reproduction of the V0.6 reference fixture;
- local numerical response for eight existing scalar parameters;
- one-parameter signed-margin software frontiers;
- a deterministic 41 × 41 extraneous-count / intrinsic-QBER screen; and
- an explicit mapped/unmapped imperfection register.

## What it does not establish

No hardware was selected, purchased, characterized, calibrated, or tested. No laser or optical emission occurred. No Tabuk case was run. No implementation-security, certification, mission-readiness, performance, procurement, or key-release claim is made.

## Primary files

- `Q-Orbit_Theoretical_Device_Imperfection_Propagation_Report_V0.16-TA1.md`
- `Q-Orbit_Engineering_Design_Handbook_V0.16-TA1_Chapter_6_7_Theoretical_Insert.md`
- `Q-Orbit_Theoretical_Device_Imperfection_Propagation_Workbook_V0.16-TA1.xlsx`
- `runs/Q-Orbit_V0.16-TA1_Theoretical_Run_Summary.json`
- `data_processed/Q-Orbit_V0.16-TA1_Imperfection_to_Proof_Mapping.csv`
- `data_processed/Q-Orbit_V0.16-TA1_Limitation_Register.csv`
- `source/run_theoretical_device_imperfection_model_v0_16_ta1.py`

## Reproduction

Run the model from the package root with a Python environment containing NumPy and SciPy:

```bash
python source/run_theoretical_device_imperfection_model_v0_16_ta1.py
```

The package remains `PRIVATE-BLOCKED`; all modeled key output remains `QUARANTINED/ZERO-RELEASED`.
