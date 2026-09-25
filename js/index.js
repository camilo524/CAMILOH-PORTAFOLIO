/* ═══════════════════════════════════════════════
   Camiloh — Index
   Birds · cursor · sunset · nav · portfolio · lightbox
   Optimizado con IntersectionObserver (videos, marquee, animaciones)
═══════════════════════════════════════════════ */

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasIO = "IntersectionObserver" in window;
  let onToolsToggle = null; /* lo asigna el bloque "obras: igualar alto" más abajo */

  /* ---------- custom cursor ---------- */
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

    const APPROACH = 0.8;
    const SUNSET_LOOK = 0.5;
    const DAY_EDGE = 0;
    const DARK_DELAY = 2.2;
    const BASE_DAY = [150, 205, 250];
    const BASE_NIGHT = [11, 26, 46];
    const SUN_OPACITY = 0.5;
    const MAX_DARKNESS = 0;

    const bg = document.getElementById("sunsetBg");
    const footer = document.querySelector(".pf-footer");
    let w = window.innerWidth;
    let h = window.innerHeight;
    let x = w * 0.5;
    let y = h * 0.32;
    let ticking = false;

    const clamp01 = (n) => Math.max(0, Math.min(n, 1));
    const smooth = (t) => t * t * (3 - 2 * t);
    const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
    const rgb = (c, a) => "rgba(" + c.join(",") + "," + a + ")";

    function sunsetAmount() {
      let t;
      if (footer) {
        const top = footer.getBoundingClientRect().top;
        const start = h * (1 + APPROACH);
        const end = h - footer.offsetHeight;
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
      const c3  = mix([255, 252, 240], [255, 226, 64],  sunset);
      const c8  = mix([255, 244, 214], [252, 208, 52],  sunset);
      const c12 = mix([253, 232, 180], [248, 200, 95],  sunset);
      const cSet = mix([255, 246, 210], [255, 222, 40],  sunset);
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

      const R = sunset * SUNSET_LOOK;
      sky.style.opacity = Math.max(0, Math.min(1 - R, 0.99));
      sunDay.style.opacity = Math.max(0, 1 - R);
      sunSet.style.opacity = Math.max(0, SUNSET_LOOK - 0.2) * late;
      horizon.style.opacity = Math.min(0.99, sunset * 0.99);
      darkness.style.opacity = MAX_DARKNESS * sunset;
      if (bg) bg.style.backgroundColor = rgb(mix(BASE_DAY, BASE_NIGHT, late), 1);
      sun.style.opacity = SUN_OPACITY;
    }

    function schedule() {
      if (ticking || document.hidden) return;
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
    window.addEventListener("load", schedule);

    if (!reduceMotion) {
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

  /* ---------- birds — rAF se detiene por completo cuando la pestaña está oculta ---------- */
  const canvas = document.getElementById("birds");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const birds = [];
    const COUNT = reduceMotion ? 12 : 32;
    let logicalW = 0;
    let logicalH = 0;
    let rafId = 0;
    let running = false;

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
      if (!running) return;
      ctx.clearRect(0, 0, logicalW, logicalH);
      birds.forEach((b) => {
        b.flap += b.flapSpeed;
        b.x += b.speed;
        b.y += Math.sin(time * 0.0006 + b.driftSeed) * 0.18;
        if (b.x > logicalW + 24) {
          b.x = -24 - Math.random() * 80;
          b.y = 40 + Math.random() * (logicalH * 0.7);
          b.speed = 0.15 + Math.random() * 0.45;
        }
        drawBird(b, time);
      });
      rafId = requestAnimationFrame(animate);
    }

    function startBirds() {
      if (running || reduceMotion) return;
      running = true;
      rafId = requestAnimationFrame(animate);
    }

    function stopBirds() {
      running = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }

    if (!reduceMotion) {
      startBirds();
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) stopBirds();
        else startBirds();
      });
    }
  }

  /* ---------- IntersectionObserver: videos + marquee (pausa cuando salen de viewport) ---------- */
  if (hasIO && !reduceMotion) {
    /* Videos del showcase: play solo cuando están visibles */
    const videos = document.querySelectorAll(".banded-stripes, .banded-focus");
    if (videos.length) {
      const videoIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const v = entry.target;
            if (!(v instanceof HTMLVideoElement)) return;
            if (entry.isIntersecting) {
              v.play().catch(() => {});
            } else {
              v.pause();
            }
          });
        },
        { threshold: 0.15, rootMargin: "40px 0px" }
      );
      videos.forEach((v) => {
        /* quitar autoplay nativo: el IO controla play/pause */
        v.removeAttribute("autoplay");
        v.pause();
        videoIO.observe(v);
      });
    }

    /* Marquee: pausar animación CSS cuando la sección no está visible */
    const marqueeTrack = document.querySelector(".clients .marquee-track");
    const clientsSection = document.querySelector(".clients") || document.querySelector(".clients-panel");
    if (marqueeTrack && clientsSection) {
      const marqueeIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            marqueeTrack.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
          });
        },
        { threshold: 0.05, rootMargin: "60px 0px" }
      );
      marqueeIO.observe(clientsSection);
    }
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

  /* ---------- programas: accordion (mismo patrón que créditos en trabajos) ---------- */
  document.querySelectorAll(".tool-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".tool-item");
      const list = item && item.querySelector(".tool-skills");
      if (!list) return;
      const open = btn.getAttribute("aria-expanded") === "true";
      const willOpen = !open;

      /* cerrar los demás (acordeón de uno a la vez) */
      document.querySelectorAll(".tool-toggle[aria-expanded='true']").forEach((other) => {
        if (other === btn) return;
        other.setAttribute("aria-expanded", "false");
        const otherList = other.closest(".tool-item") && other.closest(".tool-item").querySelector(".tool-skills");
        if (otherList) otherList.classList.remove("open");
      });

      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      if (willOpen) {
        list.classList.remove("open");
        void list.offsetWidth; /* reinicia animación de entrada */
        list.classList.add("open");
      } else {
        list.classList.remove("open");
      }
      if (onToolsToggle) onToolsToggle();
    });
  });

  /* ---------- obras: igualar alto con el panel de "programas" (≥901px) ----------
     Los 4 cuadros de obras tienen alto fijado por aspect-ratio; el panel de
     programas tiene alto fijado por su contenido. Son dos ejes de cálculo
     distintos que CSS no puede sincronizar solo. Acá se mide el alto real
     del panel (en reposo, sin acordeones abiertos), y se resuelve
     empíricamente qué ancho necesita el bento de obras para llegar a esa
     misma altura, sin tocar los aspect-ratio ni el ancho del panel. ---------- */
  (function () {
    const row = document.querySelector(".obras-tools-row");
    const obrasBento = row && row.querySelector(".obras-bento");
    const toolsSide = row && row.querySelector(".tools-side");
    const toolsPanel = row && row.querySelector(".tools-panel");
    if (!row || !obrasBento || !toolsSide || !toolsPanel) return;

    const obrasSide = row.querySelector(".obras-side");
    const bentoHead = obrasSide && obrasSide.querySelector(".bento-head");
    const mq = window.matchMedia("(min-width: 901px)");
    let fixedTarget = 0; /* alto total que debe alcanzar el panel (con o sin acordeón abierto) */

    function reset() {
      row.style.removeProperty("width");
      row.style.removeProperty("max-width");
      row.style.removeProperty("grid-template-columns");
      obrasBento.style.removeProperty("width");
      toolsPanel.style.removeProperty("padding-bottom");
      fixedTarget = 0;
    }

    /* Ajusta el padding-bottom del panel para que termine siempre en
       `fixedTarget`, sin importar si hay un acordeón abierto (agrega menos
       aire cuando el contenido ya creció) o cerrado (agrega más). */
    function adjustPanelPadding() {
      if (!mq.matches || !fixedTarget) return;
      toolsPanel.style.removeProperty("padding-bottom");
      void toolsPanel.offsetHeight;
      const natural = toolsPanel.getBoundingClientRect().height;
      const basePad = parseFloat(getComputedStyle(toolsPanel).paddingBottom) || 0;
      const extra = Math.max(0, fixedTarget - natural);
      toolsPanel.style.paddingBottom = (basePad + extra) + "px";
    }
    onToolsToggle = adjustPanelPadding;

    function sync() {
      reset();
      if (!mq.matches) return; /* en móvil obras + programas se apilan (ver CSS) */

      /* alto "en reposo" del panel, ignorando acordeones abiertos */
      const openSkills = toolsPanel.querySelectorAll(".tool-skills.open");
      openSkills.forEach((el) => el.classList.remove("open"));
      void toolsPanel.offsetHeight;
      const targetHeight = toolsPanel.getBoundingClientRect().height;
      openSkills.forEach((el) => el.classList.add("open"));

      const toolsWidth = toolsSide.getBoundingClientRect().width;
      if (!targetHeight || !toolsWidth) return;

      const cs = getComputedStyle(row);
      const gap = parseFloat(cs.columnGap) || 0;
      const padX = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);

      /* la relación ancho→alto del bento de obras es prácticamente lineal
         (aspect-ratio + gaps fijos en ese viewport), así que 2 muestras
         alcanzan para resolverla con precisión */
      const w0 = obrasBento.getBoundingClientRect().width || 400;
      obrasBento.style.width = w0 + "px";
      const h0 = obrasBento.getBoundingClientRect().height;

      const w1 = w0 + 140;
      obrasBento.style.width = w1 + "px";
      const h1 = obrasBento.getBoundingClientRect().height;

      const slope = (h1 - h0) / (w1 - w0);
      if (!isFinite(slope) || slope <= 0) { reset(); return; }

      let wTarget = w0 + (targetHeight - h0) / slope;
      wTarget = Math.max(200, wTarget);

      obrasBento.style.width = wTarget + "px";
      const hActual = obrasBento.getBoundingClientRect().height;
      if (Math.abs(hActual - targetHeight) > 1) {
        wTarget = Math.max(200, wTarget + (targetHeight - hActual) / slope);
      }

      /* no desbordar el viewport: si no hay espacio suficiente, se toma lo que haya */
      const available = document.documentElement.clientWidth;
      let rowWidth = wTarget + gap + toolsWidth + padX;
      if (rowWidth > available) {
        rowWidth = available;
        wTarget = Math.max(200, rowWidth - gap - toolsWidth - padX);
      }

      obrasBento.style.removeProperty("width"); /* vuelve a estirarse dentro de su columna */
      row.style.maxWidth = "none";
      row.style.width = rowWidth + "px";
      row.style.gridTemplateColumns = wTarget + "px " + toolsWidth + "px";

      /* el bento de obras arranca más abajo que el panel porque encima tiene
         su propio título ("Obras" + bajada). El panel no tiene ese título
         afuera, así que se calcula un alto total fijo (target) que incluye
         ese mismo espacio, y se mantiene igual sin importar si se abre un
         acordeón (ver adjustPanelPadding). */
      if (bentoHead) {
        const headHeight = bentoHead.getBoundingClientRect().height;
        const sideGap = parseFloat(getComputedStyle(obrasSide).rowGap) || 0;
        fixedTarget = headHeight + sideGap + targetHeight;
        adjustPanelPadding();
      }
    }

    let raf = 0;
    function schedule() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sync);
    }

    schedule();
    window.addEventListener("load", schedule);
    window.addEventListener("resize", schedule, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
    if (mq.addEventListener) mq.addEventListener("change", schedule);
  })();

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

  /* ---------- entrance animations (IntersectionObserver) ---------- */
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

    if (reduceMotion || !hasIO) {
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
