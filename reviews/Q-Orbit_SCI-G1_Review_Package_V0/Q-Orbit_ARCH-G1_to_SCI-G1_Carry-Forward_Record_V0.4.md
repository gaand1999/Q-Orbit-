# Q-Orbit ARCH-G1 to SCI-G1 Carry-Forward Record V0.4

| Record field | Value |
|---|---|
| Record ID | QO-GATE-CF-001 |
| Version | V0.4 |
| Date | 18 August 2026 |
| Source baseline | QO-EDH-CH01–04 V0.2; QO-EDH-CH05 and Annexes 5-A–5-E V0.3; FIG-001–005 and FIG-010 V0.3 |
| Prior review evidence | Q-Orbit All-Chapters Hallucination Audit, closed 17 August 2026 |
| ARCH-G1 state | Review candidate; **not passed** |
| Carry-forward disposition | Proceed with SCI-G1 drafting under the controls below |
| Authority boundary | Engineering work instruction only; not an architecture-gate approval |

> **Control statement.** This record permits preparation of the scientific-method package while the formal ARCH-G1 decision remains pending. It does not close any `TBD-*`, approve an architecture, authorize implementation, or substitute for named multidisciplinary reviewers and an authorized gate decision.

---

## 1. Basis for carry-forward

The corrected Chapters 1–5 package has no known unresolved hallucination or confirmed internal contradiction recorded by the 17 August 2026 audit. The audit also records that:

- 27 external claims resolve to primary scientific or official sources within their stated applicability limits;
- all eight confirmed defects and five control-language improvements were closed;
- Chapter 4 contains 119 unique proposed requirements and Annex 5-A contains 119 text-matched allocations;
- all six Chapter 5 SVG masters are structurally valid and synchronized with the corrected package; and
- operational verification remains zero and no simulation run or quantitative Q-Orbit result exists.

Those facts make the package suitable as an input to method drafting. They do not establish a positive ARCH-G1 decision.

## 2. Open ARCH-G1 items carried forward

| Carry-forward ID | Open item | Effect on SCI-G1 | Required control |
|---|---|---|---|
| CF-ARCH-01 | Named architecture, security, key-management, controls, evidence, model, and configuration reviewers are not assigned | Chapter 6 may use the current architecture only as a provisional analysis boundary | Mark all inherited architecture as preliminary and trace semantic conflicts back through Chapter 4/5 change control |
| CF-ARCH-02 | No authorized ARCH-G1 decision record exists | SCI-G1 cannot claim the architecture is approved or frozen by authority | Keep `ARCH-G1: not passed` visible in documents and website status |
| CF-ARCH-03 | Independent review scope and competence remain open under TBD-015 | Internal consistency checks cannot be called independent V&V | Label all automated and editorial checks as internal review support |
| CF-ARCH-04 | Exact website claim/source review remains incomplete at gate-authority level | Website updates remain a private derived presentation | Preserve trace labels, preliminary status, and PR-GATE-01 boundary |
| CF-ARCH-05 | TBD-001 through TBD-020 remain open | Method values, thresholds, products, sites, and authority data cannot be invented | Use `TBD`, controlled symbolic fields, or sensitivity ranges with provenance |

## 3. Conditions for SCI-G1 work

SCI-G1 drafting may proceed only while all of the following remain true:

1. the analysis topology stays limited to one direct QKD-A/QKD-B link, one space endpoint domain, one ground endpoint domain, and one candidate pass;
2. the space endpoint remains the reference transmitter and the ground endpoint remains the reference receiver;
3. the computational reference remains a profile-specific, finite-block, single-pass, weak-coherent-pulse efficient-BB84 method with one signal and two decoy intensities, subject to independent reproduction;
4. no numeric value from a paper, experiment, standard, or demonstration becomes a Q-Orbit design value without a parameter-register source and applicability disposition;
5. OUT-1 through OUT-4 remain separate, with OUT-3 as the primary replenishment outcome and OUT-4 as a separate delivery transaction;
6. a failed or unknown required gate is non-permissive and never becomes an implied positive result;
7. no method text implies that a simulation was run, a key was generated, a threshold was passed, or a system was validated; and
8. any architecture conflict discovered during Chapter 6 drafting is recorded and returned to the Chapter 4/5 configuration-control path.

## 4. Carry-forward decision

The recommended controlled action is:

> **Proceed with the Chapter 6 method draft, parameter/provenance schema, Research Sections 1–4, FIG-011, and derived WEB-01 through WEB-05 content while retaining ARCH-G1 as not passed.**

This recommendation is reversible. A future ARCH-G1 review may change the analysis boundary and therefore trigger controlled revision of the SCI-G1 artifacts.

## 5. Non-authorizations

This record does not authorize:

- a positive ARCH-G1 or SCI-G1 gate decision;
- hardware, product, protocol, site, orbit, wavelength, aperture, threshold, or security-parameter selection;
- simulation execution or publication of modeled results;
- procurement, fabrication, flight, certification, cryptographic approval, risk acceptance, or operational use; or
- public release of any artifact without a positive PR-GATE-01 disposition for the exact version.

