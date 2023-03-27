// select DOM
const navBar = document.querySelector(".nav-bar");
const mainElement = document.querySelector("main");
const goUpBtn = document.querySelector(".go-up-btn");
const hamburgerMenu = document.querySelector(".nav-menu");
const ShowMenuBtn = document.querySelector(".show-menu-btn");
const closeMenuBtn = document.querySelector(".close-menu-btn");
const readMoreBtn = document.querySelectorAll(".read-more-btn");
const thirdPartyMenu = document.querySelectorAll(".third-part-accordion-menu > div");

// show or hide nav bar and go up button based on scroll action
let lastScrollPosition;
let newScrollPosition = 0;
window.addEventListener("scroll", () => {
  lastScrollPosition = window.scrollY;

  document.querySelector(".hero").clientHeight < lastScrollPosition + 100 ? (navBar.style.backgroundColor = "#fff") : (navBar.style.background = "none");

  if (newScrollPosition < lastScrollPosition) {
    navBar.style.display = "none";
    goUpBtn.style.display = "none";
  } else if (newScrollPosition > lastScrollPosition) {
    navBar.style.display = "flex";
    goUpBtn.style.display = "flex";
  }

  window.scrollY == 0 && (goUpBtn.style.display = "none");

  newScrollPosition = lastScrollPosition;
});

// hamburger menu
Array.from(hamburgerMenu.children[1].children).forEach(button => {
  button.addEventListener("click", () => {
    hamburgerMenu.style.animation = "hide-hamburger-menu 1 linear 1s";
    setTimeout(() => (hamburgerMenu.style.display = "none"), 950);
  });
});

// show / hide hamburger menu
ShowMenuBtn.addEventListener("click", () => (hamburgerMenu.style.cssText = "display: flex; animation: show-hamburger-menu 1 linear 1s"));

closeMenuBtn.addEventListener("click", async () => {
  hamburgerMenu.style.animation = "hide-hamburger-menu 1 linear 1s";
  setTimeout(() => (hamburgerMenu.style.display = "none"), 950);
});

// animation on scroll for  parts of main
function scrollAnimation(element) {
  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset + window.innerHeight;
    if (scrollPosition >= element.offsetTop && window.innerWidth > 1100) {
      element.children[0].style.animation = "text-scroll-animation 1 linear 1s";
      element.children[1] && (element.children[1].style.animation = "up-animation-scroll 1 linear 1s");
    }
  });
}
Array.from(mainElement.children).forEach(child => scrollAnimation(child));

// accordion menu
thirdPartyMenu.forEach(menuOption => {
  menuOption.addEventListener("click", () => {
    let isAccordionOpen = menuOption.children[1].style.display == "block" ? true : false;
    // open accordion
    if (!isAccordionOpen) {
      thirdPartyMenu.forEach(element => {
        element.children[1].style.display = "none";
        element.children[0].children[1].className = "fa fa-plus";
      });
      menuOption.children[1].style.display = "block";
      menuOption.children[0].children[1].className = "fas fa-minus";
      isAccordionOpen = true;
      // close accordion
    } else {
      menuOption.children[0].children[1].className = "fa fa-plus";
      menuOption.children[1].style.display = "none";
      isAccordionOpen = false;
    }
  });
});

// open or close the read more button for forth part (our leaders)
readMoreBtn.forEach(button => {
  let isReadMoreClose = true;

  button.addEventListener("click", () => {
    // show more info
    if (isReadMoreClose) {
      button.nextElementSibling.style.display = "block";
      isReadMoreClose = false;
      // hide more info
    } else {
      button.nextElementSibling.style.display = "none";
      isReadMoreClose = true;
    }
  });
});
