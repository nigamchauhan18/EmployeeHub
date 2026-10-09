let miniStats = document.querySelectorAll(".mini-stat strong");
let employeeCount = document.querySelector(".employee-count strong");
let employeeCountText = document.querySelector(".employee-count span");
let progressPercentage = document.querySelector(".progress-label strong");
let progressBar = document.querySelector(".progress-bar div");
let teamMembersContainer = document.querySelector(".team-members");

let homeAddEmpBTN = document.querySelector("#homeAddEmpBTN");
let homeAddEmpBTN1 = document.querySelector("#homeAddEmpBTN1");

homeAddEmpBTN.addEventListener('click', () => {
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = '/signup';
        return;
    }
    window.location.href = '/employee/add';
});
homeAddEmpBTN1.addEventListener('click', () => {
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = '/signup';
        return;
    }
    window.location.href = '/employee/add';
});

let empData = JSON.parse(localStorage.getItem('empData'));
let totalEmployeeCount = empData.length;

let activeEmployees = empData.filter((employee) =>
    employee.empStatus === "Active"
);
let inactiveEmployees = empData.filter((employee) =>
    employee.empStatus === "Inactive"
);
let allDepartments = empData.map((employee) => employee.empDepartment);
let uniqueDepartments = [... new Set(allDepartments)];
let departmentCount = uniqueDepartments.length;

let activeEmployeeCount = activeEmployees.length;
let inactiveEmployeeCount = inactiveEmployees.length;

miniStats[0].textContent = totalEmployeeCount;
miniStats[1].textContent = activeEmployees.length;
miniStats[2].textContent = departmentCount;

function employeeTotal() {
    employeeCount.textContent = totalEmployeeCount;
}
function checkEmployee() {
    if (totalEmployeeCount === 1) {
        employeeCountText.textContent = 'employee';
    } else {
        employeeCountText.textContent = 'employees';
    }
    employeeTotal();
}
checkEmployee();

function avatar(name) {
    return name
        .split(' ')
        .map(word => word[0])
        .join('');
}
function getAvatarClass(index) {
    let avatarClasses = [
        "avatar-one",
        "avatar-two",
        "avatar-three"
    ];
    return avatarClasses[index];
}

function renderTeamMembers() {
    teamMembersContainer.innerHTML = "";
    let teamMembers = activeEmployees.slice(0, 3);
    teamMembers.forEach((employee, index) => {
        if (!teamMembersContainer) {
            return;
        }
        let member = document.createElement('div');
        member.classList = 'member';
        member.innerHTML = `
            <div class="member-avatar ${getAvatarClass(index)}">
                ${avatar(employee.empName)}
            </div>
            <div>
                <strong>${employee.empName}</strong>
                <span>${employee.empPosition}</span>
            </div>
            <i></i>
        `;
        teamMembersContainer.appendChild(member);
    });
}
renderTeamMembers();

let activePercentage = totalEmployeeCount > 0 ? Math.round((activeEmployeeCount / totalEmployeeCount) * 100) : 0;
progressPercentage.textContent = `${activePercentage}%`;

progressBar.style.width = `${activePercentage}%`;
