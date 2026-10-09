(function () {
    "use strict";

    let navbarLogin = document.getElementById("navbarLogin");
    let userProfile = document.getElementById("userProfile");
    let profileButton = document.getElementById("profileButton");
    let profileDropdown = document.getElementById("profileDropdown");
    let logoutButton = document.getElementById("logoutButton");

    let userAvatar = document.getElementById("userAvatar");
    let userName = document.getElementById("userName");
    let dropdownAvatar = document.getElementById("dropdownAvatar");
    let dropdownName = document.getElementById("dropdownName");
    let dropdownEmail = document.getElementById("dropdownEmail");

    if (!navbarLogin || !userProfile) {
        return;
    }
    function getSignupData() {
        try {
            let signupData = JSON.parse(localStorage.getItem("isLoggedIn"));
            if (Array.isArray(signupData) && signupData.length > 0) {
                return signupData[0];
            }
            return {};
        } catch (error) {
            return {};
        }
    }
    function getLoginData() {
        try {
            let loginData = JSON.parse(localStorage.getItem("logInSuccess"));
            if (Array.isArray(loginData) && loginData.length > 0) {
                return loginData[0];
            }
            return {};
        } catch (error) {
            return {};
        }
    }

    function isUserLoggedIn() {
        let loginData = getLoginData();
        return Boolean(loginData.loginEmail && loginData.loginPassword);
    }
    function getUserDetails() {
        let signupData = getSignupData();
        let loginData = getLoginData();
        let name = signupData.signupName || "User";
        let email = loginData.loginEmail || signupData.signupEmail || "No email available";
        return {
            name: name,
            email: email
        };
    }
    function getInitials(name) {
        let words = name.trim().split(/\s+/).filter(Boolean);
        if (words.length === 0) {
            return "U";
        }
        if (words.length === 1) {
            return words[0].substring(0, 2).toUpperCase();
        }
        return (
            words[0].charAt(0) +
            words[words.length - 1].charAt(0)).toUpperCase();
    }
    function updateUserProfile() {
        let user = getUserDetails();
        let initials = getInitials(user.name);
        if (userAvatar) {
            userAvatar.textContent = initials;
        }
        if (userName) {
            userName.textContent = user.name;
        }
        if (dropdownAvatar) {
            dropdownAvatar.textContent = initials;
        }
        if (dropdownName) {
            dropdownName.textContent = user.name;
        }
        if (dropdownEmail) {
            dropdownEmail.textContent = user.email;
        }
    }
    function updateNavbar() {
        if (isUserLoggedIn()) {
            navbarLogin.style.display = "none";
            userProfile.style.display = "block";
            updateUserProfile();
        } else {
            navbarLogin.style.display = "inline-flex";
            userProfile.style.display = "none";
        }
    }
    if (profileButton && profileDropdown) {
        profileButton.addEventListener("click", function (event) {
            event.stopPropagation();
            const isOpen = profileDropdown.classList.toggle("show");
            profileButton.setAttribute("aria-expanded", String(isOpen));
        });
    }
    document.addEventListener("click", function (event) {
        if (userProfile && !userProfile.contains(event.target)) {
            profileDropdown?.classList.remove("show");
            profileButton?.setAttribute("aria-expanded", "false");
        }
    });
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("logInSuccess");
            profileDropdown?.classList.remove("show");
            profileButton?.setAttribute("aria-expanded", "false");
            window.location.href = "/";
        });
    }
    updateNavbar();
    window.addEventListener("storage", updateNavbar);
})();
