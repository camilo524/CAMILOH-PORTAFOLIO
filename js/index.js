/* ═══════════════════════════════════════════════
   Camiloh — Index
   Birds (fixed) · cursor · nav · headline · portfolio · obras lightbox
═══════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ---------- custom cursor — follows mouse instantly ---------- */
  const cursor = document.getElementById("cursor");
  if (cursor && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.transform =
        `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)` +
        (cursor.classList.contains("hover") ? " scale(1.1)" : "");
    }, { passive: true });
    document.querySelectorAll("a, button, .folio-card, .obra-card").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });
  }

  /* ---------- fondo sunset — el sol sigue el cursor; el atardecer lo controla el scroll ---------- */
  (function () {
    const sky = document.getElementById("sbSky");
    const sunDay = document.getElementById("sbSunDay");
    const sun = document.getElementById("sbSun");
    const sunSet = document.getElementById("sbSunSet");
    const horizon = document.getElementById("sbHorizon");
    const darkness = document.getElementById("sbDarkness");
    if (!sky || !sunDay || !sun || !sunSet || !horizon || !darkness) return;

    /* ── Ajustes rápidos ─────────────────────────────────────────── */
    const APPROACH = 0.8;     // cuánto ANTES del footer empieza el atardecer (en alturas de pantalla)
    const SUNSET_LOOK = 0.5;  // look final = el de "cursor a media pantalla" (el que te gusta)
    const DAY_EDGE = 0;       // 0 = cielo de día sin oscurecer por el sol · sube (0–1) si quieres algo de viñeta
    const DARK_DELAY = 2.2;   // >1 retrasa lo oscuro (bordes del sol, fondo, halo rojo) hacia el final del atardecer
    const BASE_DAY = [150, 205, 250];  // color que queda detrás del cielo durante la transición (claro)
    const BASE_NIGHT = [11, 26, 46];   // color final detrás del cielo (el azul noche de antes)
    const SUN_OPACITY = 0.5;  // intensidad fija del sol (antes cambiaba con la altura del cursor)
    const MAX_DARKNESS = 0;   // oscuridad extra al llegar al footer (0 = sin oscurecer)

    const bg = document.getElementById("sunsetBg");
    const footer = document.querySelector(".pf-footer");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = window.innerWidth;
    let h = window.innerHeight;
    let x = w * 0.5;
    let y = h * 0.32; // estado inicial: sol a media mañana, arriba del centro
    let ticking = false;

    const clamp01 = (n) => Math.max(0, Math.min(n, 1));
    const smooth = (t) => t * t * (3 - 2 * t);
    const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
    const rgb = (c, a) => "rgba(" + c.join(",") + "," + a + ")";

    // 0 = lejos del footer (día) → 1 = footer en pantalla / final de la página (atardecer)
    function sunsetAmount() {
      let t;
      if (footer) {
        const top = footer.getBoundingClientRect().top;
        const start = h * (1 + APPROACH);      // el footer aún está lejos, debajo de la pantalla
        const end = h - footer.offsetHeight;   // posición del footer al llegar al final del scroll
        t = (start - top) / Math.max(start - end, 1);
      } else {
        const max = document.documentElement.scrollHeight - h;
        const p = max > 0 ? window.scrollY / max : 0;
        t = (p - 0.7) / 0.3;
      }
      return smooth(clamp01(t));
    }

    function paint() {
      const sunset = sunsetAmount();

      // Color del sol: blanco cálido de día → amarillo al acercarse al footer
      const c3  = mix([255, 252, 240], [255, 226, 64],  sunset);
      const c8  = mix([255, 244, 214], [252, 208, 52],  sunset);
      const c12 = mix([253, 232, 180], [248, 200, 95],  sunset);
      const cSet = mix([255, 246, 210], [255, 222, 40],  sunset);

      // Bordes oscuros del sol (gris/azul verdoso): de día casi invisibles para que el cielo se vea
      // brillante; aparecen con el atardecer
      const late = Math.pow(sunset, DARK_DELAY);
      const edge = (DAY_EDGE + (1 - DAY_EDGE) * late).toFixed(3);

      const posSun =
        "radial-gradient(circle at " + x + "px " + y + "px, " +
        "rgba(242,248,247,1) 0%," + rgb(c3, 1) + " 3%," + rgb(c8, 1) + " 8%," +
        rgb(c12, 1) + " 12%,rgba(201,165,132," + edge + ") 30%,rgba(140,128,124," + edge + ") 51%," +
        "rgba(46,88,128," + edge + ") 85%,rgba(24,66,110," + edge + ") 100%)";
      const posSunDay =
        "radial-gradient(circle at " + x + "px " + y + "px, " +
        "rgba(252,255,251,0.9) 0%,rgba(253,250,219,0.4) 30%," +
        "rgba(226,219,197,0.01) 70%,rgba(226,219,197,0) 70%,rgba(201,165,132,0) 100%)";
      const posSunSet =
        "radial-gradient(circle at " + x + "px " + y + "px, " +
        "rgba(254,255,255,0.8) 5%," + rgb(cSet, 1) + " 10%,rgba(253,50,41,1) 25%," +
        "rgba(243,0,0,1) 40%,rgba(93,0,0,1) 100%)";

      sun.style.background = posSun;
      sunDay.style.background = posSunDay;
      sunSet.style.background = posSunSet;

      // Todo el color del cielo lo define SOLO el scroll (el cursor solo mueve el sol)
      const R = sunset * SUNSET_LOOK;

      sky.style.opacity = Math.max(0, Math.min(1 - R, 0.99));
      sunDay.style.opacity = Math.max(0, 1 - R);
      sunSet.style.opacity = Math.max(0, SUNSET_LOOK - 0.2) * late;
      horizon.style.opacity = Math.min(0.99, sunset * 0.99);
      darkness.style.opacity = MAX_DARKNESS * sunset;
      if (bg) bg.style.backgroundColor = rgb(mix(BASE_DAY, BASE_NIGHT, late), 1);
      sun.style.opacity = SUN_OPACITY; // constante: mover el cursor no oscurece ni aclara el fondo
    }

    function schedule() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        paint();
        ticking = false;
      });
    }

    paint();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", () => {
      w = window.innerWidth;
      h = window.innerHeight;
      schedule();
    }, { passive: true });
    window.addEventListener("load", schedule); // las imágenes cambian la altura de la página

    if (!reduce) {
      window.addEventListener("mousemove", (e) => {
        x = e.clientX;
        y = e.clientY;
        schedule();
      }, { passive: true });
      window.addEventListener("touchmove", (e) => {
        if (e.touches && e.touches[0]) {
          x = e.touches[0].clientX;
          y = e.touches[0].clientY;
          schedule();
        }
      }, { passive: true });
    }
  })();

  /* ---------- mobile nav ---------- */
  const nav = document.querySelector("nav");
  const navToggle = document.getElementById("navToggle");
  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    });
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });
  }

      /* ---------- birds — entran desde la izquierda (estilo CodePen) ---------- */
  const canvas = document.getElementById("birds");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const birds = [];
    const COUNT = reduce ? 12 : 32;
    let logicalW = 0;
    let logicalH = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      logicalW = window.innerWidth;
      logicalH = window.innerHeight;
      canvas.width = Math.floor(logicalW * dpr);
      canvas.height = Math.floor(logicalH * dpr);
      canvas.style.width = logicalW + "px";
      canvas.style.height = logicalH + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Nacen FUERA a la izquierda, escalonadas, para entrar suave
    for (let i = 0; i < COUNT; i++) {
      birds.push({
        x: -40 - Math.random() * (logicalW * 0.9) - i * 18,
        y: 40 + Math.random() * (logicalH * 0.7),
        size: 1.2 + Math.random() * 3.2,
        speed: 0.18 + Math.random() * 0.42,
        flap: Math.random() * Math.PI * 2,
        flapSpeed: 0.08 + Math.random() * 0.15,
        driftSeed: Math.random() * 5000,
        turnSeed: Math.random() * 5000,
        opacity: 0.28 + Math.random() * 0.55,
      });
    }

    function drawBird(b, time) {
      const wing = Math.sin(b.flap) * b.size * 0.9;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(Math.sin(time * 0.00012 + b.turnSeed) * 0.25);
      ctx.strokeStyle = `rgba(25, 25, 25, ${b.opacity})`;
      ctx.lineWidth = 1.2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-b.size, wing);
      ctx.lineTo(0, 0);
      ctx.lineTo(b.size, wing);
      ctx.stroke();
      ctx.restore();
    }

    function animate(time) {
      if (document.hidden) {
        requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, logicalW, logicalH);
      birds.forEach((b) => {
        b.flap += b.flapSpeed;
        b.x += b.speed;
        b.y += Math.sin(time * 0.0006 + b.driftSeed) * 0.18;
        // al salir por la derecha, reaparecen fuera a la izquierda
        if (b.x > logicalW + 24) {
          b.x = -24 - Math.random() * 80;
          b.y = 40 + Math.random() * (logicalH * 0.7);
          b.speed = 0.15 + Math.random() * 0.45;
        }
        drawBird(b, time);
      });
      requestAnimationFrame(animate);
    }
    if (!reduce) requestAnimationFrame(animate);

    document.addEventListener("visibilitychange", () => {
      document.body.classList.toggle("tab-hidden", document.hidden);
    });
  }

  /* ---------- headline scroll gradient ---------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll(".headline").forEach((el) => {
      gsap.fromTo(
        el,
        { "--gy": "130vh" },
        {
          "--gy": "-30vh",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.55,
          },
        }
      );
    });
  }

  /* ---------- portfolio cards → trabajos ---------- */
  document.querySelectorAll(".folio-card").forEach((card) => {
    card.addEventListener("click", () => {
      const slug = card.dataset.slug;
      if (slug) window.location.href = "trabajos.html#" + slug;
    });
  });

  /* ---------- obras lightbox ---------- */
  const lb = document.getElementById("lightbox");
  const lbImg = lb && lb.querySelector("img");
  const lbCap = lb && lb.querySelector(".lb-caption");
  const lbClose = lb && lb.querySelector(".lb-close");
  document.querySelectorAll(".obra-card img").forEach((img) => {
    img.addEventListener("click", () => {
      if (!lb || !lbImg) return;
      lbImg.src = img.src;
      if (lbCap) lbCap.textContent = img.alt || "";
      lb.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });
  function closeLb() {
    if (!lb) return;
    lb.classList.remove("open");
    document.body.style.overflow = "";
  }
  if (lbClose) lbClose.addEventListener("click", closeLb);
  if (lb) lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLb();
  });

  /* ---------- entrance animations ---------- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animated = document.querySelectorAll("[data-animate]");
  if (animated.length) {
    const groups = new Map();
    animated.forEach((el) => {
      if (el.dataset.animate !== "card") return;
      const parent = el.parentElement;
      const list = groups.get(parent) || [];
      list.push(el);
      groups.set(parent, list);
    });
    groups.forEach((list) => {
      list.forEach((el, i) => el.style.setProperty("--d", `${Math.min(i * 0.08, 0.42)}s`));
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      animated.forEach((el) => el.classList.add("in-view"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
      );
      animated.forEach((el) => io.observe(el));
    }
  }
})();
