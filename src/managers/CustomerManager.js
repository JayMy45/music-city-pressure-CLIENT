// Get all Customers
export const getCustomers = () => {
    return fetch("http://localhost:8000/customers", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}

// Get Current Customer
export const getCurrentCustomer = () => {
    return fetch("http://localhost:8000/customers/current_customer", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}