# Q-Orbit Engineering Design Handbook V0.4

## Chapter 6 — Scientific Model, Assumptions & Analysis Method

| Document field | Value |
|---|---|
| Document ID | QO-EDH-CH06 |
| Version | SCI-G1 Review Draft V0.4 |
| Date | 18 August 2026 |
| Parent baseline | QO-EDH-REG-001 V0.2; QO-EDH-CH01–04 V0.2; QO-EDH-CH05 V0.3 and Annexes 5-A–5-E |
| Companion register | QO-EDH-CH06-ANN-A — Parameter & Provenance Register V0.4 |
| Primary method source | Sidhu et al., *npj Quantum Information* 8, 18 (2022), DOI 10.1038/s41534-022-00525-3 |
| Phase | P2 — Scientific method |
| Gate target | SCI-G1 review candidate; gate not passed |
| ARCH-G1 dependency | Proceeding under QO-GATE-CF-001 carry-forward; ARCH-G1 remains not passed |
| Simulation state | **NOT RUN** |
| Quantitative Q-Orbit result | **NONE** |
| Information handling | Preliminary, private, non-operational; public release requires PR-GATE-01 |

> **Scope boundary.** This chapter freezes the structure of a future analysis. It does not select a real orbit, ground site, optical terminal, QKD device, EKM product, authentication construction, or mission threshold. It reports no modeled or measured Q-Orbit performance and makes no security, feasibility, certification, or operational-readiness claim.

---

## 6.1 Purpose and interpretation

This chapter defines a reproducible method for asking a bounded scientific question about the Q-Orbit reference concept. It fixes:

1. the research question and falsifiable preliminary hypothesis;
2. the reference analysis case and applicability boundary;
3. the geometry, link, finite-block QKD, gate, and EKM-state model structure;
4. the parameter and provenance schema;
5. uncertainty and sensitivity treatment;
6. exact outcome and metric semantics;
7. run-record and reproducibility requirements; and
8. the conditions that restrict a future result to descriptive or sensitivity-only reporting.

The chapter deliberately does not fill unresolved values merely to make a model executable. A missing value, source, applicability rationale, authority, or acceptance threshold remains visible as `TBD`, and any result that depends on it is blocked or limited accordingly.

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
| Endpoint B | Ground domain; QKD-B reference receiver; EKM-B; local representative Consumer B | Logical allocation only; no site or facility selected |
| Opportunity | One candidate pass processed as one finite block | `[A:A-001]`; exact orbit and interval remain TBD-003 |
| Direction/profile | Downlink, prepare-and-measure, polarization-encoded efficient BB84, phase-randomized weak coherent pulses, one signal and two decoy intensities | `[ED:ED-006]`; analysis profile only, not protocol approval |
| Finite-key reference | Single-pass method described by Sidhu et al. 2022 | `[ED:ED-007]`; equations and conventions require independent reproduction |
| Mission outcome | Two-sided EKM inventory replenishment, OUT-3 | `[ED:ED-005]`; consumer delivery is separate OUT-4 |
| Orchestration | AQMO may filter, rank, reserve, monitor, and replan qualified opportunities using permitted metadata | `[ED:ED-010]`; no key values or local-gate override |
| Orbit/site instantiation | Not selected | TBD-003; CASE-S1 is a structure, not a real mission case |
| Optical/device instantiation | Not selected | TBD-004 and TBD-006 |
| Mission thresholds | Not defined | TBD-002 and TBD-013; results remain descriptive/sensitivity-only |

### 6.3.2 Applicability boundary

CASE-S1 can answer only questions about the declared direct, single-pass, profile-specific model. It cannot be generalized without new evidence to:

- uplink, entanglement-based, continuous-variable, measurement-device-independent, or other protocol families;
- multi-satellite, constellation, trusted-relay, repeater, or remote-consumer networks;
- a named country, customer, spacecraft, orbit, ground station, product, HSM, or optical terminal;
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

No coordinate, ephemeris, or pass interval is selected in this chapter. `[TBD:TBD-003]`

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

The selected optical formulation, wavelength, apertures, divergence, pointing distribution, atmospheric model, background model, detector behavior, and coupling losses remain open under TBD-004 and TBD-006.

Published experiment or demonstration values may be used only as separately labeled comparison or sensitivity inputs after applicability review. They are not default Q-Orbit design values. `[ED:ED-007]`

---

## 6.7 Finite-block QKD method

### 6.7.1 Reference profile

The computational reference is the CASE-S1 efficient-BB84 weak-coherent-pulse profile with three intensities: one signal and two decoy intensities, including a vacuum intensity under the cited method. `[V:CE-016]` `[ED:ED-006]`

Limited satellite contact can make asymptotic analysis optimistic because finite received blocks require statistical finite-key treatment. `[V:CE-015]`

### 6.7.2 Reference secret-key-length expression

The future implementation shall independently reproduce the definitions, conventions, statistical bounds, and conditions associated with the Sidhu et al. reference expression:

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

The equation above identifies the computational contract. It is not proof that Q-Orbit has implemented or validated the method. REQ-MOD-001 requires independent reproduction against reference equations, conventions, test vectors, and boundary cases before any result is marked validated.

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

Every used numeric input shall resolve to QO-EDH-CH06-ANN-A and contain:

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

A rerun using the retained environment and run record shall reproduce discrete outcomes exactly and numeric results within a tolerance frozen before comparison. The tolerance is not defined in this chapter and remains open under TBD-005 and TBD-015. `[REQ-MOD-009]`

---

## 6.14 Planned negative and indeterminate cases

The future controlled suite shall include at least:

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

These are test specifications, not executed tests. `[A:A-008]`

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
| Parameter/provenance schema | REQ-MOD-002 through REQ-MOD-004 | QO-EDH-CH06-ANN-A and run manifest |
| Gate lattice | REQ-MOD-005; Chapter 4 QKD/CYB/DAT requirements | Per-gate records and negative-case suite |
| Outcomes/metrics | REQ-MOD-006 through REQ-MOD-007; Chapter 3 §3.12 | Result schema |
| Fault cases | REQ-MOD-008 | Controlled fault-run evidence |
| Reproducibility | REQ-MOD-009 | Independent rerun record |
| Threshold/report boundary | REQ-MOD-010; REQ-REL-006 | Threshold register and release review |
| Visual method | FIG-011 V0.4 | Source SVG, caption, alt text, checksum |

---

## 6.17 SCI-G1 review candidate

### 6.17.1 Evidence assembled

1. a single controlled research question and two-branch falsifiable hypothesis;
2. CASE-S1 method boundary with no invented orbit, site, device, or threshold;
3. AP-01 through AP-09 pipeline and gate semantics;
4. finite-block reference expression and applicability controls;
5. parameter/provenance, uncertainty, outcome, metric, and reproducibility contracts;
6. twelve planned non-success cases; and
7. companion Parameter & Provenance Register and FIG-011.

### 6.17.2 Items required before declaring SCI-G1 passed

1. named research, QKD, optical, orbit, model, security, evidence, and configuration reviewers inspect the exact artifacts within their competence;
2. the Sidhu et al. method, conventions, and source-code reference are independently reproduced or an explicit blocked disposition is recorded;
3. required schema fields and unit/identity checks are exercised against representative non-result fixtures;
4. every material finding and disposition is recorded against the exact artifact versions;
5. the private website derivative is checked against this chapter, the register, and FIG-011; and
6. an authorized record explicitly states the SCI-G1 decision.

### 6.17.3 Gate boundary

This package is an **SCI-G1 review candidate**, not a passed gate. Even a future positive SCI-G1 disposition would freeze only the research method and analysis-configuration structure. It would not establish a positive feasibility result, approve a protocol or device, validate a system, close ARCH-G1, or authorize public release.

---

## 6.18 Primary method source and currency note

- J. S. Sidhu et al., “Finite key effects in satellite quantum key distribution,” *npj Quantum Information* 8, Article 18 (2022), [https://doi.org/10.1038/s41534-022-00525-3](https://doi.org/10.1038/s41534-022-00525-3). Open-access publisher record and method text checked 18 August 2026.

The source supports the finite-block, single-pass, three-intensity/two-decoy efficient-BB84 analysis structure and the cited key-length expression. Its numerical study values and its specific empirical channel construction are not Q-Orbit design values. Publication status, corrections, method applicability, and referenced implementation shall be rechecked at each controlled baseline.

