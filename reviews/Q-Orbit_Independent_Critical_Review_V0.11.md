# Q-Orbit Independent Critical Review — V0.6 through V0.11

| Field | Value |
|---|---|
| Review ID | `QO-ICR-001` |
| Review date | 21 August 2026 |
| Reviewed chain | V0.6, V0.7, V0.8, V0.9, V0.10, V0.11 |
| Review type | Independent re-execution, numerical reconstruction, structural inspection, semantic review, and source-currency check |
| Modification policy | Read-only review; no reviewed package was changed |
| Overall disposition | **CONDITIONALLY SOUND AS PRIVATE DESK RESEARCH; REMEDIATION REQUIRED BEFORE SCI-G1/SIM-G1 OR A NEW TABUK CASE** |

## 1. Executive conclusion

No evidence was found that the project has fabricated a Tabuk performance result, approved a site, authorized a laser, or represented a synthetic result as operational. The most important fail-closed controls remain intact:

- Tabuk is a study region only.
- A Tabuk-specific controlled simulation is `NOT RUN`.
- The quantitative Tabuk result is `NONE`.
- Laser emission is `INHIBITED`.
- Release is `PRIVATE-BLOCKED`.
- `ARCH-G1`, `SCI-G1`, and `SIM-G1` remain not passed.

The retained numerical results are reproducible:

- V0.6 reconstructs exactly to `41,338.62418456675` pre-floor bits and `41,338` reported bits for its frozen reference fixture.
- V0.7 reruns to `540,673` nominal bits, `3,947/8,192 = 0.4818115234375` positive samples, and a zero nonnegative-key median.
- V0.9 climate summaries and workbook scores reproduce from the retained raw data.
- V0.10 and V0.11 workbook/package integrity checks pass.

However, the review found one high-severity governance inconsistency, seven material methodological or traceability limitations, and one low-severity time-label ambiguity. The `PASS` labels in V0.8–V0.11 are valid only within their stated structural/desk scope. They are not scientific validation, implementation verification, site qualification, security proof, or operational readiness.

## 2. Review method and evidence

The review did not trust prior `PASS` labels as proof. It performed the following checks independently:

1. Revalidated all 132 SHA-256 entries across V0.6–V0.11.
2. Re-ran the V0.6 and V0.7 controlled audit programs in isolated temporary copies using Python 3.12.13, NumPy 2.3.5, and SciPy 1.17.0.
3. Reconstructed the V0.6 finite-key equation directly from recorded intermediate values.
4. Recomputed V0.7 positive count, quantiles, nested prefixes, and Spearman rankings from the 8,192 retained samples.
5. Recomputed the signed, pre-clamp finite-key expression for all 8,192 V0.7 samples to test whether output clipping affected the sensitivity conclusion.
6. Recomputed V0.9 NASA POWER summary statistics from the three retained raw JSON responses.
7. Recomputed V0.9 terrain-screen eligibility and the two score lenses.
8. Imported and inspected the V0.8, V0.9, and V0.10 workbooks; no cached formula errors were found.
9. Audited the V0.10 requirements, parameters, verification matrix, sources, gates, and orphan references.
10. Audited all 239 V0.11 trace rows and independently rechecked every upstream hash listed in the V0.11 manifest.
11. Re-ran the V0.11 31-check audit in an isolated copy and tested the delivery ZIP.
12. Checked current primary-source status for the critical scientific, atmospheric, orbit, laser-safety, and Saudi aeronautical routes.

## 3. Package-by-package disposition

| Package | What was independently confirmed | Correct interpretation | Review disposition |
|---|---|---|---|
| V0.6 | Exact finite-key reconstruction; 221-window screen; 12/12 numeric comparisons; 12/12 negative controls; deterministic rerun | One retained SatQuMA v1.0.0 fixture reproduction, not a mission result or security validation | **Accept with original limits** |
| V0.7 | Exact nominal rerun; 8,192 samples; 3,947 positive; zero nonnegative-key median; retained sampled ranking reproduced | Synthetic Riyadh screening case; not reliability, probability, Tabuk performance, or an accepted design | **Accept numeric outputs; revise sensitivity wording/diagnostics** |
| V0.8 | 13 sources, 21 acquisition rows, 18 P0 rows, zero acquired rows; workbook intact | Acquisition-contract kickoff only; correctly `NOT_READY` | **Accept with stated boundary** |
| V0.9 | Raw climate statistics, horizon summaries, scores, 47 formulas, and 3 charts reproduce | Desk screening and survey-order heuristic only; no site or parcel approved | **Needs method transparency correction before reuse** |
| V0.10 | 103 requirements, 109 parameters, 103 verification rows, 13 gates, 14 interfaces, 35 sources, 489 formulas, no formula errors | Requirements inventory and fail-closed desk baseline; verification not executed | **Structural pass only; governance/V&V remediation required** |
| V0.11 | Counts, state distributions, historical numbers, 239 trace rows, 31/31 structural checks, all 11 upstream hashes, ZIP integrity | Private Chapter 6/7 desk integration; no Tabuk run or new physics | **Accept only as desk integration; issue R1 before gate review** |

## 4. Verified numerical facts

### 4.1 V0.6 finite-key fixture

Independent reconstruction used:

\[
\ell_{\mathrm{signed}} = s_{X,0}+s_{X,1}[1-h_2(\phi_X)]-\lambda_{EC}
-6\log_2(21/\epsilon_s)-\log_2(2/\epsilon_c)
\]

Result:

| Quantity | Reconstructed | Recorded | Difference |
|---|---:|---:|---:|
| Pre-floor expression | 41,338.62418456675 | 41,338.62418456675 | 0 |
| Reported key | 41,338 bits | 41,338 bits | 0 |

The result remains a fixture reproduction. The retained author release is genuinely SatQuMA `v1.0.0`, commit prefix `6012c07`, but agreement with author code is not an independent security proof or general validation of SatQuMA.

### 4.2 V0.7 joint screen

| Quantity | Independent result |
|---|---:|
| Samples | 8,192 |
| Positive samples | 3,947 |
| Positive fraction | 0.4818115234375 = 48.18115234375% |
| Zero/non-positive samples after clipping | 4,245 |
| Stored nonnegative-key median | 0 bits |
| Stored p90 | 426,580.7138086917 bits |
| Stored maximum | 3,002,586.0013382677 bits |

The physical conclusion is stable: more than half of the declared design-space samples produce no deliverable key under the fixed nominal window. The positive fraction is not a probability of mission success because the ranges are independent uniform screening ranges, not calibrated probability distributions.

### 4.3 V0.9 climate and scoring

All retained NASA POWER summaries reproduce exactly to the stored four-decimal values. The 9,131 daily records per candidate correctly cover 2001-01-01 through 2025-12-31. NASA POWER documents that daily values remain at their original source spatial resolution; the identical Lawz/Bajdah series and identical aerosol series across all three cells therefore support the package's resolution-limit warning, not a physical-equality claim.

The workbook scores also reproduce:

| Candidate | Optical potential | Field-survey priority |
|---|---:|---:|
| `TAB-LAWZ-C01` | 73.420 | 51.003 |
| `TAB-BAJ-C02` | 50.254 | 49.024 |
| `TAB-WTB-C03` | 56.241 | 65.856 |

These are weighted screening indices, not probabilities, availability estimates, or acceptance scores.

## 5. Findings

### `ICR-001` — High: GOV-008 is marked desk-ready although its closure condition is not present

V0.10 requirement `GOV-008` states that every TBD design or acceptance value shall name:

- a closure owner;
- required evidence class;
- verification method; and
- decision gate.

Its acceptance evidence says a TBD audit shall find zero values without those fields, and its evidence state is `DESK-READY`.

The actual 109-row parameter baseline does not satisfy that condition:

- all 109 `owner_role` values are exactly `TBD by domain authority`;
- the parameter schema has no dedicated `evidence_class` column;
- it has no dedicated `verification_method` column; and
- it has no dedicated `decision_gate` column.

V0.11 adds group-level gate allocations, but it does not name the parameter owners or create parameter-level verification methods/evidence classes. The V0.10 audit does not test `GOV-008` acceptance evidence. This is a real internal inconsistency, not merely an open physical input.

**Required correction:** change `GOV-008` to non-passed/non-desk-ready until the parameter register contains real closure fields and named accountable roles, or add and populate those fields before re-auditing.

### `ICR-002` — Medium: the V0.7 sensitivity order depends on clipping the signed finite-key margin to zero

The V0.6 core computes a signed finite-key expression and then stores:

```text
raw_secret_key_bits = max(signed_expression, 0)
```

V0.7 calculates Spearman sensitivity against this clipped value. Reproducing that declared metric gives the published top three:

1. receiver aperture;
2. beam divergence;
3. extraneous-count probability.

Independent reconstruction of the signed pre-clamp expression gives:

| Signed diagnostic | Value |
|---|---:|
| Minimum | -220,203.765 bits |
| p10 | -155,977.444 bits |
| Median | -8,738.764 bits |
| p90 | 426,580.714 bits |
| Positive count | 3,947 |

Spearman ranking against this signed margin changes the leading order to:

1. extraneous-count probability, `|rho| = 0.5120`;
2. receiver aperture, `|rho| = 0.4440`;
3. beam divergence, `|rho| = 0.4153`.

This does not change the positive count or the operational zero-key median. It does mean that the unqualified phrase “most influential factors” is too broad. The published order is the order for a **clipped nonnegative deliverable-key metric with 4,245 tied zeros**, not a unique global influence ranking.

**Required correction:** retain the current result but label the metric precisely, preserve the signed pre-clamp margin as a separate diagnostic, and report both rankings or use a declared global-sensitivity method appropriate to the decision.

### `ICR-003` — Medium: the Jabal al-Lawz candidate was selected through an undisclosed constraint fallback

The V0.9 terrain code initially requires Lawz cells to meet:

- elevation at least 1,900 m;
- slope at most 8 degrees; and
- approximately 1 km relief at most 180 m.

Only 5 sampled cells met all three conditions. Because the count was below 10, the code silently replaced the strict mask with an elevation-only mask. The selected `TAB-LAWZ-C01` cell then had:

- elevation: 2,382 m;
- slope: 1.4 degrees; and
- relief: **230 m**, exceeding the declared 180 m limit.

The report responsibly states that the selected cell has about 230 m relief and that a buildable pad is not established. However, neither the candidate record nor the provenance record identifies that the selection came from a fallback that relaxed the original constraints.

**Required correction:** add an explicit `selection_mode`/`fallback_reason`, retain the strict-eligible count, and either select a strict cell with sufficient surrounding DEM coverage or treat Lawz as a search region without a ranked coordinate.

### `ICR-004` — Medium: Saudi AIP source rows were marked verified while pointing to superseded issues

As of 21 August 2026, the official SANS publication history lists AIRAC AIP AMDT `08/26`, effective 6 August 2026, as the currently effective issue. It explicitly places `07/26` in expired archives.

The reviewed registers instead use:

- V0.9 `TAB-SRC-008`: OETB page from AIP AMDT `04/24`;
- V0.9 `TAB-SRC-009`: OENN page from AIP AMDT `06/24`, effective in 2025;
- V0.10 `GSLR-SRC-029`: OETB page from AIRAC AIP AMDT `07/26`; and
- V0.10 `GSLR-SRC-030`: the same older OENN page.

All four were marked `VERIFIED` on 20 August 2026. This verification status is not correct as a currency statement. No unsafe operational conclusion followed—the packages explicitly treat airport distance as context and preserve laser inhibition—but the source register must not call an expired operational publication current.

**Required correction:** reference the SANS current-issue landing page plus the exact effective issue used, capture effective/publication dates, and require a freshness check at every operational or safety review.

### `ICR-005` — Medium: West Tabuk's field-survey lead is driven by an airport-distance heuristic, not demonstrated logistics

The V0.9 field-survey score assigns 25% weight to a component that gives a higher score for being closer to the OETB airport reference point. It also assigns 25% to internal constraint-readiness judgments. No road, travel-time, ownership, power, fibre, security, or maintenance data were acquired.

With the published formula:

- Lawz scores 51.003;
- West Tabuk scores 65.856.

If the airport-distance component is removed while every other component—including readiness—is retained, the order reverses:

- Lawz: 44.928 before renormalization;
- West Tabuk: 43.396 before renormalization.

Thus the airport-distance proxy is decision-dominant. Closeness to an airport is not itself logistics access and may increase rather than reduce later laser/airspace constraints.

**Required correction:** preserve West Tabuk as an explicit management decision if desired, but do not present it as a robust data-derived site ranking. Replace the proxy with actual route, parcel, utility, access, and authority evidence when execution resumes.

### `ICR-006` — Medium: V0.10 is not yet an executable verification plan

The requirements are well written and have unique acceptance-evidence statements, but the verification-method field is not technically discriminating:

- `REVIEW`: 101 of 103 requirements;
- `ANALYSIS`: 2 of 103 requirements;
- `TEST`, `INSPECTION`, or `DEMONSTRATION`: 0 explicitly coded;
- all 103 `test_or_review_id` values: `TBD`;
- all 103 results: `NOT-EXECUTED`.

Every `CALIBRATED-HARDWARE` requirement (30), `MEASURED-SITE` requirement (22), and `OPERATIONAL-TEST` requirement (17) is still assigned `REVIEW`. Review of a calibration or test report can be part of acceptance, but it is not a sufficient executable method definition by itself.

**Required correction:** decompose verification into production method and acceptance review, assign test/analysis/inspection/demonstration IDs, define procedures and tolerances, and then preserve review as the approval step.

### `ICR-007` — Medium: the 239-row V0.11 crosswalk is exhaustive but coarse

The V0.11 crosswalk contains all expected rows and no blank allocations. However:

- all requirements within each of the 10 domains share one identical Chapter 6/Chapter 7/gate allocation signature;
- all parameters within each of the 26 groups share one identical allocation signature; and
- the V0.11 audit checks that allocation fields are nonempty, not that each individual requirement is enforced by a specific model variable, code path, test, or result record.

Therefore “239 rows allocated” is true, but it is architectural allocation, not end-to-end requirement-to-code-to-test traceability.

**Required correction:** for the next implementation baseline, trace each P0 requirement and each run-used parameter to its schema field, code module/function, verification case, evidence artifact, and gate result.

### `ICR-008` — Medium-low: V0.11 is not self-contained for historical numerical reproduction

The V0.11 manifest pins summary reports for V0.6 and V0.7, not the V0.6/V0.7 raw run JSON, sample CSV, executable code, and environment lock used to derive the historical numbers. The V0.11 audit also does not recompute the listed upstream hashes.

The current workspace is internally consistent: this review independently recalculated all 11 upstream manifest hashes and found no mismatch, and the complete V0.6/V0.7 packages remain available. The limitation appears only when V0.11 is moved or reviewed by itself.

**Required correction:** either bundle a machine-readable evidence index that pins the raw numerical artifacts or state explicitly that V0.11 requires the controlled predecessor packages for numerical reproduction. Add upstream-hash verification to the V0.11 audit.

### `ICR-009` — Low: “usable duration” mixes elapsed time with inclusive one-second bins

For the selected V0.7 pass:

- first retained timestamp: offset -250 s;
- last retained timestamp: offset +253 s;
- endpoint elapsed time: 503 s;
- inclusive one-second samples: 504.

The code reports `usable_duration_s = end - start + 1 = 504`. This is defensible as 504 one-second exposure bins, but it is not the endpoint-to-endpoint duration. The same inclusive-bin convention appears in finite-key windows.

**Required correction:** label the value `usable_sample_bins = 504` and separately report elapsed interval or interpolated mask-crossing duration.

## 6. What remains valid and must not be reinterpreted

The following statements survived review and should remain unchanged:

1. `41,338 bits/pass` belongs only to the frozen V0.5/V0.6 reference fixture.
2. `540,673 bits/pass` is the V0.7 synthetic nominal case, not a Tabuk result or mission threshold.
3. `3,947/8,192` and the zero nonnegative-key median demonstrate sensitivity over the declared screening box; they do not estimate reliability.
4. Tabuk is the selected study region, not an approved site.
5. `TAB-WTB-C03`, `TAB-LAWZ-C01`, and `TAB-BAJ-C02` are provisional desk cells, not parcels.
6. V0.8 has zero acquired owner/measured evidence and is correctly `NOT_READY` for a new mission case.
7. V0.10 contains requirements and closure gates, not a terminal design or verified system.
8. V0.11 contains no Tabuk simulation and no quantitative Tabuk output.
9. Laser emission remains `INHIBITED` and Saudi airspace coordination remains case-specific and deferred.
10. External release remains `PRIVATE-BLOCKED`.

## 7. Required remediation order

Before opening a new chapter or a Tabuk-specific simulation:

1. **Correct V0.10 governance:** make `GOV-008` truthful; add named parameter owners, evidence class, verification method, and closure gate.
2. **Correct source currency:** replace expired SANS AIP references and add effective-date/freshness controls.
3. **Correct V0.9 provenance:** disclose the Lawz fallback and reclassify or rerun the candidate selection.
4. **Correct the V0.7 sensitivity statement:** distinguish clipped deliverable key from signed finite-key margin.
5. **Upgrade the V&V matrix:** assign executable test/analysis/inspection/demonstration methods and IDs.
6. **Deepen V0.11 traceability:** connect P0 requirements and used parameters to concrete schema/code/test/evidence records.
7. Re-run the full audit chain and issue a controlled `V0.11R1` or `V0.12` review-remediation package.

Physical site execution may remain deferred as previously decided. These remediation items are desk work and should be completed before the next technical design package.

## 8. Final review decision

The evidence chain preserves provenance, refuses to promote synthetic numbers, and fails closed on site, hardware, safety, authority, and release gaps. The numerical core reviewed here is reproducible.

The chain is not yet ready for a scientific or engineering gate claim because the parameter-closure requirement is internally false, the Lawz selection fallback is not provenance-visible, the principal V0.7 sensitivity order is metric-dependent, the V&V method taxonomy is not executable, and Saudi AIP currency was not controlled correctly.

**Decision:** retain V0.11 as a private desk integration baseline, do not represent its `PASS` as scientific validation, and complete the listed remediation before proceeding to SCI-G1, SIM-G1, a terminal baseline, or a Tabuk mission case.

## 9. Primary-source currency references checked

- [Sidhu et al., finite-key satellite QKD method](https://www.nature.com/articles/s41534-022-00525-3)
- [SatQuMA official release repository](https://github.com/cnqo-qcomms/SatQuMA/releases)
- [CCSDS 502.0-B-3 Orbit Data Messages](https://ccsds.org/publications/allpubs/entry/3073/)
- [CCSDS 141.1-M-1 atmospheric characterization](https://ccsds.org/publications/allpubs/entry/3230/)
- [CCSDS 140.1-G-2 real-time weather and atmospheric data](https://ccsds.org/publications/allpubs/entry/3226/)
- [ITU-R P.1621-2, in force](https://www.itu.int/rec/R-REC-P.1621-2-201507-I/en)
- [NASA POWER Daily API](https://power.larc.nasa.gov/docs/services/api/temporal/daily/)
- [NASA SRTMGL1 V003](https://www.earthdata.nasa.gov/data/catalog/lpcloud-srtmgl1-003)
- [NASA Black Marble](https://www.earthdata.nasa.gov/data/projects/black-marble)
- [GACAR Part 139](https://gaca.gov.sa/rules-and-regulations-category/aviation-safety-and-environmental-sustainability/gacar-safety-regulations/chapter-h-aerodromes-part-139---certification-authorization-and-operation-of-aerodromes)
- [SANS published eAIP issue history](https://aimss.sans.com.sa/assets/FileManagerFiles/history-en-SA.html)
- [IEC 60825-12:2022, corrected version 2026-01](https://webstore.iec.ch/en/publication/65386)
