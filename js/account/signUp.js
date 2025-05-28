import { register } from "../firebase/services/authService.js";

const signUpEmail = document.querySelector("#signUpEmail");
const signUpPassword = document.querySelector("#signUpPassword");
const signUpButton = document.querySelector("#signUpButton");

signUpButton.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const email = signUpEmail.value;
    const password = signUpPassword.value;
    const userCredential = await register(email, password);

    alert(`Welcome [${userCredential.user.email}]`);
    window.location.href = "login.html";
  } catch (error) {
    alert("비밀번호는 최소 6자 이상이어야 합니다.");
    console.error(error);
  }
});
