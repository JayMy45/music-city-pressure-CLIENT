import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCurrentCustomer, getCustomerById } from "../../managers/CustomerManager"
import "./Customer.css"

export const CustomerDetails = () => {

    const { customerId } = useParams()

    const [customer, setCustomer] = useState({
        address: "",
        bio: "",
        phone_number: "",
    })

    const navigate = useNavigate()

    const mCSuperUser = localStorage.getItem("is_superuser")
    const superUser = JSON.parse(mCSuperUser)

    const localMCUser = localStorage.getItem("is_staff")
    const mCPressure = JSON.parse(localMCUser)

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    const formattedValue = formatter.format(customer.salary);


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
        <div className=" mt-5" id="navbar__space">
            <h1 className=" ml-5 mt-3">Customer Details</h1>
        </div>
        <div className="mt-4 mb-5 ml-5 ">
            <div><button className="btn__customer--details button is-dark ml-5" onClick={() => navigate(`/customers`)}>Back to Customers</button></div>
            <div><button className="btn__customer--details button is-dark ml-5 mt-1" onClick={() => navigate(`/appointments`)}>Appointments</button></div>
        </div>
        <div className="mc__customer center">
            <section className="mc__customer--details box is-centered mb-2 section">
                <div className="container">
                    <div className="columns">
                        <div className="mr-3 column center is-8">
                            <div className="">
                                <header className="center__left mb-4">
                                    <h1 className="">{customer.full_name}</h1>
                                </header>
                                <figure>
                                    <img src={customer.image} alt={`A portrait of ${customer.first_name}`} />
                                </figure>
                                <div>
                                    {
                                        mCPressure || superUser
                                            ? <>
                                                <p>Address: {customer.address}</p>
                                                <p>Phone: {customer.phone_number}</p>
                                            </>
                                            : <></>
                                    }
                                </div>

                            </div>
                        </div>
                        <div>
                            <div className="column">
                                {
                                    superUser
                                        ? <div className="mb-4">
                                            <button onClick={() => navigate(`/customers/update/${customer.id}`)} className="center button btn__customer-details is-small mb-2">Update</button>
                                        </div>
                                        : <></>
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p><strong>About {customer?.user?.first_name}</strong></p>
                            <p style={{ textAlign: 'justify' }}>{customer.bio}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
}
