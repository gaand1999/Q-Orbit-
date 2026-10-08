# Q-Orbit Engineering Design Handbook V0.1

## Chapter 3 — Concept of Operations (CONOPS)

| Document field | Value |
|---|---|
| Document ID | QO-EDH-CH03 |
| Version | Working Draft V0.1 |
| Baseline date | 11 August 2026 |
| Project phase | Preliminary research and engineering design |
| Submission milestone | 31 August 2026 |
| System of interest | Space Quantum Defense System (SQDS) |
| Project | Q-Orbit |
| Parent baselines | Chapter 1 — Mission & System Definition; Chapter 2 — Mission & Threat Analysis, both Working Draft V0.1 |
| Approval status | Not yet baselined by the Q-Orbit team |
| Information handling | TBD; this draft contains conceptual, non-operational workflow information only |

> **Document limitation.** This chapter defines a preliminary operational concept for engineering analysis. It is not an approved military CONOPS, flight-operations procedure, cryptographic operating instruction, safety procedure, security authorization, or claim that Q-Orbit is deployed or operationally accepted.

### Evidence-status convention

- **[V] Verified:** supported by a cited primary scientific or official source.
- **[ED] Engineering Decision:** a reversible Q-Orbit design choice proposed for V0.1.
- **[A] Assumption:** a temporary input adopted to permit progress and subject to review.
- **[TBD] To Be Determined:** requires research, trade study, simulation, specialist review, or stakeholder decision.

All event times, performance thresholds, resource quantities, approval authorities, and interface protocols that are not explicitly sourced remain **[TBD]**.

---

## 3.1 Purpose and Relationship to the Baseline

Chapter 1 defines SQDS as a hybrid space-ground key service. Chapter 2 defines the protected assets, trust boundaries, design-driving threats, fail-closed rule, and prohibition on silent security downgrade. This chapter turns those definitions into an end-to-end operational behavior that can drive requirements, architecture, simulation, and verification. **[ED]**

The CONOPS answers seven questions:

1. Who requests, authorizes, plans, executes, accepts, delivers, consumes, and audits a key service?
2. Which information is required at each decision point?
3. Which system state exists before, during, and after a satellite pass?
4. Which conditions permit transition to the next state?
5. Which failures cause hold, abort, replan, degraded service, or incident response?
6. Which decisions may AQMO make, and which decisions remain with endpoints, policy authorities, or operators?
7. What evidence is produced so the mission can be reconstructed without exposing secret key material? **[ED]**

### 3.1.1 Controlled CONOPS baseline statement

> **An SQDS key-service mission is complete only when an authorized request has been satisfied by compatible and trusted resources; the QKD session has passed every authentication, device-health, protocol, finite-key, and policy gate; accepted key material has been correctly bound and transferred through the protected key-management boundary to the intended authorized consumer endpoints; and non-secret audit evidence has been recorded. Any unresolved security-critical condition results in hold, abort, quarantine, degraded/no-service, or incident response—not approved key release.** **[ED — proposed for approval]**

Photon exchange, matching detections, a low observed QBER, or positive simulated secret-key yield is not by itself an end-to-end mission success. **[V]/[ED]** A complete QKD service also depends on classical communication, key distillation, endpoint trust, key management, consumer binding, implementation assumptions, and secure control and management. [R1–R5, R7]

---

## 3.2 Operational Scope and Reference Case

### 3.2.1 Initial V0.1 reference case

The first CONOPS and simulation case uses:

- one candidate low-Earth-orbit satellite carrying a functional space QKD endpoint;
- one optical ground station carrying the compatible ground QKD endpoint;
- one predicted satellite pass;
- one authenticated classical protocol path;
- one AQMO service instance or logically equivalent orchestration function;
- one logical key-management service, potentially implemented by paired protected KMS/HSM functions at the QKD endpoints; and
- one authorized consumer pair or representative paired secure-application interface. **[A]**

This is an analysis case, not a final operational architecture. Orbit, site, link direction, protocol, devices, authentication mechanism, key demand, timing, and threshold values remain **[TBD]**.

### 3.2.2 Service concept

The reference service is **demand-informed key-inventory replenishment**. **[ED]** A mission request or forecast creates a need for key material. AQMO uses that need and the authorized inventory policy to plan a qualified satellite opportunity. Accepted QKD output is placed under KMS/HSM control and may then be reserved and delivered to the authorized consumer endpoints according to policy.

This concept accommodates two future operating patterns without selecting either as the final baseline:

| Pattern | Description | V0.1 treatment | Status |
|---|---|---|---|
| **Inventory replenishment** | Generate accepted key material during available passes before an application requests immediate use | Primary reference pattern because space-ground access is intermittent | [ED] |
| **Demand-triggered service** | Plan or allocate key material in response to a specific consumer request and need-by time | Represented in the request and priority logic; feasibility depends on access and inventory | [ED]/[TBD] |

The KMS, not AQMO, owns individual key allocation and secret key values. AQMO receives only the minimum inventory metadata required for planning. **[ED]**

### 3.2.3 Operational boundary

| Inside this CONOPS | Interfacing but outside detailed control | Explicitly not implied |
|---|---|---|
| Request validation; AQMO planning; resource reservation; pass readiness; optical acquisition; QKD execution and validation; protected key handoff; inventory update; delivery status; audit; abort/replan/incident behavior | Spacecraft bus and mission control; weather/orbit/time providers; identity infrastructure; physical site operations; approved encryptor/application; enterprise or mission transport | Approval by a named Space Force; live operational tasking; classified mission data; certified crypto; guaranteed link availability; direct transfer of mission data over the quantum channel; unrestricted autonomous control **[ED]** |

### 3.2.4 Trust and consumer-topology claim boundary

The one-satellite/one-ground-station case closes one direct QKD-link analysis and a representative handoff to key management. It does **not** by itself establish end-to-end key delivery between arbitrary remote military consumers. **[ED]** The actual protected communication may terminate at the QKD nodes, at co-located applications, or across an additional approved trust and key-distribution architecture; that mapping remains **[TBD]**.

No trusted relay is assumed in the V0.1 baseline. If a future architecture allows a satellite, ground node, or other intermediary to access plaintext key material for onward relay, the mission benefit, trust boundary, insider/physical exposure, compromise response, and consumer claim must be explicitly approved through the Chapter 5/9 trust-architecture trade study. **[ED]**

---

## 3.3 Operational Actors, Responsibilities, and Authority

Specific organizations, ranks, job titles, and staffing models remain **[TBD]**. V0.1 defines functional actors so authority is not silently assigned to software or hardware.

### 3.3.1 Actor register

| ID | Functional actor | Primary responsibilities | May access secret key values? | Status |
|---|---|---|---|---|
| ACT-01 | **Mission/data owner** | Defines protected communication need, consequence, confidentiality lifetime, latency, priority, and acceptable service outcome | No, unless separately authorized as a cryptographic consumer | [ED]/[TBD] |
| ACT-02 | **Key-service requester** | Submits a structured request on behalf of an approved mission or application | No | [ED] |
| ACT-03 | **Mission authority / operations lead** | Approves priorities, conflict resolution, exceptional actions, and operational policy within assigned authority | No | [ED]/[TBD] |
| ACT-04 | **AQMO** | Validates decision inputs, filters infeasible options, proposes/selects qualified opportunities, reserves resources, monitors state, and replans | **No** | [ED] |
| ACT-05 | **External data providers** | Supply orbit, time, environment, site, resource, and alert data with provenance and freshness metadata | No | [ED]/[TBD] |
| ACT-06 | **Spacecraft/platform operations** | Provide platform state, payload accommodation, command/telemetry, attitude, power, thermal, timing, and safe-mode coordination | No routine access | [ED]/[TBD] |
| ACT-07 | **Space QKD endpoint** | Implements its assigned quantum optical, protocol, health, and security functions within a protected boundary | Yes, only to the extent required inside its cryptographic/QKD boundary | [ED]/[TBD] |
| ACT-08 | **Ground QKD endpoint / optical ground station** | Acquires and tracks the spacecraft, implements the compatible QKD functions, and enforces local safety/security gates | Yes, only inside its protected boundary | [ED]/[TBD] |
| ACT-09 | **Identity and classical-channel service** | Provides or supports peer identity, authenticated protocol communication, freshness, anti-replay, and trust recovery | Authentication material only as authorized; no QKD final-key access by default | [ED]/[TBD] |
| ACT-10 | **KMS/HSM service** | Through one or paired logical endpoint functions, accepts approved final key, binds metadata, maintains synchronized/accounted inventory, reserves, delivers, revokes, and destroys key material | Yes, inside the approved cryptographic boundary | [V]/[ED]/[TBD] |
| ACT-11 | **Authorized consumer endpoints / encryptor pair** | Each endpoint requests or receives the corresponding key/key handle and uses it only for the approved peer, purpose, policy, and lifecycle | Yes, only as permitted by the delivery architecture | [ED]/[TBD] |
| ACT-12 | **Security operations / incident authority** | Monitors alerts, contains suspected compromise, revokes trust, preserves evidence, and authorizes return to service | No routine key access | [ED]/[TBD] |
| ACT-13 | **Maintenance and calibration authority** | Performs controlled maintenance, characterization, calibration, configuration, and return-to-service evidence | No routine key access | [ED]/[TBD] |
| ACT-14 | **Independent V&V / security evaluator** | Reviews evidence and tests nominal, fault, cyber, and optical security behavior without operating the mission | No operational key access | [ED]/[TBD] |

### 3.3.2 Authority separation

| Action | Primary authority | AQMO role | Mandatory independent gate | Status |
|---|---|---|---|---|
| Define mission need and priority | Mission/data owner and mission authority | Consume approved priority as input | Requester identity and authorization | [ED]/[TBD] |
| Select among already approved opportunities | AQMO within policy | Filter, rank, reserve, replan | Hard constraints and local resource acceptance | [ED] |
| Change cryptographic/security policy | Cryptographic/security authority | None; ingest only an authenticated approved baseline | Human/authority approval and configuration control | [ED]/[TBD] |
| Approve QKD protocol output | QKD endpoint security functions | Observe status only | Protocol, finite-key, authentication, device-health, and configuration gates | [V]/[ED] |
| Release key from QKD boundary | QKD endpoint/KMS trusted path | None | Accepted state and protected handoff | [ED]/[TBD] |
| Allocate corresponding key material to the consumer endpoints | KMS/HSM service under policy | May provide demand/inventory metadata only | Both consumer identities, authorization, and peer/purpose binding | [ED] |
| Abort unsafe session | Each affected endpoint and authorized operations; AQMO may also command stop/hold | May issue abort/hold/replan | No actor may override a local security abort | [ED] |
| Authorize exceptional fallback | Designated mission and cryptographic authorities | Display/record decision; never infer approval | Explicit preapproved policy and visible labeling | [ED]/[TBD] |
| Return a compromised resource to service | Security/maintenance authority | Update availability only after authenticated approval | Known-good restoration and trust re-establishment evidence | [ED]/[TBD] |

AQMO is not a cryptographic approval authority, safety authority, incident-closure authority, or source of trust. **[ED]**

---

## 3.4 Operational Modes

Operational modes describe the posture of SQDS; mission phases in §3.6 describe progress through one service attempt.

| ID | Mode | Purpose and permitted behavior | Key-release posture | Status |
|---|---|---|---|---|
| OM-00 | **Off / safe / maintenance** | Equipment is powered down, safed, under maintenance, or unavailable; only authorized maintenance actions are permitted | No generation or release | [ED] |
| OM-01 | **Standby and monitor** | Maintain approved baseline, ingest status, monitor inventory, accept requests, and forecast opportunities | Existing valid inventory may be delivered only if KMS policy permits; no new pass execution | [ED]/[TBD] |
| OM-02 | **Planning and reservation** | Validate request and data, select a candidate, reserve resources, and create a signed/controlled session plan | Existing valid inventory only; planned output does not yet exist | [ED] |
| OM-03 | **Pass execution** | Perform final readiness, acquisition, tracking, authenticated QKD exchange, and live monitoring | No new key release until all acceptance gates pass | [ED] |
| OM-04 | **Post-processing and handoff** | Complete distillation/validation, transfer accepted output to KMS/HSM, bind metadata, and update inventory | Release only through approved handoff after complete acceptance | [ED]/[TBD] |
| OM-05 | **Declared degraded / no-service** | Preserve trusted state, restrict operations, prioritize valid inventory, and await or plan an approved recovery opportunity | No silent downgrade; delivery depends on existing inventory and explicit policy | [ED]/[TBD] |
| OM-06 | **Security incident containment and recovery** | Stop affected key release, isolate resources, revoke trust, scope impact, preserve evidence, restore known-good state | No new release from affected trust domain | [ED]/[TBD] |

The mode must be visible to operators and consuming interfaces; “nominal” shall not be reported when the system is actually degraded, held, or operating under an exceptional policy. **[ED]**

---

## 3.5 Mission Inputs and Data Contracts

### 3.5.1 Key-service request

The request contains control and metadata only; it never contains mission plaintext or secret key values. **[ED]**

| Field | Purpose | Validation rule | Status |
|---|---|---|---|
| Request identifier | Unique trace and anti-replay reference | Authenticated, unique, fresh, non-reused | [ED] |
| Requester identity and role | Establish who is asking and under which authority | Verify identity, authorization, and current credential state | [ED]/[TBD] |
| Endpoint pair / consumer-endpoint identifiers | Bind the intended communicating parties and their authorized local consumers | All required identities must exist, be authorized, and be compatible | [ED] |
| Mission/purpose and policy label | Prevent cross-purpose or cross-domain use | Must map to an approved policy without exposing unnecessary mission detail | [ED]/[TBD] |
| Required key quantity/rate | Drive inventory and capacity planning | Units and interpretation defined by future key-use policy | [TBD] |
| Need-by time / validity window | Drive urgency and feasible opportunity selection | Must be unambiguous and consistent with trusted time | [ED]/[TBD] |
| Priority | Resolve competition for scarce opportunities and inventory | Must be issued by an authorized policy source, not self-asserted | [ED]/[TBD] |
| Maximum key age / lifetime | Bound acceptable inventory and use | Defined by cryptographic and mission authority | [TBD] |
| Permitted configurations | Constrain protocol, endpoints, trust path, and handling | Reference approved configuration identifiers only | [ED]/[TBD] |
| Fallback permission | Declare whether any separately approved non-QKD service may be considered | Default is no inferred fallback; explicit authority required | [ED]/[TBD] |
| Audit correlation identifier | Link request, plan, session, handoff, and outcome | Must not reveal secret key material | [ED] |

An incomplete, ambiguous, stale, duplicate, or unauthorized request is rejected or held before resource commitment. **[ED]**

### 3.5.2 AQMO decision-input contract

Every security- or mission-relevant AQMO input requires source identity, integrity protection, timestamp or sequence, validity interval, provenance, and confidence/quality state. **[ED]** ITU-T X.1717 treats QKD control and management information—including topology, key inventory, QBER/status, policies, identities, and logs—as security-relevant assets and requires authentication/authorization before trust. **[V]** [R5]

| Input class | Minimum conceptual content | Owner | Failure behavior | Status |
|---|---|---|---|---|
| Mission demand | Authorized request, priority, need-by time, endpoint/policy binding | Mission/request authority | Reject or hold invalid request | [ED]/[TBD] |
| Geometry | Ephemeris, predicted access, range/elevation history, angular-rate constraints | Orbit/mission service | Hold or reject stale/implausible data | [ED]/[TBD] |
| Environment | Weather, cloud/visibility state, background-light/turbulence proxy, site constraints | Environment/site service | Re-evaluate, hold, or enter no-service | [ED]/[TBD] |
| Resource state | Endpoint compatibility, availability, maintenance, power/thermal, storage/compute, detector and terminal state | Space/ground/platform services | Remove unqualified resource | [ED]/[TBD] |
| Security state | Authentication/trust status, approved configuration, alerts, incident state, policy version | Identity/security/configuration authorities | Hard reject on unresolved security state | [ED] |
| Key inventory metadata | Available/reserved/expiring quantity by authorized endpoint/policy class; demand forecast | KMS/HSM | Treat missing/inconsistent state as unavailable | [ED]/[TBD] |

The exact schemas, sampling rates, accuracy, latency, confidence policy, and source-redundancy requirements remain **[TBD]**.

### 3.5.3 Operational outputs

AQMO may produce a candidate plan, selected resource pair, approved configuration identifier, reservation, start/hold/abort/replan instruction, predicted service result, and non-secret decision record. **[ED]** The QKD endpoints produce protocol/security status and either no key or accepted final key within their controlled boundary. The KMS produces inventory, reservation, delivery, revocation, and lifecycle status. **[ED]**

No status word such as “success” may substitute for the explicit state and gate evidence needed to establish what succeeded. **[ED]**

---

## 3.6 Operational Time Horizons and Mission Phases

Numerical lead times and deadlines are intentionally not assigned in V0.1. Each phase is triggered by validated events and bounded by the selected orbit, equipment, protocol, and mission demand. **[ED]/[TBD]**

| Phase | Name | Starts when | Primary activities | Exit condition | Status |
|---|---|---|---|---|---|
| PH-00 | **Demand and inventory assessment** | A request/forecast arrives or inventory crosses a policy threshold | Validate need, inspect authorized inventory metadata, decide whether generation is required | Authorized demand exists or no action is recorded | [ED] |
| PH-01 | **Opportunity planning** | Generation need is accepted | Evaluate passes, environment, compatibility, security, and capacity; rank only feasible candidates | Candidate selected and resources tentatively reserved | [ED] |
| PH-02 | **Pre-pass commitment** | Candidate enters its commitment horizon | Refresh all critical data; confirm configuration, trust, readiness, safety, and operator gates; issue controlled session plan | Both endpoints and operations acknowledge readiness | [ED]/[TBD] |
| PH-03 | **Acquisition and synchronization** | Contact opportunity opens and start is authorized | Point, acquire, track, establish timing/synchronization, verify peer/session/classical path | Qualified stable link and authenticated session established | [ED]/[TBD] |
| PH-04 | **Quantum exchange** | Acquisition and security gates pass | Exchange quantum states; collect detections and device/link telemetry; continuously enforce operating envelope | Planned quantum interval ends or an abort condition occurs | [V]/[ED] |
| PH-05 | **Distillation and acceptance** | Sufficient authenticated protocol data exists | Sift, estimate parameters, reconcile, account for leakage, amplify privacy, apply finite-key and device-health acceptance | Final key accepted or session rejected | [V]/[ED]/[TBD] |
| PH-06 | **Protected key handoff** | Final key is accepted within QKD boundary | Establish protected transfer, validate binding, commit to KMS/HSM, acknowledge consistent state | KMS records accepted inventory or handoff fails safely | [ED]/[TBD] |
| PH-07 | **Allocation and use** | Authorized consumer demand exists and valid inventory is available | Authenticate both consumer endpoints, reserve/allocate corresponding key material, deliver keys or handles, confirm lifecycle transition | Both-sided delivery/use status is recorded | [ED]/[TBD] |
| PH-08 | **Closeout and replan** | Pass/session/delivery attempt ends | Destroy failed/intermediate material, reconcile inventory, record outcome, analyze anomalies, release resources, replan | Trusted post-session state established | [ED] |

Quantum exchange and classical post-processing may overlap or occur partly after the optical contact depending on protocol and implementation. **[V]/[TBD]** The V0.1 model shall not assume a timing relationship until the protocol and processing architecture are selected.

---

## 3.7 Nominal End-to-End Scenario

### 3.7.1 Mission sequence

1. **Demand creation.** An authorized requester submits a structured need for key material, or KMS inventory policy generates an authenticated replenishment signal. **[ED]**
2. **Request validation.** Identity, authority, endpoint pair, purpose, policy, freshness, priority, and request consistency are checked. An invalid request is rejected before planning. **[ED]**
3. **Inventory check.** KMS reports minimum necessary metadata. If already-valid inventory can satisfy the request, KMS may reserve it without waiting for a new pass. AQMO never receives the key values. **[ED]/[TBD]**
4. **Candidate generation.** If new generation is required, AQMO ingests validated geometry, environment, resource, hardware, security, and inventory inputs. **[ED]**
5. **Hard-constraint filtering.** AQMO removes any candidate with incompatible hardware, invalid trust, prohibited configuration, unavailable resource, unsafe state, or no predicted qualified opportunity. **[ED]**
6. **Candidate selection.** AQMO ranks the remaining candidates under approved mission objectives and proposes or selects a session according to its delegated authority. **[ED]/[TBD]**
7. **Reservation and plan issue.** Space, ground, classical-channel, KMS, and operations resources are reserved. A controlled session plan binds the request, endpoints, pass, configuration, time validity, and abort rules. **[ED]**
8. **Pre-pass revalidation.** Before commitment, each critical input is refreshed. Operators and endpoints confirm readiness, configuration integrity, calibration/health state, safety state, trust, and resource availability. **[ED]/[TBD]**
9. **Local acceptance.** Space and ground endpoints independently accept the plan. Neither AQMO nor an operator may waive a failed endpoint security gate. **[ED]**
10. **Optical acquisition.** The terminal pair points, acquires, tracks, and establishes the required synchronization within approved physical and safety limits. **[ED]/[TBD]**
11. **Classical peer/session authentication.** The peers authenticate the classical protocol path, bind it to the current endpoints and session, and verify freshness before accepted QKD processing. **[V]/[ED]**
12. **Quantum exchange.** The selected transmit/receive functions exchange quantum states while the endpoints collect detections, timing, optical, environmental, and device-health evidence. **[V]/[ED]**
13. **Continuous gates.** Out-of-envelope optical power, suspicious counts, excessive error, device-health failure, loss of authentication, configuration drift, or invalid timing causes a controlled abort. **[ED]/[TBD]**
14. **Distillation.** Authenticated classical processing performs the selected sifting, parameter estimation, error correction, verification, leakage accounting, privacy amplification, and finite-key calculation. **[V]/[TBD]**
15. **Acceptance decision.** Each endpoint produces a security result. Final key exists as approved output only if every required gate passes; otherwise the session yields no approved key. **[V]/[ED]**
16. **Binding creation.** Accepted output is associated with a unique non-secret identifier and the authorized endpoint pair, request, consumer endpoints/purpose, policy, configuration, validity, and lifecycle state. **[ED]/[TBD]**
17. **Protected handoff.** The endpoints transfer accepted output through the defined trusted path to the KMS/HSM. Ambiguous, partial, or mismatched handoff state is quarantined or destroyed according to approved policy and is not available for use. **[ED]/[TBD]**
18. **Inventory commit.** KMS records synchronized, accepted inventory and returns only authorized status/aggregate metadata to AQMO. **[ED]**
19. **Consumer delivery.** When the authorized consumer endpoints request the key, the KMS service verifies both identities, peer/purpose binding, policy, freshness, lifecycle, matching key identity, and availability before providing corresponding key material or protected handles. **[ED]/[TBD]**
20. **Classical protection.** The consumer endpoints use the corresponding key material in an approved classical cryptographic function to protect mission data. Mission plaintext does not traverse the QKD link. **[ED]**
21. **Closeout.** Intermediate and rejected material is destroyed according to policy; reservations are released; inventory and mission status are reconciled; non-secret logs and anomaly records are completed. **[ED]/[TBD]**
22. **Replan.** AQMO updates forecasts and proposes the next qualified replenishment opportunity if demand remains unmet or inventory policy requires it. **[ED]**

### 3.7.2 Nominal interaction view

~~~mermaid
sequenceDiagram
    participant Mission as "Mission / requester"
    participant AQMO
    participant Pair as "Space + ground"
    participant KMS as "QKD boundary + KMS"
    participant Consumer as "Consumer pair"
    Mission->>AQMO: Authorized key-service request
    AQMO->>Pair: Qualified plan and reservation
    Pair->>Pair: Acquire, authenticate, exchange
    alt Every acceptance gate passes
        Pair->>KMS: Accepted key + binding
        KMS->>Consumer: Corresponding keys or handles
        KMS-->>AQMO: Inventory/status metadata only
        Consumer-->>Mission: Protected-service status
    else Gate fails or state is uncertain
        Pair-->>AQMO: Abort reason and safe state
        AQMO-->>Mission: Degraded/no-service status
    end
~~~

The diagram is functional. It does not select physical placement, API, trusted path, protocol, or timing. **[ED]/[TBD]**

---

## 3.8 Operational State Model

### 3.8.1 State-transition view

~~~mermaid
stateDiagram-v2
    [*] --> Standby
    Standby --> RequestValidated: Authorized demand
    RequestValidated --> Planned: Feasible candidate
    Planned --> Ready: All readiness gates
    Ready --> Acquiring: Contact opens
    Acquiring --> QKDActive: Link + authentication valid
    QKDActive --> Validating: Exchange complete
    Validating --> KeyCommitted: All gates pass
    KeyCommitted --> Closing: KMS acknowledges
    Closing --> Standby: Reconciled
    RequestValidated --> Hold: No feasible candidate
    Planned --> Abort: Readiness failure
    Acquiring --> Abort: Acquisition/auth failure
    QKDActive --> Abort: Security/performance gate
    Validating --> Abort: No approved key
    KeyCommitted --> Quarantine: Handoff ambiguity
    Abort --> Closing
    Hold --> Planned: Inputs/opportunity restored
    Quarantine --> Incident: Compromise suspected
    Incident --> Standby: Authorized recovery
~~~

### 3.8.2 State register

| ID | State | Entry condition | Permitted actions | Required exit evidence | Status |
|---|---|---|---|---|---|
| OS-00 | **Standby** | Approved baseline active; no executing session | Accept requests, monitor resources/inventory, forecast opportunities | Valid request or authorized maintenance/incident action | [ED] |
| OS-01 | **Request validated** | Request identity, authority, binding, freshness, and policy pass | Inspect inventory; determine whether generation is required | Inventory allocation or feasible-planning decision | [ED] |
| OS-02 | **Hold** | Required information/opportunity is absent or uncertain without demonstrated compromise | Preserve request and safe state; await trusted data or opportunity | Input restored, request cancelled/expired, or incident declared | [ED]/[TBD] |
| OS-03 | **Planned/reserved** | A feasible candidate and approved configuration exist | Reserve resources; issue controlled plan; refresh inputs | Independent readiness acknowledgments | [ED] |
| OS-04 | **Ready/committed** | All pre-pass readiness, security, configuration, and operator gates pass | Await authorized contact start; prohibit unplanned configuration change | Contact/start trigger remains valid | [ED]/[TBD] |
| OS-05 | **Acquiring** | Contact opportunity opens under the valid plan | Point, acquire, track, synchronize, authenticate session | Stable qualified link and valid authentication | [ED]/[TBD] |
| OS-06 | **QKD active** | Physical and security gates pass | Quantum exchange, monitoring, authenticated protocol processing | Planned stop, adequate evidence, or abort trigger | [V]/[ED]/[TBD] |
| OS-07 | **Validating** | Exchange data ready for security analysis | Complete distillation, finite-key and health/policy evaluation | Explicit accept or reject result at both endpoints | [V]/[ED]/[TBD] |
| OS-08 | **Key pending commit** | Protocol output accepted inside endpoint boundary | Bind metadata and execute protected handoff | Consistent KMS/HSM acknowledgment | [ED]/[TBD] |
| OS-09 | **Key available/reserved/delivered** | The logical KMS service accepts synchronized key and lifecycle metadata at the required endpoint functions | Account, reserve, deliver, revoke, or destroy under policy | Both-sided consumer outcome or lifecycle transition recorded | [ED]/[TBD] |
| OS-10 | **Abort/closeout** | Any hard gate fails without confirmed compromise | Stop exchange/export, destroy affected intermediate material, record cause, release resources | Safe trusted state and disposition complete | [ED] |
| OS-11 | **Quarantine** | Key or handoff state is ambiguous, inconsistent, or awaiting investigation | Prevent allocation/use; preserve minimum evidence; reconcile or destroy | Authorized disposition | [ED]/[TBD] |
| OS-12 | **Incident** | Compromise is suspected/confirmed or trust cannot be established | Contain, isolate, revoke, scope, recover, and preserve evidence | Security authority approves known-good return to service | [ED]/[TBD] |

State names do not imply implementation. Chapter 5 will allocate each state and transition to components and interfaces. **[ED]**

---

## 3.9 Failure, Abort, and Recovery Branches

The primary safety rule is: **availability pressure shall not convert uncertainty into accepted key material.** **[ED]**

| ID | Trigger | Immediate safe behavior | Recovery / next action | Chapter 2 trace | Status |
|---|---|---|---|---|---|
| FB-01 | Request identity, authority, binding, format, freshness, or policy is invalid | Reject or hold; commit no resource and release no key | Correct through authorized request path | CP-T02, KM-T02 | [ED] |
| FB-02 | No candidate pass/resource can meet hard constraints | Enter hold or declared no-service; preserve valid inventory | Replan to later qualified opportunity; report unmet demand | AV-T02/03 | [ED] |
| FB-03 | Orbit, time, weather, security, device, or inventory inputs are stale/conflicting/implausible | Reject affected input; do not infer a safe state | Obtain trusted refresh/cross-check or require authorized review | CP-T04, AQ-T01 | [ED] |
| FB-04 | Endpoint, platform, calibration, configuration, safety, or trust readiness fails | Do not commit/start; mark resource unavailable as appropriate | Maintenance, trust recovery, or alternate approved resource | QO-T05/06, CY-T02/03 | [ED]/[TBD] |
| FB-05 | Optical acquisition/tracking/synchronization fails | End the attempt without weakening limits or extending beyond approved safety/plan | Reacquire only within policy or replan | QO-T07, AV-T01/02 | [ED]/[TBD] |
| FB-06 | Classical peer authentication, transcript integrity, freshness, or session binding fails | Abort; accept no QKD output; do not bootstrap trust from failed link | Approved out-of-band/pre-established trust recovery | CP-T01/02 | [V]/[ED] |
| FB-07 | QBER, decoy statistics, count behavior, timing, optical power, entropy, calibration, or device health violates acceptance | Abort; prevent final-key export; destroy affected intermediates | Investigate, requalify, or use another approved opportunity | QO-T01–07, CP-T03 | [V]/[ED]/[TBD] |
| FB-08 | AQMO becomes unavailable or loses trustworthy control inputs | Local endpoints retain authority to abort and enforce the signed/preauthorized plan; no new plan or relaxed gate is inferred | Continue only if a still-valid local plan and policy explicitly permit; otherwise abort/hold | AQ-T01–03 | [ED]/[TBD] |
| FB-09 | KMS/HSM unavailable, protected path fails, or acknowledgment is ambiguous | No consumer delivery; mark output pending/quarantined or destroy it according to approved boundary policy | Reconcile two-sided state or zeroize before retry | KM-T01/03 | [ED]/[TBD] |
| FB-10 | Either consumer identity, peer/purpose binding, matching key ID, validity, or authorization is inconsistent | Deny delivery; quarantine/revoke affected allocation | Correct identity/governance state through authorized process | KM-T02/03, DS-06 | [ED] |
| FB-11 | Inventory falls below policy threshold or demand exceeds predicted supply | Preserve protected reserve, prioritize by approved policy, declare degradation where necessary | Schedule replenishment; do not weaken security parameters | AV-T03 | [ED]/[TBD] |
| FB-12 | Cyber/physical compromise or audit inconsistency is suspected | Enter incident mode; stop new release from affected trust domain; isolate and revoke | Scope impact, restore known-good state, re-establish trust, authorize return | CY-T01–04, KM-T01/04 | [ED]/[TBD] |
| FB-13 | Weather, obstruction, jamming, flooding, or denial removes the opportunity | Abort or hold without claiming key compromise unless evidence supports it | Replan, use valid existing inventory, or declare no-service | AV-T01/02, DS-05 | [V]/[ED] |
| FB-14 | An operator or optimizer requests a prohibited downgrade or threshold waiver | Reject the action and record the attempted policy violation | Escalate to authorized security/mission authority; preserve existing baseline | CP-T05, AQ-T03 | [ED] |

Repeated failures may change the response from routine abort to anomaly investigation, resource quarantine, or incident mode according to rules that remain **[TBD]**. No failure count or threshold is invented in V0.1.

---

## 3.10 Degraded Operations and Fallback Policy

### 3.10.1 Degraded-state principles

1. A degraded state is explicitly declared and visible to operators and consumers. **[ED]**
2. Valid existing key inventory remains protected and may be used only under its original authorization and lifecycle policy. **[ED]/[TBD]**
3. An unavailable quantum opportunity does not justify lower authentication, QBER, device-health, trust, or consumer-binding requirements. **[ED]**
4. AQMO may reprioritize or replan only among approved resources and configurations. **[ED]**
5. Any separately approved conventional or PQC-only service is a visible policy decision, not an automatic “QKD fallback.” **[ED]**
6. If the required policy cannot be met, SQDS reports no-service rather than mislabeling weaker protection as equivalent. **[ED]**

### 3.10.2 Degraded-mode register

| ID | Degraded condition | Permitted behavior | Prohibited behavior | Exit authority | Status |
|---|---|---|---|---|---|
| DM-01 | No qualified quantum opportunity | Use authorized valid inventory; plan later pass; report projected shortage | Relax link/security limits or invent availability | AQMO/operations within policy | [ED] |
| DM-02 | AQMO unavailable | Enforce preloaded signed plan and local abort gates only if explicitly authorized | Create a new plan, waive constraints, or expose keys locally | Control/mission authority | [ED]/[TBD] |
| DM-03 | KMS/HSM unavailable | Stop delivery; protect or destroy pending output according to boundary policy | Export key through an alternate unapproved path | Crypto/security authority | [ED]/[TBD] |
| DM-04 | One endpoint/resource unavailable | Remove resource; hold or replan to a prequalified alternative if one exists | Pair incompatible or untrusted hardware | AQMO plus resource acceptance | [ED] |
| DM-05 | External data uncertain | Use only an approved validated alternate source or hold | Treat missing/stale data as nominal | Data owner / operations | [ED]/[TBD] |
| DM-06 | Security incident | Contain affected domain, revoke trust, preserve evidence, continue unrelated service only if isolation is demonstrated and authorized | Resume merely because telemetry appears normal | Security incident authority | [ED]/[TBD] |
| DM-07 | Inventory shortage | Apply authorized reservation and priority; report unmet demand | Reuse, over-age, misbind, or silently substitute a key | KMS/mission policy authority | [ED]/[TBD] |

The exact relationship between SQDS degradation and continuation of the external mission communications system remains **[TBD]** and must be defined by the mission and cryptographic authorities.

---

## 3.11 AQMO Operational Decision Logic

ITU-T Y.3832 provides an in-force framework for orchestration in QKD networks. **[V]** [R6] It is relevant prior work, but Q-Orbit does not claim conformance and AQMO additionally addresses the space-pass, optical-environment, hardware, mission-priority, and inventory context defined by this project. **[ED]**

### 3.11.1 Decision sequence

AQMO shall conceptually:

1. validate the request and the authority attached to it;
2. obtain only the minimum required inventory and mission metadata;
3. ingest authenticated, fresh, provenance-marked candidate data;
4. generate candidate space-ground opportunities;
5. remove every candidate that violates a hard constraint;
6. rank only the remaining feasible candidates using approved objectives;
7. reserve resources and issue a controlled plan within delegated authority;
8. refresh critical data at defined commitment gates;
9. monitor state without replacing endpoint acceptance logic;
10. hold, abort, or replan when hard constraints fail;
11. record decision inputs, configuration, violated constraints, result, and authority; and
12. update demand/inventory forecasts using status metadata, never secret key values. **[ED]**

### 3.11.2 Hard constraints and soft objectives

| Class | Candidate content | May be traded for better performance? | Status |
|---|---|---|---|
| **Hard: identity and authorization** | Valid requester, endpoint, resource, operator, service, and consumer identity/authority | No | [ED] |
| **Hard: approved configuration** | Compatible protocol role, device capability, software/configuration, trust path, and policy version | No | [ED]/[TBD] |
| **Hard: security state** | Authentication valid; no unresolved incident/tamper state; required health/calibration gates pass | No | [ED] |
| **Hard: physical/safety feasibility** | Predicted access and operating envelope; platform/terminal safety and resource readiness | No | [ED]/[TBD] |
| **Hard: key handling** | No AQMO key access; protected handoff; correct binding; no prohibited relay/downgrade | No | [ED] |
| **Soft: mission utility** | Priority, need-by time, expected accepted yield, latency, and inventory benefit | Yes, within policy | [ED]/[TBD] |
| **Soft: resource efficiency** | Contact utilization, energy, thermal burden, wear, operator workload, and recovery margin | Yes, within policy | [ED]/[TBD] |
| **Soft: resilience** | Diversity of data/resource sources and preservation of future opportunities | Yes, within policy | [ED]/[TBD] |

If no candidate satisfies all hard constraints, the valid AQMO result is “no feasible plan.” **[ED]**

### 3.11.3 AQMO authority contract

| AQMO may | AQMO may not | Human/independent gate remains |
|---|---|---|
| Filter candidates; rank qualified opportunities; reserve resources; request readiness; issue approved start/hold/abort/replan commands; record rationale; monitor inventory metadata | Access any key value; alter QBER/finite-key/device-health acceptance; approve a protocol; invent hardware capability; reactivate a compromised resource; silently downgrade; override safety/local abort; accept residual risk | New policy/configuration approval; exceptional fallback; incident return to service; cryptographic approval; mission-risk acceptance; unresolved conflict between authorities **[ED]/[TBD]** |

Artificial intelligence or machine learning is not required for V0.1. A deterministic rules engine or constrained optimizer is sufficient to demonstrate the AQMO concept if it produces reproducible, auditable decisions. **[ED]**

---

## 3.12 Key Inventory and Lifecycle CONOPS

ETSI GS QKD 004 describes an application interface to a QKD key-management layer and emphasizes synchronized allocation at both endpoints; ETSI GS QKD 014 describes delivery of block keys with key identifiers from key-management entities to applications. **[V]** [R2, R3] NIST SP 800-57 supplies general key-management lifecycle guidance. **[V]** [R8] These documents inform the functional split, but Q-Orbit has not selected an API or claimed conformance. **[ED]**

### 3.12.1 Conceptual key states

| ID | Key state | Meaning | Available to AQMO? | Status |
|---|---|---|---|---|
| KS-00 | **Intermediate/non-exportable** | Raw, sifted, reconciled, or other pre-acceptance material remains inside the QKD security boundary | No | [ED]/[TBD] |
| KS-01 | **Candidate final / pending acceptance** | Distillation has produced candidate output but all endpoint/policy gates or agreement are not complete | No | [ED]/[TBD] |
| KS-02 | **Accepted / pending KMS commit** | QKD endpoint acceptance succeeded; protected handoff is incomplete | Status only, if operationally required | [ED]/[TBD] |
| KS-03 | **Available inventory** | KMS/HSM has accepted, bound, synchronized, policy-valid key material | Aggregate quantity/age/policy metadata only | [ED] |
| KS-04 | **Reserved** | Available material is committed to an authorized request but not yet delivered/consumed | Aggregate reserved quantity only | [ED]/[TBD] |
| KS-05 | **Allocated/delivered** | The KMS service has transferred corresponding key material or handles to the correctly bound consumer endpoints | Delivery status only | [ED]/[TBD] |
| KS-06 | **Consumed** | Policy-defined use has occurred and reallocation is prohibited | Aggregate lifecycle status only | [ED]/[TBD] |
| KS-07 | **Quarantined** | State, binding, agreement, or compromise scope is uncertain; use is prohibited | Aggregate unavailable status only | [ED] |
| KS-08 | **Expired/revoked** | Time, policy, incident, or authority invalidates future use | Aggregate unavailable status only | [ED]/[TBD] |
| KS-09 | **Destroyed** | Key is rendered unavailable according to the approved destruction policy | Destruction/accounting status only | [ED]/[TBD] |

The exact distinction between allocation, delivery, activation, consumption, expiration, revocation, and destruction depends on the future encryptor and key-use policy. **[TBD]**

### 3.12.2 Inventory thresholds

V0.1 uses named thresholds without invented numbers:

| Threshold | Meaning | AQMO/KMS response | Status |
|---|---|---|---|
| INV-TARGET | Desired inventory for the endpoint/policy class | Normal replenishment planning | [ED]/[TBD] |
| INV-LOW | Forecast risk that authorized demand may not be met | Increase priority for qualified replenishment and notify operations | [ED]/[TBD] |
| INV-RESERVE | Protected amount reserved for defined high-priority need | Deny lower-priority allocation when policy requires | [ED]/[TBD] |
| INV-CRITICAL | Immediate risk of no-service for authorized demand | Declare degraded state, apply authority-approved priority, and report unmet demand | [ED]/[TBD] |

AQMO does not choose the threshold values, key lifetime, or priority policy. It executes the authenticated policy supplied by the responsible authority. **[ED]**

### 3.12.3 Transactional handoff principle

Key handoff shall be modeled as a protected state transition rather than a best-effort file transfer. **[ED]** Conceptually, the QKD boundary and KMS:

1. prepare an accepted key and non-secret binding record;
2. authenticate the protected path and intended KMS instance;
3. validate key identifier, endpoint pair, policy, request/session, validity, and state;
4. transfer and protect the key within the approved boundary;
5. confirm consistent receipt without logging the key;
6. commit the inventory state; and
7. quarantine or destroy ambiguous/partial state. **[ED]/[TBD]**

The detailed distributed-commit, retry, rollback, and zeroization mechanism is **[TBD]** and must prevent duplicate allocation or uncertain reuse.

---

## 3.13 Operator Interaction and Human Gates

The level of automation remains **[TBD]**, but V0.1 retains human or independent authority where a decision changes policy, accepts risk, or restores trust.

| Gate | Information presented | Decision | Decision owner | Status |
|---|---|---|---|---|
| HG-01 Mission authorization | Requester, mission/purpose, endpoint pair, priority, need-by time, expected consequence | Accept/reject/modify authorized demand | Mission/data authority | [ED]/[TBD] |
| HG-02 Plan commitment | Candidate pass, resources, configuration, forecast conditions, constraints, conflicts | Commit resources or hold | Mission/resource operations | [ED]/[TBD] |
| HG-03 Safety/readiness | Platform and terminal readiness, safety, configuration, calibration, health, trust | Authorize attempt or no-go | Platform/ground/safety authorities | [ED]/[TBD] |
| HG-04 Exceptional fallback | QKD state, remaining inventory, mission impact, alternate service and security label | Explicitly authorize or deny separately approved fallback | Mission and cryptographic authorities | [ED]/[TBD] |
| HG-05 Incident declaration | Alerts, affected resources, key/session scope, evidence confidence | Contain/revoke/escalate | Security incident authority | [ED]/[TBD] |
| HG-06 Return to service | Known-good restore, test, calibration, credential, configuration, and evidence package | Restore or remain quarantined | Security/maintenance authority | [ED]/[TBD] |
| HG-07 Policy/baseline change | Change rationale, affected requirements, verification, rollback, approval | Approve/reject controlled change | Configuration and cryptographic authorities | [ED]/[TBD] |

Routine operator displays shall distinguish predicted state, measured state, inferred state, stale state, and authoritative state. **[ED]**

---

## 3.14 Information Exchanges and Interface Semantics

| ID | Exchange | Sender → receiver | Content class | Acceptance rule | Status |
|---|---|---|---|---|---|
| DX-01 | Key-service request | Requester → mission service/AQMO | Demand and policy metadata | Authenticate, authorize, validate freshness and completeness | [ED] |
| DX-02 | Orbit/access data | Orbit service → AQMO/operations | Ephemeris and predicted geometry | Validate identity, epoch, validity, plausibility, and version | [ED]/[TBD] |
| DX-03 | Environment/site data | Weather/site sensors → AQMO/operations | Cloud/visibility/background and site state | Validate provenance, freshness, confidence, and consistency | [ED]/[TBD] |
| DX-04 | Platform/terminal readiness | Space/ground/platform → AQMO/operations | Availability, health, configuration, safety, resource state | Accept only approved signed/authenticated state | [ED]/[TBD] |
| DX-05 | Session plan | AQMO/operations → endpoints/KMS | Request/pass/session/configuration binding and gates | Verify authority, version, validity, and compatibility | [ED] |
| DX-06 | Quantum transmission | Space ↔ ground according to selected link direction | Quantum states and optical acquisition signals | Evaluate under selected protocol/device/optical model | [V]/[TBD] |
| DX-07 | QKD classical protocol | QKD endpoint ↔ QKD endpoint | Sync, sifting, estimation, reconciliation, verification, session control | Authenticate, integrity protect, bind, and reject replay/stale data | [V]/[ED]/[TBD] |
| DX-08 | Security/mission status | Endpoints/KMS/security → AQMO/operations | State, reason code, metrics, alerts; no secret keys | Validate source; enforce least data and audit policy | [ED]/[TBD] |
| DX-09 | Accepted-key handoff | QKD boundary → KMS/HSM | Final key plus protected binding metadata | Protected trusted path and consistent commit acknowledgment | [ED]/[TBD] |
| DX-10 | Inventory metadata | KMS/HSM → AQMO | Aggregated available/reserved/expiring state by authorized class | No raw/intermediate/final keys; minimize sensitive metadata | [ED]/[TBD] |
| DX-11 | Consumer delivery | Logical KMS/HSM service → authorized consumer endpoints | Corresponding key material or protected handles plus policy/binding status | Mutual authentication, both-sided authorization, matching identity, purpose, and lifecycle validation | [ED]/[TBD] |
| DX-12 | Audit/incident evidence | All components → security/V&V repository | Non-secret event, configuration, decision, and integrity evidence | Tamper evidence, controlled access, consistent time, no key logging | [V]/[ED]/[TBD] |

Interface protocols and message schemas remain architecture decisions for Chapters 5 and 9. ETSI GS QKD 004 and 014 are candidate interface references, not automatic baselines. **[ED]**

---

## 3.15 Operational Measures and Success Evidence

No numeric threshold is approved in V0.1. The following measures define what future thresholds must address.

| ID | Measure | Definition or evidence | Status |
|---|---|---|---|
| CON-M01 | Authorized-request acceptance | Fraction/count of valid requests accepted, held, rejected, or expired with a reason | [ED]/[TBD] |
| CON-M02 | Qualified-opportunity rate | Predicted passes that survive all geometry, environment, resource, security, and policy gates | [ED]/[TBD] |
| CON-M03 | Acquisition success | Qualified attempts reaching stable acquisition and synchronization | [ED]/[TBD] |
| CON-M04 | QKD acceptance | Attempts producing protocol-valid accepted key output, separated from raw detection success | [ED]/[TBD] |
| CON-M05 | Accepted key yield | Accepted secret bits/keys per qualified pass under stated finite-key assumptions | [ED]/[TBD] |
| CON-M06 | End-to-end delivery success | Accepted output correctly committed to the logical KMS service and corresponding key material delivered to the intended consumer endpoints | [ED]/[TBD] |
| CON-M07 | Service latency | Time from authorized demand to available/delivered key, with waiting causes separated | [ED]/[TBD] |
| CON-M08 | Inventory sufficiency | Ability of authorized inventory to meet demand and reserve policy over the evaluation horizon | [ED]/[TBD] |
| CON-M09 | Safe-abort performance | Every injected hard-gate failure produces no approved key release | [ED] |
| CON-M10 | Decision audit completeness | Ability to replay why AQMO selected, rejected, held, aborted, or replanned a session without secret keys | [ED] |
| CON-M11 | Recovery effectiveness | Time/evidence required to restore a known-good trusted state after fault or incident | [ED]/[TBD] |
| CON-M12 | Claim consistency | Report, handbook, simulation, diagrams, and website use the same state definitions and result labels | [ED] |

For the 31 August submission, the minimum CONOPS demonstration is a traceable walkthrough of one nominal modeled pass and selected failure injections showing state transitions, abort logic, secret-key yield disposition, KMS inventory update, and no unsafe release. **[ED]**

---

## 3.16 V0.1 Simulation Hooks

The simulation shall represent the physics chain and the operational gates without pretending to model unimplemented security controls. **[ED]**

| CONOPS phase/state | Simulation input | Simulation output | Limitation |
|---|---|---|---|
| PH-01 Planning | Orbit/site assumptions and analysis interval | Candidate pass/access window | Not operational ephemeris or scheduling evidence **[A]** |
| PH-02 Commitment | Horizon/elevation/environment and hardware qualification assumptions | Qualified sub-window | Weather and readiness may be scenario inputs, not live observations **[A]** |
| PH-03 Acquisition | Pointing/acquisition threshold model and slant-range history | Acquisition start/end or no acquisition | Detailed PAT dynamics may remain outside first-order model **[TBD]** |
| PH-04 Quantum exchange | Range, apertures, divergence, pointing, transmission, efficiency, background, source/detector assumptions | Loss, detections, signal/error counts over time | Device/security model depends on selected protocol **[TBD]** |
| PH-05 Validation | Counts, QBER, decoy/finite-key parameters, leakage/error-correction assumptions | Accept/abort and secret-key yield | Positive yield is modeled feasibility only **[ED]** |
| PH-06 Handoff | Accepted yield and conceptual interface availability | Inventory increment or safe handoff failure | Does not prove HSM/KMS security **[ED]** |
| PH-07 Allocation | Demand, priority, threshold and lifecycle assumptions | Reserve/deliver/shortage status | Key-use policy remains **[TBD]** |
| PH-08 Closeout | Session result and failure cause | Final state, inventory, audit record, replan signal | Does not constitute operational certification **[ED]** |

The initial simulation should expose, at minimum:

- time relative to closest approach;
- elevation and slant range;
- modeled channel loss and detection behavior;
- QBER or defined error contributors;
- accepted/aborted interval;
- secret-key rate/yield under the selected model;
- final session outcome and reason;
- inventory before/after;
- assumptions, sources, and sensitivity cases. **[ED]/[TBD]**

Cyber compromise, authentication failure, stale data, wrong consumer, and KMS failure may be represented as logical fault injections and state transitions; they shall not be presented as quantified attack-success models without evidence. **[ED]**

---

## 3.17 Candidate Operational Requirement Seeds for Chapter 4

These are requirement seeds, not baselined requirements. Quantitative values, allocation, and verification detail remain **[TBD]**.

| ID | Candidate requirement seed | Primary trace | Preliminary verification |
|---|---|---|---|
| OPS-SEED-01 | SQDS shall accept a key-service request only after validating requester identity, authorization, freshness, endpoint pair, purpose/policy, and required fields. | FB-01, DX-01 | Positive/negative interface test |
| OPS-SEED-02 | SQDS shall assign a unique correlation identifier linking request, plan, QKD session, key handoff, inventory event, and outcome without exposing key material. | §3.5, DX-12 | Inspection + trace test |
| OPS-SEED-03 | AQMO shall generate plans only from authenticated, integrity-protected, fresh, provenance-marked inputs whose validity and confidence meet policy. | FB-03, DX-02–04 | Stale/false-data injection test |
| OPS-SEED-04 | AQMO shall exclude every candidate that violates an approved hard constraint before applying performance ranking. | §3.11.2 | Constraint and decision-replay test |
| OPS-SEED-05 | A session plan shall bind request, endpoints, pass/opportunity, configuration, validity, resources, and abort rules. | PH-02, DX-05 | Interface inspection + replay test |
| OPS-SEED-06 | Each participating endpoint shall independently verify plan authority, validity, compatibility, local readiness, and security state before execution. | §3.7 steps 8–9 | Negative readiness test |
| OPS-SEED-07 | Loss or unavailability of AQMO shall not disable local endpoint safety, authentication, device-health, protocol-acceptance, or abort enforcement. | FB-08, DM-02 | Communications-loss fault test |
| OPS-SEED-08 | QKD operation shall not enter the accepted exchange state until acquisition, synchronization, peer authentication, session binding, configuration, and local readiness gates pass. | OS-05/06 | State-transition test |
| OPS-SEED-09 | SQDS shall continuously monitor the selected link/device operating envelope and abort without key release when a hard acceptance condition fails. | FB-07 | Fault injection + demonstration |
| OPS-SEED-10 | SQDS shall distinguish detection success, protocol acceptance, KMS commit, consumer delivery, and mission completion as separate states and metrics. | §3.1.1, §3.15 | Inspection + scenario test |
| OPS-SEED-11 | Final key material shall remain non-exportable until endpoint authentication, protocol/finite-key, device-health, configuration, and policy acceptance all succeed. | PH-05/06 | Analysis + negative test |
| OPS-SEED-12 | The QKD-to-KMS handoff shall provide authenticated binding, protected transfer, explicit acknowledgment, duplicate prevention, and safe disposition of partial or ambiguous state. | FB-09, §3.12.3 | Interface/fault test |
| OPS-SEED-13 | The logical KMS service shall make corresponding key material available to the consumer endpoints only after validating unique and matching key identity, endpoint agreement, both consumers, peer/purpose binding, policy, validity, and lifecycle state. | FB-10, KS-03 | End-to-end negative test |
| OPS-SEED-14 | AQMO shall receive no raw, sifted, reconciled, final, stored, delivered, or consumed key values. | ACT-04, DX-10 | Architecture/interface inspection |
| OPS-SEED-15 | Inventory metadata disclosed to AQMO shall be limited to approved planning needs and protected for confidentiality, integrity, freshness, and authorization. | §3.5.2, DX-10 | Data-flow and access-control test |
| OPS-SEED-16 | SQDS shall define available, reserved, delivered, consumed, quarantined, expired/revoked, and destroyed key states and prevent unauthorized transition or reuse. | §3.12.1 | State-machine test |
| OPS-SEED-17 | SQDS shall apply approved inventory target, low, reserve, and critical policies without allowing AQMO to set or override policy values. | §3.12.2 | Policy and prioritization test |
| OPS-SEED-18 | SQDS shall explicitly report nominal, hold, abort, degraded/no-service, quarantine, and incident states to authorized operators and interfaces. | §3.4, §3.8 | State-display test |
| OPS-SEED-19 | Loss of a quantum opportunity shall not cause automatic or silent transition to an unapproved algorithm, key source, endpoint, or trust path. | §3.10 | Degradation scenario test |
| OPS-SEED-20 | Any separately approved fallback shall require explicit authorization, distinct policy labeling, and auditable activation and termination. | HG-04, DM register | Authorization and audit test |
| OPS-SEED-21 | Suspected compromise of an endpoint, KMS, AQMO, identity, or protected path shall prevent new key release from the affected trust domain. | FB-12, OM-06 | Incident scenario exercise |
| OPS-SEED-22 | Return to service after compromise or quarantine shall require known-good restoration, revalidation, trust re-establishment, and explicit authorized approval. | HG-06, OS-12 | Recovery exercise |
| OPS-SEED-23 | Every abort shall record a non-secret reason, affected request/session/configuration, time basis, disposition, and replan state. | PH-08, DX-12 | Audit inspection |
| OPS-SEED-24 | Audit and decision records shall support independent reconstruction without containing secret key values or prohibited intermediate material. | CON-M10, DX-12 | Replay + log-content test |
| OPS-SEED-25 | The initial simulation shall propagate a single reference case through pass geometry, loss, detection, QBER, secret-key yield, acceptance/abort, handoff disposition, and inventory outcome. | §3.16 | Reproducibility demonstration |
| OPS-SEED-26 | System and simulation outputs shall report assumptions, source/status labels, uncertainty or sensitivity, and the precise success state represented. | SC-D02/D04/D07 | Inspection + rerun |

Chapter 4 shall merge these with the 28 Chapter 2 security seeds and Chapter 1 mission objectives, remove duplication, allocate ownership, add measurable thresholds where justified, and explicitly disposition every seed. **[ED]**

---

## 3.18 Traceability to Subsequent Work

| Chapter 3 output | Immediate next use |
|---|---|
| Actors ACT-01–ACT-14 and authority separation | Allocate functions, permissions, and external interfaces in Chapters 4, 5, and 9 |
| Modes OM-00–OM-06 and states OS-00–OS-12 | Derive state/transition requirements and architecture behavior in Chapters 4 and 5 |
| Request and decision-input contracts | Define interface data models and trust controls in Chapters 4, 5, and 9 |
| Nominal phases PH-00–PH-08 | Structure subsystem operations in Chapters 6–9 and integrated testing in Chapter 12 |
| Failure branches FB-01–FB-14 | Derive safety/security requirements, risks, and fault-injection tests in Chapters 4, 11, and 12 |
| AQMO hard/soft constraints | Define the preliminary algorithm, authority boundary, and simulation in Chapters 5 and 10 |
| Key states and inventory thresholds | Define KMS/HSM architecture and key policy in Chapter 9 |
| Simulation hooks | Define model architecture, scenarios, inputs, and plots in Chapter 10 |
| OPS-SEED-01–26 | Combine with mission/security seeds in the Chapter 4 requirements baseline |

The immediate engineering step after Chapter 3 is **Chapter 4 — System Requirements**. **[ED]** Chapter 4 should not invent detailed numeric performance values; it should create traceable “shall” requirements and keep unsupported thresholds explicitly **[TBD]** until the research, protocol trade, link model, and stakeholder inputs justify them.

---

## Chapter 3 Decision and Open-Issue Register

### Decisions proposed for baseline approval

| ID | Decision | Rationale | State |
|---|---|---|---|
| ED-CO-01 | Define mission success as authorized delivery to the correct consumer endpoints—not photon exchange or positive key-rate output alone | Preserves the end-to-end system boundary | Proposed |
| ED-CO-02 | Use demand-informed inventory replenishment as the reference service pattern | Reflects intermittent space access without excluding direct-demand use | Proposed |
| ED-CO-03 | Keep AQMO outside all secret-key values and individual key allocation | Limits trust and separates orchestration from key custody | Proposed |
| ED-CO-04 | Give endpoints independent, non-overridable security-abort authority | Prevents orchestration or availability pressure from waiving security gates | Proposed |
| ED-CO-05 | Require authenticated, provenance-marked, fresh inputs and hard-constraint filtering before optimization | Prevents poisoned data or ranking objectives from creating an unsafe plan | Proposed |
| ED-CO-06 | Permit AQMO to select/replan only among prequalified configurations and delegated authorities | Makes adaptation bounded and auditable | Proposed |
| ED-CO-07 | Distinguish request, planning, acquisition, QKD exchange, validation, KMS commit, consumer delivery, and closeout states | Prevents ambiguous “success” claims | Proposed |
| ED-CO-08 | Treat key handoff as a protected transactional state change with safe ambiguous-state disposition | Reduces mismatch, duplicate, rollback, and wrong-destination risk | Proposed |
| ED-CO-09 | Use explicit degraded/no-service labeling and forbid silent fallback | Preserves policy visibility and Chapter 2 fail-closed baseline | Proposed |
| ED-CO-10 | Allow local continuation after AQMO loss only under a still-valid preauthorized plan and local policy; otherwise abort/hold | Balances bounded resilience with constrained authority | Proposed |
| ED-CO-11 | Use named inventory thresholds without assigning unsupported numeric values | Enables CONOPS and simulation structure without false precision | Proposed |
| ED-CO-12 | Carry all 26 operational requirement seeds into Chapter 4 for merge or explicit disposition | Maintains traceability | Proposed |
| ED-CO-13 | Do not claim that the single direct QKD-link case establishes key delivery between arbitrary remote consumers or silently assume a trusted relay | Preserves the actual trust/topology boundary | Proposed |

### High-priority open issues

| ID | Open issue | Closure route | Target |
|---|---|---|---|
| TBD-CO-01 | Named customer organization, mission/data owner, authorities, operator roles, and information-handling rules | Stakeholder and governance review | Ch. 1/3/4/11 |
| TBD-CO-02 | Key demand, need-by time, latency, priority, confidentiality lifetime, availability, and consequence thresholds | Mission/data-owner analysis | Ch. 3/4/9/10 |
| TBD-CO-03 | Final QKD protocol, link direction, device roles, timing, finite-key process, and acceptance gates | Research and protocol/device trade study | Ch. 6–8/10 |
| TBD-CO-04 | Orbit, ground site, access case, environment model, and commitment/acquisition timing | Orbit/site/optical trade study | Ch. 6/7/10 |
| TBD-CO-05 | Classical-channel authentication, trust-anchor provisioning, credential refresh, and recovery | Cryptographic authority review | Ch. 9 |
| TBD-CO-06 | KMS/HSM boundary, key-handoff protocol, distributed commit, retry, rollback, zeroization, and paired consumer API | Key-management architecture trade | Ch. 5/9 |
| TBD-CO-07 | Key lifecycle semantics, key-use mode, inventory units, thresholds, reserve, age, expiry, and destruction policy | Crypto/mission authority review | Ch. 4/9 |
| TBD-CO-08 | AQMO objective function, data schemas, source confidence, autonomy level, commitment gates, and human approval points | Control/operations trade study | Ch. 3/5/10 |
| TBD-CO-09 | Behavior when AQMO, classical channel, or KMS is lost during an already-authorized session | Architecture and fault analysis | Ch. 4/5/9/12 |
| TBD-CO-10 | Safety, laser, platform, ground-site, and command authority workflow | Specialist and jurisdiction review | Ch. 6/7/11/12 |
| TBD-CO-11 | Approved fallback service, labeling, activation authority, and relationship to external mission communications | Mission and cryptographic authority decision | Ch. 3/4/9 |
| TBD-CO-12 | Audit schema, time source, retention, privacy, correlation, and incident evidence handling | Cybersecurity/operations review | Ch. 5/9/12 |
| TBD-CO-13 | Quantitative operational measures and acceptance thresholds | Research, simulation, stakeholder need, and test evidence | Ch. 4/10/12 |
| TBD-CO-14 | Exact interfaces or conformance targets, including whether ETSI GS QKD 004/014 or ITU frameworks are adopted | Interoperability trade study | Ch. 5/9/12 |
| TBD-CO-15 | Mapping between the space/ground QKD endpoints, logical KMS functions, and the two actual protected communication consumers, including any relay or additional trust path | Trust and consumer-topology trade study | Ch. 5/9 |

---

## References

**[R1]** International Telecommunication Union, *ITU-T Y.3800 — Overview on networks supporting quantum key distribution*, October 2019, in force. Available: <https://www.itu.int/rec/T-REC-Y.3800/>.

**[R2]** European Telecommunications Standards Institute, *ETSI GS QKD 004 V1.1.1 — Quantum Key Distribution (QKD); Application Interface*, December 2010. Available: <https://www.etsi.org/deliver/etsi_gs/qkd/001_099/004/01.01.01_60/gs_qkd004v010101p.pdf>.

**[R3]** European Telecommunications Standards Institute, *ETSI GS QKD 014 V1.1.1 — Quantum Key Distribution (QKD); Protocol and data format of REST-based key delivery API*, February 2019. Available: <https://www.etsi.org/deliver/etsi_gs/QKD/001_099/014/01.01.01_60/gs_qkd014v010101p.pdf>.

**[R4]** European Telecommunications Standards Institute, *ETSI GS QKD 016 V1.1.1 — Quantum Key Distribution (QKD); Common Criteria Protection Profile — Pair of Prepare and Measure Quantum Key Distribution Modules*, April 2023. Available: <https://www.etsi.org/deliver/etsi_gs/QKD/001_099/016/01.01.01_60/gs_QKD016v010101p.pdf>.

**[R5]** International Telecommunication Union, *ITU-T X.1717 — Security requirements and measures for quantum key distribution network — Control and management*, October 2024, in force. Available: <https://www.itu.int/rec/T-REC-X.1717/en>.

**[R6]** International Telecommunication Union, *ITU-T Y.3832 — Quantum key distribution networks — Framework for orchestration*, December 2025, in force. Available: <https://www.itu.int/rec/T-REC-Y.3832>.

**[R7]** F. Xu, X. Ma, Q. Zhang, H.-K. Lo, and J.-W. Pan, “Secure quantum key distribution with realistic devices,” *Reviews of Modern Physics*, vol. 92, 025002, 2020. DOI: <https://doi.org/10.1103/RevModPhys.92.025002>.

**[R8]** National Institute of Standards and Technology, *Recommendation for Key Management: Part 1 — General*, NIST SP 800-57 Part 1 Rev. 5, May 2020. DOI: <https://doi.org/10.6028/NIST.SP.800-57pt1r5>.

---

## Review Gate CH3-G1

Chapter 3 may be baselined for V0.1 when the Q-Orbit team:

1. approves the controlled CONOPS statement in §3.1.1;
2. approves demand-informed inventory replenishment as the reference pattern;
3. approves the actor and authority separation, especially AQMO’s no-key/no-waiver boundary;
4. accepts the nominal phases, operational modes, and state transitions;
5. accepts the failure branches and degraded/no-service behavior;
6. approves the protected transactional handoff principle while leaving its protocol TBD;
7. accepts named inventory thresholds without invented numerical values;
8. approves the conditional local behavior after AQMO loss;
9. accepts the one-link consumer-topology claim boundary and keeps trusted relays outside the baseline;
10. assigns owners or closure routes to the high-priority CONOPS TBDs; and
11. carries every OPS-SEED into Chapter 4 for formalization, merge, deferment, or documented rejection.
