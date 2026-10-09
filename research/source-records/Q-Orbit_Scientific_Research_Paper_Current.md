**Q-Orbit: Fail-Closed Finite-Key Screening for a Satellite QKD Concept**

A controlled theoretical study of numerical margin, device-imperfection mapping, and evidence boundaries



|   |
| - |

**Field**

|   |
| - |

**Controlled value**

|   |
| - |

Document ID

|   |
| - |

QO-SUB-RP-001

|   |
| - |

Version

|   |
| - |

V1.0-RC1

|   |
| - |

Prepared for

|   |
| - |

Submission review

|   |
| - |

Purpose

|   |
| - |

Private scientific research paper draft

|   |
| - |

Release state

|   |
| - |

PRIVATE-BLOCKED

|   |
| - |

Technical state

|   |
| - |

THEORETICAL / NOT PHYSICALLY VALIDATED

**Q-Orbit Project**

**Abstract**

Satellite quantum key distribution is constrained by short optical-access windows and finite detection blocks. This paper reports a controlled theoretical analysis for Q-Orbit, a direct satellite-to-ground key-replenishment concept. The study freezes an efficient-BB84 weak-coherent-pulse profile with three intensities including vacuum, reproduces a reference finite-key fixture, re-optimizes the integration half-window for every evaluated point, and evaluates both local model response and a deterministic two-parameter screen. The reference fixture is reproduced at a 102 s half-window with a signed finite-key margin of 41,338.62418456675 bits and a floored candidate key of 41,338 bits. A 41 x 41 screen over controlled extraneous-count and intrinsic-QBER ranges yields 568 positive and 1,113 nonpositive points, corresponding to a 33.789% grid fraction and a median signed margin of -2,624.947 bits. The grid is not a probability distribution. Seven security-relevant device effects remain unmapped into a selected proof-compatible representation, preventing implementation-security, certification, mission, or procurement claims. The main contribution is therefore an evidence architecture that couples reproducible numerical screening to fail-closed claim controls.

*Keywords: satellite QKD; finite-key analysis; decoy-state BB84; device characterization; evidence control; reproducibility.*

**1. Introduction**

Satellite QKD has been studied as a mechanism for extending quantum key establishment beyond the attenuation limits of terrestrial fibre. In low-Earth orbit, however, a ground station observes a satellite for a limited time, so finite-block statistical effects can dominate the key-length calculation [1]. A positive center-case result is therefore not sufficient evidence of a robust mission capability.

Q-Orbit studies one bounded direct downlink topology. The project does not attempt to claim a deployed network, a trusted-relay service, or an arbitrary remote-consumer distribution system. Instead, it asks whether a reproducible finite-key workflow can be connected to explicit system and evidence gates without converting assumptions into unearned security or performance claims.

**1.1 Research question**

If only parameters already represented in a frozen Q-Orbit finite-key fixture are varied, how does the optimized signed finite-key margin respond, and which source or detector imperfections still lack a selected proof-compatible numerical map?

**1.2 Contribution**

- Exact reproduction of a controlled satellite-QKD finite-key fixture.
- Re-optimization of the integration half-window at every perturbation point.
- A deterministic two-parameter screen with explicit non-probabilistic interpretation.
- A proof-to-device mapping that records unmapped effects rather than inventing penalties.
- A claim-boundary method that separates numerical verification from physical validation and operational security.

**2. Background and related work**

**2.1 Finite-block satellite QKD**

Sidhu et al. provide a finite-block analysis for weak-coherent-pulse, efficient-BB84 satellite QKD with three intensities and show that system loss, extraneous counts, protocol parameters, and limited pass duration materially affect single-pass secret-key length [1]. Q-Orbit retains this family as a frozen reference profile for deterministic regression and screening; it does not import the source paper's device or mission values as Q-Orbit evidence.

**2.2 Decoy-state assumptions and source flaws**

Standard decoy-state methods rely on assumptions about pulse statistics. Nahar et al. analyze imperfect phase randomization and non-identically distributed laser pulses, demonstrating that generalized treatment is required when ideal source assumptions do not hold [2]. Xu et al. show that source flaws must be characterized and integrated into the security analysis rather than hidden inside an ideal preparation model [3].

**2.3 Characterization-to-proof linkage**

Tan and Nahar distinguish device-characterization conclusions from the conditions required by a security proof and identify requirements for justified parameter domains and composable reasoning [4]. This distinction motivates Q-Orbit's refusal to replace missing characterization with a convenient scalar penalty.

**3. Methods**

**3.1 Controlled reference profile**

The analysis retains the V0.6 efficient-BB84 weak-coherent-pulse fixture with one signal intensity and two decoy intensities including vacuum. Expected counts are computed from a modeled reference loss curve. The profile is a software fixture, not a physical device model.

|   |
| - |

M = s\_X,0 + s\_X,1[1 - h2(phi\_X)] - lambda\_EC - 6 log2(21/epsilon\_s) - log2(2/epsilon\_c)

***Equation 1. Signed finite-key margin.***

The candidate key is floor(max(M, 0)) under the frozen fixture convention. The signed quantity M is retained to identify boundary behavior. A nonpositive value is a model outcome; it is not a measured outage or security-failure probability.

**3.2 Window optimization**

For every baseline, perturbation, frontier, and grid point, the model evaluates integer half-windows from 1 to 221 s and selects the window that maximizes signed margin. Smaller half-window breaks an exact tie. The rule avoids silently carrying a baseline-optimal window into a changed count/error regime.

**3.3 Local response**

Eight parameters already present in the software contract are varied: additional system loss, detector-efficiency multiplier, source repetition rate, signal-intensity multiplier, weak-decoy multiplier, extraneous-count probability, afterpulse probability, and intrinsic QBER. The declared steps are plus/minus 0.1 dB for additional loss and plus/minus 1% relative for the remaining variables. Because the steps and parameter meanings differ, the resulting rank is local and step-dependent.

**3.4 Deterministic coupled screen**

The screen evaluates 41 extraneous-count values from 1e-7 to 2e-6 per pulse and 41 intrinsic-QBER values from 0.003 to 0.015, explicitly including the baseline point. The Cartesian product contains 1,681 deterministic points. The ranges are controlled engineering bounds inherited from V0.7, not calibrated distributions.

**3.5 Proof-mapping rule**

Each source or detector effect is assigned a controlled state: mapped stress only, partial scalar stress, unmapped proof required, unmapped model required, unmapped security budget, or alternative not selected. A numerical penalty is applied only when the scalar is explicitly represented. Unmapped effects remain blocking obligations.

**3.6 Verification**

The implementation verifies controlled-input hashes, exact baseline outputs, state partitioning of the grid, finite numerical values, boundary invariants, and release-state constraints. Twelve regression tests and a 20-check independent package audit pass. An independent V0.13 implementation previously compared 50 locked vectors over 971 metrics with zero open numerical discrepancies.

**4. Results**

**4.1 Baseline reproduction**

|   |
| - |

**Quantity**

|   |
| - |

**Result**

|   |
| - |

Half-window

|   |
| - |

102 s

|   |
| - |

Signed margin

|   |
| - |

41,338.62418456675 bits

|   |
| - |

Floored candidate key

|   |
| - |

41,338 bits

|   |
| - |

X-basis QBER

|   |
| - |

0.017422686665352745

|   |
| - |

Phase-error bound

|   |
| - |

0.09270161340569935

|   |
| - |

Single-photon lower bound s\_X,1

|   |
| - |

183,803.04893680647

**4.2 Local response**

***Figure 1. Local signed-margin response per declared perturbation step.***

The largest absolute local response is associated with additional system loss (-8.216% of the baseline margin per 0.1 dB step), followed by detector efficiency (+3.567% per 1% relative step) and source repetition rate (+1.946% per 1% relative step). These values describe model response around one fixture point.

**4.3 Coupled screen**

***Figure 2. Signed margin across the controlled 41 x 41 screen; the contour indicates the zero-margin boundary at grid resolution.***

|   |
| - |

**Statistic**

|   |
| - |

**Result**

|   |
| - |

Total points

|   |
| - |

1,681

|   |
| - |

Positive signed margin

|   |
| - |

568

|   |
| - |

Nonpositive signed margin

|   |
| - |

1,113

|   |
| - |

Positive grid fraction

|   |
| - |

33.789411%

|   |
| - |

Median signed margin

|   |
| - |

-2,624.946810258186 bits

|   |
| - |

Minimum / maximum signed margin

|   |
| - |

-3,828.414517626367 / 142,540.7481180454 bits

**4.4 Unmapped device effects**

|   |
| - |

**Effect**

|   |
| - |

**Current state**

|   |
| - |

**Claim consequence**

|   |
| - |

Incomplete phase randomization

|   |
| - |

UNMAPPED-PROOF-REQUIRED

|   |
| - |

Standard decoy applicability not established

|   |
| - |

Pulse/intensity correlations

|   |
| - |

UNMAPPED-PROOF-REQUIRED

|   |
| - |

IID pulse assumption not established

|   |
| - |

State-preparation flaws/leakage

|   |
| - |

UNMAPPED-PROOF-REQUIRED

|   |
| - |

Aggregate QBER is insufficient

|   |
| - |

Dead time, recovery, saturation, jitter

|   |
| - |

UNMAPPED-MODEL-REQUIRED

|   |
| - |

Detector/rate interpretation blocked

|   |
| - |

Efficiency mismatch

|   |
| - |

UNMAPPED-PROOF-REQUIRED

|   |
| - |

Receiver measurement model incomplete

|   |
| - |

Characterization confidence

|   |
| - |

UNMAPPED-SECURITY-BUDGET

|   |
| - |

No certification-to-proof guarantee

|   |
| - |

Aging/cross-instance memory

|   |
| - |

UNMAPPED-MODEL-REQUIRED

|   |
| - |

Persistent operation claim blocked

**5. Discussion**

**5.1 Positive baseline versus non-robust design space**

The exact positive baseline demonstrates deterministic reproduction, but the coupled screen shows that positivity is not robust across the declared research ranges. The negative median is especially important: the nominal point cannot be promoted to a mission claim without evidence-backed distributions and a validated physical model.

**5.2 Why QBER alone is insufficient**

The finite-key expression also depends on vacuum and single-photon bounds, phase-error estimation, error-correction leakage, finite penalties, and the complete protocol profile. QBER cannot certify phase randomization, source leakage, detector mismatch, authentication, endpoint behavior, or key-management state.

**5.3 Model response is not device specification**

The one-parameter frontiers and local ranks freeze other variables and use arbitrary but declared steps. They are useful for finding fragile regions of the software fixture, but they are not tolerances, procurement filters, calibration limits, or security-proof domains.

**5.4 Fail-closed evidence handling**

The absence of a numerical penalty for an unmapped effect is intentional. Assigning a convenient penalty would create an appearance of completeness without a proof basis. The fail-closed rule keeps the gap visible and prevents numerical output from widening the claim.

**6. Limitations**

- The reference loss curve and expected counts are modeled rather than measured.
- Baseline reproduction does not provide an independent security proof.
- Binary64 arithmetic is used; interval and arbitrary-precision sensitivity remain untested.
- Only the half-window is globally searched; protocol probabilities and most intensities remain frozen.
- The coupled ranges are engineering bounds rather than probability distributions.
- No source, detector, atmosphere, parcel, orbit authority, hardware, or operational security evidence is used.
- The study does not predict Tabuk availability, yield, or mission success.

**7. Conclusion**

Q-Orbit demonstrates a reproducible theoretical workflow for finite-key satellite-QKD screening and makes the limitations of that workflow machine-checkable. The controlled fixture reproduces exactly, but the coupled screen is dominated by nonpositive cases and several device effects remain outside the selected proof representation. The scientifically defensible conclusion is not that a mission is ready, but that evidence and proof incompleteness can be exposed before they are mistaken for design maturity.

The next theoretical research task is a proof-profile selection and parameter-domain mapping for phase randomization, source flaws, pulse correlations, detector history, detector mismatch, and characterization confidence. Hardware procurement and field operation are neither required nor authorized for this submission.

**Data and reproducibility statement**

The controlled V0.16-TA1 package contains the frozen input index, executable model, generated CSV outputs, workbook, regression results, audits, and cryptographic hashes needed to reproduce the reported software results. Distribution remains private. Modeled candidate key material is not real key material and remains quarantined.

**References**

[1] J. S. Sidhu et al., Finite key effects in satellite quantum key distribution, npj Quantum Information 8, 18 (2022). https\://doi.org/10.1038/s41534-022-00525-3

[2] S. Nahar, T. Upadhyaya, and N. Lutkenhaus, Imperfect phase randomization and generalized decoy-state quantum key distribution, Physical Review Applied 20, 064031 (2023). https\://doi.org/10.1103/PhysRevApplied.20.064031

[3] F. Xu et al., Experimental quantum key distribution with source flaws, Physical Review A 92, 032305 (2015). https\://doi.org/10.1103/PhysRevA.92.032305

[4] E. Y.-Z. Tan and S. Nahar, Incorporating Device Characterization into Security Proofs, PRX Quantum 7, 020342 (2026). https\://doi.org/10.1103/f42p-524t

[5] C. C.-W. Lim et al., Concise security bounds for practical decoy-state quantum key distribution, Physical Review A 89, 022307 (2014). https\://doi.org/10.1103/PhysRevA.89.022307

[6] H.-K. Lo, X. Ma, and K. Chen, Decoy State Quantum Key Distribution, Physical Review Letters 94, 230504 (2005). https\://doi.org/10.1103/PhysRevLett.94.230504