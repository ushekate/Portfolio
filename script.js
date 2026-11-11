/* Portfolio interactions: navigation, theme, typing, filtering, reveals and form validation. */
(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile navigation
  const menuToggle = $(".menu-toggle");
  const navLinks = $("#nav-links");
  const navAnchors = $$(".nav-link");
  function closeMenu() {
    navLinks?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation menu");
    if (menuToggle) menuToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
  }
  menuToggle?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    menuToggle.innerHTML = open
      ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
      : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
  });
  navAnchors.forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
  document.addEventListener("click", event => {
    if (navLinks?.classList.contains("open") && !navLinks.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });

  // Theme preference
  const themeToggle = $(".theme-toggle");
  const savedTheme = localStorage.getItem("unnati-portfolio-theme");
  if (savedTheme === "light" || savedTheme === "dark") document.documentElement.dataset.theme = savedTheme;
  function updateThemeButton() {
    const light = document.documentElement.dataset.theme === "light";
    if (!themeToggle) return;
    themeToggle.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
    themeToggle.title = light ? "Switch to dark theme" : "Switch to light theme";
    themeToggle.innerHTML = light
      ? '<i class="fa-regular fa-moon" aria-hidden="true"></i>'
      : '<i class="fa-regular fa-sun" aria-hidden="true"></i>';
  }
  updateThemeButton();
  themeToggle?.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("unnati-portfolio-theme", next);
    updateThemeButton();
  });

  // Animated role headline
  const typedRole = $("#typed-role");
  const roles = ["Frontend Developer", "React.js Developer", "Next.js Developer", "Full Stack Developer"];
  if (typedRole && !reduceMotion) {
    let roleIndex = 0, charIndex = roles[0].length, deleting = true;
    const typeNext = () => {
      const role = roles[roleIndex];
      typedRole.textContent = role.slice(0, charIndex);
      let delay = deleting ? 48 : 85;
      if (!deleting && charIndex === role.length) { deleting = true; delay = 1450; }
      else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 320; }
      else charIndex += deleting ? -1 : 1;
      window.setTimeout(typeNext, delay);
    };
    window.setTimeout(typeNext, 1600);
  }

  // Scroll reveal
  const revealItems = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealItems.forEach(item => revealObserver.observe(item));
  } else revealItems.forEach(item => item.classList.add("is-visible"));

  // Active navigation and scroll-to-top
  const scrollTop = $(".scroll-top");
  const sections = $$("main section[id]");
  let scrollTicking = false;
  function updateScrollUI() {
    const marker = window.scrollY + 150;
    let activeId = "home";
    sections.forEach(section => { if (section.offsetTop <= marker) activeId = section.id; });
    navAnchors.forEach(link => {
      const active = link.getAttribute("href") === `#${activeId}`;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    scrollTop?.classList.toggle("visible", window.scrollY > 450);
    scrollTicking = false;
  }
  window.addEventListener("scroll", () => {
    if (!scrollTicking) { window.requestAnimationFrame(updateScrollUI); scrollTicking = true; }
  }, { passive: true });
  updateScrollUI();
  scrollTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  // Project filters
  const filterButtons = $$(".filter-button");
  const projectCards = $$(".project-card");
  filterButtons.forEach(button => button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    projectCards.forEach(card => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.hidden = !visible;
    });
  }));

  // Current year
  const year = $("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Accessible client-side contact form validation. This does NOT send email.
  const form = $("#contact-form");
  const status = $("#form-status");
  const fields = {
    name: { element: $("#name"), error: $("#name-error"), message: "Please enter your name (at least 2 characters)." },
    email: { element: $("#email"), error: $("#email-error"), message: "Enter a valid email address." },
    subject: { element: $("#subject"), error: $("#subject-error"), message: "Please enter a subject (at least 3 characters)." },
    message: { element: $("#message"), error: $("#message-error"), message: "Please enter a message (at least 10 characters)." }
  };
  const validators = {
    name: value => value.trim().length >= 2,
    email: value => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()),
    subject: value => value.trim().length >= 3,
    message: value => value.trim().length >= 10
  };
  function validateField(key) {
    const field = fields[key];
    const valid = validators[key](field.element.value);
    field.element.setAttribute("aria-invalid", String(!valid));
    field.error.textContent = valid ? "" : field.message;
    return valid;
  }
  Object.keys(fields).forEach(key => {
    fields[key].element.addEventListener("blur", () => validateField(key));
    fields[key].element.addEventListener("input", () => {
      if (fields[key].element.hasAttribute("aria-invalid")) validateField(key);
      if (status) { status.className = "form-status"; status.textContent = "This demo validates your message in the browser. Connect a form service to send it."; }
    });
  });
  form?.addEventListener("submit", event => {
    event.preventDefault();
    const valid = Object.keys(fields).map(validateField).every(Boolean);
    if (!valid) {
      status.textContent = "Please fix the highlighted fields and try again.";
      status.className = "form-status error";
      fields[Object.keys(fields).find(key => !validators[key](fields[key].element.value))]?.element.focus();
      return;
    }
    status.textContent = "Validation successful. No message was sent because this form is not connected to an email or form service yet.";
    status.className = "form-status success";
  });
})();
