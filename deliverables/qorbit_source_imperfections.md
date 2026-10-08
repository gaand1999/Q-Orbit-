# Q-Orbit — Source-Side Imperfection Analysis (Agent C)

**Date:** 2026-08-27 · **Scope:** efficient-BB84 weak-coherent-pulse (WCP) satellite-to-ground downlink; 1 signal + 2 decoy intensities (one vacuum); finite-key fixture after Sidhu et al. (npj Quantum Information 8, 18, 2022) with Lim et al. (PRA 89, 022307, 2014) margin structure; scalar software model only; zero physical characterization; fail-closed policy.

**Guiding question for each effect:** does the effect merely change *observed rates/QBER* (engineering count model), or can it change (i) the information available to the adversary, (ii) the validity of the *source* model assumed by the security proof (ideal qubit encoding, photon-number channel structure τ_n, IID intensity settings, perfect phase randomization, no side channels, no memory), or (iii) the correctness of the finite-key statistical statements? Any of (i)–(iii) makes it **SECURITY-PROOF-MODIFYING**.

**Relation to the D5 15-effect mandate:** this brief covers the eight source-side effects in full depth. The D5 master matrix rows "incomplete phase randomization", "pulse-to-pulse correlations", "intensity correlations", "state-preparation flaws", "source leakage/distinguishability" map onto §1–§7 below; §8 (characterization uncertainty) covers the D5 row "characterization uncertainty" as it applies to source parameters.

---

## 0. What the current proof machinery actually assumes about the source

The frozen Sidhu-family finite-key analysis (Lim et al. 2014 structure; GLLP-type security architecture underneath) assumes, on the source side:

1. **Ideal qubit encoding with known states:** the four emitted states are characterized qubit states; the only tolerated deviation is a *basis-independent* flaw bounded by a single imbalance parameter (GLLP Δ / quantum-coin imbalance), and in the frozen fixture even that term is absent.
2. **Photon-number channel structure:** each pulse is a phase-randomized WCP, so the signal decomposes into photon-number components with probabilities τ_n (Poisson), enabling the decoy method (Lo–Ma–Chen, PRL 94, 230504, 2005 — VERIFIED seed #6) and the vacuum+weak-decoy estimation of s_X,0, s_X,1 and the phase-error bound φ_X.
3. **Exactly known, IID intensity settings:** μ₁ (signal), μ₂ (decoy), μ₃ (vacuum) are exact constants chosen independently each pulse; the finite-key concentration machinery (Hoeffding/Serfling) treats the observed counts as conditionally independent given the settings.
4. **Perfect phase randomization:** the global phase of each WCP is uniform on [0, 2π); without this the τ_n decomposition (assumption 2) does not exist and the decoy bounds are not statements about photon-number channels.
5. **No side channels:** the emitted pulse carries the chosen bit/basis/intensity information *only* in the intended degree of freedom; all other modes are setting-independent, and no information-bearing light leaves the source beyond the intended pulse.
6. **IID pulses:** no correlations between successive emissions in any degree of freedom (encoding, intensity, phase).
7. **Exactly known source parameters:** every number entering the margin equation `M = s_X,0 + s_X,1·[1 − h2(φ_X)] − λ_EC − 6·log2(21/ε_s) − log2(2/ε_c)` is a known constant, not a statistical estimate.

**Fixture scalar mapping.** The fixture carries the source side as: exact scalars {μ₁, μ₂, μ₃}; a scalar extraneous/misalignment error contribution folded into the observed QBER (e_d-style); no phase-randomization term; no SPF term; no correlation terms; no leakage terms. None of the fixture scalars can express basis-dependence, setting-dependence across modes, memory, or an adversary probing the source.

---

## 1. State-preparation (encoding) flaws — independent, basis-dependent qubit imperfections

**Mechanism.** Modulator and optics imperfections make the four emitted states deviate from the ideal BB84 states (wrong modulation depths, finite extinction ratio, interferometer misalignment inside the transmitter). Crucially these deviations are generically **basis-dependent** (the Z and X encoding stages share hardware asymmetrically) and can be **setting-dependent** across the four states.

**Classification.** **SECURITY-PROOF-MODIFYING.** GLLP (Quantum Inf. Comput. 4, 325, 2004, arXiv:quant-ph/0212066 — VERIFIED) showed basis-*independent* flaws can be bounded via a single quantum-coin imbalance Δ and absorbed as a penalty on the phase-error rate; but real flaws are basis-dependent, and for those the GLLP bound is invalid. The loss-tolerant protocol (Tamaki, Curty, Kato, Lo, Azuma, PRA 90, 052314, 2014, DOI 10.1103/PhysRevA.90.052314 — VERIFIED) restores security *without* characterizing the flaws, at the cost of modified state structure and a different phase-error estimation; its finite-key generalization (Mizutani et al., NJP 17, 093011, 2015, DOI 10.1088/1367-2630/17/9/093011 — VERIFIED incl. DOI) also folds in intensity fluctuations (§3). Experimental evidence that such flaws are real and measurable in deployed systems: Xu et al., PRA 92, 032305 (2015) — VERIFIED seed #3 (measured state-preparation flaws in a commercial system; evidence about *that* device, not about Q-Orbit's). A protocol-level alternative: Pereira et al., "Modified BB84 quantum key distribution protocol robust to source imperfections," PRR 5, 023065 (2023) — VERIFIED.

**What breaks if absorbed into the QBER scalar.** Folding SPFs into a scalar e_d (misalignment probability) implicitly assumes the flaws are basis-independent and stochastic-symmetric. Basis-dependent flaws bias Eve's information asymmetrically between bases: the phase-error rate is no longer bounded by the observed bit-error rate plus a constant, so the φ_X bound in the margin equation can be silently violated. This is exactly the "hidden substitution" the fail-closed rules prohibit: a scalar QBER stress test cannot express a matrix-level (operator) deviation of the emitted states.

**Candidate proof-compatible treatment.** (i) Loss-tolerant analysis with a reduced (3-state) encoding and modified phase-error estimation (Tamaki 2014; finite-key: Mizutani 2015; random-sampling finite-key variant: Currás-Lorenzo et al., PRA 104, 012406, 2021 — record seen in arXiv:2305.05930 v4 ref list, treated as VERIFIED-via-secondary-source). (ii) Retain the four-state protocol but bound basis dependence explicitly via characterized state overlaps and a GLLP/quantum-coin term with a *measured* Δ — this is the reference-state route; it requires exactly the characterization §8 formalizes (cf. Huang et al., "Characterization of state-preparation uncertainty in quantum key distribution," PR Applied 19, 014048, 2023 — VERIFIED via citation record). (iii) Unified framework: Currás-Lorenzo, Pereira, Kato, Curty, Tamaki, "Security framework for quantum key distribution with imperfect sources," Optica Quantum 3, 525 (2025) (preprint arXiv:2305.05930) — VERIFIED published record; handles SPFs jointly with side channels.

**Required characterization evidence (observables only).** Tomographic or reference-state measurement of the four emitted density operators (or at minimum pairwise overlaps and a Bloch-sphere deviation bound δ_spf); evidence of basis-(in)dependence; stability of the characterization over operating conditions.

**Fixture scalar correspondence.** QBER scalar e_d absorbs only the basis-independent component; **PARTIAL-SCALAR-STRESS-ONLY**.

**Proposed status:** **UNMAPPED-PROOF-REQUIRED** (basis-dependent part), with PROOF-PROFILE-CANDIDATE available (loss-tolerant line / modified BB84); characterization per §8 is a prerequisite for any claimed bound.

---

## 2. Correlated encoding — pulse-to-pulse state-preparation correlations (encoding memory)

**Mechanism.** Modulator memory (patterning effects in intensity/phase modulators, electrical ringing, thermal drift of the encoding stage) makes the state emitted in slot *i* depend on the settings and states of slots *< i*. The emitted sequence is then not IID even if each marginal state is within tolerance.

**Classification.** **SECURITY-PROOF-MODIFYING.** The frozen fixture's finite-key statistics (Hoeffding/Serfling sampling) presume conditional independence; correlated encoding breaks both the decoy conditional-probability structure and the random-sampling phase-error bound, and gives Eve joint information across rounds that per-round analysis cannot see.

**Candidate proof-compatible treatment.** (i) Nagamatsu et al., "Security of quantum key distribution with light sources that are not independently and identically distributed," PRA 93, 042325 (2016) — VERIFIED via citation records: security for general correlated sources with bounded correlation strength. (ii) Mizutani et al., "Quantum key distribution with setting-choice-independently correlated light sources," npj Quantum Information 5, 8 (2019), DOI 10.1038/s41534-018-0122-y — VERIFIED incl. DOI. (iii) Pereira et al., "Quantum key distribution with correlated sources," Science Advances 6, eaaz4487 (2020) — VERIFIED via citation records. (iv) Strongest current handle: Pereira et al., "Quantum key distribution with unbounded pulse correlations," Quantum Sci. Technol. 10, 015001 (2025) — VERIFIED (tolerates long-range correlations). (v) Marwah & Dupuis, "Proving security of BB84 under source correlations," arXiv:2402.12346 (2024) — VERIFIED as preprint; **no journal version confirmed — cite as preprint only**. (vi) Statistical layer: replace Hoeffding/Serfling with Azuma–Kato martingale bounds (bridge doc R12/R13) where increments have bounded dependence.

**What breaks if absorbed into a scalar.** A scalar jitter on the encoding angle cannot represent cross-round dependence: it manufactures IID randomness where the physics has memory, and the finite-key penalty is computed against the wrong distribution.

**Required characterization evidence.** Conditional state tomography given predecessor settings (pattern-dependence maps); autocorrelation of the emitted states vs lag; drift spectra.

**Fixture scalar correspondence.** None.

**Proposed status:** **UNMAPPED-PROOF-REQUIRED** (with multiple PROOF-PROFILE-CANDIDATEs; strongest is the unbounded-correlation analysis) + **UNMAPPED-CHARACTERIZATION-REQUIRED** for the correlation-strength bound.

---

## 3. Intensity fluctuations — independent setting errors (incl. systematic offset of μ)

**Mechanism.** The intensity modulator and power monitor have finite precision: each pulse's actual intensity deviates from the nominal μ_j by an independent random error, and the *mean* may be systematically offset from the calibrated value (calibration error, thermal drift of the modulator bias).

**Classification.** **SECURITY-PROOF-MODIFYING, but the mildest of the eight.** The decoy method needs the conditional probability p_{k|n} (probability of intensity setting k given photon number n) to be known; unknown fluctuations degrade this. However, if the fluctuations are bounded and *independent of Eve*, security is retained with quantified penalty: Mizutani et al. NJP 17, 093011 (2015) — VERIFIED — gives the finite-key analysis with fluctuating intensities; Ma et al., PRA 72, 012326 (2005), DOI 10.1103/PhysRevA.72.012326 — VERIFIED — already treats statistical fluctuation in practical decoy estimation. **Critical caveat:** the proof needs a *bound* on the fluctuation magnitude, i.e., characterized intervals [μ_j⁻, μ_j⁺]; a nominal μ with no error bar is not a proof input (per Tan & Nahar, PRX Quantum 7, 020342, 2026 — VERIFIED seed #4: point-value "datasheet" parameters do not establish a robust domain).

**What breaks if the scalars {μ_j} are treated as exact.** The decoy estimation of s_X,0, s_X,1, φ_X is then a *conditional* computation — exact only at the assumed point. A systematic offset (e.g. actual signal intensity 5% above nominal) shifts the Poisson weights τ_n and can bias the phase-error bound in the insecure direction with no signature in the observed counts.

**Candidate proof-compatible treatment.** Replace exact {μ_j} with intervals and run the decoy estimation as an optimization over the intervals (Mizutani 2015); feed the intervals from characterization with confidence statements (§8).

**Required characterization evidence.** Per-setting intensity distribution measurements (mean, spread, tail bounds) at the modulator output; calibration-chain uncertainty budget; drift envelope over a pass.

**Fixture scalar correspondence.** The {μ_j} scalars exist but are treated as exact: **PARTIAL-SCALAR-STRESS-ONLY** (can encode a *hypothetical* interval sweep as a stress test, but the emitted number remains conditional).

**Proposed status:** **PROOF-PROFILE-CANDIDATE** (Mizutani 2015 machinery directly applicable) gated by **UNMAPPED-CHARACTERIZATION-REQUIRED** (no fluctuation bounds exist).

---

## 4. Intensity correlations — pulse-to-pulse correlations of the intensity settings

**Mechanism.** Same modulator memory as §2, but acting on the intensity degree of freedom: the actual intensity of pulse *i* depends on the settings of neighbouring pulses. Experimentally demonstrated in deployed decoy-state systems: Yoshino et al., npj Quantum Information 4, 8 (2018), DOI 10.1038/s41534-017-0057-8 — VERIFIED incl. DOI; Trefilov et al., "Intensity correlations in decoy-state BB84 quantum key distribution systems," arXiv:2411.00709 (2024) — VERIFIED as **preprint** (measured long-range correlations in two industrial prototypes; no journal version confirmed — cite as preprint only).

**Classification.** **SECURITY-PROOF-MODIFYING.** Correlated intensities break the IID structure that makes p_{k|n} well-defined per pulse; Eve can in principle exploit the correlation pattern (which is setting-dependent and hence setting-revealing).

**Candidate proof-compatible treatment.** Zapatero, Navarrete, Tamaki, Curty, "Security of quantum key distribution with intensity correlations," Quantum 5, 602 (2021), DOI 10.22331/q-2021-12-07-602 — VERIFIED (bounded nearest-neighbour correlations); Sixto, Zapatero, Curty, "Security of decoy-state quantum key distribution with correlated intensity fluctuations," PR Applied 18, 044069 (2022) — VERIFIED (correlated fluctuation generalization); for arbitrarily long correlations use the §2 unbounded-correlation analysis (Pereira et al. QST 10, 015001, 2025).

**What breaks if absorbed into a scalar.** Representing correlation as widened scalar jitter on μ (the bridge doc's prohibited move) manufactures independence and *understates* the decoy-estimation failure probability; it also erases the setting-revealing structure of the correlation.

**Required characterization evidence.** Measured conditional intensity distributions p(μ_i | settings of i−1, …, i−ℓ); correlation length ℓ; countermeasure validation if patterning mitigation (e.g. Yoshino-style) is claimed.

**Fixture scalar correspondence.** None.

**Proposed status:** **PROOF-PROFILE-CANDIDATE** (Zapatero 2021 / Sixto 2022 for bounded ℓ) gated by **UNMAPPED-CHARACTERIZATION-REQUIRED** (ℓ and correlation magnitude unmeasured).

---

## 5. Incomplete phase randomization

**Mechanism.** Gain-switched lasers are assumed to emit phase-randomized pulses, but residual coherence between successive pulses (imperfect gain switching, insufficient intracavity field decay) or a faulty active randomization stage makes the global phase distribution non-uniform. Discrete (rather than continuous) phase randomization is a structured special case.

**Classification.** **SECURITY-PROOF-MODIFYING — and architecturally deep.** Without (near-)uniform phase randomization the photon-number channel decomposition τ_n does not exist; the entire decoy estimation of s_X,1 and φ_X — hence every term of the margin equation except λ_EC — rests on it. Non-random phases additionally enable attacks using phase information (Lo & Preskill, Quantum Inf. Comput. 7, 431–458, 2007 — VERIFIED via citation record in arXiv:2408.07960 ref list, secondary-source verified).

**Candidate proof-compatible treatment.** Seed #2: Nahar, Upadhyaya, Lütkenhaus, "Imperfect phase randomization and generalized decoy-state quantum key distribution," PR Applied 20, 064031 (2023), DOI 10.1103/PhysRevApplied.20.064031 — VERIFIED: replaces the perfect-PR assumption with a characterized phase PDF and derives corrected decoy bounds. Complement: Currás-Lorenzo et al., "Security of quantum key distribution with imperfect phase randomisation," Quantum Sci. Technol. 9, 015025 (2023) — VERIFIED. Faulty *active* randomization: Sixto, Currás-Lorenzo, Tamaki, Curty, "Secret key rate bounds for quantum key distribution with faulty active phase randomization," EPJ Quantum Technol. 10, 53 (2023), DOI 10.1140/epjqt/s40507-023-00210-0 — VERIFIED incl. DOI via Springer record (note: some secondary records cite article number "1"; the version of record is **53**).

**What breaks if ignored (fixture status quo).** The fixture assumes perfect PR silently; the emitted key numbers are then conditional on an assumption with no characterized support. A scalar QBER stress cannot substitute: imperfect PR changes the *channel structure*, not the error rate.

**Required characterization evidence.** Measured global-phase distribution (interferometric visibility between successive pulses; phase-PDF estimate); inter-pulse coherence time; verification that the measured PDF falls inside the proof's admissible class.

**Fixture scalar correspondence.** None.

**Proposed status:** **PROOF-PROFILE-CANDIDATE** (seed #2 machinery) gated by **UNMAPPED-CHARACTERIZATION-REQUIRED** (no phase-PDF measurement exists); the frozen fixture as-is is **UNMAPPED-PROOF-REQUIRED** on this row.

---

## 6. Passive side channels / mode dependencies (distinguishability in non-encoded degrees of freedom)

**Mechanism.** The emitted pulses differ between settings not only in the intended qubit degree of freedom but also in spectrum, timing, spatial mode, or higher-dimensional modulation signatures (e.g. modulator chirp). The states are then *partially distinguishable* in a side channel Eve can measure without disturbing the qubit.

**Classification.** **SECURITY-PROOF-MODIFYING.** Setting-dependent side-channel modes leak the basis/bit (and intensity) choice to Eve outside the count/QBER observables entirely; no amount of QBER monitoring sees it. Evidence that such hidden side channels are generic in modulator-based transmitters: Gnanapandithan, Qian, Lo, "Hidden multidimensional modulation side channels in quantum protocols," PRL 134, 130802 (2025) — VERIFIED via citation record (secondary-source verified).

**Candidate proof-compatible treatment.** Mode dependencies that preserve an effective qubit+flag structure can be folded into an enlarged source model and bounded via reference-state/coin techniques within the unified framework: Currás-Lorenzo et al., Optica Quantum 3, 525 (2025) / arXiv:2305.05930 — VERIFIED (published record confirmed; supersedes the preprint-only label used in earlier working documents). For time-dependent passive side channels in MDI settings: Bourassa, Gnanapandithan, Qian, Lo, PRA 106, 062618 (2022) — VERIFIED via citation record (secondary). Side-channel-secure protocol redesigns (e.g. Wang, Hu, Yu, PR Applied 12, 054034, 2019 — VERIFIED via citation records) exist but change the protocol, not just the proof.

**What breaks if ignored.** Distinguishability outside the qubit mode is invisible to every fixture scalar; treating the QBER as the complete error observable is then false.

**Required characterization evidence.** Spectral/temporal/spatial mode measurements conditioned on each of the 4 states × 3 intensities; mutual-distinguishability bounds (e.g. mode overlap matrices).

**Fixture scalar correspondence.** None.

**Proposed status:** **UNMAPPED-SECURITY-BUDGET** (requires an explicit isolation/distinguishability budget) + **UNMAPPED-CHARACTERIZATION-REQUIRED**; PROOF-PROFILE-CANDIDATE exists (unified framework).

---

## 7. Trojan-horse / active source leakage

**Mechanism.** Eve injects bright light into the transmitter; back-reflected light picks up the modulator state (phase/intensity encoding) and returns to Eve, who reads the settings directly. Distinct from §6: here the leakage is *actively induced* and its magnitude depends on Alice's isolation, not on Eve's probe alone.

**Classification.** **SECURITY-PROOF-MODIFYING.** The leaked mode gives Eve setting information with zero signature in counts/QBER. Gisin et al., PRA 73, 022320 (2006) — VERIFIED via citation records — established the attack concept.

**Candidate proof-compatible treatment.** All treatments make security **conditional on a measured isolation bound**: Lucamarini et al., "Practical security bounds against the Trojan-horse attack in quantum key distribution," PRX 5, 031030 (2015), DOI 10.1103/PhysRevX.5.031030 — VERIFIED (bridge R23); Tamaki, Curty, Lucamarini, "Decoy-state quantum key distribution with a leaky source," NJP 18, 065008 (2016) — VERIFIED via multiple citation records (DOI not asserted — pattern not independently confirmed); Wang, Tamaki, Curty, "Finite-key security analysis for quantum key distribution with leaky sources," NJP 20, 083027 (2018), DOI 10.1088/1367-2630/aad839 — VERIFIED incl. DOI; Navarrete & Curty, "Improved finite-key security analysis of quantum key distribution against Trojan-horse attacks," Quantum Sci. Technol. 7, 035021 (2022) — VERIFIED via citation records; Sixto et al., "Quantum key distribution with imperfectly isolated devices," Quantum Sci. Technol. 10, 035034 (2025), DOI 10.1088/2058-9565/addb6e — VERIFIED (joint treatment of imperfect isolation with other source imperfections). Hardware-side context (characterization of protective components): Ponosova et al., PRX Quantum 3, 040307 (2022) and optical-power-limiter bounds, PR Applied 21, 014026 (2024) — both VERIFIED via citation records (secondary; use only as evidence that isolation is measurable, not for any number).

**What breaks if ignored.** A leakage channel is outside the count/QBER model entirely; the margin equation emits a positive key while Eve may hold setting information — the bridge doc's prohibited case ("emit security claims while leakage bound fields are empty").

**Required characterization evidence.** Source isolation (dB) including all input ports; back-reflection mean photon number per injected photon, μ_out; worst-case bounds under component aging; modulator response to injected light.

**Fixture scalar correspondence.** None.

**Proposed status:** **UNMAPPED-SECURITY-BUDGET** + **UNMAPPED-CHARACTERIZATION-REQUIRED**; PROOF-PROFILE-CANDIDATEs exist but every one is conditional on measured isolation — with zero characterization this row is **BLOCKING** for any unconditional security claim.

---

## 8. Characterization uncertainty of source parameters (finite-precision calibration)

**Mechanism.** Even where a proof accepts imperfection parameters (SPF deviation δ_spf, intensity intervals, phase-PDF bound, correlation length, isolation), those parameters are *statistical estimates* from finite characterization campaigns, carrying confidence levels; treating the estimates as exact re-introduces the point-value fallacy at one remove.

**Classification.** **SECURITY-PROOF-MODIFYING at the meta level.** The proof's robustness statement must hold for *every* device in a robust parameter set S_robust, and the certification step must produce confidence intervals contained in S_robust, with the certification failure probabilities δ_j entering the composed security parameter. This is precisely the framework of seed #4: Tan & Nahar, "Incorporating Device Characterization into Security Proofs," PRX Quantum 7, 020342 (2026), DOI 10.1103/f42p-524t (genuine new-format APS DOI — see audit special note) — VERIFIED.

**Candidate proof-compatible treatment.** (i) Adopt the Tan–Nahar certify-then-run architecture: per-parameter confidence intervals (binomial/Gaussian as appropriate; Clopper–Pearson-type constructions per the bridge doc) at stated 1 − δ_j; reject-and-abort if any interval exits S_robust. (ii) Additive epsilon bookkeeping: total ε gains the sum of characterization failure terms. (iii) Numerical proof methods that accept partial characterization directly: Currás-Lorenzo et al., "Numerical security analysis for quantum key distribution with partial state characterization," Quantum Sci. Technol. 10, 035031 (2025) — VERIFIED via citation record (secondary).

**What breaks if estimates are treated as exact.** The composed security parameter ε is understated by the sum of the (unaccounted) characterization failure probabilities; and a device outside S_robust is silently run as if inside.

**Required characterization evidence.** This row *is* the requirement register: for every parameter in §1–§7, a measurement protocol, a sample size, a confidence construction, and a δ_j.

**Fixture scalar correspondence.** None — the fixture treats all inputs as exact constants.

**Proposed status:** **UNMAPPED-CHARACTERIZATION-REQUIRED** (definitional); with zero characterization, all eight rows collapse to **BLOCKING** for unconditional claims, consistent with the fail-closed register.

---

## MASTER TABLE (D5 mandatory columns)

| # | Device effect | Current scalar model | Security relevance | Candidate proof treatment | Required mathematical parameter | Required characterization evidence | Confidence treatment | Current status |
|---|---|---|---|---|---|---|---|---|
| S1 | State-preparation (encoding) flaws | Absorbed into scalar QBER/misalignment e_d | Proof-modifying: basis-dependent flaws invalidate GLLP Δ-term-free φ_X bound | Loss-tolerant (Tamaki PRA 90, 052314 2014; Mizutani NJP 17, 093011 2015); modified BB84 (Pereira PRR 5, 023065 2023); unified framework (Currás-Lorenzo, Optica Quantum 3, 525 2025) | Bloch-sphere deviation δ_spf / state overlaps; or quantum-coin imbalance Δ (measured) | State tomography or reference-state overlaps of 4 emitted states; basis-dependence evidence | CI on δ_spf enters S_robust (§8) | UNMAPPED-PROOF-REQUIRED (basis-dependent part); PARTIAL-SCALAR-STRESS-ONLY (basis-independent part) |
| S2 | Correlated encoding (pulse-to-pulse SPF correlations) | None | Proof-modifying: breaks IID + random-sampling finite-key statistics | Nagamatsu PRA 93, 042325 2016; Mizutani npj QI 5, 8 2019; Pereira Sci. Adv. 6, eaaz4487 2020; Pereira QST 10, 015001 2025 (unbounded); Marwah–Dupuis arXiv:2402.12346 (preprint) | Correlation length ℓ and correlation-strength bound | Conditional state tomography given predecessor settings; autocorrelation vs lag | Martingale (Azuma/Kato) bounds replace Hoeffding | UNMAPPED-PROOF-REQUIRED + UNMAPPED-CHARACTERIZATION-REQUIRED |
| S3 | Intensity fluctuations (independent; incl. systematic μ offset) | {μ_j} as exact scalars | Proof-modifying but bounded: decoy p_{k|n} needs fluctuation intervals | Mizutani NJP 17, 093011 2015 (finite-key with fluctuating intensities); Ma PRA 72, 012326 2005 | Per-setting intervals [μ_j⁻, μ_j⁺] | Per-setting intensity distributions; calibration-chain uncertainty budget | CI per setting; fail-closed if interval empty | PROOF-PROFILE-CANDIDATE gated by UNMAPPED-CHARACTERIZATION-REQUIRED |
| S4 | Intensity correlations (pulse-to-pulse) | None | Proof-modifying: breaks IID structure of decoy estimation | Zapatero Quantum 5, 602 2021; Sixto PR Applied 18, 044069 2022; unbounded case via Pereira QST 10, 015001 2025; experimental reality: Yoshino npj QI 4, 8 2018 | Correlation length ℓ_μ; conditional-intensity bound | p(μ_i \| previous settings); ℓ measurement | CI on correlation bounds | PROOF-PROFILE-CANDIDATE gated by UNMAPPED-CHARACTERIZATION-REQUIRED |
| S5 | Incomplete phase randomization | Assumed perfect (no term) | Proof-modifying, architectural: τ_n decomposition (hence s_X,1, φ_X) presupposes PR | Nahar PR Applied 20, 064031 2023 (seed #2); Currás-Lorenzo QST 9, 015025 2023; Sixto EPJ QT 10, 53 2023 (faulty active PR) | Characterized global-phase PDF (deviation from uniform) | Inter-pulse phase-visibility / phase-PDF measurement | PDF bound inside proof's admissible class | UNMAPPED-PROOF-REQUIRED as frozen; PROOF-PROFILE-CANDIDATE exists; UNMAPPED-CHARACTERIZATION-REQUIRED |
| S6 | Passive side channels / mode dependencies | None | Proof-modifying: setting info leaks in non-encoded modes; invisible to QBER | Unified framework (Currás-Lorenzo, Optica Quantum 3, 525 2025); MDI passive side channels (Bourassa PRA 106, 062618 2022); evidence of genericity: Gnanapandithan PRL 134, 130802 2025 | Mode-overlap / distinguishability bound per setting | Spectral/temporal/spatial mode measurement conditioned on 12 setting combinations | Distinguishability budget + CI | UNMAPPED-SECURITY-BUDGET + UNMAPPED-CHARACTERIZATION-REQUIRED |
| S7 | Trojan-horse / active source leakage | None | Proof-modifying: actively induced setting leakage; zero count/QBER signature | Lucamarini PRX 5, 031030 2015; Tamaki NJP 18, 065008 2016; Wang NJP 20, 083027 2018; Navarrete–Curty QST 7, 035021 2022; Sixto QST 10, 035034 2025 | Isolation bound (dB); back-reflected mean photon number μ_out | Source isolation measurement; back-reflection coefficient; aging envelope | Isolation CI enters S_robust; abort if unbounded | UNMAPPED-SECURITY-BUDGET; BLOCKING for unconditional claims while unmeasured |
| S8 | Characterization uncertainty of source parameters | All parameters exact constants | Meta-level: composed ε understated; point-value fallacy | Tan & Nahar PRX Quantum 7, 020342 2026 (seed #4) certify-then-run; partial-characterization numerics (Currás-Lorenzo QST 10, 035031 2025) | Robust parameter set S_robust; per-parameter CIs; failure probs δ_j | Measurement protocol + sample size + confidence construction per §1–§7 parameter | ε_total gains Σδ_j additively | UNMAPPED-CHARACTERIZATION-REQUIRED (definitional); renders S1–S7 BLOCKING for unconditional claims at zero characterization |

**Interaction flags (D5 acceptance criterion).** (i) S2×S4: modulator memory typically correlates encoding and intensity jointly; separate ℓ bounds per DOF may understate joint correlation — treat via the joint-correlation analyses (Pereira QST 10, 015001 2025; Mizutani npj QI 5, 8 2019). (ii) S5×S4: intensity correlations in gain-switched lasers co-occur with inter-pulse phase coherence; characterizing one without the other is insufficient. (iii) S1×S6: a "state-preparation flaw" measured only in the qubit mode can masquerade as a side channel in an unmeasured mode — characterization must specify the mode. (iv) S7×S3: injected light can shift modulator operating points, so a THA can *induce* intensity fluctuations correlated with Eve's probe — breaking the independence condition of the Mizutani-type treatment.

---

## Reference verification ledger (source-side; DOI status as of 2026-08-27)

| Ref | Record | DOI | Status |
|---|---|---|---|
| GLLP 2004 | Quantum Inf. Comput. 4, 325–360; arXiv:quant-ph/0212066 | — (QIC has none) | VERIFIED (audit) |
| Lo–Ma–Chen 2005 (seed #6) | PRL 94, 230504 | 10.1103/PhysRevLett.94.230504 | VERIFIED (audit) |
| Ma et al. 2005 | PRA 72, 012326 | 10.1103/PhysRevA.72.012326 | VERIFIED (audit) |
| Lo & Preskill 2007 | Quantum Inf. Comput. 7, 431–458 | — (QIC) | VERIFIED via secondary citation record |
| Gisin et al. 2006 (THA concept) | PRA 73, 022320 | not asserted | VERIFIED via citation records |
| Tamaki et al. 2014 (loss-tolerant) | PRA 90, 052314 | 10.1103/PhysRevA.90.052314 | VERIFIED (audit) |
| Lim et al. 2014 (seed #5) | PRA 89, 022307 | 10.1103/PhysRevA.89.022307 | VERIFIED (audit) |
| Xu et al. 2015 (seed #3) | PRA 92, 032305 | 10.1103/PhysRevA.92.032305 | VERIFIED (audit) |
| Mizutani et al. 2015 | NJP 17, 093011 | 10.1088/1367-2630/17/9/093011 | VERIFIED incl. DOI (this round) |
| Lucamarini et al. 2015 | PRX 5, 031030 | 10.1103/PhysRevX.5.031030 | VERIFIED (bridge R23) |
| Nagamatsu et al. 2016 | PRA 93, 042325 | not asserted | VERIFIED via citation records |
| Tamaki, Curty, Lucamarini 2016 | NJP 18, 065008 | not asserted (pattern not independently confirmed) | VERIFIED (vol/article via multiple records) |
| Yoshino et al. 2018 | npj QI 4, 8 | 10.1038/s41534-017-0057-8 | VERIFIED incl. DOI (this round) |
| Wang, Tamaki, Curty 2018 | NJP 20, 083027 | 10.1088/1367-2630/aad839 | VERIFIED incl. DOI (this round) |
| Mizutani et al. 2019 | npj QI 5, 8 | 10.1038/s41534-018-0122-y | VERIFIED incl. DOI (this round) |
| Pereira et al. 2020 | Science Advances 6, eaaz4487 | not asserted | VERIFIED via citation records |
| Zapatero et al. 2021 | Quantum 5, 602 | 10.22331/q-2021-12-07-602 | VERIFIED (bridge R24) |
| Currás-Lorenzo et al. 2021 | PRA 104, 012406 | not asserted | VERIFIED via secondary citation record |
| Sidhu et al. 2022 (seed #1) | npj QI 8, 18 | 10.1038/s41534-022-00525-3 | VERIFIED (audit) |
| Sixto, Zapatero, Curty 2022 | PR Applied 18, 044069 | not asserted (standard pattern; not independently resolved) | VERIFIED (audit) |
| Navarrete & Curty 2022 | QST 7, 035021 | not asserted | VERIFIED via citation records |
| Bourassa et al. 2022 | PRA 106, 062618 | not asserted | VERIFIED via secondary citation record |
| Ponosova et al. 2022 | PRX Quantum 3, 040307 | not asserted | VERIFIED via secondary citation record |
| Nahar, Upadhyaya, Lütkenhaus 2023 (seed #2) | PR Applied 20, 064031 | 10.1103/PhysRevApplied.20.064031 | VERIFIED (audit) |
| Currás-Lorenzo et al. 2023 | QST 9, 015025 | not asserted | VERIFIED (audit) |
| Sixto et al. 2023 | EPJ Quantum Technol. 10, **53** (not "1" — some secondary records err) | 10.1140/epjqt/s40507-023-00210-0 | VERIFIED incl. DOI (this round) |
| Pereira et al. 2023 (modified BB84) | PRR 5, 023065 | 10.1103/PhysRevResearch.5.023065 | VERIFIED (audit) |
| Huang et al. 2023 | PR Applied 19, 014048 | not asserted | VERIFIED via secondary citation record |
| Marwah & Dupuis 2024 | arXiv:2402.12346 | — | VERIFIED as PREPRINT; no journal version confirmed — label PREPRINT in all uses |
| Trefilov et al. 2024 | arXiv:2411.00709 | — | VERIFIED as PREPRINT (audit flag 7); no journal version confirmed — label PREPRINT in all uses |
| Pereira et al. 2025 (unbounded correlations) | QST 10, 015001 | not asserted | VERIFIED (audit) |
| Currás-Lorenzo et al. 2025 (unified source framework) | **Optica Quantum 3, 525 (2025)**; supersedes preprint-only label for arXiv:2305.05930 | not asserted | VERIFIED via two independent citation records (this round) |
| Sixto et al. 2025 (imperfect isolation) | QST 10, 035034 | 10.1088/2058-9565/addb6e | VERIFIED incl. DOI (this round) |
| Currás-Lorenzo et al. 2025 (partial characterization numerics) | QST 10, 035031 | not asserted | VERIFIED via secondary citation record |
| Gnanapandithan, Qian, Lo 2025 | PRL 134, 130802 | not asserted | VERIFIED via secondary citation record |
| Tan & Nahar 2026 (seed #4) | PRX Quantum 7, 020342 | 10.1103/f42p-524t (genuine new-format APS DOI) | VERIFIED (audit, extra scrutiny) |
| Tupkary, Nahar, Arqand, Tan & Lütkenhaus 2026 (consolidated decoy-BB84 proof), "A rigorous and complete security proof of decoy-state BB84 quantum key distribution" | arXiv:2601.18035 (2026) — PREPRINT (under review; no journal publication asserted) | — | **PREPRINT-LABELED** (reverted from an unverified published-form claim — see post-hoc correction below) |

**Post-hoc correction (red-team C1, 2026-08-27).** The ledger row above previously recorded Tupkary et al. arXiv:2601.18035 as "Quantum 10, 2037 (2026), DOI 10.22331/q-2026-03-23-2037, VERIFIED via Quantum journal page record." Independent re-check found that publication attribution **false/unverified** — the paper is a preprint under review (submitted 25 Jan 2026). The published-form claim and its verification provenance are REVERTED; the item is cited as a PREPRINT everywhere in the package. (No assertion is made about which other paper holds the Quantum 10, 2037 record.) The Optica Quantum 3, 525 (2025) upgrade for arXiv:2305.05930 was re-checked under the same review and stands.

## Most consequential findings (for orchestrator)

1. **The frozen fixture's source model fails at its foundation, not its edges.** The margin equation's decoy terms (s_X,0, s_X,1, φ_X) presuppose perfect phase randomization (S5) and exactly known IID intensities (S3/S4) and ideal encoding (S1); none of these has any characterized support. Under fail-closed rules every emitted key number is *conditional* on unverified source-model assumptions.
2. **Proof-profile candidates exist for 7 of 8 rows** — the strongest single consolidation is the unified source-imperfection framework (now published: Currás-Lorenzo et al., Optica Quantum 3, 525, 2025, supplanting the preprint label) plus the unbounded-correlation analysis (Pereira et al., QST 10, 015001, 2025) and seed #2 for phase randomization. No integration work is needed to *identify* the proofs; the gap is entirely characterization.
3. **S7 (Trojan horse) and S6 (passive side channels) are BLOCKING for unconditional claims**: every available proof is conditional on a measured isolation/distinguishability budget, and Q-Orbit has none. This is a security-budget item, not a proof item.
4. **S8 is the keystone row**: Tan & Nahar (seed #4) supply exactly the certify-then-run architecture Q-Orbit lacks; without it, even correct proof choices emit uncomposed, over-claimed epsilons.
5. **Prohibited substitutions to police in the manuscript:** correlation-as-scalar-jitter (S4), SPF-as-QBER (S1), nominal-μ-as-bound (S3), and security claims with empty leakage fields (S7) — all four are explicitly flagged prohibited moves in the bridge doc.

## Verification failures / caveats

- **Marwah & Dupuis (arXiv:2402.12346)**: journal publication not found; **PREPRINT-only** — always labeled.
- **Trefilov et al. (arXiv:2411.00709)**: journal publication not found; **PREPRINT-only** — always labeled.
- **Currás-Lorenzo et al. arXiv:2305.05930**: previously carried as "preprint"; **now upgraded** to published record (Optica Quantum 3, 525, 2025) on the strength of two independent 2026 citation records; the Optica Quantum page itself was not opened from this sandbox — DOI not asserted. Confidence: high.
- **Sixto et al. EPJ QT 2023**: article number discrepancy across secondary records ("10, 1" vs "10, 53"); the Springer version-of-record page gives **10, 53**, DOI 10.1140/epjqt/s40507-023-00210-0. Use 53.
- **IOP DOIs** (QST/NJP items): volume/article verified via multiple independent records, but except where listed above (Mizutani NJP 2015; Wang NJP 2018; Sixto QST 2025) the DOI strings are **not asserted** (IOP DOIs embed non-derivable article hashes; pattern-guessing would risk fabrication). Cite by volume/article.
- **Tamaki, Curty, Lucamarini NJP 18, 065008 (2016)**: verified via multiple independent citation records; DOI not asserted.
- **Secondary-source-only items** (Lo & Preskill 2007; Gisin 2006; Nagamatsu 2016; Bourassa 2022; Ponosova 2022; Huang 2023; Gnanapandithan 2025; Currás-Lorenzo PRA 2021; Currás-Lorenzo QST 10, 035031 2025; optical-power-limiter PR Applied 21, 014026 2024): verified via citation records in already-verified papers, not via publisher pages — flagged per bridge convention; acceptable for proof-pointer use, not as numerical evidence.
- **No UNVERIFIED or FABRICATED reference is used as load-bearing** in any row; preprints are labeled and non-load-bearing.
