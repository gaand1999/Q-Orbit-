# Q-Orbit Theoretical Analysis Console — V0.17 Prototype

Exhibition-ready interactive console for the Q-Orbit V0.16-TA1 theoretical
device-imperfection propagation package.

**THEORETICAL RESEARCH PROTOTYPE ONLY.** This is not a satellite controller,
not quantum hardware control software, not a deployed QKD system, and not a
security-certified implementation. Key release remains
**QUARANTINED / ZERO RELEASED**.

## Run

No dependencies, no build step, no API keys. Requires only Python 3 (already
on macOS) to serve the static files:

```bash
cd prototype
python3 -m http.server 8461
```

Then open: <http://127.0.0.1:8461>

Any static file server works (e.g. `npx serve`), but none is required beyond
Python. The console works fully offline. A server is needed because browsers
block `fetch()` of local files over `file://`.

To stop: `Ctrl-C`, or `pkill -f "http.server 8461"`.

## Why no React/Vite

The build environment has no Node.js, npm, Bun, or Deno. To keep installation
trivial and operation fully offline, the console is implemented as
zero-dependency ES-module JavaScript with hand-rolled SVG visualizations —
identical exhibition behavior without a toolchain.

## Data provenance map

Every numerical panel displays its source tag. Sources are byte-identical
copies of the controlled artifacts (verified with `cmp`), stored under
`prototype/data/`. Originals are never modified.

| Panel | Source | Kind |
|---|---|---|
| Overview dashboard | `run_summary.json`, `final_audit.json`, `regression_tests.csv` | controlled JSON / regression fixture |
| Finite-key analysis | `run_summary.json` + locked canonical facts | controlled JSON / canonical |
| Window optimization | `run_summary.json` (optimum only) | controlled JSON |
| Margin-vs-window curve | — | **UNAVAILABLE** (no controlled per-window series; not fabricated) |
| 41×41 coupled screen | `two_parameter_screen.csv` (1,681 rows), `grid_boundary.csv` (41 rows) | controlled CSV |
| Local sensitivity | `local_sensitivity.csv` (8 rows) | controlled CSV |
| Proof-to-device matrix | `imperfection_to_proof_mapping.csv` (16 rows) | controlled CSV |
| Security architecture | `gate_register.csv` | controlled CSV |
| Evidence ladder | `run_summary.json`, `final_audit.json` | controlled JSON |
| Claim boundary | `claim_boundary_register.csv` | controlled CSV |

## Fail-closed behavior

- Any fetch/parse failure renders an explicit `DATA UNAVAILABLE` state — never
  synthetic substitute data.
- The grid-integrity check requires exactly 1,681 rows on a 41×41 grid,
  otherwise the screen panel fails closed.
- The console refuses to present: physical validation, mission success
  probability, reliability, availability, Tabuk performance, hardware
  readiness, procurement tolerance, certified implementation security, or a
  released secret key. These render as `REFUSED` warning tiles.
- At load time the console cross-checks the controlled run summary and audit
  JSON against the locked canonical facts (22 checks) and reports any
  mismatch in the Overview panel.

## Locked canonical facts (displayed verbatim)

- Optimal half-window: **102 s** (integer search 1–221 s)
- Signed finite-key margin: **41,338.62418456675 bits**
- Candidate key: **41,338 bits** = `floor(max(M, 0))` — theoretical candidate only
- X-basis QBER: **0.017422686665352745** · Phase-error bound: **0.09270161340569935**
- n_X: **492,818.0901525894** · s_X,1: **183,803.04893680647**
- Screen: 41×41 = 1,681 points; 568 positive / 1,113 nonpositive;
  positive grid fraction 0.33789411064842356 (a grid fraction, **not** a probability)
- Grid median **−2,624.946810258186 bits** and minimum **−3,828.414517626367 bits**
  (both NEGATIVE — sign controlled); maximum +142,540.7481180454 bits
- Regression tests 12/12 PASS · Independent package audit 20/20 PASS

## Structure

```
prototype/
├── index.html          shell + status banners
├── styles.css          dark mission-control theme
├── data/               byte-identical copies of controlled inputs
└── src/
    ├── main.js         hash router + section registry
    ├── canonical.js    locked canonical facts + load-time verification
    ├── data.js         CSV/JSON loaders (fail closed)
    ├── ui.js           shared DOM helpers, provenance tags, refused tiles
    └── panels/         overview, finitekey, window, grid, sensitivity,
                        proofmatrix, architecture, ladder, claims
```

## Verified before delivery

- All 12 JS modules parse (JavaScriptCore) and every asset serves HTTP 200.
- `parseCSV` harness: all 7 controlled CSVs parse with expected row counts.
- Canonical cross-check: 22/22 PASS against the controlled JSON.
- Screen partition independently recomputed from the CSV: 568/1,113,
  median/min/max and both negative signs confirmed.
- Sensitivity ordering matches the controlled ranks 1–8.
- Finite-key equation reproduces M = 41,338.624185 bits; floor = 41,338.
