let loginForm = document.querySelector("#loginForm");

const successToast = document.getElementById("successToast");
const toastClose = document.getElementById("toastClose");

let loginEmail = document.querySelector('#loginEmail');
let loginPassword = document.querySelector('#loginPassword');
let rememberMe = document.querySelector('#rememberMe');
let passwordToggle = document.querySelector('#passwordToggle');

let emailError = document.querySelector('#emailError');
let passwordError = document.querySelector('#passwordError');
let rememberMeError = document.querySelector('#rememberMeError');

passwordToggle.addEventListener('click', () => {
    if (loginPassword.type === 'password') {
        loginPassword.type = 'text';
        passwordToggle.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
    } else {
        loginPassword.type = 'password';
        passwordToggle.innerHTML = '<i class="fa-regular fa-eye"></i>';
    }
});

loginEmail.addEventListener('input', () => {
    if (loginEmail.value !== "") {
        emailError.style.display = 'none';
    } else {
        emailError.style.display = 'block' 
    }
});
loginPassword.addEventListener('input', () => {
    if (loginPassword.value !== "") {
        passwordError.style.display = 'none';
    } else {
        passwordError.style.display = 'block';
    }
});
rememberMe.addEventListener('change', () => {
    if (rememberMe.checked) {
        rememberMeError.style.display = 'none';
    } else {
        rememberMeError.style.display = 'block';
    }
});

let loginUser = JSON.parse(localStorage.getItem('isLoggedIn'));

function checkLoginEmail() {
    if (loginEmail.value === loginUser[0].signupEmail) {
        emailError.style.display = 'none';
        return true;
    } else {
        emailError.style.display = 'block';
        emailError.textContent = 'Please enter correct email';
        return false;
    }
}
loginEmail.addEventListener('input', checkLoginEmail);

function checkLoginPassword() {
    if (loginPassword.value === loginUser[0].signupPassword) {
        passwordError.style.display = 'none';
        return true;
    } else {
        passwordError.style.display = 'block';
        passwordError.textContent = 'Please enter correct password';
        return false;
    }
}
loginPassword.addEventListener('input', checkLoginPassword);

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;
    if (loginEmail.value === "") {
        emailError.style.display = 'block';
        emailError.textContent = "Please enter your email.";
        valid = false;
    }
    if (loginPassword.value === "") {
        passwordError.style.display = 'block';
        passwordError.textContent = "Please enter your password.";
        valid = false;
    }
    if (!rememberMe.checked) {
        rememberMeError.style.display = 'block';
        rememberMeError.textContent = "Please Check the remember-me checkbox.";
        valid = false;
    }
    if (!valid) {
        return;
    }

    if(!checkLoginEmail()) {
        return;
    }
    if(!checkLoginPassword()) {
        return;
    }

    let logInSuccess = [];
    logInSuccess.unshift({
        loginEmail: loginEmail.value,
        loginPassword: loginPassword.value,
    });
    localStorage.setItem('logInSuccess', JSON.stringify(logInSuccess));
    // localStorage.clear();
    loginForm.reset();

    window.location.href = '/';

    successToast.classList.add('show');
    setTimeout(() => {
        successToast.classList.remove('show');
    }, 2000);
});

toastClose.addEventListener("click", function () {
    successToast.classList.remove("show")
});
