/* ═══════════════════════════════════════════════
   Camiloh — Index (Day) v2
   Birds · cursor (no lag) · nav · headline · portfolio
═══════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ---------- custom cursor — follows mouse instantly ---------- */
  const cursor = document.getElementById("cursor");
  if (cursor && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)${cursor.classList.contains("hover") ? " scale(1.1)" : ""}`;
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

  /* ---------- birds — more visible / more presence ---------- */
  const canvas = document.getElementById("birds");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let birds = [];
    const COUNT = reduce ? 12 : 42;

    function resize() {
      canvas.width = innerWidth * devicePixelRatio;
      canvas.height = innerHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }
    resize();
    addEventListener("resize", resize);

    for (let i = 0; i < COUNT; i++) {
      birds.push({
        x: Math.random() * innerWidth,
        y: 20 + Math.random() * (innerHeight * 0.72),
        size: 1.4 + Math.random() * 3.6,
        speed: 0.22 + Math.random() * 0.55,
        flap: Math.random() * Math.PI * 2,
        flapSpeed: 0.08 + Math.random() * 0.16,
        driftSeed: Math.random() * 5000,
        turnSeed: Math.random() * 5000,
        opacity: 0.35 + Math.random() * 0.55,
      });
    }

    function drawBird(b, time) {
      const wing = Math.sin(b.flap) * b.size * 0.95;
      ctx.save();
      ctx.translate(b.x, b.y);
      const heading = Math.sin(time * 0.00012 + b.turnSeed) * 0.28;
      ctx.rotate(heading);
      ctx.strokeStyle = `rgba(18, 28, 52, ${b.opacity})`;
      ctx.lineWidth = 1.35;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-b.size, wing);
      ctx.lineTo(0, 0);
      ctx.lineTo(b.size, wing);
      ctx.stroke();
      ctx.restore();
    }

    function animate(time) {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      birds.forEach((b) => {
        b.flap += b.flapSpeed;
        b.x += b.speed;
        b.y += Math.sin(time * 0.00055 + b.driftSeed) * 0.2;
        if (b.x > innerWidth + 28) {
          b.x = -28;
          b.y = 20 + Math.random() * (innerHeight * 0.72);
          b.speed = 0.2 + Math.random() * 0.55;
        }
        drawBird(b, time);
      });
      requestAnimationFrame(animate);
    }
    if (!reduce) requestAnimationFrame(animate);
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

  document.addEventListener("visibilitychange", () => {
    document.body.classList.toggle("tab-hidden", document.hidden);
  });
})();
