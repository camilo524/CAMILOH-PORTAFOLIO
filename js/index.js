/* ═══════════════════════════════════════════════
   Camiloh — Index (Day)
   Birds · cursor · nav · headline scroll · portfolio links
═══════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ---------- custom cursor ---------- */
  const cursor = document.getElementById("cursor");
  if (cursor && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
    });
    (function loop() {
      cx += (mx - cx) * 0.22;
      cy += (my - cy) * 0.22;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();
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

  /* ---------- birds (CodePen alanhouser/emgEogg adapted for day) ---------- */
  const canvas = document.getElementById("birds");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let birds = [];
    const COUNT = reduce ? 8 : 26;

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
        y: 40 + Math.random() * (innerHeight * 0.55),
        size: 1.1 + Math.random() * 2.8,
        speed: 0.18 + Math.random() * 0.42,
        flap: Math.random() * Math.PI * 2,
        flapSpeed: 0.07 + Math.random() * 0.14,
        driftSeed: Math.random() * 5000,
        turnSeed: Math.random() * 5000,
        opacity: 0.22 + Math.random() * 0.45,
      });
    }

    function drawBird(b, time) {
      const wing = Math.sin(b.flap) * b.size * 0.9;
      ctx.save();
      ctx.translate(b.x, b.y);
      const heading = Math.sin(time * 0.00012 + b.turnSeed) * 0.22;
      ctx.rotate(heading);
      ctx.strokeStyle = `rgba(20, 30, 55, ${b.opacity})`;
      ctx.lineWidth = 1.15;
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
        b.y += Math.sin(time * 0.00055 + b.driftSeed) * 0.16;
        if (b.x > innerWidth + 24) {
          b.x = -24;
          b.y = 40 + Math.random() * (innerHeight * 0.55);
          b.speed = 0.16 + Math.random() * 0.42;
        }
        drawBird(b, time);
      });
      requestAnimationFrame(animate);
    }
    if (!reduce) requestAnimationFrame(animate);
  }

  /* ---------- headline scroll gradient (CodePen shubniggurath/JobNJoP) ---------- */
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

  /* ---------- portfolio cards → trabajos with hash or open panel ---------- */
  document.querySelectorAll(".folio-card").forEach((card) => {
    card.addEventListener("click", () => {
      const slug = card.dataset.slug;
      if (slug) {
        window.location.href = "trabajos.html#" + slug;
      }
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

  /* ---------- pause birds/halation when tab hidden ---------- */
  document.addEventListener("visibilitychange", () => {
    document.body.classList.toggle("tab-hidden", document.hidden);
  });
})();
