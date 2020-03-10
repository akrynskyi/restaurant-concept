import { auth } from "./firebase";
import { ui } from "../components/ui_class";

// SIGN IN
const signInForm = document.getElementById("signInForm");
const emailDOM = signInForm["signInEmail"];
const passwordDOM = signInForm["signInPassword"];

const spinner = document.getElementById("loader");

signInForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = emailDOM.value;
  const password = passwordDOM.value;
  spinner.classList.add("loader-container-active");

  // sign up test
  auth.createUserWithEmailAndPassword(email, password)
      .then(data => {
          console.log(data);
          spinner.classList.remove("loader-container-active");
          ui.hideModalDefault();
          signInForm.reset();
  }).catch(error => {
    console.error(error)
  });
});

console.log("Auth.js");
