import { CANONICAL } from "../canonical.js";
import { el, provTag, provRow, panel, dataUnavailable, fmt, badge } from "../ui.js";

export function render(ctx) {
  const { data, errors } = ctx;
  const root = el("div");

  if (!data.sensitivity) {
    root.append(panel("Local sensitivity explorer", "", dataUnavailable("local sensitivity CSV", errors.sensitivity)));
    return root;
  }

  const rows = [...data.sensitivity].sort((a, b) => Number(a.absolute_response_rank) - Number(b.absolute_response_rank));
  if (rows.length !== 8) {
    root.append(panel("Local sensitivity explorer", "",
      dataUnavailable("parameter count", `Expected 8 controlled parameters; parsed ${rows.length}. Failing closed.`)));
    return root;
  }

  const maxAbs = Math.max(...rows.map((r) => Math.abs(Number(r.central_margin_change_bits_per_declared_step))));

  root.append(panel("Local sensitivity explorer — 8 controlled parameters",
    "One-at-a-time declared-step responses around the frozen baseline (rank = absolute response rank in the controlled CSV). Diverging bar = central margin change per declared step.",
    el("div", {}, rows.map((r) => {
      const v = Number(r.central_margin_change_bits_per_declared_step);
      const w = (Math.abs(v) / maxAbs) * 50; // half-track percentage
      const left = v >= 0 ? 50 : 50 - w;
      return el("div", { class: "bar-row" },
        el("div", { class: "b-name" },
          el("span", { class: "b-rank", text: `#${r.absolute_response_rank}` }),
          r.parameter,
          el("span", { class: "b-step", text: `${r.step_definition} · baseline ${r.baseline_value} ${r.unit}` })),
        el("div", { class: "bar-track" },
          el("div", { class: "bar-zero", style: { left: "50%" } }),
          el("div", { class: "bar-fill", style: {
            left: `${left}%`, width: `${w}%`,
            background: v >= 0 ? "rgba(63,224,255,0.75)" : "rgba(255,93,108,0.75)",
          } })),
        el("div", { class: "bar-val", style: { color: v >= 0 ? "var(--cyan)" : "var(--red)" },
          text: `${v >= 0 ? "+" : ""}${fmt(v, 2)} b` }));
    })),
    el("div", { class: "caption", text: "Modeled fixture response; not a device tolerance or security-proof domain." }),
    provRow(provTag("csv", "controlled CSV — local_sensitivity.csv (8 rows)")),
  ));

  root.append(panel("Per-parameter response detail",
    "All values verbatim from the controlled CSV. Margin in bits; baseline signed margin 41,338.62418456675 bits.",
    el("table", { class: "data" },
      el("thead", {}, el("tr", {},
        el("th", { text: "Rank" }), el("th", { text: "Parameter" }), el("th", { text: "Step" }),
        el("th", { text: "Margin @ −step" }), el("th", { text: "Margin @ +step" }),
        el("th", { text: "Central change / step" }), el("th", { text: "Normalized" }), el("th", { text: "Window shift" }))),
      el("tbody", {}, rows.map((r) => el("tr", {},
        el("td", { class: "num", text: r.absolute_response_rank }),
        el("td", { class: "mono", text: r.parameter }),
        el("td", { text: r.step_definition }),
        el("td", { class: "num", text: fmt(r.minus_signed_margin_bits, 2) }),
        el("td", { class: "num", text: fmt(r.plus_signed_margin_bits, 2) }),
        el("td", { class: "num", text: fmt(r.central_margin_change_bits_per_declared_step, 4) }),
        el("td", { class: "num", text: fmt(r.normalized_response_per_declared_step, 6) }),
        el("td", { class: "num", text: `${r.minus_half_window_s} / ${r.plus_half_window_s} s` }),
      )))),
    el("p", { class: "footnote", text:
      "Claim class for every row: LOCAL-NUMERICAL-RESPONSE-NOT-PHYSICAL-SENSITIVITY. Step sizes differ across parameters; ranking is a local numerical response only." }),
    provRow(provTag("csv", "controlled CSV — local_sensitivity.csv")),
  ));

  return root;
}
