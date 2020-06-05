import { views } from "../view/index.js";
import { models } from "../model/index.model.js";

export default () => {
  const view = views.signUp();
  const email = view.querySelector("#email");
  const password = view.querySelector("#lastItem");
  const signUpBtn = view.querySelector("#btnSignUp");
  const messageResult = view.querySelector("#messageResult");
  const confirmPassword = view.querySelector("#confirmPassword");

  confirmPassword.addEventListener("keyup", (e) => {
    e.preventDefault();
    const buttonRemoveClass = view.querySelector(".loginButton");
    if (password.value !== confirmPassword.value) {
      messageResult.innerHTML = "Las contraseñas no coinciden";
      buttonRemoveClass.classList.add("disabled-button");
    } else {
      messageResult.innerHTML = "También puedes registrarte con... ";
      buttonRemoveClass.classList.remove("disabled-button");
    }
  });

  signUpBtn.addEventListener("click", () => {
    const name = view.querySelector("#name").value;
    models.signUpModel
      .signUpEmailPassword(email.value, password.value)
      .then(() => models.signUpModel.updateDisplayName(name))
      .then(() => {
        messageResult.innerHTML = "Registro exitoso: redireccionando";
        setTimeout(() => (window.location.hash = "#/"), 1000);
      })
      .catch((error) => {
        let message = "";
        if (error.code === "auth/invalid-email")
          message = "Ingrese un correo válido";
        else if (error.code === "auth/weak-password")
          message = "Contraseña débil, mínimo 6 carácteres";
        else if (error.code === "auth/email-already-in-use")
          message = "Usted ya esta registrado";
        setTimeout(() => (messageResult.innerHTML = message), 1000);
      });
  });

  const gmailButton = view.querySelector("#gmail");
  gmailButton.addEventListener("click", models.logInModel.authGmail);

  const facebookButton = view.querySelector("#facebook");
  facebookButton.addEventListener("click", models.logInModel.authFacebook);

  return view;
};
