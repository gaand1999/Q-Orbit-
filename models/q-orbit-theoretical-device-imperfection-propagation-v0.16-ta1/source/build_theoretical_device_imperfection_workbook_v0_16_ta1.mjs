import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const moduleRoot = process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES;
if (!moduleRoot) throw new Error("CODEX_PRIMARY_RUNTIME_NODE_MODULES is required");
const artifactModule = pathToFileURL(path.join(moduleRoot, "@oai/artifact-tool/dist/artifact_tool.mjs")).href;
const { SpreadsheetFile, Workbook } = await import(artifactModule);
const { default: JSZip } = await import(pathToFileURL(path.join(moduleRoot, "jszip/lib/index.js")).href);

const workspace = "/workspace/scratch/7928ba9ec53f";
const root = path.join(workspace, "deliverables/q-orbit-theoretical-device-imperfection-propagation-v0.16-ta1");
const dataDir = path.join(root, "data_processed");
const outputDir = path.join(workspace, "outputs/7928ba9ec53f");
const outputPath = path.join(outputDir, "Q-Orbit_Theoretical_Device_Imperfection_Propagation_Workbook_V0.16-TA1.xlsx");
const packagePath = path.join(root, "Q-Orbit_Theoretical_Device_Imperfection_Propagation_Workbook_V0.16-TA1.xlsx");
const previewDir = path.join(root, "previews");

const C = {
  navy: "#09243B", navy2: "#123A56", teal: "#0F8F83", tealLight: "#DDF4F0",
  blue: "#2563EB", blueLight: "#EAF2FF", orange: "#D97706", orangeLight: "#FFF1D6",
  green: "#15803D", greenLight: "#DCFCE7", red: "#B91C1C", redLight: "#FEE2E2",
  purple: "#7E22CE", purpleLight: "#F3E8FF", gray50: "#F8FAFC", gray100: "#F1F5F9",
  gray200: "#E2E8F0", gray400: "#94A3B8", gray600: "#475569", text: "#172033", white: "#FFFFFF",
};

function colName(n) {
  let value = n;
  let result = "";
  while (value > 0) {
    value -= 1;
    result = String.fromCharCode(65 + (value % 26)) + result;
    value = Math.floor(value / 26);
  }
  return result;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (ch === '"') {
        quoted = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += ch;
    }
  }
  if (field.length || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }
  return rows;
}

function coerce(value) {
  if (value === "") return null;
  if (/^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/.test(value)) return Number(value);
  return value;
}

async function loadCsv(name) {
  const rows = parseCsv(await fs.readFile(path.join(dataDir, name), "utf8"));
  const headers = rows[0];
  return {
    headers,
    rows: rows.slice(1).filter((row) => row.some((value) => value !== "")).map((row) => row.map(coerce)),
  };
}

function titleBand(sheet, endCol, title, subtitle) {
  sheet.showGridLines = false;
  const titleRange = sheet.getRange(`A1:${endCol}2`);
  titleRange.merge();
  titleRange.values = [[title]];
  titleRange.format.fill = C.navy;
  titleRange.format.font = { bold: true, color: C.white, size: 18, name: "Aptos Display" };
  titleRange.format.verticalAlignment = "center";
  titleRange.format.rowHeight = 27;
  const subtitleRange = sheet.getRange(`A3:${endCol}3`);
  subtitleRange.merge();
  subtitleRange.values = [[subtitle]];
  subtitleRange.format.fill = C.redLight;
  subtitleRange.format.font = { bold: true, color: C.red, size: 10 };
  subtitleRange.format.wrapText = true;
  subtitleRange.format.verticalAlignment = "center";
  subtitleRange.format.rowHeight = 32;
}

function styleHeader(range) {
  range.format.fill = C.navy2;
  range.format.font = { bold: true, color: C.white, size: 9 };
  range.format.horizontalAlignment = "center";
  range.format.verticalAlignment = "center";
  range.format.wrapText = true;
  range.format.borders = { preset: "all", style: "thin", color: C.gray200 };
  range.format.rowHeight = 38;
}

function styleBody(range, rowHeight = 34) {
  range.format.font = { color: C.text, size: 9 };
  range.format.verticalAlignment = "top";
  range.format.wrapText = true;
  range.format.borders = { preset: "all", style: "thin", color: C.gray200 };
  range.format.rowHeight = rowHeight;
}

function addStatusFormatting(range) {
  range.conditionalFormats.add("containsText", { text: "PASS", format: { fill: C.greenLight, font: { bold: true, color: C.green } } });
  range.conditionalFormats.add("containsText", { text: "POSITIVE", format: { fill: C.greenLight, font: { bold: true, color: C.green } } });
  range.conditionalFormats.add("containsText", { text: "BLOCKED", format: { fill: C.redLight, font: { bold: true, color: C.red } } });
  range.conditionalFormats.add("containsText", { text: "PROHIBITED", format: { fill: C.redLight, font: { bold: true, color: C.red } } });
  range.conditionalFormats.add("containsText", { text: "NONPOSITIVE", format: { fill: C.orangeLight, font: { bold: true, color: C.orange } } });
  range.conditionalFormats.add("containsText", { text: "NOT-", format: { fill: C.orangeLight, font: { bold: true, color: C.orange } } });
  range.conditionalFormats.add("containsText", { text: "UNMAPPED", format: { fill: C.orangeLight, font: { bold: true, color: C.orange } } });
  range.conditionalFormats.add("containsText", { text: "QUARANTINED", format: { fill: C.orangeLight, font: { bold: true, color: C.orange } } });
}

function widthFor(header) {
  const h = header.toLowerCase();
  if (h.includes("url") || h.includes("locator")) return 48;
  if (h.includes("sha256")) return 48;
  if (h.includes("interpretation") || h.includes("consequence") || h.includes("remediation") || h.includes("reason") || h.includes("action") || h.includes("dependency") || h.includes("limitation")) return 46;
  if (h.includes("statement") || h.includes("citation") || h.includes("representation") || h.includes("purpose") || h.includes("effect")) return 42;
  if (h.includes("state") || h.includes("status") || h.includes("result") || h.includes("class") || h.includes("disposition")) return 28;
  if (h.includes("parameter") || h.includes("metric") || h.includes("source") || h.includes("test")) return 30;
  if (h.includes("path") || h.includes("file")) return 38;
  if (h.includes("id") || h.includes("side") || h.includes("rank")) return 18;
  return 22;
}

function writeTable(sheet, title, subtitle, dataset, options = {}) {
  const headers = dataset.headers;
  const rows = dataset.rows;
  const endCol = colName(headers.length);
  const endRow = 5 + rows.length;
  titleBand(sheet, endCol, title, subtitle);
  sheet.getRange(`A5:${endCol}5`).values = [headers];
  styleHeader(sheet.getRange(`A5:${endCol}5`));
  if (rows.length) {
    sheet.getRange(`A6:${endCol}${endRow}`).values = rows;
    styleBody(sheet.getRange(`A6:${endCol}${endRow}`), options.rowHeight ?? 34);
    for (let r = 6; r <= endRow; r += 1) {
      if (r % 2 === 0) sheet.getRange(`A${r}:${endCol}${r}`).format.fill = C.gray50;
    }
  }
  headers.forEach((header, i) => {
    sheet.getRange(`${colName(i + 1)}:${colName(i + 1)}`).format.columnWidth = Math.min(options.maxWidth ?? 48, widthFor(header));
  });
  for (const statusHeader of options.statusHeaders ?? []) {
    const index = headers.indexOf(statusHeader);
    if (index >= 0 && rows.length) addStatusFormatting(sheet.getRange(`${colName(index + 1)}6:${colName(index + 1)}${endRow}`));
  }
  sheet.freezePanes.freezeRows(5);
  sheet.freezePanes.freezeColumns(options.freezeColumns ?? 2);
  return { endRow, endCol };
}

function setCard(sheet, labelRangeAddress, valueRangeAddress, label, formula, fill, color, format = null) {
  const labelRange = sheet.getRange(labelRangeAddress);
  labelRange.merge();
  labelRange.values = [[label]];
  labelRange.format.fill = C.navy2;
  labelRange.format.font = { bold: true, color: C.white, size: 9 };
  labelRange.format.horizontalAlignment = "center";
  labelRange.format.verticalAlignment = "center";
  const valueRange = sheet.getRange(valueRangeAddress);
  valueRange.merge();
  valueRange.formulas = [[formula]];
  valueRange.format.fill = fill;
  valueRange.format.font = { bold: true, color, size: 15 };
  valueRange.format.horizontalAlignment = "center";
  valueRange.format.verticalAlignment = "center";
  valueRange.format.borders = { preset: "outside", style: "medium", color: C.gray200 };
  if (format) valueRange.setNumberFormat(format);
}

function xmlEscape(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

function formulaPlan() {
  const plan = new Map();
  const add = (sheetNumber, cell, formula) => {
    if (!plan.has(sheetNumber)) plan.set(sheetNumber, new Map());
    plan.get(sheetNumber).set(cell, formula.startsWith("=") ? formula.slice(1) : formula);
  };
  const summary = {
    A6: "='Baseline'!B6", D6: "='Baseline'!B7", G6: '=COUNTIF(\'Regression\'!$F$6:$F$17,"PASS")',
    J6: "=COUNTA('Grid Screen'!$A$6:$A$1686)", M6: '=COUNTIF(\'Grid Screen\'!$I$6:$I$1686,"POSITIVE-MODEL-MARGIN")/COUNTA(\'Grid Screen\'!$A$6:$A$1686)',
    A11: "=MEDIAN('Grid Screen'!$E$6:$E$1686)", D11: '=COUNTIF(\'Frontiers\'!$G$6:$G$21,"CROSSING-FOUND")',
    G11: '=COUNTIF(\'Proof Mapping\'!$D$6:$D$21,"UNMAPPED-PROOF-REQUIRED")+COUNTIF(\'Proof Mapping\'!$D$6:$D$21,"UNMAPPED-MODEL-REQUIRED")+COUNTIF(\'Proof Mapping\'!$D$6:$D$21,"UNMAPPED-SECURITY-BUDGET")', J11: '=COUNTIF(\'Gates\'!$D$6:$D$16,"PASS-PHYSICAL")',
    M11: "='Gates'!D16", A16: "='Gates'!D12", E16: "='Gates'!D13", I16: "='Gates'!D14", M16: "='Gates'!D15",
  };
  Object.entries(summary).forEach(([cell, formula]) => add(2, cell, formula));

  const gridFormulas = [
    "=COUNTA('Grid Screen'!$A$6:$A$1686)", '=COUNTIF(\'Grid Screen\'!$I$6:$I$1686,"POSITIVE-MODEL-MARGIN")',
    '=COUNTIF(\'Grid Screen\'!$I$6:$I$1686,"NONPOSITIVE-MODEL-MARGIN")', "=B7/B6",
    "=MEDIAN('Grid Screen'!$E$6:$E$1686)", "=MIN('Grid Screen'!$E$6:$E$1686)", "=MAX('Grid Screen'!$E$6:$E$1686)",
    "=MIN('Grid Screen'!$B$6:$B$1686)", "=MAX('Grid Screen'!$B$6:$B$1686)",
    "=MIN('Grid Screen'!$C$6:$C$1686)", "=MAX('Grid Screen'!$C$6:$C$1686)",
  ];
  gridFormulas.forEach((formula, index) => add(7, `B${6 + index}`, formula));

  const boundarySourceRows = [6, 10, 14, 18, 22, 25];
  boundarySourceRows.forEach((sourceRow, index) => {
    const row = 6 + index;
    add(8, `G${row}`, `='Grid Boundary'!A${sourceRow}`);
    add(8, `H${row}`, `='Grid Boundary'!B${sourceRow}`);
  });

  const auditObserved = [
    "='Baseline'!B6", "='Baseline'!B8", "=COUNTA('Regression'!$A$6:$A$17)", '=COUNTIF(\'Regression\'!$F$6:$F$17,"PASS")',
    "=COUNTA('Parameters'!$A$6:$A$13)", "=COUNTA('Frontiers'!$A$6:$A$21)", '=COUNTIF(\'Frontiers\'!$G$6:$G$21,"CROSSING-FOUND")',
    "=COUNTA('Grid Screen'!$A$6:$A$1686)", '=COUNTIF(\'Grid Screen\'!$I$6:$I$1686,"POSITIVE-MODEL-MARGIN")',
    '=COUNTIF(\'Grid Screen\'!$I$6:$I$1686,"NONPOSITIVE-MODEL-MARGIN")', '=COUNTIF(\'Grid Screen\'!$I$6:$I$1686,"POSITIVE-MODEL-MARGIN")+COUNTIF(\'Grid Screen\'!$I$6:$I$1686,"NONPOSITIVE-MODEL-MARGIN")',
    '=COUNTIF(\'Grid Screen\'!$I$6:$I$1686,"POSITIVE-MODEL-MARGIN")/COUNTA(\'Grid Screen\'!$A$6:$A$1686)',
    "=COUNTA('Proof Mapping'!$A$6:$A$21)", '=COUNTIF(\'Proof Mapping\'!$D$6:$D$21,"UNMAPPED-PROOF-REQUIRED")+COUNTIF(\'Proof Mapping\'!$D$6:$D$21,"UNMAPPED-MODEL-REQUIRED")+COUNTIF(\'Proof Mapping\'!$D$6:$D$21,"UNMAPPED-SECURITY-BUDGET")',
    "=COUNTA('Controlled Inputs'!$A$6:$A$22)", "='Gates'!D12", "='Gates'!D13", "='Gates'!D14", "='Gates'!D15", "='Gates'!D16",
    '=COUNTIF(\'Claims\'!$C$6:$C$19,"PROHIBITED")',
  ];
  auditObserved.forEach((formula, index) => {
    const row = 6 + index;
    add(17, `C${row}`, formula);
    add(17, `D${row}`, `=IF(B${row}=C${row},"PASS","FAIL")`);
  });
  return plan;
}

async function preserveFormulasInXlsx(xlsxPath) {
  const zip = await JSZip.loadAsync(await fs.readFile(xlsxPath));
  let injected = 0;
  for (const [sheetNumber, cells] of formulaPlan().entries()) {
    const entry = `xl/worksheets/sheet${sheetNumber}.xml`;
    let xml = await zip.file(entry).async("string");
    for (const [cell, formula] of cells.entries()) {
      const pattern = new RegExp(`(<x:c\\s+[^>]*r="${cell}"[^>]*>)([\\s\\S]*?)(</x:c>)`);
      if (!pattern.test(xml)) throw new Error(`Formula target absent: ${entry}!${cell}`);
      xml = xml.replace(pattern, (match, open, body, close) => {
        const stripped = body.replace(/<x:f[^>]*>[\s\S]*?<\/x:f>/g, "");
        return `${open}<x:f>${xmlEscape(formula)}</x:f>${stripped}${close}`;
      });
      injected += 1;
    }
    zip.file(entry, xml);
  }
  let workbookXml = await zip.file("xl/workbook.xml").async("string");
  workbookXml = workbookXml.replace(/<x:calcPr[^>]*\/>/g, "");
  workbookXml = workbookXml.replace("</x:workbook>", '<x:calcPr calcId="191029" calcMode="auto" fullCalcOnLoad="1" forceFullCalc="1"/></x:workbook>');
  zip.file("xl/workbook.xml", workbookXml);
  await fs.writeFile(xlsxPath, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE", compressionOptions: { level: 6 } }));
  return injected;
}

const parameters = await loadCsv("Q-Orbit_V0.16-TA1_Parameter_Catalog.csv");
const local = await loadCsv("Q-Orbit_V0.16-TA1_Local_Sensitivity.csv");
const frontiers = await loadCsv("Q-Orbit_V0.16-TA1_Zero_Key_Frontier.csv");
const gridBoundary = await loadCsv("Q-Orbit_V0.16-TA1_Grid_Boundary.csv");
const gridScreen = await loadCsv("Q-Orbit_V0.16-TA1_Two_Parameter_Screen.csv");
const regression = await loadCsv("Q-Orbit_V0.16-TA1_Regression_Tests.csv");
const proofMapping = await loadCsv("Q-Orbit_V0.16-TA1_Imperfection_to_Proof_Mapping.csv");
const limitations = await loadCsv("Q-Orbit_V0.16-TA1_Limitation_Register.csv");
const gates = await loadCsv("Q-Orbit_V0.16-TA1_Gate_Register.csv");
const claims = await loadCsv("Q-Orbit_V0.16-TA1_Claim_Boundary_Register.csv");
const sources = await loadCsv("Q-Orbit_V0.16-TA1_Source_Register.csv");
const controlled = await loadCsv("Q-Orbit_V0.16-TA1_Controlled_Input_Index.csv");
const run = JSON.parse(await fs.readFile(path.join(root, "runs/Q-Orbit_V0.16-TA1_Theoretical_Run_Summary.json"), "utf8"));

const b = run.baseline_fixture_objective;
const baseline = {
  headers: ["metric", "value", "unit", "interpretation"],
  rows: [
    ["secret_key_bits", b.secret_key_bits, "bits/pass", "Floored nonnegative modeled candidate; quarantined"],
    ["signed_key_margin_bits", b.signed_key_margin_bits, "bits/pass", "Pre-clip finite-key expression; numerical diagnostic"],
    ["half_window_s", b.half_window_s, "s", "Selected from exhaustive 1–221 s integer screen"],
    ["sample_bins", b.sample_bins, "count", "Inclusive one-second bins"],
    ["edge_elevation_deg", b.edge_elevation_deg, "degree", "Reference-curve edge elevation"],
    ["qber_x", b.qber_x, "fraction", "Aggregate modeled X-basis QBER; not accepting alone"],
    ["phase_error_x", b.phase_error_x, "fraction", "Finite-key upper bound"],
    ["n_x", b.n_x, "events", "Expected X-basis detections"],
    ["n_z", b.n_z, "events", "Expected Z-basis detections"],
    ["m_x", b.m_x, "events", "Expected X-basis errors"],
    ["lambda_ec_bits", b.lambda_ec_bits, "bits", "Error-correction leakage estimate"],
    ["s_x0", b.s_x0, "events", "Vacuum lower bound"],
    ["s_x1", b.s_x1, "events", "Single-photon lower bound"],
    ["v_z1", b.v_z1, "events", "Single-photon error upper-bound numerator"],
    ["s_z1", b.s_z1, "events", "Z-basis single-photon lower bound"],
    ["mean_photon_number", b.mean_photon_number, "photons/pulse", "Frozen probability-weighted mean"],
    ["finite_penalty_bits", b.finite_penalty_bits, "bits", "Secrecy/correctness finite penalty"],
  ],
};

const workbook = Workbook.create();
const sheetNames = [
  "Read Me", "Summary", "Baseline", "Parameters", "Local Response", "Frontiers", "Grid Summary",
  "Grid Boundary", "Grid Screen", "Regression", "Proof Mapping", "Limitations", "Gates", "Claims",
  "Sources", "Controlled Inputs", "Audit",
];
const sheets = {};
for (const name of sheetNames) sheets[name] = workbook.worksheets.add(name);

// Read Me
{
  const s = sheets["Read Me"];
  titleBand(s, "P", "Q-Orbit V0.16-TA1 | theoretical device-imperfection propagation", "Software-fixture analysis only. No hardware selection, purchase, characterization, optical emission, Tabuk run, security proof closure or key release.");
  const sections = [
    ["Purpose", "Reproduce the frozen V0.6 finite-key fixture, stress only scalar parameters already present in the software contract, and record every unmapped proof obligation."],
    ["Primary result", "41,338-bit floored fixture reproduced; 568/1,681 coupled grid points have positive signed margin; the grid fraction is not probability or reliability."],
    ["Reading rule", "Green means a bounded theoretical or integrity check passes. Red/orange means progression remains blocked, absent, nonpositive or unmapped."],
    ["Local response", "Ranks use ±0.1 dB or ±1% declared steps. They are local numerical responses, not global physical importance."],
    ["Frontiers", "Crossing values freeze all other parameters. They are not requirements, tolerances, procurement filters or acceptance thresholds."],
    ["Grid", "The 41 × 41 p_ec/QBER screen uses V0.7 engineering ranges. It is deterministic and not a calibrated distribution."],
    ["Proof boundary", "Phase randomization, pulse correlations, source flaws, detector history/mismatch and characterization confidence remain UNMAPPED and receive no invented penalty."],
    ["Controlling states", "Physical characterization NOT-EXECUTED; HIL BLOCKED; Tabuk NOT-RUN/NONE; laser INHIBITED; key release QUARANTINED/ZERO-RELEASED; publication PRIVATE-BLOCKED."],
    ["Next theoretical task", "Select a proof profile and parameter domains for source phase/state/correlation and detector history/mismatch, then compose characterization confidence with the security statement."],
  ];
  s.getRange("A5:C5").merge(); s.getRange("A5:C5").values = [["SECTION"]];
  s.getRange("D5:P5").merge(); s.getRange("D5:P5").values = [["CONTROLLED READING"]];
  styleHeader(s.getRange("A5:P5"));
  sections.forEach((row, index) => {
    const r = 6 + index;
    s.getRange(`A${r}:C${r}`).merge(); s.getRange(`A${r}:C${r}`).values = [[row[0]]];
    s.getRange(`D${r}:P${r}`).merge(); s.getRange(`D${r}:P${r}`).values = [[row[1]]];
    s.getRange(`A${r}:P${r}`).format.fill = r % 2 === 0 ? C.gray50 : C.white;
    s.getRange(`A${r}:C${r}`).format.font = { bold: true, color: C.navy, size: 10 };
    s.getRange(`D${r}:P${r}`).format.font = { color: C.text, size: 10 };
    s.getRange(`A${r}:P${r}`).format.wrapText = true;
    s.getRange(`A${r}:P${r}`).format.verticalAlignment = "center";
    s.getRange(`A${r}:P${r}`).format.borders = { preset: "all", style: "thin", color: C.gray200 };
    s.getRange(`A${r}:P${r}`).format.rowHeight = 42;
  });
  s.getRange("A:P").format.columnWidth = 11;
  s.freezePanes.freezeRows(5);
}

// Summary
{
  const s = sheets.Summary;
  titleBand(s, "P", "V0.16-TA1 theoretical analysis dashboard", "The fixture is reproducible, but proof-to-device closure is BLOCKED. Values below are numerical model results, not device, Tabuk, security or mission evidence.");
  setCard(s, "A5:C5", "A6:C7", "FLOORED FIXTURE KEY", "='Baseline'!B6", C.blueLight, C.blue, "#,##0");
  setCard(s, "D5:F5", "D6:F7", "SIGNED FIXTURE MARGIN", "='Baseline'!B7", C.tealLight, C.teal, "#,##0.0");
  setCard(s, "G5:I5", "G6:I7", "REGRESSION PASS", '=COUNTIF(\'Regression\'!$F$6:$F$17,"PASS")', C.greenLight, C.green, "0");
  setCard(s, "J5:L5", "J6:L7", "GRID POINTS", "=COUNTA('Grid Screen'!$A$6:$A$1686)", C.blueLight, C.blue, "#,##0");
  setCard(s, "M5:P5", "M6:P7", "POSITIVE GRID FRACTION", '=COUNTIF(\'Grid Screen\'!$I$6:$I$1686,"POSITIVE-MODEL-MARGIN")/COUNTA(\'Grid Screen\'!$A$6:$A$1686)', C.orangeLight, C.orange, "0.00%");
  setCard(s, "A10:C10", "A11:C12", "MEDIAN SIGNED MARGIN", "=MEDIAN('Grid Screen'!$E$6:$E$1686)", C.orangeLight, C.orange, "#,##0.0");
  setCard(s, "D10:F10", "D11:F12", "FRONTIER CROSSINGS", '=COUNTIF(\'Frontiers\'!$G$6:$G$21,"CROSSING-FOUND")', C.purpleLight, C.purple, "0");
  setCard(s, "G10:I10", "G11:I12", "UNMAPPED OBLIGATIONS", '=COUNTIF(\'Proof Mapping\'!$D$6:$D$21,"UNMAPPED-PROOF-REQUIRED")+COUNTIF(\'Proof Mapping\'!$D$6:$D$21,"UNMAPPED-MODEL-REQUIRED")+COUNTIF(\'Proof Mapping\'!$D$6:$D$21,"UNMAPPED-SECURITY-BUDGET")', C.orangeLight, C.orange, "0");
  setCard(s, "J10:L10", "J11:L12", "PHYSICAL EXECUTIONS", '=COUNTIF(\'Gates\'!$D$6:$D$16,"PASS-PHYSICAL")', C.orangeLight, C.orange, "0");
  setCard(s, "M10:P10", "M11:P12", "PUBLICATION", "='Gates'!D16", C.redLight, C.red);
  setCard(s, "A15:D15", "A16:D17", "PHYSICAL CHARACTERIZATION", "='Gates'!D12", C.orangeLight, C.orange);
  setCard(s, "E15:H15", "E16:H17", "HARDWARE-IN-LOOP", "='Gates'!D13", C.redLight, C.red);
  setCard(s, "I15:L15", "I16:L17", "TABUK", "='Gates'!D14", C.orangeLight, C.orange);
  setCard(s, "M15:P15", "M16:P17", "KEY RELEASE", "='Gates'!D15", C.redLight, C.red);

  const responseChart = s.charts.add("bar", { chartType: "bar", title: "Local signed-margin response per declared step", hasLegend: false });
  const responseSeries = responseChart.series.add("Normalized response");
  responseSeries.categoryFormula = "'Local Response'!$B$6:$B$13";
  responseSeries.formula = "'Local Response'!$L$6:$L$13";
  responseSeries.fill = C.blue;
  responseChart.setPosition("A20", "H37");
  responseChart.title = "Local response (different declared steps)";
  responseChart.titleTextStyle.fontSize = 12;
  responseChart.xAxis = { axisType: "textAxis", textStyle: { fontSize: 8 } };
  responseChart.yAxis = { numberFormatCode: "0.0%", min: -0.1, max: 0.1 };

  const boundaryChart = s.charts.add("line", { chartType: "line", title: "Highest positive intrinsic-QBER grid point", hasLegend: false });
  const boundarySeries = boundaryChart.series.add("Grid boundary");
  boundarySeries.categoryFormula = "'Grid Boundary'!$G$6:$G$11";
  boundarySeries.formula = "'Grid Boundary'!$H$6:$H$11";
  boundarySeries.fill = C.teal;
  boundaryChart.setPosition("I20", "P37");
  boundaryChart.title = "Highest positive QBER vs p_ec (grid)";
  boundaryChart.titleTextStyle.fontSize = 12;
  boundaryChart.xAxis = { numberFormatCode: "0.0E+00", textStyle: { fontSize: 8 } };
  boundaryChart.yAxis = { numberFormatCode: "0.0%", min: 0, max: 0.016 };
  s.getRange("A:P").format.columnWidth = 11;
  s.freezePanes.freezeRows(3);
}

writeTable(sheets.Baseline, "Frozen V0.6 fixture reproduction", "Exact deterministic reference values. Reproduction is software verification only.", baseline, { freezeColumns: 1, rowHeight: 32 });
sheets.Baseline.getRange("B6:B22").setNumberFormat("0.000000000000");
sheets.Baseline.getRange("B6").setNumberFormat("#,##0");
sheets.Baseline.getRange("B8:B9").setNumberFormat("#,##0");

writeTable(sheets.Parameters, "Mapped scalar parameter catalog", "Only variables already present in the frozen software contract. Baselines are fixtures, not hardware values.", parameters, { statusHeaders: ["claim_class"], rowHeight: 38 });
sheets.Parameters.getRange("D6:G13").setNumberFormat("0.000E+00");

writeTable(sheets["Local Response"], "Local numerical response | eight scalar parameters", "Loss uses ±0.1 dB; all other steps are ±1% relative. Ranking is local and step-dependent, not physical importance.", local, { statusHeaders: ["claim_class"], rowHeight: 38 });
sheets["Local Response"].getRange("D6:R13").setNumberFormat("0.000E+00");
sheets["Local Response"].getRange("L6:L13").setNumberFormat("0.0000%");

writeTable(sheets.Frontiers, "One-parameter signed-margin software frontiers", "Every row freezes all other inputs and re-optimizes the half-window. Values are not requirements or acceptance thresholds.", frontiers, { statusHeaders: ["frontier_state"], rowHeight: 40 });
sheets.Frontiers.getRange("E6:L21").setNumberFormat("0.000E+00");

// Grid summary
{
  const s = sheets["Grid Summary"];
  titleBand(s, "H", "Coupled p_ec / intrinsic-QBER screen summary", "V0.7 engineering ranges on a deterministic uniform grid. The grid fraction is not probability, reliability or availability.");
  const rows = [
    ["Grid rows", null, "count"], ["Positive signed-margin rows", null, "count"], ["Nonpositive signed-margin rows", null, "count"],
    ["Positive grid fraction", null, "fraction"], ["Median signed margin", null, "bits"], ["Minimum signed margin", null, "bits"],
    ["Maximum signed margin", null, "bits"], ["Minimum p_ec", null, "probability/pulse"], ["Maximum p_ec", null, "probability/pulse"],
    ["Minimum intrinsic QBER", null, "fraction"], ["Maximum intrinsic QBER", null, "fraction"],
  ];
  s.getRange("A5:C5").values = [["metric", "formula_value", "unit"]]; styleHeader(s.getRange("A5:C5"));
  s.getRange("A6:C16").values = rows; styleBody(s.getRange("A6:C16"), 30);
  const formulas = [
    "=COUNTA('Grid Screen'!$A$6:$A$1686)", '=COUNTIF(\'Grid Screen\'!$I$6:$I$1686,"POSITIVE-MODEL-MARGIN")',
    '=COUNTIF(\'Grid Screen\'!$I$6:$I$1686,"NONPOSITIVE-MODEL-MARGIN")', "=B7/B6", "=MEDIAN('Grid Screen'!$E$6:$E$1686)",
    "=MIN('Grid Screen'!$E$6:$E$1686)", "=MAX('Grid Screen'!$E$6:$E$1686)", "=MIN('Grid Screen'!$B$6:$B$1686)",
    "=MAX('Grid Screen'!$B$6:$B$1686)", "=MIN('Grid Screen'!$C$6:$C$1686)", "=MAX('Grid Screen'!$C$6:$C$1686)",
  ];
  formulas.forEach((formula, i) => { s.getRange(`B${6 + i}`).formulas = [[formula]]; });
  s.getRange("B6:B8").setNumberFormat("#,##0"); s.getRange("B9").setNumberFormat("0.00%");
  s.getRange("B10:B12").setNumberFormat("#,##0.0"); s.getRange("B13:B14").setNumberFormat("0.000E+00"); s.getRange("B15:B16").setNumberFormat("0.0000%");
  s.getRange("A:A").format.columnWidth = 36; s.getRange("B:B").format.columnWidth = 24; s.getRange("C:C").format.columnWidth = 24;
  s.getRange("E5:H5").merge(); s.getRange("E5:H5").values = [["INTERPRETATION"]]; styleHeader(s.getRange("E5:H5"));
  s.getRange("E6:H16").merge(); s.getRange("E6:H16").values = [["The screen evaluates a bounded two-parameter design space while every other fixture input is held fixed. A positive point means only that the signed finite-key expression is positive after half-window re-optimization. The grid is not a statistical ensemble and its positive share must never be used as a probability. The boundary sheet reports the highest positive intrinsic-QBER grid point for each p_ec value; blank means no positive point at that grid resolution."]];
  s.getRange("E6:H16").format.fill = C.orangeLight; s.getRange("E6:H16").format.font = { color: C.text, size: 10 };
  s.getRange("E6:H16").format.wrapText = true; s.getRange("E6:H16").format.verticalAlignment = "center";
  s.getRange("E6:H16").format.borders = { preset: "outside", style: "medium", color: C.gray200 };
  s.getRange("E:H").format.columnWidth = 15; s.freezePanes.freezeRows(5);
}

writeTable(sheets["Grid Boundary"], "Grid-resolution positive-margin boundary", "Blank boundary values mean no positive intrinsic-QBER point at that p_ec within the declared 41-point grid.", gridBoundary, { statusHeaders: ["boundary_class"], rowHeight: 26 });
sheets["Grid Boundary"].getRange("A6:A46").setNumberFormat("0.000E+00");
sheets["Grid Boundary"].getRange("B6:B46").setNumberFormat("0.0000%");
sheets["Grid Boundary"].getRange("G5:H5").values = [["p_ec chart helper", "positive-QBER chart helper"]];
styleHeader(sheets["Grid Boundary"].getRange("G5:H5"));
const boundaryHelperSourceRows = [6, 10, 14, 18, 22, 25];
for (let index = 0; index < boundaryHelperSourceRows.length; index += 1) {
  const row = 6 + index;
  const sourceRow = boundaryHelperSourceRows[index];
  sheets["Grid Boundary"].getRange(`G${row}`).formulas = [[`='Grid Boundary'!A${sourceRow}`]];
  sheets["Grid Boundary"].getRange(`H${row}`).formulas = [[`='Grid Boundary'!B${sourceRow}`]];
}
styleBody(sheets["Grid Boundary"].getRange("G6:H11"), 26);
sheets["Grid Boundary"].getRange("G6:G11").setNumberFormat("0.0E+00");
sheets["Grid Boundary"].getRange("H6:H11").setNumberFormat("0.00%");
sheets["Grid Boundary"].getRange("F:F").format.columnWidth = 3;
sheets["Grid Boundary"].getRange("G:H").format.columnWidth = 24;

writeTable(sheets["Grid Screen"], "Full deterministic 41 × 41 coupled screen", "1,681 rows; range source is V0.7 controlled engineering screening, not a probability distribution.", gridScreen, { statusHeaders: ["positive_state"], rowHeight: 22, maxWidth: 38 });
sheets["Grid Screen"].getRange("B6:C1686").setNumberFormat("0.000E+00");
sheets["Grid Screen"].getRange("D6:D1686").setNumberFormat("0");
sheets["Grid Screen"].getRange("E6:F1686").setNumberFormat("#,##0.000");
sheets["Grid Screen"].getRange("G6:H1686").setNumberFormat("0.0000%");

writeTable(sheets.Regression, "Regression and boundary-invariant tests | 12/12 PASS", "Tests prove bounded software behavior only; they do not validate a device, proof implementation or physical system.", regression, { statusHeaders: ["result"], rowHeight: 34 });
sheets.Regression.getRange("C6:E17").setNumberFormat("0.000E+00");

writeTable(sheets["Proof Mapping"], "Imperfection-to-proof mapping register", "Unmapped effects receive no invented numerical penalty and remain blocking proof obligations.", proofMapping, { statusHeaders: ["current_mapping_state", "numeric_penalty_applied"], rowHeight: 58 });
writeTable(sheets.Limitations, "Controlled limitation register", "Every limitation remains visible. UNMAPPED-BLOCKING and PRIVATE-BLOCKED states are non-permissive.", limitations, { statusHeaders: ["status"], rowHeight: 54 });
writeTable(sheets.Gates, "Theoretical progression gates", "Only controlled-input integrity and bounded numerical analysis pass. Physical, proof-completeness, Tabuk, release and publication gates remain non-permissive.", gates, { statusHeaders: ["current_state"], rowHeight: 46 });
writeTable(sheets.Claims, "Claim boundary register", "Permitted statements are exact package facts with qualifiers. Device, procurement, security, Tabuk and mission claims are prohibited.", claims, { statusHeaders: ["disposition"], rowHeight: 46 });
writeTable(sheets.Sources, "Primary and controlled source register", "Primary papers support method or proof-boundary statements only. No published device value is promoted to a Q-Orbit input.", sources, { rowHeight: 58 });
writeTable(sheets["Controlled Inputs"], "Controlled predecessor input index | 17 files", "Hashes identify the exact copied files used by V0.16-TA1. Identity does not expand their original claim scope.", controlled, { statusHeaders: ["identity_state"], rowHeight: 44 });
sheets["Controlled Inputs"].getRange("F6:F22").setNumberFormat("#,##0");

// Audit
{
  const s = sheets.Audit;
  titleBand(s, "F", "Workbook self-audit", "Formula-driven reconciliation of the controlled numerical outputs and fail-closed states.");
  const rows = [
    ["AUD-001", 41338, null, null, "Floored baseline key"], ["AUD-002", 102, null, null, "Baseline half-window"],
    ["AUD-003", 12, null, null, "Regression test count"], ["AUD-004", 12, null, null, "Regression PASS count"],
    ["AUD-005", 8, null, null, "Mapped scalar parameter count"], ["AUD-006", 16, null, null, "Frontier rows"],
    ["AUD-007", 10, null, null, "Frontier crossings"], ["AUD-008", 1681, null, null, "Grid rows"],
    ["AUD-009", 568, null, null, "Positive grid rows"], ["AUD-010", 1113, null, null, "Nonpositive grid rows"],
    ["AUD-011", 1681, null, null, "Grid partition identity"], ["AUD-012", 568 / 1681, null, null, "Positive grid fraction"],
    ["AUD-013", 16, null, null, "Proof-mapping rows"], ["AUD-014", 7, null, null, "UNMAPPED mapping rows"],
    ["AUD-015", 17, null, null, "Controlled input rows"], ["AUD-016", "NOT-EXECUTED", null, null, "Physical characterization"],
    ["AUD-017", "BLOCKED", null, null, "Hardware-in-loop"], ["AUD-018", "NOT-RUN/NONE", null, null, "Tabuk run"],
    ["AUD-019", "QUARANTINED/ZERO-RELEASED", null, null, "Key release"], ["AUD-020", "PRIVATE-BLOCKED", null, null, "Publication"],
    ["AUD-021", 9, null, null, "Prohibited claim rows"],
  ];
  s.getRange("A5:E5").values = [["audit_id", "expected", "observed_formula", "result", "check"]]; styleHeader(s.getRange("A5:E5"));
  s.getRange("A6:E26").values = rows; styleBody(s.getRange("A6:E26"), 30);
  const observed = [
    "='Baseline'!B6", "='Baseline'!B8", "=COUNTA('Regression'!$A$6:$A$17)", '=COUNTIF(\'Regression\'!$F$6:$F$17,"PASS")',
    "=COUNTA('Parameters'!$A$6:$A$13)", "=COUNTA('Frontiers'!$A$6:$A$21)", '=COUNTIF(\'Frontiers\'!$G$6:$G$21,"CROSSING-FOUND")',
    "=COUNTA('Grid Screen'!$A$6:$A$1686)", '=COUNTIF(\'Grid Screen\'!$I$6:$I$1686,"POSITIVE-MODEL-MARGIN")',
    '=COUNTIF(\'Grid Screen\'!$I$6:$I$1686,"NONPOSITIVE-MODEL-MARGIN")', '=COUNTIF(\'Grid Screen\'!$I$6:$I$1686,"POSITIVE-MODEL-MARGIN")+COUNTIF(\'Grid Screen\'!$I$6:$I$1686,"NONPOSITIVE-MODEL-MARGIN")',
    '=COUNTIF(\'Grid Screen\'!$I$6:$I$1686,"POSITIVE-MODEL-MARGIN")/COUNTA(\'Grid Screen\'!$A$6:$A$1686)',
    "=COUNTA('Proof Mapping'!$A$6:$A$21)", '=COUNTIF(\'Proof Mapping\'!$D$6:$D$21,"UNMAPPED-PROOF-REQUIRED")+COUNTIF(\'Proof Mapping\'!$D$6:$D$21,"UNMAPPED-MODEL-REQUIRED")+COUNTIF(\'Proof Mapping\'!$D$6:$D$21,"UNMAPPED-SECURITY-BUDGET")', "=COUNTA('Controlled Inputs'!$A$6:$A$22)",
    "='Gates'!D12", "='Gates'!D13", "='Gates'!D14", "='Gates'!D15", "='Gates'!D16", '=COUNTIF(\'Claims\'!$C$6:$C$19,"PROHIBITED")',
  ];
  observed.forEach((formula, i) => {
    const row = 6 + i;
    s.getRange(`C${row}`).formulas = [[formula]];
    s.getRange(`D${row}`).formulas = [[`=IF(B${row}=C${row},"PASS","FAIL")`]];
  });
  s.getRange("B6:C26").setNumberFormat("General"); s.getRange("B17:C17").setNumberFormat("0.000000%");
  addStatusFormatting(s.getRange("D6:D26"));
  s.getRange("A:A").format.columnWidth = 18; s.getRange("B:C").format.columnWidth = 28; s.getRange("D:D").format.columnWidth = 18; s.getRange("E:E").format.columnWidth = 40;
  s.freezePanes.freezeRows(5);
}

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });

const summaryInspect = await workbook.inspect({ kind: "table", range: "Summary!A1:P18", include: "values,formulas", tableMaxRows: 20, tableMaxCols: 16 });
await fs.writeFile(path.join(root, "Q-Orbit_Theoretical_Device_Imperfection_Propagation_Workbook_V0.16-TA1.inspect.ndjson"), summaryInspect.ndjson ?? String(summaryInspect));
const auditInspect = await workbook.inspect({ kind: "table", range: "Audit!A1:E26", include: "values,formulas", tableMaxRows: 30, tableMaxCols: 6 });
await fs.writeFile(path.join(root, "Q-Orbit_Theoretical_Device_Imperfection_Propagation_Workbook_V0.16-TA1.audit-inspect.ndjson"), auditInspect.ndjson ?? String(auditInspect));
const formulaErrors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 300 }, summary: "final formula error scan" });
await fs.writeFile(path.join(root, "Q-Orbit_Theoretical_Device_Imperfection_Propagation_Workbook_V0.16-TA1.formula-errors.ndjson"), formulaErrors.ndjson ?? String(formulaErrors));

const renderRanges = {
  "Read Me": "A1:P14", Summary: "A1:P37", Baseline: "A1:D22", Parameters: "A1:K13",
  "Local Response": "A1:T13", Frontiers: "A1:M21", "Grid Summary": "A1:H16", "Grid Boundary": "A1:H30",
  "Grid Screen": "A1:J30", Regression: "A1:F17", "Proof Mapping": "A1:I21", Limitations: "A1:F20",
  Gates: "A1:E16", Claims: "A1:D19", Sources: "A1:F15", "Controlled Inputs": "A1:H22", Audit: "A1:E26",
};
for (const [sheetName, range] of Object.entries(renderRanges)) {
  const blob = await workbook.render({ sheetName, range, scale: 1.25, format: "png" });
  await fs.writeFile(
    path.join(previewDir, `${sheetName.replaceAll(" ", "_")}.png`),
    new Uint8Array(await blob.arrayBuffer()),
  );
}

const exported = await SpreadsheetFile.exportXlsx(workbook);
await exported.save(outputPath);
const formulaCount = await preserveFormulasInXlsx(outputPath);
await fs.copyFile(outputPath, packagePath);

console.log(JSON.stringify({
  outputPath,
  packagePath,
  sheetCount: sheetNames.length,
  formulaCount,
  previewCount: Object.keys(renderRanges).length,
  gridRows: gridScreen.rows.length,
}, null, 2));
