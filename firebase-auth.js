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
const signinTab = document.getElementById('signin-tab');
const signupTab = document.getElementById('signup-tab');

// Tab switching functionality with smooth transitions
signinTab.addEventListener('click', () => {
  // Add transition class for smooth slide effect
  signinForm.style.transform = 'translateX(0)';
  signupForm.style.transform = 'translateX(100%)';
  
  // Update active tabs
  signinTab.classList.add('active');
  signupTab.classList.remove('active');
  
  // After transition, update active class for proper visibility
  setTimeout(() => {
    signinForm.classList.add('active');
    signupForm.classList.remove('active');
  }, 300);
});

signupTab.addEventListener('click', () => {
  // Add transition class for smooth slide effect
  signinForm.style.transform = 'translateX(-100%)';
  signupForm.style.transform = 'translateX(0)';
  
  // Update active tabs
  signupTab.classList.add('active');
  signinTab.classList.remove('active');
  
  // After transition, update active class for proper visibility
  setTimeout(() => {
    signupForm.classList.add('active');
    signinForm.classList.remove('active');
  }, 300);
});

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

// Check if we're on the login page
const isLoginPage = window.location.pathname.includes('login') || 
                   window.location.pathname.endsWith('/') || 
                   window.location.pathname.endsWith('.html');

// Check if user is already signed in
auth.onAuthStateChanged(user => {
  if (user && isLoginPage) {
    // Add a small delay to allow the user to see the login page first
    // and potentially log out if needed
    setTimeout(() => {
      console.log("User already signed in, redirecting to home page");
      window.location.href = "home.html";
    }, 1000); // 1 second delay
  } else {
    // Make sure the login forms are visible when no user is logged in
    if (signinForm && signupForm) {
      signinForm.style.display = 'flex';
      signinForm.classList.add('active');
    }
  }
});

// Add a logout function for convenience
window.logout = function() {
  auth.signOut().then(() => {
    console.log("Logged out successfully");
    if (!isLoginPage) {
      window.location.href = "index.html"; // Redirect to login page
    }
  }).catch((error) => {
    console.error("Error signing out:", error);
  });
};

// Add these styles to the document to enable smooth transitions
const styleTag = document.createElement('style');
styleTag.textContent = `
  .signin-form, .signup-form {
    transition: transform 0.3s ease-in-out;
    position: absolute;
    width: 100%;
  }
  
  .signin-form.active, .signup-form.active {
    display: flex;
    flex-direction: column;
    position: relative;
  }
  
  .form-container {
    position: relative;
    overflow: hidden;
    flex: 1;
    display: flex;
  }
`;
document.head.appendChild(styleTag);

// Initialize form positions
signinForm.style.transform = 'translateX(0)';
signupForm.style.transform = 'translateX(100%)';
