import { el, provTag, provRow, panel, dataUnavailable, refusedTile, badge } from "../ui.js";

// Metrics this console refuses to present, per the claim-control requirement.
const REFUSED = [
  ["Physical validation", "NOT-EXECUTED — no physical run exists"],
  ["Mission success probability", "No mission model or evidence"],
  ["Reliability", "Grid fractions are not reliability"],
  ["Availability", "Grid fractions are not availability"],
  ["Tabuk performance", "TABUK RUN: NOT-RUN/NONE"],
  ["Hardware readiness", "No hardware exists or was selected"],
  ["Procurement tolerance", "No procurement decision in scope"],
  ["Certified implementation security", "Proof mappings UNMAPPED; gates BLOCKED"],
  ["Released secret key", "QUARANTINED / ZERO RELEASED"],
];

export function render(ctx) {
  const { data, errors } = ctx;
  const root = el("div");

  root.append(panel("Fail-closed claim control",
    "This console refuses to present the following quantities. Each is a warning state — no inferred or placeholder value is shown.",
    el("div", { class: "grid-cards" }, REFUSED.map(([label, reason]) => refusedTile(label, reason))),
    el("div", { class: "caption", text:
      "Fail-closed behavior: where controlled evidence is absent, the console displays REFUSED / UNAVAILABLE states rather than inferred values." }),
    provRow(provTag("json", "controlled JSON — run_summary.json"), provTag("csv", "controlled CSV — claim_boundary_register.csv")),
  ));

  if (!data.claims) {
    root.append(panel("Claim boundary register", "", dataUnavailable("claim boundary register CSV", errors.claims)));
    return root;
  }

  const permitted = data.claims.filter((c) => c.disposition.startsWith("PERMITTED"));
  const prohibited = data.claims.filter((c) => c.disposition === "PROHIBITED");

  root.append(panel("Claim boundary register — verbatim",
    "The controlled register of what may and may not be claimed from the V0.16-TA1 package.",
    el("h3", { class: "sec", text: `Permitted (${permitted.length})` }),
    el("table", { class: "data" },
      el("thead", {}, el("tr", {}, el("th", { text: "ID" }), el("th", { text: "Statement" }), el("th", { text: "Disposition" }), el("th", { text: "Reason" }))),
      el("tbody", {}, permitted.map((c) => el("tr", {},
        el("td", { class: "mono", text: c.claim_id }),
        el("td", { text: c.statement }),
        el("td", {}, badge(c.disposition, c.disposition === "PERMITTED" ? "pass" : "warn")),
        el("td", { text: c.reason }))))),
    el("h3", { class: "sec", text: `Prohibited (${prohibited.length})` }),
    el("table", { class: "data" },
      el("thead", {}, el("tr", {}, el("th", { text: "ID" }), el("th", { text: "Statement" }), el("th", { text: "Disposition" }), el("th", { text: "Reason" }))),
      el("tbody", {}, prohibited.map((c) => el("tr", {},
        el("td", { class: "mono", text: c.claim_id }),
        el("td", { text: c.statement }),
        el("td", {}, badge(c.disposition, "blocked")),
        el("td", { text: c.reason }))))),
    provRow(provTag("csv", "controlled CSV — claim_boundary_register.csv")),
  ));

  return root;
}
