import { CANONICAL, verifyRunSummary, verifyAudit } from "../canonical.js";
import { el, provTag, provRow, dataUnavailable, panel, fmt, badge } from "../ui.js";

function stat(label, value, unit, cls = "", note = "") {
  return el("div", { class: `stat-card ${cls}` },
    el("div", { class: "label", text: label }),
    el("div", { class: `value${String(value).length > 14 ? " small" : ""}`, text: String(value) },
      unit ? el("span", { class: "unit", text: unit }) : null),
    note ? el("div", { class: "note", text: note }) : null,
  );
}

export function render(ctx) {
  const { data, errors } = ctx;
  const rs = data.runSummary, audit = data.finalAudit;
  const root = el("div");

  if (!rs) {
    root.append(dataUnavailable("run summary", errors.runSummary));
    return root;
  }

  // Canonical verification
  const checks = [...verifyRunSummary(rs), ...(audit ? verifyAudit(audit) : [])];
  const passed = checks.filter((c) => c.pass).length;
  const allPass = passed === checks.length;

  root.append(panel("Primary theoretical outputs",
    "Frozen V0.16-TA1 fixture values, cross-checked at load time against the locked canonical facts.",
    el("div", { class: "grid-cards" },
      stat("Signed finite-key margin", fmt(CANONICAL.signedMargin_bits), "bits", "accent",
        "Signed software-fixture margin — not a released key"),
      stat("Theoretical candidate key (floored)", fmt(CANONICAL.candidateKey_bits), "bits", "pos hero",
        "floor(max(M, 0)) — QUARANTINED, zero released"),
      stat("Optimized half-window", CANONICAL.halfWindow_s, "s", "hero accent",
        `Integer search ${CANONICAL.windowSearchMin_s}–${CANONICAL.windowSearchMax_s} s`),
      stat("X-basis QBER", CANONICAL.qberX, "", "", "Modeled fixture statistic"),
      stat("Phase-error bound", CANONICAL.phaseErrorX, "", "amber", "Upper bound φ_X"),
    ),
    provRow(provTag("json", "controlled JSON — run_summary.json"), provTag("canonical", "canonical facts (locked)")),
  ));

  root.append(panel("41 × 41 coupled screen — partition",
    "Deterministic screen partition. The positive fraction is a grid fraction — never a probability, reliability, availability, or success figure.",
    el("div", { class: "grid-cards" },
      stat("Grid points", "1,681", "", "", "41 × 41"),
      stat("Positive margin points", fmt(CANONICAL.positiveCount), "", "pos"),
      stat("Nonpositive margin points", fmt(CANONICAL.nonpositiveCount), "", "neg"),
      stat("Positive grid fraction", CANONICAL.positiveFraction, "", "amber", "GRID FRACTION — NOT A PROBABILITY"),
      stat("Grid median signed margin", fmt(CANONICAL.gridMedian_bits), "bits", "neg", "NEGATIVE — sign controlled"),
      stat("Grid minimum signed margin", fmt(CANONICAL.gridMin_bits), "bits", "neg", "NEGATIVE — sign controlled"),
      stat("Grid maximum signed margin", `+${fmt(CANONICAL.gridMax_bits)}`, "bits", "pos"),
    ),
    provRow(provTag("csv", "controlled CSV — two_parameter_screen.csv"), provTag("canonical", "canonical facts (locked)")),
  ));

  root.append(panel("Verification & audit status", "Machine-checked package facts only.",
    el("div", { class: "grid-cards" },
      stat("Regression tests", `${CANONICAL.regressionPass}/${CANONICAL.regressionTests} PASS`, "", "pos hero", "Software regression only"),
      stat("Independent package audit", `${CANONICAL.auditPass}/${CANONICAL.auditChecks} PASS`, "", "pos hero", "Serialization / numerical / provenance audit"),
      stat("Canonical cross-check (this console)", allPass ? `${passed}/${checks.length} PASS` : `${passed}/${checks.length} — MISMATCH`, "", allPass ? "pos" : "neg",
        "Run summary vs locked canonical facts, checked at load"),
      stat("Key release status", rs.key_release_status ?? "QUARANTINED/ZERO-RELEASED", "", "neg"),
      stat("Physical characterization", rs.physical_characterization ?? "NOT-EXECUTED", "", "neg"),
      stat("Tabuk run status", rs.tabuk_run_status ?? "NOT-RUN/NONE", "", "neg"),
    ),
    el("h3", { class: "sec", text: "Load-time canonical verification" }),
    el("table", { class: "data" },
      el("thead", {}, el("tr", {},
        el("th", { text: "Fact" }), el("th", { text: "Expected (canonical)" }),
        el("th", { text: "Observed (controlled JSON)" }), el("th", { text: "Result" }))),
      el("tbody", {}, checks.map((c) => el("tr", {},
        el("td", { text: c.label }),
        el("td", { class: "num", text: c.expected }),
        el("td", { class: "num", text: c.observed }),
        el("td", {}, badge(c.pass ? "MATCH" : "MISMATCH", c.pass ? "pass" : "fail")),
      )))),
    provRow(provTag("json", "controlled JSON — run_summary.json + final_audit.json"), provTag("regression", "regression fixture — regression_tests.csv")),
  ));

  return root;
}
