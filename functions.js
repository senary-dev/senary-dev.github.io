let links = [
  { title: "about", href: "/" },
  {
    title: "contact us",
    href: "mailto:info@senary.dev?subject=Hi! I'm inquiring about your services!&body=Hello Senary,%0D%0A%0D%0APlease contact me at (xxx) xxx - xxxx or name@mail.com to discuss my web development needs! I look forward to hearing from you!%0D%0A%0D%0ARegards,%0D%0A%0D%0A<YOUR NAME HERE>",
  },
];
let ul = document.getElementsByTagName("ul")[0];

function navigationLinks() {
  function createNavList(link) {
    const li = createElem("li");
    const a = createElem("a");
    li.classList.add("flex");
    a.href = link.href;
    a.textContent = link.title;
    // a.classList.add("hover:text-slate-300");
    li.appendChild(a);
    ul.appendChild(li);
  }

  links.forEach((link) => {
    createNavList(link);
  });

  let classes = ["flex", "gap-3", "py-4", "px-8"];
  classnames(ul, classes);
}

function onClick() {
  let hero = document.getElementById("hero");
  let dialog = createElem("dialog");
  let h1 = createElem("h1");
  let button = createElem("button");
  let form = createElem("form");

  h1.textContent = "Hello, great to hear from you!";
  button.textContent = "close me!";

  form.appendChild(h1);
  form.appendChild(button);

  form.setAttribute("method", "dialog");
  let dialogClasses = [
    "p-16",
    "rounded-xl",
    "backdrop:bg-black/50",
    "backdrop:backdrop-blur-md",
  ];
  classnames(dialog, dialogClasses);

  dialog.appendChild(form);
  hero.appendChild(dialog);

  dialog.setAttribute("open", "");

  hero.appendChild(dialog);

  // alert("Button Clicked Bro!!");
}

function onClickSmooth(id) {
  let section = document.getElementById(id);
  section.scrollIntoView({ behavior: "smooth" });
}

function onNavScroll() {
  let nav = document.querySelector("nav");
  if (!nav) return;

  let fadeDistance = 160;
  let progress = Math.min(window.scrollY / fadeDistance, 1);

  nav.style.background = `linear-gradient(to right, rgba(14,165,233,${(
    progress * 0.92
  ).toFixed(2)}), rgba(79,70,229,${(progress * 0.92).toFixed(2)}))`;
  nav.style.backdropFilter = `blur(${(progress * 12).toFixed(1)}px)`;
  nav.style.boxShadow = `0 16px 48px -16px rgba(0,0,0,${(
    progress * 0.22
  ).toFixed(2)})`;

  nav.style.setProperty("--nav-scale", (1 - progress * 0.2).toFixed(3));
}

window.addEventListener("scroll", onNavScroll);
window.addEventListener("load", onNavScroll);

function toggleMobileMenu() {
  let menu = document.getElementById("mobile-menu");
  let toggle = document.getElementById("menu-toggle");
  if (!menu || !toggle) return;

  let isOpen = !menu.classList.contains("hidden");
  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

let mobileMenuCloseTimeout;

function openMobileMenu() {
  let menu = document.getElementById("mobile-menu");
  let toggle = document.getElementById("menu-toggle");
  let iconOpen = document.getElementById("menu-icon-open");
  let iconClose = document.getElementById("menu-icon-close");
  if (!menu || !toggle) return;

  clearTimeout(mobileMenuCloseTimeout);
  menu.classList.remove("hidden");
  // force a reflow so the transition runs from the closed state
  void menu.offsetHeight;
  menu.classList.remove("opacity-0", "-translate-y-4");
  menu.classList.add("opacity-100", "translate-y-0");

  toggle.setAttribute("aria-expanded", "true");
  iconOpen.classList.add("hidden");
  iconClose.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closeMobileMenu() {
  let menu = document.getElementById("mobile-menu");
  let toggle = document.getElementById("menu-toggle");
  let iconOpen = document.getElementById("menu-icon-open");
  let iconClose = document.getElementById("menu-icon-close");
  if (!menu || !toggle) return;

  menu.classList.remove("opacity-100", "translate-y-0");
  menu.classList.add("opacity-0", "-translate-y-4");

  clearTimeout(mobileMenuCloseTimeout);
  mobileMenuCloseTimeout = setTimeout(() => {
    menu.classList.add("hidden");
  }, 300);

  toggle.setAttribute("aria-expanded", "false");
  iconOpen.classList.remove("hidden");
  iconClose.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    closeMobileMenu();
  }
});

let toastTimeout;

function showToast(html) {
  let toast = document.getElementById("toast");
  let message = document.getElementById("toast-message");
  if (!toast || !message) return;

  message.innerHTML = html;
  toast.classList.remove("opacity-0", "-translate-y-4", "pointer-events-none");
  toast.classList.add("opacity-100", "translate-y-0");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(hideToast, 15000);
}

function hideToast() {
  let toast = document.getElementById("toast");
  if (!toast) return;

  toast.classList.add("opacity-0", "-translate-y-4", "pointer-events-none");
  toast.classList.remove("opacity-100", "translate-y-0");
  clearTimeout(toastTimeout);
}

function onContactSubmit(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let note = document.getElementById("note").value;

  let subject = encodeURIComponent("Hi! I'm inquiring about your services!");
  let body = encodeURIComponent(
    `Hello Senary,\n\nName: ${name}\nEmail: ${email}\n\n${note}`,
  );
  let mailtoUrl = `mailto:inquiry@senary.dev?subject=${subject}&body=${body}`;

  window.location.href = mailtoUrl;

  showToast(
    `Opening your email client now. If nothing happens, click here to email us directly: <a href="${mailtoUrl}" class="underline font-semibold text-amber-900">inquiry@senary.dev</a>`,
  );
}

function revealOnScroll() {
  let cards = document.querySelectorAll("[data-reveal-group] > *");
  if (!cards.length || !("IntersectionObserver" in window)) return;

  let observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry, i) => {
          // stagger cards that enter together so they cascade left to right
          entry.target.style.transitionDelay = `${i * 120}ms`;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
    },
    { threshold: 0.2 }
  );

  cards.forEach((card) => {
    card.classList.add("reveal");
    observer.observe(card);
  });
}

document.addEventListener("DOMContentLoaded", revealOnScroll);
