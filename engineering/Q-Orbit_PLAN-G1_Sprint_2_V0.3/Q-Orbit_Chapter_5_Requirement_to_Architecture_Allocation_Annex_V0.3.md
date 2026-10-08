# Q-Orbit Chapter 5 — Requirement-to-Architecture Allocation Annex V0.3

| Document field | Value |
|---|---|
| Document ID | QO-EDH-CH05-ANN-A |
| Version | Sprint 2 Reviewed Allocation V0.3 |
| Date | 16 August 2026 |
| Parent decision | PLAN-G1 approved 12 August 2026 |
| Source requirements | QO-EDH-CH04, corrected V0.2 |
| Source SHA-256 | `48973678b595ac5d316594af897dd3f955f46fc0a4d83fc153fc7d229a29926e` |
| Architecture source | QO-EDH-CH05 Working Draft V0.3 |
| Allocation coverage | 119/119 proposed requirement IDs |
| Review record | Exact-ID and exact-obligation comparison completed 16 August 2026 |
| Verification state | 0 requirements operationally verified |
| Gate target | ARCH-G1 |
| Release state | Private; public release requires PR-GATE-01 |

> **Interpretation boundary.** Allocation identifies where each proposed Chapter 4 obligation is realized, constrained, or evidenced in the preliminary logical architecture. It is not implementation, test evidence, product selection, physical-boundary proof, certification, or operational approval. The exact source obligation is reproduced below to prevent a summary from silently changing its meaning.

---

## 1. Allocation method

- `ARC-*` identifies the primary logical element or cross-cutting architecture responsibility.
- `VIEW-*`, `TZ-*`, and `IF-*` identify the controlled view, trust zone, or interface where the obligation must be visible.
- “All” means the requirement is deliberately cross-cutting; it does not erase the named owner in Chapter 4.
- Multiple allocations are cumulative unless the full Chapter 5 draft records a reviewed decomposition.
- Every statement below is extracted from the corrected Chapter 4 source identified by the hash above.
- Any semantic change to a source requirement invalidates the affected row and triggers the Chapter 4 change-control process.

---

## 2. ID-by-ID allocation matrix

| Requirement ID | Exact Chapter 4 obligation | Primary architecture element(s) | Architecture view / interface realization |
|---|---|---|---|
| REQ-SRV-001 | The V0.2 SQDS reference configuration shall implement one key-replenishment service between QKD-A and QKD-B within the session and configuration boundaries defined by REQ-QKD-002. | ARC-QA; ARC-QB; ARC-EA; ARC-EB | VIEW-5A; VIEW-5B; IF-Q01; IF-Q02; IF-K01; IF-K02; IF-K03 |
| REQ-SRV-002 | The SQDS QKD path shall not transport mission plaintext. | ARC-QA; ARC-QB | VIEW-5B; VIEW-5E; IF-Q01; IF-Q02 |
| REQ-SRV-003 | The V0.2 reference configuration shall connect QKD-A and QKD-B through one direct quantum path and one authenticated classical protocol path. | ARC-QA; ARC-QB; ARC-CT | VIEW-5B; VIEW-5C; IF-Q01; IF-Q02 |
| REQ-SRV-004 | The SQDS shall associate accepted output from QKD-A only with EKM-A and accepted output from QKD-B only with EKM-B. | ARC-QA; ARC-QB; ARC-EA; ARC-EB | VIEW-5B; VIEW-5E; IF-K01; IF-K02 |
| REQ-SRV-005 | The V0.2 reference configuration shall associate one local representative consumer with each endpoint domain. | ARC-EA; ARC-EB; ARC-CA; ARC-CB | VIEW-5A; VIEW-5C; IF-C01; IF-C02 |
| REQ-SRV-006 | The V0.2 reference configuration shall exclude any trusted relay from the accepted topology. | ARC-CT; ARC-RL | VIEW-5A; VIEW-5C; IF-R01 |
| REQ-SRV-007 | The SQDS shall reject any V0.2 configuration or result label that represents arbitrary remote-consumer distribution as part of the direct-link baseline. | ARC-CT; ARC-MD; ARC-RL | VIEW-5A; VIEW-5C; IF-R01 |
| REQ-SRV-008 | The SQDS result schema shall store OUT-1, OUT-2, OUT-3, and OUT-4 as separately addressable outcome fields. | ARC-EV; ARC-MD | VIEW-5B; IF-E01 |
| REQ-SRV-009 | The SQDS shall set OUT-3 positive only when EKM-A and EKM-B establish matching positive two-sided commit evidence for the same pair binding. | ARC-EA; ARC-EB; ARC-EV | VIEW-5B; IF-K03; IF-E01 |
| REQ-SRV-010 | The SQDS shall execute consumer delivery as a transaction distinct from the replenishment transaction. | ARC-EA; ARC-EB; ARC-CA; ARC-CB | VIEW-5B; IF-C01; IF-C02 |
| REQ-SRV-011 | The SQDS shall set OUT-4 positive only after both authorized local consumers acknowledge the corresponding pair binding and both EKMs confirm the same delivered state. | ARC-EA; ARC-EB; ARC-CA; ARC-CB; ARC-EV | VIEW-5B; IF-C01; IF-C02; IF-E01 |
| REQ-QKD-001 | The reference analysis shall identify the exact downlink prepare-and-measure efficient-BB84 WCP profile, one signal intensity, two decoy intensities, and finite single-pass method by controlled configuration ID. | ARC-QA; ARC-QB; ARC-MD; ARC-CT | VIEW-5B; IF-Q01; IF-Q02; IF-E01 |
| REQ-QKD-002 | The SQDS shall freeze the protocol, device, endpoint-pair, and policy references before acquisition begins. | ARC-QA; ARC-QB; ARC-CT; ARC-EV | VIEW-5B; IF-A03; IF-E01 |
| REQ-QKD-003 | The SQDS shall begin quantum exchange for the frozen session configuration only when both QKD endpoints report positive local readiness for that configuration. | ARC-QA; ARC-QB; ARC-AQ | VIEW-5B; IF-Q01; IF-Q02; IF-A03 |
| REQ-QKD-004 | Each QKD endpoint shall authenticate its peer for the active session before accepting final key output. | ARC-QA; ARC-QB; ARC-CT; ARC-EV | VIEW-5D; VIEW-5E; IF-Q02; IF-E01 |
| REQ-QKD-005 | Each QKD endpoint shall verify integrity protection for every security-relevant classical protocol message used by final-key acceptance. | ARC-QA; ARC-QB; ARC-CT; ARC-EV | VIEW-5D; VIEW-5E; IF-Q02; IF-E01 |
| REQ-QKD-006 | Each QKD endpoint shall verify the active-session binding of every security-relevant classical protocol message used by final-key acceptance. | ARC-QA; ARC-QB; ARC-CT; ARC-EV | VIEW-5D; VIEW-5E; IF-Q02; IF-E01 |
| REQ-QKD-007 | Each QKD endpoint shall verify the freshness state of every security-relevant classical protocol message used by final-key acceptance. | ARC-QA; ARC-QB; ARC-CT; ARC-EV | VIEW-5D; VIEW-5E; IF-Q02; IF-E01 |
| REQ-QKD-008 | Each QKD endpoint shall reject a replayed security-relevant classical protocol message when the frozen protocol does not explicitly permit idempotent reuse. | ARC-QA; ARC-QB; ARC-CT; ARC-EV | VIEW-5D; VIEW-5E; IF-Q02; IF-E01 |
| REQ-QKD-009 | Each QKD endpoint shall produce accepted final output only when every selected finite-key and profile gate is positive. | ARC-QA; ARC-QB; ARC-MD; ARC-EV | VIEW-5B; IF-K01; IF-K02; IF-E01 |
| REQ-QKD-010 | Each QKD endpoint shall produce no accepted final output when any required device gate is negative. | ARC-QA; ARC-QB; ARC-CT; ARC-EV | VIEW-5D; IF-K01; IF-K02; IF-E01 |
| REQ-QKD-011 | Each QKD endpoint shall produce no accepted final output when any required acceptance gate has an unknown or indeterminate state. | ARC-QA; ARC-QB; ARC-CT; ARC-EV | VIEW-5D; IF-K01; IF-K02; IF-E01 |
| REQ-QKD-012 | The finite-key calculation shall account for every disclosed transcript element classified as leakage by the frozen protocol dossier. | ARC-QA; ARC-QB; ARC-MD; ARC-EV | VIEW-5E; IF-Q02; IF-E01 |
| REQ-QKD-013 | The project shall maintain an independently reviewed mapping from each selected proof assumption to the implementing hardware, software, interface, configuration, and operating condition. | ARC-QA; ARC-QB; ARC-MD; ARC-CT; ARC-EV | VIEW-5D; VIEW-5E; IF-E01 |
| REQ-QKD-014 | The project shall maintain characterization and adversarial-evaluation evidence for every source behavior relied upon by acceptance. | ARC-QA; ARC-CT; ARC-EV | VIEW-5D; IF-E01 |
| REQ-QKD-015 | The project shall maintain characterization and adversarial-evaluation evidence for every detector behavior relied upon by acceptance. | ARC-QB; ARC-CT; ARC-EV | VIEW-5D; IF-E01 |
| REQ-QKD-016 | The project shall maintain integrity and health evidence for every entropy function relied upon by acceptance. | ARC-QA; ARC-QB; ARC-CT; ARC-EV | VIEW-5D; IF-E01 |
| REQ-QKD-017 | The project shall maintain integrity and health evidence for every calibration function relied upon by acceptance. | ARC-QA; ARC-QB; ARC-CT; ARC-EV | VIEW-5D; IF-E01 |
| REQ-KM-001 | Each QKD endpoint shall transfer accepted final output only through its protected local path to its associated EKM. | ARC-QA; ARC-QB; ARC-EA; ARC-EB | VIEW-5B; VIEW-5E; IF-K01; IF-K02 |
| REQ-KM-002 | Each accepted output record shall bind one unique key identifier to the endpoint pair, session, profile, configuration, purpose, policy, validity, and lifecycle state. | ARC-EA; ARC-EB; ARC-EV | VIEW-5B; IF-K01; IF-K02; IF-E01 |
| REQ-KM-003 | An EKM shall prevent access, allocation, delivery, or use of key material in `Prepared` state. | ARC-EA; ARC-EB; ARC-EV | VIEW-5B; IF-K01; IF-K02; IF-E01 |
| REQ-KM-004 | An EKM shall enter local `Prepared` state only after validating the accepted-output binding against the authorized transaction context. | ARC-EA; ARC-EB; ARC-EV | VIEW-5B; IF-K01; IF-K02; IF-E01 |
| REQ-KM-005 | The EKM pair shall attempt commit only after both EKMs establish compatible prepared evidence for the same pair binding. | ARC-EA; ARC-EB; ARC-EV; ARC-CT | VIEW-5B; VIEW-5D; IF-K03; IF-E01 |
| REQ-KM-006 | Each EKM shall mark a pair `Committed/Available` only after obtaining positive authenticated peer evidence for the same committed pair binding. | ARC-EA; ARC-EB; ARC-EV; ARC-CT | VIEW-5B; VIEW-5D; IF-K03; IF-E01 |
| REQ-KM-007 | An EKM shall set the affected pair state to `Unknown` when it cannot prove the required peer state after timeout, response loss, restart, partition, or conflicting evidence. | ARC-EA; ARC-EB; ARC-EV; ARC-CT | VIEW-5B; VIEW-5D; IF-K03; IF-E01 |
| REQ-KM-008 | An EKM shall place every pair in `Unknown` state into quarantine before any access, allocation, delivery, or use. | ARC-EA; ARC-EB; ARC-EV; ARC-CT | VIEW-5B; VIEW-5D; IF-K03; IF-E01 |
| REQ-KM-009 | Neither EKM shall expose an affected pair as available when either side reports prepared, unknown, absent, timed-out, or conflicting peer state. | ARC-EA; ARC-EB; ARC-EV; ARC-CT | VIEW-5B; VIEW-5D; IF-K03; IF-E01 |
| REQ-KM-010 | EKM commit and status operations shall be idempotent for repeated requests carrying the same idempotency key and identical binding data. | ARC-EA; ARC-EB; ARC-EV; ARC-CT | VIEW-5B; VIEW-5D; IF-K03; IF-E01 |
| REQ-KM-011 | Reprocessing an identical idempotent EKM request shall create zero additional key allocations and zero additional delivery operations. | ARC-EA; ARC-EB; ARC-EV; ARC-CT | VIEW-5B; VIEW-5D; IF-K03; IF-E01 |
| REQ-KM-012 | An EKM shall reject a reused idempotency key when any binding field differs from the established request. | ARC-EA; ARC-EB; ARC-EV; ARC-CT | VIEW-5B; VIEW-5D; IF-K03; IF-E01 |
| REQ-KM-013 | An EKM shall apply each lifecycle transition only when the recorded current state matches the operation's expected prior state. | ARC-EA; ARC-EB; ARC-EV; ARC-CT | VIEW-5B; VIEW-5D; IF-K03; IF-E01 |
| REQ-KM-014 | An EKM timeout shall result only in `Unknown` or an explicitly safer terminal state, never success or automatic rollback. | ARC-EA; ARC-EB; ARC-EV; ARC-CT | VIEW-5B; VIEW-5D; IF-K03; IF-E01 |
| REQ-KM-015 | EKM recovery after restart shall not expose an ambiguously committed or delivered pair before positive reconciliation. | ARC-EA; ARC-EB; ARC-EV; ARC-CT | VIEW-5B; VIEW-5D; IF-K03; IF-E01 |
| REQ-KM-016 | An EKM shall begin consumer delivery only from matching `Committed/Available` pair state. | ARC-EA; ARC-EB; ARC-CA; ARC-CB; ARC-EV | VIEW-5B; VIEW-5E; IF-C01; IF-C02; IF-K03; IF-E01 |
| REQ-KM-017 | The EKM pair shall reserve the selected pair exclusively before either local protected consumer transfer begins. | ARC-EA; ARC-EB; ARC-CA; ARC-CB; ARC-EV | VIEW-5B; VIEW-5E; IF-C01; IF-C02; IF-K03; IF-E01 |
| REQ-KM-018 | Each EKM shall authenticate the identity of its local consumer before protected transfer. | ARC-EA; ARC-EB; ARC-CA; ARC-CB; ARC-EV | VIEW-5B; VIEW-5E; IF-C01; IF-C02; IF-K03; IF-E01 |
| REQ-KM-019 | Each EKM shall authorize its authenticated local consumer against the pair purpose, policy, endpoint domain, key identifier, and lifecycle state before protected transfer. | ARC-EA; ARC-EB; ARC-CA; ARC-CB; ARC-EV | VIEW-5B; VIEW-5E; IF-C01; IF-C02; IF-K03; IF-E01 |
| REQ-KM-020 | The EKM pair shall set final delivered state only after both local consumer acknowledgements and compatible paired-EKM delivery evidence reference the same pair binding. | ARC-EA; ARC-EB; ARC-CA; ARC-CB; ARC-EV | VIEW-5B; VIEW-5E; IF-C01; IF-C02; IF-K03; IF-E01 |
| REQ-KM-021 | The EKM pair shall prevent automatic reallocation of a pair whose delivery state is pending, timed out, mismatched, or otherwise ambiguous. | ARC-EA; ARC-EB; ARC-CA; ARC-CB; ARC-EV | VIEW-5B; VIEW-5E; IF-C01; IF-C02; IF-K03; IF-E01 |
| REQ-KM-022 | An EKM shall prevent a key binding from being reused or allocated to another transaction after it enters `Reserved`, `DeliveryPending`, `Delivered/Acknowledged`, `Consumed`, `Expired/Revoked`, or `Destroyed` state. | ARC-EA; ARC-EB; ARC-CA; ARC-CB; ARC-EV | VIEW-5B; VIEW-5E; IF-C01; IF-C02; IF-K03; IF-E01 |
| REQ-KM-023 | A consumer-delivery failure shall not alter the previously recorded OUT-3 replenishment result. | ARC-EA; ARC-EB; ARC-CA; ARC-CB; ARC-EV | VIEW-5B; VIEW-5E; IF-C01; IF-C02; IF-K03; IF-E01 |
| REQ-KM-024 | EKM-to-EKM commit and status coordination shall contain no key values or data from which key values can be derived under the approved data-classification rule. | ARC-EA; ARC-EB; ARC-CT | VIEW-5D; VIEW-5E; IF-K03 |
| REQ-KM-025 | The EKM functions shall apply the approved destruction procedure to rejected, duplicate, unsafe, expired, revoked, and terminally quarantined key material. | ARC-EA; ARC-EB; ARC-CT; ARC-EV | VIEW-5D; IF-E01 |
| REQ-AQM-001 | AQMO shall have no interface capable of receiving a raw, intermediate, accepted, stored, reserved, delivered, consumed, quarantined, expired, revoked, or destroyed key value. | ARC-AQ; ARC-CT | VIEW-5F; IF-A01; IF-A02; IF-A03 |
| REQ-AQM-002 | AQMO shall not derive a key value from received data. | ARC-AQ; ARC-CT | VIEW-5F; IF-A01; IF-A02; IF-A03 |
| REQ-AQM-003 | AQMO shall accept only the request, opportunity, resource, security, inventory, and outcome metadata fields authorized by its controlled input schema. | ARC-AQ; ARC-CT | VIEW-5F; IF-A01; IF-A02 |
| REQ-AQM-004 | AQMO shall exclude every candidate with any negative or unknown hard-constraint result before ranking. | ARC-AQ; ARC-DV; ARC-EV | VIEW-5F; IF-A02; IF-E01 |
| REQ-AQM-005 | AQMO shall not override or positively reinterpret a local reject, abort, hold, quarantine, revocation, destruction, device gate, protocol gate, EKM gate, or consumer-delivery gate. | ARC-AQ; ARC-QA; ARC-QB; ARC-EA; ARC-EB; ARC-CA; ARC-CB | VIEW-5F; IF-A03; IF-E01 |
| REQ-AQM-006 | AQMO shall not approve a cryptographic protocol, security parameter, authentication construction, key lifecycle policy, or device security model. | ARC-AQ; ARC-CT; ARC-EV | VIEW-5F; IF-A03; IF-E01 |
| REQ-AQM-007 | AQMO shall not accept operational risk. | ARC-AQ; ARC-CT; ARC-EV | VIEW-5F; IF-A03; IF-E01 |
| REQ-AQM-008 | AQMO shall not reactivate a resource in incident state. | ARC-AQ; ARC-CT; ARC-EV | VIEW-5F; IF-A03; IF-E01 |
| REQ-AQM-009 | Every AQMO execution command shall reference the authorized endpoint pair, session, frozen configuration, policy, and authorized start/end time. | ARC-AQ; ARC-CT; ARC-EV | VIEW-5F; IF-A03; IF-E01 |
| REQ-AQM-010 | AQMO shall stop issuing new reservations and execution commands when it becomes unavailable or is suspected compromised. | ARC-AQ; ARC-CT; ARC-EV | VIEW-5F; IF-A03; IF-E01 |
| REQ-AQM-011 | After AQMO loss, local functions shall complete only a transaction that was explicitly preauthorized and remains within positive local gates. | ARC-QA; ARC-QB; ARC-EA; ARC-EB; ARC-CT; ARC-EV | VIEW-5F; IF-A03; IF-E01 |
| REQ-DAT-001 | Each decision-critical input record shall contain source identity, observation/reference time, receipt time, validity interval, provenance, quality state, and uncertainty or confidence representation. | ARC-DV; ARC-AQ; ARC-CT; ARC-EV | VIEW-5F; IF-A02; IF-E01 |
| REQ-DAT-002 | SQDS planning and execution functions shall prevent a decision-critical input that exceeds its configured freshness limit from driving the affected decision. | ARC-DV; ARC-AQ; ARC-CT; ARC-EV | VIEW-5F; IF-A02; IF-E01 |
| REQ-DAT-003 | SQDS planning and execution functions shall record every detected conflict between decision-critical sources before making the affected decision. | ARC-DV; ARC-AQ; ARC-EV | VIEW-5F; IF-A02; IF-E01 |
| REQ-DAT-004 | SQDS planning and execution functions shall prevent the affected decision when a decision-critical conflict has no positive disposition under a predeclared rule. | ARC-DV; ARC-AQ; ARC-CT; ARC-EV | VIEW-5F; IF-A02; IF-E01 |
| REQ-DAT-005 | SQDS planning and execution functions shall apply only a version-controlled predeclared conflict rule to resolve a decision-critical conflict automatically. | ARC-DV; ARC-AQ; ARC-CT; ARC-EV | VIEW-5F; IF-A02; IF-E01 |
| REQ-DAT-006 | SQDS planning and execution functions shall evaluate validity, freshness, plausibility, and conflict state independently of source-authentication success. | ARC-DV; ARC-AQ; ARC-CT; ARC-EV | VIEW-5F; IF-A02; IF-E01 |
| REQ-CYB-001 | SQDS shall authenticate every platform, QKD-endpoint, EKM, AQMO, consumer-interface, maintenance, and administrative command before execution. | ARC-CT; all command-receiving ARC elements | VIEW-5D; VIEW-5E; IF-Q02; IF-K03; IF-C01; IF-C02; IF-A03; IF-E01 |
| REQ-CYB-002 | SQDS shall authorize every authenticated platform, QKD-endpoint, EKM, AQMO, consumer-interface, maintenance, and administrative command against the actor role and target state before execution. | ARC-CT; all command-receiving ARC elements | VIEW-5D; VIEW-5E; IF-Q02; IF-K03; IF-C01; IF-C02; IF-A03; IF-E01 |
| REQ-CYB-003 | Before activation, each runtime function shall verify its software, firmware, model, dependency, and configuration identifiers against one approved version-controlled baseline. | ARC-CT; ARC-EV; all runtime ARC elements | VIEW-5D; IF-E01 |
| REQ-CYB-004 | A runtime function shall prevent activation when required baseline verification is negative or unknown. | ARC-CT; ARC-EV; all runtime ARC elements | VIEW-5D; IF-E01 |
| REQ-CYB-005 | SQDS configuration control shall prevent rollback to a version not explicitly authorized for the current baseline. | ARC-CT; ARC-EV; all runtime ARC elements | VIEW-5D; IF-E01 |
| REQ-CYB-006 | The SQDS architecture shall enforce separate privileges and controlled flows for QKD, platform, EKM, AQMO, external-data, consumer, maintenance, and administration functions. | ARC-CT; all ARC elements | VIEW-5D; VIEW-5E; all declared interfaces |
| REQ-CYB-007 | Each accepted hardware, software, firmware, model, dependency, update, or calibration artifact shall have recorded provenance, integrity evidence, version, acceptance result, and responsible role. | ARC-CT; ARC-EV; all baseline artifact owners | VIEW-5D; IF-E01 |
| REQ-CYB-008 | SQDS shall enter an incident state that blocks new release from an affected trust domain when compromise is suspected. | ARC-CT; ARC-EV; affected trust-zone ARC elements | VIEW-5D; IF-E01 |
| REQ-CYB-009 | SQDS shall return an affected trust domain to service only after known-good restoration, revalidation, trust re-establishment, and explicit authority are all positively recorded. | ARC-CT; ARC-EV; affected trust-zone ARC elements | VIEW-5D; IF-E01 |
| REQ-CYB-010 | SQDS shall not automatically change algorithm, key source, endpoint, trust path, relay use, or security label after a failure. | ARC-CT; ARC-AQ; ARC-EV | VIEW-5A; VIEW-5F; IF-A03; IF-E01 |
| REQ-CYB-011 | SQDS shall activate a non-QKD fallback service only under a separately approved configuration, authority, label, entry condition, and termination condition. | ARC-CT; ARC-AQ; ARC-EV | VIEW-5A; VIEW-5F; IF-A03; IF-E01 |
| REQ-CYB-012 | Maintenance and test key material shall remain segregated from mission inventory such that it cannot satisfy OUT-2, OUT-3, or OUT-4. | ARC-EA; ARC-EB; ARC-MD; ARC-EV; ARC-CT | VIEW-5D; IF-K01; IF-K02; IF-E01 |
| REQ-EVD-001 | SQDS shall assign collision-resistant correlation identifiers to every request, session, EKM pair-state transaction, and consumer-delivery transaction within the defined retention/collision domain. | ARC-EV; all transaction-owning ARC elements | VIEW-5E; all declared interfaces; IF-E01 |
| REQ-EVD-002 | SQDS shall admit a request to candidate generation only after positive validation of request identity, authority, purpose, schema, and freshness. | ARC-AQ; ARC-CT; ARC-EV | VIEW-5F; IF-A01; IF-E01 |
| REQ-EVD-003 | SQDS shall create tamper-evident non-secret audit events for authentication, authorization, configuration, profile/device gates, session transitions, EKM state, consumer delivery, AQMO decisions, aborts, incidents, recovery, maintenance, administration, and release decisions. | ARC-EV; ARC-CT; all security-relevant ARC elements | VIEW-5D; VIEW-5E; IF-E01 |
| REQ-EVD-004 | SQDS audit and operational evidence shall contain no raw, intermediate, accepted, stored, reserved, delivered, consumed, quarantined, expired, revoked, or destroyed key value. | ARC-EV; ARC-CT; all security-relevant ARC elements | VIEW-5D; VIEW-5E; IF-E01 |
| REQ-EVD-005 | Each security-relevant transition record shall contain actor identity, authority/role, correlation identifier, prior state, new state, event/reason, time reference, and applicable configuration/policy references. | ARC-EV; ARC-CT; all security-relevant ARC elements | VIEW-5D; VIEW-5E; IF-E01 |
| REQ-EVD-006 | Each security-relevant transition record shall reference the expected predecessor record or prior-state version. | ARC-EV; ARC-CT; all security-relevant ARC elements | VIEW-5D; VIEW-5E; IF-E01 |
| REQ-EVD-007 | SQDS evidence validation shall detect deletion, duplication, reordering, rollback, and cross-session substitution within the protected record scope. | ARC-EV; ARC-CT; all security-relevant ARC elements | VIEW-5D; VIEW-5E; IF-E01 |
| REQ-EVD-008 | SQDS shall prevent a security-relevant transition when required evidence continuity cannot be established. | ARC-EV; ARC-CT; all security-relevant ARC elements | VIEW-5D; VIEW-5E; IF-E01 |
| REQ-EVD-009 | Each controlled run or transaction shall record its exact non-secret outcome label and reason code. | ARC-EV; ARC-CT; all security-relevant ARC elements | VIEW-5D; VIEW-5E; IF-E01 |
| REQ-MOD-001 | The reference finite-key implementation shall be independently reproduced against the equations, conventions, and stated conditions of Sidhu et al. 2022 before a result is marked validated. | ARC-MD; ARC-EV; ARC-RL | VIEW-5A; IF-E01; IF-R01 |
| REQ-MOD-002 | Every simulation run shall reference one frozen parameter-register version before execution. | ARC-MD; ARC-EV | VIEW-5E; IF-E01 |
| REQ-MOD-003 | Each numeric model input shall record value or range, unit, uncertainty representation, source, source locator, applicability rationale, and sensitivity treatment. | ARC-MD; ARC-EV | VIEW-5E; IF-E01 |
| REQ-MOD-004 | Every simulation run shall record code, dependency, input-data, parameter-register, configuration, and random-seed versions. | ARC-MD; ARC-EV | VIEW-5E; IF-E01 |
| REQ-MOD-005 | Every simulation or test run shall preserve the individual result of each applicable authentication, profile, finite-key, device, policy, and state gate. | ARC-MD; ARC-EV | VIEW-5E; IF-E01 |
| REQ-MOD-006 | Every controlled result shall identify its exact OUT-1, OUT-2, OUT-3, and OUT-4 states. | ARC-MD; ARC-EV | VIEW-5E; IF-E01 |
| REQ-MOD-007 | Every reported rate, fraction, or latency shall identify its MET identifier, numerator, denominator or reference event, unit, and analysis interval. | ARC-MD; ARC-EV | VIEW-5E; IF-E01 |
| REQ-MOD-008 | The August logical fault suite shall include authentication failure, stale input, conflicting input, finite-key/profile rejection, invalid or unknown device state, partial/unknown EKM commit, wrong consumer, one-sided delivery acknowledgement, and AQMO loss. | ARC-MD; ARC-EV; all fault-injected ARC elements | VIEW-5B; VIEW-5E; IF-E01 |
| REQ-MOD-009 | A controlled simulation rerun using the same retained environment and run record shall reproduce the recorded discrete outcomes exactly and numeric outputs within the frozen numerical tolerance. | ARC-MD; ARC-EV | VIEW-5E; IF-E01 |
| REQ-MOD-010 | No quantitative model result shall be accepted against a mission threshold until the threshold, unit, derivation rationale, authority, and applicable analysis case are recorded. | ARC-MD; ARC-CT; ARC-EV; ARC-RL | VIEW-5A; IF-E01; IF-R01 |
| REQ-REL-001 | The project shall review each cited source for current publication status, corrigenda, planning notes, errata, and applicability at every controlled baseline. | ARC-RL; ARC-EV | VIEW-5A; IF-R01; IF-E01 |
| REQ-REL-002 | The project shall block public release of a handbook extract, model result, diagram, threat detail, dataset, or website artifact until PR-GATE-01 has a positive recorded disposition for that artifact version. | ARC-RL; ARC-EV | VIEW-5A; TZ-PU; IF-R01 |
| REQ-REL-003 | A public artifact shall contain no unsupported named customer, sponsor, military adoption, certification, approval, or authority claim. | ARC-RL; ARC-EV; controlled artifact owners | VIEW-5A; TZ-PU; IF-R01 |
| REQ-REL-004 | A public artifact shall contain no unapproved sensitive site, orbit, schedule, vulnerability, exploit path, device weakness, credential, or security-configuration detail. | ARC-RL; ARC-EV; controlled artifact owners | VIEW-5A; TZ-PU; IF-R01 |
| REQ-REL-005 | Every public technical claim shall resolve to a controlled `CE-*` entry and preserve its applicability limit. | ARC-RL; ARC-EV; controlled artifact owners | VIEW-5A; TZ-PU; IF-R01 |
| REQ-REL-006 | Every public model result shall display its profile, analysis case, parameter-register version, source/applicability basis, uncertainty or sensitivity treatment, exact outcome/metric definition, and material limitations. | ARC-RL; ARC-MD; ARC-EV | VIEW-5A; TZ-PU; IF-R01 |
| REQ-REL-007 | Every public security description shall state that QKD is a partial key-establishment layer and does not by itself prove endpoint security, implementation security, availability, denial-of-service resistance, or operational approval. | ARC-RL; ARC-CT; ARC-EV | VIEW-5A; TZ-PU; IF-R01 |
| REQ-REL-008 | Every public release shall record the artifact identity/version, information owner, required legal/security reviewers, decision, date, conditions, and evidence references. | ARC-RL; ARC-EV; ARC-CT | VIEW-5A; TZ-PU; IF-R01; IF-E01 |
| REQ-CM-001 | The configuration-control process shall retain a stable requirement ID when the obligation remains semantically unchanged. | ARC-CT; ARC-EV | All architecture IDs and views; IF-E01 |
| REQ-CM-002 | The configuration-control process shall assign a new requirement ID when a change alters the obligated actor, behavior, condition, object, or acceptance outcome. | ARC-CT; ARC-EV | All architecture IDs and views; IF-E01 |
| REQ-CM-003 | The configuration-control process shall retain each deleted or rejected requirement in history with its disposition rationale and authority. | ARC-CT; ARC-EV | All architecture IDs and views; IF-E01 |
| REQ-CM-004 | The configuration-control process shall prohibit reuse of a retired requirement identifier. | ARC-CT; ARC-EV | All architecture IDs and views; IF-E01 |
| REQ-CM-005 | A change to any of ED-003, ED-004, ED-005, ED-006, ED-007, ED-008, or ED-013 shall trigger recorded impact review across Chapters 1–4, threats, state models, simulation, verification cases, and public claims. | ARC-CT; ARC-EV; ARC-MD; ARC-RL; all affected ARC elements | VIEW-5A through VIEW-5F; IF-E01; IF-R01 |
| REQ-CM-006 | A protocol-family change shall trigger a new proof, device, metric, and applicability review rather than a parameter-only disposition. | ARC-CT; ARC-MD; ARC-EV; ARC-RL | VIEW-5B; VIEW-5E; IF-E01; IF-R01 |
| REQ-CM-007 | A change introducing a relay or remote consumer shall trigger TBD-016 and a separate trust/topology change record. | ARC-CT; ARC-RL; ARC-EV | VIEW-5A; VIEW-5C; IF-R01; IF-E01 |
| REQ-CM-008 | A relay or remote-consumer change shall not inherit the V0.2 direct-link security claim before separate trust/topology and authority approval. | ARC-CT; ARC-RL; ARC-EV | VIEW-5A; VIEW-5C; IF-R01; IF-E01 |
| REQ-CM-009 | A `TBD-*` closure change shall include the registered closure evidence and the complete affected-requirement list. | ARC-CT; ARC-EV; all affected requirement-owner ARC elements | All affected views and interfaces; IF-E01 |
| REQ-CM-010 | A requirement whose acceptance method includes unexecuted analysis, test, demonstration, or independent review shall remain not verified. | ARC-EV; ARC-CT; requirement-owner ARC elements | All affected verification surfaces; IF-E01 |

---

## 3. Coverage summary

| Family | IDs allocated | Expected from Chapter 4 | Disposition |
|---|---:|---:|---|
| REQ-SRV | 11 | 11 | Complete at ID level |
| REQ-QKD | 17 | 17 | Complete at ID level |
| REQ-KM | 25 | 25 | Complete at ID level |
| REQ-AQM | 11 | 11 | Complete at ID level |
| REQ-DAT | 6 | 6 | Complete at ID level |
| REQ-CYB | 12 | 12 | Complete at ID level |
| REQ-EVD | 9 | 9 | Complete at ID level |
| REQ-MOD | 10 | 10 | Complete at ID level |
| REQ-REL | 8 | 8 | Complete at ID level |
| REQ-CM | 10 | 10 | Complete at ID level |
| **Total** | **119** | **119** | **119/119 allocated** |

The counts establish allocation completeness only. They do not establish that the architecture is correct, implemented, secure, verified, or approved.

---

## 4. ARCH-G1 use

Before ARCH-G1, reviewers must confirm that:

1. every row remains traceable to the same semantic Chapter 4 obligation;
2. every key-value obligation terminates only in the QKD, associated EKM, or authorized local-consumer paths described by the architecture;
3. AQMO, evidence, modeling, peer-status, and presentation allocations carry no key-value interface;
4. cross-cutting allocations have a named implementation and evidence owner in the full draft;
5. all `Provisional` source requirements retain their cited `TBD-*` blockers;
6. no allocation converts a logical zone into a claimed physical or certified cryptographic boundary;
7. OUT-1 through OUT-4 remain independently represented; and
8. any architecture conflict returns to Chapter 4 change control rather than being resolved by silently changing the requirement.

ARCH-G1 may freeze this allocation as part of a preliminary architecture description. It cannot authorize implementation, public release, procurement, fabrication, flight, certification, cryptographic approval, risk acceptance, or an operational security claim.

---

## 5. Sprint 2 allocation audit

The reviewed allocation was compared against the corrected Chapter 4 source identified by the SHA-256 value in this document. The comparison treated the requirement ID and the complete obligation field as controlled text.

| Audit check | Result |
|---|---:|
| Unique Chapter 4 requirement IDs | 119 |
| Unique Annex 5-A requirement IDs | 119 |
| Missing IDs | 0 |
| Extra IDs | 0 |
| Exact obligation-text mismatches | 0 |
| Operationally verified requirements | 0 |

Family counts remained `SRV 11`, `QKD 17`, `KM 25`, `AQM 11`, `DAT 6`, `CYB 12`, `EVD 9`, `MOD 10`, `REL 8`, and `CM 10`.

This audit establishes textual fidelity and allocation completeness only. Architecture-owner review, implementation evidence, verification execution, independent review, and gate approval remain outstanding.
