# Q-Orbit Chapters 1–3 V0.2 — Correction and Defect-Closure Report

| Document field | Value |
|---|---|
| Document ID | QO-EDH-CAR-001 |
| Version | V0.2 |
| Date | 12 August 2026 |
| Inputs | Chapters 1–3 V0.1 and Six-Pass Audit V0.1 |
| Corrected outputs | Controlled Registers V0.2 and Chapters 1–3 V0.2 |
| Decision status | Engineering correction complete; Q-Orbit team baseline approval pending |

> **Disposition boundary.** `Closed — document` means the contradiction, ambiguity, unsupported statement, or traceability defect has been corrected in the controlled V0.2 text. It does not mean hardware, software, cryptography, operations, certification, risk acceptance, or a named authority has been completed or approved. `Controlled open` means the former hidden gap is now an explicit blocking TBD with an owner class and required closure evidence.

---

## 1. Executive disposition

All four Critical defects from the Six-Pass Audit are closed at document level in V0.2.

The twelve Major, ten Medium, and four Minor audit defects are either closed at document level or converted into explicit controlled implementation dependencies that block the affected claim or result.

Two additional provenance/currency defects were discovered during correction:

1. the supplied Chapter 3 V0.1 file is truncated and does not match the line count, word count, or SHA-256 recorded in the audit; and
2. ETSI GS QKD 016 V1.1.1 was superseded by the published V2.1.1 edition in January 2024.

Both additional defects are corrected or explicitly recorded in V0.2.

No V0.1 source file was modified.

V0.2 is suitable for a Q-Orbit team baseline decision on the stated engineering decisions. It is not suitable for operational authorization or a claim of system security.

---

## 2. Input provenance and mismatch record

### 2.1 Supplied V0.1 files observed during correction

| File | Observed lines | Observed words | Observed SHA-256 |
|---|---:|---:|---|
| Chapter 1 V0.1 | 396 | 4,916 | `24381bc4f9393fbb78659209bf3d4407ff7c52f60fa36ce1071448868e1ecb61` |
| Chapter 2 V0.1 | 690 | 10,249 | `3159ec3f354412b597a70caa309e87b551f2f610c76a011efeb30b9b93f83b59` |
| Chapter 3 V0.1 | 675 | 9,727 | `610fb673e3d83b76db7e880c61d88ac0dba1446485f9928ed4e47ae5a1968c4c` |
| Six-Pass Audit V0.1 | 397 | — | `4aa2247a18e0bee047e0b6c2cc56777489958db451f0b423a5532ab917ac50df` |

### 2.2 Chapter 3 audit mismatch

The audit records Chapter 3 as 696 lines, 9,885 words, and SHA-256 `c580a40b744416a1fd4375ddc46acabe6eb0ad32a705b88c465455b29823b72e`.

The supplied file observed during correction is 675 lines, 9,727 words, and SHA-256 `610fb673e3d83b76db7e880c61d88ac0dba1446485f9928ed4e47ae5a1968c4c`.

The supplied file ends inside Reference R7 at the incomplete text `DOI: <https://` and therefore cannot be treated as the complete file whose hash is recorded in the audit.

V0.2 does not attempt to reconstruct missing V0.1 prose by guessing. Chapter 3 V0.2 is a complete controlled correction derived from the verified Chapters 1–2 decisions, the visible Chapter 3 content, and the audit's explicit required corrections.

---

## 3. Critical defect closure

| ID | Audit defect | V0.2 correction | Closure evidence | Disposition |
|---|---|---|---|---|
| C-01 | Consumer topology unresolved while nominal flow assumed delivery | Fixed one direct QKD-A/QKD-B link; associated one logical EKM and one local representative consumer with each endpoint domain; excluded remote consumers and trusted relays from the claim | REG §§2, 3, 6 ED-003/004; CH1 §1.5; CH2 §2.5; CH3 §§3.2, 3.5, 3.6 | Closed — document; remote topology remains TBD-016 |
| C-02 | Mission closed at KMS acknowledgement while success required consumer delivery | Defined replenishment as the primary mission outcome; made consumer delivery a separate transaction; separated session state and key lifecycle; defined OUT-1 through OUT-4 | REG ED-005/008/013; CH1 §1.12; CH3 §§3.5–3.12 | Closed — document |
| C-03 | Mixed, untraceable `[V]/[ED]/[A]/[TBD]` scheme | Created global Claim & Evidence, Decision, Assumption, and Open-Issue registers; assigned unique IDs, owner classes, locators, applicability limits, and closure evidence; removed legacy mixed-status markers | REG §§1, 4–8; automated ID and mixed-status checks in §8 of this report | Closed — document |
| C-04 | Protocol claimed neutral/TBD while the analysis assumed DV decoy-state behavior | Declared one explicit analysis assumption: downlink prepare-and-measure polarization efficient BB84, phase-randomized WCP, one signal plus two decoy intensities, finite single-pass treatment; prohibited generalization | REG ED-006/007; CH1 §1.6; CH3 §3.13 | Closed — document; operational selection remains TBD-005/006/007 |

---

## 4. Major defect closure

| ID | Audit defect | V0.2 correction | Evidence/location | Disposition |
|---|---|---|---|---|
| M-01 | ETSI GS QKD 004 reference was obsolete | Replaced V1.1.1 with published V2.1.1 and rechecked key-manager/application and peer synchronization scope | REG SRC-ETSI-QKD004-V211 and CE-009 | Closed — document |
| M-02 | Source IDs repeated with different meanings between chapters | Replaced chapter-local R-numbers with globally unique `SRC-*` IDs and `CE-*` claim IDs | REG §§4–5 | Closed — document |
| M-03 | Threat statements omitted declared source/capability/condition links | Added TS-01–09, CAP-1–7, CW-01–12 and linked each of 28 threat events to them | CH2 §§2.6 and 2.8 | Closed — document |
| M-04 | Priority scale was almost constant | Reallocated 28 unique threats to 11 P1, 15 P2, and 2 P3 entries without inventing likelihood values | CH2 §§2.2.3 and 2.8 | Closed — document |
| M-05 | Raw data rule conflicted with required classical post-processing | Distinguished local raw values, secret intermediate strings, permitted authenticated transcript messages, leakage, accepted final output, and metadata | CH2 §2.5.2; CH3 §3.8.3 | Closed — document; exact transcript remains TBD-005 |
| M-06 | Logical actors, physical hosts, services, and boundaries were conflated | Separated physical hosts, logical QKD/EKM/AQMO/consumer functions, human authorities, per-endpoint boundaries, and responsibility assignments | CH1 §§1.5 and 1.7; CH2 §2.5; CH3 §3.2 | Closed — document; physical boundary allocation remains TBD-008 |
| M-07 | Named customer and evaluator terms were unsupported | Removed the unsupported names and retained a generic, unnamed stakeholder/authority model until written confirmation exists | CH1 §1.3; REG TBD-001 | Closed — document |
| M-08 | Requirement seeds were compound and looked normative | Replaced them with 28 atomic security and 32 atomic operational candidate obligations; named verification methods; kept them explicitly non-baselined | CH2 §2.13; CH3 §3.16; REG ED-016 | Closed for Chapters 1–3; Chapter 4 disposition required |
| M-09 | Logical KMS hid distributed consistency and partial failure | Defined conceptual prepared/committed/unknown pair semantics, idempotency, compare-and-transition, timeout, reconciliation, quarantine, and no universal atomicity claim | REG ED-013; CH3 §3.9 | Closed — document; implementable protocol remains TBD-009 |
| M-10 | No public-release gate | Added POL-10 and PR-GATE-01 covering stakeholder claims, sensitive operational detail, scientific claims, model results, security framing, and authority | REG §§3 and 9; chapter review gates | Closed — document; named release authority remains TBD-020 |
| M-11 | Metrics lacked thresholds and parameter provenance | Defined exact outcome/metric IDs, denominators, units/state, minimum result record, and parameter/provenance fields; prohibited results until numeric inputs and thresholds are frozen | CH3 §§3.12–3.13; REG rule 5 and TBD-013 | Controlled open — blocks quantitative acceptance claims |
| M-12 | August scope exceeded the available evidence | Reduced the target to one coherent baseline, one reproducible reference simulation, selected logical fault cases, and a website derived from controlled material | REG ED-014; CH1 §1.9; CH3 §3.13.4 | Closed — document |

---

## 5. Medium defect closure

| ID | Audit defect | V0.2 correction | Evidence/location | Disposition |
|---|---|---|---|---|
| N-01 | 4,600 km result omitted trusted-relay context at first use | Bound the distance claim to its integrated network and trusted-relay structure; explicitly denied a single trust-free direct-link interpretation | REG CE-004; CH1 §1.2; CH2 §2.12 | Closed — document |
| N-02 | “QKD detects eavesdropping” wording was overbroad | Replaced attack-detection shorthand with profile/proof/device-gate and parameter-estimation language; stated abnormal conditions are not proof of an eavesdropper | CH1 §§1.6 and 1.10; CH2 §2.12 | Closed — document |
| N-03 | QBER appeared to be the principal acceptance metric | Included yields/decoy estimates, phase-error bound, error-correction leakage, security/correctness parameters, authentication, device health, and policy gates | REG CE-017; CH1 §1.6; CH3 §§3.5, 3.12, 3.13 | Closed — document; numeric suite remains TBD-005/006 |
| N-04 | “Residual risk” was used before control implementation/testing | Replaced it with known dependencies/limitations and expressly withheld residual-risk and risk-acceptance claims | CH2 §§2.10 and 2.15 | Closed — document |
| N-05 | No source currency/errata record | Added publication/status/applicability notes for all sources, including Y.3800 Corrigendum 1, FIPS planning notes, SP 800-90B errata, SP 800-57 final/draft status, and SP 800-161 update date | REG §4 | Closed — document; recheck required at each baseline |
| N-06 | No compatibility crosswalk among parallel state models | Added mode/phase/session/key-state compatibility and prohibited interpretations | CH3 §3.10 | Closed — document |
| N-07 | MDI-QKD description lacked scope qualifier | Limited the evidence to detector-side-channel scope and denied inference to source, endpoint, or all implementation risks | REG CE-022; CH2 §2.7 | Closed — document |
| N-08 | Security boundary alternated between per-module and pair-wide | Defined QKD-A and QKD-B as separate endpoint boundaries, EKM-A and EKM-B as separate logical boundaries, and enumerated entry/exit data | CH2 §2.5; CH3 §§3.2 and 3.8.3 | Closed — document; physical realization remains TBD-008 |
| N-09 | Authentication did not establish correctness of external decision data | Added POL-09 and a mandatory stale/conflicting-data hold/abort path unless a predeclared rule resolves the conflict | REG POL-09/ED-012; CH3 §§3.4, 3.11, 3.15 | Closed — document; source contract remains TBD-012 |
| N-10 | No controlled vocabulary | Added controlled definitions for SQDS, AQMO, endpoint/domain, EKM, local consumer, direct link, remote distribution, all key states, exact success, fail closed, no silent downgrade, approval, and baseline | REG §2 | Closed — document |

---

## 6. Minor defect closure

| ID | Audit defect | V0.2 correction | Evidence/location | Disposition |
|---|---|---|---|---|
| L-01 | Reference format was inconsistent | Centralized sources with body/author, title, identifier/version, date/status, canonical link, currency/applicability note, and claim locator | REG §§4–5 | Closed — document |
| L-02 | Repeated policy prose risked drift | Centralized common rules as POL-01 through POL-10 and referenced the controlled decisions throughout the chapters | REG §3 | Closed — document |
| L-03 | General engineering statements carried unreferenced `[V]` labels | Reclassified design statements as `ED`, assumptions as `A`, and factual claims as `V:CE-*` with direct registered sources | REG §§1 and 5; automated checks in §8 | Closed — document |
| L-04 | `shall` in concept chapters could create a hidden baseline | Recast all seeds as non-normative candidate obligations using imperative descriptions without requirement-language activation | CH2 §2.13; CH3 §3.16; REG ED-016 | Closed — document |

---

## 7. Additional defects discovered during correction

| ID | Additional defect | Correction | Disposition |
|---|---|---|---|
| NEW-01 | Supplied Chapter 3 V0.1 is truncated and does not match the audit's fixed-version record | Preserved the supplied file unchanged; recorded the mismatch in §2; produced a complete V0.2 chapter ending in a review gate with no reconstructed quotation or guessed reference text | Closed — provenance recorded and output complete |
| NEW-02 | Chapter 3 V0.1 cited ETSI GS QKD 016 V1.1.1 although published V2.1.1 exists | Registered and used ETSI GS QKD 016 V2.1.1 (January 2024); rechecked its prepare-and-measure pair scope and applicability limit | Closed — document |

---

## 8. Verification record

### 8.1 Automated structural checks

| Check | Result |
|---|---|
| All chapter `CE`, `ED`, `A`, and `TBD` references resolve to QO-EDH-REG-001 | Pass |
| Duplicate definitions among `CE`, `ED`, `A`, and `TBD` IDs | None |
| Mixed status categories on one controlled line | None |
| Legacy bare `[V]`, `[ED]`, `[A]`, or `[TBD]` markers | None |
| Globally unique registered `SRC-*` definitions | Pass |
| Incomplete URL tail such as the supplied V0.1 `DOI: <https://` | None in V0.2 |
| Unsupported named-customer/evaluator terms from M-07 | None in V0.2 |
| Obsolete ETSI QKD 004/016 editions from M-01/NEW-02 | None in V0.2 controlled sources |
| Markdown fenced blocks | Balanced |
| Mermaid diagrams parsed with Mermaid 11.12.0 | Pass — 7/7 blocks |
| Markdown table column counts | Consistent |
| Unique threat events | 28 |
| Threat priority distribution | 11 P1 / 15 P2 / 2 P3 |
| Security candidate obligations | 28, sequential |
| Operational candidate obligations | 32, sequential |
| Required chapter/register review gates | Present |

### 8.2 Manual engineering checks

| Check | Result |
|---|---|
| One topology across Chapters 1–3 | Pass — direct QKD-A/QKD-B with local endpoint-domain handoff only |
| Primary completion point | Pass — matching two-sided EKM commit |
| Consumer delivery separation | Pass — independent transaction and metric |
| Partial/unknown commit behavior | Pass — unavailable, quarantine/reconciliation |
| QKD analysis profile | Pass — explicit and profile-limited |
| QBER overclaim | Pass — not a sole acceptance condition |
| Threat statement construction | Pass — TS/CAP/CW/boundary/asset/effect links present |
| External authenticated-data conflict | Pass — hold/abort unless a predeclared rule resolves it |
| AQMO authority | Pass — metadata only, no keys, no local-gate override |
| Public-release behavior | Pass — PR-GATE-01 blocks publication without positive disposition |
| Operational/security proof claim | Absent |

### 8.3 V0.2 release manifest

The final line, word, and SHA-256 values for the four controlled technical documents are recorded below. A separate checksum manifest records these files and this report without creating a self-referential report hash.

| File | Lines | Words | SHA-256 |
|---|---:|---:|---|
| Controlled Registers V0.2 | 245 | 4,803 | `c4900b95af6af243b2cdf116e26d7d2b884dd709c546d111b6a63a154d221753` |
| Chapter 1 V0.2 | 365 | 2,876 | `f600e1d0f80757589113fb628495417f1519d7eb3f358b65abb15afa74059507` |
| Chapter 2 V0.2 | 510 | 5,535 | `4271e18399aa0d4dda6a19559676a00bd38363ea1703973f0499164483a4188e` |
| Chapter 3 V0.2 | 831 | 8,047 | `bed8a2dec411c1260cbc925e738da103405a4513b1c93cb52c4448360da9cac9` |

---

## 9. Gate recommendation

The former `Return for targeted correction` decision can be replaced with **Ready for Q-Orbit team baseline decision** for Chapters 1–3 V0.2, subject to explicit acceptance of REG-G1, CH1-G1-V0.2, CH2-G1-V0.2, and CH3-G1-V0.2.

This recommendation does not waive any `TBD-*` item.

Chapter 4 should begin only after the team accepts or revises ED-003 through ED-008, ED-013, and ED-016 because those decisions define the topology, protocol-analysis profile, success condition, safe pair-state semantics, and status of candidate obligations.

No simulation result should be published or accepted until TBD-003 through TBD-007 and TBD-013 are closed for the exact run, the parameter/provenance record is frozen, and PR-GATE-01 is positively dispositioned.

No implementation should claim operational security until the remaining architecture, boundary, EKM, consumer, AQMO/data, independent verification, authority, and risk items are closed by their named evidence routes.
