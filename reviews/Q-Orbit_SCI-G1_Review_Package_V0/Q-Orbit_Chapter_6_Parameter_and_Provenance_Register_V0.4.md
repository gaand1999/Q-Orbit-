# Q-Orbit Chapter 6 — Parameter & Provenance Register V0.4

| Register field | Value |
|---|---|
| Document ID | QO-EDH-CH06-ANN-A |
| Version | SCI-G1 Schema Draft V0.4 |
| Date | 18 August 2026 |
| Parent | QO-EDH-CH06 V0.4 |
| Analysis case | CASE-S1 |
| Register state | Structure drafted; numeric configuration not frozen |
| Simulation state | **NOT RUN** |
| Frozen numeric Q-Orbit parameters | **0** |
| Information handling | Preliminary, private; PR-GATE-01 required for public release |

> **Control statement.** This register freezes parameter identities and required provenance fields, not parameter values. `TBD` is an intentional non-value. No row may be silently populated from a demonstration paper, vendor sheet, web page, or analyst estimate without the source, applicability, uncertainty, and sensitivity fields required below.

---

## 1. Entry schema

Every parameter used by a controlled run shall contain all fields below.

| Field | Required content |
|---|---|
| `parameter_id` | Stable ID from this register |
| `name_symbol` | Unambiguous semantic name and mathematical/code symbol |
| `group` | Controlled parameter group |
| `value_mode` | `fixed`, `range`, `distribution`, `derived`, `categorical`, or `TBD` |
| `value_definition` | Numeric value/range/distribution/formula/category or explicit `TBD` |
| `unit_convention` | SI unit or explicit dimensionless/state convention |
| `uncertainty` | Bound, distribution, covariance/correlation treatment, or `not applicable` with rationale |
| `source_locator` | Controlled source ID plus exact table/equation/section/data-record locator |
| `source_status` | Primary/official/characterization/decision/assumption plus review date |
| `applicability` | Why the source applies to CASE-S1 and where it does not |
| `sensitivity` | Fixed, screened, swept, sampled, structural scenario, or excluded with rationale |
| `owner_tbd` | Owner role and applicable `TBD-*` |
| `freeze_state` | `unresolved`, `candidate`, `reviewed`, or `frozen-for-run` |
| `change_record` | Version, author/role, date, reason, and impact trace |

### 1.1 Freeze rule

A row may become `frozen-for-run` only when its value definition, unit, uncertainty, source locator, source status, applicability rationale, sensitivity treatment, owner, and change record are complete. A required `unresolved` row blocks controlled execution.

### 1.2 Source hierarchy

Preferred routes, in order, are:

1. mission- or configuration-authority decision for mission thresholds and policy values;
2. versioned orbit/site/source data for case-specific state;
3. device characterization and calibration evidence for hardware behavior;
4. primary scientific or official technical sources for model structure;
5. an explicitly labeled assumption or sensitivity range when no stronger source exists.

A source higher in this list is not automatically applicable. Applicability must still be recorded.

---

## 2. Register inventory

### 2.1 Case, time, orbit, and site

| ID | Name / symbol | Value mode and current definition | Unit/convention | Provenance and applicability | Sensitivity / owner / state |
|---|---|---|---|---|---|
| CASE-001 | Analysis case ID | fixed: `CASE-S1` | identifier | QO-EDH-CH06 §6.3; direct single-pass method only | fixed; model owner; candidate |
| CASE-002 | Topology profile | categorical: direct QKD-A/QKD-B downlink | state | ED-003, ED-006; excludes relay/uplink/other families | structural; system owner; candidate |
| TIME-001 | Analysis start | TBD | UTC or declared time scale | versioned case manifest required | screen; orbit analyst / TBD-003; unresolved |
| TIME-002 | Analysis end | TBD | UTC or declared time scale | versioned case manifest required | screen; orbit analyst / TBD-003; unresolved |
| TIME-003 | Integration step `dt` | TBD | s | numerical-convergence study required | sweep; model owner / TBD-003; unresolved |
| TIME-004 | Time system and conversion set | TBD | named scale/version | authoritative time/conversion source required | structural; orbit analyst / TBD-003; unresolved |
| ORB-001 | Orbit-state source | TBD | source/version/hash | versioned ephemeris or declared synthetic case | structural; orbit analyst / TBD-003; unresolved |
| ORB-002 | Orbit epoch and reference frame | TBD | epoch + frame | must resolve with ORB-001 | structural; orbit analyst / TBD-003; unresolved |
| ORB-003 | Propagation/interpolation method | TBD | method/version | verification against source representation required | structural; orbit analyst / TBD-003; unresolved |
| SITE-001 | Ground-site case | categorical: generic candidate; exact site not selected | identifier | A-001, A-005; no real operational site in baseline | structural; mission/site owner / TBD-003, TBD-014; unresolved |
| SITE-002 | Site coordinates and datum | TBD | rad or deg; m; named datum | authorized site case required | sweep/structural; site owner / TBD-003, TBD-014; unresolved |
| GEO-001 | Slant range `R(t)` | derived from orbit/site/time | m | formula and dependency IDs ORB/SITE/TIME required | propagated; orbit analyst; unresolved |
| GEO-002 | Elevation `theta(t)` | derived from orbit/site/time | rad or deg, declared | formula and frame convention required | propagated; orbit analyst; unresolved |
| GEO-003 | Minimum elevation/mask `theta_min` | TBD | rad or deg | mission/site/optical constraint; paper value not inherited | sweep; site/optical owners / TBD-003, TBD-004; unresolved |
| GEO-004 | Pass-selection rule | TBD | categorical rule | rationale and tie-break method required | structural; mission analyst / TBD-003; unresolved |
| GEO-005 | Tracking/slew constraints | TBD | rad/s, rad/s², or declared | platform/terminal evidence required | sweep; platform/optical owners / TBD-003, TBD-004; unresolved |

### 2.2 Optical path and terminal behavior

| ID | Name / symbol | Value mode and current definition | Unit/convention | Provenance and applicability | Sensitivity / owner / state |
|---|---|---|---|---|---|
| OPT-001 | Optical wavelength `lambda` | TBD | m | terminal design/characterization source required | sweep; optical owner / TBD-004, TBD-006; unresolved |
| OPT-002 | Transmit aperture `D_tx` | TBD | m | no flight terminal selected | sweep; optical owner / TBD-004; unresolved |
| OPT-003 | Receive aperture `D_rx` | TBD | m | no ground terminal selected | sweep; optical owner / TBD-004; unresolved |
| OPT-004 | Beam divergence/shape model | TBD | rad + model | source and far-field/near-field applicability required | structural + sweep; optical owner / TBD-004; unresolved |
| OPT-005 | Pointing error model | TBD | rad + representation | characterization or explicit sensitivity range required | sweep/sample only if justified; GNC/optical owner / TBD-004; unresolved |
| OPT-006 | Atmospheric transmission `eta_atm(t)` | TBD | dimensionless [0,1] | wavelength/site/weather/model/version required | structural + sweep; atmospheric/optical owner / TBD-004; unresolved |
| OPT-007 | Turbulence/coupling model | TBD | named model + parameters | site/time regime and applicability required | structural + sweep; optical owner / TBD-004; unresolved |
| OPT-008 | Transmit internal efficiency `eta_tx` | TBD | dimensionless [0,1] | device characterization required | sweep; hardware owner / TBD-006; unresolved |
| OPT-009 | Receive internal efficiency `eta_rx` | TBD | dimensionless [0,1] | device characterization required | sweep; hardware owner / TBD-006; unresolved |
| OPT-010 | Detector efficiency `eta_det` | TBD | dimensionless [0,1] | characterization over wavelength/temperature/rate required | sweep; detector owner / TBD-006; unresolved |
| OPT-011 | Aggregate system detection probability `p_d(t)` | derived | dimensionless [0,1] | formula and non-overlapping dependencies required | propagated; model owner / TBD-004, TBD-006; unresolved |
| OPT-012 | Background count probability `p_bg(t)` | TBD | count/pulse or count/gate, declared | site/sky/filter/gate characterization required | sweep; detector/site owners / TBD-004, TBD-006; unresolved |
| OPT-013 | Dark-count probability `p_dark` | TBD | count/pulse or count/gate, declared | device/temperature/gate characterization required | sweep; detector owner / TBD-006; unresolved |
| OPT-014 | Timing/gate width | TBD | s | detector and synchronization evidence required | sweep; timing/detector owners / TBD-006; unresolved |
| OPT-015 | Dead-time/saturation rule | TBD | s + state rule | operating-envelope evidence required | structural + sweep; detector owner / TBD-006; unresolved |
| OPT-016 | Intrinsic error contribution `Q_intrinsic` | TBD | fraction | component-wise model or justified aggregate required | sweep; QKD hardware owner / TBD-006; unresolved |

### 2.3 Source, basis, decoy, and finite-key method

| ID | Name / symbol | Value mode and current definition | Unit/convention | Provenance and applicability | Sensitivity / owner / state |
|---|---|---|---|---|---|
| SRCQ-001 | Pulse repetition rate `f_s` | TBD | Hz | source characterization and platform timing required | sweep; source owner / TBD-006; unresolved |
| SRCQ-002 | Signal mean intensity `mu_1` | TBD | photons/pulse, dimensionless mean | source/proof dossier required; paper value not inherited | optimize/sweep; QKD specialist / TBD-005, TBD-006; unresolved |
| SRCQ-003 | Decoy mean intensity `mu_2` | TBD | photons/pulse, dimensionless mean | source/proof dossier required; `mu_1 > mu_2 > mu_3` | optimize/sweep; QKD specialist / TBD-005, TBD-006; unresolved |
| SRCQ-004 | Vacuum intensity `mu_3` | fixed method convention: `0` ideal target | photons/pulse, dimensionless mean | Sidhu et al. 2022 Eq. context/Methods; physical vacuum preparation imperfection still requires device mapping | fixed convention + device sensitivity; QKD specialist / TBD-005, TBD-006; candidate |
| SRCQ-005 | Intensity probabilities `p_1,p_2,p_3` | TBD with sum-to-one constraint | dimensionless probability | proof and optimizer configuration required | optimize; QKD specialist / TBD-005; unresolved |
| SRCQ-006 | Basis probabilities | TBD | dimensionless probability | efficient-BB84 profile; endpoint convention must be explicit | optimize; QKD specialist / TBD-005; unresolved |
| SRCQ-007 | Phase-randomization model | categorical: required by selected WCP profile; implementation TBD | state/model | proof-to-device dossier required | structural; QKD specialist / TBD-005, TBD-006; unresolved |
| SRCQ-008 | State-preparation error model | TBD | model + fraction(s) | characterization/proof applicability required | structural + sweep; QKD specialist / TBD-006; unresolved |
| FKEY-001 | Block-construction rule | categorical: one selected pass as one aggregate finite block | rule | ED-007 and Sidhu et al. method; exact selection window TBD | structural; QKD/model owners / TBD-003, TBD-005; candidate |
| FKEY-002 | Transmission half-window `Delta t` or equivalent selection | TBD | s | declared optimizer variable/bounds required | optimize; model owner / TBD-003, TBD-005; unresolved |
| FKEY-003 | Vacuum bound `s_X,0` | derived | counts | exact decoy-state estimator and finite-statistics convention required | propagated; QKD model owner / TBD-005; unresolved |
| FKEY-004 | Single-photon bound `s_X,1` | derived | counts | exact decoy-state estimator and finite-statistics convention required | propagated; QKD model owner / TBD-005; unresolved |
| FKEY-005 | Phase-error bound `phi_X` | derived | fraction | exact estimator and confidence allocation required | propagated; QKD model owner / TBD-005; unresolved |
| FKEY-006 | Error-correction leakage `lambda_EC` | derived by selected model | bits | implementation/reconciliation model and bound required | structural + sweep; QKD model owner / TBD-005; unresolved |
| FKEY-007 | Secrecy parameter `epsilon_s` | TBD | dimensionless probability | cryptographic authority/protocol dossier required; paper value not inherited | sweep; crypto/QKD authority / TBD-005, TBD-007; unresolved |
| FKEY-008 | Correctness parameter `epsilon_c` | TBD | dimensionless probability | cryptographic authority/protocol dossier required; paper value not inherited | sweep; crypto/QKD authority / TBD-005, TBD-007; unresolved |
| FKEY-009 | Statistical-bound construction | TBD | named method/version | independent reproduction of cited method required | structural; QKD model owner / TBD-005; unresolved |
| FKEY-010 | Candidate secret-key length `ell` | derived from frozen finite-key contract | bits | QO-EDH-CH06 §6.7; no acceptance without all gates | propagated; model owner; unresolved |
| FKEY-011 | Optimizer configuration | TBD | solver/algorithm/tolerance | objective, variables, bounds, start points, stopping and convergence record required | structural; model owner / TBD-005; unresolved |

### 2.4 Security, configuration, data, and device gates

| ID | Name / symbol | Value mode and current definition | Unit/convention | Provenance and applicability | Sensitivity / owner / state |
|---|---|---|---|---|---|
| GATE-001 | Classical authentication state | categorical: `PASS/FAIL/UNKNOWN` | controlled state | operational construction TBD-007; no QKD acceptance if not PASS | negative case; crypto authority / TBD-007; unresolved |
| GATE-002 | Profile/configuration identity | categorical: `PASS/FAIL/UNKNOWN` | controlled state | exact manifest/hash comparison | negative case; configuration owner; candidate schema |
| GATE-003 | Device health/calibration state | categorical: `PASS/FAIL/UNKNOWN` | controlled state | proof-to-device and characterization evidence required | negative case; device owner / TBD-006; unresolved |
| GATE-004 | Entropy/randomness state | categorical: `PASS/FAIL/UNKNOWN` | controlled state | entropy-source evidence required | negative case; device/security owners / TBD-006; unresolved |
| GATE-005 | Decision-data freshness | categorical: `PASS/FAIL/UNKNOWN` | controlled state | source contract and frozen freshness rule required | negative case; data owner / TBD-012; unresolved |
| GATE-006 | Decision-data conflict state | categorical: `PASS/FAIL/UNKNOWN` | controlled state | redundancy/conflict policy required | negative case; data owner / TBD-012; unresolved |
| GATE-007 | Policy/mission constraint state | categorical: `PASS/FAIL/UNKNOWN` | controlled state | named authority and thresholds required | negative case; mission owner / TBD-002, TBD-013; unresolved |
| GATE-008 | Evidence continuity state | categorical: `PASS/FAIL/UNKNOWN` | controlled state | audit schema/time/predecessor rule required | negative case; evidence owner / TBD-019; unresolved |

### 2.5 EKM, delivery, outcomes, and reporting

| ID | Name / symbol | Value mode and current definition | Unit/convention | Provenance and applicability | Sensitivity / owner / state |
|---|---|---|---|---|---|
| EKM-001 | Binding identifier semantics | TBD | identifier/schema | pair-state specification required | structural; key-management owner / TBD-009; unresolved |
| EKM-002 | Pair-state protocol | categorical: semantic model only | Prepared/Committed/Unknown/terminal | ED-013; implementable protocol remains TBD | negative cases; key-management owner / TBD-009; unresolved |
| EKM-003 | Commit timeout/retry/idempotency | TBD | s/count/rule | state protocol and persistence evidence required | sweep/structural; key-management owner / TBD-009; unresolved |
| EKM-004 | Quarantine/terminal disposition | TBD | state/rule | authority, persistence, destruction evidence required | structural; key-management owner / TBD-009; unresolved |
| CONS-001 | Consumer authorization/binding | TBD | schema/state | local consumer interface specification required | negative case; consumer/KMS owner / TBD-010; unresolved |
| CONS-002 | Delivery acknowledgement semantics | TBD | schema/state | two-sided delivery lifecycle specification required | negative case; consumer/KMS owner / TBD-010; unresolved |
| OUT-001 | OUT-1 state | derived enumeration | positive/negative/unknown/not-attempted | Chapter 3 §3.12 and Chapter 6 §6.12 | reported; model/evidence owner; candidate schema |
| OUT-002 | OUT-2 state | derived enumeration | positive/no-key/rejected/unknown/not-attempted | finite-key result plus all required gates | reported; model/evidence owner; candidate schema |
| OUT-003 | OUT-3 state | derived enumeration | positive/failed/ambiguous/not-attempted | matching two-sided EKM commit evidence | reported; EKM/evidence owner; candidate schema |
| OUT-004 | OUT-4 state | derived enumeration | positive/failed/ambiguous/not-attempted | separate authorized two-sided delivery evidence | reported; consumer/evidence owner; candidate schema |
| THR-001 | Mission acceptance threshold set | TBD; none defined | value/unit/authority by metric | mission need and authority required | no acceptance use; mission owner / TBD-002, TBD-013; unresolved |
| REP-001 | Numerical reproduction tolerance | TBD | absolute/relative/ULP by output | independent V&V decision required before comparison | screen; V&V owner / TBD-005, TBD-015; unresolved |
| REP-002 | Random seed | TBD per run, or explicit no-randomness declaration | integer/byte string | run record generated before execution | fixed per run; model owner; unresolved |
| REP-003 | Runtime/dependency lock | TBD | version/hash | retained environment required | fixed per run; configuration owner; unresolved |
| REL-001 | Result release state | categorical: private / blocked | controlled state | PR-GATE-01 absent for future results | not a model variable; release owner / TBD-020; candidate |

---

## 3. Completeness and readiness summary

| Check | Current state |
|---|---|
| Stable parameter identities and groups | Drafted |
| Required provenance schema | Drafted |
| CASE-S1 structure | Candidate |
| Numeric orbit/site configuration | Not selected |
| Numeric optical/device configuration | Not selected |
| Numeric QKD/security configuration | Not selected |
| Mission thresholds | None |
| Independent method reproduction | Not performed |
| Frozen-for-run numeric rows | 0 |
| Controlled simulation readiness | **Blocked by unresolved required inputs and review** |

The absence of frozen numeric values is the correct SCI-G1 state at this draft point. Populating numbers without source and applicability evidence would reduce, not increase, readiness.

---

## 4. Pre-run validation rules

Before a controlled run can start, an automated and reviewer-visible check shall confirm:

1. all required rows exist exactly once;
2. no required row is `unresolved`;
3. units are parseable and dimensionally consistent;
4. probability/range domains and sum constraints are satisfied;
5. every derived row resolves to frozen dependency IDs and an exact formula/version;
6. every numeric row has source, applicability, uncertainty, and sensitivity fields;
7. the case manifest, register, code, dependencies, data, and seed identities are immutable and hashed;
8. the gate and outcome enumerations match QO-EDH-CH06;
9. no mission threshold is used without value, unit, rationale, authority, and applicable case; and
10. the release state defaults to private/blocked.

Failure of any rule prevents a controlled result. A diagnostic or schema test may still run if it is unmistakably labeled `NON-RESULT FIXTURE` and cannot enter the results register.

