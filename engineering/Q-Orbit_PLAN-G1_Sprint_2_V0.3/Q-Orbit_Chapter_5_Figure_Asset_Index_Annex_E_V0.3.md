# Q-Orbit Chapter 5 — Figure & Asset Index Annex E V0.3

| Document field | Value |
|---|---|
| Document ID | QO-EDH-CH05-ANN-E |
| Version | Working Draft V0.3 |
| Date | 16 August 2026 |
| Parent | QO-EDH-CH05 Working Draft V0.3 |
| Asset coverage | 6/6 Chapter 5 controlled master figures |
| Source format | Editable, responsive SVG |
| Maturity | Controlled master candidate; ARCH-G1 not passed |
| Release state | Private; public release requires PR-GATE-01 for each exact asset version |

> **Asset boundary.** A controlled master is a traceable design artifact. It is not an implemented system, physical drawing, certified boundary, verified interface, measured result, or release authorization.

---

## 1. Controlled master index

| Asset ID | Title / viewpoint | File | SHA-256 | Source trace | Intended surfaces | State |
|---|---|---|---|---|---|---|
| FIG-001 | Mission context / VIEW-5A | `FIG-001_Q-Orbit_Mission_Context_V0.3.svg` | `acb1b883dae46307fb7aa84d0d9e7d60e36f5076c01e6144f73d2ffa9b408a7b` | CH1 §§1.3, 1.7, 1.9; REQ-SRV; REQ-REL | Chapter 5; research context; private home/system pages | Controlled master candidate |
| FIG-002 | End-to-end logical architecture / VIEW-5B | `FIG-002_Q-Orbit_Logical_Architecture_V0.3.svg` | `b728f5828168dcd3a553c4cecd46bfa0b64278dcea71e98f1ac465352ccd8503` | CH1 §1.5; CH3 §§3.5–3.9; REQ-SRV; REQ-KM; REQ-AQM | Chapter 5; research method context; private home/designs pages | Controlled master candidate |
| FIG-003 | Conceptual deployment / VIEW-5C | `FIG-003_Q-Orbit_Conceptual_Deployment_V0.3.svg` | `d1e142e6ef0ba3abaf06fec98b546730436dfa2f044cafc0a0ddfac7c5edc5dc` | CH1 §§1.5, 1.10; A-001; A-002; TBD-003; TBD-004; TBD-008 | Chapter 5; private system page | Controlled master candidate |
| FIG-004 | Trust zones / VIEW-5D | `FIG-004_Q-Orbit_Trust_Zones_V0.3.svg` | `4d0baaa4e7af718b6a2cdbc8cc154aaa2c714be5a42c69ef4668930207d60432` | CH2 §2.5; REQ-CYB-006; REQ-EVD; REQ-REL | Chapters 5/8; research limitations; private designs/security pages | Controlled master candidate |
| FIG-005 | Interface and data-flow map / VIEW-5E | `FIG-005_Q-Orbit_Interface_Map_V0.3.svg` | `90f54a4c474d30c106407dbaf83a3d8f392ac2daff75f09aeb83085776116722` | CH2 §2.5; CH3 §§3.4–3.6; CH5 §5.9 | Chapter 5; research method support; private designs page | Controlled master candidate |
| FIG-010 | AQMO authority / VIEW-5F | `FIG-010_Q-Orbit_AQMO_Authority_V0.3.svg` | `f8ef5ae89a8276cb1300dc7eb5585f52bcc0bf1311f6ffb0fe66bfc6ad5e8d26` | CH1 §1.8; CH3 §3.4; REQ-AQM-001 through REQ-AQM-011 | Chapter 5; research method support; private system/how-it-works pages | Controlled master candidate |

The hashes apply to the exact SVG bytes listed. A changed file requires a new hash and asset-index version record.

---

## 2. Captions and accessible text equivalents

### FIG-001

- **Caption:** Preliminary system context. External dependencies are interfaces, not fully designed Q-Orbit subsystems.
- **Alt text:** Q-Orbit SQDS bounded between one space and one ground endpoint, with external platform, data, authority, consumer, evidence, and private presentation dependencies.
- **Text equivalent:** The preliminary SQDS logical boundary contains the two QKD endpoints, their associated EKM functions, and constrained control/evidence/model/release functions. External identity/authority, qualified data, platform resources, local consumers, research evidence, and private presentation connect through declared interfaces. Trusted relays, arbitrary remote users, named missions/sites/products, and operational approval are excluded.

### FIG-002

- **Caption:** Preliminary logical architecture. Key values do not traverse AQMO or the EKM peer-status path.
- **Alt text:** Two QKD endpoints feed their associated endpoint key managers; the key managers coordinate non-secret pair state and separately deliver to local consumers, while AQMO uses metadata only.
- **Text equivalent:** IF-Q01 and IF-Q02 connect QKD-A and QKD-B. IF-K01 and IF-K02 carry accepted local output to EKM-A and EKM-B. IF-K03 carries only non-secret pair status. OUT-3 attaches to matching two-sided commit. IF-C01 and IF-C02 perform a separate local delivery transaction whose paired acknowledgement supports OUT-4. AQMO issues only constrained metadata commands, and the evidence service records no key values.

### FIG-003

- **Caption:** One-pass conceptual allocation; orbit, site, hardware, apertures, wavelength, and physical EKM placement are not selected.
- **Alt text:** Conceptual satellite-to-ground direct link between one space and one ground domain during one candidate pass.
- **Text equivalent:** Endpoint domain A contains the logical QKD-A transmitter and associated logical EKM-A; endpoint domain B contains QKD-B and associated logical EKM-B. One conceptual direct downlink and one authenticated classical dependency connect the endpoints. Platform, facility, hardware, site, wavelength, aperture, and physical EKM/HSM details remain open.

### FIG-004

- **Caption:** Logical trust-zone view. Dashed zones are not certified cryptographic-module boundaries.
- **Alt text:** Separate logical zones protect the two QKD functions and two key managers; orchestration, evidence, and presentation remain outside key-value paths.
- **Text equivalent:** TZ-QA and TZ-QB protect endpoint-local QKD state. TZ-EA and TZ-EB protect key value, binding, and lifecycle state. TZ-OR carries requests, qualified data, and constrained commands; TZ-EV carries non-secret evidence; TZ-PU carries controlled presentation artifacts. Key values do not enter TZ-OR, TZ-EV, the model, TZ-PU, or IF-K03.

### FIG-005

- **Caption:** Preliminary interface catalogue. Detailed schemas, transports, timing, retries, and error codes remain open.
- **Alt text:** Labeled interface flows connect the two QKD endpoints, endpoint key managers, local consumers, AQMO, evidence service, and presentation layer.
- **Text equivalent:** The figure shows all twelve stable interface IDs and distinguishes quantum, authenticated classical, protected key-value, metadata/status, command, evidence, and release flows. IF-K01, IF-K02, IF-C01, and IF-C02 are the only key-value-permitted paths. IF-K03, IF-A01, IF-A02, IF-A03, IF-E01, and IF-R01 explicitly exclude key values.

### FIG-010

- **Caption:** AQMO is a constrained metadata orchestrator; endpoint and EKM safety gates remain authoritative.
- **Alt text:** AQMO receives validated metadata and issues constrained orchestration commands, but it cannot access keys or override cryptographic, device, EKM, incident, or release gates.
- **Text equivalent:** Permitted inputs are validated request, geometry/time/environment, resource, security/configuration, and aggregated inventory metadata. Permitted actions are filtering, ranking, reserving, requesting start/hold/stop, monitoring, and replanning within an approved configuration. Prohibited authority includes key access, protocol approval, device or finite-key override, EKM commit/delivery override, incident recovery, risk acceptance, fallback activation, and release approval.

---

## 3. Misuse review record

| Asset | Misuse question | Disposition |
|---|---|---|
| FIG-001 | Could the whole spacecraft, ground station, or website appear inside a validated boundary? | External dependencies and preliminary boundary are explicitly labeled; excluded baseline shown |
| FIG-002 | Could protocol, key, status, delivery, and metadata appear as one generic path? | Distinct line style, interface ID, class label, and outcome placement used |
| FIG-003 | Could the view imply a real orbit, site, dimension, part, national affiliation, or flight design? | No realistic dimensions, part numbers, markings, orbit, or site; open fields listed |
| FIG-004 | Could dashed zones imply certified cryptographic-module boundaries? | Explicit caution in header and alt text; no certification symbols used |
| FIG-005 | Could a key-value edge terminate at AQMO, evidence, peer status, or presentation? | Key-value styling terminates only at associated EKM/consumer paths; zero-key labels retained |
| FIG-010 | Could AQMO appear above or able to override local security authorities? | Authoritative gates drawn separately; override path visibly blocked; prohibited authority listed |

All six masters pass this internal misuse inspection as controlled design artifacts. Independent architecture/security review and ARCH-G1 disposition remain pending.

---

## 4. Technical validation record

| Check | Result |
|---|---|
| SVG parse | 6/6 well-formed XML |
| Responsive geometry | 6/6 use `viewBox="0 0 1600 900"` |
| Accessible name | 6/6 include `<title>` and `<desc>` and `role="img"` |
| Text labels on flow classes | Present; color and line shape are not the sole differentiators |
| Preliminary/not-to-scale status | Present on every master |
| Named customer/country/site/orbit/product | None |
| Model result or operational metric | None |
| Key-value path misuse | None found in controlled text inspection |

---

## 5. Publication and derivative rule

The private website may use the exact masters or a traced derivative that preserves:

- the asset ID and version;
- the caption and accessible equivalent;
- the path and zone meanings;
- the preliminary/claim-boundary label;
- the zero-key rules;
- the open-issue cues; and
- the current private/release state.

A public derivative requires a positive PR-GATE-01 disposition for that exact derivative or an explicitly authorized relationship to the reviewed master. ARCH-G1, if later passed, would not substitute for PR-GATE-01.

