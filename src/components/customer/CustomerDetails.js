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
        location: []
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
        <div className=" mt-5 customer__list" id="navbar__space">
            <h1 className="is-title is-size-3 ml-5 mt-3">Customer Details</h1>
        </div>
        <div className="mt-4 mb-5 ml-5 ">
            <div><button className="btn__customer--details button is-dark ml-5" onClick={() => navigate(`/customers`)}>Back to Customers</button></div>
            <div><button className="btn__customer--details button is-dark ml-5 mt-1" onClick={() => navigate(`/appointments`)}>Appointments</button></div>
        </div>

        <div className="mc__customer center customer__list mb-3">
            <section className="mc__customer--details box is-centered mb-2 section">
                <div className="container">
                    <div className="columns">
                        <div className="mr-3 column center is-8">
                            <div className="">
                                <header className="center__left mb-4">
                                    <h1 className="">{customer.full_name}<sup className="has-text-success-dark is-size-5 ml-1">{customer.location.length > 1 ? <>†</> : <></>}</sup></h1>
                                </header>
                                <figure>
                                    <img src={customer.image} alt={`A portrait of ${customer.first_name}`} />
                                </figure>

                            </div>
                        </div>
                        <div className="column">
                            <div className="center">
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
                            {
                                mCPressure || superUser
                                    ? <>
                                        <div>
                                            {
                                                customer.location.length > 1
                                                    ? <>
                                                        <div className="field is-horizontal mt-5">
                                                            <div className="field-label is-normal">
                                                                <label>Address:</label>
                                                            </div>

                                                            <div className="field-body">
                                                                <div className="field">
                                                                    <div className="control mt-2">
                                                                        {
                                                                            customer.location.map((locate, index) => (<div key={`location--${locate.id}`}>{locate.street}<sup className="is-size-7 has-text-success-dark ml-1">{index + 1}</sup></div>))
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                    : <> <p className="mt-2">Address: {customer.address}</p></>
                                            }
                                        </div>
                                        <div className="field is-horizontal mt-5">
                                            <div className="field-label is-normal">
                                                <label>Phone:</label>
                                            </div>

                                            <div className="field-body mt-2 mb-4">
                                                <div className="field">
                                                    <div className="control">
                                                        {customer.phone_number}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    : <></>
                            }
                        </div>
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
