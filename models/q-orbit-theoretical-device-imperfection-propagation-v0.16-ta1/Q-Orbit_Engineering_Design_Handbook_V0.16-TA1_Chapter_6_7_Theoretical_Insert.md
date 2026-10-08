# Q-Orbit Engineering Design Handbook — V0.16-TA1 Theoretical Insert

## Controlled insertion point

This insert supplements Chapter 6 sections 6.6–6.7 and Chapter 7 sections 7.4–7.9. It does not supersede the V0.11R1 claim boundary or convert a historical reference fixture into Tabuk, hardware, or mission evidence.

## 6.TA1 Device-imperfection representation rule

Every source or detector imperfection shall be assigned exactly one state before it may influence a controlled finite-key calculation:

1. `MAPPED-STRESS-ONLY`: a scalar already exists in the frozen software contract and may be varied for numerical response analysis;
2. `PARTIAL-SCALAR-STRESS`: a scalar approximation exists but known history, correlation, or multidimensional behavior remains omitted;
3. `UNMAPPED-PROOF-REQUIRED`: a security-relevant effect lacks a selected proof-compatible parameter map;
4. `UNMAPPED-MODEL-REQUIRED`: a physical effect lacks an implemented statistical or dynamical model;
5. `UNMAPPED-SECURITY-BUDGET`: confidence or certification failure has not been composed into the security statement; or
6. `ALTERNATIVE-NOT-SELECTED`: a candidate proof family exists but is not under configuration control.

Only the first two states may be evaluated numerically, and their output shall be labeled software stress. No numeric penalty shall be invented for an unmapped effect.

The current mapped scalar set is aggregate additional loss, relative detector-efficiency multiplier, repetition rate, signal and weak-decoy intensity multipliers, IID extraneous-count probability, scalar afterpulse probability, and aggregate intrinsic QBER.

The current unmapped set includes phase-randomization defects, pulse correlations, state-preparation leakage, detector dead/recovery/saturation/jitter/history behavior, channel/time/polarization efficiency mismatch, certification confidence, and cross-instance aging or memory.

## 6.TA2 Signed finite-key margin

For audit and boundary analysis, the implementation shall preserve the signed expression before nonnegative clipping and flooring:

\[
M=s_{X,0}+s_{X,1}\left[1-h_2(\phi_X)\right]-\lambda_{EC}
-6\log_2\left(\frac{21}{\epsilon_s}\right)
-\log_2\left(\frac{2}{\epsilon_c}\right).
\]

The reported candidate key remains `floor(max(M,0))` under the frozen fixture convention. Signed margin is a numerical diagnostic and is not releasable key material.

## 7.TA1 Re-optimization rule

Every perturbation shall re-screen all integer half-windows from 1 through 221 seconds. The selected theoretical window maximizes signed margin, with the smaller half-window breaking an exact tie. This objective equals the historical fixture objective at the baseline but need not do so near nonpositive boundaries.

## 7.TA2 V0.16-TA1 controlled results

| Result | Controlled value | Interpretation |
|---|---:|---|
| Baseline half-window | 102 s | Exact V0.6 reproduction |
| Baseline signed margin | 41,338.62418456675 bits | Software fixture only |
| Baseline floored key | 41,338 bits | Quarantined modeled candidate |
| Local parameters | 8 | Existing software-contract variables only |
| One-parameter search rows | 16 | Low and high side for each parameter |
| Crossings found | 10 | Software-fixture frontiers only |
| Coupled grid | 41 × 41 = 1,681 points | Deterministic research screen |
| Positive grid points | 568 | 33.789% of grid; not probability |
| Nonpositive grid points | 1,113 | Median signed margin is negative |
| Regression tests | 12/12 pass | Numerical and boundary-invariant checks |

## 7.TA3 Interpretation controls

- The local-response order is conditional on different declared steps and shall not be called a global physical importance ranking.
- A one-parameter crossing shall not be called a requirement, tolerance, procurement filter, or acceptance threshold.
- The grid fraction shall not be called availability, reliability, probability, or mission success.
- QBER alone shall not be used as an acceptance rule.
- No physical source or detector evidence exists in this package.
- No modeled candidate key may leave quarantine.
- Tabuk remains a study-region label; the V0.16 calculation is not a Tabuk run.

## 7.TA4 Next theoretical gate

Before any device-backed security statement, a controlled proof-selection record shall identify:

1. the treatment of incomplete phase randomization;
2. pulse and intensity correlations;
3. source state-preparation flaws and leakage;
4. detector history, recovery, saturation, jitter, and channel mismatch;
5. parameter domains over which the proof is valid; and
6. how characterization confidence and numerical proof error are composed into the stated security budget.

Until that record and its mathematical implementation exist, `TA-G05` and `TA-G06` remain `BLOCKED`.
