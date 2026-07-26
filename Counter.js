// ==========================================
// LIVE VIEW COUNTER
// Fetches a persistent hit count from Abacus
// (free, no signup, no API key required)
// ==========================================

(function () {
  // Change this to something unique to your site so it doesn't collide
  // with anyone else's counter. Namespaces are public but not editable
  // by others unless they know your exact key.
  const NAMESPACE = "om-parihar-portfolio";
  const KEY = "site-visits";
  const ENDPOINT = `https://abacus.jasoncameron.dev/hit/${NAMESPACE}/${KEY}`;

  function animateCount(el, target) {
    const duration = 800; // ms
    const start = 0;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(start + (target - start) * eased);
      el.textContent = current.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toLocaleString();
      }
    }
    requestAnimationFrame(tick);
  }

  function initViewCounter() {
    const numEl = document.querySelector(".view-counter-num");
    if (!numEl) return; // widget not present on this page, skip quietly

    numEl.classList.add("is-loading");

    fetch(ENDPOINT)
      .then((res) => {
        if (!res.ok) throw new Error("Counter request failed");
        return res.json();
      })
      .then((data) => {
        numEl.classList.remove("is-loading");
        animateCount(numEl, data.value);
      })
      .catch(() => {
        numEl.classList.remove("is-loading");
        numEl.textContent = "—";
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initViewCounter);
  } else {
    initViewCounter();
  }
})();