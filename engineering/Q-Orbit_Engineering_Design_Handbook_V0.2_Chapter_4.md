# Q-Orbit Engineering Design Handbook V0.2

## Chapter 4 — Proposed Requirements Baseline

| Document field | Value |
|---|---|
| Document ID | QO-EDH-CH04 |
| Version | Proposed Requirements Baseline V0.2 |
| Date | 12 August 2026 |
| Parent baseline | QO-EDH-REG-001 and Chapters 1–3 V0.2 |
| Derivation authority | Project working direction received 12 August 2026 |
| Approval status | Derived and internally checked; CH4-G1 team approval pending |
| Normative status | Proposed; `shall` statements become project-baseline requirements only after CH4-G1 approval |
| Operational status | Not an authorization to build, deploy, operate, certify, or accept risk |

> **Baseline boundary.** This chapter turns the accepted working direction for ED-003, ED-004, ED-005, ED-006, ED-007, ED-008, ED-013, and ED-016 into traceable proposed requirements. The direction authorizes requirements derivation; it does not create external customer, cryptographic, safety, regulatory, security, or operational approval.

---

## 4.1 Purpose

This chapter:

1. defines atomic and verifiable proposed requirements for the Chapters 1–3 reference case;
2. dispositions every `SEC-OBL-*` and `OPS-OBL-*` candidate obligation;
3. identifies the responsible functional owner, rationale, verification level, acceptance evidence, and blocking open issue for each requirement;
4. prevents unresolved parameters or authorities from being hidden inside requirement language; and
5. provides the entry gate for detailed architecture, simulation, interface, and verification work.

This chapter does not select flight hardware, an EKM product, a consumer API, a trust-anchor construction, an operational orbit/site, numeric performance thresholds, or a jurisdiction.

---

## 4.2 Derivation basis and decision disposition

### 4.2.1 Working decisions used for derivation

| Decision | Working disposition for Chapter 4 | Requirement effect |
|---|---|---|
| ED-003 | Accepted for derivation | One direct QKD-A/QKD-B link; no relay or arbitrary remote-consumer claim |
| ED-004 | Accepted for derivation | One logical EKM and one local representative consumer per endpoint domain |
| ED-005 | Accepted for derivation | Replenishment is primary; consumer delivery is separate |
| ED-006 | Accepted as an analysis profile only | Downlink efficient-BB84 WCP with one signal and two decoys; no operational selection |
| ED-007 | Accepted as the computational reference only | Finite-block single-pass method from Sidhu et al. 2022; independent reproduction required |
| ED-008 | Accepted for derivation | Session, key lifecycle, replenishment, and delivery results remain separate |
| ED-013 | Accepted for derivation | Prepared/committed/unknown semantics; ambiguity is unusable |
| ED-016 | Dispositioned by this chapter | Candidate obligations become proposed requirements or explicit scope controls |

### 4.2.2 Inherited constraints

The proposed requirements also inherit:

- POL-01 through POL-10 from QO-EDH-REG-001;
- ED-002, ED-009, ED-010, ED-012, ED-014, and ED-015;
- the controlled vocabulary and exact OUT-1 through OUT-4 meanings;
- the applicability limits in the Claim & Evidence Register; and
- all unresolved `TBD-*` controls.

No requirement may be interpreted to close a `TBD-*` without the registered closure evidence.

---

## 4.3 Requirement conventions

### 4.3.1 Normative grammar

Each requirement row contains one primary normative obligation using `shall`.

Lists inside one statement define the completeness of one record, gate, binding, or review and are verified together. Independently controllable behaviors are separated into different requirement IDs.

The terms `approved`, `authorized`, `current`, `valid`, `positive`, `matching`, and `known-good` refer to a named controlled policy, authority, version, state, or acceptance record. They are not satisfied by developer judgment alone.

### 4.3.2 Maturity values

| Value | Meaning |
|---|---|
| **Ready** | Requirement logic is suitable for preliminary project baselining; implementation evidence may still be future work. |
| **Provisional** | Requirement intent is suitable, but a named `TBD-*` must close before its final acceptance data or implementation can be frozen. |
| **Scope control** | Prohibits an unsupported architecture, claim, transition, or release; it is not a performance requirement. |

Every row remains **Proposed** until CH4-G1 approval, regardless of maturity.

### 4.3.3 Verification codes

| Code | Method | Level |
|---|---|---|
| IN | Inspection | Document, configuration, schema, code, interface, boundary, or record review |
| AN | Analysis | Reproducible calculation, model comparison, proof-assumption mapping, or trace analysis |
| TE | Test | Component, interface, integrated, negative, fault-injection, or adversarial test |
| DE | Demonstration | Controlled end-to-end scenario or operator workflow demonstration |
| IR | Independent review | Review performed outside the producing role with recorded findings |

### 4.3.4 Acceptance rule

A requirement passes only when every acceptance condition in its row is positively demonstrated at the stated level. Missing, contradictory, stale, or indeterminate evidence is not a pass.

---

## 4.4 Service, topology, and outcome requirements

| ID | Proposed requirement | Parent trace | Allocation | Rationale | Verification and acceptance | Maturity/open issue |
|---|---|---|---|---|---|---|
| REQ-SRV-001 | The V0.2 SQDS reference configuration shall implement one bounded key-replenishment service between QKD-A and QKD-B. | ED-003; MO-01; MO-02; MO-03 | System architect | Preserve one coherent reference case | IN/System: exactly one QKD endpoint pair and one replenishment service are active in the reference configuration | Ready |
| REQ-SRV-002 | The SQDS QKD path shall not transport mission plaintext. | POL-01; ED-002 | System architect | Keep the QKD claim limited to key establishment | IN/Architecture: data-flow inventory contains no mission-plaintext flow through the quantum or QKD processing path | Ready |
| REQ-SRV-003 | The V0.2 reference configuration shall connect QKD-A and QKD-B through one direct quantum path and one authenticated classical protocol path. | ED-003; CE-006 | System architect + QKD lead | Fix the two protocol participants and dependencies | IN/System: deployment and interface records show exactly the stated endpoint pair and both paths | Provisional — TBD-007; TBD-008 |
| REQ-SRV-004 | The SQDS shall associate accepted output from QKD-A only with EKM-A and accepted output from QKD-B only with EKM-B. | ED-004; SEC-OBL-010 | EKM architect | Prevent cross-endpoint misbinding | TE/Interface: swapped-EKM negative cases are rejected and create no prepared record | Provisional — TBD-008; TBD-009 |
| REQ-SRV-005 | The V0.2 reference configuration shall associate one local representative consumer with each endpoint domain. | ED-004; A-004 | System architect | Demonstrate local handoff without a remote claim | IN/System: consumer A is in domain A and consumer B is in domain B; no consumer is represented as a remote endpoint | Provisional — TBD-008; TBD-010 |
| REQ-SRV-006 | The V0.2 reference configuration shall exclude any trusted relay from the accepted topology. | POL-06; SEC-OBL-025 | System architect | Avoid importing an unapproved plaintext-key trust node | IN/Configuration: relay count is zero and no key path depends on relay custody | Scope control — TBD-016 |
| REQ-SRV-007 | The SQDS shall reject any V0.2 configuration or result label that represents arbitrary remote-consumer distribution as part of the direct-link baseline. | ED-003; ED-004; POL-06 | Configuration manager | Prevent topology overclaim | TE/Configuration: injected remote-consumer configuration or label fails validation and cannot produce a baseline result | Scope control — TBD-016 |
| REQ-SRV-008 | The SQDS result schema shall store OUT-1, OUT-2, OUT-3, and OUT-4 as separately addressable outcome fields. | ED-008; OPS-OBL-024; OPS-OBL-025 | Evidence/schema owner | Prevent one success label from hiding different completion points | IN/Schema: four distinct fields exist and no unqualified `success` field substitutes for them | Ready |
| REQ-SRV-009 | The SQDS shall set OUT-3 positive only when EKM-A and EKM-B establish matching positive two-sided commit evidence for the same pair binding. | ED-005; ED-013; OPS-OBL-014 | EKM architect | Make replenishment completion unambiguous | TE/Integrated: nominal paired commit sets OUT-3 positive; each one-sided, mismatched, timeout, and unknown case does not | Provisional — TBD-009 |
| REQ-SRV-010 | The SQDS shall execute consumer delivery as a transaction distinct from the replenishment transaction. | ED-005; ED-008; OPS-OBL-024 | EKM + consumer interface leads | Preserve inventory and delivery accounting | IN/Schema + TE/Integrated: distinct transaction IDs and state records exist; delivery failure does not rewrite the recorded OUT-3 result | Provisional — TBD-010 |
| REQ-SRV-011 | The SQDS shall set OUT-4 positive only after both authorized local consumers acknowledge the corresponding pair binding and both EKMs confirm the same delivered state. | ED-004; ED-005; SEC-OBL-014; OPS-OBL-022 | EKM + consumer interface leads | Prevent one-sided delivery from appearing complete | TE/Integrated: only the two-acknowledgement, paired-EKM case sets OUT-4 positive; lost, wrong, or mismatched acknowledgements do not | Provisional — TBD-010 |

---

## 4.5 QKD protocol, device, and acceptance requirements

| ID | Proposed requirement | Parent trace | Allocation | Rationale | Verification and acceptance | Maturity/open issue |
|---|---|---|---|---|---|---|
| REQ-QKD-001 | The reference analysis shall identify the exact downlink prepare-and-measure efficient-BB84 WCP profile, one signal intensity, two decoy intensities, and finite single-pass method by controlled configuration ID. | ED-006; ED-007; OPS-OBL-004 | QKD protocol lead | Keep every result profile-specific | IN/Model configuration: all listed profile elements and one immutable configuration ID are present | Provisional — TBD-005 |
| REQ-QKD-002 | The SQDS shall freeze the protocol, device, endpoint-pair, and policy references before acquisition begins. | OPS-OBL-004 | Configuration manager + QKD leads | Prevent mid-session assumption changes | TE/Session: an attempted post-start reference change is rejected or causes hold/abort and a new session identity | Provisional — TBD-005; TBD-006; TBD-007 |
| REQ-QKD-003 | The SQDS shall begin bounded quantum exchange only when both QKD endpoints report positive local readiness for the frozen session configuration. | OPS-OBL-005 | QKD-A/QKD-B owners | Block exchange under incompatible state | TE/Integrated: each negative or unknown endpoint-readiness injection prevents QuantumActive entry | Provisional — TBD-004; TBD-006 |
| REQ-QKD-004 | Each QKD endpoint shall authenticate its peer for the active session before accepting final key output. | SEC-OBL-001; OPS-OBL-006 | Cryptographic authority + QKD leads | Prevent peer impersonation | TE/Protocol: invalid, absent, expired, revoked, and wrong-session peer authentication cases produce no accepted key | Provisional — TBD-007 |
| REQ-QKD-005 | Each QKD endpoint shall verify integrity protection for every security-relevant classical protocol message used by final-key acceptance. | SEC-OBL-002; OPS-OBL-006 | QKD protocol lead | Prevent undetected transcript modification | TE/Protocol: mutation of every tested security-relevant message class causes rejection before accepted output | Provisional — TBD-005; TBD-007 |
| REQ-QKD-006 | Each QKD endpoint shall verify the active-session binding of every security-relevant classical protocol message used by final-key acceptance. | SEC-OBL-002; OPS-OBL-006 | QKD protocol lead | Prevent cross-session substitution | TE/Protocol: a message bound to another or absent session cannot contribute to accepted output | Provisional — TBD-005; TBD-007 |
| REQ-QKD-007 | Each QKD endpoint shall verify the freshness state of every security-relevant classical protocol message used by final-key acceptance. | CP-T02; OPS-OBL-006 | QKD protocol lead | Prevent stale transcript use | TE/Protocol: messages outside the frozen freshness rule cannot contribute to accepted output | Provisional — TBD-005; TBD-007 |
| REQ-QKD-008 | Each QKD endpoint shall reject a replayed security-relevant classical protocol message when the frozen protocol does not explicitly permit idempotent reuse. | CP-T02; OPS-OBL-006 | QKD protocol lead | Prevent transcript replay | TE/Protocol: invalid duplicate/replay cases cannot contribute to accepted output and produce a controlled rejection event | Provisional — TBD-005; TBD-007 |
| REQ-QKD-009 | Each QKD endpoint shall produce accepted final output only when every selected finite-key and profile gate is positive. | SEC-OBL-003; OPS-OBL-007 | QKD protocol lead | Preserve the stated security analysis | AN+TE/Protocol: positive acceptance requires all configured gates; failure of any individual gate produces explicit no-key output | Provisional — TBD-005 |
| REQ-QKD-010 | Each QKD endpoint shall produce no accepted final output when any required device gate is negative. | SEC-OBL-004; SEC-OBL-017; OPS-OBL-008 | QKD hardware lead | Prevent proof/device mismatch | TE/Component: negative health, calibration, entropy, timing, and operating-envelope cases each produce no accepted output | Provisional — TBD-006 |
| REQ-QKD-011 | Each QKD endpoint shall produce no accepted final output when any required acceptance gate has an unknown or indeterminate state. | POL-02; ED-009 | QKD leads | Make uncertainty fail closed | TE/Component: each unknown-gate injection produces explicit rejection or abort and zero accepted output | Ready |
| REQ-QKD-012 | The finite-key calculation shall account for every disclosed transcript element classified as leakage by the frozen protocol dossier. | CE-017; SEC-OBL-003 | QKD protocol lead | Avoid overstating secret-key length | AN/Model: each classified disclosure maps to the implemented leakage term or an approved zero-contribution rationale | Provisional — TBD-005 |
| REQ-QKD-013 | The project shall maintain an independently reviewed mapping from each selected proof assumption to the implementing hardware, software, interface, configuration, and operating condition. | SEC-OBL-027 | Independent V&V lead | Test proof applicability rather than cite it abstractly | IR/Assurance: every proof assumption has an implementation mapping and no unresolved high-consequence mismatch is marked passed | Provisional — TBD-005; TBD-006; TBD-015 |
| REQ-QKD-014 | The project shall maintain characterization and adversarial-evaluation evidence for every source behavior relied upon by acceptance. | SEC-OBL-016 | QKD source owner | Cover modeled source attack surfaces | AN+TE/Component: evidence identifies source limits, uncertainties, tested conditions, failures, and proof applicability | Provisional — TBD-006; TBD-015 |
| REQ-QKD-015 | The project shall maintain characterization and adversarial-evaluation evidence for every detector behavior relied upon by acceptance. | SEC-OBL-016 | QKD detector owner | Cover modeled detector attack surfaces | AN+TE/Component: evidence identifies detector limits, uncertainties, tested conditions, failures, and proof applicability | Provisional — TBD-006; TBD-015 |
| REQ-QKD-016 | The project shall maintain integrity and health evidence for every entropy function relied upon by acceptance. | SEC-OBL-017 | Entropy-function owner | Prevent unmeasured entropy trust | IN+TE/Component: each function has an owner, health rule, integrity mechanism, failure state, and executed negative test | Provisional — TBD-006 |
| REQ-QKD-017 | The project shall maintain integrity and health evidence for every calibration function relied upon by acceptance. | SEC-OBL-017 | Calibration owner | Prevent unmeasured calibration trust | IN+TE/Component: each function has an owner, health rule, integrity mechanism, failure state, and executed negative test | Provisional — TBD-006 |

---

## 4.6 Endpoint key-management and consumer-delivery requirements

| ID | Proposed requirement | Parent trace | Allocation | Rationale | Verification and acceptance | Maturity/open issue |
|---|---|---|---|---|---|---|
| REQ-KM-001 | Each QKD endpoint shall transfer accepted final output only through its protected local path to its associated EKM. | OPS-OBL-011; SEC-OBL-020 | QKD + EKM architects | Limit final-key exposure | IN+TE/Interface: only QKD-A→EKM-A and QKD-B→EKM-B value paths exist; alternate-path attempts fail | Provisional — TBD-008 |
| REQ-KM-002 | Each accepted output record shall bind one unique key identifier to the endpoint pair, session, profile, configuration, purpose, policy, validity, and lifecycle state. | SEC-OBL-010; OPS-OBL-012 | EKM architect | Prevent wrong-context use | IN+TE/Schema: every field is present and each omitted, altered, or mismatched field causes intake rejection | Provisional — TBD-009 |
| REQ-KM-003 | An EKM shall prevent access, allocation, delivery, or use of key material in `Prepared` state. | OPS-OBL-013 | EKM architect | Keep incomplete pair state unavailable | TE/EKM: all access and allocation operations against prepared-only material are denied | Ready |
| REQ-KM-004 | An EKM shall enter local `Prepared` state only after validating the accepted-output binding against the authorized transaction context. | ED-013; SEC-OBL-010 | EKM architect | Stop invalid intake before pair coordination | TE/EKM: wrong endpoint, session, profile, purpose, policy, validity, state, or identifier prevents Prepared entry | Provisional — TBD-009 |
| REQ-KM-005 | The EKM pair shall attempt commit only after both EKMs establish compatible prepared evidence for the same pair binding. | ED-013; OPS-OBL-014 | EKM architect | Prevent asymmetric commit initiation | TE/Integrated: any absent or incompatible prepared evidence prevents commit initiation | Provisional — TBD-009 |
| REQ-KM-006 | Each EKM shall mark a pair `Committed/Available` only after obtaining positive authenticated peer evidence for the same committed pair binding. | SEC-OBL-011; OPS-OBL-014 | EKM architect | Define two-sided availability | TE/Integrated: only matching authenticated commit evidence on both sides permits Available state | Provisional — TBD-007; TBD-009 |
| REQ-KM-007 | An EKM shall set the affected pair state to `Unknown` when it cannot prove the required peer state after timeout, response loss, restart, partition, or conflicting evidence. | ED-013; OPS-OBL-015 | EKM architect | Preserve uncertainty explicitly | TE/EKM: every injected uncertainty class produces Unknown rather than Prepared, Available, or Delivered | Provisional — TBD-009 |
| REQ-KM-008 | An EKM shall place every pair in `Unknown` state into quarantine before any access, allocation, delivery, or use. | SEC-OBL-013; OPS-OBL-015 | EKM architect | Fail closed on ambiguity | TE/EKM: Unknown state immediately blocks all listed operations and creates a quarantine record | Provisional — TBD-009 |
| REQ-KM-009 | Neither EKM shall expose an affected pair as available when either side reports prepared, unknown, absent, timed-out, or conflicting peer state. | SEC-OBL-011; SEC-OBL-013; OPS-OBL-018 | EKM architect | Prevent one-sided success | TE/Integrated: each partial-commit case yields zero accessible available objects at both sides | Ready |
| REQ-KM-010 | EKM commit and status operations shall be idempotent for repeated requests carrying the same idempotency key and identical binding data. | SEC-OBL-012; OPS-OBL-016 | EKM architect | Make retries safe | TE/EKM: reordered and repeated identical requests return the established state without an additional transition | Provisional — TBD-009 |
| REQ-KM-011 | Reprocessing an identical idempotent EKM request shall create zero additional key allocations and zero additional delivery operations. | OPS-OBL-016 | EKM architect | Prevent duplicate use | TE/EKM: allocation and delivery counters remain unchanged after repeated identical requests | Provisional — TBD-009 |
| REQ-KM-012 | An EKM shall reject a reused idempotency key when any binding field differs from the established request. | OPS-OBL-017 | EKM architect | Detect mutation and replay | TE/EKM: mutation of each binding field causes rejection and a security-relevant event | Provisional — TBD-009 |
| REQ-KM-013 | An EKM shall apply each lifecycle transition only when the recorded current state matches the operation's expected prior state. | ED-013 | EKM architect | Prevent rollback and race-induced state corruption | TE/EKM: every invalid prior-state transition is rejected without changing key availability | Provisional — TBD-009 |
| REQ-KM-014 | An EKM timeout shall result only in `Unknown` or an explicitly safer terminal state, never success or automatic rollback. | ED-013; OPS-OBL-015; OPS-OBL-018 | EKM architect | Keep timeout semantics safe | TE/EKM: timeout injection never produces Available or automatic reusable state | Provisional — TBD-009 |
| REQ-KM-015 | EKM recovery after restart shall not expose an ambiguously committed or delivered pair before positive reconciliation. | OPS-OBL-018; OPS-OBL-023 | EKM architect | Preserve safe state across failure | TE/EKM: crash/restart cases deny access until compatible durable evidence or destruction disposition completes | Provisional — TBD-009; TBD-010 |
| REQ-KM-016 | An EKM shall begin consumer delivery only from matching `Committed/Available` pair state. | OPS-OBL-019 | EKM + consumer interface leads | Prevent delivery of incomplete inventory | TE/Interface: delivery requests from every other state are rejected | Ready |
| REQ-KM-017 | The EKM pair shall reserve the selected pair exclusively before either local protected consumer transfer begins. | OPS-OBL-020 | EKM architect | Prevent concurrent allocation | TE/Integrated: concurrent delivery attempts for the same pair yield one reservation and no second transfer | Provisional — TBD-010 |
| REQ-KM-018 | Each EKM shall authenticate the identity of its local consumer before protected transfer. | SEC-OBL-014; OPS-OBL-021 | Consumer interface lead | Prevent wrong-recipient exposure | TE/Interface: absent, invalid, expired, revoked, and wrong-domain identities receive no transfer | Provisional — TBD-010 |
| REQ-KM-019 | Each EKM shall authorize its authenticated local consumer against the pair purpose, policy, endpoint domain, key identifier, and lifecycle state before protected transfer. | SEC-OBL-014; OPS-OBL-021 | Consumer interface lead | Separate identity from permitted use | TE/Interface: mismatch of each authorization field prevents transfer | Provisional — TBD-010 |
| REQ-KM-020 | The EKM pair shall set final delivered state only after both local consumer acknowledgements and compatible paired-EKM delivery evidence reference the same pair binding. | OPS-OBL-022 | EKM + consumer interface leads | Define two-sided delivery completion | TE/Integrated: lost, duplicated-invalid, wrong, or mismatched acknowledgement cases do not set delivered state | Provisional — TBD-010 |
| REQ-KM-021 | The EKM pair shall prevent automatic reallocation of a pair whose delivery state is pending, timed out, mismatched, or otherwise ambiguous. | OPS-OBL-023 | EKM architect | Prevent duplicate delivery after uncertainty | TE/Integrated: each ambiguous-delivery case produces zero subsequent allocations until reconciliation or terminal disposition | Provisional — TBD-010 |
| REQ-KM-022 | An EKM shall prevent reuse or reallocation after a binding enters consumed, expired, revoked, or destroyed state. | SEC-OBL-015 | EKM architect | Enforce terminal lifecycle semantics | TE/EKM: every operation against each prohibited state is denied | Provisional — TBD-009; TBD-010 |
| REQ-KM-023 | A consumer-delivery failure shall not alter the previously recorded OUT-3 replenishment result. | ED-005; ED-008; OPS-OBL-024 | Evidence/schema owner + EKM architect | Keep service outcomes independent | TE/Integrated: injected delivery failures leave the immutable recorded OUT-3 value unchanged | Ready |
| REQ-KM-024 | EKM-to-EKM commit and status coordination shall contain no key values or data from which key values can be derived under the approved data-classification rule. | POL-04; ED-013 | EKM + security architects | Minimize coordination-path consequence | IN+TE/Interface: schema and runtime trace contain only authorized non-secret binding/state metadata | Provisional — TBD-008; TBD-009 |
| REQ-KM-025 | The EKM functions shall apply the approved destruction procedure to rejected, duplicate, unsafe, expired, revoked, and terminally quarantined key material. | SEC-OBL-015; ED-009 | EKM architect | Close unusable material lifecycle | IN+TE/EKM: each listed disposition produces a destruction record and subsequent access returns no material | Provisional — TBD-009; TBD-010 |

---

## 4.7 AQMO authority and orchestration requirements

| ID | Proposed requirement | Parent trace | Allocation | Rationale | Verification and acceptance | Maturity/open issue |
|---|---|---|---|---|---|---|
| REQ-AQM-001 | AQMO shall have no interface capable of receiving a raw, intermediate, accepted, stored, reserved, delivered, consumed, quarantined, expired, revoked, or destroyed key value. | POL-04; SEC-OBL-005; OPS-OBL-009 | AQMO + security architects | Remove AQMO from key custody | IN/Interfaces: no key-value field or value path exists across all AQMO interfaces | Ready |
| REQ-AQM-002 | AQMO shall not derive a key value from received data. | OPS-OBL-009 | AQMO + security architects | Prevent indirect key custody | AN+TE/Data flow: permitted AQMO inputs are non-derivable under the approved classification analysis and tested traces expose no derivation path | Provisional — TBD-011; TBD-019 |
| REQ-AQM-003 | AQMO shall accept only the request, opportunity, resource, security, inventory, and outcome metadata fields authorized by its controlled input schema. | ED-010 | AQMO lead | Enforce metadata minimization | IN+TE/Interface: undeclared fields are rejected and authorized schema contains no key values | Provisional — TBD-011 |
| REQ-AQM-004 | AQMO shall exclude every candidate with any negative or unknown hard-constraint result before ranking. | SEC-OBL-007; OPS-OBL-003 | AQMO lead | Prevent optimization from bypassing safety/security | TE/AQMO: property tests show zero ranked candidates with a negative or unknown hard constraint | Provisional — TBD-011 |
| REQ-AQM-005 | AQMO shall not override or positively reinterpret a local reject, abort, hold, quarantine, revocation, destruction, device gate, protocol gate, EKM gate, or consumer-delivery gate. | SEC-OBL-006; OPS-OBL-010 | AQMO lead | Keep local authorities non-overridable | TE/AQMO: every attempted override is denied and the local state remains unchanged | Ready |
| REQ-AQM-006 | AQMO shall not approve a cryptographic protocol, security parameter, authentication construction, key lifecycle policy, or device security model. | ED-010 | AQMO lead | Keep cryptographic authority outside optimization | IN+TE/Authority: no AQMO role, command, or workflow can approve the listed items | Ready |
| REQ-AQM-007 | AQMO shall not accept operational risk. | ED-010 | AQMO lead | Preserve risk-authority accountability | IN+TE/Authority: no AQMO role, command, or workflow can record risk acceptance | Ready |
| REQ-AQM-008 | AQMO shall not reactivate a resource in incident state. | ED-010; SEC-OBL-023 | AQMO lead | Preserve recovery authority | IN+TE/Authority: every attempted AQMO incident reactivation is denied | Ready |
| REQ-AQM-009 | Every AQMO execution command shall reference the authorized endpoint pair, session, frozen configuration, policy, and bounded time window. | OPS-OBL-004 | AQMO + operations leads | Bind orchestration to approved context | TE/Interface: missing, stale, or mismatched command references are rejected by the receiving function | Provisional — TBD-011 |
| REQ-AQM-010 | AQMO shall stop issuing new reservations and execution commands when it becomes unavailable or is suspected compromised. | OPS-OBL-030 | AQMO + operations leads | Bound control-plane failure | TE/Integrated: loss and compromise-suspicion injection produce zero new reservations or execution commands | Provisional — TBD-011 |
| REQ-AQM-011 | After AQMO loss, local functions shall complete only a transaction that was explicitly preauthorized and remains within positive local gates. | ED-010; OPS-OBL-030 | Endpoint/EKM owners | Avoid unsafe dependence or unsafe autonomy | TE/Integrated: unauthorized or locally negative transactions stop; a configured preauthorized positive case follows its bounded local policy | Provisional — TBD-011 |

---

## 4.8 External decision-data requirements

| ID | Proposed requirement | Parent trace | Allocation | Rationale | Verification and acceptance | Maturity/open issue |
|---|---|---|---|---|---|---|
| REQ-DAT-001 | Each decision-critical input record shall contain source identity, observation/reference time, receipt time, validity interval, provenance, quality state, and uncertainty or confidence representation. | SEC-OBL-008 | Data-services owner | Make data fitness inspectable | IN/Schema: every listed field is mandatory and absent fields produce invalid input state | Provisional — TBD-012 |
| REQ-DAT-002 | SQDS planning and execution functions shall prevent a decision-critical input that exceeds its configured freshness limit from driving the affected decision. | OPS-OBL-029 | Data-services + AQMO leads | Prevent stale data use | TE/Data interface: values just inside the limit are handled per policy and values outside it cannot drive execution | Provisional — TBD-012 |
| REQ-DAT-003 | SQDS planning and execution functions shall record every detected conflict between decision-critical sources before making the affected decision. | ED-012; OPS-OBL-029 | Data-services + audit owners | Preserve conflict evidence | TE/Data interface: conflicting inputs create one correlated conflict event containing the affected fields and sources | Provisional — TBD-012; TBD-019 |
| REQ-DAT-004 | SQDS planning and execution functions shall prevent the affected decision when a decision-critical conflict has no positive disposition under a predeclared rule. | POL-09; SEC-OBL-009; OPS-OBL-029 | AQMO + operations leads | Avoid guessing a safe state | TE/Integrated: unresolved conflict cases issue no affected execution command | Provisional — TBD-012 |
| REQ-DAT-005 | SQDS planning and execution functions shall apply only a version-controlled predeclared conflict rule to resolve a decision-critical conflict automatically. | ED-012 | Data-services owner | Prevent ad hoc source preference | IN+TE/Data policy: an absent or unrecognized rule cannot resolve the conflict; a valid rule records its version and result | Provisional — TBD-012 |
| REQ-DAT-006 | SQDS planning and execution functions shall evaluate validity, freshness, plausibility, and conflict state independently of source-authentication success. | POL-09; ED-012 | Data-services owner | Authentication does not prove correctness | TE/Data interface: correctly authenticated but stale, implausible, or conflicting inputs are rejected or held | Provisional — TBD-012 |

---

## 4.9 Cybersecurity, configuration, incident, and recovery requirements

| ID | Proposed requirement | Parent trace | Allocation | Rationale | Verification and acceptance | Maturity/open issue |
|---|---|---|---|---|---|---|
| REQ-CYB-001 | SQDS shall authenticate every platform, QKD-endpoint, EKM, AQMO, consumer-interface, maintenance, and administrative command before execution. | SEC-OBL-018 | Security architect + interface owners | Prevent command-source impersonation | TE/Interfaces: absent, invalid, expired, revoked, replayed, and wrong-interface authentication cases execute no command | Provisional — TBD-007; TBD-010 |
| REQ-CYB-002 | SQDS shall authorize every authenticated platform, QKD-endpoint, EKM, AQMO, consumer-interface, maintenance, and administrative command against the actor role and target state before execution. | SEC-OBL-018 | Security architect + interface owners | Separate identity from permitted action | TE/Interfaces: authenticated but unauthorized role/action/state combinations execute no command | Provisional — TBD-007; TBD-010; TBD-011 |
| REQ-CYB-003 | Before activation, each runtime function shall verify its software, firmware, model, dependency, and configuration identifiers against one approved version-controlled baseline. | SEC-OBL-019 | Configuration manager + component owners | Prevent untracked runtime state | IN+TE/Components: all identifiers match one baseline; any changed or absent identifier prevents activation | Provisional — TBD-006; TBD-008; TBD-011 |
| REQ-CYB-004 | A runtime function shall prevent activation when required baseline verification is negative or unknown. | SEC-OBL-019 | Component owners | Fail closed on configuration uncertainty | TE/Components: negative and unknown verification states produce no active mission-capable state | Ready |
| REQ-CYB-005 | SQDS configuration control shall prevent rollback to a version not explicitly authorized for the current baseline. | SEC-OBL-019 | Configuration manager | Prevent vulnerable or incompatible rollback | TE/Update: unauthorized older versions are rejected; an authorized rollback records authority, version, and reason | Provisional — TBD-019 |
| REQ-CYB-006 | The SQDS architecture shall enforce separate privileges and controlled flows for QKD, platform, EKM, AQMO, external-data, consumer, maintenance, and administration functions. | SEC-OBL-020 | Security architect | Limit lateral movement and unintended data exposure | IN+TE/Architecture: every cross-boundary flow is declared; unauthorized role/flow cases are denied | Provisional — TBD-008; TBD-010; TBD-011 |
| REQ-CYB-007 | Each accepted hardware, software, firmware, model, dependency, update, or calibration artifact shall have recorded provenance, integrity evidence, version, acceptance result, and responsible role. | CY-T03; CF-08; SEC-OBL-019 | Supply-chain/configuration manager | Preserve acceptance trace | IN/Supply chain: every baseline artifact has all required fields and no failed/unresolved artifact is active | Provisional — TBD-015 |
| REQ-CYB-008 | SQDS shall enter an incident state that blocks new release from an affected trust domain when compromise is suspected. | SEC-OBL-022 | Cybersecurity/operations lead | Contain suspected compromise | TE/Integrated: each compromise-suspicion trigger blocks accepted-key handoff, availability transition, and consumer delivery in the affected domain | Provisional — TBD-019 |
| REQ-CYB-009 | SQDS shall return an affected trust domain to service only after known-good restoration, revalidation, trust re-establishment, and explicit authority are all positively recorded. | SEC-OBL-023 | Cybersecurity/operations + authority | Prevent premature recovery | DE+TE/Recovery: omission or failure of any one recovery condition prevents return to mission-capable state | Provisional — TBD-007; TBD-015; TBD-019 |
| REQ-CYB-010 | SQDS shall not automatically change algorithm, key source, endpoint, trust path, relay use, or security label after a failure. | POL-03; SEC-OBL-024 | System + security architects | Prevent silent downgrade | TE/Integrated: each failure class retains the configured service label and issues no alternate-service activation | Ready |
| REQ-CYB-011 | SQDS shall activate a non-QKD fallback service only under a separately approved configuration, authority, label, entry condition, and termination condition. | POL-03; TBD-018 | Mission + cryptographic authorities | Keep any future fallback explicit | IN+TE/Integrated: absent any required fallback record, activation is denied; V0.2 default has no active fallback | Provisional — TBD-018 |
| REQ-CYB-012 | Maintenance and test key material shall remain segregated from mission inventory such that it cannot satisfy OUT-2, OUT-3, or OUT-4. | MODE-9; ED-008 | Configuration + EKM owners | Prevent test artifacts entering service results | TE/Integrated: test-labeled material cannot transition to accepted, available, or delivered mission state | Ready |

---

## 4.10 Correlation, audit, and evidence requirements

| ID | Proposed requirement | Parent trace | Allocation | Rationale | Verification and acceptance | Maturity/open issue |
|---|---|---|---|---|---|---|
| REQ-EVD-001 | SQDS shall assign collision-resistant correlation identifiers to every request, session, EKM pair-state transaction, and consumer-delivery transaction within the defined retention/collision domain. | OPS-OBL-001 | Evidence/schema owner | Prevent cross-transaction mixing | AN+TE/Schema: generated identifiers meet the frozen construction; collision, reuse, and cross-type confusion tests are detected or rejected | Provisional — TBD-009; TBD-010; TBD-019 |
| REQ-EVD-002 | SQDS shall admit a request to candidate generation only after positive validation of request identity, authority, purpose, schema, and freshness. | OPS-OBL-002 | Operations + AQMO leads | Block malformed or unauthorized work early | TE/Request interface: failure or unknown state of any listed validation prevents candidate generation | Provisional — TBD-002; TBD-011 |
| REQ-EVD-003 | SQDS shall create tamper-evident non-secret audit events for authentication, authorization, configuration, profile/device gates, session transitions, EKM state, consumer delivery, AQMO decisions, aborts, incidents, recovery, maintenance, administration, and release decisions. | SEC-OBL-021; OPS-OBL-031 | Audit owner | Provide reconstructable evidence across critical behavior | IN+TE/Audit: every listed event class produces a schema-valid integrity-protected record in its positive and negative test cases | Provisional — TBD-019 |
| REQ-EVD-004 | SQDS audit and operational evidence shall contain no raw, intermediate, accepted, stored, reserved, delivered, consumed, quarantined, expired, revoked, or destroyed key value. | POL-04; OPS-OBL-031 | Audit + security owners | Prevent logging from becoming a key leak | IN+TE/Audit: schema contains no key-value field and runtime scans find zero key-value occurrences | Provisional — TBD-019 |
| REQ-EVD-005 | Each security-relevant transition record shall contain actor identity, authority/role, correlation identifier, prior state, new state, event/reason, time reference, and applicable configuration/policy references. | SEC-OBL-021; OPS-OBL-028; OPS-OBL-031 | Evidence/schema owner | Make each transition attributable and testable | IN/Schema: all fields are mandatory; missing fields make the record invalid and block the affected transition | Provisional — TBD-019 |
| REQ-EVD-006 | Each security-relevant transition record shall reference the expected predecessor record or prior-state version. | ED-013; CH3 §3.14.2 | Evidence/schema owner | Detect broken state continuity | TE/Audit: removal or substitution of the predecessor reference causes continuity validation failure | Provisional — TBD-019 |
| REQ-EVD-007 | SQDS evidence validation shall detect deletion, duplication, reordering, rollback, and cross-session substitution within the protected record scope. | CH3 §3.14.2; SEC-OBL-021 | Audit owner | Protect evidentiary sequence | TE/Audit: each injected manipulation is detected and correlated to the affected transaction | Provisional — TBD-019 |
| REQ-EVD-008 | SQDS shall prevent a security-relevant transition when required evidence continuity cannot be established. | ED-009; CH3 §3.14.2 | Component owners + audit owner | Prevent evidence gaps from becoming approval | TE/Integrated: continuity-failure injection produces no affected permissive state transition | Ready |
| REQ-EVD-009 | Each controlled run or transaction shall record its exact non-secret outcome label and reason code. | OPS-OBL-025; OPS-OBL-028 | Evidence/schema owner | Distinguish failure classes without exposing secrets | IN+TE/Schema: every terminal path has one controlled outcome and reason; unqualified success is rejected | Ready |

---

## 4.11 Model, parameter, measurement, and reproducibility requirements

| ID | Proposed requirement | Parent trace | Allocation | Rationale | Verification and acceptance | Maturity/open issue |
|---|---|---|---|---|---|---|
| REQ-MOD-001 | The reference finite-key implementation shall be independently reproduced against the equations, conventions, and stated conditions of Sidhu et al. 2022 before a result is marked validated. | ED-007; SEC-OBL-027 | QKD model owner + independent reviewer | Avoid unchecked transcription or convention error | AN+IR/Model: independent test vectors and boundary cases agree within a frozen numerical tolerance; differences are resolved or the result remains unvalidated | Provisional — TBD-005; TBD-015 |
| REQ-MOD-002 | Every simulation run shall reference one frozen parameter-register version before execution. | OPS-OBL-026; OPS-OBL-027 | Model/configuration owner | Prevent moving inputs | IN+TE/Model: missing, mutable, or unknown parameter-register references prevent controlled execution | Provisional — TBD-003; TBD-004; TBD-005; TBD-006 |
| REQ-MOD-003 | Each numeric model input shall record value or range, unit, uncertainty representation, source, source locator, applicability rationale, and sensitivity treatment. | OPS-OBL-027 | Model owner + parameter owner | Make inputs auditable without guessed applicability | IN/Parameter register: completeness is 100% for used numeric inputs; missing fields block result validation | Provisional — TBD-003; TBD-004; TBD-005; TBD-006 |
| REQ-MOD-004 | Every simulation run shall record code, dependency, input-data, parameter-register, configuration, and random-seed versions. | OPS-OBL-026 | Model/configuration owner | Support reproducibility | IN/Run record: every required version is present and resolves to retained artifacts | Ready |
| REQ-MOD-005 | Every simulation or test run shall preserve the individual result of each applicable authentication, profile, finite-key, device, policy, and state gate. | OPS-OBL-028 | Model + evidence owners | Prevent a final rate from hiding failed gates | IN+TE/Run record: each configured gate has pass/fail/unknown/not-applicable state and evidence reference | Ready |
| REQ-MOD-006 | Every controlled result shall identify its exact OUT-1, OUT-2, OUT-3, and OUT-4 states. | OPS-OBL-024; OPS-OBL-025 | Model + evidence owners | Keep completion semantics explicit | IN/Result schema: four fields are populated with controlled enumerations for every run | Ready |
| REQ-MOD-007 | Every reported rate, fraction, or latency shall identify its MET identifier, numerator, denominator or reference event, unit, and analysis interval. | OPS-OBL-025 | Model owner | Prevent misleading comparison | IN/Report schema: every metric contains all listed fields and uses the Chapter 3 definition | Provisional — TBD-013 |
| REQ-MOD-008 | The August logical fault suite shall include authentication failure, stale input, conflicting input, finite-key/profile rejection, invalid or unknown device state, partial/unknown EKM commit, wrong consumer, one-sided delivery acknowledgement, and AQMO loss. | A-008; SEC-OBL-001; SEC-OBL-003; SEC-OBL-004; SEC-OBL-009; SEC-OBL-011; SEC-OBL-013; SEC-OBL-014; OPS-OBL-022; OPS-OBL-029; OPS-OBL-030 | V&V lead | Exercise the principal fail-closed claims | TE/Model/integrated: every listed case is executed and reaches its specified non-permissive state with no unintended key release | Provisional — TBD-005; TBD-006; TBD-009; TBD-010; TBD-011; TBD-012; TBD-015 |
| REQ-MOD-009 | A controlled simulation rerun using the same retained environment and run record shall reproduce the recorded discrete outcomes exactly and numeric outputs within the frozen numerical tolerance. | ED-007; ED-014; OPS-OBL-026 | Model owner + independent reviewer | Make the model independently repeatable | DE+AN/Model: rerun meets both discrete and numeric criteria; tolerance and environment are recorded | Provisional — TBD-005; TBD-015 |
| REQ-MOD-010 | No quantitative model result shall be accepted against a mission threshold until the threshold, unit, derivation rationale, authority, and applicable analysis case are recorded. | ED-014; TBD-002; TBD-013 | Mission/data owner + V&V lead | Prevent invented pass/fail numbers | IN/Review: absent any listed threshold field, the result is labeled descriptive/sensitivity-only rather than accepted | Provisional — TBD-002; TBD-013 |

---

## 4.12 Source-control and public-release requirements

| ID | Proposed requirement | Parent trace | Allocation | Rationale | Verification and acceptance | Maturity/open issue |
|---|---|---|---|---|---|---|
| REQ-REL-001 | The project shall review each cited source for current publication status, corrigenda, planning notes, errata, and applicability at every controlled baseline. | SEC-OBL-026 | Research/configuration owner | Prevent silent source obsolescence | IN/Source register: every used source has a review date, status, applicability note, and disposition of known corrections | Ready |
| REQ-REL-002 | The project shall block public release of a handbook extract, model result, diagram, threat detail, dataset, or website artifact until PR-GATE-01 has a positive recorded disposition for that artifact version. | POL-10; SEC-OBL-028; OPS-OBL-032 | Information owner + release reviewers | Separate engineering work from release authority | TE/Workflow: an absent, negative, stale-version, or incomplete gate record prevents publication | Provisional — TBD-020 |
| REQ-REL-003 | A public artifact shall contain no unsupported named customer, sponsor, military adoption, certification, approval, or authority claim. | ED-015; PR-GATE-01 | Information owner | Prevent false attribution | IN/Release review: every such claim has explicit authority evidence or is absent | Provisional — TBD-001; TBD-020 |
| REQ-REL-004 | A public artifact shall contain no unapproved sensitive site, orbit, schedule, vulnerability, exploit path, device weakness, credential, or security-configuration detail. | PR-GATE-01 | Information owner + legal/security reviewers | Prevent harmful disclosure | IN/Release review: sensitivity checklist is complete and each included detail has a positive disposition | Provisional — TBD-014; TBD-020 |
| REQ-REL-005 | Every public technical claim shall resolve to a controlled `CE-*` entry and preserve its applicability limit. | PR-GATE-01; SC-D01 | Research owner | Preserve evidence without overgeneralization | IN/Claim map: 100% of public technical claims resolve to one or more current claim records and show their limits where material | Ready |
| REQ-REL-006 | Every public model result shall display its profile, analysis case, parameter-register version, source/applicability basis, uncertainty or sensitivity treatment, exact outcome/metric definition, and material limitations. | PR-GATE-01; OPS-OBL-025; OPS-OBL-026; OPS-OBL-027; OPS-OBL-028 | Model owner + information owner | Keep modeled feasibility from becoming a system claim | IN/Release review: all listed fields appear with the result or publication is blocked | Provisional — TBD-003; TBD-004; TBD-005; TBD-006; TBD-013; TBD-020 |
| REQ-REL-007 | Every public security description shall state that QKD is a partial key-establishment layer and does not by itself prove endpoint security, implementation security, availability, denial-of-service resistance, or operational approval. | POL-07; PR-GATE-01 | Security + information owners | Prevent absolute security framing | IN/Release review: the required boundary statement is present and no contradictory absolute claim remains | Ready |
| REQ-REL-008 | Every public release shall record the artifact identity/version, information owner, required legal/security reviewers, decision, date, conditions, and evidence references. | PR-GATE-01; SEC-OBL-028 | Release authority/workflow owner | Make release authorization auditable | IN/Release record: every field is present and signatures/approvals resolve to authorized roles | Provisional — TBD-020 |

---

## 4.13 Candidate-obligation disposition and coverage

Every Chapter 2 and Chapter 3 candidate obligation is dispositioned below. Multiple source obligations may map to one normalized requirement when they state the same behavior. One source obligation may map to several requirements when its verification changes across independent behaviors.

### 4.13.1 Security-obligation coverage

| Source obligation | Chapter 4 requirement coverage | Disposition |
|---|---|---|
| SEC-OBL-001 | REQ-QKD-004 | Adopted |
| SEC-OBL-002 | REQ-QKD-005; REQ-QKD-006; REQ-QKD-007; REQ-QKD-008 | Split into independently tested integrity, session-binding, freshness, and replay requirements |
| SEC-OBL-003 | REQ-QKD-009, REQ-QKD-011, REQ-QKD-012 | Split across gate, unknown-state, and leakage behavior |
| SEC-OBL-004 | REQ-QKD-010, REQ-QKD-011 | Split across negative and unknown device state |
| SEC-OBL-005 | REQ-AQM-001, REQ-AQM-002 | Split across receipt and derivation paths |
| SEC-OBL-006 | REQ-AQM-005 | Adopted |
| SEC-OBL-007 | REQ-AQM-004 | Adopted; duplicate OPS-OBL-003 merged |
| SEC-OBL-008 | REQ-DAT-001 | Adopted as one input-record completeness requirement |
| SEC-OBL-009 | REQ-DAT-003; REQ-DAT-004; REQ-DAT-005; REQ-DAT-006 | Split across detection, disposition, controlled rule, and independent validation |
| SEC-OBL-010 | REQ-SRV-004, REQ-KM-002, REQ-KM-004 | Split across endpoint mapping, binding completeness, and intake validation |
| SEC-OBL-011 | REQ-SRV-009, REQ-KM-005, REQ-KM-006, REQ-KM-009 | Split across mission result and EKM state guards |
| SEC-OBL-012 | REQ-KM-010; REQ-KM-011; REQ-KM-012 | Split across idempotent state, side-effect, and mutation behavior |
| SEC-OBL-013 | REQ-KM-007; REQ-KM-008; REQ-KM-009 | Split across unknown detection, quarantine, and no exposure |
| SEC-OBL-014 | REQ-SRV-011, REQ-KM-018; REQ-KM-019; REQ-KM-020 | Split across identity, authorization, acknowledgement, and result state |
| SEC-OBL-015 | REQ-KM-017, REQ-KM-020; REQ-KM-021; REQ-KM-022, REQ-KM-025 | Split across reservation, delivery, terminal-state reuse, and destruction |
| SEC-OBL-016 | REQ-QKD-014, REQ-QKD-015 | Split into source and detector evidence |
| SEC-OBL-017 | REQ-QKD-010, REQ-QKD-016, REQ-QKD-017 | Split across acceptance, entropy, and calibration evidence |
| SEC-OBL-018 | REQ-CYB-001, REQ-CYB-002 | Split into authentication and authorization |
| SEC-OBL-019 | REQ-CYB-003; REQ-CYB-004; REQ-CYB-005, REQ-CYB-007 | Split across baseline check, activation, rollback, and artifact provenance |
| SEC-OBL-020 | REQ-KM-001, REQ-CYB-006 | Split across local value path and wider privilege/flow separation |
| SEC-OBL-021 | REQ-EVD-003; REQ-EVD-004; REQ-EVD-005; REQ-EVD-006; REQ-EVD-007 | Split across event coverage, content, continuity, and manipulation detection |
| SEC-OBL-022 | REQ-CYB-008 | Adopted |
| SEC-OBL-023 | REQ-AQM-008, REQ-CYB-009 | Split across prohibited AQMO reactivation and recovery gate |
| SEC-OBL-024 | REQ-CYB-010, REQ-CYB-011 | Split across no automatic downgrade and separately approved fallback |
| SEC-OBL-025 | REQ-SRV-006, REQ-SRV-007 | Adopted as topology scope controls |
| SEC-OBL-026 | REQ-REL-001 | Adopted |
| SEC-OBL-027 | REQ-QKD-013, REQ-MOD-001 | Split across proof/device mapping and independent numerical reproduction |
| SEC-OBL-028 | REQ-REL-002, REQ-REL-008 | Split across release blocking and release record |

### 4.13.2 Operational-obligation coverage

| Source obligation | Chapter 4 requirement coverage | Disposition |
|---|---|---|
| OPS-OBL-001 | REQ-EVD-001 | Adopted as one correlation-domain requirement |
| OPS-OBL-002 | REQ-EVD-002 | Adopted as one request-admission gate |
| OPS-OBL-003 | REQ-AQM-004 | Adopted; duplicate SEC-OBL-007 merged |
| OPS-OBL-004 | REQ-QKD-001, REQ-QKD-002, REQ-AQM-009 | Split across profile identity, frozen context, and command binding |
| OPS-OBL-005 | REQ-QKD-003 | Adopted |
| OPS-OBL-006 | REQ-QKD-004; REQ-QKD-005; REQ-QKD-006; REQ-QKD-007; REQ-QKD-008 | Split across peer identity, message integrity, session binding, freshness, and replay validation |
| OPS-OBL-007 | REQ-QKD-009, REQ-QKD-011 | Split across failed and unknown profile gates |
| OPS-OBL-008 | REQ-QKD-010, REQ-QKD-011 | Split across failed and unknown device gates |
| OPS-OBL-009 | REQ-AQM-001, REQ-AQM-002 | Split across receipt and derivation |
| OPS-OBL-010 | REQ-AQM-005 | Adopted |
| OPS-OBL-011 | REQ-KM-001 | Adopted |
| OPS-OBL-012 | REQ-KM-002, REQ-KM-004 | Split across binding record and intake validation |
| OPS-OBL-013 | REQ-KM-003 | Adopted |
| OPS-OBL-014 | REQ-SRV-009, REQ-KM-005, REQ-KM-006, REQ-KM-009 | Split across result and commit-state guards |
| OPS-OBL-015 | REQ-KM-007, REQ-KM-008, REQ-KM-014 | Split across unknown, quarantine, and timeout behavior |
| OPS-OBL-016 | REQ-KM-010, REQ-KM-011 | Split across state response and side effects |
| OPS-OBL-017 | REQ-KM-012 | Adopted |
| OPS-OBL-018 | REQ-KM-009, REQ-KM-014, REQ-KM-015 | Split across no exposure, timeout, and restart recovery |
| OPS-OBL-019 | REQ-KM-016 | Adopted |
| OPS-OBL-020 | REQ-KM-017 | Adopted |
| OPS-OBL-021 | REQ-KM-018, REQ-KM-019 | Split into consumer authentication and authorization |
| OPS-OBL-022 | REQ-SRV-011, REQ-KM-020 | Split across service outcome and EKM state |
| OPS-OBL-023 | REQ-KM-015, REQ-KM-021 | Split across recovery and no reallocation |
| OPS-OBL-024 | REQ-SRV-008, REQ-SRV-010, REQ-KM-023, REQ-MOD-006 | Split across schema, transaction, immutable result, and run record |
| OPS-OBL-025 | REQ-SRV-008, REQ-EVD-009, REQ-MOD-006, REQ-MOD-007 | Split across outcome schema, terminal label, exact states, and metric denominator |
| OPS-OBL-026 | REQ-MOD-004, REQ-MOD-009 | Split across capture and reproducibility |
| OPS-OBL-027 | REQ-MOD-002, REQ-MOD-003 | Split across frozen register and parameter completeness |
| OPS-OBL-028 | REQ-EVD-005, REQ-EVD-009, REQ-MOD-005 | Split across transition evidence, terminal outcome, and gate preservation |
| OPS-OBL-029 | REQ-DAT-002; REQ-DAT-003; REQ-DAT-004; REQ-DAT-005; REQ-DAT-006 | Split across freshness, conflict, resolution, and independent validation |
| OPS-OBL-030 | REQ-AQM-010, REQ-AQM-011 | Split across stop behavior and bounded local completion |
| OPS-OBL-031 | REQ-EVD-003; REQ-EVD-004; REQ-EVD-005; REQ-EVD-006; REQ-EVD-007; REQ-EVD-008 | Split across audit content, continuity, and failure response |
| OPS-OBL-032 | REQ-REL-002, REQ-REL-008 | Split across release blocking and record |

---

## 4.14 P1 threat-driver allocation

| P1 threat | Principal proposed requirements | Allocation intent |
|---|---|---|
| QO-T01 | REQ-QKD-005; REQ-QKD-006; REQ-QKD-007; REQ-QKD-008; REQ-QKD-009, REQ-QKD-011; REQ-QKD-012; REQ-QKD-013 | Preserve proof/profile bounds and transcript treatment |
| QO-T02 | REQ-QKD-001, REQ-QKD-009, REQ-QKD-012; REQ-QKD-013; REQ-QKD-014 | Bind source/decoy assumptions to evidence and acceptance |
| QO-T03 | REQ-QKD-010, REQ-QKD-011, REQ-QKD-013, REQ-QKD-015 | Reject detector-model mismatch and require characterization |
| QO-T06 | REQ-QKD-010, REQ-QKD-011, REQ-QKD-017 | Fail closed on calibration/device-health failure or uncertainty |
| CP-T01 | REQ-QKD-004; REQ-QKD-005; REQ-QKD-006; REQ-QKD-007; REQ-QKD-008; REQ-CYB-001 | Authenticate the peer and protect/session-bind the transcript |
| CP-T03 | REQ-QKD-009, REQ-QKD-012, REQ-QKD-013; REQ-CYB-003; REQ-CYB-004; REQ-CYB-005; REQ-MOD-001 | Protect post-processing logic, configuration, and reproduction |
| KM-T01 | REQ-KM-001; REQ-KM-002; REQ-KM-003; REQ-KM-004; REQ-KM-005; REQ-KM-006; REQ-KM-007; REQ-KM-008; REQ-KM-009; REQ-KM-010; REQ-KM-011; REQ-KM-012; REQ-KM-013; REQ-KM-014; REQ-KM-015; REQ-KM-016; REQ-KM-017; REQ-KM-018; REQ-KM-019; REQ-KM-020; REQ-KM-021; REQ-KM-022; REQ-KM-023; REQ-KM-024; REQ-KM-025; REQ-CYB-006; REQ-EVD-003; REQ-EVD-004; REQ-EVD-005; REQ-EVD-006; REQ-EVD-007; REQ-EVD-008 | Constrain custody, state, privilege, recovery, and evidence |
| KM-T02 | REQ-SRV-004; REQ-KM-002, REQ-KM-004, REQ-KM-016; REQ-KM-017; REQ-KM-018; REQ-KM-019; REQ-KM-020; REQ-KM-021 | Prevent wrong endpoint, key, purpose, policy, or consumer binding |
| CY-T01 | REQ-CYB-001; REQ-CYB-002; REQ-CYB-003; REQ-CYB-004; REQ-CYB-005; REQ-CYB-006; REQ-CYB-007; REQ-CYB-008; REQ-CYB-009; REQ-EVD-003; REQ-EVD-004; REQ-EVD-005; REQ-EVD-006; REQ-EVD-007; REQ-EVD-008 | Authenticate, segment, control configuration, contain, and recover |
| AQ-T01 | REQ-AQM-003, REQ-AQM-004, REQ-AQM-009; REQ-DAT-001; REQ-DAT-002; REQ-DAT-003; REQ-DAT-004; REQ-DAT-005; REQ-DAT-006 | Validate inputs and prevent unsafe ranking/execution |
| AV-T01 | REQ-QKD-011; REQ-AQM-004; REQ-CYB-010; REQ-CYB-011; REQ-EVD-009 | Abort safely and report availability without security downgrade |

Allocation does not mean the threat is mitigated or risk is accepted. Effectiveness remains unverified until implementation, test, and authority disposition exist.

---

## 4.15 Open-issue impact on the requirements baseline

| Open issue | Chapter 4 impact | Required disposition before final acceptance |
|---|---|---|
| TBD-001 | Named mission/customer and authority roles remain generic; affects request authority and public claims | Written stakeholder and authority map |
| TBD-002 | Mission demand, latency, availability, consequence, and data lifetime do not have numeric acceptance values | Mission-needs statement with units and criteria |
| TBD-003 | Orbit, site, ephemeris, and analysis interval are not frozen | Versioned reproducible orbit/site case |
| TBD-004 | Optical/link/environment parameters and uncertainty are not frozen | Source-backed link-budget model and parameter record |
| TBD-005 | Protocol equations, budgets, block rules, leakage, and thresholds are not frozen | Independently reproduced protocol dossier |
| TBD-006 | Source, detector, entropy, calibration, and side-channel device model is not frozen | Characterization and proof-to-device map |
| TBD-007 | Authentication construction and trust-anchor lifecycle are not selected | Approved cryptographic architecture and negative tests |
| TBD-008 | Physical cryptographic boundaries, EKM/HSM placement, ownership, and protected paths are not selected | Boundary and data-entry/exit trade decision |
| TBD-009 | Implementable EKM pair-state, timeout, retry, reconciliation, persistence, and destruction protocol is not frozen | State/interface specification and partial-failure tests |
| TBD-010 | Consumer API, key-use mode, acknowledgement, use, expiry, and destruction semantics are not frozen | Interface/lifecycle specification and tests |
| TBD-011 | AQMO objective, schemas, timing, delegation, human gates, and autonomy are not frozen | Control contract and constraint/replay tests |
| TBD-012 | Authoritative data sources, redundancy, freshness, validation, and conflict rules are not frozen | Data-source contract and fault-injection evidence |
| TBD-013 | Mission-derived quantitative thresholds are absent | Controlled threshold register with rationale and authority |
| TBD-014 | Jurisdiction-specific legal, export, information-handling, cryptographic, laser-safety, spectrum, and space rules are unknown | Applicable compliance matrix |
| TBD-015 | Independent V&V scope, reviewer competence, facilities, and evidence are not approved | Independent verification plan and reviewer assignment |
| TBD-016 | Relay and remote-consumer architecture is explicitly outside V0.2 | Separate future topology/trust decision before scope change |
| TBD-017 | Quantitative likelihood, control effectiveness, risk rating, and acceptance are unavailable | Deployment-specific risk assessment and authority decision; no Chapter 4 requirement closes this |
| TBD-018 | No alternate non-QKD fallback service is approved | Separate fallback specification, labeling, authority, and scenario test |
| TBD-019 | Audit schema, authoritative time, retention, privacy, custody, and incident process are not frozen | Audit/incident specification and integrity/replay tests |
| TBD-020 | Public-release workflow and named authority are not established | Signed PR-GATE-01 workflow and artifact disposition |

No `Provisional` requirement becomes fully verifiable merely by deleting its `TBD-*` reference. The registered closure evidence must be reviewed and linked.

---

## 4.16 Minimum verification scenario set

| Scenario ID | Scenario | Principal requirements | Passing observation |
|---|---|---|---|
| VSC-01 | Nominal paired replenishment | REQ-SRV-009; REQ-KM-004; REQ-KM-005; REQ-KM-006 | Matching pair reaches Committed/Available at both EKMs and OUT-3 alone becomes positive |
| VSC-02 | Nominal local consumer delivery | REQ-SRV-010; REQ-SRV-011; REQ-KM-016; REQ-KM-017; REQ-KM-018; REQ-KM-019; REQ-KM-020 | Separate delivery transaction reaches two-sided delivered state and OUT-4 becomes positive |
| VSC-03 | Peer authentication failure | REQ-QKD-004; REQ-EVD-003; REQ-EVD-009 | No accepted output; exact authentication-failed evidence is recorded |
| VSC-04 | Classical-message mutation/replay | REQ-QKD-005; REQ-QKD-006; REQ-QKD-007; REQ-QKD-008 | Altered, stale, replayed, or cross-session message cannot contribute to accepted output |
| VSC-05 | Finite-key/profile rejection | REQ-QKD-009, REQ-QKD-011, REQ-QKD-012 | No accepted output and individual failed gate is preserved |
| VSC-06 | Device gate negative or unknown | REQ-QKD-010, REQ-QKD-011 | No accepted output; device-gate-failed or unknown result is recorded |
| VSC-07 | Stale decision-critical input | REQ-DAT-001; REQ-DAT-002; REQ-DAT-006 | Opportunity is held/rejected and no affected execution command is issued |
| VSC-08 | Conflicting authenticated inputs | REQ-DAT-003; REQ-DAT-004; REQ-DAT-005; REQ-DAT-006 | Conflict is recorded; no affected execution occurs without a valid predeclared rule |
| VSC-09 | Partial or unknown EKM commit | REQ-KM-005; REQ-KM-006; REQ-KM-007; REQ-KM-008; REQ-KM-009; REQ-KM-014; REQ-KM-015 | OUT-3 is not positive and the affected pair is unavailable/quarantined |
| VSC-10 | Duplicate and mutated idempotent operations | REQ-KM-010; REQ-KM-011; REQ-KM-012; REQ-KM-013 | Identical retry creates no side effect; changed binding is rejected |
| VSC-11 | Wrong consumer/purpose/policy | REQ-KM-018; REQ-KM-019 | No protected transfer and OUT-4 is not positive |
| VSC-12 | One-sided delivery acknowledgement | REQ-KM-020; REQ-KM-021; REQ-KM-023 | OUT-4 is not positive, pair is not reallocated, and OUT-3 remains unchanged |
| VSC-13 | AQMO loss or compromise suspicion | REQ-AQM-005, REQ-AQM-010, REQ-AQM-011 | No new coordination; only a preauthorized locally positive transaction may complete |
| VSC-14 | Unauthorized command and baseline rollback | REQ-CYB-001; REQ-CYB-002; REQ-CYB-003; REQ-CYB-004; REQ-CYB-005 | Command/activation is denied and a security-relevant event is recorded |
| VSC-15 | Trust-domain incident and recovery | REQ-CYB-008; REQ-CYB-009 | New release is blocked until all four recovery conditions are positively recorded |
| VSC-16 | Audit-chain manipulation | REQ-EVD-003; REQ-EVD-004; REQ-EVD-005; REQ-EVD-006; REQ-EVD-007; REQ-EVD-008 | Each deletion, duplication, reordering, rollback, and substitution case is detected and blocks the affected transition |
| VSC-17 | Reproducible reference simulation | REQ-MOD-001; REQ-MOD-002; REQ-MOD-003; REQ-MOD-004; REQ-MOD-005; REQ-MOD-006; REQ-MOD-007; REQ-MOD-008; REQ-MOD-009 | Independent rerun meets discrete and frozen numeric agreement criteria with complete provenance |
| VSC-18 | Attempted unapproved publication | REQ-REL-002; REQ-REL-003; REQ-REL-004; REQ-REL-005; REQ-REL-006; REQ-REL-007; REQ-REL-008 | Publication is blocked unless all applicable content and authority checks pass for the exact version |

The scenario set defines minimum coverage, not the complete verification program.

---

## 4.17 Requirements change control

| ID | Proposed requirement | Parent trace | Allocation | Rationale | Verification and acceptance | Maturity/open issue |
|---|---|---|---|---|---|---|
| REQ-CM-001 | The configuration-control process shall retain a stable requirement ID when the obligation remains semantically unchanged. | ED-016 | Configuration manager | Preserve trace history | IN/Change record: editorial revisions retain the ID and link every changed version | Ready |
| REQ-CM-002 | The configuration-control process shall assign a new controlled version or ID to a materially changed obligation. | ED-016 | Configuration manager | Prevent semantic change hidden under one identifier | IN/Change record: each sampled material change has a new version/ID and impact rationale | Ready |
| REQ-CM-003 | The configuration-control process shall retain each deleted or rejected requirement in history with its disposition rationale and authority. | ED-016 | Configuration manager | Preserve negative decisions | IN/History: every retired requirement remains resolvable with both disposition fields | Ready |
| REQ-CM-004 | The configuration-control process shall prohibit reuse of a retired requirement identifier. | ED-016 | Configuration manager | Preserve identity integrity | IN/History: no retired ID identifies a later obligation | Ready |
| REQ-CM-005 | A change to any of ED-003, ED-004, ED-005, ED-006, ED-007, ED-008, or ED-013 shall trigger recorded impact review across Chapters 1–4, threats, state models, simulation, verification cases, and public claims. | ED-003; ED-004; ED-005; ED-006; ED-007; ED-008; ED-013 | Configuration manager + affected owners | Control architecture-driving change | IN/Change package: every listed artifact class has an impact entry and owner disposition | Ready |
| REQ-CM-006 | A protocol-family change shall trigger a new proof, device, metric, and applicability review rather than a parameter-only disposition. | ED-006; ED-007 | QKD lead + independent V&V | Prevent invalid cross-family inheritance | IN+IR/Change package: all four reviews exist before the new family can produce a validated result | Provisional — TBD-005; TBD-006; TBD-015 |
| REQ-CM-007 | A change introducing a relay or remote consumer shall trigger TBD-016 and a separate trust/topology change record. | ED-003; ED-004; TBD-016 | System + security architects | Force explicit topology review | IN/Change package: TBD-016 and the separate change record exist before architecture approval | Scope control — TBD-016 |
| REQ-CM-008 | A relay or remote-consumer change shall not inherit the V0.2 direct-link security claim before separate trust/topology and authority approval. | ED-003; ED-004; TBD-016 | System + security architects | Prevent topology claim carryover | IN/Change package: the new claim boundary is independent and no inherited approval/security label exists | Scope control — TBD-016 |
| REQ-CM-009 | A `TBD-*` closure change shall include the registered closure evidence and the complete affected-requirement list. | QO-EDH-REG-001 §8 | Open-issue owner + configuration manager | Prevent administrative closure without evidence | IN/Closure package: both items exist and resolve; otherwise the TBD remains open | Ready |
| REQ-CM-010 | A requirement whose acceptance method includes unexecuted analysis, test, demonstration, or independent review shall remain not verified. | §4.3.3 | V&V lead | Prevent inspection-only overclaim | IN/Verification record: status cannot be Verified while any assigned non-inspection evidence is absent | Ready |

---

## 4.18 Baseline summary

| Item | Count/status |
|---|---|
| Proposed atomic requirements | 119 |
| Ready requirements | 31 |
| Provisional requirements | 84 |
| Scope-control requirements | 4 |
| Source security obligations dispositioned | 28/28 |
| Source operational obligations dispositioned | 32/32 |
| P1 threat drivers allocated | 11/11 |
| Open issues retained | 20/20 |
| Minimum verification scenarios | 18 |
| Requirements marked operationally verified | 0 |
| External/customer/cryptographic/risk approval claimed | None |

The absence of verified requirements is expected at this preliminary stage. This chapter defines what must be demonstrated; it does not manufacture the demonstration evidence.

---

## 4.19 Review Gate CH4-G1-V0.2

Chapter 4 is ready for Q-Orbit team baseline approval when the team explicitly accepts:

1. the working disposition of ED-003, ED-004, ED-005, ED-006, ED-007, ED-008, ED-013, and ED-016;
2. the direct-link topology and exclusion of relay/remote-consumer claims;
3. OUT-3 replenishment as the primary mission completion point and OUT-4 as a separate delivery outcome;
4. the proposed requirement statements, allocations, rationales, acceptance evidence, and maturity designations;
5. the complete disposition of all 60 Chapter 2/3 candidate obligations;
6. the allocation of all eleven P1 threat drivers;
7. the rule that every `Provisional` item remains blocked by its registered closure evidence;
8. the minimum eighteen-scenario verification set;
9. the requirements change-control rules; and
10. the statement that no requirement is yet operationally verified or externally approved.

After CH4-G1 approval, `Ready` rows become active preliminary project requirements. `Provisional` rows become active requirement intents whose final acceptance configuration remains blocked by the cited `TBD-*`. Scope controls remain binding unless a configuration-controlled architecture change is approved.

CH4-G1 approval does not authorize procurement, fabrication, fielding, flight, use of cryptographic material, public release, certification, operational risk acceptance, or a claim that QKD or SQDS is secure.
