# Q-Orbit V0.17-TA1 — Architecture Specification (DELIVERABLE 6)

**Document ID:** QO-P1-D6 | **Version:** 1.0 | **Date:** 2026-08-27
**Objective title:** *Q-Orbit V0.17-TA1 — Proof-Profile Selection and Device-Parameter Mapping.*
**Basis:** Agent C (source imperfections S1–S8), Agent D (detector/receiver effects), Agent E (characterization-to-proof bridge, security budget, triage), Deliverable 5 (consolidated 15-effect matrix), Canonical Facts Record QO-CFR-001 v1.1, Phase 1 Canonical Audit.
**Policy:** fail-closed; theoretical only; no empirical data invented; every reference from the verified registers of the input briefs only; no hardware-procurement or field language.

---

## 1. Objective

**Q-Orbit V0.17-TA1 — Proof-Profile Selection and Device-Parameter Mapping.** V0.17 is a purely theoretical increment. Its function is to convert the 15 unmapped or partially mapped device imperfections (Deliverable 5 §2) into **bounded, proof-compatible parameter specifications** — symbolic parameters with declared proof entry points, declared evidence requirements, and declared confidence accounting — **without inventing any empirical value**. V0.17 changes no physics claims and produces no device security conclusions; it specifies the mathematical and software architecture by which future characterization evidence, if it ever exists, could enter a security proof. The frozen V0.16 fixture remains the immutable regression reference (§2). This document is a *specification*, not an authorization to measure anything (Agent E convention).

---

## 2. Mathematical scope — what changes and what is frozen

**Frozen (immutable regression reference):**
- The V0.16-TA1 fixture in its entirety: margin equation `M = s_X,0 + s_X,1·[1 − h2(φ_X)] − λ_EC − 6·log2(21/ε_s) − log2(2/ε_c)` (Lim et al., PRA 89, 022307, 2014 structure, VERIFIED; Sidhu et al., npj QI 8, 18, 2022 fixture, VERIFIED), the 8 software-contract scalars (TH-PAR-001…008), the deterministic screen (41×41 = 1,681 points; CFR N-07), the window rule, the 12-test regression suite (CFR N-13), the 20-check audit (CFR N-14), and all locked numerics (CFR §2). V0.17 must reproduce the V0.16 fixture **bit-exactly** whenever V0.17 features are disabled or run in fixture-compatibility mode (§7).
- The prohibited-claims register (CFR §4) and the boundary states (CFR B-02).

**Changed (new, additive, non-destructive):**
- A **symbolic parameter registry** (§3) holding the new proof-facing parameters, all `SYMBOLIC ONLY — CHARACTERIZATION REQUIRED` unless explicitly exempt.
- An **epsilon ledger** with union combiner, 21-split validator, and the new epsilon classes ε_char, ε_auth, ε_varlen (§4), extending the security budget beyond the visible ε_s/ε_c pair.
- **Category-1 statistical constructors** (Clopper–Pearson, Hoeffding, Serfling/Fung, Azuma/Kato interfaces) per Agent E Mission 3 Category 1 — implementable now because they are pure functions of (counts, epsilons, hash parameters) and assign no physical value.
- **Anti-fabrication guards** for Category 2 (refusal rules on uncharacterized scalars) and Category 3 (refusal rules on representing proof-requiring features as scalar tweaks), per Agent E Mission 3.
- **Claim labeling** on every output (§6, §9).

**Explicitly not in scope:** any numerical assignment to any device parameter; any hardware, procurement, field, deployment, or mission-capability statement; any modification of the protocol (efficient-BB84, 1 signal + 2 decoys, one vacuum) — protocol-changing alternatives (e.g. MDI relocation of the measurement, loss-tolerant three-state encoding) are recorded as *proof-profile candidates*, not as V0.17 configuration.

---

## 3. New symbolic parameters table

All entries are `SYMBOLIC ONLY — CHARACTERIZATION REQUIRED` unless marked otherwise. "Proof entry point" names the proof machinery that consumes the parameter (references from the verified registers only). Effect numbers refer to Deliverable 5 §2.

| Name | Symbol | Meaning | Proof entry point | Instantiation status |
|---|---|---|---|---|
| Phase-distribution bound | `Δ_PR` (deviation of the global-phase PDF from uniform; parameterized per the admissible class of the chosen proof) | Bounds imperfect phase randomization (effect 1) | Generalized decoy with imperfect PR: Nahar–Upadhyaya–Lütkenhaus, PR Applied 20, 064031 (2023); Currás-Lorenzo et al., QST 9, 015025 (2023); faulty active PR: Sixto et al., EPJ Quantum Technol. 10, 53 (2023) | SYMBOLIC ONLY — CHARACTERIZATION REQUIRED |
| Encoding-correlation bound | `(ℓ_enc, ξ_enc)` — correlation length and correlation-strength bound (effect 2) | Bounds pulse-to-pulse encoding memory | Correlated-source proofs: Nagamatsu PRA 93, 042325 (2016); Mizutani npj QI 5, 8 (2019); Pereira Sci. Adv. 6, eaaz4487 (2020); unbounded: Pereira QST 10, 015001 (2025); statistics: Azuma/Kato | SYMBOLIC ONLY — CHARACTERIZATION REQUIRED |
| Intensity-correlation bound | `(ℓ_μ, ξ_μ)` — correlation length and conditional-intensity deviation bound (effect 3) | Bounds pulse-to-pulse intensity correlation | Zapatero–Navarrete–Curty, Quantum 5, 602 (2021); Sixto–Zapatero–Curty, PR Applied 18, 044069 (2022); unbounded ℓ via Pereira QST 10, 015001 (2025) | SYMBOLIC ONLY — CHARACTERIZATION REQUIRED |
| Intensity interval bounds | `[μ_j^−, μ_j^+]` per setting j ∈ {1,2,3} (incl. vacuum-residual upper bound `μ_3^+`) | Replaces exact {μ_j}; bounds independent fluctuations incl. systematic offset (C S3) | Mizutani et al., NJP 17, 093011 (2015) finite-key with fluctuating intensities; decoy estimation run as optimization over intervals | SYMBOLIC ONLY — CHARACTERIZATION REQUIRED |
| State-preparation-flaw parameters | `δ_spf` (Bloch-sphere deviation / pairwise overlaps) **or** measured quantum-coin `Δ` **or** loss-tolerant three-state flaw set | Bounds basis-dependent encoding flaws (effect 4) | Tamaki et al., PRA 90, 052314 (2014); Mizutani NJP 17, 093011 (2015); modified BB84: Pereira PRR 5, 023065 (2023); unified framework: Currás-Lorenzo et al., Optica Quantum 3, 525 (2025); reference-state route cf. Huang et al., PR Applied 19, 014048 (2023, secondary) | SYMBOLIC ONLY — CHARACTERIZATION REQUIRED |
| Leakage / isolation bounds | `I_iso` (isolation, dB, all input ports); `μ_out` (back-reflected mean photon number); distinguishability budget `d_sc` per setting pair | Bounds passive side channels and Trojan-horse leakage (effect 5) | Lucamarini et al., PRX 5, 031030 (2015); Tamaki et al., NJP 18, 065008 (2016); Wang et al., NJP 20, 083027 (2018); Navarrete–Curty QST 7, 035021 (2022); Sixto et al., QST 10, 035034 (2025); unified framework (Optica Quantum 3, 525, 2025) | SYMBOLIC ONLY — CHARACTERIZATION REQUIRED; row 5 remains **BLOCKING** while unmeasured |
| Per-detector efficiency maps | `η_d(t, λ, pol, mode, rate)` per detector d, with mismatch ratio bound `η_min/η_max` per mode coordinate | Replaces scalar TH-PAR-002 with mode-resolved maps (effects 6–12) | Squashing framework (Beaudry PRL 101, 093601, 2008; Gittsovich PRA 89, 012325, 2014); mismatch-bounded proofs (Fung QIC 9, 131, 2009; Lydersen & Skaar QIC 10, 60, 2010; Marøy PRA 82, 032337, 2010; Bochkov–Trushechkin PRA 99, 032308, 2019; Zhang PRR 3, 013076, 2021; Trushechkin Quantum 6, 771, 2022; Marcomini QST 10, 035002, 2025; Grasselli PR Applied 23, 044011, 2025) | SYMBOLIC ONLY — CHARACTERIZATION REQUIRED |
| Dead-time / recovery kernels | `τ_d` distribution per detector; recovery curve `η_d(Δt)`; paralyzable/non-paralyzable identifier; latching threshold | Receiver state machine (effects 6, 7) | Bounded time-dependent mismatch proofs (Fung 2009; Zhang 2021; Bochkov–Trushechkin 2019; Trushechkin 2022); finite-state receiver model with worst-case state sequence | SYMBOLIC ONLY — CHARACTERIZATION REQUIRED |
| Afterpulse conditional click kernel | `P_ap(click_i \| history)`; multi-timescale release law; `p_ap(rate)` function | Correlated-noise model for effect 9 | Martingale finite-key bounds (Azuma 1967; Kato arXiv:2002.04357); physical models Ziarkash Sci. Rep. 8, 5076 (2018), Itzler J. Mod. Opt. 59, 1472 (2012), Horoshko J. Mod. Opt. 64, 191 (2017); estimation Humer JLT 33, 3098 (2015). Note: complete detector-side correlated-afterpulse proof is an **open literature gap** (D5 §6) | SYMBOLIC ONLY — CHARACTERIZATION REQUIRED; proof completion OPEN |
| Characterization failure budget | `ε_char = Σ_j δ_j` (union bound over parameters × envelope cells) | Joint probability that any characterization CI fails to cover its true parameter | Tan–Nahar, PRX Quantum 7, 020342 (2026) certify-then-run; enters the final guarantee additively (§4) | SYMBOLIC ONLY — CHARACTERIZATION REQUIRED |
| Authentication failure | `ε_auth` | Authentication-forgery probability of the classical channel | Wegman–Carter, JCSS 22, 265 (1981); placement: Portmann–Renner RMP 94, 025008 (2022); Tupkary–Nahar–Tan, arXiv:2601.17960 (2026, preprint) | SYMBOLIC ONLY — CHARACTERIZATION REQUIRED (plus protocol specification: tag lengths, key-consumption accounting) |
| Variable-length security term | `ε_varlen` | Failure term when key length/accept is chosen from observed pass statistics | Tupkary–Tan–Lütkenhaus, PRR 6, 023002 (2024) | SYMBOLIC ONLY — dormant unless the protocol is changed to variable-length; fixed-length fixture unaffected |
| Aging envelope bounds | `A_j(Δt)` — interval-growth bound per parameter j vs time/radiation/thermal cycling | Governs validity of every CI at epochs after characterization (effect 15) | Tan–Nahar robust-domain envelope coverage; expanding-interval/hull construction (E §1.4); aging measurability evidence: Lenart et al., Commun. Phys. 8, 118 (2025, secondary — existence only) | SYMBOLIC ONLY — CHARACTERIZATION REQUIRED; parameter UNCHARACTERIZED beyond the last characterized epoch absent a characterized `A_j` |
| Exempt (Category-1, no physical value) | `δ_j` (per-estimator failure probabilities); sampling functions `δ_hoeff`, `γ(·)`; the Azuma/Kato **constructor interface** `martingale_bound(increment_bounds, n, δ)` | Statistical machinery parameters — pure functions of (counts, ε); the exemption covers the constructor *interfaces* only, never their bound-value inputs (red-team C7) | Clopper–Pearson 1934; Hoeffding 1963; Serfling 1974; Fung–Ma–Chau PRA 81, 012318 (2010); Azuma 1967; Kato arXiv:2002.04357 | IMPLEMENTABLE NOW (symbolic; assign no physical value) |
| Martingale increment bounds (Category 2 — moved out of the exempt row, red-team C7) | increment/difference-sequence **bound values** consumed by the Azuma/Kato constructor — physical correlation-strength inputs (e.g. the ξ_enc, ξ_μ and afterpulse-kernel bounds of D5 rows 2, 3, 9, 13) | Bound the martingale difference sequence wherever memory/correlation is present | Azuma 1967; Kato arXiv:2002.04357; D5 rows 2/3/9/13 | **SYMBOLIC ONLY — CHARACTERIZATION REQUIRED** (Category 2: the bound VALUES are physical correlation-strength inputs; numerical evaluation with assumed increment bounds is refused — §6 guard) |

**Category-1 vs Category-2 distinction (explicit, red-team C7):** the Category-1 exemption covers the statistical *constructors* (Clopper–Pearson, Hoeffding, Serfling/γ, and the `martingale_bound` interface) as pure functions of (counts, ε). The *bound values* fed into them — martingale increment bounds and any other correlation-strength parameter — are physical characterization inputs (Category 2, cross-referenced to D5 rows 2/3/9/13) and are never exempt: assuming them would launder uncharacterized correlation strength into a "proof", which the §6 guard layer refuses.

---

## 4. Security-budget architecture

### 4.1 Budget table (from Agent E Mission 2, carried verbatim in structure)

| Term | Mathematical meaning | Entry point in proof | Required evidence | Reference | Instantiated? |
|---|---|---|---|---|---|
| ε_s (secrecy) | (1−p_abort)·½‖ρ_KE − U_K⊗ρ_E‖₁ ≤ ε_s | Security definition; leftover-hash lemma on smooth min-entropy | Full proof chain + all sub-epsilons | Renner thesis 2005; Ben-Or et al. TCC 2005; Portmann–Renner RMP 94, 025008 (2022); Lim et al. PRA 89, 022307 (2014) | YES (visible; bundles the 21 sub-terms) |
| ε_c (correctness) | Pr[S_A ≠ S_B] ≤ ε_c | Error verification with 2-universal hashing; costs ⌈log₂(2/ε_c)⌉ bits | Hash-family property; implemented tag length | Lim 2014; Wegman–Carter 1981 | YES |
| ε_PE[vacuum] (s_X,0 lower bound) | Failure of Hoeffding bounds entering the vacuum-yield estimate (n^−_{X,μ₃}, n^+_{X,μ₂}; 2 one-sided deviations) | Lim 2014 Eq. (2) | Detection counts per intensity; Poisson source model | Lim 2014; Hoeffding 1963; Ma et al. PRA 72, 012326 (2005) | IMPLICIT (inside the 21) |
| ε_PE[single-photon] (s_X,1 lower bound) | Failure of bounds in the single-photon yield estimate (3 one-sided deviations in X + 5 in Z with s_Z,0, s_Z,1 → the "10ε₁" block) | Lim 2014 Eq. (3) | Same + {μ₁,μ₂,μ₃} known/characterized | Lim 2014; Hoeffding 1963 | IMPLICIT (inside the 21) |
| ε_PE[phase error] (φ_X upper bound) | Failure of error-count fluctuation bounds m^±_{Z,k} (2ε₂) and the random-sampling bound (α₁ via γ of Fung–Ma–Chau) | Lim 2014 Eqs. (4)–(5) | Z-basis error counts; validity of basis-independent sampling | Lim 2014; Serfling 1974; Fung–Ma–Chau 2010 | IMPLICIT (inside the 21) |
| α₂, α₃ (chain-rule split terms) | Smoothing parameters for splitting H_min over vacuum/single-/multi-photon substrings; cost [2log₂(1/α₂)+1] + [2log₂(1/α₃)+1] (the +1 chain-rule constants, Lim supp. Eq. (13)) | Entropic chain rules (Vitanov et al., IEEE TIT 59, 2603, 2013, cited in Lim 2014) | None beyond proof | Lim 2014 supp. Eqs. (13)–(14) | IMPLICIT (inside the 21; together 4·log₂(21/ε_s)+2 bits under the symmetric split) |
| ν̄ (PA hashing term) | Leftover-hash-lemma failure; 2log₂(1/(2ν̄)) penalty | Privacy amplification | 2-universal hash implementation | Renner–König TCC 2005; Renner 2005 | IMPLICIT (inside the 21; 2·log₂(21/ε_s)−2 bits under the symmetric split — the chain-rule +2 cancels the PA −2; §4.2) |
| ε_char | Joint probability that any characterization CI fails to cover its true parameter: Σ_j δ_j over parameters × envelope cells | **Precondition** of the proof: S_robust membership; enters by union bound | Characterization campaign per §5 (Clopper–Pearson/Hoeffding/Serfling/Azuma–Kato intervals with stated δ_j) | Tan–Nahar, PRX Quantum 7, 020342 (2026) | NO — SYMBOLIC ONLY — CHARACTERIZATION REQUIRED |
| ε_auth | Authentication-forgery probability (information-theoretic MAC; per-message and key-consumption accounting) | Classical channel of the protocol; without it no composable QKD statement holds | ε_auth-secure MAC; key-rate cost of authentication key | Portmann–Renner RMP 94, 025008 (2022); Wegman–Carter 1981; Tupkary–Nahar–Tan arXiv:2601.17960 (2026, preprint) | NO — SYMBOLIC ONLY — CHARACTERIZATION REQUIRED (+ protocol specification) |
| ε_EC | EC-convergence failure (distinct from hash verification, which catches failures) | λ_EC model; conservative proofs charge leak_EC + log₂(1/ε_EV) and fold EC failure into ε_c | EC implementation failure statistics, or absorb into ε_c via verification | Tomamichel–Leverrier, Quantum 1, 14 (2017); Fung–Ma–Chau 2010 | PARTIAL — λ_EC appears, but f_EC·n·h₂(QBER) presupposes a characterized f_EC and a converged EC; the frozen λ_EC value corresponds to f_EC = 1 (ideal minimum leakage — disclosed limitation, §10 and CFR N-27) |
| ε_varlen | Failure term when key length is chosen from observed statistics | Whole protocol structure | Variable-length security proof | Tupkary–Tan–Lütkenhaus, PRR 6, 023002 (2024) | NO — fixture is fixed-length; SYMBOLIC ONLY unless protocol changes |
| ε_model | Distance/probability by which real devices exit the model class U_models (memory, correlations, PR imperfection, mismatch) | Not representable as a number inside the current proof; requires proof modification (Category 3) | Characterization + new proof | Nahar–Tupkary–Lütkenhaus, Quantum 10, 2044 (2026); Tupkary et al., Quantum 9, 1937 (2025); Zapatero Quantum 5, 602 (2021); Nahar PR Applied 20, 064031 (2023); Lucamarini PRX 5, 031030 (2015) | NO — NOT REPRESENTABLE in the current proof |

**Anti-fabrication rule (binding):** no epsilon may be assigned a numeric value by the software except ε_s and ε_c targets chosen by the user as *requirements*; all δ_j, ε_char, ε_auth remain symbolic until their evidence columns are populated.

### 4.2 The "21" decomposition of 6·log₂(21/ε_s)

From the Lim et al. (2014) supplementary material (verified, arXiv:1311.7129 supp. Eqs. (11)–(14)), the secrecy parameter decomposes as `ε_sec = 2(2α₁ + α₂ + α₃) + ν̄ + 10ε₁ + 2ε₂`, and setting every constituent term to a common value ε gives **ε_sec = 21ε**:

- **4 α₁-terms** — α₁ is simultaneously the smoothing parameter of the max-entropy in the entropic uncertainty relation and the failure probability of the random-sampling phase-error bound (Fung–Ma–Chau γ-function); doubled by the prefactor 2[·].
- **2 α₂-terms** — chain-rule smoothing for the vacuum/multi-photon split; cost 2log₂(1/α₂)+1 (the +1 is the chain-rule constant, Lim supp. Eq. (13)).
- **2 α₃-terms** — second chain-rule split; cost 2log₂(1/α₃)+1.
- **1 ν̄-term** — privacy-amplification (leftover-hash) failure; cost 2log₂(1/(2ν̄)).
- **10 ε₁-terms** — ten one-sided Hoeffding bounds on detection counts: 2 vacuum (n^−_{X,μ₃}, n^+_{X,μ₂}), 3 X-basis single-photon (n^−_{X,μ₂}, n^+_{X,μ₃}, n^+_{X,μ₁}), 5 Z-basis (s_Z,0, s_Z,1 chain).
- **2 ε₂-terms** — two one-sided Hoeffding bounds on Z-basis error counts (m^+_{Z,μ₂}, m^−_{Z,μ₃}) feeding v_Z,1.

Total: 4+2+2+1+10+2 = **21**. The **6·log₂(21/ε_s)** bit penalty = [2·log₂(1/α₂)+1] + [2·log₂(1/α₃)+1] + 2·log₂(1/(2ν̄)) under the symmetric split α₂=α₃=ν̄=ε_s/21, which evaluates to **exactly** 6·log₂(21/ε_s): the two +1 chain-rule constants cancel the −2 contributed by the factor 2 inside the PA term 2·log₂(1/(2ν̄)) (i.e., 2·log₂(1/(α₂α₃ν̄)) = 6·log₂(21/ε_s) with β := (α₂α₃ν̄)²). This matches Lim et al. supp. Eqs. (13)–(14). Without the +1 terms the right-hand side is short by exactly 2 bits (verified numerically at ε_s = 1e-10: 6·log₂(21/ε_s) minus the unaugmented sum = 2.0 exactly); the corrected form is consistent with the frozen fixture's penalty value (CFR N-22). The equal split is a convenience; a documented non-uniform split summing to ε_s is legitimate.

**Correct-use condition (enforced by the V0.17 21-split validator):** every fluctuation/sampling sub-term (all n^±, m^±, γ) must be evaluated with *effective deviation parameter* ε_s/21 (or a documented non-uniform split summing to ε_s) — equivalently, Hoeffding-form bounds must evaluate with β = ln(21/ε_s). The validator checks the **effective deviation parameter / the documented split, not call-site syntax**: the frozen V0.16 fixture passes the unsplit ε_s into `chernoff_bounds(...)` and applies the /21 *internally* as `β = ln(21/ε_s)` — semantically correct (per-bound failure ε_s/21) and explicitly **accepted**; what must raise an error is an unscaled ε_s used as the *effective* deviation parameter (e.g. β = ln(1/ε_s)), which understates the failure probability by a factor of 21.

### 4.3 Composability rule

Additive union bound (conservative; Tan–Nahar Appendix C notes full composable integration has open technical aspects):

> **ε_total = ε_c + ε_s + ε_char (+ ε_auth when the classical channel is instantiated), with ε_char ≡ Σ_j δ_j defined ONCE — the union bound over the characterization confidence intervals (parameters × envelope cells).**

(Red-team C3 correction: an earlier draft of this formula listed Σ_j δ_j as a separate summand alongside ε_char; since ε_char ≡ Σ_j δ_j by definition (§3, §4.1), that form double-counted the characterization deltas. The single-term form above is binding and identical to D3 §6.4.)

Rules: (1) ε_char adds linearly; it does not multiply and cannot be hidden inside ε_s unless ε_s is explicitly re-derived to include it. (2) The frozen margin equation has **no** ε_char term; at zero characterization it computes a number conditional on an assumed parameter point, supporting no security claim (Tan–Nahar; Agent E §1.5 rule 2). (3) ε_auth adds the same way. (4) Adaptive re-use of characterization data inside the protocol (e.g. re-optimizing intensities from measured μ) triggers Tan–Nahar Appendix B analysis, not the plain union bound. (5) The **Tan–Nahar conditional-claim prohibition**: no statement of the form "secure with high probability conditioned on certification approval" is permitted — that is a conditional-probability conflation; only joint bounds of the form Pr[certification approves AND subsequent key insecure] ≤ ε_char + ε_protocol are valid.

---

## 5. Characterization-to-proof pipeline specification

Six stages (Agent E Mission 1). **This is a measurement SPECIFICATION, not an authorization to measure anything.**

```
Stage A  PHYSICAL MEASUREMENT (specified, not authorized)
         Define: measurand, instrument, operating envelope E (time, temperature,
         wavelength, polarization, optical power, count rate, age), sample plan
         (n_j trials), calibration traceability.
Stage B  RAW OBSERVABLE
         Count statistics (k_j / n_j) or bounded continuous readings; no model
         fitting beyond the estimator justified in Stage C.
Stage C  STATISTICAL CONFIDENCE INTERVAL at confidence 1 − δ_j
         (machinery per parameter type, table below). Output: [θ_j^low, θ_j^upp].
Stage D  PROOF-COMPATIBLE PARAMETER
         Map the interval to the ADVERSARIAL endpoint for the key rate (e.g.
         upper endpoint for p_dc, e_mis; worst-case endpoint for μ per its
         appearance in Lim 2014 Eqs. (2)–(5)). Bound holds except w.p. δ_j.
Stage E  ENTRY INTO KEY-LENGTH COMPUTATION
         Feed the worst-case endpoint into the Lim/Sidhu formula structure;
         monotonicity in each parameter must be checked so the chosen endpoint
         is indeed worst-case within S_robust.
Stage F  ALLOWED CLAIM CLASS
         Only: "IF all Stage-C intervals cover the true parameters AND the
         device remains within the characterized envelope during operation,
         THEN the output key is (ε_c + ε_s + ε_char, drift)-secure, with
         ε_char ≡ Σ_j δ_j (defined once; the earlier "Σδ_j + ε_char" form
         double-counted — red-team C3)."
         No point-value claims; nothing conditional on certification approval
         alone (§4.3 rule 5).
```

**Per-parameter statistical machinery:**

| Parameter type | Observable | Machinery | Failure prob. | Reference |
|---|---|---|---|---|
| Binomial fraction (dark count/gate, QBER on test sample, afterpulse probability) | k / n i.i.d. trials | Clopper–Pearson exact interval; never Gaussian at the security boundary | δ_j (two-sided, δ_j/2 per tail) | Clopper–Pearson, Biometrika 26, 404 (1934) |
| Bounded i.i.d. mean (efficiency, intensity-monitor means, jitter means) | (1/n)Σx_i, x_i∈[a,b] | Hoeffding: Pr[\|mean−E\|≥t] ≤ 2exp(−2nt²/(b−a)²) | δ_j = 2exp(−2nt²) | Hoeffding, JASA 58, 13 (1963) |
| Subsampling without replacement (Z-basis test → X-basis key phase-error inference) | hypergeometric | Serfling bound / Fung–Ma–Chau γ (Lim 2014 Eq. (5)) | δ from γ(δ,·) | Serfling, Ann. Statist. 2, 39 (1974); Fung–Ma–Chau PRA 81, 012318 (2010) |
| Correlated/sequential trials (drift, detector memory, rate dependence, intensity correlations) | martingale difference sequence | Azuma–Hoeffding; Kato's inequality when increments depend on unconfirmed/adaptive side information | δ_j from bounded increments | Azuma, Tohoku Math. J. 19, 357 (1967); Kato, arXiv:2002.04357 |
| Multi-parameter joint coverage | intersection of per-parameter intervals | Union bound: δ_char = Σ_j δ_j (Bonferroni; no independence needed) | Σδ_j | elementary; consistent with Tan–Nahar 2026 |
| Drift/aging between characterization and use | ≥2 campaigns at t₁<t₂, or envelope testing | Worst-case hull of intervals over the envelope; any assumed drift model is itself a proof condition in U_models | additive δ per campaign | Tan–Nahar 2026 §3–4; aging measurability: Lenart et al., Commun. Phys. 8, 118 (2025, secondary) |

**Characterization-repetition matrix** (all seven dimensions required before a CI may be used away from its measurement point): time (within/between passes), temperature, wavelength (laser line + tolerances + Doppler-shifted acceptance band), polarization/alignment, optical power (incl. injected-light stress, cf. interaction flag S7×S3), count rate (singles to saturation), device age (multi-epoch; expanding interval + characterized aging margin). Fail-closed: any empty cell ⇒ parameter `UNCHARACTERIZED` in that envelope region; no numerical key claim for operations in that region.

---

## 6. Software changes for V0.17 (module-level)

1. **Symbolic parameter registry** (`registry`): every §3 parameter as a tagged symbolic object carrying (name, symbol, meaning, proof entry point, evidence pointer, status ∈ {INSTANTIATED, IMPLICIT, SYMBOLIC}, envelope). Default status for all device parameters: `SYMBOLIC ONLY — CHARACTERIZATION REQUIRED`.
2. **Epsilon ledger with union combiner and 21-split validator** (`ledger`): computes `ε_total = ε_c + ε_s + ε_char + ε_auth` with `ε_char ≡ Σ_j δ_j` defined once (any composition listing Σ_j δ_j as a separate summand alongside ε_char is rejected as a double count — red-team C3); validates that every fluctuation/sampling sub-term evaluates with *effective deviation parameter* ε_s/21 or a documented split summing to ε_s — the validator inspects the effective deviation parameter, not call-site syntax, so the frozen fixture's internal `β = ln(21/ε_s)` inside `chernoff_bounds` is ACCEPTED, while an unscaled ε_s used as the effective deviation parameter (e.g. `β = ln(1/ε_s)`) raises (red-team C14); refuses to emit "net key" numbers with authentication cost 0.
3. **Category-1 implementations** (`stats`):
   - `cp_upper/cp_lower(k, n, δ)` — Clopper–Pearson constructor via beta-quantile inversion; refuses to return point estimates.
   - `δ_hoeff(n, ε)` and the bounded-range generalization — Hoeffding deviation function.
   - `γ(a,b,c,d)` — Serfling/Fung–Ma–Chau random-sampling function (Lim 2014 Eq. (5) form).
   - `martingale_bound(increment_bounds, n, δ)` — Azuma/Kato interface (distribution-free; used only when Stage-B data show trial-to-trial correlation).
   - **Worst-case-endpoint selector**: given CI [θ^low, θ^upp] and a proof-declared monotonicity direction per parameter, returns the adversarial endpoint; REFUSES if monotonicity over S_robust is undeclared.
   - **Conditional-mode margin evaluator**: evaluates M only when every input is tagged `CHARACTERIZED(interval, δ, envelope)` or `ASSUMED`; any output containing ≥1 `ASSUMED` input is watermarked **`NO SECURITY CLAIM — CONDITIONAL COMPUTATION`** and excluded from any reportable security statement.
4. **Anti-fabrication guards — Category 2** (refusal layer): refuse any scalar without (CI, δ, envelope); refuse datasheet-nominal values; refuse out-of-envelope extrapolation; refuse μ-tolerance = 0 in decoy bounds; refuse μ₃ = 0 without an upper-bounded residual CI; refuse hardcoded f_EC; refuse application of a CI outside its validity window; refuse keys for epochs beyond the last characterization absent a characterized aging model; **refuse numerical evaluation of `martingale_bound` with assumed (uncharacterized) increment bounds** — increment-bound values are Category-2 correlation-strength inputs (§3, red-team C7).
5. **Anti-fabrication guards — Category 3** (proof-swap enforcement): refuse to represent intensity correlations as scalar jitter on μ; refuse phase-randomization imperfection as added QBER; refuse emitting security claims while leakage/isolation bound fields are empty; refuse folding efficiency mismatch into scalar η; refuse running with nonzero mismatch fields under the Lim/Sidhu (R3-structure) fixture; refuse labeling pass-adaptive key outputs with fixed-length ε_s/ε_c semantics; refuse "certified secure" language (only the §4.3 joint-bound language is permitted). **Watchlist-coverage guards added (red-team C6 — implements the D5 §4 delegation in full), each with name / trigger / refusal / test ID:**
   - **AF-1 (D5 watchlist #1 — basis-dependent SPF → QBER scalar).** *Trigger:* any attempt to fold basis-dependent state-preparation-flaw content into the intrinsic-QBER scalar (TH-PAR-008), including raising QBER in response to evidence of basis-dependent encoding flaws. *Refusal:* reject the assignment; basis-dependent SPF enters only via the §3 `δ_spf`/overlap parameters with CHARACTERIZED status. *Test:* RT-01 (previously test-only; now also a §6 guard).
   - **AF-5 (D5 watchlist #5 — afterpulse/cross-pulse correlations → IID extraneous-count scalar).** *Trigger:* any attempt to absorb afterpulse or cross-pulse correlation content into the IID extraneous-count scalar (TH-PAR-006, p_ext), including raising p_ext in response to observed lag-resolved correlation statistics. *Refusal:* reject; correlation content may exist only in the §3 afterpulse conditional click kernel `P_ap(click_i|history)` / correlation-strength parameters, which remain SYMBOLIC ONLY — CHARACTERIZATION REQUIRED. *Test:* RT-05.
   - **AF-7 (D5 watchlist #7 — dead time / recovery / saturation → constant η or QBER).** *Trigger:* any attempt to represent dead time, recovery, or saturation as a constant efficiency (TH-PAR-002) or as added constant QBER. *Refusal:* reject; rate-dependent response may exist only via the §3 dead-time/recovery-kernel parameters (`τ_d` distribution, `η_d(Δt)`), which remain SYMBOLIC ONLY — CHARACTERIZATION REQUIRED. *Test:* RT-07.
   - **Watchlist coverage cross-check:** the guard registry must map every one of the 12 D5 §4 watchlist items to ≥1 guard; the mapping is emitted as a build-time report and any unmapped item fails the build (test RT-12).
6. **Claim labeling on all outputs**: every numerical artifact carries its claim class (CONDITIONAL / CHARACTERIZED-CONDITIONAL / ENGINEERING-SENSITIVITY) and, where applicable, the conditional-computation watermark.
7. **Fixture-compatibility shim**: the V0.16 evaluation path is preserved unmodified and invoked verbatim for regression (§7).

## 7. Verification tests for V0.17

1. **Regression invariants (blocking):** the V0.16 fixture reproduces **bit-exactly**: baseline margin 41,338.62418456675 bits (CFR N-02), floored candidate key 41,338 (N-03), X-basis QBER 0.017422686665352745 (N-04), φ_X 0.09270161340569935 (N-05), s_X,1 183,803.04893680647 (N-06), and the finite penalty 256.5669430839006 bits (N-22); grid partition 568 positive / 1,113 nonpositive / 1,681 total (N-07); grid median −2,624.946810258186 and minimum −3,828.414517626367 bits (N-09/N-10, sign conventions per CFR §3 corrections C-01/C-02); the existing 12-test suite (N-13) extended into the V0.17 harness and still passing 12/12.
2. **Refusal-behavior tests:** each §6 Category-2/Category-3 guard is exercised with a positive (must refuse) and negative (must accept) case — including: scalar-without-(CI, δ, envelope) inputs; datasheet-nominal strings; out-of-envelope extrapolation; correlation-as-jitter; SPF-as-QBER (RT-01); afterpulse-correlation-as-p_ext (RT-05); dead-time/saturation-as-constant-η-or-QBER (RT-07); `martingale_bound` evaluated with uncharacterized increment bounds (must refuse) vs CHARACTERIZED increment bounds (must accept); leakage-fields-empty emission; mismatch-under-R3; variable-length labeling. One positive and one negative case per §6 guard and vice versa (guard↔test consistency); the 12-item D5 §4 watchlist coverage cross-check (RT-12) must pass.
3. **Watermark presence tests:** any evaluator output with ≥1 `ASSUMED` input carries `NO SECURITY CLAIM — CONDITIONAL COMPUTATION`; no such output can enter a reportable-security channel.
4. **Ledger arithmetic tests:** additive union combiner exactness on symbolic terms; no-double-count guard — the ledger rejects any composed total containing both ε_char and a separate Σ_j δ_j line (red-team C3); 21-split validator accepts documented non-uniform splits summing to ε_s and rejects mis-splits; **positive acceptance test on the frozen fixture** — the fixture path (unsplit ε_s passed to `chernoff_bounds` with the /21 applied internally as `β = ln(21/ε_s)`) passes validation, and a mutated path using `β = ln(1/ε_s)` as the effective deviation parameter raises (red-team C14); ε_char/ε_auth present-or-symbolic in every composed total.
5. **Boundary behavior:** the 16-row × 2-side frontier structure and the 10/6 crossing split (CFR N-24) reproduce; defensive zeroing on decoy-ordering violation remains fail-closed (per audit §C).

## 8. Blockers (CFR §6 REQ register)

V0.17 execution and verification inherit the open REQUIRED-INPUT register verbatim:

- **REQ-01** — `controlled_inputs/v0.6/Q-Orbit_CASE-S1_Run_Manifest_V0.6.json` (hash-recorded): unblocks end-to-end re-execution; ε_s/ε_c, intensities, probabilities, channel config.
- **REQ-02** — `controlled_inputs/v0.6/CASE-S1-REF-001_Baseline_Run_V0.6.json`: unblocks direct confirmation of the V0.6 expected-baseline fixture used by REG-001…007.
- **REQ-03** — `controlled_inputs/v0.7/Q-Orbit_CASE-M1_Parameter_and_Provenance_Register_V0.7.csv`: unblocks verification that screen ranges (1e-7…2e-6; 0.003…0.015) are exactly the V0.7 register values and the provenance of the 1–221 s sweep bound.
- **REQ-04** — original (non-PDF) bytes of the full zip: unblocks byte-level hash closure on artifacts 1, 2, 4–8, 10.
- **REQ-05** — the five `data_processed/` registers (incl. `…_Imperfection_to_Proof_Mapping.csv`, the 16-row/7-unmapped mapping): unblocks row-level verification of the fixture mapping against Deliverable 5.
- **Open literature gaps** (not REQ items, but binding on proof-profile completion): detector-side correlated afterpulsing finite-key treatment; rate-dependent yields in decoy proofs; full composable integration of certification (Deliverable 5 §6).

## 9. Expected outputs and their claim classes

| Output | Content | Claim class |
|---|---|---|
| This architecture specification | V0.17-TA1 scope, parameters, budget, pipeline, guards | DOCUMENTATION — no security claim |
| Deliverable 5 (device-imperfection mapping) | 15-effect consolidated matrix, interaction flags, watchlist | DOCUMENTATION — no security claim |
| Symbolic parameter registry (machine-readable) | All §3 parameters, all `SYMBOLIC ONLY — CHARACTERIZATION REQUIRED` unless exempt | SYMBOLIC — no numerical content |
| Epsilon ledger + combiner + 21-split validator (code) | Symbolic ε bookkeeping | SYMBOLIC — assigns no value |
| Category-1 statistical constructors (code) | Clopper–Pearson / Hoeffding / Serfling–Fung / Azuma–Kato / endpoint selector / conditional evaluator | ENGINEERING-SENSITIVITY tooling; outputs CONDITIONAL and watermarked |
| Guarded evaluator outputs | Any margin/key number computed with ≥1 `ASSUMED` input | CONDITIONAL — `NO SECURITY CLAIM — CONDITIONAL COMPUTATION` watermark, excluded from security statements |
| V0.16 regression evidence | Bit-exact reproduction of CFR §2 locked numerics | VERIFICATION EVIDENCE (computational, not physical) |

## 10. Explicit non-claims and disclosed limitations

The prohibited-claims register (CFR §4) is restated and binding on every V0.17 artifact and every downstream document: **no mission success probability; no QKD availability; no Tabuk performance; no implementation security; no certified device security; no procurement tolerance; no hardware readiness; no deployability; no field readiness; no released secret key.** Additionally and specifically: **V0.17 establishes NO device security and NO mission capability.** Its parameters are specifications of what a proof would need; none of them is measured; no hardware characterization has occurred (CFR B-01/B-02); no conditional-on-approval language is permitted anywhere (§4.3 rule 5); no hardware-procurement or field language is permitted anywhere.

**Disclosed limitation (red-team C8 — ideal error correction).** The frozen fixture's λ_EC term (CFR N-21; binomial-ppf `logM` construction) corresponds to the **ideal f_EC = 1 minimum-error-correction-leakage accounting** (plus a finite-size quantile correction). Realistic error correction has f_EC > 1 (literature-typical ≈ 1.16 — EV-5 literature context only, NOT a Q-Orbit value) and would increase leakage; consequently **all margins and key figures in this package are UPPER BOUNDS with respect to error-correction efficiency**. A margin-vs-f_EC sensitivity check (f_EC ∈ {1.0, 1.1, 1.16, 1.2}) is logged as a theoretical-backlog item; no new numerics are computed here.

## 11. Research-question closure

**Second-stage question:** *what is the minimum scientifically justified proof-and-characterization architecture under which the Q-Orbit key-length computation could ever support a security claim?* One-page answer, derived from this architecture:

**(a) Proof side.** The minimum proof stack is: (i) the frozen Lim/Sidhu finite-key core retained verbatim as the count-model and ε_s/ε_c layer, with the 21-split enforced (§4.2); (ii) proof-profile swaps per imperfection class, each already available in verified literature — imperfect phase randomization (Nahar PR Applied 20, 064031, 2023), bounded intensity correlations (Zapatero Quantum 5, 602, 2021; Sixto PR Applied 18, 044069, 2022), fluctuating intensities (Mizutani NJP 17, 093011, 2015), loss-tolerant or unified-framework source flaws (Tamaki PRA 90, 052314, 2014; Currás-Lorenzo Optica Quantum 3, 525, 2025), bounded detection-efficiency mismatch (Fung QIC 9, 131, 2009 → Zhang PRR 3, 013076, 2021; Trushechkin Quantum 6, 771, 2022; Marcomini QST 10, 035002, 2025), leaky source (Lucamarini PRX 5, 031030, 2015; Wang NJP 20, 083027, 2018), and martingale statistics (Azuma 1967; Kato 2020) wherever memory survives; (iii) the security budget extended by ε_char, ε_auth (and ε_varlen if the protocol ever becomes pass-adaptive), composed additively (§4.3). Two items are genuine open literature problems, not engineering debt: detector-side correlated afterpulsing in finite-key decoy proofs, and rate-dependent yields inside the decoy identity — until resolved, their rows remain UNMAPPED-PROOF-REQUIRED and their regimes must be excluded by certified operating bounds (hold-off, certified linear range) rather than proved away.

**(b) Characterization side.** The minimum characterization architecture is the Tan–Nahar certify-then-run structure (PRX Quantum 7, 020342, 2026): a pre-designated robust parameter set S_robust for every proof-relevant parameter; per-parameter confidence intervals at stated 1−δ_j using the matched statistical machinery (Clopper–Pearson for binomial fractions, Hoeffding for bounded means, Serfling/Fung for sampling-without-replacement, Azuma/Kato for correlated sequences); envelope coverage over the seven-axis repetition matrix (time, temperature, wavelength, polarization, optical power, count rate, device age) with hull construction and per-cell δ accounting; and reject-and-abort whenever any interval exits S_robust. Without every one of these, the margin equation computes a conditional number, not a bound.

**(c) Composition.** The only valid end-to-end statement is the joint bound Pr[certification approves AND key insecure] ≤ ε_c + ε_s + ε_char (+ ε_auth), with ε_char ≡ Σ_j δ_j defined once (§4.3; the earlier "Σδ_j + ε_char" form was removed as a double-count, red-team C3). No conditional-on-approval claim, no point-value security parameter, no scalar substitution for a matrix-level or correlation-level effect.

**(d) Minimum viable claim sequence.** (1) V0.17 symbolic architecture (this document) — claim class DOCUMENTATION/SYMBOLIC. (2) Characterization campaigns populating §5 per parameter and envelope cell — converts parameters from SYMBOLIC to CHARACTERIZED(interval, δ, envelope). (3) Proof-profile selection per Deliverable 5 with the §3 parameters instantiated at worst-case endpoints — yields the first number that may carry a security claim, and only in the §5 Stage-F conditional form. Every earlier emission — including all current V0.16 outputs (e.g. CFR N-02) — remains a conditional computation supporting no security claim. Nothing shorter than this sequence is scientifically justified; each stage is individually necessary because each removes a distinct failure mode (wrong proof structure; unbounded parameters; uncomposed epsilons) that no other stage can remove.

*End of Deliverable 6.*
