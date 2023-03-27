export default function bgChanger(element, color) {
  const defaultColor = element.style.color;
  const mainChild = Array.from(document.body.children[1].children);

  addEventListener("scroll", () => {
    element.style.color = defaultColor;

    mainChild.map((child) => {
      if (window.scrollY >= child.offsetTop - element.clientHeight) {
        if (Array.from(child.classList).includes("light")) element.style.color = color;
        else element.style.color = defaultColor;
      }
    });
  });
}
