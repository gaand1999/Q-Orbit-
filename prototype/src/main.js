import { loadAll } from "./data.js";
import { el } from "./ui.js";
import * as overview from "./panels/overview.js";
import * as finitekey from "./panels/finitekey.js";
import * as windowOpt from "./panels/window.js";
import * as grid from "./panels/grid.js";
import * as sensitivity from "./panels/sensitivity.js";
import * as proofmatrix from "./panels/proofmatrix.js";
import * as architecture from "./panels/architecture.js";
import * as ladder from "./panels/ladder.js";
import * as claims from "./panels/claims.js";

const SECTIONS = [
  { id: "overview", title: "Overview Dashboard", sub: "Primary theoretical outputs, screen partition, verification status.", render: overview.render },
  { id: "finite-key", title: "Finite-Key Analysis", sub: "Margin equation and candidate-key derivation on the frozen fixture.", render: finitekey.render },
  { id: "window", title: "Window Optimization", sub: "Integer half-window search, canonical optimum at 102 s.", render: windowOpt.render },
  { id: "grid", title: "41 × 41 Coupled Screen", sub: "Extraneous-count probability × intrinsic QBER deterministic partition.", render: grid.render },
  { id: "sensitivity", title: "Local Sensitivity", sub: "Eight controlled parameters, declared-step responses.", render: sensitivity.render },
  { id: "proof-matrix", title: "Proof-to-Device Matrix", sub: "Sixteen controlled mapping rows; 15-effect coverage checklist.", render: proofmatrix.render },
  { id: "architecture", title: "Security Architecture", sub: "Layered composition L0–L3 with gate states.", render: architecture.render },
  { id: "ladder", title: "Evidence Ladder", sub: "From numerical verification to operational deployment.", render: ladder.render },
  { id: "claims", title: "Claim Boundary", sub: "Fail-closed claim control and the verbatim boundary register.", render: claims.render },
];

const nav = document.getElementById("sidenav");
const content = document.getElementById("content");

let ctx = { data: {}, errors: {} };

function currentId() {
  const h = location.hash.replace(/^#\/?/, "");
  return SECTIONS.some((s) => s.id === h) ? h : "overview";
}

function renderNav() {
  nav.textContent = "";
  const active = currentId();
  SECTIONS.forEach((s, i) => {
    nav.append(el("button", {
      class: `nav-item${s.id === active ? " active" : ""}`,
      onclick: () => { location.hash = `/${s.id}`; },
    }, el("span", { class: "idx", text: String(i + 1).padStart(2, "0") }), s.title));
  });
}

function renderSection() {
  renderNav();
  const s = SECTIONS.find((x) => x.id === currentId());
  content.textContent = "";
  content.append(
    el("h2", { class: "page-title", text: s.title }),
    el("div", { class: "page-sub", text: s.sub }),
  );
  try {
    content.append(s.render(ctx));
  } catch (e) {
    content.append(el("div", { class: "failclosed" },
      el("div", { class: "fc-title", text: "RENDER ERROR — FAILING CLOSED" }),
      el("div", { class: "fc-body", text: String(e && e.message || e) })));
  }
  window.scrollTo({ top: 0 });
}

window.addEventListener("hashchange", renderSection);

const { data, errors } = await loadAll();
ctx = { data, errors };
renderSection();
