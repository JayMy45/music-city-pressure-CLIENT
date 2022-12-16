// Get all Progresses
export const getProgressions = () => {
    return fetch("http://localhost:8000/progression", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}

// GET single progress by Id
export const getProgressById = (progressId) => {
    return fetch(`http://localhost:8000/progresss/${progressId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}