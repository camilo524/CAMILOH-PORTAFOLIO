/* ═══════════════════════════════════════════════════════════
   Camiloh — extras.js
   Movimiento al scroll · logros (count-up) · footer
═══════════════════════════════════════════════════════════ */
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const once = (el, fn, threshold = 0.25) => {
  const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { io.disconnect(); fn(); } }, { threshold });
  io.observe(el);
};

/* ───────── Movimiento al scroll ─────────
   Los paneles entran desde abajo con una leve rotación, descansan en el centro
   de la pantalla y salen hacia arriba. Solo se tocan translate / rotate / scale
   / opacity (no compiten con los hover, que usan transform). */
if (!reduce) {
  const items = $$("[data-scroll]").map((el, i) => ({
    el, kind: el.dataset.scroll, amp: parseFloat(el.dataset.amp || "1"),
    sign: i % 2 ? -1 : 1, top: 0, h: 0, on: false,
  }));
  const byEl = new Map(items.map((it) => [it.el, it]));
  const io = new IntersectionObserver((es) => es.forEach((e) => { byEl.get(e.target).on = e.isIntersecting; schedule(); }), { rootMargin: "25% 0px" });
  items.forEach((it) => io.observe(it.el));

  const measure = () => {   /* posición en el documento, sin transformaciones, para que no haya realimentación */
    items.forEach((it) => {
      const s = it.el.style, keep = [s.translate, s.rotate, s.scale];
      s.translate = s.rotate = s.scale = "";
      const b = it.el.getBoundingClientRect();
      it.top = b.top + scrollY; it.h = b.height;
      [s.translate, s.rotate, s.scale] = keep;
    });
  };
  const apply = () => {
    ticking = false;
    const vh = innerHeight, y = scrollY;
    for (const it of items) {
      if (!it.on) continue;
      const p = clamp((it.top + it.h / 2 - y - vh / 2) / (vh / 2 + it.h / 2), -1.2, 1.2);   /* -1 arriba · 0 centro · 1 abajo */
      const s = it.el.style;
      if (it.kind === "rise") {
        const e = Math.max(0, Math.abs(p) - 0.22) / 0.78, dir = Math.sign(p);
        s.translate = `0 ${(dir * e * 70 * it.amp).toFixed(1)}px`;
        s.rotate = `${(dir * it.sign * e * 3.5 * it.amp).toFixed(2)}deg`;
        s.scale = (1 - e * 0.07).toFixed(3);
        s.opacity = (1 - Math.min(1, e) * (p > 0 ? 0.7 : 0.5)).toFixed(2);
      } else if (it.kind === "float") {
        s.translate = `0 ${(-p * 48 * it.amp).toFixed(1)}px`;
      } else if (it.kind === "drift") {
        s.translate = `${(-p * 60 * it.sign * it.amp).toFixed(1)}px 0`;
      }
    }
  };
  let ticking = false;
  function schedule() { if (!ticking) { ticking = true; requestAnimationFrame(apply); } }
  const remeasure = () => { measure(); schedule(); };
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", remeasure);
  addEventListener("load", remeasure);
  new ResizeObserver(remeasure).observe(document.body);
  remeasure();
}

/* ───────── Logros: entrada + contadores ───────── */
const achv = $(".achv");
if (achv) {
  const nums = $$(".stat-num[data-count]", achv);
  const ease = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));   /* expo out: arranca rápido y se asienta */
  const fmt = (el, v) => (el.textContent = (el.dataset.prefix || "") + v + (el.dataset.suffix || ""));
  if (!reduce) nums.forEach((el) => fmt(el, 0));
  once(achv, () => {
    achv.classList.add("in");
    if (reduce) return;
    nums.forEach((el, i) => {
      const to = +el.dataset.count, t0 = performance.now() + 350 + i * 150;
      (function tick(now) {
        const t = clamp((now - t0) / 1800, 0, 1);
        fmt(el, Math.round(to * ease(t)));
        if (t < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, 0.3);
}

/* ───────── Footer ───────── */
const ft = $(".ft");
if (ft) {
  once(ft, () => ft.classList.add("in"), 0.15);
  $(".ft-up", ft)?.addEventListener("click", () => scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));
}

/* ───────── Luz que sigue al cursor ([data-light]) ───────── */
if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
  $$("[data-light]").forEach((sec) => {
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
  });
}