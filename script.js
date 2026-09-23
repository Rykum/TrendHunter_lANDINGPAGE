/* ============================================================
   TRENDHUNTER — interaction system
   Motion must reveal meaning. Nothing here is decoration.
   ============================================================ */

(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- hero entrance ---------- */
  window.addEventListener("load", function () {
    document.body.classList.add("is-loaded");
  });
  // fallback if load already fired or is delayed
  setTimeout(function () { document.body.classList.add("is-loaded"); }, 600);

  /* ---------- custom cursor ---------- */
  if (finePointer && !reducedMotion && document.getElementById("cursor") && document.getElementById("cursorLabel")) {
    var cursor = document.getElementById("cursor");
    var label = document.getElementById("cursorLabel");
    var cx = -100, cy = -100, tx = -100, ty = -100;

    document.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      cursor.classList.add("is-tracking");
    });

    (function loop() {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      cursor.style.transform = "translate(" + cx + "px," + cy + "px)";
      requestAnimationFrame(loop);
    })();

    document.querySelectorAll("[data-cursor]").forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        var CURSOR_PT = {
          "TOP": "TOPO", "OPEN": "ABRIR", "MENU": "MENU", "VIEW": "VER",
          "READ": "LER", "GO": "IR", "EXPLORE SIGNAL": "EXPLORAR SINAL",
          "EXPLORE": "EXPLORAR", "DETECT": "DETECTAR"
        };
        var cur = el.getAttribute("data-cursor");
        label.textContent = "[ " + (CURSOR_PT[cur] || cur) + " ]";
        cursor.classList.add("is-active");
      });
      el.addEventListener("mouseleave", function () {
        cursor.classList.remove("is-active");
      });
    });
  } else {
    var c = document.getElementById("cursor");
    if (c) c.style.display = "none";
  }

  /* ---------- menu overlay ---------- */
  var menuBtn = document.getElementById("menuBtn");
  var menuOverlay = document.getElementById("menuOverlay");

  if (menuBtn && menuOverlay) {
    function toggleMenu(force) {
      var open = typeof force === "boolean" ? force : menuOverlay.hidden;
      menuOverlay.hidden = !open;
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.innerHTML = open ? 'FECHAR <span aria-hidden="true">×</span>'
                               : 'MENU <span aria-hidden="true">☰</span>';
      if (open) {
        var firstLink = menuOverlay.querySelector("a");
        if (firstLink) firstLink.focus();
      } else {
        menuBtn.focus();
      }
    }
    menuBtn.addEventListener("click", function () { toggleMenu(); });
    menuOverlay.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { toggleMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (menuOverlay.hidden) return;
      if (e.key === "Escape") { toggleMenu(false); return; }
      // keep Tab cycling inside the dialog
      if (e.key === "Tab") {
        var focusables = Array.prototype.slice.call(
          menuOverlay.querySelectorAll("a")
        );
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    });
  }

  /* ---------- scroll progress rule ---------- */
  var ruleFill = document.getElementById("scrollRuleFill");

  /* ---------- reveal on scroll ---------- */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll(".reveal, .signal-chart").forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ---------- noise dots inside the intelligence chart ---------- */
  var dotsGroup = document.getElementById("noiseDots");
  if (dotsGroup) {
    var svgNS = "http://www.w3.org/2000/svg";
    for (var i = 0; i < 240; i++) {
      var dot = document.createElementNS(svgNS, "circle");
      // density concentrated at the bottom, thinning upward
      var y = 420 - Math.pow(Math.random(), 1.8) * 420;
      dot.setAttribute("cx", (Math.random() * 1200).toFixed(1));
      dot.setAttribute("cy", y.toFixed(1));
      dot.setAttribute("r", (Math.random() * 1.6 + 0.4).toFixed(2));
      dot.setAttribute("opacity", (Math.random() * 0.28 + 0.05).toFixed(2));
      dotsGroup.appendChild(dot);
    }
  }

  /* ============================================================
     02 / NOISE — the signature signal-detection field
     ============================================================ */
  var noiseField = document.getElementById("noiseField");
  var noiseWords = [];
  var WORDS = ["POST", "MEME", "VÍDEO", "CRIADOR", "COMENTÁRIO", "ESTILO",
               "SOM", "FORMATO", "TREND", "REMIX", "THREAD", "CLIPE",
               "DUETO", "STITCH", "LIVE", "FEED", "VIRAL", "NICHO"];

  function noiseToken(i) {
    var r = Math.random();
    if (r < 0.72) return { t: WORDS[i % WORDS.length], meta: false };
    if (r < 0.82) return { t: "SINAL / 00" + (10 + Math.floor(Math.random() * 89)), meta: true };
    if (r < 0.92) return { t: "+" + (Math.random() * 60).toFixed(1) + "%", meta: true };
    return { t: "08." + (10 + Math.floor(Math.random() * 18)) + ".26", meta: true };
  }

  if (noiseField) {
    var count = window.innerWidth < 860 ? 150 : 300;
    for (var j = 0; j < count; j++) {
      var span = document.createElement("span");
      var token = noiseToken(j);
      var isSignal = Math.random() < 0.04;
      span.className = "noise-word" + (token.meta ? " is-meta" : "") + (isSignal ? " is-signal" : "");
      span.textContent = token.t;
      var base = isSignal ? 0.35 : Math.random() * 0.16 + 0.06;
      span.style.setProperty("--o", base.toFixed(2));
      noiseField.appendChild(span);
      noiseWords.push({ el: span, base: base, x: 0, y: 0 });
    }

    function cacheWordPositions() {
      noiseWords.forEach(function (w) {
        var r = w.el.getBoundingClientRect();
        w.x = r.left + r.width / 2 + window.scrollX;
        w.y = r.top + r.height / 2 + window.scrollY;
      });
    }
    cacheWordPositions();
    window.addEventListener("resize", cacheWordPositions);
    // layout shifts when fonts load — recache so detection stays aligned
    window.addEventListener("load", cacheWordPositions);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(cacheWordPositions);
    }

    if (!reducedMotion) {
      var noiseSection = document.getElementById("noise");
      var pending = false, mx = -9999, my = -9999;
      var RADIUS = 220;

      function revealAt() {
        pending = false;
        noiseWords.forEach(function (w) {
          var dx = w.x - mx, dy = w.y - my;
          var d = Math.sqrt(dx * dx + dy * dy);
          var boost = Math.max(0, 1 - d / RADIUS);
          var opacity = Math.min(1, w.base + boost * boost * 0.95);
          w.el.style.opacity = opacity.toFixed(2);
        });
      }

      function scheduleReveal(x, y) {
        mx = x + window.scrollX;
        my = y + window.scrollY;
        if (!pending) {
          pending = true;
          requestAnimationFrame(revealAt);
        }
      }

      function resetField() {
        noiseWords.forEach(function (w) { w.el.style.opacity = ""; });
      }

      if (finePointer) {
        noiseSection.setAttribute("data-cursor", "DETECT");
        noiseSection.addEventListener("mousemove", function (e) {
          scheduleReveal(e.clientX, e.clientY);
        });
        noiseSection.addEventListener("mouseleave", resetField);
      }

      // touch: drag across the field to detect, lift finger to reset
      noiseSection.addEventListener("touchstart", function (e) {
        var t = e.touches[0];
        scheduleReveal(t.clientX, t.clientY);
      }, { passive: true });
      noiseSection.addEventListener("touchmove", function (e) {
        var t = e.touches[0];
        scheduleReveal(t.clientX, t.clientY);
      }, { passive: true });
      noiseSection.addEventListener("touchend", resetField);
    }
  }

  /* ============================================================
     03 / FIND THE SIGNAL — scroll-driven narrative states
     ============================================================ */
  var signalSection = document.getElementById("signal");
  var signalCaption = document.getElementById("signalCaption");
  var CAPTIONS = [
    "TUDO SE SOBREPÕE. NADA ESTÁ CLARO AINDA.",
    "UM PADRÃO PERMANECE.",
    "O SINAL SE REPETE.",
    "A REPETIÇÃO VIRA PADRÃO.",
    "O PADRÃO VIRA DIREÇÃO.",
    "ISSO É UMA TENDÊNCIA. NÓS VIMOS PRIMEIRO."
  ];

  /* ---------- unified scroll handler (rule, signal, parallax) ---------- */
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  var navEl = document.getElementById("nav");
  var navZones = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
  var spyLinks = Array.prototype.slice.call(document.querySelectorAll("[data-spy]"));
  var spySections = spyLinks
    .map(function (a) { return document.getElementById(a.getAttribute("data-spy")); })
    .filter(Boolean);
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var scrollY = window.scrollY;
      var vh = window.innerHeight;

      // progress rule
      var max = document.documentElement.scrollHeight - vh;
      if (ruleFill) ruleFill.style.transform = "scaleY(" + (max > 0 ? scrollY / max : 0) + ")";

      // nav theme follows the section underneath it
      for (var z = 0; z < navZones.length; z++) {
        var zr = navZones[z].getBoundingClientRect();
        if (zr.top <= 40 && zr.bottom > 40) {
          navEl.classList.toggle("is-on-light", navZones[z].getAttribute("data-nav") === "light");
          break;
        }
      }

      // scroll spy: mark the current section in the nav
      var currentId = null;
      for (var s = 0; s < spySections.length; s++) {
        if (spySections[s].getBoundingClientRect().top <= vh * 0.45) {
          currentId = spySections[s].id;
        }
      }
      spyLinks.forEach(function (a) {
        var isCurrent = a.getAttribute("data-spy") === currentId;
        if (isCurrent) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });

      // signal narrative states
      if (signalSection) {
        var rect = signalSection.getBoundingClientRect();
        var total = rect.height - vh;
        var progress = Math.min(1, Math.max(0, -rect.top / (total || 1)));
        var state = Math.min(5, Math.floor(progress * 6.4));
        if (signalSection.getAttribute("data-state") !== String(state)) {
          signalSection.setAttribute("data-state", String(state));
          if (signalCaption) signalCaption.textContent = CAPTIONS[state];
        }
      }

      // low-intensity parallax
      if (!reducedMotion) {
        parallaxEls.forEach(function (el) {
          var r = el.getBoundingClientRect();
          var offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.getAttribute("data-parallax"));
          el.style.transform = "translateY(" + (-offset).toFixed(1) + "px)";
        });
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
