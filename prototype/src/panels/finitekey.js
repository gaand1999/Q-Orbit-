import { CANONICAL, CANONICAL_NUMERIC as N, h2 } from "../canonical.js";
import { el, provTag, provRow, panel, fmt } from "../ui.js";

export function render() {
  const root = el("div");

  const h2phi = h2(N.phaseErrorX);
  const entropyTerm = N.sX1 * (1 - h2phi);
  const M = N.sX0 + entropyTerm - N.lambdaEC_bits - N.finitePenalty_bits;

  root.append(panel("Finite-key margin equation",
    "Frozen efficient-BB84 weak-coherent-pulse two-decoy finite-key margin (Sidhu et al. 2022 profile), evaluated on the frozen V0.16 fixture.",
    el("div", { class: "equation", html:
      `<span class="sym">M</span> <span class="op">=</span> <span class="sym">s<sub>X,0</sub></span> <span class="op">+</span> <span class="sym">s<sub>X,1</sub></span><span class="op">[</span>1 <span class="op">−</span> <span class="sym">h<sub>2</sub></span>(<span class="sym">φ<sub>X</sub></span>)<span class="op">]</span> <span class="op">−</span> <span class="sym">λ<sub>EC</sub></span><br>` +
      `<span style="visibility:hidden">M</span> <span class="op">−</span> 6·<span class="sym">log<sub>2</sub></span>(21/<span class="sym">ε<sub>s</sub></span>) <span class="op">−</span> <span class="sym">log<sub>2</sub></span>(2/<span class="sym">ε<sub>c</sub></span>)`,
    }),
    el("div", { class: "eq-terms" },
      term("s_X,0 — vacuum lower bound", fmt(CANONICAL.sX0), "counts"),
      term("s_X,1 — single-photon lower bound", fmt(CANONICAL.sX1), "counts"),
      term("φ_X — phase-error bound", CANONICAL.phaseErrorX, "upper bound"),
      term("h2(φ_X) — binary entropy", h2phi.toFixed(12), "bits (derived arithmetic)"),
      term("s_X,1 · [1 − h2(φ_X)]", entropyTerm.toFixed(6), "bits (derived arithmetic)"),
      term("λ_EC — error-correction leakage", fmt(CANONICAL.lambdaEC_bits), "bits"),
      term("6·log2(21/ε_s) + log2(2/ε_c)", fmt(CANONICAL.finitePenalty_bits), "bits — finite-key penalty"),
      term("M — signed margin", fmt(CANONICAL.signedMargin_bits), "bits — canonical"),
    ),
    el("p", { class: "footnote", text:
      `Consistency check (derived arithmetic on canonical inputs): ${M.toFixed(6)} bits ≈ canonical signed margin ${fmt(CANONICAL.signedMargin_bits)} bits. Term values shown are arithmetic evaluations of locked canonical inputs, not new measurements.` }),
    provRow(provTag("json", "controlled JSON — run_summary.json"), provTag("canonical", "canonical facts (locked)")),
  ));

  root.append(panel("Candidate key derivation",
    "The candidate key is a floored, clamped arithmetic result of the theoretical margin. It is not a real, released, or cryptographically usable secret key.",
    el("div", { class: "flow" },
      el("div", { class: "fstep" },
        el("span", { class: "fs-label", text: "SIGNED MARGIN" }),
        `M = ${fmt(CANONICAL.signedMargin_bits)} bits`),
      el("span", { class: "farrow", text: "→" }),
      el("div", { class: "fstep" },
        el("span", { class: "fs-label", text: "CLAMP AT ZERO" }),
        `max(M, 0) = ${fmt(CANONICAL.signedMargin_bits)}`),
      el("span", { class: "farrow", text: "→" }),
      el("div", { class: "fstep" },
        el("span", { class: "fs-label", text: "FLOOR" }),
        `candidate_key = ${fmt(CANONICAL.candidateKey_bits)} bits`),
      el("span", { class: "farrow", text: "→" }),
      el("div", { class: "fstep", style: { borderColor: "#5c2430" } },
        el("span", { class: "fs-label", text: "RELEASE STATE" }),
        el("span", { style: { color: "var(--red)" }, text: "QUARANTINED / ZERO RELEASED" })),
    ),
    el("div", { class: "caption", text:
      "candidate_key = floor(max(M, 0)) — a theoretical arithmetic candidate only. No key material exists, has been generated, or may be treated as available." }),
    provRow(provTag("canonical", "canonical facts (locked)")),
  ));

  return root;
}

function term(label, value, note) {
  return el("div", { class: "eq-term" },
    el("div", { class: "t-label", text: label }),
    el("div", { class: "t-value", text: String(value) }),
    el("div", { class: "t-note", text: note }),
  );
}
