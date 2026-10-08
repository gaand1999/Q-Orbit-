---
title: "Q-ORBIT"
subtitle: "Preliminary Submission — Phase 1 Interim Package"
author: "Q-Orbit Research Team"
date: "2026-08-27"
document-id: "QO-INTERIM-PKG-001"
version: "1.0 (Phase 1 Interim)"
classification: "Controlled Research — No Security Claims"
release-state: "PRIVATE-BLOCKED"
technical-state: "THEORETICAL / NOT PHYSICALLY VALIDATED"
submission-posture: "READY-WITH-DISCLOSED-LIMITATIONS"
---

\thispagestyle{empty}

\begin{center}
\vspace*{2cm}
{\Huge\bfseries Q-ORBIT}\\[0.5cm]
{\Large\itshape Preliminary Submission}\\[0.3cm]
{\large Phase 1 Interim Package}\\[2cm]

\rule{0.6\textwidth}{0.4pt}\\[1cm]

{\large\bfseries Fail-Closed Finite-Key Screening}\\[0.2cm]
{\large\bfseries for a Satellite QKD Concept}\\[1.5cm]

\begin{tabular}{rl}
\textbf{Document ID:} & QO-INTERIM-PKG-001 \\
\textbf{Version:} & 1.0 (Phase 1 Interim) \\
\textbf{Date:} & 2026-08-27 \\
\textbf{Release State:} & PRIVATE-BLOCKED \\
\textbf{Technical State:} & THEORETICAL / NOT PHYSICALLY VALIDATED \\
\textbf{Submission Posture:} & READY-WITH-DISCLOSED-LIMITATIONS \\
\textbf{Classification:} & Controlled Research — No Security Claims \\
\end{tabular}

\vspace{1.5cm}

\fbox{\parbox{0.8\textwidth}{\centering
\textbf{INTERIM THEORETICAL SUBMISSION --- NOT PHYSICALLY VALIDATED}\\[0.3cm]
\small This package contains only theoretical/numerical computations from a frozen software fixture. No physical characterization, hardware-in-loop testing, experimental run, or released secret key is claimed. All numerical outputs are \textbf{conditional computations} supporting \textbf{no security claim} absent the characterization and proof-profile completion described herein.
}}

\vfill

{\small Compiled: 2026-08-27}\\
{\small All claims controlled. No missing data invented.}
\end{center}

\newpage
\setcounter{page}{1}

# CURRENT PROJECT STATUS

## Phase 1 Gate Verdict: CONDITIONAL PASS --- READY FOR PHASE 2 WITH DISCLOSED LIMITATIONS

| Criterion | Status | Evidence |
|-----------|--------|----------|
| **D1 --- Executive Audit** | COMPLETE | Artifact inventory, hash chain, baseline reproduction, grid recomputation, sign-discrepancy resolution, sensitivity/frontier verification, audit JSON cross-check |
| **D2 --- Numerical Consistency Table** | COMPLETE | All mandated rows covered; EV-* evidence classes applied; sign corrections C-01/C-02 documented |
| **D3 --- Literature and Proof Review** | COMPLETE | Verified citation ledger (6 seeded + supplementary); assumption inventory A1--A6; proof-family survey F1--F8 |
| **D4 --- Proof-Profile Comparison** | COMPLETE | 14-row matrix; MDI-QKD exclusion verdict; Profile A/B recommendation; rejected alternatives with reasons |
| **D5 --- Device-Imperfection Mapping** | COMPLETE | 15-effect master matrix; 12-item hidden-substitution watchlist; engineering-vs-proof split |
| **D6 --- V0.17-TA1 Architecture Spec** | COMPLETE | Symbolic parameter registry; epsilon ledger; Category-1/2/3 constructors/guards; claim labeling; fixture shim |
| **D7 --- Revised Manuscript V1.0-RC2** | <font color="#27ae60"><b>COMPLETE</b></font> | All Phase 1 corrections applied; claim-control labels intact; submission-ready for theoretical review |
| **Red-Team Review (Agent G)** | PASSED | All 16 findings C1--C16 dispositioned FIXED; no BLOCKED criticism remains undispositioned |
| **Independent Re-Execution** | NOT PERFORMED | REQ-01...03 absent; disclosed as limitation |
| **Physical Validation** | NOT EXECUTED | Zero physical characterization; hardware-in-loop BLOCKED |

### Prototype and Website Status

**Software prototype (V0.17-TA1):** BUILT — Q-Orbit Theoretical Analysis Console V0.17 Prototype. Software/research prototype only. NOT PHYSICALLY VALIDATED. Key release remains QUARANTINED / ZERO RELEASED. The V0.16-TA1 frozen fixture remains the sole numerically verified computational artifact.

**Exhibition research console (website):** IN PROGRESS — exhibition/research interface; not part of the scientific validation record. Contains no interactive computational capability and makes no claims beyond those in this package.

### Binding Limitations (Summary)

1. **Zero physical characterization:** `physical_characterization: NOT-EXECUTED`; `hardware_in_loop: BLOCKED`; `laser_status: INHIBITED`; `tabuk_run_status: NOT-RUN/NONE`; `key_release_status: QUARANTINED/ZERO-RELEASED`.
2. **No independent end-to-end re-execution** of the V0.16 model (BLOCKER-1, REQ-01...03 absent).
3. **Individual epsilon values (\(\varepsilon_s\), \(\varepsilon_c\)) unverified** --- the finite penalty 256.5669430839006 bits is one equation in two unknowns (BLOCKER-2).
4. **All margins and key figures are UPPER BOUNDS w.r.t. error-correction efficiency** (CFR N-27): fixture assumes ideal \(f_{EC} = 1\); realistic \(f_{EC} > 1\) would increase leakage by ~10.5 kbits at \(f_{EC} \approx 1.16\).
5. **Seven security-relevant device effects remain unmapped** into any selected proof-compatible representation; five additional effects are proof-profile candidates gated by missing characterization.
6. **The 568/1,113 grid partition is an upper-envelope deterministic screen count**, not a probability, reliability, availability, or mission-success figure.

\newpage

# TABLE OF CONTENTS

\tableofcontents

\newpage

# PART A --- INTERIM COVER PAGE

| Field | Value |
|-------|-------|
| **Project** | Q-Orbit --- Theoretical Satellite QKD Concept |
| **Phase** | Phase 1 --- Canonical Scientific Audit, Research Extension, V0.17-TA1 Architecture |
| **Package Type** | INTERIM THEORETICAL SUBMISSION |
| **Physical Validation Status** | NOT PHYSICALLY VALIDATED --- ZERO PHYSICAL CHARACTERIZATION |
| **Submission Posture** | READY-WITH-DISCLOSED-LIMITATIONS (theoretical/numerical record only) |
| **Physical/Device/Mission Claims** | BLOCKED --- fail-closed |
| **Date Compiled** | 2026-08-27 |
| **Document ID** | QO-INTERIM-PKG-001 |
| **Version** | 1.0 (Phase 1 Interim) |
| **Release State** | PRIVATE-BLOCKED |
| **Basis Documents** | Phase 1 Canonical Audit (D1+D2); Canonical Facts Record v1.1; D3--D6; Red-Team Review QO-G-RT-001 |
| **Controlled Artifacts** | 10 V0.16-TA1 bundle artifacts (9 of 10 hash-verified; 1 compiled but not byte-reconstructed) |
| **Evidence Precedence** | Executable output > hash-verified run summary/CSV > regression fixture > technical report > manuscript prose > unsupported narrative |

## Authority and Scope

This interim package is submitted for **preliminary theoretical review only**. It reports the state of a controlled computational analysis of a satellite-QKD finite-key fixture, together with the Phase 1 research extensions (proof-profile comparison, device-imperfection mapping, and V0.17-TA1 architecture specification). It does not claim to validate the Q-Orbit concept for any operational, procurement, or security purpose.

## Binding Limitations Statement

1. **Zero physical characterization** (CFR B-01/B-02): `physical_characterization: NOT-EXECUTED`; `hardware_in_loop: BLOCKED`; `laser_status: INHIBITED`; `tabuk_run_status: NOT-RUN/NONE`; `key_release_status: QUARANTINED/ZERO-RELEASED`.
2. **No independent end-to-end re-execution** of the V0.16 model has been performed (BLOCKER-1, REQ-01...03 absent).
3. **Individual epsilon values (\(\varepsilon_s\), \(\varepsilon_c\)) unverified** --- the finite penalty 256.5669430839006 bits is one equation in two unknowns (BLOCKER-2).
4. **All margins and key figures are UPPER BOUNDS with respect to error-correction efficiency** (CFR N-27): the fixture's \(\lambda_{EC}\) corresponds to ideal \(f_{EC} = 1\); realistic \(f_{EC} > 1\) would increase leakage by ~10.5 kbits at \(f_{EC} \approx 1.16\).
5. **Seven security-relevant device effects remain unmapped** into any selected proof-compatible representation; five additional effects are proof-profile candidates gated entirely by missing characterization.
6. **The 568/1,113 grid partition is an upper-envelope deterministic screen count**, not a probability, reliability, availability, or mission-success figure (CFR N-07/N-08/N-26).

\newpage

# PART B --- EXECUTIVE SUMMARY

## B.1 What Q-Orbit Is and Is Not

Q-Orbit is a **controlled theoretical study** of a direct satellite-to-ground quantum-key-distribution downlink concept. It freezes an efficient-BB84 weak-coherent-pulse profile with one signal and two decoy intensities (one vacuum), reproduces a reference finite-key fixture from the Sidhu/Lim literature family, and evaluates how the optimized signed finite-key margin responds to controlled perturbations. The study does **not** claim a deployed network, a trusted-relay service, or an arbitrary consumer distribution system. It asks one bounded research question: *If only parameters already represented in the frozen fixture are varied, how does the margin respond, and which source or detector imperfections still lack a selected proof-compatible numerical map?*

## B.2 What Was Verified (Phase 1)

**Numerical core --- independently recomputed and hash-verified:**

- **Baseline reproduction** at 102 s half-window: signed margin **41,338.62418456675 bits**; floored candidate key **41,338 bits**; X-basis QBER **0.017422686665352745**; phase-error bound \(\phi_X\) **0.09270161340569935** --- all bit-identical to the hash-verified run summary (EV-1/EV-1b).
- **Margin identity** \(M = s_{X,0} + s_{X,1} \cdot [1 - h_2(\phi_X)] - \lambda_{EC} - 6 \cdot \log_2(21/\varepsilon_s) - \log_2(2/\varepsilon_c)\) reproduces the baseline **bit-exactly** (EV-2 invariant).
- **Two-parameter screen**: 41 x 41 = **1,681 deterministic points** over controlled extraneous-count (1e-7...2e-6) and intrinsic-QBER (0.003...0.015) ranges; **568 positive / 1,113 nonpositive**; median signed margin **-2,624.946810258186 bits**; minimum **-3,828.414517626367 bits**; maximum **+142,540.7481180454 bits** (EV-1b recomputed from CSV).
- **Local response**: eight parameters ranked by normalized step response; top three: additional system loss (-8.216 %/0.1 dB), detector efficiency (+3.567 %/1 %), repetition rate (+1.946 %/1 %) (EV-1b).
- **Zero-key frontiers**: 16 rows (8 parameters x 2 sides), 10 CROSSING-FOUND, 6 NO-CROSSING; crossing values verified (EV-1b/EV-3).
- **Regression suite**: 12 tests, 12 PASS; 20-check independent package audit, 20 PASS (EV-1c/EV-3).
- **Hash chain**: 9 of 10 artifacts content-verified to declared SHA-256; 17 controlled-input hashes cross-listed 17/17 (EV-1/EV-3).

**Research extensions:**

- **Deliverable 3 (D3)**: Six seeded references verified; two citation findings documented (new-format APS DOI genuine; Tre\x{0301}nyi--Curty misattribution corrected); assumption inventory of the frozen profile (A1--A6) mapped to violating device effects.
- **Deliverable 4 (D4)**: 14-row proof-family comparison matrix; explicit MDI-QKD satellite-downlink exclusion verdict; three-option decision analysis; **Profile A (hardened Lim/Sidhu) recommended as V0.17 shipping proof; Profile B (consolidated decoy-BB84 with imperfections) as V0.18+ upgrade path; numerical SDP as independent cross-check**.
- **Deliverable 5 (D5)**: 15-effect device-imperfection mapping with controlled status labels; **0 of 15 effects MAPPED-IN-CURRENT-FIXTURE**; 5 UNMAPPED-PROOF-REQUIRED, 2 BLOCKING, 2 UNMAPPED-SECURITY-BUDGET, 6 PROOF-PROFILE-CANDIDATE/UNMAPPED-CHARACTERIZATION-REQUIRED; 12-item hidden-substitution watchlist.
- **Deliverable 6 (D6)**: V0.17-TA1 architecture specification --- symbolic parameter registry, epsilon ledger with 21-split validator, Category-1 statistical constructors, Category-2/3 anti-fabrication guards, claim-labeling rules, fixture-compatibility shim.

## B.3 What Was Corrected

- **Grid median/minimum sign discrepancy** (C-01/C-02): Rendering A's Section 4.3 table carried `+2,624.946810258186` and `+3,828.414517626367` --- internally inconsistent with the same table's 568/1,113 split and with the abstract's negative median. The negative values are the computational ground truth; rendering A is quarantined.
- **Tupkary et al. preprint status** (C1, red-team BLOCKING): An earlier claim that arXiv:2601.18035 was published as *Quantum* 10, 2037 (2026) was checked and **removed as false/unverified**; the paper is a **preprint under review** and is cited as such throughout. The *Quantum* 10, 2037 record is a different paper (Wiesemann et al.).
- **D6 "21" decomposition** (C2): The bit-penalty equation was missing two +1 chain-rule constants; corrected to match Lim et al. 2014 supplementary Eqs. (13)--(14) and the frozen fixture value.
- **Composed-epsilon double-count** (C3): An earlier form listed \(\sum_j \delta_j\) separately from \(\varepsilon_{char} \equiv \sum_j \delta_j\); corrected to the single-term additive form.
- **D5 status accounting** (C5): Consolidated verdict corrected to 5 UPR / 2 BLOCKING / 2 USB / 6 PPC-gated or UCR rows; row 11's USB label no longer silently dropped.
- **Anti-fabrication guard completeness** (C6): D6 Section 6 now implements all 12 D5 watchlist items as named guards (AF-1, AF-5, AF-7) with triggers, refusals, and test IDs.
- **Martingale increment-bound classification** (C7): Moved from Category-1 "no physical value" to Category-2 physical characterization input; constructor interface remains Category-1.
- **Ideal-EC disclosure** (C8): Added CFR N-27 and D6 Section 10 disclosure --- all margins are upper bounds w.r.t. error-correction efficiency; \(f_{EC} = 1\) is the frozen fixture's implicit assumption.
- **Submission-readiness token** (C9): Replaced "submission-ready modulo blockers" with the mandated token **READY-WITH-DISCLOSED-LIMITATIONS** for theoretical/numerical record; **BLOCKED** for physical/device/mission claims.
- **CFR factual errors** (C10--C12): Manifest entry count corrected to 64; hash-chain completeness corrected to 9 of 10; window-sweep evidence classes split (max 221 -> EV-3, min 1 -> EV-4).
- **Optimization-bias disclosure** (C15): Added explicit statement that the 568-positive partition is an upper envelope under per-point window re-optimization, not the partition of any fixed-window configuration.

## B.4 What Remains Blocked

| Blocker | Missing Artifact | Impact |
|---------|-----------------|--------|
| REQ-01 | V0.6 manifest JSON (hash-recorded) | End-to-end re-execution; \(\varepsilon_s/\varepsilon_c\) confirmation; channel config values |
| REQ-02 | V0.6 baseline run JSON | Direct confirmation of regression expected values |
| REQ-03 | V0.7 parameter register | Screen range provenance; 1--221 s sweep bound provenance |
| REQ-04 | Original zip bytes | Byte-level hash closure on artifacts 1, 2, 4--8, 10 |
| REQ-05 | `data_processed` registers | Row-level verification of grid boundary, 16-row proof mapping, claim/gate registers |

**Open proof problems (literature gaps, not Q-Orbit failures):**

1. Detector-side correlated afterpulsing in finite-key decoy proofs --- no verified turnkey treatment.
2. Rate-dependent yields inside the decoy method --- no verified re-derived bound.
3. Full composable integration of certification --- Tan & Nahar 2026 Appendix C notes open technical aspects.

## B.5 Scientifically Defensible Conclusion

The exact positive baseline demonstrates deterministic reproduction of the frozen fixture, but the coupled screen shows that positivity is **not robust** across the declared research ranges. The negative median (-2,624.95 bits) is the central result: the nominal point cannot be promoted to a mission claim without evidence-backed distributions and a validated physical model. Seven security-relevant device effects remain outside the selected proof representation, and two more are BLOCKING for any unconditional claim. The defensible conclusion is **not** that a mission is ready, but that evidence and proof incompleteness can be exposed before they are mistaken for design maturity.

\newpage

# PART C --- CORRECTED SCIENTIFIC MANUSCRIPT / RESEARCH REPORT

## Q-Orbit: Fail-Closed Finite-Key Screening for a Satellite QKD Concept

*A controlled theoretical analysis of numerical margin, device-imperfection mapping, and evidence boundaries*

---

**Document ID:** QO-SUB-RP-001 | **Version:** V1.0-RC2 (Phase 1 Interim)  
**Release State:** PRIVATE-BLOCKED | **Technical State:** THEORETICAL / NOT PHYSICALLY VALIDATED  

---

### Abstract

Satellite quantum key distribution is constrained by short optical-access windows and finite detection blocks. This paper reports a controlled theoretical analysis for Q-Orbit, a direct satellite-to-ground key-replenishment concept. The study freezes an efficient-BB84 weak-coherent-pulse profile with three intensities including vacuum, reproduces a reference finite-key fixture, re-optimizes the integration half-window for every evaluated point, and evaluates both local model response and a deterministic two-parameter screen. The reference fixture is reproduced at a 102 s half-window with a signed finite-key margin of **41,338.62418456675 bits** and a floored candidate key of **41,338 bits**. A 41 x 41 screen over controlled extraneous-count and intrinsic-QBER ranges yields **568 positive and 1,113 nonpositive points**, corresponding to a **33.789% grid fraction** and a **median signed margin of -2,624.947 bits**. The grid is not a probability distribution. Seven security-relevant device effects remain unmapped into a selected proof-compatible representation, preventing implementation-security, certification, mission, or procurement claims. The main contribution is an evidence architecture that couples reproducible numerical screening to fail-closed claim controls.

*Keywords: satellite QKD; finite-key analysis; decoy-state BB84; device characterization; evidence control; reproducibility.*

### 1. Introduction

Satellite QKD has been studied as a mechanism for extending quantum key establishment beyond the attenuation limits of terrestrial fibre. In low-Earth orbit, however, a ground station observes a satellite for a limited time, so finite-block statistical effects can dominate the key-length calculation [1]. A positive center-case result is therefore not sufficient evidence of a robust mission capability.

Q-Orbit studies one bounded direct downlink topology. The project does not attempt to claim a deployed network, a trusted-relay service, or an arbitrary remote-consumer distribution system. Instead, it asks whether a reproducible finite-key workflow can be connected to explicit system and evidence gates without converting assumptions into unearned security or performance claims.

#### 1.1 Research Question

If only parameters already represented in a frozen Q-Orbit finite-key fixture are varied, how does the optimized signed finite-key margin respond, and which source or detector imperfections still lack a selected proof-compatible numerical map?

#### 1.2 Contribution

- Exact reproduction of a controlled satellite-QKD finite-key fixture (bit-exact verification against hash-verified artifacts).
- Re-optimization of the integration half-window at every perturbation point.
- A deterministic two-parameter screen with explicit non-probabilistic interpretation.
- A proof-to-device mapping that records unmapped effects rather than inventing penalties.
- A claim-boundary method that separates numerical verification from physical validation and operational security.

### 2. Background and Related Work

#### 2.1 Finite-Block Satellite QKD

Sidhu et al. provide a finite-block analysis for weak-coherent-pulse, efficient-BB84 satellite QKD with three intensities and show that system loss, extraneous counts, protocol parameters, and limited pass duration materially affect single-pass secret-key length [1]. Q-Orbit retains this family as a frozen reference profile for deterministic regression and screening; it does not import the source paper's device or mission values as Q-Orbit evidence.

#### 2.2 Decoy-State Assumptions and Source Flaws

Standard decoy-state methods rely on assumptions about pulse statistics. Nahar et al. analyze imperfect phase randomization and non-identically distributed laser pulses, demonstrating that generalized treatment is required when ideal source assumptions do not hold [2]. Xu et al. show that source flaws must be characterized and integrated into the security analysis rather than hidden inside an ideal preparation model [3].

#### 2.3 Characterization-to-Proof Linkage

Tan and Nahar distinguish device-characterization conclusions from the conditions required by a security proof and identify requirements for justified parameter domains and composable reasoning [4]. This distinction motivates Q-Orbit's refusal to replace missing characterization with a convenient scalar penalty.

### 3. Methods

#### 3.1 Controlled Reference Profile

The analysis retains the V0.6 efficient-BB84 weak-coherent-pulse fixture with one signal intensity and two decoy intensities including vacuum. Expected counts are computed from a modeled reference loss curve. The profile is a software fixture, not a physical device model.

> **Equation 1. Signed finite-key margin.**
>
> \[ M = s_{X,0} + s_{X,1}[1 - h_2(\phi_X)] - \lambda_{EC} - 6 \cdot \log_2(21/\varepsilon_s) - \log_2(2/\varepsilon_c) \]

The candidate key is floor(max(M, 0)) under the frozen fixture convention. The signed quantity M is retained to identify boundary behavior. A nonpositive value is a model outcome; it is not a measured outage or security-failure probability.

#### 3.2 Window Optimization

For every baseline, perturbation, frontier, and grid point, the model evaluates integer half-windows from 1 to 221 s and selects the window that maximizes signed margin. Smaller half-window breaks an exact tie. The rule avoids silently carrying a baseline-optimal window into a changed count/error regime.

#### 3.3 Local Response

Eight parameters already present in the software contract are varied: additional system loss, detector-efficiency multiplier, source repetition rate, signal-intensity multiplier, weak-decoy multiplier, extraneous-count probability, afterpulse probability, and intrinsic QBER. The declared steps are plus/minus 0.1 dB for additional loss and plus/minus 1% relative for the remaining variables. Because the steps and parameter meanings differ, the resulting rank is local and step-dependent.

#### 3.4 Deterministic Coupled Screen

The screen evaluates 41 extraneous-count values from 1e-7 to 2e-6 per pulse and 41 intrinsic-QBER values from 0.003 to 0.015, explicitly including the baseline point. The Cartesian product contains 1,681 deterministic points. The ranges are controlled engineering bounds inherited from V0.7, not calibrated distributions.

#### 3.5 Proof-Mapping Rule

Each source or detector effect is assigned a controlled state: mapped stress only, partial scalar stress, unmapped proof required, unmapped model required, unmapped security budget, or alternative not selected. A numerical penalty is applied only when the scalar is explicitly represented. Unmapped effects remain blocking obligations.

#### 3.6 Verification

The implementation verifies controlled-input hashes, exact baseline outputs, state partitioning of the grid, finite numerical values, boundary invariants, and release-state constraints. Twelve regression tests and a 20-check independent package audit pass. An independent V0.13 implementation previously compared 50 locked vectors over 971 metrics with zero open numerical discrepancies.

### 4. Results

#### 4.1 Baseline Reproduction

| Quantity | Result | Evidence |
|----------|--------|----------|
| Half-window | 102 s | EV-1a (run summary) |
| Signed margin | 41,338.62418456675 bits | EV-1a + EV-2 invariant |
| Floored candidate key | 41,338 bits | EV-1a + EV-2 (floor) |
| X-basis QBER | 0.017422686665352745 | EV-1a + recomputation |
| Phase-error bound \(\phi_X\) | 0.09270161340569935 | EV-1a |
| Single-photon lower bound \(s_{X,1}\) | 183,803.04893680647 | EV-1a |

#### 4.2 Local Response

**Figure 1. Local signed-margin response per declared perturbation step.** *(Modeled / deterministic --- not measured)*

The largest absolute local response is associated with additional system loss (-8.216% of the baseline margin per 0.1 dB step), followed by detector efficiency (+3.567% per 1% relative step) and source repetition rate (+1.946% per 1% relative step). These values describe model response around one fixture point.

#### 4.3 Coupled Screen

**Figure 2. Signed margin across the controlled 41 x 41 screen; the contour indicates the zero-margin boundary at grid resolution.** *(Modeled / deterministic --- not measured)*

| Statistic | Result | Evidence |
|-----------|--------|----------|
| Total points | 1,681 | EV-1b (recomputed) |
| Positive signed margin | 568 | EV-1b |
| Nonpositive signed margin | 1,113 | EV-1b |
| Positive grid fraction | 33.789411% | EV-1b + EV-2 (568/1681) |
| **Median signed margin** | **-2,624.946810258186 bits** | **EV-1b + EV-1a + EV-2** |
| **Minimum / maximum signed margin** | **-3,828.414517626367 / +142,540.7481180454 bits** | **EV-1b + EV-1a** |

**Critical disclosure (CFR N-26/N-07/N-08):** Because the half-window is re-optimized per evaluated point, this partition is an **upper-envelope** quantity relative to any fixed-window evaluation. The positive count at any fixed window is \(\leq 568\). The grid fraction is a deterministic screen partition, not a probability, reliability, availability, or mission-success figure.

#### 4.4 Unmapped Device Effects

| Effect | Current State | Claim Consequence |
|--------|--------------|-------------------|
| Incomplete phase randomization | UNMAPPED-PROOF-REQUIRED | Standard decoy applicability not established |
| Pulse/intensity correlations | UNMAPPED-PROOF-REQUIRED | IID pulse assumption not established |
| State-preparation flaws/leakage | UNMAPPED-PROOF-REQUIRED | Aggregate QBER is insufficient |
| Dead time, recovery, saturation | UNMAPPED-MODEL-REQUIRED | Detector/rate interpretation blocked |
| Efficiency mismatch | UNMAPPED-PROOF-REQUIRED | Receiver measurement model incomplete |
| Characterization confidence | UNMAPPED-SECURITY-BUDGET | No certification-to-proof guarantee |
| Aging/cross-instance memory | UNMAPPED-MODEL-REQUIRED | Persistent operation claim blocked |

*(Table shows 7 of 15 mandated effects; full matrix in Part G.)*

### 5. Discussion

#### 5.1 Positive Baseline versus Non-Robust Design Space

The exact positive baseline demonstrates deterministic reproduction, but the coupled screen shows that positivity is not robust across the declared research ranges. The negative median is especially important: the nominal point cannot be promoted to a mission claim without evidence-backed distributions and a validated physical model.

#### 5.2 Why QBER Alone Is Insufficient

The finite-key expression also depends on vacuum and single-photon bounds, phase-error estimation, error-correction leakage, finite penalties, and the complete protocol profile. QBER cannot certify phase randomization, source leakage, detector mismatch, authentication, endpoint behavior, or key-management state.

#### 5.3 Model Response Is Not Device Specification

The one-parameter frontiers and local ranks freeze other variables and use arbitrary but declared steps. They are useful for finding fragile regions of the software fixture, but they are not tolerances, procurement filters, calibration limits, or security-proof domains.

#### 5.4 Fail-Closed Evidence Handling

The absence of a numerical penalty for an unmapped effect is intentional. Assigning a convenient penalty would create an appearance of completeness without a proof basis. The fail-closed rule keeps the gap visible and prevents numerical output from widening the claim.

### 6. Limitations

- The reference loss curve and expected counts are modeled rather than measured.
- Baseline reproduction does not provide an independent security proof.
- Binary64 arithmetic is used; interval and arbitrary-precision sensitivity remain untested.
- Only the half-window is globally searched; protocol probabilities and most intensities remain frozen.
- The coupled ranges are engineering bounds rather than probability distributions.
- No source, detector, atmosphere, parcel, orbit authority, hardware, or operational security evidence is used.
- The study does not predict Tabuk availability, yield, or mission success.
- All margins are upper bounds w.r.t. error-correction efficiency (frozen fixture assumes \(f_{EC} = 1\); realistic \(f_{EC} > 1\) would reduce margin).

### 7. Conclusion

Q-Orbit demonstrates a reproducible theoretical workflow for finite-key satellite-QKD screening and makes the limitations of that workflow machine-checkable. The controlled fixture reproduces exactly, but the coupled screen is dominated by nonpositive cases and several device effects remain outside the selected proof representation. The scientifically defensible conclusion is not that a mission is ready, but that evidence and proof incompleteness can be exposed before they are mistaken for design maturity.

The next theoretical research task is a proof-profile selection and parameter-domain mapping for phase randomization, source flaws, pulse correlations, detector history, detector mismatch, and characterization confidence. Hardware procurement and field operation are neither required nor authorized for this submission.

### Data and Reproducibility Statement

The controlled V0.16-TA1 package contains the frozen input index, executable model, generated CSV outputs, workbook, regression results, audits, and cryptographic hashes needed to reproduce the reported software results. Distribution remains private. Modeled candidate key material is not real key material and remains quarantined. Independent end-to-end re-execution is blocked pending controlled inputs REQ-01...03.

### References

[1] J. S. Sidhu et al., *Finite key effects in satellite quantum key distribution*, npj Quantum Information 8, 18 (2022). DOI: 10.1038/s41534-022-00525-3

[2] S. Nahar, T. Upadhyaya, and N. L\x{00FC}tkenhaus, *Imperfect phase randomization and generalized decoy-state quantum key distribution*, Physical Review Applied 20, 064031 (2023). DOI: 10.1103/PhysRevApplied.20.064031

[3] F. Xu et al., *Experimental quantum key distribution with source flaws*, Physical Review A 92, 032305 (2015). DOI: 10.1103/PhysRevA.92.032305

[4] E. Y.-Z. Tan and S. Nahar, *Incorporating Device Characterization into Security Proofs*, PRX Quantum 7, 020342 (2026). DOI: 10.1103/f42p-524t

[5] C. C.-W. Lim et al., *Concise security bounds for practical decoy-state quantum key distribution*, Physical Review A 89, 022307 (2014). DOI: 10.1103/PhysRevA.89.022307

[6] H.-K. Lo, X. Ma, and K. Chen, *Decoy State Quantum Key Distribution*, Physical Review Letters 94, 230504 (2005). DOI: 10.1103/PhysRevLett.94.230504

\newpage

# PART D --- CONCISE ENGINEERING ARCHITECTURE SECTION

## D.1 V0.17-TA1 Architecture at a Glance

**Objective:** Convert the 15 unmapped or partially mapped device imperfections into bounded, proof-compatible parameter specifications --- symbolic parameters with declared proof entry points, declared evidence requirements, and declared confidence accounting --- **without inventing any empirical value**.

**Frozen (immutable regression reference):**
- V0.16-TA1 fixture: margin equation, 8 software-contract scalars, 41x41 deterministic screen, window rule, 12-test regression suite, 20-check audit, all locked numerics.
- Prohibited-claims register and boundary states.
- V0.17 must reproduce V0.16 **bit-exactly** in compatibility mode.

**New (additive, non-destructive):**
1. **Symbolic parameter registry** --- all Section 3 parameters tagged `SYMBOLIC ONLY --- CHARACTERIZATION REQUIRED` unless exempt.
2. **Epsilon ledger with union combiner and 21-split validator** --- \(\varepsilon_{total} = \varepsilon_c + \varepsilon_s + \varepsilon_{char} (+ \varepsilon_{auth})\) with \(\varepsilon_{char} \equiv \sum_j \delta_j\) defined once; validates effective deviation parameter \(\varepsilon_s/21\) per bound.
3. **Category-1 statistical constructors** --- Clopper--Pearson, Hoeffding, Serfling/Fung \(\gamma\), Azuma/Kato interfaces (pure functions; assign no physical value).
4. **Anti-fabrication guards** --- Category 2 (refuse uncharacterized scalars) and Category 3 (refuse proof-requiring features as scalar tweaks).
5. **Claim labeling** --- every output carries claim class: CONDITIONAL / CHARACTERIZED-CONDITIONAL / ENGINEERING-SENSITIVITY.

## D.2 Layered Target Architecture

| Layer | Content | Status |
|-------|---------|--------|
| **Layer 0 --- Frozen V0.16 fixture** | Immutable regression reference: locked margin equation, 12-test regression, 20-check audit, 1,681-point screen | In place; NUMERICALLY-VERIFIED |
| **Layer 1 --- Hardened analytic finite-key** | Profile A: Lim/Sidhu skeleton + Kato/Mannalath statistics + per-claim assumption ledger + 21-split validator + epsilon ledger | V0.17-TA1 shipping proof |
| **Layer 2 --- Implementation-security extensions** | Profile B terms (imperfect PR, SPFs, correlations, leakage) supplying admissible parameter bounds; symbolic until characterization exists | V0.18+ upgrade path |
| **Layer 3 --- Characterization/certification composition** | Tan & Nahar certify-then-run: robust set \(S_{robust}\), per-parameter CIs, union-bound \(\varepsilon_{char}\), joint failure-bound claim language | Framework specified; execution BLOCKED pending characterization |

## D.3 Key Software Modules (V0.17)

| Module | Function | Guard |
|--------|----------|-------|
| `registry` | Symbolic parameter objects with (name, symbol, meaning, proof entry point, evidence pointer, status, envelope) | Default status: SYMBOLIC ONLY |
| `ledger` | Epsilon union combiner, 21-split validator, no-double-count guard | Rejects \(\sum_j\delta_j\) alongside \(\varepsilon_{char}\); accepts fixture's internal \(\beta = \ln(21/\varepsilon_s)\) |
| `stats` | Category-1 constructors: CP, Hoeffding, Serfling \(\gamma\), Azuma/Kato interface, worst-case endpoint selector, conditional evaluator | Refuses point estimates; watermarks ASSUMED-input outputs |
| `guards` | Category-2/3 refusal layer + 12-item watchlist coverage (AF-1...AF-12) | Refuse SPF->QBER, afterpulse->p_ext, dead-time->constant \(\eta\), uncharacterized increment bounds, empty leakage fields, mismatch-under-R3, variable-length mislabeling |
| `fixture_shim` | V0.16 evaluation path preserved unmodified | Regression invariants blocking |

## D.4 Verification Tests for V0.17

1. **Regression invariants (blocking):** V0.16 fixture reproduces bit-exactly --- baseline margin, floored key, QBER, \(\phi_X\), \(s_{X,1}\), finite penalty, grid partition, grid median/minimum, 12/12 tests, 20/20 audit.
2. **Refusal-behavior tests:** Each Category-2/3 guard exercised with positive (must refuse) and negative (must accept) cases.
3. **Watermark presence tests:** Any output with \(\geq 1\) ASSUMED input carries `NO SECURITY CLAIM --- CONDITIONAL COMPUTATION`.
4. **Ledger arithmetic tests:** Additive union combiner exactness; no-double-count guard; 21-split validator accepts documented non-uniform splits; positive acceptance test on frozen fixture.
5. **Boundary behavior:** 16-row x 2-side frontier structure and 10/6 crossing split reproduce; defensive zeroing on decoy-ordering violation remains fail-closed.

\newpage

# PART E --- VERIFIED NUMERICAL-RESULTS TABLE

## E.1 Computational Ground Truth (Locked 2026-08-27)

| ID | Quantity | Canonical Value | Evidence Class |
|----|----------|-----------------|----------------|
| N-01 | Baseline half-window | 102 s (205 sample bins; edge elevation 30.4813547009598 degrees) | EV-1a + EV-1b |
| N-02 | Signed margin M | 41,338.62418456675 bits | EV-1a; invariant recomputed bit-exact (diff 0.0) |
| N-03 | Floored candidate key | 41,338 bits | EV-1a + EV-2 (floor) |
| N-04 | X-basis QBER | 0.017422686665352745 (= m_x/n_x) | EV-1a + recomputation |
| N-05 | Phase-error bound \(\phi_X\) | 0.09270161340569935 | EV-1a |
| N-06 | \(s_{X,1}\) | 183,803.04893680647 | EV-1a |
| N-16 | \(n_X\) | 492,818.0901525894 | EV-1a |
| N-17 | \(n_Z\) | 48,555.17200782972 | EV-1a |
| N-18 | \(m_X\) | 8,586.215167746126 | EV-1a |
| N-19 | \(s_{X,0}\) | 5,047.784882329125 | EV-1a |
| N-20 | \(s_{Z,1} / v_{Z,1}\) | 12,007.470453438744 / 845.9615478747239 | EV-1a |
| N-21 | \(\lambda_{EC}\) | 65,385.40180119235 bits | EV-1a |
| N-22 | Finite penalty \(6 \cdot \log_2(21/\varepsilon_s)+\log_2(2/\varepsilon_c)\) | 256.5669430839006 bits | EV-1a; pair (\(\varepsilon_s=10^{-10}\), \(\varepsilon_c=10^{-9}\)) reproduces bit-exactly but non-uniquely --- individual epsilons EV-9 |
| N-23 | Mean photon number (probability-weighted) | 0.62400964 | EV-1a |

## E.2 Screen and Sensitivity Results

| ID | Quantity | Canonical Value | Evidence Class |
|----|----------|-----------------|----------------|
| N-07 | Grid partition | 568 positive / 1,113 nonpositive / 1,681 total --- **upper-envelope** under per-point window re-optimization; not a fixed-window partition | EV-1b + EV-1a + EV-2 |
| N-08 | Positive grid fraction | 0.33789411064842356 = 33.789411% --- same upper-envelope disclosure | EV-1b + EV-1a + EV-2 |
| N-09 | **Grid median signed margin** | **-2,624.946810258186 bits** | EV-1b + EV-1a + EV-2 |
| N-10 | **Grid minimum signed margin** | **-3,828.414517626367 bits** | EV-1b + EV-1a + EV-2 |
| N-11 | Grid maximum signed margin | +142,540.7481180454 bits | EV-1b + EV-1a |
| N-12 | Local responses (normalized per declared step) | Rank 1: additional loss -0.08215788925285143 (-8.216%/0.1 dB); Rank 2: detector efficiency +0.035673639848324994 (+3.567%/1%); Rank 3: repetition rate +0.01946358671353013 (+1.946%/1%); Ranks 4--8: extraneous count, intrinsic QBER, signal intensity, weak decoy, afterpulse | EV-1b (arithmetic re-verified) + EV-1c |
| N-24 | Zero-key frontiers (16 rows, 10 CROSSING-FOUND) | e.g., additional loss HIGH crossing at 14.507927510764345 dB; p_ec HIGH at 8.958206093312436e-07; intrinsic QBER HIGH at 0.013335017073411072 | EV-1c + EV-3 |
| N-13 | Regression suite | 12 tests, 12 PASS | EV-1c + EV-1a + EV-3 |
| N-14 | Independent package audit | 20 checks, 20 PASS | EV-1c + EV-3 |
| N-25 | V0.13 independent comparison | 50 vectors / 971 metrics, zero open numerical discrepancies | EV-3 |
| N-26 | Frontier/sweep detail | Window re-optimized per evaluated point; baseline windows vary at perturbation points | EV-1b |
| N-27 | \(\lambda_{EC}\) disclosure | Corresponds to **ideal \(f_{EC} = 1\)** minimum-error-correction-leakage accounting; realistic \(f_{EC} > 1\) would increase leakage; all margins/keys are **UPPER BOUNDS w.r.t. EC efficiency** | EV-1a + EV-2 |

## E.3 Evidence-Class Definitions

- **EV-1a** HASH-VERIFIED-ARTIFACT --- extracted artifact bytes reproduce declared SHA-256 exactly.
- **EV-1b** CSV-RECOMPUTED --- recomputed directly from supplied generated CSV.
- **EV-1c** HASH-CHAIN-LISTED --- artifact's declared SHA-256 is listed in verified SHA256SUMS manifest.
- **EV-2** INVARIANT --- determined by mathematical invariant over stated controlled counts.
- **EV-3** CROSS-ARTIFACT --- identical across >=2 independent controlled artifacts.
- **EV-9** UNVERIFIED-PENDING-CONTROLLED-INPUTS --- requires artifacts not present in the 10-file bundle.

\newpage

# PART F --- PROOF-PROFILE RECOMMENDATION

## F.1 Recommendation Summary (from D4)

**Adopted for Q-Orbit:**

1. **Profile A, hardened, is the V0.17-TA1 shipping proof.** The frozen F4/F3 construction (Lim 2014 / Sidhu 2022 lineage) is retained because it is the family the locked, NUMERICALLY-VERIFIED numerics already instantiate, it is the satellite standard, and it is the most auditable under the Phase 1 red-team gate. Two mandatory hardening actions: (i) an **assumption ledger per claim** --- every rate statement carries its six assumption classes explicitly; (ii) a **statistics upgrade** to Kato's inequality or Mannalath--Zapatero--Curty sharp statistics (drop-in at the fixture level), the cheapest way to shrink the 256.57-bit-class penalty without changing proof family. All Profile A outputs remain CONDITIONAL-COMPUTATION-labeled while characterization is absent.

2. **Profile B is the V0.18+ upgrade path.** The consolidated decoy-BB84 proof with imperfections (Tupkary et al., arXiv:2601.18035 (2026, **preprint** --- under review)) is the designated anchor, with the unified source-imperfection framework (Curras-Lorenzo et al., *Optica Quantum* 3, 525 (2025)) for joint flaw coverage. Adoption is gated on the characterization inputs each term requires (state overlaps, phase-PDF bound, intensity intervals, isolation/distinguishability budgets) --- until then its imperfection terms remain symbolic.

3. **Numerical SDP is the independent cross-check, not the shipping proof.** OpenQKDsecurity-class numerics are to be run as an independent cross-check of the Profile A margins at selected grid points, and positioned as the certification end-state aligned with Tan & Nahar 2026. Rationale for not shipping in Phase 1: high tooling and interval-arithmetic verification cost, reduced line-by-line auditability, and finite-key constants at \(n \approx 5 \times 10^5\) per pass not yet superior to the analytic bound.

4. **MDI-QKD is excluded architecturally** from the Q-Orbit proof path: incompatible with a direct satellite-to-ground downlink (no relay between two senders; the ground receiver is precisely the party whose trust is at issue). Logged as an architectural alternative only.

## F.2 Rejected Alternatives (with Reasons)

| Rejected Alternative | Reason |
|---------------------|--------|
| Numerical SDP as Phase 1 shipping proof | High tooling/verification cost; reduced auditability; constants not superior at Q-Orbit block sizes |
| MDI-QKD as detector-side answer | Architecturally incompatible with direct downlink; requires uplink or dual-downlink relay redesign |
| GLLP \(\Delta\) bolt-on as sufficient source-flaw coverage | Covers only basis-independent flaws; real flaws are basis-dependent; unmeasured \(\Delta\) is a hidden assumption |
| EAT as primary finite-key proof | Constants historically worse at satellite block sizes; prepare-and-measure decoy instantiation still maturing |
| Absorbing imperfections into existing scalars | Prohibited hidden substitution: phase-randomization defects \(\notin\) QBER; source leakage \(\notin\) loss; mismatch \(\notin\) scalar \(\eta\) |
| Representing nominal/datasheet values as security bounds | A proof valid at a point value does not establish a robust domain (Tan & Nahar 2026) |

## F.3 Layered Architecture Target

| Layer | Content | Status |
|-------|---------|--------|
| Layer 0 --- Frozen V0.16 fixture | Immutable regression reference | In place; NUMERICALLY-VERIFIED |
| Layer 1 --- Hardened analytic finite-key (optical/count) | Profile A hardened: Lim/Sidhu + Kato/Mannalath stats + assumption ledger + 21-split validator + epsilon ledger | V0.17-TA1 shipping proof |
| Layer 2 --- Implementation-security proof extensions | Profile B terms supplying admissible parameter bounds; symbolic until characterization | V0.18+ upgrade path |
| Layer 3 --- Characterization/certification composition | Tan & Nahar certify-then-run: \(S_{robust}\), per-parameter CIs, \(\varepsilon_{char}\), joint bound | Framework specified; execution BLOCKED |

\newpage

# PART G --- DEVICE-IMPERFECTION MAPPING SUMMARY

## G.1 Master Matrix --- 15 Mandated Effects

| # | Device Effect | Current Scalar Model | Security Relevance | Current Status (Fail-Closed) |
|---|---------------|---------------------|-------------------|------------------------------|
| 1 | Incomplete phase randomization | None --- perfect PR assumed | Proof-modifying, architectural: \(\tau_n\) decomposition fails without PR; all decoy estimators unfounded | **UNMAPPED-PROOF-REQUIRED** |
| 2 | Pulse-to-pulse correlations (encoding memory) | None --- fixture assumes IID | Proof-modifying: breaks conditional independence, decoy structure, random-sampling bound | **UNMAPPED-PROOF-REQUIRED** |
| 3 | Intensity correlations (pulse-to-pulse) | None --- TH-PAR-004/005 are exact scalars | Proof-modifying: breaks IID structure making \(p_{k|n}\) well-defined; setting-revealing to Eve | **PROOF-PROFILE-CANDIDATE** gated by UNMAPPED-CHARACTERIZATION-REQUIRED |
| 4 | State-preparation (encoding) flaws | Absorbed into scalar QBER (TH-PAR-008) --- basis-independent part only | Proof-modifying: basis-dependent flaws invalidate \(\phi_X\) bound; GLLP \(\Delta\) covers only basis-independent | **UNMAPPED-PROOF-REQUIRED** (basis-dependent part); TH-PAR-008 touch: PARTIAL-SCALAR-STRESS-ONLY |
| 5 | Source leakage / distinguishability | None --- no fixture scalar | Proof-modifying: side-channel modes leak setting info with zero QBER signature; active TH leakage | **BLOCKING** (active leakage component governs) |
| 6 | Dead time / recovery | None --- TH-PAR-002 is rate-independent | Escalates to proof-modifying: rate-dependent mismatch, adversarial dead-time attack | **UNMAPPED-SECURITY-BUDGET** (strictest resolution) |
| 7 | Saturation | None --- fixture count model is linear | BLOCKING above linear regime: entry point of detector-control class | **BLOCKING** |
| 8 | Detector timing jitter | Window-average of \(\eta(t)\) can inform TH-PAR-002 | Proof-modifying when inter-detector/basis asymmetry exists (time-shift attack enabler) | **UNMAPPED-CHARACTERIZATION-REQUIRED** |
| 9 | History-dependent afterpulsing | TH-PAR-007 = equilibrium IID marginal only | History/rate/basis-dependent part proof-modifying; breaks slot-IID statistics | **UNMAPPED-PROOF-REQUIRED**; scalar: PARTIAL-SCALAR-STRESS-ONLY |
| 10 | Detection-efficiency mismatch | Single \(\eta\) multiplier (TH-PAR-002) = hidden substitution | Proof-modifying --- canonical detector-side gap; Eve's mode choice gives knowledge | **PROOF-PROFILE-CANDIDATE** gated by UNMAPPED-CHARACTERIZATION-REQUIRED |
| 11 | Wavelength-dependent response | TH-PAR-002 at design \(\lambda\) only | Out-of-band response = unmodeled Eve->receiver channel | **UNMAPPED-SECURITY-BUDGET** |
| 12 | Polarization-dependent response | TH-PAR-002 = polarization average | Proof-modifying when detector-differential or basis-coupling | **PROOF-PROFILE-CANDIDATE** gated by UNMAPPED-CHARACTERIZATION-REQUIRED |
| 13 | Detector memory (general cross-pulse) | None --- TH-PAR-006 forbidden to carry correlations | Proof-modifying at statistical core: breaks slot-IID finite-key statistics | **UNMAPPED-PROOF-REQUIRED** |
| 14 | Characterization uncertainty | None --- fixture treats every input as exact constant | Meta-level proof-modifying: point estimates re-introduce point-value fallacy | **UNMAPPED-CHARACTERIZATION-REQUIRED** |
| 15 | Aging / cross-instance drift | None --- fixture scalars are time-invariant | Meta-level: CI valid at \(t_1\) is not evidence at \(t_2\) without drift bounds | **UNMAPPED-CHARACTERIZATION-REQUIRED** |

**Consolidated verdict:** 0 of 15 effects are MAPPED-IN-CURRENT-FIXTURE. **5 rows UNMAPPED-PROOF-REQUIRED** (1, 2, 4, 9, 13), **2 rows BLOCKING** (5, 7), **2 rows UNMAPPED-SECURITY-BUDGET** (6, 11), **6 rows PROOF-PROFILE-CANDIDATE or UNMAPPED-CHARACTERIZATION-REQUIRED** (3, 8, 10, 12, 14, 15).

## G.2 Fixture-Scalar Touch Map (TH-PAR-001...008)

| Scalar | Meaning | Touches Effect(s) | Nature of Contact |
|--------|---------|-------------------|-------------------|
| TH-PAR-001 | Additional system loss (dB) | None of the 15 | Channel-side engineering scalar |
| TH-PAR-002 | Detector-efficiency multiplier | 6, 7, 8, 10, 11, 12 | PARTIAL-SCALAR-STRESS-ONLY in each case |
| TH-PAR-003 | Repetition rate | None directly | Sets rate context only |
| TH-PAR-004 | Signal intensity \(\mu_1\) | Adjacent to 3 (via C S3) | PARTIAL-SCALAR-STRESS-ONLY for independent fluctuation sweeps |
| TH-PAR-005 | Weak-decoy intensity \(\mu_2\) | Adjacent to 3 (via C S3) | As TH-PAR-004 |
| TH-PAR-006 | Extraneous-count probability | 9 (boundary condition) | Legitimate ONLY for IID dark/background counts |
| TH-PAR-007 | Afterpulse probability | 9 | Equilibrium IID marginal only --- PARTIAL-SCALAR-STRESS-ONLY |
| TH-PAR-008 | Intrinsic QBER | 4 (partially) | Absorbs only basis-independent, stochastic-symmetric component |

## G.3 Hidden-Substitution Watchlist (Prohibited Moves)

1. Basis-dependent SPF -> QBER scalar (TH-PAR-008)
2. Correlations -> scalar intensity jitter (TH-PAR-004/005)
3. Nominal intensity -> fluctuation bound
4. Imperfect phase randomization -> added QBER
5. Afterpulse correlations -> IID extraneous-count term (TH-PAR-006)
6. Efficiency mismatch -> single \(\eta\) (TH-PAR-002)
7. Dead time / recovery / saturation -> constant \(\eta\) or "noise" QBER
8. Security claims with empty leakage/isolation fields
9. Point estimates -> confidence intervals (without CI, \(\delta\), envelope)
10. Drift extrapolation -> constant parameters
11. Variable-length / adaptive key outputs -> fixed-length \(\varepsilon_s/\varepsilon_c\) semantics
12. "Certified secure" / conditional-on-approval language

\newpage

# PART H --- SELECTED EXISTING ENGINEERING FIGURES

## H.1 Figures Referenced in Package

The following figures are referenced in the corrected manuscript (Part C) and are available in the controlled V0.16-TA1 artifact bundle. All captions carry evidence-class labels.

| Figure | Title | Source Artifact | Evidence Class | Caption Requirement |
|--------|-------|-----------------|----------------|---------------------|
| **Figure 1** | Local signed-margin response per declared perturbation step | Generated from 06_Local_Sensitivity.csv | EV-1b (modeled / deterministic) | Caption must state: "Modeled fixture response; not a device tolerance or security-proof domain" |
| **Figure 2** | Signed margin across the controlled 41 x 41 screen; contour indicates zero-margin boundary at grid resolution | Generated from 05_Two_Parameter_Screen.csv | EV-1b (modeled / deterministic) | Caption must state: "Deterministic screen partition; not a probability distribution, reliability, or availability figure. Upper envelope under per-point window re-optimization" |

**Note:** The actual figure rendering files are not included in this interim text package; they are generated from the hash-verified CSV artifacts (05, 06) and must be rendered with the mandatory caption language above. The zero-margin boundary is grid-resolution-limited (41 extraneous rows, 21 with no positive cell) --- class GRID-RESOLUTION-NOT-ANALYTIC-THRESHOLD.

\newpage

# PART I --- PHASE 1 GATE STATUS

## I.1 Deliverable Status

| Deliverable | Status | Notes |
|-------------|--------|-------|
| **D1 --- Executive Audit** | COMPLETE | Phase 1 Canonical Audit Section A; artifact inventory, hash chain, baseline reproduction, grid recomputation, sign-discrepancy resolution, sensitivity/frontier verification, audit JSON cross-check |
| **D2 --- Numerical Consistency Table** | COMPLETE | Audit Section B; all mandated rows covered; EV-* evidence classes applied; sign corrections C-01/C-02 documented |
| **D3 --- Literature and Proof Review** | COMPLETE | Verified citation ledger (6 seeded + supplementary); assumption inventory A1--A6; proof-family survey F1--F8; security-budget findings; citation-hygiene rules |
| **D4 --- Proof-Profile Comparison** | COMPLETE | 14-row matrix; MDI-QKD exclusion verdict; three-option analysis; Profile A/B recommendation; rejected alternatives with reasons |
| **D5 --- Device-Imperfection Mapping** | COMPLETE | 15-effect master matrix; interaction flags; hidden-substitution watchlist (12 items); engineering-vs-proof split; open proof problems |
| **D6 --- V0.17-TA1 Architecture Spec** | COMPLETE | Symbolic parameter registry; epsilon ledger; Category-1 constructors; Category-2/3 guards; claim labeling; fixture-compatibility shim; verification tests |
| **D7 --- Revised Manuscript V1.0-RC2** | <font color="#27ae60"><b>COMPLETE</b></font> | This package, Part C; all Phase 1 corrections applied; claim-control labels intact |
| **D8 --- Reviewer Report** | NOT STARTED | Phase 2 item; requires D7 finalization |
| **D9 --- Submission Checklist** | NOT STARTED | Phase 2 item; updated at every gate |
| **D10 --- Next-Step Research Backlog** | SEED INCLUDED | V0.17 spec Section 11; P0--P3 priorities defined |

## I.2 Gate Conditions (Phase 1 -> Phase 2)

Per the Deliverable Specifications, Phase 2 may start when:

1. Phase 1 package passes red-team review (Agent G) with no undispositioned criticism. **All 16 findings C1--C16 dispositioned FIXED** (Section 6 of red-team review).
2. D2 closure achieved (10-artifact bundle audited; computational ground truth locked in CFR Section 2). **Residual REQUIRED INPUT / BLOCKER register (REQ-01...05) is disclosed** --- user explicitly accepts submission posture with these items disclosed, including the standing declaration that no independent end-to-end re-execution has been performed.
3. **User confirms Phase 2 scope** --- pending.

## I.3 Red-Team Verdict

**Overall package verdict: MAJOR-REVISION -> FIXED.** All 16 criticisms dispositioned. The numerical core (D1/D2 substance, CFR Section 2) survives attack almost intact. The citation layer (D3/D4) and architecture text (D6) required corrections that have been applied. No BLOCKED criticism remains undispositioned.

\newpage

# PART J --- REMAINING BLOCKERS

## J.1 Required Input / Blocker Register

| Blocker ID | Missing Artifact | Declared Hash (prefix) | Unblocks | Current Impact |
|------------|-----------------|------------------------|----------|----------------|
| **REQ-01** | `controlled_inputs/v0.6/Q-Orbit_CASE-S1_Run_Manifest_V0.6.json` | 0714d6e7... | End-to-end re-execution; \(\varepsilon_s/\varepsilon_c\) confirmation; intensities, probabilities, channel config | **No claim of independent re-execution may be made** |
| **REQ-02** | `controlled_inputs/v0.6/CASE-S1-REF-001_Baseline_Run_V0.6.json` | 3673acf4... | Direct confirmation of regression expected values | Regression expected values not independently confirmed against original fixture |
| **REQ-03** | `controlled_inputs/v0.7/Q-Orbit_CASE-M1_Parameter_and_Provenance_Register_V0.7.csv` | fb07b900... | Screen range provenance; 1--221 s sweep bound provenance | Screen ranges corroborated from 05/08 but not proven to be exact V0.7 register values |
| **REQ-04** | Original (non-PDF) bytes of `Q-Orbit_Kimi_Core_Research_Input.zip` | --- | Byte-level hash closure on artifacts 1, 2, 4--8, 10 | 9 of 10 artifacts content-verified via deterministic PDF-repair; 01 compiles but not byte-reconstructed |
| **REQ-05** | `data_processed/Q-Orbit_V0.16-TA1_Grid_Boundary.csv` (28b9fef2...), `..._Imperfection_to_Proof_Mapping.csv` (9907aa34...), `..._Claim_Boundary_Register.csv` (bc864414...), `..._Gate_Register.csv` (a008f748...), `..._Parameter_Catalog.csv` (fb9260f3...) | --- | Row-level verification of grid boundary, 16-row proof mapping, claim/gate registers | Fixture's 16-row/7-unmapped mapping inferred but not row-level verified |

## J.2 Open Proof Problems (Literature Gaps)

These constrain which proof profiles V0.17 can select; they are documented so that no future phase mistakes them for resolved items or Q-Orbit-specific defects:

1. **Detector-side correlated afterpulsing in finite-key decoy proofs.** Verified physical models exist; martingale concentration tools exist; no verified literature delivers a complete finite-key decoy-state security proof with correlated afterpulse noise for this fixture class.
2. **Rate-dependent yields inside the decoy method.** The decoy identity (intensity-independent photon-number yields) fails whenever \(\eta = \eta(\text{rate})\); no verified turnkey re-derived bound found.
3. **Full composable integration of certification.** Tan & Nahar 2026 Appendix C notes some technical aspects remain open; Q-Orbit adopts the conservative union bound instead.
4. **Complete correlated-memory detector treatment.** Partial tools exist (preprint-level and verified) but no complete bounded-memory detector model inside a finite-key decoy proof for this fixture.

## J.3 Impact on Submission Posture

- **Theoretical/numerical record:** READY-WITH-DISCLOSED-LIMITATIONS --- all headline numerics are hash-verified or recomputed; limitations are listed above and in the Canonical Audit Section A.4.
- **Physical/device-security/mission/procurement claims:** BLOCKED --- fail-closed. The REQ register and open proof problems prevent any such claim.
- **Manuscript V1.0-RC2:** Submission-ready for **theoretical review** only; not for journal submission claiming experimental validation or device security.

\newpage

# PART K --- ROADMAP TO SUNDAY FINAL SUBMISSION

## K.1 Timeline (Assuming Sunday = 2026-08-30)

| Day | Date | Task | Owner | Deliverable |
|-----|------|------|-------|-------------|
| **Fri** | 2026-08-28 | User confirms Phase 2 scope; any REQ artifact supply | User / Agent | Scope confirmation |
| **Fri--Sat** | 2026-08-28/29 | D8 --- Simulated reviewer report (3 personas) + response-to-reviewers | Agent | D8 draft |
| **Sat** | 2026-08-29 | D9 --- Submission checklist closure; figure rendering with mandatory captions; .docx generation | Agent | D9 draft; rendered figures; .docx |
| **Sat--Sun** | 2026-08-29/30 | Final proofread; claim-control label sweep; prohibited-claims register verification; citation-hygiene final check | Agent + User | Final package |
| **Sun** | 2026-08-30 | **FINAL SUBMISSION** | User | Complete package (Markdown + .docx + figures + manifest) |

## K.2 Phase 2 Tasks (Detailed)

### K.2.1 D8 --- Reviewer Report

**Three simulated reviews:**
1. **Quantum-cryptography theorist** --- security assumptions, composability, decoy validity, finite-key correctness, "21" decomposition, \(\varepsilon_{char}\) accounting, ideal-EC disclosure.
2. **Experimental QKD/device specialist** --- source/detector realism, characterization requirements, measurement-to-proof mapping, D5 status integrity, guard completeness.
3. **Scientific-method/reproducibility reviewer** --- numerical reproducibility, claims, statistics, terminology, evidence hierarchy, hash-chain completeness.

**Each review:** Major comments / Minor comments / Required corrections / Recommendation in {ACCEPTABLE-THEORETICAL-DRAFT, MAJOR-REVISION, BLOCKED}.

**Response summary:** Every criticism dispositioned FIXED / MITIGATED / EXPLICIT LIMITATION / BLOCKING OPEN ISSUE, with manuscript edit pointers.

### K.2.2 D9 --- Submission Checklist

PASS / FAIL / BLOCKED table over:
- Numerical consistency
- References verified
- Equation consistency
- Figure consistency
- Claim boundaries
- Reproducibility
- Physical-validation language
- Proof completeness
- Manuscript formatting

Rule: any BLOCKED row implies package cannot ship; FAIL rows must name owner artifact and fix path.

### K.2.3 Figure Rendering and Caption Compliance

- **Figure 1** (local sensitivity): Render from 06_Local_Sensitivity.csv; caption must include "Modeled fixture response; not a device tolerance or security-proof domain."
- **Figure 2** (two-parameter screen): Render from 05_Two_Parameter_Screen.csv; caption must include "Deterministic screen partition; not a probability distribution, reliability, or availability figure. Upper envelope under per-point window re-optimization."
- Both captions must carry evidence-class label: EV-1b (modeled / deterministic).

### K.2.4 Final Manuscript Polish

- Title: retain unless justified change emerges from D8.
- Abstract: all numbers = resolved D2 ground truth (negative median/minimum).
- Introduction: research question (both stages); contribution statement reproduced/newly analyzed/proposed/unresolved explicitly separated.
- Related work: D3-verified citations only.
- Methods: mathematical definitions (notation table); margin equation cross-checked against primary source.
- Results: corrected signs; every figure caption evidence-labeled.
- Discussion: grid-fraction != probability; proof-to-device section (D5 condensed); security-budget section (D6 symbolic budget).
- Limitations: all disclosed limitations listed.
- Conclusion: no prohibited claims.
- Reproducibility statement: V0.16 package contents + hash verification procedure.
- References: D3-verified only; preprint labels where required.
- Claim ledger: attached as appendix.

### K.2.5 .docx Generation

- Markdown source -> .docx render via pandoc or equivalent.
- Header/footer: "INTERIM THEORETICAL SUBMISSION --- NOT PHYSICALLY VALIDATED" on every page.
- Page 1: cover page (Part A).

## K.3 Contingencies

| Risk | Mitigation |
|------|------------|
| User supplies REQ-01...03 before Sunday | Unblock end-to-end re-execution; update D1/D2 with re-execution results; may upgrade submission posture if results confirm |
| D8 reveals new BLOCKING issue | Stop clock; disposition before proceeding; if undispositionable, submission posture becomes BLOCKED |
| Figure rendering delays | Use tabular/ASCII art fallback in .docx; schedule proper rendering for post-Sunday update |
| Citation-hygiene final check finds defect | Fix per D3 rules; if unfixable, mark as limitation and disclose |

\newpage

# PART L --- SUBMISSION MANIFEST

## L.1 This Package Contains

| # | Component | Document ID | Version | Status | Location in This File |
|---|-----------|-------------|---------|--------|----------------------|
| 1 | Interim Cover Page | QO-INTERIM-PKG-001 | 1.0 | COMPLETE | Part A |
| 2 | Executive Summary (2 pages) | QO-INTERIM-PKG-001 | 1.0 | COMPLETE | Part B |
| 3 | Corrected Scientific Manuscript / Research Report | QO-SUB-RP-001 | V1.0-RC2 | INTERIM | Part C |
| 4 | Concise Engineering Architecture Section | QO-P1-D6 | 1.0 (condensed) | COMPLETE | Part D |
| 5 | Verified Numerical-Results Table | QO-CFR-001 | v1.1 (excerpt) | COMPLETE | Part E |
| 6 | Proof-Profile Recommendation | QO-D4-001 | 1.0 (condensed) | COMPLETE | Part F |
| 7 | Device-Imperfection Mapping Summary | QO-P1-D5 | 1.0 (condensed) | COMPLETE | Part G |
| 8 | Selected Existing Engineering Figures | --- | --- | REFERENCED | Part H |
| 9 | Phase 1 Gate Status | QO-SPEC-DELIV-001 | 1.0 (excerpt) | COMPLETE | Part I |
| 10 | Remaining Blockers | QO-CFR-001 | v1.1 (REQ register) | OPEN | Part J |
| 11 | Roadmap to Sunday Final Submission | QO-INTERIM-PKG-001 | 1.0 | PLAN | Part K |
| 12 | Submission Manifest | QO-INTERIM-PKG-001 | 1.0 | COMPLETE | Part L |

## L.2 Basis Documents (Referenced, Not Included)

| Document ID | Title | Location |
|-------------|-------|----------|
| QO-CFR-001 v1.1 | Canonical Facts Record | `/mnt/agents/output/phase1/Q-Orbit_Canonical_Facts_Record.md` |
| QO-D1/D2 | Phase 1 Canonical Audit | `/mnt/agents/output/phase1/Q-Orbit_Phase1_Canonical_Audit.md` |
| QO-D3-001 | Literature and Proof Review | `/mnt/agents/output/phase1/Q-Orbit_Phase1_Literature_and_Proof_Review.md` |
| QO-D4-001 | Proof-Profile Comparison | `/mnt/agents/output/phase1/Q-Orbit_Phase1_Proof_Profile_Comparison.md` |
| QO-P1-D5 | Device-Imperfection Mapping | `/mnt/agents/output/phase1/Q-Orbit_Phase1_Device_Imperfection_Mapping.md` |
| QO-P1-D6 | V0.17-TA1 Architecture Spec | `/mnt/agents/output/phase1/Q-Orbit_V0.17-TA1_Architecture_Specification.md` |
| QO-SPEC-DELIV-001 | Deliverable Specifications | `/mnt/agents/output/phase1/Q-Orbit_Deliverable_Specifications.md` |
| QO-G-RT-001 | Red-Team Review | `/mnt/agents/output/phase1/Q-Orbit_Phase1_RedTeam_Review.md` |
| QO-V0.16-TA1 | 10 Controlled Artifacts | `/mnt/agents/output/extracted/v016/` |

## L.3 Controlled Artifact Inventory

| # | Artifact | Hash Verified? | Evidence Class |
|---|----------|---------------|----------------|
| 01 | `01_run_theoretical_device_imperfection_model_v0_16_ta1.py` | Compiles; not byte-reconstructed | EV-4 (static inspection) + EV-1c (hash-chain-listed) |
| 02 | `02_FS_loss_XI0.csv` | Yes (after PDF-repair) | EV-1a |
| 03 | `03_Q-Orbit_V0.16-TA1_Theoretical_Run_Summary.json` | Yes (direct match) | EV-1a |
| 04 | `04_Q-Orbit_V0.16-TA1_Regression_Tests.csv` | Yes (after PDF-repair) | EV-1c |
| 05 | `05_Q-Orbit_V0.16-TA1_Two_Parameter_Screen.csv` | Yes (after PDF-repair) | EV-1a |
| 06 | `06_Q-Orbit_V0.16-TA1_Local_Sensitivity.csv` | Yes (after PDF-repair) | EV-1c |
| 07 | `07_Q-Orbit_V0.16-TA1_Zero_Key_Frontier.csv` | Yes (after PDF-repair) | EV-1c |
| 08 | `08_Q-Orbit_Theoretical_Device_Imperfection_Propagation_Final_Audit_V0.16-TA1.json` | Yes (after PDF-repair) | EV-1c |
| 09 | `09_SHA256SUMS.txt` | Yes (direct match) | EV-1a |
| 10 | `10_Q-Orbit_V0.16-TA1_Controlled_Input_Index.csv` | Yes (after PDF-repair) | EV-1c |

## L.4 Hash-Chain Status

- 9 of 10 bundle-cover declared hashes are listed in `09_SHA256SUMS.txt` under package paths (a manifest cannot list its own hash).
- 17 controlled-input hashes in artifact 10 match the corresponding `controlled_inputs/...` entries in 09 --- 17/17.
- Bundle artifact 02 is byte-identical to `controlled_inputs/v0.6/FS_loss_XI0.csv` per manifest.

## L.5 Claim-Control Label Verification

Every page of this package carries the binding label:

> **INTERIM THEORETICAL SUBMISSION --- NOT PHYSICALLY VALIDATED**

All numerical claims carry evidence-class labels (EV-1a/1b/1c/2/3/9). All outputs from uncharacterized parameters carry the watermark `NO SECURITY CLAIM --- CONDITIONAL COMPUTATION` or equivalent conditional language. The prohibited-claims register (CFR Section 4) is never violated as a positive claim.

---

*End of Q-Orbit Preliminary Submission Package*

*Compiled: 2026-08-27*
*All claims controlled. No missing data invented. All corrections from Phase 1 Canonical Audit applied.*
