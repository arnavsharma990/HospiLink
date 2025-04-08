// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-reUZrvsdL7okXQpKYFroxC6irNy5XMU",
  authDomain: "loginpage-b1b24.firebaseapp.com",
  projectId: "loginpage-b1b24",
  storageBucket: "loginpage-b1b24.firebasestorage.app",
  messagingSenderId: "871935597767",
  appId: "1:871935597767:web:8a437f39c1ea5b98c9f2e2",
  measurementId: "G-886ZEPLWPS"
};

// Initialize Firebase (using compat version)
firebase.initializeApp(firebaseConfig);

// References to auth and forms
const auth = firebase.auth();
const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');

// Email/Password Sign Up
signupForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const fullname = document.getElementById('fullname').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const terms = document.getElementById('terms').checked;
  
  // Form validation
  if (!fullname || !email || !password || !confirmPassword) {
    alert('Please fill in all fields.');
    return;
  }
  
  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }
  
  if (!terms) {
    alert('Please agree to the Terms & Conditions.');
    return;
  }
  
  // Create user with email and password
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Update profile with fullname
      return userCredential.user.updateProfile({
        displayName: fullname
      });
    })
    .then(() => {
      // Redirect to home page on successful signup
      window.location.href = "home.html";
    })
    .catch((error) => {
      // Handle errors
      alert("Error: " + error.message);
    });
});

// Email/Password Sign In
signinForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;
  
  if (!email || !password) {
    alert('Please fill in all fields.');
    return;
  }
  
  // Sign in with email and password
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Redirect to home page on successful login
      window.location.href = "home.html";
    })
    .catch((error) => {
      // Handle errors
      alert("Error: " + error.message);
    });
});

// Google Sign In
// Add click event handlers to all Google sign-in buttons
const googleButtons = document.querySelectorAll('.social-button');
googleButtons.forEach(button => {
  if (button.querySelector('svg path[fill="#FFC107"]')) { // Google's yellow color in logo
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const provider = new firebase.auth.GoogleAuthProvider();
      
      auth.signInWithPopup(provider)
        .then((result) => {
          // Redirect to home page on successful Google sign-in
          window.location.href = "home.html";
        })
        .catch((error) => {
          alert("Google Sign-In Error: " + error.message);
        });
    });
  }
});

// Check if user is already signed in
auth.onAuthStateChanged(user => {
  if (user) {
    // User is signed in, redirect to home page
    window.location.href = "home.html";
  }
});
