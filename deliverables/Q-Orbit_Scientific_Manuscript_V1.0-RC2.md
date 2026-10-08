# Q-Orbit: Fail-Closed Finite-Key Screening for a Satellite QKD Concept

## 1. Title Block

**Title:** Q-Orbit: Fail-Closed Finite-Key Screening for a Satellite QKD Concept
**Subtitle:** A controlled theoretical study of numerical margin, device-imperfection mapping, and evidence boundaries
**Version:** V1.0-RC2
**Document ID:** QO-SUB-RP-001
**Status banner:** THEORETICAL / NOT PHYSICALLY VALIDATED
**Release state:** PRIVATE-BLOCKED
**Scope (one line):** This paper presents a controlled theoretical and numerical study of a frozen finite-key fixture for a direct satellite-to-ground quantum key distribution (QKD) concept, together with a proof-to-device mapping and a claim-control architecture; it makes no physical, device-security, mission, or deployment claim of any kind.

**Boundary statement (binding on the entire document).** Every numerical value reported here is the output of a frozen software fixture evaluated at assumed, point-valued parameters. No physical characterization, hardware-in-the-loop test, experimental run, or key release has been performed; the candidate-key figure quoted below is a theoretical fixture margin output, not a released secret key. No claim of physical validation, implementation security, certified device security, mission success probability, QKD availability, Tabuk performance, hardware readiness, procurement tolerance, deployability, field readiness, or released secret key is made or implied anywhere in this manuscript.

***

## 2. Abstract

Satellite QKD is constrained by short optical-access windows and finite detection blocks, so that a positive centre-case key-length computation is not, by itself, evidence of robustness. This paper presents Q-Orbit, a controlled theoretical study of a direct satellite-to-ground downlink concept built on the efficient, biased-basis BB84 protocol with weak coherent pulses, one signal intensity and two decoy intensities including vacuum. The study (i) freezes and reproduces a reference finite-key fixture of the Sidhu–Lim family, (ii) re-optimizes the integration half-window independently at every evaluated point, and (iii) couples the numerical screen to an explicit proof-to-device mapping with fail-closed claim controls. At the frozen baseline, the fixture selects a 102 s half-window (205 sample bins) and yields a signed finite-key margin of $41{,}338.62418456675$ bits and a floored candidate key of $41{,}338$ bits, with X-basis quantum bit error rate (QBER) $0.017422686665352745$ and phase-error bound $0.09270161340569935$ — conditional computations at an assumed parameter point, and upper bounds with respect to error-correction efficiency. A deterministic $41\times 41$ two-parameter screen over controlled engineering ranges yields 568 positive and 1,113 nonpositive points (fraction $0.33789411064842356$), with median signed margin $-2{,}624.946810258186$ bits and minimum $-3{,}828.414517626367$ bits; the screen is an upper-envelope deterministic partition, not a probability. Twelve regression tests and a 20-check independent audit pass. Fifteen device-imperfection classes are mapped against the proof literature; none is fully represented in the frozen fixture, and two remain blocking for unconditional claims. The principal contribution is an evidence architecture that keeps numerical reproducibility, proof coverage, characterization, and physical validation strictly separated.

***

## 3. Keywords

satellite quantum key distribution; finite-key analysis; decoy-state BB84; weak coherent pulses; device characterization; composable security; security proof profiles; reproducibility; evidence control; fail-closed claim management

***

## 4. Introduction

Quantum key distribution promises information-theoretic key establishment whose security rests on quantum mechanics rather than computational assumptions. Satellite QKD uses a space segment to overcome the distance limits of terrestrial fibre attenuation, and its feasibility has been demonstrated experimentally by the Micius programme (Liao et al., 2017). In low Earth orbit, however, a ground station observes a satellite only during a short pass, within which the elevation-dependent channel loss sweeps a wide dynamic range; the per-pass detection block is therefore finite and strongly time-varying, and finite-block statistical effects can dominate the key-length computation (Sidhu et al., 2022). Finite-resource analyses of small-satellite missions confirm that block size, loss profile, and protocol-parameter choices materially determine whether any positive key is obtained at all (Islam et al., 2024).

This setting creates a methodological problem that is independent of any particular hardware programme. A finite-key key-length formula is a deterministic function of a large vector of inputs: channel loss, background and dark counts, detector response, source intensities, protocol probabilities, and the statistical security parameters. Evaluating that function at one nominal parameter point produces a single number. It is tempting — and, in the wider engineering discourse, common — to let such a number drift semantically from "model output at an assumed point" towards "expected mission performance" or even "achievable secure key". Each step of that drift is unwarranted. The number is conditioned on assumptions about the source (perfect phase randomization, independent and identically distributed pulses, exactly known intensities), about the receiver (a squashing detection model with photon-number-independent efficiency), about the absence of side channels, and about the exactness of every characterization input. The security-proof literature has spent two decades showing that each of these assumptions is both load-bearing and violable in practice (Gottesman et al., 2004; Xu et al., 2015; Nahar et al., 2023). Moreover, even a formally correct proof yields a security statement only when its parameters are characterized quantities with composed failure probabilities, a point made rigorous by the certification framework of Tan and Nahar (2026).

Q-Orbit is a theoretical research concept that takes this methodological problem as its primary object. Rather than asking "how much key would this mission produce?", it asks two narrower questions: can a frozen, controlled finite-key fixture — a specific mathematical model with declared inputs, declared conventions, and hash-recorded artifacts — be reproduced, audited, and screened under a regime in which every numerical claim is traceable to controlled evidence? And what does such a fixture establish, and leave uncovered, once the device-imperfection and characterization structure of the modern security-proof literature is mapped onto it?

The study answers the first question affirmatively, subject to disclosed limitations: the frozen V0.16-TA1 fixture is reproduced bit-exactly at its headline quantities, survives a twelve-test regression suite and a twenty-check independent audit, and is screened deterministically over a $41\times 41$ coupled parameter domain whose statistics carry an explicit non-probabilistic interpretation. The answer to the second question is a structured negative: of fifteen mandated device-imperfection classes, none is fully represented in the frozen fixture, five require proof-level treatment, two are blocking pending any characterization, and the remainder require characterization evidence that does not exist. No artificial scalar penalties are invented to disguise these gaps.

The paper is intentionally conservative: all headline numbers are model computations at assumed parameter values; all margins and candidate keys are upper bounds in error-correction efficiency, the fixture instantiating ideal accounting; and the grid statistics are upper-envelope quantities of a deterministic screen, never probabilities, reliabilities, availabilities, or yields. Where a claim cannot be supported at the required evidence class, it is labelled accordingly or omitted.

The remainder of this paper is organized as follows. Section 5 states the research question; Section 6 separates the contributions into reproduced, newly analyzed, proposed, and unresolved work; Section 7 reviews the literature thematically and positions this work against its closest relatives. Sections 8–9 define the system model and mathematical framework, Section 10 the methods, Section 11 the results. Sections 12–13 present the proof-to-device analysis and the layered proof-profile architecture; Section 14 develops the security and characterization budget. Sections 15–16 discuss interpretation and limitations; Section 17 concludes. Section 18 documents data and reproducibility, Section 19 lists the verified references, and Section 20 condenses the claim ledger.

***

## 5. Research Question

The study is organized around a two-stage research question.

**Stage (i) — reproducibility under fail-closed audit.** Can a frozen, controlled finite-key fixture for a satellite-QKD downlink concept — a declared margin equation, declared input artifacts, a declared window-optimization rule, and declared screening constructions — be reproduced and audited to bit-exact numerical agreement, with every numerical claim traceable to a controlled artifact and every unverifiable claim explicitly blocked rather than silently carried? This stage asks whether the evidentiary discipline of physical experiment can be applied, with equal rigor, to a purely computational record.

**Stage (ii) — robustness and proof coverage.** Given the reproduced fixture, what do a deterministic coupled screen (integration half-window re-optimized at every point), local response analysis, and zero-key frontier location reveal about the robustness of the positive baseline margin across declared engineering ranges? And what does a systematic mapping of the mandated device-imperfection classes against the security-proof literature reveal about which effects the frozen proof profile covers, which it could cover given characterization evidence, and which constitute genuine open proof problems?

Both stages are deliberately scoped to exclude any physical claim. The first stage concerns the integrity of a computational record; the second concerns the coverage of a proof architecture. Neither stage, alone or in combination, bears on the physical performance, security, or feasibility of any actual device or mission.

***

## 6. Contribution Statement

The contributions of this paper are partitioned into four disjoint classes, so that the evidentiary status of each is unambiguous.

**Reproduced work (computational verification).** This paper reports the bit-exact reproduction and independent audit of the frozen Q-Orbit V0.16-TA1 finite-key fixture: the baseline signed margin $41{,}338.62418456675$ bits at a 102 s half-window, the margin-equation and QBER identities, the floor convention on all $1{,}681$ screen rows, the eight-row sensitivity table, the sixteen-row frontier structure, the twelve-test regression suite, and the twenty-check package audit. Nine of ten controlled artifacts are content-hash-verified; the tenth (the model source) compiles and is hash-chain-listed but not byte-reconstructible from the available bundle. An earlier independent comparison (V0.13) reported 50 locked vectors over 971 metrics with zero open numerical discrepancies. This contribution class is verification of code and frozen equations, not validation of any physical system.**Newly analyzed work (this paper's synthesis).** The paper consolidates: (a) the interpretation of the screen partition — 568 positive of 1,681 points — as an upper-envelope deterministic quantity under per-point window re-optimization, including the correction of a previously circulated sign-flipped rendering of the grid median and minimum; (b) the condensation of a fifteen-class device-imperfection mapping with controlled status labels; and (c) the joint reading of numerical screening and proof-coverage mapping as complementary halves of one evidence architecture.

**Proposed architecture (specification, not implementation).** The paper specifies a layered proof-profile architecture: a frozen Layer 0 fixture as immutable regression reference; a hardened Layer 1 analytic profile (assumption ledger plus upgraded concentration statistics); a Layer 2 imperfection-native upgrade path; and a Layer 3 characterization/certification composition layer, together with a symbolic epsilon ledger extending the visible secrecy and correctness parameters by characterization and authentication classes. No element is claimed to be implemented, measured, or certified.

**Unresolved work (explicitly not contributed).** The following are not achieved here and are stated as open obligations: end-to-end re-execution of the model (blocked by missing controlled inputs REQ-01…REQ-03); individual verification of $\epsilon_s$ and $\epsilon_c$; row-level verification of the fixture's internal mapping registers (REQ-05); any physical characterization; and two genuine open proof problems — detector-side correlated afterpulsing in finite-key decoy proofs, and rate-dependent yields inside the decoy method.

***

## 7. Related Work

The relevant literature is organized thematically rather than chronologically; every cited record below has been bibliographically verified in the project's Phase 1 literature audit, and preprints are labelled as such.

### 7.1 Satellite QKD and finite-key analysis

The canonical satellite-to-ground QKD experiment is the Micius demonstration (Liao et al., 2017), whose per-pass detection statistics anchor later empirical channel models. Sidhu et al. (2022) provide the finite-block analysis of the efficient-BB84 weak-coherent-pulse (WCP) decoy-state trusted-node downlink with optimized intensities and block sizes, on an empirical channel model derived from published Micius data; the frozen Q-Orbit fixture is structurally a member of this family, cited for modelling lineage only, never as device evidence. Islam et al. (2024) extend the composable finite-key treatment to CubeSat-scale missions, demonstrating sharper concentration statistics (Kato's inequality) at small-satellite block sizes. This lineage establishes that finite-block effects — not asymptotic rates — determine viability in the satellite regime; Q-Orbit's contribution is not a new rate analysis but a verification and claim-control regime wrapped around one frozen instance of this family.

### 7.2 Decoy-state foundations and finite-key statistics

The decoy-state method was introduced to defeat photon-number-splitting attacks on WCP sources (Lo et al., 2005), with the practical statistical-fluctuation treatment developed by Ma et al. (2005). The concise three-intensity finite-key bounds of Lim et al. (2014) supply the exact algebraic structure — including the 21-term secrecy-budget decomposition — that the frozen fixture instantiates; because that construction predates the imperfect-phase-randomization and correlation literature, its bounds are never represented here as covering non-IID pulses or source flaws. Tomamichel et al. (2012) and Tomamichel and Leverrier (2017) supply the entropic-uncertainty and leftover-hashing layer from which the privacy-amplification and error-verification penalties derive. Within the same family, Zhang et al. (2017) improve the concentration step with multiplicative Chernoff bounds, Kato (2020, preprint) provides a concentration inequality accommodating unconfirmed knowledge, and Mannalath et al. (2025) supply the current sharpest finite-statistics bounds; the latter two are the designated statistics upgrade for the hardened profile discussed in Section 13.

### 7.3 Source flaws and the loss-tolerant line

Security with imperfect devices was first treated generically by Gottesman et al. (2004) (the GLLP framework), whose balance parameter covers only basis-independent flaws. The loss-tolerant protocol of Tamaki et al. (2014) removes the basis-independence requirement for characterized three-state encoding flaws; Mizutani et al. (2015) carry the analysis to finite keys with fluctuating intensities. That such flaws are not hypothetical was shown experimentally by Xu et al. (2015), who measured state-preparation flaws in a deployed commercial system; that paper is cited strictly as evidence that source flaws are real and must be measured, not as characterization of any Q-Orbit source. Pereira et al. (2023) construct a modified BB84 protocol robust to source imperfections with quantified rates, and the unified framework of Currás-Lorenzo et al. (2025) treats state-preparation flaws and passive side channels jointly — the framework on which the upgrade path proposed in Section 13 primarily rests. Leaky-source treatments conditional on measured isolation include Lucamarini et al. (2015) for the Trojan-horse attack, Tamaki et al. (2016), and Wang et al. (2018); every one of these treatments is conditional on measured isolation or distinguishability budgets, which is why the corresponding rows of Section 12 are blocking under zero characterization.

### 7.4 Pulse and intensity correlations

Correlated emissions violate the IID-pulse assumption on which concentration-inequality decoy estimation rests. Yoshino et al. (2018) demonstrated intensity correlations experimentally in a deployed decoy-state system and engineered a countermeasure. On the proof side, Zapatero et al. (2021) analyze decoy security with bounded nearest-neighbour intensity correlations, Sixto et al. (2022) generalize to correlated intensity fluctuations, and Pereira et al. (2025) tolerate correlations of unbounded length — the strongest current theoretical handle on this effect class. The Phase 1 audit identified a citation of Trényi and Curty (2021) for this topic, circulated in an earlier internal draft, as a misattribution: that paper is a zero-error attack against coherent-one-way QKD and is cited nowhere here for correlations.

### 7.5 Imperfect phase randomization

Perfect phase randomization is the precondition for the photon-number decomposition underlying all decoy estimation, and non-random phases enable phase-exploiting attacks (Lo and Preskill, 2007). Nahar et al. (2023) incorporate a characterized global-phase distribution into a generalized decoy-state analysis, Currás-Lorenzo et al. (2023) give a complementary finite-key treatment, and Sixto et al. (2023) analyze faulty active phase-randomization stages. Each treatment is parameterized by a measured phase-distribution bound; none exists for the Q-Orbit concept, so the obligation is registered as unmapped rather than assumed away.

### 7.6 Detector imperfections and the MDI alternative

Detection-efficiency mismatch is the canonical detector-side proof gap, enabling time-shift and related attacks (Makarov et al., 2006; Qi et al., 2007; Zhao et al., 2008), and is treated by a mature line of mismatch-bounded proofs (Fung et al., 2009; Zhang et al., 2021; Trushechkin, 2022; Marcomini et al., 2025), extended to basis-dependent detection by Grasselli et al. (2025) and to a satellite-specific setting by Ivchenko et al. (2026, preprint); the squashing framework that legitimizes qubit-level proofs for optical receivers is due to Beaudry et al. (2008) and Gittsovich et al. (2014). Bright-illumination detector-control attacks (Lydersen et al., 2010) and after-gate exploitation of detector memory (Wiechers et al., 2011) motivate treating dead time, saturation, and afterpulsing as security-relevant rather than purely engineering effects; modern proof-side treatments of imperfect detectors include Tupkary et al. (2025b) and Nahar et al. (2026), with memory effects addressed in part by Wang et al. (2025, preprint) and Nahar and Lütkenhaus (2025, preprint). Measurement-device-independent QKD (Lo et al., 2012; Braunstein and Pirandola, 2012) eliminates detector trust architecturally but is incompatible with a direct satellite-to-ground downlink, in which the ground receiver is precisely the party whose trust is at issue; it is therefore logged as an architectural alternative and excluded from the Q-Orbit proof path (Section 13).

### 7.7 Certification, composability, and authentication

Composable security rests on the trace-distance criterion and composition theorems (Müller-Quade and Renner, 2009; Portmann and Renner, 2022), with QKD-specific foundations in Renner (2005) and Ben-Or et al. (2005). Tan and Nahar (2026) supply the framework this paper adopts for the characterization-to-proof bridge: proofs are valid over robust parameter sets rather than point values; certification produces per-parameter confidence intervals whose failure probabilities compose by union bound; and the only valid end-to-end claim is a joint bound over certification approval and key insecurity — never a claim conditioned on approval alone. Authentication of the classical channel is a precondition for any composable QKD statement, via information-theoretic message authentication (Wegman and Carter, 1981), with its rigorous placement in QKD proofs treated by Tupkary et al. (2026b, preprint).

### 7.8 Consolidated and next-generation proofs

The current canonical map of decoy-BB84 proof variants and their hidden assumptions is the review of Tupkary et al. (2025a, preprint). A consolidated, rigorous decoy-state BB84 proof has been announced by Tupkary et al. (2026a, preprint, arXiv:2601.18035, under review); its own abstract frames broader imperfection integration as future work, and this paper cites it strictly as a preprint and designated Layer 2 anchor, with imperfection coverage resting primarily on Currás-Lorenzo et al. (2025). Wiesemann et al. (2026) independently provide a consolidated and accessible finite-size decoy-state proof — a distinct record the Phase 1 audit had to disambiguate from that preprint after a misattributed publication claim was detected and removed. Nahar et al. (2026) treat imperfect detectors for adversarial tasks with applications to QKD, extending the detector-side proof vocabulary used in Section 12.

### 7.9 Complementary proof technologies

For completeness, this paper draws on four further lines. Postselection lifts coherent-attack security for optical protocols (Christandl et al., 2009; Nahar et al., 2024), cited here for lifting only, not as a shipping proof. The entropy accumulation theorem (Dupuis et al., 2020; Metger and Renner, 2023), instantiated for decoy-state QKD by Kamin et al. (2024, preprint) and for characterized devices by George et al. (2022, preprint), drops the IID assumption entirely — the active route for non-IID robustness, though with historically looser constants at per-pass block sizes. Numerical semidefinite-programming proofs (Coles et al., 2016; Winick et al., 2018), with dimension reduction (Upadhyaya et al., 2021), finite-key numerics (George et al., 2021), variable-length structure (Tupkary et al., 2024), detector-imperfection handling (Tupkary et al., 2025b), and a reference implementation (Burniston et al., 2024), serve as the certification-aligned cross-check rather than the shipping proof. Finally, the statistical foundations of the characterization pipeline — exact binomial intervals (Clopper and Pearson, 1934), bounded-mean concentration (Hoeffding, 1963), sampling without replacement (Serfling, 1974; Fung et al., 2010), and martingale concentration (Azuma, 1967) — are cited where the pipeline is specified in Section 14.

### 7.10 Positioning

Against the closest works, the positioning is explicit. Relative to Sidhu et al. (2022) and Islam et al. (2024), this paper contributes no new rate analysis or channel model; it freezes one fixture of that family and subjects it to hash-level verification, deterministic screening, and proof-coverage audit. Relative to Tan and Nahar (2026), it instantiates the certify-then-run discipline in the limit of zero characterization — the case in which the framework correctly yields no security claim at all — rather than performing certification. Relative to the imperfection-aware proof literature (Sections 7.3–7.6), it contributes no new proof; it maps where each existing proof would enter, what characterization each requires, and which gaps are genuinely open. Relative to the numerical-SDP line, it positions numerics as an independent cross-check of analytic margins, not the audited shipping proof. The result is, by construction, a verification-and-boundary study: its object is the evidence structure of a satellite-QKD claim, not the claim.

***

## 8. System and Protocol Model

**Topology.** The concept under study is a single direct satellite-to-ground downlink: a low-Earth-orbit satellite acts as the transmitter (conventionally Alice) and an optical ground station as the receiver (Bob). No relay, repeater, or trusted intermediate node is present. During one pass the slant range and atmospheric path vary with elevation, producing a time-varying transmissivity that the fixture represents as a frozen 693-sample efficiency curve spanning $t = +346\,\mathrm{s}$ to $t = -346\,\mathrm{s}$ about closest approach, mirror-symmetric in efficiency and elevation about $t = 0$. The curve is a modeled input, not a measurement; the bundled copy is byte-identical to the frozen V0.6 controlled loss input.

**Protocol.** The protocol profile is efficient (biased-basis) BB84: the two bases are selected with unequal probabilities, so the key-generating basis (X) dominates the sifted block while the test basis (Z) supplies the phase-error estimation sample. The optical signal consists of phase-randomized weak coherent pulses at three mean photon numbers — one signal and two decoy intensities, one of them vacuum — with ordering guards $\mu_1 > \mu_2 > \mu_3 = 0$ and $\mu_1 > \mu_2 + \mu_3$ enforced by the fixture. The probability-weighted mean photon number at baseline is $0.62400964$ (the intensity and probability components reside in a controlled input absent from the audited bundle; see REQ-01, Section 16).

**Finite-block context.** Because a single pass yields a finite detection block, the analysis is a finite-key one: observed gains and error counts are converted into composable bounds on the vacuum and single-photon contributions and on the phase-error rate, and the key length is a margin over the error-correction leakage and the privacy-amplification and verification penalties. At the baseline the X-basis block sizes are $n_X = 492{,}818.0901525894$ detections with $m_X = 8{,}586.215167746126$ errors, against $n_Z = 48{,}555.17200782972$ test-basis detections.

**The frozen V0.16-TA1 fixture.** All computations are performed by a frozen software fixture (V0.16-TA1) whose inputs are hash-recorded controlled artifacts and whose conventions are fixed: integer half-window sweep with argmax selection and smaller-window tie-break; signed margin retained alongside the floored candidate key; decoy-ordering violations handled by defensive zeroing that is, in practice, pre-empted by earlier validation failure — fail-closed in both orderings. The fixture's software contract exposes eight scalar parameters (TH-PAR-001 through TH-PAR-008): additional system loss, detector-efficiency multiplier, source repetition rate, signal-intensity multiplier, weak-decoy multiplier, extraneous-count probability, afterpulse probability, and intrinsic QBER. The baseline channel configuration is: additional system loss $13.0\,\mathrm{dB}$; repetition rate $10^{8}\,\mathrm{Hz}$; extraneous-count probability per pulse $p_{ec} = 5\times10^{-7}$; afterpulse probability $p_{ap} = 10^{-3}$; intrinsic QBER $0.005$; detector-efficiency multiplier $1.0$.

**Status of all parameters.** Every parameter value in this section is ASSUMED: it is a declared constant of the fixture, not a measured property of any device. The detection model inside the fixture treats efficiency as a single scalar multiplying the optical input, with the per-pulse detection probability given by $(1+p_{ap})\,\bigl(1-(1-2\,p_{ec})\,e^{-\mu\,\eta_{\mathrm{curve}}\,\eta}\bigr)$ and the error contributions built from $p_{ec}$, $p_{ap}$, and the intrinsic QBER. This scalar structure is precisely the locus of the proof-coverage gaps analyzed in Section 12; it is reported here as the fixture's content, not as a device model. No statement in this section is a claim about hardware, and the words "satellite" and "ground station" denote roles in a mathematical model of a concept.

***

## 9. Mathematical Framework

### 9.1 Notation

Table 1 fixes the notation used throughout. All quantities are dimensionless counts, probabilities, or bits as indicated; where a value is quoted it is the locked canonical value of the frozen fixture.

Table 1: Notation and locked baseline values (model-computation facts; not measurements).

| Symbol | Meaning | Baseline value (if locked) |
|---|---|---|
| $n_X,\ n_Z$ | X/Z-basis detection counts per pass | $492{,}818.0901525894$ / $48{,}555.17200782972$ |
| $m_X$ | X-basis error count | $8{,}586.215167746126$ |
| $s_{X,0},\ s_{X,1}$ | lower bounds on vacuum and single-photon X-basis events | $5{,}047.784882329125$ / $183{,}803.04893680647$ |
| $s_{Z,1},\ v_{Z,1}$ | single-photon Z-basis events and errors (bounds) | $12{,}007.470453438744$ / $845.9615478747239$ |
| $\phi_X$ | upper bound on the single-photon phase-error rate | $0.09270161340569935$ |
| $\lambda_{EC}$ | error-correction leakage (bits) | $65{,}385.40180119235$ |
| $\epsilon_s,\ \epsilon_c$ | secrecy and correctness parameters | individually unverified (Section 9.4) |
| $M$ | signed finite-key margin (bits) | $41{,}338.62418456675$ |
| $\mu_1,\mu_2,\mu_3$ | signal and decoy intensities ($\mu_3=0$) | controlled input (REQ-01) |
| $h_2(\cdot)$ | binary entropy | defined in Eq. (1) |

### 9.2 Binary entropy and phase-error bound

The binary entropy is

$$
h_2(x) = -x\log_2 x - (1-x)\log_2(1-x),
\tag{1}
$$

with the convention $h_2(0)=h_2(1)=0$. The phase-error bound is inferred from the test basis by random sampling without replacement, with a Serfling-type correction term $\gamma$ (Serfling, 1974; Fung et al., 2010; Lim et al., 2014):

$$
\phi_X = \min\!\left(\frac{v_{Z,1}}{s_{Z,1}} + \gamma,\ \tfrac{1}{2}\right).
\tag{2}
$$

The cap at $1/2$ binds in $1{,}088$ of the $1{,}681$ screen points (a deterministic property of the screen CSV), which is one mechanism by which the screen's nonpositive region arises.

### 9.3 The margin equation

The signed finite-key margin of the frozen fixture is

$$
M = s_{X,0} + s_{X,1}\bigl[1 - h_2(\phi_X)\bigr] - \lambda_{EC} - 6\log_2\!\frac{21}{\epsilon_s} - \log_2\!\frac{2}{\epsilon_c},
\tag{3}
$$

following the structure of Lim et al. (2014) as instantiated in the satellite fixture family of Sidhu et al. (2022). The candidate key under the frozen convention is

$$
K = \bigl\lfloor \max(M,\,0)\bigr\rfloor,
\tag{4}
$$

with the signed margin retained for boundary analysis; a nonpositive $M$ is a model outcome, not a measured outage and not a security-failure probability. Equation (3) reproduces the hash-verified run summary bit-exactly at the baseline (difference $0.0$), which is the strongest internal-consistency evidence available for the fixture.

**The "21" decomposition.** In the Lim et al. (2014) construction, the secrecy parameter bundles 21 constituent failure probabilities, $\epsilon_{\mathrm{sec}} = 2(2\alpha_1+\alpha_2+\alpha_3) + \bar{\nu} + 10\epsilon_1 + 2\epsilon_2 = 21\epsilon$ under the symmetric split: four random-sampling/smoothing $\alpha_1$ terms, two-plus-two entropic chain-rule splits ($\alpha_2,\alpha_3$), one privacy-amplification leftover-hash term ($\bar{\nu}$), ten one-sided Hoeffding count bounds, and two Z-basis error-count bounds. The bit penalty $6\log_2(21/\epsilon_s)$ equals $[2\log_2(1/\alpha_2)+1] + [2\log_2(1/\alpha_3)+1] + 2\log_2(1/(2\bar{\nu}))$ under the symmetric split $\alpha_2=\alpha_3=\bar{\nu}=\epsilon_s/21$ — the two $+1$ chain-rule constants cancel the $-2$ contributed by the factor 2 inside the privacy-amplification logarithm, so the identity is exact, and omitting the $+1$ terms would leave the right-hand side short by exactly 2 bits (Lim et al., 2014, supplementary Eqs. (13)–(14); corrected arithmetic per the V0.17 architecture record). The term $\log_2(2/\epsilon_c)$ is the error-verification hash-tag length under 2-universal hashing (Wegman and Carter, 1981). Faithful use of Eq. (3) requires every fluctuation and sampling sub-term to use effective deviation parameter $\epsilon_s/21$ (or a documented split summing to $\epsilon_s$); the frozen fixture satisfies this internally through $\beta=\ln(21/\epsilon_s)$ in its Chernoff bounds.

**Error-correction accounting.** The term $\lambda_{EC}$ is constructed from a binomial-quantile (logarithm-of-coefficient) finite-size expression and corresponds to ideal error-correction accounting at efficiency $f_{EC}=1$ plus a finite-size quantile correction. Realistic error correction has $f_{EC}>1$ (literature context: a frequently quoted ballpark is $f_{EC}\approx 1.16$ — cited as literature context only, never adopted as a Q-Orbit value), which would increase leakage. Consequently, every margin and candidate-key figure in this paper is an upper bound with respect to error-correction efficiency.

### 9.4 Epsilon accounting

The frozen budget contains exactly two visible security parameters. The penalty term evaluates to $256.5669430839006$ bits; the pair $(\epsilon_s,\epsilon_c)=(10^{-10},10^{-9})$ reproduces this value bit-exactly, but the equation is one constraint in two unknowns and the individual values appear in no controlled artifact — they are therefore carried as UNVERIFIED-PENDING-CONTROLLED-INPUTS (evidence class EV-9), and only the combined penalty is quoted as verified. Two further classes required by composable security are absent from the frozen equation by construction: characterization failure $\epsilon_{char}$ and authentication failure $\epsilon_{auth}$ (Section 14). The composed total, once characterization and authentication exist, is

$$
\epsilon_{\mathrm{total}} = \epsilon_c + \epsilon_s + \epsilon_{char}\ (+\ \epsilon_{auth}),
\qquad \epsilon_{char} \equiv \sum_j \delta_j,
\tag{5}
$$

with $\epsilon_{char}$ defined exactly once as the union bound over per-parameter characterization failure probabilities $\delta_j$; listing $\sum_j\delta_j$ as a separate summand alongside $\epsilon_{char}$ would double-count and is prohibited. With zero characterization, $\epsilon_{char}$ is symbolic and Eq. (3) computes a conditional number, not a security statement (Tan and Nahar, 2026).

### 9.5 Assumption inventory and status

Table 2 condenses the six assumption classes of the frozen fixture, each with its algebraic entry point and its status under the zero-characterization boundary; the full inventory is developed in Section 12.

Table 2: Assumption inventory of the frozen fixture (all entries ASSUMPTION-DEPENDENT at zero characterization).

| ID | Assumption | Algebraic entry point | Status label |
|---|---|---|---|
| A1 | Perfect phase randomization | photon-number decomposition $\tau_n$; all decoy estimators | UNMAPPED-PROOF-REQUIRED; candidates gated by CHARACTERIZATION-REQUIRED |
| A2 | IID pulses (no correlations) | Chernoff/Hoeffding count bounds; Serfling term in $\phi_X$ | UNMAPPED-PROOF-REQUIRED (detector-side correlations are an open proof problem) |
| A3 | Exactly known intensities | decoy-estimator denominators and Poisson weights | PROOF-PROFILE-CANDIDATE gated by CHARACTERIZATION-REQUIRED |
| A4 | Squashing detection; photon-number-independent efficiency | scalar $\eta$; yield identity; basis sampling | candidates exist for mismatch; rate-dependent yields open |
| A5 | No side channels | absent — observables are structurally blind to leakage | BLOCKING for unconditional claims (isolation unmeasured) |
| A6 | Point-valued parameters | the entire margin function; no $\epsilon_{char}$/$\epsilon_{auth}$ terms | BLOCKING; $M$ is a conditional computation only |

***

## 10. Methods

### 10.1 Controlled fixture and artifact set

All numerical work operates on a controlled set of ten artifacts: the frozen model source (Python, 608 lines); the frozen 693-sample loss/efficiency curve; the hash-verified run summary; the regression-test record; the two-parameter screen CSV (1,681 rows); the local-sensitivity record (8 rows); the zero-key frontier record (16 rows); the final audit record (20 checks); the SHA-256 manifest (64 entries); and the controlled-input index (17 hash-recorded inputs). Nine of the ten are content-hash-verified against the manifest — two directly and seven after deterministic repair of PDF round-trip damage, with the repair reproduced independently by two auditors. The tenth, the model source, compiles and was fully inspected, but its byte-level hash could not be reconstructed from the bundle (PDF-inserted blank lines are indistinguishable from source blanks); it is carried as hash-chain-listed only (evidence class EV-1c/EV-4). The bundled loss curve is byte-identical to the frozen V0.6 controlled input per the manifest. Figure 1 summarizes the per-pass finite-key computation workflow of the frozen fixture.

*Figure 1. Deterministic finite-key computation workflow of the frozen Q-Orbit V0.16-TA1 theoretical fixture, from pass-window selection through decoy-state estimation, phase-error bounding, and the signed margin M to the floored candidate key. Content is theoretical and modeled: it describes a software computation over an assumed parameter point with zero physical characterization (CFR B-01); no stage is measured. The emitted candidate key is a conditional computation and carries no security claim (D6 §6). (Figure production per Q-Orbit_Figure_Specification.md.)*

### 10.2 Half-window optimization

For every evaluated point — baseline, perturbation, frontier, and screen — the fixture sweeps integer half-windows over a declared range, evaluates the signed margin at each admissible window (windows violating the elevation mask are skipped), and selects the argmax; exact ties are broken toward the smaller window. The sweep bounds are read from a controlled channel configuration absent from the audited bundle (REQ-01); the observed half-window extremes are 221 s (cross-artifact: screen and frontier records) and 1 s (single-artifact: screen record; the frontier record's observed minimum is 67 s). At the baseline the selected half-window is 102 s, spanning 205 sample bins with edge elevation $30.4813547009598^{\circ}$. Critically, the window is re-optimized at every perturbation and screen point — the $\pm0.1\,\mathrm{dB}$ loss perturbations select 104 s and 101 s — so the baseline-optimal window is never silently carried into a changed count or error regime. The statistical consequence of this design choice for the screen statistics is analyzed in Sections 11.3 and 15.

### 10.3 Local response analysis

Each of the eight software-contract scalars is perturbed individually about the baseline by a declared step — $\pm0.1\,\mathrm{dB}$ for additional system loss, $\pm1\%$ relative for the remaining seven — and the signed margin is recomputed with the half-window re-optimized. The local response is the central-difference slope $(M_{+}-M_{-})/2$, normalized by the baseline margin. Because steps and physical meanings differ across parameters, the ranking is local and step-dependent: it characterizes the fixture around one point of its input space and nothing else.

### 10.4 Deterministic two-parameter screen

The coupled screen varies two count-model parameters jointly: extraneous-count probability over $[10^{-7},\,2\times10^{-6}]$ and intrinsic QBER over $[0.003,\,0.015]$. Each axis is a 40-point uniform grid with the baseline value adjoined and duplicates removed, giving 41 unique values per axis and $41\times41=1{,}681$ evaluated points; at each point the full pipeline — window optimization, decoy estimation, margin evaluation — is re-executed. The ranges are declared engineering bounds inherited from a controlled parameter register (provenance pending, REQ-03): not probability distributions, calibrated intervals, or measured tolerances, and no grid point carries any frequency or likelihood interpretation. Every screen row carries an explicit range-classification field to this effect.

### 10.5 Zero-key frontiers

For each of the eight contract parameters, a one-parameter frontier search locates the boundary between positive and nonpositive signed margin on each side of the baseline within the declared domain: a 180-point bracket grid per side (geometric spacing where the domain is positive, arithmetic fallback) followed by 60 bisection iterations, with a crossing defined as the last positive point before the first nonpositive under a strict sign test. The result is a 16-row record (8 parameters × 2 sides). Frontier values are grid-resolution-limited model boundaries — classified accordingly — not analytic thresholds, tolerances, procurement filters, or security-proof domains.

### 10.6 Verification methodology

The verification regime has five layers. (i) *Hash chain*: artifact bytes are compared against the declared SHA-256 manifest, with deterministic repair where PDF round-trip damage is provably the only divergence; the manifest verifies against the bundle cover, and the index's 17 controlled-input hashes match the manifest 17/17. (ii) *Recomputation*: headline quantities are recomputed from the CSV artifacts with independent code — screen partition, fraction, order statistics, axis construction, sensitivity arithmetic, and frontier crossings all reproduce bit-exactly, and the margin identity (Eq. (3)) and QBER identity $\mathrm{QBER}_X = m_X/n_X$ reproduce with difference $0.0$. (iii) *Regression suite*: twelve tests (REG-001…012) covering seven fixture metrics, a $+20\,\mathrm{dB}$ negative test, grid identity, grid partition, and two boundary invariants; all pass, and the suite raises on any failure (fail-closed). (iv) *Independent audit*: a twenty-check package audit (AUD-016-001…020) passes in full, with all payloads cross-consistent across records. (v) *Independent red team*: two hostile review rounds — sixteen findings (C1–C16) and nine (F-01…F-09) — produced 25/25 dispositions, all fixed and verified, including independent recomputation of every headline number by the second-round reviewer and eight live bibliographic spot-checks with zero contradictions. A prior independent implementation (V0.13) compared 50 locked vectors over 971 metrics with zero open numerical discrepancies; its evidence file is not in the audited bundle and is carried at the single-artifact evidence class.

### 10.7 Evidence hierarchy

Every factual claim in the package carries an evidence class, and no claim is promoted beyond its class. The classes used here are: EV-1a (hash-verified artifact), EV-1b (recomputed from a supplied generated CSV), EV-1c (hash-chain-listed; content byte-verification not possible), EV-2 (mathematical invariant over controlled counts), EV-3 (identical across at least two independent controlled artifacts), EV-4 (single-artifact), EV-5 (verified published or preprint literature — context only, never device evidence), EV-9 (unverified pending controlled inputs), and EV-10 (blocked: unattainable in current scope). Literature evidence is structurally incapable of promotion into device evidence. Figure 6 summarizes the hierarchy.

*Figure 6. Evidence ladder: from reproducible executable output and controlled generated data, through hash-verified summaries, regression fixtures, and technical reports, to literature records on a separate axis that can never be promoted to device evidence; each rung annotated with its evidence class and with the claim types it may support. Content class: theoretical — a diagram of the package's evidence policy; not measured. (Figure production per Q-Orbit_Figure_Specification.md.)*

***

## 11. Results

All values in this section are model computations of the frozen fixture (evidence classes EV-1a/EV-1b/EV-2/EV-3 as tabulated in the Canonical Facts Record), reproduced bit-exactly where a recomputation was possible. None is a measurement.

### 11.1 Baseline reproduction

Table 3: Baseline fixture output at the optimized 102 s half-window (conditional computation at assumed parameters; upper bound in error-correction efficiency; not a released key).

| Quantity | Value |
|---|---|
| Half-window / sample bins / edge elevation | $102\,\mathrm{s}$ / $205$ / $30.4813547009598^{\circ}$ |
| Signed margin $M$ | $41{,}338.62418456675$ bits |
| Floored candidate key $K$ | $41{,}338$ bits |
| X-basis QBER $m_X/n_X$ | $0.017422686665352745$ |
| Phase-error bound $\phi_X$ | $0.09270161340569935$ |
| $n_X$ / $n_Z$ / $m_X$ | $492{,}818.0901525894$ / $48{,}555.17200782972$ / $8{,}586.215167746126$ |
| $s_{X,0}$ / $s_{X,1}$ | $5{,}047.784882329125$ / $183{,}803.04893680647$ |
| $s_{Z,1}$ / $v_{Z,1}$ | $12{,}007.470453438744$ / $845.9615478747239$ |
| $\lambda_{EC}$ | $65{,}385.40180119235$ bits |
| Finite penalty $6\log_2(21/\epsilon_s)+\log_2(2/\epsilon_c)$ | $256.5669430839006$ bits |
| Probability-weighted mean photon number | $0.62400964$ |

**Interpretation.** The baseline fixture yields a positive signed margin of about $4.13\times10^{4}$ bits at its assumed parameter point, qualified by three structural observations. First, the margin is dominated by the single-photon term $s_{X,1}[1-h_2(\phi_X)]$: the phase-error bound $\phi_X\approx0.093$ removes roughly $45\%$ of the single-photon contribution through the entropy factor, and the leakage $\lambda_{EC}$ exceeds the entire margin — the margin is a small difference of large conditional quantities that modest parameter degradation erases. Second, it is an upper bound with respect to error-correction efficiency because $\lambda_{EC}$ instantiates $f_{EC}=1$; any realistic $f_{EC}>1$ reduces it. Third, it is conditioned on point-valued assumed inputs: under the certification discipline of Section 14 it supports no security claim and is no mission-performance figure of any kind. Its role in this study is as a regression anchor — a number any future software version must reproduce bit-exactly — not as a prediction.

### 11.2 Local sensitivity

Table 4: Local signed-margin responses, normalized per declared step (central differences; window re-optimized at each perturbation). Ranking is local and step-dependent.

| Rank | Parameter (step) | Normalized response |
|---|---|---|
| 1 | Additional system loss ($\pm0.1$ dB) | $-0.08215788925285143$ ($-8.216\%$ per $0.1$ dB) |
| 2 | Detector-efficiency multiplier ($\pm1\%$) | $+0.035673639848324994$ ($+3.567\%$ per $1\%$) |
| 3 | Repetition rate ($\pm1\%$) | $+0.01946358671353013$ ($+1.946\%$ per $1\%$) |
| 4 | Extraneous-count probability ($\pm1\%$) | $-0.016195046443390957$ |
| 5 | Intrinsic QBER ($\pm1\%$) | $-0.006768764678164013$ |
| 6 | Signal-intensity multiplier ($\pm1\%$) | $-0.005861881586843529$ |
| 7 | Weak-decoy multiplier ($\pm1\%$) | $-0.0007369594599526124$ |
| 8 | Afterpulse probability ($\pm1\%$) | $-0.0006325501181450469$ |

*Figure 2. Local signed-margin response per declared perturbation step for the eight contract parameters (values of Table 4). Content class: modeled/deterministic — arithmetic on a frozen software fixture; not measured; not device tolerances. (Figure production per Q-Orbit_Figure_Specification.md.)*

**Interpretation.** The margin is by far most sensitive to channel loss: a $0.1$ dB step moves it by over $8\%$ of baseline, an order of magnitude more than any other tested parameter per unit step. Detector efficiency and repetition rate follow, both positive, as expected for parameters scaling detection counts. The negative signal-intensity response — increasing the signal multiplier slightly decreases the margin here — reflects the finite-key trade-off between detection yield and phase-error estimation at fixed block structure: the baseline intensities sit near a local optimum of the frozen model, not a universally improvable point. Two caveats are structural: the ranking compares steps of different physical meaning ($0.1$ dB against $1\%$ relative), so it is a property of the declared steps as much as of the model; and the responses are local, with re-optimized windows (104 s, 101 s for the loss steps) already incorporated. These are software-fixture sensitivities — not tolerances, procurement filters, or calibration limits for any device.

### 11.3 Coupled screen

Table 5: Statistics of the deterministic $41\times41$ screen over extraneous-count probability $\times$ intrinsic QBER (upper-envelope quantities under per-point window re-optimization; not probabilities).

| Statistic | Value |
|---|---|
| Total points | $1{,}681$ |
| Positive signed margin | $568$ |
| Nonpositive signed margin | $1{,}113$ |
| Positive grid fraction | $0.33789411064842356$ |
| Median signed margin | $-2{,}624.946810258186$ bits |
| Minimum signed margin | $-3{,}828.414517626367$ bits |
| Maximum signed margin | $+142{,}540.7481180454$ bits |

*Figure 3. Signed margin across the controlled $41\times41$ screen, with the zero-margin boundary at grid resolution; per-point re-optimized half-window indicated. Content class: modeled/deterministic — a deterministic partition of an engineering grid; the boundary is grid-resolution-limited, not an analytic threshold; the figure is not a probability map and is not measured. (Figure production per Q-Orbit_Figure_Specification.md.)*

**Interpretation.** The coupled screen is dominated by nonpositive outcomes: only about one third of grid points retain a positive margin, and both the median ($-2{,}624.946810258186$ bits) and the minimum ($-3{,}828.414517626367$ bits) are negative. The extremal rows are structurally intelligible: the maximum sits at the most benign corner (extraneous probability $10^{-7}$, intrinsic QBER $0.003$, half-window 221 s) and the minimum at the harshest corner ($2\times10^{-6}$, $0.015$, half-window 1 s, $\phi_X$ cap binding). The cap binds in $1{,}088$ of $1{,}681$ rows, and 21 of 41 extraneous-count columns contain no positive cell — evidence that the nonpositive region is driven jointly by phase-error saturation and by leakage exceeding the remaining single-photon term. **Correction notice.** An earlier rendering of the results table reported the median and minimum with positive signs; those two cells were sign-flipped in error, were internally inconsistent with the table's own 568/1,113 partition (a positive minimum is incompatible with the existence of nonpositive points), and are quarantined. The negative values here are the computed ground truth, confirmed by CSV recomputation, the hash-verified run summary, and partition-invariant logic (Canonical Facts Record corrections C-01, C-02, C-03). The partition itself is an upper-envelope quantity: the half-window is re-optimized per point, so the positive count at any fixed window is at most 568; and because the grid ranges are engineering bounds, the fraction $0.33789411064842356$ is not a probability, reliability, availability, or yield.

### 11.4 Zero-key frontiers

Table 6: Zero-key frontier summary (16 rows = 8 parameters × 2 sides; 10 crossings found; frontier values are grid-resolution-limited model boundaries, not tolerances).

| Structure | Result |
|---|---|
| Rows / crossings | 16 / 10 CROSSING-FOUND; 6 NO-CROSSING-IN-DECLARED-DOMAIN |
| Additional loss, HIGH side | crossing at $14.507927510764345$ dB (baseline $13.0$ dB) |
| Extraneous-count probability, HIGH side | crossing at $8.958206093312436\times10^{-7}$ (baseline $5\times10^{-7}$) |
| Intrinsic QBER, HIGH side | crossing at $0.013335017073411072$ (baseline $0.005$) |
| LOW-side no-crossing | loss, extraneous counts, afterpulse, intrinsic QBER |
| HIGH-side no-crossing | detector-efficiency multiplier, repetition rate |
| Full 16-row record | controlled artifact 07; cross-checked identical in the audit record (AUD-016-005/006) |

**Interpretation.** The frontier structure quantifies how far the frozen model can be pushed within the declared domains before the margin changes sign. The loss crossing about $1.51$ dB above baseline shows the positive margin rests on narrow loss headroom, consistent with the dominant sensitivity of Table 4. The extraneous-count crossing lies at about $1.79\times$ baseline and the intrinsic-QBER crossing at about $2.67\times$ baseline; both sit well inside the declared screen ranges, which is precisely why the screen's nonpositive region is extensive. The no-crossing rows are equally informative: reducing loss, background, or intrinsic QBER below baseline never destroys the margin in-domain (the LOW side is benign), and raising detector efficiency or repetition rate never does either. All frontier values are grid-resolution-limited crossings of a deterministic model within declared engineering domains — not measured thresholds, device specifications, procurement criteria, or security boundaries — and a crossing says nothing about whether any real device could exhibit that parameter value.

### 11.5 Regression, audit, and adversarial-review evidence

The twelve-test regression suite passes in full (12/12), covering the seven fixture metrics, a $+20$ dB negative test, grid identity, grid partition, and two boundary invariants; the twenty-check independent audit passes in full (20/20), with all payloads cross-consistent across the run summary, regression, screen, sensitivity, and frontier records; and the hash chain content-verifies nine of ten artifacts, with the model source hash-chain-listed and compiling but not byte-verified. Two independent red-team rounds produced 25 findings, all dispositioned and verified fixed — including one blocking finding (a fabricated publication claim for a preprint, detected and removed) and two major closure-round findings (a stale status line and a proof-coverage over-claim on the Layer 2 anchor); the second-round reviewer independently recomputed every headline number to bit-exact agreement. This evidence establishes the integrity of the computational record and nothing else: regression and audit passage are properties of software and artifacts, not of any physical system, and no number in this section is promoted beyond that class anywhere in this paper.

***

## 12. Proof-to-Device Analysis

This section condenses the project's device-imperfection mapping: fifteen mandated effect classes — five source-side, eight detector/receiver-side, two cross-cutting — classified against the frozen fixture and the verified proof literature. The rule is fail-closed: an effect is engineering count-model only if it changes observed rates or QBER without changing the adversary's information, the validity of the source and detection model, or the finite-key statistics; otherwise it is proof-modifying. Rows whose component labels disagree resolve to their strictest label. No effect is fully represented in the frozen fixture, and — by explicit policy — no artificial scalar penalty is invented for an unmapped effect: a convenient penalty would create the appearance of coverage without a proof basis.

Table 7: The fifteen device-imperfection classes with controlled status labels (condensed from the Phase 1 mapping; literature pointers per Section 7). Labels: UPR = UNMAPPED-PROOF-REQUIRED; BLOCKING; USB = UNMAPPED-SECURITY-BUDGET; PPC = PROOF-PROFILE-CANDIDATE (gated by characterization); UCR = UNMAPPED-CHARACTERIZATION-REQUIRED.

| # | Effect class (side) | Fixture representation | Candidate proof treatment (LITERATURE-SUPPORTED) | Resolved status |
|---|---|---|---|---|
| 1 | Incomplete phase randomization (source) | none — perfect PR assumed silently | generalized decoy with characterized phase distribution (Nahar et al., 2023; Currás-Lorenzo et al., 2023; Sixto et al., 2023) | UPR |
| 2 | Pulse-to-pulse encoding correlations (source) | none — IID assumed | correlated-source proofs; martingale statistics (Pereira et al., 2025; Azuma, 1967; Kato, 2020, preprint) | UPR |
| 3 | Intensity correlations (source) | none — exact scalar intensities | bounded to unbounded correlation-tolerant decoy (Zapatero et al., 2021; Sixto et al., 2022; Pereira et al., 2025) | PPC |
| 4 | State-preparation flaws (source) | basis-independent component only, inside intrinsic QBER | loss-tolerant and unified frameworks (Tamaki et al., 2014; Mizutani et al., 2015; Pereira et al., 2023; Currás-Lorenzo et al., 2025) | UPR |
| 5 | Source leakage / Trojan-horse (source) | none — outside the count/QBER model | leaky-source proofs conditional on measured isolation (Lucamarini et al., 2015; Tamaki et al., 2016; Wang et al., 2018; Currás-Lorenzo et al., 2025) | BLOCKING |
| 6 | Dead time / recovery (detector) | none — efficiency scalar is rate-independent | bounded time-dependent mismatch proofs (Fung et al., 2009; Zhang et al., 2021; Trushechkin, 2022); adversarial dead-time attacks (Weier et al., 2011) | USB |
| 7 | Saturation (detector) | none — linear count model | certified maximum input flux plus bounded residual nonlinearity; detector-control attack entry point (Lydersen et al., 2010) | BLOCKING |
| 8 | Timing jitter (detector) | window-average only | time-resolved mismatch bounds (Fung et al., 2009; Zhang et al., 2021); time-shift attack enabler (Qi et al., 2007; Zhao et al., 2008) | UCR |
| 9 | History-dependent afterpulsing (detector) | equilibrium IID marginal only ($p_{ap}$) | physical memory models exist; complete finite-key decoy proof with correlated afterpulse noise is an open problem | UPR |
| 10 | Efficiency mismatch (detector) | single scalar $\eta$ | mature mismatch-bounded proofs (Fung et al., 2009; Zhang et al., 2021; Trushechkin, 2022; Marcomini et al., 2025; Grasselli et al., 2025) | PPC |
| 11 | Wavelength-dependent response (detector) | design-wavelength scalar only | certified spectral filtering as device assumption; out-of-band response is an unmodeled Eve→receiver channel | USB |
| 12 | Polarization-dependent response (detector) | polarization average only | polarization-resolved mismatch bounds; basis-dependent detection (Grasselli et al., 2025) | PPC |
| 13 | Detector memory, general (detector) | none — IID detection statistics assumed | martingale statistics; partial tools (Nahar and Lütkenhaus, 2025, preprint; Tupkary et al., 2025b); complete treatment open | UPR |
| 14 | Characterization uncertainty (cross-cutting) | none — all inputs exact constants | certify-then-run composition with per-parameter intervals (Tan and Nahar, 2026) | UCR |
| 15 | Aging / cross-instance drift (cross-cutting) | none — time-invariant constants | multi-epoch characterization with worst-case hulls; on-orbit aging is measurable in principle (Lenart et al., 2025) | UCR |

**Reading of the table.** The resolved partition is: five rows UPR (1, 2, 4, 9, 13), two rows BLOCKING (5, 7), two rows USB (6, 11), three rows PPC (3, 10, 12), and three rows UCR (8, 14, 15). The engineering-versus-proof split is deliberate: dead time, saturation, jitter, afterpulsing, and polarization response are engineering effects in their common-mode, memoryless, non-adversarial regime, but each escalates to proof-modifying the moment symmetry, memorylessness, or non-adversarialness fails — and symmetry is a characterized property, not an assumption. The meta-level rows 14 and 15 govern whether any number is a bound at all: at zero characterization, every security-relevant fixture output is a conditional computation.

**Interaction flags.** Five joint effects resist per-row analysis: encoding and intensity correlations couple through modulator memory (rows 2×3); intensity correlations co-occur with inter-pulse phase coherence in gain-switched lasers, requiring a joint characterization campaign (rows 1×3); a state-preparation flaw measured only in the qubit mode can masquerade as a side channel in an unmeasured mode (rows 4×5); injected Trojan-horse light can induce intensity fluctuations correlated with the adversary's probe, breaking the independence condition of fluctuating-intensity proofs (row 5 with the intensity regime); and dead time, recovery, saturation, afterpulse trap loading, and effective-efficiency nonlinearity form one coupled rate-dependence cluster (rows 6, 7, 9, 10, 13) driven by the instantaneous count rate, which sweeps with the pass loss profile — a single per-pass $\eta$ is an equilibrium fiction under this cluster.

**Open proof problems.** Two gaps are genuine literature gaps, not package defects: detector-side correlated afterpulsing inside finite-key decoy proofs — physical memory models and martingale statistics exist, but no verified turnkey treatment for this fixture class — and rate-dependent yields inside the decoy method, whose central identity (intensity-independent photon-number yields) fails whenever efficiency depends on count rate. Until resolved, the affected regimes must be excluded by certified operating bounds, not proved away. Figure 4 summarizes the mapping.

*Figure 4. Proof-to-device map: fifteen effect classes routed to fixture scalars (partial contact only), candidate proof treatments, and required characterization evidence, with the five interaction flags; status labels as in Table 7. Content class: theoretical/documentation — a structured mapping of literature and specification; contains no measured values. (Figure production per Q-Orbit_Figure_Specification.md.)*

***

## 13. Proof-Profile Architecture

The proof architecture is layered so that each layer's claims are labelled at exactly the evidence it possesses. The architecture is a specification (LITERATURE-SUPPORTED in its components; ASSUMPTION-DEPENDENT as a whole); nothing in it is implemented, measured, or certified.

**Layer 0 — frozen V0.16 fixture (in place).** The immutable regression reference: Eq. (3), the eight contract scalars, the window rule, the 1,681-point screen, the twelve-test regression suite, and the twenty-check audit. Future versions extend but never silently modify it; fixture-compatibility requires bit-exact reproduction of Table 3.

**Layer 1 — hardened Profile A (V0.17-TA1 shipping proof).** The frozen Lim/Sidhu-family construction is retained: it is the family the verified numerics instantiate, the satellite standard (Sidhu et al., 2022; Islam et al., 2024), and the most auditable under hostile review. Two mandatory hardening actions: an assumption ledger attached to every rate claim, making the six assumption classes of Table 2 explicit; and a statistics upgrade from plain Chernoff/Hoeffding bounds to Kato's inequality (Kato, 2020, preprint) or the sharp finite statistics of Mannalath et al. (2025) — a drop-in at fixture level and the cheapest way to shrink the penalty class without changing proof family. All Layer 1 outputs remain labelled conditional computations while characterization is absent.

**Layer 2 — Profile B (V0.18+ upgrade path; conservative).** The minimum change that converts the source-imperfection citations of Section 7 into covered proof terms: the complementarity/phase-error family with loss-tolerant state-preparation coverage (Tamaki et al., 2014; Mizutani et al., 2015), generalized decoy treatment of imperfect phase randomization (Nahar et al., 2023), and joint source-imperfection coverage via the unified framework of Currás-Lorenzo et al. (2025). The designated anchor is the consolidated rigorous decoy-BB84 proof of Tupkary et al. (2026a, preprint, arXiv:2601.18035), with two constraints stated plainly: it is a preprint under review, and its own abstract frames broader imperfection integration as future work — Profile B's imperfection coverage therefore rests primarily on the published unified framework (Currás-Lorenzo et al., 2025), with the anchor consolidating the estimation structure. Adoption of any Layer 2 term is gated on the characterization interval that term requires; until such evidence exists, every Layer 2 term remains symbolic.

**Layer 3 — characterization/certification composition (specified; execution blocked).** The certify-then-run architecture of Tan and Nahar (2026): a pre-designated robust parameter set; per-parameter confidence intervals at stated failure probabilities; rejection when any interval exits the robust set; and claim language restricted to joint bounds, $\Pr[\text{certification approves} \land \text{key insecure}] \le \epsilon_{char} + \epsilon_{protocol}$. This is the only layer that converts conditional numbers into security statements; with zero characterization it emits nothing.

**Exclusions and cross-checks.** Measurement-device-independent QKD (Lo et al., 2012; Braunstein and Pirandola, 2012) is architecturally excluded: it removes detector trust by relocating the measurement to an untrusted relay receiving light from both parties, whereas in the direct-downlink concept the ground receiver is precisely the party whose trust is at issue; uplink or dual-downlink variants would constitute a different mission concept, not a proof choice. Numerical semidefinite-programming proofs (Winick et al., 2018; George et al., 2021; Upadhyaya et al., 2021; Tupkary et al., 2024, 2025b) serve as an independent cross-check of Layer 1 margins at selected grid points and as the certification-aligned end state — not as the shipping proof, given their verification cost, reduced line-by-line auditability, and finite-key constants not yet superior to the analytic bound at per-pass block sizes of $n_X \approx 4.93\times10^{5}$. Figure 5 summarizes the layers.

*Figure 5. Layered proof-profile architecture: Layer 0 frozen fixture; Layer 1 hardened analytic profile; Layer 2 imperfection-native upgrade path; Layer 3 characterization/certification composition; with the MDI architectural exclusion and the SDP cross-check indicated. Content class: theoretical/documentation — an architecture specification; no layer is implemented as hardware or measured. (Figure production per Q-Orbit_Figure_Specification.md.)*

***

## 14. Security and Characterization Budget

### 14.1 The symbolic epsilon ledger

The frozen fixture exposes exactly two security parameters, $\epsilon_s$ and $\epsilon_c$, and even those are verified only in combination (Section 9.4). The composable literature requires at least two further classes, and the architecture carries them as symbolic ledger entries — named, with proof entry point and evidence requirement, but without any numeric value:

- $\epsilon_{char}$ — the joint probability that any characterization confidence interval fails to cover its true parameter, $\epsilon_{char}\equiv\sum_j\delta_j$ over parameters and envelope cells (Tan and Nahar, 2026). Status: SYMBOLIC ONLY — CHARACTERIZATION-REQUIRED.
- $\epsilon_{auth}$ — the authentication-forgery probability of the classical channel (Wegman and Carter, 1981; Portmann and Renner, 2022; Tupkary et al., 2026b, preprint). Status: SYMBOLIC ONLY — CHARACTERIZATION-REQUIRED, additionally requiring protocol specification (tag lengths, key-consumption accounting).
- $\epsilon_{varlen}$ — dormant; the frozen fixture is fixed-length, so this variable-length entry (Tupkary et al., 2024) never activates.

Two accounting rules are binding. First, the ledger's only instantiated numeric content is the frozen penalty $256.5669430839006$ bits, bundling the 21 secrecy sub-terms (Section 9.3) and the verification tag; every fluctuation sub-term must use effective deviation parameter $\epsilon_s/21$ or a documented split summing to $\epsilon_s$ — passing unscaled $\epsilon_s$ understates the failure probability by a factor of 21 and is rejected. Second, $\lambda_{EC}$ corresponds to ideal error correction ($f_{EC}=1$); realistic $f_{EC}>1$ increases leakage, so the ledger treats all margins as upper bounds with respect to error-correction efficiency, and no hardcoded $f_{EC}$ is permitted in any future instantiation.

### 14.2 The characterization-to-proof pipeline

The bridge from measurement to proof is a six-stage pipeline, specified here and executed nowhere: Stage A defines the measurand, instrument, operating envelope, sample plan, and calibration traceability; Stage B fixes the raw observable (count statistics or bounded readings) with no model fitting beyond the justified estimator; Stage C constructs a confidence interval at stated confidence $1-\delta_j$; Stage D maps the interval to the adversarial endpoint for the key rate; Stage E feeds that endpoint into the key-length computation after a monotonicity check confirming the endpoint is worst-case within the robust set; Stage F fixes the allowed claim class. The pipeline is a specification, not an authorization to measure anything; no stage has been performed for any Q-Orbit parameter.

Table 8: Statistical machinery per parameter type (all constructors are pure functions of counts and epsilons; they assign no physical value).

| Parameter type | Machinery | Failure probability | Reference |
|---|---|---|---|
| Binomial fraction (dark counts, test-sample QBER, afterpulse probability) | Clopper–Pearson exact interval; never Gaussian at the security boundary | $\delta_j$, split per tail | (Clopper and Pearson, 1934) |
| Bounded independent mean (efficiencies, monitor means) | Hoeffding's inequality | $\delta_j = 2\exp(-2nt^2/(b-a)^2)$ | (Hoeffding, 1963) |
| Subsampling without replacement (test→key phase-error inference) | Serfling bound / random-sampling $\gamma$ | from $\gamma(\delta,\cdot)$ | (Serfling, 1974; Fung et al., 2010) |
| Correlated or sequential trials (drift, detector memory, intensity correlations) | Azuma–Hoeffding; Kato's inequality for adaptive side information | from bounded increments | (Azuma, 1967; Kato, 2020, preprint) |
| Joint multi-parameter coverage | union bound (Bonferroni; no independence needed) | $\sum_j\delta_j$ | consistent with (Tan and Nahar, 2026) |
| Drift/aging between characterization and use | worst-case hull of per-epoch intervals; any assumed drift model is itself a proof condition | additive $\delta$ per campaign | (Tan and Nahar, 2026; Lenart et al., 2025) |

A seven-axis repetition matrix — time, temperature, wavelength, polarization, optical power (including injected-light stress), count rate, and device age — governs when an interval may be used away from its measurement point; any empty envelope cell renders the parameter UNCHARACTERIZED in that region, and no numerical key claim may be produced for operations there.

### 14.3 The conditional-claim prohibition

The only valid end-to-end security statement, once characterization exists, is the joint bound

$$
\Pr\bigl[\,(\text{key insecure} \lor \text{key incorrect}) \land \text{certification approved}\,\bigr] \;\le\; \epsilon_c + \epsilon_s + \epsilon_{char}\ (+\ \epsilon_{auth}).
\tag{6}
$$

Statements of the form "conditioned on certification approving, the device is secure with high probability" are prohibited: they conflate conditional probabilities and are invalid within the cryptographic framework (Tan and Nahar, 2026). At the present state — zero characterization — $\epsilon_{char}$ has no value, Eq. (6) cannot be instantiated, and every margin and candidate-key figure in this paper remains a conditional computation at an assumed parameter point. This is the operative finding rather than a defect: the distance between the fixture's output and a security claim is precisely the unexecuted pipeline of Section 14.2, and the architecture's function is to keep that distance visible, not to close it rhetorically.

***

## 15. Discussion

**Why a positive baseline margin is not mission evidence.** The baseline margin of $41{,}338.62418456675$ bits is a conditional computation: the value of Eq. (3) at one assumed parameter point, under six assumption classes that the proof literature has shown to be load-bearing and violable, with ideal error-correction accounting and no characterization, authentication, or certification layer. Promoting it to a mission claim would require evidence-backed parameter distributions, a validated physical channel and device model, a proof profile covering the realized imperfections, and a composed epsilon budget — none of which exists. The number's legitimate roles are three: a regression anchor future software must reproduce bit-exactly; a reference point for sensitivity and screening; and a worked example of how a nominally comfortable margin coexists with a mostly unmapped proof-coverage register. It is not, and is nowhere used as, evidence of mission success probability, QKD availability, Tabuk performance, hardware readiness, deployability, field readiness, or a released key.

**Why 568/1,681 is not a probability.** The screen partition arises from deterministic evaluation of the frozen fixture on a Cartesian product of engineering ranges: no sampling distribution is defined over the grid, the ranges are declared bounds rather than calibrated intervals, and every grid point carries equal weight by construction. The fraction $0.33789411064842356$ therefore has no frequentist or Bayesian content — it is not the probability that a pass yields key, not the fraction of operational conditions that succeed, not a reliability or availability figure. Probabilistic meaning would require a validated joint distribution over the screened parameters, evidence that does not exist and that the declared ranges deliberately do not pretend to supply.

**The upper-envelope character of per-point window optimization.** Because the half-window is re-optimized at every screen point, the screen answers "what is the best achievable margin at this parameter point under the window rule?", not "what margin does any fixed operating configuration deliver?". The optimization chooses the most favorable window for each point individually, so the positive count of 568 is an upper envelope — the positive count under any single fixed window is at most 568 — and the partition describes an optimizer's output surface, not the behaviour of a deployed configuration. The design is deliberate (it avoids silently carrying a baseline-optimal window into changed regimes), but it must be read as an envelope, one more reason the screen statistics resist probabilistic reading.

**The ideal error-correction limitation and its direction.** The leakage term $\lambda_{EC}$ instantiates $f_{EC}=1$, the theoretical minimum; realistic error correction operates at $f_{EC}>1$ (literature context suggests values around $1.16$ — context only, never a Q-Orbit value), strictly increasing leakage and decreasing the margin. All margins and candidate keys in this paper are therefore upper bounds with respect to error-correction efficiency: conservative for claim control, optimistic for performance, and the distinction is carried wherever the margin is quoted.

**Why QBER alone is insufficient.** The observed X-basis QBER of $0.017422686665352745$ is a single scalar summary of one basis's error count. The margin additionally depends on the vacuum and single-photon bounds, the test-basis phase-error inference, the leakage, the finite-key penalties, and the full protocol profile; and no QBER component can express phase-randomization defects (which change the channel structure, not the error rate), side-channel leakage (invisible to every count observable), detector-efficiency mismatch (a mean cannot represent a mode-resolved worst case), or pulse correlations (which invalidate the statistics' independence assumptions while leaving marginals unchanged). A low QBER is compatible with total insecurity; the fixture's discipline is precisely to refuse the substitutions that would hide this.

**Four kinds of verification, kept separate.** The results span four frequently conflated categories. *Software verification* — hash chains, bit-exact recomputation, regression and audit passage — establishes that the computational record is what it claims to be. *Proof coverage* — the mapping of Section 12 — establishes which physical effects a chosen proof would handle, given inputs. *Characterization* — the pipeline of Section 14 — would establish what the inputs are, with composed failure probabilities. *Physical validation* would establish that a built system behaves as modelled. This study completes the first category within disclosed limits, performs the second as a mapping exercise, specifies the third, and does not touch the fourth. Every over-claim in this domain is, at root, a confusion of one category for another; the claim-labelling regime exists to make that confusion structurally difficult.

***

## 16. Limitations

The following limitations are binding on this manuscript and all downstream documents; they are disclosed, not resolved.

1. **No end-to-end re-execution (REQ-01, REQ-02, REQ-03).** The controlled inputs containing the run manifest, the expected-baseline reference, and the parameter/provenance register are hash-recorded but absent from the audited bundle; the extracted model compiles but cannot be executed end-to-end, and no re-execution claim is made. The individual $\epsilon_s$ and $\epsilon_c$ are unverified (one equation, two unknowns); screen-range provenance and the window-sweep bound are pending; and the observed minimum window of 1 s is single-artifact evidence.
2. **Artifact 01 not byte-hash-verified.** The model source is hash-chain-listed and compiles, and its content was fully inspected, but byte-level reconstruction from the bundle was not achieved; static-inspection findings rest on content, not hash identity. Original non-PDF bytes (REQ-04) would close this.
3. **Register verification pending (REQ-05).** The grid-boundary, imperfection-mapping, claim-boundary, gate, and parameter registers are absent; row-level reconciliation of the fixture's internal mapping against the fifteen-class matrix of Section 12 is pending.
4. **Ideal error correction.** All margins and candidate keys are upper bounds in error-correction efficiency ($f_{EC}=1$ accounting); a margin-versus-$f_{EC}$ study is a logged backlog item, deliberately not computed here.
5. **Upper-envelope screen.** The screen statistics are upper-envelope quantities under per-point window re-optimization and carry no probabilistic content (Section 15).
6. **Preprint status of the Layer 2 anchor.** The consolidated proof (Tupkary et al., 2026a, preprint) is under review; its broader imperfection integration is future work per its own abstract; Profile B's coverage rests primarily on the published unified framework (Currás-Lorenzo et al., 2025); and the anchor's full text was not independently read in the audit.
7. **Open proof problems.** Detector-side correlated afterpulsing in finite-key decoy proofs and rate-dependent yields inside the decoy method are genuine open literature problems; the affected regimes must be excluded by certified operating bounds, not proved away, until resolved.
8. **Review gaps.** Earlier manuscript renderings compared during the audit are not part of the artifact bundle; the manifest's cover-hash link was accepted as asserted by the first auditor; non-load-bearing preprints were plausibility-checked only; and the certification framework's appendices were used as characterized rather than re-read line by line.
9. **Scope of verification.** Binary64 arithmetic is used throughout; interval and arbitrary-precision sensitivity are untested. Only the half-window is globally optimized; intensities and protocol probabilities are frozen. The loss curve and all device parameters are modeled, not measured. Nothing here constitutes physical validation, implementation security, certified device security, mission-performance, or deployment evidence, and no physical gate is closed by any reported number.

***

## 17. Conclusion

This paper asked two questions of a satellite-QKD concept: whether a frozen finite-key fixture can be reproduced and audited under fail-closed claim control, and what that fixture does and does not establish. The first answer is affirmative within disclosed limits: the fixture reproduces bit-exactly at every headline quantity, the hash chain verifies nine of ten controlled artifacts with the tenth hash-chain-listed, the regression and audit suites pass in full, and all 25 findings of two independent hostile review rounds are dispositioned and verified fixed. The second answer is a structured negative: the screen is dominated by nonpositive margins (median $-2{,}624.946810258186$ bits); none of the fifteen device-imperfection classes is fully represented in the frozen proof profile; two classes are blocking pending any characterization; and two genuine open proof problems bound what any near-term proof can cover. The 41,338-bit baseline figure remains throughout a theoretical fixture margin output — an upper bound at an assumed parameter point — not a released key or a mission prediction. The supported conclusion is narrow and, this paper argues, useful: an evidence architecture can be built in which a satellite-QKD finite-key claim is reproduced exactly, screened honestly, mapped against the proof literature, and stopped — by construction — precisely at the boundary of its evidence. The next steps are equally narrow: supply the REQ-01…REQ-05 controlled inputs; implement the Layer 1 hardening (assumption ledger, statistics upgrade) as software with refusal guards; and treat any characterization campaign as a separate, future, explicitly authorized programme. Nothing further is claimed.

***

## 18. Data and Reproducibility

**Controlled artifacts.** The numerical record consists of the ten controlled artifacts enumerated in Section 10.1 (model source, loss curve, run summary, regression record, screen CSV, sensitivity record, frontier record, audit record, manifest, controlled-input index). Nine of ten are content-hash-verified — two directly, seven after deterministic repair of PDF round-trip damage, with the repair independently re-executed — and the model source is hash-chain-listed (EV-1c) and compiles but is not byte-verified. The manifest verifies against the bundle cover; the index's hashes match the manifest 17/17; and the bundled loss curve is byte-identical to the frozen V0.6 controlled input.

**Recomputation procedure.** Every headline quantity in Section 11 is reproducible from the CSV artifacts alone: the screen partition (568/1,113 of 1,681), the fraction ($0.33789411064842356$), the order statistics (median $-2{,}624.946810258186$; minimum $-3{,}828.414517626367$; maximum $+142{,}540.7481180454$ bits), the axis construction (40-point uniform grid plus baseline, deduplicated, per axis), the sensitivity arithmetic (central slope, normalization, contiguous ranking), the frontier crossings, the margin identity of Eq. (3) (difference $0.0$), and the QBER identity. The regression suite (12/12) and the independent audit (20/20) provide the fixture-level and cross-artifact layers respectively. The prior independent implementation comparison (V0.13: 50 vectors, 971 metrics, zero open numerical discrepancies) is carried at the single-artifact evidence class.

**Remaining limitations.** REQ-01…REQ-05 remain open: the run manifest, expected-baseline reference, parameter/provenance register, original non-PDF bundle bytes, and the five processed registers are absent, gating end-to-end re-execution, individual epsilon verification, byte-level hash closure, and row-level register verification. Extraction followed the deterministic repair procedure documented in the Phase 1 Canonical Audit; the extraction path and per-artifact hash record are part of the controlled Phase 1 package (Canonical Facts Record, artifact-access ledger). Distribution remains private, and the modeled candidate key material is not real key material and remains quarantined.

***

## 19. References

All entries below are drawn exclusively from the Phase 1 verified citation record (Deliverable 3, its verification ledgers, and the audited research annexes); every record was verified against at least two independent bibliographic sources during the Phase 1 audit. Items marked PREPRINT are verified as arXiv preprints only and are labelled as such wherever cited. Records are reproduced as verified, including the genuine new-format APS short DOI of Tan and Nahar (2026) and the article number 53 of Sixto et al. (2023); no DOI is asserted where the audit record deliberately withholds one. One entry (Trényi and Curty, 2021) is retained solely to document a corrected misattribution and is never cited in support of any claim.

1. K. Azuma, "Weighted sums of certain dependent random variables," Tohoku Math. J. (2) 19(3), 357–367 (1967), DOI 10.2748/tmj/1178243286.
2. N. J. Beaudry, T. Moroder, N. Lütkenhaus, Phys. Rev. Lett. 101, 093601 (2008).
3. M. Ben-Or, M. Horodecki, D. W. Leung, D. Mayers, J. Oppenheim, "The universal composable security of quantum key distribution," TCC 2005, LNCS 3378, pp. 386–406.
4. S. L. Braunstein, S. Pirandola, Phys. Rev. Lett. 108, 130502 (2012).
5. Burniston et al., OpenQKDsecurity reference implementation, v2.0.2 (2024), github.com/Optical-Quantum-Communication-Theory/openQKDsecurity.
6. M. Christandl, R. König, R. Renner, Phys. Rev. Lett. 102, 020504 (2009).
7. C. J. Clopper, E. S. Pearson, "The use of confidence or fiducial limits illustrated in the case of the binomial," Biometrika 26(4), 404–413 (1934), DOI 10.1093/biomet/26.4.404.
8. P. Coles, E. Metodiev, N. Lütkenhaus, Nat. Commun. 7, 11712 (2016).
9. G. Currás-Lorenzo, S. Nahar, N. Lütkenhaus, K. Tamaki, M. Curty, "Security of quantum key distribution with imperfect phase randomisation," Quantum Sci. Technol. 9, 015025 (2023).
10. G. Currás-Lorenzo, M. Pereira, G. Kato, M. Curty, K. Tamaki, "Security framework for quantum key distribution with imperfect sources," Optica Quantum 3, 525 (2025); preprint arXiv:2305.05930. (DOI not asserted per the audit record.)
11. F. Dupuis, O. Fawzi, R. Renner, Commun. Math. Phys. 379, 867–913 (2020).
12. C.-H. F. Fung, K. Tamaki, B. Qi, H.-K. Lo, X. Ma, Quantum Inf. Comput. 9, 131–165 (2009), arXiv:0802.3788.
13. C.-H. F. Fung, X. Ma, H. F. Chau, "Practical issues in quantum-key-distribution postprocessing," Phys. Rev. A 81, 012318 (2010), DOI 10.1103/PhysRevA.81.012318.
14. R. George, J. Lin, N. Lütkenhaus, Phys. Rev. Research 3, 013274 (2021).
15. R. George et al., arXiv:2203.06554 (2022). PREPRINT.
16. O. Gittsovich et al., Phys. Rev. A 89, 012325 (2014).
17. D. Gottesman, H.-K. Lo, N. Lütkenhaus, J. Preskill, "Security of quantum key distribution with imperfect devices," Quantum Inf. Comput. 4(5), 325–360 (2004), arXiv:quant-ph/0212066.
18. F. Grasselli et al., Phys. Rev. Applied 23, 044011 (2025).
19. W. Hoeffding, "Probability inequalities for sums of bounded random variables," J. Amer. Statist. Assoc. 58(301), 13–30 (1963), DOI 10.1080/01621459.1963.10500830.
20. T. Islam et al., "Finite-resource performance of small-satellite-based quantum-key-distribution missions," PRX Quantum 5, 030101 (2024), DOI 10.1103/PRXQuantum.5.030101.
21. Ivchenko et al., "Security of QKD with passive basis choice and detection-efficiency mismatch for a realistic satellite setup," arXiv:2608.09793 (2026). PREPRINT.
22. L. Kamin, A. Arqand, R. George, N. Lütkenhaus, E. Y.-Z. Tan, arXiv:2406.10198 (2024). PREPRINT.
23. G. Kato, "Concentration inequality using unconfirmed knowledge," arXiv:2002.04357 (2020). PREPRINT.
24. A. Lenart, T. Islam, S. Sivasankaran, P. Neilson, B. Hidding, D. K. L. Oi, A. Ling, "Comparing a radiation damage model for avalanche photodiodes through in-situ observation of CubeSat based devices," Commun. Phys. 8, 118 (2025). (Verified via secondary source; existence evidence only.)
25. S.-K. Liao et al., "Satellite-to-ground quantum key distribution," Nature 549, 43–47 (2017), DOI 10.1038/nature23655.
26. C. C. W. Lim, M. Curty, N. Walenta, F. Xu, H. Zbinden, "Concise security bounds for practical decoy-state quantum key distribution," Phys. Rev. A 89, 022307 (2014), DOI 10.1103/PhysRevA.89.022307, arXiv:1311.7129.
27. H.-K. Lo, M. Curty, B. Qi, "Measurement-device-independent quantum key distribution," Phys. Rev. Lett. 108, 130503 (2012).
28. H.-K. Lo, X. Ma, K. Chen, "Decoy State Quantum Key Distribution," Phys. Rev. Lett. 94, 230504 (2005), DOI 10.1103/PhysRevLett.94.230504.
29. H.-K. Lo, J. Preskill, Quantum Inf. Comput. 7, 431 (2007). (Verified via secondary source.)
30. M. Lucamarini, I. Choi, M. B. Ward, J. F. Dynes, Z. L. Yuan, A. J. Shields, "Practical security bounds against the Trojan-horse attack in quantum key distribution," Phys. Rev. X 5, 031030 (2015), DOI 10.1103/PhysRevX.5.031030.
31. L. Lydersen, C. Wiechers, C. Wittmann, D. Elser, J. Skaar, V. Makarov, "Hacking commercial quantum cryptography systems by tailored bright illumination," Nature Photonics 4, 686–689 (2010), DOI 10.1038/nphoton.2010.214.
32. X. Ma, B. Qi, Y. Zhao, H.-K. Lo, "Practical decoy state for quantum key distribution," Phys. Rev. A 72, 012326 (2005), DOI 10.1103/PhysRevA.72.012326.
33. V. Makarov, A. Anisimov, J. Skaar, Phys. Rev. A 74, 022313 (2006); Erratum Phys. Rev. A 78, 019905 (2008).
34. S. Mannalath, V. Zapatero, M. Curty, Phys. Rev. Lett. 135, 020803 (2025).
35. M. Marcomini, A. Mizutani, F. Grünenfelder, M. Curty, K. Tamaki, Quantum Sci. Technol. 10, 035002 (2025).
36. T. Metger, R. Renner, Nat. Commun. 14, 5272 (2023).
37. A. Mizutani, M. Curty, C. C. W. Lim, N. Imoto, K. Tamaki, "Finite-key security analysis of quantum key distribution with imperfect light sources," New J. Phys. 17, 093011 (2015).
38. J. Müller-Quade, R. Renner, "Composability in quantum cryptography," New J. Phys. 11, 085006 (2009), DOI 10.1088/1367-2630/11/8/085006.
39. S. Nahar, D. Tupkary, N. Lütkenhaus, "Imperfect detectors for adversarial tasks with applications to quantum key distribution," Quantum 10, 2044 (2026), DOI 10.22331/q-2026-03-24-2044.
40. S. Nahar, D. Tupkary, Y. Zhao, N. Lütkenhaus, E. Y.-Z. Tan, PRX Quantum 5, 040315 (2024).
41. S. Nahar, T. Upadhyaya, N. Lütkenhaus, "Imperfect phase randomization and generalized decoy-state quantum key distribution," Phys. Rev. Applied 20, 064031 (2023), DOI 10.1103/PhysRevApplied.20.064031, arXiv:2304.09401.
42. S. Nahar, N. Lütkenhaus, "Imperfect detectors for adversarial tasks with applications to QKD," arXiv:2503.06328 (2025). PREPRINT.
43. M. Pereira, G. Currás-Lorenzo, Á. Navarrete, A. Mizutani, G. Kato, M. Curty, K. Tamaki, "Modified BB84 quantum key distribution protocol robust to source imperfections," Phys. Rev. Research 5, 023065 (2023).
44. M. Pereira, G. Currás-Lorenzo, A. Mizutani, D. Rusca, M. Curty, K. Tamaki, "Quantum key distribution with unbounded pulse correlations," Quantum Sci. Technol. 10, 015001 (2025), arXiv:2402.08028.
45. C. Portmann, R. Renner, "Security in quantum cryptography," Rev. Mod. Phys. 94, 025008 (2022), DOI 10.1103/RevModPhys.94.025008, arXiv:2102.00021.
46. B. Qi et al., Quantum Inf. Comput. 7, 73 (2007).
47. R. Renner, "Security of Quantum Key Distribution," PhD thesis, ETH Zürich, Diss. ETH No. 16242 (2005), arXiv:quant-ph/0512258, DOI 10.3929/ethz-a-005115027.
48. R. J. Serfling, "Probability inequalities for the sum in sampling without replacement," Ann. Statist. 2(1), 39–48 (1974), DOI 10.1214/aos/1176342611.
49. J. S. Sidhu, T. Brougham, D. McArthur, R. G. Pousa, D. K. L. Oi, "Finite key effects in satellite quantum key distribution," npj Quantum Information 8, 18 (2022), DOI 10.1038/s41534-022-00525-3.
50. X. Sixto, G. Currás-Lorenzo, K. Tamaki, M. Curty, "Secret key rate bounds for quantum key distribution with faulty active phase randomization," EPJ Quantum Technol. 10, 53 (2023), DOI 10.1140/epjqt/s40507-023-00210-0.
51. X. Sixto, V. Zapatero, M. Curty, "Security of decoy-state quantum key distribution with correlated intensity fluctuations," Phys. Rev. Applied 18, 044069 (2022).
52. K. Tamaki, M. Curty, M. Lucamarini, "Decoy-state quantum key distribution with a leaky source," New J. Phys. 18, 065008 (2016). (DOI not asserted per the audit record.)
53. K. Tamaki, M. Curty, G. Kato, H.-K. Lo, K. Azuma, "Loss-tolerant quantum cryptography with imperfect sources," Phys. Rev. A 90, 052314 (2014), DOI 10.1103/PhysRevA.90.052314.
54. E. Y.-Z. Tan, S. Nahar, "Incorporating Device Characterization into Security Proofs," PRX Quantum 7, 020342 (2026), DOI 10.1103/f42p-524t, arXiv:2508.15383.
55. M. Tomamichel, A. Leverrier, "A largely self-contained and complete security proof for quantum key distribution," Quantum 1, 14 (2017), DOI 10.22331/q-2017-07-14-14.
56. M. Tomamichel, C. C. W. Lim, N. Gisin, R. Renner, "Tight finite-key analysis for quantum cryptography," Nat. Commun. 3, 634 (2012), DOI 10.1038/ncomms1631.
57. R. Trényi, M. Curty, "Zero-error attack against coherent-one-way quantum key distribution," New J. Phys. 23, 093005 (2021), DOI 10.1088/1367-2630/ac1e41. (Retained solely to document a corrected misattribution; not a pulse-correlation reference.)
58. A. Trushechkin, Quantum 6, 771 (2022).
59. D. Tupkary, E. Y.-Z. Tan, S. Nahar, L. Kamin, N. Lütkenhaus, "QKD security proofs for decoy-state BB84: protocol variations, proof techniques, gaps and limitations," arXiv:2502.10340 (2025a). PREPRINT.
60. D. Tupkary, S. Nahar, P. Sinha, N. Lütkenhaus, "Phase error rate estimation in QKD with imperfect detectors," Quantum 9, 1937 (2025b), DOI 10.22331/q-2025-12-11-1937, arXiv:2408.17349.
61. D. Tupkary, E. Y.-Z. Tan, N. Lütkenhaus, "Security proof for variable-length quantum key distribution," Phys. Rev. Research 6, 023002 (2024), DOI 10.1103/PhysRevResearch.6.023002.
62. D. Tupkary, S. Nahar, A. Arqand, E. Y.-Z. Tan, N. Lütkenhaus, "A rigorous and complete security proof of decoy-state BB84 quantum key distribution," arXiv:2601.18035 (2026a). PREPRINT (under review).
63. D. Tupkary, S. Nahar, E. Y.-Z. Tan, "Authentication in Security Proofs for Quantum Key Distribution," arXiv:2601.17960 (2026b). PREPRINT.
64. T. Upadhyaya et al., PRX Quantum 2, 020325 (2021).
65. X. Wang, K. Tamaki, M. Curty, "Finite-key security analysis for quantum key distribution with leaky sources," New J. Phys. 20, 083027 (2018), DOI 10.1088/1367-2630/aad839.
66. Z. Wang, D. Tupkary, S. Nahar, "Phase error estimation for passive detection setups with imperfections and memory effects," arXiv:2508.21486 (2025). PREPRINT.
67. M. N. Wegman, J. L. Carter, "New hash functions and their use in authentication and set equality," J. Comput. Syst. Sci. 22, 265–279 (1981).
68. H. Weier et al., "Quantum eavesdropping without interception: an attack exploiting the dead time of single-photon detectors," New J. Phys. 13, 073024 (2011).
69. C. Wiechers, L. Lydersen, C. Wittmann, D. Elser, J. Skaar, C. Marquardt, V. Makarov, G. Leuchs, "After-gate attack on a quantum cryptosystem," New J. Phys. 13, 013043 (2011), DOI 10.1088/1367-2630/13/1/013043.
70. Wiesemann, Krause, Tupkary, Rusca, Walenta, Lütkenhaus, "A consolidated and accessible security proof for finite-size decoy-state quantum key distribution," Quantum 10, 2037 (2026), DOI 10.22331/q-2026-03-23-2037, arXiv:2405.16578.
71. A. Winick, N. Lütkenhaus, P. Coles, Quantum 2, 77 (2018).
72. F. Xu, K. Wei, S. Sajeed, S. Kaiser, S. Sun, Z. Tang, L. Qian, V. Makarov, H.-K. Lo, "Experimental quantum key distribution with source flaws," Phys. Rev. A 92, 032305 (2015), DOI 10.1103/PhysRevA.92.032305.
73. K. Yoshino, M. Fujiwara, K. Nakata, T. Sumiya, T. Sasaki, M. Takeoka, M. Sasaki, A. Tajima, M. Koashi, A. Tomita, "Quantum key distribution with an efficient countermeasure against correlated intensity fluctuations in optical pulses," npj Quantum Information 4, 8 (2018), DOI 10.1038/s41534-017-0057-8.
74. V. Zapatero, Á. Navarrete, K. Tamaki, M. Curty, "Security of quantum key distribution with intensity correlations," Quantum 5, 602 (2021), DOI 10.22331/q-2021-12-07-602.
75. Y. Zhang et al., Phys. Rev. A 95, 012333 (2017).
76. Z. Zhang, P. Coles, A. Winick, J. Lin, N. Lütkenhaus, Phys. Rev. Research 3, 013076 (2021).
77. Y. Zhao et al., Phys. Rev. A 78, 042333 (2008).

***

## 20. Appendix — Claim Ledger

This appendix condenses the manuscript's major claims with their controlled labels (the full machine-readable ledger is maintained separately; see Q-Orbit_Manuscript_Claim_Ledger.md). Labels: NUMERICALLY-VERIFIED (traceable to the hash-verified/recomputed artifact record); THEORETICALLY-SUPPORTED (derivation or specification internal to the package); LITERATURE-SUPPORTED (verified literature record; never device evidence); ASSUMPTION-DEPENDENT (conditional on unverified model assumptions); CHARACTERIZATION-REQUIRED; PHYSICAL-VALIDATION-REQUIRED; BLOCKED.

Table A1: Condensed claim ledger.

| # | Claim (condensed) | Label |
|---|---|---|
| C1 | Baseline half-window 102 s; 205 bins; edge elevation 30.4813547009598° | NUMERICALLY-VERIFIED |
| C2 | Signed margin $M = 41{,}338.62418456675$ bits; margin identity bit-exact | NUMERICALLY-VERIFIED |
| C3 | Floored candidate key $41{,}338$ bits; floor convention on all 1,681 rows | NUMERICALLY-VERIFIED |
| C4 | QBER$_X = 0.017422686665352745$; $\phi_X = 0.09270161340569935$; block sizes as Table 3 | NUMERICALLY-VERIFIED |
| C5 | The 41,338-bit figure is a theoretical fixture margin output, not a released key | NUMERICALLY-VERIFIED (status) + boundary rule |
| C6 | Penalty $256.5669430839006$ bits; pair $(10^{-10},10^{-9})$ reproduces it non-uniquely | NUMERICALLY-VERIFIED (pair) |
| C7 | Individual $\epsilon_s$, $\epsilon_c$ values | BLOCKED (EV-9, pending REQ-01) |
| C8 | $\lambda_{EC}$ instantiates $f_{EC}=1$; all margins are upper bounds w.r.t. error-correction efficiency | THEORETICALLY-SUPPORTED (construction) |
| C9 | $f_{EC}\approx1.16$ as literature context | LITERATURE-SUPPORTED (context only) |
| C10 | Screen partition 568/1,113/1,681; fraction 0.33789411064842356 | NUMERICALLY-VERIFIED |
| C11 | Median $-2{,}624.946810258186$; minimum $-3{,}828.414517626367$; maximum $+142{,}540.7481180454$ bits | NUMERICALLY-VERIFIED |
| C12 | Earlier positive-signed median/minimum rendering was erroneous; corrected here | NUMERICALLY-VERIFIED (C-01…C-03) |
| C13 | Screen statistics are upper-envelope deterministic quantities, not probabilities | THEORETICALLY-SUPPORTED |
| C14 | Sensitivity ranking (loss $>$ detector efficiency $>$ repetition rate $>$ …) | NUMERICALLY-VERIFIED |
| C15 | Frontier structure 16 rows / 10 crossings; three cross-checked values | NUMERICALLY-VERIFIED |
| C16 | Regression 12/12 PASS; audit 20/20 PASS; 9/10 artifacts content-hash-verified | NUMERICALLY-VERIFIED |
| C17 | V0.13 independent comparison: 50 vectors / 971 metrics, zero discrepancies | NUMERICALLY-VERIFIED (single-artifact class for the record) |
| C18 | Red-team closure: 25/25 findings dispositioned and verified | NUMERICALLY-VERIFIED (record) |
| C19 | Margin equation is the Lim 2014 structure in the Sidhu 2022 satellite family; 21-decomposition exact | LITERATURE-SUPPORTED + NUMERICALLY-VERIFIED |
| C20 | Neither Sidhu 2022 nor Lim 2014 covers imperfect phase randomization or source flaws alone | LITERATURE-SUPPORTED |
| C21 | Fixture assumptions A1–A6 (Table 2) hold only as assumptions | ASSUMPTION-DEPENDENT |
| C22 | 15-effect mapping partition: 5 UPR, 2 BLOCKING, 2 USB, 3 PPC, 3 UCR | THEORETICALLY-SUPPORTED (D5 condensation) |
| C23 | Candidate proof treatments exist for rows 1–4, 8, 10, 12 | LITERATURE-SUPPORTED |
| C24 | Rows 5 and 7 blocking pending measured isolation / certified flux bounds | CHARACTERIZATION-REQUIRED / BLOCKED |
| C25 | Detector-side correlated afterpulsing and rate-dependent yields are open proof problems | LITERATURE-SUPPORTED (gap finding) |
| C26 | Layer 0–3 proof-profile architecture is a specification only | THEORETICALLY-SUPPORTED (specification) |
| C27 | Layer 2 anchor is a preprint; imperfection coverage rests on Optica Quantum 3, 525 | LITERATURE-SUPPORTED |
| C28 | MDI-QKD architecturally excluded from the direct-downlink concept | THEORETICALLY-SUPPORTED |
| C29 | SDP numerics positioned as cross-check, not shipping proof | THEORETICALLY-SUPPORTED |
| C30 | $\epsilon_{char}\equiv\sum_j\delta_j$ (defined once); $\epsilon_{auth}$ symbolic only | THEORETICALLY-SUPPORTED |
| C31 | Any composed security claim requires the joint bound, Eq. (6); conditional-on-approval claims prohibited | LITERATURE-SUPPORTED |
| C32 | End-to-end re-execution of the model | BLOCKED (REQ-01…03) |
| C33 | Byte-level hash closure on artifact 01 and original bundle bytes | BLOCKED (REQ-04) |
| C34 | Row-level register verification | BLOCKED (REQ-05) |
| C35 | Any physical, device-security, mission, availability, procurement, readiness, or released-key claim | PHYSICAL-VALIDATION-REQUIRED / BLOCKED |

*End of manuscript (V1.0-RC2).*
