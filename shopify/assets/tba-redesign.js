/* ============================================================
   Tamarua Beauty Academy — homepage redesign behaviour
   Every routine is null-guarded and idempotent so it survives
   Turbo's InstantClick and the theme editor's section reloads.
   ============================================================ */
(function () {
  "use strict";

  var DONE = "tbaBound"; // dataset flag: never bind the same node twice

  function bound(el) {
    if (!el || el.dataset[DONE]) return true;
    el.dataset[DONE] = "1";
    return false;
  }

  /* ---------- year ---------- */
  function year() {
    var el = document.getElementById("tba-year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- logo fallback (if the uploaded logo can't load, show the wordmark) ---------- */
  function logos() {
    document.querySelectorAll("[data-logo]").forEach(function (img) {
      if (bound(img)) return;
      var tried = false;
      function degrade() {
        var local = img.getAttribute("data-logo-fallback");
        if (local && !tried) { tried = true; img.src = local; return; } // primary down -> bundled SVG
        var brand = img.closest(".tba-brand");
        if (brand) brand.classList.add("tba-is-fallback");               // both down -> CSS wordmark
      }
      img.addEventListener("error", degrade);
      if (img.complete && img.naturalWidth === 0) degrade();
    });
  }

  /* ---------- sticky header shadow ---------- */
  function sticky() {
    var header = document.querySelector(".tba-header");
    if (!header || bound(header)) return;
    var onScroll = function () {
      header.classList.toggle("tba-is-stuck", window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- mobile drawer ---------- */
  function drawer() {
    var burger = document.querySelector(".tba-burger"),
        panel  = document.querySelector(".tba-drawer"),
        scrim  = document.querySelector(".tba-scrim"),
        close  = document.querySelector("[data-tba-drawer-close]");
    if (!burger || !panel || !scrim || bound(panel)) return;

    function setDrawer(open) {
      panel.classList.toggle("tba-is-open", open);
      scrim.classList.toggle("tba-is-open", open);
      burger.classList.toggle("tba-is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    }

    burger.addEventListener("click", function () {
      setDrawer(!panel.classList.contains("tba-is-open"));
    });
    scrim.addEventListener("click", function () { setDrawer(false); });
    if (close) close.addEventListener("click", function () { setDrawer(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setDrawer(false);
    });
    panel.querySelectorAll('a[href*="#"]').forEach(function (a) {
      a.addEventListener("click", function () { setDrawer(false); });
    });

    /* drawer accordions */
    panel.querySelectorAll("[data-acc]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var sub = btn.nextElementSibling;
        if (!sub) return;
        var open = sub.classList.toggle("tba-is-open");
        btn.setAttribute("aria-expanded", String(open));
        var svg = btn.querySelector("svg");
        if (svg) svg.style.transform = open ? "rotate(180deg)" : "";
      });
    });
  }

  /* ---------- footer accordions (mobile only) ---------- */
  function footerAcc() {
    document.querySelectorAll("[data-facc]").forEach(function (h) {
      if (bound(h)) return;
      h.addEventListener("click", function () {
        if (window.matchMedia("(min-width:861px)").matches) return;
        var list = h.nextElementSibling;
        if (!list) return;
        var open = list.classList.toggle("tba-is-open");
        var svg = h.querySelector("svg");
        if (svg) svg.style.transform = open ? "rotate(180deg)" : "";
      });
    });
  }

  /* ---------- "read more" on the SEO intro ---------- */
  function readMore() {
    var rm = document.querySelector(".tba-readmore");
    if (!rm || bound(rm)) return;
    var btn = rm.querySelector("[data-tba-readmore]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var open = rm.classList.toggle("tba-is-open");
      btn.setAttribute("aria-expanded", String(open));
      var label = btn.querySelector("span");
      var svg = btn.querySelector("svg");
      if (label) label.textContent = open ? "Read Less" : "Read More";
      if (svg) svg.innerHTML = open ? '<path d="M1 6h10"/>' : '<path d="M6 1v10M1 6h10"/>';
      if (!open) rm.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* ---------- Google reviews marquee (right -> left) ----------
     The cards are rendered server-side by sections/tba-reviews.liquid so
     they are in the HTML for crawlers. All this does is clone the row once
     (so the -50% keyframe loops seamlessly), add "Read more" to the cards
     whose text is actually clipped, and pace the scroll by content width. */
  function marquee() {
    var track = document.querySelector(".tba-marquee__track");
    if (!track || bound(track)) return;

    var originals = Array.prototype.slice.call(track.children);
    if (!originals.length) return;

    originals.forEach(function (node) {
      var clone = node.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });

    function syncMarquee() {
      var anyOpen = !!track.querySelector(".tba-rcard.tba-is-open");
      track.style.animationPlayState = anyOpen ? "paused" : "";
    }

    requestAnimationFrame(function () {
      track.querySelectorAll(".tba-rcard").forEach(function (cardEl) {
        var bodyEl = cardEl.querySelector(".tba-rcard__body");
        if (!bodyEl || bodyEl.scrollHeight <= bodyEl.clientHeight + 2) return;
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "tba-rcard__more";
        btn.textContent = "Read more";
        btn.setAttribute("aria-expanded", "false");
        btn.addEventListener("click", function () {
          var open = cardEl.classList.toggle("tba-is-open");
          btn.textContent = open ? "Read less" : "Read more";
          btn.setAttribute("aria-expanded", String(open));
          syncMarquee();
        });
        cardEl.appendChild(btn);
      });

      // Pace by content width so speed stays constant regardless of card count.
      var w = track.scrollWidth / 2;
      track.style.animationDuration = Math.round(w / 55) + "s"; // ~55px per second
    });
  }

  function init() {
    year();
    logos();
    sticky();
    drawer();
    footerAcc();
    readMore();
    marquee();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Turbo (Out of the Sandbox) fires these on InstantClick navigation.
  document.addEventListener("page:load", init);
  document.addEventListener("shopify:section:load", init);
  document.addEventListener("shopify:section:unload", function (e) {
    // Let a re-added section re-bind cleanly in the theme editor.
    e.target.querySelectorAll("[data-tba-bound]").forEach(function (el) {
      delete el.dataset.tbaBound;
    });
  });
})();
