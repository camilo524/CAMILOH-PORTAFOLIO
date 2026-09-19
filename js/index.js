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
