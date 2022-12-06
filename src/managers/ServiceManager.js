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
export const getEventById = (serviceId) => {
    return fetch(`http://localhost:8000/services/${serviceId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}