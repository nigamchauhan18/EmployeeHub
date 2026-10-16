// let employees = [
//     {
//         empID: "EMP-001",
//         empName: "Nigam Chauhan",
//         empEmail: "nigamchauhan@gmail.com",
//         empDepartment: "Development",
//         empPosition: "Frontend Developer",
//         empSalary: 45000,
//         empJoined: "2026-10-01",
//         empStatus: "Active"
//     },
//     {
//         empID: "EMP-002",
//         empName: "Rahul Sharma",
//         empEmail: "rahul@gmail.com",
//         empDepartment: "Development",
//         empPosition: "Backend Developer",
//         empSalary: 72000,
//         empJoined: "2025-08-15",
//         empStatus: "Active"
//     },
//     {
//         empID: "EMP-003",
//         empName: "Priya Singh",
//         empEmail: "priya@gmail.com",
//         empDepartment: "HR",
//         empPosition: "HR Manager",
//         empSalary: 85000,
//         empJoined: "2024-05-20",
//         empStatus: "Active"
//     },
//     {
//         empID: "EMP-004",
//         empName: "Aman Verma",
//         empEmail: "aman@gmail.com",
//         empDepartment: "Marketing",
//         empPosition: "Marketing Executive",
//         empSalary: 38000,
//         empJoined: "2025-11-10",
//         empStatus: "Active"
//     },
//     {
//         empID: "EMP-005",
//         empName: "Neha Gupta",
//         empEmail: "neha@gmail.com",
//         empDepartment: "Finance",
//         empPosition: "Accountant",
//         empSalary: 65000,
//         empJoined: "2024-03-18",
//         empStatus: "Inactive"
//     },
//     {
//         empID: "EMP-006",
//         empName: "Arjun Mehta",
//         empEmail: "arjun@gmail.com",
//         empDepartment: "Development",
//         empPosition: "Full Stack Developer",
//         empSalary: 110000,
//         empJoined: "2023-12-05",
//         empStatus: "Active"
//     },
//     {
//         empID: "EMP-007",
//         empName: "Anjali Verma",
//         empEmail: "anjali@gmail.com",
//         empDepartment: "Design",
//         empPosition: "UI/UX Designer",
//         empSalary: 78000,
//         empJoined: "2024-09-15",
//         empStatus: "Active"
//     },
//     {
//         empID: "EMP-008",
//         empName: "Rohit Kumar",
//         empEmail: "rohit@gmail.com",
//         empDepartment: "Development",
//         empPosition: "Senior Developer",
//         empSalary: 145000,
//         empJoined: "2022-06-20",
//         empStatus: "Active"
//     },
//     {
//         empID: "EMP-009",
//         empName: "Manu Chauhan",
//         empEmail: "manuchauhan@gmail.com",
//         empDepartment: "Design",
//         empPosition: "UI/UX Designer",
//         empSalary: 45400,
//         empJoined: "2022-06-20",
//         empStatus: "Inactive"
//     },
//     {
//         empID: "EMP-010",
//         empName: "Jitu Chauhan",
//         empEmail: "jituchauhan@gmail.com",
//         empDepartment: "Development",
//         empPosition: "Senior Developer",
//         empSalary: 55400,
//         empJoined: "2022-07-25",
//         empStatus: "Active"
//     },
//     {
//         empID: "EMP-011",
//         empName: "Sonu Kumar",
//         empEmail: "sonukumar@gmail.com",
//         empDepartment: "Finance",
//         empPosition: "Accountant",
//         empSalary: 55400,
//         empJoined: "2026-02-14",
//         empStatus: "Inactive"
//     }
// ];
// let empData = localStorage.setItem('empData', JSON.stringify(employees));

let totalEmployees = document.querySelector("#totalEmployees");
let activeEmployees = document.querySelector("#activeEmployees");
let inactiveEmployees = document.querySelector("#inactiveEmployees");
let totalPayroll = document.querySelector("#totalPayroll");
let activePercentage = document.querySelector("#activePercentage");
let directoryCount = document.querySelector("#directoryCount");
let resultCount = document.querySelector("#resultCount");
let employeeTableBody = document.querySelector("#employeeTableBody");
let employeeGrid = document.querySelector("#employeeGrid");
let listView = document.querySelector("#listView");
let gridView = document.querySelector("#gridView");
let tableView = document.querySelector("#tableView");
let employeeSearch = document.querySelector("#employeeSearch");
let departmentFilter = document.querySelector("#departmentFilter");
let statusFilter = document.querySelector("#statusFilter");
let salaryFilter = document.querySelector("#salaryFilter");
let sortFilter = document.querySelector("#sortFilter");
let resetFilters = document.querySelector("#resetFilters");
let emptyReset = document.querySelector("#emptyReset");
let emptyState = document.querySelector("#emptyState");
let tableInfo = document.querySelector("#tableInfo");
let deleteEmployee = document.querySelector("#deleteEmployee");
let addEmployeeBtn = document.querySelector("#addEmployeeBtn");

const deleteModal = document.querySelector("#deleteModal");
const deleteEmployeeName = document.querySelector("#deleteEmployeeName");
const cancelDelete = document.querySelector("#cancelDelete");
const confirmDelete = document.querySelector("#confirmDelete");
let employeeToDelete = null;

addEmployeeBtn.addEventListener('click', () => {
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    let logInSuccess = localStorage.getItem('logInSuccess');

    if (!isLoggedIn) {
        window.location.href = '/signup';
        return;
    } else if (!logInSuccess) {
        window.location.href = '/login';
        return;
    }
    window.location.href = '/employee/add';
});

let stat = JSON.parse(localStorage.getItem('empData'));

function formatSalary(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(amount);
}

function updateStats() {
    totalEmployees.textContent = stat.length;

    let active = stat.filter(emp =>
        emp.empStatus === 'Active'
    ).length;
    activeEmployees.textContent = active;

    let inactive = stat.filter(emp =>
        emp.empStatus === 'Inactive'   
    ).length;
    inactiveEmployees.textContent = inactive;

    let payroll = 0;
    stat.forEach(emp => {
        payroll += emp.empSalary;
    });
    totalPayroll.innerHTML = formatSalary(payroll);

    let currentWorking = ((active / stat.length) * 100).toFixed(2);
    activePercentage.textContent = `${currentWorking}% currently working`;
    directoryCount.textContent = `
        ${stat.length} ${stat.length === 1 ? 'employee' : 'employees'}
    `;
}
updateStats();

function avatar(name) {
    return name
        .split(' ')
        .map(word => word[0])
        .join('');
}
function dateFormate(date) {
    return new Date(date).toLocaleDateString('en-In', {
        day: 'numeric',
        month: 'short',
        year: 'numeric' 
    });
}

function empDataTable(data) {
    employeeTableBody.innerHTML = '';

    data.forEach((employee) => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="employee-cell">
                    <div class="employee-avatar">${avatar(employee.empName)}</div>
                    <div>
                        <div class="employee-name">${employee.empName}</div>
                        <div class="employee-email">${employee.empEmail}</div>
                    </div>
                </div>
            </td>
            <td><span class="employee-id">${employee.empID}</span></td>
            <td><span class="department-badge">${employee.empDepartment}</span></td>
            <td><span class="position-text">${employee.empPosition}</span></td>
            <td><span class="salary-text">${formatSalary(employee.empSalary)}</span></td>
            <td><span class="joined-text">${dateFormate(employee.empJoined)}</span></td>
            <td>
                <span class="status-badge ${employee.empStatus.toLowerCase()}"><i class="fa-solid fa-circle"></i>${employee.empStatus}</span>
            </td>
            <td>
                <div class="action-buttons">
                    <button type="button" class="action-btn view-employee-btn" title="View" data-empid="${employee.empID}">
                        <i class="fa-regular fa-eye"></i>
                    </button>
                    <button type="button" class="action-btn edit-employee-btn" title="Edit" data-empid="${employee.empID}">
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    <div class="more-action">
                        <button type="button" class="action-btn" title="More">
                            <i class="fa-solid fa-ellipsis"></i>
                        </button>
                        <div class="action-menu">
                            <button type="button" class="view-employee-btn" data-empid="${employee.empID}">
                                <i class="fa-regular fa-eye"></i>View
                            </button>
                            <button type="button" class="edit-employee-btn" data-empid="${employee.empID}">
                                <i class="fa-regular fa-pen-to-square"></i>Edit
                            </button>
                            <button type="button" class="delete-action" data-empid="${employee.empID}">
                                <i class="fa-regular fa-trash-can"></i>Delete
                            </button>
                        </div>
                    </div>
                </div>
            </td>`;
        employeeTableBody.appendChild(row);

        let deleteButton = row.querySelector(".delete-action");
        deleteButton.addEventListener("click", function () {
            let id = this.dataset.empid;
            employeeToDelete = stat.find((employee) =>
                employee.empID === id
            );
            if (!employeeToDelete) {
                return;
            }
            deleteEmployeeName.textContent = employeeToDelete.empName;
            deleteModal.classList.add("show");
        });
    });
}

function empDataGrid(data) {
    employeeGrid.innerHTML = '';
    data.forEach((employee) => {
        let card = document.createElement('div');
        card.className = 'employee-grid-card';
        card.innerHTML = `
            <div class="grid-card-top">
                <div class="grid-employee-info">
                    <div class="employee-avatar">${avatar(employee.empName)}</div>
                    <div>
                        <strong>${employee.empName}</strong>
                        <span>${employee.empEmail}</span>
                    </div>
                </div>
                <span class="status-badge ${employee.empStatus.toLowerCase()}">
                    <i class="fa-solid fa-circle"></i>${employee.empStatus}
                </span>
            </div>
            <div class="grid-details">
                <div class="grid-detail">
                    <span>$Employee ID</span>
                    <strong>${employee.empID}</strong>
                </div>
                <div class="grid-detail">
                    <span>Department</span>
                    <strong>${employee.empDepartment}</strong>
                </div>
                <div class="grid-detail">
                    <span>Salary</span>
                    <strong>${formatSalary(employee.empSalary)}</strong>
                </div>
                <div class="grid-detail">
                    <span>Joined</span>
                    <strong>${dateFormate(employee.empJoined)}</strong>
                </div>
            </div>`;
        employeeGrid.appendChild(card);
    });

}

listView.addEventListener('click', () => {
    listView.classList.add('active');
    gridView.classList.remove('active');
    tableView.style.display = 'block';
    employeeGrid.style.display = 'none'
});

gridView.addEventListener('click', () => {
    gridView.classList.add('active');
    listView.classList.remove('active'); 
    tableView.style.display = 'none';
    employeeGrid.style.display = 'grid'
});

function getFilteredEmployees () {
    let filteredEmployees = [...stat];

    let search = employeeSearch.value.toLowerCase();
    if (search !== '') {
        filteredEmployees = filteredEmployees.filter((employee) => {
            return (
                employee.empName.toLowerCase().includes(search) ||
                employee.empID.toLowerCase().includes(search) ||
                employee.empEmail.toLowerCase().includes(search)
            );
        });
    }

    let department = departmentFilter.value;
    if (department !== 'all') {
        filteredEmployees = filteredEmployees.filter((employee) =>
            employee.empDepartment === department
        );
    }

    let status = statusFilter.value;
    if (status !== 'all') {
        filteredEmployees = filteredEmployees.filter((employee) =>
            employee.empStatus === status
        );
    }

    let salary = salaryFilter.value;
    if (salary === 'below40') {
        filteredEmployees = filteredEmployees.filter(employee => 
            employee.empSalary < 40000
        );
    }
    if (salary === '40to60') {
        filteredEmployees = filteredEmployees.filter((employee) =>
            employee.empSalary >= 40000 && employee.empSalary < 60000
        );
    }
    if (salary === '60to80') {
        filteredEmployees = filteredEmployees.filter((employee) =>
            employee.empSalary >= 60000 && employee.empSalary < 80000
        );
    }
    if (salary === '80to100') {
        filteredEmployees = filteredEmployees.filter((employee) =>
            employee.empSalary >= 80000 && employee.empSalary < 100000
        );
    }
    if (salary === '100to150') {
        filteredEmployees = filteredEmployees.filter((employee) =>
            employee.empSalary >= 100000 && employee.empSalary < 150000
        );
    }
    if (salary === 'above150') {
        filteredEmployees = filteredEmployees.filter((employee) =>
            employee.empSalary > 150000
        );
    }

    let sort = sortFilter.value;
    if (sort === 'nameAsc') {
        filteredEmployees.sort((a, b) =>
            a.empName.localeCompare(b.empName)
        );
    }
    if (sort === 'nameDesc') {
        filteredEmployees.sort((a, b) =>
            b.empName.localeCompare(a.empName)
        );
    }
    if (sort === 'salaryHigh') {
        filteredEmployees.sort((a, b) => b.empSalary - a.empSalary);
    }
    if (sort === 'salaryLow') {
        filteredEmployees.sort((a, b) => a.empSalary - b.empSalary);
    }
    if (sort === 'newest') {
        filteredEmployees.sort((a, b) =>
            new Date(b.empJoined) - new Date(a.empJoined)
        );   
    }
    if (sort === 'oldest') {
        filteredEmployees.sort((a, b) =>
            new Date(a.empJoined) - new Date(b.empJoined)
        );   
    }
    return filteredEmployees;
}

function showEmptyState() {
    tableView.style.display = 'none';
    employeeGrid.style.display = 'none';
    emptyState.style.display = 'block';
}

function showEmployees(data) {
    emptyState.style.display = 'none';
    if (gridView.classList.contains("active")) {
        tableView.style.display = "none";
        employeeGrid.style.display = "grid";
    } else {
        tableView.style.display = "block";
        employeeGrid.style.display = "none";
    }
    empDataTable(data);
    empDataGrid(data);
}

function renderEmployees() {
    let filteredEmployees = getFilteredEmployees();
    let count = filteredEmployees.length;
    resultCount.textContent = count;
    tableInfo.textContent = `
        Showing ${count} ${count === 1 ? 'employee' : 'employees'}
    `;
    if (count === 0) {
        showEmptyState();
        return;
    }
    showEmployees(filteredEmployees);
}

function resetAllFilters() {
    employeeSearch.value = '';
    departmentFilter.value = 'all';
    statusFilter.value = 'all';
    salaryFilter.value = 'all';
    sortFilter.value = 'default';
    renderEmployees();
}

employeeSearch.addEventListener('input', () => {
    renderEmployees();
});
departmentFilter.addEventListener('change', () => {
    renderEmployees();
});
statusFilter.addEventListener('change', () => {
    renderEmployees();
});
salaryFilter.addEventListener('change', () => {
    renderEmployees();
});
sortFilter.addEventListener('change', () => {
    renderEmployees();
});

resetFilters.addEventListener('click', () => {
    resetAllFilters();
});
emptyReset.addEventListener('click', () => {
    resetAllFilters();
});

confirmDelete.addEventListener("click", function () {
    if (!employeeToDelete) {
        return;
    }
    stat = stat.filter((employee) =>
        employee.empID !== employeeToDelete.empID
    );
    localStorage.setItem("empData", JSON.stringify(stat));
    updateStats();
    renderEmployees();
    employeeToDelete = null;
    deleteModal.classList.remove("show");
});
cancelDelete.addEventListener("click", function () {
    employeeToDelete = null;
    deleteModal.classList.remove("show");
});
deleteModal.addEventListener("click", function (e) {
    if (e.target === deleteModal) {
        employeeToDelete = null;
        deleteModal.classList.remove("show");
    }
});

renderEmployees();

// Update Employee Details
let editEmployeeModal = document.querySelector("#editEmployeeModal");
let editEmployeeForm = document.querySelector("#editEmployeeForm");
let closeEditModal = document.querySelector("#closeEditModal");
let cancelEditEmployee = document.querySelector("#cancelEditEmployee");

let editEmpID = document.querySelector("#editEmpID");
let editEmpName = document.querySelector("#editEmpName");
let editEmpEmail = document.querySelector("#editEmpEmail");
let editEmpDepartment = document.querySelector("#editEmpDepartment");
let editEmpPosition = document.querySelector("#editEmpPosition");
let editEmpSalary = document.querySelector("#editEmpSalary");
let editEmpJoined = document.querySelector("#editEmpJoined");
let editEmpStatus = document.querySelector("#editEmpStatus");

function openEditEmployee(empID) {
    let employee = stat.find(emp => emp.empID === empID);
    if (!employee) {
        alert("Employee not found.");
        return;
    }

    editEmpID.value = employee.empID;
    editEmpName.value = employee.empName;
    editEmpEmail.value = employee.empEmail;
    editEmpDepartment.value = employee.empDepartment;
    
    if (![...editEmpDepartment.options].some(
        option => option.value === employee.empDepartment
    )) {
        let option = new Option(
            employee.empDepartment,
            employee.empDepartment
        );
        editEmpDepartment.add(option);
    }

    editEmpPosition.value = employee.empPosition;
    editEmpSalary.value = employee.empSalary;
    editEmpJoined.value = employee.empJoined;
    editEmpStatus.value = employee.empStatus;
    
    editEmployeeModal.classList.add("show");
    document.body.style.overflow = "hidden";
    editEmpName.focus();
}

function closeEmployeeEditModal() {
    editEmployeeModal.classList.remove("show");
    document.body.style.overflow = "";
}
closeEditModal.addEventListener("click", closeEmployeeEditModal);
cancelEditEmployee.addEventListener("click", closeEmployeeEditModal);

document.addEventListener("click", (event) => {
    let editButton = event.target.closest(".edit-employee-btn");
    if (!editButton) {
        return;
    }
    let empID = editButton.dataset.empid;
    if (empID) {
        openEditEmployee(empID);
    }
});

editEmployeeModal.addEventListener("click", (event) => {
    if (event.target === editEmployeeModal) {
        closeEmployeeEditModal();
    }
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && editEmployeeModal.classList.contains("show")) {
        closeEmployeeEditModal();
    }
});

editEmployeeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let empID = editEmpID.value;
    let employeeIndex = stat.findIndex(employee =>
        employee.empID === empID
    );
    if (employeeIndex === -1) {
        alert("Employee not found. Please refresh the page.");
        return;
    }

    updatedName = editEmpName.value.trim();
    updatedEmail = editEmpEmail.value.trim();
    updatedDepartment = editEmpDepartment.value;
    updatedPosition = editEmpPosition.value.trim();
    updatedSalary = Number(editEmpSalary.value);
    updatedJoined = editEmpJoined.value;
    updatedStatus = editEmpStatus.value;
    
    if (!updatedName || !updatedEmail || !updatedDepartment || !updatedPosition || !updatedJoined || !["Active", "Inactive"].includes(updatedStatus)) {
        alert("Please fill in all required fields.");
        return;
    }
    if (!Number.isFinite(updatedSalary) || updatedSalary < 0) { 
        alert("Please enter a valid salary.");
        return;
    }
    if (!Number.isFinite(Date.parse(updatedJoined))) {
        alert("Please select a valid joining date.");
        return;
    }
    stat[employeeIndex] = {
        ...stat[employeeIndex],
        empName: updatedName,
        empEmail: updatedEmail,
        empDepartment: updatedDepartment,
        empPosition: updatedPosition,
        empSalary: updatedSalary,
        empJoined: updatedJoined,
        empStatus: updatedStatus
    };
    try {
        localStorage.setItem("empData", JSON.stringify(stat));
    } catch (error) {
        alert("Unable to save changes in this browser.");
        return;
    }
    updateStats();
    renderEmployees();
    closeEmployeeEditModal();
    alert("Employee information updated successfully!");
});

// View Employee Details
let viewEmployeeModal = document.getElementById("viewEmployeeModal");
let closeViewModalBtn = document.getElementById("closeViewModal");
let doneViewEmployeeBtn = document.getElementById("doneViewEmployee");

function openViewEmployee(empID) {
    let employee = stat.find(emp =>
        String(emp.empID) === String(empID)
    );
    if (!employee) {
        alert("Employee information not found.");
        return;
    }
    
    let viewEmpAvatar = document.getElementById("viewEmpAvatar");
    let viewEmpName = document.getElementById("viewEmpName");
    let viewEmpPosition = document.getElementById("viewEmpPosition");
    let viewEmpID = document.getElementById("viewEmpID");
    let viewEmpFullName = document.getElementById("viewEmpFullName");
    let viewEmpEmail = document.getElementById("viewEmpEmail");
    let viewEmpDepartment = document.getElementById("viewEmpDepartment");
    let viewEmpJobPosition = document.getElementById("viewEmpJobPosition");
    let viewEmpSalary = document.getElementById("viewEmpSalary");
    let viewEmpJoined = document.getElementById("viewEmpJoined");
    let statusBadge = document.getElementById("viewEmpStatus");

    viewEmpAvatar.textContent = (employee.empName || "E").trim().charAt(0).toUpperCase();
    viewEmpName.textContent = employee.empName || "Not provided";
    viewEmpPosition.textContent = employee.empPosition || "Not provided";
    viewEmpID.textContent = employee.empID || "—";
    viewEmpFullName.textContent = employee.empName || "Not provided";
    viewEmpEmail.textContent = employee.empEmail || "Not provided";
    viewEmpDepartment.textContent = employee.empDepartment || "Not provided";
    viewEmpJobPosition.textContent = employee.empPosition || "Not provided";
    viewEmpSalary.textContent =
        employee.empSalary !== undefined &&
        employee.empSalary !== null &&
        employee.empSalary !== ""
        ? "₹" + Number(employee.empSalary).toLocaleString("en-IN") : "Not provided";

    let joiningDate = employee.empJoined || "Not provided";
    if (employee.empJoined) {
        let parsedDate = new Date(employee.empJoined);
        if (!Number.isNaN(parsedDate.getTime())) {
            joiningDate = parsedDate.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            });
        }
    }
    viewEmpJoined.textContent = joiningDate;

    let status = employee.empStatus || "Active";
    statusBadge.textContent = status;
    statusBadge.classList.toggle("inactive", status.toLowerCase() !== "active");

    viewEmployeeModal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeViewEmployeeModal() {
    viewEmployeeModal.classList.remove("show");
    document.body.style.overflow = "";
}
closeViewModalBtn.addEventListener("click", closeViewEmployeeModal);
doneViewEmployeeBtn.addEventListener("click", closeViewEmployeeModal);

document.addEventListener("click", function (event) {
    const viewButton = event.target.closest(".view-employee-btn");
    if (viewButton) {
        event.preventDefault();
        openViewEmployee(viewButton.dataset.empid);
    }
});

viewEmployeeModal.addEventListener("click", function (event) {
    if (event.target === viewEmployeeModal) {
        closeViewEmployeeModal();
    }
});
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && viewEmployeeModal.classList.contains("show")) {
        closeViewEmployeeModal();
    }
});
