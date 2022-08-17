let header__burger = document.querySelector(".burger");
let header_menu = document.querySelector(".navbar");
let back = document.querySelector("body");
let header__list = document.querySelector(".menu");

header__burger.addEventListener("click", () => {
  header__burger.classList.toggle("active");
  header_menu.classList.toggle("active");
  back.classList.toggle("lock");
});

header__list.addEventListener("click", () => {
  header__list.classList.remove("active");
  back.classList.toggle("lock");
});
