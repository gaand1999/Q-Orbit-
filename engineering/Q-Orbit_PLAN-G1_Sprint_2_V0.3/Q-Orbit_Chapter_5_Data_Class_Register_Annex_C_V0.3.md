# Q-Orbit Chapter 5 — Data-Class Register Annex C V0.3

| Document field | Value |
|---|---|
| Document ID | QO-EDH-CH05-ANN-C |
| Version | Working Draft V0.3 |
| Date | 16 August 2026 |
| Parent | QO-EDH-CH05 Working Draft V0.3 |
| Data-class coverage | 17 declared logical classes |
| Maturity | Preliminary classification and allowed-flow model |
| Verification state | Design inspection only; 0 requirements operationally verified |
| Gate target | ARCH-G1 review candidate; gate not passed |
| Release state | Private; public release requires PR-GATE-01 |

> **Boundary.** A class in this register defines intended handling and permitted architecture paths. It does not assign a legal classification, export status, retention period, physical storage control, crypto module, product, or operational data owner. Those decisions remain within the cited open issues.

---

## 1. Classification principles

1. Local secret material remains local to the applicable QKD, EKM, and authorized consumer path.
2. A non-secret identifier or status may still be security-relevant, privacy-relevant, or operationally sensitive.
3. An authenticated source is not automatically correct, current, sufficiently precise, or conflict-free.
4. Evidence records key state and reason—not key value.
5. Modeling and presentation receive only controlled inputs, non-secret results, and approved/private artifacts.
6. Unknown class, owner, binding, source, validity, or release state is non-permissive for a security-relevant transition.

---

## 2. Data-class register

| Class ID | Class | Sensitivity tier | Origin / owner | Allowed interfaces and zones | Explicit prohibitions | Required handling / evidence | Open issues |
|---|---|---|---|---|---|---|---|
| DC-QS-01 | Quantum states | D0 adversary-accessible protocol material | ARC-QA; processed by ARC-QB | IF-Q01; TZ-QA to TZ-QB through the declared quantum path | No mission plaintext or accepted key payload; no inference that path confidentiality is independently provided | Bind to frozen session/profile/device context; record non-secret acquisition and gate evidence | TBD-003; TBD-004; TBD-005; TBD-006 |
| DC-LR-01 | Local raw detections and raw-key strings | D1 protected local secret | ARC-QA or ARC-QB locally | Inside TZ-QA or TZ-QB only | No direct secret-string export between endpoints; no AQMO, evidence, model, release, or website path | Minimize retention; protect and destroy/quarantine under frozen protocol/device rules | TBD-005; TBD-006; TBD-008 |
| DC-LI-01 | Sifted, reconciled, or other local secret intermediate strings | D1 protected local secret | ARC-QA or ARC-QB locally | Inside the producing QKD zone only | Same external prohibitions as DC-LR-01; public transcript is classified separately | Account disclosed portions through DC-TR-01; protect/destroy the remaining secret intermediate state | TBD-005; TBD-006; TBD-008 |
| DC-CP-01 | Permitted classical protocol announcements | D0/D2 security-relevant protocol material | ARC-QA and ARC-QB | IF-Q02; TZ-QA ↔ TZ-QB | No undeclared secret-string field; no unbound cross-session reuse | Authenticate, integrity-protect, bind to active session, enforce freshness/replay rule | TBD-005; TBD-007 |
| DC-TR-01 | Public transcript and accounted leakage | D0/D2 security-relevant disclosed material | ARC-QA and ARC-QB | IF-Q02; controlled non-secret references may enter IF-E01 | No raw/intermediate secret string beyond frozen disclosure; no assumption that public equals unimportant | Preserve message/leakage classification and account disclosed information in the finite-key calculation | TBD-005; TBD-019 |
| DC-KV-01 | Accepted final key value | D1 protected local secret | ARC-QA or ARC-QB after every applicable gate is positive | IF-K01 into TZ-EA; IF-K02 into TZ-EB | No endpoint-to-endpoint file transfer; no IF-K03, AQMO, evidence, model, release, or presentation path | Carry complete DC-KB-01 binding; local protected handoff only; quarantine on uncertainty | TBD-005; TBD-006; TBD-008; TBD-009 |
| DC-KB-01 | Key/pair binding metadata | D2 security-relevant non-secret | QKD endpoint and associated EKM | IF-K01; IF-K02; IF-K03; controlled references on IF-C01/02 and IF-E01 | Identifier must not encode or derive the key; no partial binding treated as sufficient | Bind unique key ID to endpoint pair, session, profile, configuration, purpose, policy, validity, and lifecycle state | TBD-009; TBD-010; TBD-019 |
| DC-PS-01 | Pair-state, commit, status, and idempotency evidence | D2 security-relevant non-secret | ARC-EA and ARC-EB | IF-K03; non-secret copy/reference on IF-E01 | Zero key values; no one-sided or ambiguous state represented as available | Authenticate; exact-binding and expected-state guard; idempotency; predecessor/current-state evidence; Unknown/quarantine on ambiguity | TBD-007; TBD-009; TBD-019 |
| DC-CD-01 | Protected local consumer-delivery payload | D1 protected local secret | ARC-EA or ARC-EB | IF-C01 or IF-C02 only, within associated endpoint domain | No remote-distribution inference; no AQMO, evidence, model, release, or website path | Matching Committed/Available pair; exclusive reservation; authenticated/authorized consumer; protected transfer | TBD-008; TBD-010 |
| DC-CA-01 | Consumer-delivery request and acknowledgement metadata | D2 security-relevant non-secret | ARC-EA/EB and ARC-CA/CB | IF-C01; IF-C02; binding/status references on IF-K03 and IF-E01 | No delivered key value; no one-sided acknowledgement treated as OUT-4 | Bind consumer, purpose, policy, endpoint domain, key ID, lifecycle, transaction, and acknowledgement to same pair | TBD-010; TBD-019 |
| DC-RQ-01 | Request and authority metadata | D2 security-relevant non-secret | Future request authority | IF-A01 into TZ-OR; non-secret decision evidence on IF-E01 | No key values; no malformed or unbounded command payload | Validate identity, authority, purpose, schema, freshness, constraints; failed/unknown check blocks candidate generation | TBD-001; TBD-002; TBD-011; TBD-019 |
| DC-OD-01 | Qualified opportunity/decision data | D2 security-relevant non-secret | ARC-DV from external sources | IF-A02 into TZ-OR; selected non-secret evidence on IF-E01 | No key values; no assumption that signature proves correctness; minimize sensitive operational detail | Preserve source, provenance, validity, time, freshness, quality, uncertainty, plausibility, and conflict state | TBD-003; TBD-004; TBD-011; TBD-012; TBD-014; TBD-019 |
| DC-CM-01 | Constrained orchestration command and reservation metadata | D2 security-relevant non-secret | ARC-AQ | IF-A03 to declared local control surfaces; non-secret evidence on IF-E01 | No key values; no gate override, protocol approval, device waiver, incident authority, risk acceptance, or release authority | Authenticate/authorize; allow-list; bind target/session/config; enforce freshness and local-state acceptance | TBD-007; TBD-011; TBD-019 |
| DC-AU-01 | Audit, correlation, gate, transition, and exact-outcome evidence | D3 controlled non-secret evidence | Security-relevant ARC elements; held by ARC-EV | IF-E01; controlled review access | No key value in any lifecycle state; no credential secret; no unsupported public claim | Actor/role, correlation, prior/new state, event/reason, time/config/policy/predecessor references; continuity validation | TBD-015; TBD-019; TBD-020 |
| DC-MI-01 | Model inputs, parameter register, code/configuration/dependency/seed references | D3 controlled analytical input | ARC-MD with configuration/evidence owners | Controlled model boundary; non-secret references on IF-E01 | No operational key values; no unproven borrowed value treated as Q-Orbit design input | Version, unit, uncertainty/range, source/locator, applicability, sensitivity, frozen case | TBD-003; TBD-004; TBD-005; TBD-006; TBD-013; TBD-015; TBD-019 |
| DC-MR-01 | Model outputs, gates, measures, and limitations | D3 controlled analytical result | ARC-MD | Controlled evidence path to ARC-EV; IF-R01 only after applicable review | No generic success; no measured/operational label; no threshold acceptance without authorized threshold; no key value | Record OUT-1..OUT-4, MET ID, numerator/denominator, units/interval, every gate, versions, uncertainty, limitations | TBD-005; TBD-013; TBD-015; TBD-019; TBD-020 |
| DC-RA-01 | Controlled document, diagram, dataset, or website artifact plus release record | D3 controlled artifact | Artifact owner and ARC-RL | IF-R01 into TZ-PU | No unsupported customer/sponsor/adoption/certification claim; no unapproved sensitive detail; no stale-version approval | Exact identity/version, source/applicability, limitations, reviewer/authority/conditions, PR-GATE-01 disposition where public | TBD-001; TBD-014; TBD-020 |

---

## 3. Allowed-flow matrix

Legend: `A` = allowed under the class guard; `R` = non-secret reference/status only; `—` = prohibited by this architecture.

| Class | IF-Q01 | IF-Q02 | IF-K01/02 | IF-K03 | IF-C01/02 | IF-A01/02/03 | IF-E01 | IF-R01 |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| DC-QS-01 | A | — | — | — | — | — | R | — |
| DC-LR-01 | — | — | — | — | — | — | — | — |
| DC-LI-01 | — | — | — | — | — | — | — | — |
| DC-CP-01 | — | A | — | — | — | — | R | — |
| DC-TR-01 | — | A | — | — | — | — | R | — |
| DC-KV-01 | — | — | A | — | — | — | — | — |
| DC-KB-01 | — | — | A | A | R | — | R | — |
| DC-PS-01 | — | — | — | A | R | — | R | — |
| DC-CD-01 | — | — | — | — | A | — | — | — |
| DC-CA-01 | — | — | — | R | A | — | R | — |
| DC-RQ-01 | — | — | — | — | — | A | R | — |
| DC-OD-01 | — | — | — | — | — | A | R | — |
| DC-CM-01 | — | — | — | — | — | A | R | — |
| DC-AU-01 | — | — | — | — | — | — | A | R |
| DC-MI-01 | — | — | — | — | — | — | R | R |
| DC-MR-01 | — | — | — | — | — | — | A | R |
| DC-RA-01 | — | — | — | — | — | — | R | A |

### 3.1 Local-only classes

DC-LR-01 and DC-LI-01 have no permitted inter-element interface in this architecture. They remain inside the producing QKD zone. DC-KV-01 transfers locally only through IF-K01 or IF-K02. DC-CD-01 transfers locally only through IF-C01 or IF-C02.

### 3.2 Reference versus payload

An `R` entry permits only the minimum non-secret reference, gate state, outcome, or version needed for evidence or release control. It does not permit copying the source payload. The future schema must prevent a reference field from becoming a covert or accidental key-value container.

---

## 4. Zone exclusion matrix for key-bearing classes

| Key-bearing class | TZ-QA | TZ-QB | TZ-EA | TZ-EB | TZ-OR | TZ-EV | ARC-MD | TZ-PU |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| DC-LR-01 / DC-LI-01 created in A | A | — | — | — | — | — | — | — |
| DC-LR-01 / DC-LI-01 created in B | — | A | — | — | — | — | — | — |
| DC-KV-01 created in A | A | — | A via IF-K01 | — | — | — | — | — |
| DC-KV-01 created in B | — | A | — | A via IF-K02 | — | — | — | — |
| DC-CD-01 for consumer A | — | — | A | — | — | — | — | — |
| DC-CD-01 for consumer B | — | — | — | A | — | — | — | — |

The authorized local consumer lies beyond the EKM-zone boundary on IF-C01 or IF-C02; the consumer's future protected boundary is unresolved under `TBD-010` and is not claimed by this table.

---

## 5. Lifecycle and evidence rules

| Lifecycle/evidence concern | Architecture rule |
|---|---|
| Creation | A key-bearing class exists only after the applicable local process and gates; accepted final key requires all selected acceptance gates positive |
| Binding | DC-KV-01 and DC-CD-01 are inseparable from a complete DC-KB-01 binding in control/evidence semantics |
| Prepared | Material is inaccessible and cannot satisfy availability, allocation, delivery, or use |
| Unknown | Material is quarantined and unusable until positive reconciliation or a safer terminal disposition |
| Reservation | Delivery begins only after exclusive reservation of matching Committed/Available state |
| Delivery ambiguity | Prevent automatic reallocation; OUT-4 remains non-positive |
| Evidence | Record exact non-secret state, gate, reason, version, correlation, and predecessor/current-state references |
| Destruction/revocation | Evidence may record completion/status; the value itself never enters evidence |
| Presentation | Only DC-RA-01 crosses IF-R01; no key-bearing class reaches TZ-PU |

---

## 6. Register review result

| Check | Result |
|---|---|
| Declared classes | 17 unique IDs |
| Key-bearing classes | DC-LR-01; DC-LI-01; DC-KV-01; DC-CD-01 |
| Key-value access by AQMO | Prohibited |
| Key-value access by evidence | Prohibited |
| Key-value access by reference model | Prohibited |
| Key-value access by release/presentation | Prohibited |
| Key value on IF-K03 | Prohibited |
| Physical/legal classification selected | No |
| Operational verification | None; design inspection only |

