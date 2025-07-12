let employees = [{
        id: 1,
        firstName: "Shiva",
        lastName: "shankar",
        email: "shiva@example.com",
        department: "HR",
        role: "Manager"
    },
    {
        id: 2,
        firstName: "sai",
        lastName: "kirshna",
        email: "sai@example.com",
        department: "IT",
        role: "Developer"
    }
];

const employeeList = document.getElementById("employeeList");
const form = document.getElementById("employeeForm");
const formTitle = document.getElementById("formTitle");

const inputFields = {
    id: document.getElementById("empId"),
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    email: document.getElementById("email"),
    department: document.getElementById("department"),
    role: document.getElementById("role")
};

function renderEmployees(data = employees) {
    employeeList.innerHTML = "";
    if (data.length === 0) {
        employeeList.innerHTML = "<p>No employees found.</p>";
        return;
    }

    data.forEach((emp) => {
        const card = document.createElement("div");
        card.className = "employee-card";
        card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <button class="edit-btn" onclick="editEmployee(${emp.id})">Edit</button>
      <button class="delete-btn" onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
        employeeList.appendChild(card);
    });
}

function applyFilters() {
    const dept = document.getElementById("filterDepartment").value;
    const role = document.getElementById("filterRole").value;
    const sortBy = document.getElementById("sortBy").value;
    const search = document.getElementById("searchInput").value.toLowerCase();

    let filtered = [...employees];

    if (dept) filtered = filtered.filter(e => e.department === dept);
    if (role) filtered = filtered.filter(e => e.role === role);
    if (search) {
        filtered = filtered.filter(e =>
            e.firstName.toLowerCase().includes(search) ||
            e.lastName.toLowerCase().includes(search) ||
            e.email.toLowerCase().includes(search)
        );
    }

    if (sortBy === "firstName") {
        filtered.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (sortBy === "department") {
        filtered.sort((a, b) => a.department.localeCompare(b.department));
    }

    renderEmployees(filtered);
}

document.getElementById("searchInput").addEventListener("input", applyFilters);

function showForm() {
    form.classList.remove("hidden");
    formTitle.textContent = "Add Employee";
    form.reset();
    inputFields.id.value = "";
}

function hideForm() {
    form.classList.add("hidden");
    form.reset();
    inputFields.id.value = "";
}

function handleFormSubmit(event) {
    event.preventDefault();
    const newEmp = {
        id: inputFields.id.value ? parseInt(inputFields.id.value) : Date.now(),
        firstName: inputFields.firstName.value,
        lastName: inputFields.lastName.value,
        email: inputFields.email.value,
        department: inputFields.department.value,
        role: inputFields.role.value
    };

    if (inputFields.id.value) {
        employees = employees.map(emp => emp.id === newEmp.id ? newEmp : emp);
    } else {
        employees.push(newEmp);
    }

    hideForm();
    applyFilters();
}

function editEmployee(id) {
    const emp = employees.find(e => e.id === id);
    if (emp) {
        showForm();
        formTitle.textContent = "Edit Employee";
        inputFields.id.value = emp.id;
        inputFields.firstName.value = emp.firstName;
        inputFields.lastName.value = emp.lastName;
        inputFields.email.value = emp.email;
        inputFields.department.value = emp.department;
        inputFields.role.value = emp.role;
    }
}

function deleteEmployee(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
        employees = employees.filter(e => e.id !== id);
        applyFilters();
    }
}


renderEmployees();
