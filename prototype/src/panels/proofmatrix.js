import { el, provTag, provRow, panel, dataUnavailable, badge } from "../ui.js";

// Display grouping for controlled mapping states. Labels are the verbatim
// CSV states — unmapped effects never receive an invented scalar penalty.
function stateBadge(state) {
  if (state.startsWith("UNMAPPED")) return badge(state, "blocked");
  if (state.startsWith("PARTIAL")) return badge(state, "warn");
  if (state.startsWith("MAPPED")) return badge(state, "info");
  if (state.startsWith("ALTERNATIVE")) return badge(state, "violet");
  return badge(state, "neutral");
}

// The 15 device-imperfection effects mapped onto the 16 controlled CSV rows.
// "rows" lists the controlling MAP-IDs; where no dedicated row exists that is
// stated explicitly instead of inventing coverage.
const EFFECT_COVERAGE = [
  ["Incomplete phase randomization", ["MAP-006"]],
  ["Pulse-to-pulse correlations", ["MAP-007"]],
  ["Intensity correlations", ["MAP-007"]],
  ["State-preparation flaws", ["MAP-008"]],
  ["Source leakage / distinguishability", ["MAP-008"]],
  ["Dead time / recovery", ["MAP-012"]],
  ["Saturation", ["MAP-012"]],
  ["Detector timing jitter", ["MAP-012"]],
  ["History-dependent afterpulsing", ["MAP-010"], "scalar afterpulse only; history dependence omitted"],
  ["Detection-efficiency mismatch", ["MAP-013"]],
  ["Wavelength-dependent response", ["MAP-013"], "no dedicated controlled row — nearest: channel/polarization mismatch family"],
  ["Polarization-dependent response", ["MAP-013"]],
  ["Detector memory", ["MAP-012", "MAP-015"], "event-history (MAP-012) + cross-instance memory (MAP-015)"],
  ["Characterization uncertainty", ["MAP-014"]],
  ["Aging / cross-instance drift", ["MAP-015"]],
];

export function render(ctx) {
  const { data, errors } = ctx;
  const root = el("div");

  if (!data.proofMap) {
    root.append(panel("Proof-to-device matrix", "", dataUnavailable("imperfection-to-proof mapping CSV", errors.proofMap)));
    return root;
  }
  const rows = data.proofMap;
  const byId = new Map(rows.map((r) => [r.mapping_id, r]));

  root.append(panel("Proof-to-device matrix — 16 controlled mapping rows",
    "Verbatim controlled mapping states. Gate TA-G04 invariant: unmapped effects receive no invented numerical penalty.",
    el("table", { class: "data" },
      el("thead", {}, el("tr", {},
        el("th", { text: "ID" }), el("th", { text: "Imperfection / parameter" }),
        el("th", { text: "Mapping state" }), el("th", { text: "Penalty applied" }),
        el("th", { text: "Proof dependency" }), el("th", { text: "Claim effect" }))),
      el("tbody", {}, rows.map((r) => el("tr", {},
        el("td", { class: "mono", text: r.mapping_id }),
        el("td", { text: r.imperfection_or_parameter }),
        el("td", {}, stateBadge(r.current_mapping_state)),
        el("td", {}, badge(r.numeric_penalty_applied, r.numeric_penalty_applied === "NO-SUBSTITUTION" ? "warn" : "neutral")),
        el("td", { text: r.security_proof_dependency }),
        el("td", { text: r.claim_effect }),
      )))),
    provRow(provTag("csv", "controlled CSV — imperfection_to_proof_mapping.csv (16 rows)")),
  ));

  root.append(panel("15-effect coverage checklist",
    "The 15 named device-imperfection effects, each resolved to its controlling MAP row(s). No unmapped effect is converted into a fake scalar penalty.",
    el("div", {}, EFFECT_COVERAGE.map(([name, ids, note]) => {
      const maps = ids.map((id) => byId.get(id)).filter(Boolean);
      return el("div", { class: "check-row" },
        el("div", { class: "c-status" }, maps.length ? maps.map((m) => stateBadge(m.current_mapping_state)) : badge("NO CONTROLLED ROW", "blocked")),
        el("div", {},
          el("span", { class: "c-name", text: name }),
          el("span", { class: "c-map", text: ids.join(" · ") }),
          note ? el("div", { class: "c-detail", text: note }) : null,
          maps.length ? el("div", { class: "c-detail", text: maps.map((m) => m.required_next_theoretical_action).join(" | ") }) : null));
    })),
    el("div", { class: "caption", text:
      "UNMAPPED-* and PARTIAL states block implementation-security claims. They are proof/characterization obligations, not numerical penalties." }),
    provRow(provTag("csv", "controlled CSV — imperfection_to_proof_mapping.csv")),
  ));

  return root;
}
