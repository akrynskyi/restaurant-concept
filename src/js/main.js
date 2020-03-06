const signInButton = document.getElementById("signInBtn");
const overlay = document.querySelector(".overlay");

signInButton.addEventListener("click", (e) => {
    overlay.classList.add("overlay-visible")
});


overlay.addEventListener("click", e => {
    const item = e.target;
    if(item.classList.contains("overlay")) {
        overlay.classList.remove("overlay-visible")
    }
});
