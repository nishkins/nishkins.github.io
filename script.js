const root = document.documentElement;
const body = document.body;
const header = document.querySelector("[data-header]");
const navMenu = document.querySelector("[data-nav-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const progressBar = document.querySelector("[data-scroll-progress]");
const loader = document.querySelector("[data-loader]");
const typewriter = document.querySelector("[data-typewriter]");
const currentYear = document.querySelector("[data-current-year]");
const backToTop = document.querySelector("[data-back-to-top]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const profileImage = document.querySelector("[data-profile-image]");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const typewriterPhrases = [
  "Delivering seamless relocation experiences",
  "Coordinating destination services with precision",
  "Supporting assignees, HR teams, and global clients",
  "Improving mobility operations through service excellence"
];

function hideLoader() {
  if (!loader) return;
  loader.classList.add("is-hidden");
}

window.addEventListener("load", hideLoader);
window.setTimeout(hideLoader, 900);

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (profileImage) {
  profileImage.addEventListener("error", () => {
    profileImage.classList.add("is-missing");
  });
}

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("portfolio-theme", theme);

  if (themeToggle) {
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }
}

const savedTheme = localStorage.getItem("portfolio-theme");
setTheme(savedTheme === "dark" ? "dark" : "light");

themeToggle?.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

function closeMenu() {
  navMenu?.classList.remove("is-open");
  body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

function openMenu() {
  navMenu?.classList.add("is-open");
  body.classList.add("menu-open");
  menuToggle?.setAttribute("aria-expanded", "true");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = navMenu?.classList.contains("is-open");
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

navMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

function updateScrollState() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  header?.classList.toggle("is-scrolled", scrollTop > 16);
}

updateScrollState();
window.addEventListener("scroll", updateScrollState, { passive: true });

if (!reduceMotion && typewriter) {
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tickTypewriter() {
    const currentPhrase = typewriterPhrases[phraseIndex];
    typewriter.textContent = currentPhrase.slice(0, charIndex);

    if (!deleting && charIndex < currentPhrase.length) {
      charIndex += 1;
      window.setTimeout(tickTypewriter, 42);
      return;
    }

    if (!deleting && charIndex === currentPhrase.length) {
      deleting = true;
      window.setTimeout(tickTypewriter, 1550);
      return;
    }

    if (deleting && charIndex > 0) {
      charIndex -= 1;
      window.setTimeout(tickTypewriter, 24);
      return;
    }

    deleting = false;
    phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
    window.setTimeout(tickTypewriter, 250);
  }

  tickTypewriter();
} else if (typewriter) {
  typewriter.textContent = typewriterPhrases[0];
}

document.querySelectorAll("[data-reveal-delay]").forEach((element) => {
  element.style.setProperty("--reveal-delay", `${element.dataset.revealDelay}ms`);
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const counters = document.querySelectorAll("[data-counter]");

function animateCounter(counter) {
  const target = Number(counter.dataset.target || 0);
  const duration = 900;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = Math.round(target * eased).toString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

if ("IntersectionObserver" in window && !reduceMotion) {
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.8 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
} else {
  counters.forEach((counter) => {
    counter.textContent = counter.dataset.target || "0";
  });
}

const navLinks = Array.from(document.querySelectorAll(".nav__menu a"));
const sectionMap = navLinks
  .map((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    return section ? { link, section } : null;
  })
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => link.classList.remove("is-active"));
        const active = sectionMap.find((item) => item.section === entry.target);
        active?.link.classList.add("is-active");
      });
    },
    { threshold: 0.48 }
  );

  sectionMap.forEach(({ section }) => activeObserver.observe(section));
}

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const bodyText = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const body = encodeURIComponent(bodyText);

  window.location.href = `mailto:nishama.q@gmail.com?subject=${subject}&body=${body}`;

  if (formStatus) {
    formStatus.textContent = "Opening your email client with the message prepared.";
  }

  contactForm.reset();
});
