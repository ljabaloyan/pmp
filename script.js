// Get form elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const successMessage = document.getElementById('successMessage');
const rememberCheckbox = document.getElementById('remember');

// Toggle password visibility
togglePasswordBtn.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePasswordBtn.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
});

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    return emailRegex.test(email) || usernameRegex.test(email);
}

// Password validation
function validatePassword(password) {
    return password.length >= 6;
}

// Clear error messages on input
emailInput.addEventListener('input', () => {
    emailError.textContent = '';
});

passwordInput.addEventListener('input', () => {
    passwordError.textContent = '';
});

// Form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // Reset error messages
    emailError.textContent = '';
    passwordError.textContent = '';
    
    let isValid = true;
    
    // Validate email/username
    if (!email) {
        emailError.textContent = 'Email or username is required';
        isValid = false;
    } else if (!validateEmail(email)) {
        emailError.textContent = 'Please enter a valid email or username (min 3 characters)';
        isValid = false;
    }
    
    // Validate password
    if (!password) {
        passwordError.textContent = 'Password is required';
        isValid = false;
    } else if (!validatePassword(password)) {
        passwordError.textContent = 'Password must be at least 6 characters';
        isValid = false;
    }
    
    // If all validations pass
    if (isValid) {
        // Simulate login process
        const loginBtn = loginForm.querySelector('.login-btn');
        loginBtn.disabled = true;
        loginBtn.textContent = 'Logging in...';
        
        // Simulate API call delay
        setTimeout(() => {
            // Show success message
            successMessage.classList.add('show');
            
            // Store credentials if "Remember me" is checked
            if (rememberCheckbox.checked) {
                localStorage.setItem('rememberedEmail', email);
                console.log('Email remembered');
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            
            // Reset form
            loginForm.reset();
            loginBtn.disabled = false;
            loginBtn.textContent = 'Login';
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 3000);
            
            console.log('Login attempt:', { email, password: '***' });
        }, 1500);
    }
});

// Load remembered email on page load
window.addEventListener('DOMContentLoaded', () => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        rememberCheckbox.checked = true;
    }
});

// Forgot password link
document.querySelector('.forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Password reset feature would redirect to password recovery page');
});

// Sign up link
document.querySelector('.signup-link a').addEventListener('click', (e) => {
    e.preventDefault();
    alert('This would redirect to the sign-up page');
});
