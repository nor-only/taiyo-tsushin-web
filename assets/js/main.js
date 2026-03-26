/* ============================================
   TAIYO TSUSHIN - Main JavaScript
   Premium Minimal Interactions
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {

  // --- Loading Screen ---
  const loadingScreen = document.querySelector(".loading-screen");
  if (loadingScreen) {
    window.addEventListener("load", () => {
      setTimeout(() => loadingScreen.classList.add("is-hidden"), 400);
    });
    setTimeout(() => loadingScreen.classList.add("is-hidden"), 2500);
  }

  // --- Header Scroll ---
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // --- Mobile Navigation ---
  const navToggle = document.querySelector(".nav-toggle");
  const navMobile = document.querySelector(".nav-mobile");
  const navOverlay = document.querySelector(".nav-overlay");

  if (navToggle && navMobile && navOverlay) {
    const toggleNav = () => {
      navToggle.classList.toggle("is-active");
      navMobile.classList.toggle("is-open");
      navOverlay.classList.toggle("is-visible");
      document.body.style.overflow = navMobile.classList.contains("is-open") ? "hidden" : "";
    };
    navToggle.addEventListener("click", toggleNav);
    navOverlay.addEventListener("click", toggleNav);
    navMobile.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => { if (navMobile.classList.contains("is-open")) toggleNav(); });
    });
  }

  // --- Scroll Reveal (Intersection Observer) ---
  const revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --- FAQ Accordion ---
  document.querySelectorAll(".faq-item").forEach(item => {
    const question = item.querySelector(".faq-item__question");
    if (question) {
      question.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        const parent = item.closest(".faq-section");
        if (parent) {
          parent.querySelectorAll(".faq-item.is-open").forEach(openItem => {
            if (openItem !== item) openItem.classList.remove("is-open");
          });
        }
        item.classList.toggle("is-open", !isOpen);
      });
    }
  });

  // --- Scroll to Top ---
  const scrollTopBtn = document.querySelector(".scroll-top");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.classList.toggle("is-visible", window.scrollY > 500);
    }, { passive: true });
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- Page Transition ---
  // Works on both file:// and http:// by resolving href to absolute URL via <a>.href
  const pageTransition = document.querySelector(".page-transition");
  if (pageTransition) {
    document.querySelectorAll('a').forEach(link => {
      link.addEventListener("click", (e) => {
        const rawHref = link.getAttribute("href");
        // Skip anchors, tel, mailto, external, cross-site, new-tab links
        if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("tel:") ||
            rawHref.startsWith("mailto:") || rawHref.startsWith("http") ||
            rawHref.includes("future-tec-web") || rawHref.includes("ai-sanin-web") ||
            rawHref.includes("taiyo-tsushin-web") ||
            link.getAttribute("target")) return;
        // Use the resolved absolute URL from the DOM
        const resolvedUrl = link.href;
        if (!resolvedUrl) return;
        e.preventDefault();
        pageTransition.style.transformOrigin = "bottom";
        pageTransition.style.transform = "scaleY(1)";
        pageTransition.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        setTimeout(() => { window.location.href = resolvedUrl; }, 400);
      });
    });

    window.addEventListener("pageshow", (event) => {
      // Reset transition on back/forward navigation (bfcache)
      pageTransition.style.transformOrigin = "top";
      pageTransition.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
      requestAnimationFrame(() => { pageTransition.style.transform = "scaleY(0)"; });
    });
  }

  // --- Form Validation ---
  document.querySelectorAll("form[data-validate]").forEach(form => {
    form.addEventListener("submit", (e) => {
      let isValid = true;
      form.querySelectorAll("[required]").forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderBottomColor = "var(--accent)";
          input.addEventListener("input", () => { input.style.borderBottomColor = ""; }, { once: true });
        }
      });
      if (!isValid) { e.preventDefault(); alert("必須項目を入力してください。"); }
    });
  });

});
