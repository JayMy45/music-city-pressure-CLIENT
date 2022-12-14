// Get all Services
export const getServices = () => {
    return fetch("http://localhost:8000/services", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}

// GET single service by Id
export const getServiceById = (serviceId) => {
    return fetch(`http://localhost:8000/services/${serviceId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}


// POST new services
export const createService = (service) => {
    return fetch("http://localhost:8000/services", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        },
        body: JSON.stringify(service)
    })
}

// PUT edit services
export const saveEditedService = (service) => {
    return fetch(`http://localhost:8000/services/${service.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        },
        body: JSON.stringify(service)
    })
}

// DELETE single service
export const deleteService = (serviceId) => {
    return fetch(`http://localhost:8000/services/${serviceId}`, {
        method: "DELETE",
        headers: { "Authorization": `Token ${localStorage.getItem("mc_token")}` },
    })
}