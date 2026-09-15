/* ═══════════════════════════════════════════════
   Trabajos — Camiloh
   List + panels + i18n (ES/EN)
   Project data: data/proyectos.json
   ═══════════════════════════════════════════════ */

/* Data lives in data/proyectos.json
   Edit that file to add/update titles, years, credits, roles, etc.
   Schema per project:
     title, year, slug, folder (R2 dir, default TITLE UPPERCASE),
     cat? ("ia" | omitted=3d),
     role: { es, en }, desc: { es, en },
     credits: [{ role, name, ig? }],
     accent, rgb, deep, hue
   Media: {mediaBase}/{folder}/cover.webp | 01.webp–06.webp | video.mp4
*/

let PROJECTS = [];
const PROJECTS_URL = "data/proyectos.json";
let MEDIA_BASE = "https://media.camiloh.co";

function projectFolder(p) {
  if (p && p.folder) return String(p.folder).trim();
  return String((p && p.title) || "").trim().toUpperCase();
}

function mediaUrl(p, file) {
  return MEDIA_BASE.replace(/\/$/, "") + "/" + encodeURIComponent(projectFolder(p)).replace(/'/g, "%27") + "/" + file;
}

function sortProjects() {
  PROJECTS.sort((a, b) => a.title.localeCompare(b.title, "es", { sensitivity: "base" }));
}

function loadProjects() {
  return fetch(PROJECTS_URL, { cache: "no-cache" })
    .then((res) => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then((data) => {
      const list = Array.isArray(data) ? data : (data && data.projects);
      if (!Array.isArray(list)) throw new Error("JSON sin lista de proyectos");
      if (data && typeof data.mediaBase === "string" && data.mediaBase.trim()) {
        MEDIA_BASE = data.mediaBase.trim().replace(/\/$/, "");
      }
      PROJECTS = list;
      sortProjects();
    });
}

function showLoadError() {
  const skel = document.querySelector(".proj-skeleton");
  if (skel) {
    skel.classList.add("is-error");
    skel.innerHTML = '<p class="tw-load-error">No se pudieron cargar los proyectos.</p>';
  }
}


const UI = {
  es: {
    navAbout: "Sobre mí",
    navWork: "Trabajos",
    navGallery: "Galería",
    navArt: "Pinta",
    heroTag: "Mi trabajo",
    heroTitle: "Proyectos",
    heroSub: "Índice de proyectos, agradecimientos a todos los involucrados.",
    colName: "Nombre",
    colRole: "Rol",
    colYear: "Año",
    filterAll: "Todos",
    filter3d: "3D",
    filterIa: "IA",
    note: "Cada proyecto es una historia en construcción.",
    zoomHint: "clic para ampliar",
    close: "CERRAR ✕",
    reel: "Rodado en 22mm · Camiloh",
    yearLabel: "Año",
    roleLabel: "Rol",
    expand: "Ampliar",
    madeWith: "Creado con amor",
    footerLeft: "© 2026 Camiloh — Artista 3D",
    footerRight: "Rodado en 35mm · Colombia",
    footerMadeWith: 'Hecho con <span class="pf-heart" aria-hidden="true">♥</span> Claude y Grok',
    footerAbout: "Sobre mí",
    footerHome: "Inicio",
    footerDiscord: "Únete a mi Discord",
    frame: "Frame",
    credits: "Créditos",
    creditsEmpty: "Créditos por agregar.",
  },
  en: {
    navAbout: "About",
    navWork: "Work",
    navGallery: "Gallery",
    navArt: "Paint",
    heroTag: "My work",
    heroTitle: "Projects",
    heroSub: "A project index, thanks to everyone involved.",
    colName: "Name",
    colRole: "Role",
    colYear: "Year",
    filterAll: "All",
    filter3d: "3D",
    filterIa: "AI",
    note: "Every project is a story still being written.",
    zoomHint: "click to expand",
    close: "CLOSE ✕",
    reel: "Shot on 22mm · Camiloh",
    yearLabel: "Year",
    roleLabel: "Role",
    expand: "Expand",
    madeWith: "Made with love",
    footerLeft: "© 2026 Camiloh — 3D Artist",
    footerRight: "Shot on 35mm · Colombia",
    footerMadeWith: 'Made with <span class="pf-heart" aria-hidden="true">♥</span> Claude and Grok',
    footerAbout: "About",
    footerHome: "Home",
    footerDiscord: "Join my Discord",
    frame: "Frame",
    credits: "Credits",
    creditsEmpty: "Credits to be added.",
  },
};

let lang = localStorage.getItem("camiloh-lang") || "es";
if (lang !== "es" && lang !== "en") lang = "es";

function t(key) {
  return (UI[lang] && UI[lang][key]) || UI.es[key] || key;
}

function tr(field) {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.es || "";
}

const SPARK_SVG = '<svg class="p-spark" viewBox="0 0 24 24"><path d="M12 2c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7z"/></svg>';
const ARROW_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const HEART_SVG = '<svg viewBox="0 0 24 24"><path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z"/></svg>';
const IG_SVG = '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg>';
const MAIL_SVG = '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 6.5 8 6.5 8-6.5"/></svg>';

function pad(n) {
  return String(n).padStart(2, "0");
}

function buildList() {
  const listCol = document.querySelector(".tw-col-list");
  const note = listCol.querySelector(".tw-note");
  const frame = document.getElementById("previewFrame");
  const cap = document.getElementById("pvCap");

  listCol.querySelectorAll(".proj-row").forEach((el) => el.remove());
  frame.querySelectorAll("img").forEach((el) => el.remove());

  const frag = document.createDocumentFragment();
  const imgFrag = document.createDocumentFragment();

  PROJECTS.forEach((p, i) => {
    const row = document.createElement("div");
    row.className = "proj-row";
    row.dataset.index = i;
    row.dataset.accent = "red";
    row.dataset.title = p.title;
    row.dataset.role = tr(p.role);
    row.dataset.year = p.year;
    row.dataset.cat = p.cat || "3d";
    row.innerHTML =
      '<div class="p-left">' +
      '<span class="p-num">' + pad(i + 1) + "</span>" +
      SPARK_SVG +
      '<span class="p-name">' + p.title + "</span>" +
      "</div>" +
      '<span class="p-role">' + tr(p.role) + "</span>" +
      '<span class="p-year">' + p.year + "</span>" +
      '<span class="p-arrow">' + ARROW_SVG + "</span>";
    frag.appendChild(row);

    // Lazy: only set data-src; real src loads on hover / near viewport
    const img = document.createElement("img");
    img.dataset.index = i;
    img.dataset.src = mediaUrl(p, "cover.webp");
    img.alt = p.title;
    img.decoding = "async";
    img.loading = "lazy";
    imgFrag.appendChild(img);
  });

  listCol.insertBefore(frag, note);
  frame.insertBefore(imgFrag, cap);

  // drop skeleton once real rows exist
  document.body.classList.add("is-ready");
  const skel = listCol.querySelector(".proj-skeleton");
  if (skel) skel.remove();

  observeRows();
}


function buildCreditsHtml(p) {
  const list = Array.isArray(p.credits) ? p.credits : [];
  let rows = "";
  if (list.length === 0) {
    rows = '<span class="pp-credits-empty">' + t("creditsEmpty") + "</span>";
  } else {
    list.forEach((c) => {
      const role = c.role || "";
      const name = c.name || "";
      const ig = (c.ig || "").replace(/^@/, "").trim();
      const igOk = ig && ig !== "/" && /^[\w.]+$/.test(ig);
      const igHtml = igOk
        ? ' — <a href="https://www.instagram.com/' + ig + '/" target="_blank" rel="noopener">@' + ig + "</a>"
        : "";
      rows +=
        '<div class="pp-credit-row">' +
        role + " — " + name + igHtml +
        "</div>";
    });
  }
  return (
    '<div class="pp-credits">' +
    '<button type="button" class="pp-credits-toggle" aria-expanded="false">' +
    '<svg class="pp-credits-spark" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7z"/></svg>' +
    '<span class="pp-credits-label">' + t("credits") + "</span>" +
    '<span class="pp-credits-chevron" aria-hidden="true"></span>' +
    "</button>" +
    '<div class="pp-credits-list">' + rows + "</div>" +
    "</div>"
  );
}

function buildPanel(idx) {
  const p = PROJECTS[idx];
  if (!p) return null;

  const styleParts = [];
  if (p.accent) styleParts.push("--accent:" + p.accent);
  if (p.rgb) styleParts.push("--accent-rgb:" + p.rgb);
  if (p.deep) styleParts.push("--accent-deep:" + p.deep);
  if (p.hue) styleParts.push("--pp-hue:" + p.hue);

  let frames = "";
  for (let n = 1; n <= 6; n++) {
    const num = pad(n);
    frames +=
      '<div class="pp-shot">' +
      '<img data-src="' + mediaUrl(p, num + ".webp") + '" alt="' + p.title + " " + num + '" loading="lazy">' +
      '<span class="pp-shot-num">' + num + "</span>" +
      '<span class="pp-shot-zoom">' + t("expand") + "</span>" +
      "</div>";
  }

  const postHtml = "";

  const panel = document.createElement("div");
  panel.id = "projectPanel-" + idx;
  panel.className = "proj-panel";
  panel.dataset.projIndex = idx;
  if (styleParts.length) panel.setAttribute("style", styleParts.join("; "));

  panel.innerHTML =
    '<button class="pp-close" type="button" aria-label="Cerrar">✕</button>' +
    '<div class="pp-frame"><div class="proj-panel-inner">' +
    '<canvas id="ppRain-' + idx + '" class="pp-rain-canvas"></canvas>' +
    '<div class="pp-spot"></div>' +
    '<span class="pp-reel">' + t("reel") + "</span>" +
    '<div class="pp-media-wrap"><div class="pp-media">' +
    '<video class="pp-video video-js vjs-glass" id="ppVideo-' + idx + '" muted loop playsinline controls preload="none" poster="' + mediaUrl(p, "cover.webp") + '">' +
    '<source data-src="' + mediaUrl(p, "video.mp4") + '" type="video/mp4">' +
    "</video></div></div>" +
    '<div class="pp-head"><div class="pp-head-left">' +
    '<h2 class="pp-title gradient-text">' + p.title + "</h2>" +
    '<p class="pp-desc">' + tr(p.desc) + "</p>" +
    postHtml +
    '</div><div class="pp-head-right">' +
    '<div class="pp-meta-block"><span class="pp-meta-label">' + t("yearLabel") + "</span>" +
    '<span class="pp-year gradient-text">' + p.year + "</span></div>" +
    '<div class="pp-meta-block"><span class="pp-meta-label">' + t("roleLabel") + "</span>" +
    '<span class="pp-role">' + tr(p.role) + "</span></div>" +
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
    '<span class="pp-love-text">' + t("madeWith") + "</span></div>" +
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

function createRainFX(canvas, accentRgb) {
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // touch devices generally sit behind weaker GPUs and have smaller panels,
  // so give them a lighter version of the same effect instead of the full
  // desktop particle count / pixel density.
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

const projectPanels = {};

function initPanelController(panelEl, idx) {
  const video = panelEl.querySelector(".pp-video");
  const rainCanvas = panelEl.querySelector(".pp-rain-canvas");
  const accentRgb = getComputedStyle(panelEl).getPropertyValue("--accent-rgb").trim() || null;
  const rainFX = rainCanvas ? createRainFX(rainCanvas, accentRgb) : null;
  const closeBtn = panelEl.querySelector(".pp-close");
  const inner = panelEl.querySelector(".proj-panel-inner");
  const heart = panelEl.querySelector(".pp-heart");
  let heartLiked = false;

  projectPanels[idx] = { panelEl, video, player: null, rainFX, loaded: false };

  if (inner) {
    inner.addEventListener("mousemove", (e) => {
      const rect = inner.getBoundingClientRect();
      inner.style.setProperty("--sx", e.clientX - rect.left + "px");
      inner.style.setProperty("--sy", e.clientY - rect.top + "px");
    });
  }
  if (closeBtn) closeBtn.addEventListener("click", () => closeProjectPanel(idx));
  panelEl.addEventListener("click", (e) => { if (e.target === panelEl) closeProjectPanel(idx); });

  if (heart) {
    heart.addEventListener("click", () => {
      heartLiked = !heartLiked;
      heart.classList.toggle("liked", heartLiked);
      heart.classList.remove("pop");
      void heart.offsetWidth;
      heart.classList.add("pop");
      // easter egg: 7 heart clicks → matrix
      bumpEaster("heart");
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
      if (willOpen) {
        // restart staggered fade-in each time the list opens
        creditsList.classList.remove("open");
        void creditsList.offsetWidth;
        creditsList.classList.add("open");
      } else {
        creditsList.classList.remove("open");
      }
    });
  }

  panelEl.querySelectorAll(".pp-shot").forEach((shot, i) => {
    shot.addEventListener("click", (e) => {
      e.stopPropagation();
      const img = shot.querySelector("img");
      lightbox.querySelector("img").src = img.src;
      lightbox.querySelector(".lb-caption").textContent = t("frame") + " " + pad(i + 1);
      lightbox.classList.add("open");
    });
  });
}

function loadPanelMedia(p) {
  if (p.loaded) return;
  p.loaded = true;
  if (p.video) {
    p.video.querySelectorAll("source[data-src]").forEach((src) => {
      src.src = src.dataset.src;
      delete src.dataset.src;
    });
    p.video.load();
    if (typeof videojs !== "undefined") {
      p.player = videojs(p.video, {
        // fill the .pp-media box; aspect-ratio is controlled on the container
        fill: true,
        fluid: false,
        controls: true,
        preload: "metadata",
      });
      const applyRatio = () => {
        try {
          const el = p.player.tech(true) && p.player.tech(true).el();
          const w = (el && el.videoWidth) || p.player.videoWidth();
          const h = (el && el.videoHeight) || p.player.videoHeight();
          if (w && h) {
            const wrap = p.panelEl.querySelector(".pp-media");
            if (wrap) {
              wrap.style.aspectRatio = w + " / " + h;
              const isPortrait = h >= w;
              wrap.classList.toggle("is-portrait", isPortrait);
              const mediaWrap = p.panelEl.querySelector(".pp-media-wrap");
              if (mediaWrap) mediaWrap.classList.toggle("is-portrait", isPortrait);
            }
          }
        } catch (err) { /* ignore */ }
      };
      p.player.ready(() => {
        p.player.on("loadedmetadata", applyRatio);
        applyRatio();
      });
    } else {
      p.player = null;
      p.video.addEventListener("loadedmetadata", () => {
        if (p.video.videoWidth && p.video.videoHeight) {
          const w = p.video.videoWidth, h = p.video.videoHeight;
          const wrap = p.panelEl.querySelector(".pp-media");
          if (wrap) {
            wrap.style.aspectRatio = w + " / " + h;
            const isPortrait = h >= w;
            wrap.classList.toggle("is-portrait", isPortrait);
            const mediaWrap = p.panelEl.querySelector(".pp-media-wrap");
            if (mediaWrap) mediaWrap.classList.toggle("is-portrait", isPortrait);
          }
        }
      });
    }
  }
  p.panelEl.querySelectorAll(".pp-shot img[data-src]").forEach((img) => {
    img.src = img.dataset.src;
    delete img.dataset.src;
  });
}

function openProjectPanel(idx) {
  let p = projectPanels[idx];
  if (!p) {
    const el = buildPanel(idx);
    if (!el) return;
    initPanelController(el, idx);
    p = projectPanels[idx];
  }
  loadPanelMedia(p);
  p.panelEl.classList.add("open");
  document.body.style.overflow = "hidden";
  // lets background canvases/animations (stars, halation) know they
  // can stop working: they're fully hidden behind the modal anyway.
  document.body.classList.add("panel-open");
  if (p.player) { p.player.currentTime(0); p.player.play(); }
  else if (p.video) { p.video.currentTime = 0; p.video.play().catch(() => {}); }
  if (p.rainFX) p.rainFX.start();
}

function closeProjectPanel(idx) {
  const p = projectPanels[idx];
  if (!p) return;
  p.panelEl.classList.remove("open");
  document.body.style.overflow = "";
  // only drop panel-open once no other panel is left open
  const anyOpen = Object.values(projectPanels).some(
    (panel) => panel.panelEl.classList.contains("open")
  );
  if (!anyOpen) document.body.classList.remove("panel-open");
  if (p.player) p.player.pause();
  else if (p.video) p.video.pause();
  if (p.rainFX) p.rainFX.stop();
}

/* Custom cursor */
const cursor = document.getElementById("cursor");
let mx = 0, my = 0, cx = 0, cy = 0;
window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; cursor.classList.remove("hide"); });
window.addEventListener("mouseleave", () => cursor.classList.add("hide"));

const mouseGlow = document.getElementById("mouseGlow");
let gx = window.innerWidth / 2, gy = window.innerHeight / 2, glowStarted = false;

function loop() {
  if (!document.hidden) {
    cx += (mx - cx) * 0.22; cy += (my - cy) * 0.22;
    cursor.style.left = cx + "px"; cursor.style.top = cy + "px";
    gx += (mx - gx) * 0.06; gy += (my - gy) * 0.06;
    mouseGlow.style.setProperty("--mx", gx + "px");
    mouseGlow.style.setProperty("--my", gy + "px");
    if (!glowStarted && (mx || my)) { glowStarted = true; mouseGlow.classList.add("ready"); }
  }
  requestAnimationFrame(loop);
}
loop();

document.addEventListener("visibilitychange", () => {
  document.body.classList.toggle("tab-hidden", document.hidden);
});

function bindCursorHover(selector) {
  document.querySelectorAll(selector).forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });
}

function magnetize(selector, strength) {
  if (typeof gsap === "undefined") return;
  document.querySelectorAll(selector).forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: relX * strength, y: relY * strength, duration: 0.4, ease: "power2.out", overwrite: "auto" });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)", overwrite: "auto" });
    });
  });
}

/* Star field */
(function starField() {
  const canvas = document.getElementById("stars");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w = 0, h = 0, stars = [], constellation = [], shootStars = [], shootTimer = 120, tick = 0;

  function seed() {
    const count = Math.min(Math.max(Math.round((w * h) / 9500), 70), 150);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: 0.5 + Math.random() * 1.1, base: 0.22 + Math.random() * 0.4,
      speed: 0.006 + Math.random() * 0.016, phase: Math.random() * Math.PI * 2
    }));
    const cx0 = w * (0.7 + Math.random() * 0.1), cy0 = h * (0.14 + Math.random() * 0.1);
    constellation = Array.from({ length: 6 }, (_, i) => ({
      x: cx0 + Math.cos(i * 1.15) * (38 + i * 20) + (Math.random() - 0.5) * 26,
      y: cy0 + Math.sin(i * 1.75) * (22 + i * 13) + (Math.random() - 0.5) * 20,
      r: 1.2 + Math.random() * 0.6, base: 0.5 + Math.random() * 0.25,
      speed: 0.008 + Math.random() * 0.01, phase: Math.random() * Math.PI * 2
    }));
  }
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + "px"; canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }
  function drawConstellation(alphaFn) {
    ctx.strokeStyle = "rgba(247,241,225,.12)"; ctx.lineWidth = 1;
    ctx.beginPath();
    constellation.forEach((pt, i) => { if (i === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y); });
    ctx.stroke();
    constellation.forEach((s) => {
      ctx.fillStyle = "rgba(247,241,225," + alphaFn(s).toFixed(3) + ")";
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    });
  }
  function spawnShootingStar() {
    const fromLeft = Math.random() < 0.5;
    const x0 = fromLeft ? Math.random() * w * 0.4 : w * 0.6 + Math.random() * w * 0.4;
    const y0 = Math.random() * h * 0.35;
    const angle = Math.PI * 0.22 + Math.random() * 0.12;
    const speed = 9 + Math.random() * 5;
    shootStars.push({
      x: x0, y: y0, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      life: 1, decay: 0.012 + Math.random() * 0.006, len: 60 + Math.random() * 40
    });
  }
  function frame() {
    // same idea as the document.hidden check below: while a project panel
    // is open, this canvas is fully covered by the modal, so keep skipping
    // frames instead of drawing (and computing) something nobody can see.
    if (document.hidden || document.body.classList.contains("panel-open")) {
      requestAnimationFrame(frame);
      return;
    }
    tick++;
    ctx.clearRect(0, 0, w, h);
    drawConstellation((s) => s.base * (0.6 + 0.4 * Math.sin(tick * s.speed + s.phase)));
    stars.forEach((s) => {
      const a = s.base * (0.5 + 0.5 * Math.sin(tick * s.speed + s.phase));
      ctx.fillStyle = "rgba(247,241,225," + a.toFixed(3) + ")";
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    });
    shootTimer--;
    if (shootTimer <= 0) { shootTimer = 260 + Math.random() * 320; spawnShootingStar(); }
    shootStars.forEach((s) => {
      s.x += s.vx; s.y += s.vy; s.life -= s.decay;
      const m = Math.hypot(s.vx, s.vy) || 1;
      const tailX = s.x - s.vx * (s.len / m), tailY = s.y - s.vy * (s.len / m);
      const g = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
      g.addColorStop(0, "rgba(247,241,225,0)");
      g.addColorStop(1, "rgba(247,241,225," + Math.max(s.life, 0) * 0.85 + ")");
      ctx.strokeStyle = g; ctx.lineWidth = 1.3; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.lineTo(s.x, s.y); ctx.stroke();
    });
    shootStars = shootStars.filter((s) => s.life > 0 && s.x < w + 60 && s.y < h + 60);
    requestAnimationFrame(frame);
  }
  function drawStatic() {
    ctx.clearRect(0, 0, w, h);
    drawConstellation((s) => s.base);
    stars.forEach((s) => {
      ctx.fillStyle = "rgba(247,241,225," + s.base.toFixed(3) + ")";
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
    });
  }
  window.addEventListener("resize", () => { resize(); if (reduceMotion) drawStatic(); });
  resize();
  requestAnimationFrame(() => canvas.classList.add("ready"));
  if (reduceMotion) drawStatic(); else frame();
})();

(function () {
  const hero = document.querySelector(".tw-hero");
  if (!hero || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(([entry]) => {
    hero.classList.toggle("io-paused", !entry.isIntersecting);
  }, { threshold: 0 });
  io.observe(hero);
})();

const lightbox = document.getElementById("lightbox");
const frame = document.getElementById("previewFrame");
const cap = document.getElementById("pvCap");
const previewCol = document.querySelector(".tw-col-preview");
let current = null;
let appliedTranslate = 0;

function ensurePreviewSrc(img) {
  if (!img) return;
  if (!img.src && img.dataset.src) {
    img.src = img.dataset.src;
  }
}

function showPreview(index, row) {
  current = index;
  frame.querySelectorAll("img").forEach((img) => {
    const active = +img.dataset.index === index;
    if (active) ensurePreviewSrc(img);
    img.classList.toggle("active", active);
  });
  frame.classList.add("on");
  cap.innerHTML = row.dataset.title + "<small>" + row.dataset.role + " — " + row.dataset.year + "</small>";
  followRow(row);
}
function hidePreview() { current = null; frame.classList.remove("on"); }

function followRow(row) {
  if (window.innerWidth <= 900) {
    previewCol.style.transform = "";
    appliedTranslate = 0;
    return;
  }

  const rowRect = row.getBoundingClientRect();
  const rowCenter = rowRect.top + rowRect.height / 2;

  // getBoundingClientRect already includes the current translate.
  // Subtract appliedTranslate to recover the sticky base — no need to
  // clear the transform (that was causing the visible jump).
  const frameRect = frame.getBoundingClientRect();
  const baseTop = frameRect.top - appliedTranslate;
  const frameH = frameRect.height;

  let translateY = rowCenter - (baseTop + frameH / 2);

  const margin = 20;
  const minTranslate = margin - baseTop;
  const maxTranslate = window.innerHeight - margin - frameH - baseTop;
  if (Number.isFinite(minTranslate) && Number.isFinite(maxTranslate)) {
    if (maxTranslate < minTranslate) translateY = minTranslate;
    else translateY = Math.max(minTranslate, Math.min(maxTranslate, translateY));
  }

  appliedTranslate = translateY;
  previewCol.style.transform = "translateY(" + translateY + "px)";
}

window.addEventListener("resize", () => {
  if (current !== null) {
    const rows = document.querySelectorAll(".proj-row");
    if (rows[current]) followRow(rows[current]);
  }
});

function bindRowEvents() {
  document.querySelectorAll(".proj-row").forEach((row) => {
    const idx = +row.dataset.index;
    row.addEventListener("mouseenter", () => {
      // prefetch preview image on hover
      const img = frame.querySelector('img[data-index="' + idx + '"]');
      ensurePreviewSrc(img);
      showPreview(idx, row);
    });
    row.addEventListener("mouseleave", hidePreview);
    row.addEventListener("click", () => {
      row.classList.remove("clicked");
      void row.offsetWidth;
      row.classList.add("clicked");
      showPreview(idx, row);
      openProjectPanel(idx);
      track("project_open", {
        project_title: row.dataset.title,
        project_index: idx,
        project_cat: row.dataset.cat || "3d",
      });
    });
  });
  bindCursorHover("a, .proj-row, .preview-frame, .pp-close, .pp-shot, .filter-pill, .lang-toggle");
}

frame.addEventListener("click", () => { if (current !== null) openProjectPanel(current); });
lightbox.addEventListener("click", () => lightbox.classList.remove("open"));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.classList.remove("open");
    Object.keys(projectPanels).forEach((idx) => {
      if (projectPanels[idx].panelEl.classList.contains("open")) closeProjectPanel(+idx);
    });
  }
});

/* ── Filter ── */
let activeFilter = "all";

function applyFilter(filter) {
  activeFilter = filter;
  document.querySelectorAll(".filter-pill").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });
  document.querySelectorAll(".proj-row").forEach((row) => {
    const cat = row.dataset.cat || "3d";
    const show = filter === "all" || cat === filter;
    row.classList.toggle("is-hidden", !show);
    // re-trigger reveal for newly shown rows
    if (show) {
      row.classList.remove("is-visible");
    }
  });
  if (current !== null) {
    const rows = document.querySelectorAll(".proj-row");
    const row = rows[current];
    if (row && row.classList.contains("is-hidden")) hidePreview();
  }
  observeRows();
  track("filter_change", { filter_value: filter });
}

function bindFilter() {
  document.querySelectorAll(".filter-pill").forEach((btn) => {
    btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
  });
}

/* ── i18n UI refresh ── */
function applyLanguage() {
  document.documentElement.lang = lang;
  localStorage.setItem("camiloh-lang", lang);

  const langBtn = document.getElementById("langToggle");
  if (langBtn) {
    langBtn.textContent = lang === "es" ? "EN" : "ES";
    langBtn.setAttribute("aria-label", lang === "es" ? "Switch to English" : "Cambiar a español");
  }

  // nav
  const navLinks = document.querySelectorAll("nav ul a");
  const navKeys = ["navAbout", "navWork", "navGallery", "navArt"];
  navLinks.forEach((a, i) => { if (navKeys[i]) a.textContent = t(navKeys[i]); });

  // hero
  const tag = document.querySelector(".tw-hero .tag");
  if (tag) {
    const svg = tag.querySelector("svg");
    tag.innerHTML = "";
    if (svg) tag.appendChild(svg);
    tag.appendChild(document.createTextNode(" " + t("heroTag")));
  }
  const h1 = document.querySelector(".tw-hero h1");
  if (h1) {
    const spark = h1.querySelector(".h1-spark") || document.getElementById("heroSpark");
    h1.innerHTML = t("heroTitle");
    if (spark) {
      spark.classList.add("h1-spark");
      spark.id = "heroSpark";
      h1.appendChild(spark);
      // re-bind easter egg after DOM rebuild
      spark.style.pointerEvents = "auto";
      spark.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = MATRIX_URL;
      };
    }
  }
  const heroP = document.querySelector(".tw-hero p");
  if (heroP) heroP.textContent = t("heroSub");

  // column heads
  const heads = document.querySelectorAll(".tw-col-head > span");
  if (heads[0]) heads[0].textContent = t("colName");
  if (heads[1]) {
    // keep filter pills
    const pills = heads[1].querySelector(".filter-pills");
    heads[1].childNodes.forEach((n) => {
      if (n.nodeType === 3) n.textContent = "";
    });
    // rebuild label + keep pills
    const label = document.createTextNode(t("colRole") + " ");
    heads[1].insertBefore(label, pills);
    if (pills) {
      const btns = pills.querySelectorAll(".filter-pill");
      if (btns[0]) btns[0].textContent = t("filterAll");
      if (btns[1]) btns[1].textContent = t("filter3d");
      if (btns[2]) btns[2].textContent = t("filterIa");
    }
  }
  if (heads[2]) heads[2].textContent = t("colYear");

  // note
  const noteSpan = document.querySelector(".tw-note span:not(.tw-note-line)");
  if (noteSpan) noteSpan.textContent = t("note");

  // zoom hint
  const zh = document.querySelector(".zoom-hint");
  if (zh) zh.textContent = t("zoomHint");

  // lightbox close
  const lbClose = document.querySelector(".lb-close");
  if (lbClose) lbClose.textContent = t("close");

  // footer (keep © easter-egg node intact)
  const fl = document.getElementById("footerLeftText");
  const fr = document.getElementById("footerRightText");
  if (fl) {
    // strip leading © from string if present
    fl.textContent = t("footerLeft").replace(/^©\s*/, "");
  }
  if (fr) fr.textContent = t("footerRight");

  const pfLead = document.getElementById("pfMadeWith");
  if (pfLead) pfLead.innerHTML = t("footerMadeWith");
  const pfAbout = document.getElementById("pfAbout");
  if (pfAbout) pfAbout.textContent = t("footerAbout");
  const pfGallery = document.getElementById("pfGallery");
  if (pfGallery) pfGallery.textContent = t("navGallery");
  const pfHome = document.getElementById("pfHome");
  if (pfHome) pfHome.textContent = t("footerHome");
  const pfDiscord = document.getElementById("pfDiscord");
  if (pfDiscord) pfDiscord.textContent = t("footerDiscord");

  // rebuild list with translated roles
  const keepFilter = activeFilter;
  buildList();
  bindRowEvents();
  applyFilter(keepFilter);

  // update open panels if any
  Object.keys(projectPanels).forEach((idx) => {
    const p = projectPanels[idx];
    const data = PROJECTS[+idx];
    if (!p || !data) return;
    const desc = p.panelEl.querySelector(".pp-desc");
    const role = p.panelEl.querySelector(".pp-role");
    const reel = p.panelEl.querySelector(".pp-reel");
    const love = p.panelEl.querySelector(".pp-love-text");
    const yearLbl = p.panelEl.querySelectorAll(".pp-meta-label");
    const post = p.panelEl.querySelector(".pp-post");
    if (desc) desc.textContent = tr(data.desc);
    if (role) role.textContent = tr(data.role);
    if (reel) reel.textContent = t("reel");
    if (love) love.textContent = t("madeWith");
    if (yearLbl[0]) yearLbl[0].textContent = t("yearLabel");
    if (yearLbl[1]) yearLbl[1].textContent = t("roleLabel");
    if (post && data.post) post.textContent = tr(data.post);
    p.panelEl.querySelectorAll(".pp-shot-zoom").forEach((el) => { el.textContent = t("expand"); });
    const credLabel = p.panelEl.querySelector(".pp-credits-label");
    if (credLabel) credLabel.textContent = t("credits");
    const credEmpty = p.panelEl.querySelector(".pp-credits-empty");
    if (credEmpty) credEmpty.textContent = t("creditsEmpty");
  });
}

/* ── Easter eggs → matrix.html ── */
const MATRIX_URL = "matrix.html";
const easterCounts = { heart: 0, lang: 0 };

function bumpEaster(key, need) {
  need = need || 7;
  easterCounts[key] = (easterCounts[key] || 0) + 1;
  if (easterCounts[key] >= need) {
    easterCounts[key] = 0;
    window.location.href = MATRIX_URL;
  }
}

function bindEasterEggs() {
  // © in footer
  const copy = document.querySelector(".easter-copy");
  if (copy) {
    copy.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = MATRIX_URL;
    });
  }

  // star on "Proyectos" title
  const spark = document.getElementById("heroSpark");
  if (spark) {
    spark.style.pointerEvents = "auto";
    spark.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = MATRIX_URL;
    });
  }

  // stars beside the footer note text
  document.querySelectorAll(".easter-note-star").forEach((el) => {
    el.style.pointerEvents = "auto";
    el.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = MATRIX_URL;
    });
  });
}

function bindLangToggle() {
  const btn = document.getElementById("langToggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    bumpEaster("lang");
    lang = lang === "es" ? "en" : "es";
    applyLanguage();
    track("language_toggle", { language: lang });
  });
}

/* ── Analytics helper ── */
function track(name, params) {
  params = params || {};
  try {
    if (typeof gtag === "function") {
      gtag("event", name, params);
    }
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push(Object.assign({ event: name }, params));
    }
  } catch (e) { /* no-op */ }
}

/* ── Scroll reveal for project rows ── */
let rowObserver = null;
function observeRows() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".proj-row:not(.is-hidden)").forEach((r) => r.classList.add("is-visible"));
    return;
  }
  if (rowObserver) rowObserver.disconnect();
  rowObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // prefetch nearby preview image
          const idx = entry.target.dataset.index;
          const img = frame && frame.querySelector('img[data-index="' + idx + '"]');
          ensurePreviewSrc(img);
          rowObserver.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );
  document.querySelectorAll(".proj-row:not(.is-hidden)").forEach((row) => {
    if (!row.classList.contains("is-visible")) rowObserver.observe(row);
  });
}

function bindNavToggle() {
  const btn = document.getElementById("navToggle");
  const nav = document.querySelector("nav");
  if (!btn || !nav) return;
  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };
  btn.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
  nav.querySelectorAll("ul a").forEach((a) => {
    a.addEventListener("click", () => setOpen(false));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) setOpen(false);
  });
}

function boot() {
  bindNavToggle();
  bindFilter();
  bindLangToggle();
  bindEasterEggs();
  applyLanguage();
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (!coarse) magnetize("nav ul a", 0.35);
  bindCursorHover("a, .proj-row, .preview-frame, .filter-pill, .lang-toggle, .pp-credits-toggle, .nav-toggle");
  track("page_view", { page: "trabajos" });
}

loadProjects()
  .then(boot)
  .catch((err) => {
    console.error("[trabajos] " + PROJECTS_URL, err);
    showLoadError();
  });
