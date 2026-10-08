# Q-Orbit Engineering Design Handbook V0.1

## Chapter 1 — Mission & System Definition

| Document field | Value |
|---|---|
| Document ID | QO-EDH-CH01 |
| Version | Working Draft V0.1 |
| Baseline date | 11 August 2026 |
| Project phase | Preliminary research and engineering design |
| Submission milestone | 31 August 2026 |
| System of interest | Space Quantum Defense System (SQDS) |
| Project | Q-Orbit |
| Approval status | Not yet baselined by the Q-Orbit team |
| Information handling | TBD; this draft contains conceptual, non-operational design information only |

> **Document limitation.** This chapter defines a preliminary system concept. It is not a flight design, security certification, operational authorization, or claim that QKD alone can secure a military communications system.

### Evidence-status convention

Every substantive statement in this working draft is assigned one of the four Q-Orbit evidence statuses:

- **[V] Verified:** supported by a cited primary scientific or official source.
- **[ED] Engineering Decision:** a Q-Orbit design choice, provisional until formally baselined.
- **[A] Assumption:** a temporary input adopted to permit progress and subject to sensitivity analysis.
- **[TBD] To Be Determined:** requires research, trade study, simulation, specialist review, or stakeholder decision.

All **[ED]** items in V0.1 are reversible. A verified fact may support a design decision, but it does not make that decision uniquely correct.

---

## 1.1 Introduction

This chapter establishes the mission, problem, boundaries, stakeholders, operating context, and success criteria for Q-Orbit before detailed requirements or subsystem design are produced. **[ED]** It is the controlling foundation for Chapter 2 (Mission and Threat Analysis), Chapter 3 (CONOPS), Chapter 4 (System Requirements), and Chapter 5 (System Architecture).

The objective of the current phase is not to build or claim completion of a deployable SQDS. The objective is to produce an engineering concept supported by scientific evidence, traceable assumptions, preliminary architecture, and reproducible first-order simulation. **[ED]**

Satellite QKD is a technically credible subject for preliminary design: decoy-state satellite-to-ground QKD has been experimentally demonstrated over slant ranges up to approximately 1,200 km, and an integrated space-to-ground QKD network has also been demonstrated. **[V]** [R2, R3] These demonstrations establish feasibility under specific experimental conditions; they do not validate Q-Orbit’s future performance, security, or operational suitability. **[V]**

---

## 1.2 System Identity

### 1.2.1 Identification

| Attribute | Controlled working definition | Status |
|---|---|---|
| Project name | **Q-Orbit** | [ED] |
| System name | **Space Quantum Defense System (SQDS)** | [ED] |
| System type | **Hybrid Space-Based Quantum Defense System** | [ED] |
| Core orchestration function | **Adaptive Quantum Mission Orchestrator (AQMO)** | [ED] |
| Primary customer/capability owner | **Space Force**; specific national organization and acquisition authority remain TBD | [ED]/[TBD] |
| Primary protected asset | Sensitive military and intelligence data and communications | [ED] |
| Current maturity | Research-backed preliminary engineering concept; no TRL is assigned in V0.1 | [ED] |

### 1.2.2 Working system definition

Q-Orbit is a hybrid space-ground security concept that uses satellite-enabled quantum key distribution, authenticated classical communications, key management, and conventional cryptographic protection to support high-value communications. **[ED]** QKD is treated as a method for establishing and distributing cryptographic key material, not as the bearer of the protected mission data. **[V]/[ED]** [R4, R6]

The protected mission traffic remains on classical communication networks and is encrypted by an approved secure-communications mechanism external to, or integrated at the boundary of, SQDS. **[ED]** The quantum channel carries quantum states used in key establishment; the associated classical channel supports functions such as synchronization, sifting, parameter estimation, error correction, privacy amplification, and session control. **[V]** [R4, R6]

### 1.2.3 AQMO working definition

The **Adaptive Quantum Mission Orchestrator (AQMO)** is the Q-Orbit control and coordination function that plans, selects, sequences, monitors, and replans supported quantum-key missions across compatible space and ground resources. **[ED]** Its decisions may use mission priority, predicted pass geometry, optical-link conditions, weather, key inventory, resource availability, hardware state, and security posture. **[ED]**

AQMO is **hardware-aware**, not hardware-independent in the literal physical sense. It may select among prequalified configurations and processing locations only when the required source, detector, optical, processing, and secure-computing capabilities exist at those locations. **[ED]** It cannot arbitrarily move a photon-generation or measurement function to hardware that does not implement that function.

AQMO shall not require access to raw secret-key values to perform scheduling or orchestration. **[ED]** It may consume key metadata—such as inventory, age, policy label, availability, and quality state—through a controlled interface. The exact AQMO autonomy model, optimization method, decision authority, and interface set are **[TBD]**. Artificial intelligence or machine learning is not required for the V0.1 concept; deterministic rules or constrained optimization may satisfy the initial orchestration need. **[ED]**

### 1.2.4 Preliminary system boundary

| Boundary class | Elements |
|---|---|
| Inside the preliminary SQDS boundary | Space QKD function/payload; ground QKD terminal; quantum optical link; QKD protocol and key-distillation functions; AQMO; QKD key-management functions; monitoring, audit, and cybersecurity controls; controlled interfaces to classical communications and key consumers. **[ED]** |
| Interfacing external systems | Satellite platform/bus services; mission planning and command-and-control; orbit and weather data services; identity and authentication infrastructure; secure encryptors or applications; terrestrial transport networks; external security operations. **[ED]** |
| Boundary still unresolved | Whether the operational encryptor, hardware security module, and some ground-station control functions are part of SQDS or external trusted services. **[TBD]** |

---

## 1.3 Mission Definition

### 1.3.1 Recovered original mission wording

> “To develop a next-generation space-based quantum defense system that protects highly sensitive military communications against present and future cyber threats by integrating quantum technologies, adaptive intelligent mission management, and secure satellite architectures.”

This wording is retained for project traceability. **[ED]** However, “protects … against present and future cyber threats” is broader than the capability that QKD or the present concept can substantiate. **[V]** Practical QKD security depends on implementation, authentication, trusted boundaries, and conventional cybersecurity, and QKD can introduce denial-of-service exposure. [R4, R5]

### 1.3.2 Recommended controlled mission statement

> **To design and evaluate a hybrid space-ground quantum-secure key service that establishes, validates, manages, and delivers cryptographic key material for protecting high-value military and intelligence communications, while adaptively coordinating mission resources and integrating QKD with authenticated classical communications, post-quantum cryptography, and defense-in-depth security controls.** **[ED — proposed for approval]**

### 1.3.3 Mission objectives

- **MO-01 — Credible quantum link:** Define a physically credible satellite-to-ground quantum-link concept whose loss, detection, error, and finite-pass effects can be modeled. **[ED]**
- **MO-02 — Usable key service:** Transform valid QKD outputs into controlled key material that can be delivered to an authorized cryptographic consumer. **[ED]**
- **MO-03 — Adaptive coordination:** Use AQMO to schedule and replan supported QKD sessions within mission, environmental, hardware, and security constraints. **[ED]**
- **MO-04 — Hybrid security:** Combine QKD with post-quantum or otherwise approved authentication, conventional encryption, endpoint security, and cyber defense rather than treating QKD as a standalone security solution. **[ED]**
- **MO-05 — Quantified feasibility:** Estimate performance over a representative satellite pass through the chain **Orbit → Pass Geometry → Slant Range → Optical Loss → Detection → QBER → Secret-Key Yield**. **[ED]**
- **MO-06 — Verifiable design:** Maintain traceability from mission need to threats, requirements, architecture, simulations, risks, and verification methods. **[ED]**

---

## 1.4 Problem Definition

### 1.4.1 Mission need

Sensitive military and intelligence information may require confidentiality for many years. A cryptographically relevant quantum computer could threaten widely used public-key mechanisms, while encrypted information collected today may be retained for later decryption (“harvest now, decrypt later”). **[V]** [R1]

At the same time, space-enabled secure communications operate through exposed and intermittent links, distributed ground infrastructure, remotely operated spacecraft, and classical command, telemetry, and network systems. **[ED]** The Q-Orbit threat scope includes cyberattack, future quantum-computing attacks against vulnerable cryptography, eavesdropping, jamming, spoofing, implementation attacks, and compromise of trusted nodes or key-management components. **[ED]** Detailed attacker capabilities and exclusions are deferred to Chapter 2.

QKD can provide a mechanism for generating shared secret keys whose security analysis detects excess disturbance in the quantum channel. **[V]** However, real QKD systems depart from ideal models, require specialized physical equipment, depend on authenticated classical communication and trusted implementations, and remain exposed to side channels, denial of service, and endpoint compromise. **[V]** [R4, R5]

### 1.4.2 Engineering problem statement

> **How can Q-Orbit establish, validate, manage, and deliver useful quantum-derived key material across an intermittent space-ground link, while remaining physically feasible and operationally credible under optical loss, atmospheric effects, limited contact time, implementation imperfections, cyber threats, electronic attack, and constrained space/ground resources?** **[ED]**

### 1.4.3 Capability gap addressed by the concept

The engineering challenge is not merely to demonstrate photon exchange. It is to connect the complete mission chain from access prediction to secure-key consumption while explicitly managing trust, authentication, resource allocation, and degraded conditions. **[ED]**

The concept therefore addresses five linked gaps:

1. **Long-distance key establishment:** terrestrial fiber QKD is strongly range-limited by channel loss; a free-space satellite link is a candidate method for extending reach. **[V]** [R2, R3]
2. **Mission integration:** a quantum experiment does not by itself provide an operational key service to a secure application. **[ED]**
3. **Adaptive use of scarce opportunities:** satellite passes, weather-qualified access, key inventory, and compatible hardware must be coordinated. **[ED]**
4. **End-to-end trust:** practical security depends on devices, classical authentication, key management, endpoints, software, and operators—not only the quantum protocol. **[V]** [R4, R5]
5. **Evidence-backed feasibility:** system claims must be connected to sourced parameters, explicit assumptions, and reproducible calculations. **[ED]**

### 1.4.4 Threat-to-capability allocation

| Threat or failure class | Intended Q-Orbit contribution | Explicit limitation |
|---|---|---|
| Future quantum attack on vulnerable public-key cryptography | Hybrid QKD-derived keys and post-quantum cryptography; crypto-agile transition path. **[ED]** | QKD does not replace all public-key, signature, authentication, or software-security functions. **[V]** |
| Passive/active eavesdropping on the quantum channel | Estimate channel errors and bound information leakage; abort when the selected protocol’s security conditions are not met. **[V]/[ED]** | Security is conditional on the protocol proof, finite-key analysis, trusted components, and implementation controls. **[V]** |
| Cyberattack against spacecraft, ground, KMS, or mission systems | Defense-in-depth controls, segmentation, identity, secure update, monitoring, and protected cryptographic boundaries. **[ED]** | QKD does not secure compromised endpoints or remove software vulnerabilities. **[V]** |
| Jamming or optical denial | Detect degradation, abort unsafe sessions, replan to another qualified opportunity, and preserve key inventory. **[ED]** | QKD cannot prevent denial of service or guarantee link availability. **[V]** [R5] |
| Spoofing/man-in-the-middle | Authenticated classical channel, trusted identity, command/telemetry integrity, and session binding. **[ED]** | An unauthenticated QKD exchange is not an acceptable operational baseline. **[ED]** |
| Trusted-node, insider, or supply-chain compromise | Minimize trusted nodes; isolate raw keys; tamper evidence; audit; component assurance and provenance. **[ED]** | A trusted-relay architecture transfers security dependence to every trusted relay. **[V]** [R3, R5] |

---

## 1.5 Design Philosophy

The Q-Orbit design philosophy is mission-led, evidence-driven, and explicitly bounded. **[ED]** The following principles govern subsequent chapters.

### 1.5.1 Governing principles

1. **Mission before technology.** Quantum technology is included only where it contributes to a defined mission need and measurable security property. **[ED]**
2. **Hybrid defense-in-depth.** QKD is combined with post-quantum cryptography, conventional symmetric encryption, authenticated classical channels, endpoint security, key management, and operational controls. **[ED]**
3. **Keys, not mission data, over the quantum service.** SQDS establishes and supplies key material; the protected payload remains on an authorized classical secure-communications service. **[ED]**
4. **No unconditional-security marketing claim.** Security claims shall state the protocol, implementation assumptions, trust boundary, finite-key model, and validation evidence. **[ED]**
5. **Whole-system trust analysis.** Optical devices, random-number generation, detectors, processing, KMS, software, classical links, operators, and external services are included in the security model. **[ED]**
6. **Constrained and auditable adaptation.** AQMO selects only preapproved configurations, records the evidence behind decisions, and fails safely when constraints are violated. **[ED]**
7. **Crypto agility and interoperability.** Protocols, algorithms, and interfaces should be replaceable behind controlled boundaries; relevant ITU-T and ETSI QKD network and key-management work will inform the design. **[V]/[ED]** [R6, R7]
8. **Traceability by construction.** Every requirement, parameter, claim, figure, and result shall link to a source, engineering decision, assumption, or TBD record. **[ED]**
9. **Graceful degradation.** Loss of a quantum link shall not silently downgrade security. The system shall abort, preserve controlled key state, notify operations, and follow an authorized fallback policy. **[ED]**
10. **Incremental maturity.** The architecture shall support progression from simulation to laboratory link, ground demonstration, space demonstration, and operational evaluation without claiming those stages have already been achieved. **[ED]**

### 1.5.2 Preliminary AQMO decision model

| AQMO input class | Candidate inputs | Status |
|---|---|---|
| Mission | Priority, key demand, destination, time window, policy label | [ED]/[TBD] |
| Geometry | Predicted pass, range, elevation, angular rate, sun/moon constraints | [ED] |
| Environment | Cloud, visibility, turbulence proxy, background light | [ED]/[TBD] |
| Link state | Acquisition status, loss estimate, count rate, QBER, synchronization state | [ED] |
| Resource state | Payload/ground-terminal availability, power, thermal state, storage, detector state | [ED]/[TBD] |
| Security state | Authentication state, alerts, trust status, approved configuration, key inventory metadata | [ED] |

Candidate AQMO outputs are a session plan, selected space-ground pairing, approved protocol/configuration identifier, resource reservation, start/abort/replan command, and audit record. **[ED]** Direct control authority, human approval gates, timing, and safety interlocks are **[TBD]**.

---

## 1.6 System Scope

### 1.6.1 In-scope system functions for V0.1

- Predict or ingest a representative satellite pass and calculate time-varying slant range. **[ED]**
- Model the first-order quantum optical link and its major loss/error contributors. **[ED]**
- Define functional space and ground QKD endpoints without prematurely fixing payload implementation. **[ED]**
- Define acquisition, pointing, tracking, timing, synchronization, and classical-channel dependencies at functional level. **[ED]**
- Define QKD post-processing and the handoff of validated key material to key management. **[ED]**
- Define AQMO functions, inputs, outputs, constraints, and interfaces at preliminary level. **[ED]**
- Define authenticated classical communications and cybersecurity controls at preliminary level. **[ED]**
- Define key-management and secure-application interfaces, informed by current standards where applicable. **[ED]**
- Develop threat, requirement, risk, interface, and verification baselines. **[ED]**
- Simulate **Orbit → Pass → Distance → Optical Loss → Detection → QBER → Secret-Key Rate/Yield** with sourced or labeled inputs. **[ED]**

### 1.6.2 Current project deliverable scope

| Deliverable | V0.1 completion intent | Status |
|---|---|---|
| Preliminary Research Report | Source-backed scientific and engineering basis with bibliography | [ED] |
| Engineering Design Handbook V0.1 | Chapters 1–13 at preliminary depth with traceable decisions and TBDs | [ED] |
| Preliminary simulation package | Reproducible model, inputs, plots, limitations, and sensitivity cases | [ED] |
| Q-Orbit website | Evidence-led project presentation derived from the controlled report, handbook, and simulation | [ED] |

### 1.6.3 Explicitly out of scope for the 31 August 2026 submission

- Fabrication, procurement, launch, or flight qualification of satellite or ground hardware. **[ED]**
- A complete operational SQDS, global constellation, or continuous-coverage service. **[ED]**
- Security certification, mission authorization, cryptographic approval, or claim of Space Force adoption. **[ED]**
- A new QKD protocol or independent mathematical security proof. **[ED]**
- Guaranteeing protection from every present or future cyber threat. **[ED]**
- Guaranteeing availability in the presence of jamming, weather blockage, hardware failure, or denial of service. **[ED]**
- Full endpoint, enterprise-network, anti-jam waveform, or spacecraft-platform redesign. **[ED]**
- Quantum repeaters, operational quantum memories, device-independent QKD, inter-satellite entanglement networks, or quantum secure direct communication as baseline capabilities. These may be roadmap topics only. **[ED]**
- Unrestricted autonomous or AI-controlled mission authority. **[ED]**

### 1.6.4 Initial analysis case

The first simulation will model one candidate low-Earth-orbit satellite, one optical ground station, and one satellite pass. **[A]** This is an analysis case, not an operational architecture decision. Orbit, site, wavelength, link direction, source, detector, telescope, protocol, finite-key method, and key-demand parameters remain **[TBD]** until the relevant trade studies are completed.

---

## 1.7 Stakeholders

Stakeholder roles are defined by the information, authority, and acceptance evidence they contribute. Specific named organizations and individuals remain **[TBD]**.

| Stakeholder class | Primary interest or authority | Required contribution to V0.1 | Status |
|---|---|---|---|
| Space Force capability owner/sponsor | Mission value, operational need, acceptance priorities | Validate mission need, protected assets, deployment concept, and success measures | [ED]/[TBD] |
| Military/intelligence data owner | Confidentiality lifetime, mission impact, releasability | Define data classes, key demand, latency, retention, and compromise consequences | [ED]/[TBD] |
| Cryptographic/security authority | Algorithm approval, key policy, trust boundary, accreditation | Approve authentication, key lifecycle, fallback, crypto boundary, and evidence requirements | [TBD] |
| Mission operations and command-and-control | Scheduling, authority, safety, degraded operations | Define operator workflow, decision rights, alerts, and abort/replan procedures | [ED]/[TBD] |
| Satellite/platform engineering | Payload accommodation, pointing, power, thermal, radiation, interfaces | Supply platform constraints and validate space-segment feasibility | [TBD] |
| Quantum/optical payload engineering | Source/detector, optics, timing, protocol, calibration | Validate link architecture, hardware parameters, error model, and implementation risks | [TBD] |
| Optical ground-station operator | Site, telescope, weather, tracking, security, maintenance | Supply site/environment data and operational constraints | [TBD] |
| Key-management and secure-communications owner | Key ingestion, storage, delivery, consumption, audit | Define KMS/HSM/encryptor interfaces and key-use policy | [TBD] |
| Cyber defense and security operations | Monitoring, incident response, identity, software assurance | Define controls, telemetry, logging, update, and response requirements | [TBD] |
| Systems engineering and V&V | Traceability, interfaces, configuration, evidence | Maintain baselines and verification matrix | [ED] |
| Legal, regulatory, spectrum, safety, and supply-chain authorities | Compliance and deployment permissions | Identify applicable national/international constraints | [TBD] |
| Scientific reviewers and subject-matter experts | Scientific validity and claim discipline | Review QKD physics, finite-key analysis, optical model, and security assumptions | [TBD] |
| XTF evaluators and project audience | Clarity, credibility, innovation, evidence | Evaluate the 31 August 2026 submission; not an operational authority | [ED] |

---

## 1.8 Operational Environment

### 1.8.1 Environment definition

Q-Orbit is intended to operate across a coupled space, atmospheric, ground, network, cyber, and mission environment. **[ED]** Performance and security depend on the state of the complete chain, not on range alone.

| Domain | Relevant conditions | Design implication | Status |
|---|---|---|---|
| Space | Orbit and pass geometry; radiation; vacuum; thermal cycling; vibration; contamination; SWaP constraints; spacecraft attitude and jitter | Constrains payload architecture, availability, calibration, reliability, and pointing | [V]/[TBD] |
| Free-space optical path | Time-varying slant range; diffraction; pointing error; atmospheric transmission; turbulence; clouds/aerosols; background light; elevation angle | Drives link loss, detections, QBER, usable contact window, and secret-key yield | [V] |
| Ground station | Site latitude/longitude/altitude; weather; horizon mask; telescope and tracking; detector environment; physical security | Drives access, availability, trust, maintenance, and terminal performance | [ED]/[TBD] |
| Classical communications | RF or optical command, telemetry, synchronization, reconciliation, management, and key-service interfaces | Requires authentication, integrity, availability, timing, and cyber protection | [V]/[ED] |
| Cyber/electronic warfare | Intrusion, malware, spoofing, jamming, traffic manipulation, denial of service, insider and supply-chain threats | Requires defense-in-depth, trusted boundaries, audit, safe failure, and replan/fallback policy | [ED] |
| Mission operations | Priority conflicts, finite key inventory, time-critical demand, human authorization, maintenance, degraded modes | Drives AQMO policy, CONOPS, interfaces, and success measures | [ED]/[TBD] |
| Regulatory/organizational | Space, spectrum, laser safety, export, cryptographic, data-handling, and acquisition rules | May constrain architecture, sites, hardware, operations, and publication | [TBD] |

### 1.8.2 Preliminary operational sequence

The complete CONOPS is deferred to Chapter 3. The Chapter 1 reference sequence is:

1. Mission need and key demand are received or forecast. **[ED]**
2. AQMO evaluates candidate passes, compatible endpoints, environment, resources, security state, and policy. **[ED]**
3. Space and ground terminals acquire and stabilize the link. **[ED]**
4. Quantum states are exchanged while the authenticated classical channel supports protocol operations. **[V]/[ED]**
5. The endpoints estimate security parameters and either abort or produce secret key material through the selected finite-key process. **[V]/[ED]**
6. Authorized key-management functions ingest, label, store, and deliver keys to an approved consumer. **[ED]**
7. A conventional secure-communications function consumes the key material according to policy. **[ED]**
8. SQDS records auditable metadata, closes the session, updates inventory, and replans as required. **[ED]**

### 1.8.3 Environmental and architectural TBDs required for analysis

- Orbit altitude, inclination, eccentricity, local time, and ephemeris source. **[TBD]**
- Ground-station location, altitude, horizon mask, and weather/atmospheric dataset. **[TBD]**
- Uplink, downlink, or dual-link architecture. **[TBD]**
- QKD family and protocol variant; decoy-state prepare-and-measure is a candidate, not yet a baseline. **[TBD]**
- Optical wavelength, transmit/receive aperture, beam divergence, pointing error, and optical efficiency. **[TBD]**
- Source model, repetition rate, photon-number settings, detector technology, detection efficiency, dark count, dead time, and timing window. **[TBD]**
- Background-light and turbulence models and day/night operating policy. **[TBD]**
- Finite-key security parameters, error-correction efficiency, privacy-amplification model, and abort threshold. **[TBD]**
- Trusted-node model, authentication method, KMS/HSM boundary, and key-consumption policy. **[TBD]**
- AQMO authority, optimization objective, replan timing, and human-in/on-the-loop controls. **[TBD]**

---

## 1.9 Success Criteria

Success is divided into **submission success**, **technical-feasibility success**, and **future operational success**. **[ED]** This prevents a preliminary simulation from being presented as an operational capability.

### 1.9.1 V0.1 submission success — 31 August 2026

| ID | Criterion | Evidence/measure | Status |
|---|---|---|---|
| SC-D01 | Mission and boundary are unambiguous | Approved Chapter 1; in-scope/out-of-scope and system context are internally consistent | [ED] |
| SC-D02 | Claims are disciplined | Every material technical claim and numeric parameter is cited, derived, labeled [A], or labeled [TBD] | [ED] |
| SC-D03 | Architecture is complete at functional level | Space, optical/QKD, ground, classical communications, KMS, cybersecurity, and AQMO functions and interfaces are represented | [ED] |
| SC-D04 | Simulation is reproducible | Versioned inputs, equations/model references, code, plots, assumptions, and limitations reproduce the reported results | [ED] |
| SC-D05 | Physics chain closes | The model connects orbit/pass geometry to range, loss, detections, QBER, and finite-key secret output without dimensional or logical contradiction | [ED] |
| SC-D06 | Security claims are bounded | Threat model identifies what QKD contributes, what conventional controls contribute, and what remains unmitigated | [ED] |
| SC-D07 | Project outputs agree | Report, handbook, simulation, diagrams, and website use the same terminology, assumptions, parameters, and versioned results | [ED] |
| SC-D08 | Open issues are visible | Decision, assumption, risk, and TBD registers identify owner/evidence/closure path for every material unresolved issue | [ED] |

### 1.9.2 Technical-feasibility success for the preliminary design

| ID | Criterion | Preliminary measure | Status |
|---|---|---|---|
| SC-F01 | A usable optical opportunity exists | At least one modeled pass contains a qualified acquisition/communication interval under the stated environment and hardware assumptions | [ED] |
| SC-F02 | Secret key is physically plausible | The selected finite-key model produces a positive secret-key yield for at least one qualified analysis case | [ED] |
| SC-F03 | Error conditions are respected | QBER and other protocol parameters remain within the selected security proof’s acceptance conditions during the counted interval | [ED]/[TBD] |
| SC-F04 | Key reaches an authorized consumer | The architecture traces secret output through protected key management to a defined secure-application interface | [ED] |
| SC-F05 | Unsafe sessions fail closed | Authentication failure, excessive error, invalid configuration, tamper state, or loss of trust results in abort and no release of unapproved key material | [ED] |
| SC-F06 | AQMO decisions are feasible and auditable | Selected resources are compatible, constraints are satisfied, and decision inputs/outputs are recorded without exposing raw keys | [ED] |

A positive secret-key yield demonstrates only modeled technical feasibility. **[ED]** Operational usefulness requires secret bits per qualified pass, delivery latency, availability, and inventory to meet an approved mission key demand; those thresholds are **[TBD]**.

### 1.9.3 Future operational acceptance themes

- Required secret-key volume and rate delivered within mission time constraints. **[TBD]**
- Defined availability and probability of successful service over seasonal weather and orbital access. **[TBD]**
- Approved cryptographic algorithms, authentication, trust architecture, and key lifecycle. **[TBD]**
- Demonstrated resistance to implementation attacks and penetration testing within the claimed security boundary. **[TBD]**
- Verified safe behavior under jamming, spoofing, cyber incident, loss of quantum link, hardware fault, and operator error. **[TBD]**
- Flight, laser-safety, spectrum, cybersecurity, cryptographic, and mission certification as applicable. **[TBD]**
- End-to-end operational test with representative spacecraft, ground station, KMS/HSM, encryptor, operators, and mission network. **[TBD]**

---

## 1.10 System Vision

Q-Orbit’s long-term vision is to mature from a transparent preliminary design into an evidence-backed, interoperable, and mission-integrated space-ground quantum key service. **[ED]**

- Deliver quantum-derived key material to authorized high-value communications rather than treating QKD as an isolated experiment. **[ED]**
- Coordinate scarce satellite, ground, environmental, and key resources through the hardware-aware AQMO. **[ED]**
- Combine QKD, PQC, conventional cryptography, trusted key management, and cyber defense in a single defense-in-depth architecture. **[ED]**
- Scale from one-pass analysis to laboratory integration, ground demonstration, space demonstration, multi-station service, and eventual operational evaluation. **[ED]**
- Remain crypto-agile and vendor-aware through controlled, standards-informed interfaces. **[ED]**
- Make every performance and security claim traceable to evidence, assumptions, and verification. **[ED]**
- Treat adverse results as design inputs: if physics, security analysis, or simulation rejects an architecture, revise the architecture rather than the evidence. **[ED]**

---

## Chapter 1 Decision and Open-Issue Register

### Decisions proposed for baseline approval

| ID | Decision | Rationale | State |
|---|---|---|---|
| ED-01 | Use **Q-Orbit** as project name and **SQDS** as the system of interest | Preserves prior project identity | Proposed |
| ED-02 | Define SQDS as a hybrid space-ground **key service**, not a direct quantum mission-data channel | Aligns the architecture with QKD’s actual function | Proposed |
| ED-03 | Use a defense-in-depth hybrid of QKD, PQC/authentication, conventional encryption, KMS, and cyber controls | Avoids reliance on QKD for properties it does not provide alone | Proposed |
| ED-04 | Define AQMO as a hardware-aware, constrained, auditable orchestrator with no need to access raw keys | Preserves adaptability while limiting trust and unsafe autonomy | Proposed |
| ED-05 | Use one candidate LEO satellite, one ground station, and one pass as the first analysis case only | Creates a tractable simulation baseline without fixing the operational architecture | Proposed |
| ED-06 | Use the revised mission statement in §1.3.2 | Replaces an overbroad cyber-defense claim with a verifiable mission | Proposed |
| ED-07 | Maintain separate submission, feasibility, and operational success criteria | Prevents conceptual results from being represented as field capability | Proposed |

### High-priority open issues

| ID | Open issue | Closure route | Target chapter/workstream |
|---|---|---|---|
| TBD-01 | Specific customer organization, country, sponsor, and decision authority | Stakeholder confirmation | Ch. 1/2 |
| TBD-02 | Protected data classes, confidentiality lifetime, key demand, and mission latency | Mission/data-owner analysis | Ch. 2/4 |
| TBD-03 | Link direction and trust model: satellite transmitter/receiver, trusted relay, or alternate architecture | Architecture/security trade study | Ch. 5/8/9 |
| TBD-04 | Candidate QKD protocol and finite-key security model | Literature review and specialist review | Research/Ch. 8/10 |
| TBD-05 | Orbit and ground-station analysis cases | Coverage/access trade study | Ch. 6/7/10 |
| TBD-06 | Optical, source, detector, and atmospheric parameter set | Source-backed link-budget definition | Ch. 6–8/10 |
| TBD-07 | Classical authentication, PQC algorithms, KMS/HSM boundary, and key-use policy | Crypto-architecture trade study and authority review | Ch. 9 |
| TBD-08 | AQMO objective function, decision rights, safety constraints, and interfaces | CONOPS/control trade study | Ch. 3/5 |
| TBD-09 | Quantitative success thresholds for QBER, secret-key yield, latency, availability, and resilience | Protocol selection, mission need, and simulation | Ch. 4/10/12 |
| TBD-10 | Applicable security, space, spectrum, laser-safety, export, and information-handling rules | Jurisdiction and stakeholder review | Ch. 11/12 |

---

## References

**[R1]** National Institute of Standards and Technology (NIST), “What Is Post-Quantum Cryptography?”, including the cryptographically relevant quantum-computer uncertainty and harvest-now-decrypt-later risk. Available: <https://www.nist.gov/cybersecurity-and-privacy/what-post-quantum-cryptography> (accessed 11 August 2026).

**[R2]** S.-K. Liao *et al.*, “Satellite-to-ground quantum key distribution,” *Nature*, vol. 549, pp. 43–47, 2017. DOI: <https://doi.org/10.1038/nature23655>.

**[R3]** Y.-A. Chen *et al.*, “An integrated space-to-ground quantum communication network over 4,600 kilometres,” *Nature*, vol. 589, pp. 214–219, 2021. DOI: <https://doi.org/10.1038/s41586-020-03093-8>.

**[R4]** F. Xu, X. Ma, Q. Zhang, H.-K. Lo, and J.-W. Pan, “Secure quantum key distribution with realistic devices,” *Reviews of Modern Physics*, vol. 92, 025002, 2020. DOI: <https://doi.org/10.1103/RevModPhys.92.025002>.

**[R5]** National Security Agency (NSA), “Quantum Key Distribution (QKD) and Quantum Cryptography (QC),” Cybersecurity Information. Available: <https://www.nsa.gov/Cybersecurity/Quantum-Key-Distribution-QKD-and-Quantum-Cryptography-QC/> (accessed 11 August 2026).

**[R6]** International Telecommunication Union, “ITU-T Y.3800: Overview on networks supporting quantum key distribution,” 2019, in force. Available: <https://www.itu.int/itu-t/recommendations/rec.aspx?rec=13990>.

**[R7]** European Telecommunications Standards Institute, “Quantum Key Distribution (QKD),” standards programme covering implementation security, authentication, key delivery, interoperable KMS interfaces, network architectures, and SDN. Available: <https://www.etsi.org/technical-groups/qkd/> (accessed 11 August 2026).

---

## Review Gate CH1-G1

Chapter 1 may be baselined for V0.1 when the Q-Orbit team:

1. approves or revises the controlled mission statement in §1.3.2;
2. approves the system boundary and explicit exclusions;
3. confirms the Space Force customer wording without adding an unsupported national organization;
4. approves the AQMO definition and its hardware-aware/no-raw-key limits;
5. accepts the initial one-satellite/one-station/one-pass analysis case; and
6. assigns owners or closure routes to the high-priority TBDs.
