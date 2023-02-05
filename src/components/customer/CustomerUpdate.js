import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCustomerById } from "../../managers/CustomerManager"

export const CustomerUpdate = () => {

    const { customerId } = useParams()
    const [customer, setCustomer] = useState({
        full_name: "",
        address: "",
        bio: "",
        phone_number: "",
        location: []
    })

    const renderCustomer = useCallback(() => {
        if (customerId) {
            getCustomerById(customerId).then((res) => {
                setCustomer(res)
            })
        }
    }, [customerId])

    useEffect(() => {
        renderCustomer()
    }, [renderCustomer])

    return <>
        Hellow Customer Update Worldie
        {console.log(`${customer.full_name}`)}
        <h2>{customer.full_name}</h2>
    </>
}