# Q-Orbit Chapter 5 — Interface Register Annex B V0.3

| Document field | Value |
|---|---|
| Document ID | QO-EDH-CH05-ANN-B |
| Version | Working Draft V0.3 |
| Date | 16 August 2026 |
| Parent | QO-EDH-CH05 Working Draft V0.3 |
| Interface coverage | 12/12 declared architecture interfaces |
| Maturity | Logical contract placeholders; no transport or product selected |
| Verification state | Design inspection only; 0 requirements operationally verified |
| Gate target | ARCH-G1 review candidate; gate not passed |
| Release state | Private; public release requires PR-GATE-01 |

> **Interpretation boundary.** This register specifies allowed purpose, content class, authority, failure behavior, and evidence ownership. It does not define a wire protocol, API, message syntax, timeout value, retry interval, transport, network, cryptographic construction, hardware path, or certified boundary.

---

## 1. Interface contract rules

Every future interface specification shall identify:

1. producer, consumer, direction, and transaction owner;
2. permitted and prohibited data classes;
3. identity, authority, binding, freshness, current-state, and configuration guards as applicable;
4. deterministic treatment of duplicate, stale, missing, conflicting, or unknown input;
5. exact non-secret outcome and reason evidence;
6. the safe response when a required guard is failed or unknown; and
7. the `TBD-*` closure evidence required before implementation approval.

No interface may acquire an undeclared key-value field through a later schema extension. A schema change that alters the permitted data class triggers architecture and requirements impact review.

---

## 2. Summary catalogue

| ID | Producer → consumer | Direction | Primary class | Key value permitted? | Transaction role |
|---|---|---|---|---:|---|
| IF-Q01 | ARC-QA → ARC-QB | A to B | DC-QS-01 | No mission/key-value payload | Direct quantum exchange |
| IF-Q02 | ARC-QA ↔ ARC-QB | Bidirectional | DC-CP-01; DC-TR-01 | No secret key string | Authenticated classical protocol |
| IF-K01 | ARC-QA → ARC-EA | A-local | DC-KV-01; DC-KB-01 | Yes, protected local | Accepted-output intake A |
| IF-K02 | ARC-QB → ARC-EB | B-local | DC-KV-01; DC-KB-01 | Yes, protected local | Accepted-output intake B |
| IF-K03 | ARC-EA ↔ ARC-EB | Bidirectional | DC-KB-01; DC-PS-01 | **No** | Pair-state coordination |
| IF-C01 | ARC-EA ↔ ARC-CA | A-local | DC-CD-01; DC-CA-01 | Yes, protected local | Separate consumer delivery A |
| IF-C02 | ARC-EB ↔ ARC-CB | B-local | DC-CD-01; DC-CA-01 | Yes, protected local | Separate consumer delivery B |
| IF-A01 | Request authority → ARC-AQ | Inbound | DC-RQ-01 | **No** | Request admission |
| IF-A02 | ARC-DV → ARC-AQ | Inbound | DC-OD-01 | **No** | Decision-data qualification |
| IF-A03 | ARC-AQ → local functions | Outbound | DC-CM-01 | **No** | Constrained orchestration |
| IF-E01 | All event producers → ARC-EV | Inbound | DC-AU-01 | **No** | Non-secret evidence continuity |
| IF-R01 | ARC-RL → TZ-PU | Outbound | DC-RA-01 | **No** | Controlled presentation/release |

---

## 3. Detailed logical contracts

### IF-Q01 — Direct quantum path

| Contract field | Controlled value |
|---|---|
| Producer / consumer | ARC-QA → ARC-QB |
| Zones crossed | TZ-QA → adversary-accessible path → TZ-QB |
| Permitted class | DC-QS-01 quantum states for the frozen profile/session |
| Prohibited content | Mission plaintext; accepted key values; raw/intermediate secret strings; commands; credentials |
| Creation guard | Same frozen endpoint pair, profile, configuration, policy, and session references; both local readiness gates positive |
| Receiving rule | ARC-QB processes the received states only within the selected proof/device/operating-envelope gates |
| Failure rule | Invalid or unknown required geometry, profile, device, readiness, or policy condition produces abort/no-key; it cannot produce OUT-2 |
| Evidence owner | ARC-EV receives non-secret session, configuration, gate, and reason references only |
| Primary requirements | REQ-SRV-002; REQ-SRV-003; REQ-QKD-001 through REQ-QKD-003; REQ-QKD-009 through REQ-QKD-017 |
| Open issues | TBD-003; TBD-004; TBD-005; TBD-006 |

### IF-Q02 — Authenticated classical protocol path

| Contract field | Controlled value |
|---|---|
| Producer / consumer | ARC-QA ↔ ARC-QB |
| Zones crossed | TZ-QA ↔ control-trust dependency ↔ TZ-QB |
| Permitted classes | DC-CP-01 permitted announcements; DC-TR-01 accounted transcript/leakage |
| Prohibited content | Raw, sifted, reconciled, intermediate, or accepted secret key strings; mission plaintext |
| Mandatory guards | Peer authentication; integrity; active-session binding; freshness; replay disposition; frozen message classification and leakage accounting |
| Duplicate rule | Reuse is rejected unless the frozen protocol explicitly defines the operation as idempotent for the same binding |
| Failure rule | Failure or unknown state of any required guard rejects/aborts the affected transaction and prevents accepted output |
| Evidence owner | ARC-EV records non-secret check IDs, dispositions, session/config references, and reason codes |
| Primary requirements | REQ-QKD-004 through REQ-QKD-008; REQ-QKD-012; REQ-CYB-001; REQ-EVD-003 through REQ-EVD-009 |
| Open issues | TBD-005; TBD-007; TBD-019 |

### IF-K01 — Protected accepted-output intake A

| Contract field | Controlled value |
|---|---|
| Producer / consumer | ARC-QA → ARC-EA |
| Zone crossing | TZ-QA → protected local path → TZ-EA |
| Permitted classes | DC-KV-01 accepted final key; DC-KB-01 complete binding |
| Mandatory guards | Every applicable endpoint acceptance gate positive; binding authorized for the current transaction; protected local path positively established |
| Receiving rule | ARC-EA validates the full binding before Prepared; Prepared remains inaccessible |
| Failure rule | No transfer on failed/unknown gate; reject binding mismatch; quarantine uncertain material |
| Evidence owner | ARC-EV receives only identifiers, binding references, gate results, lifecycle state, and reasons—not the key value |
| Primary requirements | REQ-SRV-004; REQ-QKD-009 through REQ-QKD-011; REQ-KM-001 through REQ-KM-004 |
| Open issues | TBD-005; TBD-006; TBD-008; TBD-009; TBD-019 |

### IF-K02 — Protected accepted-output intake B

The IF-K02 contract is symmetric with IF-K01, with ARC-QB as producer, ARC-EB as consumer, and TZ-QB/TZ-EB as the local zones. No symmetry assumption permits one endpoint's evidence to stand in for the other endpoint's local gates.

| Contract field | Controlled value |
|---|---|
| Permitted classes | DC-KV-01; DC-KB-01 |
| Mandatory guards | Same guard categories as IF-K01, evaluated independently at endpoint B |
| Failure rule | Same fail-closed behavior as IF-K01 |
| Primary requirements | REQ-SRV-004; REQ-QKD-009 through REQ-QKD-011; REQ-KM-001 through REQ-KM-004 |
| Open issues | TBD-005; TBD-006; TBD-008; TBD-009; TBD-019 |

### IF-K03 — Non-secret pair-state coordination

| Contract field | Controlled value |
|---|---|
| Producer / consumer | ARC-EA ↔ ARC-EB |
| Zones crossed | TZ-EA ↔ control-trust dependency ↔ TZ-EB |
| Permitted classes | DC-KB-01 binding metadata; DC-PS-01 Prepared/Committed/Unknown/status and idempotency evidence |
| Prohibited content | Any raw, intermediate, accepted, stored, reserved, delivered, consumed, quarantined, expired, revoked, or destroyed key value; any value from which the key can be derived |
| Mandatory guards | Authenticated peer evidence; exact pair binding; expected current/prior state; idempotency key; freshness/replay treatment; evidence continuity |
| Duplicate rule | Same idempotency key plus identical binding yields no additional allocation or delivery; changed binding is rejected |
| Timeout/partition rule | If required peer state cannot be proven, the affected pair becomes Unknown and is quarantined; timeout is never success or automatic rollback |
| Restart rule | Recovery cannot expose ambiguous material before positive reconciliation |
| Evidence owner | ARC-EV records non-secret pair-state and predecessor references |
| Primary requirements | REQ-SRV-009; REQ-KM-005 through REQ-KM-015; REQ-KM-020 through REQ-KM-025; REQ-EVD-001; REQ-EVD-003 through REQ-EVD-009 |
| Open issues | TBD-007; TBD-009; TBD-019 |

### IF-C01 — Protected local consumer delivery A

| Contract field | Controlled value |
|---|---|
| Producer / consumer | ARC-EA ↔ ARC-CA |
| Zone crossing | TZ-EA → protected local consumer path → authorized consumer A |
| Permitted classes | DC-CD-01 protected delivery payload; DC-CA-01 acknowledgement metadata |
| Creation guard | Same pair binding is Committed/Available at both EKMs; pair reserved exclusively; consumer identity and purpose/policy authorization positive |
| Completion guard | Consumer A acknowledgement and compatible pair evidence reference the same binding; OUT-4 still requires the B-side conditions independently |
| Failure rule | Deny on failed/unknown identity, authority, binding, lifecycle, reservation, or acknowledgement; ambiguous delivery cannot be automatically reallocated |
| Evidence owner | ARC-EV receives non-secret transaction, consumer identity/role reference, binding reference, acknowledgement status, and reason—not the delivered value |
| Primary requirements | REQ-SRV-005; REQ-SRV-010; REQ-SRV-011; REQ-KM-016 through REQ-KM-023 |
| Open issues | TBD-010; TBD-019 |

### IF-C02 — Protected local consumer delivery B

The IF-C02 contract is symmetric with IF-C01 for ARC-EB, ARC-CB, and endpoint domain B. A positive A-side acknowledgement cannot substitute for the B-side acknowledgement or paired-EKM delivery evidence.

| Contract field | Controlled value |
|---|---|
| Permitted classes | DC-CD-01; DC-CA-01 |
| Mandatory guards | Same categories as IF-C01, evaluated for consumer B and the same pair binding |
| Failure rule | Same non-permissive handling as IF-C01 |
| Primary requirements | REQ-SRV-005; REQ-SRV-010; REQ-SRV-011; REQ-KM-016 through REQ-KM-023 |
| Open issues | TBD-010; TBD-019 |

### IF-A01 — Request admission

| Contract field | Controlled value |
|---|---|
| Producer / consumer | Request authority → ARC-AQ |
| Permitted class | DC-RQ-01 request identity, authority, purpose, priority, constraints, schema/version, and freshness evidence |
| Prohibited content | Key values; credentials or secrets not required by the future contract; unbounded free-form commands |
| Mandatory guards | Identity, authority, purpose, schema, freshness, and declared constraint completeness all positive |
| Failure rule | A failed or unknown required validation prevents candidate generation and records an exact non-secret reason |
| Evidence owner | ARC-EV |
| Primary requirements | REQ-AQM-001; REQ-EVD-001; REQ-EVD-002; REQ-EVD-009 |
| Open issues | TBD-001; TBD-002; TBD-011; TBD-019 |

### IF-A02 — Qualified decision data

| Contract field | Controlled value |
|---|---|
| Producer / consumer | ARC-DV → ARC-AQ |
| Permitted class | DC-OD-01 geometry, time, environment, weather, resource, security, and aggregated inventory metadata |
| Prohibited content | Key values; source credentials; unminimized sensitive fields not required by the declared decision |
| Mandatory guards | Source identity where applicable; provenance; validity interval; collection/reference time; age/freshness; quality; uncertainty; plausibility; conflict state |
| Conflict rule | Authentication does not establish correctness; hold/abort unless a predeclared rule produces a valid current disposition |
| Evidence owner | ARC-EV receives source/version/check/result references and the decision reason |
| Primary requirements | REQ-AQM-002 through REQ-AQM-005; REQ-DAT-001 through REQ-DAT-006 |
| Open issues | TBD-003; TBD-004; TBD-011; TBD-012; TBD-019 |

### IF-A03 — Constrained orchestration command

| Contract field | Controlled value |
|---|---|
| Producer / consumer | ARC-AQ → applicable endpoint, platform, or EKM control surface |
| Permitted class | DC-CM-01 qualified opportunity, reservation, start, hold, stop, and monitoring command metadata |
| Prohibited content/authority | Key values; protocol approval; device-state waiver; finite-key-gate override; EKM safety override; incident recovery authority; risk acceptance; release authority |
| Mandatory guards | Authenticated and authorized actor; allow-listed command; exact target/configuration/session binding; freshness; local current-state and safety acceptance |
| AQMO-loss rule | No new coordination; only a still-valid preauthorized bounded transaction may continue while every local gate remains positive |
| Failure rule | Local rejection is final for the transaction; no silent alternate path or service label |
| Evidence owner | ARC-EV records command, authority, target, binding, disposition, and reason |
| Primary requirements | REQ-AQM-003 through REQ-AQM-011; REQ-CYB-001; REQ-CYB-002; REQ-CYB-010; REQ-CYB-011 |
| Open issues | TBD-007; TBD-011; TBD-018; TBD-019 |

### IF-E01 — Non-secret evidence collection

| Contract field | Controlled value |
|---|---|
| Producer / consumer | All security-relevant ARC elements → ARC-EV |
| Permitted class | DC-AU-01 actor/role, correlation, prior/new state, event/reason, time reference, configuration/policy references, predecessor/current-state reference, gate and exact-outcome labels |
| Prohibited content | Every raw, intermediate, accepted, stored, reserved, delivered, consumed, quarantined, expired, revoked, or destroyed key value; credential secrets |
| Mandatory guards | Schema completeness; correlation; applicable predecessor/current-state reference; integrity and continuity checks |
| Continuity rule | Deletion, duplication, reordering, rollback, and cross-session substitution are future mandatory negative tests; inability to establish required continuity blocks the affected transition |
| Evidence owner | ARC-EV; source component remains accountable for event correctness |
| Primary requirements | REQ-EVD-001 through REQ-EVD-009; REQ-MOD-004 through REQ-MOD-006; REQ-CYB-003 through REQ-CYB-009 |
| Open issues | TBD-015; TBD-019 |

### IF-R01 — Controlled presentation and release

| Contract field | Controlled value |
|---|---|
| Producer / consumer | ARC-RL → TZ-PU |
| Permitted class | DC-RA-01 exact artifact identity/version, approved/private content, source/applicability map, limitations, release record |
| Prohibited content | Key values; unsupported sponsor/customer/certification claims; unapproved sensitive operational/security detail; a model result without complete provenance and limits |
| Private rule | Private presentation remains labeled preliminary/private and is not a public-release disposition |
| Public rule | Public routing requires positive PR-GATE-01 for the exact version and all applicable reviewers/conditions |
| Failure rule | Absent, negative, incomplete, or stale-version disposition keeps the artifact private/unpublished |
| Evidence owner | ARC-RL with ARC-EV record continuity |
| Primary requirements | REQ-REL-001 through REQ-REL-008; REQ-CM-005 through REQ-CM-009 |
| Open issues | TBD-001; TBD-014; TBD-020 |

---

## 4. Unresolved interface fields

The following fields are intentionally **not selected** in V0.3:

- physical transport and network segmentation;
- message serialization, endpoint addressing, and protocol/API product;
- credential format, trust-anchor mechanism, algorithm, parameter set, and crypto module;
- timing budget, retry interval, timeout value, rate, payload size, and cardinality;
- physical connector, port, optical component, HSM, terminal, spacecraft-bus, or facility interface;
- authoritative external data source and conflict-resolution authority;
- consumer key-use mode and lifecycle contract;
- audit retention, privacy, custody, authoritative time, and integrity construction; and
- public-release workflow implementation.

Selecting any such field requires the cited `TBD-*` closure route and impact review; absence is not permission to infer a default.

---

## 5. Register review result

| Check | Result |
|---|---|
| Declared interface IDs | 12 unique IDs |
| Undeclared key-value routes | None in this register |
| Key-value-permitted interfaces | IF-K01, IF-K02, IF-C01, IF-C02 only |
| Explicit zero-key interfaces | IF-K03, IF-A01, IF-A02, IF-A03, IF-E01, IF-R01 |
| Direct QKD pair retained | Yes; IF-Q01 and IF-Q02 only between ARC-QA and ARC-QB |
| OUT-3 / OUT-4 transaction separation | Preserved |
| Physical/product selections | None |
| Operational verification | None; design inspection only |

