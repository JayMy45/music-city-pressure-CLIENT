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


// GET single customer by Id
export const getCustomerById = (customerId) => {
    return fetch(`http://localhost:8000/customers/${customerId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("mc_token")}`
        }
    })
        .then(response => response.json())
}

// DELETE single customer
export const deleteCustomer = (customerId) => {
    return fetch(`http://localhost:8000/customers/${customerId}`, {
        method: "DELETE",
        headers: { "Authorization": `Token ${localStorage.getItem("mc_token")}` },
    })
}