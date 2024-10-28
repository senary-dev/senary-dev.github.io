let links = ["about", "contact"];
let ul = document.getElementsByTagName("ul")[0];

function navigationLinks() {
  function createNavList(link) {
    const li = createElem("li");
    li.classList.add("flex");
    li.textContent = link;
    ul.appendChild(li);
  }

  links.forEach((link) => {
    createNavList(link);
  });

  let classes = ["flex", "gap-5", "py-4", "px-8"];
  classnames(ul, classes);
}
