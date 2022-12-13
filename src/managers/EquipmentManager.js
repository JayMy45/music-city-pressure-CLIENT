// Get all Equipments
export const getEquipments = () => {
    return fetch("http://localhost:8000/equipments", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}

// GET single equipment by Id
export const getEquipmentById = (equipmentId) => {
    return fetch(`http://localhost:8000/equipments/${equipmentId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}