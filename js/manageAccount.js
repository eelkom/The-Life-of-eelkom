import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
(() => {
    // Import the functions you need from the SDKs you need    
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration (== Firebase 구성 정보)
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyBGEOM21vM40QwykbEZL9KolWhisePIiHE",
        authDomain: "myblog-1ebf8.firebaseapp.com",
        projectId: "myblog-1ebf8",
        storageBucket: "myblog-1ebf8.appspot.com",
        messagingSenderId: "473621287925",
        appId: "1:473621287925:web:557121f309dc91df3a06bc",
        measurementId: "G-M62ERXD800"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth();

    // signUp 회원가입
    const signUpEmail = document.querySelector('#signUpEmail');
    const signUpPassword = document.querySelector('#signUpPassword');
    const signUpButton = document.querySelector('#signUpButton');

    // signIn 로그인
    const signInEmail = document.querySelector('#signInEmail');
    const signInPassword = document.querySelector('#signInPassword');
    const signInButton = document.querySelector('#signInButton');

    function signUp(e) {
        e.preventDefault(); // 새로고침 방지
        const email = signUpEmail.value;
        const password = signUpPassword.value;
        // console.log(email, password);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    function signIn(e) {
        e.preventDefault(); // 새로고침 방지
        const email = signInEmail.value;
        const password = signInPassword.value;
        console.log(email, password);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                window.location.href = 'myPage.html';
            })
            .catch((error) => {
                console.log('error');
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    function signOutUser(e) {
        signOut(auth).then(() => {
            console.log('성공');
            signInButton.innerHTML = 'login';
            window.location.href = 'index.html';
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    // Firebase의 인증 상태가 변경될 때마다 호출되는 콜백 함수를 등록하는 메서드
    const container = document.querySelector('.main-container');
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // 사용자가 로그인한 경우         
            signInButton.innerHTML = "Sign Out";
            signInButton.removeEventListener('click', signIn);
            signInButton.addEventListener('click', signOutUser);
        } else {
            // 사용자가 로그아웃한 경우 또는 로그인하지 않은 경우
            signInButton.innerHTML = "Sign In";
            signInButton.removeEventListener('click', signOutUser);
            signInButton.addEventListener('click', signIn);
        }
    });
    // signInButton.addEventListener('click', signIn);
    signUpButton.addEventListener('click', signUp);
})();
