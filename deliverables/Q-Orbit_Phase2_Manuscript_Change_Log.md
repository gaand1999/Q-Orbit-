# Q-Orbit — Phase 2 Manuscript Change Log
**Document ID:** QO-CHANGELOG-P2-001 | **Version:** 1.0 | **Date:** 2026-08-27
**Scope:** V1.0-RC1 (`/mnt/agents/temp/Q-Orbit_Scientific_Research_Paper_Current.md`, QO-SUB-RP-001) → **V1.0-RC2** (`Q-Orbit_Scientific_Manuscript_V1.0-RC2.md`). Companion artifacts: `Q-Orbit_Manuscript_Claim_Ledger.md` (QO-LEDGER-001), `Q-Orbit_Figure_Specification.md` (QO-FIGSPEC-001).

## 1. Basis and authoritative inputs
Phase 1 closed as CONDITIONAL PASS — READY FOR PHASE 2 WITH DISCLOSED LIMITATIONS. RC2 was produced exclusively from the Phase 1 authoritative basis: Consolidated Package, CFR v1.1, Canonical Audit, D3–D6, Final Red-Team Report, Closure Record, and the Interim Submission Package (QO-INTERIM-PKG-001, located at `/mnt/agents/output/Q-Orbit_INTERIM_SUBMISSION_PACKAGE.md`; a duplicate rendering exists as `Q-Orbit_Preliminary_Submission_2026-08-27.md` — both carry the correct negative median/minimum and are consistent with RC2). No new research, no new literature search, no canonical-number changes were performed or permitted.

## 2. Structural changes (RC1 → RC2)
- RC1's 7-section layout expanded to the mandated 20-section submission structure (Title Block; Abstract; Keywords; Introduction; Research Question; Contribution Statement; Related Work; System and Protocol Model; Mathematical Framework; Methods; Results; Proof-to-Device Analysis; Proof-Profile Architecture; Security and Characterization Budget; Discussion; Limitations; Conclusion; Data and Reproducibility; References; Appendix — Claim Ledger).
- Manuscript length: ~13,100 content words; 77 verified references; 6 figure callouts with evidence-class captions (production per QO-FIGSPEC-001).

## 3. Corrections applied from the Phase 1 record
| Change | Source |
|--------|--------|
| Grid median/minimum carried strictly NEGATIVE (−2,624.946810258186 / −3,828.414517626367 bits); RC1's sign-flipped table rendering explicitly quarantined in a §11.3 correction notice | CFR C-01…C-03 |
| All canonical numbers set bit-exactly from CFR v1.1 (margin 41,338.62418456675; key 41,338; QBER_X 0.017422686665352745; φ_X 0.09270161340569935; 568/1,113/1,681; 0.33789411064842356; 12/12; 20/20; etc.) | CFR §2 |
| Margin equation printed with the corrected 21-decomposition (+1 chain-rule constants, exact cancellation) | Red-team C2, D6 §4.2 |
| ε_total = ε_c + ε_s + ε_char (+ε_auth) with ε_char ≡ Σ_jδ_j defined once | Red-team C3 |
| Upper-envelope disclosure on the screen partition/fraction; f_EC = 1 ideal-EC upper-bound disclosure | Red-team C8/C15, CFR N-07/N-08/N-26/N-27 |
| arXiv:2601.18035 cited as PREPRINT throughout; Quantum 10, 2037 appears only as the Wiesemann et al. record; Trényi & Curty retained solely as a documented misattribution (never cited for correlations) | Red-team C1/F-03; D3 |
| Profile B framed conservatively (preprint anchor; imperfection integration is future work per its abstract; coverage rests on Optica Quantum 3, 525 (2025)) | D4, red-team F-03 |
| Claim-control: controlled labels on all major claims; §20 condensed claim ledger; REQ-01…05 disclosed as open limitations; prohibited-claims register honored | Closure Record §6; CFR §4/§6 |

## 4. Phase 2 QA gate (all checks executed before delivery)
1. **Canonical-number consistency — PASS** (mechanical battery: all mandated values present bit-exact; independent verifier: zero deviating decimals; derived quantities recomputed correct).
2. **Sign check — PASS** (11/11 median/minimum occurrences explicitly negative; positive renderings absent outside the correction notice).
3. **Equation check — PASS** (margin identity recomputed from printed components: diff 0.0; 21-decomposition algebraically exact; ε-accounting single-count).
4. **Citation hygiene — PASS after 2 MINOR fixes** (V-4.1: missing "preprint" label on one Kato citation in Table 7 — FIXED; V-4.2: undifferentiated "Tupkary et al. (2025)" key mapping to two records — FIXED with 2025a = arXiv:2502.10340 review / 2025b = Quantum 9, 1937, applied at all five in-text sites and both reference entries).
5. **Claim-control sweep — PASS after 2 fixes** (V-5.1 MAJOR: claim ledger's manuscript-section pointers carried superseded rendering-B numbering — FIXED, all 56 affected rows re-mapped to true RC2 sections and the column key corrected; V-5.2 MAJOR: Figure 1 caption described a verification workflow while the figure specification mandates the per-pass finite-key computation pipeline — FIXED, caption replaced with the figspec's exact text and the §10.1 callout aligned; V-5.3 COSMETIC: non-sanctioned caption token "documentation" — recorded FIXED (Figure 6 caption); D8 Reviewer 3 later found Figures 4–5 still carried the token — actually fixed in RC3, see §9 entry C4-13).
6. **Prohibited-claims sweep — PASS** (verifier: zero positive assertions of any register item; all occurrences are explicit negations/requirements; no characterization requirement phrased as a performed measurement).

Verifier verdict: FIXABLE findings, no BLOCKING defects; all five findings fixed and re-verified. Mechanical battery final state: 47/47 substantive PASS (one heuristic flag on two "certified"-in-requirement-context lines independently cleared by the verifier's Check 6).

## 5. Judgment calls recorded by the writing stage
1. References verified in Phase 1 without recorded titles were cited author/venue/volume/year without inventing titles (fail-closed).
2. Tupkary 2026 preprints disambiguated as 2026a (arXiv:2601.18035) / 2026b (arXiv:2601.17960); Tupkary 2025 as 2025a/2025b (§4 above).
3. Reference set scoped to the 77 load-bearing D3-verified records; least-load-bearing citations removed under the word budget — all brief-mandated works retained.
4. Claim ledger runs to 65 rows (15 D5-effect rows + 10 BLOCKED rows mandated individually).
5. OPERATIONALLY-UNSUPPORTED used once (CL-55) for prohibited operational readings of the screen fraction, distinct from the BLOCKED register.

## 6. Standing disclosures carried into RC2
REQ-01…05 OPEN; no end-to-end re-execution; ε_s/ε_c individually EV-9; artifact 01 EV-4/EV-1c; margins are upper bounds w.r.t. f_EC; screen partition is an upper-envelope deterministic quantity, not a probability; Profile-B anchor is a preprint; manuscript remains THEORETICAL / NOT PHYSICALLY VALIDATED.

## 7. Stop condition
D8 reviewer simulation NOT started at manuscript completion, per instruction. Work stopped at manuscript + supporting files. (D8 was subsequently authorized on 2026-08-28.)

## 8. Project-status sync (2026-08-28, supersedes the status remark formerly in §7)
Per user instruction of 2026-08-28: **Software Prototype = BUILT — THEORETICAL RESEARCH PROTOTYPE; NOT PHYSICALLY VALIDATED; ZERO RELEASED KEY.** The Q-Orbit Theoretical Analysis Console (V0.17 Prototype) was built separately and verified; it is not physical validation, not experimental validation, not implementation security, and not deployed QKD hardware. Scientific Manuscript V1.0-RC2 = COMPLETE. Phase 1 = COMPLETE (gate: CONDITIONAL PASS — READY FOR PHASE 2 WITH DISCLOSED LIMITATIONS). Website = no verified final site exists; NOT marked complete. REQ-01…05 remain OPEN. Current authoritative project state: CFR v1.2 §7.

## 9. RC2 → RC3 (D8 simulated peer review corrections, 2026-08-28)

Basis: Q-Orbit_D8_Reviewer_Report.md; dispositions in Q-Orbit_D8_Response_to_Reviewers.md. Reviewers: R1 quantum-cryptography theorist (ACCEPTABLE-THEORETICAL-DRAFT, 0 required); R2 experimental QKD / device security (MAJOR-REVISION, 2 required); R3 scientific method / reproducibility (MAJOR-REVISION, 4 required). All six required corrections were verified against the controlled record before application; no canonical number, sign, or scientific conclusion changed.

Required-correction fixes:
- C4-01 (R3-R1) §11.2: false quantifier "an order of magnitude more than any other tested parameter per unit step" replaced with the true ratio "about 2.3 times the next-largest per-step response" (Table 4: 0.08215788925285143 / 0.035673639848324994 = 2.30).
- C4-02 (R3-R2) §19/§7.6/Table 7 row 13: duplicate reference record removed (former #42, arXiv:2503.06328 — same work as Quantum 10, 2044 (2026)); author list corrected (Nahar, Tupkary, Lütkenhaus); §7.6 double citation collapsed to the single published record; reference list renumbered 43–77 → 42–76 (76 entries).
- C4-03 (R3-R3) Figures 4–5 captions: non-sanctioned token "documentation" removed; captions now use the closed QO-FIGSPEC-001 vocabulary ("theoretical — …; not measured"). Corrects the stale V-5.3 record (§4).
- C4-04 (R3-R4) §18: deterministic PDF-repair function documented (NBSP-class blank-line removal; CRLF restoration incl. trailing CRLF for artifacts 02/04/05/06/07/10; LF for 08; 03 direct), with the third independent reproduction (D8 Reviewer 3) recorded.
- C4-05 (R2-R1) §6, §12, §16 item 7, §17, §20 claim C25: open-gap register corrected from a two-item rendering to the four-item D5 §6 register (correlated afterpulsing; rate-dependent yields; full composable integration of certification (Tan–Nahar 2026 App. C); complete correlated-memory detector treatment); the certification-composability caveat is now disclosed at the union-bound adoption point (§9.4).
- C4-06 (R2-R2) §11.3 "21 of 41 columns" statistic registered: CFR N-28 + ledger CL-66 (EV-1b; recomputed 2026-08-28, independently reproduced by D8 Reviewer 3).

Minor fixes applied: C4-07 §6 paragraph break restored (R1-m7). C4-08 §9.2: ½-cap worst-case justification stated (R1-M3/m4). C4-09 §9.3: α₁ weight-four clarification (R1-m3); β=ln(21/ε_s) clause tagged EV-1c/EV-4 (R1-m8). C4-10 §10.3/§18: "central-difference slope" → "normalized symmetric finite difference per declared step" (R1-m2). C4-11 §11.3: explicit argmax subset argument for the 568 upper envelope (R3-Q3) and screen-scope sentence — the screen probes only count-model engineering scalars, not the fifteen effect classes (R2-m2). C4-12 §12: Table 7 row 7 qualifier "(above the linear regime; strictest resolution)" restored per D5 (R2-m5); PARTIAL-SCALAR-STRESS-ONLY sub-label note added to "Reading of the table" (R2-m4). C4-13 Figure 3 caption: "shown in a side panel" per figspec (R3-m5). C4-14 §13: "shrink the penalty class" → "shrink the fluctuation-induced finite-key losses", with the fixed 256.57-bit-class penalty stated as invariant; D6 §6 anti-fabrication guard pointer added (R1-m1, R2-m3). C4-15 §14.1: ε_char restatement now points to Eq. (5) (R3-m4). C4-16 §20: legend notes OPERATIONALLY-UNSUPPORTED (R3-m2); C23 clarified to "proof-profile-forming candidates" (R2-m1); C25 four-gap register (with C4-05). C4-17 ref 3 (Ben-Or et al.) year parenthesized per house style (R3-m1). C4-18 ledger: CL-22/CL-32 section pointers corrected (R3-m3); ledger header bumped to v1.1 (applies to RC3, CFR v1.2).

Items answered without text change (see Response to Reviewers): R1 Q1–Q2 (γ formula and λ_EC closed form — gated by REQ-01 / artifact 01 evidence class; EXPLICIT LIMITATION), R1 Q4–Q5, R2 Q1–Q4, R3 Q1–Q2, R3 Q4–Q5. The D4 §4 wording parallel to C4-14 is logged for a future D4 amendment (Phase 1 record not rewritten).

- C4-19 (R2-Q3) §19 preamble: provenance clause added for entry 69 (Wiesemann et al., Quantum 10, 2037, 2026) — attribution rests on the Phase 1 red-team's independent live bibliographic check under finding C1 (2026-08-27).
- C4-20 (R2-Q4) §12 "Reading of the table": clarifying clause added — for the two USB rows (6, 11) no proof-profile route out of the exclusion posture is promised; certified operating bounds are the standing fallback unless new proof machinery appears.

QA after RC3: canonical values, signs, margin identity, four-gap consistency, reference count (76), and caption vocabulary re-verified; see Q-Orbit_D8_Response_to_Reviewers.md verification appendix.
