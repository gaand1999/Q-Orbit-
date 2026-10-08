# Q-Orbit — Deliverable Specifications (All 10 Deliverables)
**Document ID:** QO-SPEC-DELIV-001 | **Version:** 1.1 (Phase 1 closure reconciliation) | **Date:** 2026-08-27
**Status:** THEORETICAL / NOT PHYSICALLY VALIDATED — PRIVATE-BLOCKED
**Purpose:** Binding specification for every deliverable of the Q-Orbit submission package. Phase 1 produced the audit, research extension, V0.17-TA1 architecture, and this specification set. Phase 2 executes Deliverables 7–10 (manuscript, review cycle, checklist closure, backlog activation) plus any website/prototype work — **only after the REQUIRED INPUT / BLOCKER register is cleared**.

**Reconciliation note (2026-08-27, Phase 1 closure):** earlier revisions of this document carried the stale statements that the V0.16 computational package was absent and that D1/D2 were DRAFTED-PENDING-V0.16. Those statements predated the artifact-verification session and are superseded: the Phase 1 Canonical Audit and CFR v1.1 are the authoritative project state. D1/D2 are COMPLETE; the computational-input blocker is CLOSED; REQ-01…05 remain OPEN (legitimate physical/provenance blockers — not closed).

---

## 0. Global acceptance rules (apply to every deliverable)

1. **Evidence precedence:** (1) reproducible executable output and controlled generated data → (2) hash-verified run summary/CSV → (3) regression fixture → (4) technical report → (5) manuscript prose → (6) unsupported narrative. Conflicts are resolved upward, never silently reconciled.
2. **Fail closed:** missing evidence ⇒ BLOCKED, never guessed.
3. **No invented numbers:** unmeasured physical quantities are symbols, literature-derived ranges (explicitly attributed, never adopted as Q-Orbit device values), or `UNCHARACTERIZED`.
4. **No hidden substitution:** phase-randomization defects ∉ QBER; source leakage ∉ loss; detector mismatch ∉ detector efficiency; correlations ∉ IID extraneous-count term.
5. **No probability inflation:** deterministic grid fractions are not reliability, probability, availability, yield, or mission success.
6. **Reproduction ≠ validation:** regression agreement is numerical evidence only.
7. **Claim ledger:** every material conclusion carries one label — NUMERICALLY-VERIFIED / THEORETICALLY-SUPPORTED / LITERATURE-SUPPORTED / ASSUMPTION-DEPENDENT / CHARACTERIZATION-REQUIRED / PHYSICAL-VALIDATION-REQUIRED / OPERATIONALLY-UNSUPPORTED / BLOCKED.
8. **Prohibited claims (package-wide):** mission success probability; QKD availability; Tabuk performance; implementation security; certified device security; procurement tolerance; hardware readiness; deployability; field readiness; released secret key.
9. **Citation hygiene:** every reference verified (title, authors, venue, year, DOI/arXiv). No fabricated or unverifiable references.
10. **Figure/table captions** must state the evidence class of displayed content: modeled / deterministic / theoretical / measured / not measured. No visual language implying experimental validation.

---

## D1 — Executive Audit (Phase 1 output — status: COMPLETE 2026-08-27, delivered as Phase 1 Canonical Audit §A)

**Form:** ≤ 2 pages. **Audience:** submission gatekeeper.
**Required content:**
- What is verified (with evidence class per item).
- What was corrected (each correction cross-referenced to D2 row IDs).
- Unresolved blockers (each with REQUIRED INPUT entry).
- Submission-readiness status: one of READY / READY-WITH-DISCLOSED-LIMITATIONS / BLOCKED, with one-paragraph justification.
**Acceptance criteria:**
- Every verification claim traceable to a D2 row.
- No claim in D1 stronger than its D2 evidence class.
- Known required content: the grid-median/minimum sign resolution (CFR C-01…C-03); the declaration that the V0.16 *executable* package (controlled inputs REQ-01…03) remains absent even though the 10 critical artifacts were received as a PDF bundle and audited (CFR §0).
**Current blockers (reconciled 2026-08-27):** none for the theoretical/numerical record — the computational-input blocker is **CLOSED** (10-artifact bundle received, hash-verified 9/10 + 01 EV-1c, independently recomputed; all headline magnitudes NUMERICALLY-VERIFIED, CFR §2). REQ-01…05 (CFR §6) remain **OPEN** and gate any re-execution/provenance-verification claim (see reconciliation note).

## D2 — Numerical Consistency Table (Phase 1 output — status: COMPLETE 2026-08-27, delivered as Phase 1 Canonical Audit §B; zero rows remain UNVERIFIED-PENDING-V0.16-PACKAGE)

**Form:** full-width table, one row per audited quantity.
**Mandatory columns:** Item | Version A | Version B | Ground-truth value | Evidence | Resolution.
**Mandatory row coverage:** baseline half-window; signed finite-key margin; floored key; X-basis QBER; phase-error bound φ_X; n_X; s_X,1; s_X,0; λ_EC; ε_s; ε_c; all eight local-response values; all one-dimensional frontier extrema; 41×41 grid dimensions; positive/nonpositive counts; positive grid fraction; grid median; grid minimum; grid maximum; zero-boundary statements; regression test count; independent audit claims (V0.13 50/971).
**Evidence classes allowed:** RESOLVED-BY-INVARIANT / CONSISTENT-ACROSS-ARTIFACTS / ARITHMETICALLY-CONSISTENT / UNVERIFIED-PENDING-V0.16-PACKAGE / UNRESOLVED — SUBMISSION BLOCKER.
**Acceptance criteria:** no row without an evidence class; sign disputes resolved by stated invariant logic; every UNVERIFIED row maps to a named artifact in the BLOCKER register.
**Note (red-team C13, 2026-08-27) — evidence-vocabulary and frontier-coverage mapping for the delivered D2 (Phase 1 Canonical Audit §B).** The delivered table uses the audit's finer EV-* classes; the mandated mapping is: RESOLVED-BY-INVARIANT ≡ EV-2; CONSISTENT-ACROSS-ARTIFACTS ≡ EV-3; ARITHMETICALLY-CONSISTENT ≡ EV-1b-derived (CSV-recomputed arithmetic); UNVERIFIED-PENDING-V0.16-PACKAGE ≡ EV-9; UNRESOLVED — SUBMISSION BLOCKER unchanged. Frontier-row coverage in the audit table is summarized, not exhaustive: artifact 07 carries the full 16 rows (8 parameters × 2 sides; 10 CROSSING-FOUND), and the D2 table quotes the audit's verified subset (the 3 crossing values cross-checked against AUD-016-006) with an explicit pointer "(+7 more in 07)"; extending the quoted subset to all 10 crossing values is a transcription-only task requiring no new evidence.

## D3 — Literature and Proof Review (Phase 1 output)

**Form:** focused review document (target 8–15 pages equivalent).
**Required content:**
- Verification status of the 6 seeded references (VERIFIED / CORRECTED / UNVERIFIED / FABRICATED) with corrected records where needed.
- Assumption inventory of the frozen Sidhu-family profile relevant to Q-Orbit: phase randomization, IID pulse preparation, intensity knowledge, detection model, finite-key concentration machinery, epsilon accounting.
- Which assumptions matter specifically to Q-Orbit's unmapped-effects list and why.
- Supplementary primary literature only where it supports a specific claim; each entry annotated with exactly which claim it supports.
**Acceptance criteria:** zero unverifiable references retained; every "literature-supported" claim in the package traceable to a D3 entry.

## D4 — Proof-Profile Comparison Matrix (Phase 1 output)

**Form:** matrix + ranked recommendation.
**Mandatory columns:** Proof/framework | Protocol compatibility | Finite-key? | Imperfect phase randomization | Source flaws | Correlations | Detector mismatch | Required characterization | Main assumptions | Integration difficulty | Suitability for Q-Orbit.
**Mandatory rows (minimum):** frozen Sidhu-2022 profile (reference row); Lim et al. 2014; Lo-Ma-Chen 2005 / Ma et al. 2005; GLLP 2004; loss-tolerant (Tamaki et al. 2014 + finite-key descendants); Nahar-Upadhyaya-Lütkenhaus 2023; quantum-coin/finite-key imperfect-phase-randomization line (Pereira, Currás-Lorenzo et al.); correlation-tolerant decoy treatments (Yoshino 2018; Zapatero 2021; Sixto 2022; Pereira 2025 — note: "Trényi & Curty NJP 2021" was a misattribution, their NJP 23, 093005 is a COW zero-error attack paper); MDI-QKD (with explicit satellite-downlink applicability verdict); composable frameworks (Müller-Quade-Renner; Portmann-Renner).
**Decision analysis:** options A (retain + constrain device) / B (adopt generalized proof) / C (layered: satellite finite-key optical/count layer + separate implementation-security proof bounding admissible parameters) — compared on assumption coverage, integration cost, and fail-closed compatibility. Explicit statement required if no single proof covers all imperfections.
**Output:** one recommended next theoretical path with justification, and rejected alternatives with reasons.

## D5 — Device-Imperfection Mapping Matrix (Phase 1 output)

**Form:** master matrix covering at minimum the 15 mandated effects: incomplete phase randomization; pulse-to-pulse correlations; intensity correlations; state-preparation flaws; source leakage/distinguishability; dead time/recovery; saturation; detector timing jitter; history-dependent afterpulsing; detection-efficiency mismatch; wavelength-dependent response; polarization-dependent response; detector memory; characterization uncertainty; aging/cross-instance drift.
**Mandatory columns:** Device effect | Current scalar model | Security relevance | Candidate proof treatment | Required mathematical parameter | Required characterization evidence | Confidence treatment | Current status.
**Status labels (controlled vocabulary):** MAPPED-IN-CURRENT-FIXTURE / PARTIAL-SCALAR-STRESS-ONLY / PROOF-PROFILE-CANDIDATE / UNMAPPED-PROOF-REQUIRED / UNMAPPED-MODEL-REQUIRED / UNMAPPED-CHARACTERIZATION-REQUIRED / UNMAPPED-SECURITY-BUDGET / BLOCKING.
**Acceptance criteria:** every row distinguishes engineering-model vs security-proof impact; no row invents a numerical penalty; interaction effects (e.g., correlations × phase randomization) explicitly flagged.

## D6 — Proposed Q-Orbit V0.17-TA1 Specification (Phase 1 output)

**Form:** architecture specification.
**Mandatory sections:** objective; mathematical scope; new symbolic parameters (name, meaning, proof entry point, instantiation status); software changes (module-level, with anti-fabrication guards); verification tests (regression invariants the V0.17 code must satisfy); blockers; expected outputs; explicit non-claims.
**Hard requirements:**
- Remains purely theoretical; introduces no experimental values.
- Numerical-extension triage enforced: Category 1 (symbolic now), Category 2 (requires characterization data), Category 3 (requires a different security proof) — with software-level refusals for Categories 2–3 numerical runs.
- Preserves the frozen V0.16 fixture as an immutable regression reference (V0.17 extends; it does not silently mutate V0.16 results).
- Claim-control integration: new outputs carry claim labels automatically.

## D7 — Revised Submission Manuscript V1.0-RC2 (Phase 2)

**Form:** complete polished manuscript (not editing notes), Markdown source + .docx render.
**Baseline:** current V1.0-RC1 text with all Phase 1 corrections applied.
**Mandatory improvements:** title (only if justified); abstract (all numbers = resolved D2 ground truth); introduction; research question (both stages); contribution statement (reproduced / newly analyzed / proposed / unresolved explicitly separated); related work (D3-verified citations only); methods; mathematical definitions (notation table; margin equation cross-checked against primary source); results (corrected signs; every figure caption evidence-labeled); discussion (including grid-fraction ≠ probability); proof-to-device section (D5 condensed); security-budget section (D6 symbolic budget); limitations; conclusion; reproducibility statement (V0.16 package contents + hash verification procedure); references (D3-verified only).
**Acceptance criteria:** zero UNVERIFIED-PENDING values presented as verified; sign corrections applied; claim ledger attached as appendix; no prohibited claims; novelty not inflated.

## D8 — Reviewer Report (Phase 2)

**Form:** three simulated reviews + response-to-reviewers summary.
**Reviewers:** (1) quantum-cryptography theorist — security assumptions, composability, decoy validity, finite-key correctness; (2) experimental QKD/device specialist — source/detector realism, characterization requirements, measurement-to-proof mapping; (3) scientific-method/reproducibility reviewer — numerical reproducibility, claims, statistics, terminology, evidence hierarchy.
**Each review:** Major comments / Minor comments / Required corrections / Recommendation ∈ {ACCEPTABLE-THEORETICAL-DRAFT, MAJOR-REVISION, BLOCKED}.
**Response summary:** every criticism dispositioned FIXED / MITIGATED / EXPLICIT LIMITATION / BLOCKING OPEN ISSUE, with manuscript edit pointers.
**Acceptance criteria:** no criticism silently dropped; BLOCKED recommendations trigger gate failure.

## D9 — Submission Checklist (Phase 2, updated at every gate)

**Form:** PASS / FAIL / BLOCKED table over: numerical consistency; references verified; equation consistency; figure consistency; claim boundaries; reproducibility; physical-validation language; proof completeness; manuscript formatting.
**Rule:** any BLOCKED row ⇒ package cannot ship; FAIL rows must name owner artifact and fix path.

## D10 — Next-Step Research Backlog (Phase 2 seed, Phase 1 draft included in V0.17 spec)

**Form:** prioritized backlog.
**Priorities:** P0 — required before theoretical submission; P1 — next theoretical version (V0.17 execution); P2 — future characterization work; P3 — future physical/engineering validation.
**Rule:** P0 items are a closed set derived from D1/D2 blockers; P2/P3 items carry the measurement-specification class from the characterization bridge (observables, confidence machinery, repetition dimensions) — they authorize no hardware activity.

---

## Phase 1 → Phase 2 gate conditions

Phase 2 (D7 manuscript finalization, D8, D9 closure, website/prototype) may start when:
1. Phase 1 package passes red-team review (Agent G) with no undispositioned criticism.
2. D2 closure is achieved (10-artifact bundle audited; computational ground truth locked in CFR §2). The residual REQUIRED INPUT / BLOCKER register (REQ-01…05, CFR §6) is either cleared by supplying the named artifacts, or the user explicitly accepts a submission posture with those items disclosed — including the standing declaration that no independent end-to-end re-execution of the model has been performed.
3. User confirms Phase 2 scope.
