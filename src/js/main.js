// ---- DOM ELEMENTS ---- //
const overlay = document.querySelector(".overlay");
const searchBar = document.querySelector(".search-bar");
const dropdownMenu = document.querySelector(".dropdown-menu");
const signInButton = document.getElementById("signInBtn");
const searchButton = document.getElementById("searchBtn");
const userNavButton = document.getElementById("userNavBtn");

class UI {
  showSignInModal() {
    overlay.classList.add("overlay-visible");
  }
  hideSignInModal() {
    overlay.classList.remove("overlay-visible");
  }
}

export const ui = new UI();

signInButton.addEventListener("click", () => {
  ui.showSignInModal();
});

overlay.addEventListener("click", e => {
  if (e.target !== e.currentTarget) return;
  ui.hideSignInModal();
});

searchButton.addEventListener("click", () => {
  searchBar.classList.toggle("search-bar-active");
});

userNavButton.addEventListener("click", () => {
  dropdownMenu.classList.toggle("dropdown-menu-open");
  userNavButton.classList.toggle("user-nav__btn-active");
});
