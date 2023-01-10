// Get all Specialties
export const getSpecialties = () => {
    return fetch("http://localhost:8000/specialties", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}

// GET single specialty by Id
export const getSpecialtyById = (specialtyId) => {
    return fetch(`http://localhost:8000/specialties/${specialtyId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}

// POST new specialties
export const createSpecialty = (specialty) => {
    return fetch("http://localhost:8000/specialties", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        },
        body: JSON.stringify(specialty)
    })
}

// PUT edit specialties
export const saveEditedSpecialty = (specialty) => {
    return fetch(`http://localhost:8000/specialties/${specialty.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        },
        body: JSON.stringify(specialty)
    })
}

// DELETE single specialty
export const deleteSpecialty = (specialtyId) => {
    return fetch(`http://localhost:8000/specialties/${specialtyId}`, {
        method: "DELETE",
        headers: { "Authorization": `Token ${localStorage.getItem("mc_token")}` },
    })
}