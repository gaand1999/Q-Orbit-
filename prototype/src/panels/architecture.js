import { el, provTag, provRow, panel, dataUnavailable, badge } from "../ui.js";

const LAYERS = [
  {
    num: "L0", name: "Frozen V0.16 fixture",
    desc: "Locked reference loss curve, finite-key algebra and controlled inputs. Basis of every number in this console. Status: FROZEN / PASS-THEORETICAL.",
    cls: "frozen", badge: ["FROZEN", "info"], gates: ["TA-G01", "TA-G02"],
  },
  {
    num: "L1", name: "Hardened analytic finite-key — Profile A — V0.17",
    desc: "Analytic finite-key hardening within the same theoretical scope. Regression-backed software-fixture propagation only; no device evidence.",
    cls: "frozen", badge: ["THEORETICAL", "info"], gates: ["TA-G03", "TA-G04"],
  },
  {
    num: "L2", name: "Implementation-security proof extensions — Profile B — V0.18+",
    desc: "Proofs covering unmapped device imperfections (phase randomization, correlations, state-preparation flaws, mismatch). Gate TA-G05 is BLOCKED — no implementation-security claim.",
    cls: "blocked", badge: ["BLOCKED", "blocked"], gates: ["TA-G05"],
  },
  {
    num: "L3", name: "Characterization & certification composition",
    desc: "Simultaneous confidence coverage composed with the security statement. Gates TA-G06/TA-G07 BLOCKED / NOT-EXECUTED — shown SYMBOLIC only; no characterization data exists.",
    cls: "symbolic", badge: ["BLOCKED / SYMBOLIC", "warn"], gates: ["TA-G06", "TA-G07"],
  },
];

export function render(ctx) {
  const { data, errors } = ctx;
  const root = el("div");
  const gates = data.gates ? new Map(data.gates.map((g) => [g.gate_id, g])) : null;

  root.append(panel("Layered security architecture",
    "Composition view. Each layer inherits the claim boundary of the layers below it; characterization-dependent layers are BLOCKED or SYMBOLIC.",
    LAYERS.map((L) => el("div", { class: `layer ${L.cls}` },
      el("div", { class: "l-num", text: L.num }),
      el("div", {},
        el("div", { class: "l-name", text: L.name }),
        el("div", { class: "l-desc", text: L.desc }),
        gates ? el("div", { style: { marginTop: "8px", display: "flex", gap: "6px", flexWrap: "wrap" } },
          L.gates.map((gid) => {
            const g = gates.get(gid);
            if (!g) return badge(`${gid} — MISSING`, "blocked");
            const kind = g.current_state.startsWith("PASS") ? "pass"
              : g.current_state.startsWith("BLOCK") || g.current_state.includes("QUARANTINED") ? "blocked" : "warn";
            return badge(`${gid}: ${g.current_state}`, kind);
          })) : null),
      el("div", { class: "l-badge" }, badge(L.badge[0], L.badge[1])),
    )),
    gates ? null : dataUnavailable("gate register", errors.gates),
    el("div", { class: "caption", text:
      "Layers 2–3 are blocked by controlled gates: proof-to-device completeness (TA-G05) and characterization confidence (TA-G06/G07) are not established. No implementation-security or certification claim is made." }),
    provRow(provTag("csv", "controlled CSV — gate_register.csv"), provTag("json", "controlled JSON — run_summary.json")),
  ));

  return root;
}
