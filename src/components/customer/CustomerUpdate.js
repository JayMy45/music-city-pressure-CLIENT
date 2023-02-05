import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
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

    const navigate = useNavigate()


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
        <div className="mt-5" id="navbar__space">
            <h1 className=" ml-5 mt-5">Update Customer</h1>
        </div>
        <div>
            <div className="mt-5 mb-5 ml-5 ">
                <div>
                    <button className="btn__customer--update__1 button is-small has-background-light has-text-link-dark ml-5" onClick={() => navigate(`/customers`)}>Back to Customers</button>
                </div>
                <div>
                    <button className="btn__customer--update__1 button is-small has-background-light has-text-link-dark ml-5 mt-1" onClick={() => navigate(`/appointments`)}>Back to Appointments</button>
                </div>
            </div>
        </div>

        <form>
            Hellow Customer Update Worldie
            {console.log(`${customer.full_name}`)}
            <h2>{customer.full_name}</h2>
        </form>
    </>
}