let employees = JSON.parse(localStorage.getItem('empData'));

let totalEmployees = document.querySelector("#totalEmployees");
let activeEmployees = document.querySelector("#activeEmployees");
let departmentCount = document.querySelector("#departmentCount");
let totalPayroll = document.querySelector("#totalPayroll");
let activePercentage = document.querySelector("#activePercentage");
let currentDate = document.querySelector("#currentDate");
let statusPercentage = document.querySelector("#statusPercentage");
let statusActive = document.querySelector("#statusActive");
let statusInactive = document.querySelector("#statusInactive");
let statusTotal = document.querySelector("#statusTotal");
let payrollSummary = document.querySelector("#payrollSummary");
let averageSalary = document.querySelector("#averageSalary");
let highestSalary = document.querySelector("#highestSalary");
let statusCircle = document.querySelector(".status-circle");
let departmentList = document.querySelector("#departmentList");
let recentEmployeeBody = document.querySelector("#recentEmployeeBody");
let addEmpDashBTN = document.querySelector("#addEmpDashBTN");

addEmpDashBTN.addEventListener('click', () => {
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    let logInSuccess = localStorage.getItem('logInSuccess');

    if (!isLoggedIn) {
        window.location.href = '/signup';
        return;
    } else if (!logInSuccess) {
        window.location.href = 'login';
        return;
    }
    window.location.href = '/employee/add';
});

function formatSalary(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(amount);
}
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-In', {
        day: 'numeric',
        month: 'short',
        year: 'numeric' 
    });
}
function getAvatar(name) {
    return name
        .split(' ')
        .map(word => word[0])
        .join('');
}
function showCurrentDate() {
    let today = new Date();
    currentDate.textContent = today.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric' 
    });
}
showCurrentDate();

function updateDashboardStats() {
    let total = employees.length;
    totalEmployees.textContent = total;

    let active = employees.filter(employee =>
        employee.empStatus === 'Active'
    ).length;
    let inactive = employees.filter(employee =>
        employee.empStatus === 'Inactive'
    ).length;

    let percentage = total > 0 ? Math.round((active / total) * 100) : 0;

    activeEmployees.textContent = active;
    activePercentage.textContent = `${percentage}% currently working`;

    let allDepartments = employees.map((employee) =>
        employee.empDepartment
    );
    let department = [... new Set(allDepartments)];

    departmentCount.textContent = department.length;
    let payroll = 0;
    employees.forEach(emp => {
        payroll += emp.empSalary;
    });
    totalPayroll.textContent = formatSalary(payroll);

    statusPercentage.textContent = `${percentage}%`;
    statusActive.textContent = active;
    statusInactive.textContent = inactive;
    statusTotal.textContent = total;

    payrollSummary.textContent = formatSalary(payroll);
    let highest = Math.max(...employees.map(employee => employee.empSalary));
    let average = payroll / employees.length;
    averageSalary.textContent = formatSalary(average);
    highestSalary.textContent = formatSalary(highest);
    updateStatusCircle(percentage);
}
updateDashboardStats();

function updateStatusCircle(percentage) {
    statusCircle.style.setProperty('--progress', `${percentage}%`);
}

function renderDepartments() {
    departmentList.innerHTML = '';
    if (employees.length === 0) {
        departmentList.innerHTML = `
            <div class="department-empty">
                No employee data available.
            </div>
        `;
        return;
    }

    let departmentData = {};
    employees.forEach((employee) => {
        let department = employee.empDepartment;
        if(!departmentData[department]) {
            departmentData[department] = 0;
        }
        departmentData[department]++;
    });
    let departments = Object.entries(departmentData);
    departments.sort((a, b) => b[1] - a[1]);
    let total = employees.length;
    
    departments.forEach(([department, count]) => {
        let percentage = Math.round((count / total) * 100);
        let item = document.createElement('div');
        item.className = 'department-item';
        item.innerHTML = `
            <div class="department-name">
                <span class="department-dot"></span>
                ${department}
            </div>
            <div class="department-progress">
                <div class="department-progress-bar" style="width: ${percentage}%"></div>
            </div>
            <div class="department-count">${count}</div>
        `;
        departmentList.appendChild(item);
    });
}
renderDepartments();

function renderRecentEmployees() {
    recentEmployeeBody.innerHTML = '';
    if (employees.length === 0) {
        recentEmployeeBody.innerHTML = `
            <tr>
                <td colspan="5">
                    No employee data available.
                </td>
            </tr>
        `;
        return;
    }
    let recentEmployees = [...employees];
    recentEmployees.sort((a, b) =>
        new Date(b.empJoined) - new Date(a.empJoined)
    );
    let latestEmployees = recentEmployees.slice(0, 5);
    latestEmployees.forEach((employee) => {
        let row = document.createElement('tr');
        let statusClass = employee.empStatus === 'Active' ? 'active' : 'inactive';
        let statusIcon = employee.empStatus === 'Active' ? 'fa-circle' : 'fa-circle';

        row.innerHTML = `
            <td>
                <div class="recent-employee">
                    <div class="recent-avatar">${getAvatar(employee.empName)}</div>
                    <div class="recent-employee-info">
                        <strong>${employee.empName}</strong>
                        <span>${employee.empEmail}</span>
                    </div>
                </div>
            </td>
            <td>
                <span class="recent-department">${employee.empDepartment}</span>
            </td>
            <td>
                <span class="recent-position">${employee.empPosition}</span>
            </td>
            <td>
                <span class="recent-date">${formatDate(employee.empJoined)}</span>
            </td>
            <td>
                <span class="recent-status ${statusClass}">
                    <i class="fa-solid ${statusIcon}"></i>${employee.empStatus}
                </span>
            </td>
        `;
        recentEmployeeBody.appendChild(row);
    });
}
renderRecentEmployees();
