# Q-Orbit — Canonical Facts Record (CFR)
**Document ID:** QO-CFR-001 | **Version:** 1.2 (Phase 2 state sync) | **Date:** 2026-08-28 (v1.1: 2026-08-27, Phase 1 closure reconciliation)
**Purpose:** Single source of truth for every factual/numerical claim in the Q-Orbit package. Any downstream document (manuscript V1.0-RC2, website, presentation) must draw numbers ONLY from this record, with the stated evidence class.

## Evidence classes
- **EV-1a HASH-VERIFIED-ARTIFACT** — extracted artifact bytes reproduce the declared SHA-256 exactly.
- **EV-1b CSV-RECOMPUTED** — recomputed directly from the supplied generated CSV.
- **EV-1c HASH-CHAIN-LISTED** — artifact's declared SHA-256 is listed in the hash-verified SHA256SUMS manifest (content byte-verification not possible from PDF round-trip).
- **EV-2 INVARIANT** — determined by mathematical invariant over stated controlled counts.
- **EV-3 CROSS-ARTIFACT** — identical across ≥2 independent controlled artifacts.
- **EV-4 SINGLE-ARTIFACT** — supported by exactly one controlled artifact (content read; hash-chain-listed only); no independent cross-check available in the bundle.
- **EV-5 LITERATURE-SUPPORTED** — verified published/preprint literature record; context only, never device evidence.
- **EV-9 UNVERIFIED-PENDING-CONTROLLED-INPUTS** — requires artifacts not present in the 10-file bundle.

**Alias note (red-team F-02):** the Canonical Audit header's "EV-1 HASH-VERIFIED-ARTIFACT" and D3's "EV-1/EV-2/EV-3 classes" denote this record's EV-1a/1b/1c, EV-2, EV-3 classes respectively.
- **EV-10 BLOCKED** — unattainable in current scope.

## 0. Artifact-access ledger (user-mandated confirmation)
All ten controlled artifacts were located and read from `/mnt/agents/temp/Q-Orbit_Kimi_10_Critical_Files_PDF_Bundle.pdf`, extracted to `/mnt/agents/output/extracted/v016/`:

| # | Artifact | Accessed | Byte-hash vs declared | Notes |
|---|----------|----------|-----------------------|-------|
| 1 | Python finite-key model (`01_…_v0_16_ta1.py`) | YES — 608 lines | Not byte-reconstructible from PDF (ambiguous blank lines); **compiles**; declared hash listed in verified manifest | Static inspection OK; end-to-end execution blocked by missing controlled inputs (REQ-01…03) |
| 2 | `02_FS_loss_XI0.csv` | YES — 693 samples, t=+346→−346 s (strictly decreasing; efficiency/elevation mirror-symmetric about t=0), t=0 present | **MATCH after deterministic PDF-repair** (blank-line removal + CRLF); byte-identical to the V0.6 controlled loss file per manifest | Structure and content fully parsed |
| 3 | `03_…_Theoretical_Run_Summary.json` | YES | **MATCH** (4c9d7821…) | Cryptographically verified ground truth |
| 4 | `04_…_Regression_Tests.csv` | YES — 12 rows | **MATCH after PDF-repair** | Content fully parsed |
| 5 | `05_…_Two_Parameter_Screen.csv` | YES — 1,681 unique rows | **MATCH after PDF-repair** | Independently recomputed below |
| 6 | `06_…_Local_Sensitivity.csv` | YES — 8 rows | **MATCH after PDF-repair** | Arithmetic re-verified |
| 7 | `07_…_Zero_Key_Frontier.csv` | YES — 16 rows | **MATCH after PDF-repair** | 10 crossings confirmed |
| 8 | `08_…_Final_Audit_V0.16-TA1.json` | YES — 20 checks, 20 PASS | **MATCH after PDF-repair** (LF) | Content fully parsed |
| 9 | `09_SHA256SUMS.txt` | YES — 64 entries | **MATCH** (7708e49f…) | Hash manifest itself verified |
| 10 | `10_…_Controlled_Input_Index.csv` | YES — 17 controlled inputs | **MATCH after PDF-repair** | All 17 HASH-RECORDED; 17/17 cross-listed in 09 |

**Hash-chain status (upgraded by Agent A independent audit, 2026-08-27):** 9 of 10 artifacts are **content-hash-verified**. Artifacts 03 and 09 match declared hashes directly. Artifacts 02, 04, 05, 06, 07, 10 match their declared SHA-256 **byte-exactly after deterministic repair of PDF round-trip damage** (removal of page-break blank lines; CRLF restoration for csv-writer files; LF for 08). Artifact 08 matches after blank-line removal. Only artifact 01 (Python source) is not byte-reconstructible (ambiguous blank lines) — but it **compiles** (`py_compile` OK) and its declared hash is listed in the verified manifest, so it carries EV-4/EV-1c. Bundle artifact 02 is byte-identical to `controlled_inputs/v0.6/FS_loss_XI0.csv` per the manifest. 9 of 10 declared artifact hashes are listed in `09_SHA256SUMS.txt` (a manifest cannot list its own hash; 09's declared hash verifies directly against the bundle cover); the index's 17 controlled-input hashes match the manifest 17/17.

## 1. Project boundary facts
| ID | Fact | Evidence |
|----|------|----------|
| B-01 | Zero physical characterization; zero hardware-in-loop; no experimental run; no released secret key | EV-3 (run summary 03, audit 08, manuscript, V0.13 record) |
| B-02 | `physical_characterization: NOT-EXECUTED`, `physical_validation: NOT-EXECUTED`, `hardware_in_loop: BLOCKED`, `laser_status: INHIBITED`, `tabuk_run_status: NOT-RUN/NONE`, `key_release_status: QUARANTINED/ZERO-RELEASED`, `release_status: PRIVATE-BLOCKED` | EV-1a (run summary, hash-verified) + EV-3 (audit 08) |
| B-03 | Profile: efficient-BB84 WCP, 1 signal + 2 decoy intensities (one vacuum), finite-key per Sidhu-family fixture | EV-3 + model source inspection |
| B-04 | Window rule: integer half-window sweep, argmax objective, smaller window breaks ties; sweep bounds read from controlled channel config (`window_sweep_half_width_s`); manuscript states 1–221 s; loss curve supports half-window ≤ 346 s; the value 221 is a controlled-input value NOT present in the bundle; observed window extremes: max 221 s is cross-artifact (artifacts 05 and 07); min observed window 1 s is single-artifact (artifact 05 only — artifact 07's minimum observed window is 67) | EV-3 for rule and max observed window; EV-4 for min observed window; EV-9 for the 221 bound's provenance |
| B-05 | Screen construction: 40-point linspace over each V0.7 range ∪ baseline value → 41 unique values per axis → 1,681 points; ranges declared "engineering bounds, not distributions" | EV-1c (model source) + EV-1b (CSV) |
| B-06 | Key convention: per-pass signed margin; candidate key = floor(max(margin,0)); signed margin retained | EV-1c (model source) + EV-1a (run summary) |
| B-07 | Baseline channel: additional_system_loss_db = 13.0 dB; rep rate 1e8 Hz; p_ec = 5e-7; afterpulse p_ap = 1e-3; intrinsic QBER 0.005; detector multiplier 1.0 | EV-1b (06 baseline_value column) + EV-1a (03 baseline block) |

## 2. Numerical facts — COMPUTATIONAL GROUND TRUTH (locked 2026-08-27)
| ID | Quantity | Canonical value | Evidence |
|----|----------|-----------------|----------|
| N-01 | Baseline half-window | 102 s (205 sample bins; edge elevation 30.4813547009598°) | EV-1a + EV-1b |
| N-02 | Signed margin M | 41,338.62418456675 bits | EV-1a; equation recomputed bit-exact (diff 0.0) |
| N-03 | Floored candidate key | 41,338 bits | EV-1a + EV-2 (floor) |
| N-04 | X-basis QBER | 0.017422686665352745 (= m_x/n_x) | EV-1a + recomputation |
| N-05 | Phase-error bound φ_X | 0.09270161340569935 | EV-1a |
| N-06 | s_X,1 | 183,803.04893680647 | EV-1a |
| N-16 | n_X | 492,818.0901525894 | EV-1a |
| N-17 | n_Z | 48,555.17200782972 | EV-1a |
| N-18 | m_X | 8,586.215167746126 | EV-1a |
| N-19 | s_X,0 | 5,047.784882329125 | EV-1a |
| N-20 | s_Z,1 / v_Z,1 | 12,007.470453438744 / 845.9615478747239 | EV-1a |
| N-21 | λ_EC | 65,385.40180119235 bits | EV-1a |
| N-22 | finite penalty 6·log2(21/ε_s)+log2(2/ε_c) | 256.5669430839006 bits | EV-1a; pair (ε_s=1e-10, ε_c=1e-9) reproduces it **bit-exactly**, but one equation / two unknowns ⇒ individual epsilons **EV-9** |
| N-23 | mean photon number (probability-weighted) | 0.62400964 | EV-1a |
| N-07 | Grid partition | 568 positive / 1,113 nonpositive / 1,681 total — note (red-team C15): because the half-window is re-optimized per evaluated point (N-26), this partition is an **UPPER-ENVELOPE** quantity relative to any fixed-window evaluation (optimization-bias direction: the positive count at any fixed window is ≤ 568); it is a deterministic screen partition, still not a probability | EV-1b (recomputed from 05) + EV-1a + EV-2 |
| N-08 | Positive grid fraction | 0.33789411064842356 = 33.789411064842356% — same disclosure as N-07: an upper-envelope fraction under per-point window re-optimization, not the fraction of any fixed-window configuration and not a probability | EV-1b + EV-1a + EV-2 (568/1681) |
| N-09 | **Grid median signed margin** | **−2,624.946810258186 bits** | EV-1b + EV-1a + EV-2 (sign forced by partition) |
| N-10 | **Grid minimum signed margin** | **−3,828.414517626367 bits** | EV-1b + EV-1a + EV-2 (sign forced: nonpositive points exist) |
| N-11 | Grid maximum signed margin | 142,540.7481180454 bits | EV-1b + EV-1a |
| N-12 | Local responses (normalized per declared step) | rank 1: additional loss −0.08215788925285143 (−8.216%/0.1 dB); rank 2: detector efficiency +0.035673639848324994 (+3.567%/1%); rank 3: repetition rate +0.01946358671353013 (+1.946%/1%); rank 4: extraneous count −0.016195046443390957; rank 5: intrinsic QBER −0.006768764678164013; rank 6: signal intensity −0.005861881586843529; rank 7: weak decoy −0.0007369594599526124; rank 8: afterpulse −0.0006325501181450469 | EV-1b (arithmetic re-verified: slope=(plus−minus)/2; normalized=slope/baseline) + EV-1c |
| N-24 | Zero-key frontiers (16 rows, 10 CROSSING-FOUND) | e.g., additional loss HIGH crossing at 14.507927510764345 dB (baseline 13.0); p_ec HIGH at 8.958206093312436e-07; intrinsic QBER HIGH at 0.013335017073411072; LOW-side no-crossing for loss, p_ec, afterpulse, intrinsic QBER; HIGH-side no-crossing for detector multiplier, rep rate | EV-1c + EV-3 (audit 08 AUD-016-005/006 identical values) |
| N-13 | Regression suite | 12 tests, 12 PASS (REG-001…012: 7 fixture metrics, +20 dB negative test, grid identity, grid partition, 2 boundary invariants) | EV-1c (04) + EV-1a (03) + EV-3 (08) |
| N-14 | Independent package audit | 20 checks, 20 PASS (AUD-016-001…020) | EV-1c (08, hash-chain-listed) |
| N-25 | V0.13 independent comparison | 50 vectors / 971 metrics, zero open numerical discrepancies | EV-3 (V0.13 record ↔ manuscript §3.6); underlying JSON EV-9 (not in bundle) |
| N-26 | Frontier/sweep detail | window re-optimized per evaluated point; baseline windows vary at perturbation points (e.g., loss ±0.1 dB → 104/101 s); consequence (red-team C15): the N-07/N-08 partition is not the partition of any fixed-window configuration | EV-1b (06 window columns) |
| N-27 | λ_EC error-correction model disclosure (red-team C8) | The λ_EC value (N-21, binomial-ppf logM construction) corresponds to the **ideal f_EC = 1 minimum-error-correction-leakage accounting** (plus finite-size quantile correction). Realistic error correction has f_EC > 1 (literature-typical ≈ 1.16 — EV-5 context only, NOT a Q-Orbit value), which would increase leakage; therefore all margins and key figures in this record are **UPPER BOUNDS with respect to error-correction efficiency** | EV-1a (value) + EV-2 (construction); f_EC context EV-5 |
| N-28 | Screen column structure (registered during D8, 2026-08-28) | 21 of 41 extraneous-count columns contain no positive cell; companion to N-07/N-08 (the φ_X 0.5-cap binds in 1,088/1,681 rows per CL-05). Deterministic screen-structure statistic — not a probability | EV-1b (recomputed from artifact 05 on 2026-08-28 by the orchestrator: 41 unique extraneous-count values, 21 with zero POSITIVE-MODEL-MARGIN rows; independently reproduced by D8 Reviewer 3) |

## 3. Corrections applied this phase
| Correction ID | Location | Was (rendering A) | Canonical (rendering B + computation) | Evidence |
|---------------|----------|-------------------|----------------------------------------|----------|
| C-01 | Results table, median | +2,624.946810258186 bits | **−2,624.946810258186 bits** | EV-1b recomputation from 05; EV-1a run summary; EV-2 partition invariant (1,113 nonpositive of 1,681 ⇒ 841st order statistic ≤ 0) |
| C-02 | Results table, minimum | +3,828.414517626367 bits | **−3,828.414517626367 bits** | EV-1b; EV-1a; EV-2 (nonpositive points exist ⇒ min ≤ 0) |
| C-03 | Rendering A internal contradiction | abstract negative median vs positive table median/min | rendering A table erroneous; abstract consistent with computation | EV-1a/EV-1b |

## 4. Prohibited claims register (unchanged, binding)
Mission success probability; QKD availability; Tabuk performance; implementation security; certified device security; procurement tolerance; hardware readiness; deployability; field readiness; released secret key.

## 5. Literature facts (citation record)
The verified citation record is distributed across D3 (Q-Orbit_Phase1_Literature_and_Proof_Review.md): §2 (6 seed references with verification status + post-audit upgrades/corrections), §4 (proof-family citations), and §7 rule 2 (preprint register); it is incorporated here by reference (red-team F-09: no single enumerated 17-entry table exists — do not cite a count). This section carries only entries with CFR-level status impact (post-review corrections or status changes).
| ID | Fact | Evidence |
|----|------|----------|
| L-09 | Tupkary, Nahar, Arqand, Tan & Lütkenhaus, "A rigorous and complete security proof of decoy-state BB84 quantum key distribution," arXiv:2601.18035 (2026) — **PREPRINT** (under review; an earlier claim of publication as Quantum 10, 2037 (2026) was checked and REMOVED as unverified — fail-closed; red-team C1). Status: PREPRINT-LABELED. Note: this preprint remains the designated Profile-B anchor (D4 §4), cited as preprint only. | EV-5 (arXiv preprint record; no journal publication asserted) |

## 6. REQUIRED INPUT / BLOCKER register
**Closure reconciliation (2026-08-27):** the former computational-input blocker ("V0.16 computational package absent") is **CLOSED** — superseded by the received and audited 10-artifact PDF bundle (§0). All other register entries remain **OPEN**; none is closed by inference, and none was closed without hash-level evidence.

| Blocker ID | Missing artifact | Status | Unblocks |
|------------|------------------|--------|----------|
| REQ-01 | `controlled_inputs/v0.6/Q-Orbit_CASE-S1_Run_Manifest_V0.6.json` (declared hash 0714d6e7… in verified SHA256SUMS) | OPEN | End-to-end re-execution of the supplied model; ε_s/ε_c, intensities, probabilities, channel config values |
| REQ-02 | `controlled_inputs/v0.6/CASE-S1-REF-001_Baseline_Run_V0.6.json` (3673acf4…) | OPEN | Direct confirmation of the V0.6 expected-baseline fixture used by REG-001…007 |
| REQ-03 | `controlled_inputs/v0.7/Q-Orbit_CASE-M1_Parameter_and_Provenance_Register_V0.7.csv` (fb07b900…) | OPEN | Verification that screen ranges (1e-7…2e-6; 0.003…0.015) are exactly the V0.7 register values; provenance of the 1–221 s sweep bound |
| REQ-04 | Original (non-PDF) bytes of the full zip `Q-Orbit_Kimi_Core_Research_Input.zip` | OPEN | Byte-level hash closure on artifacts 1, 2, 4–8, 10; workbook/registers; predecessor files |
| REQ-05 | `data_processed/Q-Orbit_V0.16-TA1_Grid_Boundary.csv` (28b9fef2…), `…_Imperfection_to_Proof_Mapping.csv` (9907aa34…), `…_Claim_Boundary_Register.csv` (bc864414…), `…_Gate_Register.csv` (a008f748…), `…_Parameter_Catalog.csv` (fb9260f3…) | OPEN | Row-level verification of grid boundary, the 16-row proof mapping (7 unmapped), claim/gate registers |

## 7. Project-status sync (2026-08-28, v1.2 — current authoritative project status)

Per user instruction of 2026-08-28 (Phase 2 state sync, preceding D8):

| Item | Status |
|---|---|
| Scientific Manuscript V1.0-RC2 | **COMPLETE** |
| Phase 1 | **COMPLETE** |
| Phase 1 Gate | **CONDITIONAL PASS — READY FOR PHASE 2 WITH DISCLOSED LIMITATIONS** |
| Software Prototype (Q-Orbit Theoretical Analysis Console, V0.17 Prototype) | **BUILT — THEORETICAL RESEARCH PROTOTYPE · NOT PHYSICALLY VALIDATED · ZERO RELEASED KEY** (built separately and verified; it is NOT physical validation, NOT experimental validation, NOT implementation security, and NOT deployed QKD hardware) |
| Website | Exhibition interface architected / in progress per the 2026-08-27 interim record; **no verified working final site — NOT marked COMPLETE** |
| REQ-01…REQ-05 | **OPEN** (no controlled evidence supplied and verified) |

**Scope of this sync:** project-status metadata only. No canonical numerical fact, no scientific conclusion, and no claim label in this record or in V1.0-RC2 is altered. Point-in-time statements dated 2026-08-27 in the Phase 1 Closure Record, the Phase 1 Consolidated Package (including its frozen .docx rendering and conversion intermediates), and the interim/preliminary submission packages that describe the prototype as unbuilt are superseded by this section as statements of *current* status; they remain valid as historical records of their dates. The prototype's existence changes no security claim: all V0.17 outputs remain theoretical computations, and every prohibition in §6 (mission success probability, QKD availability, Tabuk performance, implementation/certified security, procurement tolerance, hardware readiness, deployability, field readiness, released secret key) remains fully in force for the prototype as well.
