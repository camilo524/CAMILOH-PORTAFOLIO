/* ═══════════════════════════════════════════════════════════
   Camiloh — servicios.js
   Smoke type · visor 3D (FBX) · tela · comparador VFX · generar
═══════════════════════════════════════════════════════════ */
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const whenVisible = (el, fn, margin = "0px") => {
  const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { io.disconnect(); fn(); } }, { rootMargin: margin });
  io.observe(el);
};
const loopWhileVisible = (el, tick) => {
  let on = false, raf = 0;
  const frame = (t) => { if (!on) return; tick(t); raf = requestAnimationFrame(frame); };
  new IntersectionObserver((e) => {
    on = e[0].isIntersecting;
    cancelAnimationFrame(raf);
    if (on) raf = requestAnimationFrame(frame);
  }).observe(el);
};
/* cursor personalizado sobre los stages interactivos */
const cursor = $("#cursor");
$$(".svc-stage").forEach((st) => {
  st.addEventListener("pointerenter", () => cursor && cursor.classList.add("hover"));
  st.addEventListener("pointerleave", () => cursor && cursor.classList.remove("hover"));
  st.addEventListener("pointerdown", () => st.classList.add("is-used"), { once: true });
});

/* ───────── Smoke type ───────── */
$$(".smoke-type").forEach((el) => {
  const text = el.textContent.trim();
  const smoke = el.dataset.smoke || getComputedStyle(el.closest(".svc") || el).getPropertyValue("--accent").trim();
  if (smoke) el.style.setProperty("--smoke", smoke);
  el.textContent = "";
  const sr = document.createElement("span");
  sr.className = "sr-only"; sr.textContent = text; el.appendChild(sr);
  let i = 0;
  text.split(" ").forEach((w, wi, all) => {
    const word = document.createElement("span");
    word.className = "st-word"; word.setAttribute("aria-hidden", "true");
    [...w].forEach((ch) => {
      const c = document.createElement("span");
      c.className = "st-char"; c.textContent = ch;
      c.style.setProperty("--cd", (0.1 + i * 0.07).toFixed(2) + "s");
      c.style.setProperty("--dx", ((Math.random() - 0.5) * 0.9).toFixed(2) + "em");
      word.appendChild(c); i++;
    });
    el.appendChild(word);
    if (wi < all.length - 1) el.appendChild(document.createTextNode(" "));
  });
  const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { el.classList.add("in-view"); io.disconnect(); } }, { threshold: 0.5 });
  io.observe(el);
});

/* ───────── Visor 3D (FBX) ─────────
   Pon tu modelo en assets/models/personaje.fbx (animación incluida).
   Mientras no exista se muestra un corredor de ejemplo. */
const stage3d = $(".stage-3d");
if (stage3d) whenVisible(stage3d, async () => {
  const status = $(".svc-status", stage3d);
  try {
    const THREE = await import("three");
    const { FBXLoader } = await import("three/addons/loaders/FBXLoader.js");
    const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    stage3d.prepend(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 1.2, 4.6);
    scene.add(new THREE.HemisphereLight(0xcfd8ff, 0x1a1040, 1.4));
    const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(3, 5, 4); scene.add(key);
    const rim = new THREE.DirectionalLight(0x7c5cff, 2.4); rim.position.set(-4, 2, -3); scene.add(rim);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.95, 0);
    controls.enableZoom = false; controls.enablePan = false; controls.enableDamping = true;
    controls.minPolarAngle = Math.PI * 0.35; controls.maxPolarAngle = Math.PI * 0.55;
    stage3d.tabIndex = 0; controls.listenToKeyEvents(stage3d);

    const resize = () => {
      const w = stage3d.clientWidth, h = stage3d.clientHeight;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    new ResizeObserver(resize).observe(stage3d); resize();

    const clock = new THREE.Clock();
    let mixer = null, runner = null;
    const done = () => status && status.classList.add("is-gone");

    const makeRunner = () => {   /* corredor de ejemplo */
      const mat = new THREE.MeshStandardMaterial({ color: 0x8b6bff, roughness: 0.5 });
      const g = new THREE.Group();
      const part = (geo, x, y, z) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); return m; };
      g.add(part(new THREE.CapsuleGeometry(0.22, 0.5, 6, 12), 0, 1.15, 0));
      g.add(part(new THREE.SphereGeometry(0.2, 20, 16), 0, 1.72, 0));
      const limb = (x, y, len) => { const p = new THREE.Group(); p.position.set(x, y, 0); const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, len, 4, 8), mat); m.position.y = -len / 2; p.add(m); g.add(p); return p; };
      g.userData.limbs = [limb(-0.34, 1.4, 0.5), limb(0.34, 1.4, 0.5), limb(-0.12, 0.82, 0.65), limb(0.12, 0.82, 0.65)];
      return g;
    };
    const fallback = () => { runner = makeRunner(); scene.add(runner); done(); };

    new FBXLoader().load(stage3d.dataset.model, (obj) => {
      const box = new THREE.Box3().setFromObject(obj);
      const s = 1.8 / (box.max.y - box.min.y || 1);
      obj.scale.setScalar(s);
      const b2 = new THREE.Box3().setFromObject(obj);
      obj.position.set(-(b2.min.x + b2.max.x) / 2, -b2.min.y, -(b2.min.z + b2.max.z) / 2);
      scene.add(obj);
      if (obj.animations.length) { mixer = new THREE.AnimationMixer(obj); mixer.clipAction(obj.animations[0]).play(); }
      done();
    }, undefined, fallback);

    loopWhileVisible(stage3d, () => {
      const dt = clock.getDelta(), t = clock.elapsedTime;
      if (mixer) mixer.update(dt);
      if (runner) {
        const [la, ra, ll, rl] = runner.userData.limbs, a = Math.sin(t * 9) * 0.9;
        la.rotation.x = a; ra.rotation.x = -a; ll.rotation.x = -a; rl.rotation.x = a;
        runner.position.y = Math.abs(Math.sin(t * 9)) * 0.06;
      }
      controls.update();
      renderer.render(scene, camera);
    });
  } catch (err) {
    console.warn("Visor 3D no disponible", err);
    if (status) status.textContent = "Vista 3D no disponible";
  }
}, "200px");

/* ───────── Tela (verlet) ───────── */
const stageCloth = $(".stage-cloth");
if (stageCloth) {
  const cv = $("canvas", stageCloth), ctx = cv.getContext("2d");
  const COLS = 22, ROWS = 13;
  let W, H, pts, links, spx, spy, drag = null, mouse = { x: 0, y: 0 };
  const build = () => {
    const dpr = Math.min(devicePixelRatio, 2);
    W = stageCloth.clientWidth; H = stageCloth.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cw = Math.min(W * 0.74, 540); spx = cw / (COLS - 1); spy = spx * 0.92;
    const x0 = (W - cw) / 2, y0 = H * 0.13;
    pts = []; links = [];
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      const x = x0 + c * spx, y = y0 + r * spy;
      pts.push({ x, y, px: x, py: y, pin: r === 0 && (c % 7 === 0 || c === COLS - 1) });
    }
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      const i = r * COLS + c;
      if (c < COLS - 1) links.push([i, i + 1, spx]);
      if (r < ROWS - 1) links.push([i, i + COLS, spy]);
    }
  };
  const pos = (e) => { const b = cv.getBoundingClientRect(); return { x: e.clientX - b.left, y: e.clientY - b.top }; };
  cv.addEventListener("pointerdown", (e) => {
    mouse = pos(e); let best = 80 * 80;
    pts.forEach((p, i) => { const d = (p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2; if (d < best) { best = d; drag = i; } });
    if (drag !== null) { cv.setPointerCapture(e.pointerId); stageCloth.classList.add("is-drag"); }
  });
  cv.addEventListener("pointermove", (e) => { if (drag !== null) mouse = pos(e); });
  const release = () => { drag = null; stageCloth.classList.remove("is-drag"); };
  cv.addEventListener("pointerup", release); cv.addEventListener("pointercancel", release);
  new ResizeObserver(build).observe(stageCloth); build();

  const shade = (r, g, b, k) => `rgb(${Math.min(255, r * k) | 0},${Math.min(255, g * k) | 0},${Math.min(255, b * k) | 0})`;
  loopWhileVisible(stageCloth, (t) => {
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i]; if (p.pin) continue;
      const vx = (p.x - p.px) * 0.985, vy = (p.y - p.py) * 0.985;
      const wind = reduce ? 0 : Math.sin(t * 0.0018 + (i % COLS) * 0.35) * 0.05;
      p.px = p.x; p.py = p.y; p.x += vx + wind; p.y += vy + 0.32;
    }
    if (drag !== null) { const p = pts[drag]; p.x = p.px = mouse.x; p.y = p.py = mouse.y; }
    for (let k = 0; k < 8; k++) for (const [a, b, len] of links) {
      const A = pts[a], B = pts[b], dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy) || 1, f = (d - len) / d / 2;
      const ax = A.pin || a === drag ? 0 : 1, bx = B.pin || b === drag ? 0 : 1, s = ax + bx || 1;
      A.x += dx * f * 2 * ax / s; A.y += dy * f * 2 * ax / s; B.x -= dx * f * 2 * bx / s; B.y -= dy * f * 2 * bx / s;
    }
    ctx.clearRect(0, 0, W, H);
    for (let r = 0; r < ROWS - 1; r++) for (let c = 0; c < COLS - 1; c++) {
      const p0 = pts[r * COLS + c], p1 = pts[r * COLS + c + 1], p2 = pts[(r + 1) * COLS + c + 1], p3 = pts[(r + 1) * COLS + c];
      const ex = p1.x - p0.x, ey = p1.y - p0.y, fx = p3.x - p0.x, fy = p3.y - p0.y;
      const skew = (ex * fy - ey * fx) / (spx * spy);
      const k = Math.max(0.45, Math.min(1.2, 0.55 + 0.45 * skew + (ey / (Math.hypot(ex, ey) || 1)) * 0.4));
      const m = r / (ROWS - 1);
      ctx.fillStyle = ctx.strokeStyle = shade(255 - m * 15, 179 - m * 60, 143 + m * 20, k);
      ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.lineTo(p3.x, p3.y); ctx.closePath();
      ctx.fill(); ctx.lineWidth = 0.8; ctx.stroke();
    }
    ctx.strokeStyle = "#F7F1E1"; ctx.lineWidth = 4; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(pts[0].x - 10, pts[0].y - 3); ctx.lineTo(pts[COLS - 1].x + 10, pts[COLS - 1].y - 3); ctx.stroke();
  });
}

/* ───────── Comparador VFX ───────── */
const cmp = $(".cmp");
if (cmp) {
  const set = (pct) => {
    pct = Math.max(0, Math.min(100, pct));
    cmp.style.setProperty("--pos", pct + "%"); cmp.setAttribute("aria-valuenow", Math.round(pct));
  };
  const fromEvent = (e) => { const b = cmp.getBoundingClientRect(); set(((e.clientX - b.left) / b.width) * 100); };
  let down = false;
  cmp.addEventListener("pointerdown", (e) => { down = true; cmp.setPointerCapture(e.pointerId); fromEvent(e); });
  cmp.addEventListener("pointermove", (e) => { if (down) fromEvent(e); });
  cmp.addEventListener("pointerup", () => (down = false));
  cmp.addEventListener("pointercancel", () => (down = false));
  cmp.addEventListener("keydown", (e) => {
    const v = +cmp.getAttribute("aria-valuenow");
    const next = { ArrowLeft: v - 5, ArrowRight: v + 5, Home: 0, End: 100 }[e.key];
    if (next !== undefined) { e.preventDefault(); set(next); }
  });
  if (!reduce) whenVisible(cmp, () => {   /* pequeño vaivén inicial para mostrar que se arrastra */
    const t0 = performance.now();
    (function peek(t) {
      if (down) return;
      const k = (t - t0) / 1800;
      if (k < 1) { set(50 + Math.sin(k * Math.PI * 2) * 18); requestAnimationFrame(peek); } else set(50);
    })(t0);
  });
}

/* ───────── Generar imagen / video ─────────
   Cambia RESULTADOS por tus generaciones reales con IA (imagen + prompt). */
const RESULTADOS = [
  { img: "https://media.camiloh.co/PALOMA%20MAMI/cover.webp", prompt: "Personaje estilizado, luz de estudio, fondo pastel" },
  { img: "https://media.camiloh.co/MINISO%20NAVIDAD/cover.webp", prompt: "Producto flotando entre humo suave, estética publicitaria" },
  { img: "https://media.camiloh.co/LATE%20DEL%20SUR/cover.webp", prompt: "Escena de videoclip, luz de neón, cámara lenta" },
  { img: "https://media.camiloh.co/CLUB%20COLOMBIA/cover.webp", prompt: "Paisaje al atardecer, cielo cálido, look cinematográfico" },
];
const gen = $("[data-gen]");
if (gen) {
  const frame = $(".gen-frame", gen), img = $(".gen-img", gen), promptEl = $(".gen-prompt", gen), go = $(".gen-go", gen);
  let n = 0;
  RESULTADOS.forEach((r) => { new Image().src = r.img; });
  const show = (r) => { img.src = r.img; promptEl.textContent = r.prompt; };
  show(RESULTADOS[0]);
  $$(".gen-seg button", gen).forEach((b) => b.addEventListener("click", () => {
    $$(".gen-seg button", gen).forEach((o) => o.setAttribute("aria-pressed", String(o === b)));
    frame.classList.toggle("is-video", b.dataset.mode === "video");
  }));
  const typeText = (txt) => new Promise((res) => {
    if (reduce) { promptEl.textContent = txt; return res(); }
    let i = 0; promptEl.textContent = "";
    const id = setInterval(() => { promptEl.textContent = txt.slice(0, ++i); if (i >= txt.length) { clearInterval(id); res(); } }, 22);
  });
  go.addEventListener("click", async () => {
    n = (n + 1) % RESULTADOS.length; const r = RESULTADOS[n];
    go.disabled = true; go.textContent = "Generando…"; frame.setAttribute("aria-busy", "true");
    await typeText(r.prompt);
    frame.classList.add("is-loading");
    await new Promise((res) => setTimeout(res, reduce ? 300 : 1600));
    img.src = r.img;
    frame.classList.remove("is-loading"); frame.removeAttribute("aria-busy");
    go.disabled = false; go.textContent = "Generar otra";
  });
}
