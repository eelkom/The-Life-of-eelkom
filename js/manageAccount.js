import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
(() => {
    // set footer 
    if (document.body.clientHeight < window.innerHeight) {
        const footer = document.querySelector('.footer');
        footer.style.position = "absolute";
        footer.style.bottom = "0";
    }
    // Import the functions you need from the SDKs you need
    
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
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

    const signUpEmail = document.querySelector('#signUpEmail');
    const signUpPassword = document.querySelector('#signUpPassword');
    const signUpButton = document.querySelector('#signUpButton');

    signUpButton.addEventListener('click', (e) => {
        e.preventDefault(); // 새로고침 방지
        const email = signUpEmail.value;
        const password = signUpPassword.value;
        // console.log(email, password);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                console.log(userCredential);
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                console.log('error');
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    })

    const signInEmail = document.querySelector('#signInEmail');
    const signInPassword = document.querySelector('#signInPassword');
    const signInButton = document.querySelector('#signInButton');

    signInButton.addEventListener('click', (e) => {
        e.preventDefault(); // 새로고침 방지
        const email = signInEmail.value;
        const password = signInPassword.value;
        console.log(email, password);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                console.log(userCredential);
                const user = userCredential.user;
                // ...
                window.location.href = 'myPage.html';
            })
            .catch((error) => {
                console.log('eroor');
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    })

    const signOutButton = document.querySelector('#signOutButton');

    signOutButton.addEventListener('click', () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('성공');
            window.location.href = 'index.html';
        }).catch((error) => {
            // An error happened.
        });
    })
})();
