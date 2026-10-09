// Shared UI helpers: DOM construction, provenance tags, fail-closed states.

/** Create an element: el("div", {class:"x", html:"..."}, children...) */
export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k === "text") node.textContent = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else if (k === "style" && typeof v === "object") Object.assign(node.style, v);
    else node.setAttribute(k, v);
  }
  for (const c of children.flat()) {
    if (c == null) continue;
    node.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return node;
}

/** Provenance tag. cls: "" (json) | "prov-csv" | "prov-canonical" | "prov-regression" | "prov-unavailable" */
export function provTag(kind, detail) {
  const cls = {
    json: "", csv: "prov-csv", canonical: "prov-canonical",
    regression: "prov-regression", unavailable: "prov-unavailable",
  }[kind] ?? "";
  return el("span", { class: `prov ${cls}`, text: `SOURCE: ${detail}` });
}

export function provRow(...tags) {
  return el("div", { class: "prov-row" }, tags);
}

/** Fail-closed DATA UNAVAILABLE block. */
export function dataUnavailable(what, reason) {
  return el("div", { class: "failclosed" },
    el("div", { class: "fc-title", text: `DATA UNAVAILABLE — ${what}` }),
    el("div", { class: "fc-body", text: reason || "The controlled input could not be loaded or parsed. This console fails closed and renders no synthetic substitute data." }),
  );
}

/** Refused-metric tile (claim control). */
export function refusedTile(label, reason) {
  return el("div", { class: "stat-card neg" },
    el("div", { class: "label", text: label }),
    el("div", { class: "value small", text: "REFUSED" }),
    el("div", { class: "note", text: reason }),
  );
}

/** Format a number with thousands separators, preserving decimal precision. */
export function fmt(x, maxFrac = 15) {
  const n = Number(x);
  if (!Number.isFinite(n)) return String(x);
  return n.toLocaleString("en-US", { maximumFractionDigits: maxFrac });
}

/** Signed margin formatting with explicit sign and sign-based class. */
export function signedClass(x) {
  return Number(x) >= 0 ? "pos" : "neg";
}

export function badge(text, kind = "neutral") {
  return el("span", { class: `badge badge-${kind}`, text });
}

export function pageHeader(title, sub) {
  return el("div", {},
    el("h2", { class: "page-title", text: title }),
    el("div", { class: "page-sub", text: sub }),
  );
}

export function panel(title, sub, ...children) {
  return el("section", { class: "panel" },
    el("h3", { class: "panel-title", text: title }),
    sub ? el("p", { class: "panel-sub", text: sub }) : null,
    children,
  );
}
