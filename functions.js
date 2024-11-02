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
