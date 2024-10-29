let links = [
  { title: "about", href: "/" },
  {
    title: "contact",
    href: "mailto:info@senary.dev?subject=Hi! I found you from your website!",
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
    a.classList.add("hover:text-slate-300");
    li.appendChild(a);
    ul.appendChild(li);
  }

  links.forEach((link) => {
    createNavList(link);
  });

  let classes = ["flex", "gap-8", "py-4", "px-8"];
  classnames(ul, classes);
}
