/* ═══════════════════════════════════════════════════
   EVSolutions.js — FusionWorks EV Page Interactions
═══════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  /* ── 1. NAV: scroll-glass effect ──────────────── */
  const nav = document.getElementById("mainNav");
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── 2. NAV: mobile burger toggle ─────────────── */
  const burger = document.getElementById("navBurger");
  const navLinks = document.querySelector(".nav-links");
  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      const open = navLinks.classList.toggle("nav-links--open");
      burger.setAttribute("aria-expanded", open);
    });
  }

  /* ── 3. FADE-IN on scroll (IntersectionObserver) */
  const fadeEls = document.querySelectorAll(".fade-in");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = (el.dataset.index || 0) * 120;
          setTimeout(() => el.classList.add("visible"), delay);
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.15 },
  );
  fadeEls.forEach((el) => io.observe(el));

  /* ── 4. COLOR PICKER demo ──────────────────────── */
  const swatches = document.querySelectorAll(".swatch");
  const carBodyPath = document.getElementById("carBody");

  swatches.forEach((swatch) => {
    swatch.addEventListener("click", () => {
      swatches.forEach((s) => s.classList.remove("swatch--active"));
      swatch.classList.add("swatch--active");
      if (carBodyPath) {
        carBodyPath.style.transition = "fill 0.4s ease";
        carBodyPath.setAttribute("fill", swatch.dataset.color);
      }
    });
  });

  /* ── 5. SPEC TABS ──────────────────────────────── */
  const tabs = document.querySelectorAll(".spec-tab");
  const panels = document.querySelectorAll(".specs-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Active tab
      tabs.forEach((t) => t.classList.remove("spec-tab--active"));
      tab.classList.add("spec-tab--active");
      // Show panel
      const target = tab.dataset.tab;
      panels.forEach((panel) => {
        panel.classList.toggle(
          "specs-panel--active",
          panel.id === `tab-${target}`,
        );
      });
    });
  });

  /* ── 6. SMOOTH SCROLL for in-page links ────────── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // Close mobile nav if open
        navLinks && navLinks.classList.remove("nav-links--open");
      }
    });
  });

  /* ── 7. CONTACT FORM: basic validation ─────────── */
  const submitBtn = document.querySelector(".contact-form-row .btn--full");
  if (submitBtn) {
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const inputs = document.querySelectorAll(".c-input");
      let allFilled = true;

      inputs.forEach((input) => {
        const empty =
          input.value.trim() === "" ||
          (input.tagName === "SELECT" && input.value === "");
        input.style.borderColor = empty ? "#e63946" : "";
        if (empty) allFilled = false;
      });

      if (allFilled) {
        submitBtn.textContent = "✓ Request Sent!";
        submitBtn.style.background = "#27ae60";
        submitBtn.disabled = true;
        inputs.forEach((input) => {
          input.value = "";
        });
        setTimeout(() => {
          submitBtn.textContent = "Request Consultation";
          submitBtn.style.background = "";
          submitBtn.disabled = false;
        }, 3500);
      }
    });
  }
});

/* ── Mobile nav open styles (injected) ──────────────── */
const mobileStyle = document.createElement("style");
mobileStyle.textContent = `
  @media (max-width: 768px) {
    .nav-links--open {
      display: flex !important;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0; right: 0;
      background: rgba(10,10,15,0.97);
      backdrop-filter: blur(20px);
      padding: 1.5rem 2rem;
      gap: 1.2rem;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
  }
`;
document.head.appendChild(mobileStyle);
