/* Bounded photographic depth. No perpetual animation loop or scroll hijacking. */
(function () {
  "use strict";
  var preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reducedMotion = preference.matches;
  var heroSection = document.getElementById("hero");
  var layers = Array.prototype.slice.call(document.querySelectorAll("[data-hero-parallax]"));
  var pending = false;
  function updateHeroParallax() {
    pending = false;
    if (!heroSection || reducedMotion) return;
    var rect = heroSection.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    var distance = Math.min(240, Math.max(0, -rect.top));
    layers.forEach(function (layer) {
      var intensity = parseFloat(layer.getAttribute("data-hero-parallax")) || 0;
      layer.style.transform = "translate3d(0," + (distance * intensity).toFixed(1) + "px,0)";
    });
  }
  function schedule() {
    if (pending || reducedMotion) return;
    pending = true;
    requestAnimationFrame(updateHeroParallax);
  }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  preference.addEventListener("change", function (event) {
    reducedMotion = event.matches;
    layers.forEach(function (layer) { layer.style.transform = ""; });
    schedule();
  });
  schedule();
})();
