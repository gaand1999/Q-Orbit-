# Q-Orbit Engineering Design Handbook V0.11R1

## Chapter 7 — Reference Simulation, Mission-Case Screening & Tabuk Evidence Readiness

> **V0.11R1 correction control (24 August 2026).** This derivative chapter preserves all historical numerical outputs but corrects their interpretation. V0.7 sensitivity is reported against both the clipped nonnegative key and the signed finite-key margin; neither ranking is reliability. Inclusive one-second samples are labelled as bins separately from endpoint elapsed time. The 239-item trace is individual desk allocation, not proof of implemented requirement-to-code-to-test closure.

| Document field | Value |
|---|---|
| Document ID | QO-EDH-CH07 |
| Version | Integrated Desk Baseline V0.11R1 |
| Date | 21 August 2026 |
| Parent method | QO-EDH-CH06 V0.11R1 |
| Historical analysis cases | `CASE-S1-REF-001`; `CASE-M1-SYN-RUH-001` |
| Historical run identity | `QO-SIM-CASE-S1-REF-001-RUN-001` plus V0.7 mission-case manifest |
| Tabuk case | Not frozen; no real parcel, orbit, terminal, detector, or acceptance case |
| Reporting class | Reproduced fixture plus synthetic sensitivity evidence; no Tabuk result |
| Gate target | Integrated SIM-G1 review candidate; SCI-G1 and SIM-G1 remain not passed |
| Carry-forward | QO-GATE-CF-002; V0.6, V0.7, V0.9, and V0.10 controlled evidence |
| Tabuk-specific controlled run | **NOT RUN** |
| Quantitative Tabuk result | **NONE** |
| Laser emission state | **INHIBITED** |
| Release state | **PRIVATE-BLOCKED**; PR-GATE-01/GATE-12 not authorized |

---

## 7.1 Purpose and reading rule

This chapter preserves the V0.5/V0.6 reference-fixture execution, records the
V0.7 synthetic mission-case sensitivity result, and binds both to the V0.10
Tabuk ground-segment evidence contract. These are three distinct questions:

1. can the Chapter 6 finite-key pipeline reproduce one frozen reference fixture
   and preserve fail-closed outcomes under the twelve base negative cases;
2. does a decomposed synthetic orbit/site/link case remain positive across its
   declared multi-parameter screening space; and
3. is there enough controlled evidence to freeze and run a Tabuk-specific case?

The answers are respectively: bounded computational reproduction, no robust
positive conclusion over the V0.7 screening space, and `NOT RUN` for Tabuk.
The historical results are not Q-Orbit hardware or mission performance
estimates. No real Tabuk parcel, operational ephemeris, weather record, optical
terminal, detector, authentication construction, entropy source, laser case,
or EKM implementation is represented.

Terms such as `positive`, `reproduced`, and `passed` apply only to the exact
fixture, screen, or structural audit named. They do not mean operationally
secure, site-qualified, validated, certified, approved, publishable, or
mission-ready.

---

## 7.2 Gate context

`ARCH-G1`, `SCI-G1`, and `SIM-G1` remain unpassed. QO-GATE-CF-002 permits a
private, bounded computational continuation without implying gate closure.
V0.10 adds thirteen explicit evidence gates: only GATE-00 is `PASS-DESK`;
four are `DEFERRED`, seven are `BLOCKED`, and GATE-12 is `PRIVATE-BLOCKED`.

Historical fixture `PASS` states for authentication, device health, entropy,
policy, data, configuration, and evidence exercised orchestration logic only.
They are not operational evidence for unbuilt components and cannot be carried
into a Tabuk case as acquired evidence. Formal SIM-G1 disposition still
requires named technical reviewers and an authorized decision record.

---

## 7.3 Historical frozen reference case

### 7.3.1 Identity and topology

`CASE-S1-REF-001` is one direct QKD-A transmitter to QKD-B ground-receiver
downlink. The retained SatQuMA v1.0.0 `FS_loss_XI0.csv` curve supplies relative
time, elevation, and aggregate link efficiency for a zero-offset reference
pass. The curve is not an ephemeris and has no authorized Q-Orbit site
coordinates.

### 7.3.2 Source identities

| Source | Frozen identity | Use |
|---|---|---|
| Primary paper | Sidhu et al., *npj Quantum Information* 8, 18 (2022), DOI `10.1038/s41534-022-00525-3` | Finite-block single-pass method, Eq. 4, statistical and operational context |
| Author code | SatQuMA tag `v1.0.0`, commit `6012c072031a951398a245b45f4e7835c00114ad` | Separate internal numerical comparison |
| Author loss data | `FS_loss_XI0.csv`, SHA-256 `2d8eca7992d0fe738bf25c1896b1aa5efe39fd81805fbf84464863f3777b5874` | Aggregate time-dependent link-efficiency input |
| Q-Orbit manifest | QO-SIM-RUN-MANIFEST-001 V0.5 | Exact case, inputs, gates, tolerances, and claim boundary |

### 7.3.3 Principal frozen values

| Quantity | Value | Interpretation |
|---|---:|---|
| Nominal curve zenith loss | 26.989700 dB | Derived from reference efficiency 0.002 |
| Additional system loss | 13 dB | Author-code comparison input |
| Total zenith loss | 39.989700 dB | Sum used in this fixture |
| Time sample | 1 s | Exact retained CSV spacing |
| Candidate half-window search | 1–221 s | Exhaustive integer screen |
| Source rate | 100 MHz | Retained author-code example value |
| Intensities | 0.7921, 0.1707, 0 | Mean photons per pulse |
| Intensity probabilities | 0.7501, 0.1749, 0.0750 | Sum checked to one |
| X-basis probability | 0.7611 at each endpoint | Author code uses one value for both endpoints |
| Extraneous-count probability | 5 × 10⁻⁷ per pulse/gate | Aggregate background-plus-dark fixture term |
| Afterpulse probability | 0.001 | Reference input |
| Intrinsic error | 0.005 | Aggregate reference-fixture fraction |
| Secrecy / correctness | 10⁻⁹ / 10⁻¹⁵ | Reference-study values, not an approved Q-Orbit profile |
| Statistical construction | Inverse multiplicative Chernoff | Selected reference convention |
| Error-correction estimate | Finite-block `logM` expression | Compared with the retained author implementation |

The companion 74-row freeze register records every value, derivation,
justified N/A, source locator, applicability statement, sensitivity treatment,
owner, and change record. The run contains zero unresolved required rows.

---

## 7.4 Execution method

The Q-Orbit implementation reads the hash-checked loss curve, evaluates
expected detections and errors by intensity and time slot, applies the selected
Chernoff corrections, derives the vacuum and single-photon lower bounds and
phase-error upper bound, evaluates finite-block error-correction leakage, and
then applies the cited finite secret-key-length expression.

The five protocol variables are fixed. Only the transmission half-window is
screened. Every integer value from 1 through 221 seconds is evaluated, the
floored finite key is the objective, and the smaller half-window wins an exact
tie. Consequently, “selected” means best in this one-dimensional frozen screen;
it is not a global protocol optimum.

No random sampling is used. The model evaluates deterministic expectation
values. A second identical execution must reproduce all discrete and numeric
outputs exactly on the retained environment.

---

## 7.5 Historical reference-fixture result

The screen selected the interval from −102 s to +102 s: 205 one-second count
bins with an edge elevation of approximately 30.481355°.

| Output | Value |
|---|---:|
| Raw pre-floor finite key | 41,338.62418456675 bits |
| Reported finite key | **41,338 bits/pass** |
| X-basis QBER | 0.017422686665352745 (1.742269%) |
| X-basis phase-error bound | 0.09270161340569935 (9.270161%) |
| X-basis detection events `n_X` | 492,818.0901525894 |
| Z-basis detection events `n_Z` | 48,555.17200782972 |
| X-basis error events `m_X` | 8,586.215167746126 |
| Error-correction leakage `lambda_EC` | 65,385.40180119235 bits |
| Vacuum lower bound `s_X,0` | 5,047.784882329125 |
| Single-photon lower bound `s_X,1` | 183,803.04893680647 |
| Finite security penalty | 256.5669430839006 bits |

### 7.5.1 Exact outcomes

| Outcome | Baseline state | Meaning in this fixture |
|---|---|---|
| OUT-1 — physical link | `POSITIVE` | The retained reference link data passed the model-input checks |
| OUT-2 — QKD acceptance | `POSITIVE` | The finite-key candidate is positive and all fixture gates are `PASS` |
| OUT-3 — replenishment | `POSITIVE` | Both simulated EKM records reached matching committed/available state |
| OUT-4 — consumer delivery | `NOT-ATTEMPTED` | Delivery remains a separate transaction and was intentionally excluded |

The positive OUT-2 and OUT-3 states are descriptive modeled outputs. They do
not demonstrate a secure implementation, a flight terminal, an approved
protocol, an operational EKM, or mission suitability.

---

## 7.6 Reproduction evidence

Two checks were completed:

1. An identical Q-Orbit rerun reproduced the selected half-window, all numeric
   intermediates, and OUT-1 through OUT-4 exactly.
2. The separately structured internal Q-Orbit calculation was compared with the
   retained SatQuMA v1.0.0 author code for the selected window. All twelve
   compared numeric outputs fell within the tolerances recorded in the V0.5
   manifest before the comparison artifact according to retained file
   chronology. No signed commit or external timestamp proves that chronology.
   The maximum absolute difference was
   `8.731149137020111e-11`.

The author source file was not edited. A compatibility harness mapped the
removed NumPy 2.x `np.math` alias to Python `math` and changed only user-input
selectors in memory. Source and data hashes were checked first.

This establishes computational agreement for one retained fixture. It is not
an independent security proof, general validation of SatQuMA, or system
validation.

---

## 7.7 Historical one-at-a-time loss sensitivity

All non-loss inputs were frozen while the additional system loss was changed in
1 dB steps. The half-window was re-screened at each step.

| Total zenith loss | Selected half-window | Finite key |
|---:|---:|---:|
| 36.989700 dB | 160 s | 204,727 bits |
| 37.989700 dB | 138 s | 134,002 bits |
| 38.989700 dB | 120 s | 80,902 bits |
| 39.989700 dB | 102 s | 41,338 bits |
| 40.989700 dB | 86 s | 11,953 bits |
| 41.989700 dB | 1 s | 0 bits |

The grid shows a zero-key transition somewhere between the last positive and
first zero rows for this fixed protocol and channel curve. It does not identify
an exact physical threshold, probability of success, or mission margin.

---

## 7.8 Negative and indeterminate controls

All twelve Chapter 6 controls were executed. Each reached its specified safe
state.

| Case | Injection | Observed safe state |
|---|---|---|
| NEG-01 | Authentication failure | OUT-2 `REJECTED`; no EKM attempt |
| NEG-02 | Stale decision data | OUT-2 `REJECTED` |
| NEG-03 | Conflicting decision data | OUT-2 `INDETERMINATE` |
| NEG-04 | +20 dB excess-loss finite-key rejection | OUT-2 `NO-KEY` |
| NEG-05 | Unknown device/calibration | OUT-2 `INDETERMINATE` |
| NEG-06 | Configuration mismatch | Run `INVALID`; OUT-2 `INVALID-RUN` |
| NEG-07 | Partial EKM commit | OUT-3 `AMBIGUOUS-QUARANTINED` |
| NEG-08 | Wrong consumer binding | OUT-4 `FAILED-DENIED` |
| NEG-09 | One-sided delivery acknowledgement | OUT-4 `AMBIGUOUS-HOLD` |
| NEG-10 | AQMO loss without preauthorization | OUT-3 `NOT-ATTEMPTED` |
| NEG-11 | Evidence-continuity failure | OUT-2 `REJECTED` |
| NEG-12 | Missing release record | Release `BLOCKED` |

Safe-control coverage for this selected suite is **12/12**. This metric means
only that the implemented test oracle observed each specified state. It is not
security coverage over all attacks, failures, implementations, or environments.

---

## 7.9 Limitations

1. The link curve aggregates geometry, aperture, wavelength, pointing,
   atmospheric, turbulence, coupling, receiver, and detector effects; those
   terms cannot be independently interpreted from this run.
2. The curve is author-distributed modeled reference data associated with an empirically derived channel/system model; it is not an authorized orbit/site case or raw Q-Orbit measurement.
3. Expected counts are used; no stochastic detector sampling, covariance,
   weather, or source-intensity uncertainty is propagated.
4. Fixed protocol values came from the retained author-code example and were
   not globally optimized under the selected error-correction model.
5. Authentication, device, entropy, policy, and EKM behavior are gate/state
   fixtures, not implementations.
6. The calculation does not establish practical side-channel resistance,
   endpoint compromise resistance, denial-of-service availability, or
   composable security for an unspecified Q-Orbit device.
7. No mission threshold or authority is present, so no result is mission
   pass/fail.
8. The study includes one direct prepare-and-measure profile; it cannot be
   generalized to other QKD families or network topologies.
9. No historical result is a Tabuk result. The V0.5/V0.6 curve is a retained
   reference fixture and the V0.7 site is a Synthetic Riyadh modeling point.

---

## 7.10 Historical SIM-G1 review disposition (V0.5)

The package is complete enough to be reviewed as a `SIM-G1` candidate because
it contains a frozen manifest, a complete 74-row run register, source and data
hashes, an executable separate internal reimplementation, a deterministic rerun, an
author-code comparison, a sensitivity screen, twelve negative controls, exact
outcomes, and explicit limitations.

`SIM-G1` is **not passed**. Named review is still required for method
reproduction, source applicability, code correctness, gate semantics, security
interpretation, and the decision to proceed toward a mission-specific case.

---

## 7.11 Evidence progression after the reference fixture

The integrated evidence chain shall be read in order. Later packages add context and constraints; they do not retroactively turn an earlier fixture into mission evidence.

| Package | Evidence added | Controlled result | Current interpretation |
|---|---|---|---|
| V0.5 / V0.6 | Hash-pinned reference fixture, internal reimplementation, author-code comparison, twelve negative controls | `41,338 bits/pass` for `CASE-S1-REF-001` | Reproduced modeled fixture only; not site or hardware performance |
| V0.7 | Synthetic orbit/site geometry, decomposed mean link, 8,192-point joint screen | Nominal `540,673 bits/pass`; 3,947/8,192 positive (`48.181%`); raw-key median `zero` | Evidence pipeline works, but the candidate is parameter-sensitive and not mission-ready |
| V0.8 | Site/terminal evidence-acquisition contracts | No performance run | Identified P0 evidence needed before a new mission case |
| V0.9 / R1 | Tabuk region and three desk-screening records | No performance run | West Tabuk first search is a management decision; the Lawz point is legacy/non-strict after fallback; Bajdah remains on hold |
| V0.10 | 103 requirements, 109 parameters, fourteen interfaces, thirteen gates | No performance run | Ground-segment input and acceptance contract; 99 exact values remain `TBD` |
| V0.11R1 | Chapter 6-to-7 allocation and fail-closed run rules | Tabuk-specific run `NOT RUN`; quantitative Tabuk result `NONE` | Integration completed without inventing site, terminal, laser, or mission values |

### 7.11.1 V0.7 robustness warning

`CASE-M1-SYN-RUH-001` used a deliberately phased synthetic orbit over a Synthetic Riyadh modeling point, literature-informed screening assumptions, and a reduced mean-loss model. Its nominal result was positive, but the joint screen left only 3,947 of 8,192 samples positive and placed the raw-key median at zero. For the clipped nonnegative deliverable-key metric, the first five rank correlations were receiver aperture, beam divergence, extraneous-count probability, zenith atmospheric transmission, and filter/coupling efficiency. For the signed finite-key margin, the leading three were extraneous-count probability, receiver aperture, and beam divergence. The change is caused by 4,245 tied zeros after clipping; neither order is a unique global-influence or reliability ranking.

The positive-sample fraction is not mission reliability because the ranges were uniform engineering screens, not calibrated probability distributions. The V0.7 nominal number shall not be re-labeled as a Tabuk yield, scaled by site elevation, or used as a requirement.

The Synthetic Riyadh result is not a Tabuk result.


### 7.11.1 R1 timing-label correction

The selected synthetic pass contains `504` inclusive one-second sample bins from offset `-250` s through `253` s. The endpoint-to-endpoint elapsed interval is `503` s. The legacy `usable_duration_s=504` field is retained only as a historical bin-count label.

## 7.12 Tabuk simulation input contract

A Chapter 7 run manifest shall assign every input one of three use classes:

| Use class | Permitted content | Required handling |
|---|---|---|
| `CONTROLLED-METHOD` | Frozen case identity, method family, gate invariant, EKM invariant, emission inhibit, release state | Bind exact ID/version/hash; do not interpret as performance evidence |
| `RESEARCH-ASSUMPTION` | Explicit literature-informed or engineering range used only for method/sensitivity work | Label non-binding, retain source/range/units, isolate from design values, prohibit mission/site claims |
| `ACCEPTANCE-INPUT` | Authority-, site-, hardware-, metrology-, model-, or operational-test evidence appropriate to the decision | Require applicable gate `PASS`, complete provenance, approval, uncertainty and exact-case freeze |

The following substitutions are prohibited:

- `SITE-SYN-RUH-001` or a V0.9 desk cell in place of a surveyed Tabuk telescope reference point;
- an assumed or synthetic orbit in place of GATE-01 authority evidence;
- NASA POWER, DEM, qualitative dark-sky language, or airport distance in place of local measured/site-authority evidence;
- V0.7 wavelength, aperture, divergence, pointing, efficiency, atmosphere, detector, background, or error values in place of calibrated candidate data;
- fixture gate `PASS` states in place of device, authentication, timing, KMS/EKM, safety, or operational evidence; and
- a positive finite-key candidate in place of GATE-11 mission thresholds and approval.

### 7.12.1 Current 109-parameter disposition

The V0.10 baseline contains 99 exact `TBD` values, three partial values containing an unresolved component, and seven frozen controls. The seven frozen controls are method or safety/release invariants—not a numerical station design. Therefore no Tabuk parameter freeze exists.

The current run precondition is:

```text
requested_use = TABUK_MISSION_CASE
if any required parameter is TBD, partial, stale, unapproved, unit-incompatible,
or missing its required evidence class:
    run_state = NOT RUN
    quantitative_tabuk_result = NONE
    acceptance_state = BLOCKED
```

A private research sensitivity run may use declared assumptions only under a new case ID and manifest. It must not inherit a Tabuk label merely because the region has been adopted.

## 7.13 Requirement-to-simulation allocation

All 103 V0.10 requirements are allocated to an explicit simulation behavior. The detailed row-level mapping is in `QO-EDH-CH06-CH07-INT-TRACE-001 V0.11R1`.

| Requirement domain | Rows | Chapter 7 enforcement |
|---|---:|---|
| Governance & Evidence | 10 | Validate case identity, claim class, release state, evidence class and change control before execution/reporting |
| Mission Geometry & Time | 9 | Build geometry only from approved orbit/time/reference-point inputs; reject provisional or stale data |
| Site, Facility & Infrastructure | 12 | Bind parcel, surveyed horizon and facility constraints to access/readiness; no desk-cell acceptance |
| Optical Terminal & PAT | 12 | Decompose aperture, throughput, coupling, acquisition and tracking with calibrated uncertainty |
| QKD Source, Receiver & Detector | 14 | Bind implementation profile, source/detector characterization, finite block and proof mapping; no QBER-only acceptance |
| Atmosphere, Background & Metrology | 10 | Use local wavelength- and geometry-relevant inputs with time alignment, uncertainty and validation |
| Laser Safety & Airspace | 10 | Preserve `INHIBITED`; model no operational emission permission from a computed pass |
| Timing & Classical Communications | 6 | Enforce authoritative time, authenticated/fresh exchanges, integrity, segmentation and fail-safe outcomes |
| Key Management, Cybersecurity & EKM | 10 | Preserve identity, two-sided commit, quarantine and consumer-delivery boundaries |
| Operations, Verification & Acceptance | 10 | Apply readiness/abort gates, calibration state, evidence completeness, thresholds and independent review |

The simulation shall record the applicable requirement IDs in each stage result. A numeric calculation without the required non-numeric gates may be stored as a rejected or descriptive diagnostic, but it cannot become OUT-2, OUT-3, site qualification, or mission acceptance.

## 7.14 Interface and gate enforcement

### 7.14.1 Interface state

V0.10 defines fourteen interfaces: eight are `OPEN`, four are `DEFERRED`, and two are `BLOCKED`. `OPEN` means the contract exists; it does not mean the exchange is implemented. Chapter 7 shall model missing, stale, conflicting, invalid, duplicated, delayed, or unauthenticated interface data as explicit non-permissive states.

The most consequential current boundaries are:

- `IF-001`, `IF-003`, `IF-006`, and `IF-013` are deferred because their real mission/site/authority inputs do not exist;
- `IF-005` is blocked and the safety controller shall not expose emission enable as available;
- `IF-010` is blocked and consumer delivery shall remain `NOT-ATTEMPTED` or denied; and
- `IF-012`/`IF-014` must bind configuration and evidence identities even for private research runs.

### 7.14.2 Gate behavior by requested use

| Requested use | Minimum gate behavior | Current V0.11R1 result |
|---|---|---|
| Load schema/method for private desk analysis | GATE-00 `PASS-DESK`; exact artifact identity | Permitted |
| Reproduce V0.6 fixture | Historical V0.6 manifest and fixture gates only | Already executed; historical result retained |
| Run non-binding sensitivity case | New explicit assumption manifest; no Tabuk/site/mission claim; private release state | Permissible in principle, not executed in V0.11R1 |
| Run a Tabuk mission-specific case | GATE-01–06, GATE-09–11 applicable evidence resolved and approved; GATE-02–04 no longer deferred | `NOT RUN` |
| Claim field laser readiness or outdoor emission | GATE-02–08 applicable evidence and authority disposition; `LAS-004` changed only by authorized decision | Prohibited; `INHIBITED` |
| Publish or deploy | GATE-12 and PR-GATE-01 explicitly approved for the exact artifact/claim | Prohibited; `PRIVATE-BLOCKED` |

Laser-product and airspace gates do not create a numerical link input for an offline model. They do, however, block any interpretation that the modeled opportunity can be executed in the field.

## 7.15 Planned Tabuk-specific negative and indeterminate cases

These cases extend the twelve historical regression controls. They are specifications only and are `NOT RUN` in V0.11R1.

| Case | Injection | Required safe result |
|---|---|---|
| `NEG-TAB-01` | A `PROVISIONAL-DESK-CELL` is supplied as the surveyed telescope point | Run invalid for Tabuk acceptance; GATE-02/03 non-permissive |
| `NEG-TAB-02` | Orbit product lacks authority, covariance, time/frame metadata, or freshness | Geometry stage `INDETERMINATE`/`NOT RUN`; no pass acceptance |
| `NEG-TAB-03` | Coarse regional cloud/aerosol proxy is substituted for local evidence | Site-specific availability/background conclusion blocked |
| `NEG-TAB-04` | Any required terminal/PAT parameter remains `TBD` or uses an unlabeled V0.7 assumption | Accepted link-budget run blocked; diagnostic sensitivity only if explicitly reclassified |
| `NEG-TAB-05` | Detector, entropy, calibration, or security-proof evidence is missing | OUT-2 `INDETERMINATE`; no accepted key handoff |
| `NEG-TAB-06` | Emission enable is requested while `LAS-004 = INHIBITED` | Request denied; safe state and auditable reason recorded |
| `NEG-TAB-07` | No written GACA/SANS or competent-authority disposition exists | Outdoor emission remains inhibited regardless of airport distance or pass geometry |
| `NEG-TAB-08` | Mission pass/fail is requested without approved demand, availability, recovery and evidence thresholds | Only descriptive result permitted; mission conclusion blocked |
| `NEG-TAB-09` | External release is requested while GATE-12 is `PRIVATE-BLOCKED` | Release denied; exact artifact remains private |

## 7.16 Current integrated disposition

The integration task is complete, but no new physics or mission run was justified. The controlling outcome is:

| Item | State | Meaning |
|---|---|---|
| Chapter 6 requirements/interface integration | `PASS-DESK` | All V0.10 source items are allocated and traceable |
| Historical reference fixture | Preserved | `41,338 bits/pass` remains a V0.5/V0.6 reproduction result only |
| Historical synthetic mission screen | Preserved with warning | Nominal `540,673 bits/pass`, but only `48.181%` positive and median zero over the declared V0.7 screen |
| Tabuk-specific controlled run | **`NOT RUN`** | Required orbit, parcel, site, atmosphere, terminal, detector and acceptance evidence is unresolved |
| Quantitative Tabuk result | **`NONE`** | No key yield, availability, margin, rate, or pass/fail is claimed |
| Parcel/field/authority execution | `DEFERRED` | Retained for the later physical phase |
| Laser emission | **`INHIBITED`** | No field-emission authorization exists |
| Release | **`PRIVATE-BLOCKED`** | No publication or deployment authority exists |

The next permitted desk step is to close design-definition inputs that do not require a parcel—such as the candidate terminal data contract, model validation plan, and approved QKD/security profile decision package—while preserving all site-dependent values as `TBD`. A Tabuk mission-specific simulation becomes appropriate only after its required evidence class and gate are satisfied.
