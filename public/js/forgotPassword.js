let forgotPasswordForm = document.querySelector("#forgotPasswordForm");

const successToast = document.getElementById("successToast");
const toastClose = document.getElementById("toastClose");

let forgotEmail = document.querySelector("#forgotEmail");
let newPassword = document.querySelector("#newPassword");
let passwordToggle = document.querySelector("#passwordToggle");

let emailError = document.querySelector("#emailError");
let newPasswordError = document.querySelector("#newPasswordError");

passwordToggle.addEventListener('click', () => {
    if (newPassword.type === 'password') {
        newPassword.type = 'text';
        passwordToggle.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
    } else {
        newPassword.type = 'password';
        passwordToggle.innerHTML = '<i class="fa-regular fa-eye"></i>';
    }
});

forgotEmail.addEventListener('input', () => {
    if (forgotEmail.value !== "") {
        emailError.style.display = 'none';
    } else {
        emailError.style.display = 'block' 
    }
});
newPassword.addEventListener('input', () => {
    if (newPassword.value !== "") {
        newPasswordError.style.display = 'none';
    } else {
        newPasswordError.style.display = 'block';
    }
});

let userloginDetails = JSON.parse(localStorage.getItem('isLoggedIn'));

function checkLoginEmail() {
    if (forgotEmail.value === userloginDetails[0].signupEmail) {
        emailError.style.display = 'none';
        return true;
    } else {
        emailError.style.display = 'block';
        emailError.textContent = 'Please enter correct email';
        return false;
    }
}
forgotEmail.addEventListener('input', checkLoginEmail);

function newPass() {
    userloginDetails[0].signupPassword = newPassword.value;   
    userloginDetails[0].confirmPassword = newPassword.value;
    localStorage.setItem("isLoggedIn", JSON.stringify(userloginDetails));
}

forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;
    if (forgotEmail.value === "") {
        emailError.style.display = 'block';
        emailError.textContent = "Please enter your email.";
        valid = false;
    }
    if (newPassword.value === "") {
        newPasswordError.style.display = 'block';
        newPasswordError.textContent = "Please enter your password.";
        valid = false;
    }
    if (!valid) {
        return;
    }

    if(!checkLoginEmail()) {
        return;
    }
    newPass();

    forgotPasswordForm.reset();
    window.location.href = '/login';

    successToast.classList.add('show');
    setTimeout(() => {
        successToast.classList.remove('show');
    }, 2000);
});

toastClose.addEventListener("click", function () {
    successToast.classList.remove("show")
});
