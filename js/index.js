/* ═══════════════════════════════════════════════
   Camiloh — Index (Day) v5
   Birds · cursor · white panels · full project panels (trabajos parity)
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
    document.querySelectorAll("a, button, .folio-card, .obra-card, .pp-shot, .pp-close, .pp-credits-toggle, .pp-heart").forEach((el) => {
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
      if (document.body.classList.contains("panel-open") || document.hidden) {
        requestAnimationFrame(animate);
        return;
      }
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

  /* ---------- project data + full panels (trabajos parity) ---------- */
  let PROJECTS = [];
  let MEDIA_BASE = "https://media.camiloh.co";
  const projectPanels = {};

  const SPARK_SVG = '<svg class="pp-credits-spark" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7z"/></svg>';
  const HEART_SVG = '<svg viewBox="0 0 24 24"><path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z"/></svg>';
  const IG_SVG = '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg>';
  const MAIL_SVG = '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 6.5 8 6.5 8-6.5"/></svg>';

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

  function createRainFX(canvas, accentRgb) {
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    let w = 0, h = 0, rafId = null, drops = [], bokehs = [], t0 = 0;
    const base = accentRgb || "226,59,34";
    const lighten = (rgb, amt) =>
      rgb.split(",").map((v) => Math.round(+v + (255 - +v) * amt)).join(",");
    const colors = [base, lighten(base, 0.28), lighten(base, 0.55)];

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, isCoarse ? 1.5 : 2);
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function spawnDrop(anyY) {
      return {
        x: Math.random() * w, y: anyY ? Math.random() * h : -30,
        len: 16 + Math.random() * 30, speed: 300 + Math.random() * 280,
        drift: 24 + Math.random() * 16, alpha: 0.22 + Math.random() * 0.4,
        lw: 0.7 + Math.random() * 1.1
      };
    }
    function seed() {
      const divisor = isCoarse ? 13000 : 8500;
      const maxCount = isCoarse ? 90 : 150;
      const count = Math.min(Math.max(Math.round((w * h) / divisor), 40), maxCount);
      drops = Array.from({ length: count }, () => spawnDrop(true));
      const bokehCount = isCoarse ? 3 : 6;
      bokehs = Array.from({ length: bokehCount }, (_, i) => ({
        x: Math.random() * w, y: Math.random() * h,
        r: 70 + Math.random() * 100, base: 0.09 + Math.random() * 0.09,
        c: colors[i % colors.length],
        vx: (Math.random() - 0.5) * 7, vy: (Math.random() - 0.5) * 5,
        phase: Math.random() * Math.PI * 2
      }));
    }
    function frame() {
      t0++;
      ctx.clearRect(0, 0, w, h);
      bokehs.forEach((b) => {
        b.x += b.vx * 0.016; b.y += b.vy * 0.016;
        if (b.x < -b.r) b.x = w + b.r; if (b.x > w + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = h + b.r; if (b.y > h + b.r) b.y = -b.r;
        const a = b.base * (0.7 + Math.sin(t0 * 0.01 + b.phase) * 0.3);
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, "rgba(" + b.c + "," + a + ")");
        g.addColorStop(1, "rgba(" + b.c + ",0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.lineCap = "round";
      drops.forEach((d) => {
        d.y += d.speed * 0.016; d.x += d.drift * 0.016;
        if (d.y - d.len > h) Object.assign(d, spawnDrop(false));
        const g = ctx.createLinearGradient(d.x, d.y - d.len, d.x + d.drift * 0.05, d.y);
        g.addColorStop(0, "rgba(247,241,225,0)");
        g.addColorStop(1, "rgba(247,241,225," + d.alpha + ")");
        ctx.strokeStyle = g; ctx.lineWidth = d.lw;
        ctx.beginPath(); ctx.moveTo(d.x, d.y - d.len); ctx.lineTo(d.x + d.drift * 0.05, d.y); ctx.stroke();
      });
      rafId = requestAnimationFrame(frame);
    }
    function onResize() { if (rafId) { resize(); seed(); } }
    window.addEventListener("resize", onResize);
    return {
      start() { if (rafId || reduceMotion) return; resize(); seed(); frame(); },
      stop() { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } }
    };
  }

  function buildCreditsHtml(p) {
    const list = Array.isArray(p.credits) ? p.credits : [];
    let rows = "";
    if (list.length === 0) {
      rows = '<span class="pp-credits-empty">Créditos por agregar.</span>';
    } else {
      list.forEach((c) => {
        const ig = (c.ig || "").replace(/^@/, "").trim();
        const igOk = ig && ig !== "/" && /^[\\w.]+$/.test(ig);
        const igHtml = igOk
          ? ' — <a href="https://www.instagram.com/' + ig + '/" target="_blank" rel="noopener">@' + ig + "</a>"
          : "";
        rows +=
          '<div class="pp-credit-row">' +
          (c.role || "") + " — " + (c.name || "") + igHtml +
          "</div>";
      });
    }
    return (
      '<div class="pp-credits">' +
      '<button type="button" class="pp-credits-toggle" aria-expanded="false">' +
      SPARK_SVG +
      '<span class="pp-credits-label">Créditos</span>' +
      '<span class="pp-credits-chevron" aria-hidden="true"></span>' +
      "</button>" +
      '<div class="pp-credits-list">' + rows + "</div>" +
      "</div>"
    );
  }

  function buildPanel(p) {
    const styleParts = [];
    if (p.accent) styleParts.push("--accent:" + p.accent);
    if (p.rgb) styleParts.push("--accent-rgb:" + p.rgb);
    if (p.deep) styleParts.push("--accent-deep:" + p.deep);
    if (p.hue) styleParts.push("--pp-hue:" + p.hue);

    let frames = "";
    for (let n = 1; n <= 6; n++) {
      const num = pad(n);
      frames +=
        '<div class="pp-shot" data-src="' + mediaUrl(p, num + ".webp") + '">' +
        '<img data-src="' + mediaUrl(p, num + ".webp") + '" alt="' + p.title + " " + num + '" loading="lazy">' +
        '<span class="pp-shot-num">' + num + "</span>" +
        '<span class="pp-shot-zoom">Ampliar</span>' +
        "</div>";
    }

    const slug = p.slug || "";
    const panel = document.createElement("div");
    panel.className = "proj-panel";
    panel.dataset.slug = slug;
    if (styleParts.length) panel.setAttribute("style", styleParts.join("; "));

    panel.innerHTML =
      '<button class="pp-close" type="button" aria-label="Cerrar">✕</button>' +
      '<div class="pp-frame"><div class="proj-panel-inner">' +
      '<canvas class="pp-rain-canvas"></canvas>' +
      '<div class="pp-spot"></div>' +
      '<span class="pp-reel">Rodado en 22mm · Camiloh</span>' +
      '<div class="pp-media-wrap"><div class="pp-media">' +
      '<video class="pp-video video-js vjs-glass" muted loop playsinline controls preload="none" poster="' +
      mediaUrl(p, "cover.webp") +
      '"><source data-src="' +
      mediaUrl(p, "video.mp4") +
      '" type="video/mp4"></video></div></div>' +
      '<div class="pp-head"><div class="pp-head-left">' +
      '<h2 class="pp-title gradient-text">' + p.title + "</h2>" +
      '<p class="pp-desc">' + tr(p.desc) + "</p>" +
      '</div><div class="pp-head-right">' +
      '<div class="pp-meta-block"><span class="pp-meta-label">Año</span>' +
      '<span class="pp-year gradient-text">' + (p.year || "") + "</span></div>' +
      '<div class="pp-meta-block"><span class="pp-meta-label">Rol</span>' +
      '<span class="pp-role">' + tr(p.role) + "</span></div>' +
      "</div></div>" +
      buildCreditsHtml(p) +
      '<div class="pp-gallery">' + frames + "</div>" +
      '<div class="pp-love-card">' +
      '<div class="pp-social-group pp-love-left">' +
      '<a class="pp-social-item" href="https://www.instagram.com/camiloohh/" target="_blank" rel="noopener">' +
      '<span class="pp-social-icon" aria-hidden="true">' + IG_SVG + "</span>" +
      '<span class="pp-social-text"><strong>Instagram</strong><small>@camiloohh</small></span></a>' +
      '<a class="pp-social-item" href="https://www.behance.net/camiloh" target="_blank" rel="noopener">' +
      '<span class="pp-social-icon" aria-hidden="true">Be</span>' +
      '<span class="pp-social-text"><strong>Behance</strong><small>/camiloh</small></span></a></div>' +
      '<div class="pp-love-center">' +
      '<button class="pp-heart" type="button" aria-label="Like">' + HEART_SVG + "</button>" +
      '<span class="pp-love-text">Creado con amor</span></div>' +
      '<div class="pp-social-group pp-love-right">' +
      '<a class="pp-social-item" href="mailto:contact@camiloh.co">' +
      '<span class="pp-social-icon" aria-hidden="true">' + MAIL_SVG + "</span>" +
      '<span class="pp-social-text"><strong>E-mail</strong><small>contact@camiloh.co</small></span></a>' +
      '<a class="pp-social-item" href="https://www.linkedin.com/in/camilooh" target="_blank" rel="noopener">' +
      '<span class="pp-social-icon" aria-hidden="true">in</span>' +
      '<span class="pp-social-text"><strong>LinkedIn</strong><small>/camilooh</small></span></a></div>' +
      "</div></div></div>";

    document.body.appendChild(panel);
    return panel;
  }

  function initPanelController(panelEl, slug) {
    const video = panelEl.querySelector(".pp-video");
    const rainCanvas = panelEl.querySelector(".pp-rain-canvas");
    const accentRgb = getComputedStyle(panelEl).getPropertyValue("--accent-rgb").trim() || null;
    const rainFX = rainCanvas ? createRainFX(rainCanvas, accentRgb) : null;
    const closeBtn = panelEl.querySelector(".pp-close");
    const inner = panelEl.querySelector(".proj-panel-inner");
    const heart = panelEl.querySelector(".pp-heart");
    let heartLiked = false;

    projectPanels[slug] = { panelEl, video, player: null, rainFX, loaded: false };

    if (inner) {
      inner.addEventListener("mousemove", (e) => {
        const rect = inner.getBoundingClientRect();
        inner.style.setProperty("--sx", e.clientX - rect.left + "px");
        inner.style.setProperty("--sy", e.clientY - rect.top + "px");
      });
    }
    if (closeBtn) closeBtn.addEventListener("click", () => closePanel(slug));
    panelEl.addEventListener("click", (e) => { if (e.target === panelEl) closePanel(slug); });

    if (heart) {
      heart.addEventListener("click", () => {
        heartLiked = !heartLiked;
        heart.classList.toggle("liked", heartLiked);
        heart.classList.remove("pop");
        void heart.offsetWidth;
        heart.classList.add("pop");
      });
      heart.addEventListener("animationend", () => heart.classList.remove("pop"));
    }

    const creditsBtn = panelEl.querySelector(".pp-credits-toggle");
    const creditsList = panelEl.querySelector(".pp-credits-list");
    if (creditsBtn && creditsList) {
      creditsBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const open = creditsBtn.getAttribute("aria-expanded") === "true";
        const willOpen = !open;
        creditsBtn.setAttribute("aria-expanded", willOpen ? "true" : "false");
        creditsList.classList.toggle("open", willOpen);
      });
    }

    panelEl.querySelectorAll(".pp-shot").forEach((shot) => {
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

    if (cursor) {
      panelEl.querySelectorAll("a, button, .pp-shot, .pp-close, .pp-credits-toggle, .pp-heart").forEach((el) => {
        el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
      });
    }
  }

  function loadPanelMedia(entry) {
    if (entry.loaded) return;
    entry.loaded = true;
    const p = entry;
    if (p.video) {
      p.video.querySelectorAll("source[data-src]").forEach((src) => {
        src.src = src.dataset.src;
        delete src.dataset.src;
      });
      p.video.load();
      if (typeof videojs !== "undefined") {
        try {
          p.player = videojs(p.video, { fill: true, fluid: false, controls: true, preload: "metadata" });
        } catch (err) {
          p.player = null;
        }
      }
    }
    p.panelEl.querySelectorAll(".pp-shot img[data-src]").forEach((img) => {
      img.src = img.dataset.src;
      delete img.dataset.src;
    });
  }

  function openPanel(p) {
    if (!p) return;
    const slug = p.slug;
    let entry = projectPanels[slug];
    if (!entry) {
      const el = buildPanel(p);
      initPanelController(el, slug);
      entry = projectPanels[slug];
    }
    loadPanelMedia(entry);
    entry.panelEl.classList.add("open");
    document.body.style.overflow = "hidden";
    document.body.classList.add("panel-open");
    if (entry.player) {
      try { entry.player.currentTime(0); entry.player.play(); } catch (e) {}
    } else if (entry.video) {
      entry.video.currentTime = 0;
      entry.video.play().catch(() => {});
    }
    if (entry.rainFX) entry.rainFX.start();
  }

  function closePanel(slugOrPanel) {
    let entry = null;
    if (typeof slugOrPanel === "string") {
      entry = projectPanels[slugOrPanel];
    } else if (slugOrPanel && slugOrPanel.dataset) {
      entry = projectPanels[slugOrPanel.dataset.slug];
    }
    if (!entry) return;
    entry.panelEl.classList.remove("open");
    if (entry.player) { try { entry.player.pause(); } catch (e) {} }
    else if (entry.video) entry.video.pause();
    if (entry.rainFX) entry.rainFX.stop();
    const anyOpen = Object.values(projectPanels).some((pl) => pl.panelEl.classList.contains("open"));
    if (!anyOpen) {
      document.body.style.overflow = "";
      document.body.classList.remove("panel-open");
    }
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      Object.keys(projectPanels).forEach(closePanel);
      const lb = document.getElementById("lightbox");
      if (lb) {
        lb.classList.remove("open");
        if (!document.body.classList.contains("panel-open")) document.body.style.overflow = "";
      }
    }
  });

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
