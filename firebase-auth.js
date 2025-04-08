// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";

// Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjUJB7BzinPjxqp6iRPFE0F3z83UgJ_Jg",
  authDomain: "login-f647e.firebaseapp.com",
  projectId: "login-f647e",
  storageBucket: "login-f647e.appspot.com",
  messagingSenderId: "750923276060",
  appId: "1:750923276060:web:fbd555bcc191e831a724d9",
  measurementId: "G-HLRQT6YXES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ✅ Initialize auth
const analytics = getAnalytics(app);

// ✅ Signup Function
document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User Signed Up:", userCredential.user);
            alert("Signup Successful! Now try logging in.");
        })
        .catch((error) => {
            console.error("Signup Error:", error.message);
            alert("Error: " + error.message);
        });
});

// ✅ Login Function
document.getElementById("signin-form").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User Logged In:", userCredential.user);
            alert("Login Successful!");
            window.location.href = "dashboard.html"; // Redirect after login
        })
        .catch((error) => {
            console.error("Login Error:", error.message);
            alert("Error: " + error.message);
        });
});

// ✅ Logout Function
window.logout = function () {
    signOut(auth).then(() => {
        alert("Logout Successful!");
        window.location.href = "index.html"; // Redirect to login page
    }).catch((error) => {
        console.error("Logout Error:", error.message);
    });
};

// ✅ Export auth (Only if needed in another module)
export { auth };
