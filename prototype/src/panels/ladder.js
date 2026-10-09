import { el, provTag, provRow, panel, dataUnavailable, badge } from "../ui.js";

export function render(ctx) {
  const { data, errors } = ctx;
  const root = el("div");
  const rs = data.runSummary;

  if (!rs) {
    root.append(panel("Evidence ladder", "", dataUnavailable("run summary", errors.runSummary)));
    return root;
  }

  const rungs = [
    { name: "Numerical verification", state: "COMPLETE", kind: "pass", current: true,
      note: "12/12 regression tests PASS; independent package audit 20/20 PASS; canonical values reproduced." },
    { name: "Security theory", state: "PARTIAL", kind: "warn", current: false,
      note: "Frozen finite-key profile in place; 7 of 16 proof-mapping rows UNMAPPED — implementation-security proof extensions outstanding." },
    { name: "Device characterization", state: rs.physical_characterization ?? "NOT-EXECUTED", kind: "blocked", current: false,
      note: "No source or detector selected, characterized, calibrated, or tested. Evidence count zero." },
    { name: "Physical validation", state: rs.physical_validation ?? "NOT-EXECUTED", kind: "blocked", current: false,
      note: "No hardware, optical emission, laser, Tabuk, or hardware-in-loop run occurred." },
    { name: "Operational deployment", state: "BLOCKED", kind: "blocked", current: false,
      note: `Key release ${rs.key_release_status ?? "QUARANTINED/ZERO-RELEASED"}; external release ${rs.release_status ?? "PRIVATE-BLOCKED"}.` },
  ];

  root.append(panel("Evidence ladder",
    "Q-Orbit's current position: numerical verification only. Every rung above the first is unearned and is marked accordingly.",
    el("div", { class: "ladder" }, rungs.map((r, i) =>
      el("div", { class: `rung ${r.current ? "current" : "locked"}` },
        el("div", { class: "r-idx", text: `0${i + 1}` }),
        el("div", {},
          el("div", { class: "r-name", text: r.name }),
          el("div", { class: "r-note", text: r.note })),
        badge(r.state, r.kind)))),
    el("div", { class: "caption", text:
      "Current evidence position: RUNG 1 — numerical verification of a theoretical software fixture. Nothing on this console constitutes security-theory completeness, device characterization, physical validation, or deployment readiness." }),
    provRow(provTag("json", "controlled JSON — run_summary.json + final_audit.json"), provTag("canonical", "canonical facts (locked)")),
  ));

  return root;
}
