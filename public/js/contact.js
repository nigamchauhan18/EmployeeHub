let contactForm = document.querySelector('#contactForm');

const successToast = document.getElementById("successToast");
const toastClose = document.getElementById("toastClose");

let fullName = document.querySelector('#fullName');
let emailID = document.querySelector('#emailID');
let selectSubject = document.querySelector('#selectSubject');
let textareaText = document.querySelector('#textareaText');

let nameError = document.querySelector('#nameError');
let emailError = document.querySelector('#emailError');
let subjectError = document.querySelector('#subjectError');
let messageError = document.querySelector('#messageError');

fullName.addEventListener('input', () => {
    if (fullName.value !== "") {
        nameError.style.display = 'none';
    } else {
        nameError.style.display = 'block' 
    }
});
emailID.addEventListener('input', () => {
    if (emailID.value !== "") {
        emailError.style.display = 'none';
    } else {
        emailError.style.display = 'block';
    }
});
selectSubject.addEventListener('input', () => {
    if (selectSubject.value !== "") {
        subjectError.style.display = 'none';
    } else {
        subjectError.style.display = 'block';
    }
});
textareaText.addEventListener('input', () => {
    if (textareaText.value !== "") {
        messageError.style.display = 'none';
    } else {
        messageError.style.display = 'block';
    }
});

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = '/signup';
        return;
    }
    let logInSuccess = localStorage.getItem('logInSuccess');
    if (!logInSuccess) {
        window.location.href = '/login';
        return;
    }
    
    let valid = true;
    if (fullName.value === "") {
        nameError.style.display = 'block';
        nameError.textContent = "Please enter your name.";
        valid = false;
    }
    if (emailID.value === "") {
        emailError.style.display = 'block';
        emailError.textContent = "Please enter your email.";
        valid = false;
    }
    if (selectSubject.value === "") {
        subjectError.style.display = 'block';
        subjectError.textContent = "Please select a subject.";
        valid = false;
    }
    if (textareaText.value === "") {
        messageError.style.display = 'block';
        messageError.textContent = "Please enter your message.";
        valid = false;
    }
    if (!valid) {
        return;
    }

    let templateParams = {
        from_name: fullName.value.trim(),
        from_email: emailID.value.trim(),
        subject: selectSubject.value,
        message: textareaText.value.trim()
    };

    try {
        await emailjs.send('service_3nlurua', 'template_lcop81t',
            templateParams, {
                publicKey: 'wGzfZlCf9ItV-tkqU'
            }
        );
        let contactInfo = JSON.parse(localStorage.getItem('contactInfo')) || [];
        contactInfo.unshift({
            fullName: fullName.value,
            emailID: emailID.value,
            selectSubject: selectSubject.value,
            textareaText: textareaText.value,
        });
        localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
        alert('Your message has been sent successfully!');
        contactForm.reset();

        successToast.classList.add('show');
        setTimeout(() => {
            successToast.classList.remove('show');
        }, 2000);
        toastClose.addEventListener("click", function () {
            successToast.classList.remove("show");
        });
    } catch (error) {
        console.error('Email sending failed:', error);
        alert('Unable to send your message. Please try again later.');   
    }
});
