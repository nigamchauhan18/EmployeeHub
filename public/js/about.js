let employees = JSON.parse(localStorage.getItem("empData")) || [];

let heroTotalEmployees = document.querySelector("#heroTotalEmployees");
let heroActiveEmployees = document.querySelector("#heroActiveEmployees");
let heroDepartments = document.querySelector("#heroDepartments");
let heroPayroll = document.querySelector("#heroPayroll");
let heroPercentage = document.querySelector("#heroPercentage");
let heroProgress = document.querySelector("#heroProgress");

let statEmployees = document.querySelector("#statEmployees");
let statDepartments = document.querySelector("#statDepartments");
let statActive = document.querySelector("#statActive");

let totalEmployees = employees.length;

let activeEmployees = employees.filter(employee =>
    employee.empStatus === 'Active'
).length;

let departments = employees.map((employee) => employee.empDepartment);
let uniqueDepartments = [... new Set(departments)];
let departmentCount = uniqueDepartments.length;

let activePercentage = totalEmployees > 0 ? Math.round((activeEmployees / totalEmployees) * 100) : 0;

function formatSalary(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(amount);
}

let payroll = 0;
employees.forEach(emp => {
    payroll += emp.empSalary;
});

heroTotalEmployees.textContent = totalEmployees;
heroActiveEmployees.textContent = activeEmployees;
heroDepartments.textContent = departmentCount;
heroPayroll.textContent = formatSalary(payroll);
heroPercentage.textContent = `${activePercentage}%`;
heroProgress.style.width = `${activePercentage}%`;

statEmployees.textContent = totalEmployees;
statDepartments.textContent = departmentCount;
statActive.textContent = `${activePercentage}%`;
