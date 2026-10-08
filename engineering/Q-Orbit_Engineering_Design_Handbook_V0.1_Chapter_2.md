# Q-Orbit Engineering Design Handbook V0.1

## Chapter 2 — Mission & Threat Analysis

| Document field | Value |
|---|---|
| Document ID | QO-EDH-CH02 |
| Version | Working Draft V0.1 |
| Baseline date | 11 August 2026 |
| Project phase | Preliminary research and engineering design |
| Submission milestone | 31 August 2026 |
| System of interest | Space Quantum Defense System (SQDS) |
| Project | Q-Orbit |
| Parent baseline | Chapter 1 — Mission & System Definition, Working Draft V0.1 |
| Approval status | Not yet baselined by the Q-Orbit team |
| Information handling | TBD; this draft contains conceptual, non-operational threat information only |

> **Document limitation.** This chapter is a preliminary, defensive threat model for architecture and requirements development. It is not an intelligence assessment, operational security plan, attack manual, certification result, or claim that QKD eliminates cyber, electronic-warfare, physical, insider, or supply-chain risk.

### Evidence-status convention

- **[V] Verified:** supported by a cited primary scientific or official source.
- **[ED] Engineering Decision:** a reversible Q-Orbit design choice proposed for V0.1.
- **[A] Assumption:** a temporary input adopted to permit progress and subject to review.
- **[TBD] To Be Determined:** requires research, trade study, simulation, specialist review, or stakeholder decision.

---

## 2.1 Purpose and Relationship to Chapter 1

Chapter 1 defines SQDS as a hybrid space-ground key service that combines satellite QKD, authenticated classical communications, key management, conventional cryptography, cybersecurity controls, and the Adaptive Quantum Mission Orchestrator (AQMO). **[ED]** This chapter identifies the assets, security objectives, trust boundaries, threat sources, design-driving threat events, preliminary controls, and residual risks that follow from that mission definition.

The purpose of Chapter 2 is to answer five questions before the CONOPS, requirements, and architecture are fixed:

1. **What has value and must be protected?**
2. **What security properties must be preserved?**
3. **Where does data or authority cross a trust boundary?**
4. **Which threat events could defeat the mission, and what capability would they require?**
5. **Which layer of SQDS is responsible for prevention, detection, response, and recovery?**

This chapter is controlling input to Chapter 3 (CONOPS), Chapter 4 (System Requirements), Chapter 5 (System Architecture), Chapter 9 (Key Management and Secure Communications), Chapter 11 (Risks, Constraints and Assumptions), and Chapter 12 (Verification and Validation). **[ED]**

### 2.1.1 Threat-model baseline statement

> **SQDS shall be designed on the assumption that the quantum channel, classical transport, external data feeds, and exposed control interfaces may be observed, delayed, replayed, manipulated, spoofed, or denied; trust shall be granted only at explicitly defined and verified boundaries.** **[ED — proposed for approval]**

This statement does not assume that a single adversary possesses every capability in this chapter. It establishes a conservative boundary rule for a high-value key service. **[ED]**

---

## 2.2 Analysis Method

### 2.2.1 Method selection

Q-Orbit uses an **asset- and mission-centric threat model** informed by NIST SP 800-30 Rev. 1, NIST Cybersecurity Framework (CSF) 2.0, NIST IR 8401 for satellite ground-segment command and control, ETSI GS QKD 016 for prepare-and-measure QKD module security, and the ITU-T X.1710/X.1717 QKD-network security frameworks. **[V]/[ED]** [R1–R6]

NIST SP 800-30 treats threat sources, threat events, vulnerabilities, likelihood, impact, and risk as related but distinct inputs to a risk assessment. **[V]** [R1] In V0.1, Q-Orbit can identify credible threat events and preliminary consequences, but it does not yet have an approved mission profile, deployment jurisdiction, intelligence assessment, architecture, tested controls, or organizational risk tolerance. Therefore, **V0.1 does not assign quantitative likelihood or final risk ratings**. **[ED]**

NIST CSF 2.0 organizes cybersecurity outcomes under Govern, Identify, Protect, Detect, Respond, and Recover and is intended to be tailored to an organization’s mission and risk context. **[V]** [R2] Q-Orbit uses those functions to ensure the concept includes response and recovery, rather than listing preventive controls only. **[ED]**

### 2.2.2 Analysis sequence

The V0.1 threat-analysis sequence is:

**Mission consequence → Asset → Security objective → Trust boundary → Threat source/capability → Threat event → Control allocation → Residual risk → Requirement seed → Verification evidence** **[ED]**

### 2.2.3 Preliminary consequence and design-priority scales

| Label | Controlled meaning | Use in V0.1 |
|---|---|---|
| **C1 — Mission-critical consequence** | Could expose or corrupt final key material; authorize an unintended consumer; compromise trusted command/control; silently invalidate the security claim; or cause loss of a time-critical key service | Preliminary consequence only; requires stakeholder validation **[ED]/[TBD]** |
| **C2 — Major consequence** | Could deny or materially degrade the service, corrupt decision inputs, expose sensitive metadata, or enable a later C1 event | Preliminary consequence only **[ED]/[TBD]** |
| **C3 — Limited consequence** | Localized, recoverable effect with no demonstrated key compromise or lasting mission loss | Preliminary consequence only **[ED]/[TBD]** |
| **P1 — Design-driving** | Must influence the V0.1 architecture and candidate requirements before submission | Priority, not a risk rating **[ED]** |
| **P2 — Required follow-on analysis** | Must be represented now and closed during V0.2 specialist review or a named trade study | Priority, not a risk rating **[ED]** |
| **P3 — Monitor/roadmap** | Recorded for traceability but not allowed to expand the August deliverable | Priority, not a risk rating **[ED]** |

The absence of a likelihood score is deliberate. Final risk is **[TBD]** until the threat environment, mission impact, deployed architecture, control effectiveness, and risk authority are known.

### 2.2.4 Threat-statement format

Each threat event is written as:

> **A threat source with a stated capability acts at a trust boundary or component, exploiting a condition or weakness, causing an adverse effect on a named asset and mission objective.** **[ED]**

This structure prevents labels such as “spoofing” or “hacking” from being treated as complete analyses.

---

## 2.3 Mission Security Context

### 2.3.1 Protected mission outcome

The security purpose of SQDS is not merely to produce matching bit strings. It is to deliver **authorized, correctly bound, high-integrity secret key material** to an approved cryptographic consumer at a useful time, while preventing invalid or compromised key material from being released. **[ED]**

The mission security chain is:

1. approve a key-service request;
2. select compatible and trusted resources;
3. authenticate the participating endpoints and classical protocol channel;
4. establish and measure the quantum link;
5. validate protocol and implementation security parameters;
6. abort or derive final secret key material;
7. bind the key to the correct endpoints, purpose, policy, and lifecycle;
8. transfer it through a protected key-management boundary;
9. consume it through an approved classical cryptographic function; and
10. audit the transaction without exposing the key. **[ED]**

A failure at any one of these stages may invalidate the end-to-end security claim even if the photon exchange itself succeeds. **[V]/[ED]** Practical QKD devices can depart from the assumptions of their security proofs, and real systems require authentication, controlled interfaces, calibration, self-test, access control, auditing, and protection of keys and security-function data. [R4, R7]

### 2.3.2 Unacceptable mission outcomes

| ID | Unacceptable outcome | Preliminary consequence | Status |
|---|---|---|---|
| UO-01 | An unauthorized party learns final key material | C1 | [ED]/[TBD] |
| UO-02 | Two legitimate endpoints accept different, manipulated, or attacker-influenced keys as valid | C1 | [ED]/[TBD] |
| UO-03 | A valid key is delivered to the wrong consumer, mission, classification domain, or session | C1 | [ED]/[TBD] |
| UO-04 | SQDS releases key material after authentication, parameter-estimation, self-test, or trust validation has failed | C1 | [ED]/[TBD] |
| UO-05 | An attacker controls spacecraft, payload, ground terminal, KMS, or AQMO commands or configuration | C1 | [ED]/[TBD] |
| UO-06 | The service silently downgrades to an unapproved fallback when QKD is unavailable | C1 | [ED]/[TBD] |
| UO-07 | Key reuse, excess retention, failed destruction, or rollback compromises key separation | C1 | [ED]/[TBD] |
| UO-08 | A time-critical key service is unavailable or its inventory is exhausted | C1/C2; mission dependent | [ED]/[TBD] |
| UO-09 | Audit, telemetry, or security metadata is altered so compromise cannot be detected or reconstructed | C2; may enable C1 | [ED]/[TBD] |
| UO-10 | Q-Orbit claims security beyond the protocol, implementation, trust, or test evidence actually available | C2; assurance failure | [ED] |

---

## 2.4 Protected Assets

ETSI GS QKD 016 identifies QKD keys and authorized key-distribution services as primary assets and treats authentication keys, user/role records, audit data, and calibration data as security-relevant supporting data whose compromise can defeat the service. **[V]** [R4] Q-Orbit extends this view across the satellite, ground, orchestration, and key-consumer mission chain. **[ED]**

### 2.4.1 Asset register

| ID | Asset | Required protection | Boundary/owner | Status |
|---|---|---|---|---|
| A-01 | **Protected mission data and communications** | Confidentiality, integrity, authenticity, availability as defined by the data owner | External secure-communications system; drives SQDS need | [ED]/[TBD] |
| A-02 | **Final secret key material** | Confidentiality, integrity, correct endpoint agreement, authorized use, controlled lifetime, destruction | QKD modules, KMS/HSM, approved consumer | [V]/[ED] |
| A-03 | **Intermediate key material** — raw detections, sifted data, reconciled strings, privacy-amplification inputs | Confidentiality and integrity according to protocol stage; no unauthorized persistence or export | QKD security boundary | [ED]/[TBD] |
| A-04 | **Authentication and trust material** — QKD authentication keys, PQC/private keys, certificates, trust anchors, credentials | Confidentiality where applicable, integrity, authenticity, freshness, lifecycle control | Identity, QKD, KMS/HSM, command/control boundaries | [V]/[ED]/[TBD] |
| A-05 | **Key identity and binding metadata** — key ID, endpoint pair, owner, consumer, policy, purpose, age, quality state | Integrity, authenticity, anti-replay, controlled disclosure | KMS/HSM and consumer interface | [ED] |
| A-06 | **QKD protocol transcript and security parameters** — basis information after allowed disclosure, detections, QBER, decoy statistics, finite-key parameters, error-correction leakage | Integrity, authenticity, freshness; confidentiality where analysis shows it is required | QKD modules and authenticated classical channel | [V]/[ED]/[TBD] |
| A-07 | **Optical-device and entropy security state** — source/detector characterization, calibration, health tests, random settings | Integrity, provenance, freshness, tamper resistance | Space and ground QKD modules | [V]/[ED] |
| A-08 | **Key-management and cryptographic boundary** — KMS/HSM functions, policy, storage, transfer interfaces | Isolation, access control, self-protection, audit, recovery | Ground segment; exact boundary TBD | [ED]/[TBD] |
| A-09 | **AQMO service, policy, and decision state** — approved configurations, optimization constraints, plans, abort/replan logic | Integrity, authenticity, availability, least privilege, explainability/auditability | Orchestration/control segment | [ED] |
| A-10 | **Spacecraft and payload command/telemetry** | Command authenticity and authorization; telemetry integrity, provenance, freshness, availability | Satellite bus, payload, mission control | [ED]/[TBD] |
| A-11 | **Mission and resource-state data** — orbit, time, weather, visibility, hardware status, key inventory, alerts | Integrity, provenance, freshness, availability, confidence marking | External services, terminals, AQMO | [ED] |
| A-12 | **Software, firmware, models, and configuration** | Integrity, authenticity, version control, secure update, rollback control, reproducibility | All SQDS segments | [ED] |
| A-13 | **Security logs and evidence** | Integrity, origin authenticity, time consistency, controlled access, retention, privacy | Modules, KMS, AQMO, security operations | [V]/[ED] |
| A-14 | **Physical infrastructure and trusted personnel** | Access control, safety, tamper detection, separation of duties, accountability | Space/ground facilities and operations | [ED]/[TBD] |
| A-15 | **Supply-chain and lifecycle assurance** — components, build pipeline, calibration equipment, updates, spares, decommissioning | Provenance, integrity, authenticity, custody, vulnerability response, sanitization | Suppliers and system owner | [ED]/[TBD] |
| A-16 | **Key-service availability and mission confidence** | Timely service, predictable degraded behavior, recovery, no silent compromise | End-to-end SQDS | [ED]/[TBD] |

### 2.4.2 Key-state protection model

| Key state | May leave QKD security boundary? | Primary rule | Status |
|---|---|---|---|
| Authentication/trust seed | Only through an approved provisioning or update process | Never bootstrap trust from an unauthenticated failed link | [V]/[ED] |
| Raw detection data | No | Minimize retention and access; exclude from AQMO | [ED] |
| Sifted/intermediate string | No | Protect according to the selected security proof and post-processing design | [ED]/[TBD] |
| Reconciled pre-amplification string | No | Treat as highly sensitive intermediate material | [ED] |
| Final secret key | Only through the controlled KMS/HSM handoff | Export only after every security and authentication condition passes | [ED] |
| Stored/distributed key | Yes, only inside approved cryptographic protection and policy boundaries | Bind to endpoints, key ID, use, lifetime, and authorization | [ED] |
| Consumed/expired/revoked key | No further use | Prevent reuse; destroy or render irrecoverable according to policy | [ED]/[TBD] |

AQMO may receive **key inventory metadata** but shall not receive raw, intermediate, or final key values. **[ED]**

---

## 2.5 Security Objectives

| ID | Security objective | Design intent | Status |
|---|---|---|---|
| SO-01 | **Key confidentiality** | Prevent unauthorized disclosure of intermediate and final key material throughout generation, storage, transfer, use, and destruction | [V]/[ED] |
| SO-02 | **Key integrity and agreement** | Ensure accepted peer keys match and have not been biased, substituted, rolled back, or modified | [V]/[ED] |
| SO-03 | **Mutual authentication and authorization** | Authenticate QKD peers and control/management entities; authorize every service, command, and key consumer | [V]/[ED] |
| SO-04 | **Correct key binding** | Bind each key to the intended endpoint pair, consumer, mission/purpose, security policy, and session | [ED] |
| SO-05 | **Protocol-valid secret output** | Release a key only when the selected protocol proof, finite-key parameters, implementation model, and acceptance tests are satisfied | [V]/[ED]/[TBD] |
| SO-06 | **Cryptographic-boundary protection** | Isolate sensitive key functions and minimize components and people able to access secret material | [ED]/[TBD] |
| SO-07 | **Command and configuration integrity** | Accept only authenticated, authorized, fresh, policy-valid commands, software, firmware, models, and configuration | [ED] |
| SO-08 | **Constrained orchestration** | Ensure AQMO acts only on authenticated inputs and approved configurations, with bounded authority and auditable decisions | [ED] |
| SO-09 | **Availability with safe degradation** | Detect denial or failure, preserve trusted key state, replan if authorized, and never silently weaken policy | [ED] |
| SO-10 | **Accountability and forensic evidence** | Produce trustworthy audit evidence without logging secret key values | [V]/[ED] |
| SO-11 | **Physical, personnel, and supply-chain assurance** | Protect devices and lifecycle processes from tampering, malicious insertion, unauthorized access, and insecure maintenance | [ED]/[TBD] |
| SO-12 | **Crypto agility and recoverability** | Replace deprecated protocols/algorithms/configurations, revoke trust, recover service, and prevent key or state reuse | [ED] |

QKD directly contributes to SO-01, SO-02, and SO-05 under the selected protocol and device assumptions. It does **not** independently satisfy the remaining objectives. **[V]/[ED]** [R4, R7, R8]

---

## 2.6 Trust Boundaries and Attack Surfaces

### 2.6.1 Trust rule

No interface is trusted merely because it is internal, space-based, physically remote, vendor supplied, or used by a quantum subsystem. **[ED]** Trust is attached to an authenticated entity, approved role, validated configuration, protected cryptographic boundary, verified device state, and current policy decision. **[ED]**

### 2.6.2 Trust-boundary register

| ID | Boundary crossing | Data/authority crossing | Preliminary trust rule | Status |
|---|---|---|---|---|
| TB-01 | Space QKD module ↔ free-space quantum channel | Quantum states; optical acquisition/tracking signals | Treat path as adversary observable/manipulable; accept output only through protocol and device-security validation | [V]/[ED] |
| TB-02 | Ground QKD module ↔ free-space quantum channel | Quantum states; optical acquisition/tracking signals | Same as TB-01; additionally control background light and physical terminal exposure | [V]/[ED] |
| TB-03 | Space QKD module ↔ ground QKD module over classical channel | Synchronization, sifting, estimation, reconciliation, session control | Require peer authentication, integrity, freshness, anti-replay, and session binding; confidentiality assessed by message type | [V]/[ED]/[TBD] |
| TB-04 | QKD payload ↔ spacecraft bus/platform | Commands, telemetry, time, power/thermal state, payload data | Authenticate/authorize commands; validate telemetry provenance and freshness; isolate payload security functions | [ED]/[TBD] |
| TB-05 | Ground QKD terminal ↔ ground network/operations | Commands, telemetry, protocol data, maintenance | Segment, mutually authenticate, authorize by role, monitor, and fail closed | [ED] |
| TB-06 | QKD module ↔ KMS/HSM | Final key, key ID, endpoint and policy metadata, status | Protected trusted path; no export until key accepted; explicit acknowledgment and zeroization policy | [V]/[ED]/[TBD] |
| TB-07 | KMS/HSM ↔ secure application/encryptor | Key material or key handle, metadata, usage request/status | Strong consumer identity, authorization, purpose binding, least privilege, anti-replay, audit | [ED]/[TBD] |
| TB-08 | AQMO ↔ terminals/KMS/mission systems | Plans, reservations, state, inventory metadata, abort/replan commands | Mutual authentication, data integrity, authorization, policy constraints, provenance, auditable decisions; no raw keys | [V]/[ED] |
| TB-09 | AQMO/mission systems ↔ external data services | Orbit, weather, time, alerts, site state | Authenticate source where possible; validate freshness, plausibility, confidence, and cross-source consistency | [ED]/[TBD] |
| TB-10 | Operators/maintainers ↔ management interfaces | Credentials, administrative actions, calibration, emergency control | Individual identity, least privilege, separation of duties, protected maintenance, session limits, full audit | [V]/[ED] |
| TB-11 | Supplier/developer/test environment ↔ operational baseline | Hardware, firmware, software, models, keys/credentials, calibration artifacts | Provenance, signed release, reproducible build where feasible, acceptance testing, custody, vulnerability response | [ED]/[TBD] |

ITU-T X.1717 identifies controller and manager software, topology, routing, key-inventory information, QBER/status, policies, access-control data, logs, and management information as assets exposed to spoofing, eavesdropping, corruption/deletion, and denial of service. **[V]** [R6] These concerns apply by analogy to AQMO and its interfaces, but Q-Orbit does not claim conformance to X.1717 in V0.1. **[ED]**

---

## 2.7 Threat Sources and Capability Model

### 2.7.1 Threat-source classes

| ID | Threat source | Relevant motivation or condition | Status |
|---|---|---|---|
| TS-01 | External cyber adversary | Obtain access, manipulate service, steal metadata/keys, deny service, establish persistence | [ED] |
| TS-02 | Quantum/optical-channel adversary | Learn or influence key material by attacking the channel or implementation assumptions | [V]/[ED] |
| TS-03 | Electronic/optical denial actor | Jam, dazzle, flood, spoof acquisition signals, or exhaust scarce contact opportunities | [ED] |
| TS-04 | Malicious or coerced insider | Abuse legitimate physical, administrative, maintenance, developer, or key-service access | [ED] |
| TS-05 | Supply-chain adversary | Introduce malicious or vulnerable components, firmware, software, test equipment, or credentials before operation | [ED] |
| TS-06 | Physical intruder | Access, probe, alter, remove, or observe ground equipment and interfaces | [V]/[ED] |
| TS-07 | Future cryptanalytic/quantum-capable adversary | Decrypt previously collected traffic or defeat legacy public-key mechanisms | [V]/[ED] |
| TS-08 | Accidental human action | Misconfigure, misroute, mishandle, over-retain, or incorrectly maintain security-critical state | [ED] |
| TS-09 | Structural/technical failure | Hardware malfunction, calibration drift, software defect, clock error, storage failure, or interoperability defect | [V]/[ED] |
| TS-10 | Environmental source | Cloud, turbulence, background light, weather, radiation, thermal state, vibration, or site outage | [V]/[ED] |

Non-adversarial sources are included because their observable effects may be indistinguishable from attack and can cause the same unsafe output if the system handles them incorrectly. **[ED]**

### 2.7.2 Capability classes

| ID | Capability | Example access represented | Status |
|---|---|---|---|
| CAP-1 | Remote network access | Reach an exposed or connected classical interface | [A] |
| CAP-2 | Authenticated-but-unauthorized or stolen identity | Possess a valid/stolen credential, session, or compromised service identity | [A] |
| CAP-3 | RF/optical line-of-sight or channel access | Observe, inject, interfere with, or deny an exposed communications path | [A] |
| CAP-4 | Local physical access | Reach a ground terminal, cable, port, maintenance interface, or supporting facility | [A] |
| CAP-5 | Privileged operational/developer access | Change policy, configuration, software, calibration, logs, or key-service state | [A] |
| CAP-6 | Supply-chain access | Modify an item or artifact before acceptance or during maintenance | [A] |
| CAP-7 | Cryptographically relevant quantum capability | Attack quantum-vulnerable public-key mechanisms or retained ciphertext | [V]/[A] |

The capability classes are **analysis abstractions**, not claims about a named actor. Whether a specific adversary has a capability, and with what resources or probability of success, is **[TBD]**.

---

## 2.8 Threat Assumptions and Exclusions

### 2.8.1 Preliminary assumptions

| ID | Assumption | Why needed now | Closure route |
|---|---|---|---|
| ATH-01 | The free-space quantum path and associated classical transport are potentially hostile. **[A]** | Establishes a conservative external boundary | Retain unless a stricter architecture supersedes it |
| ATH-02 | Ground QKD, KMS/HSM, and operations functions can be placed inside physically controlled facilities. **[A]** | Permits a preliminary trusted-zone model | Site and operator security review |
| ATH-03 | Spacecraft bus and payload interfaces can support authenticated command and protected update mechanisms. **[A]** | Prevents an impossible security allocation | Platform trade study and supplier evidence |
| ATH-04 | The QKD protocol, link direction, source, detector, and finite-key proof remain unselected. **[TBD]** | Avoids hiding protocol-specific risks | Chapters 6–8 and specialist review |
| ATH-05 | A prepare-and-measure protocol is a candidate analysis family, not an approved baseline. **[A]** | Aligns the first threat model with ETSI GS QKD 016 while keeping the trade open | Protocol trade study |
| ATH-06 | AQMO can operate using metadata and trusted control interfaces without access to secret key values. **[A]/[ED]** | Enforces least privilege | Architecture and interface analysis |
| ATH-07 | The initial trust-anchor and classical authentication method can be provisioned securely. **[A]/[TBD]** | QKD cannot create authenticated identity from nothing | Chapter 9 crypto-architecture review |
| ATH-08 | The mission can tolerate some aborted QKD sessions but not unsafe key release. **[A]** | Establishes fail-closed preference | Operational stakeholder validation |
| ATH-09 | No classified operational data or real target/site vulnerability information is needed for V0.1. **[ED]** | Keeps the August artifact conceptual and publishable | Reassess under future handling rules |
| ATH-10 | One satellite, one ground station, and one pass remain the initial analysis case only. **[A]** | Keeps the threat model and simulation tractable | Later coverage/constellation study |

### 2.8.2 Explicit exclusions from V0.1 threat detail

- Named nation-state attribution, current intelligence estimates, and adversary-specific likelihoods. **[ED]**
- Detailed offensive procedures, device-specific exploitation instructions, or operational counterspace tactics. **[ED]**
- Quantitative kinetic, directed-energy damage, anti-satellite, debris, or armed-conflict modeling; loss of an affected resource remains an availability consequence. **[ED]**
- Full enterprise IT, user-endpoint, or secure-encryptor threat modeling beyond the SQDS interface. **[ED]**
- Certification against Common Criteria, FIPS, national military standards, or a cryptographic approval regime. **[ED]**
- Device-independent QKD, quantum repeaters, and operational quantum memories as baseline mitigations. **[ED]**

Exclusion from detailed modeling does not mean the threat is impossible or accepted. It means the topic is outside the defensible depth of the 31 August submission. **[ED]**

---

## 2.9 Preliminary Threat Register

Practical QKD security must account for deviations between real devices and idealized models. **[V]** [R7] Published demonstrations include detector-control attacks using tailored bright illumination, time-shift attacks exploiting detector-efficiency mismatch, and Trojan-horse probing that uses back-reflections to infer internal state. **[V]** [R9–R11] Decoy-state methods were developed to address the security effect of multiphoton weak-coherent pulses, while measurement-device-independent QKD is a separate architecture intended to remove detector side channels. **[V]** [R12, R13] These findings justify implementation-specific threats; they do not prove that a future Q-Orbit device contains any particular vulnerability. **[ED]**

| ID | Threat event | Assets / boundary | Consequence | Priority | Status |
|---|---|---|---|---|---|
| QO-T01 | An optical-channel adversary observes or actively manipulates quantum transmissions to gain information about key material beyond the bound accepted by the selected security proof. | A-02, A-03, A-06; TB-01/02 | C1 if undetected; safe result is abort or privacy amplification within proof | P1 | [V]/[ED] |
| QO-T02 | Source imperfections, multiphoton emissions, phase/intensity leakage, or incorrect decoy-state implementation allow information leakage not represented in the model. | A-02, A-03, A-07; TB-01 | C1 | P1 | [V]/[ED]/[TBD] |
| QO-T03 | Detector-control, efficiency-mismatch, timing, saturation, or related receiver side channels cause accepted detections to violate the assumed measurement model. | A-02, A-03, A-07; TB-02 | C1 | P1 | [V]/[ED]/[TBD] |
| QO-T04 | Injected optical probes and analyzed back-reflections expose internal settings or sensitive state. | A-02, A-03, A-07; TB-01/02 | C1 | P1 | [V]/[ED] |
| QO-T05 | Biased, predictable, failed, or manipulated entropy affects basis choice, decoy settings, key generation, authentication, or other cryptographic functions. | A-02–A-07 | C1 | P1 | [V]/[ED] |
| QO-T06 | Malfunction, environmental stress, calibration drift, or malicious calibration produces insecure operation that is not detected before key release. | A-02, A-06, A-07, A-12 | C1 | P1 | [V]/[ED] |
| QO-T07 | Bright background, injected light, or acquisition/pointing deception causes false acquisition, abnormal counts, sensor stress, or loss of a qualified link. | A-07, A-10, A-16; TB-01/02 | C1 if it induces unsafe acceptance; otherwise C2 denial | P1 | [ED]/[TBD] |
| CP-T01 | An adversary impersonates a QKD peer or modifies the classical distillation channel because initial trust or ongoing authentication is absent, broken, or downgraded. | A-02–A-06; TB-03 | C1 | P1 | [V]/[ED] |
| CP-T02 | Replay, session hijacking, stale messages, or cross-session/cross-link substitution causes key or protocol state to be accepted under the wrong session. | A-02, A-05, A-06; TB-03/06/07 | C1 | P1 | [V]/[ED] |
| CP-T03 | Compromised or defective post-processing changes sifting, parameter estimation, error correction, privacy amplification, finite-key calculation, or abort logic. | A-02, A-03, A-06, A-12 | C1 | P1 | [ED]/[TBD] |
| CP-T04 | Manipulated time, synchronization, ephemeris, or ordering data corrupts coincidence windows, session freshness, pass selection, or audit reconstruction. | A-06, A-10, A-11, A-13; TB-03/04/09 | C1/C2 | P1 | [ED]/[TBD] |
| CP-T05 | Loss of QKD triggers an automatic or operator-driven downgrade to an unapproved algorithm, key source, endpoint, or policy. | A-01, A-04, A-16 | C1 | P1 | [ED] |
| KM-T01 | KMS/HSM, key store, trusted path, or key-consumer interface is compromised, exposing or modifying final keys after QKD succeeds. | A-02, A-04, A-05, A-08; TB-06/07 | C1 | P1 | [V]/[ED] |
| KM-T02 | An unauthorized or misidentified consumer obtains a key, or a valid key is bound to the wrong endpoint, purpose, domain, or session. | A-02, A-05, A-08; TB-06/07 | C1 | P1 | [V]/[ED] |
| KM-T03 | A key is reused, retained too long, rolled back, incompletely destroyed, or consumed beyond its authorized policy. | A-02, A-05, A-08 | C1 | P1 | [ED]/[TBD] |
| KM-T04 | Key metadata or audit records leak sensitive mission patterns or are altered to conceal misuse and prevent traceability. | A-05, A-13; TB-06/07/08 | C2; may enable C1 | P2 | [ED] |
| CY-T01 | Ground-terminal, mission-operations, or supporting network compromise enables persistent control, data manipulation, credential theft, or lateral movement into QKD/KMS functions. | A-02, A-04, A-07–A-13; TB-05/08/10 | C1 | P1 | [V]/[ED] |
| CY-T02 | Spacecraft bus or payload command/telemetry compromise changes QKD operation, device configuration, timing, software, or reported state. | A-07, A-10–A-12; TB-04 | C1 | P1 | [V]/[ED]/[TBD] |
| CY-T03 | Malicious or vulnerable software, firmware, dependency, model, update, build artifact, calibration equipment, or hardware enters through the supply chain or maintenance path. | A-07, A-09, A-10, A-12, A-15; TB-11 | C1 | P1 | [ED]/[TBD] |
| CY-T04 | A privileged insider abuses legitimate access, combines roles, exports key/security data, alters calibration or policy, or suppresses evidence. | A-02–A-15; TB-10/11 | C1 | P1 | [V]/[ED] |
| AQ-T01 | False, stale, or manipulated orbit, weather, time, hardware, security-alert, or key-inventory data causes AQMO to select an invalid or unsafe mission plan. | A-09–A-11, A-16; TB-08/09 | C1/C2 | P1 | [V]/[ED] |
| AQ-T02 | An attacker spoofs an AQMO/control entity, changes commands or policy, or denies control/management interfaces. | A-09–A-13, A-16; TB-08 | C1/C2 | P1 | [V]/[ED] |
| AQ-T03 | An optimization defect, unconstrained autonomy, unsafe learned behavior, or configuration error selects incompatible resources or bypasses security gates. | A-02, A-09–A-12, A-16 | C1 | P1 | [ED]/[TBD] |
| AV-T01 | Optical or RF interference, traffic flooding, protocol abuse, or repeated forced aborts deny a qualified link or consume contact time and authentication/key inventory. | A-04, A-07, A-10, A-16; TB-01–05/08 | C1/C2, mission dependent | P1 | [V]/[ED] |
| AV-T02 | Weather, turbulence, background light, radiation, thermal state, pointing error, hardware failure, or site outage removes or degrades a service opportunity. | A-07, A-10, A-11, A-16 | C1/C2, mission dependent | P1 | [V]/[ED] |
| AV-T03 | Key inventory, authentication material, power, detector capacity, storage, compute, or contact opportunities are exhausted or monopolized. | A-04, A-08, A-09, A-16 | C1/C2 | P1 | [ED]/[TBD] |
| TN-T01 | A trusted relay/node or operator with plaintext key access is compromised, making the end-to-end claim depend on an unverified trusted point. | A-02, A-08, A-14; TB-06/07 | C1 | P2 until trust architecture chosen | [V]/[ED]/[TBD] |
| CR-T01 | Legacy authentication or retained ciphertext becomes vulnerable to a cryptographically relevant quantum computer, or PQC/QKD algorithms and implementations cannot be replaced safely. | A-01, A-04, A-12, A-16 | C1/C2 | P1 | [V]/[ED] |

The register deliberately includes denial, malfunction, and operator error. QKD can detect or react to some abnormal channel conditions, but it cannot distinguish every attack from environmental degradation and cannot guarantee availability. **[V]/[ED]** [R8]

---


## 2.10 Preliminary Security-Control Allocation

### 2.10.1 Control families

The following control families are architecture allocations, not implemented controls or certification claims. **[ED]** They will be decomposed into formal requirements in Chapter 4 and components/interfaces in Chapters 5–9.

| ID | Control family | Preliminary content | Primary owner | Status |
|---|---|---|---|---|
| CF-01 | **Identity, mutual authentication, and authorization** | Trust anchors; peer/service identity; role and attribute policy; mutual authentication; separation of duties; credential lifecycle | Identity/crypto authority, QKD peers, control plane | [V]/[ED]/[TBD] |
| CF-02 | **QKD protocol and finite-key assurance** | Approved protocol/configuration; authenticated transcript; parameter estimation; leakage accounting; privacy amplification; finite-key bound; abort gates | QKD subsystem | [V]/[ED]/[TBD] |
| CF-03 | **Optical implementation security** | Source/detector characterization; decoy verification where applicable; optical isolation/filtering; power monitoring; side-channel evaluation; safe optical limits | Space/ground QKD hardware | [V]/[ED]/[TBD] |
| CF-04 | **Entropy, calibration, health, and self-test** | Entropy-source validation and health tests; protected calibration; drift limits; startup/continuous self-test; failure state | QKD/cryptographic modules | [V]/[ED]/[TBD] |
| CF-05 | **Segmentation and least privilege** | Isolate quantum, payload, mission, KMS, AQMO, and administrative zones; minimize services; restrict data flow and privileges | Cybersecurity architecture | [ED] |
| CF-06 | **Key lifecycle and protected cryptographic boundary** | Protected generation, import/export, storage, labeling, use, revocation, accounting, backup constraints, zeroization, and destruction | KMS/HSM and crypto authority | [V]/[ED]/[TBD] |
| CF-07 | **Session, endpoint, and purpose binding** | Fresh nonces/counters; anti-replay; link/session identifiers; endpoint pair; consumer; policy; purpose; acknowledgment | QKD, KMS, consumer interfaces | [ED] |
| CF-08 | **Secure software, firmware, configuration, and update** | Secure development; signed release; verified boot; version/configuration control; rollback protection; vulnerability and patch process | All segments | [V]/[ED]/[TBD] |
| CF-09 | **Constrained AQMO and trusted decision data** | Approved configuration catalogue; input provenance/freshness; plausibility checks; policy constraints; human gates; deterministic safe fallback; no raw-key access | AQMO/control architecture | [V]/[ED]/[TBD] |
| CF-10 | **Availability, inventory, and graceful degradation** | Resource reservation; rate limiting; inventory thresholds; alternate qualified opportunity; fail-closed abort; no silent downgrade; recovery priorities | AQMO, operations, KMS | [ED]/[TBD] |
| CF-11 | **Monitoring, audit, response, and recovery** | Security telemetry; tamper-evident logs; detection rules; incident states; containment; revocation; recovery; evidence preservation | Security operations and all modules | [V]/[ED]/[TBD] |
| CF-12 | **Physical, environmental, and maintenance protection** | Controlled facilities; tamper evidence; protected ports; personnel security; calibration custody; environmental limits; safe maintenance | Ground/space operations | [V]/[ED]/[TBD] |
| CF-13 | **Supply-chain and lifecycle assurance** | Supplier/component provenance; acceptance tests; SBOM/configuration inventory; build and signing protection; vulnerability disclosure; secure decommissioning | Program/supplier assurance | [V]/[ED]/[TBD] |
| CF-14 | **Crypto agility and approved fallback** | Replaceable algorithms/protocols; version negotiation policy; hybrid key establishment/authentication; deprecation and emergency transition | Crypto authority and architecture | [V]/[ED]/[TBD] |
| CF-15 | **Independent assurance and adversarial evaluation** | Security-proof-to-implementation mapping; code review; optical penetration testing; fault injection; red-team exercises; V&V traceability | Independent V&V/security evaluator | [V]/[ED]/[TBD] |

NIST has standardized ML-KEM for post-quantum key establishment and ML-DSA for post-quantum digital signatures. **[V]** [R14, R15] Their existence supports a PQC option for hybrid trust and authentication; it does not by itself select an algorithm, parameter set, certificate model, or approval authority for Q-Orbit. Those remain **[TBD]**.

NIST guidance on key management, entropy sources, cyber supply-chain risk, and secure software development informs CF-06, CF-04, CF-13, and CF-08 respectively. **[V]/[ED]** [R16–R19] ITU-T Y.3832 now defines an in-force orchestration framework for QKD networks; it is relevant prior work for AQMO resource coordination, but Q-Orbit does not claim that AQMO implements or conforms to that framework. **[V]/[ED]** [R20]

### 2.10.2 Threat-to-control matrix

| Threat | Prevent / reduce | Detect / validate | Respond / recover | Residual risk after conceptual controls |
|---|---|---|---|---|
| QO-T01 | CF-02, CF-03 | CF-02, CF-04, CF-15 | Abort; discard affected material; investigate under CF-11 | Protocol/model mismatch and finite data remain [TBD] |
| QO-T02 | CF-02, CF-03 | Source characterization, decoy statistics, configuration checks | Abort/reconfigure; quarantine device | Source model and flight stability remain [TBD] |
| QO-T03 | CF-03; consider detector-side architecture trade | Detector monitoring, characterization, adversarial test | Abort; isolate receiver; revoke configuration | Detector-specific side channels remain [TBD] |
| QO-T04 | Optical isolation/filtering/monitoring under CF-03 | Probe-power and anomaly detection; leakage evaluation | Abort; inspect and recalibrate | Out-of-band and low-observable leakage remain [TBD] |
| QO-T05 | Validated entropy architecture under CF-04 | Continuous health tests and startup validation | Enter failure state; invalidate affected sessions | Entropy model and attack coverage remain [TBD] |
| QO-T06 | Protected calibration and operating envelope under CF-04/12 | Self-test, drift monitoring, cross-checks | Fail closed; recalibrate under controlled maintenance | Latent common-mode failure remains [TBD] |
| QO-T07 | CF-03, CF-10, safe PAT design | Optical power/count/PAT consistency monitoring | Abort, safe sensor state, replan | Availability cannot be guaranteed [ED]/[TBD] |
| CP-T01 | CF-01, CF-02, CF-14 | Verify peer identity and every authenticated transcript | Reject/abort; revoke trust; incident response | Initial trust-anchor compromise remains [TBD] |
| CP-T02 | CF-07 | Freshness, sequence, endpoint, and session checks | Reject; close session; investigate | Distributed-state synchronization defects remain [TBD] |
| CP-T03 | CF-05, CF-08 | Reproducible tests, independent calculation, integrity checks | Roll back to approved version; invalidate output | Undiscovered software/proof integration defects remain [TBD] |
| CP-T04 | CF-07, CF-09 | Independent time/ephemeris and plausibility checks | Abort/replan; mark data source untrusted | Common-source corruption and space timing limits remain [TBD] |
| CP-T05 | CF-10, CF-14 | Policy engine detects unauthorized transition | Deny service or use explicitly approved fallback only | Mission may lose availability [ED]/[TBD] |
| KM-T01 | CF-05, CF-06, CF-12 | Access, integrity, tamper, and key-use monitoring | Revoke/zeroize; isolate; re-establish trust | Privileged or hardware compromise remains [TBD] |
| KM-T02 | CF-01, CF-06, CF-07 | Two-sided binding and authorization validation | Deny/revoke; invalidate delivery | Identity-governance errors remain [TBD] |
| KM-T03 | CF-06, CF-07 | Key-state accounting and duplicate/use detection | Revoke, destroy, assess affected traffic | Media-remanence and consumer enforcement remain [TBD] |
| KM-T04 | CF-05, CF-11 | Log integrity, access analytics, cross-system reconciliation | Preserve evidence; restore trusted state | Traffic-analysis leakage remains [TBD] |
| CY-T01 | CF-01, CF-05, CF-08, CF-12 | CF-11 and independent security testing | Isolate zones, revoke credentials, recover known-good state | Advanced persistence/zero-days remain [TBD] |
| CY-T02 | CF-01, CF-05, CF-08 | Command/telemetry integrity and state-consistency monitoring | Safe payload mode; revoke command path; recover | Platform capabilities and in-orbit recovery remain [TBD] |
| CY-T03 | CF-08, CF-13 | Provenance, acceptance test, component and build verification | Quarantine; replace; revoke signing trust | Deep supplier/subcomponent compromise remains [TBD] |
| CY-T04 | CF-01, CF-05, CF-11, CF-12 | Separation of duties, behavior and audit review | Suspend access; revoke; investigate; recover | Collusion/coercion remain [TBD] |
| AQ-T01 | CF-09 | Provenance, freshness, cross-source plausibility | Reject source; hold/replan; require review | Correlated false data and sensor compromise remain [TBD] |
| AQ-T02 | CF-01, CF-05, CF-09 | Control-interface authentication/integrity and command audit | Reject, isolate controller, safe local policy | Control-plane denial remains [TBD] |
| AQ-T03 | CF-09, CF-15 | Constraint checker, simulation, decision replay, independent review | Stop automation; revert to approved plan/manual gate | Unknown objective interactions remain [TBD] |
| AV-T01 | CF-05, CF-10, rate limits | Channel, traffic, resource, and abort-pattern monitoring | Abort/replan; preserve inventory; prioritize mission | A qualified opportunity may still be lost [ED] |
| AV-T02 | CF-04, CF-10, CF-12 | Environment/device telemetry and prediction comparison | Abort, defer, alternate resource, maintenance | Weather and orbital intermittency remain [V]/[ED] |
| AV-T03 | CF-09, CF-10 | Inventory/capacity thresholds and reservation audit | Throttle, reprioritize, replenish through qualified sessions | Mission demand may exceed physical supply [TBD] |
| TN-T01 | Minimize trusted relays; CF-01, CF-05, CF-06, CF-12 | Node attestation/tamper/audit where supported | Revoke node; reroute only through approved trust path | Plaintext access at a trusted node remains a fundamental dependency [V] |
| CR-T01 | CF-14, CF-08, CF-13 | Algorithm/configuration inventory and deprecation monitoring | Controlled migration, hybrid mode, trust re-establishment | Future cryptanalysis and approval changes remain [TBD] |

No row is considered “mitigated” merely because controls are listed. Control effectiveness requires architecture allocation, implementation evidence, and verification. **[ED]**

---

## 2.11 Security Responsibility by Layer

| Layer | Security contribution | Does not independently provide |
|---|---|---|
| **QKD protocol and quantum link** | Bounds information leakage under the selected proof/model; produces or aborts secret-key output | Endpoint identity, software security, key storage, data encryption, service availability, or protection from every implementation flaw **[V]** |
| **PQC / classical authentication** | Establishes or verifies identity and integrity over classical interfaces; can provide quantum-resistant key establishment/signatures where approved | Information-theoretic secrecy, physical-device assurance, or availability **[V]/[ED]** |
| **Symmetric cryptography / secure application** | Protects mission data using approved keys and modes | Secure key generation, distribution, authorization, or endpoint integrity by itself **[ED]** |
| **KMS/HSM** | Protects, labels, stores, accounts for, delivers, revokes, and destroys key material | Quantum-channel security, mission scheduling, or immunity from privileged/hardware compromise **[ED]** |
| **Cybersecurity architecture** | Protects software, networks, commands, identities, configurations, updates, monitoring, and response | Physical quantum security or guaranteed resistance to all unknown vulnerabilities **[ED]** |
| **AQMO** | Selects qualified resources and configurations, enforces policy gates, manages inventory/priority, aborts/replans, and records decisions | Authority to waive cryptographic conditions, access raw keys, create missing hardware capability, or guarantee a link **[ED]** |
| **Operations and physical security** | Protects sites, personnel, maintenance, emergency action, and trusted procedures | Mathematical/protocol security or guaranteed insider prevention **[ED]** |

The hybrid architecture is not an optional embellishment; it follows from the fact that no single layer supplies all required security objectives. **[ED]**

---

## 2.12 Design-Driving Threat Scenarios

### 2.12.1 DS-01 — Quantum link produces suspicious security parameters

**Trigger.** Counts, decoy statistics, QBER, timing, optical power, or device-health indicators fall outside the approved model or acceptance region. **[ED]/[TBD]**

**Safe system behavior.**

1. The QKD endpoint marks the session non-acceptable and prevents final-key export.
2. Intermediate material from the affected session is destroyed according to policy.
3. The peer, KMS, AQMO, and security monitoring receive authenticated status—not raw key data.
4. AQMO may replan only to a prequalified configuration/opportunity.
5. Repeated or correlated anomalies escalate to investigation and device quarantine. **[ED]**

**Residual risk.** A side channel not represented by monitored parameters may remain undetected. Independent component characterization and adversarial evaluation are therefore required. **[V]/[ED]/[TBD]**

### 2.12.2 DS-02 — Classical peer authentication fails or cannot be refreshed

**Trigger.** Peer identity, credential validity, transcript integrity, freshness, or authorization cannot be established. **[ED]**

**Safe system behavior.**

1. No QKD session is accepted and no key is released.
2. The system does not regenerate authentication trust over the uncontrolled failed link.
3. Existing unrelated keys remain isolated and are not automatically exposed or consumed.
4. Recovery uses an approved out-of-band or pre-established trust process.
5. AQMO records the resource as unavailable/untrusted until restored by authorized action. **[V]/[ED]**

**Residual risk.** Availability is lost until trust is restored; the initial provisioning and recovery mechanism remains **[TBD]**.

### 2.12.3 DS-03 — Ground terminal or KMS is suspected compromised

**Trigger.** Unauthorized administration, anomalous key access, tamper state, malware evidence, configuration drift, or unexplained audit inconsistency is detected. **[ED]**

**Safe system behavior.**

1. Stop key export and consumer delivery at the affected boundary.
2. Isolate the terminal/KMS and revoke affected identities and trust relationships.
3. Preserve tamper-evident evidence while preventing secret-key logging.
4. Determine the affected key/time/session scope and notify authorized incident command.
5. Recover from a verified baseline and re-establish trust before service resumes. **[ED]**

**Residual risk.** Keys already consumed may have protected traffic whose confidentiality impact requires a mission-owner assessment. **[TBD]**

### 2.12.4 DS-04 — AQMO receives conflicting or poisoned decision data

**Trigger.** Orbit, time, weather, QBER, hardware, security, or inventory sources are stale, inconsistent, implausible, unauthenticated, or outside confidence policy. **[ED]**

**Safe system behavior.**

1. AQMO rejects untrusted inputs and identifies the violated provenance/freshness rule.
2. Security-critical constraints cannot be relaxed by the optimizer.
3. When evidence is insufficient, AQMO holds or aborts rather than inventing a valid state.
4. A human authorization gate is required for defined exceptions or policy changes.
5. The decision record permits independent replay without exposing key values. **[ED]**

**Residual risk.** Several trusted sources may share a common compromised origin; source independence and confidence rules remain **[TBD]**.

### 2.12.5 DS-05 — Quantum opportunity is denied or environmentally unavailable

**Trigger.** Cloud, loss, background, interference, pointing failure, traffic flooding, or device fault prevents a qualified session. **[V]/[ED]**

**Safe system behavior.**

1. Do not mislabel denial as a confidential key compromise without supporting evidence.
2. Do not lower QBER, authentication, or device-health thresholds to recover throughput.
3. Preserve valid existing inventory and enforce mission priority/rate limits.
4. Replan to an approved opportunity or enter a declared degraded/no-service mode.
5. Any non-QKD fallback requires explicit prior authorization and visible policy labeling. **[ED]**

**Residual risk.** No architecture can guarantee optical service through arbitrary obstruction, interference, or resource loss. **[V]/[ED]**

### 2.12.6 DS-06 — Correct key, wrong destination

**Trigger.** A valid final key is associated with an incorrect consumer, endpoint, mission domain, purpose, or session because of identity, metadata, or interface error. **[ED]**

**Safe system behavior.**

1. KMS and consumer independently validate key ID, endpoint pair, authorization, purpose, policy, freshness, and status.
2. A key is unusable outside its authorized binding.
3. Ambiguous or inconsistent metadata causes denial, not best-effort routing.
4. Delivery and acknowledgment are audited without exposing the key.
5. Misbound or uncertain keys are revoked and destroyed. **[ED]**

**Residual risk.** Identity governance and external consumer enforcement must be validated with the future operational authority. **[TBD]**

---

## 2.13 Residual Risks and Security-Claim Boundaries

### 2.13.1 Residual-risk statements

1. **Implementation residual risk.** A valid mathematical proof does not automatically cover source, detector, optical, entropy, calibration, firmware, or interface behavior. **[V]** [R4, R7]
2. **Authentication residual risk.** QKD requires authenticated classical communication and an initial or externally supported trust mechanism; compromise of that mechanism can invalidate the session. **[V]** [R4, R8]
3. **Endpoint residual risk.** Compromise after key generation—especially in a KMS, HSM, encryptor, application, or operator workflow—can defeat the mission without attacking the quantum link. **[V]/[ED]**
4. **Availability residual risk.** Intermittent access, weather, optical loss, interference, forced aborts, and resource exhaustion can prevent service. QKD does not guarantee availability. **[V]/[ED]** [R8]
5. **Trusted-node residual risk.** A relay or node that handles plaintext key material becomes a trust dependency and insider/physical-security exposure. **[V]** [R8]
6. **Control-plane residual risk.** AQMO can improve coordination but creates a high-value control and metadata surface. It must not become a single point able to bypass security acceptance. **[V]/[ED]** [R6]
7. **Supply-chain residual risk.** Component provenance, hidden functionality, latent defects, and update infrastructure cannot be eliminated by QKD. **[ED]**
8. **Crypto-transition residual risk.** PQC algorithms and implementations, QKD protocols, authentication methods, and approvals may change; agility itself introduces configuration and downgrade risk. **[V]/[ED]**
9. **Operational-acceptance residual risk.** If the intended customer is a U.S. National Security System, the current NSA position states that QKD is not recommended unless specified limitations are overcome and does not anticipate approval under that policy as currently described. **[V]** [R8] The specific customer, country, authority, and applicable policy remain **[TBD]**; Q-Orbit shall not imply adoption or approval.

### 2.13.2 Controlled security claims for V0.1

Q-Orbit may claim that:

- satellite QKD and space-ground QKD networks have been experimentally demonstrated under specific conditions, as established in Chapter 1; **[V]**
- QKD can contribute to secret-key establishment under an explicit protocol, finite-key model, device model, and authenticated classical channel; **[V]**
- the Q-Orbit concept allocates non-QKD security properties to PQC/authentication, KMS/HSM, cybersecurity, AQMO, and operations; **[ED]**
- the V0.1 threat model identifies design-driving threats and candidate controls for future verification. **[ED]**

Q-Orbit shall not claim that:

- QKD makes the entire system unconditionally or absolutely secure;
- eavesdropping is always detected in a real implementation;
- QKD prevents jamming, denial of service, malware, insider action, supply-chain compromise, or endpoint compromise;
- a positive simulated secret-key rate demonstrates operational security or customer approval;
- AQMO can override protocol acceptance, cryptographic policy, hardware capability, or human authority; or
- the V0.1 design is certified, deployed, flight qualified, or approved for military use. **[ED]**

---

## 2.14 Candidate Security Requirement Seeds for Chapter 4

These are **requirement seeds**, not yet baselined system requirements. Numeric thresholds, responsible components, and verification details remain subject to architecture and specialist review. **[ED]**

| ID | Candidate requirement seed | Traces to | Preliminary verification |
|---|---|---|---|
| SEC-SEED-01 | SQDS shall mutually authenticate QKD peers before accepting classical protocol messages or releasing key material. | CP-T01, SO-03 | Analysis + test |
| SEC-SEED-02 | SQDS shall provide integrity, origin authentication, freshness, anti-replay, and session binding for the QKD classical channel. | CP-T01/02/04 | Analysis + test |
| SEC-SEED-03 | SQDS shall release final key material only after every protocol, finite-key, authentication, device-health, calibration, and policy acceptance condition succeeds. | QO-T01–07, CP-T01/03 | Analysis + fault test |
| SEC-SEED-04 | A failed or uncertain security condition shall cause fail-closed abort and shall not produce approved key output. | UO-04, multiple P1 threats | Test + demonstration |
| SEC-SEED-05 | AQMO shall not access raw, sifted, reconciled, final, or stored key values. | SO-06/08, AQ-T02/03 | Architecture analysis + interface inspection |
| SEC-SEED-06 | AQMO shall select only prequalified endpoint, protocol, hardware, and parameter configurations and shall not relax security constraints to meet performance objectives. | AQ-T01–03, CP-T05 | Constraint test + decision replay |
| SEC-SEED-07 | Every AQMO input used for a security- or mission-critical decision shall carry source identity, integrity, freshness, validity interval, and confidence/provenance metadata. | AQ-T01, CP-T04 | Interface analysis + test |
| SEC-SEED-08 | Every AQMO mission decision and policy change shall be reproducibly auditable without recording secret key values. | AQ-T02/03, KM-T04 | Inspection + replay demonstration |
| SEC-SEED-09 | SQDS shall bind every final key to a unique key identifier, authorized endpoint pair, consumer, purpose/policy, session, validity interval, and lifecycle state. | KM-T02/03, CP-T02 | Analysis + end-to-end test |
| SEC-SEED-10 | SQDS shall deny key delivery when consumer identity, authorization, binding metadata, or key state is absent, ambiguous, stale, revoked, or inconsistent. | KM-T02/03 | Negative test |
| SEC-SEED-11 | The KMS/HSM path shall protect key confidentiality and integrity during receipt, storage, delivery, use, revocation, and destruction and shall minimize plaintext exposure. | KM-T01–03 | Boundary analysis + test |
| SEC-SEED-12 | SQDS shall prevent unauthorized key reuse and shall securely destroy intermediate, expired, revoked, failed-session, and decommissioned key material according to approved policy. | KM-T03, CY-T03 | Test + inspection |
| SEC-SEED-13 | QKD entropy sources shall be characterized, health tested, and monitored under an approved entropy model before their output is used for security-critical functions. | QO-T05 | Analysis + statistical/health test |
| SEC-SEED-14 | QKD modules shall protect calibration and security-critical device parameters from unauthorized change and shall detect operation outside approved limits. | QO-T06, CY-T04 | Calibration integrity + fault test |
| SEC-SEED-15 | The optical design shall define and verify source, detector, leakage, injected-light, and side-channel assumptions corresponding to the selected QKD security model. | QO-T02–04/07 | Characterization + adversarial evaluation |
| SEC-SEED-16 | Spacecraft, payload, ground, KMS, AQMO, and administrative commands shall be authenticated, authorized, fresh, and auditable. | CY-T01/02, AQ-T02 | Interface analysis + negative test |
| SEC-SEED-17 | Executable software, firmware, models, and security configuration shall be authenticated and integrity checked before execution or activation, with controlled rollback and recovery. | CP-T03, CY-T03 | Build/update test + inspection |
| SEC-SEED-18 | SQDS shall enforce network and privilege separation between QKD processing, spacecraft control, AQMO, KMS/HSM, external services, and administrative functions. | CY-T01–04, KM-T01 | Architecture review + penetration test |
| SEC-SEED-19 | Administrative, maintenance, audit, and key-request roles shall use individual identities, least privilege, session limits, and separation of duties defined by policy. | CY-T04, KM-T02/04 | Access-control test + audit |
| SEC-SEED-20 | SQDS shall maintain tamper-evident, time-consistent security audit records for authentication, configuration, calibration, key lifecycle, AQMO decisions, aborts, and administrative actions without recording secret keys. | KM-T04, CY-T01–04 | Inspection + integrity test |
| SEC-SEED-21 | SQDS shall detect quantum/classical link denial or degradation, preserve valid controlled key state, and transition to a declared degraded or no-service mode without silent security downgrade. | AV-T01/02, CP-T05 | Scenario demonstration |
| SEC-SEED-22 | AQMO/KMS shall monitor key and authentication inventory against approved thresholds and shall apply authorized reservation, prioritization, rate-limit, and replan policy. | AV-T03 | Simulation + operational test |
| SEC-SEED-23 | Recovery from a compromised identity, component, software baseline, or trust relationship shall require revocation, known-good restoration, and explicit re-establishment of trust. | CY-T01–04, KM-T01 | Incident exercise + test |
| SEC-SEED-24 | SQDS shall support controlled replacement and deprecation of QKD protocols, authentication/key-establishment algorithms, parameter sets, credentials, and interfaces without permitting unauthorized downgrade. | CR-T01, CP-T05 | Upgrade/migration test |
| SEC-SEED-25 | A trusted-relay architecture shall not be baselined unless the trust, plaintext-key exposure, physical protection, insider risk, compromise response, and mission benefit are explicitly approved. | TN-T01 | Trade study + authority review |
| SEC-SEED-26 | Critical time, orbit, environment, device-state, and inventory data shall be checked for freshness, provenance, plausibility, and cross-source consistency before use. | CP-T04, AQ-T01 | Data-injection and stale-data test |
| SEC-SEED-27 | SQDS shall provide an incident state that prevents new key release while preserving evidence and enabling authorized containment, revocation, recovery, and return-to-service decisions. | KM-T01, CY-T01–04 | Incident-response exercise |
| SEC-SEED-28 | QKD and key-management implementations shall undergo independent security evaluation that maps proof assumptions to actual hardware, software, interfaces, and operating conditions. | All QO threats; CF-15 | Independent review + test report |

Candidate cryptographic algorithms and precise assurance levels are intentionally absent. The relevant national authority—not Q-Orbit V0.1—must approve operational algorithms, modules, and key policy. **[ED]/[TBD]**

---

## 2.15 Verification Evidence Needed

| Evidence package | Purpose | Target chapters/workstream | Status |
|---|---|---|---|
| Protocol security dossier | State protocol, attacker model, composable/finite-key proof, parameters, leakage terms, and abort conditions | Research; Ch. 8/10/12 | [TBD] |
| Source/detector characterization report | Demonstrate that emitted/measured states match the security model within bounded uncertainty | Ch. 6–8/12 | [TBD] |
| Optical side-channel and injected-light evaluation | Test isolation, filtering, monitoring, back-reflection, saturation, and safe response | Ch. 6–8/12 | [TBD] |
| Entropy and calibration assurance report | Define entropy model/health tests and protected calibration lifecycle | Ch. 6–8/12 | [TBD] |
| Classical-channel authentication analysis | Define initial trust, credential lifecycle, mutual authentication, anti-replay, and recovery | Ch. 9/12 | [TBD] |
| KMS/HSM boundary and key-lifecycle test | Trace final key from QKD output through authorized consumer use and destruction | Ch. 9/12 | [TBD] |
| AQMO constraint and data-provenance test | Prove no raw-key access, approved-configuration selection, safe decision under false/stale data, and replayable audit | Ch. 3/5/10/12 | [TBD] |
| Space/ground cyber architecture assessment | Validate command integrity, segmentation, identity, update, monitoring, and recovery | Ch. 5–7/12 | [TBD] |
| Supply-chain assurance plan | Define component/software provenance, acceptance, vulnerability, maintenance, and decommissioning controls | Ch. 11/12 | [TBD] |
| Integrated adversarial/fault scenario test | Exercise the six design-driving scenarios and verify no unsafe key release | Ch. 10/12 | [TBD] |

The 31 August submission can specify these evidence packages and demonstrate selected model-level tests. It cannot honestly claim that hardware penetration testing, certification, or operational red-team evaluation has been completed. **[ED]**

---

## 2.16 Traceability to the Next Work

| This chapter output | Immediate next use |
|---|---|
| Assets A-01–A-16 and unacceptable outcomes UO-01–UO-10 | Define mission actors, states, and failure branches in Chapter 3 CONOPS |
| Trust boundaries TB-01–TB-11 | Define interfaces and security zones in Chapter 5 architecture |
| Threat register | Derive security requirements in Chapter 4 and risks in Chapter 11 |
| AQ-T01–03 and AV-T01–03 | Define AQMO authority, input contracts, degraded operations, and inventory logic in Chapters 3/5 |
| QO-T01–07 | Select protocol/device assumptions and simulation parameters in Chapters 6–8/10 |
| KM-T01–04 | Define KMS/HSM, key lifecycle, and consumer handoff in Chapter 9 |
| SEC-SEED-01–28 | Convert into measurable, allocated, verifiable “shall” requirements in Chapter 4 |
| Evidence packages | Build the Chapter 12 verification matrix and post-August specialist review plan |

The immediate engineering step after Chapter 2 is **Chapter 3 — CONOPS**, because the threat model must now be exercised across a complete nominal pass, abort cases, and degraded modes before formal requirements are frozen. **[ED]**

---

## Chapter 2 Decision and Open-Issue Register

### Decisions proposed for baseline approval

| ID | Decision | Rationale | State |
|---|---|---|---|
| ED-TH-01 | Treat quantum, classical, external-data, and exposed control paths as potentially hostile | Prevents implicit trust at remote/distributed boundaries | Proposed |
| ED-TH-02 | Use an asset- and mission-centric threat model informed by NIST, ETSI, and ITU | Creates traceability without claiming certification | Proposed |
| ED-TH-03 | Do not assign likelihood or final risk ratings in V0.1 | Required operational/intelligence/control-effectiveness inputs are absent | Proposed |
| ED-TH-04 | Use C1–C3 consequence and P1–P3 design-priority labels only as provisional engineering tools | Supports prioritization without false precision | Proposed |
| ED-TH-05 | Treat implementation security, authentication, KMS/HSM, control plane, endpoints, and availability as co-equal parts of the security claim | Matches practical QKD and system-security evidence | Proposed |
| ED-TH-06 | Prohibit AQMO access to all key values and prohibit it from overriding security acceptance conditions | Reduces trust and unsafe control authority | Proposed |
| ED-TH-07 | Require fail-closed behavior and forbid silent fallback/downgrade | Prevents throughput/availability pressure from weakening security invisibly | Proposed |
| ED-TH-08 | Keep trusted relays outside the baseline until a trust-architecture trade study is approved | Avoids silently importing plaintext-key and insider dependencies | Proposed |
| ED-TH-09 | Treat independent implementation evaluation as necessary future evidence | A protocol proof alone does not verify actual devices | Proposed |
| ED-TH-10 | Carry all 28 security requirement seeds into Chapter 4 for formalization or explicit disposition | Preserves traceability | Proposed |

### High-priority open issues

| ID | Open issue | Closure route | Target |
|---|---|---|---|
| TBD-TH-01 | Specific customer, country, security authority, threat environment, and risk tolerance | Stakeholder/authority decision | Ch. 1/2/4 |
| TBD-TH-02 | Protected data classes, compromise consequences, confidentiality lifetime, mission latency, and availability need | Mission/data-owner analysis | Ch. 2/4 |
| TBD-TH-03 | Final QKD protocol, link direction, source/detector architecture, device model, and finite-key proof | Literature and protocol/optical trade studies | Research; Ch. 6–8/10 |
| TBD-TH-04 | Initial trust-anchor, classical authentication, PQC/hybrid construction, credential lifecycle, and recovery | Cryptographic authority review | Ch. 9 |
| TBD-TH-05 | Cryptographic boundary and ownership of KMS, HSM, encryptor, and consumer interface | Architecture trade study | Ch. 5/9 |
| TBD-TH-06 | Platform command, secure boot/update, isolation, time, telemetry, and in-orbit recovery capabilities | Satellite/platform specialist review | Ch. 5/6 |
| TBD-TH-07 | Ground-station physical zone, personnel model, administrative access, and maintenance/calibration process | Site and operations review | Ch. 7/11 |
| TBD-TH-08 | AQMO authority, human gates, trusted data sources, confidence policy, and safe local fallback | CONOPS/control trade study | Ch. 3/5 |
| TBD-TH-09 | Trusted-relay/node model and whether any component outside the endpoints can access plaintext key material | Trust-architecture trade study | Ch. 5/9 |
| TBD-TH-10 | Quantitative threat likelihood, control effectiveness, residual-risk ratings, and acceptance authority | Architecture + testing + stakeholder threat assessment | Post-V0.1/Ch. 11 |
| TBD-TH-11 | Applicable certification, information-handling, laser-safety, space, export, and cryptographic approval regimes | Jurisdiction/legal/authority review | Ch. 11/12 |
| TBD-TH-12 | Independent optical/cyber security test scope, laboratory access, and qualified evaluators | Specialist and test-program planning | Ch. 12/Roadmap |

---

## References

**[R1]** Joint Task Force Transformation Initiative, *Guide for Conducting Risk Assessments*, NIST SP 800-30 Rev. 1, September 2012. DOI: <https://doi.org/10.6028/NIST.SP.800-30r1>.

**[R2]** National Institute of Standards and Technology, *The NIST Cybersecurity Framework (CSF) 2.0*, NIST CSWP 29, 26 February 2024. DOI: <https://doi.org/10.6028/NIST.CSWP.29>.

**[R3]** S. Lightman, T. Suloway, and J. Brule, *Satellite Ground Segment: Applying the Cybersecurity Framework to Satellite Command and Control*, NIST IR 8401, December 2022. DOI: <https://doi.org/10.6028/NIST.IR.8401>.

**[R4]** European Telecommunications Standards Institute, *ETSI GS QKD 016 V1.1.1 — Quantum Key Distribution (QKD); Common Criteria Protection Profile — Pair of Prepare and Measure Quantum Key Distribution Modules*, April 2023. Available: <https://www.etsi.org/deliver/etsi_gs/QKD/001_099/016/01.01.01_60/gs_QKD016v010101p.pdf>.

**[R5]** International Telecommunication Union, *ITU-T X.1710 — Security framework for quantum key distribution networks*, October 2020, in force. Available: <https://www.itu.int/rec/T-REC-X.1710/en>.

**[R6]** International Telecommunication Union, *ITU-T X.1717 — Security requirements and measures for quantum key distribution network — Control and management*, October 2024. Available: <https://www.itu.int/epublications/publication/itu-t-x-1717-2024-10-security-requirements-and-measures-for-quantum-key-distribution-network-control-and-management>.

**[R7]** F. Xu, X. Ma, Q. Zhang, H.-K. Lo, and J.-W. Pan, “Secure quantum key distribution with realistic devices,” *Reviews of Modern Physics*, vol. 92, 025002, 2020. DOI: <https://doi.org/10.1103/RevModPhys.92.025002>.

**[R8]** National Security Agency, “Quantum Key Distribution (QKD) and Quantum Cryptography (QC),” Cybersecurity Information. Available: <https://www.nsa.gov/Cybersecurity/Quantum-Key-Distribution-QKD-and-Quantum-Cryptography-QC/> (accessed 11 August 2026).

**[R9]** L. Lydersen *et al.*, “Hacking commercial quantum cryptography systems by tailored bright illumination,” *Nature Photonics*, vol. 4, pp. 686–689, 2010. DOI: <https://doi.org/10.1038/nphoton.2010.214>.

**[R10]** Y. Zhao, C.-H. F. Fung, B. Qi, C. Chen, and H.-K. Lo, “Quantum hacking: Experimental demonstration of time-shift attack against practical quantum-key-distribution systems,” *Physical Review A*, vol. 78, 042333, 2008. DOI: <https://doi.org/10.1103/PhysRevA.78.042333>.

**[R11]** N. Jain *et al.*, “Trojan-horse attacks threaten the security of practical quantum cryptography,” *New Journal of Physics*, vol. 16, 123030, 2014. DOI: <https://doi.org/10.1088/1367-2630/16/12/123030>.

**[R12]** H.-K. Lo, X. Ma, and K. Chen, “Decoy State Quantum Key Distribution,” *Physical Review Letters*, vol. 94, 230504, 2005. DOI: <https://doi.org/10.1103/PhysRevLett.94.230504>.

**[R13]** H.-K. Lo, M. Curty, and B. Qi, “Measurement-Device-Independent Quantum Key Distribution,” *Physical Review Letters*, vol. 108, 130503, 2012. DOI: <https://doi.org/10.1103/PhysRevLett.108.130503>.

**[R14]** National Institute of Standards and Technology, *Module-Lattice-Based Key-Encapsulation Mechanism Standard*, FIPS 203, 13 August 2024. DOI: <https://doi.org/10.6028/NIST.FIPS.203>.

**[R15]** National Institute of Standards and Technology, *Module-Lattice-Based Digital Signature Standard*, FIPS 204, 13 August 2024. DOI: <https://doi.org/10.6028/NIST.FIPS.204>.

**[R16]** National Institute of Standards and Technology, *Recommendation for Key Management: Part 1 — General*, NIST SP 800-57 Part 1 Rev. 5, May 2020. DOI: <https://doi.org/10.6028/NIST.SP.800-57pt1r5>.

**[R17]** M. Sönmez Turan *et al.*, *Recommendation for the Entropy Sources Used for Random Bit Generation*, NIST SP 800-90B, January 2018. DOI: <https://doi.org/10.6028/NIST.SP.800-90B>.

**[R18]** National Institute of Standards and Technology, *Cybersecurity Supply Chain Risk Management Practices for Systems and Organizations*, NIST SP 800-161 Rev. 1 Update 1, November 2024. DOI: <https://doi.org/10.6028/NIST.SP.800-161r1-upd1>.

**[R19]** M. Souppaya, K. Scarfone, and D. Dodson, *Secure Software Development Framework (SSDF) Version 1.1: Recommendations for Mitigating the Risk of Software Vulnerabilities*, NIST SP 800-218, February 2022. DOI: <https://doi.org/10.6028/NIST.SP.800-218>.

**[R20]** International Telecommunication Union, *ITU-T Y.3832 — Quantum key distribution networks — Framework for orchestration*, December 2025, in force. Available: <https://www.itu.int/rec/T-REC-Y.3832>.

---

## Review Gate CH2-G1

Chapter 2 may be baselined for V0.1 when the Q-Orbit team:

1. approves the hostile-boundary statement in §2.1.1;
2. approves the asset register, unacceptable outcomes, and security objectives;
3. accepts that V0.1 uses design priorities but does not claim quantitative likelihood or final risk;
4. approves AQMO’s no-key-access and no-security-override limits;
5. approves fail-closed behavior and the prohibition on silent fallback/downgrade;
6. keeps trusted relays outside the baseline pending an explicit trade study;
7. accepts the P1 threat set as architecture-driving input; and
8. carries every SEC-SEED into Chapter 4 for formalization, merge, deferment, or documented rejection.
