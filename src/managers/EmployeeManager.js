// Get all Employees
export const getEmployees = () => {
    return fetch("http://localhost:8000/employees", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}

// Get all Employees
export const getCurrentEmployee = () => {
    return fetch("http://localhost:8000/employees/current_employee", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}

// GET single employee by Id
export const getEmployeeById = (employeeId) => {
    return fetch(`http://localhost:8000/employees/${employeeId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}
export const getEmployeeId = (employee) => {
    return fetch(`http://localhost:8000/employees/${employee.id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}

// DELETE single employee
export const deleteEmployee = (employeeId) => {
    return fetch(`http://localhost:8000/employees/${employeeId}`, {
        method: "DELETE",
        headers: { "Authorization": `Token ${localStorage.getItem("mc_token")}` },
    })
}

// PUT edit specialties
export const saveEditedEmployee = (employee) => {
    return fetch(`http://localhost:8000/employees/${employee.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        },
        body: JSON.stringify(employee)
    })
}