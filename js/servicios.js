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

/* ───────── Hoja de vidrio que se dobla (folding bill) ─────────
   Port a JS puro del bloque "Folding bill": una rejilla de puntos unidos
   por resortes que no se estiran (Verlet). Agarras un punto y el resto
   lo sigue; al soltar vuelve a quedar plana. */
const BILL = { nx: 46, ny: 20, w: 3.0, h: 3.0 / 2.35, cam: 3.95, tilt: [-0.32, 0.22, -0.06], fw: 340, fh: 240 };
const SPILL = 2, REACH = 1.5, CREASE = 0.55, ICE = 0xdde8f0, CORNER = 0.09;
const STIFFNESS = 40, SETTLE = 0;   /* rigidez (papel ↔ seda) y rapidez con que vuelve a quedar plana */

const billInset = (x, y, W, H) => {
  const r = CORNER * H, qx = Math.max(r - x, x - (W - 1 - r), 0), qy = Math.max(r - y, y - (H - 1 - r), 0);
  return qx > 0 && qy > 0 ? r - Math.hypot(qx, qy) : Math.min(x, y, W - 1 - x, H - 1 - y);
};
const billOutline = (W, H) => {
  const c = document.createElement("canvas"); c.width = W; c.height = H;
  const g = c.getContext("2d");
  g.fillStyle = "#000"; g.fillRect(0, 0, W, H); g.fillStyle = "#fff";
  g.beginPath(); g.roundRect(0, 0, W, H, CORNER * H); g.fill();
  return c;
};
/* relieve de la hoja: borde "inflado" para que se lea gruesa */
const billPlain = () => {
  const W = 1024, H = 437, RIM = 34;
  const c = document.createElement("canvas"); c.width = W; c.height = H;
  const g = c.getContext("2d"), d = g.createImageData(W, H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4, e = Math.min(1, billInset(x, y, W, H) / RIM), puff = e * (2 - e);
    d.data[i] = d.data[i + 1] = d.data[i + 2] = Math.min(255, 46 + 84 * puff); d.data[i + 3] = 255;
  }
  g.putImageData(d, 0, 0);
  const out = document.createElement("canvas"); out.width = W; out.height = H;
  const o = out.getContext("2d"); o.filter = "blur(0.8px)"; o.drawImage(c, 0, 0);
  return out;
};
/* un estudio para que el vidrio refleje: cuarto oscuro con cajas de luz */
const billStudio = (THREE, pmrem) => {
  const room = new THREE.Scene();
  room.add(new THREE.Mesh(new THREE.BoxGeometry(40, 40, 40), new THREE.MeshBasicMaterial({ color: 0x1c2026, side: THREE.BackSide })));
  const panel = (w, h, x, y, z, glow) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color().setScalar(glow), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.lookAt(0, 0, 0); room.add(m);
  };
  panel(14, 5, -4, 9, 9, 3.2); panel(3, 16, 12, 0, 6, 2.4); panel(16, 3, 0, -10, 6, 1.2); panel(20, 20, 0, 0, 16, 0.55); panel(10, 10, -12, 2, 2, 0.8);
  return pmrem.fromScene(room, 0.03).texture;
};

function mountBill(THREE, el) {
  const light = matchMedia("(pointer: coarse), (max-width: 760px)").matches;   /* en celular: más liviano y se duerme */
  const renderer = new THREE.WebGLRenderer({ antialias: !light, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, light ? 1.25 : 2));
  renderer.setSize(BILL.fw * SPILL, BILL.fh * SPILL, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.25;
  const cv = renderer.domElement; cv.className = "fbill-gl";
  Object.assign(cv.style, { width: `${SPILL * 100}%`, height: `${SPILL * 100}%`, left: `${(-(SPILL - 1) / 2) * 100}%`, top: `${(-(SPILL - 1) / 2) * 100}%` });
  el.appendChild(cv);

  const scene = new THREE.Scene(), pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = billStudio(THREE, pmrem);
  const camera = new THREE.PerspectiveCamera((2 * Math.atan(SPILL * Math.tan((15 * Math.PI) / 180)) * 180) / Math.PI, BILL.fw / BILL.fh, 0.1, 50);
  camera.position.set(0, 0, BILL.cam);
  const { nx: NX, ny: NY, w: BW, h: BH } = BILL;

  const geo = new THREE.PlaneGeometry(BW, BH, NX - 1, NY - 1), P = geo.attributes.position, N = P.count;
  const rest = new Float32Array(P.array), pos = new Float32Array(rest), prev = new Float32Array(rest);
  const links = [], id = (i, j) => j * NX + i;
  const add = (a, b, k) => links.push({ a, b, len: Math.hypot(rest[a * 3] - rest[b * 3], rest[a * 3 + 1] - rest[b * 3 + 1]), k });
  for (let j = 0; j < NY; j++) for (let i = 0; i < NX; i++) {
    if (i < NX - 1) add(id(i, j), id(i + 1, j), 1);
    if (j < NY - 1) add(id(i, j), id(i, j + 1), 1);
    if (i < NX - 1 && j < NY - 1) { add(id(i, j), id(i + 1, j + 1), 0.7); add(id(i + 1, j), id(i, j + 1), 0.7); }
    if (i < NX - 2) add(id(i, j), id(i + 2, j), -1);   /* resortes de flexión: peso según Stiffness */
    if (j < NY - 2) add(id(i, j), id(i, j + 2), -1);
  }

  const mat = new THREE.MeshPhysicalMaterial({
    color: ICE, metalness: 0.3, roughness: 0.2, clearcoat: 0.45, clearcoatRoughness: 0.12,
    envMapIntensity: 0.75, iridescence: 0.12, iridescenceIOR: 1.3, bumpScale: 6, side: THREE.DoubleSide,
  });
  const plain = new THREE.CanvasTexture(billPlain());
  plain.colorSpace = THREE.NoColorSpace; plain.anisotropy = renderer.capabilities.getMaxAnisotropy();
  mat.bumpMap = plain;
  const cut = new THREE.CanvasTexture(billOutline(512, Math.round(512 / 2.35)));   /* esquinas redondeadas por máscara alfa */
  cut.colorSpace = THREE.NoColorSpace; mat.alphaMap = cut; mat.alphaTest = 0.5;
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.set(...BILL.tilt);   /* ladeada para que la luz corra sobre ella */
  scene.add(mesh);

  /* la mano */
  let held = -1, holdZ = 0, touched = performance.now(), flutter = 1, calm = 0;
  const target = new THREE.Vector3(), ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  const toNdc = (e) => { const r = cv.getBoundingClientRect(); ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); };
  const aim = () => {
    ray.setFromCamera(ndc, camera);
    const t = (holdZ - ray.ray.origin.z) / ray.ray.direction.z;
    target.copy(ray.ray.direction).multiplyScalar(t).add(ray.ray.origin);
    mesh.worldToLocal(target);
    if (held >= 0) {   /* la mano tiene alcance: pasado REACH el jalón se vuelve goma */
      const k = held * 3, dx = target.x - rest[k], dy = target.y - rest[k + 1], dz = target.z - rest[k + 2], d = Math.hypot(dx, dy, dz);
      if (d > REACH) { const f = (REACH + (d - REACH) * 0.2) / d; target.set(rest[k] + dx * f, rest[k + 1] + dy * f, rest[k + 2] + dz * f); }
    }
  };
  const down = (e) => {
    toNdc(e); ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObject(mesh)[0];
    if (!hit) return;
    const local = mesh.worldToLocal(hit.point.clone());
    let best = -1, bd = Infinity;
    for (let n = 0; n < N; n++) {
      const d = (pos[n * 3] - local.x) ** 2 + (pos[n * 3 + 1] - local.y) ** 2 + (pos[n * 3 + 2] - local.z) ** 2;
      if (d < bd) { bd = d; best = n; }
    }
    held = best; holdZ = hit.point.z; touched = performance.now(); flutter = 1; calm = 0;
    aim(); el.dataset.held = "true";
    try { el.setPointerCapture(e.pointerId); } catch { /* puntero simulado */ }
    wake();
  };
  const move = (e) => { toNdc(e); if (held >= 0) aim(); };
  const up = (e) => {
    if (held < 0) return;
    held = -1; el.dataset.held = "";
    try { el.releasePointerCapture(e.pointerId); } catch { /* nunca capturado */ }
  };
  el.addEventListener("pointerdown", down); el.addEventListener("pointermove", move);
  el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);

  /* el ciclo */
  let raf = 0, seen = true, running = false, last = performance.now(), clock = 0;
  const H = 1 / 120, PASSES = light ? 9 : 16;
  const step = () => {
    const bend = 0.04 + (STIFFNESS / 100) * 0.5;
    const home = (0.3 + (SETTLE / 100) * 7) * (held >= 0 ? 0.04 : 1);   /* agarrada, casi suelta su deseo de quedar plana */
    for (let n = 0; n < N; n++) {
      const k = n * 3, rx = rest[k], ry = rest[k + 1];
      const rz = Math.sin(rx * 1.25 + 0.6) * 0.16 + Math.cos(ry * 2.2) * 0.04 + (reduce ? 0 : Math.sin(clock * 1.3 + rx * 1.7 + ry * 0.8) * 0.035 * flutter);
      for (let c = 0; c < 3; c++) {
        const p = pos[k + c], v = (p - prev[k + c]) * 0.982, want = c === 0 ? rx : c === 1 ? ry : rz;
        prev[k + c] = p; pos[k + c] = p + v + (want - p) * home * H * H * 60;
      }
    }
    if (held >= 0) { const k = held * 3; pos[k] = target.x; pos[k + 1] = target.y; pos[k + 2] = target.z; }
    for (let it = 0; it < PASSES; it++) for (const l of links) {
      const a = l.a * 3, b = l.b * 3, dx = pos[b] - pos[a], dy = pos[b + 1] - pos[a + 1], dz = pos[b + 2] - pos[a + 2];
      const d = Math.hypot(dx, dy, dz) || 1e-6;
      let w = (l.k < 0 ? bend : l.k) * 0.5 * (d - l.len) / d;
      if (l.k < 0 && d < l.len * CREASE) w = 0.5 * (d - l.len * CREASE) / d;   /* un doblez tiene límite: redondo, nunca filo */
      const pa = l.a === held ? 0 : 1, pb = l.b === held ? 0 : 1, s = pa + pb || 1;
      pos[a] += dx * w * (2 * pa / s); pos[a + 1] += dy * w * (2 * pa / s); pos[a + 2] += dz * w * (2 * pa / s);
      pos[b] -= dx * w * (2 * pb / s); pos[b + 1] -= dy * w * (2 * pb / s); pos[b + 2] -= dz * w * (2 * pb / s);
    }
  };
  const frame = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000); last = now; clock += dt;
    if (held >= 0) touched = now;
    const idle = (now - touched) / 1000;
    if (light) flutter = Math.max(0, Math.min(1, 1 - (idle - 2) / 1.5));
    if (reduce) flutter = 0;
    const n = Math.max(1, Math.round(dt / H));
    for (let s = 0; s < n; s++) step();
    let moved = 0;
    for (let k = 0; k < pos.length; k++) moved = Math.max(moved, Math.abs(pos[k] - prev[k]));
    calm = held < 0 && moved < 2e-4 ? calm + 1 : 0;
    P.array.set(pos); P.needsUpdate = true;
    geo.computeVertexNormals(); geo.computeBoundingSphere();
    renderer.render(scene, camera);
    const sleep = (light || reduce) && flutter === 0 && calm > 20;   /* en celular se duerme cuando queda quieta */
    if (seen && !sleep) raf = requestAnimationFrame(frame); else running = false;
  };
  const wake = () => { if (running || !seen) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); };
  new IntersectionObserver(([row]) => { seen = row.isIntersecting; if (seen) wake(); }).observe(el);
  wake();
}
const stageCloth = $(".stage-cloth");
if (stageCloth) whenVisible(stageCloth, async () => {
  try { mountBill(await import("three"), $(".fbill", stageCloth)); }
  catch (err) { console.warn("Hoja de vidrio no disponible", err); }
}, "200px");

/* ───────── Comparador VFX (image compare) ─────────
   La línea es gelatina: la perilla va donde está el dedo y los extremos la
   siguen con un resorte; el recorte de la capa "antes" usa la misma curva.
   Un empujón rápido la lanza hasta el borde. */
const cmp = $(".cmp");
if (cmp) {
  const before = $(".cmp-before", cmp), after = $(".cmp-after", cmp), svg = $(".cmp-line", cmp), line = $("path", svg);
  const grip = $(".cmp-grip", cmp), tagL = $(".cmp-tag-l", cmp), tagR = $(".cmp-tag-r", cmp);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  let W = 1, H = 1, cur = 0.5, target = null, raf = 0, drag = null;
  const ends = { x: 0.5, v: 0 };
  const draw = (bend = 0) => {
    const x = cur * W, top = x - bend;
    line.setAttribute("d", `M ${top.toFixed(2)} 0 Q ${(x + bend).toFixed(2)} ${H / 2} ${top.toFixed(2)} ${H}`);
    before.style.clipPath = `path("M 0 0 L ${top.toFixed(2)} 0 Q ${(x + bend).toFixed(2)} ${H / 2} ${top.toFixed(2)} ${H} L 0 ${H} Z")`;
    grip.style.left = x + "px";
    after.style.transform = `translateX(${((0.5 - cur) * 14).toFixed(2)}px) scale(1.06)`;   /* la capa de atrás se desplaza un poco */
    tagL.style.opacity = clamp((cur - 0.14) * 4, 0, 1); tagR.style.opacity = clamp((0.86 - cur) * 4, 0, 1);
    cmp.setAttribute("aria-valuenow", Math.round(cur * 100));
  };
  const loop = () => {
    if (raf) return;
    let prev = performance.now();
    const stepFn = (t) => {
      const dt = Math.min(0.033, (t - prev) / 1000); prev = t;
      if (target !== null) {
        cur += (target - cur) * (1 - Math.pow(0.0004, dt));
        if (Math.abs(target - cur) < 0.0005) { cur = target; target = null; }
      }
      ends.v += ((cur - ends.x) * 620 - ends.v * 44) * dt; ends.x += ends.v * dt;   /* resorte de los extremos */
      const lim = Math.min(26, 9 * (W / 270));
      draw(clamp((cur - ends.x) * W * 0.5, -lim, lim));
      const calmed = target === null && Math.abs(cur - ends.x) < 0.0006 && Math.abs(ends.v) < 0.002;
      if (calmed) { ends.x = cur; ends.v = 0; draw(0); raf = 0; return; }
      raf = requestAnimationFrame(stepFn);
    };
    raf = requestAnimationFrame(stepFn);
  };
  const glide = (to) => { target = to; loop(); };
  const place = (v) => { target = null; cur = v; loop(); };
  const at = (cx) => { const r = cmp.getBoundingClientRect(); return clamp((cx - r.left) / r.width, 0, 1); };
  new ResizeObserver(() => { const b = cmp.getBoundingClientRect(); W = b.width; H = b.height; svg.setAttribute("viewBox", `0 0 ${W} ${H}`); draw(); }).observe(cmp);

  cmp.addEventListener("pointerdown", (e) => {
    try { cmp.setPointerCapture(e.pointerId); } catch { /* puntero simulado */ }
    const v = at(e.clientX); drag = { v: 0, t: performance.now(), last: v }; cmp.dataset.held = "true"; glide(v);
  });
  cmp.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const v = at(e.clientX), now = performance.now();
    drag.v = (v - drag.last) / Math.max(1, now - drag.t); drag.t = now; drag.last = v; place(v);
  });
  const release = (e) => {
    const d = drag; drag = null; cmp.dataset.held = "";
    try { cmp.releasePointerCapture(e.pointerId); } catch { /* nunca capturado */ }
    if (d && Math.abs(d.v) > 0.0025) glide(d.v > 0 ? 1 : 0);   /* un empujón la lanza al borde */
  };
  cmp.addEventListener("pointerup", release);
  cmp.addEventListener("pointercancel", () => { drag = null; cmp.dataset.held = ""; });
  cmp.addEventListener("keydown", (e) => {
    const base = target ?? cur;
    const next = { ArrowLeft: base - 0.1, ArrowRight: base + 0.1, Home: 0, End: 1 }[e.key];
    if (next !== undefined) { e.preventDefault(); glide(clamp(next, 0, 1)); }
  });
  if (!reduce) whenVisible(cmp, () => { glide(0.32); setTimeout(() => { if (!drag) glide(0.5); }, 700); });   /* pequeño vaivén inicial */
}

/* ───────── Generar imagen / video ─────────
   La imagen aparece en tres escalas, como una generada: primero las formas
   (muy borrosa y con contraste), luego la forma y, al final, el grano nítido.
   Cambia RESULTADOS por tus generaciones reales con IA (imagen + prompt). */
const RESULTADOS = [
  { img: "https://media.camiloh.co/CLUBCOLOMBIA/cover.webp", prompt: "Diorama 3D cutout, colonial town, papercraft art style, warm lighting." },
  { img: "https://media.camiloh.co/LATEDELSUR/01.webp", prompt: "3D Pixar character, capybara archer, dramatic stadium lighting, octane render." },
  { img: "https://media.camiloh.co/RUTINARIO/cover.webp", prompt: "Stylized 3D character render, exhausted businessman, cinematic interior, Octane." },
];
const gen = $("[data-gen]");
if (gen) {
  const PAPER = 0.9, PACE = 4.5, RIPPLE = 50;   /* PACE = segundos de la aparición; RIPPLE = qué tan líquida es */
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const mix = (a, b, t) => a + (b - a) * t;
  const smooth = (a, b, v) => { const u = clamp((v - a) / (b - a), 0, 1); return u * u * (3 - 2 * u); };
  const rnd = (a, b) => a + Math.random() * (b - a);
  /* el contador lleva su propio ritmo: arranque rápido, tramo lento, ráfaga, pausa, ráfaga y arrastre final */
  const knots = () => [[0, 0], [rnd(0.1, 0.16), rnd(0.1, 0.16)], [rnd(0.32, 0.38), rnd(0.22, 0.3)], [rnd(0.44, 0.49), rnd(0.5, 0.6)],
    [rnd(0.56, 0.61), rnd(0.62, 0.68)], [rnd(0.68, 0.72), rnd(0.84, 0.88)], [1, 1]];
  const along = (ks, t) => {
    for (let i = 1; i < ks.length; i++) {
      const [t0, v0] = ks[i - 1], [t1, v1] = ks[i];
      if (t > t1) continue;
      const u = clamp((t - t0) / (t1 - t0), 0, 1);
      return mix(v0, v1, mix(u, u * u * (3 - 2 * u), 0.5));
    }
    return 1;
  };
  const frame = $(".gen-frame", gen), busyImg = $(".gen-busy", gen), finalImg = $(".gen-final", gen);
  const promptEl = $(".gen-prompt", gen), go = $(".gen-go", gen), pctEl = $(".gen-pct", gen);
  const fx = $("#genFilter"), turb = $("feTurbulence", fx), disp = $("feDisplacementMap", fx), blur = $("feGaussianBlur", fx), funcs = $$("feFuncR, feFuncG, feFuncB", fx);
  let runs = 0, curve = knots(), loading = false;
  RESULTADOS.forEach((r) => { new Image().src = r.img; });

  const apply = (t) => {
    const haze = smooth(0, 0.3, t), form = smooth(0.1, 0.82, t), grain = smooth(0.7, 1, t);
    const sd = mix(20, 1.6, 1 - Math.pow(1 - form, 2.2)), k = mix(2.4, 1, form);
    const warp = (RIPPLE / 100) * 32 * Math.pow(1 - smooth(0.05, 0.9, t), 1.5);
    const f = 0.006 + 0.0018 * Math.sin(t * 4.4), cut = (PAPER - PAPER * k).toFixed(3);
    if (!reduce) {
      turb.setAttribute("baseFrequency", `${f.toFixed(4)} ${(f * 1.3).toFixed(4)}`);
      disp.setAttribute("scale", warp.toFixed(2)); blur.setAttribute("stdDeviation", sd.toFixed(2));
      funcs.forEach((fn) => { fn.setAttribute("slope", k.toFixed(3)); fn.setAttribute("intercept", cut); });
      busyImg.style.opacity = haze * mix(0.7, 1, form);
      busyImg.style.transform = `scale(${mix(1.04, 1, smooth(0, 0.9, t)).toFixed(4)})`;
    }
    finalImg.style.opacity = reduce ? t : grain;
    finalImg.style.filter = reduce ? "" : `blur(${mix(1.6, 0, grain).toFixed(2)}px)`;
    pctEl.textContent = Math.min(99, Math.floor(along(curve, t) * 100)) + "%";
  };
  const typeText = (txt) => new Promise((res) => {
    promptEl.classList.remove("is-empty");
    if (reduce) { promptEl.textContent = txt; return res(); }
    let i = 0; promptEl.textContent = "";
    const id = setInterval(() => { promptEl.textContent = txt.slice(0, ++i); if (i >= txt.length) { clearInterval(id); res(); } }, 22);
  });

  $$(".gen-seg button", gen).forEach((b) => b.addEventListener("click", () => {
    $$(".gen-seg button", gen).forEach((o) => o.setAttribute("aria-pressed", String(o === b)));
    frame.classList.toggle("is-video", b.dataset.mode === "video");
  }));

  go.addEventListener("click", async () => {
    if (loading) return;
    loading = true; go.disabled = true; go.textContent = "Generando…";
    const r = RESULTADOS[runs++ % RESULTADOS.length];
    frame.classList.remove("is-made"); frame.classList.add("is-loading"); frame.setAttribute("aria-busy", "true");
    finalImg.style.opacity = 0; busyImg.style.opacity = 0; finalImg.alt = "";   /* cada vez se rehace desde cero */
    await typeText(r.prompt);
    busyImg.src = finalImg.src = r.img;
    await Promise.all([busyImg.decode(), finalImg.decode()]).catch(() => {});
    curve = knots(); apply(0);
    busyImg.style.filter = reduce ? "" : "url(#genFilter)";
    const total = reduce ? 400 : PACE * 1000;
    await new Promise((res) => {
      let t0 = 0;
      const tick = (now) => {
        if (!t0) t0 = now;
        const v = Math.min(1, (now - t0) / total);
        apply(v);
        if (v < 1) requestAnimationFrame(tick); else res();
      };
      requestAnimationFrame(tick);
    });
    busyImg.style.opacity = 0; busyImg.style.filter = "";
    finalImg.style.opacity = 1; finalImg.style.filter = ""; finalImg.alt = "Resultado de ejemplo generado";
    pctEl.textContent = "100%"; frame.classList.add("is-made");
    setTimeout(() => {   /* el 100 se sostiene un instante para que se vea */
      frame.classList.remove("is-loading"); frame.removeAttribute("aria-busy");
      loading = false; go.disabled = false; go.textContent = "Generar otra";
    }, 650);
  });
}

/* ───────── Luz que sigue al cursor (solo en Servicios) ───────── */
const sec = $(".servicios");
if (sec && matchMedia("(hover: hover) and (pointer: fine)").matches) {
  let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
  const loop = () => {
    cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
    sec.style.setProperty("--mx", cx + "px"); sec.style.setProperty("--my", cy + "px");
    raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.5 ? requestAnimationFrame(loop) : 0;
  };
  sec.addEventListener("pointermove", (e) => {
    const b = sec.getBoundingClientRect(); tx = e.clientX - b.left; ty = e.clientY - b.top;
    if (!sec.classList.contains("is-lit")) { cx = tx; cy = ty; sec.classList.add("is-lit"); }
    if (!raf) raf = requestAnimationFrame(loop);
  });
  sec.addEventListener("pointerleave", () => sec.classList.remove("is-lit"));
}