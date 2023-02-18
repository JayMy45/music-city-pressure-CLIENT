// Get all Locations
export const getLocations = () => {
    return fetch("http://localhost:8000/locations", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}

// GET single location by Id
export const getLocationById = (locationId) => {
    return fetch(`http://localhost:8000/locations/${locationId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}

// DELETE single location
export const deleteLocation = (locationId) => {
    return fetch(`http://localhost:8000/locations/${locationId}`, {
        method: "DELETE",
        headers: { "Authorization": `Token ${localStorage.getItem("mc_token")}` },
    })
}