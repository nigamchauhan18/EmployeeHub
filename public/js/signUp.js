let signupForm = document.querySelector('#signupForm');

const successToast = document.getElementById("successToast");
const toastClose = document.getElementById("toastClose");

let signupName = document.querySelector('#signupName');
let signupEmail = document.querySelector('#signupEmail');
let signupPassword = document.querySelector('#signupPassword');
let confirmPassword = document.querySelector('#confirmPassword');
let passwordToggle = document.querySelector('#passwordToggle');
let terms = document.querySelector('#terms');

let nameError = document.querySelector('#nameError');
let emailError = document.querySelector('#emailError');
let passwordError = document.querySelector('#passwordError');
let confirmPasswordError = document.querySelector('#confirmPasswordError');
let termsError = document.querySelector('#termsError');

passwordToggle.addEventListener('click', () => {
    if (signupPassword.type === 'password') {
        signupPassword.type = 'text';
        passwordToggle.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
    } else {
        signupPassword.type = 'password';
        passwordToggle.innerHTML = '<i class="fa-regular fa-eye"></i>';
    }
});

signupName.addEventListener('input', () => {
    if (signupName.value !== "") {
        nameError.style.display = 'none';
    } else {
        nameError.style.display = 'block' 
    }
});
signupEmail.addEventListener('input', () => {
    if (signupEmail.value !== "") {
        emailError.style.display = 'none';
    } else {
        emailError.style.display = 'block';
    }
});
signupPassword.addEventListener('input', () => {
    if (signupPassword.value !== "") {
        passwordError.style.display = 'none';
    } else {
        passwordError.style.display = 'block';
    }
});
confirmPassword.addEventListener('input', () => {
    if (confirmPassword.value !== "") {
        confirmPasswordError.style.display = 'none';
    } else {
        confirmPasswordError.style.display = 'block';
    }
});
terms.addEventListener('change', () => {
    if (terms.checked) {
        termsError.style.display = 'none';
    } else {
        termsError.style.display = 'block';
    }
});

function checkPassword() {
    if (confirmPassword.value === signupPassword.value ) {
        confirmPasswordError.style.display = 'none';
        return true;
    } else {
        confirmPasswordError.style.display = 'block';
        confirmPasswordError.textContent = "Please enter correct password.";
        return false;
    }
}
confirmPassword.addEventListener('input', checkPassword);

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;
    if (signupName.value === "") {
        nameError.style.display = 'block';
        nameError.textContent = "Please enter your name.";
        valid = false;
    }
    if (signupEmail.value === "") {
        emailError.style.display = 'block';
        emailError.textContent = "Please enter your email.";
        valid = false;
    }
    if (signupPassword.value === "") {
        passwordError.style.display = 'block';
        passwordError.textContent = "Please enter a password.";
        valid = false;
    }
    if (confirmPassword.value === "") {
        confirmPasswordError.style.display = 'block';
        confirmPasswordError.textContent = "Please enter your confirm password.";
        valid = false;
    }
    if (!terms.checked) {
        termsError.style.display = 'block';
        termsError.textContent = "Please agree to the Terms of Service and Privacy Policy.";
        valid = false;
    }
    if (!valid) {
        return;
    }

    if(!checkPassword()) {
        return;
    }

    let isLoggedIn = [];
    isLoggedIn.unshift({
        signupName: signupName.value,
        signupEmail: signupEmail.value,
        signupPassword: signupPassword.value,
        confirmPassword: confirmPassword.value,
    });
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    // localStorage.clear();
    signupForm.reset();

    window.location.href = '/login';

    successToast.classList.add('show');
    setTimeout(() => {
        successToast.classList.remove('show');
    }, 2000);

});

toastClose.addEventListener("click", function () {
    successToast.classList.remove("show")
});
