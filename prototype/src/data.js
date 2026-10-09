// Data loading layer. Every panel declares its provenance; every load fails
// closed: a fetch/parse error produces a DATA UNAVAILABLE state, never
// synthetic fallback data.

export const DATA_SOURCES = {
  runSummary: { path: "data/run_summary.json", kind: "json", prov: "controlled JSON", file: "Q-Orbit_V0.16-TA1_Theoretical_Run_Summary.json" },
  finalAudit: { path: "data/final_audit.json", kind: "json", prov: "controlled JSON", file: "Final_Audit_V0.16-TA1.json" },
  screen: { path: "data/two_parameter_screen.csv", kind: "csv", prov: "controlled CSV", file: "Q-Orbit_V0.16-TA1_Two_Parameter_Screen.csv" },
  gridBoundary: { path: "data/grid_boundary.csv", kind: "csv", prov: "controlled CSV", file: "Q-Orbit_V0.16-TA1_Grid_Boundary.csv" },
  sensitivity: { path: "data/local_sensitivity.csv", kind: "csv", prov: "controlled CSV", file: "Q-Orbit_V0.16-TA1_Local_Sensitivity.csv" },
  proofMap: { path: "data/imperfection_to_proof_mapping.csv", kind: "csv", prov: "controlled CSV", file: "Q-Orbit_V0.16-TA1_Imperfection_to_Proof_Mapping.csv" },
  regression: { path: "data/regression_tests.csv", kind: "csv", prov: "regression fixture", file: "Q-Orbit_V0.16-TA1_Regression_Tests.csv" },
  gates: { path: "data/gate_register.csv", kind: "csv", prov: "controlled CSV", file: "Q-Orbit_V0.16-TA1_Gate_Register.csv" },
  claims: { path: "data/claim_boundary_register.csv", kind: "csv", prov: "controlled CSV", file: "Q-Orbit_V0.16-TA1_Claim_Boundary_Register.csv" },
};

/** Minimal RFC-4180-ish CSV parser (quoted fields, escaped quotes). */
export function parseCSV(text) {
  const rows = [];
  let row = [], field = "", inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  if (!rows.length) return [];
  const header = rows[0];
  return rows.slice(1).map((r) => Object.fromEntries(header.map((h, j) => [h, r[j] ?? ""])));
}

async function loadOne(src) {
  const res = await fetch(src.path, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${src.path}`);
  const text = await res.text();
  if (src.kind === "json") return JSON.parse(text);
  const rows = parseCSV(text);
  if (!rows.length) throw new Error(`Empty or unparsable CSV: ${src.path}`);
  return rows;
}

/**
 * Load every declared source. Returns { data, errors } where data[key] is the
 * parsed payload or null, and errors[key] is the failure message if any.
 * Nothing is fabricated: a failed source stays null.
 */
export async function loadAll() {
  const data = {}, errors = {};
  await Promise.all(Object.entries(DATA_SOURCES).map(async ([key, src]) => {
    try { data[key] = await loadOne(src); }
    catch (e) { data[key] = null; errors[key] = e.message; }
  }));
  return { data, errors };
}
