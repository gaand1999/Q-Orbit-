# Q-Orbit Research Brief — QKD Security-Proof Families & Candidate-Proof Comparison
**Agent B (Stage 2, deep-research-swarm) — Date: 2026-08-27**
**Scope:** Map the security-proof families applicable to Q-Orbit's protocol class (efficient decoy-state BB84, weak-coherent pulses, satellite downlink, finite key), compare three candidate proof profiles (A/B/C), and recommend one. All cited references verified against independent bibliographic records (see §7). No numerical claims beyond the lead-provided locked ground truth, used as context only.

**Locked numerical context (lead, 2026-08-27; context only, not audited here):** baseline margin 41,338.62418456675 bits at 102 s exposure; grid median −2,624.946810258186 bits; min −3,828.414517626367; max +142,540.7481180454; 568 positive / 1,113 non-positive margins over 1,681 grid points; finite-key penalty 256.5669430839006 bits; n_X = 492,818.0901525894; s_X1 = 183,803.04893680647. These numbers are consistent in *structure* with a Lim/Tomamichel-style finite-key decoy formula (key length = s_X0 + s_X1(1 − h2(φ)) − λ_EC − PA/verification terms of the form 6 log2(21/ε_sec) + log2(2/ε_cor)); the exact ε-decomposition is Agent A's remit and is **not** assumed here.

---

## 1. Proof-Family Taxonomy (what exists, and what it proves)

The QKD security-proof literature relevant to Q-Orbit partitions into eight families. "Finite-key" = composable bound at finite block length; "imperfect-device coverage" = native handling of source/detector flaws without extra assumptions.

### F1. Entanglement-distillation / QECC reduction (asymptotic)
- **Idea:** Show the P&M protocol is equivalent to an entanglement-based scheme whose security follows from entanglement distillation / CSS error correction; security holds if bit and phase error rates are both bounded (Shor–Preskill argument).
- **Key refs:** Lo & Chau, Science 283, 2050 (1999); Shor & Preskill, Phys. Rev. Lett. 85, 441 (2000).
- **Strengths:** Conceptually foundational; yields the asymptotic rate R ≥ 1 − 2h2(e) for BB84.
- **Limits for Q-Orbit:** asymptotic only; device imperfections enter ad hoc; superseded for finite-key use.

### F2. Complementarity / phase-error estimation (analytic, extensible)
- **Idea:** Bound the virtual "phase error rate" in an equivalent EPR picture; smooth min-entropy of the raw key is bounded via the phase-error count; no quantum error correction needed (Koashi). Source imperfections enter through explicit basis-dependent/loss-tolerant state characterizations.
- **Key refs:** Koashi, New J. Phys. 11, 045018 (2009); GLLP, Quantum Inf. Comput. 4, 325 (2004); loss-tolerant extension: Tamaki et al., Phys. Rev. A 90, 052314 (2014); finite-key + fluctuating intensities: Mizutani et al., New J. Phys. 17, 093011 (2015); imperfect phase randomisation: Currás-Lorenzo et al., Quantum Sci. Technol. 9, 015025 (2023) and Nahar et al., Phys. Rev. Applied 20, 064031 (2023) (seed #2); unified source-imperfection framework: Currás-Lorenzo et al., arXiv:2305.05930 (preprint, v4 2025); rigorous consolidated decoy-BB84 proof: Tupkary et al., arXiv:2601.18035 (2026 preprint).
- **Strengths:** Handles characterized source flaws *inside* the proof (not as an external assumption); analytical; standard workhorse for satellite papers.
- **Limits:** Assumes IID rounds unless combined with F6/F7 or correlation-tolerant variants (Zapatero et al. 2021; Pereira et al. 2025).

### F3. Entropic uncertainty relation + leftover hashing (composable finite-key)
- **Idea:** EUR for smooth min/max entropies bounds Eve's information directly; privacy amplification via quantum leftover hashing lemma gives composable ε-security at finite length with explicit penalty terms.
- **Key refs:** Tomamichel & Renner, Phys. Rev. Lett. 106, 110506 (2011); Tomamichel, Schaffner, Smith, Renner, IEEE Trans. Inf. Theory 57, 5524 (2011); Tomamichel, Lim, Gisin, Renner, Nat. Commun. 3, 634 (2012) (tight finite-key BB84); Tomamichel & Leverrier, Quantum 1, 14 (2017) (self-contained full proof).
- **Strengths:** Tightest known analytic finite-key bounds for ideal BB84; gives the penalty-term structure that Q-Orbit's 256.57-bit fixture penalty resembles.
- **Limits:** Native version assumes ideal qubit sources; WCP + decoy must be grafted on (via F4 estimation steps); device flaws need GLLP-style add-ons.

### F4. Concentration-inequality decoy estimation (the practical workhorse)
- **Idea:** Use Hoeffding / multiplicative Chernoff / Kato's inequality to turn observed gains/QBERs into composable confidence intervals on single-photon yield Y1 and phase error φ, then apply F2/F3 key-length formula. Handles fluctuating experimental parameters, random sampling without replacement (Serfling), and asymmetric basis choice (efficient BB84).
- **Key refs:** Ma et al., Phys. Rev. A 72, 012326 (2005) (practical decoy + statistical fluctuations); Lim et al., Phys. Rev. A 89, 022307 (2014) (seed #5 — concise bounds, 3-intensity, 21-event union bound); Curty et al., Nat. Commun. 5, 3732 (2014) (finite-key MDI; Chernoff usage); Hayashi & Tsurumaru, New J. Phys. 14, 093014 (2012); Hayashi & Nakayama, New J. Phys. 16, 063009 (2014) (finite-key decoy via sandwiching); Zhang et al., Phys. Rev. A 95, 012333 (2017) (multiplicative Chernoff, improved bounds); Kato, arXiv:2002.04357 (2020) (concentration with unconfirmed knowledge — used by Islam et al. 2024); Mannalath, Zapatero, Curty, Phys. Rev. Lett. 135, 020803 (2025) (sharp finite statistics, current state of the art).
- **Satellite practice:** Sidhu et al., npj Quantum Inf. 8, 18 (2022) (seed #1 — Micius-calibrated finite-key decoy, optimized intensities/block sizes); Islam et al., PRX Quantum 5, 030101 (2024) (CubeSat-scale, composable, Kato's inequality); Liao et al., Nature 549, 43 (2017) (Micius experiment).
- **Strengths:** Exactly Q-Orbit's current fixture family; closed-form, fast, auditable; composable ε via explicit union bound over estimation events.
- **Limits:** Statistics assume independent pulses (or Azuma-type martingale structure); source imperfections not native (GLLP Δ-term bolt-on only); penalty conservatism scales with number of estimation events.

### F5. Device-imperfection-aware analytic frameworks (GLLP → loss-tolerant → generalized decoy)
- **Idea:** Parameterize flaws (state-preparation error, side-channel leakage, phase-randomization imperfection, intensity fluctuation/correlation) and absorb them into the phase-error estimate via reference/quantum-coin techniques or generalized decoy constraints.
- **Key refs:** GLLP (2004); Tamaki et al. (2014); Mizutani et al. (2015); Currás-Lorenzo et al. QST 9, 015025 (2023); Nahar et al. PRApplied 20, 064031 (2023); Pereira et al., Phys. Rev. Research 5, 023065 (2023) (modified BB84 robust to source imperfections); Wang, Tamaki, Curty, New J. Phys. 20, 083027 (2018) (leaky sources); Xu et al., Phys. Rev. A 92, 032305 (2015) (seed #3 — measured source flaws); correlated intensities: Zapatero et al., Quantum 5, 602 (2021); Sixto et al., Phys. Rev. Applied 18, 044069 (2022); unbounded pulse correlations: Pereira et al., Quantum Sci. Technol. 10, 015001 (2025).
- **Strengths:** The only analytic route that honestly covers seeds #2/#3-type source flaws with quantified key-rate impact.
- **Limits:** Each flaw type has its own theorem; combining many flaws requires the unified framework (arXiv:2305.05930) or numerical methods.

### F6. Symmetry-based: postselection / de Finetti reductions
- **Idea:** Exploit permutation symmetry of the protocol to lift collective-attack proofs to coherent attacks at polynomial cost in ε.
- **Key refs:** Christandl, König, Renner, Phys. Rev. Lett. 102, 020504 (2009); optical-QKD-adapted: Nahar, Tupkary, Zhao, Lütkenhaus, Tan, PRX Quantum 5, 040315 (2024).
- **Strengths:** Generic coherent-attack lift for high-dimensional optical states where exponential de Finetti fails.
- **Limits:** Typically looser than direct F4 statistics at satellite block lengths; not the cheapest path for Q-Orbit.

### F7. Entropy accumulation theorem (EAT)
- **Idea:** Round-by-round entropy accumulation against coherent attacks without IID; now applicable to prepare-and-measure and decoy protocols.
- **Key refs:** Dupuis, Fawzi, Renner, Commun. Math. Phys. 379, 867–913 (2020); Metger & Renner, Nat. Commun. 14, 5272 (2023); George et al., arXiv:2203.06554 (characterized devices); Kamin, Arqand, George, Lütkenhaus, Tan, arXiv:2406.10198 (2024) (decoy-state QKD via EAT).
- **Strengths:** Drops the IID assumption — the strongest handle on non-IID/memory concerns in the satellite context.
- **Limits:** Constants historically worse than F4 at Q-Orbit block sizes (n ~ 10^5 per pass); still maturing for P&M decoy use.

### F8. Numerical SDP proofs
- **Idea:** Formulate Eve's optimal attack as a convex (SDP) optimization over the quantum channel consistent with observations; two-step (primal/dual) method gives *reliable* lower bounds; finite-key via acceptance-test + min-tradeoff or EUR with numerical rate.
- **Key refs:** Coles, Metodiev, Lütkenhaus, Nat. Commun. 7, 11712 (2016); Winick, Lütkenhaus, Coles, Quantum 2, 77 (2018); dimension reduction: Upadhyaya et al., PRX Quantum 2, 020325 (2021); finite-key numerics: George, Lin, Lütkenhaus, Phys. Rev. Research 3, 013274 (2021); variable-length: Tupkary, Tan, Lütkenhaus, Phys. Rev. Research 6, 023002 (2024); detector imperfections: Tupkary, Nahar, Sinha, Lütkenhaus, Quantum 9, 1937 (2025); OpenQKDsecurity software: Burniston et al., v2.0.2 (2024, github.com/Optical-Quantum-Communication-Theory/openQKDsecurity).
- **Strengths:** Arbitrary characterized imperfections (source AND detector) enter as constraints; no per-flaw theorem needed; aligns with the certification/standardization framework of Tan & Nahar, PRX Quantum 7, 020342 (2026) (seed #4).
- **Limits:** Requires verified numerics (interval arithmetic), squashing/dimension-reduction checks, expert tooling; harder to audit line-by-line than an analytic formula.

**Cross-cutting review:** Tupkary, Tan, Nahar, Kamin, Lütkenhaus, "QKD security proofs for decoy-state BB84: protocol variations, proof techniques, gaps and limitations," arXiv:2502.10340 (2025) — the current canonical map of proof variants and their hidden assumptions; use as the survey anchor in the manuscript.

---

## 2. Which family does the Q-Orbit V0.16 fixture instantiate?

The locked numbers (decoy s_X1 estimation, single-photon phase-error term h2(φ), fixed 256.57-bit penalty, per-pass block n_X ≈ 4.93×10^5) are the signature of **F4-with-F3-terms**: a Lim et al. (2014)-style 3-intensity efficient-BB84 bound with union-bounded Chernoff/Hoeffding statistics and Tomamichel-style PA/verification penalties. This is precisely the satellite-practice lineage: Sidhu 2022 → Islam 2024. Consequences:
- The fixture inherits F4's assumptions: independent pulses per pass, idealized source states, basis-independent detection (squashing), trusted characterization of dark counts/efficiencies.
- Source-side flaws (seeds #2, #3, #4 concerns) are **not** covered by the fixture's proof family as instantiated; they currently live only in the text as citations.

---

## 3. Candidate proof profiles for V0.17-TA1

**Profile A — Analytic concentration-inequality finite-key (status-quo family, hardened).**
Lim 2014 skeleton; statistics upgraded to multiplicative Chernoff (Zhang 2017) / Kato's inequality (2020) following Islam 2024; optional improvement via Mannalath 2025 sharp statistics. Source flaws only via GLLP-type Δ if at all.

**Profile B — Phase-error-estimation framework with native source imperfections.**
Koashi complementarity backbone; loss-tolerant/reference-state technique (Tamaki 2014, Mizutani 2015) for state-preparation flaws; generalized decoy (Nahar 2023, Currás-Lorenzo 2023) for imperfect phase randomization; unified under Currás-Lorenzo et al. arXiv:2305.05930 and the rigorous consolidated proof Tupkary et al. arXiv:2601.18035. Characterization inputs: 3-state overlaps, phase-distribution moments, intensity-fluctuation bounds (per seed #4's characterization→proof discipline).

**Profile C — Numerical SDP finite-key (certification-aligned).**
Winick 2018 reliable two-step numerics + George 2021 finite-key + Upadhyaya 2021 dimension reduction; variable-length option Tupkary 2024; detector imperfections per Tupkary 2025; device-characterization integration per Tan & Nahar 2026; OpenQKDsecurity as reference implementation.

---

## 4. Comparison matrix

| Criterion | A: Analytic finite-key (Lim/Kato) | B: Phase-error + imperfect sources | C: Numerical SDP |
|---|---|---|---|
| Proof family | F4 (+F3 penalties) | F2 (+F4 statistics) | F8 (+F3/F7 finite key) |
| Composable ε-security | Yes (union bound) | Yes (union bound) | Yes (via EUR/EAT + acceptance test) |
| Matches current V0.16 numerics | **Native — zero rewrite** | Moderate rewrite of penalty/φ terms | Full replacement of rate formula |
| Source flaws (seeds #2/#3) | GLLP Δ bolt-on only (basis-independent flaws) | **Native** (loss-tolerant, generalized decoy, phase-randomization) | **Native** as SDP constraints |
| Detector flaws / memory | Assumes ideal squashing; memory unhandled | Partial (via framework extensions; Tupkary 2025) | **Native** (imperfect-detector numerics; arXiv:2508.21486 for memory) |
| Non-IID / pulse correlations | Broken unless Azuma-type extension (Zapatero 2021; Pereira 2025) | Correlation-tolerant variants exist | Via EAT (Kamin 2024) |
| Finite-key tightness at n≈5×10^5/pass | Good (satellite-proven: Sidhu, Islam) | Comparable (slightly worse constants) | Historically looser; improving (Kamin et al. 2026, PRX Quantum 8 area — verify before citing) |
| Auditability for red team | **High** (closed form) | Medium (more moving parts) | Low–medium (numerical pipeline) |
| Implementation cost to V0.17 | **Low** (already the fixture) | Medium (months-scale) | High (tooling + interval arithmetic) |
| Certification narrative (seed #4) | Weak | Strong | **Strongest** |
| Risk of proof-gap criticism | Medium (assumptions unstated ⇒ red-team bait) | Low–medium | Low |
| Key references | Lim 2014; Curty 2014; Zhang 2017; Kato 2020; Sidhu 2022; Islam 2024 | Koashi 2009; Tamaki 2014; Mizutani 2015; Nahar 2023; Currás-Lorenzo 2023/2025; Tupkary 2026 | Winick 2018; George 2021; Upadhyaya 2021; Tupkary 2024/2025; Tan & Nahar 2026 |

---

## 5. Recommendation (A/B/C)

**Primary: Profile A for V0.17-TA1** — it is the family the locked numerics already instantiate, it is the satellite-standard (Sidhu 2022; Islam 2024), and it is the most auditable under the Phase 1 red-team gate. Two mandatory hardening actions so that A survives review:
1. **State the assumption ledger explicitly** (IID pulses, characterized intensities, squashing/basis-independent detection, GLLP-excluded flaws) next to every rate claim — the review arXiv:2502.10340 shows exactly which gaps reviewers hunt.
2. **Upgrade the fluctuation statistics** from plain Chernoff/Hoeffding to Kato's inequality (arXiv:2002.04357) or Mannalath–Zapatero–Curty (PRL 135, 020803, 2025), both drop-in at the fixture level; this is the cheapest way to shrink the 256.57-bit-class penalty without changing proof family.

**Phase 2 upgrade path: Profile B** — the minimum change that converts Q-Orbit's source-imperfection *citations* (seeds #2/#3) into *covered terms of the proof*. Anchor on the consolidated rigorous decoy-BB84 proof (Tupkary et al., arXiv:2601.18035) and the source-imperfection framework (Currás-Lorenzo et al., arXiv:2305.05930); characterization inputs defined per seed #4 (Tan & Nahar 2026). Same estimation LP as A; the margin model survives structurally.

**Benchmark/cross-check only for now: Profile C** — use OpenQKDsecurity numerics as an independent cross-check of the A-profile margins at a handful of grid points, and position C as the certification end-state (seed #4's framework is built for it). Do not make C the shipping proof in Phase 1: tooling/audit cost is high and finite-key constants at n≈5×10^5/pass are not yet superior to A.

**Explicitly not recommended as primary:** F6 postselection (looser at these block sizes; keep as citation for coherent-attack lifting, Nahar 2024) and F7 EAT as primary (constants worse at satellite block sizes; cite Kamin 2024 as the active route for non-IID robustness).

---

## 6. Finite-key statistics sub-choice (within Profile A)

| Statistics tool | Ref | Notes for Q-Orbit |
|---|---|---|
| Hoeffding | Hoeffding 1963; Lim 2014 | Fixture-original; most conservative |
| Multiplicative Chernoff | Zhang et al. 2017; Curty et al. 2014 | Standard upgrade; asymmetric intervals |
| Serfling (random sampling) | used in Tomamichel 2012-era analyses | For basis-sift subsampling |
| Kato's inequality | arXiv:2002.04357 (2020) | Used by Islam 2024; tight when only empirical mean known |
| Sharp finite statistics (Kato-style, optimized) | Mannalath, Zapatero, Curty, PRL 135, 020803 (2025) | Current best; verify compatibility with 3-intensity fixture before adoption |

---

## 7. Reference-verification status

**All references cited above verified** against ≥2 independent bibliographic records (publisher pages, official feeds, citing-paper reference lists) during this and the prior Agent F audit. Verification failures / cautions:
1. **"Trényi & Curty NJP 2021" is a misattribution for pulse correlations** (carried over from Agent F audit): the real NJP 23, 093005 (2021) is a COW-QKD zero-error attack paper. Substitute Yoshino 2018 / Zapatero 2021 / Sixto 2022 / Pereira 2025.
2. **Seed #4 DOI `10.1103/f42p-524t` is genuine** (new APS short-DOI scheme, 2025+). Do not let automated checkers "fix" it. (Agent F finding, re-confirmed.)
3. **Preprint-only items** (cite with arXiv ID, not venue): Kato arXiv:2002.04357; Currás-Lorenzo et al. arXiv:2305.05930 (v4, Jan 2025 — published-venue status unconfirmed at audit time); Tupkary et al. arXiv:2601.18035 (Jan 2026); Tupkary et al. arXiv:2502.10340 (review, 2025); Kamin et al. arXiv:2406.10198; George et al. arXiv:2203.06554; Wang–Tupkary–Nahar arXiv:2508.21486 (detector memory).
4. **Kamin–Tupkary–Lütkenhaus "Improved finite-size effects in QKD…" (arXiv:2502.05382):** one citing reference lists a 2026 APS vol. 8 publication, but the venue/volume could not be confirmed at audit time — **cite as preprint until confirmed**.
5. No fabricated references encountered in this mission's reference set.

**Permitted-use reminder (from Agent F audit, still binding):** proof papers support statements of the form "our security model incorporates X, following [ref]" — never "our device is secure against X, per [ref]."
