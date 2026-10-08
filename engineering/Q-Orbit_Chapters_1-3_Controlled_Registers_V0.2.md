# Q-Orbit Engineering Design Handbook — Controlled Registers V0.2

| Document field | Value |
|---|---|
| Document ID | QO-EDH-REG-001 |
| Version | Correction Draft V0.2 |
| Date | 12 August 2026 |
| Applies to | Chapters 1–3 V0.2 |
| Project phase | Preliminary research and engineering design |
| Approval status | Internally checked; awaiting Q-Orbit team approval |
| Information handling | Conceptual, non-operational; public release requires PR-GATE-01 |

> **Control rule.** This register is the authoritative source for terminology, evidence IDs, engineering decisions, assumptions, open issues, and shared policy used by Chapters 1–3 V0.2. It is not a certification record, intelligence assessment, cryptographic approval, or operational authorization.

---

## 1. Evidence and statement-control rules

Each material statement in Chapters 1–3 uses exactly one of these forms:

- **`[V:CE-nnn]`** — an atomic factual claim listed in the Claim & Evidence Register and supported by a named primary scientific or official source.
- **`[ED:ED-nnn]`** — a reversible Q-Orbit engineering decision listed in the Engineering Decision Register.
- **`[A:A-nnn]`** — an analysis assumption listed in the Assumption Register and subject to sensitivity or specialist review.
- **`[TBD:TBD-nnn]`** — an unresolved item listed in the Open-Issue Register with an owner class and closure evidence.

Rules:

1. A sentence or table assertion may not combine statuses. Split mixed fact, decision, assumption, and open issue into separate atomic statements.
2. A citation proves only the claim linked to its `CE` identifier; it does not validate a Q-Orbit design choice.
3. A cited experiment supplies precedent, not a Q-Orbit performance parameter, unless applicability is separately justified.
4. `Shall` is reserved for an approved requirements baseline. Chapters 1–3 contain policies and candidate obligations, not baselined system requirements.
5. Every numeric model input must later appear in the Parameter & Provenance Register with value, unit, uncertainty or range, source, applicability, and sensitivity treatment.
6. A missing source is not silently repaired by inference. The statement becomes an engineering decision, assumption, or named TBD.

---

## 2. Controlled vocabulary

| Term | Controlled meaning |
|---|---|
| **Q-Orbit** | Project name. |
| **SQDS** | Space Quantum Defense System: the preliminary system of interest, not a deployed product. |
| **AQMO** | Adaptive Quantum Mission Orchestrator: a constrained planning and coordination function with no access to key values. |
| **QKD endpoint** | One of the two protocol participants that implements the local QKD functions inside a defined endpoint boundary. |
| **Endpoint domain** | The local security/trust domain associated with one QKD endpoint and its endpoint key-management function. It is not automatically a whole site, enterprise, or remote user network. |
| **EKM** | Endpoint Key Manager: the logical key-management function associated with one QKD endpoint. `EKM-A` and `EKM-B` are peers; the term does not assert a specific HSM product or physical placement. |
| **Local representative consumer** | A secure-application interface inside the same endpoint domain as its EKM. It is used only to demonstrate local key handoff; it is not an arbitrary remote consumer. |
| **Direct QKD link** | One pair of QKD endpoints connected by the quantum channel and an authenticated classical protocol channel. |
| **Remote-consumer distribution** | Any onward delivery beyond the two endpoint domains. It requires a separately approved architecture and is not demonstrated by the V0.2 reference case. |
| **QKD session** | A bounded protocol instance associated with one endpoint pair, configuration, time window, and correlation identifier. |
| **Replenishment mission** | A service attempt whose success criterion is two-sided commit of matching, policy-valid key inventory at EKM-A and EKM-B. |
| **Consumer-delivery transaction** | A separate transaction in which both local representative consumers obtain corresponding key material or protected handles and acknowledge the same binding. |
| **Accepted key** | Final key output that has passed the selected protocol, finite-key, authentication, device-model, and policy gates but is not necessarily committed to both EKMs. |
| **Available key** | Key material committed at both EKMs with an unambiguous, matching identifier and policy state; not yet reserved or delivered. |
| **Delivered key** | Corresponding key material or protected handles have been transferred to both authorized local representative consumers and both delivery acknowledgements are recorded. |
| **Consumed key** | The key-use policy reports the authorized use transition; it may not be reallocated. |
| **Session success** | One of the explicitly named outcomes: physical-link success, QKD acceptance, replenishment success, or consumer-delivery success. The unqualified word `success` is prohibited in controlled results. |
| **Fail closed** | Unresolved security-critical uncertainty prevents approved key release or use and moves the affected material to abort, quarantine, revocation, or destruction according to policy. |
| **No silent downgrade** | A failed QKD opportunity cannot automatically change the algorithm, key source, trust path, endpoint, or security label. |
| **Qualified opportunity** | A candidate pass interval that satisfies all stated geometry, environmental, resource, security, and policy gates for the analysis case. |
| **Approved** | Authorized by the future named authority under a controlled baseline. In V0.2, where no such authority exists, the term is used only inside a decision or TBD and never implies external approval. |
| **Baseline** | A configuration-controlled project version accepted by the Q-Orbit team. It is not equivalent to operational, regulatory, military, or cryptographic approval. |

---

## 3. Shared policy register

| ID | Policy | State |
|---|---|---|
| POL-01 | QKD supplies key material; mission plaintext remains on a classical secure-communications path. | Proposed |
| POL-02 | Any unresolved security-critical gate produces no approved key release from the affected session. | Proposed |
| POL-03 | No silent downgrade or fallback is permitted. A different service requires explicit prior policy, separate labeling, and auditable authorization. | Proposed |
| POL-04 | AQMO receives key-inventory metadata only and has no interface to raw, intermediate, final, stored, delivered, or consumed key values. | Proposed |
| POL-05 | AQMO may rank only candidates that already satisfy every hard constraint and may not override a local endpoint abort. | Proposed |
| POL-06 | The V0.2 reference case makes no claim of key establishment for arbitrary remote consumers and assumes no trusted relay. | Proposed |
| POL-07 | A protocol proof, positive modeled key length, or successful photon detection is not system-security proof or operational acceptance. | Proposed |
| POL-08 | Ambiguous one-sided key-management state is unusable and enters reconciliation/quarantine; availability is declared only after positive two-sided commit evidence. | Proposed |
| POL-09 | An authenticated external data source may still be wrong. Conflicting or stale security-critical decision data causes hold or abort until the conflict is resolved under policy. | Proposed |
| POL-10 | Public website content must pass PR-GATE-01 and may not imply adoption, certification, named-customer sponsorship, or release of sensitive operational details. | Proposed |

---

## 4. Global source registry and currency record

All URLs were checked on **12 August 2026**. `Current` means current for the cited use found during this review; it is not a promise that a source will never be revised.

| Source ID | Source and canonical link | Publication/status | Currency or applicability note |
|---|---|---|---|
| SRC-NIST-PQC-2026 | NIST, [What Is Post-Quantum Cryptography?](https://www.nist.gov/cybersecurity-and-privacy/what-post-quantum-cryptography) | Updated 27 February 2026 | Current explanatory source for CRQC uncertainty and harvest-now-decrypt-later. |
| SRC-NIST-PQC-PROJECT-2026 | NIST CSRC, [Post-Quantum Cryptography Project](https://csrc.nist.gov/projects/post-quantum-cryptography) | Updated 5 August 2026 | Current project status; principal FIPS standards published in 2024. |
| SRC-LIAO-NATURE-2017 | S.-K. Liao et al., [Satellite-to-ground quantum key distribution](https://doi.org/10.1038/nature23655), *Nature* 549, 43–47 | 2017 | Demonstration-specific evidence; not a Q-Orbit parameter baseline. |
| SRC-CHEN-NATURE-2021 | Y.-A. Chen et al., [An integrated space-to-ground quantum communication network over 4,600 kilometres](https://doi.org/10.1038/s41586-020-03093-8), *Nature* 589, 214–219 | 2021 | The reported network used a trusted-relay structure; not a single direct trust-free link. |
| SRC-XU-RMP-2020 | F. Xu et al., [Secure quantum key distribution with realistic devices](https://doi.org/10.1103/RevModPhys.92.025002), *Rev. Mod. Phys.* 92, 025002 | 2020 | Review of practical security and model/implementation gaps; does not validate a future Q-Orbit device. |
| SRC-SIDHU-NPJQI-2022 | J. S. Sidhu et al., [Finite key effects in satellite quantum key distribution](https://doi.org/10.1038/s41534-022-00525-3), *npj Quantum Information* 8, 18 | 2022 | Reference analysis method for finite-block, single-pass WCP efficient BB84 with two decoys; its system parameters are not copied automatically. |
| SRC-NSA-QKD-CURRENT | NSA, [Quantum Key Distribution and Quantum Cryptography](https://www.nsa.gov/Cybersecurity/Quantum-Key-Distribution-QKD-and-Quantum-Cryptography-QC/) | Current page checked 12 August 2026 | Applicable only to the stated NSA/NSS policy context; page still contains an outdated description of NIST's PQC process, so that part is not used. |
| SRC-ETSI-QKD004-V211 | ETSI GS QKD 004 V2.1.1, [Application Interface](https://www.etsi.org/deliver/etsi_gs/QKD/001_099/004/02.01.01_60/gs_qkd004v020101p.pdf) | August 2020 | Published edition used here; defines a QKD key-manager/application interface and synchronized peer concepts. A later revision is under development but is not cited as published. |
| SRC-ETSI-QKD014-V111 | ETSI GS QKD 014 V1.1.1, [REST-based key delivery API](https://www.etsi.org/deliver/etsi_gs/QKD/001_099/014/01.01.01_60/gs_qkd014v010101p.pdf) | February 2019 | Published edition used as a candidate interface reference only; revision work does not constitute a published replacement. |
| SRC-ETSI-QKD016-V211 | ETSI GS QKD 016 V2.1.1, [Common Criteria Protection Profile — Pair of Prepare and Measure QKD Modules](https://www.etsi.org/deliver/etsi_gs/QKD/001_099/016/02.01.01_60/gs_qkd016v020101p.pdf) | January 2024 | Replaces V1.1.1 for this handbook. Scope is a pair of prepare-and-measure modules; do not generalize it to all QKD families. |
| SRC-ITU-Y3800-2019-C1 | ITU-T Y.3800, [Overview on networks supporting QKD](https://www.itu.int/rec/T-REC-Y.3800/) | October 2019 + Corrigendum 1, April 2020; in force | Record includes Corrigendum 1. Used for terminology/context, not a claim of conformance. |
| SRC-ITU-X1710-2020 | ITU-T X.1710, [Security framework for QKD networks](https://www.itu.int/rec/T-REC-X.1710/en) | October 2020; in force | Network security framework; application to Q-Orbit is by design analogy unless adopted later. |
| SRC-ITU-X1717-2024 | ITU-T X.1717, [Security requirements and measures for QKDN control and management](https://www.itu.int/rec/T-REC-X.1717/en) | October 2024; in force | Supports treating orchestration/control information and interfaces as security-relevant; no conformance claim. |
| SRC-ITU-Y3832-2025 | ITU-T Y.3832, [QKD networks — Framework for orchestration](https://www.itu.int/rec/T-REC-Y.3832) | December 2025; in force | Relevant to AQMO resource coordination by analogy; no conformance claim. |
| SRC-NIST-SP80030R1 | NIST SP 800-30 Rev. 1, [Guide for Conducting Risk Assessments](https://doi.org/10.6028/NIST.SP.800-30r1) | September 2012; final | Method source; does not supply Q-Orbit likelihood values. |
| SRC-NIST-CSF20 | NIST CSWP 29, [Cybersecurity Framework 2.0](https://doi.org/10.6028/NIST.CSWP.29) | February 2024; final | Organizational outcome framework, not a QKD design specification. |
| SRC-NIST-IR8401 | NIST IR 8401, [Satellite Ground Segment: Applying the CSF to Satellite C2](https://doi.org/10.6028/NIST.IR.8401) | December 2022; final | Ground-segment/C2 cybersecurity context; no claim of system compliance. |
| SRC-NIST-FIPS203 | NIST, [FIPS 203 — ML-KEM](https://csrc.nist.gov/pubs/fips/203/final) | August 2024; final | Planning note dated 17 November 2025 identifies an issue for future correction; track errata before implementation. |
| SRC-NIST-FIPS204 | NIST, [FIPS 204 — ML-DSA](https://csrc.nist.gov/pubs/fips/204/final) | August 2024; final | Planning note dated 31 July 2026 points to minor potential updates; track errata before implementation. |
| SRC-NIST-SP80057R5 | NIST SP 800-57 Part 1 Rev. 5, [Recommendation for Key Management](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final) | May 2020; current final | Rev. 6 is an initial public draft, not the final source used here. |
| SRC-NIST-SP80057R6-IPD | NIST SP 800-57 Part 1 Rev. 6, [Recommendation for Key Management — Initial Public Draft](https://csrc.nist.gov/pubs/sp/800/57/pt1/r6/ipd) | December 2025; initial public draft; comment period closed 5 February 2026 | Draft-status evidence only; it does not replace Rev. 5 as the final source used here. |
| SRC-NIST-SP80090B | NIST SP 800-90B, [Entropy Sources](https://csrc.nist.gov/pubs/sp/800/90/b/final) | January 2018; final | Planning note dated 29 May 2025 identifies two errata; track before implementation. |
| SRC-NIST-SP800161R1U1 | NIST SP 800-161 Rev. 1 Update 1, [Cybersecurity Supply Chain Risk Management](https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final) | May 2022, updates through 1 November 2024 | Use update date accurately. |
| SRC-NIST-SP800218 | NIST SP 800-218, [Secure Software Development Framework 1.1](https://csrc.nist.gov/pubs/sp/800/218/final) | February 2022; final | Process guidance; does not prove a secure implementation. |
| SRC-ZHAO-PRA-2008 | Y. Zhao et al., [Experimental time-shift attack against practical QKD](https://doi.org/10.1103/PhysRevA.78.042333), *Phys. Rev. A* 78, 042333 | 2008 | Establishes an attack class tied to detector-efficiency mismatch; not a finding against Q-Orbit hardware. |
| SRC-LYDERSEN-NPHOT-2010 | L. Lydersen et al., [Hacking commercial quantum cryptography systems by tailored bright illumination](https://doi.org/10.1038/nphoton.2010.214), *Nature Photonics* 4, 686–689 | 2010 | Establishes a detector-control attack class; not a finding against Q-Orbit hardware. |
| SRC-JAIN-NJP-2014 | N. Jain et al., [Trojan-horse attacks threaten practical quantum cryptography](https://doi.org/10.1088/1367-2630/16/12/123030), *New J. Phys.* 16, 123030 | 2014 | Establishes injected-light/back-reflection risk; not a finding against Q-Orbit hardware. |
| SRC-LOMA-CHEN-PRL-2005 | H.-K. Lo, X. Ma, and K. Chen, [Decoy State Quantum Key Distribution](https://doi.org/10.1103/PhysRevLett.94.230504), *Phys. Rev. Lett.* 94, 230504 | 2005 | Supports decoy-state treatment of multiphoton weak-coherent-pulse risk; not a universal implementation mitigation. |
| SRC-LO-CURTY-QI-PRL-2012 | H.-K. Lo, M. Curty, and B. Qi, [Measurement-Device-Independent QKD](https://doi.org/10.1103/PhysRevLett.108.130503), *Phys. Rev. Lett.* 108, 130503 | 2012 | Evidence is limited here to detector-side-channel scope; no broader implementation-security claim is taken. |

---

## 5. Claim & Evidence Register

| Claim ID | Atomic verified claim | Source ID and locator | Applicability limit |
|---|---|---|---|
| CE-001 | A sufficiently capable quantum computer could threaten widely used public-key mechanisms, while the arrival time of such a computer is uncertain. | SRC-NIST-PQC-2026, sections “What are post-quantum encryption algorithms?” and “If cryptographically relevant quantum computers don’t exist yet…” | Does not predict a date or prove that a CRQC exists. |
| CE-002 | Captured ciphertext may remain at risk through harvest-now-decrypt-later when the protected information retains value. | SRC-NIST-PQC-2026, section “What is harvest now, decrypt later?” | Mission confidentiality lifetime remains TBD. |
| CE-003 | Satellite-to-ground decoy-state QKD was experimentally demonstrated at kilohertz key rates over distances up to about 1,200 km. | SRC-LIAO-NATURE-2017, article abstract/editorial summary and pp. 43–47 | Experiment-specific; not a Q-Orbit range or rate promise. |
| CE-004 | The reported 4,600 km integrated network combined fibre and satellite links and used a trusted-relay structure. | SRC-CHEN-NATURE-2021, abstract | Not a single direct end-to-end trust-free quantum link. |
| CE-005 | Practical QKD security depends on how real devices and implementations match the assumptions of the security analysis. | SRC-XU-RMP-2020, review scope; SRC-ETSI-QKD016-V211, clauses 5, 7, 8, and 10 | Does not establish insecurity or security of unbuilt Q-Orbit hardware. |
| CE-006 | QKD requires an authenticated classical channel or an externally established authentication mechanism; QKD alone does not authenticate the transmission source. | SRC-ETSI-QKD016-V211, clauses 8.1.5 and 10.2.5; SRC-NSA-QKD-CURRENT, Technical Limitation 1 | Operational authentication construction remains TBD. |
| CE-007 | QKD does not by itself prevent denial of service and can be made unavailable by channel interference or forced abort conditions. | SRC-NSA-QKD-CURRENT, Technical Limitation 5 | Does not quantify Q-Orbit availability or attacker success. |
| CE-008 | The current NSA page does not recommend QKD/QC for NSS use unless stated limitations are overcome and does not anticipate approving such products under the position described. | SRC-NSA-QKD-CURRENT, Synopsis and Conclusion | Applies only if the future customer falls under this policy; customer/jurisdiction are TBD. |
| CE-009 | A QKD key manager can deliver identical key sets to peer applications and is responsible for peer synchronization in the ETSI QKD 004 model. | SRC-ETSI-QKD004-V211, clauses 1, 3.1, 4, and 6.1 | Candidate interface semantics only; Q-Orbit does not claim conformance. |
| CE-010 | ETSI QKD 014 defines a REST-based key-delivery API with key identifiers for application delivery. | SRC-ETSI-QKD014-V111, clauses 1 and 4–5 | Candidate interface only; security and authorization must be separately designed. |
| CE-011 | ETSI QKD 016 V2.1.1 is a protection profile for a pair of prepare-and-measure QKD modules and includes authenticated-classical-channel, audit, self-test, access-control, and secure-state objectives/requirements. | SRC-ETSI-QKD016-V211, title; clauses 5.3, 7, 8, and 10.2 | Its scope does not cover every protocol family or Q-Orbit as a whole. |
| CE-012 | ITU-T Y.3800 (2019) and Corrigendum 1 (2020) are listed as in force. | SRC-ITU-Y3800-2019-C1, ITU recommendation status page | Status/overview only; no conformance claim. |
| CE-013 | ITU-T X.1717 (October 2024) is in force and addresses security requirements and measures for QKDN control and management. | SRC-ITU-X1717-2024, recommendation title/status | AQMO use is by analogy until formally mapped. |
| CE-014 | ITU-T Y.3832 (December 2025) is in force and specifies a QKDN orchestration framework. | SRC-ITU-Y3832-2025, recommendation title/status and publication summary | AQMO use is by analogy; no conformance claim. |
| CE-015 | Finite received blocks from limited satellite passes require statistical finite-key treatment; an asymptotic key-rate calculation can be optimistic for short blocks. | SRC-SIDHU-NPJQI-2022, Introduction and Results “Finite key length analysis” | The selected formula and assumptions must be reproduced for Q-Orbit. |
| CE-016 | Sidhu et al. model finite-block, single-pass secret-key length for downlink WCP efficient BB84 using three intensities, including two decoys. | SRC-SIDHU-NPJQI-2022, abstract; Results “Finite key length analysis”; Methods “Finite key analysis for decoy-state BB84” | A reference analysis profile, not an operational protocol approval. |
| CE-017 | QBER alone is not the full finite-key acceptance condition in the cited decoy-state model; vacuum/single-photon yields, phase-error bounds, error-correction leakage, and security parameters enter the key-length calculation. | SRC-SIDHU-NPJQI-2022, Results equation (4) and associated definitions; Methods | Implementation/device-model checks remain additional system gates. |
| CE-018 | Experimental time-shift attacks have exploited detector-efficiency mismatch in a practical QKD system. | SRC-ZHAO-PRA-2008, abstract | Attack-class evidence only; not a Q-Orbit vulnerability finding. |
| CE-019 | Published bright-illumination work demonstrated detector-control attacks against commercial QKD systems. | SRC-LYDERSEN-NPHOT-2010, abstract | Attack-class evidence only. |
| CE-020 | Published Trojan-horse work demonstrated that injected probes and back-reflections can expose internal QKD state. | SRC-JAIN-NJP-2014, abstract | Attack-class evidence only. |
| CE-021 | Decoy-state methods address risks associated with multiphoton weak coherent pulses under their security assumptions. | SRC-LOMA-CHEN-PRL-2005, abstract | Does not cover every source imperfection or side channel. |
| CE-022 | Measurement-device-independent QKD is designed to remove detector side channels under its stated architecture and assumptions. | SRC-LO-CURTY-QI-PRL-2012, abstract | Detector-side-channel scope only; this is not a claim that MDI-QKD is selected. |
| CE-023 | NIST standardized ML-KEM in FIPS 203 and ML-DSA in FIPS 204 in 2024. | SRC-NIST-FIPS203 and SRC-NIST-FIPS204, publication pages | Does not constitute operational algorithm approval for Q-Orbit; track listed errata. |
| CE-024 | NIST SP 800-57 Rev. 5 is the current final key-management source used here; Rev. 6 is still an initial public draft. | SRC-NIST-SP80057R5 and SRC-NIST-SP80057R6-IPD, publication status pages | Recheck at each baseline. |
| CE-025 | NIST SP 800-90B specifies entropy-source design/validation guidance and has two identified errata noted in 2025. | SRC-NIST-SP80090B, abstract and planning note | A device-specific entropy model and evidence remain required. |
| CE-026 | NIST SP 800-30 separates threat sources, events, vulnerabilities, likelihood, impact, and risk in risk assessment. | SRC-NIST-SP80030R1, risk-assessment process and terminology | It does not supply Q-Orbit likelihoods or risk acceptance. |
| CE-027 | NIST CSF 2.0 organizes cybersecurity outcomes under Govern, Identify, Protect, Detect, Respond, and Recover. | SRC-NIST-CSF20, framework core | Organizational framework, not QKD certification. |

---

## 6. Engineering Decision Register

| ID | Decision | Rationale | State |
|---|---|---|---|
| ED-001 | Use Q-Orbit as project name, SQDS as system of interest, and AQMO as the orchestration function. | Preserves project identity while controlling definitions. | Proposed |
| ED-002 | Define SQDS as a hybrid key service, not a quantum mission-data bearer. | Aligns system scope with the function of QKD. | Proposed |
| ED-003 | Limit the August reference deployment to one direct QKD link between one space endpoint and one ground endpoint. | Closes the topology without importing an unapproved relay. | Proposed |
| ED-004 | Associate one logical EKM and one local representative consumer with each QKD endpoint domain. | Permits a direct, traceable local handoff demonstration without claiming arbitrary remote delivery. | Proposed |
| ED-005 | Make two-sided EKM inventory replenishment the primary mission outcome; treat consumer delivery as a separate transaction and metric. | Separates KMS commit from application delivery and resolves the former mission-completion contradiction. | Proposed |
| ED-006 | Use a downlink, prepare-and-measure, polarization-encoded efficient BB84 WCP profile with one signal and two decoy intensities as the V0.2 reference analysis assumption. | Matches published satellite finite-key analysis and keeps the result profile-specific. | Proposed |
| ED-007 | Use the finite-block, single-pass method described by Sidhu et al. 2022 as the computational reference, subject to independent reproduction and a frozen parameter register. | Avoids an unstated asymptotic or generic QKD model. | Proposed |
| ED-008 | Separate session state, key lifecycle state, replenishment success, and consumer-delivery success. | Prevents ambiguous completion and inventory accounting. | Proposed |
| ED-009 | Enforce POL-02 fail-closed behavior and POL-03 no-silent-downgrade behavior. | Prevents throughput or availability pressure from changing the security claim. | Proposed |
| ED-010 | Keep AQMO outside key custody and unable to override endpoint acceptance or abort. | Reduces trust and control-plane consequence. | Proposed |
| ED-011 | Use design priorities P1/P2/P3 without quantitative likelihood or final risk scores in V0.2. | Mission, intelligence, control-effectiveness, and risk-tolerance inputs are absent. | Proposed |
| ED-012 | Treat external decision-data conflicts as hold/abort conditions; authentication alone is insufficient to establish correctness. | Prevents a signed but faulty source from becoming authoritative by default. | Proposed |
| ED-013 | Model EKM handoff as a two-sided prepared/committed/unknown state protocol; ambiguous state is quarantined and unusable. | Provides safe conceptual semantics without claiming impossible universal atomicity. | Proposed |
| ED-014 | Reduce the 31 August scope to a coherent core baseline, one reproducible reference simulation, selected fault cases, and a derived website; chapter count is not a success metric. | Prioritizes evidence and consistency over document volume. | Proposed |
| ED-015 | Require a public-release gate before publishing handbook, simulation, threat, or website content. | Separates technical development from release authorization. | Proposed |
| ED-016 | Retain all candidate requirement statements as non-normative obligations until Chapter 4 dispositions them. | Avoids a parallel hidden requirements baseline. | Proposed |

---

## 7. Assumption Register

| ID | Assumption used for V0.2 | Sensitivity/closure route |
|---|---|---|
| A-001 | One candidate LEO satellite, one optical ground station, and one pass are sufficient for the first analysis case. | Expand only after the single-pass model is reproducible. |
| A-002 | The satellite hosts the reference transmitter and the ground station hosts the reference receiver for the downlink profile. | Compare against uplink/alternate roles in a later trade study. |
| A-003 | Each endpoint can host or securely interface to a logical EKM function within its endpoint domain. | Validate in architecture and platform trades. |
| A-004 | A local representative consumer can be placed within each endpoint domain for interface demonstration. | Remote consumers remain outside the claim boundary. |
| A-005 | The ground endpoint and EKM-B can operate within a physically controlled facility. | Validate site and personnel controls. |
| A-006 | The space platform can provide authenticated command, protected configuration/update, trusted time, and required resource telemetry. | Obtain platform evidence; otherwise revise the architecture. |
| A-007 | Initial trust anchors and authentication material can be provisioned through an external controlled process. | Define provisioning, refresh, revocation, and recovery in the crypto architecture. |
| A-008 | Model-level logical fault injection is sufficient for the August demonstration of fail-closed state behavior. | Hardware/cyber adversarial testing remains future work. |
| A-009 | The August package requires no classified data, real operational site, or real mission schedule. | Reassess through PR-GATE-01 before any external release. |
| A-010 | The selected source, detector, and optical parameters can be represented by sourced values or explicit ranges without claiming a flight design. | Freeze in Parameter & Provenance Register before simulation. |

---

## 8. Consolidated Open-Issue Register

| ID | Open issue | Owner class | Closure evidence | Target |
|---|---|---|---|---|
| TBD-001 | Named customer, country, sponsor, mission authority, cryptographic authority, and risk authority | Project lead + stakeholder | Written stakeholder confirmation and authority map | Post-submission review |
| TBD-002 | Protected data classes, confidentiality lifetime, compromise consequence, key demand, latency, and availability need | Mission/data owner | Mission-needs statement with units and acceptance criteria | Ch. 4/9/10 |
| TBD-003 | Exact orbit, ephemeris source, analysis interval, and ground-site case | Orbit/mission analyst | Versioned orbit/site trade and reproducible access data | Ch. 6/7/10 |
| TBD-004 | Optical wavelength, apertures, divergence, pointing, transmission, turbulence/background, and loss model | Optical/photonic engineer | Source-backed link-budget and uncertainty model | Ch. 6–8/10 |
| TBD-005 | Exact protocol security parameters, finite-key failure budgets, block construction, error-correction leakage model, and acceptance thresholds | QKD specialist | Protocol dossier and independently reproduced implementation of the selected equations | Ch. 8/10/12 |
| TBD-006 | Source, modulator, detector, timing, entropy, calibration, and side-channel device model | QKD hardware specialist | Characterization plan and proof-to-device assumption map | Ch. 6–8/12 |
| TBD-007 | Classical authentication construction, trust-anchor provisioning, credential refresh, revocation, and recovery | Cryptographic authority | Crypto-architecture decision and testable lifecycle | Ch. 9/12 |
| TBD-008 | Physical cryptographic boundaries and implementation/ownership of EKM-A, EKM-B, HSM functions, and trusted paths | Security architect | Boundary diagrams, data-entry/exit list, and trade decision | Ch. 5/9 |
| TBD-009 | Exact EKM synchronization/commit protocol, idempotency, retry, timeout, recovery, quarantine, and zeroization | Key-management architect | State protocol and negative/partial-failure tests | Ch. 9/12 |
| TBD-010 | Local consumer API, key-use mode, reservation, activation, acknowledgement, consumption, expiry, and destruction semantics | KMS/encryptor owner | Interface specification and lifecycle test | Ch. 9/12 |
| TBD-011 | AQMO objective function, delegation, human gates, timing, schemas, and autonomy level | Controls/operations lead | Control contract, constraint tests, and decision replay | Ch. 5/10/12 |
| TBD-012 | Authoritative external data sources, validation, redundancy, conflict resolution, freshness, and uncertainty policy | Mission/data services owner | Data-source contract and stale/conflict injection tests | Ch. 5/10/12 |
| TBD-013 | Numeric success, inventory, performance, availability, and recovery thresholds | Mission owner + specialists | Parameter register plus mission-derived acceptance rationale | Ch. 4/10/12 |
| TBD-014 | Applicable legal, export, information-handling, cryptographic, laser-safety, spectrum, and space rules | Legal/safety/security authority | Jurisdiction-specific compliance matrix | Ch. 11/12 |
| TBD-015 | Independent optical, cyber, software, and key-management evaluation scope and facilities | Independent V&V lead | Approved verification plan and qualified reviewers | Ch. 12/Roadmap |
| TBD-016 | Any future remote-consumer distribution or trusted-relay architecture | System/security architect | Separate trust/topology trade and explicit risk/authority approval | Future V0.3+ |
| TBD-017 | Quantitative likelihood, control effectiveness, risk ratings, and risk acceptance | Threat/risk authority | Deployment-specific threat assessment and tested controls | Future operational phase |
| TBD-018 | Any authorized non-QKD fallback service and its labeling, activation, termination, and relationship to mission communications | Mission + cryptographic authority | Approved fallback policy and scenario test | Ch. 4/9/12 |
| TBD-019 | Audit schema, authoritative time, retention, privacy, correlation, evidence custody, and incident handling | Cybersecurity/operations | Audit specification and integrity/replay test | Ch. 5/9/12 |
| TBD-020 | Public-release authority, review workflow, and final releasability decisions | Information owner + legal/security review | Signed PR-GATE-01 disposition | Before website/publication |

---

## 9. Public-release gate PR-GATE-01

No handbook extract, simulation result, diagram, threat detail, or website page is public-ready until all applicable checks pass:

| Check | Pass condition |
|---|---|
| Stakeholder/approval claims | No unsupported named customer, sponsor, military adoption, certification, or approval statement. |
| Operational detail | No real sensitive site, orbit, schedule, vulnerability, exploit path, device weakness, credential, or security configuration. |
| Scientific claim | Every technical claim shown publicly maps to a `CE` entry and preserves its applicability limit. |
| Model result | Assumptions, parameter sources, uncertainty/sensitivity, exact success state, and limitations appear with the result. |
| Security framing | The page states that QKD is a partial key-establishment layer and does not imply immunity to endpoint compromise, implementation attacks, or denial of service. |
| Authority | The future information owner and required legal/security reviewer record a release decision. `[TBD:TBD-020]` |

---

## 10. Register review gate REG-G1

This register is ready for team approval when:

1. ED-003 through ED-008 are accepted as the August topology, service outcome, protocol-analysis profile, and state model;
2. the team accepts that named stakeholder and remote-consumer claims remain outside the baseline;
3. every `CE`, `ED`, `A`, and `TBD` reference used in Chapters 1–3 resolves to this file;
4. the source-currency notes are retained beside the affected standards; and
5. PR-GATE-01 is accepted as mandatory before public publication.
