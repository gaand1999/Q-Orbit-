# Q-Orbit — D8 Response to Reviewers

**Document ID:** QO-D8-RESPONSE-001 | **Date:** 2026-08-28
**Scope:** point-by-point response to Q-Orbit_D8_Reviewer_Report.md. Corrections were applied to the manuscript as **V1.0-RC3** (QO-SUB-RP-001; RC2 superseded) and to the companion artifacts (claim ledger QO-LEDGER-001 v1.1; CFR QO-CFR-001 v1.2 entry N-28; change log §9). RC3 change identifiers C4-01…C4-20 refer to the change-log entries.
**Rules honored:** no evidence invented; every correction verified against the controlled record before application; absent physical characterization is retained as limitation/requirement, never answered with prose.

## Disposition summary

| Reviewer | Recommendation | Required corrections | Disposition of required | Minor findings | Questions |
|---|---|---|---|---|---|
| R1 — quantum cryptography theorist | ACCEPTABLE-THEORETICAL-DRAFT | 0 | — | 8 → 6 FIXED, 2 EXPLICIT LIMITATION | 5 → 1 FIXED, 4 answered (2 EXPLICIT LIMITATION) |
| R2 — experimental QKD / device security | MAJOR-REVISION | 2 | 2 FIXED | 5 → 5 FIXED | 4 → 1 FIXED, 2 MITIGATED, 1 EXPLICIT LIMITATION |
| R3 — scientific method / reproducibility | MAJOR-REVISION | 4 | 4 FIXED | 6 → 6 FIXED | 5 → 3 FIXED, 1 MITIGATED, 1 EXPLICIT LIMITATION |

**No BLOCKING OPEN ISSUE was identified by any reviewer.** All six required corrections are FIXED and re-verified in RC3.

---

## Response to Reviewer 1 (quantum cryptography theorist)

We thank the reviewer for the bit-level verification of the margin identity, the 21-decomposition, the ε accounting, and the Profile A/B positioning.

**Major comments 1–7.** M1, M2, M4, M5, M6, M7 are verified strengths; no action. M3 (½-cap justification only implicit) — **FIXED** (C4-08): §9.2 now states that the cap is the conservative worst case (h₂ maximized at ½; a true phase error above ½ admits no valid positive-rate inference in this proof family, so clamping is the correct adversarial treatment, not a lossy truncation).

**Minor comments.**
- m1 (§13 "shrink the penalty class" overbroad) — **FIXED** (C4-14): the manuscript now says the upgrade shrinks the fluctuation-induced finite-key losses and states explicitly that the fixed 256.57-bit-class privacy-amplification/chain-rule/verification penalty is independent of the concentration inequalities. The parallel sentence in the Phase 1 D4 record (§4) is **EXPLICIT LIMITATION**: D4 is a frozen Phase 1 reviewed artifact; the wording is logged for a D4 v1.1 amendment and the corrected manuscript text governs the submission.
- m2 ("central-difference slope") — **FIXED** (C4-10): renamed to "normalized symmetric finite difference per declared step" in §10.3 and §18.
- m3 (α₁ weight vs. events) — **FIXED** (C4-09): clarifying clause added in §9.3 (one parameter, two roles, weight four via the prefactor).
- m4 (cap worst-case one-liner) — **FIXED** (C4-08, with M3).
- m5 (λ_EC closed form and failure charging) — **EXPLICIT LIMITATION**: the exact binomial-ppf/logM closed form, its quantile level, and the failure-charging locus are properties of the fixture internals (artifact 01, evidence class EV-1c/EV-4; REQ-01/REQ-04 gate byte closure). We do not print a formula we cannot verify from the controlled record. §18 documents what is verified (λ_EC value EV-1a; construction class binomial-ppf logM per CFR N-27). The closed form will be published when REQ-01 closes.
- m6 (γ formula) — **EXPLICIT LIMITATION**: we confirm the reviewer's bracketing computation (γ ∈ [0.0218, 0.0235], implied 0.0222487) is consistent with the record; the exact Serfling/Fung–Ma–Chau call and its deviation argument are gated by REQ-01 and will be published with it. No bit-exact claim is made meanwhile.
- m7 (§6 run-together paragraphs) — **FIXED** (C4-07).
- m8 (β=ln(21/ε_s) evidence tag) — **FIXED** (C4-09): the clause is now tagged as a model-inspection finding on artifact 01, EV-1c/EV-4.

**Questions.**
1. γ formula — see m6. **EXPLICIT LIMITATION** (REQ-01).
2. λ_EC closed form — see m5. **EXPLICIT LIMITATION** (REQ-01).
3. Agreed — the Layer-1 statistics upgrade leaves the fixed penalty unchanged; §13 wording corrected. **FIXED** (C4-14).
4. Yes: the envelope bound holds for *every* fixed window, including a pre-committed pass strategy (the choice mechanism is irrelevant to the subset argument). §11.3 now states the argmax argument explicitly: per-point re-optimization gives M_opt(p) ≥ M_w(p) pointwise, so any fixed-window positive set is a subset of the 568 re-optimized positives. **FIXED** (C4-11).
5. The 1 s minimum observed window remains EV-4 (artifact 05 only); reconciliation with the frontier record's 67 s minimum is deferred until REQ-03 closes the sweep-bound provenance. **EXPLICIT LIMITATION**.

---

## Response to Reviewer 2 (experimental QKD / device security)

We thank the reviewer for the row-by-row verification of the fifteen-class mapping and the anti-substitution sweep.

**Required corrections.**
- **R2-R1 (M1) — open-gap register.** **FIXED** (C4-05). Verified against D5 §6, which indeed enumerates four genuine open items. §6, §12 ("Open proof problems"), §16 item 7, §17, and §20 claim C25 now enumerate all four: (i) detector-side correlated afterpulsing in finite-key decoy proofs; (ii) rate-dependent yields inside the decoy method; (iii) full composable integration of certification (open technical aspects per Tan and Nahar, 2026, Appendix C); (iv) complete correlated-memory detector treatment for this fixture class. Per the reviewer's option (b)-strengthened-to-(a), the certification-composability caveat is additionally disclosed at the point where the additive union bound is adopted (§9.4, new sentence), matching D6 §4.3. Companion ledger row CL-67 registers the corrected register.
- **R2-R2 (M2) — uncontrolled number.** **FIXED** (C4-06). Before acting we recomputed the statistic independently from artifact 05: 41 unique extraneous-count columns, exactly 21 with zero POSITIVE-MODEL-MARGIN rows (orchestrator recomputation 2026-08-28); Reviewer 3 independently reproduced the same figure. The claim is therefore true and is now registered — CFR N-28 and ledger CL-66, evidence class EV-1b — rather than removed.

**Minor comments.**
- m1 (C23 ambiguity) — **FIXED** (C4-16): C23 now reads "proof-profile-forming candidate treatments … (other rows carry literature pointers of weaker standing; see Table 7)".
- m2 (screen scope) — **FIXED** (C4-11): §11.3 now states explicitly that the screen probes only the two count-model engineering scalars and is not a robustness statement over any of the fifteen effect classes of §12.
- m3 (D6 guard pointer) — **FIXED** (C4-14): §13 Layer 1 now cites the D6 §6 guard mechanism (twelve-item watchlist-to-guard mapping, build-time coverage test, AF-1/AF-5/AF-7, RT-12).
- m4 (TH-PAR sub-labels) — **FIXED** (C4-12): the "Reading of the table" paragraph now records the PARTIAL-SCALAR-STRESS-ONLY sub-labels (TH-PAR-002 rows 6–12; TH-PAR-007 row 9; TH-PAR-008 row 4) and notes that the fixture-representation column carries their substance.
- m5 (row 7 qualifier) — **FIXED** (C4-12): Table 7 row 7 now reads "BLOCKING (above the linear regime; strictest resolution)", faithful to D5 ("Resolved strictest: BLOCKING") while carrying the qualifier.

**Questions.**
1. §8 detection-probability formula — the expression is transcribed from artifact 01 (static inspection; EV-1c/EV-4 — compiles, hash-chain-listed, not byte-reconstructed). The manuscript presents it as the fixture's documented per-pulse model, and the reviewer's structural reading of the (1−2p_ec) factor is consistent with the fixture's error-visibility semantics; code-level confirmation of the exact factor placement is gated by REQ-01/REQ-04 byte closure. We assert nothing beyond the artifact's evidence class. **EXPLICIT LIMITATION**.
2. Both figures were recomputed from artifact 05 by the same independent code path; the 1,088/1,681 cap-binding count was ledgered (CL-05) and the 21/41 column count was an oversight — corrected (CL-66, CFR N-28). **FIXED** (C4-06).
3. The Wiesemann attribution rests on the Phase 1 red-team's independent live bibliographic check under finding C1 (2026-08-27), recorded in Q-Orbit_Phase1_RedTeam_Review.md ("Quantum 10, 2037 (2026), DOI 10.22331/q-2026-03-23-2037 is Wiesemann, Krause, Tupkary, Rusca, Walenta & Lütkenhaus, 'A consolidated and accessible security proof for finite-size decoy-state quantum key distribution' (arXiv:2405.16578)"), whose demanded fix included re-attributing that record to Wiesemann et al. The D3 ledger documents the *removal* of the false Tupkary attribution; the *positive* attribution evidence is the C1 check. To close the traceability loop in-document, the §19 preamble now carries this provenance clause for entry 69. **MITIGATED** (C4-19).
4. Row 6 (dead time, USB): no proof-profile exit is promised; certified operating bounds ("exclude the regime") are the standing fallback unless new proof machinery appears. Clarifying clause added to §12 ("Reading of the table"). **MITIGATED** (C4-20).

---

## Response to Reviewer 3 (scientific method / reproducibility)

We thank the reviewer for the full independent recomputation, the hash-chain re-derivation (a third independent byte-exact reproduction), and the four precisely specified corrections.

**Required corrections.**
- **R3-R1 (M1) — false sensitivity quantifier.** **FIXED** (C4-01). Verified: Table 4 rank-1 = −0.08215788925285143, rank-2 = +0.035673639848324994; ratio 2.30. §11.2 now reads "about 2.3 times the next-largest per-step response (detector-efficiency multiplier, +3.567% per 1% step)".
- **R3-R2 (M2) — duplicate reference.** **FIXED** (C4-02). The reviewer's external verification (Quantum 10, 2044 = eprint arXiv:2503.06328, three authors) matches the Phase 1 red-team spot-check record. Former entry 42 deleted; §7.6 cites only the published record (Nahar et al., 2026); Table 7 row 13 now cites the published record; the list is renumbered (76 entries).
- **R3-R3 (M3) — caption token / stale fix record.** **FIXED** (C4-03). Figures 4–5 captions now use the closed QO-FIGSPEC-001 vocabulary ("Content class: theoretical — …; not measured"). Change-log entry V-5.3 is corrected to record that the RC2 fix covered Figure 6 only and that Figures 4–5 were actually fixed in RC3.
- **R3-R4 (M4) — repair procedure.** **FIXED** (C4-04). §18 now documents the deterministic PDF-repair function exactly as the reviewer reverse-engineered it: (i) blank-line removal including Unicode-whitespace-only (NBSP-class) lines; (ii) CRLF restoration including trailing CRLF for artifacts 02/04/05/06/07/10; (iii) LF + rule (i) for artifact 08; (iv) artifact 03 matches directly. The reviewer's end-to-end reproduction is recorded as the third independent confirmation.

**Minor comments.**
- m1 (Ben-Or entry format) — **FIXED** (C4-17): year now parenthesized per house style.
- m2 (§20 legend) — **FIXED** (C4-16): legend now notes OPERATIONALLY-UNSUPPORTED (defined in QO-LEDGER-001; unused in the condensed table).
- m3 (ledger pointers) — **FIXED** (C4-18): CL-22 → "§10.2, §11.2–11.4"; CL-32 → "§8, §10.1".
- m4 (ε_char restatement) — **FIXED** (C4-15): §14.1 now reads "as defined in Eq. (5)".
- m5 (Figure 3 caption) — **FIXED** (C4-13): "shown in a side panel".
- m6 (abridged captions) — **FIXED** (C4-04): §18 now states that in-text captions are abbreviated callouts and the binding texts are the figspec's "Caption (exact text)" blocks.

**Questions.**
1. Confirmed: former entries 39 and 42 are the same work. The journal record (Quantum 10, 2044) was spot-verified in the Phase 1 red-team round (live check record, item C-series verification list) and re-confirmed externally by the reviewer during D8; the two records are consolidated into the single published entry. **FIXED** (C4-02).
2. The repair function is now documented in §18 at byte-reproduction fidelity (C4-04). Packaging it as a separate manifest-controlled script artifact is accepted as a final-submission-QA backlog item; it changes no evidence claim. **MITIGATED**.
3. Agreed and applied — the argmax subset argument is now explicit in §11.3. **FIXED** (C4-11).
4. Intentional: C17 is carried at the single-artifact evidence class with the "carried at the single-artifact evidence class" caveat printed in §18 and the ledger noting the claim rests on cross-artifact wording. The underlying JSON is absent (EV-9). **EXPLICIT LIMITATION**.
5. Yes — a mechanical QA battery (`/mnt/agents/output/qa_rc2.sh`: sign-consistency checks on the quarantined median/minimum renderings, canonical-number probes, prohibited-language sweeps) is maintained and re-run at every revision; §18 now cites it. **FIXED** (C4-04).

---

## Verification appendix (post-RC3, 2026-08-28)

Re-run after all C4-xx edits on `Q-Orbit_Scientific_Manuscript_V1.0-RC3.md` and the regenerated `.docx` (XML-level text extraction covering OMML math runs):

- Canonical values present with correct signs, counts unchanged vs RC2: median −2,624.946810258186 ×6, minimum −3,828.414517626367 ×5, maximum +142,540.7481180454 ×3, floored key 41,338.62418456675 ×6; **zero** positive-sign renderings of median/minimum (quarantine holds).
- "Order of magnitude" claim: absent. Four-gap register: 5 consistent sites (§6, §12, §16, §17, C25). Caption token "documentation": absent; closed vocabulary only. Reference list: 76 entries, sequential; arXiv:2503.06328 absent (consolidated into Quantum 10, 2044 record); "Nahar and Lütkenhaus (2025, preprint)" absent.
- Prohibited-claims sweep: mission success probability / QKD availability / Tabuk / hardware readiness / field readiness / released secret key appear only in the two binding-negation contexts (boundary statement; §15 negation) — unchanged from RC2's cleared state.
- Version strings: V1.0-RC3 ×2, V1.0-RC2 ×0 in the manuscript. No `---` YAML-hazard lines. Companion artifacts: ledger v1.1 (67 rows, CL-66/CL-67 added, CL-22/CL-32 pointers corrected); CFR v1.2 (N-28 added); change log §9 (C4-01…C4-20) and corrected V-5.3 record.
- No canonical number, sign, equation, figure datum, or scientific conclusion was changed. REQ-01…05 remain OPEN.

## D8 GATE DECISION

Both major-review recommendations were driven solely by the six required corrections, all of which are now FIXED in V1.0-RC3 and re-verified mechanically (appendix above); Reviewer 3's stated bar ("acceptance without further review rounds once they are applied and re-verified") is met, and Reviewer 1 recommended acceptance with no required corrections. No BLOCKING OPEN ISSUE exists; the residual items are disclosed EXPLICIT LIMITATIONs gated by REQ-01…05 or answered questions.

# D8 PASS — PROCEED TO FINAL SUBMISSION QA

*Stop condition honored: D9 (final submission QA) is NOT started; this document ends at the gate decision.*
