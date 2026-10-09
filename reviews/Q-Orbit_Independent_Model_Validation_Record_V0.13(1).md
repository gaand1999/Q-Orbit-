# Q-Orbit V0.13 Validation Record

## Outcome

`PASS-INDEPENDENT-NUMERICAL-COMPARISON` with 50/50 vectors and 971/971 metric comparisons passing.

## Coverage

The suite covers finite-key window width, additional loss, extraneous counts, intrinsic QBER, detector multiplier, repetition rate, afterpulsing, valid decoy/basis alternatives, full V0.6 window selection, V0.7 link decomposition, synthetic geometry/pass selection, end-to-end V0.7 screening flow and six invalid-domain rejections.

## Acceptance policy

- Categorical and integer decisions: exact.
- Efficiency values: `5e-14 + 2e-10 * scale`.
- Angles/ratios: `2e-10 + 2e-10 * scale`.
- Lengths: `2e-6 + 5e-12 * scale` metres.
- dB values: `2e-9 + 2e-10 * scale`.
- finite-key continuous values: `2e-5 + 5e-10 * scale` bits/counts.

## Non-closure

All 12 limitations remain controlled and open. This is verification of code and frozen equations, not empirical or operational validation. No V0.12 physical gate is closed by V0.13.
