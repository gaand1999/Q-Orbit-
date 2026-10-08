# Q-Orbit Engineering Design Handbook V0.11R1

## Chapter 6 — Scientific Model, Tabuk Ground Station & Interface Contract

> **V0.11R1 correction control (24 August 2026).** This derivative chapter is governed by `QO-ICR-001`. `GOV-008` is only `METHOD-DEFINED`; all 109 parameters now name an accountable discipline role, evidence class, production verification method, closure procedure and gate, but physical evidence and execution assignees remain open. West Tabuk is a management-selected first parcel-search order rather than a robust data-derived ranking. The V0.9 Lawz point is a legacy screening point selected after an elevation-only fallback and is not a strict-constraint-qualified coordinate.

| Document field | Value |
|---|---|
| Document ID | QO-EDH-CH06 |
| Version | Integrated Desk Baseline V0.11R1 |
| Date | 21 August 2026 |
| Parent baseline | QO-EDH-REG-001 V0.2; QO-EDH-CH01–04 V0.2; QO-EDH-CH05 V0.3; QO-RBV-BASELINE-001 V0.6; QO-MCE-REPORT-001 V0.7; QO-TAB-SCREEN-REPORT-001 V0.9; QO-TAB-GSLR-SPEC-001 V0.10 |
| Companion controls | QO-TAB-GSLR-V0.10 requirements/parameter workbook; QO-EDH-CH06-CH07-INT-TRACE-001 V0.11R1 |
| Primary method source | Sidhu et al., *npj Quantum Information* 8, 18 (2022), DOI 10.1038/s41534-022-00525-3 |
| Phase | P2/P3 — scientific method and ground-segment input contract |
| Gate target | Integrated SCI-G1/SIM-G1 review candidate; gates not passed |
| ARCH-G1 dependency | Proceeding under QO-GATE-CF-001 carry-forward; ARCH-G1 remains not passed |
| Simulation state | **Tabuk-specific controlled run: NOT RUN** |
| Quantitative Q-Orbit result | **Tabuk-specific: NONE**; historical fixture/synthetic evidence remains in Chapter 7 |
| Laser emission state | **INHIBITED** |
| Information handling | **PRIVATE-BLOCKED**, preliminary, non-operational; public release requires PR-GATE-01 and GATE-12 |

> **Scope boundary.** Tabuk is adopted as the study region only. No parcel, surveyed telescope reference point, operational orbit, optical terminal, QKD device, laser configuration, airspace disposition, EKM product, authentication construction, or mission threshold is approved. This chapter integrates the V0.10 ground-station requirements and interfaces into the scientific method; it reports no modeled or measured Tabuk performance and makes no security, feasibility, certification, deployment, or operational-readiness claim.

---

## 6.1 Purpose and interpretation

This chapter defines a reproducible method for asking a bounded scientific question about the Q-Orbit reference concept and now binds that method to the V0.10 Tabuk ground-segment evidence contract. It fixes:

1. the research question and falsifiable preliminary hypothesis;
2. the reference analysis case and applicability boundary;
3. the geometry, link, finite-block QKD, gate, and EKM-state model structure;
4. the parameter and provenance schema;
5. uncertainty and sensitivity treatment;
6. exact outcome and metric semantics;
7. run-record and reproducibility requirements; and
8. the conditions that restrict a future result to descriptive or sensitivity-only reporting;
9. the ground-station functional allocation and fourteen controlled interfaces; and
10. the 109-parameter and thirteen-gate handoff contract used by Chapter 7.

The chapter deliberately does not fill unresolved values merely to make a model executable. A missing value, source, applicability rationale, authority, or acceptance threshold remains visible as `TBD`, and any result that depends on it is blocked or limited accordingly.

The V0.5/V0.6 reference reproduction and V0.7 synthetic Riyadh screening are historical computational evidence. They are not current Tabuk outputs and do not close V0.10 site, terminal, detector, safety, airspace, operations, or acceptance evidence.

### 6.1.1 Statement-control rule

Material statements retain the controlled forms from QO-EDH-REG-001:

- `[V:CE-*]` for externally verified claims;
- `[ED:ED-*]` for reversible Q-Orbit engineering decisions;
- `[A:A-*]` for analysis assumptions; and
- `[TBD:TBD-*]` for unresolved items.

No published demonstration value is inherited as a Q-Orbit design input merely because it appears in the literature. `[ED:ED-007]`

### 6.1.2 Normative language

`Shall` in this chapter constrains the future controlled analysis package. It does not assert that the model, code, data, test, review, or operational system already exists.

---

## 6.2 Research question and preliminary hypothesis

### 6.2.1 Research question

> Under a profile-specific finite-block satellite QKD reference case, can a direct QKD-A/QKD-B link with two-sided EKM commit semantics and constrained AQMO orchestration produce a reproducible preliminary key-replenishment result while failing closed under selected security, data, and coordination faults?

### 6.2.2 Falsifiable preliminary hypothesis

> For some explicitly sourced parameter regimes, the reference model may produce positive two-sided replenishment after every required profile, authentication, device, configuration, policy, data, and EKM gate passes. Outside those regimes, or when any required gate fails or is indeterminate, the model will produce an explicit non-success outcome without exposing ambiguous key material as available.

The hypothesis has two required branches:

| Branch | Condition | Required observation |
|---|---|---|
| H-A — positive candidate | The finite-block calculation is positive and every required non-numeric gate is `PASS` | OUT-1 and OUT-2 may be positive; OUT-3 is positive only after matching two-sided EKM commit evidence |
| H-B — negative or indeterminate | The finite-block calculation is non-positive, or any required gate is `FAIL` or `UNKNOWN` | The corresponding outcome is explicit non-success; no ambiguous material is `Available` |

A model that reports only positive cases cannot test this hypothesis. A model that collapses all gates into one generic `success` field also cannot test it.

---

## 6.3 Reference analysis case

### 6.3.1 CASE-S1 — single-pass direct downlink

| Case field | Frozen method value | Status and limit |
|---|---|---|
| Case ID | CASE-S1 | Frozen identifier |
| Topology | One direct QKD-A/QKD-B link | `[ED:ED-003]`; no relay or arbitrary remote consumer |
| Endpoint A | Space domain; QKD-A reference transmitter; EKM-A; local representative Consumer A | Logical allocation only; no flight hardware selected |
| Endpoint B | Ground domain; QKD-B reference receiver; EKM-B; local representative Consumer B; Tabuk study-region context | Logical allocation only; no parcel, facility, or surveyed reference point selected |
| Opportunity | One candidate pass processed as one finite block | `[A:A-001]`; exact orbit and interval remain TBD-003 |
| Direction/profile | Downlink, prepare-and-measure, polarization-encoded efficient BB84, phase-randomized weak coherent pulses, one signal and two decoy intensities | `[ED:ED-006]`; analysis profile only, not protocol approval |
| Finite-key reference | Single-pass method described by Sidhu et al. 2022 | `[ED:ED-007]`; equations and conventions require independent reproduction |
| Mission outcome | Two-sided EKM inventory replenishment, OUT-3 | `[ED:ED-005]`; consumer delivery is separate OUT-4 |
| Orchestration | AQMO may filter, rank, reserve, monitor, and replan qualified opportunities using permitted metadata | `[ED:ED-010]`; no key values or local-gate override |
| Orbit/site instantiation | Tabuk selected at region level only; orbit and real parcel not selected | TBD-003 plus V0.10 GATE-01–04; CASE-S1 is not a real mission case |
| Optical/device instantiation | Not selected | TBD-004 and TBD-006 plus V0.10 GATE-05–07 |
| Mission thresholds | Not defined | TBD-002 and TBD-013; results remain descriptive/sensitivity-only |

### 6.3.2 Applicability boundary

CASE-S1 can answer only questions about the declared direct, single-pass, profile-specific model. It cannot be generalized without new evidence to:

- uplink, entanglement-based, continuous-variable, measurement-device-independent, or other protocol families;
- multi-satellite, constellation, trusted-relay, repeater, or remote-consumer networks;
- a named customer, spacecraft, operational orbit, approved parcel, qualified ground station, product, HSM, or optical terminal; Tabuk is only the adopted study region;
- implementation or endpoint security;
- availability, denial-of-service resistance, certification, cryptographic approval, or operational risk acceptance; or
- measured or flight performance.

---

## 6.4 Controlled analysis pipeline

The future implementation shall preserve the following ordered stages and their evidence:

| Stage ID | Stage | Required input | Required output | Blocking rule |
|---|---|---|---|---|
| AP-01 | Source and parameter intake | Controlled source records and parameter candidates | Provenance-complete parameter entries | Missing source/applicability blocks freeze |
| AP-02 | Analysis-case freeze | CASE-S1 plus selected orbit/site interval and configuration | Immutable case manifest and hashes | Unresolved required case field blocks controlled run |
| AP-03 | Geometry and access | Orbit/site state, time system, propagation method, masks | Time series for range, elevation, visibility, and declared constraints | Invalid time/frame/source state gives `UNKNOWN` or `FAIL` |
| AP-04 | Optical/link model | Geometry plus optical, atmosphere, pointing, background, and receiver parameters | Time-dependent detection/loss inputs with uncertainty trace | Missing required input blocks accepted quantitative use |
| AP-05 | Finite-block QKD model | Pulse schedule, observed/expected counts, profile, security and leakage parameters | Secret-key-length candidate plus bound diagnostics | No QKD acceptance from QBER alone |
| AP-06 | Gate lattice | Authentication, profile, device, configuration, policy, data, and evidence states | Individual `PASS`/`FAIL`/`UNKNOWN`/`N/A` states | Any required `FAIL` or `UNKNOWN` is non-permissive |
| AP-07 | EKM pair-state simulation | Accepted local handoffs and binding-specific state evidence | Prepared, Committed/Available, Unknown/Quarantined, or terminal state | One-sided or ambiguous state never becomes available |
| AP-08 | Outcomes and metrics | AP-03 through AP-07 evidence | OUT-1 through OUT-4 and applicable MET records | Generic unqualified success is prohibited |
| AP-09 | Evidence package | Frozen environment, code, inputs, seeds, gates, outcomes, limits | Reproducible run record and publication label | Missing evidence blocks controlled-result acceptance |

FIG-011 is the controlled visual equivalent of this table. The reference model, evidence service, and presentation layer remain outside operational key custody.

---

## 6.5 Geometry and access method

The geometry model shall transform a versioned orbit/site case into a time-ordered access record. At minimum it shall record:

- orbit-state source, representation, epoch, reference frame, time scale, propagation method, and software/version;
- site identifier or generic analysis location, coordinates/datum when authorized, and applicable masking rules;
- analysis start/end, integration step, pass-selection rule, and all time conversions;
- range, elevation, azimuth where used, line-of-sight status, and maximum-elevation event;
- declared tracking, slew, visibility, safety, resource, and environmental constraints; and
- source, unit, uncertainty or range, applicability rationale, and sensitivity treatment for each numeric input.

No real-parcel coordinate, surveyed telescope reference point, operational ephemeris, or approved pass interval is selected in this chapter. The V0.9 desk cells remain `PROVISIONAL-DESK-CELL`. `[TBD:TBD-003]` `[GATE-01]` `[GATE-02]` `[GATE-03]`

Geometry output establishes only a candidate physical opportunity. It does not establish optical-link readiness, QKD acceptance, replenishment, or delivery.

---

## 6.6 Optical and detection model structure

The optical/link layer shall retain each declared contribution rather than hide all effects inside an unexplained rate. A generic accounting structure is:

\[
\eta_{sys}(t)=\eta_{geo}(t)\,\eta_{atm}(t)\,\eta_{point}(t)\,\eta_{tx}\,\eta_{rx}\,\eta_{det}
\]

where the factors are placeholders for the selected, non-overlapping model terms. The implemented formulation shall define every factor, convention, source, unit, uncertainty, and overlap rule before use. The product above is not a frozen Q-Orbit link-budget equation and introduces no numeric value.

The detection-statistics layer shall distinguish at least:

- transmitted pulse count by time, basis, and intensity;
- channel/detection contribution;
- dark and environmental background contribution;
- intrinsic state-preparation/measurement error contribution;
- dead-time, saturation, gating, timing, and other device-envelope effects when applicable; and
- observed versus expected quantities used by the finite-key proof.

The selected optical formulation, wavelength, apertures, divergence, pointing distribution, atmospheric model, background model, detector behavior, and coupling losses remain open under TBD-004 and TBD-006 and the V0.10 `OPTICAL`, `PAT`, `ATMOSPHERE`, `DETECTOR`, and `QKD` parameter groups. No V0.7 screening value is promoted to a V0.11R1 Tabuk design input.

Published experiment or demonstration values may be used only as separately labeled comparison or sensitivity inputs after applicability review. They are not default Q-Orbit design values. `[ED:ED-007]`

---

## 6.7 Finite-block QKD method

### 6.7.1 Reference profile

The computational reference is the CASE-S1 efficient-BB84 weak-coherent-pulse profile with three intensities: one signal and two decoy intensities, including a vacuum intensity under the cited method. `[V:CE-016]` `[ED:ED-006]`

Limited satellite contact can make asymptotic analysis optimistic because finite received blocks require statistical finite-key treatment. `[V:CE-015]`

### 6.7.2 Reference secret-key-length expression

The V0.5/V0.6 implementation internally reproduced the definitions, conventions, statistical bounds, and conditions associated with the Sidhu et al. reference expression for one retained fixture. The expression remains the computational contract for future controlled cases:

\[
\ell=\left\lfloor
s_{X,0}+s_{X,1}\left[1-h_2(\phi_X)\right]
-\lambda_{EC}
-6\log_2\left(\frac{21}{\epsilon_s}\right)
-\log_2\left(\frac{2}{\epsilon_c}\right)
\right\rfloor
\]

where, for the cited method:

- `s_X,0` is the lower-bound vacuum contribution in the key-generating basis;
- `s_X,1` is the lower-bound single-photon contribution in that basis;
- `phi_X` is the upper-bound phase-error rate;
- `h_2` is binary entropy;
- `lambda_EC` is error-correction leakage;
- `epsilon_s` and `epsilon_c` are the selected secrecy and correctness parameters; and
- the floor operation yields an integer candidate secret-key length.

QBER alone is not the finite-key acceptance condition; the cited calculation also depends on vacuum and single-photon bounds, phase-error bounds, error-correction leakage, and security parameters. `[V:CE-017]`

The historical reproduction establishes computational agreement for one retained fixture only. It is not a security proof, device validation, system validation, or evidence that the method is applicable to an unresolved Tabuk configuration. REQ-MOD-001 and V0.10 GATE-06/GATE-11 still require profile-, device-, model-, and case-specific evidence before any result is marked validated or accepted.

### 6.7.3 Protocol values and optimization

The following remain parameterized and provenance-controlled:

- non-vacuum intensity means and all intensity-selection probabilities;
- basis probabilities;
- transmission window and block-construction rule;
- repetition rate and finite sample counts;
- statistical-bound conventions;
- error-correction leakage model;
- secrecy and correctness budgets; and
- optimization variables, constraints, objective, algorithm, tolerances, and convergence record.

Numeric values used by Sidhu et al. for their study are not inherited automatically. The Q-Orbit register may cite them only as comparison points or explicit sensitivity cases with an applicability note.

### 6.7.4 QKD outcome rule

The model shall report the key-length candidate and every intermediate bound needed to audit it. OUT-2 may be positive only when:

1. the frozen profile calculation returns a positive accepted length under the implemented convention;
2. authentication is `PASS`;
3. device/entropy/calibration state is `PASS`;
4. configuration and parameter-register identity are `PASS`;
5. policy and data-fitness gates are `PASS`; and
6. no required gate is `UNKNOWN`.

Otherwise OUT-2 is an explicit rejection, no-key, or indeterminate state, and no accepted output crosses IF-K01 or IF-K02.

---

## 6.8 Gate lattice and fail-closed semantics

Each required gate shall use one of four controlled states:

| Gate state | Meaning | Permissive? |
|---|---|---|
| `PASS` | The declared criterion is positively established for the frozen case | Yes, for that gate only |
| `FAIL` | The declared criterion is negatively established | No |
| `UNKNOWN` | Required evidence is missing, invalid, stale, conflicting, or unresolved | No |
| `N/A` | The gate is explicitly not applicable with a recorded rationale | Only after applicability review |

The minimum gate families are:

- request identity/authority/purpose/schema/freshness;
- orbit/site and decision-data validity/fitness/conflict;
- endpoint readiness and configuration identity;
- authenticated classical-channel state;
- protocol/profile consistency;
- finite-key calculation and error-correction verification;
- device, entropy, calibration, timing, and health state;
- local handoff and binding validation;
- EKM pair-state and evidence continuity;
- consumer authorization/delivery acknowledgement when OUT-4 is attempted; and
- release-control state when a result is proposed for presentation.

AQMO cannot change a local `FAIL` or `UNKNOWN` into `PASS`. `[ED:ED-010]`

---

## 6.9 EKM pair-state model

The analysis shall preserve Chapter 3 and Chapter 5 two-sided semantics:

1. each endpoint may create only a binding-specific local candidate after OUT-2 is positive;
2. `Prepared` denies allocation, delivery, and use;
3. authenticated non-secret peer status may support reconciliation but carries no key value;
4. `Committed/Available` requires matching durable two-sided evidence for the same binding;
5. timeout, restart, partition, response loss, conflict, or one-sided evidence moves the affected pair to `Unknown/Quarantined`; and
6. only explicit reconciliation or authorized terminal disposition can leave the ambiguous state.

The exact implementable pair-state protocol, timeouts, retries, persistence, idempotency, reconciliation, and destruction rules remain TBD-009. The SCI-G1 model tests semantic invariants; it does not approve a distributed transaction protocol.

---

## 6.10 Parameter and provenance control

Every historical fixture input shall resolve to its hash-pinned V0.6 freeze register. Every prospective Tabuk input shall resolve to the V0.10 Parameter Baseline and the V0.11R1 integration traceability register and contain:

- stable parameter ID and semantic name;
- value, range, distribution, formula, or explicit `TBD` state;
- unit and reference convention;
- uncertainty representation or reason it is not applicable;
- source ID and exact locator;
- source status and review date;
- applicability rationale and limitations;
- sensitivity treatment;
- owner and open-issue trace;
- frozen/approved-for-run state; and
- change history.

A controlled run shall refuse to start when any required parameter is unresolved, unversioned, unit-incompatible, missing provenance, or not frozen for that exact case. `[REQ-MOD-002]` `[REQ-MOD-003]`

Derived parameters shall preserve the formula, dependency IDs, evaluation version, and unit check. A derived value is not an independent source.

---

## 6.11 Uncertainty and sensitivity method

The analysis shall distinguish three forms of uncertainty:

| Class | Meaning | Treatment |
|---|---|---|
| U-1 — structural | Alternative model, case, or policy structures | Separate labeled scenarios; do not average incompatible structures |
| U-2 — parametric | Bounded uncertainty or plausible range for a fixed model structure | Declared one-at-a-time screening and controlled multi-parameter sweeps |
| U-3 — stochastic | A justified probability model for random behavior | Recorded distribution, sampling method, seed, sample count, and convergence evidence |

Rules:

1. a probability distribution shall not be invented merely because a range exists;
2. a confidence interval shall not be reported without a valid statistical interpretation and sampling basis;
3. sensitivity sweeps shall preserve physically and logically valid parameter combinations;
4. parameters that represent policy or authority decisions shall not be randomized as if they were physical noise;
5. optimization shall be separated from uncertainty propagation and shall retain the objective, bounds, start points, solver version, stopping criteria, and convergence status; and
6. discontinuities at zero-key and gate boundaries shall be reported explicitly rather than smoothed away.

Before mission thresholds and their authority are recorded, outputs may show values, ranges, gradients, rankings, and boundary locations only as descriptive or sensitivity evidence. They may not be labeled mission pass/fail. `[REQ-MOD-010]`

---

## 6.12 Outcomes and metric contract

### 6.12.1 Exact outcomes

| Outcome | Positive condition | Required negative/indeterminate handling |
|---|---|---|
| OUT-1 — physical-link success | Declared acquisition, synchronization, and channel-readiness criteria pass | Record physical failure or unknown; do not infer QKD acceptance |
| OUT-2 — QKD acceptance | Positive reference calculation and every required authentication, device, configuration, data, and policy gate passes | Record rejection/no-key/indeterminate; no accepted handoff |
| OUT-3 — replenishment success | Both EKMs establish matching `Committed/Available` state for the same binding | Record failed/ambiguous; quarantine uncertain pair |
| OUT-4 — consumer-delivery success | Both authorized local consumers and both EKMs establish the corresponding delivered state | Record failed/ambiguous; prevent unsafe reallocation |

OUT-1 through OUT-4 shall be recorded separately. OUT-3 remains the primary reference mission outcome; OUT-4 is optional and separate. `[ED:ED-005]` `[ED:ED-008]`

### 6.12.2 Metrics

Future records may use the Chapter 3 `MET-01` through `MET-12` definitions only with their numerator, denominator/reference event, unit/state, and analysis interval. At SCI-G1 the principal method outputs are:

- MET-06 — accepted key length, in bits, per run/session;
- MET-07 — matching two-sided committed quantity, in bits or key objects, per pair/transaction;
- MET-10 — ambiguous-state incidence, as count/fraction over applicable transactions;
- MET-11 — safe-rejection coverage, as selected negative cases reaching their specified non-permissive states; and
- MET-12 — evidence completeness, as required non-secret records present and valid over required records.

No metric value is reported in this chapter.

---

## 6.13 Reproducibility and run-record contract

Every controlled future run shall retain:

- run ID and creation time;
- case-manifest version and hash;
- parameter-register version and hash;
- source-data identities, versions, checksums, and access dates;
- code repository identity, exact revision, clean/dirty state, and build artifact hash;
- language/runtime, dependency lock, operating environment, numeric library, and hardware details relevant to reproducibility;
- deterministic random seed or explicit declaration that no randomness is used;
- solver/optimizer configuration and convergence state;
- each AP-stage status and each gate state;
- OUT-1 through OUT-4;
- every reported MET record with denominator/reference and unit;
- warnings, exceptions, invalid values, and non-success reason codes;
- generated artifact identities and checksums; and
- limitations and release state.

A rerun using the retained environment and run record shall reproduce discrete outcomes exactly and numeric results within a tolerance frozen before comparison. The V0.5/V0.6 tolerance applies only to the retained reference fixture; no Tabuk-case tolerance is approved and it remains open under TBD-005, TBD-015, and GATE-11. `[REQ-MOD-009]`

---

## 6.14 Planned negative and indeterminate cases

The twelve-case suite below was executed for the retained V0.5/V0.6 reference fixture and shall remain a regression suite for any future Tabuk case:

| Case ID | Injected condition | Expected safe result |
|---|---|---|
| NEG-01 | Classical authentication failure | OUT-2 non-positive; no accepted handoff |
| NEG-02 | Stale decision data | Hold/reject until a declared freshness rule passes |
| NEG-03 | Conflicting decision data | `UNKNOWN`/hold; AQMO cannot choose convenience over policy |
| NEG-04 | Finite-key/profile rejection | Explicit no-key; no EKM preparation |
| NEG-05 | Invalid or unknown device/entropy/calibration state | OUT-2 non-positive |
| NEG-06 | Parameter-register or configuration mismatch | Controlled run invalid; no result acceptance |
| NEG-07 | Partial or unknown EKM commit | OUT-3 non-positive; pair quarantined |
| NEG-08 | Wrong consumer or binding | Delivery denied; OUT-4 non-positive |
| NEG-09 | One-sided delivery acknowledgement | OUT-4 non-positive; unsafe reallocation prevented |
| NEG-10 | AQMO loss | No new coordination; no gate override; only bounded preauthorized local completion may proceed |
| NEG-11 | Evidence-continuity failure | Affected permissive transition blocked |
| NEG-12 | Release record absent or wrong artifact version | Presentation/publication blocked |

For the historical reference fixture these cases were executed. For the Tabuk integrated configuration they remain required regression specifications and have not been re-executed; Chapter 7 adds nine planned Tabuk-specific evidence-boundary cases. `[A:A-008]`

---

## 6.15 Reporting classes

Every future analysis output shall use one of the following labels:

| Label | Minimum basis | Prohibited interpretation |
|---|---|---|
| Method-only | No controlled run; equations/schema/process only | Not a result |
| Descriptive modeled result | Frozen case and provenance; no mission threshold or authority | Not mission acceptance |
| Sensitivity result | Frozen case plus declared ranges/sweep method | Not a probability forecast unless probabilistic basis exists |
| Reproduced modeled result | Independent rerun satisfies frozen discrete/numeric criteria | Not system validation |
| Failed/indeterminate run | Required model, parameter, gate, or evidence condition failed/unknown | Not negative proof of all possible configurations |

No result may use `secure`, `validated`, `successful`, `approved`, `mission-ready`, or equivalent language without the exact qualifier and supporting authority/evidence.

---

## 6.16 Traceability

| Chapter 6 element | Parent controls | Primary future evidence |
|---|---|---|
| Question and hypothesis | QO-ICP-001 §§5.1–5.2 | Research report Sections 1–4 |
| CASE-S1 | ED-003 through ED-007; A-001 through A-010 | Case manifest and parameter register |
| Finite-block method | CE-015 through CE-017; REQ-MOD-001 | Independent reproduction dossier |
| Parameter/provenance schema | REQ-MOD-002 through REQ-MOD-004; GOV-006 through GOV-009 | V0.6 freeze register, V0.10 Parameter Baseline, V0.11R1 integration traceability, and run manifest |
| Gate lattice | REQ-MOD-005; Chapter 4 QKD/CYB/DAT requirements | Per-gate records and negative-case suite |
| Outcomes/metrics | REQ-MOD-006 through REQ-MOD-007; Chapter 3 §3.12 | Result schema |
| Fault cases | REQ-MOD-008 | Controlled fault-run evidence |
| Reproducibility | REQ-MOD-009 | Independent rerun record |
| Threshold/report boundary | REQ-MOD-010; REQ-REL-006 | Threshold register and release review |
| Visual method | FIG-011 V0.4 | Historical source SVG, caption, alt text, and checksum; carried forward without redraw |

---

## 6.17 SCI-G1 review candidate

### 6.17.1 Evidence assembled

1. a single controlled research question and two-branch falsifiable hypothesis;
2. CASE-S1 method boundary with no invented orbit, site, device, or threshold;
3. AP-01 through AP-09 pipeline and gate semantics;
4. finite-block reference expression and applicability controls;
5. parameter/provenance, uncertainty, outcome, metric, and reproducibility contracts;
6. twelve planned non-success cases; and
7. companion Parameter & Provenance Register and FIG-011;
8. V0.10's 103 baselined requirements, 109 controlled parameters, fourteen interfaces, and thirteen evidence gates; and
9. the V0.11R1 Chapter 6-to-7 integration traceability register.

### 6.17.2 Items required before declaring SCI-G1 passed

1. named research, QKD, optical, orbit, model, security, evidence, and configuration reviewers inspect the exact artifacts within their competence;
2. named reviewers assess the completed V0.5/V0.6 internal reproduction and record whether its bounded evidence is sufficient for the intended next use;
3. every V0.10 parameter required by a claimed Tabuk run is evidence-backed, unit-checked, approved, and frozen instead of silently defaulted;
4. the V0.10 requirements, verification evidence, interfaces, and applicable gates are reviewed against the exact hardware/site/mission configuration;
5. every material finding and disposition is recorded against the exact artifact versions;
6. any private presentation derivative is checked against this chapter, the registers, and the claim boundary; and
7. an authorized record explicitly states the SCI-G1 decision.

### 6.17.3 Gate boundary

This package is an **SCI-G1 review candidate**, not a passed gate. Even a future positive SCI-G1 disposition would freeze only the research method and analysis-configuration structure. It would not establish a positive feasibility result, approve a protocol or device, validate a system, close ARCH-G1, or authorize public release.

---

## 6.18 Primary method source and currency note

- J. S. Sidhu et al., “Finite key effects in satellite quantum key distribution,” *npj Quantum Information* 8, Article 18 (2022), [https://doi.org/10.1038/s41534-022-00525-3](https://doi.org/10.1038/s41534-022-00525-3). Open-access publisher record and method text checked 18 August 2026.

The source supports the finite-block, single-pass, three-intensity/two-decoy efficient-BB84 analysis structure and the cited key-length expression. Its numerical study values and its specific empirical channel construction are not Q-Orbit design values. Publication status, corrections, method applicability, and referenced implementation shall be rechecked at each controlled baseline.

---

## 6.19 Tabuk study-region decision

Tabuk is adopted as the study region. This is a geographic research decision, not a site qualification, land commitment, safety approval, or mission authorization. The controlled candidate roles are:

| Candidate | Controlled role | Current disposition | Prohibited interpretation |
|---|---|---|---|
| `TAB-WTB-C03` | First real-parcel and field-survey search when execution resumes | `ADOPTED-SEARCH-ORDER; EXECUTION-DEFERRED` | Not an approved parcel or station |
| `TAB-LAWZ-C01` | High-altitude optical-performance challenger | `CHALLENGER; EXECUTION-DEFERRED` | Not selected over West Tabuk and not buildable evidence |
| `TAB-BAJ-C02` | Dark-sky/protected-context benchmark | `HOLD-BENCHMARK; NO-PROGRESSION-WITHOUT-AUTHORITY` | Not available for deployment or survey without authority |

The V0.9 coordinates are desk-cell centres derived for screening. They shall not be inserted into a mission-acceptance run, pointing product, safety case, or GACA/SANS submission as though they were surveyed telescope coordinates.

### Design Decision

Parcel nomination, owner contact, field survey, local measurement campaign, and GACA/SANS engagement are deliberately deferred. Their requirements remain active and visible; their execution is not part of V0.11R1.

## 6.20 Ground-station functional allocation

V0.10 baselines 103 auditable `shall` statements. Baselining establishes identity, ownership, source route, verification method, and acceptance evidence; it does not mean implementation or acceptance. The allocation is:

| Domain | Requirements | P0 / P1 | Current evidence state | Chapter 6 role |
|---|---:|---:|---|---|
| Governance & Evidence | 10 | 10 / 0 | 8 `DESK-READY`; 1 `METHOD-DEFINED`; 1 `NOT-ACQUIRED` | Claim boundary, configuration identity, evidence classes, authority |
| Mission Geometry & Time | 9 | 9 / 0 | 9 `NOT-ACQUIRED` | Orbit authority, time/EOP, surveyed reference point, access logic |
| Site, Facility & Infrastructure | 12 | 8 / 4 | 12 `NOT-ACQUIRED` | Parcel, survey, horizon, utilities, access, protection and maintainability |
| Optical Terminal & PAT | 12 | 11 / 1 | 12 `NOT-ACQUIRED` | Aperture, throughput, filter/FOV, coupling, beacon and tracking |
| QKD Source, Receiver & Detector | 14 | 14 / 0 | 1 `DESK-READY`; 13 `NOT-ACQUIRED` | Profile, source, detector, entropy, finite block and proof mapping |
| Atmosphere, Background & Metrology | 10 | 8 / 2 | 10 `NOT-ACQUIRED` | Cloud, transmission, aerosol, turbulence, radiance and uncertainty |
| Laser Safety & Airspace | 10 | 8 / 2 | 3 `NORMATIVE-OPEN`; 1 `DEFERRED`; 6 `NOT-ACQUIRED` | Emission inhibit, safety case, interlocks and Saudi coordination |
| Timing & Classical Communications | 6 | 5 / 1 | 6 `NOT-ACQUIRED` | Time authority, authentication, integrity, segmentation and fail-safe behavior |
| Key Management, Cybersecurity & EKM | 10 | 7 / 3 | 10 `NOT-ACQUIRED` | Identity, two-sided commit, lifecycle, protection and delivery |
| Operations, Verification & Acceptance | 10 | 9 / 1 | 1 `DESK-READY`; 9 `NOT-ACQUIRED` | Readiness, abort/inhibit, calibration, evidence and mission thresholds |
| **Total** | **103** | **89 / 14** | **10 `DESK-READY`; 1 `METHOD-DEFINED`; 3 `NORMATIVE-OPEN`; 1 `DEFERRED`; 88 `NOT-ACQUIRED`** | Controlled ground-segment contract |

### Engineering Notes

- Evidence classes are not interchangeable. A literature value cannot replace `MEASURED-SITE`, `CALIBRATED-HARDWARE`, `OWNER-PROVIDED`, `NORMATIVE-COMPLIANCE`, `MODEL-VERIFIED`, or `OPERATIONAL-TEST` evidence without an approved applicability rationale.
- Every requirement remains linked to its V0.10 verification row. The V0.11R1 traceability register allocates all 103 requirements to this chapter and to a Chapter 7 simulation behavior.
- QBER remains diagnostic only. `QKD-014` and the Chapter 6 outcome rule prohibit QBER-only acceptance.

## 6.21 Controlled interface contract

Every consequential exchange shall carry identity, configuration, time/validity, integrity, uncertainty, and fail-safe semantics appropriate to its consequence. V0.10 defines fourteen interfaces:

| ID | From → To | Exchange | Required controls | State |
|---|---|---|---|---|
| `IF-001` | Mission/orbit authority → Mission analysis | OPM/OEM or equivalent, covariance and metadata | Originator, frame, time, units, validity, interpolation, hash | `DEFERRED` |
| `IF-002` | Mission analysis → Ground terminal | Pass/pointing request | Case/station/target IDs, frame, time, validity, checksum | `OPEN` |
| `IF-003` | Weather/atmosphere sensors → Readiness gate | Cloud, transmission, turbulence, weather and sky radiance | Calibration, time, QC, uncertainty, representativeness | `DEFERRED` |
| `IF-004` | Telescope/PAT → QKD receiver | Acquisition, tracking, FOV and coupling state | Configuration, timestamps, validity, uncertainty, fault state | `OPEN` |
| `IF-005` | Laser safety controller → Beacon/transmitter | Emission enable/inhibit and shutter state | Hardwired interlocks, authorization, safe state, audit | `BLOCKED` |
| `IF-006` | GACA/SANS/ATS → Laser safety authority | Operating conditions, restrictions and coordination | Actual site/system, validity, contact, change route, acknowledgement | `DEFERRED` |
| `IF-007` | QKD source/receiver → Classical protocol | Basis, intensity, detection and estimation records | Authentication, freshness, case identity, completeness | `OPEN` |
| `IF-008` | QKD post-processing → KME | Candidate key block, provenance and state | Key ID, peer, proof/profile, gate state, integrity | `OPEN` |
| `IF-009` | KME-A → KME-B | Two-sided commit or quarantine state | Matching IDs/state, timeout, replay protection, fail closed | `OPEN` |
| `IF-010` | KME → SAE/consumer | Authorized key delivery and acknowledgement | Mutual authentication, purpose/peer binding, quantity, validity, audit | `BLOCKED` |
| `IF-011` | Time source → All station subsystems | Time, frequency and status | Authority, accuracy, holdover, alarms, alignment uncertainty | `OPEN` |
| `IF-012` | Configuration authority → All verification runs | Signed configuration and run manifest | Version, hash, approvals, calibration state, rollback | `OPEN` |
| `IF-013` | Site/facility → Terminal and safety design | Survey, horizon, utilities, access and constraints | Owner, datum, date, uncertainty, permission, applicability | `DEFERRED` |
| `IF-014` | Evidence repository → Acceptance/release authority | Requirement, evidence, finding and claim package | Traceability, integrity, completeness, exact claim, authority | `OPEN` |

An `OPEN` interface is defined but not implemented or verified. A `DEFERRED` interface awaits an intentionally postponed external or field input. A `BLOCKED` interface may not be treated as operationally available.

## 6.22 Parameter and provenance handoff

The V0.10 Parameter Baseline contains 109 rows. Its current value state is deliberately sparse:

| Parameter condition | Count | Simulation meaning |
|---|---:|---|
| Exact value is `TBD` | 99 | No value may enter a claimed Tabuk run |
| Partial value contains a `TBD` component | 3 | Region/method context may be retained, but the unresolved component remains non-permissive |
| Fully frozen control value | 7 | May control method/state only within its applicability boundary |
| **Total** | **109** | Every row remains under change control |

The three partial rows are `SITE-001` (`TABUK / TBD real parcel`), `QKD-001` (`TBD implementation profile`), and `FKEY-001` (`Single pass; exact implementation TBD`). The seven frozen controls are:

| ID | Frozen value | Boundary |
|---|---|---|
| `CASE-001` | `CASE-S1` | Reference analysis identity only |
| `CASE-002` | Efficient BB84; weak coherent pulse; three intensities including vacuum | Method family, not an approved implementation |
| `CASE-003` | Finite-block; single-pass; profile-specific | Scope control |
| `FKEY-005` | QBER plus complete gate set | Acceptance invariant; no QBER-only decision |
| `LAS-004` | `INHIBITED` | Outdoor laser/beacon emission remains disabled |
| `EKM-001` | Prepared → matching two-sided Committed → Available; ambiguity → Quarantined | State invariant, not an implemented KMS |
| `REL-001` | `PRIVATE-BLOCKED` | No external release authority |

Closure-state accounting is `FROZEN 7`, `PARTIAL 3`, `DEFERRED 16`, `OPEN 81`, and `BLOCKED 2`. The exact-`TBD` count and the closure-state count answer different questions and shall not be conflated.

## 6.23 Evidence gates and authority boundary

| Gate | Decision use | Current state | Consequence |
|---|---|---|---|
| `GATE-00` Scope and claim boundary | Desk package issue | `PASS-DESK` | Schema and controlled wording may be integrated; no performance permission |
| `GATE-01` Mission configuration | Mission-specific simulation | `BLOCKED` | No authoritative orbit/ephemeris or mission acceptance case |
| `GATE-02` Real parcel and owner | Parcel nomination | `DEFERRED` | No cadastral parcel, owner permission, or site commitment |
| `GATE-03` Survey and measured horizon | Site qualification/access | `DEFERRED` | Desk DEM cannot substitute for surveyed reference point and 360° horizon |
| `GATE-04` Local atmosphere and sky background | Optical availability/link model | `DEFERRED` | Coarse proxies cannot support site-specific availability or background |
| `GATE-05` Optical terminal and PAT | Terminal qualification | `BLOCKED` | No as-built/calibrated terminal inputs |
| `GATE-06` QKD source, detector and proof | QKD block acceptance | `BLOCKED` | No device/proof/calibration basis for accepted key |
| `GATE-07` Laser product safety | Field laser readiness | `BLOCKED` | No controlled emission configuration or competent IEC assessment |
| `GATE-08` Saudi airspace disposition | Outdoor emission | `DEFERRED` | No case-specific written GACA/SANS or competent-authority disposition |
| `GATE-09` Timing, authentication and cyber | Integrated system test | `BLOCKED` | No approved time/security architecture or negative-test evidence |
| `GATE-10` KMS/EKM consumer delivery | Key availability/delivery | `BLOCKED` | No operational state machine or consumer evidence |
| `GATE-11` Model validation and mission acceptance | Mission conclusion | `BLOCKED` | No validated integrated model, thresholds, or independent approval |
| `GATE-12` Publication/deployment release | External release or deployment | `PRIVATE-BLOCKED` | Exact artifact remains private and non-deployable |

Current distribution is one `PASS-DESK`, four `DEFERRED`, seven `BLOCKED`, and one `PRIVATE-BLOCKED`. A gate can become permissive only through its named authority and required evidence; AQMO, the simulation, or a positive key candidate cannot override it.

## 6.24 Laser and airspace invariant

`LAS-001` through `LAS-010` govern any future outdoor laser or beacon use. The current invariant is:

> Emission remains `INHIBITED` until an actual parcel, controlled hardware configuration, operating envelope, internal safety release, and written GACA/SANS or competent-authority disposition exist.

Airport distance, a desk coordinate, a simulated pass, an assumed wavelength, or a positive finite-key candidate is not clearance. V0.11R1 performs no emission, opens no authority case, and grants no laser-product or airspace approval.

## 6.25 Chapter 7 handoff contract

Chapter 7 shall consume the ground-station baseline by stable IDs, not by copied unlabeled numbers. The handoff rules are:

1. bind the exact V0.10 requirements, parameter, interface, gate, source, and verification identities into the run manifest;
2. classify each value as `CONTROLLED-METHOD`, `RESEARCH-ASSUMPTION`, or `ACCEPTANCE-INPUT`;
3. prohibit `TBD`, mixed-`TBD`, stale, unit-incompatible, or provenance-incomplete rows from an accepted Tabuk run;
4. allow a research sensitivity assumption only when it is explicitly non-binding, ranged, sourced, and prevented from becoming a site or mission claim;
5. keep the V0.6 reference fixture and V0.7 synthetic Riyadh case separate from any future Tabuk case;
6. carry each applicable gate state into the run record and fail closed on `BLOCKED`, `DEFERRED`, `UNKNOWN`, or missing evidence for the requested decision use;
7. preserve `LAS-004 = INHIBITED` and `REL-001 = PRIVATE-BLOCKED`; and
8. report `NOT RUN` and quantitative result `NONE` when the requested run class lacks its required evidence.

The V0.11R1 traceability register is the machine-readable allocation record for all 239 source items: 103 requirements, 109 parameters, fourteen interfaces, and thirteen gates.

## 6.26 Deferred execution boundary

When physical execution is resumed, the ordered path remains:

1. nominate real parcels beginning within the West Tabuk search area and identify owner/authority;
2. obtain written access-to-survey and protected/environmental dispositions;
3. complete geodetic, pad, and calibrated 360° horizon surveys;
4. acquire local cloud, transmission, aerosol, turbulence, weather, dust, and spectral sky-radiance evidence;
5. control and calibrate the actual optical/QKD/laser configuration;
6. prepare the laser-product safety case and case-specific GACA/SANS inputs;
7. validate the integrated model and define mission thresholds; and
8. only then freeze and execute a mission-specific Tabuk finite-key acceptance case.

This sequence is retained but not started by V0.11R1.

## 6.27 Integrated chapter disposition

Chapter 6 is now complete as a private desk-level integration of the scientific method with the Tabuk ground-station and interface contract. It is not complete as a site design, terminal design, security architecture, laser-safety case, airspace submission, verified implementation, or mission-acceptance baseline.

The controlling state is therefore:

- method and traceability integration: `PASS-DESK`;
- Tabuk study region: adopted;
- parcel and field execution: deferred;
- station/device evidence: not acquired;
- Tabuk-specific simulation: `NOT RUN`;
- quantitative Tabuk result: `NONE`;
- laser emission: `INHIBITED`; and
- release: `PRIVATE-BLOCKED`.
