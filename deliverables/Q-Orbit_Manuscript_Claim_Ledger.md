# Q-Orbit — Manuscript Claim Ledger

**Document ID:** QO-LEDGER-001 | **Version:** 1.1 (D8 corrections) | **Date:** 2026-08-28 (v1.0: 2026-08-27)
**Applies to:** Q-Orbit manuscript V1.0-RC3 (Deliverable D7; RC2 superseded by the D8 review corrections). The manuscript's §20 appendix is a condensed rendering of this ledger; this document is authoritative.
**Boundary:** THEORETICAL / NOT PHYSICALLY VALIDATED. Every claim below is a theoretical/computational claim about a frozen software fixture and its documentation. No claim in this ledger is physical, device-security, mission, procurement, or deployment evidence. Numerical reproduction is not validation.
**Source policy:** numbers are drawn only from the Canonical Facts Record (CFR v1.2, QO-CFR-001), the Phase 1 Canonical Audit (D1/D2), the Device-Imperfection Mapping (D5), the Proof-Profile Comparison (D4), the Literature and Proof Review (D3), the V0.17-TA1 Architecture Specification (D6), the Phase 1 Closure Record, and the controlled artifacts at `/mnt/agents/output/extracted/v016/` (01–10). Nothing outside this package was used.

---

## 1. Controlled claim labels (definitions)

| Label | Meaning |
|---|---|
| NUMERICALLY-VERIFIED | Recomputed bit-exactly (or to stated tolerance) from hash-verified controlled artifacts; deterministic model output, not physical measurement. |
| THEORETICALLY-SUPPORTED | Follows from a verified mathematical structure / published proof (e.g. Lim et al. 2014, Sidhu et al. 2022); transcribed faithfully into the fixture; validity conditional on the proof's own assumptions. |
| LITERATURE-SUPPORTED | Supported by the verified citation record (D3); context only, never device evidence. |
| ASSUMPTION-DEPENDENT | Conditional on stated model assumptions (perfect phase randomization, IID pulses, exact intensities, squashing, no side channels, point parameters) that are currently unmeasured. |
| CHARACTERIZATION-REQUIRED | Cannot be instantiated numerically until physical characterization exists; symbolic only. |
| PHYSICAL-VALIDATION-REQUIRED | Would require an experimental/physical validation activity that has not been performed. |
| OPERATIONALLY-UNSUPPORTED | No artifact supports an operational reading; any operational interpretation is out of scope of the evidence. |
| BLOCKED | Claim class is prohibited/fail-closed; unattainable in current scope (EV-10); gated by an open REQ item or by the disclosed-limitations register. |

**Evidence classes (CFR v1.1):** EV-1a HASH-VERIFIED-ARTIFACT · EV-1b CSV-RECOMPUTED · EV-1c HASH-CHAIN-LISTED · EV-2 INVARIANT · EV-3 CROSS-ARTIFACT · EV-4 SINGLE-ARTIFACT · EV-5 LITERATURE-SUPPORTED · EV-9 UNVERIFIED-PENDING-CONTROLLED-INPUTS · EV-10 BLOCKED.

---

## 2. Claim ledger

Column key — Label: NV = NUMERICALLY-VERIFIED, TS = THEORETICALLY-SUPPORTED, LS = LITERATURE-SUPPORTED, AD = ASSUMPTION-DEPENDENT, CR = CHARACTERIZATION-REQUIRED, PVR = PHYSICAL-VALIDATION-REQUIRED, OU = OPERATIONALLY-UNSUPPORTED, BL = BLOCKED. Manuscript sections refer to the actual V1.0-RC2 section numbering (QA-corrected 2026-08-27 — verifier finding 5.1: an earlier revision of this ledger carried the superseded rendering-B numbering; all pointers re-mapped and verified against the RC2 section table).

| Claim ID | Claim (concise) | Manuscript section | Label | Evidence | Notes / disclosures |
|---|---|---|---|---|---|
| CL-01 | Baseline optimal half-window is 102 s (205 sample bins; edge elevation 30.4813547009598°) | §11.1 | NV | CFR N-01; EV-1a (artifact 03) + EV-1b (artifact 02) | Deterministic model output on the frozen 693-sample loss curve. |
| CL-02 | Baseline signed key margin M = 41,338.62418456675 bits | §9.3, §11.1 | NV | CFR N-02; EV-1a; margin identity recomputed bit-exact (diff 0.0) | Upper bound w.r.t. error-correction efficiency (see CL-08). Conditional computation; no security claim. |
| CL-03 | Floored candidate key = 41,338 bits = floor(max(M,0)) | §11.1 | NV | CFR N-03; EV-1a + EV-2 | Floor convention verified on baseline and on all 1,681 grid rows. Not a released key (see CL-56). |
| CL-04 | X-basis QBER = 0.017422686665352745 (= m_X/n_X, bit-exact) | §11.1 | NV | CFR N-04; EV-1a + recomputation | Model QBER, not measured. |
| CL-05 | Phase-error bound φ_X = 0.09270161340569935 | §9.3, §11.1 | NV | CFR N-05; EV-1a | 0.5 cap not hit at baseline; binding in 1,088/1,681 grid rows (EV-1b). |
| CL-06 | Single-photon yield estimate s_X,1 = 183,803.04893680647 | §11.1 | NV | CFR N-06; EV-1a + EV-3 (REG-007, AUD-016) | Decoy-estimator output of the frozen fixture. |
| CL-07 | Baseline count observables: n_X = 492,818.0901525894; n_Z = 48,555.17200782972; m_X = 8,586.215167746126; s_X,0 = 5,047.784882329125; s_Z,1 = 12,007.470453438744; v_Z,1 = 845.9615478747239 | §11.1 | NV | CFR N-16…N-20; EV-1a (artifact 03) | s_X,0 single-artifact within the run summary (EV-1a record); all feed the bit-exact margin identity. |
| CL-08 | λ_EC = 65,385.40180119235 bits (binomial-ppf logM construction) | §9.3 | NV | CFR N-21/N-27; EV-1a + EV-2 | Corresponds to ideal f_EC = 1 leakage accounting; realistic f_EC > 1 ⇒ all margins/keys are UPPER BOUNDS w.r.t. EC efficiency. f_EC ≈ 1.16 is literature context only (EV-5), never a Q-Orbit value. |
| CL-09 | Finite penalty 6·log2(21/ε_s)+log2(2/ε_c) = 256.5669430839006 bits | §9.3 | NV | CFR N-22; EV-1a | Pair (ε_s=1e-10, ε_c=1e-9) reproduces it bit-exactly but is one of infinitely many solutions; individual epsilons EV-9 (gated by REQ-01). |
| CL-10 | Probability-weighted mean photon number = 0.62400964 | §11.1 | NV | CFR N-23; EV-1a | Constituent p, μ live in the missing V0.6 manifest (EV-9; REQ-01). |
| CL-11 | Grid partition: 568 positive / 1,113 nonpositive / 1,681 total | §11.3 | NV | CFR N-07; EV-1b + EV-1a + EV-2 | **UPPER-ENVELOPE** quantity: half-window re-optimized per point (CL-22); the positive count at any fixed window is ≤ 568. Deterministic screen partition, not a probability. |
| CL-12 | Positive grid fraction = 0.33789411064842356 (= 568/1,681 exactly in binary64) | §11.3 | NV | CFR N-08; EV-1b + EV-1a + EV-2 | Same upper-envelope disclosure as CL-11. Not the fraction of any fixed-window configuration; never a probability, reliability, availability, or yield. |
| CL-13 | Grid median signed margin = −2,624.946810258186 bits | §11.3 (and abstract) | NV | CFR N-09 + C-01; EV-1b + EV-1a + EV-2 | **NEGATIVE.** Sign forced by the partition invariant (1,113 nonpositive of 1,681). Rendering A's positive table value was a sign flip, corrected (C-01). Never render positive. |
| CL-14 | Grid minimum signed margin = −3,828.414517626367 bits (cell SCR-1681 at (2e-6, 0.015), half-window 1, φ capped at 0.5) | §11.3 | NV | CFR N-10 + C-02; EV-1b + EV-1a + EV-2 | **NEGATIVE.** Rendering A's positive minimum was internally inconsistent with the 568/1,113 split; corrected (C-02). Never render positive. |
| CL-15 | Grid maximum signed margin = +142,540.7481180454 bits (cell SCR-0001 at (1e-7, 0.003), half-window 221) | §11.3 | NV | CFR N-11; EV-1b + EV-1a | The only positive extremal statistic; never disputed. |
| CL-16 | Eight normalized local responses (rank order): additional loss −0.08215788925285143; detector efficiency +0.035673639848324994; repetition rate +0.01946358671353013; extraneous count −0.016195046443390957; intrinsic QBER −0.006768764678164013; signal intensity −0.005861881586843529; weak decoy −0.0007369594599526124; afterpulse −0.0006325501181450469 | §11.2 | NV | CFR N-12; EV-1b (arithmetic re-verified ≤1e-12) + EV-1c | Artifact 06 claim_class: LOCAL-NUMERICAL-RESPONSE-NOT-PHYSICAL-SENSITIVITY. Modeled responses of the fixture, not measured device sensitivities. Windows re-optimize at perturbation points (e.g. loss ±0.1 dB → 104/101 s). |
| CL-17 | Zero-key frontier set: 16 rows (8 parameters × 2 sides), 10 CROSSING-FOUND, 6 NO-CROSSING-IN-DECLARED-DOMAIN; e.g. loss HIGH 14.507927510764345 dB; extraneous HIGH 8.958206093312436e-07; intrinsic-QBER HIGH 0.013335017073411072 | §11.4 | NV | CFR N-24; EV-1c + EV-3 (07 ↔ audit 08 AUD-016-005/006) | Software-fixture frontiers only; each row carries "not a hardware acceptance threshold". Not device tolerance data. |
| CL-18 | Regression suite: 12 tests, 12 PASS (REG-001…012) | §10.6 | NV | CFR N-13; EV-1c (04) + EV-1a (03) + EV-3 (08) | Includes +20 dB negative test, grid identity, grid partition, 2 boundary invariants. Computational verification, not physical. |
| CL-19 | Independent package audit: 20 checks, 20 PASS (AUD-016-001…020) | §10.6 | NV | CFR N-14; EV-1c (08) | All 20 payloads cross-consistent with artifacts 03/04/05/06/07. |
| CL-20 | V0.13 independent comparison: 50 locked vectors / 971 metrics, zero open numerical discrepancies | §10.6 | NV | CFR N-25; EV-3 (V0.13 record ↔ manuscript §3.6); underlying JSON EV-9 | The V0.13 JSON itself is not in the bundle (EV-9); claim rests on cross-artifact wording, not re-verification. All 12 V0.13 limitations remain open. |
| CL-21 | Window rule: integer half-window sweep with argmax objective, smaller window breaks ties; observed extremes max 221 s (cross-artifact), min 1 s (artifact 05 only; 07's minimum is 67 s) | §10.2 | NV (rule/extremes) / AD (1–221 s bound) | CFR B-04; EV-3 (rule, max window) + EV-4 (min window) + EV-9 (config bound) | The 1–221 s sweep bound is a controlled-input value not in the bundle (REQ-01); stated by corroboration only. |
| CL-22 | Half-window is re-optimized per evaluated point in sensitivity, screen, and frontier computations | §10.2, §11.2–11.4 | NV | CFR N-26; EV-1b (06 window columns; 05 optimized_half_window_s) | Basis of the upper-envelope disclosures in CL-11/CL-12. |
| CL-23 | Screen construction: 40-point linspace over each V0.7 range ∪ baseline → 41 unique values per axis → 1,681 points; ranges are engineering bounds, not distributions | §11.3 | NV | CFR B-05; EV-1c (01) + EV-1b (05); axis reconstruction exact | Axes: extraneous 1e-7…2e-6 ∪ {5e-7}; intrinsic QBER 0.003…0.015 ∪ {0.005}. Range provenance vs the V0.7 register is EV-9 (REQ-03). |
| CL-24 | Key convention: per-pass signed margin retained; candidate key = floor(max(margin,0)) | §9.3 | NV | CFR B-06; EV-1c + EV-1a | Signed margins are never reported as keys without the floor/max step. |
| CL-25 | Baseline channel/model parameters: additional_system_loss_db = 13.0 dB; rep rate 1e8 Hz; p_ec = 5e-7; p_ap = 1e-3; intrinsic QBER 0.005; detector multiplier 1.0 | §9.3 | NV | CFR B-07; EV-1b (06 baseline column) + EV-1a (03 baseline block) | Assumed constants, not measured values (see CL-45, CL-46). |
| CL-26 | Protocol profile: efficient-BB84, WCP downlink, 1 signal + 2 decoy intensities (one vacuum), finite-key per Sidhu-family fixture | §8, §9.3 | NV | CFR B-03; EV-3 + model source inspection | Fixed protocol; no protocol change is claimed anywhere. |
| CL-27 | Boundary states: physical_characterization NOT-EXECUTED; physical_validation NOT-EXECUTED; hardware_in_loop BLOCKED; laser INHIBITED; tabuk_run NOT-RUN/NONE; key_release QUARANTINED/ZERO-RELEASED; release PRIVATE-BLOCKED | §1, §16 | NV | CFR B-01/B-02; EV-1a (03) + EV-3 (08 AUD-016-020) | Zero physical characterization; zero hardware-in-loop; no experimental run; no released secret key. |
| CL-28 | Margin equation M = s_X,0 + s_X,1·[1 − h2(φ_X)] − λ_EC − 6·log2(21/ε_s) − log2(2/ε_c) is the Lim et al. 2014 structure in the Sidhu et al. 2022 satellite fixture lineage | §9.3 | TS | D3 §2/§6 (Lim PRA 89, 022307; Sidhu npj QI 8, 18 — VERIFIED); CFR N-02 (bit-exact transcription); EV-5 + EV-2 | Transcription faithful; the equation's validity inherits all fixture assumptions (CL-46). |
| CL-29 | The "21" secrecy budget: 6·log2(21/ε_s) decomposes into 21 one-sided estimation/sampling/hashing terms with effective deviation parameter ε_s/21 | §9.3 | TS | D6 §4.2 (Lim 2014 supp. Eqs. (11)–(14), verified); D3 §6 | The 21-split validator accepts the fixture's internal β = ln(21/ε_s) form; unscaled ε_s as effective deviation is rejected. |
| CL-30 | Hash-chain status: 9 of 10 controlled artifacts content-hash-verified (2 direct, 7 after deterministic PDF-repair); artifact 01 (model source) compiles but is not byte-reconstructible | §10.6 | NV | CFR §0; audit D1 §A.1; EV-1a/EV-1c | Artifact 01 carries EV-4/EV-1c; no claim of byte-level hash verification may be made for it. |
| CL-31 | Controlled-input index: 17/17 controlled-input hashes match the verified manifest; bundle loss file 02 is byte-identical to the V0.6 controlled input FS_loss_XI0.csv | §10.6 | NV | CFR §0; EV-3 (10 ↔ 09) | Independent corroboration of AUD-016-015. |
| CL-32 | Frozen loss curve: 693 samples, t = +346 → −346 s strictly decreasing, elevation/efficiency mirror-symmetric about t = 0, t = 0 present | §8, §10.1 | NV | CFR §0 row 2; EV-1a (02 after deterministic repair) | "Monotonic in | t | " is imprecise; correct description is monotone in t, V-shaped in | t | . |
| CL-33 | Profile A (hardened Lim/Sidhu fixture + assumption ledger + statistics upgrade) is the V0.17-TA1 shipping proof profile | §13 | AD | D4 §4 recommendation 1; D6 §2/§6 | Recommendation, not a security result. All Profile A outputs remain CONDITIONAL-COMPUTATION-labeled while characterization is absent. |
| CL-34 | Profile B (Tupkary et al., arXiv:2601.18035, 2026) is the designated V0.18+ upgrade-path anchor, with the unified source-imperfection framework (Optica Quantum 3, 525, 2025) for joint flaw coverage | §13 | AD / LS | D4 §4 recommendation 2; CFR L-09; EV-5 | **PREPRINT-LABELED:** the anchor is a preprint under review; an earlier "published as Quantum 10, 2037" claim was removed as unverified (fail-closed, red-team C1). Its own abstract frames imperfection integration as future work (F-03 amendment). |
| CL-35 | Target layered architecture: Layer 0 frozen V0.16 fixture → Layer 1 hardened analytic finite-key (Profile A / V0.17) → Layer 2 implementation-security proof extensions (Profile B / V0.18+) → Layer 3 characterization/certification composition | §13 | AD | D4 §4 recommendation 5; D6 §11 | Layer 3 execution is BLOCKED pending characterization; no layer emits a certified-security claim today. |
| CL-36 | Security-budget composition: ε_total = ε_c + ε_s + ε_char (+ ε_auth), with ε_char ≡ Σ_j δ_j defined once; only joint bounds Pr[approve ∧ insecure] ≤ ε_char + ε_protocol are valid claim language | §9.4, §14 | TS | D6 §4.1–4.3; Tan–Nahar PRX Quantum 7, 020342 (2026) — VERIFIED | Conditional-on-approval language is prohibited. ε_char and ε_auth are symbolic (CL-37). |
| CL-37 | Characterization-budget and symbolic-parameter claims (Δ_PR, (ℓ,ξ) bounds, δ_spf, I_iso/μ_out, η_d maps, afterpulse kernel, ε_char, ε_auth, ε_varlen, aging envelopes) | §14, §18 | CR | D6 §3, §4.1, §5 | All entries `SYMBOLIC ONLY — CHARACTERIZATION REQUIRED`; no numerical value is assigned to any device parameter; the architecture is a specification, not an authorization to measure. |
| CL-38 | MDI-QKD is architecturally excluded from the Q-Orbit proof path (no relay between two senders in a direct downlink; ground receiver is the party whose trust is at issue) | §13 | TS | D4 §2 verdict | Architectural argument; MDI logged as an alternative concept only. |
| CL-39 | Effect 1 (incomplete phase randomization): UNMAPPED-PROOF-REQUIRED as-is; PROOF-PROFILE-CANDIDATE exists (Nahar PR Applied 20, 064031, 2023) gated by phase-PDF characterization | §12 | CR | D5 §2 row 1 | No phase measurement exists (CFR B-01). |
| CL-40 | Effect 2 (pulse-to-pulse encoding correlations): UNMAPPED-PROOF-REQUIRED + UNMAPPED-CHARACTERIZATION-REQUIRED | §12 | CR | D5 §2 row 2 | Breaks IID/Serfling statistics; martingale route (Azuma/Kato) identified; no correlation-length data exist. |
| CL-41 | Effect 3 (intensity correlations): PROOF-PROFILE-CANDIDATE (Zapatero 2021; Sixto 2022; Pereira QST 2025) gated by UNMAPPED-CHARACTERIZATION-REQUIRED | §12 | CR | D5 §2 row 3 | TH-PAR-004/005 touch only the adjacent independent-fluctuation effect (PARTIAL-SCALAR-STRESS-ONLY). |
| CL-42 | Effect 4 (state-preparation flaws, basis-dependent part): UNMAPPED-PROOF-REQUIRED; PROOF-PROFILE-CANDIDATE exists (loss-tolerant / unified framework); basis-independent component folded into TH-PAR-008 is PARTIAL-SCALAR-STRESS-ONLY | §12 | CR | D5 §2 row 4 | GLLP Δ bolt-on covers only basis-independent flaws; rejected as sufficient coverage (D4 §5). |
| CL-43 | Effect 5 (source leakage / Trojan horse): BLOCKING while isolation unmeasured; passive component UNMAPPED-SECURITY-BUDGET + UNMAPPED-CHARACTERIZATION-REQUIRED | §12 | BL (active) / CR (passive) | D5 §2 row 5 | Strictest resolution governs. No security claim may be emitted while leakage/isolation fields are empty (D5 §4 watchlist #8). |
| CL-44 | Effect 6 (dead time / recovery): UNMAPPED-SECURITY-BUDGET (strictest of UNMAPPED-MODEL-REQUIRED + USB); TH-PAR-002 touch PARTIAL-SCALAR-STRESS-ONLY | §12 | CR | D5 §2 row 6 | Dead-time attack literature verified; adversarial treatment partial (preprint-level). |
| CL-45 | Effect 7 (saturation): BLOCKING above the linear regime (detector-control class entry); UNMAPPED-MODEL-REQUIRED (engineering) | §12 | BL | D5 §2 row 7 | Fixture count model is linear in η; rollover structurally inexpressible. |
| CL-46 | Effect 8 (detector timing jitter): UNMAPPED-CHARACTERIZATION-REQUIRED (proof machinery exists; inputs unmeasured); TH-PAR-002 touch PARTIAL-SCALAR-STRESS-ONLY | §12 | CR | D5 §2 row 8 | Time-shift enabler if inter-detector/basis asymmetric. |
| CL-47 | Effect 9 (history-dependent afterpulsing): UNMAPPED-PROOF-REQUIRED; TH-PAR-007 scalar is equilibrium-IID-marginal only (PARTIAL-SCALAR-STRESS-ONLY) | §12 | CR | D5 §2 row 9 | Detector-side correlated-afterpulse finite-key proof is a genuine open literature problem (D5 §6.1); worst-case-IID pessimism theorem must not be assumed. |
| CL-48 | Effect 10 (detection-efficiency mismatch): PROOF-PROFILE-CANDIDATE gated by UNMAPPED-CHARACTERIZATION-REQUIRED; TH-PAR-002 touch PARTIAL-SCALAR-STRESS-ONLY | §12 | CR | D5 §2 row 10 | Canonical detector-side proof gap; bounded-mismatch proofs need measured η_min/η_max. |
| CL-49 | Effect 11 (wavelength-dependent response): UNMAPPED-SECURITY-BUDGET (out-of-band response is an unmodeled Eve→receiver channel) | §12 | CR | D5 §2 row 11 | Remedy is certified spectral filtering as a device assumption — a security-budget item, not a proof-profile swap. |
| CL-50 | Effect 12 (polarization-dependent response): PROOF-PROFILE-CANDIDATE + UNMAPPED-CHARACTERIZATION-REQUIRED | §12 | CR | D5 §2 row 12 | Common-mode-only is a measured property, not an assumption. |
| CL-51 | Effect 13 (detector memory, general cross-pulse effects): UNMAPPED-PROOF-REQUIRED | §12 | CR | D5 §2 row 13 | Complete correlated-memory detector treatment for this fixture is absent from verified literature (D5 §6.4). |
| CL-52 | Effect 14 (characterization uncertainty): UNMAPPED-CHARACTERIZATION-REQUIRED (definitional) | §12 | CR | D5 §2 row 14 | At zero characterization every fixture output (incl. CFR N-02) is a conditional computation supporting no security claim. |
| CL-53 | Effect 15 (aging / cross-instance drift): UNMAPPED-CHARACTERIZATION-REQUIRED | §12 | CR | D5 §2 row 15 | Parameters UNCHARACTERIZED beyond the last characterized epoch absent a characterized aging model. |
| CL-54 | Master-matrix verdict: 0 of 15 effects MAPPED-IN-CURRENT-FIXTURE; 5 rows UNMAPPED-PROOF-REQUIRED (1, 2, 4, 9, 13); 2 rows BLOCKING (5, 7); 2 rows UNMAPPED-SECURITY-BUDGET (6, 11); remaining 6 rows PROOF-PROFILE-CANDIDATE gated (3, 10, 12) or UNMAPPED-CHARACTERIZATION-REQUIRED (8, 14, 15) | §12 | CR | D5 §7 | Red-team C5 correction already applied in D5 (row-4 count and row-11 USB label). Fixture's own 16-row/7-unmapped register (AUD-016-010) row-level verification is REQ-05-gated. |
| CL-55 | Any operational reading of the screen outputs (e.g. "33.79% of conditions yield key" as availability/yield/reliability) | §11.3, §15 | OU | CFR N-07/N-08 disclosures; Closure Record §6.3 | The fraction is an upper-envelope deterministic screen quantity under per-point window re-optimization; never a probability, reliability, availability, yield, or mission-success figure. |
| CL-56 | Released secret key / key availability | §1, §16, §20 | BL | CFR B-01/B-02; key_release_status QUARANTINED/ZERO-RELEASED (EV-1a + EV-3) | Prohibited-claims register; EV-10. No key exists to release. |
| CL-57 | Physical validation / experimental confirmation of any model output | — | BL | CFR B-01/B-02; Closure Record §6.6; EV-10 | PVR-class activity not performed; gated by characterization campaigns that do not exist. |
| CL-58 | Implementation security / certified device security | — | BL | CFR §4; D5 §7; EV-10 | Zero characterization ⇒ every security-relevant output is conditional; effects 5 and 7 are BLOCKING. |
| CL-59 | Mission success probability | — | BL | CFR §4; Closure Record §6.6; EV-10 | Prohibited-claims register. |
| CL-60 | QKD availability (site, link, or service) | — | BL | CFR §4; EV-10 | Prohibited-claims register; see CL-55. |
| CL-61 | Tabuk performance (tabuk_run_status NOT-RUN/NONE) | — | BL | CFR B-02, §4; EV-1a + EV-10 | No run exists or is planned in scope. |
| CL-62 | Hardware readiness | — | BL | CFR §4; EV-10 | Prohibited-claims register. |
| CL-63 | Procurement tolerance | — | BL | CFR §4; EV-10 | Prohibited-claims register; frontier crossings are explicitly not hardware acceptance thresholds (CL-17). |
| CL-64 | Deployability | — | BL | CFR §4; EV-10 | Prohibited-claims register. |
| CL-65 | Field readiness | — | BL | CFR §4; EV-10 | Prohibited-claims register. |

**Ledger row count: 65 claims (CL-01…CL-65).**

---

## 3. Prohibited-claims register (CFR §4, restated, binding)

The following claim classes are prohibited in every Q-Orbit artifact and downstream document: **mission success probability; QKD availability; Tabuk performance; implementation security; certified device security; procurement tolerance; hardware readiness; deployability; field readiness; released secret key.**

| Item | Statement |
|---|---|
| Violation check | **Package-wide sweep result: ZERO violations.** Two independent hostile red-team rounds (Round 1: C1–C16; Round 2, Agent G five-persona final review: F-01…F-09) — cumulative 25/25 findings dispositioned FIXED with verification; Round 2's prohibited-claims sweep found zero violations; 0 BLOCKING OPEN ISSUE remains. Source: Phase 1 Closure Record §5; Final Red-Team Report §1/§7. |

---

## 4. Open required inputs (REQ register; all OPEN at 2026-08-27)

| Blocker ID | Missing artifact (hash-recorded) | Status | What it gates |
|---|---|---|---|
| REQ-01 | `controlled_inputs/v0.6/Q-Orbit_CASE-S1_Run_Manifest_V0.6.json` (0714d6e7…) | OPEN | End-to-end re-execution of the supplied model; individual ε_s/ε_c, intensities, probabilities, channel-config values (gates CL-09, CL-10, CL-21 full closure). |
| REQ-02 | `controlled_inputs/v0.6/CASE-S1-REF-001_Baseline_Run_V0.6.json` (3673acf4…) | OPEN | Direct confirmation of the V0.6 expected-baseline fixture used by REG-001…007 (CL-18). |
| REQ-03 | `controlled_inputs/v0.7/Q-Orbit_CASE-M1_Parameter_and_Provenance_Register_V0.7.csv` (fb07b900…) | OPEN | Verification that screen ranges (1e-7…2e-6; 0.003…0.015) are exactly the V0.7 register values; provenance of the 1–221 s sweep bound (CL-21, CL-23). |
| REQ-04 | Original (non-PDF) bytes of `Q-Orbit_Kimi_Core_Research_Input.zip` | OPEN | Byte-level hash closure on artifacts 1, 2, 4–8, 10 (upgrades CL-30's residual EV-1c item). |
| REQ-05 | Five `data_processed/` registers (28b9fef2…, 9907aa34…, bc864414…, a008f748…, fb9260f3…) | OPEN | Row-level verification of grid boundary, the 16-row/7-unmapped proof mapping (CL-54), claim/gate registers. |

No REQ item is closed by inference. The former computational-input blocker ("V0.16 computational package absent") is the only CLOSED entry — superseded by the received and hash-verified 10-artifact bundle (Closure Record §3).

**D8 additions (2026-08-28):**

| CL-66 | 21 of 41 extraneous-count columns contain no positive cell (screen column structure) | §11.3 | NV | CFR N-28; EV-1b (recomputed from artifact 05 on 2026-08-28 by the orchestrator; independently reproduced by D8 Reviewer 3) | Deterministic screen-structure statistic, not a probability; registered during D8 (Reviewer 2 finding M2). |
| CL-67 | Four genuine open proof problems per D5 §6: detector-side correlated afterpulsing in finite-key decoy proofs; rate-dependent yields inside the decoy method; full composable integration of certification (Tan and Nahar, 2026, App. C); complete correlated-memory detector treatment for this fixture class | §6, §12, §16 item 7, §17, §20 C25 | LS | D5 §6; Tan and Nahar (2026) | Register corrected from the two-item rendering to the four-item controlled register during D8 (Reviewer 2 finding M1); union-bound adoption point discloses the composability caveat (§9.4). |

*End of QO-LEDGER-001.*
