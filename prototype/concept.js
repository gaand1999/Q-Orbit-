// Q-Orbit homepage visual redesign CONCEPT — isolated preview.
// Canvas 2D pseudo-3D orbital scene. No external libraries, no telemetry.
// All displayed numbers come from the shared locked canonical module.

import { CANONICAL } from "./src/canonical.js";

const REDUCED = window.matchMedia
  && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- headline facts (from locked canonical module) ---------------- */
function fillFacts() {
  const set = (id, v) => { const n = document.getElementById(id); if (n) n.textContent = v; };
  set("factKey", Number(CANONICAL.candidateKey_bits).toLocaleString("en-US"));
  set("factWindow", `${CANONICAL.halfWindow_s} s`);
  set("factReg", `${CANONICAL.regressionPass}/${CANONICAL.regressionTests}`);
  set("factAudit", `${CANONICAL.auditPass}/${CANONICAL.auditChecks}`);
}

/* ---------------- orbital scene ---------------- */
function initScene() {
  const canvas = document.getElementById("orbitCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let W = 0, H = 0, dpr = 1;
  const stars = [];
  const STAR_COUNT = 170;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function seedStars() {
    stars.length = 0;
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random(), y: Math.random(),
        r: 0.4 + Math.random() * 1.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.9,
        violet: Math.random() < 0.12,
      });
    }
  }

  // gentle mouse parallax (lerped)
  const par = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener("mousemove", (e) => {
    par.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    par.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function geometry() {
    const R = Math.min(W, H) * 0.21;
    return {
      cx: W * 0.66 + par.x * 10,
      cy: H * 0.56 + par.y * 8,
      R,
      orbitRx: R * 1.85,
      orbitRy: R * 1.22,
    };
  }

  function drawStars(t) {
    for (const s of stars) {
      const tw = REDUCED ? 0.55 : 0.35 + 0.4 * Math.sin(t * s.speed + s.phase);
      ctx.beginPath();
      ctx.arc(s.x * W + par.x * 4, s.y * H + par.y * 3, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.violet
        ? `rgba(167, 139, 250, ${tw.toFixed(3)})`
        : `rgba(190, 220, 255, ${tw.toFixed(3)})`;
      ctx.fill();
    }
  }

  function drawEarth(g, t) {
    const { cx, cy, R } = g;

    // atmosphere glow
    const atm = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.45);
    atm.addColorStop(0, "rgba(63, 224, 255, 0.10)");
    atm.addColorStop(0.6, "rgba(46, 230, 200, 0.05)");
    atm.addColorStop(1, "rgba(63, 224, 255, 0)");
    ctx.fillStyle = atm;
    ctx.beginPath(); ctx.arc(cx, cy, R * 1.45, 0, Math.PI * 2); ctx.fill();

    // sphere base (light from upper-left)
    const base = ctx.createRadialGradient(cx - R * 0.45, cy - R * 0.5, R * 0.1, cx, cy, R);
    base.addColorStop(0, "#1d4258");
    base.addColorStop(0.45, "#10243c");
    base.addColorStop(1, "#050a16");
    ctx.fillStyle = base;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();

    // clipped graticule — longitude lines rotate to fake the spin
    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
    ctx.strokeStyle = "rgba(63, 224, 255, 0.14)";
    ctx.lineWidth = 0.8;
    for (let i = 0; i < 8; i++) {
      const lon = (i / 8) * Math.PI + t * 0.18;
      const rx = Math.abs(Math.cos(lon)) * R;
      if (rx < 0.8) continue;
      ctx.beginPath(); ctx.ellipse(cx, cy, rx, R, 0, 0, Math.PI * 2); ctx.stroke();
    }
    for (let la = -2; la <= 2; la++) {
      const y = cy + (la / 3) * R * 0.85;
      const rr = Math.sqrt(Math.max(R * R - (y - cy) * (y - cy), 0));
      ctx.beginPath(); ctx.ellipse(cx, y, rr, rr * 0.16, 0, 0, Math.PI * 2); ctx.stroke();
    }

    // night-side shading
    const night = ctx.createRadialGradient(cx + R * 0.55, cy + R * 0.6, R * 0.2, cx, cy, R * 1.05);
    night.addColorStop(0, "rgba(2, 5, 11, 0.62)");
    night.addColorStop(0.55, "rgba(2, 5, 11, 0.25)");
    night.addColorStop(1, "rgba(2, 5, 11, 0)");
    ctx.fillStyle = night;
    ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
    ctx.restore();

    // limb
    ctx.strokeStyle = "rgba(63, 224, 255, 0.35)";
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
  }

  function stationPoint(g) {
    const a = 0.62; // surface angle (down-right limb)
    return {
      x: g.cx + Math.cos(a) * g.R,
      y: g.cy + Math.sin(a) * g.R,
      dx: Math.cos(a), dy: Math.sin(a),
    };
  }

  function drawGroundStation(g) {
    const s = stationPoint(g);
    ctx.save();
    ctx.translate(s.x, s.y);
    ctx.rotate(Math.atan2(s.dy, s.dx) - Math.PI / 2);
    ctx.strokeStyle = "rgba(63, 224, 255, 0.9)";
    ctx.fillStyle = "#0c1626";
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(-7, -6); ctx.quadraticCurveTo(0, 4, 7, -6); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 3); ctx.lineTo(0, 9); ctx.stroke();
    ctx.fillStyle = "#ffb454";
    ctx.beginPath(); ctx.arc(0, -4, 1.6, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    return s;
  }

  function satellitePos(g, t) {
    const th = t * 0.1 + 2.1; // slow orbit
    return {
      x: g.cx + Math.cos(th) * g.orbitRx,
      y: g.cy + Math.sin(th) * g.orbitRy,
      th,
      front: Math.sin(th) > 0,
      tangent: Math.atan2(Math.sin(th) * g.orbitRy, -Math.cos(th) * g.orbitRx) + Math.PI,
    };
  }

  function drawOrbitPath(g) {
    ctx.strokeStyle = "rgba(120, 170, 220, 0.14)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 7]);
    ctx.beginPath(); ctx.ellipse(g.cx, g.cy, g.orbitRx, g.orbitRy, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
  }

  function drawSatellite(sat) {
    ctx.save();
    ctx.translate(sat.x, sat.y);
    ctx.rotate(sat.tangent + Math.PI / 2);
    ctx.fillStyle = "#122036";
    ctx.strokeStyle = "rgba(63, 224, 255, 0.95)";
    ctx.lineWidth = 1.1;
    ctx.fillRect(-5, -4, 10, 8); ctx.strokeRect(-5, -4, 10, 8);
    ctx.fillStyle = "rgba(46, 230, 200, 0.25)";
    ctx.strokeStyle = "rgba(46, 230, 200, 0.7)";
    ctx.fillRect(-16, -2.5, 9, 5); ctx.strokeRect(-16, -2.5, 9, 5);
    ctx.fillRect(7, -2.5, 9, 5); ctx.strokeRect(7, -2.5, 9, 5);
    ctx.fillStyle = "#ffb454";
    ctx.beginPath(); ctx.arc(0, 5, 1.8, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  function drawBeam(sat, st, t) {
    // conceptual link visibility: satellite must be on the station's sky side
    const g = geometry();
    const sx = (sat.x - g.cx), sy = (sat.y - g.cy);
    const sl = Math.hypot(sx, sy) || 1;
    const vis = (sx / sl) * st.dx + (sy / sl) * st.dy;
    const alpha = Math.max(0, Math.min(1, (vis - 0.05) / 0.35));
    if (alpha <= 0.01) return;

    const grad = ctx.createLinearGradient(sat.x, sat.y, st.x, st.y);
    grad.addColorStop(0, `rgba(63, 224, 255, ${(0.85 * alpha).toFixed(3)})`);
    grad.addColorStop(1, `rgba(46, 230, 200, ${(0.35 * alpha).toFixed(3)})`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.6;
    ctx.setLineDash([10, 8]);
    ctx.lineDashOffset = REDUCED ? 0 : -t * 26; // gentle glow flow toward ground
    ctx.beginPath(); ctx.moveTo(sat.x, sat.y); ctx.lineTo(st.x, st.y); ctx.stroke();
    ctx.setLineDash([]);

    // endpoints
    ctx.fillStyle = `rgba(63, 224, 255, ${(0.9 * alpha).toFixed(3)})`;
    ctx.beginPath(); ctx.arc(st.x, st.y, 2.4, 0, Math.PI * 2); ctx.fill();

    ctx.font = "9px 'SF Mono', Menlo, monospace";
    ctx.fillStyle = `rgba(147, 169, 198, ${(0.8 * alpha).toFixed(3)})`;
    ctx.textAlign = "center";
    ctx.fillText("CONCEPTUAL DOWNLINK — SCHEMATIC", (sat.x + st.x) / 2, (sat.y + st.y) / 2 - 8);
  }

  function drawCaption() {
    ctx.font = "9.5px 'SF Mono', Menlo, monospace";
    ctx.fillStyle = "rgba(100, 123, 156, 0.75)";
    ctx.textAlign = "left";
    ctx.fillText("SCHEMATIC — NOT TO SCALE · NOT TELEMETRY", 18, H - 18);
  }

  function frame(tms) {
    const t = tms / 1000;
    par.x += (par.tx - par.x) * 0.04;
    par.y += (par.ty - par.y) * 0.04;

    ctx.clearRect(0, 0, W, H);
    const g = geometry();
    const sat = satellitePos(g, t);

    drawStars(t);
    drawOrbitPath(g);
    const st = drawGroundStation(g);
    if (!sat.front) drawSatellite(sat);
    drawEarth(g, t);
    drawBeam(sat, st, t);
    if (sat.front) drawSatellite(sat);
    drawCaption();

    if (!REDUCED) requestAnimationFrame(frame);
  }

  resize();
  seedStars();
  window.addEventListener("resize", () => { resize(); if (REDUCED) frame(0); }, { passive: true });

  if (REDUCED) frame(45000); // single static frame, satellite + beam geometry visible
  else requestAnimationFrame(frame);
}

/* ---------------- card tilt ---------------- */
function initTilt() {
  if (REDUCED) return;
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateX(${(-dy * 5).toFixed(2)}deg) rotateY(${(dx * 5).toFixed(2)}deg) translateY(-3px)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
}

/* ---------------- scroll reveal ---------------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (REDUCED || !("IntersectionObserver" in window)) {
    items.forEach((n) => n.classList.add("revealed"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("revealed"); io.unobserve(en.target); }
    });
  }, { threshold: 0.18 });
  items.forEach((n) => io.observe(n));
}

document.addEventListener("DOMContentLoaded", () => {
  fillFacts();
  initScene();
  initTilt();
  initReveal();
});
