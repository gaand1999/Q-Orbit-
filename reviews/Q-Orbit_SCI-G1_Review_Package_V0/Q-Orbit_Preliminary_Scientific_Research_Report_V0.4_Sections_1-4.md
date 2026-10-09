# Q-Orbit Preliminary Scientific Research Report V0.4

## Sections 1–4 — SCI-G1 Review Draft

| Report field | Value |
|---|---|
| Document ID | QO-RES-001 |
| Version | Sections 1–4 Draft V0.4 |
| Date | 18 August 2026 |
| Research phase | P2 — Scientific method |
| Method owner | QO-EDH-CH06 V0.4 |
| Parameter owner | QO-EDH-CH06-ANN-A V0.4 |
| Architecture dependency | QO-GATE-CF-001; ARCH-G1 remains not passed |
| Simulation state | **NOT RUN** |
| Results sections | Section 5 not drafted; no quantitative result exists |
| Release state | Private; PR-GATE-01 not authorized |

> **Research boundary.** This draft defines why the question matters and how it will be tested. It reports no Q-Orbit performance, key length, key rate, orbit suitability, security validation, or operational feasibility result.

---

## 1. Introduction and Research Problem

### 1.1 Context

A sufficiently capable future quantum computer could threaten widely used public-key mechanisms, although the arrival time of such a capability is uncertain. Long-lived information may therefore face harvest-now-decrypt-later exposure when captured ciphertext remains valuable. `[V:CE-001]` `[V:CE-002]`

Q-Orbit studies one narrow response space: a direct satellite-to-ground quantum-key-distribution reference link whose accepted output may replenish corresponding endpoint key managers. QKD is treated here as a partial key-establishment layer. It is not a quantum bearer for mission plaintext and it does not, by itself, establish endpoint security, implementation security, availability, denial-of-service resistance, certification, or operational approval. `[ED:ED-002]` `[V:CE-005]` `[V:CE-006]` `[V:CE-007]`

Published satellite-to-ground experiments show that space-based quantum communication and decoy-state QKD can be studied under specific experimental conditions. Their distances, rates, sites, devices, and network structures are evidence of precedent, not Q-Orbit performance parameters or promises. `[V:CE-003]` `[V:CE-004]`

### 1.2 Problem statement

The central research problem is not simply whether a quantum optical link can produce a positive number in a favorable calculation. A defensible preliminary study must keep five questions separate:

1. did the candidate physical opportunity meet its declared access and channel-readiness conditions (OUT-1)?
2. did a profile-specific finite-block QKD calculation and every required security/device/configuration gate permit acceptance (OUT-2)?
3. did both endpoint key managers establish the same binding-specific committed/available state (OUT-3)?
4. if separately attempted, did both authorized local consumers and both key managers establish the corresponding delivery state (OUT-4)?
5. can an independent reviewer reproduce those discrete outcomes and the associated numeric outputs from retained sources, parameters, code, environment, and run records?

Collapsing these questions into one generic success label would obscure failure, uncertainty, and responsibility boundaries. Q-Orbit therefore treats explicit non-success behavior as part of the subject of study, not as an implementation detail to be added after a positive link calculation.

### 1.3 Research contribution boundary

The intended preliminary contribution is a coherent, reviewable method that joins:

- one direct downlink reference topology;
- a finite-block, single-pass, profile-specific QKD calculation;
- explicit authentication, device, data, configuration, policy, and evidence gates;
- two-sided EKM commit semantics;
- constrained orchestration without key access or gate override; and
- exact, separately recorded outcomes and limitations.

The work does not claim a new QKD security proof, a new optical terminal, a new key-management protocol, an operational mission architecture, or a validated system.

### 1.4 Research objective

The P2 objective is to freeze the analysis method and configuration structure sufficiently that P3 can implement and reproduce a bounded reference model without inventing missing mission or device facts. Success at P2 therefore means method completeness and traceability—not a positive key-generation result.

---

## 2. Literature and Evidence Review

### 2.1 Review method

The evidence review uses atomic claim records (`CE-*`) linked to primary scientific or official sources. Each claim carries an applicability limit. The review distinguishes:

- external evidence about quantum risk, QKD precedent, practical security, standards, and attack classes;
- Q-Orbit engineering decisions (`ED-*`);
- Q-Orbit assumptions (`A-*`); and
- unresolved items (`TBD-*`).

A citation supports only its recorded claim. It does not approve a Q-Orbit design choice or transfer a source's numeric settings into the Q-Orbit parameter register.

### 2.2 Evidence theme A — quantum-era confidentiality motivation

NIST explanatory and standardization material supports two bounded observations used here: sufficiently capable quantum computation could threaten widely used public-key mechanisms, and captured ciphertext may remain at risk when its confidentiality lifetime extends into a future decryption capability. `[V:CE-001]` `[V:CE-002]`

The evidence does not provide a date for a cryptographically relevant quantum computer, a Q-Orbit customer, a data lifetime, a mission consequence, or a key-demand value. Those remain mission inputs under TBD-001 and TBD-002.

### 2.3 Evidence theme B — satellite-QKD precedent and topology limits

Liao et al. reported satellite-to-ground decoy-state QKD under a specific experimental configuration and range. `[V:CE-003]` Chen et al. reported a wider integrated network that combined satellite and fiber links with a trusted-relay structure. `[V:CE-004]`

These works motivate studying space-to-ground QKD but do not establish:

- that a Q-Orbit link will reproduce a reported distance or rate;
- that a trusted-relay network is equivalent to the direct CASE-S1 topology;
- that a published site, orbit, terminal, detector, or weather condition applies to Q-Orbit; or
- that experimental quantum-link success implies two-sided EKM replenishment.

### 2.4 Evidence theme C — finite-block, single-pass method

Sidhu et al. analyze finite-key effects for limited satellite passes and show why an asymptotic calculation can be optimistic for short received blocks. `[V:CE-015]` Their analysis uses a downlink weak-coherent-pulse efficient-BB84 profile with three intensities, including two decoys, and evaluates single-pass finite secret-key length. `[V:CE-016]`

Their key-length calculation is not a QBER threshold alone. It includes bounds on vacuum and single-photon contributions, a phase-error bound, error-correction leakage, and secrecy/correctness terms. `[V:CE-017]`

Q-Orbit adopts this work as a computational reference under ED-007, not as an operational protocol approval. The equations, conventions, finite-statistics construction, code path, numerical behavior, and applicability to the future CASE-S1 parameterization must be independently reproduced before any Q-Orbit result is marked reproduced or validated.

### 2.5 Evidence theme D — implementation and system-security boundary

Primary scientific review and ETSI material establish that practical QKD security depends on the relationship between real devices/implementations and the assumptions of the security analysis. `[V:CE-005]` QKD also requires an authenticated classical channel or an externally established authentication mechanism. `[V:CE-006]` It does not by itself prevent channel interference or denial of service. `[V:CE-007]`

Published time-shift, bright-illumination, and Trojan-horse studies establish attack classes against practical QKD implementations. `[V:CE-018]` `[V:CE-019]` `[V:CE-020]` These are not vulnerability findings against unbuilt Q-Orbit hardware. They justify device/proof mapping, health gates, characterization, and negative-case planning under TBD-006.

Decoy-state methods address multiphoton weak-coherent-pulse risk under their stated assumptions. `[V:CE-021]` Measurement-device-independent QKD is designed to remove detector side channels under its architecture and assumptions. `[V:CE-022]` Neither claim means that every source/device imperfection is solved or that MDI-QKD is selected for CASE-S1.

### 2.6 Evidence theme E — key management, control, and orchestration analogies

ETSI GS QKD 004 provides a model in which peer QKD key managers synchronize and deliver corresponding key sets to applications. `[V:CE-009]` ETSI GS QKD 014 defines a REST-based key-delivery interface using key identifiers. `[V:CE-010]` Q-Orbit uses these as candidate interface evidence only and makes no conformance claim.

ETSI GS QKD 016 V2.1.1 provides a protection profile for a pair of prepare-and-measure QKD modules and includes authenticated-classical-channel, audit, self-test, access-control, and secure-state objectives or requirements within its scope. `[V:CE-011]` It does not certify or cover SQDS as a whole.

ITU-T Y.3800, X.1717, and Y.3832 provide terminology and network/control/orchestration context. `[V:CE-012]` `[V:CE-013]` `[V:CE-014]` AQMO uses these sources only by analogy until a formal applicability and conformance mapping exists.

### 2.7 Evidence theme F — cryptographic and engineering governance

NIST has standardized ML-KEM and ML-DSA, but their existence does not select an authentication or hybrid construction for Q-Orbit. `[V:CE-023]` NIST key-management and entropy-source guidance motivates lifecycle and source-evidence controls, while exact implementation remains open. `[V:CE-024]` `[V:CE-025]`

NIST risk-assessment and cybersecurity-framework sources provide process structures rather than Q-Orbit likelihoods, control effectiveness values, risk scores, or acceptance decisions. `[V:CE-026]` `[V:CE-027]`

### 2.8 Literature-derived research gap

The reviewed evidence supports studying each of the following pieces separately: satellite-to-ground QKD, finite-block secret-key analysis, implementation/security assumptions, key-management interfaces, and constrained network/control governance. It does not establish the combined CASE-S1 outcome chain for Q-Orbit.

The research gap addressed by this preliminary work is therefore methodological:

> Can a single configuration-controlled model join the physical opportunity, finite-block QKD calculation, non-numeric security/device/data gates, two-sided EKM state semantics, explicit non-success cases, and reproducible evidence without converting precedent into unsupported Q-Orbit performance or security claims?

---

## 3. Research Question, Hypothesis, and Method

### 3.1 Research question

> Under a profile-specific finite-block satellite QKD reference case, can a direct QKD-A/QKD-B link with two-sided EKM commit semantics and constrained AQMO orchestration produce a reproducible preliminary key-replenishment result while failing closed under selected security, data, and coordination faults?

### 3.2 Preliminary hypothesis

> For some explicitly sourced parameter regimes, the reference model may produce positive two-sided replenishment after every required profile, authentication, device, configuration, policy, data, and EKM gate passes. Outside those regimes, or when any required gate fails or is indeterminate, the model will produce an explicit non-success outcome without exposing ambiguous key material as available.

This is a falsifiable hypothesis, not a finding.

### 3.3 Units of analysis

The principal unit of analysis is one frozen CASE-S1 run representing one candidate pass and its associated state/evidence chain. A run contains:

- one immutable case manifest;
- one parameter-register version;
- one geometry/access record;
- one optical/detection and finite-block calculation path;
- individual required gate states;
- one binding-specific EKM pair-state path;
- OUT-1 through OUT-4; and
- one complete run/evidence record.

Negative and indeterminate fixtures use the same unit of analysis with one or more declared fault injections.

### 3.4 Reference case

CASE-S1 contains one candidate low-Earth-orbit satellite role and one optical-ground-station role for the first analysis case, with the satellite as reference transmitter and the ground endpoint as reference receiver. `[A:A-001]` `[A:A-002]` Exact orbit, ephemeris, site, interval, optical, device, and mission-threshold values are not selected in this draft.

The system boundary includes QKD-A/B, EKM-A/B, local representative consumers, constrained AQMO orchestration, non-secret evidence/configuration, and release control. The model and website remain outside key custody.

### 3.5 Analysis stages

The controlled method uses nine stages:

1. source and parameter intake;
2. analysis-case freeze;
3. geometry and access;
4. optical/link and detection statistics;
5. finite-block QKD analysis;
6. authentication/profile/device/configuration/policy/data gate lattice;
7. EKM pair-state simulation;
8. exact outcomes and metrics; and
9. retained reproducibility and limitation evidence.

FIG-011 presents the same stages and the required no-key, indeterminate, and quarantine branches.

### 3.6 Finite-block method

The computational contract is the Sidhu et al. 2022 single-pass, finite-block, three-intensity/two-decoy efficient-BB84 method. The reference secret-key-length structure is:

\[
\ell=\left\lfloor
s_{X,0}+s_{X,1}[1-h_2(\phi_X)]-\lambda_{EC}
-6\log_2(21/\epsilon_s)-\log_2(2/\epsilon_c)
\right\rfloor.
\]

All variables, bounds, security-budget conventions, leakage treatment, and finite-statistics corrections must follow one independently reproduced dossier. The equation is not executable by itself and is not a substitute for the cited method's definitions and conditions.

The model shall retain every intermediate bound and gate. A positive `ell` does not by itself establish OUT-2, and OUT-2 does not by itself establish OUT-3.

### 3.7 Fail-closed experimental logic

Each required gate is recorded as `PASS`, `FAIL`, `UNKNOWN`, or explicitly justified `N/A`. A required `FAIL` or `UNKNOWN` is non-permissive.

The planned negative suite covers at least authentication failure, stale or conflicting input, finite-key/profile rejection, invalid/unknown device state, configuration mismatch, partial EKM commit, wrong consumer, one-sided delivery, AQMO loss, evidence discontinuity, and absent/wrong-version release authority.

The safe behavior under these cases is part of the hypothesis. The future experiment cannot be considered complete if it executes only a favorable baseline.

### 3.8 Outcome logic

| Outcome | Positive condition |
|---|---|
| OUT-1 | Declared physical acquisition, synchronization, and channel-readiness conditions pass |
| OUT-2 | The profile-specific finite-block calculation and every required gate pass |
| OUT-3 | Both EKMs establish matching binding-specific `Committed/Available` evidence |
| OUT-4 | Both authorized local consumers and both EKMs establish the corresponding delivered state in a separate transaction |

OUT-3 is the principal reference outcome. OUT-4 is separate and optional. Any ambiguous pair state is quarantined and unavailable.

---

## 4. Model, Parameters, and Reproducibility

### 4.1 Model boundary

The reference model is a chain of bounded submodels rather than one opaque key-rate calculator:

- geometry/access;
- optical transmission and detection-statistics inputs;
- finite-block decoy-state QKD;
- non-numeric gate evaluation;
- EKM and optional local-delivery state logic; and
- evidence/result packaging.

Each boundary exchanges versioned non-secret data. The model never receives operational key values.

### 4.2 Parameter control

QO-EDH-CH06-ANN-A defines stable IDs across case, time, orbit, site, geometry, optical, source, detector, finite-key, security, data, EKM, delivery, outcome, reproducibility, threshold, and release groups.

Every used numeric input requires a value or range, unit, uncertainty treatment, source and exact locator, source status, applicability rationale, sensitivity treatment, owner, freeze state, and change record. Derived values additionally require formulas and dependency IDs.

At this draft stage:

- the register schema and IDs exist;
- CASE-S1 structure exists;
- no numeric Q-Orbit parameter set is frozen;
- no exact orbit/site case is selected;
- no mission threshold is defined; and
- controlled execution is blocked.

This is an intentional result of evidence control, not a missing performance claim.

### 4.3 Geometry and link outputs

The future geometry stage will produce range, elevation, visibility, and declared constraint state over a versioned interval from a traceable orbit/site case. The optical stage will convert those inputs and separately declared optical, atmosphere, pointing, background, receiver, timing, and device behavior into detection-statistics inputs.

The method does not freeze one link-budget formulation in this report. The chosen formulation must demonstrate complete term definitions, unit consistency, uncertainty treatment, and non-overlap before it can support a controlled result.

### 4.4 Uncertainty and sensitivity

The method separates structural alternatives, bounded parametric uncertainty, and justified stochastic variability. Structural alternatives are separate scenarios. Ranges support screening or controlled sweeps. Probability distributions and confidence intervals require an explicit statistical basis and cannot be invented from simple minima and maxima.

Sensitivity analysis will emphasize:

- link/detection behavior and background contributions;
- source and receiver behavior;
- finite-block protocol parameters and leakage/security budgets;
- geometry/access and transmission-window choices; and
- discontinuities at zero-key or required-gate boundaries.

Mission/policy decisions and authority states are not randomized as physical noise.

### 4.5 Reproducibility record

Every future controlled run will retain the exact case, parameter register, source data, code, dependencies, environment, seed, optimizer, stages, gates, outcomes, metrics, warnings, limitations, artifacts, and checksums. A same-record rerun must reproduce discrete outcomes exactly and numeric outputs within a tolerance frozen before comparison.

Independent reproduction has not yet been performed, and the numerical tolerance remains open. `[TBD:TBD-005]` `[TBD:TBD-015]`

### 4.6 Reporting limits before thresholds

No mission-derived quantitative threshold currently has a value, unit, rationale, authority, and applicable case. `[TBD:TBD-002]` `[TBD:TBD-013]`

Accordingly, even after a future run, a numeric output may initially be reported only as:

- a descriptive modeled value under the exact frozen configuration;
- a sensitivity result over declared ranges; or
- a failed/indeterminate run with explicit reason.

It may not be called a mission pass, operationally sufficient, secure, validated, approved, or mission-ready.

### 4.7 Section 4 completion state

The model and reproducibility structure is ready for SCI-G1 review. It is not ready for a controlled quantitative run because required numeric inputs, protocol reproduction evidence, mission thresholds, independent review, and gate authority remain unresolved.

---

## References used in Sections 1–4

The controlled identities and applicability notes are maintained in QO-EDH-REG-001. Principal sources used here include:

1. NIST, “What Is Post-Quantum Cryptography?” current explanatory page checked for the controlled baseline.
2. S.-K. Liao et al., “Satellite-to-ground quantum key distribution,” *Nature* 549, 43–47 (2017), DOI 10.1038/nature23655.
3. Y.-A. Chen et al., “An integrated space-to-ground quantum communication network over 4,600 kilometres,” *Nature* 589, 214–219 (2021), DOI 10.1038/s41586-020-03093-8.
4. F. Xu et al., “Secure quantum key distribution with realistic devices,” *Reviews of Modern Physics* 92, 025002 (2020), DOI 10.1103/RevModPhys.92.025002.
5. J. S. Sidhu et al., “Finite key effects in satellite quantum key distribution,” *npj Quantum Information* 8, 18 (2022), DOI 10.1038/s41534-022-00525-3. Publisher method text checked 18 August 2026.
6. ETSI GS QKD 004 V2.1.1, GS QKD 014 V1.1.1, and GS QKD 016 V2.1.1, within their recorded scopes.
7. ITU-T Y.3800 with Corrigendum 1, X.1717, and Y.3832, used for terminology or analogy only.
8. Primary attack-class papers controlled as CE-018 through CE-020 and protocol-scope papers controlled as CE-021 and CE-022.

No numeric parameter is adopted from these sources in Sections 1–4.

