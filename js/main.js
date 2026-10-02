/* Grandpa's Kitchen · Dahab — small enhancements, no dependencies */
(function () {
  "use strict";

  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  /* Sticky nav: switch to solid once the hero scrolls away */
  const onScroll = () => {
    nav.classList.toggle("nav--solid", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile menu */
  const closeMenu = () => {
    nav.classList.remove("nav--open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
  };
  toggle.addEventListener("click", () => {
    const open = !nav.classList.contains("nav--open");
    nav.classList.toggle("nav--open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  });
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  /* Reveal on scroll */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* Open / closed right now, using Dahab's clock (Africa/Cairo), 13:00–22:00 daily */
  const OPEN_HOUR = 13;
  const CLOSE_HOUR = 22;
  const badge = document.getElementById("openBadge");
  const visitStatus = document.getElementById("visitStatus");
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Cairo", hour: "numeric", minute: "numeric", hour12: false
    }).formatToParts(new Date());
    const h = Number(parts.find((p) => p.type === "hour").value);
    const m = Number(parts.find((p) => p.type === "minute").value);
    const now = h * 60 + m;
    const isOpen = now >= OPEN_HOUR * 60 && now < CLOSE_HOUR * 60;

    if (badge) {
      badge.classList.toggle("open-badge--closed", !isOpen);
      badge.lastChild.textContent = isOpen ? "Open now · until 10pm" : "Opens daily at 1pm";
    }
    if (visitStatus) {
      if (isOpen) {
        const left = CLOSE_HOUR * 60 - now;
        visitStatus.textContent = left <= 60
          ? "Open now, closing soon. Last orders around 9:30pm."
          : "Open right now in Dahab.";
      } else {
        visitStatus.textContent = now < OPEN_HOUR * 60
          ? "Closed at the moment. Doors open at 1pm today."
          : "Closed for tonight. See you tomorrow from 1pm.";
      }
    }
  } catch (_) { /* Intl not available: keep static text */ }

  /* Footer year */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
