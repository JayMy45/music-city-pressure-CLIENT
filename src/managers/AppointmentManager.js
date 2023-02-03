// Get all Appointments
export const getAppointments = () => {
    return fetch("http://localhost:8000/appointments", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}

// GET single appointment by Id
export const getAppointmentById = (appointmentId) => {
    return fetch(`http://localhost:8000/appointments/${appointmentId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}

// GET single appointment by employee_id
export const getAppointmentByEmployeeId = (employeeId) => {
    return fetch(`http://localhost:8000/appointments?employee_id=${employeeId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}

// GET single appointment by customer_id
export const getAppointmentByCustomerId = (customerId) => {
    return fetch(`http://localhost:8000/appointments?customer_id=${customerId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}

// POST new appointments
export const createAppointment = (appointment) => {
    return fetch("http://localhost:8000/appointments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        },
        body: JSON.stringify(appointment)
    })
}

// PUT edit appointments
export const saveEditedAppointment = (appointment) => {
    return fetch(`http://localhost:8000/appointments/${appointment.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        },
        body: JSON.stringify(appointment)
    })
}

//! DELETE technician from appointments using custom @action decorator
export const unAssign = (appointmentId, unAssignEmployee) => {
    return fetch(`http://localhost:8000/appointments/${appointmentId}/unassign`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        },
        body: JSON.stringify(unAssignEmployee)
    })
}


// DELETE single appointment
export const deleteAppointment = (appointmentId) => {
    return fetch(`http://localhost:8000/appointments/${appointmentId}`, {
        method: "DELETE",
        headers: { "Authorization": `Token ${localStorage.getItem("mc_token")}` },
    })
}