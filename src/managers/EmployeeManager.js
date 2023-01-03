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