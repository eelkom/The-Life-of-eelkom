import {
  login,
  logout,
  observeAuth,
} from "../firebase/services/authService.js";

const signInEmail = document.querySelector("#signInEmail");
const signInPassword = document.querySelector("#signInPassword");
const signInButton = document.querySelector("#signInButton");
const signUpContainer = document.querySelector(".signUp-container");

signInButton.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const email = signInEmail.value;
    const password = signInPassword.value;
    const userCredential = await login(email, password);

    alert(`Welcome [${userCredential.user.email}]`);
    window.location.href = "index.html";
  } catch (error) {
    alert("로그인 실패. 다시 시도하세요.");
    console.error(error);
  }
});

observeAuth(
  (user) => {
    signInButton.textContent = "Sign Out";
    signInButton.removeEventListener("click", login);
    signInButton.addEventListener("click", async () => {
      await logout();
      window.location.href = "index.html";
    });
    if (signUpContainer) signUpContainer.innerHTML = "";
  },
  () => {
    signInButton.textContent = "Sign In";
  }
);
