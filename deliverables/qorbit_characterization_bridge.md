# Q-Orbit — Characterization-to-Proof Bridge, Security-Budget Architecture, and Numerical-Extension Triage

**Author:** Agent E (Characterization-to-Proof Specialist) — 2026-08-27
**Scope:** THEORETICAL specification only. This document is a *measurement specification* describing what would have to be measured, with what statistical machinery, and with what confidence accounting, before the Q-Orbit key-length computation can make any security claim. It is **not** an authorization to measure anything, and it invents **no** numerical values. Fail-closed convention: any parameter without measured evidence is `UNCHARACTERIZED` and blocks numerical evaluation of security-relevant outputs.

**Frozen fixture under analysis (project context):**
- Protocol: efficient (biased-basis) BB84, WCP downlink, 3 intensities (one vacuum, i.e. μ₃ = 0 limit of the vacuum+weak-decoy construction).
- Finite-key structure after: J. S. Sidhu, T. Brougham, D. McArthur, R. G. Pousa, D. K. L. Oi, "Finite key effects in satellite quantum key distribution", *npj Quantum Information* **8**, 18 (2022), DOI 10.1038/s41534-022-00525-3 — **VERIFIED** (Nature portfolio page s41534-022-00525-3, vol. 8, article 18, 2022; authors confirmed).
- Margin equation: `M = s_X,0 + s_X,1·[1 − h2(φ_X)] − λ_EC − 6·log2(21/ε_s) − log2(2/ε_c)`, which is structurally identical to Eq. (1) of C. C. W. Lim, M. Curty, N. Walenta, F. Xu, H. Zbinden, "Concise security bounds for practical decoy-state quantum key distribution", *Phys. Rev. A* **89**, 022307 (2014), DOI 10.1103/PhysRevA.89.022307, arXiv:1311.7129 — **VERIFIED**.

---

## 0. Reference verification ledger

| # | Reference | Claimed | Verified bibliographic data | Status |
|---|---|---|---|---|
| R1 | Tan & Nahar, "Incorporating Device Characterization into Security Proofs", PRX Quantum (2026) | PRX Quantum, 2026 | *PRX Quantum* **7**, 020342 (2026); published 29 May 2026; authors Ernest Y.-Z. Tan and Shlok Nahar; DOI **10.1103/f42p-524t** (new APS alphanumeric DOI scheme — the abstract page journals.aps.org/prxquantum/abstract/10.1103/f42p-524t resolves); preprint arXiv:2508.15383 (v1 2025-08-21, v2 2026-05-29 matching publication) | **VERIFIED** — note DOI is in the new APS hash format, NOT `10.1103/PRXQuantum.7.020342`; both the APS journal page and a third-party citation (Quantum 5, 602 reference list) confirm vol. 7, art. 020342 |
| R2 | Sidhu et al., npj QI 8, 18 (2022) | npj QI 8, 18 | J. S. Sidhu, T. Brougham, D. McArthur, R. G. Pousa, D. K. L. Oi, "Finite key effects in satellite quantum key distribution", *npj Quantum Information* **8**, 18 (2022), DOI 10.1038/s41534-022-00525-3 | **VERIFIED** |
| R3 | Lim et al., PRA 89, 022307 (2014) | PRA 89, 022307 | C. C. W. Lim, M. Curty, N. Walenta, F. Xu, H. Zbinden, "Concise security bounds for practical decoy-state quantum key distribution", *Phys. Rev. A* **89**, 022307 (2014), DOI 10.1103/PhysRevA.89.022307, arXiv:1311.7129 | **VERIFIED** (full text inspected, incl. supplementary Eqs. (11)–(14)) |
| R4 | Renner thesis | ETH 2005 | R. Renner, "Security of Quantum Key Distribution", PhD thesis, ETH Zürich, Diss. ETH No. 16242 (2005), arXiv:quant-ph/0512258, DOI 10.3929/ethz-a-005115027 | **VERIFIED** |
| R5 | König & Renner | TCC 2005 | R. Renner, R. König, "Universally composable privacy amplification against quantum adversaries", TCC 2005, LNCS 3378, pp. 407–425, Springer | **VERIFIED** |
| R6 | Müller-Quade & Renner 2009 | NJP 2009 | J. Müller-Quade, R. Renner, "Composability in quantum cryptography", *New J. Phys.* **11**, 085006 (2009), DOI 10.1088/1367-2630/11/8/085006 | **VERIFIED** |
| R7 | Portmann & Renner 2022 | RMP 2022 | C. Portmann, R. Renner, "Security in quantum cryptography", *Rev. Mod. Phys.* **94**, 025008 (2022), DOI 10.1103/RevModPhys.94.025008, arXiv:2102.00021 | **VERIFIED** |
| R8 | Ben-Or & Mayers / Ben-Or et al. | composable QKD | M. Ben-Or, M. Horodecki, D. W. Leung, D. Mayers, J. Oppenheim, "The universal composable security of quantum key distribution", TCC 2005, LNCS 3378, pp. 386–406 | **VERIFIED** (published version; the 2004 Ben-Or–Mayers preprint arXiv:quant-ph/0409062 exists but was not needed) |
| R9 | Clopper & Pearson 1934 | Biometrika | C. J. Clopper, E. S. Pearson, "The use of confidence or fiducial limits illustrated in the case of the binomial", *Biometrika* **26**(4), 404–413 (1934), DOI 10.1093/biomet/26.4.404 | **VERIFIED** (title/authors/journal/page via third-party reference lists) |
| R10 | Hoeffding 1963 | JASA | W. Hoeffding, "Probability inequalities for sums of bounded random variables", *J. Amer. Statist. Assoc.* **58**(301), 13–30 (1963), DOI 10.1080/01621459.1963.10500830 | **VERIFIED** (also cited as ref [43] inside R3) |
| R11 | Serfling 1974 | Ann. Statist. | R. J. Serfling, "Probability inequalities for the sum in sampling without replacement", *Ann. Statist.* **2**(1), 39–48 (1974), DOI 10.1214/aos/1176342611 | **VERIFIED** (via Quantum 5, 602 ref [31] with DOI) |
| R12 | Azuma 1967 | Tohoku | K. Azuma, "Weighted sums of certain dependent random variables", *Tohoku Math. J. (2)* **19**(3), 357–367 (1967), DOI 10.2748/tmj/1178243286 | **VERIFIED** |
| R13 | Kato 2020 | preprint | G. Kato, "Concentration inequality using unconfirmed knowledge", arXiv:2002.04357 (2020) | **VERIFIED** (preprint; no journal version asserted) |
| R14 | Fung, Ma, Chau 2010 | PRA | C.-H. F. Fung, X. Ma, H. F. Chau, "Practical issues in quantum-key-distribution postprocessing", *Phys. Rev. A* **81**, 012318 (2010), DOI 10.1103/PhysRevA.81.012318 | **VERIFIED** (source of the γ random-sampling term in R3 Eq. (5)) |
| R15 | Tomamichel, Lim, Gisin, Renner 2012 | Nat. Commun. | "Tight finite-key analysis for quantum cryptography", *Nat. Commun.* **3**, 634 (2012), DOI 10.1038/ncomms1631 | **VERIFIED** (ref [24] inside R3) |
| R16 | Tomamichel & Leverrier 2017 | Quantum | "A largely self-contained and complete security proof for quantum key distribution", *Quantum* **1**, 14 (2017), DOI 10.22331/q-2017-07-14-14 | **VERIFIED** |
| R17 | Wegman & Carter 1981 | JCSS | M. N. Wegman, J. L. Carter, "New hash functions and their use in authentication and set equality", *J. Comput. Syst. Sci.* **22**, 265–279 (1981) | **VERIFIED** (ref [26] inside R3) |
| R18 | Tupkary et al. 2025 review | arXiv | D. Tupkary, E. Y.-Z. Tan, S. Nahar, L. Kamin, N. Lütkenhaus, "QKD security proofs for decoy-state BB84: protocol variations, proof techniques, gaps and limitations", arXiv:2502.10340 (2025) | **VERIFIED** (preprint) |
| R19 | Tupkary, Nahar, Tan 2026 | arXiv | "Authentication in Security Proofs for Quantum Key Distribution", arXiv:2601.17960 (2026) | **VERIFIED** (preprint) |
| R20 | Nahar, Tupkary, Lütkenhaus 2026 | Quantum | "Imperfect detectors for adversarial tasks with applications to quantum key distribution", *Quantum* **10**, 2044 (2026), DOI 10.22331/q-2026-03-24-2044 | **VERIFIED** |
| R21 | Tupkary, Nahar, Sinha, Lütkenhaus 2025 | Quantum | "Phase error rate estimation in QKD with imperfect detectors", *Quantum* **9**, 1937 (2025), DOI 10.22331/q-2025-12-11-1937 | **VERIFIED** |
| R22 | Tupkary, Tan, Lütkenhaus 2024 | PRR | "Security proof for variable-length quantum key distribution", *Phys. Rev. Research* **6**, 023002 (2024), DOI 10.1103/PhysRevResearch.6.023002 | **VERIFIED** |
| R23 | Lucamarini et al. 2015 | PRX | M. Lucamarini, I. Choi, M. B. Ward, J. F. Dynes, Z. L. Yuan, A. J. Shields, "Practical security bounds against the Trojan-horse attack in quantum key distribution", *Phys. Rev. X* **5**, 031030 (2015), DOI 10.1103/PhysRevX.5.031030 | **VERIFIED** (via R1 reference list) |
| R24 | Zapatero, Navarrete, Curty 2021 | Quantum | "Security of quantum key distribution with intensity correlations", *Quantum* **5**, 602 (2021), DOI 10.22331/q-2021-12-07-602 | **VERIFIED** |
| R25 | Nahar, Upadhyaya, Lütkenhaus 2023 | PR Applied | "Imperfect phase randomization and generalized decoy-state quantum key distribution", *Phys. Rev. Applied* **20**, 064031 (2023), DOI 10.1103/PhysRevApplied.20.064031 | **VERIFIED** (via R1 reference list) |
| R26 | Lenart et al. 2025 | Comms. Phys. | A. Lenart, T. Islam, S. Sivasankaran, P. Neilson, B. Hidding, D. K. L. Oi, A. Ling, "Comparing a radiation damage model for avalanche photodiodes through in-situ observation of CubeSat based devices", *Commun. Phys.* **8**, 118 (2025) | **VERIFIED via R1 reference list only** (secondary; used only as evidence that on-orbit detector aging is measurable, not for any number) |

**No fabricated references. All "VERIFIED via reference list only" entries are flagged as secondary verification.**

---
## MISSION 1 — Characterization-to-proof bridge (pipeline specification)

### 1.1 The Tan–Nahar framework (R1) and its requirements

R1 (Tan & Nahar, PRX Quantum 7, 020342 (2026)) formalizes exactly the gap Q-Orbit sits in: a security proof is conditional on the devices lying in a **model class** `U_models` with parameters θ (e.g. dark-count rate, detector efficiency, misalignment, intensity error). Their framework, verified from the published/arxiv text:

- **Robust domain requirement (proof side).** The security proof must establish a *robust parameter set* `S_robust`: a nontrivial region of parameter space (e.g. an interval [θ_low, θ_upp]) such that the QKD protocol is ε-secure for **every** device whose true parameters lie in `S_robust`. A proof valid only at a point value ("nominal") does **not** meet this requirement. This is precisely why "datasheet nominal = security bound" is forbidden in Q-Orbit.
- **Certification requirement (characterization side).** The certification/characterization procedure must construct, for *every* parameter relevant to the proof, a **confidence interval** at a stated confidence level 1 − δ_j, and must **reject** the device if any interval is not contained in the pre-designated robust range for that parameter.
- **What may and may not be concluded.** R1 proves rigorous statements about the *joint* output of (certify, then run many protocol instances). Critically, it shows one **cannot** validly claim "conditioned on certification approving, the device is secure with high probability" — that is a conditional-probability conflation (P(approve | insecure) small does not imply P(insecure | approve) small without a Bayesian prior on devices, which the cryptographic framework does not admit). The valid statement is a single joint failure bound: Pr[certification approves AND subsequent key is insecure] ≤ ε_char + ε_protocol.
- **Characterization result vs proof condition (the key distinction).** A *characterization result* is a statistical statement about the specific device tested, under the test conditions, valid except with probability δ_j. A *proof condition* is a hypothesis about the device *during protocol operation*. The bridge between them requires (i) transportability: the test conditions must cover the operational conditions (see repetition matrix, §1.4), and (ii) the failure probabilities must be composed (see §1.5). Appendix B of R1 additionally treats adaptive protocols in which parameter estimates from characterization feed protocol settings — relevant if Q-Orbit ever chooses intensities/basis bias from measured values.
- **Composability (Appendix C of R1).** Connections to Abstract Cryptography (Maurer–Renner, ICS 2011) are discussed; some technical aspects of full composable integration of certification remain open per R1, so Q-Orbit should adopt the conservative union-bound rule of §1.5.

### 1.2 Pipeline stages (specification)

For each proof-relevant parameter θ_j (e.g. detector dark-count probability p_dc, detection efficiency η, optical misalignment e_mis, source mean photon numbers {μ₁, μ₂, μ₃}, intensity-setting error, afterpulsing, background count rate, basis-dependent detection asymmetry):

```
Stage A  PHYSICAL MEASUREMENT (specified, not authorized)
         Define: measurand, instrument, operating envelope E (time, temperature,
         wavelength, polarization, optical power, count rate, age), sample plan
         (n_j trials), and calibration traceability.

Stage B  RAW OBSERVABLE
         Count statistics (k_j successes / detections out of n_j trials) or
         bounded continuous readings x_1..x_n. No model fitting beyond the
         estimator justified in Stage C.

Stage C  STATISTICAL CONFIDENCE INTERVAL at confidence 1 − δ_j
         (machinery per parameter type in §1.3). Output: [θ_j^low, θ_j^upp].

Stage D  PROOF-COMPATIBLE PARAMETER
         Map the interval to the direction that is ADVERSARIAL for the key rate
         (e.g. upper endpoint for p_dc and e_mis; worst-case endpoint for μ
         per its appearance in decoy Eqs. (2)–(5) of R3). The result is a
         bound that holds except with probability δ_j.

Stage E  ENTRY INTO KEY-LENGTH COMPUTATION
         Feed the worst-case endpoint into the R3/R2 formula structure. The
         key-length function must be monotone-checked so that the chosen
         endpoint is indeed worst-case within S_robust.

Stage F  ALLOWED CLAIM CLASS
         Only claims of the form: "IF all Stage-C intervals cover the true
         parameters AND the device remains within the characterized envelope
         during operation, THEN the output key is (ε_c + ε_s + ε_char,
         drift)-secure, with ε_char ≡ Σ_j δ_j (defined once, §1.5 — the
         earlier "Σδ_j + ε_char" rendering double-counted; red-team C3)." No point-value claims; no claims conditioned on
         certification approval alone (R1 §1.2 prohibition).
```

### 1.3 Statistical machinery per parameter type

| Parameter type | Estimator/observable | Appropriate machinery | Failure prob. | Reference |
|---|---|---|---|---|
| Binomial fraction (dark-count probability per gate, bit-error fraction, QBER on a test sample, afterpulse probability) | k successes / n i.i.d. trials | **Clopper–Pearson exact interval** (invert beta-binomial test); never Gaussian approximation at security boundary | δ_j (two-sided, split δ_j/2 per tail) | R9 (Clopper–Pearson 1934) |
| Bounded i.i.d. sample mean (efficiency estimates, intensity monitor means, timing-jitter means) | (1/n)Σx_i, x_i∈[a,b] | **Hoeffding's inequality**: Pr[\|mean−E\|≥t] ≤ 2 exp(−2nt²/(b−a)²) | δ_j = 2 exp(−2n t²) | R10 (Hoeffding 1963) |
| Subsampling without replacement (phase-error inference from Z-basis test set to X-basis key set) | hypergeometric | **Serfling bound** / Fung–Ma–Chau random-sampling γ function (as used in R3 Eq. (5)) | δ from γ(δ,·) | R11 (Serfling 1974), R14 (Fung–Ma–Chau 2010) |
| Correlated/sequential trials (repeated characterizations with drift, detector memory, count-rate-dependent behavior, intensity correlations across pulses) | martingale difference sequence | **Azuma–Hoeffding**; if increments depend on unconfirmed/adaptive side information, **Kato's inequality** (designed for QKD-type correlated estimation) | δ_j from bounded increments | R12 (Azuma 1967), R13 (Kato 2020) |
| Multi-parameter joint coverage (the full parameter vector θ) | intersection of per-parameter intervals | **Union bound**: δ_char = Σ_j δ_j (Bonferroni; no independence assumption required) | Σδ_j | elementary; consistent with R1 |
| Drift/aging between characterization and use | two (or more) characterization campaigns at times t₁<t₂, or envelope testing | worst-case interval: take union hull of intervals over the envelope; if a Lipschitz/linear drift model is *assumed*, that assumption is itself a proof condition and must be listed in U_models | additive δ per campaign | R1 §3–4 (requirement that proof cover the whole envelope), R26 (existence of on-orbit aging measurements) |

### 1.4 Characterization-repetition matrix (specification only)

Characterization at a single operating point never covers the proof. For each dimension, the drift/stability evidence required before the characterized interval may be used at other points:

| Dimension | Representative affected parameters | Required drift/stability evidence (specification) | Bounding method |
|---|---|---|---|
| Time (within pass / between passes) | p_dc, η, alignment e_mis, background rate | Repeated CI measurements at ≥2 well-separated epochs within the claimed validity window; demonstrated stationarity (intervals overlap hull) OR trend model with its own proof condition | Worst-case interval = hull of per-epoch CIs; each epoch carries its own δ |
| Temperature | p_dc (strong for APDs/SNSPDs), η, laser μ, timing | CI measurements across the full thermal operating range of the payload; monotonicity evidence or dense-enough grid that hull is conservative | Hull over temperature grid; δ per grid point; union bound |
| Wavelength | η(λ), p_dc(λ), polarization optics | Spectrally resolved CIs covering laser line + tolerances + Doppler-shifted acceptance band | Worst-case over wavelength band |
| Polarization / alignment state | e_mis, basis-dependent η asymmetry | Tomographic/Poincaré-sphere sweep of prepared states; CI on each Stokes/misalignment component | Worst-case misalignment over envelope feeds e_mis^upp |
| Optical power (incl. Trojan-horse-style injected light) | μ settings, p_dc (blinding), modulator response | Power-dependent CI measurements; saturation/blinding threshold bounds | Worst-case over power envelope; injected-power bound becomes proof condition (cf. R23) |
| Count rate / dead time regime | effective η, afterpulsing, pile-up error | Rate-swept CIs from singles to saturation | Worst-case over rate envelope |
| Device age / radiation (on-orbit) | p_dc growth, η degradation | Multi-epoch characterization over mission life; radiation-damage modeling evidence exists in the literature (R26) but Q-Orbit has none of its own | Expanding-interval model: interval at time t = hull of all CIs up to t plus an aging margin that is itself a CHARACTERIZED quantity; without such data the parameter is `UNCHARACTERIZED` for t beyond the last campaign |

**Fail-closed rule:** if any cell lacks evidence, the corresponding parameter is `UNCHARACTERIZED` in that region of the envelope and no numerical key claim may be produced for operations in that region.

### 1.5 Composability rule for ε_char

Let the protocol (Lim/Sidhu structure) be (ε_c + ε_s)-secure *conditional on* parameter vector θ lying in the robust domain S_robust. Let characterization produce joint coverage of S_robust with failure probability ε_char = Σ_j δ_j (union bound over all parameters and all repetition cells). Then the only valid end-to-end statement is the joint one (R1 Proposition 2.1 structure):

> Pr[ (key insecure OR incorrect) AND certification approved ] ≤ ε_c + ε_s + ε_char.

Rules:
1. ε_char **adds linearly** (union bound) to the protocol epsilons; it does not multiply, and it cannot be hidden "inside" ε_s unless ε_s is explicitly re-derived to include it.
2. In the frozen fixture's current margin equation there is **no** ε_char term; therefore, with zero characterization performed, the equation at present computes a number conditioned on an *assumed* parameter point, which under R1 supports **no security claim**. This is the formal statement of the project rule "no nominal datasheet value may be treated as a security bound."
3. If authentication of the classical channel is instantiated via ε_auth-secure MACs (Wegman–Carter, R17; and R19 for rigorous placement), ε_auth adds the same way.
4. Any adaptive re-use of characterization data inside the protocol (e.g. re-optimizing intensities from measured μ) triggers R1 Appendix B analysis, not the plain union bound.

---
## MISSION 2 — Security-budget architecture

### 2.1 Does the current treatment need expansion?

**Yes.** The margin equation shows only ε_s and ε_c. In the Lim et al. (R3) construction that the fixture descends from, ε_s is itself a **bundle of 21 failure probabilities** (§2.3), so the fine-grained budget exists but is invisible. In addition, two epsilon classes required by the composable-security literature are **absent**: device-characterization failure ε_char (R1) and authentication failure ε_auth (R7, R19). The recommended architecture is an explicit epsilon ledger: every failure probability is a named ledger entry with (value or SYMBOLIC), proof entry point, and evidence pointer; the total security parameter is the sum of all entries.

### 2.2 Security-budget table

| Term | Mathematical meaning | Entry point in proof | Required evidence | Reference | Instantiated in frozen fixture? |
|---|---|---|---|---|---|
| ε_s (secrecy) | Trace-distance secrecy: (1−p_abort)·½‖ρ_KE − U_K⊗ρ_E‖₁ ≤ ε_s | Security definition; produced by leftover-hash lemma applied to smooth min-entropy | Full proof chain + all sub-epsilons below | R4 (Renner 2005), R8 (Ben-Or et al. 2005), R7 (Portmann–Renner 2022), R3 | **YES** (visible; bundles the 21 sub-terms) |
| ε_c (correctness) | Pr[S_A ≠ S_B] ≤ ε_c | Error-verification with 2-universal hashing; costs ⌈log₂(2/ε_c)⌉ key bits (the log₂(2/ε_c) term) | Hash-family property (R17); implemented tag length | R3, R17 | **YES** |
| ε_PE[vacuum] (s_{X,0} lower bound) | Failure of the Hoeffding bounds entering the vacuum-yield estimate | R3 Eq. (2); uses n^−_{X,μ₃}, n^+_{X,μ₂} (2 one-sided deviations → 2ε₁ terms) | Detection counts per intensity; Poisson photon-number model for source | R3, R10, Ma et al. PRA 72, 012326 (2005) | **IMPLICIT** (inside the 21; not separately visible) |
| ε_PE[single-photon] (s_{X,1} lower bound) | Failure of bounds in single-photon yield estimate | R3 Eq. (3); 3 one-sided deviations in X + 5 in Z (with s_{Z,0}, s_{Z,1}) → the "10ε₁" block | Same as above + intensities μ₁,μ₂,μ₃ known/characterized | R3, R10 | **IMPLICIT** (inside the 21) |
| ε_PE[phase error] (φ_X upper bound) | Failure of (i) error-count fluctuation bounds m^±_{Z,k} (2ε₂) and (ii) random-sampling-without-replacement bound (α₁, via γ of R14) | R3 Eqs. (4)–(5) | Z-basis error counts; basis-independent sampling validity | R3, R11, R14 | **IMPLICIT** (inside the 21) |
| α₂, α₃ (chain-rule split terms) | Smoothing parameters paid when splitting H_min over vacuum/single/multi-photon substrings; cost [2log₂(1/α₂)+1] + [2log₂(1/α₃)+1] (chain-rule constants, R3 supp. Eq. (13)) | Entropic chain rules (Vitanov et al. IEEE TIT 59, 2603 (2013), cited in R3) | None beyond proof | R3 supp. Eq. (14) | **IMPLICIT** (inside the 21; contributes 4·log₂(21/ε_s)+2 bits) |
| ν̄ (PA hashing term) | Leftover-hash-lemma failure: 2log₂(1/(2ν̄)) penalty | Privacy amplification step (R5) | 2-universal hash implementation | R5, R4 | **IMPLICIT** (inside the 21; contributes 2·log₂(21/ε_s)−2 bits — the +2 chain-rule constants cancel the PA −2; §2.3) |
| ε_char (device-characterization confidence failure) | Joint probability that any characterization CI fails to cover the true parameter (Σδ_j over parameters × envelope cells) | **Precondition of the proof**: S_robust membership; enters the final guarantee by union bound (§1.5) | Characterization campaign per §1.2–§1.4: Clopper–Pearson/Hoeffding/Serfling/Azuma–Kato intervals with stated δ_j | R1 (Tan–Nahar 2026), R9–R13 | **NO — SYMBOLIC ONLY — CHARACTERIZATION REQUIRED** |
| ε_auth (authentication failure) | Probability that classical-channel authentication is forged (information-theoretic MAC, per-message and key-consumption accounting) | The classical channel of the protocol; without it no composable QKD security statement holds (R19) | ε_auth-secure MAC construction; key-rate cost of authentication key | R7 (RMP 94, 025008), R17, R19 | **NO — SYMBOLIC ONLY — CHARACTERIZATION REQUIRED** (and protocol-specification required: tag lengths, key recycling policy) |
| ε_EC (error-correction robustness) | Probability EC fails to converge (distinct from hash verification, which catches failures) | λ_EC model; conservative proofs charge leak_EC + log₂(1/ε_EV) and count EC failure in ε_c | EC implementation failure statistics, or absorb into ε_c via verification | R16 (Tomamichel–Leverrier 2017), R14 | **PARTIAL** — λ_EC appears, but its value f_EC·n·h₂(QBER) presupposes a characterized f_EC and a converged EC; verification hash makes this sound only if ε_c covers it |
| ε_⊥ / abort-conditioned terms (variable length) | If key length is chosen from observed statistics (satellite pass with time-varying loss), the accept/abort and length choice need a variable-length proof | Whole protocol structure | Variable-length security proof | R22 (Tupkary–Tan–Lütkenhaus PRR 6, 023002 (2024)) | **NO** — fixture is fixed-length; **SYMBOLIC ONLY** unless protocol changed |
| ε_model (model-validity residual: e.g. detector-memory, correlations, phase-randomization imperfection) | Probability/distance by which real devices exit U_models | Not representable as a number inside the current proof; requires proof modification (Mission 3, Cat. 3) | Characterization + new proof | R20, R21, R24, R25, R23 | **NO — NOT REPRESENTABLE in current proof** |

**Anti-fabrication rule applied:** no epsilon may be assigned a numeric value by the software except ε_s and ε_c targets chosen by the user as *requirements*; all δ_j, ε_char, ε_auth remain symbolic until their evidence columns are populated.

### 2.3 Analysis of the penalty structure 6·log₂(21/ε_s) + log₂(2/ε_c) and the meaning of "21"

From R3 supplementary material (verified, arXiv:1311.7129 supp. Eqs. (11)–(14)):

ε_sec = 2(2α₁ + α₂ + α₃) + ν̄ + 10ε₁ + 2ε₂, and setting every constituent error term to a common value ε yields **ε_sec = 21ε**. The 21 counts, term by term:

- **4 α₁-terms** — α₁ is simultaneously (i) the smoothing parameter of the max-entropy in the entropic uncertainty relation and (ii) the failure probability of the random-sampling phase-error bound (R14 γ-function). It enters ν = 2α₁ + α₂ + (α₃ + 2α₄ + α₅) and is doubled by the prefactor 2[·], giving weight 4.
- **2 α₂-terms** — chain-rule smoothing for the vacuum/multi-photon split; costs 2log₂(1/α₂)+1 key bits (the +1 is the chain-rule constant, R3 supp. Eq. (13)).
- **2 α₃-terms** — second chain-rule split; costs 2log₂(1/α₃)+1 key bits.
- **1 ν̄-term** — privacy-amplification (leftover hash lemma) failure; costs 2log₂(1/(2ν̄)) key bits.
- **10 ε₁-terms** — ten one-sided Hoeffding bounds on detection counts: 2 for the vacuum yield (n^−_{X,μ₃}, n^+_{X,μ₂}), 3 for the X-basis single-photon yield (n^−_{X,μ₂}, n^+_{X,μ₃}, n^+_{X,μ₁}), and 5 for the Z-basis quantities s_{Z,0}, s_{Z,1} used in the phase-error estimate.
- **2 ε₂-terms** — two one-sided Hoeffding bounds on Z-basis error counts (m^+_{Z,μ₂}, m^−_{Z,μ₃}) feeding the single-photon error bound v_{Z,1}.

Total: 4+2+2+1+10+2 = **21**.

The **6·log₂(21/ε_s)** key-bit penalty = [2log₂(1/α₂)+1] + [2log₂(1/α₃)+1] + 2log₂(1/(2ν̄)) under the symmetric choice α₂=α₃=ν̄=ε_s/21, which evaluates to **exactly** 6·log₂(21/ε_s): the two +1 chain-rule constants cancel the −2 from the factor 2 inside the PA term (R3 supp. Eqs. (13)–(14)). Without the +1 terms the right-hand side is short by exactly 2 bits (verified numerically at ε_s = 1e-10: the difference is 2.0 exactly) — an earlier draft of this section omitted the +1 constants (red-team C2). The **log₂(2/ε_c)** penalty is the error-verification hash tag length (R17 2-universal hashing). The equal-split choice 21ε is a convenience, not optimal; per-parameter optimization of the split is legitimate and does not change the proof (R3 sets α₄=α₅=0, absorbing multi-photon contributions as fully insecure — the PNS worst case).

**Consequences for Q-Orbit:**
1. The margin equation is internally faithful to R3 **only if** the 21-fold split is respected: the counts n^±, m^± and the γ-function must all be evaluated with deviation parameter ε_s/21 (or a documented non-uniform split summing to ε_s). Using ε_s directly in the fluctuation terms would understate the failure probability by a factor of 21.
2. The 10ε₁ block assumes the decoy analysis holds — which requires the source intensities {μ₁,μ₂,μ₃} to be known values in the model. Under fail-closed rules, {μ_j} are characterization outputs with their own δ_j; hence the current equation, absent characterization, computes a *conditional* number only (§1.5 rule 2).
3. Sidhu et al. (R2) inherit this structure for the satellite downlink (they adopt the R3-style bound); the fixture's use of the same penalty shape is consistent, but the same implicit-budget caveat applies.

---
## MISSION 3 — Numerical-extension triage

Three categories for newly defined parameters. Category 1 items may be implemented **symbolically now** (equations only, no numeric value assigned). Category 2 items require characterization data — any numeric run is meaningless (and must be refused) without measured bounds. Category 3 items require a **different security proof** and cannot be represented by modifying the existing count/QBER scalar model.

### Category 1 — Safe to implement symbolically NOW

All are pure functions of (counts, epsilon ledger, hash parameters); none assigns a physical value.

1. **Clopper–Pearson interval constructor** (R9):
   ```
   cp_upper(k, n, δ)  = Beta.ppf(1−δ/2, k+1, n−k)   # k of n failures
   cp_lower(k, n, δ)  = Beta.ppf(δ/2, k, n−k+1)
   # returns interval + carries δ as metadata; REFUSES to return point estimate
   ```
2. **Hoeffding deviation function** (R10): `δ_hoeff(n, ε) = sqrt(n/2 · ln(1/ε))` for {0,1} observables; general bounded version with range (b−a). Symbolic in (n, ε).
3. **Serfling / Fung–Ma–Chau random-sampling γ function** (R11, R14): implement R3 Eq. (5) γ(a,b,c,d) symbolically:
   `γ = sqrt[ (c+d)(1−b)b / (cd ln 2) · log2( (c+d)/(cd(1−b)b) · 1/a² ) ]`.
4. **Azuma/Kato placeholder interface** (R12, R13): function signature `martingale_bound(increments_bounds, n, δ)`; implementable now since it is distribution-free; used only when Stage-B data show trial-to-trial correlation.
5. **Epsilon ledger / union-bound combiner**: `ε_total = ε_c + ε_s + ε_char + ε_auth`, with `ε_char ≡ Σ_j δ_j` defined once (union bound over parameters × envelope cells, §1.3/§1.5); Σ_j δ_j must never appear as a separate summand alongside ε_char — that double-counts the characterization deltas (red-team C3); every term a tagged symbolic object carrying (name, proof entry point, evidence pointer, status ∈ {INSTANTIATED, IMPLICIT, SYMBOLIC}).
6. **21-split validator for the margin equation**: validates the effective deviation parameter / documented split (β = ln(21/ε_s) semantics; the frozen fixture's internal /21 application is ACCEPTED); raises on an unscaled ε_s used directly as the effective deviation parameter (e.g. β = ln(1/ε_s)) — aligned with D6 §4.2/§6 (red-team F-06).
7. **Worst-case-endpoint selector**: given CI [θ^low, θ^upp] and a proof-declared monotonicity direction per parameter, return the adversarial endpoint; REFUSES if the key-rate function's monotonicity in that parameter over S_robust is undeclared.
8. **Margin/key-length evaluator (conditional mode)**: evaluates M only when every parameter input is tagged either `CHARACTERIZED(interval, δ, envelope)` or `ASSUMED` — and any output containing ≥1 `ASSUMED` input is watermarked `NO SECURITY CLAIM — CONDITIONAL COMPUTATION` and excluded from any reportable security statement.

### Category 2 — Requires characterization data (numeric run meaningless without measured bounds)

| Parameter | Why a numeric run is meaningless without data | Anti-fabrication guard (software must refuse to…) |
|---|---|---|
| Detector dark-count probability p_dc | Enters error model and vacuum-yield accounting directly; unmeasured ⇒ phase-error bound φ_X unfounded | …accept any scalar p_dc lacking (CI, δ, temperature, age, count-rate envelope); …import datasheet "typical" values |
| Detection efficiency η_Bob(λ, T, rate, age) | Sets s_{X,0}, s_{X,1} scale; efficiency mismatch variants are Cat. 3 | …accept η without spectral/thermal envelope and drift evidence per §1.4 |
| Optical misalignment e_mis | Direct additive term in QBER ⇒ φ_X; polarization-orbit drift on downlink | …accept e_mis without polarization-sweep CI and per-pass stability evidence |
| Source mean photon numbers μ₁, μ₂, μ₃ and their setting errors | The decoy Eqs. (2)–(5) presuppose exactly known μ's; tolerance enters the proof's U_models | …treat commanded intensity as realized intensity; …run decoy bounds with μ tolerance = 0 |
| Vacuum-intensity quality (μ₃ = 0 residual) | "Vacuum" decoy with nonzero residual changes s_{X,0} bound | …set μ₃ = 0 without an upper-bounded residual CI |
| Background/stray-light count rate (daylight, moonlight, pointing-dependent) | Dominates QBER in some passes; pass-dependent | …extrapolate background outside measured pointing/illumination envelope |
| Afterpulse probability p_ap | Error-model term in R3-style system models | …include/exclude p_ap without measurement |
| Error-correction efficiency f_EC | λ_EC = f_EC·n·h₂(e_obs); unmeasured f_EC silently inflates/deflates key | …hardcode f_EC; require implementation-evidenced value or treat λ_EC as symbolic |
| Authentication key cost / tag lengths | Determines ε_auth and net key | …emit "net key" numbers with authentication cost = 0 |
| Aging/drift margins (radiation, thermal cycling) | Validity of any CI at future epoch t | …apply a CI outside its validity window; …ship keys for epochs beyond last characterization without an (itself characterized) aging model |

### Category 3 — Requires a DIFFERENT security proof (cannot be a scalar tweak of the count/QBER model)

| Feature | Why the current proof cannot absorb it | Proof required (verified refs) | Anti-fabrication guard (software must refuse to…) |
|---|---|---|---|
| Pulse-to-pulse intensity correlations | R3's decoy analysis assumes i.i.d. intensity choices; correlations break the conditional-probability structure p_{k|n} | R24 (Zapatero–Navarrete–Curty, Quantum 5, 602 (2021)); Sixto et al. PRA Applied 18, 044069 (2022); Marwah–Dupuis arXiv:2402.12346 (2024) | …represent correlation as a scalar jitter on μ; …emit any key number if correlation evidence exists but the proof used is R3-style |
| Imperfect phase randomization | Decoy method's photon-number channel (τ_n) presupposes phase-randomized WCP; coherent attacks (USD) invalidate | R25 (Nahar–Upadhyaya–Lütkenhaus, PR Applied 20, 064031 (2023)); Currás-Lorenzo et al. QST 9, 015025 (2023) | …model phase-randomization imperfection as added QBER |
| Source leakage / Trojan-horse | Side-channel light egress is outside the count/QBER model entirely | R23 (Lucamarini et al., PRX 5, 031030 (2015)); Tamaki et al. NJP 18, 065008 (2016); Sixto et al. QST 10, 035034 (2025) | …emit security claims while leakage bound fields are empty |
| Detector efficiency mismatch / detector imperfections incl. memory | The R3 proof needs basis-independent detection probability; mismatch requires explicit squashing/flag-state analysis | R20 (Nahar–Tupkary–Lütkenhaus, Quantum 10, 2044 (2026)); R21 (Tupkary et al., Quantum 9, 1937 (2025)); Zhang et al. PRR 3, 013076 (2021) | …fold mismatch into scalar η; …run with mismatch fields nonzero under the R3 fixture |
| Variable-length / adaptive key length (per-pass adaptive M) | Fixed-length accept/abort proof does not cover length chosen from observed pass statistics | R22 (Tupkary–Tan–Lütkenhaus, PRR 6, 023002 (2024)) | …label pass-adaptive key outputs with the fixed-length ε_s/ε_c semantics |
| Full Tan–Nahar certification composition | Certification + multi-instance operation is a new composed system, not an R3 protocol instance | R1 (Tan–Nahar 2026), incl. its Appendices B–C | …emit "certified secure" language; only the joint-bound language of §1.5 is permitted |

---

## Consolidated current-state verdict

1. The margin equation is a faithful transcription of R3 Eq. (1) (penalty 6·log₂(21/ε_s) + log₂(2/ε_c)); the "21" is the 21 constituent failure terms enumerated in §2.3, and its correct use requires the ε_s/21 (or documented non-uniform) split in all fluctuation sub-terms.
2. With ZERO characterization, every proof-relevant device parameter is `UNCHARACTERIZED`; by R1 the computed M supports **no security claim** — only a conditional computation. Status: **BLOCKED for security claims; open for symbolic/conditional computation** under Category-1 rules.
3. The security budget must be expanded to include at least ε_char (union of per-parameter δ_j over the §1.4 envelope) and ε_auth; both are currently SYMBOLIC ONLY — CHARACTERIZATION REQUIRED.
4. Any addition of correlations, imperfect phase randomization, leakage, detector mismatch/memory, or adaptive length moves the parameter to Category 3 and forces a proof swap, not a scalar edit.

*End of Agent E deliverable.*
