import { CANONICAL } from "../canonical.js";
import { el, provTag, provRow, panel, dataUnavailable } from "../ui.js";

export function render() {
  const root = el("div");
  const min = CANONICAL.windowSearchMin_s, max = CANONICAL.windowSearchMax_s;
  const opt = Number(CANONICAL.halfWindow_s);

  const track = el("div", { class: "win-track" });
  // Tick marks every 20 s (major) — integer search domain 1..221 s
  for (let t = 0; t <= max; t += 20) {
    const x = ((t - min) / (max - min)) * 100;
    track.append(el("div", { class: `win-tick${t % 100 === 0 ? " major" : ""}`, style: { left: `${x}%` } }));
  }
  const optX = ((opt - min) / (max - min)) * 100;
  track.append(el("div", { class: "win-marker", style: { left: `${optX}%` } },
    el("div", { class: "win-marker-label", text: `OPTIMUM 102 s` })));

  const axis = el("div", { class: "win-axis" });
  for (const t of [1, 50, 100, 102, 150, 200, 221]) {
    axis.append(el("span", { style: { left: `${((t - min) / (max - min)) * 100}%` }, text: `${t} s` }));
  }

  root.append(panel("Integer half-window search",
    `The frozen model re-optimizes the integer half-window over ${min}–${max} seconds. The canonical optimum for the baseline fixture is 102 s.`,
    el("div", { class: "grid-cards" },
      el("div", { class: "stat-card accent" },
        el("div", { class: "label", text: "Canonical optimum" }),
        el("div", { class: "value", text: "102" }, el("span", { class: "unit", text: "s half-window" })),
        el("div", { class: "note", text: "205 sample bins; edge elevation 30.4813547009598°" })),
      el("div", { class: "stat-card" },
        el("div", { class: "label", text: "Search domain" }),
        el("div", { class: "value", text: "1 – 221" }, el("span", { class: "unit", text: "s (integer)" })),
        el("div", { class: "note", text: "Per-point re-optimization across the grid" })),
    ),
    el("div", { style: { marginTop: "34px" } }, track, axis),
    provRow(provTag("json", "controlled JSON — run_summary.json"), provTag("canonical", "canonical facts (locked)")),
  ));

  root.append(panel("Margin-vs-window curve",
    "The full signed-margin curve over the 1–221 s window search is not present in the controlled inputs available to this console.",
    dataUnavailable("full margin-vs-window curve",
      "No per-window margin series exists in the controlled V0.16-TA1 data products in this workspace. Per the fail-closed rule, the curve is not fabricated or interpolated; only the verified optimum at 102 s is shown above."),
    provRow(provTag("unavailable", "unavailable — no controlled per-window series")),
  ));

  return root;
}
