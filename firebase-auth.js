
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";


import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";


const firebaseConfig = {
   apiKey: "AIzaSyC-reUZrvsdL7okXQpKYFroxC6irNy5XMU",
  authDomain: "loginpage-b1b24.firebaseapp.com",
  projectId: "loginpage-b1b24",
  storageBucket: "loginpage-b1b24.firebasestorage.app",
  messagingSenderId: "871935597767",
  appId: "1:871935597767:web:8a437f39c1ea5b98c9f2e2",
  measurementId: "G-886ZEPLWPS"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // 
const analytics = getAnalytics(app);


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


window.logout = function () {
    signOut(auth).then(() => {
        alert("Logout Successful!");
        window.location.href = "index.html"; // Redirect to login page
    }).catch((error) => {
        console.error("Logout Error:", error.message);
    });
};

const googleProvider = new GoogleAuthProvider();

document.getElementById("google-signin").addEventListener("click", () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      console.log("Google User:", result.user);
      alert("Google Sign-In Successful!");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("Google Sign-In Error:", error.message);
    });
});

document.getElementById("anonymous-signin").addEventListener("click", () => {
  signInAnonymously(auth)
    .then(() => {
      console.log("Signed in anonymously");
      alert("Anonymous Sign-In Successful!");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("Anonymous Sign-In Error:", error.message);
    });
});

window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  'size': 'invisible',
  'callback': (response) => {
    console.log("reCAPTCHA Verified");
  }
});


document.getElementById("phone-signin").addEventListener("click", () => {
  const phoneNumber = document.getElementById("phone-number").value;
  const appVerifier = window.recaptchaVerifier;

  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      const code = prompt("Enter the OTP sent to your phone:");
      return confirmationResult.confirm(code);
    })
    .then((result) => {
      console.log("Phone User:", result.user);
      alert("Phone Sign-In Successful!");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("Phone Sign-In Error:", error.message);
    });
});

window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  'size': 'invisible',
  'callback': (response) => {
    console.log("reCAPTCHA Verified");
  }
});


document.getElementById("phone-signin").addEventListener("click", () => {
  const phoneNumber = document.getElementById("phone-number").value;
  const appVerifier = window.recaptchaVerifier;

  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      const code = prompt("Enter the OTP sent to your phone:");
      return confirmationResult.confirm(code);
    })
    .then((result) => {
      console.log("Phone User:", result.user);
      alert("Phone Sign-In Successful!");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("Phone Sign-In Error:", error.message);
    });
});



export { auth };
