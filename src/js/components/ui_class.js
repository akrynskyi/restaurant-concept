const overlay = document.querySelector(".overlay");

class UI {
  showModal(element) {
    element.addEventListener("click", () => {
      overlay.classList.add("overlay-visible");
    });
  }

  hideModalDefault() {
    overlay.classList.remove("overlay-visible");
  }

  hideModalOnClick() {
    overlay.addEventListener("click", e => {
      if (e.target !== e.currentTarget) return;
      this.hideModalDefault();
    });
  }
}

export const ui = new UI();








