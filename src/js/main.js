const signInButton = document.getElementById("signInBtn");
const overlay = document.querySelector(".overlay");

signInButton.addEventListener("click", () => {
  overlay.classList.add("overlay-visible");
});

overlay.addEventListener("click", e => {
  const item = e.target;
  if (item.classList.contains("overlay")) {
    overlay.classList.remove("overlay-visible");
  }
});

const searchButton = document.getElementById("searchBtn");
const searchBar = document.querySelector(".search-bar");

searchButton.addEventListener("click", () => {
  searchBar.classList.toggle("search-bar-active");
});
