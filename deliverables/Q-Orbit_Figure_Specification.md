# Q-Orbit — Figure Specification (Manuscript V1.0-RC2)

**Document ID:** QO-FIGSPEC-001 | **Version:** 1.0 | **Date:** 2026-08-27
**Purpose:** Publication-ready specifications (NOT rendered figures) for the six manuscript figures. Each specification is complete enough that a figure renderer needs no further input beyond the cited controlled artifacts. No value in this document is invented; every number traces to the Canonical Facts Record (CFR v1.1) or to a controlled artifact at `/mnt/agents/output/extracted/v016/`, and was verified by direct inspection on 2026-08-27.
**Boundary:** THEORETICAL / NOT PHYSICALLY VALIDATED. No figure displays measured physical data; none exists (CFR B-01/B-02).

---

## 0. Global rendering conventions (binding on all six figures)

- **Color palette — ACADEMIC scheme ONLY:** `['#4A6FA5', '#6B8CBB', '#8BA3C7', '#2E4A62', '#7A8B99', '#5C7A99', '#3D5A73']`. Text, axes, ticks, and annotations: dark gray `#333333`. No other hues are permitted in any figure (no red/green status coloring; sign is encoded by diverging lightness within the scheme or by hatch/label, never by red).
- **Typography:** serif or neutral sans-serif consistent with the manuscript; all text `#333333`; minimum 7 pt at final print size.
- **Evidence-class statement:** every caption MUST state the evidence class of the displayed content using exactly one or more of: *modeled* / *deterministic* / *theoretical* / *measured* / *not measured*. No figure may imply measured content.
- **No-fabrication policy:** a figure must not depict any quantity for which no controlled artifact exists. Each figure carries an explicit "no-fabrication note" listing what is deliberately NOT shown.
- **Data integrity:** figures 2 and 3 embed their full data tables / exact extraction recipes below; renderers must not recompute, smooth, or resample.

---

## Figure 1 — Finite-key workflow (flow diagram)

**Purpose.** Show the deterministic computation pipeline of the frozen V0.16-TA1 fixture for one pass: from pass-window selection to the candidate-key integer, including the fail-closed guards.

**Data source.** No numerical data series. Structure transcribed from the model source `01_run_theoretical_device_imperfection_model_v0_16_ta1.py` (608 lines; EV-4/EV-1c — compiles, hash-chain-listed, not byte-verified) and the hash-verified run summary `03_Q-Orbit_V0.16-TA1_Theoretical_Run_Summary.json` (EV-1a). Node/edge content is theoretical documentation only.

**Rendering specification.**
- Type: directed flow diagram, top-to-bottom. Mermaid (`flowchart TD`) or TikZ-level specification acceptable.
- Nodes (in order):
  1. *Pass window selection* — integer half-window sweep, argmax objective, smaller window breaks ties (observed extremes: max 221 s cross-artifact EV-3, min 1 s single-artifact EV-4; sweep bound EV-9/REQ-01). Baseline outcome: 102 s (CFR N-01).
  2. *Detection counts* — per-bin detection model over the frozen 693-sample loss curve (`02_FS_loss_XI0.csv`, EV-1a); baseline observables n_X, n_Z, m_X (CFR N-16/N-17/N-18).
  3. *Decoy estimation* — three-intensity (1 signal + 2 decoys, one vacuum) Chernoff/Hoeffding bounds → s_X,0, s_X,1, s_Z,1, v_Z,1 (CFR N-19/N-06/N-20).
  4. *Phase-error bound φ_X* — v_Z,1/s_Z,1 ratio + Serfling/Fung-type gamma correction, capped at 0.5 (CFR N-05; cap binding in 1,088/1,681 grid rows).
  5. *Margin M* — M = s_X,0 + s_X,1·[1 − h2(φ_X)] − λ_EC − 6·log2(21/ε_s) − log2(2/ε_c) (CFR N-02, N-21, N-22).
  6. *Floor / max* — candidate key = floor(max(M, 0)); signed margin retained (CFR B-06).
  7. *Candidate key* — baseline 41,338 bits (CFR N-03); watermark node: "conditional computation — no security claim while characterization is absent" (D6 §6).
- Side guard annotations (dashed): decoy-ordering guards (μ1 > μ2 > μ3 = 0; μ1 > μ2 + μ3) fail closed before any margin is emitted; 21-split validator accepts only β = ln(21/ε_s)-equivalent fluctuation terms (D6 §4.2).
- Node style: rounded rectangles, fill `#8BA3C7` (process), `#5C7A99` (guards), `#2E4A62` with white text reserved for the final candidate-key node only; edges `#3D5A73`.

**Caption (exact text).**
"Figure 1. Deterministic finite-key computation workflow of the frozen Q-Orbit V0.16-TA1 theoretical fixture, from pass-window selection through decoy-state estimation, phase-error bounding, and the signed margin M to the floored candidate key. Content is theoretical and modeled: it describes a software computation over an assumed parameter point with zero physical characterization (CFR B-01); no stage is measured. The emitted candidate key is a conditional computation and carries no security claim (D6 §6)."

**No-fabrication note.** The diagram shows no measured counts, no hardware states, and no security level: no such data exist. The individual ε_s/ε_c values, intensities, and channel configuration are not depicted because they are unverified pending controlled inputs (EV-9; REQ-01).

---

## Figure 2 — Local sensitivity of the signed margin (horizontal bar chart)

**Purpose.** Rank the eight software-contract scalars (TH-PAR-001…008) by normalized local response of the signed margin at baseline, per declared perturbation step.

**Data source (verified by inspection).** `/mnt/agents/output/extracted/v016/06_Q-Orbit_V0.16-TA1_Local_Sensitivity.csv` — **8 rows**, columns used: `parameter_id`, `parameter`, `unit`, `baseline_value`, `step_definition`, `central_margin_change_bits_per_declared_step`, `normalized_response_per_declared_step`, `absolute_response_rank`. Arithmetic re-verified (slope = (plus − minus)/2; normalized = slope / baseline margin) to ≤ 1e-12 (CFR N-12; EV-1b + EV-1c). Canonical values below are from CFR N-12 (full precision); the CSV stores the same quantities.

**Embedded data table (complete — the renderer needs nothing else).**

| Rank | Parameter (ID) | Unit / declared step | Baseline | Central margin change (bits/step) | Normalized response (per declared step) |
|---|---|---|---|---|---|
| 1 | additional_system_loss_db (TH-PAR-001) | dB; additive ±0.1 dB | 13.0 | −3,396.294107620881 | −0.08215788925285143 |
| 2 | detector_efficiency_multiplier (TH-PAR-002) | dimensionless; multiplicative ±1% | 1.0 | +1,474.6991909854914 | +0.035673639848324994 |
| 3 | source_repetition_rate_hz (TH-PAR-003) | Hz; multiplicative ±1% | 1e8 | +804.5978964343485 | +0.01946358671353013 |
| 4 | extraneous_count_probability_per_pulse (TH-PAR-006) | probability/pulse; multiplicative ±1% | 5e-7 | −669.4809385749431 | −0.016195046443390957 |
| 5 | intrinsic_qber_fraction (TH-PAR-008) | fraction; multiplicative ±1% | 0.005 | −279.811419224392 | −0.006768764678164013 |
| 6 | signal_intensity_multiplier (TH-PAR-004) | dimensionless; multiplicative ±1% of signal intensity | 1.0 | −242.3221199329564 | −0.005861881586843529 |
| 7 | decoy_intensity_multiplier (TH-PAR-005) | dimensionless; multiplicative ±1% of weak-decoy intensity | 1.0 | −30.464890154242312 | −0.0007369594599526124 |
| 8 | afterpulse_probability (TH-PAR-007) | probability/detection; multiplicative ±1% | 1e-3 | −26.14875161190139 | −0.0006325501181450469 |

**Rendering specification.**
- Type: horizontal bar chart, 8 bars, sorted by `absolute_response_rank` (rank 1 at top), bar value = `normalized_response_per_declared_step`.
- Axes: x = "normalized margin response per declared step (dimensionless)", linear scale, range approximately −0.09 to +0.04 (must include all eight values exactly); y = parameter names (categorical, rank order). Zero line drawn as a solid `#333333` vertical rule.
- Sign encoding within the ACADEMIC palette: positive bars `#4A6FA5`, negative bars `#7A8B99` (or single-hue `#4A6FA5` with direction read from the axis; do not introduce red/green). Value labels at bar ends in `#333333`, full precision as in the table.
- Annotations: (i) "Rank 1: additional system loss, −8.216% per 0.1 dB"; (ii) footnote marker on every bar: "LOCAL-NUMERICAL-RESPONSE-NOT-PHYSICAL-SENSITIVITY" (the artifact's own `claim_class`); (iii) note that the half-window re-optimizes at perturbation points (e.g. loss ±0.1 dB → 104 s / 101 s; CFR N-26).
- Palette: ACADEMIC scheme only; text `#333333`.

**Caption (exact text).**
"Figure 2. Local responses of the baseline signed key margin to single-parameter perturbations of the eight software-contract scalars, normalized per declared step (artifact 06, 8 rows; CFR N-12). Content is modeled and deterministic: these are numerical responses of the frozen theoretical fixture at an assumed parameter point, computed with per-point window re-optimization; they are not measured device sensitivities and support no hardware tolerance or procurement statement."

**No-fabrication note.** No physical sensitivity, no measured tolerances, and no uncertainty bands are shown: the perturbations are declared arithmetic steps, not measurement intervals, and no characterization data exist (CFR B-01).

---

## Figure 3 — 41×41 coupled two-parameter screen (signed-margin heatmap)

**Purpose.** Display the signed key margin over the coupled (extraneous-count probability × intrinsic QBER) screen, showing the positive/nonpositive structure and the annotated extremal cells.

**Data source (verified by inspection).** `/mnt/agents/output/extracted/v016/05_Q-Orbit_V0.16-TA1_Two_Parameter_Screen.csv` — **1,681 rows** (= 41 × 41 unique grid points; verified), columns used: `screen_id`, `extraneous_count_probability_per_pulse`, `intrinsic_qber_fraction`, `optimized_half_window_s`, `signed_key_margin_bits`, `positive_state`, `range_class`. Row order is row-major: extraneous-count axis outer, intrinsic-QBER axis inner (SCR-0001 = (1e-7, 0.003); SCR-1681 = (2e-6, 0.015)).

**Exact extraction recipe (renderer-ready).**
1. Load the CSV; build `x = sorted(unique(extraneous_count_probability_per_pulse))` → 41 values, from 1e-7 to 2e-6 (40-point linspace ∪ baseline 5e-7 at index 9); `y = sorted(unique(intrinsic_qber_fraction))` → 41 values, from 0.003 to 0.015 (40-point linspace ∪ baseline 0.005 at index 7).
2. `Z[i, j] = signed_key_margin_bits` for the row with extraneous value `x[i]` and intrinsic-QBER value `y[j]` (equivalently: pivot on the two axis columns; no reordering, interpolation, or smoothing).
3. Verified summary statistics (must reproduce): positive 568 / nonpositive 1,113; fraction 0.33789411064842356; median **−2,624.946810258186 bits** (cell SCR-0726 at ≈ (8.794872e-7, 0.011308)); minimum **−3,828.414517626367 bits** (cell SCR-1681 at (2e-6, 0.015), half-window 1, φ capped at 0.5); maximum **+142,540.7481180454 bits** (cell SCR-0001 at (1e-7, 0.003), half-window 221); baseline cell SCR-0377 at (5e-7, 0.005), margin 41,338.62418456675 bits, half-window 102.

**Rendering specification.**
- Type: 41 × 41 heatmap (one cell per grid point; no interpolation). X axis: extraneous count probability per pulse (dimensionless probability/pulse), linear, 1e-7 → 2e-6. Y axis: intrinsic QBER (fraction), linear, 0.003 → 0.015.
- Color scale: diverging, **anchored at 0** (signed margin, bits). Use only ACADEMIC-palette-derived lightness ramps: positive side from `#8BA3C7` (near zero) to `#2E4A62` (max); nonpositive side from `#8BA3C7` toward `#7A8B99` (most negative), with the zero contour drawn explicitly as a `#333333` line. A continuous diverging colormap is acceptable only if its end points and mid tone are taken from the ACADEMIC palette; no red/green/blue-yellow schemes.
- Annotations (markers, `#333333` outline, labeled in-panel): (a) baseline cell (5e-7, 0.005) — "baseline: M = 41,338.624 bits"; (b) maximum cell SCR-0001 — "max +142,540.748 bits"; (c) minimum cell SCR-1681 — "min −3,828.415 bits"; (d) median marker or legend entry "median −2,624.947 bits (cell SCR-0726)"; (e) legend note "568 positive / 1,113 nonpositive cells; zero contour is grid-resolution-limited, not an analytic threshold".
- A thin annotation band or side panel may show `optimized_half_window_s` per cell only as a separate panel (it varies per cell: min cell uses 1 s, max cell 221 s); do not encode it in the main heatmap color.

**Caption (exact text).**
"Figure 3. Signed key margin (bits) over the deterministic 41 × 41 two-parameter screen (1,681 points; extraneous-count probability per pulse × intrinsic QBER; artifact 05; CFR N-07…N-11). Content is modeled and deterministic; nothing shown is measured. Because the half-window is re-optimized at every grid point, the displayed positive/nonpositive partition (568/1,113; fraction 0.33789411064842356) is an upper-envelope quantity relative to any fixed-window evaluation and is not a probability, availability, or yield. Grid median −2,624.946810258186 bits and minimum −3,828.414517626367 bits are negative; maximum +142,540.7481180454 bits. Screen ranges are engineering bounds, not distributions (V0.7-controlled; provenance REQ-03). All margins are upper bounds with respect to error-correction efficiency (CFR N-27)."

**No-fabrication note.** No probability density, confidence region, or measured operating point is shown: the grid is a deterministic engineering screen (`range_class = V0.7-CONTROLLED-RESEARCH-SCREEN-NOT-DISTRIBUTION` on every row), and no physical device data exist. The zero contour is grid-resolution-limited (21 of 41 extraneous-axis columns contain no positive cell; audit AUD-016-009) and is not an analytic threshold.

---

## Figure 4 — Proof-to-device imperfection mapping (status matrix)

**Purpose.** Show, for all 15 mandated device-imperfection effects, the controlled status label assigned by the D5 master matrix, and that none is mapped in the current fixture.

**Data source.** `/mnt/agents/output/phase1/Q-Orbit_Phase1_Device_Imperfection_Mapping.md` §2 (master matrix) and §7 (consolidated verdict). Theoretical documentation; no numeric data series. Fixture-level corroboration: AUD-016-010 (16 mapping rows, 7 unmapped; row-level CSV verification gated by REQ-05).

**Rendering specification.**
- Type: matrix/schematic — 15 rows (effects) × 3 columns: (i) effect name; (ii) current-scalar contact (TH-PAR touch, or "none"); (iii) resolved current status label (strictest resolution per D5).
- Rows and statuses (exact D5 labels):
  1. Incomplete phase randomization — none — UNMAPPED-PROOF-REQUIRED
  2. Pulse-to-pulse correlations (encoding memory) — none — UNMAPPED-PROOF-REQUIRED + UNMAPPED-CHARACTERIZATION-REQUIRED
  3. Intensity correlations — TH-PAR-004/005 adjacent only — PROOF-PROFILE-CANDIDATE gated by UNMAPPED-CHARACTERIZATION-REQUIRED
  4. State-preparation (encoding) flaws — TH-PAR-008 partial — UNMAPPED-PROOF-REQUIRED
  5. Source leakage / Trojan horse — none — BLOCKING
  6. Dead time / recovery — TH-PAR-002 partial — UNMAPPED-SECURITY-BUDGET
  7. Saturation — TH-PAR-002 linear-regime only — BLOCKING
  8. Detector timing jitter — TH-PAR-002 partial — UNMAPPED-CHARACTERIZATION-REQUIRED
  9. History-dependent afterpulsing — TH-PAR-007 partial — UNMAPPED-PROOF-REQUIRED
  10. Detection-efficiency mismatch — TH-PAR-002 partial — PROOF-PROFILE-CANDIDATE gated by UNMAPPED-CHARACTERIZATION-REQUIRED
  11. Wavelength-dependent response — TH-PAR-002 design-λ only — UNMAPPED-SECURITY-BUDGET
  12. Polarization-dependent response — TH-PAR-002 partial — PROOF-PROFILE-CANDIDATE + UNMAPPED-CHARACTERIZATION-REQUIRED
  13. Detector memory (cross-pulse) — none — UNMAPPED-PROOF-REQUIRED
  14. Characterization uncertainty — none — UNMAPPED-CHARACTERIZATION-REQUIRED
  15. Aging / cross-instance drift — none — UNMAPPED-CHARACTERIZATION-REQUIRED
- Status cells distinguished within the ACADEMIC palette by lightness/hatch (e.g. PROOF-PROFILE-CANDIDATE `#8BA3C7`; UNMAPPED-CHARACTERIZATION-REQUIRED `#6B8CBB`; UNMAPPED-PROOF-REQUIRED `#5C7A99`; UNMAPPED-SECURITY-BUDGET `#3D5A73`; BLOCKING `#2E4A62` with white text), plus the verbatim label text in every cell (color is never the only carrier). Header banner: "0 of 15 effects MAPPED-IN-CURRENT-FIXTURE".
- Grouping brackets: effects 1–5 source-side; 6–13 detector/receiver-side; 14–15 cross-cutting.

**Caption (exact text).**
"Figure 4. Proof-to-device mapping status of the 15 mandated device-imperfection effects (D5 §2/§7). Content is theoretical: status labels are documentation of proof coverage and characterization prerequisites, not device findings. Zero of fifteen effects are mapped in the current fixture; two rows (5 source leakage, 7 saturation) are BLOCKING pending any characterization; every proof-profile candidate is gated by characterization evidence that does not exist (CFR B-01). Detector-side correlated afterpulsing/memory and rate-dependent yields are genuine open literature problems (D5 §6)."

**No-fabrication note.** The figure shows no measured imperfection magnitudes, no correlation lengths, and no mismatch ratios: no characterization data exist, and the fixture's 16-row/7-unmapped internal register is verified only at audit-summary level (REQ-05 gates row-level verification).

---

## Figure 5 — Layered architecture (Layer 0 → Layer 3)

**Purpose.** Show the target layered proof-and-characterization architecture: the frozen fixture as immutable regression reference, the V0.17 hardened analytic layer, the V0.18+ implementation-security layer, and the characterization/certification composition layer.

**Data source.** D4 §4 recommendation 5 (layer table) and D6 (QO-P1-D6) §2, §6, §11. Theoretical documentation; no numeric data series.

**Rendering specification.**
- Type: stacked-layer diagram, four horizontal layers bottom-to-top (or left-to-right), with downward "regression reference" arrow from Layer 1 to Layer 0 and an upward "characterization evidence (future)" arrow into Layer 3.
- Layer contents (verbatim labels):
  - **Layer 0 — Frozen V0.16 fixture.** Immutable regression reference: locked margin equation, 12-test regression suite (CFR N-13), 20-check audit (N-14), deterministic 1,681-point screen (N-07). Status chip: "In place; NUMERICALLY-VERIFIED".
  - **Layer 1 — Hardened analytic finite-key (optical/count layer).** Profile A: Lim/Sidhu skeleton + Kato/Mannalath statistics upgrade + per-claim assumption ledger + 21-split validator + epsilon ledger with symbolic ε_char/ε_auth. Status chip: "V0.17-TA1 shipping proof (specification)".
  - **Layer 2 — Implementation-security proof extensions.** Profile B terms (imperfect phase randomization, state-preparation flaws, correlations, leakage), anchored on Tupkary et al. arXiv:2601.18035 (2026) — chip must read "**PREPRINT anchor; future-work disclosure**" (the preprint's abstract frames imperfection integration as future work; CFR L-09) — plus unified framework Optica Quantum 3, 525 (2025); each term symbolic until characterized. Status chip: "V0.18+ upgrade path; ASSUMPTION-DEPENDENT".
  - **Layer 3 — Characterization/certification composition.** Tan–Nahar (PRX Quantum 7, 020342, 2026) certify-then-run; S_robust, per-parameter CIs, union-bound ε_char; joint-bound claim language only. Status chip: "Execution BLOCKED pending characterization; no certified-security claim permitted".
- Palette: layers filled top-down `#8BA3C7`, `#6B8CBB`, `#5C7A99`, `#2E4A62` (Layer 3 darkest, white text); arrows and borders `#3D5A73`; text `#333333`.

**Caption (exact text).**
"Figure 5. Target layered architecture (D4 §4, D6). Content is theoretical: an architecture specification, not an existing implementation. Layer 0 is the frozen V0.16 fixture (numerically verified as software); Layer 1 is the hardened Profile-A specification; Layer 2 rests on a preprint anchor (arXiv:2601.18035) whose imperfection integration is future work; Layer 3 is blocked pending physical characterization, which has not occurred and is not measured here. No layer currently emits a security claim; all current outputs are conditional computations."

**No-fabrication note.** No layer is depicted as implemented or validated beyond its documented status; in particular Layer 2 shows no covered imperfection terms (all symbolic) and Layer 3 shows no characterization data (none exist). No hardware, deployment, or mission element is shown.

---

## Figure 6 — Evidence ladder (precedence schematic)

**Purpose.** State the package's evidence-precedence rule and its mapping to the CFR evidence classes, so readers can place every manuscript claim.

**Data source.** CFR v1.1 evidence-class definitions (EV-1a/1b/1c, EV-2, EV-3, EV-4, EV-5, EV-9, EV-10) and the Phase 1 Canonical Audit evidence usage. Theoretical documentation; no numeric data series.

**Rendering specification.**
- Type: vertical ladder (6 rungs, highest precedence at top) with a right-hand column mapping each rung to EV classes and to ledger claim examples.
- Rungs (top → bottom, verbatim precedence statement: executable output > hash-verified run summary/CSV > regression fixture > technical report > manuscript prose > unsupported narrative):
  1. **Executable output** (direct recomputation from controlled artifacts) — EV-1b / EV-2 — e.g. grid statistics recomputed bit-exact from artifact 05.
  2. **Hash-verified run summary / CSV** — EV-1a (content-verified; 9/10 artifacts) — e.g. run summary 03, loss curve 02.
  3. **Regression fixture** — EV-1c / EV-3 — e.g. 12/12 tests (artifact 04), 20/20 audit (08), hash-chain-listed items.
  4. **Technical report** (single controlled artifact, no independent cross-check) — EV-4 — e.g. V0.13 50/971 record (underlying JSON EV-9).
  5. **Manuscript prose** — carries claims only as labeled in QO-LEDGER-001; literature context EV-5.
  6. **Unsupported narrative** — never admitted; anything here is fail-closed (EV-10 / BLOCKED).
- A side rail marks EV-9 (unverified pending controlled inputs, REQ-01…05) as "suspended between rungs — not evidence until inputs arrive".
- Palette: rungs `#2E4A62` (top, white text) descending through `#3D5A73`, `#5C7A99`, `#4A6FA5`, `#6B8CBB`, `#7A8B99` (bottom); text `#333333`.

**Caption (exact text).**
"Figure 6. Evidence-precedence ladder of the Q-Orbit package and its mapping to the CFR evidence classes (EV-1a/1b/1c, EV-2, EV-3, EV-4, EV-5, EV-9, EV-10). Content is theoretical: a documentation rule, not data. The ladder is fail-closed — a claim may sit no higher than its evidence — and nothing in the package constitutes measured physical evidence; the 'measured' rung is absent by construction (CFR B-01)."

**No-fabrication note.** No rung claims measured or experimentally validated content; EV-9 items are shown as suspended (not as evidence), and no prohibited-claims-register item appears anywhere on the ladder.

---

*End of QO-FIGSPEC-001.*
