# Q-Orbit Theoretical Device Imperfection Propagation Report V0.16-TA1

| Field | Controlled value |
|---|---|
| Package ID | `QO-THEORETICAL-DEVICE-IMPERFECTION-PROPAGATION-V0.16-TA1` |
| Date | 25 August 2026 |
| Scope | Deterministic software-fixture propagation and proof mapping only |
| Physical characterization | `NOT-EXECUTED` |
| Hardware-in-loop | `BLOCKED` |
| Laser | `INHIBITED` |
| Tabuk run | `NOT-RUN/NONE` |
| Key release | `QUARANTINED/ZERO-RELEASED` |
| Publication | `PRIVATE-BLOCKED` |

## 1. Executive result

V0.16-TA1 reproduces the controlled V0.6 finite-key fixture exactly and then exposes how the signed finite-key margin changes under eight parameters already present in the software contract. It does not substitute unmeasured source or detector defects with invented penalties.

The frozen fixture selects a 102 s half-window and returns a signed margin of `41,338.62418456675` bits, floored to `41,338` bits. All 12 regression and boundary-invariant tests pass.

The controlled 41 × 41 screen over the V0.7 engineering ranges for extraneous counts and intrinsic QBER contains 1,681 deterministic points:

- 568 points have a positive signed model margin;
- 1,113 points have a nonpositive signed model margin;
- the positive grid fraction is `0.33789411064842356` (33.789%);
- the median signed margin is `-2,624.946810258186` bits; and
- the minimum and maximum signed margins are `-3,828.414517626367` and `142,540.7481180454` bits.

These grid points are not random draws. The fraction is therefore not a probability, reliability, availability, or mission-success estimate.

## 2. Scientific question

The bounded question is:

> If only parameters already represented in the frozen Q-Orbit finite-key fixture are varied, how does the optimized signed finite-key margin respond, and which device imperfections still lack a selected proof-compatible numerical map?

The answer has two parts:

1. the existing scalar contract can be stressed reproducibly; and
2. several security-relevant source and detector imperfections remain unmapped, so the output cannot support a device, implementation-security, certification, procurement, site, or mission claim.

## 3. Frozen mathematical profile

The analysis retains the V0.6 efficient-BB84 weak-coherent-pulse profile with one signal and two decoy intensities including vacuum. It retains the finite-key construction reported by Sidhu et al.:

\[
\ell=\left\lfloor
s_{X,0}+s_{X,1}\left[1-h_2(\phi_X)\right]-\lambda_{EC}
-6\log_2\left(\frac{21}{\epsilon_s}\right)
-\log_2\left(\frac{2}{\epsilon_c}\right)
\right\rfloor.
\]

V0.16 also records the expression inside the floor before clipping as a signed finite-key margin. A nonpositive signed margin is a software-model outcome only; it is not a security failure rate or physical outage probability.

The half-window is re-optimized for every evaluated point across the 1–221 s controlled integer range. This prevents a baseline-optimal window from being silently reused after a perturbation changes the count and error balance.

## 4. Baseline reproduction

| Metric | V0.16 result | V0.6 target | Result |
|---|---:|---:|---|
| Half-window | 102 s | 102 s | `PASS` |
| Floored key | 41,338 bits | 41,338 bits | `PASS` |
| Signed/raw margin | 41,338.62418456675 bits | 41,338.62418456675 bits | `PASS` |
| X-basis QBER | 0.017422686665352745 | 0.017422686665352745 | `PASS` |
| X-basis phase-error bound | 0.09270161340569935 | 0.09270161340569935 | `PASS` |
| X detections `n_X` | 492,818.0901525894 | 492,818.0901525894 | `PASS` |
| Single-photon lower bound `s_X,1` | 183,803.04893680647 | 183,803.04893680647 | `PASS` |

The calculation uses a modeled reference loss curve and expected counts. Reproduction is numerical verification, not physical validation or an independent security proof.

## 5. Local numerical response

The declared local steps are ±0.1 dB for aggregate additional loss and ±1% relative for the other seven parameters. The central response is the half-difference between the re-optimized plus and minus cases, normalized by the baseline signed margin.

| Rank | Parameter | Declared step | Normalized response per step | Direction at the baseline |
|---:|---|---|---:|---|
| 1 | Additional system loss | ±0.1 dB | -0.0821579 | More loss reduces margin |
| 2 | Detector efficiency multiplier | ±1% | +0.0356736 | Higher multiplier increases margin |
| 3 | Source repetition rate | ±1% | +0.0194636 | Higher rate increases margin in this count model |
| 4 | Extraneous count probability | ±1% | -0.0161950 | More extraneous counts reduce margin |
| 5 | Intrinsic QBER | ±1% | -0.00676876 | More intrinsic error reduces margin |
| 6 | Signal-intensity multiplier | ±1% | -0.00586188 | Local increase reduces margin around the frozen value |
| 7 | Weak-decoy multiplier | ±1% | -0.000736959 | Local increase slightly reduces margin |
| 8 | Afterpulse probability | ±1% | -0.000632550 | More scalar afterpulse reduces margin |

This ranking is not a physical sensitivity ranking because the declared steps and parameter meanings differ. It is a local numerical response audit for the frozen fixture.

## 6. One-parameter software frontiers

Ten of sixteen low/high searches find a signed-margin crossing within their declared mathematical domains. Examples include:

- aggregate additional loss: last-positive frontier near `14.5079275108 dB` on the high side;
- relative detector-efficiency multiplier: last-positive frontier near `0.706647597629` on the low side;
- extraneous count probability: last-positive frontier near `8.95820609331e-7` per pulse on the high side; and
- intrinsic-QBER fraction: last-positive frontier near `0.0133350170734` on the high side.

Each value freezes every other input and re-optimizes only the half-window. These are software-fixture frontiers, not requirements, tolerances, procurement filters, or proof-validity thresholds.

## 7. Coupled extraneous-count / intrinsic-QBER screen

The 41 × 41 grid uses the controlled V0.7 screening ranges:

- `p_ec`: `1e-7` to `2e-6` per pulse; and
- intrinsic QBER: `0.003` to `0.015`.

The grid includes the V0.6 baseline values explicitly and evaluates a re-optimized window at every point. At low extraneous-count values the entire intrinsic-QBER grid remains positive; as `p_ec` rises, the highest positive intrinsic-QBER grid point falls. At and above `1.02564102564e-6` in this grid, none of the 41 intrinsic-QBER points is positive.

That last observation is resolution-dependent. The companion boundary CSV labels it `GRID-RESOLUTION-NOT-ANALYTIC-THRESHOLD`.

## 8. Proof-to-device boundary

The scalar model covers only aggregate loss, relative detector efficiency, repetition rate, signal/decoy intensity multipliers, fixed IID extraneous counts, scalar afterpulse probability, and aggregate intrinsic QBER as software stresses.

It does not numerically cover:

- imperfect phase randomization;
- pulse-to-pulse or intensity correlations;
- state-preparation leakage or distinguishable side-channel states;
- detector dead time, recovery, saturation, timing jitter, and history dependence;
- efficiency mismatch over channel, time, wavelength, or polarization;
- device-characterization confidence regions and their failure probability; or
- device aging or memory across protocol instances.

Nahar et al. show that standard decoy-state methods rely on fully phase-randomized pulses and additional pulse-distribution assumptions, motivating generalized analysis when those assumptions fail. Xu et al. demonstrate that source flaws must be quantified and incorporated into a finite-key treatment rather than hidden inside an ideal state-preparation assumption. Tan and Nahar formalize why practical device parameters need justified ranges and why conclusions from characterization and security proofs must be connected carefully.

No numerical penalty is assigned to these unmapped effects. They remain blocking proof obligations.

## 9. Decision

V0.16-TA1 passes as a theoretical analysis package:

- baseline reproduction: `PASS-THEORETICAL`;
- deterministic grid integrity: `PASS-THEORETICAL`;
- proof-to-device completeness: `BLOCKED`;
- physical characterization: `NOT-EXECUTED`;
- hardware-in-loop: `BLOCKED`;
- Tabuk case: `NOT-RUN/NONE`;
- laser: `INHIBITED`;
- key release: `QUARANTINED/ZERO-RELEASED`; and
- publication: `PRIVATE-BLOCKED`.

The correct next theoretical task is proof-profile selection and explicit parameter-domain mapping for phase randomization, source flaws, pulse correlations, detector history, and detector mismatch. It is not hardware procurement.

## 10. References

1. J. S. Sidhu et al., “Finite key effects in satellite quantum key distribution,” *npj Quantum Information* 8, 18 (2022), https://doi.org/10.1038/s41534-022-00525-3.
2. S. Nahar, T. Upadhyaya, and N. Lütkenhaus, “Imperfect phase randomization and generalized decoy-state quantum key distribution,” *Physical Review Applied* 20, 064031 (2023), https://doi.org/10.1103/PhysRevApplied.20.064031.
3. F. Xu et al., “Experimental quantum key distribution with source flaws,” *Physical Review A* 92, 032305 (2015), https://doi.org/10.1103/PhysRevA.92.032305.
4. E. Y.-Z. Tan and S. Nahar, “Incorporating Device Characterization into Security Proofs,” *PRX Quantum* 7, 020342 (2026), https://doi.org/10.1103/f42p-524t.

## 11. Reproduction

From the package root:

```bash
python source/run_theoretical_device_imperfection_model_v0_16_ta1.py
```

The executable verifies the controlled loss-curve hash, regenerates the numerical CSVs and run summary, and fails if any regression invariant does not pass.
