// Locked canonical numerical facts for the Q-Orbit V0.16-TA1 theoretical package.
// These are the exhibition-verified controlling values. Display strings are kept
// verbatim so the console never silently rounds or sign-flips a canonical fact.

export const CANONICAL = {
  halfWindow_s: "102",
  signedMargin_bits: "41338.62418456675",
  candidateKey_bits: "41338",
  qberX: "0.017422686665352745",
  phaseErrorX: "0.09270161340569935",
  nX: "492818.0901525894",
  sX0: "5047.784882329125",
  sX1: "183803.04893680647",
  lambdaEC_bits: "65385.40180119235",
  finitePenalty_bits: "256.5669430839006",
  gridPoints: 1681,
  gridSide: 41,
  positiveCount: 568,
  nonpositiveCount: 1113,
  positiveFraction: "0.33789411064842356",
  gridMedian_bits: "-2624.946810258186",   // NEGATIVE — sign is controlled
  gridMin_bits: "-3828.414517626367",     // NEGATIVE — sign is controlled
  gridMax_bits: "142540.7481180454",
  regressionTests: 12,
  regressionPass: 12,
  auditChecks: 20,
  auditPass: 20,
  windowSearchMin_s: 1,
  windowSearchMax_s: 221,
};

// Numeric view for arithmetic checks.
const N = Object.fromEntries(
  Object.entries(CANONICAL).map(([k, v]) => [k, Number(v)])
);

/**
 * Cross-check the controlled run summary JSON against the locked canonical facts.
 * Returns an array of { label, expected, observed, pass } records.
 */
export function verifyRunSummary(rs) {
  const b = rs?.baseline_fixture_objective ?? {};
  const g = rs?.two_parameter_screen ?? {};
  const checks = [
    ["Optimal half-window (s)", N.halfWindow_s, b.half_window_s],
    ["Signed finite-key margin (bits)", N.signedMargin_bits, b.signed_key_margin_bits],
    ["Floored candidate key (bits)", N.candidateKey_bits, b.secret_key_bits],
    ["X-basis QBER", N.qberX, b.qber_x],
    ["Phase-error bound", N.phaseErrorX, b.phase_error_x],
    ["n_X", N.nX, b.n_x],
    ["s_X,1", N.sX1, b.s_x1],
    ["s_X,0", N.sX0, b.s_x0],
    ["lambda_EC (bits)", N.lambdaEC_bits, b.lambda_ec_bits],
    ["Grid points", N.gridPoints, g.grid_rows],
    ["Grid side", N.gridSide, g.extraneous_count_grid_points],
    ["Positive points", N.positiveCount, g.positive_count],
    ["Nonpositive points", N.nonpositiveCount, g.nonpositive_count],
    ["Positive grid fraction", N.positiveFraction, g.positive_fraction],
    ["Grid median signed margin (bits)", N.gridMedian_bits, g.median_signed_margin_bits],
    ["Grid minimum signed margin (bits)", N.gridMin_bits, g.minimum_signed_margin_bits],
    ["Grid maximum signed margin (bits)", N.gridMax_bits, g.maximum_signed_margin_bits],
    ["Regression tests", N.regressionTests, rs?.regression_test_count],
    ["Regression passes", N.regressionPass, rs?.regression_pass_count],
  ];
  return checks.map(([label, expected, observed]) => ({
    label,
    expected: String(expected),
    observed: observed === undefined ? "MISSING" : String(observed),
    pass: observed !== undefined && Math.abs(Number(observed) - expected) <= Math.max(1e-9, Math.abs(expected) * 1e-12),
  }));
}

/** Cross-check the independent audit JSON against canonical audit counts. */
export function verifyAudit(audit) {
  const checks = [
    ["Audit checks", N.auditChecks, audit?.check_count],
    ["Audit passes", N.auditPass, audit?.pass_count],
    ["Audit failures", 0, audit?.failure_count],
  ];
  return checks.map(([label, expected, observed]) => ({
    label,
    expected: String(expected),
    observed: observed === undefined ? "MISSING" : String(observed),
    pass: Number(observed) === expected,
  }));
}

/** Binary entropy h2(p) in bits — arithmetic on canonical inputs only. */
export function h2(p) {
  if (p <= 0 || p >= 1) return 0;
  return -p * Math.log2(p) - (1 - p) * Math.log2(1 - p);
}

export const CANONICAL_NUMERIC = N;
