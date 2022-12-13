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

// DELETE single service
export const deleteService = (serviceId) => {
    return fetch(`http://localhost:8000/services/${serviceId}`, {
        method: "DELETE",
        headers: { "Authorization": `Token ${localStorage.getItem("mc_token")}` },
    })
}