import { auth } from "./firebase";
import { ui } from "../components/ui_class";

// SIGN IN
const signInForm = document.getElementById("signInForm");
const emailDOM = signInForm["signInEmail"];
const passwordDOM = signInForm["signInPassword"];

signInForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = emailDOM.value;
  const password = passwordDOM.value;

  // sign up test
  auth.createUserWithEmailAndPassword(email, password).then(data => {
    console.log(data);
    ui.hideModalDefault();
    signInForm.reset();
  });
});

console.log("Auth.js");
