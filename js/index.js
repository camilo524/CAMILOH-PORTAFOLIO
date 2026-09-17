/* ═══════════════════════════════════════════════
   Camiloh — Index (Day) v4
   Birds · cursor · glass life · scroll reveal · project panels
═══════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ---------- custom cursor (instant) ---------- */
  const cursor = document.getElementById("cursor");
  if (cursor && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.transform =
        `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)` +
        (cursor.classList.contains("hover") ? " scale(1.1)" : "");
    }, { passive: true });
    document.querySelectorAll("a, button, .folio-card, .obra-card, .pp-shot").forEach((el) => {
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

  /* ---------- birds ---------- */
  const canvas = document.getElementById("birds");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const birds = [];
    const COUNT = reduce ? 10 : 38;

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
        y: 20 + Math.random() * (innerHeight * 0.7),
        size: 1.3 + Math.random() * 3.4,
        speed: 0.2 + Math.random() * 0.5,
        flap: Math.random() * Math.PI * 2,
        flapSpeed: 0.08 + Math.random() * 0.14,
        driftSeed: Math.random() * 5000,
        turnSeed: Math.random() * 5000,
        opacity: 0.32 + Math.random() * 0.5,
      });
    }

    function drawBird(b, time) {
      const wing = Math.sin(b.flap) * b.size * 0.95;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(Math.sin(time * 0.00012 + b.turnSeed) * 0.28);
      ctx.strokeStyle = `rgba(18, 28, 52, ${b.opacity})`;
      ctx.lineWidth = 1.3;
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
        b.y += Math.sin(time * 0.00055 + b.driftSeed) * 0.18;
        if (b.x > innerWidth + 28) {
          b.x = -28;
          b.y = 20 + Math.random() * (innerHeight * 0.7);
        }
        drawBird(b, time);
      });
      requestAnimationFrame(animate);
    }
    if (!reduce) requestAnimationFrame(animate);
  }

  /* ---------- headline gradient scrub ---------- */
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

  /* ---------- soft entrance on scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    reveals.forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 0.07 + "s";
      io.observe(el);
    });
  }

  /* ---------- project data + in-page panel ---------- */
  let PROJECTS = [];
  let MEDIA_BASE = "https://media.camiloh.co";
  const panels = {};

  function folderOf(p) {
    if (p && p.folder) return String(p.folder).trim();
    return String((p && p.title) || "").trim().toUpperCase();
  }
  function mediaUrl(p, file) {
    return MEDIA_BASE.replace(/\/$/, "") + "/" + encodeURIComponent(folderOf(p)).replace(/'/g, "%27") + "/" + file;
  }
  function tr(field) {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field.es || field.en || "";
  }
  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function loadProjects() {
    return fetch("data/proyectos.json", { cache: "no-cache" })
      .then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : data && data.projects;
        if (!Array.isArray(list)) throw new Error("bad projects");
        if (data && typeof data.mediaBase === "string" && data.mediaBase.trim()) {
          MEDIA_BASE = data.mediaBase.trim().replace(/\/$/, "");
        }
        PROJECTS = list;
      })
      .catch(() => {
        PROJECTS = [];
      });
  }

  function findBySlug(slug) {
    if (!slug) return null;
    const s = String(slug).toLowerCase();
    return PROJECTS.find((p) => String(p.slug || "").toLowerCase() === s) || null;
  }

  function buildPanel(p) {
    let frames = "";
    for (let n = 1; n <= 6; n++) {
      const num = pad(n);
      frames +=
        '<div class="pp-shot" data-src="' + mediaUrl(p, num + ".webp") + '">' +
        '<img data-src="' + mediaUrl(p, num + ".webp") + '" alt="' + p.title + " " + num + '" loading="lazy">' +
        '<span class="pp-shot-num">' + num + "</span></div>";
    }

    let credits = "";
    const list = Array.isArray(p.credits) ? p.credits : [];
    if (list.length) {
      credits =
        '<div class="pp-credits"><button type="button" class="pp-credits-toggle" aria-expanded="false">Créditos ▾</button>' +
        '<div class="pp-credits-list">' +
        list
          .map((c) => {
            const ig = (c.ig || "").replace(/^@/, "").trim();
            const igHtml =
              ig && /^[\w.]+$/.test(ig)
                ? ' — <a href="https://www.instagram.com/' + ig + '/" target="_blank" rel="noopener">@' + ig + "</a>"
                : "";
            return '<div class="pp-credit-row">' + (c.role || "") + " — " + (c.name || "") + igHtml + "</div>";
          })
          .join("") +
        "</div></div>";
    }

    const panel = document.createElement("div");
    panel.className = "proj-panel";
    panel.dataset.slug = p.slug || "";
    panel.innerHTML =
      '<button class="pp-close" type="button" aria-label="Cerrar">✕</button>' +
      '<div class="proj-panel-inner">' +
      '<div class="pp-media"><video muted loop playsinline controls preload="none" poster="' +
      mediaUrl(p, "cover.webp") +
      '"><source src="' +
      mediaUrl(p, "video.mp4") +
      '" type="video/mp4"></video></div>' +
      '<h2 class="pp-title">' +
      p.title +
      "</h2>" +
      '<p class="pp-desc">' +
      tr(p.desc) +
      "</p>" +
      '<div class="pp-meta-row">' +
      '<div class="pp-meta-block"><span class="pp-meta-label">Año</span><span class="pp-year">' +
      (p.year || "") +
      "</span></div>" +
      '<div class="pp-meta-block"><span class="pp-meta-label">Rol</span><span class="pp-role">' +
      tr(p.role) +
      "</span></div></div>" +
      credits +
      '<div class="pp-gallery">' +
      frames +
      "</div></div>";

    document.body.appendChild(panel);

    panel.querySelector(".pp-close").addEventListener("click", () => closePanel(panel));
    panel.addEventListener("click", (e) => {
      if (e.target === panel) closePanel(panel);
    });
    const credBtn = panel.querySelector(".pp-credits-toggle");
    const credList = panel.querySelector(".pp-credits-list");
    if (credBtn && credList) {
      credBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const open = credList.classList.toggle("open");
        credBtn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
    panel.querySelectorAll(".pp-shot img").forEach((img) => {
      if (img.dataset.src) img.src = img.dataset.src;
    });
    panel.querySelectorAll(".pp-shot").forEach((shot) => {
      shot.addEventListener("click", () => {
        const src = shot.dataset.src || (shot.querySelector("img") && shot.querySelector("img").src);
        if (!src) return;
        const lb = document.getElementById("lightbox");
        const lbImg = lb && lb.querySelector("img");
        if (lb && lbImg) {
          lbImg.src = src;
          lb.classList.add("open");
          document.body.style.overflow = "hidden";
        }
      });
    });

    panels[p.slug] = panel;
    return panel;
  }

  function openPanel(p) {
    if (!p) return;
    let panel = panels[p.slug];
    if (!panel) panel = buildPanel(p);
    panel.classList.add("open");
    document.body.style.overflow = "hidden";
    document.body.classList.add("panel-open");
    const video = panel.querySelector("video");
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }

  function closePanel(panel) {
    if (!panel) return;
    panel.classList.remove("open");
    const video = panel.querySelector("video");
    if (video) video.pause();
    const anyOpen = Object.values(panels).some((pl) => pl.classList.contains("open"));
    if (!anyOpen) {
      document.body.style.overflow = "";
      document.body.classList.remove("panel-open");
    }
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      Object.values(panels).forEach(closePanel);
      const lb = document.getElementById("lightbox");
      if (lb) {
        lb.classList.remove("open");
        document.body.style.overflow = "";
      }
    }
  });

  /* ---------- folio cards open panel (not trabajos redirect) ---------- */
  loadProjects().then(() => {
    document.querySelectorAll(".folio-card").forEach((card) => {
      card.addEventListener("click", () => {
        const slug = card.dataset.slug;
        const p = findBySlug(slug);
        if (p) openPanel(p);
        else console.warn("Proyecto no encontrado:", slug);
      });
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
    if (!document.body.classList.contains("panel-open")) document.body.style.overflow = "";
  }
  if (lbClose) lbClose.addEventListener("click", closeLb);
  if (lb) lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
})();
