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

function onAboutClick() {
  let aboutSection = document.getElementById("about");
  aboutSection.scrollIntoView({ behavior: "smooth" });
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
}

window.addEventListener("scroll", onNavScroll);
window.addEventListener("load", onNavScroll);

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

  let subject = encodeURIComponent(
    "Hi! I'm inquiring about your services!"
  );
  let body = encodeURIComponent(
    `Hello Senary,\n\nName: ${name}\nEmail: ${email}\n\n${note}`
  );
  let mailtoUrl = `mailto:inquiry@senary.dev?subject=${subject}&body=${body}`;

  window.location.href = mailtoUrl;

  showToast(
    `Opening your email client now. If nothing happens, click here to email us directly: <a href="${mailtoUrl}" class="underline font-semibold text-amber-900">inquiry@senary.dev</a>`
  );
}
