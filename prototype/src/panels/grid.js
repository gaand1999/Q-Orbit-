import { CANONICAL } from "../canonical.js";
import { el, provTag, provRow, panel, dataUnavailable, fmt } from "../ui.js";

const SVGNS = "http://www.w3.org/2000/svg";
function svgEl(tag, attrs = {}) {
  const n = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  return n;
}

// Diverging color: negative margins → red, positive → cyan; intensity ∝ log magnitude.
function marginColor(m, maxAbs) {
  const t = Math.min(1, Math.log10(1 + Math.abs(m)) / Math.log10(1 + maxAbs));
  const a = 0.25 + 0.75 * t;
  return m >= 0 ? `rgba(63,224,255,${a.toFixed(3)})` : `rgba(255,93,108,${a.toFixed(3)})`;
}

export function render(ctx) {
  const { data, errors } = ctx;
  const root = el("div");

  if (!data.screen) {
    root.append(panel("41 × 41 coupled screen", "", dataUnavailable("two-parameter screen CSV", errors.screen)));
    return root;
  }

  const rows = data.screen;
  const pecVals = [...new Set(rows.map((r) => r.extraneous_count_probability_per_pulse))].sort((a, b) => Number(a) - Number(b));
  const qberVals = [...new Set(rows.map((r) => r.intrinsic_qber_fraction))].sort((a, b) => Number(a) - Number(b));

  if (rows.length !== CANONICAL.gridPoints || pecVals.length !== CANONICAL.gridSide || qberVals.length !== CANONICAL.gridSide) {
    root.append(panel("41 × 41 coupled screen", "",
      dataUnavailable("grid integrity",
        `Expected ${CANONICAL.gridPoints} rows on a ${CANONICAL.gridSide}×${CANONICAL.gridSide} grid; parsed ${rows.length} rows (${pecVals.length}×${qberVals.length}). Failing closed.`)));
    return root;
  }

  const xIdx = new Map(pecVals.map((v, i) => [v, i]));
  const yIdx = new Map(qberVals.map((v, i) => [v, i]));
  const maxAbs = Math.max(Math.abs(Number(CANONICAL.gridMin_bits)), Math.abs(Number(CANONICAL.gridMax_bits)));

  const cell = 15, padL = 92, padB = 66, padT = 12, padR = 12;
  const W = padL + padR + cell * 41, H = padT + padB + cell * 41;
  const svg = svgEl("svg", { width: W, height: H, role: "img" });

  // Cells (y axis: intrinsic QBER increases upward → flip row index)
  for (const r of rows) {
    const cx = padL + xIdx.get(r.extraneous_count_probability_per_pulse) * cell;
    const cy = padT + (40 - yIdx.get(r.intrinsic_qber_fraction)) * cell;
    const m = Number(r.signed_key_margin_bits);
    const rect = svgEl("rect", {
      x: cx, y: cy, width: cell - 1, height: cell - 1, rx: 1.5,
      fill: marginColor(m, maxAbs),
    });
    rect.addEventListener("mousemove", (ev) => showTip(ev, r));
    rect.addEventListener("mouseleave", hideTip);
    svg.append(rect);
  }

  // Zero-margin boundary from the controlled grid-boundary CSV (grid resolution)
  if (data.gridBoundary) {
    const pts = [];
    for (const b of data.gridBoundary) {
      const xi = xIdx.get(b.extraneous_count_probability_per_pulse);
      const qmax = Number(b.highest_grid_intrinsic_qber_with_positive_margin);
      if (xi === undefined || !Number.isFinite(qmax)) continue;
      // boundary sits just above the highest still-positive qber cell
      const yi = yIdx.get(b.highest_grid_intrinsic_qber_with_positive_margin);
      if (yi === undefined) continue;
      pts.push([padL + xi * cell + cell / 2, padT + (40 - yi) * cell - 0.5]);
    }
    if (pts.length) {
      const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
      svg.append(svgEl("path", { d, fill: "none", stroke: "#ffb454", "stroke-width": 2, "stroke-dasharray": "5 3" }));
    }
  }

  // Axis labels
  const label = (x, y, text, anchor = "middle", rotate = null) => {
    const t = svgEl("text", { x, y, fill: "#5b6f8c", "font-size": 10, "font-family": "monospace", "text-anchor": anchor });
    if (rotate) t.setAttribute("transform", `rotate(${rotate} ${x} ${y})`);
    t.textContent = text;
    return t;
  };
  svg.append(label(padL + (cell * 41) / 2, H - 8, "extraneous-count probability per pulse →"));
  svg.append(label(14, padT + (cell * 41) / 2, "intrinsic QBER →", "middle", -90));
  for (let i = 0; i < 41; i += 10) {
    svg.append(label(padL + i * cell + cell / 2, H - padB + 16, Number(pecVals[i]).toExponential(1)));
    svg.append(label(padL - 6, padT + (40 - i) * cell + cell / 2 + 3, Number(qberVals[i]).toFixed(3), "end"));
  }
  svg.append(label(padL + 40 * cell + cell / 2, H - padB + 16, Number(pecVals[40]).toExponential(1)));
  svg.append(label(padL - 6, padT + cell / 2 + 3, Number(qberVals[40]).toFixed(3), "end"));

  const tip = el("div", { class: "heatmap-tip" });
  function showTip(ev, r) {
    tip.style.display = "block";
    tip.style.left = `${ev.clientX + 14}px`;
    tip.style.top = `${ev.clientY + 12}px`;
    tip.innerHTML =
      `${r.screen_id}<br>p_ec = ${r.extraneous_count_probability_per_pulse}<br>QBER_int = ${r.intrinsic_qber_fraction}<br>` +
      `margin = <b style="color:${Number(r.signed_key_margin_bits) >= 0 ? "#3fe0ff" : "#ff5d6c"}">${fmt(r.signed_key_margin_bits)} bits</b><br>` +
      `window = ${r.optimized_half_window_s} s · ${r.positive_state}`;
  }
  function hideTip() { tip.style.display = "none"; }

  root.append(panel("41 × 41 coupled screen — extraneous-count probability × intrinsic QBER",
    "Each cell is one deterministic model evaluation with per-point window re-optimization. Hover a cell for exact values.",
    el("div", { class: "grid-cards" },
      miniStat("Positive", fmt(CANONICAL.positiveCount), "pos"),
      miniStat("Nonpositive", fmt(CANONICAL.nonpositiveCount), "neg"),
      miniStat("Median margin", `${fmt(CANONICAL.gridMedian_bits)} bits`, "neg"),
      miniStat("Min margin", `${fmt(CANONICAL.gridMin_bits)} bits`, "neg"),
      miniStat("Max margin", `+${fmt(CANONICAL.gridMax_bits)} bits`, "pos"),
    ),
    el("div", { class: "heatmap-wrap" }, svg),
    el("div", { class: "legend" },
      el("span", { class: "sw", style: { background: "rgba(63,224,255,0.9)" } }), "positive margin",
      el("span", { class: "sw", style: { background: "rgba(255,93,108,0.9)" } }), "nonpositive margin",
      el("span", { style: { color: "#ffb454" }, text: "- - zero-margin boundary (grid resolution, from controlled boundary CSV)" }),
      el("span", { text: " · intensity ∝ log |margin|" })),
    el("div", { class: "caption", text:
      "Deterministic screen partition; not a probability distribution, reliability, or availability figure. Upper envelope under per-point window re-optimization." }),
    provRow(provTag("csv", "controlled CSV — two_parameter_screen.csv (1,681 rows)"), provTag("csv", "controlled CSV — grid_boundary.csv (41 rows)")),
  ));

  root.append(tip);
  return root;
}

function miniStat(label, value, cls) {
  return el("div", { class: `stat-card ${cls}` },
    el("div", { class: "label", text: label }),
    el("div", { class: "value small", text: value }));
}
