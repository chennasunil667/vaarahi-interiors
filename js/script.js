document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".nav");
  const toggle = document.querySelector(".menu-toggle");

  // Mobile menu: hidden by default, opened only after tapping the hamburger.
  if (menu && toggle) {
    const closeMenu = () => {
      menu.classList.remove("open");
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    };

    // Never start with the mobile menu open.
    closeMenu();

    toggle.addEventListener("click", () => {
      const open = !menu.classList.contains("open");
      menu.classList.toggle("open", open);
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    document.querySelectorAll(".nav a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });
  }

  // Subtle reveal for content sections.
  const revealItems = document.querySelectorAll(
    ".manifesto-content, .featured-card, .capability-list a, .philosophy-image, .philosophy-copy, .service-detail, .value-grid article, .portfolio-grid .project, .contact-detail"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealItems.forEach((item, index) => {
      item.classList.add("reveal-item");
      item.style.setProperty("--reveal-delay", `${Math.min(index * 45, 220)}ms`);
      observer.observe(item);
    });
  }


  // Home hero slideshow: three featured spaces, cross-fading automatically.
  const heroSlides = document.querySelectorAll(".hero-slideshow .signature-hero-image");
  if (heroSlides.length > 1) {
    let heroIndex = 0;
    window.setInterval(() => {
      heroSlides[heroIndex].classList.remove("is-active");
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add("is-active");
    }, 5000);
  }

  // Keep internal page navigation feeling intentional without interfering with normal back/forward.
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener("click", event => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || link.target === "_blank") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      event.preventDefault();
      document.body.classList.add("page-leaving");
      setTimeout(() => { window.location.href = href; }, 180);
    });
  });
});

function handleContact(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const name = data.get("name") || "";
  const phone = data.get("phone") || "";
  const project = data.get("project") || "";
  const message = data.get("message") || "";
  const text = `Hello Vaarahi Interiors,\n\nName: ${name}\nPhone: ${phone}\nProject Type: ${project}\nRequirement: ${message}`;
  window.open(`https://wa.me/917207945633?text=${encodeURIComponent(text)}`, "_blank");
  const note = document.getElementById("form-note");
  if (note) note.textContent = "Opening WhatsApp to send your enquiry…";
  form.reset();
  return false;
}


// ===== EXPERIENCE STATS COUNT-UP =====
// Starts the number animation only when the stats section enters the viewport.
(function initStatCounters(){
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const runCounter = (el) => {
    const target = Number(el.dataset.target);
    const duration = 1500;
    const start = performance.now();

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.round(target * easeOut(progress));
      el.textContent = value + '+';
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const section = document.querySelector('.experience-stats');
  if (!section || !('IntersectionObserver' in window)) {
    counters.forEach((el) => { el.textContent = Number(el.dataset.target) + '+'; });
    return;
  }

  let hasAnimated = false;
  const observer = new IntersectionObserver((entries) => {
    if (hasAnimated || !entries.some((entry) => entry.isIntersecting)) return;
    hasAnimated = true;
    counters.forEach(runCounter);
    observer.disconnect();
  }, { threshold: 0.25 });

  observer.observe(section);
})();
