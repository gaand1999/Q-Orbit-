# Q-Orbit — Detector & Receiver Effect Analysis (Agent D)

**Date:** 2026-08-27 · **Scope:** efficient-BB84 weak-coherent-pulse satellite-to-ground downlink; 1 signal + 2 decoy intensities (one vacuum); finite-key fixture after Sidhu et al. (npj Quantum Information 8, 18, 2022); scalar software model only; zero physical characterization; fail-closed policy.

**Guiding question for each effect:** does the effect merely change *observed rates* (engineering count model), or can it change (i) the information available to the adversary, (ii) the validity of the detection model assumed by the security proof (POVM structure, squashing, basis independence, no memory, IID statistics), or (iii) the correctness of the finite-key statistical statements? Any of (i)–(iii) makes it **SECURITY-PROOF-MODIFYING**.

---

## 0. What the current proof machinery actually assumes about the receiver

The Sidhu-type finite-key analysis (Lim et al. tight finite-key bounds; GLLP security structure) assumes, on the detection side:

1. **Squashability:** Bob's physical optical measurement admits a squashing model — a qubit (or flag-augmented qubit) measurement followed by classical post-processing — so that a qubit-level privacy proof applies to a bosonic optical receiver (Beaudry, Moroder & Lütkenhaus, PRL 101, 093601, 2008; Gittsovich et al., PRA 89, 012325, 2014).
2. **Detector efficiency as a pure loss:** a scalar transmittivity multiplying all photon-number components equally (photon-number-independent efficiency), or at most a *bounded, basis-independent* mismatch (Fung et al., QIC 9, 131–165, 2009).
3. **No memory:** detection events in different pulse slots are conditionally independent given Eve's systems; statistics in each slot are IID, so that Serfling-type random-sampling bounds (Sidhu fixture) apply.
4. **Adversary acts only on the channel, not inside the receiver:** the detection setup (POVMs) is fixed and known, up to bounded, characterized deviations.
5. **Extraneous counts are IID and basis-symmetric** (dark-count/background model: each slot, independent of everything else, with probability p each detector may click, producing 50% erroneous bits).

The three fixture scalars map onto assumptions 2 and 5: **detector-efficiency multiplier** ↔ scalar photon-number-independent efficiency; **extraneous-count probability** ↔ IID dark/background counts; **afterpulse probability** ↔ an IID additive click probability attributed to afterpulsing (see §6 for exactly what this can and cannot represent). None of the fixture scalars encode time dependence, rate dependence, history dependence, mode dependence, or adversarial actuation of the receiver.

**Reference-verification note (fixture):** Sidhu, Brougham, McArthur, Pousa, Oi, "Finite key effects in satellite quantum key distribution," *npj Quantum Information* 8, 18 (2022), DOI 10.1038/s41534-022-00525-3 — VERIFIED (title/authors/venue/year/article number).

---

## 1. Detector dead time

**Mechanism.** After a detection event, the detector (SPAD: quench + reset; SNSPD: kinetic-inductance latching + current recovery) is blind for a dead time τ_d, during which photons produce no click. At a fixed click budget this truncates the observed count rate, most strongly at the low-loss part of the satellite pass.

**Classification.** *Prima facie* ENGINEERING-COUNT-MODEL-ONLY — but with a hard security caveat. If dead time is identical across detectors and not manipulable, it reduces all yields by a common, signal-and-Eve-independent factor and leaves the proof untouched. However: (i) it makes efficiency **rate-dependent** (violates scalar-efficiency assumption when rates vary across the pass, and can become **detector- and basis-dependent** because the two bases see different rates, creating a dynamically generated efficiency mismatch — see §6); (ii) it is adversarially exploitable: Weier et al., "Quantum eavesdropping without interception: an attack exploiting the dead time of single-photon detectors," *New J. Phys.* 13, 073024 (2011) — VERIFIED — shows Eve can selectively keep detectors dead and steer detections. Under adversarial actuation it is **SECURITY-PROOF-MODIFYING**.

**What breaks if absorbed into scalar efficiency/QBER.** A scalar η folds dead-time loss into a constant multiplier. This silently assumes the loss is signal-independent and Eve-independent; it erases (a) the pass-profile dependence (η becomes a function of instantaneous rate, which the scalar model cannot express), (b) differential dead-time occupancy between detectors (hidden mismatch, exactly the hidden-substitution risk the rules prohibit), and (c) the adversarial control channel (dead-time attack is invisible in a rate-averaged scalar).

**Candidate proof-compatible treatment.** (i) Engineering: explicit non-paralyzable/paralyzable count model with per-detector τ_d and rate-dependent yields (see §2). (ii) Security: treat dead time as a bounded, time-dependent efficiency mismatch and feed worst-case bounds into mismatch-aware proofs (Fung et al. 2009; Bochkov & Trushechkin, PRA 99, 032308, 2019; Zhang et al., PRR 3, 013076, 2021; Trushechkin, Quantum 6, 771, 2022). (iii) Preliminary analysis: Burenkov, Qi, Fortescue & Lo, "Security of high speed quantum key distribution with finite detector dead time," arXiv:1005.0272 (2010) — arXiv preprint; journal publication NOT confirmed (verification caveat; use only as preprint). (iv) Countermeasure-level: monitoring of per-slot count rates and random basis/detector reassignment.

**Required characterization evidence (observables only).** Per-detector dead-time distribution (paralyzable vs non-paralyzable response curves); per-detector count-rate response curves under CW and pulsed illumination; cross-check that dead time is basis-independent; response to injected bright-light pulses (adversarial resilience test).

**Fixture scalar correspondence.** None. The detector-efficiency multiplier cannot represent rate-dependent loss; **PARTIAL-SCALAR-STRESS-ONLY** at best for uniform low-rate regimes.

**Proposed status:** **UNMAPPED-MODEL-REQUIRED** (engineering); escalates to **UNMAPPED-SECURITY-BUDGET** for the adversarial dead-time attack given zero characterization.

---

## 2. Recovery dynamics (paralyzable vs non-paralyzable behavior)

**Mechanism.** During and after dead time the detector's efficiency recovers along a device-specific curve (SPAD: bias recharge, avalanche quenching; SNSPD: current recovery through the nanowire with hotspot relaxation). A non-paralyzable detector ignores events during dead time; a paralyzable one re-arms only after a quiet interval, so high rates can lock it into extended deadness — a qualitatively different saturation curve.

**Classification.** ENGINEERING-COUNT-MODEL-ONLY for the honest channel, PROVIDED the recovery curve is identical and constant per detector. It becomes SECURITY-PROOF-MODIFYING through two mechanisms: (i) recovery-induced, history-dependent efficiency (§5, §11) — the efficiency of slot *i* depends on events in slots *< i*, violating the no-memory assumption of the fixture's finite-key statistics; (ii) under adversarial rate manipulation (bright-pulse injection between QKD pulses) the receiver's state becomes Eve-controlled (cf. the "recovery-induced erasure" attack concept, arXiv:2603.03217, 2026 — preprint, mechanism-level evidence; and Qian et al., "Hacking the QKD system by exploiting the avalanche-transition region of single-photon detectors," PR Applied 10, 064062, 2018 — VERIFIED, exploits the detector's analog response region).

**What breaks if absorbed into scalar efficiency/QBER.** The fixture's expected-count model has no time-stepped detector state; folding recovery into a single η imposes an equilibrium-rate assumption that is false across a pass whose loss sweeps by tens of dB. It also hides the memory kernel, i.e. correlations that an IID extraneous-count term is explicitly forbidden to carry.

**Candidate proof-compatible treatment.** Model the receiver as a finite-state machine (state = occupancy/recovery level) with transition probabilities measured experimentally; prove security against the worst-case state sequence consistent with observed count logs, or restrict operation to a certified low-rate regime where recovery is provably complete between slots and justify this as a *device assumption with monitoring*. For SNSPDs, latching behavior and reset curves are the relevant observables.

**Required characterization evidence.** Per-detector double-pulse efficiency-vs-separation curves (recovery curves); paralyzable/non-paralyzable identification from count-rate vs incident-rate curves; latching thresholds; dependence of recovery on count history (third-order pulse trains).

**Fixture scalar correspondence.** None; **PARTIAL-SCALAR-STRESS-ONLY** via η at a single operating rate.

**Proposed status:** **UNMAPPED-MODEL-REQUIRED**.

---

## 3. Saturation at high count rate

**Mechanism.** Beyond the linear regime, observed rate R_obs = f(R_inc) rolls off (dead-time pileup, readout bandwidth, TDC buffering, SNSPD latching). Saturation is the benign end of the same response surface whose malicious end is detector blinding (§12).

**Classification.** ENGINEERING-COUNT-MODEL-ONLY when saturation is (a) identical across detectors, (b) reached only by honest signal+background, and (c) monitored. It is SECURITY-PROOF-MODIFYING whenever (i) different detectors saturate differently (dynamically induced, rate-dependent efficiency mismatch — §6), or (ii) saturation is approached by adversary-injected light — this is exactly the onset of control attacks (Makarov, NJP 11, 065003, 2009; Sauge et al., Opt. Express 19, 23590, 2011; Lydersen et al., NJP 13, 113042, 2011 — all VERIFIED). The proof's assumption "η is a fixed loss independent of the optical input state" fails the moment the response is nonlinear in input power.

**What breaks if absorbed into scalar efficiency/QBER.** A linear η cannot represent any rollover; expected counts would be over-predicted at the pass minimum-loss point. Worse, absorbing saturation into QBER mislabels pileup-induced double clicks and dead slots as "noise," concealing the attack surface from the security budget.

**Candidate proof-compatible treatment.** Explicit nonlinear response model R_obs(μ_in) per detector in the engineering model; security-side, impose a certified maximum input flux (power-limiting with characterized limiter — cf. security-boundary analysis of optical power limiters, arXiv:2303.12355, 2023 — VERIFIED preprint/journal article) and treat any excursion as abort. Residual nonlinearity below the limit enters as bounded efficiency mismatch.

**Required characterization evidence.** Per-detector full input-output response curves from single-photon level through saturation and into the analog/blinding transition; recovery after overload; TDC/readout throughput limits.

**Fixture scalar correspondence.** None. **UNMAPPED-MODEL-REQUIRED** (engineering); **BLOCKING** as the entry point of the detector-control attack class (§12) while receiver response above linear regime is uncharacterized.

---

## 4. Timing jitter (effect on temporal filtering / gate assignment)

**Mechanism.** The delay between photon absorption and the registered timestamp fluctuates (SPAD avalanche build-up statistics; SNSPD hotspot formation; electronics/TDC noise). Combined with a finite acceptance window (temporal filter), jitter means the *effective* efficiency is a function of arrival time: η(t) = η₀·P(jitter+arrival ∈ window).

**Classification.** **SECURITY-PROOF-MODIFYING** (partially), and here is the precise reason: jitter converts arrival time — a degree of freedom the adversary can modulate (dispersion, shifting, or simply the channel's own timing) — into a detection probability. If the two detectors/bases have different jitter distributions, η_X(t) ≠ η_Z(t): a **time-dependent, Eve-influenceable efficiency mismatch**, which is the exact enabler of the time-shift attack (Qi, Fung, Lo & Ma, QIC 7, 73, 2007 — VERIFIED; experimentally demonstrated by Zhao, Fung, Qi, Chen & Lo, PRA 78, 042333, 2008 — VERIFIED). Separately, jitter distributions that leak into publicly discussed timing create a timing side channel (Lamas-Linares & Kurtsiefer, Opt. Express 15, 9388, 2007 — VERIFIED). Pure symmetric jitter with mode-matched detectors only degrades rate → engineering-only; but symmetry is a *characterized property*, not an assumption one may make.

**What breaks if absorbed into scalar efficiency/QBER.** The scalar model has no time axis within a slot: gate-edge losses and inter-detector jitter asymmetry vanish into η and p_ext respectively. That is precisely the hidden mismatch that the time-shift attack exploits; the attack succeeds in practice without raising QBER at the averaged-scalar level.

**Candidate proof-compatible treatment.** (i) Engineer η(t) per detector from measured jitter histograms; (ii) take worst-case over Eve-controlled arrival times within the mismatch-aware proofs (Fung et al. 2009; Zhang et al. PRR 2021; Bochkov-Trushechkin PRA 2019); (iii) architectural: active basis/detector randomization schemes, or measurement with a single detector and fast polarization switch to structurally eliminate detector-detector mismatch; (iv) note the demonstrated failure of naive countermeasures: Huang et al., "Testing random-detector-efficiency countermeasure in a commercial system reveals a breakable unrealistic assumption," IEEE J. Quantum Electron. 52, 8000411 (2016) — VERIFIED.

**Required characterization evidence.** Per-detector, per-basis timing-jitter histograms (instrument response functions); detection-efficiency-vs-arrival-delay maps across the acceptance window; stability of these maps vs temperature, count rate, and history.

**Fixture scalar correspondence.** The window-average of η(t) can inform the efficiency multiplier — **PARTIAL-SCALAR-STRESS-ONLY**; the time-resolved structure (the security-relevant part) is absent.

**Proposed status:** **UNMAPPED-CHARACTERIZATION-REQUIRED** (proof machinery exists; its inputs are unmeasured).

---

## 5. Afterpulsing with history dependence (multi-pulse memory)

**Mechanism.** In SPADs, carriers from each avalanche are trapped in defect levels and released later, retriggering avalanches (afterpulses). Trap occupancy — hence the instantaneous afterpulse probability — is proportional to the recent avalanche history, so afterpulsing is fundamentally a *conditional, history-dependent* process with multiple release timescales. Verified model literature: Ziarkash, Joshi, Stipčević & Ursin, "Comparative study of afterpulsing behavior and models in single photon counting avalanche photo diode detectors," *Sci. Rep.* 8, 5076 (2018), DOI 10.1038/s41598-018-23398-z; Itzler, Jiang & Entwistle, "Power law temporal dependence of InGaAs/InP SPAD afterpulsing," *J. Mod. Opt.* 59, 1472–1480 (2012); Horoshko, Chizhevsky & Kilin, "Afterpulsing model based on the quasi-continuous distribution of deep levels in single-photon avalanche diodes," *J. Mod. Opt.* 64, 191–195 (2017). All VERIFIED. (SNSPDs exhibit weaker, device-dependent delayed-click phenomena; no Q-Orbit numbers are assigned either way.)

### 5.1 What the fixture's scalar IID afterpulse term CAN represent
- A **first-order, equilibrium** afterpulse background: if the count rate is stationary, trap occupancy equilibrates, and marginal afterpulse probability per slot is a constant p_ap. As a *marginal* it adds IID-looking clicks.
- Its contribution to the **average QBER** (random clicks → 50% errors) is representable, identical in form to extra dark counts.
- As a **stress knob** (PARTIAL-SCALAR-STRESS-ONLY): sweeping p_ap probes sensitivity of key rate to correlated background, which is a legitimate engineering sensitivity use.

### 5.2 What it CANNOT represent
1. **History dependence / conditioning.** Real afterpulsing is P(click in slot i | detections in slots < i). The IID scalar asserts P(click) independent of history. Under power-law/multi-timescale decay (Itzler 2012; Horoshko 2017), memory extends over many slots; the joint statistics of the click stream are non-IID, and the fixture's finite-key machinery (Serfling-type random sampling over independent slots, per Lim et al./Sidhu et al.) is not directly valid for the afterpulse component. Concentration tools that tolerate dependence (Azuma, Tohoku Math. J. 19, 357, 1967; Kato's inequality, arXiv:2002.04357) would be required instead — VERIFIED as existing tools.
2. **Rate dependence.** p_ap scales with recent count rate; across a satellite pass (loss sweep), the equilibrium assumption fails — p_ap is a function of the pass profile, i.e. a second scalar is silently time-varying.
3. **Detector and basis correlations.** An afterpulse occurs in the *same detector* that fired. Correlated same-detector clicks across consecutive slots produce correlated bit values and — because previous detections are basis-conditioned — **basis-correlated errors**. The fixture's IID extraneous-count term spreads errors symmetrically; hiding afterpulse correlations in it is exactly the prohibited "correlations inside an IID extraneous-count term."
4. **Adversarial exploitability.** Eve can load traps with injected light and harvest the correlated afterpulse train; related demonstrated attacks: Wiechers et al., "After-gate attack on a quantum cryptosystem," NJP 13, 013043 (2011) — VERIFIED (exploits post-gate detector response). Under adversarial actuation, afterpulse statistics are Eve-influenced → SECURITY-PROOF-MODIFYING.
5. **Double-role ambiguity.** The fixture separately carries an extraneous-count scalar; unless the decomposition of p_ext into dark/background vs afterpulse is explicit, the same physical clicks are representable twice with different (and inconsistent) correlation structure — a bookkeeping risk, not just an accuracy risk.

**Classification.** SECURITY-PROOF-MODIFYING for the history-dependent part; the IID marginal is engineering-representable. Overall verdict: the effect *as it exists in hardware* is proof-relevant; the effect *as modeled* is a partial scalar.

**Candidate proof-compatible treatment.** (i) Engineering: trap-level state model (sum-of-exponentials or power-law release kernel) driving a conditional click process; identification method: Humer et al., "A simple and robust method for estimating afterpulsing in single photon detectors," *J. Lightwave Technol.* 33, 3098–3107 (2015) — VERIFIED. (ii) Security: treat afterpulse clicks as a **correlated noise process** and use martingale-type finite-key bounds (Azuma/Kato); or operationally bound the maximum conditional afterpulse probability and absorb it as a worst-case per-slot background *with an explicit theorem that worst-case IID over-approximation of this specific correlation is pessimistic for key rate* — such a theorem does not currently exist in verified form for this model and must not be assumed. (iii) Gated operation with hold-off reduces afterpulsing to a bounded per-gate conditional probability — then the residual must be characterized per gate as a function of previous-slot activity.

**Required characterization evidence.** Inter-arrival-time histograms / conditional click-probability-vs-lag curves per detector (the full memory kernel); p_ap vs count rate; temperature and bias dependence; afterpulse response to injected bright pulses.

**Fixture scalar correspondence.** afterpulse probability ↔ the *equilibrium marginal* only → **PARTIAL-SCALAR-STRESS-ONLY**; extraneous-count probability ↔ legitimate only for the dark/background IID part, NOT for afterpulse correlations.

**Proposed status:** **PARTIAL-SCALAR-STRESS-ONLY** for the scalar; the history-dependent remainder is **UNMAPPED-PROOF-REQUIRED**.

---

## 6. Detection-efficiency mismatch between detectors/bases (time-dependent; time-shift attack relevance)

**Mechanism.** The two (or four) detectors have different efficiencies, possibly differing as functions of arrival time, wavelength, polarization, and rate. Eve can choose which physical mode (e.g. which arrival time) each photon arrives in, thereby choosing which detector is more likely to fire — she gains knowledge of and control over Bob's outcomes without intercepting in the encoded basis.

**Classification.** **SECURITY-PROOF-MODIFYING** — the canonical detector-side proof gap. Attack literature: Makarov, Anisimov & Skaar, PRA 74, 022313 (2006) (with Erratum PRA 78, 019905 (2008)); Qi et al., QIC 7, 73 (2007); Zhao et al., PRA 78, 042333 (2008); Makarov & Skaar, QIC 8, 622 (2008) (faked states on SARG04/phase-time/DPSK/Ekert); Sajeed et al., PRA 91, 062301 (2015) (spatial-mode mismatch — directly relevant to free-space receivers); Chaiwongkhot et al., PRA 99, 062315 (2019) (turbulence-induced spatial-mode mismatch attack on a free-space receiver). Proof-side treatments (all VERIFIED): Fung, Tamaki, Qi, Lo & Ma, QIC 9, 131–165 (2009), arXiv:0802.3788; Lydersen & Skaar, QIC 10, 60–76 (2010); Marøy, Lydersen & Skaar, PRA 82, 032337 (2010); Bochkov & Trushechkin, PRA 99, 032308 (2019); Zhang, Coles, Winick, Lin & Lütkenhaus, PRR 3, 013076 (2021); Trushechkin, Quantum 6, 771 (2022) (multiphoton/decoy case); Marcomini, Mizutani, Grünenfelder, Curty & Tamaki, Quantum Sci. Technol. 10, 035002 (2025) (loss-tolerant with mismatch); Grasselli et al., PR Applied 23, 044011 (2025) (basis-dependent detection probability); and, most on-point for Q-Orbit, Ivchenko et al., "Security of QKD with passive basis choice and detection-efficiency mismatch for a realistic satellite setup," arXiv:2608.09793 (2026) (preprint; applied to a Micius-type satellite downlink). Caveat: passive-basis mismatch proofs give nonzero key only for bounded mismatch (Fung 2009; Ivchenko 2026) — the bound is a characterization product, not a default.

**What breaks if absorbed into scalar efficiency/QBER.** Absorbing mismatch into a single η chooses one efficiency (typically the mean) and thereby *assumes away* Eve's mode choice; the proof then computes privacy against an adversary who cannot select modes — a weaker adversary than physics allows. This is the single clearest instance of the prohibited hidden substitution.

**Candidate proof-compatible treatment.** Bounded-mismatch proofs above; squashing-model framework to define the qubit measurement with mismatch as an explicit parameter (Beaudry et al. 2008; Gittsovich et al. 2014); four-state + loss-tolerant structure (Marcomini 2025); measurement tomography (§9) to supply the POVM-level input; architectural elimination via MDI (§12.2) is incompatible with a direct downlink.

**Required characterization evidence.** Per-detector efficiency maps vs arrival time, wavelength, polarization/spatial mode; inter-detector relative calibration with uncertainty; temporal stability and rate dependence of the mismatch.

**Fixture scalar correspondence.** detector-efficiency multiplier ↔ a *single* common efficiency only → mismatch is unrepresentable; at best **PARTIAL-SCALAR-STRESS-ONLY** as uniform sensitivity sweep.

**Proposed status:** **PROOF-PROFILE-CANDIDATE** (proof machinery verified and available) gated by **UNMAPPED-CHARACTERIZATION-REQUIRED**.

---

## 7. Wavelength-dependent response

**Mechanism.** Detector efficiency, receiver optics transmission, and basis-splitter behavior all depend on wavelength; in the downlink there is also Doppler and chromatic atmosphere. Eve can inject light at wavelengths where the receiver's response differs between detectors or bases.

**Classification.** **SECURITY-PROOF-MODIFYING.** Wavelength is an adversary-controllable degree of freedom converting spectral choice into efficiency mismatch (§6) and into decoy-state leakage: Li et al., "Attacking a practical QKD system with wavelength-dependent beam-splitter and multiwavelength sources," PRA 84, 062308 (2011) — VERIFIED; Jiang et al., PRA 86, 032310 (2012) (wavelength-selected PNS attack) — VERIFIED. If the proof's η is defined only at the design wavelength while the detector responds elsewhere, the detection model assumed by the proof is false for Eve's signals.

**What breaks if absorbed into scalar efficiency/QBER.** A scalar η(λ_design) asserts the receiver is blind outside the passband; out-of-band sensitivity (including SNSPD broadband response) then constitutes an unmodeled Eve→receiver channel, invisible to QBER.

**Candidate proof-compatible treatment.** (i) Restrict the optical mode: certified spectral filtering with measured out-of-band rejection, entered as a device assumption; (ii) mismatch-aware proof with mismatch bounded over the full spectral acceptance; (iii) monitoring detector for anomalous spectral content (engineering countermeasure, not a proof primitive).

**Required characterization evidence.** Per-detector spectral response curves across the full sensitivity range; receiver spectral transmission; out-of-band rejection of all filters; wavelength dependence of the basis splitter.

**Fixture scalar correspondence.** η multiplier ↔ design-wavelength value only → **PARTIAL-SCALAR-STRESS-ONLY**.

**Proposed status:** **UNMAPPED-SECURITY-BUDGET** (adversarial channel entirely outside the current model).

---

## 8. Polarization-dependent response

**Mechanism.** Detectors and receiver optics respond differently to different polarizations (SNSPD absorption is intrinsically polarization-sensitive; APD coupling and optics are mildly so). In a polarization-encoded BB84 downlink, polarization-dependent loss is a rotation-and-loss acting after the channel — partially basis-aligned, hence partially security-relevant.

**Classification.** **SECURITY-PROOF-MODIFYING** when the polarization response differs between the two detectors of a basis (direct efficiency mismatch within the measurement basis) or couples the bases (basis-dependent detection probability). If the dependence is common-mode and the proof is written with a polarization-averaged η, it is engineering-only — but common-modeness is a measured property. Relevant verified proof treatments: Grasselli et al., PR Applied 23, 044011 (2025) (basis-dependent detection probability); the mismatch literature of §6; squashing with flag structure (Gittsovich et al. 2014).

**What breaks if absorbed into scalar efficiency/QBER.** Polarization-dependent efficiency correlated with the encoding basis masquerades as higher QBER in one basis only; the efficient-BB84 biased-basis finite-key analysis (Sidhu fixture) uses basis-specific error estimation, so the bias structure partially surfaces it — but only as *rate/error* data, not as the POVM distortion the proof would need to price correctly.

**Candidate proof-compatible treatment.** Explicit receiver polarimetry (Mueller/Jones characterization) feeding a POVM with polarization-resolved elements; loss-tolerant analysis if encoding imperfections are absorbed at source; mismatch-bounded proof for residual.

**Required characterization evidence.** Polarization-resolved efficiency maps per detector (Stokes-resolved response); receiver Mueller matrix; temporal/thermal drift of polarization response across a pass.

**Fixture scalar correspondence.** η multiplier ↔ polarization-averaged value → **PARTIAL-SCALAR-STRESS-ONLY**.

**Proposed status:** **PROOF-PROFILE-CANDIDATE** gated by **UNMAPPED-CHARACTERIZATION-REQUIRED**.

---

## 9. Temporal-mode dependence of detection

**Mechanism.** Beyond jitter-induced gate-edge loss (§4), the detector+optics can respond differently to different temporal/spectral mode shapes (pulse duration, chirp, multimode content), e.g. via dispersion in coupling optics or mode-dependent coupling into detector fibers.

**Classification.** **SECURITY-PROOF-MODIFYING** in principle: the proof's squashing and yield analysis is defined for a single optical mode per slot; mode-dependent response gives Eve a mode-selection handle (the temporal analogue of the spatial-mode mismatch attack, Sajeed et al. PRA 91, 062301, 2015 — VERIFIED). If the receiver is single-mode-fiber coupled and the mode filter is characterized, the effect collapses to engineering (reduced coupling efficiency).

**What breaks if absorbed into scalar efficiency/QBER.** Mode-selective loss folded into η asserts all temporal modes are detected equally; Eve's freedom to choose modes disappears from the model.

**Candidate proof-compatible treatment.** Mode-filtered receiver with characterized mode selectivity (device assumption); mode-mismatch analysis analogous to Sajeed 2015 / Chaiwongkhot 2019; detector tomography extended across input modes (Lundeen et al., "Tomography of quantum detectors," Nat. Phys. 5, 27–30, 2009, DOI 10.1038/nphys1133 — VERIFIED; Feito et al., NJP 11, 093038, 2009 — VERIFIED) as the general POVM-level evidence base.

**Required characterization evidence.** Efficiency vs input temporal-mode basis (e.g. Hermite-Gaussian/time-bin superposition probing); mode-overlap specification of the receiver's acceptance; jitter-and-window maps (shared with §4).

**Fixture scalar correspondence.** η multiplier ↔ design-mode value → **PARTIAL-SCALAR-STRESS-ONLY**.

**Proposed status:** **UNMAPPED-CHARACTERIZATION-REQUIRED**.

---

## 10. Count-rate dependence of efficiency (nonlinearity)

**Mechanism.** Instantaneous efficiency depends on recent/instantaneous count rate via dead time, recovery (§1–2), bias droop, or — for threshold detectors — genuine response nonlinearity in photon number.

**Classification.** **SECURITY-PROOF-MODIFYING** in two distinct ways. (i) The decoy-state method's central identity — yield of the n-photon component is intensity-independent — fails if η depends on rate/intensity: decoy estimates then no longer bound single-photon yields. (ii) Lydersen et al., "Superlinear threshold detectors in quantum cryptography," PRA 84, 032320 (2011) — VERIFIED — shows superlinearity is directly exploitable by multiphoton faked states. Passive rate-dependence that is common-mode and monitored can be handled engineering-side, but the decoy-yield identity must be re-examined whenever η = η(rate).

**What breaks if absorbed into scalar efficiency/QBER.** The scalar model's expected counts are linear in the modeled transmission times η; any nonlinearity is structurally inexpressible, and the decoy consistency checks would silently mix different effective η's for signal and decoy intensities.

**Candidate proof-compatible treatment.** Certified linearity range with monitoring; response-curve model in the engineering layer; proof-side: re-derive decoy constraints allowing rate-dependent yields (open problem in verified form — none of the verified citations provides a turnkey satellite-fixture treatment), or restrict to a regime with an experimentally demonstrated linear response.

**Required characterization evidence.** Efficiency vs incident rate curves per detector (pulsed and CW); decoy-consistency tests at multiple intensities; linearity bounds with uncertainty.

**Fixture scalar correspondence.** None → **UNMAPPED-MODEL-REQUIRED** (engineering) with security re-analysis required before any nonlinearity is admitted.

---

## 11. Memory / cross-pulse effects generally

**Mechanism.** Any dependence of slot-i outcomes on slots ≠ i: afterpulsing (§5), recovery (§2), charge accumulation, TDC pipeline effects, electronic crosstalk between detector channels.

**Classification.** **SECURITY-PROOF-MODIFYING** at the statistical core: the fixture's finite-key analysis assumes slot-IID detection statistics (random sampling / Serfling). Correlated counts require martingale or information-theoretic treatments (Azuma 1967; Kato arXiv:2002.04357). On the source side, correlated-encodings frameworks exist and are verified (Pereira et al., Sci. Adv. 6, eaaz4487, 2020; Sixto et al., PR Applied 18, 044069, 2022; Currás-Lorenzo et al., Optica Quantum 3, 525, 2025); for *detector-side* correlations the verified proof literature is thinner — recent partial tools: Nahar & Lütkenhaus, "Imperfect detectors for adversarial tasks with applications to QKD," arXiv:2503.06328 (2025, preprint); Tupkary et al., Quantum 9, 1937 (2025) (phase-error estimation with imperfect detectors) — VERIFIED as existing, but neither delivers a complete correlated-memory detector treatment for this fixture.

**What breaks if absorbed into scalar efficiency/QBER.** This is precisely the prohibited substitution: correlations laundered into an IID p_ext are undetectable at the level of marginals while changing joint statistics and finite-key validity.

**Candidate proof-compatible treatment.** Martingale-based finite-key statistics over the actual (correlated) click process; explicit receiver state-machine model with bounded memory length and worst-case conditioning; abort criteria on observed correlation statistics.

**Required characterization evidence.** Higher-order click-correlation functions per detector and across detectors (g⁽²⁾ and lag-resolved conditional probabilities); inter-channel crosstalk maps; history-dependence stress tests.

**Fixture scalar correspondence.** None → **UNMAPPED-PROOF-REQUIRED**.

**Proposed status:** **UNMAPPED-PROOF-REQUIRED**.

---

## 12. Detector-control attack landscape (adversarial boundary of the receiver model)

**Mechanism.** Bright-light or tailored illumination drives detectors out of Geiger mode into a linear/classical regime where Eve fully controls clicks (blinding), then sends faked states to impose her outcomes. Verified cornerstone references: Lydersen et al., "Hacking commercial quantum cryptography systems by tailored bright illumination," Nat. Photonics 4, 686–689 (2010), DOI 10.1038/nphoton.2010.214; Gerhardt et al., "Full-field implementation of a perfect eavesdropper on a quantum cryptography system," Nat. Commun. 2, 349 (2011), DOI 10.1038/ncomms1348. Verified extensions: Makarov, NJP 11, 065003 (2009) (passively quenched); Lydersen et al., Opt. Express 18, 27938 (2010) (thermal blinding of gated detectors); Sauge et al., Opt. Express 19, 23590 (2011) (actively quenched); Lydersen et al., NJP 13, 113042 (2011) (SNSPD control — blinding is not APD-specific); Wiechers et al., NJP 13, 013043 (2011) (after-gate); Jain et al., PRL 107, 110501 (2011) (calibration-attack); Bugge et al., PRL 112, 070503 (2014) (laser damage); Qian et al., PR Applied 10, 064062 (2018); Gao et al., PRA 106, 033713 (2022) (self-differencing APDs). Landscape review: Xu, Ma, Zhang, Lo & Pan, Rev. Mod. Phys. 92, 025002 (2020) — VERIFIED.

**Classification.** **SECURITY-PROOF-MODIFYING — maximally.** A blinded detector violates every detection-side assumption of the proof (fixed POVMs, threshold response, Eve-blind outcomes). No scalar extension of the count model can represent "Eve controls the clicks"; this is a boundary condition on the entire modeling exercise, not an effect to be fitted.

**What breaks if absorbed into scalar efficiency/QBER.** Everything: under blinding, observed QBER can be *zero* while key security is zero. Rate/QBER-level data cannot detect a perfect faked-state attack (Gerhardt 2011).

### 12.1 Candidate proof-compatible treatments
- **Characterized-bounded receiver:** keep detectors trusted but *bounded*: squashing model + measured mismatch bounds + input-power monitoring/limiting with security boundary analysis (arXiv:2303.12355, 2023 — VERIFIED) + countermeasure verification (automated verification framework, arXiv:2305.18610 — VERIFIED preprint). Every countermeasure is itself a characterized device assumption; note the demonstrated failure of the random-detector-efficiency countermeasure (Huang et al. 2016) and the insecurity of claimed "detector-device-independent" schemes (Sajeed et al., PRL 117, 250505, 2016 — VERIFIED).
- **Detector-decoy / tomography:** Moroder, Curty & Lütkenhaus, "Detector decoy quantum key distribution," NJP 11, 045008 (2009), arXiv:0811.0027 — VERIFIED (note: the correct author list is Moroder, Curty, Lütkenhaus; venue NJP 2009 — a "Moroder-Curty-Lim 2009" attribution would be incorrect). Variable-attenuator receiver self-testing; complements measurement tomography (Lundeen et al. 2009).
- **MDI-QKD:** Lo, Curty & Qi, PRL 108, 130503 (2012) — VERIFIED; Braunstein & Pirandola, PRL 108, 130502 (2012) — VERIFIED.

### 12.2 Why MDI-QKD does and does not apply to a direct satellite→ground downlink
MDI removes all detector-side trust by relocating the measurement to an untrusted relay that receives light from *both* parties and performs a Bell-state measurement. In the Q-Orbit concept the satellite is the sender and the ground station is the receiver: there is no relay between two senders, and the detector side is precisely the ground station whose trust is at issue. MDI therefore applies only if the architecture is changed: (a) **uplink MDI** — ground sends light and the satellite performs the (untrusted) BSM: inverts the link, adds uplink loss/turbulence asymmetry, and moves the optics to orbit — a different mission concept; (b) **satellite-relay MDI between two ground stations** (dual downlink / entanglement swapping): the satellite becomes the untrusted middle node between two senders on the ground — architecturally proven in principle (MDI demonstrations exist terrestrially; satellite dual-downlink entanglement is established physics) but it is not the direct-downlink concept, roughly doubles channel loss through two downlinks, and requires coincidence at the satellite. **Conclusion: within the direct-downlink concept, detector trust cannot be architecturally eliminated; the only available path is trusted-but-characterized-and-bounded receiver modeling (12.1).** MDI should be logged as an architectural alternative, not as a treatment applicable to the current fixture.

**Required characterization evidence.** Blinding threshold curves (power/wavelength/pulse-shape) per detector; behavior in the analog transition region; watchdog/monitor detector calibration; optical power limiter transfer function and damage thresholds; countermeasure self-test logs.

**Fixture scalar correspondence.** None. Adversarial control is not representable in any count-rate scalar.

**Proposed status:** **BLOCKING** — with zero physical characterization, no claim can be made that the receiver is outside the controllable regime. This is the adversarial boundary item for the whole receiver model.

---

## MASTER TABLE

| # | Device effect | Engineering vs proof | Current scalar model status | Candidate proof treatment (verified refs) | Required mathematical parameter | Required characterization evidence (observables) | Confidence treatment | Proposed status label |
|---|---|---|---|---|---|---|---|---|
| 1 | Dead time | Engineering-only if symmetric & non-adversarial; proof-modifying under adversarial actuation (Weier NJP 13, 073024, 2011) | No scalar can express rate-dependent loss | Bounded time-dependent mismatch proofs (Fung QIC 9, 131, 2009; Zhang PRR 3, 013076, 2021); Burenkov et al. arXiv:1005.0272 (preprint only) | Per-detector dead-time distribution; rate-dependent yield function | Dead-time & recovery curves; paralyzable/non-paralyzable ID; bright-pulse response | Mechanism: high. Attack risk: established. Treatment: partial (preprint) | UNMAPPED-MODEL-REQUIRED (+ UNMAPPED-SECURITY-BUDGET adversarial) |
| 2 | Recovery dynamics | Engineering-only if complete between slots; proof-modifying via memory (violates IID finite-key statistics) | Not represented | Receiver state-machine + worst-case state sequence; martingale finite-key stats (Azuma 1967; Kato arXiv:2002.04357) | Recovery curve η(Δt) per detector; latching thresholds | Double-/triple-pulse efficiency-vs-separation curves; latching tests | Mechanism: high. Proof treatment: immature | UNMAPPED-MODEL-REQUIRED |
| 3 | Saturation | Engineering-only within certified linear range; proof-modifying at/above nonlinearity (entry point of blinding class) | Not represented (linear model) | Certified max-flux device assumption + power-limiter boundary analysis (arXiv:2303.12355) | Nonlinear response function R_obs(μ_in) per detector | Full input-output curves to saturation and overload recovery | Mechanism: high. Security boundary: attack-class entry | UNMAPPED-MODEL-REQUIRED; BLOCKING above linear regime (see #12) |
| 4 | Timing jitter / gate assignment | Proof-modifying where jitter differs per detector/basis (time-shift enabler: Qi QIC 7, 73, 2007; Zhao PRA 78, 042333, 2008); symmetric part engineering-only | η multiplier sees window-average only; time structure absent | Time-resolved mismatch-bounded proof (Fung 2009; Zhang 2021); single-detector + active-switch architecture; caution: random-η countermeasure breakable (Huang IEEE JQE 52, 2016) | Per-detector η(t) across the acceptance window | Jitter histograms & efficiency-vs-delay maps per detector, drift/rate dependence | Mechanism: high. Attacks: experimentally demonstrated | UNMAPPED-CHARACTERIZATION-REQUIRED |
| 5 | Afterpulsing (history-dependent) | IID marginal: engineering-representable; history/rate/basis dependence and Eve-actuation: proof-modifying | Scalar IID p_ap = equilibrium marginal only; correlations cannot live in p_ext | Trap-kernel conditional click model (Ziarkash Sci. Rep. 8, 5076, 2018; Itzler J. Mod. Opt. 59, 1472, 2012; Horoshko J. Mod. Opt. 64, 191, 2017; estimation: Humer JLT 33, 3098, 2015); martingale finite-key bounds; related attack: Wiechers NJP 13, 013043, 2011 | Conditional click-probability kernel P(click\|history); multi-timescale release law | Lag-resolved conditional click probabilities; p_ap vs rate; bright-pulse afterpulse response | Models: high (peer-reviewed). Proof-level treatment of correlated background: open | PARTIAL-SCALAR-STRESS-ONLY; remainder UNMAPPED-PROOF-REQUIRED |
| 6 | Efficiency mismatch (detector/basis, time-dependent) | Proof-modifying (canonical detector-side gap) | Single η multiplier = hidden substitution of worst case | Mismatch-bounded proofs: Fung 2009; Lydersen & Skaar QIC 10, 60, 2010; Marøy PRA 82, 032337, 2010; Bochkov & Trushechkin PRA 99, 032308, 2019; Zhang PRR 2021; Trushechkin Quantum 6, 771, 2022; Marcomini QST 10, 035002, 2025; satellite-specific: Ivchenko arXiv:2608.09793 (2026 preprint); free-space attacks: Sajeed PRA 91, 062301, 2015; Chaiwongkhot PRA 99, 062315, 2019 | Bounded mismatch ratio η_min/η_max per mode (time/wavelength/mode resolved) | Per-detector efficiency maps vs time/λ/polarization/spatial mode; relative calibration uncertainty; drift | Proof machinery: mature & verified. Input parameters: unmeasured | PROOF-PROFILE-CANDIDATE gated by UNMAPPED-CHARACTERIZATION-REQUIRED |
| 7 | Wavelength dependence | Proof-modifying (Eve's spectral choice → mismatch/leakage; Li PRA 84, 062308, 2011; Jiang PRA 86, 032310, 2012) | η defined at design λ only | Certified spectral filtering as device assumption; mismatch bound over full acceptance band | Spectral response η(λ) per detector; filter rejection function | Per-detector spectral curves; receiver transmission; out-of-band rejection | Attack: demonstrated. Engineering fix: standard but unmeasured | UNMAPPED-SECURITY-BUDGET |
| 8 | Polarization dependence | Proof-modifying when detector-differential or basis-coupling; common-mode part engineering-only | η = polarization average only | Basis-dependent detection proofs (Grasselli PR Applied 23, 044011, 2025); mismatch-bounded proofs (#6); explicit polarimetric POVM | Stokes-resolved η per detector; receiver Mueller matrix | Polarization-resolved efficiency maps; Mueller polarimetry; drift over pass | Mechanism: high (SNSPD intrinsically polarization-sensitive). Treatment: available | PROOF-PROFILE-CANDIDATE + UNMAPPED-CHARACTERIZATION-REQUIRED |
| 9 | Temporal-mode dependence | Proof-modifying via mode-selective response (temporal analogue of Sajeed PRA 91, 062301, 2015); collapses to engineering with characterized mode filter | Design-mode η only | Mode-filter device assumption; detector tomography across modes (Lundeen Nat. Phys. 5, 27, 2009; Feito NJP 11, 093038, 2009) | Mode-resolved efficiency map | Efficiency vs temporal-mode probing; acceptance-mode overlap spec | Mechanism: established by analogy; direct temporal-mode attack literature thinner | UNMAPPED-CHARACTERIZATION-REQUIRED |
| 10 | Count-rate-dependent efficiency (nonlinearity) | Proof-modifying: breaks decoy yield identity (yield_n intensity-independent fails); superlinearity attack (Lydersen PRA 84, 032320, 2011) | Not represented (linear in η) | Certified linear range + monitoring; decoy re-derivation with rate-dependent yields = open | Efficiency-vs-rate function per detector; linearity bounds | η vs rate curves (pulsed & CW); multi-intensity decoy-consistency tests | Mechanism: high. Turnkey proof treatment: not available in verified form | UNMAPPED-MODEL-REQUIRED (+ proof re-analysis required) |
| 11 | Memory / cross-pulse effects (general) | Proof-modifying at statistical core (slot-IID assumption of fixture fails) | None; explicitly prohibited from p_ext | Martingale finite-key stats (Azuma 1967; Kato arXiv:2002.04357); bounded-memory state model; detector-side correlated frameworks partial (Nahar & Lütkenhaus arXiv:2503.06328; Tupkary Quantum 9, 1937, 2025) | Bounded memory length; worst-case conditional probabilities | g⁽²⁾ & lag-resolved conditional click stats; inter-channel crosstalk; history stress tests | Statistical tools: verified. Complete correlated-detector proof for this fixture: absent | UNMAPPED-PROOF-REQUIRED |
| 12 | Detector-control attacks (blinding landscape) | Proof-modifying, maximal: receiver POVM becomes Eve-controlled (Lydersen Nat. Photonics 4, 686, 2010; Gerhardt Nat. Commun. 2, 349, 2011; SNSPD: Lydersen NJP 13, 113042, 2011; review: Xu RMP 92, 025002, 2020) | Not representable in any count scalar | Trusted-but-bounded receiver: squashing (Beaudry PRL 101, 093601, 2008; Gittsovich PRA 89, 012325, 2014) + measured bounds + power limiting + countermeasure verification; detector-decoy (Moroder, Curty & Lütkenhaus NJP 11, 045008, 2009); tomography (Lundeen 2009). MDI (Lo, Curty & Qi PRL 108, 130503, 2012) architecturally eliminates detector trust but requires uplink or satellite-relay redesign — NOT applicable to the direct downlink | Blinding/control threshold surface per detector; bounded-deviation parameters | Blinding threshold curves vs power/λ/pulse shape; analog-region behavior; watchdog calibration; limiter transfer function | Attack reality: experimentally demonstrated on commercial & research systems. Countermeasure soundness: conditional on characterization, which is absent | BLOCKING |

---

## Most consequential findings (for orchestrator)

1. **The fixture's three scalars are self-consistent only for the IID, rate-independent, memoryless, mode-matched receiver.** Exactly one scalar (afterpulse probability) touches a memory effect, and only its equilibrium IID marginal; history-dependent afterpulsing — the physically correct model per Ziarkash 2018 / Itzler 2012 / Horoshko 2017 — is UNMAPPED-PROOF-REQUIRED because it breaks the slot-IID statistics on which the Sidhu-type finite-key machinery (Serfling/random sampling) rests; martingale-type bounds (Azuma; Kato arXiv:2002.04357) would be the replacement tool.
2. **Efficiency mismatch is the best-supported gap:** attack (Makarov 2006; Qi 2007; Zhao 2008; Sajeed 2015; Chaiwongkhot 2019) and proof literature (Fung 2009 → Zhang PRR 2021, Trushechkin Quantum 2022, Marcomini QST 2025) are mature and verified, including a 2026 preprint on mismatch for a *satellite* downlink with passive basis choice (Ivchenko et al., arXiv:2608.09793). The blocker is not proof machinery but characterization: mismatch bounds are an unmeasured input. → PROOF-PROFILE-CANDIDATE gated by UNMAPPED-CHARACTERIZATION-REQUIRED.
3. **MDI-QKD is architecturally incompatible with the direct downlink.** Detector-side trust cannot be eliminated within the concept; the only path is trusted-but-characterized-and-bounded (squashing + measured mismatch bounds + power limiting + countermeasure verification). With zero physical characterization, the detector-control landscape (Lydersen 2010; Gerhardt 2011; SNSPD blinding 2011) makes the receiver **BLOCKING** as a security boundary item.
4. **Rate-dependent effects (dead time, recovery, saturation, nonlinearity) are entirely absent from the scalar model** and additionally threaten the decoy method's central identity (intensity-independent photon-number yields). A turnkey decoy proof with rate-dependent yields was not found in verified literature — flagged as open.
5. **Reference corrections for the swarm's shared bibliography:** (a) detector-decoy = Moroder, Curty & Lütkenhaus, *NJP* 11, 045008 (2009) — no Lim, not a PRL; (b) Burenkov–Qi–Fortescue–Lo "finite detector dead time" exists only as arXiv:1005.0272 — no journal publication confirmed; (c) Ivchenko et al. (2026) is a preprint (arXiv:2608.09793), not yet peer-reviewed. All other ~40 cited references verified against multiple independent sources (title/authors/venue/year; DOIs recorded where found).

## Verification failures / caveats
- Burenkov, Qi, Fortescue & Lo, "Security of high speed quantum key distribution with finite detector dead time": arXiv:1005.0272 (2010) — **journal publication not confirmed; treat as preprint.**
- Ivchenko et al., arXiv:2608.09793 (2026): preprint, posted 2026-08; not peer-reviewed at time of writing.
- "Recovery-Induced Erasure Attack on QKD Systems," arXiv:2603.03217 (2026): preprint, mechanism-level; used only as existence evidence.
- Nahar & Lütkenhaus, arXiv:2503.06328 (2025): preprint.
- Mission brief's "detector-decoy / Moroder Curty Lim 2009" attribution: corrected to Moroder, Curty & Lütkenhaus, NJP 11, 045008 (2009).
- No verified literature was found giving a complete finite-key decoy-state proof with detector afterpulse correlations on the detection side; source-side correlation frameworks (Pereira 2020; Sixto 2022) do not transfer directly. This is a genuine literature gap, not a search failure.
