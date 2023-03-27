// navbar
bgChanger(document.querySelector(".header-logo"), "#111646");

// hero typting effect
import setTyper from "./app/js/typing-effect.js";
const typingEl = document.getElementById("typing-text");
const typingTexts = ["simple", "beautiful", "delightful", "interactive"];
setTyper(typingEl, typingTexts);

// our version
import followingImg from "./app/js/following-img.js";
import bgChanger from "./app/js/bg-changer.js";
const ourVisionEl = document.getElementById("our-vision");
const rocketImg = document.getElementById("rocket-img");
const legoImg = document.getElementById("lego-img");
followingImg(ourVisionEl, rocketImg, legoImg);
