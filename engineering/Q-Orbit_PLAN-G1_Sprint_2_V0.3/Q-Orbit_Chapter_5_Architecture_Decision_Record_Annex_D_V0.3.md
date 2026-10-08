# Q-Orbit Chapter 5 — Architecture Decision Record Annex D V0.3

| Document field | Value |
|---|---|
| Document ID | QO-EDH-CH05-ANN-D |
| Version | Working Draft V0.3 |
| Date | 16 August 2026 |
| Parent | QO-EDH-CH05 Working Draft V0.3 |
| Decision coverage | ADR-5-001 through ADR-5-012 |
| Maturity | Preliminary architecture dispositions |
| Approval state | Not ARCH-G1 approved |
| Release state | Private; public release requires PR-GATE-01 |

> **Decision boundary.** `Adopted for V0.3 draft` means the disposition is used to keep the preliminary architecture internally coherent. It does not mean an operational authority approved it, an open issue is closed, or implementation may begin.

---

## ADR-5-001 — Direct-link topology only

| Field | Record |
|---|---|
| Status | Adopted for V0.3 draft |
| Decision | Retain one direct QKD-A/QKD-B quantum path and one authenticated classical protocol path. Exclude trusted relay and arbitrary remote-consumer distribution. |
| Source | ED-003; REQ-SRV-001; REQ-SRV-003; REQ-SRV-006; REQ-SRV-007; REQ-CM-007; REQ-CM-008 |
| Rationale | Keeps the first analysis and security claim bounded to one endpoint pair and avoids importing a relay trust model. |
| Consequence | IF-Q01 and IF-Q02 join only ARC-QA and ARC-QB. Broader networks remain external. |
| Alternatives not selected | Trusted-node relay; store-and-forward key service; arbitrary remote consumer; continuous/global service. |
| Why not selected | Each changes topology, trust, authority, threat, metric, and release claims beyond the current evidence. |
| Open evidence | TBD-016 for any future extension; TBD-001 for authority; TBD-014 for applicable rules. |

## ADR-5-002 — One associated EKM and local representative consumer per endpoint domain

| Field | Record |
|---|---|
| Status | Adopted for V0.3 draft |
| Decision | Associate ARC-EA and ARC-CA with endpoint domain A; associate ARC-EB and ARC-CB with endpoint domain B. |
| Source | ED-004; REQ-SRV-004; REQ-SRV-005; REQ-KM-001 |
| Rationale | Provides a traceable local handoff and delivery demonstration without claiming remote distribution. |
| Consequence | Accepted output follows IF-K01/IF-K02 only; delivery follows IF-C01/IF-C02 only. |
| Alternatives not selected | Central/shared EKM; remote consumer as baseline; single consumer for both domains. |
| Why not selected | Those options change custody, failure, authorization, and topology semantics. |
| Open evidence | TBD-008 for physical boundary/placement; TBD-010 for consumer contract. |

## ADR-5-003 — Replenishment primary, delivery separate

| Field | Record |
|---|---|
| Status | Adopted for V0.3 draft |
| Decision | OUT-3 is the primary mission outcome; OUT-4 is a separate optional transaction after OUT-3. |
| Source | ED-005; ED-008; REQ-SRV-008 through REQ-SRV-011; REQ-KM-016 through REQ-KM-023 |
| Rationale | Prevents QKD acceptance, inventory commit, and consumer delivery from collapsing into one ambiguous success label. |
| Consequence | The architecture has a pair-commit boundary at IF-K03 and separate delivery boundaries at IF-C01/IF-C02. |
| Alternatives not selected | Declare mission complete at OUT-2; require OUT-4 for every replenishment; use one generic success field. |
| Why not selected | They misstate inventory availability, change denominators, or erase partial/ambiguous outcomes. |
| Open evidence | TBD-009; TBD-010; TBD-013. |

## ADR-5-004 — Separate logical QKD and EKM zones

| Field | Record |
|---|---|
| Status | Adopted for V0.3 draft |
| Decision | Model TZ-QA, TZ-QB, TZ-EA, and TZ-EB as four separate logical zones. |
| Source | Chapter 2 §2.5; ED-003; ED-005; REQ-CYB-002 |
| Rationale | Avoids an unsupported pair-wide memory boundary and makes local handoff/peer-state crossings explicit. |
| Consequence | Key paths are local; pair coordination is non-secret; one side cannot prove the other's local state by assumption. |
| Alternatives not selected | One pair-wide cryptographic zone; combine QKD and EKM into one unqualified boundary. |
| Why not selected | No physical architecture or validated boundary evidence supports those claims. |
| Open evidence | TBD-008; TBD-015. |

## ADR-5-005 — Key values only on protected local paths

| Field | Record |
|---|---|
| Status | Adopted for V0.3 draft |
| Decision | Permit accepted or delivered key values only on IF-K01, IF-K02, IF-C01, and IF-C02. |
| Source | ED-002; ED-004; ED-010; REQ-SRV-002; REQ-SRV-004; REQ-KM-001; REQ-EVD-004 |
| Rationale | Minimizes custody and keeps orchestration, evidence, modeling, and presentation outside the secret path. |
| Consequence | IF-K03, IF-A01/02/03, IF-E01, and IF-R01 have explicit zero-key rules. |
| Alternatives not selected | Key transport through AQMO; key copy in audit/evidence; key-bearing peer commit; model/website access. |
| Why not selected | Each contradicts the controlled data boundary and increases uncontrolled custody. |
| Open evidence | TBD-008; TBD-009; TBD-010; TBD-019. |

## ADR-5-006 — Non-secret two-sided pair-state coordination

| Field | Record |
|---|---|
| Status | Adopted for V0.3 draft |
| Decision | Model EKM coordination as authenticated, binding-specific, idempotent non-secret Prepared/Committed/Unknown evidence. |
| Source | ED-013; REQ-KM-005 through REQ-KM-015; REQ-SRV-009 |
| Rationale | Provides safe conceptual semantics for response loss, restart, partition, duplicate, and conflicting evidence without claiming universal atomicity. |
| Consequence | Only matching positive two-sided evidence permits Committed/Available; ambiguity becomes Unknown/quarantine. |
| Alternatives not selected | One-sided availability; timeout-as-success; automatic rollback; key transfer as commit proof. |
| Why not selected | Each can expose or reuse ambiguously paired material. |
| Open evidence | TBD-007; TBD-009; TBD-019. |

## ADR-5-007 — Constrained metadata-only AQMO

| Field | Record |
|---|---|
| Status | Adopted for V0.3 draft |
| Decision | ARC-AQ validates requests and qualified data, filters/ranks/reserves opportunities, monitors, and replans through metadata and allow-listed commands only. |
| Source | ED-010; REQ-AQM-001 through REQ-AQM-011; REQ-EVD-002 |
| Rationale | Coordinates scarce opportunities without centralizing key custody or local security authority. |
| Consequence | AQMO has IF-A01/02/03 only; local endpoint, device, finite-key, EKM, incident, and release gates remain authoritative. |
| Alternatives not selected | AQMO key custody; cryptographic acceptance authority; autonomous incident recovery; risk/release authority. |
| Why not selected | Those alternatives enlarge trust and consequence without approved authority or evidence. |
| Open evidence | TBD-011; TBD-012; TBD-019. |

## ADR-5-008 — Separate authenticity from decision-data fitness

| Field | Record |
|---|---|
| Status | Adopted for V0.3 draft |
| Decision | ARC-DV validates provenance, validity, time, freshness, quality, uncertainty, plausibility, and conflict state independently of source authentication. |
| Source | ED-012; REQ-DAT-001 through REQ-DAT-006; REQ-AQM-002 through REQ-AQM-005 |
| Rationale | A signed but stale, conflicting, invalid, or implausible value remains unsafe for a hard decision. |
| Consequence | IF-A02 carries validation state and uncertainty; unresolved conflict leads to hold/abort unless a predeclared rule resolves it. |
| Alternatives not selected | Signature-only acceptance; implicit preferred source; silent averaging of conflicts. |
| Why not selected | None proves current correctness or fitness for the decision. |
| Open evidence | TBD-011; TBD-012. |

## ADR-5-009 — Fail closed and prohibit silent downgrade

| Field | Record |
|---|---|
| Status | Adopted for V0.3 draft |
| Decision | A failed or unknown required gate yields a non-permissive state; a failure does not automatically change algorithm, key source, endpoint, trust path, relay use, fallback, or security label. |
| Source | ED-009; REQ-QKD-009 through REQ-QKD-011; REQ-CYB-010; REQ-CYB-011 |
| Rationale | Prevents availability pressure from rewriting the security claim. |
| Consequence | Abort, hold, Unknown, quarantine, incident, or explicit no-service are legitimate outcomes. |
| Alternatives not selected | Unknown-as-pass; timeout-as-success; automatic alternate endpoint/relay; unlabeled non-QKD fallback. |
| Why not selected | Each creates false success or silent change of trust/service. |
| Open evidence | TBD-007; TBD-013; TBD-017; TBD-018. |

## ADR-5-010 — Evidence, model, and presentation outside key custody

| Field | Record |
|---|---|
| Status | Adopted for V0.3 draft |
| Decision | ARC-EV records non-secret evidence; ARC-MD receives controlled non-secret analytical inputs/results; ARC-RL/TZ-PU receive only controlled artifacts. |
| Source | REQ-EVD-003 through REQ-EVD-009; REQ-MOD-002 through REQ-MOD-010; REQ-REL-002 through REQ-REL-008 |
| Rationale | Preserves reconstruction, reproducibility, and presentation without turning auxiliary systems into key stores. |
| Consequence | Evidence stores exact gate/outcome/reason/version metadata with zero key values; model and website never receive key values. |
| Alternatives not selected | Debug logging of key values; model access to operational key payloads; web access to secret material. |
| Why not selected | Each violates data minimization, scope, and release controls. |
| Open evidence | TBD-013; TBD-015; TBD-019; TBD-020. |

## ADR-5-011 — Logical zones are not physical or certified boundaries

| Field | Record |
|---|---|
| Status | Adopted for V0.3 draft |
| Decision | Label every zone and deployment view as conceptual/logical until physical boundary and assurance evidence exist. |
| Source | Chapter 1 §§1.5 and 1.7; Chapter 2 §2.5; REQ-CYB-002; REQ-CM-010 |
| Rationale | Prevents architectural notation from becoming an unsupported implementation or accreditation claim. |
| Consequence | Diagrams carry status labels; product, HSM, terminal, bus, facility, and port selection remain absent. |
| Alternatives not selected | Treat dashed boxes as validated crypto modules; assign product/facility boundaries by convention. |
| Why not selected | No implementation, ownership, data-entry/exit, or independent assurance evidence exists. |
| Open evidence | TBD-006; TBD-008; TBD-014; TBD-015. |

## ADR-5-012 — No active fallback in V0.3

| Field | Record |
|---|---|
| Status | Adopted for V0.3 draft |
| Decision | Configure no automatic or active non-QKD fallback service in the V0.3 reference architecture. |
| Source | REQ-CYB-010; REQ-CYB-011; Chapter 3 OPS-07 |
| Rationale | No separate configuration, authority, label, entry condition, termination condition, or scenario evidence has been approved. |
| Consequence | A failed QKD opportunity may produce explicit no-service; availability is not guaranteed. |
| Alternatives not selected | Automatic classical/PQC fallback; alternate key source; relay; endpoint substitution. |
| Why not selected | Each requires a distinct service and trust definition and cannot inherit the QKD claim. |
| Open evidence | TBD-018; TBD-002; TBD-013; TBD-017. |

---

## Decision review summary

| Check | Result |
|---|---|
| Draft decisions | 12 |
| Decisions closing a TBD | 0 |
| Product/hardware/site selection | None |
| Relay/remote-consumer baseline | Rejected from V0.3; TBD-016 retained |
| Key access by AQMO/evidence/model/presentation | Prohibited |
| Fallback active | No |
| Operational authority approval | Not recorded |
| ARCH-G1 status | Review candidate only; not passed |

