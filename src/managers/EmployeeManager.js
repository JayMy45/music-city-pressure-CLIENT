// Get all Employees
export const getEmployees = () => {
    return fetch("http://localhost:8000/employees", {
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