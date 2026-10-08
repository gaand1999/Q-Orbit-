# Q-Orbit Engineering Design Handbook V0.3

## Chapter 5 — Preliminary Architecture & Engineering Design

| Document field | Value |
|---|---|
| Document ID | QO-EDH-CH05 |
| Version | Working Draft V0.3 |
| Date | 16 August 2026 |
| Parent decision | PLAN-G1 approved 12 August 2026 |
| Parent material | QO-EDH-REG-001; QO-EDH-CH01 through QO-EDH-CH04; QO-ICP-001 |
| Maturity | Preliminary logical architecture; not implemented or operationally verified |
| Requirements allocation | 119/119 proposed Chapter 4 requirements allocated; 0 operationally verified |
| Open issues | TBD-001 through TBD-020 remain open |
| Gate target | ARCH-G1 review candidate; gate not passed |
| Release state | Private; public release requires positive PR-GATE-01 for the exact artifact version |

> **Architecture boundary.** This chapter defines a controlled logical architecture for the Q-Orbit reference service. It does not select flight hardware, ground facilities, products, physical cryptographic-module boundaries, protocols on the wire, numeric mission thresholds, operating sites, or an approved authentication construction. It does not demonstrate security, close an open issue, authorize implementation, or establish operational approval.

---

## 5.1 Purpose and interpretation

This chapter answers one bounded engineering question:

> How can the Chapters 1–4 reference service be divided into coherent functions, trust zones, interfaces, data classes, and responsibilities while preserving every stated claim limit and unresolved decision?

The architecture preserves five controlling propositions:

1. the reference topology is one direct QKD-A/QKD-B link, with no trusted relay or arbitrary remote-consumer distribution;
2. accepted output from QKD-A is associated only with EKM-A, and accepted output from QKD-B only with EKM-B;
3. OUT-3 replenishment is the primary mission outcome, while OUT-4 consumer delivery is a separate transaction;
4. AQMO handles constrained metadata and orchestration state, never key values or cryptographic acceptance authority; and
5. a failed or unknown required gate cannot be interpreted as success.

The terms **logical element**, **zone**, **boundary**, **interface**, and **allocation** describe intended separation and responsibility. They do not claim physical isolation, accreditation, certification, or implementation evidence.

### 5.1.1 Normative language

The `shall` statements inherited from Chapter 4 remain proposed requirements at their recorded maturity. This chapter does not create a parallel requirements baseline. Architecture rules stated here constrain the design interpretation; any semantic conflict returns to Chapter 4 change control.

### 5.1.2 Evidence rule

Allocation, a diagram, a table, and a private website rendering are design evidence only. They are not verification evidence for a requirement whose acceptance method includes analysis, test, demonstration, or independent review.

---

## 5.2 Controlled source baseline

| Source | Role | SHA-256 |
|---|---|---|
| QO-EDH-CH01 V0.2 | Mission, topology, scope, AQMO authority | `f600e1d0f80757589113fb628495417f1519d7eb3f358b65abb15afa74059507` |
| QO-EDH-CH02 V0.2 | Threats, trust crossings, control intent, claim boundary | `4271e18399aa0d4dda6a19559676a00bd38363ea1703973f0499164483a4188e` |
| QO-EDH-CH03 V0.2 | ConOps, state models, outcomes, evidence semantics | `bed8a2dec411c1260cbc925e738da103405a4513b1c93cb52c4448360da9cac9` |
| QO-EDH-CH04 corrected V0.2 | 119 proposed atomic requirements and acceptance intent | `48973678b595ac5d316594af897dd3f955f46fc0a4d83fc153fc7d229a29926e` |
| QO-EDH-REG-001 V0.2 | Claims, decisions, assumptions, and TBDs | `c4900b95af6af243b2cdf116e26d7d2b884dd709c546d111b6a63a154d221753` |
| QO-ICP-001 V0.3 | Integrated content, research, engineering, and website plan | `f95bb7b9459e9a7409fe4eaf3089e0af0f90fba93151743cc52839777337b577` |

No new external scientific or product claim is introduced in this chapter. Scientific claims remain controlled by the Chapter 1–3 `CE-*` register and their applicability limits.

---

## 5.3 Architecture viewpoints and controlled masters

| View ID | Viewpoint | Question answered | Controlled master |
|---|---|---|---|
| VIEW-5A | System context | What is inside the preliminary SQDS boundary, what interfaces with it, and what remains outside the claim? | [FIG-001](figures/FIG-001_Q-Orbit_Mission_Context_V0.3.svg) |
| VIEW-5B | End-to-end logical | Which functions and flows participate in replenishment and separate delivery? | [FIG-002](figures/FIG-002_Q-Orbit_Logical_Architecture_V0.3.svg) |
| VIEW-5C | Conceptual deployment | What is allocated to endpoint domain A and endpoint domain B? | [FIG-003](figures/FIG-003_Q-Orbit_Conceptual_Deployment_V0.3.svg) |
| VIEW-5D | Trust zones | Which logical zones protect key values, protocol messages, metadata, commands, and evidence? | [FIG-004](figures/FIG-004_Q-Orbit_Trust_Zones_V0.3.svg) |
| VIEW-5E | Interfaces and data flows | What crosses each declared boundary and under which guard? | [FIG-005](figures/FIG-005_Q-Orbit_Interface_Map_V0.3.svg) |
| VIEW-5F | AQMO authority | What may AQMO observe or command, and what is prohibited? | [FIG-010](figures/FIG-010_Q-Orbit_AQMO_Authority_V0.3.svg) |

Every master is labeled **Conceptual — Preliminary — Not to Scale — Not a Flight Design**. The masters are controlled design artifacts; they do not establish ARCH-G1 approval.

---

## 5.4 System context

### 5.4.1 Inside the preliminary SQDS logical boundary

The preliminary boundary contains:

- the QKD-A and QKD-B endpoint functions;
- protected local QKD-to-EKM handoff functions;
- EKM-A and EKM-B binding, pair-state, lifecycle, inventory, and local-delivery functions;
- one representative local consumer interface in each endpoint domain;
- constrained AQMO request validation, opportunity filtering, reservation, monitoring, and replanning;
- decision-data validation adapters;
- identity, authentication, authorization, configuration, integrity, and recovery dependencies;
- non-secret correlation, evidence-continuity, and release-control functions; and
- a reference model function for future controlled analysis.

### 5.4.2 Interfacing systems not fully designed here

- spacecraft-bus and platform resources;
- mission-control and operator functions;
- orbit, time, environment, weather, and resource-state sources;
- external identity and authorization infrastructure;
- future consumer applications and broader networks;
- future operational legal, safety, cryptographic, and risk authorities; and
- the presentation surface that renders positively released or private controlled derivatives.

### 5.4.3 Explicit exclusions

The V0.3 preliminary architecture excludes:

- trusted relays;
- arbitrary remote-consumer distribution;
- continuous or global service claims;
- mission plaintext on the QKD path;
- an automatic alternate trust path or fallback service;
- an operational customer, sponsor, site, orbit, schedule, device, or product claim; and
- any inference that QKD success proves endpoint, implementation, availability, denial-of-service, or operational security.

FIG-001 is authoritative for the context view. An extension that introduces a relay or remote consumer triggers `TBD-016`, `REQ-CM-007`, and `REQ-CM-008` before architecture approval.

---

## 5.5 Logical element architecture

| Element ID | Logical element | Primary responsibility | Explicit prohibition | Primary requirement families |
|---|---|---|---|---|
| ARC-QA | QKD-A endpoint function | Space-side state preparation, protocol participation, local gates, and protected accepted-output handoff | No mission plaintext; no accepted output with a failed or unknown required gate | REQ-SRV; REQ-QKD; REQ-KM-001 |
| ARC-QB | QKD-B endpoint function | Ground-side measurement, protocol participation, local gates, and protected accepted-output handoff | Same prohibitions as ARC-QA; no acceptance from QBER alone | REQ-SRV; REQ-QKD; REQ-KM-001 |
| ARC-EA | EKM-A | Validate binding; prepare, coordinate, commit, reserve, deliver, quarantine, retire, and evidence endpoint-A material | No access from Prepared or Unknown; no unsafe reuse | REQ-KM; REQ-EVD |
| ARC-EB | EKM-B | Symmetric endpoint-B EKM responsibilities | Same prohibitions as ARC-EA | REQ-KM; REQ-EVD |
| ARC-CA | Consumer interface A | Authenticate and authorize local consumer A and record protected delivery acknowledgement | No implicit remote distribution or unbound delivery | REQ-SRV-005; REQ-KM-016 through REQ-KM-023 |
| ARC-CB | Consumer interface B | Symmetric local-consumer-B responsibility | Same prohibitions as ARC-CA | REQ-SRV-005; REQ-KM-016 through REQ-KM-023 |
| ARC-AQ | AQMO | Validate requests; evaluate qualified opportunities; reserve, monitor, and replan using permitted metadata | No key values; no override of cryptographic, device, EKM, incident, risk, or release gates | REQ-AQM; REQ-DAT; REQ-EVD-002 |
| ARC-DV | Decision-data adapters | Validate provenance, validity, time, freshness, quality, uncertainty, plausibility, and conflict state | Authentication alone cannot establish correctness | REQ-DAT |
| ARC-CT | Control-trust services | Provide identity, authentication, authorization, configuration, integrity, incident, and recovery dependencies | No silent downgrade or unapproved fallback | REQ-CYB; REQ-QKD-004 through REQ-QKD-008 |
| ARC-EV | Evidence service | Correlate transactions and preserve non-secret state, reason, version, and continuity evidence | No raw, intermediate, accepted, stored, delivered, or destroyed key values | REQ-EVD; REQ-MOD-004 through REQ-MOD-006 |
| ARC-MD | Reference model | Execute future controlled reference analysis and declared logical fault cases | No validated result without frozen inputs, individual gates, reproducibility evidence, and explicit limits | REQ-MOD |
| ARC-RL | Release-control function | Bind an exact artifact version to private handling or a PR-GATE-01 disposition | No public release without positive version-specific authority | REQ-REL |

The twelve `ARC-*` identifiers are stable logical identifiers. They are not product, processor, facility, process, company, or hardware identifiers.

### 5.5.1 Responsibility rule

Every security-relevant transition has one performing element, one recorded authority source, one current-state guard, one evidence owner, and one explicit failure state. Cross-cutting responsibility does not remove the Chapter 4 owner.

### 5.5.2 Separation rule

The design separates:

- the two QKD endpoint functions;
- the two EKM functions;
- key-value handling from orchestration, evidence, modeling, and presentation;
- QKD acceptance from two-sided inventory commit; and
- replenishment from consumer delivery.

No logical separation may be restated as physical isolation until `TBD-008` has its required boundary evidence.

---

## 5.6 Conceptual deployment allocation

### 5.6.1 Endpoint domain A — space

Domain A contains ARC-QA and an associated logical ARC-EA function. It interfaces with spacecraft platform resources and the constrained control plane. The current design does not decide whether ARC-EA is implemented within a terminal, spacecraft bus, protected module, or another future partition. That decision remains under `TBD-008`.

### 5.6.2 Endpoint domain B — ground

Domain B contains ARC-QB, an associated logical ARC-EB function, and ARC-CB for a local representative consumer. It interfaces with ground platform, operator, data, AQMO, and evidence functions. Site, facility, network, API, HSM, and product boundaries remain open.

### 5.6.3 Cross-domain allocation rules

1. IF-Q01 and IF-Q02 join only QKD-A and QKD-B in the direct-link baseline.
2. IF-K01 and IF-K02 are protected local handoffs to the associated EKM only.
3. IF-K03 coordinates non-secret pair state and never carries a key value.
4. IF-C01 and IF-C02 are local protected delivery transactions in their associated endpoint domains.
5. AQMO, evidence, modeling, and presentation remain outside every key-value path.
6. A conceptual placement may not be relabeled as a flight, facility, or approved cryptographic design.

FIG-003 is authoritative for this conceptual allocation.

---

## 5.7 Logical trust-zone architecture

| Zone ID | Logical zone | Protected subjects | Permitted crossings | Prohibited interpretation / open evidence |
|---|---|---|---|---|
| TZ-QA | QKD-A protected function | Source state, local intermediates, accepted output, device/profile gate state | IF-Q01; IF-Q02; IF-K01; non-secret IF-E01 events | Not an accredited module boundary; TBD-005, TBD-006, TBD-007, TBD-008 |
| TZ-QB | QKD-B protected function | Measurement state, local intermediates, accepted output, device/profile gate state | IF-Q01; IF-Q02; IF-K02; non-secret IF-E01 events | Same boundary caution; TBD-005, TBD-006, TBD-007, TBD-008 |
| TZ-EA | EKM-A protected function | Key values, binding, pair state, lifecycle state | IF-K01; non-secret IF-K03; protected IF-C01; non-secret IF-E01 | Physical location and protocol open; TBD-008, TBD-009, TBD-010 |
| TZ-EB | EKM-B protected function | Same categories as TZ-EA | IF-K02; non-secret IF-K03; protected IF-C02; non-secret IF-E01 | Same boundary caution; TBD-008, TBD-009, TBD-010 |
| TZ-OR | Orchestration/control | Requests, qualified decision data, resource/security metadata, constrained commands | IF-A01; IF-A02; IF-A03; non-secret IF-E01 | No key values or local-gate authority; TBD-011, TBD-012 |
| TZ-EV | Evidence/configuration | Non-secret records, versions, gates, outcomes, release decisions | IF-E01 and controlled configuration references | No key values; schema/time/custody open under TBD-019 |
| TZ-PU | Presentation | Private controlled derivatives or exactly released artifacts | IF-R01 only | No public authority implied; TBD-020 |

### 5.7.1 Boundary invariants

- The adversary-accessible quantum path does not become trusted because it participates in QKD.
- The classical protocol path requires externally established authentication, integrity, session binding, freshness, and replay treatment.
- Accepted key values cross only IF-K01, IF-K02, IF-C01, or IF-C02 within their permitted lifecycle state.
- IF-K03, IF-A01, IF-A02, IF-A03, IF-E01, and IF-R01 contain zero key values.
- Unknown boundary or gate state is non-permissive.

FIG-004 is authoritative for logical zones and their permitted flow classes.

---

## 5.8 Data architecture

The detailed classification is controlled in Annex 5-C. The architecture uses four handling tiers:

| Tier | Representative classes | Handling rule |
|---|---|---|
| D0 — adversary-accessible or public protocol material | Quantum states; permitted announcements; accounted transcript/leakage | Authenticate or account according to the frozen dossier; never confuse disclosure with secret-key transport |
| D1 — protected local secret material | Raw detections/raw-key strings; secret intermediates; accepted final key; delivered key value | Remain inside the applicable protected endpoint/EKM/consumer path; minimize retention; never enter AQMO, evidence, model, or presentation |
| D2 — security-relevant non-secret control data | Binding, pair state, request, qualified decision data, commands, acknowledgements, reason codes | Authenticate, authorize, bind, validate freshness/current state, and preserve evidence continuity as applicable |
| D3 — controlled evidence and artifacts | Non-secret audit events, configurations, model inputs/results, documents, diagrams | Version, correlate, review limitations, and release only through the applicable gate |

Identifiers and status values must not encode or permit derivation of a key value. A field being non-secret does not remove its integrity, privacy, operational-sensitivity, or release requirements.

---

## 5.9 Interface architecture

| Interface ID | Direction | Primary data class | Purpose | Mandatory guard | Negative behavior / open issues |
|---|---|---|---|---|---|
| IF-Q01 | QKD-A → QKD-B | Quantum states | Direct reference downlink | Frozen session/device/profile context; local readiness | Abort/no-key on invalid or unknown required condition; TBD-003 through TBD-006 |
| IF-Q02 | QKD-A ↔ QKD-B | Security-relevant classical protocol messages | Sifting, estimation, correction/verification, and protocol control | Peer identity, integrity, session binding, freshness, replay and leakage rules | Reject/abort on any failed or unknown required check; TBD-005, TBD-007 |
| IF-K01 | QKD-A → EKM-A | Accepted final output plus binding | Protected local intake | Every applicable endpoint gate positive; authorized binding | No handoff otherwise; TBD-008, TBD-009 |
| IF-K02 | QKD-B → EKM-B | Accepted final output plus binding | Protected local intake | Same as IF-K01 | No handoff otherwise; TBD-008, TBD-009 |
| IF-K03 | EKM-A ↔ EKM-B | Non-secret prepare/commit/status evidence | Safe pair-state coordination | Authenticated, binding-specific, idempotent, current-state guarded | Unknown/quarantine on ambiguity; never a key-value path; TBD-007, TBD-009 |
| IF-C01 | EKM-A ↔ Consumer A | Protected local transfer plus acknowledgement | Separate authorized delivery | Matching Committed/Available state and exclusive reservation | Deny/quarantine on mismatch or ambiguity; TBD-010 |
| IF-C02 | EKM-B ↔ Consumer B | Protected local transfer plus acknowledgement | Symmetric local delivery | Same as IF-C01 | Same as IF-C01; TBD-010 |
| IF-A01 | Request/authority → AQMO | Request identity, purpose, priority, constraints, authority, freshness | Request admission | Every declared request validation positive | No candidate generation on failed/unknown validation; TBD-002, TBD-011 |
| IF-A02 | ARC-DV → AQMO | Geometry, time, environment, resource, security, and inventory metadata | Candidate filtering and ranking | Provenance, validity, uncertainty, freshness, plausibility, conflict state | Hold/abort unless a predeclared rule resolves a conflict; TBD-011, TBD-012 |
| IF-A03 | AQMO → endpoints/platform/EKMs | Qualified opportunity, reservation, start/hold/stop, monitoring commands | Constrained orchestration | Authenticated, authorized, allow-listed, current configuration | Local gates remain authoritative; no key values; TBD-007, TBD-011 |
| IF-E01 | Components → evidence service | Non-secret events, gates, reason codes, state, version references | Reconstruction and verification support | Correlation, schema, predecessor/current-state reference, integrity protection | Block affected transition if required continuity fails; zero key values; TBD-019 |
| IF-R01 | Controlled artifacts → presentation | Approved/private artifact version plus release record | Private presentation or future public release | Exact version and applicable release disposition | Public route blocked without positive PR-GATE-01; TBD-020 |

Annex 5-B records the fuller contract placeholder. It deliberately leaves transport, protocol, message schema, timing, retry interval, timeout value, cardinality, and error-code construction unresolved.

---

## 5.10 Nominal replenishment behavior

The logical flow in FIG-002 maps the Chapter 3 sequence onto stable elements and interfaces:

1. **Request admission.** ARC-AQ accepts IF-A01 only after positive identity, authority, purpose, schema, and freshness validation.
2. **Decision-data qualification.** ARC-DV supplies IF-A02 with provenance, validity, uncertainty, freshness, plausibility, and conflict state. A valid signature alone is insufficient.
3. **Candidate selection.** ARC-AQ eliminates every failed hard constraint before ranking and issues only allow-listed IF-A03 commands within the approved configuration.
4. **Local readiness.** ARC-QA and ARC-QB independently establish positive readiness for the same frozen session configuration.
5. **Bounded exchange.** IF-Q01 and IF-Q02 support the declared direct QKD exchange. A failed or unknown required authentication, profile, finite-key, device, configuration, or policy gate yields no accepted final output.
6. **Protected local intake.** ARC-QA uses IF-K01 and ARC-QB uses IF-K02 only after local acceptance. Each EKM validates the complete authorized binding before entering Prepared.
7. **Two-sided commit.** ARC-EA and ARC-EB exchange non-secret binding-specific evidence through IF-K03. Matching positive two-sided evidence permits Committed/Available; ambiguity yields Unknown and quarantine.
8. **Replenishment outcome.** OUT-3 becomes positive only for the same pair binding after both EKMs establish matching positive commit evidence.
9. **Optional delivery.** A separately authorized transaction reserves the pair exclusively and uses IF-C01 and IF-C02 for local protected transfers.
10. **Delivery outcome.** OUT-4 becomes positive only after both authorized local consumers acknowledge the corresponding binding and both EKMs establish the same delivered state.

The evidence service receives only non-secret events and references. It does not participate in key custody or authorize success.

---

## 5.11 State ownership and outcome separation

| State/outcome | Owning elements | Positive condition | Non-positive handling |
|---|---|---|---|
| Session state | ARC-QA; ARC-QB; ARC-AQ within bounded authority | Current-state guard and required local gates positive | Hold, abort, or explicit non-positive state |
| Local key lifecycle | ARC-EA or ARC-EB | Authorized transition from expected prior state | Reject; Unknown/quarantine when peer state cannot be proven |
| Pair commit | ARC-EA and ARC-EB | Matching authenticated evidence for same binding | No availability; reconcile or quarantine |
| OUT-1 physical-link success | ARC-QA; ARC-QB; ARC-MD for modeled cases | Acquisition, synchronization, and channel-readiness criteria positive | Physical failure or indeterminate; no inference of OUT-2 |
| OUT-2 QKD acceptance | ARC-QA; ARC-QB | Exact protocol/profile calculation plus every required gate positive | Explicit rejection/no-key; no accepted handoff |
| OUT-3 replenishment success | ARC-EA; ARC-EB | Matching Committed/Available evidence for same pair binding | Failed or ambiguous; uncertain material quarantined |
| OUT-4 consumer-delivery success | ARC-EA; ARC-EB; ARC-CA; ARC-CB | Both acknowledgements plus compatible paired-EKM delivered evidence | Failed or ambiguous; prevent unsafe reallocation |

OUT-1 through OUT-4 remain separate booleans or controlled enumerations. OUT-4 may be `not-requested` without rewriting a positive OUT-3. No unqualified generic `success` field is permitted.

---

## 5.12 Off-nominal behavior

| Scenario | Detection surface | Mandatory architecture response | Prohibited response | Primary open issues |
|---|---|---|---|---|
| Authentication failure | IF-Q02, IF-K03, IF-A03, or IF-C01/02 | Reject/abort; preserve non-secret reason; use approved recovery route only | Regenerate trust over failed uncontrolled path | TBD-007, TBD-010, TBD-011 |
| Stale decision data | IF-A02 | Hold/abort unless a predeclared current-data rule resolves it | Treat authenticated stale data as fit | TBD-012 |
| Conflicting decision data | IF-A02 | Record conflict and hold/abort unless a predeclared rule resolves it | Select by signature alone or silently average | TBD-012 |
| Finite-key/profile rejection | ARC-QA/ARC-QB | No accepted output; destroy or quarantine affected intermediates; non-secret reason only | Infer acceptance from QBER alone | TBD-005 |
| Invalid/unknown device state | TZ-QA/TZ-QB | No accepted output; abort or safe state | Convert unknown to pass | TBD-006 |
| Partial/unknown EKM commit | IF-K03 | Set affected pair Unknown; quarantine; reconcile idempotently | Expose one-sided material or automatic rollback to success | TBD-009 |
| Wrong consumer or binding | IF-C01/IF-C02 | Deny; quarantine or revoke affected allocation | Deliver on partial identity/purpose match | TBD-010 |
| One-sided/lost delivery acknowledgement | IF-C01/IF-C02/IF-K03 | OUT-4 non-positive; prevent automatic reallocation | Infer delivery from one side | TBD-009, TBD-010 |
| AQMO loss or suspected compromise | TZ-OR/IF-A03 | Stop new coordination; permit only bounded preauthorized local completion with positive gates | Treat loss as permission to bypass a gate | TBD-011 |
| Suspected endpoint/EKM compromise | Affected key zone/IF-E01 | Block new release; revoke or suspend trust; preserve non-secret evidence; require known-good recovery and explicit authority | Resume from unproven state or silently change service label | TBD-007, TBD-015, TBD-019 |
| Pressure to maintain service | ARC-CT/ARC-AQ | Return exact negative outcome; no active fallback in V0.3 | Select another algorithm, key source, endpoint, relay, or label automatically | TBD-018 |
| Artifact fails release review | ARC-RL/IF-R01 | Keep private/unpublished | Publish a similar or stale version without exact-version disposition | TBD-020 |

---

## 5.13 Cross-cutting architecture services

### 5.13.1 Identity, authentication, and authorization

Peer, command, EKM-coordination, consumer, operator, maintenance, administration, and release roles require separately defined identity and authority. The exact authentication construction, trust-anchor lifecycle, consumer contract, AQMO delegation, and release authority remain open under `TBD-007`, `TBD-010`, `TBD-011`, and `TBD-020`.

### 5.13.2 Configuration and provenance

Every active software, firmware, model, dependency, input, calibration, policy, and artifact resolves to a version-controlled baseline and acceptance record. The architecture does not claim this control is implemented. Changes to architecture-driving decisions follow `REQ-CM-005` through `REQ-CM-009`.

### 5.13.3 Audit and evidence

ARC-EV preserves non-secret correlation, actor/authority, prior/new state, event/reason, time reference, configuration/policy reference, predecessor/current-state reference, and outcome labels. The future schema, authoritative time, retention, privacy, access, integrity mechanism, and custody remain under `TBD-019`.

### 5.13.4 Incident and recovery

Suspected compromise blocks new release from the affected domain. Return to service requires positive records for known-good restoration, revalidation, trust re-establishment, and explicit authority. The design does not automatically change algorithm, key source, endpoint, trust path, relay use, fallback, or security label.

### 5.13.5 Reference model

ARC-MD is outside operational key custody. A future run must reference frozen code, dependencies, inputs, parameter register, configuration, and seed; preserve each applicable gate; record OUT-1 through OUT-4 separately; and show limitations. No run has yet been executed for this chapter, and no quantitative result is introduced here.

### 5.13.6 Release control

ARC-RL binds the exact artifact version to private handling or a PR-GATE-01 record. Private checkpoint deployment is not public-release authorization. A public technical claim must retain its controlled source and applicability limit.

---

## 5.14 Requirement allocation

| Family | Count | Primary allocation | Architecture obligation |
|---|---:|---|---|
| REQ-SRV | 11 | VIEW-5A through VIEW-5C; ARC-QA/QB/EA/EB/CA/CB | Fix topology, scope, and outcome separation |
| REQ-QKD | 17 | ARC-QA; ARC-QB; IF-Q01; IF-Q02; TZ-QA; TZ-QB | Allocate profile, message, device, acceptance, and proof-assumption gates |
| REQ-KM | 25 | ARC-EA; ARC-EB; ARC-CA; ARC-CB; IF-K01 through IF-C02 | Allocate protected handoff, pair state, lifecycle, delivery, and non-reuse |
| REQ-AQM | 11 | ARC-AQ; IF-A01 through IF-A03; VIEW-5F | Bound orchestration inputs, outputs, authority, and loss behavior |
| REQ-DAT | 6 | ARC-DV; IF-A02 | Validate data fitness independently of authentication |
| REQ-CYB | 12 | ARC-CT; all trust zones | Allocate command trust, configuration, segregation, incident, recovery, and fallback controls |
| REQ-EVD | 9 | ARC-EV; IF-E01 | Allocate correlation, non-secret evidence, continuity, and exact reason codes |
| REQ-MOD | 10 | ARC-MD; ARC-EV | Control reproducibility, gates, measures, and result limits |
| REQ-REL | 8 | ARC-RL; TZ-PU; IF-R01 | Bind presentation to source/applicability and exact-version release control |
| REQ-CM | 10 | All elements and controlled masters | Preserve semantic IDs, change history, impact review, and verification status |
| **Total** | **119** | **All 12 elements, 7 zones, 12 interfaces, and 6 views** | **119/119 allocated; 0 operationally verified** |

The ID-by-ID allocation is controlled in Annex 5-A. A machine-assisted exact-text comparison on 16 August 2026 found:

- 119 unique Chapter 4 requirement IDs;
- 119 unique Annex 5-A allocations;
- zero missing IDs;
- zero extra IDs; and
- zero obligation-text mismatches.

This establishes textual and allocation coverage only. It does not establish architectural correctness, implementation, compliance, or verification.

---

## 5.15 Preliminary architecture decisions

| Decision ID | Preliminary disposition | Rationale | Remaining evidence |
|---|---|---|---|
| ADR-5-001 | Retain one direct QKD-A/QKD-B link; reject relay/remote distribution from this baseline | Preserves ED-003 and the controlled claim boundary | TBD-016 |
| ADR-5-002 | Associate one logical EKM and one local representative consumer with each endpoint domain | Preserves ED-004 without inventing remote delivery | TBD-008, TBD-010 |
| ADR-5-003 | Treat two-sided replenishment as primary and consumer delivery as separate | Preserves ED-005 and exact OUT-3/OUT-4 semantics | TBD-009, TBD-010 |
| ADR-5-004 | Keep QKD-A, QKD-B, EKM-A, and EKM-B as separate logical zones | Avoids an unsupported pair-wide memory or physical boundary | TBD-008 |
| ADR-5-005 | Permit key values only on protected local intake/delivery paths | Minimizes custody and preserves Chapter 2 classification | TBD-008, TBD-010 |
| ADR-5-006 | Use non-secret, binding-specific pair-status coordination | Supports safe conceptual commit without key transfer | TBD-007, TBD-009 |
| ADR-5-007 | Constrain AQMO to metadata and allow-listed commands | Preserves ED-010 and local gate authority | TBD-011, TBD-012 |
| ADR-5-008 | Treat external-data authenticity and fitness as separate checks | Preserves ED-012 under stale/conflicting data | TBD-012 |
| ADR-5-009 | Preserve fail-closed and no-silent-downgrade behavior | Prevents availability pressure from changing the security claim | TBD-007, TBD-018 |
| ADR-5-010 | Keep evidence, modeling, and presentation outside key custody | Prevents logs, models, and web assets from becoming key paths | TBD-019, TBD-020 |
| ADR-5-011 | Treat current zones as logical, not validated physical/cryptographic boundaries | Avoids unsupported implementation claims | TBD-008, TBD-015 |
| ADR-5-012 | Keep the V0.3 fallback inactive | No separately approved alternate service exists | TBD-018 |

Annex 5-D records alternatives, impacts, and source trace. These are preliminary architecture dispositions, not operational approvals.

---

## 5.16 Open-issue visibility

No open issue is closed by this chapter.

| ID | Architecture impact | Required closure evidence |
|---|---|---|
| TBD-001 | Authorities and named stakeholder roles remain generic | Written stakeholder confirmation and authority map |
| TBD-002 | Request demand, data lifetime, consequence, latency, and availability criteria remain non-numeric | Mission-needs statement with units and acceptance criteria |
| TBD-003 | Orbit, ephemeris, site case, and analysis interval remain unfrozen | Versioned reproducible orbit/site case |
| TBD-004 | Optical/link/environment inputs and uncertainty remain unfrozen | Source-backed link-budget and uncertainty model |
| TBD-005 | Protocol equations, budgets, block rules, leakage, and thresholds remain unfrozen | Independently reproduced protocol dossier |
| TBD-006 | Source, detector, entropy, calibration, timing, and side-channel model remain unfrozen | Characterization and proof-to-device map |
| TBD-007 | Authentication construction and trust-anchor lifecycle remain unselected | Approved cryptographic architecture and negative tests |
| TBD-008 | Physical cryptographic boundaries, EKM/HSM placement, ownership, and protected paths remain unselected | Boundary diagrams, data-entry/exit list, and trade decision |
| TBD-009 | Implementable pair-state, timeout, retry, reconciliation, persistence, and destruction protocol remains unfrozen | State/interface specification and partial-failure tests |
| TBD-010 | Consumer API, key-use mode, acknowledgement, use, expiry, and destruction semantics remain unfrozen | Interface/lifecycle specification and tests |
| TBD-011 | AQMO objective, schemas, timing, delegation, human gates, and autonomy remain unfrozen | Control contract, constraints, and replay tests |
| TBD-012 | Authoritative data sources, redundancy, validation, freshness, uncertainty, and conflict policy remain unfrozen | Data-source contract and stale/conflict tests |
| TBD-013 | Mission-derived quantitative thresholds remain absent | Controlled threshold register with rationale and authority |
| TBD-014 | Applicable jurisdiction-specific legal, export, information, crypto, laser, spectrum, and space rules remain unknown | Applicable compliance matrix |
| TBD-015 | Independent V&V scope, facilities, reviewers, and competence remain unapproved | Independent verification plan and reviewer assignment |
| TBD-016 | Relay and remote-consumer architecture remains outside this baseline | Separate topology/trust decision and authority approval |
| TBD-017 | Quantitative likelihood, control effectiveness, risk rating, and acceptance remain unavailable | Deployment-specific risk assessment and authority decision |
| TBD-018 | No alternate non-QKD fallback service is approved | Separate fallback specification, label, authority, and scenario test |
| TBD-019 | Audit schema, time, retention, privacy, custody, and incident process remain unfrozen | Audit/incident specification and integrity/replay tests |
| TBD-020 | Public-release workflow and named authority remain unestablished | Signed PR-GATE-01 workflow and exact-artifact disposition |

---

## 5.17 Verification intent and misuse review

### 5.17.1 Architecture-level review methods

| Review ID | Method | Pass condition for this draft | Status |
|---|---|---|---|
| ARV-01 | Identifier completeness | 12/12 elements, 7/7 zones, 12/12 interfaces, and 6/6 views resolve | Passed by document inspection; not operational verification |
| ARV-02 | Requirement allocation audit | 119/119 IDs, no exact-text mismatch | Passed by machine-assisted comparison; not requirement verification |
| ARV-03 | Key-path inspection | Key-value classes appear only on IF-K01, IF-K02, IF-C01, and IF-C02 | Passed for the controlled chapter/figures/annexes; implementation not available |
| ARV-04 | Outcome inspection | OUT-1 through OUT-4 are separate; OUT-3 primary; OUT-4 separate | Passed for the controlled chapter/figures; implementation not available |
| ARV-05 | Open-issue inspection | TBD-001 through TBD-020 remain visible and open | Passed for this draft |
| ARV-06 | Diagram misuse review | Each master carries status, scope, key-path, and non-authority cautions | Passed for controlled masters; independent reviewer pending |
| ARV-07 | Website-derivation review | Website uses traced controlled masters and retains preliminary/private labels | Candidate pending final site checkpoint validation |

### 5.17.2 Prohibited readings

The chapter and its figures must not imply that:

- AQMO, ARC-EV, ARC-MD, ARC-RL, or the website receives key values;
- QKD authenticates its peer without an external mechanism;
- one-sided Prepared, Unknown, timed-out, or conflicting EKM state is available;
- delivery is part of QKD acceptance or replenishment completion;
- a direct link supplies arbitrary remote users;
- a logical zone is an accredited physical cryptographic boundary;
- a conceptual placement is a flight or facility design;
- any modeled number is measured performance;
- a private checkpoint is public-release authorization; or
- allocated means implemented, secure, tested, accepted, or verified.

---

## 5.18 Configuration, change, and release control

1. An unchanged semantic obligation retains its `REQ-*` ID.
2. A changed obligated actor, behavior, condition, object, or acceptance outcome receives a new requirement ID and predecessor/successor trace.
3. A change to ED-003, ED-004, ED-005, ED-006, ED-007, ED-008, or ED-013 triggers impact review across the handbook, threats, state models, simulation, verification, diagrams, and public claims.
4. A protocol-family change triggers new proof, device, metric, and applicability review.
5. A relay or remote-consumer change triggers `TBD-016` and cannot inherit this baseline's claim.
6. A `TBD-*` closure requires the registered evidence and complete affected-requirement list.
7. A figure change must retain its figure ID only when its semantic content remains unchanged; otherwise the asset history records the supersession.
8. IF-R01 blocks public release until the exact artifact version has a positive PR-GATE-01 disposition.

---

## 5.19 Annexes and controlled asset package

| Annex | Document ID | Content | Status |
|---|---|---|---|
| Annex 5-A | QO-EDH-CH05-ANN-A | ID-by-ID requirement allocation, 119 rows | Allocation complete; architecture review pending |
| Annex 5-B | QO-EDH-CH05-ANN-B | Interface register, 12 interfaces | Draft complete; implementation details deliberately open |
| Annex 5-C | QO-EDH-CH05-ANN-C | Data-class and allowed-flow register | Draft complete; physical controls deliberately open |
| Annex 5-D | QO-EDH-CH05-ANN-D | Architecture decision record | Draft complete; authority approval pending |
| Annex 5-E | QO-EDH-CH05-ANN-E | Figure index, trace, alt text, hashes, and misuse checks | Draft complete after asset hash capture |

---

## 5.20 ARCH-G1 review candidate

### 5.20.1 Entry evidence assembled

- PLAN-G1 has a positive recorded disposition.
- Chapters 1–4 and the controlled register remain available by exact identity and hash.
- Six controlled architecture masters exist.
- All 119 proposed requirements have an ID-by-ID allocation.
- Twelve logical elements, seven trust zones, twelve interfaces, and the data-class register are present.
- All twenty open issues remain explicit.

### 5.20.2 Items still required before declaring ARCH-G1 passed

1. named architecture, security, key-management, controls, evidence, model, and configuration owners review the allocations within their competence;
2. reviewers record all findings and dispositions against the exact document and figure versions;
3. the website-derivation check confirms the deployed private presentation matches the controlled masters;
4. no open issue is accidentally presented as closed; and
5. an authorized gate record explicitly states the ARCH-G1 disposition.

### 5.20.3 Gate boundary

This working draft is an **ARCH-G1 review candidate**, not a passed gate. Even a future positive ARCH-G1 disposition would freeze only a preliminary architecture description. It would not authorize implementation, procurement, fabrication, flight, public release, certification, cryptographic approval, risk acceptance, or an operational security claim.

