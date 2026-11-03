/* ═══════════════════════════════════════════════════════════
   Camiloh — Galería
   Pinta las obras desde js/galeria-data.js, las revela al scroll
   y abre cada una en una ficha (lightbox) con su explicación.
   No hace falta tocar este archivo para sumar obras.
═══════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  /* ---------- obras ---------- */
  const grid = document.getElementById("glGrid");
  const emptyNote = document.getElementById("glEmpty");
  const obras = (Array.isArray(window.GALERIA_OBRAS) ? window.GALERIA_OBRAS : [])
    .filter((obra) => obra && typeof obra.src === "string" && obra.src.trim());

  if (!grid) return;

  if (!obras.length) {
    if (emptyNote) emptyNote.hidden = false;
    return;
  }

  const PENDING_TEXT =
    "Texto pendiente: acá va la explicación de la obra. " +
    "Se escribe en js/galeria-data.js, en el campo desc.";

  const cards = [];
  const fragment = document.createDocumentFragment();

  obras.forEach((obra, i) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "gl-card";
    card.dataset.index = String(i);
    card.setAttribute("aria-label", "Ampliar " + (obra.title || "obra"));
    card.style.setProperty("--d", Math.min(i * 0.07, 0.42) + "s");

    const media = document.createElement("span");
    media.className = "gl-card-media";

    const img = document.createElement("img");
    img.src = obra.src;
    img.alt = obra.alt || obra.title || "Obra de Camiloh";
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("error", () => {
      img.remove();
      const fallback = document.createElement("span");
      fallback.className = "gl-card-fallback";
      fallback.textContent = "Imagen no disponible";
      media.appendChild(fallback);
      card.classList.add("is-broken");
    });
    media.appendChild(img);

    const meta = document.createElement("span");
    meta.className = "gl-card-meta";

    const title = document.createElement("span");
    title.className = "gl-card-title";
    title.textContent = obra.title || "Sin título";

    const year = document.createElement("span");
    year.className = "gl-card-year";
    year.textContent = obra.year || "";

    meta.append(title, year);
    card.append(media, meta);
    card.addEventListener("click", () => openLightbox(i));

    fragment.appendChild(card);
    cards.push(card);
  });

  grid.appendChild(fragment);

  /* ---------- revelado al scroll ---------- */
  if (reduceMotion || !("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    cards.forEach((card) => io.observe(card));
  }

  /* ---------- lightbox ---------- */
  const lb = document.getElementById("glLb");
  const lbShell = document.getElementById("glLbShell");
  const lbImg = document.getElementById("glLbImg");
  const lbKicker = document.getElementById("glLbKicker");
  const lbTitle = document.getElementById("glLbTitle");
  const lbText = document.getElementById("glLbText");
  if (!lb || !lbImg || !lbTitle || !lbText) return;

  let current = -1;
  let lastFocus = null;

  const two = (n) => String(n).padStart(2, "0");

  function paint(index) {
    const obra = obras[index];
    if (!obra) return;

    lbImg.src = obra.src;
    lbImg.alt = obra.alt || obra.title || "Obra de Camiloh";
    lbTitle.textContent = obra.title || "Sin título";
    lbKicker.textContent =
      two(index + 1) + " / " + two(obras.length) + (obra.year ? " · " + obra.year : "");

    const desc = String(obra.desc || "").trim();
    lbText.textContent = desc || PENDING_TEXT;
    lbText.classList.toggle("is-pending", !desc);

    /* adelanta la siguiente / anterior para que el cambio sea instantáneo */
    [index + 1, index - 1].forEach((n) => {
      const vecina = obras[(n + obras.length) % obras.length];
      if (vecina && vecina.src) {
        const pre = new Image();
        pre.src = vecina.src;
      }
    });
  }

  function openLightbox(index) {
    current = (index + obras.length) % obras.length;
    lastFocus = document.activeElement;
    paint(current);
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("gl-locked");
    const closeBtn = lb.querySelector(".gl-lb-close");
    if (closeBtn) closeBtn.focus({ preventScroll: true });
  }

  function closeLightbox() {
    if (!lb.classList.contains("is-open")) return;
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.classList.remove("gl-locked");
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus({ preventScroll: true });
    }
  }

  function step(dir) {
    if (current < 0) return;
    current = (current + dir + obras.length) % obras.length;
    paint(current);
  }

  lb.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  lb.querySelectorAll("[data-dir]").forEach((btn) => {
    btn.addEventListener("click", () => step(Number(btn.dataset.dir)));
  });

  document.addEventListener("keydown", (event) => {
    const open = lb.classList.contains("is-open");

    if (!open) {
      /* atajo: Enter/Espacio ya lo maneja el botón de la tarjeta */
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
      return;
    }
    if (event.key === "Tab" && lbShell) {
      /* foco encerrado en los controles de la ficha */
      const focusables = Array.from(
        lbShell.querySelectorAll("button:not([disabled])")
      ).filter((el) => el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  /* ---------- footer: luz que sigue al cursor + volver arriba ---------- */
  const footer = document.querySelector("[data-light]");
  if (footer && !reduceMotion) {
    footer.addEventListener("pointermove", (event) => {
      const rect = footer.getBoundingClientRect();
      footer.style.setProperty("--mx", ((event.clientX - rect.left) / rect.width) * 100 + "%");
      footer.style.setProperty("--my", ((event.clientY - rect.top) / rect.height) * 100 + "%");
      footer.classList.add("is-lit");
    });
    footer.addEventListener("pointerleave", () => footer.classList.remove("is-lit"));
  }

  const upBtn = document.querySelector(".ft-up");
  if (upBtn) {
    upBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }
})();
