let addEmployeeForm = document.querySelector('#addEmployeeForm');

let empName = document.querySelector('#empName');
let empEmail = document.querySelector('#empEmail');
let empDepartment = document.querySelector('#empDepartment');
let empPosition = document.querySelector('#empPosition');
let empSalary = document.querySelector('#empSalary');
let empJoined = document.querySelector('#empJoined');
let empStatus = document.querySelector('#empStatus');

let empNameError = document.querySelector('#empNameError');
let empEmailError = document.querySelector('#empEmailError');
let empDepartmentError = document.querySelector('#empDepartmentError');
let empPositionError = document.querySelector('#empPositionError');
let empSalaryError = document.querySelector('#empSalaryError');
let empJoinedError = document.querySelector('#empJoinedError');
let empStatusError = document.querySelector('#empStatusError');

let successToast = document.getElementById("successToast");
let toastClose = document.getElementById("toastClose");

empName.addEventListener('input', () => {
    if (empName.value !== "") {
        empNameError.style.display = 'none';
    } else {
        empNameError.style.display = 'block' 
    }
});
empEmail.addEventListener('input', () => {
    if (empEmail.value !== "") {
        empEmailError.style.display = 'none';
    } else {
        empEmailError.style.display = 'block' 
    }
});
empDepartment.addEventListener('input', () => {
    if (empDepartment.value !== "") {
        empDepartmentError.style.display = 'none';
    } else {
        empDepartmentError.style.display = 'block' 
    }
});
empPosition.addEventListener('input', () => {
    if (empPosition.value !== "") {
        empPositionError.style.display = 'none';
    } else {
        empPositionError.style.display = 'block' 
    }
});
empSalary.addEventListener('input', () => {
    if (empSalary.value !== "") {
        empSalaryError.style.display = 'none';
    } else {
        empSalaryError.style.display = 'block' 
    }
});
empJoined.addEventListener('input', () => {
    if (empJoined.value !== "") {
        empJoinedError.style.display = 'none';
    } else {
        empJoinedError.style.display = 'block' 
    }
});
empStatus.addEventListener('input', () => {
    if (empStatus.value !== "") {
        empStatusError.style.display = 'none';
    } else {
        empStatusError.style.display = 'block' 
    }
});

addEmployeeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;
    if (empName.value === "") {
        empNameError.style.display = 'block';
        empNameError.textContent = "Please enter employee name.";
        valid = false;
    }
    if (empEmail.value === "") {
        empEmailError.style.display = 'block';
        empEmailError.textContent = "Please enter email address.";
        valid = false;
    }
    if (empDepartment.value === "") {
        empDepartmentError.style.display = 'block';
        empDepartmentError.textContent = "Please select department.";
        valid = false;
    }
    if (empPosition.value === "") {
        empPositionError.style.display = 'block';
        empJoinedError.textContent = "Please enter employee position.";
        valid = false;
    }
    if (empSalary.value === "") {
        empSalaryError.style.display = 'block';
        empSalaryError.textContent = "Please enter a valid salary.";
        valid = false;
    }
    if (empJoined.value === "") {
        empJoinedError.style.display = 'block';
        empJoinedError.textContent = "Please select joining date.";
        valid = false;
    }
    if (empStatus.value === "") {
        empStatusError.style.display = 'block';
        empStatusError.textContent = "Please select employee status.";
        valid = false;
    }
    if (!valid) {
        return;;
    }

    let employees = JSON.parse(localStorage.getItem('empData')) || [];
    let emailExists = employees.some((employee) => { 
        return employee.empEmail === empEmail.value;
    });
    if (emailExists) {
        empEmailError.style.display = 'block';
        empEmailError.textContent = "An employee with this email already exists.";
        return;
    } else {
        empEmailError.style.display = 'none';
    }

    let maxID = 0;
    employees.forEach(employee => {
        let id = Number(employee.empID.replace('EMP-', ''));
        if (id > maxID) {
            maxID = id;
        }
    });
    maxID++;
    let employeeID = "EMP-" + String(maxID).padStart(3, "0");

    let employee = {
        empID: employeeID,
        empName: empName.value,
        empEmail: empEmail.value,
        empDepartment: empDepartment.value,
        empPosition: empPosition.value,
        empSalary: Number(empSalary.value),
        empJoined: empJoined.value,
        empStatus: empStatus.value
    }
    console.log(employee);

    employees.push(employee);
    localStorage.setItem('empData', JSON.stringify(employees));

    setTimeout(() => {
        addEmployeeForm.reset();
        window.location.href = '/employees';
    }, 1000);

    successToast.classList.add('show');
    setTimeout(() => {
        successToast.classList.remove('show');
    }, 1000);
});

toastClose.addEventListener("click", function () {
    successToast.classList.remove("show")
});
