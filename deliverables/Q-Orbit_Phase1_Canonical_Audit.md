# Q-Orbit V0.16-TA1 — Phase 1 Canonical Audit

Auditor: independent computational audit (fail-closed). All findings below were recomputed from the extracted artifacts at `/mnt/agents/output/extracted/v016/` with original code; no prose summaries were trusted. Evidence classes: **EV-1 HASH-VERIFIED-ARTIFACT** · **EV-1b CSV-RECOMPUTED** · **EV-2 INVARIANT** · **EV-3 CROSS-ARTIFACT** · **EV-4 SINGLE-ARTIFACT** · **EV-9 UNVERIFIED-PENDING-CONTROLLED-INPUTS** · **UNRESOLVED — SUBMISSION BLOCKER**.

---

## (A) DELIVERABLE-1 — Executive Audit

### A.1 What is verified, and at what evidence class

**Hash chain (Task 1).** SHA-256 of all 10 extracted artifacts was computed and compared against (a) the bundle-cover declared hashes (PDF page 1 / `_bundle_raw.txt`) and (b) `09_SHA256SUMS.txt` (64 entries). Results:

| Artifact | Extracted hash == declared? | Byte-reconstruction result |
|---|---|---|
| 03 run summary JSON | **YES — direct match** (`4c9d7821…5691c`) | EV-1 |
| 09 SHA256SUMS.txt | **YES — direct match** (`7708e49f…2871` vs cover) | EV-1 (self not listed inside itself, as expected) |
| 02, 04, 05, 06, 07, 10 (CSVs) | No as-extracted | **Exact match after removing PDF page-break blank lines and restoring CRLF line endings** (Python `csv` module default `\r\n`; the extraction normalized to `\n` and inserted blank lines at page breaks — e.g. 17 interior blanks in 05, 7 in 02). All six reconstruct byte-identically to declared hashes. | 
| 08 audit JSON | No as-extracted | **Exact match after removing 4 PDF page-break blank lines (LF endings)** |
| 01 model .py | No | **No byte-level reconstruction achieved** (blank lines are ambiguous: legitimate source blanks vs page-break inserts cannot be distinguished). File *does* compile (`py_compile` OK) — indentation was **not** lost in this extraction. Content assessed statically only (EV-4). |

- 9 of 10 bundle-cover declared hashes are themselves listed in `09_SHA256SUMS.txt` under package paths (e.g. `runs/…Run_Summary.json`, `data_processed/…Two_Parameter_Screen.csv`, `source/run_theoretical…py`); confirmed individually — 9 of 10 declared artifact hashes are listed in 09 (a manifest cannot list its own hash; 09's declared hash verifies directly against the bundle cover, per the table above).
- Notably, bundle 02's declared hash `2d8eca79…5874` is identical to `controlled_inputs/v0.6/FS_loss_XI0.csv` in 09 and to CI-016-014 in 10 — the bundled loss curve is byte-identical to the frozen V0.6 controlled input.
- 10 (Controlled Input Index, 17 rows, all `HASH-RECORDED`): all 17 hashes match the corresponding `controlled_inputs/…` entries in 09 — 17/17 (EV-3). This independently corroborates 08's AUD-016-015.

**Consequence:** 9 of 10 artifacts are content-verified to their declared hashes (2 directly, 7 after deterministic removal of proven PDF round-trip damage). Only 01 is not byte-verified.

**Numerical core (Tasks 2–4).** Recomputed from 05 (1681 rows): positive 568, nonpositive 1113, fraction 0.33789411064842356 (= 568/1681 exactly in binary64), median **−2624.946810258186**, min **−3828.414517626367**, max +142540.7481180454 — all bit-identical to 03's `two_parameter_screen` block (EV-1b + EV-1). Baseline margin identity `M = s_x0 + s_x1·(1−h2(φ_X)) − λ_EC − finite_penalty` reproduces 41338.62418456675 **bit-exactly**; `qber_x = m_x/n_x` bit-exact; `floor(max(M,0))` convention holds on the baseline **and on all 1681 grid rows** (EV-1b). Sensitivity 06: all 8 rows' central slope = (plus−minus)/2 and normalized = slope/baseline verified to ≤1e-12; ranking contiguous 1–8 and consistent with |response|; top-3 match manuscript §4.2 (−8.216 %/0.1 dB loss, +3.567 %/1 % detector efficiency, +1.946 %/1 % repetition rate).

**Frontiers (Task 5).** 07 has 16 rows = 8 parameters × 2 sides; 10 CROSSING-FOUND, 6 NO-CROSSING-IN-DECLARED-DOMAIN — matches 03 (`frontier_row_count`/`frontier_crossing_count`) and 08 AUD-016-005. The three crossing values quoted in AUD-016-006 (loss HIGH 14.507927510764345 dB; extraneous HIGH 8.958206093312436e-07; intrinsic-QBER HIGH 0.013335017073411072) match 07 exactly. Declared domain endpoints are internally consistent with the code's construction: TH-PAR-004 LOW × TH-PAR-005 HIGH = 0.21552464335311194 × 4.639840597539544 = 0.99999999 = 1.0001 × 0.9999 exactly (EV-3), implying μ2/μ1 ≈ 0.21550309 (ratio itself EV-9, not printed).

**Regression & audit (Tasks 6–7).** 04: 12 tests, all PASS; REG-001…007 observed values equal 03 baseline values exactly (EV-3); consistent with manuscript §3.6 (12 tests, 20-check audit) and 03 (12/12). 08: `check_count`=20, `pass_count`=20, `failure_count`=0; all 20 check payloads internally consistent with 03/04/05/06/07 values (incl. AUD-016-007 grid median −2624.946810258186; AUD-016-009 boundary 41 rows/21 blank — the 21 blanks independently recomputed from 05: exactly 21 of 41 extraneous grid columns have zero positive cells, EV-1b). V0.13 record: 50/50 vectors, 971/971 metrics — matches manuscript §3.6 wording (EV-4 for the record file itself).

### A.2 What was corrected

- **The planted sign discrepancy is resolved computationally: the negative values are ground truth.** Version A's §4.3 table (median "+2,624.946810258186", min "+3,828.414517626367") is sign-flipped and internally inconsistent — a positive minimum is incompatible with the same table's 568/1113 split, and contradicts A's own abstract ("median −2,624.947"). Version B and A's abstract are correct. A token-level diff of A vs B shows these two table cells are the **only** substantive divergence between the renderings.
- The brief's claim "01 indentation lost — NOT directly executable" is **not** true of the supplied extraction: the file compiles. It remains non-executable end-to-end solely because controlled inputs are absent (demonstrated: `FileNotFoundError` on `controlled_inputs/v0.6/Q-Orbit_CASE-S1_Run_Manifest_V0.6.json`).
- "monotonic |t|" for 02 is imprecise: t decreases strictly +346→−346 (monotone in t; |t| is V-shaped, symmetric about t=0; elevation and efficiency columns are exactly mirror-symmetric).

### A.3 Unresolved blockers (fail-closed)

1. **End-to-end re-execution BLOCKED** — missing controlled inputs (see D). Not attempted beyond demonstrating the failure mode; re-indentation/reconstruction neither needed (file compiles) nor permitted.
2. **ε_s, ε_c unverified** — `finite_penalty_bits = 256.5669430839006` is one equation in two unknowns. The natural pair (ε_s=1e-10, ε_c=1e-9) reproduces the printed value **bit-exactly**, but infinitely many pairs do; the individual values appear in no artifact. EV-9.
3. **01 not hash-verified** (byte level) — static inspection only (EV-4).
4. Window sweep bound 221 s, `number_of_passes`, `minimum_elevation_deg`, intensities/probabilities (mean photon 0.62400964) live in the missing V0.6 manifest — EV-9, corroborated but not proven by the observed window extremes: max 221 (cross-artifact, 05 and 07 — EV-3); min 1 (single-artifact, 05 only — artifact 07's minimum observed window is 67 — EV-4).

### A.4 Submission-readiness status

- **Submission-readiness status (mandated token, per Deliverable-Specifications D1): READY-WITH-DISCLOSED-LIMITATIONS for the theoretical/numerical record; BLOCKED for any physical, device-security, mission, or procurement claim.** Manuscript rendering **B is numerically consistent with the controlled artifacts in every checked value**.
- Disclosed limitations: (i) BLOCKER-1's scope is binding — **no claim of independent re-execution may be made**, and the V0.16 executable package is absent (the controlled inputs REQ-01…03 are hash-recorded but not in the bundle — the absent-V0.16-package declaration); (ii) ε_s/ε_c individually unverified (BLOCKER-2, EV-9); (iii) artifact 01 not byte-hash-verified (BLOCKER-3, EV-4); (iv) ideal-EC disclosure (red-team C8): the fixture's λ_EC (binomial-ppf `logM` construction) corresponds to the ideal f_EC = 1 minimum-error-correction-leakage accounting; realistic f_EC > 1 (literature-typical ≈ 1.16 — EV-5 context only, NOT a Q-Orbit value) would increase leakage, so all margins/keys in this package are **UPPER BOUNDS with respect to error-correction efficiency** (CFR N-27).
- Rendering **A must not be used**: its §4.3 results table carries the sign flip.
- No artifact supports any physical, device-security, mission, or procurement claim; the artifacts' own boundary states (QUARANTINED/ZERO-RELEASED etc.) are internally consistent (08 AUD-016-020 vs 03 — EV-3).

---

## (B) DELIVERABLE-2 — Numerical Consistency Table

Version A = `user_pasted_clipboard_long_content_as_file_Q-Orbit Fail-Closed.txt`; Version B = `Q-Orbit_Scientific_Research_Paper_Current.md`. "—" = value not stated in that rendering.

| Item | Version A | Version B | Ground-truth value | Evidence | Resolution |
|---|---|---|---|---|---|
| Baseline half-window | 102 s | 102 s | 102 (int) | EV-1 (03), EV-3 (04 REG-001, 08 AUD-016-002) | Both correct |
| Sample bins at baseline | — | — | 205 | EV-1 (03); EV-1b recomputed from 02 (center±102 → 205 bins) | Consistent |
| Edge elevation at baseline | — | — | 30.4813547009598° | EV-1 (03); EV-1b from 02 rows t=±102 (0.532 rad → 30.4813547009598° exact) | Consistent |
| Signed key margin M | 41,338.62418456675 bits | 41,338.62418456675 bits | `41338.62418456675` | EV-1 (03) + EV-2 invariant: s_x0+s_x1(1−h2(φ))−λ_EC−penalty reproduces **bit-exactly** | Both correct |
| Floored candidate key | 41,338 bits | 41,338 bits | 41338 = ⌊max(M,0)⌋ | EV-1 + EV-2 (floor convention holds on baseline and all 1681 grid rows) | Both correct |
| X-basis QBER | 0.017422686665352745 | same | `0.017422686665352745` = m_x/n_x **bit-exact** | EV-1 + EV-2 | Both correct |
| Phase-error bound φ_X | 0.09270161340569935 | same | `0.09270161340569935` (cap 0.5 not hit at baseline; hit in 1088/1681 grid rows) | EV-1 (03); EV-3 (04 REG-005, 08 AUD-016-002); cap behavior EV-1b (05) | Both correct |
| n_X | — | — | `492818.0901525894` | EV-1 (03); EV-3 (04 REG-006, 08) | Not in manuscripts |
| s_X1 | 183,803.04893680647 | same | `183803.04893680647` | EV-1 (03); EV-3 (04 REG-007, 08) | Both correct |
| s_X0 | — | — | `5047.784882329125` | EV-1 (03) only | EV-4/EV-1 single-artifact |
| n_Z / m_X / v_Z1 / s_Z1 | — | — | `48555.17200782972` / `8586.215167746126` / `845.9615478747239` / `12007.470453438744` | EV-1 (03) only | EV-1 single-artifact; components feed bit-exact M invariant |
| λ_EC | — | — | `65385.40180119235` | EV-1 (03); formula uses `scipy.binom.ppf` (01) | EV-1; regeneration EV-9 (needs ε_c) |
| finite_penalty | — | — | `256.5669430839006` = 6·log2(21/ε_s)+log2(2/ε_c); pair (1e-10, 1e-9) reproduces bit-exactly but is **one of infinitely many solutions** | EV-2 (identity bit-exact) + **EV-9** for ε_s, ε_c individually | UNRESOLVED-PENDING-CONTROLLED-INPUTS (non-blocking for arithmetic consistency) |
| mean photon number | — | — | `0.62400964` = p·μ | EV-1 (03); EV-9 (p, μ in missing manifest) | Pending controlled inputs |
| Local response TH-PAR-001 additional loss | −8.216 %/0.1 dB | same | `−0.08215788925285143` per +0.1 dB (slope −3396.294107620881 bits) | EV-1b (06 internal arithmetic exact); EV-3 (03 baseline) | Both correct |
| TH-PAR-002 detector efficiency | +3.567 %/1 % | same | `+0.035673639848324994` | EV-1b | Both correct |
| TH-PAR-003 repetition rate | +1.946 %/1 % | same | `+0.01946358671353013` | EV-1b | Both correct |
| TH-PAR-004 signal intensity | — | — | `−0.005861881586843529` | EV-1b | Consistent (not quoted) |
| TH-PAR-005 decoy intensity | — | — | `−0.0007369594599526124` | EV-1b | Consistent |
| TH-PAR-006 extraneous counts | — | — | `−0.016195046443390957` | EV-1b | Consistent |
| TH-PAR-007 afterpulse | — | — | `−0.0006325501181450469` | EV-1b | Consistent |
| TH-PAR-008 intrinsic QBER | — | — | `−0.006768764678164013` | EV-1b | Consistent |
| Response ranking | loss > detector > rep-rate (top-3) | same | ranks 1..8 contiguous; rank-1 = additional_system_loss_db | EV-1b + EV-3 (08 AUD-016-004) | Both correct |
| Frontier set | qualitative (§5.3) | same | 16 rows = 8 params × 2 sides; 10 CROSSING-FOUND, 6 NO-CROSSING | EV-1b (07) + EV-3 (03, 08 AUD-016-005) | Consistent |
| Frontier crossing values | — | — | loss-HIGH 14.507927510764345 dB; extraneous-HIGH 8.958206093312436e-07; qber-HIGH 0.013335017073411072 (+7 more in 07) | EV-1b (07) + EV-3 (08 AUD-016-006 exact match) | Consistent |
| "Zero-boundary" language | "contour indicates the zero-margin boundary at grid resolution" | same | Boundary is grid-resolution-limited: 41 extraneous rows, 21 with no positive cell (recomputed from 05); class `GRID-RESOLUTION-NOT-ANALYTIC-THRESHOLD` | EV-1b + EV-3 (08 AUD-016-009) | Language accurate; not an analytic threshold claim |
| Grid dimensions | 41 × 41 | 41 × 41 | 41 × 41 = 1681; axes = linspace(range,40) ∪ {baseline}: extraneous linspace(1e-7,2e-6,40)∪{5e-7}; intrinsic linspace(0.003,0.015,40)∪{0.005} | EV-1b (axis reconstruction exact) + EV-1 (03) | Both correct |
| Positive count | 568 | 568 | 568 | EV-1b recomputed | Both correct; **upper-envelope quantity** — the half-window is re-optimized per evaluated point (CFR N-26), so the count at any fixed window is ≤ 568 (optimization-bias direction; red-team C15); a deterministic screen count, not a probability |
| Nonpositive count | 1,113 | 1,113 | 1113 | EV-1b | Both correct |
| Positive fraction | 33.789411 % | 33.789411 % | `0.33789411064842356` (= 568/1681 in binary64, exact) | EV-1b | Both correct; same upper-envelope disclosure as the count row (not the fraction of any fixed-window configuration; not a probability) |
| **Grid median** | abstract: **−2,624.947** ✓; §4.3 table: **+2,624.946810258186 ✗ (sign-flipped)** | −2,624.946810258186 ✓ | **`−2624.946810258186`** (bit-exact from 05; = 03; = 08 AUD-016-007) | EV-1b + EV-1 + EV-3 | **RESOLVED: negative. A's table corrected to B's value.** A's table also internally inconsistent (positive min contradicts 568/1113 split) |
| **Grid minimum** | §4.3 table: **+3,828.414517626367 ✗ (sign-flipped)** | −3,828.414517626367 ✓ | **`−3828.414517626367`** (row SCR-1681 at corner (2e-6, 0.015), half-window 1, φ capped 0.5) | EV-1b + EV-1 | **RESOLVED: negative.** |
| Grid maximum | 142,540.7481180454 | same | `+142540.7481180454` (SCR-0001 at (1e-7, 0.003), half-window 221) | EV-1b + EV-1 | Both correct (max was never disputed) |
| Regression test count | 12 | 12 | 12 tests, 12 PASS (04); 03: 12/12; 08 AUD-016-003: 12/12 | EV-1b (04) + EV-3 | Both correct |
| Independent audit claims | "20-check independent package audit pass" | same | 08: check_count 20, pass_count 20, failure_count 0; all 20 payloads cross-consistent with 03/04/05/06/07 | EV-1 (08 byte-reconstructed) + EV-3 | Both correct |
| V0.13 independent validation | "50 locked vectors over 971 metrics, zero open numerical discrepancies" | same | V0.13 record: `PASS-INDEPENDENT-NUMERICAL-COMPARISON`, 50/50 vectors, 971/971 metrics; all 12 limitations remain open; no V0.12 physical gate closed | EV-4 (record file, not hash-chained to bundle) | Consistent |
| Window sweep 1–221 s | §3.2 "integer half-windows from 1 to 221 s" | same | Code reads `channel["window_sweep_half_width_s"]` (missing V0.6 manifest); observed max window = 221 (grid & frontiers — EV-3), observed min window = 1 (artifact 05 only; 07's minimum observed window is 67 — EV-4 single-artifact) | EV-4 (code; min window) + EV-3 (max-window corroboration) + **EV-9** (config value itself) | Consistent by corroboration; config value pending controlled input |
| Unmapped device effects | 7 effects, UNMAPPED states | same | 08 AUD-016-010: 16 mapping rows, 7 unmapped, 7 without substitution; REG-012 PASS (no invented penalty) | EV-1 (08) + EV-1b (04) | Both correct |
| Release/boundary states | PRIVATE-BLOCKED etc. | same | 03 and 08 AUD-016-020 agree exactly (NOT-EXECUTED/BLOCKED/INHIBITED/NOT-RUN/QUARANTINED/PRIVATE-BLOCKED) | EV-3 | Both correct |

---

## (C) Static model-inspection findings (artifact 01; EV-4 unless noted)

**Formulas as implemented (read from code, lines cited):**

- Detection: `detection = (1+p_ap)·(1 − (1−2·p_ec)·exp(−μ·η_curve·η))`; errors: `p_ec + 0.5·p_ap·detection + intrinsic·(1 − exp(−μη))` (l. 173–175). Aggregate link efficiency from the frozen loss curve times `10^(−additional_loss_db/10)` and detector multiplier.
- Chernoff bound (l. 41–52): `β = ln(21/ε_s)`; `lower_delta = β/2 + √(2·obs·β + β²/4)`; `upper_delta = β + √(2·obs·β + β²)`; scaled by `e^μ/p` — matches the manuscript's described form (EV-3 vs §3.1 Equation 1 family).
- Vacuum estimator (l. 53–57): `τ(0)·(μ2·L[2] − μ3·L[1])/(μ2 − μ3)`; single-photon events (l. 58–73) and errors (l. 74–84) are the standard three-intensity decoy estimators with the frozen `μ1 > μ2 > μ3 = 0`, `μ1 > μ2+μ3` guards (l. 126–129).
- `gamma_correction` (l. 85–96): random-sampling/Serfling-type term `sqrt(a·log2(b))` with `a = (z+x)(1−r)r/(z·x·ln2)` floored at 0 and `b = (z+x)·21²/(z·x·(1−r)·r·ε_s²)` floored at 1.
- Phase error (l. 202–204): `v_z1` clamped to `[1e-10, m_z]`; `ratio = min(v_z1/s_z1, 1 − ε_machine)` (machine-epsilon cap present); `φ_X = min(ratio + gamma_correction, 0.5)` (0.5 cap present; observed binding in 1088/1681 grid rows, EV-1b).
- `numeric_floor = 1e-10` applied to s_x0, s_z0, s_x1, s_z1 (l. 196–201).
- Error correction (l. 97–113): `logM` via `scipy.stats.binom.ppf(ε_c(1+1/√n_X), int(n_X), 1−qber)` with domain guard `n_X>1`, `0<qber<0.5`.
- Finite penalty (l. 207): `6·log2(21/ε_s) + log2(2/ε_c)` — matches manuscript Equation 1 exactly.
- Margin (l. 208): `M = s_x0 + s_x1(1−h2(φ_X)) − λ_EC − penalty` — **bit-exact against 03** (EV-2 invariant).
- Signed-margin zeroing rule (l. 209–210): sets `signed_margin = 0` if decoy ordering breaks — **effectively unreachable defensive code**, because `validate_profile` raises `ValueError` on the same conditions earlier in the same call (frontier loop then records `DOMAIN-INVALID-BEFORE-CROSSING`). Fail-closed either way; zero observed occurrences of that state in 07 (EV-1b).
- Objectives (l. 245–248): fixture maximizes `(secret_key_bits, −half_window)`; signed maximizes `(signed_margin, −half_window)` — smaller window wins exact ties, matching §3.2. 03's two baseline blocks are **identical** (EV-1), so both objectives select the same baseline (102 s).
- Window sweep (l. 236–244): iterates `channel["window_sweep_half_width_s"]` bounds inclusive; windows violating the elevation mask raise and are skipped. **The 1–221 s bounds come from the missing V0.6 channel config — flagged EV-9** (corroborated: max observed window 221, EV-3; min observed window 1, EV-4 — single-artifact: 07's minimum observed window is 67).
- Screen construction (l. 447–449): `np.unique(np.append(np.linspace(range,40), baseline))` → 41 unique per axis — **confirmed exactly** on both axes (EV-1b). Ranges read from missing V0.7 register keys QKD-009/QKD-011 (EV-9 for provenance; values 1e-7…2e-6 and 0.003…0.015 confirmed from 05 and 08 AUD-016-008, EV-3).
- Frontier search (l. 351–387): 180-point grid per side, `geomspace` for log spacing when start>0 else `linspace` fallback; bisection 60 iterations with geometric midpoint √(pos·nonpos) for log-spaced positive brackets, arithmetic otherwise. Crossing = last positive before first nonpositive (strict `> 0` test).

**Numerical-fragility notes (static; no failure observed in shipped outputs):**

1. `chernoff_bounds` lower branch: `observed − lower_delta` goes negative for small observed counts (≈ −β at obs→0) → negative lower counts propagate into `vacuum_events`; the `1e-10` floor on s_x0/s_x1 masks this downstream, but intermediate negative bounds are not clamped at source.
2. Divisions by `μ2 − μ3` (= μ2 since μ3 = 0): safe for declared domains (decoy multiplier LOW endpoint 1e-3 keeps μ2′ > 0) but ill-conditioned as μ2 → 0; numerator of `single_photon_errors` is a difference of error bounds (binary64 cancellation risk).
3. `single_photon_events` denominator `μ1(μ2−μ3) − μ2² + μ3² = μ2(μ1−μ2)`: cancellation as μ1→μ2; domain endpoints are engineered to prevent this (TH-PAR-004 LOW = (μ2/μ1)·1.0001; TH-PAR-005 HIGH = (μ1/μ2)·0.9999; product matches 1.0001×0.9999 exactly, EV-3).
4. `error_correction_logm` uses `int(n_X)` truncation of a non-integer count and `binom.ppf` — result is scipy-version-sensitive at the ~1e-6 level; `requirements-lock.txt` exists in the package but is not in this bundle (EV-9 for environment pinning).
5. `geomspace` silently falls back to `linspace` when start ≤ 0 — declared log-spaced domains all have positive endpoints, so the fallback is latent only.
6. `sweep` silently skips `ValueError` windows (elevation mask); a configuration where *all* windows raise produces "No valid half-window", which is **not** caught inside `two_parameter_screen` — a grid point invalid at every window would crash the run. Evidently did not occur (1681 rows complete, all finite — AUD-016-007 `finite: true`).
7. Machine-epsilon cap on `ratio` prevents log-of-zero in `gamma_correction`; with ratio→1−ε the `log2(second)` term explodes but φ_X is capped at 0.5 — bounded by construction.
8. Regression suite would `raise RuntimeError` on any FAIL (l. 555–556) — fail-closed.

**Manuscript-vs-code convention check:** §3.1 Equation 1, floor(max(M,0)) convention, tie-break rule, screen construction, "grid is not a probability distribution" (`range_class` on every 05 row; `range_source` in 03), and local-response step definitions all match the code as inspected (EV-3/EV-4). Per-pass division (`signed_margin/passes`) implies `number_of_passes = 1` at baseline (raw == signed margin); the passes value itself is EV-9.

**Independent from-scratch reimplementation (optional cross-check): NOT performed** — the published decoy formulas require the fixture's intensities, probabilities, ε_s/ε_c, and channel config, which exist only in the missing controlled inputs; reconstructing them from prose or back-solving from outputs is prohibited and would be circular. The internal-arithmetic identities above (bit-exact M, qber ratio, floor convention on all 1681 rows, sensitivity slopes) provide the non-circular self-consistency check instead.

---

## (D) REQUIRED INPUT / BLOCKER

**BLOCKER-1 (end-to-end re-execution) — UNRESOLVED — SUBMISSION BLOCKER for any claim of independent re-execution.** Required, hash-recorded (09/10) but absent from the bundle:
- `controlled_inputs/v0.6/Q-Orbit_CASE-S1_Run_Manifest_V0.6.json` (sha256 `0714d6e7…8583`; contains qkd_profile incl. intensities, probabilities, ε_s, ε_c, and `window_sweep_half_width_s` bounds, `minimum_elevation_deg`, `number_of_passes`)
- `controlled_inputs/v0.6/CASE-S1-REF-001_Baseline_Run_V0.6.json` (sha256 `3673acf4…2a33`; regression expected values)
- `controlled_inputs/v0.7/Q-Orbit_CASE-M1_Parameter_and_Provenance_Register_V0.7.csv` (sha256 `fb07b900…89db`; screen ranges QKD-009/QKD-011)
- (Also hash-recorded but absent: `controlled_inputs/v0.6/qorbit_sim_v0_6.py` `d6f7df81…dbd4`; `requirements-lock.txt` `a6e95206…99ec`.)
- Demonstrated failure mode: extracted 01 compiles but exits `FileNotFoundError` on the manifest at `load_inputs()`. `controlled_inputs/v0.6/FS_loss_XI0.csv` **is** effectively present (bundle 02 reconstructs byte-identical to its declared hash).

**BLOCKER-2 (ε_s / ε_c) — EV-9.** Not printed in any artifact. `finite_penalty_bits = 256.5669430839006` is one equation in two unknowns; (1e-10, 1e-9) reproduces it bit-exactly but is not unique. Individual epsilons UNVERIFIED-PENDING-CONTROLLED-INPUTS.

**BLOCKER-3 (01 byte-identity) — EV-4.** The extracted source compiles and was fully read, but no byte-level reconstruction to declared hash `5b76cf3c…7425` was achieved (PDF-inserted blank lines indistinguishable from source blanks). Static-inspection findings therefore rest on content, not hash identity.

**Non-blocking notes:** bundle damage fully characterized (CRLF→LF + page-break blanks; 7 of 10 artifacts byte-reconstructed exactly, 2 directly matched); rendering A §4.3 table sign flip resolved against ground truth; no other substantive A/B divergence exists.
