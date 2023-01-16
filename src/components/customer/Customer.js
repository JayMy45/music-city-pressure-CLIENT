
import { Link, useNavigate } from "react-router-dom"
import { deleteCustomer } from "../../managers/CustomerManager"
import "./Customer.css"

export const Customer = ({ customer, superUser, mCPressure, fetchCustomers }) => {

    const navigate = useNavigate()

    //  handles confirmation of deletion via a popup
    const confirmDelete = (evt, customer) => {
        // whenever confirmed by clicking OK/Cancel window.confirm() returns boolean 
        let text = 'Are you sure you want to delete'
        window.confirm(text)
            ? deleteCustomer(customer.id)
                .then(fetchCustomers)
            : <></>
    }


    return <>

        <div className="is-4-tablet is-4-desktop column center ml-1 mt-5">
            <section className=" center box mt-3 mb-3">
                <div className="columns" style={{ width: 350, height: 175 }}>
                    <div className="column is-8 center">
                        <div className="">
                            <header className="center__left mb-2">
                                <h2 className="title"><Link  >{customer.full_name}</Link></h2>
                            </header>
                            <div className="">
                                {superUser ? <p>a: {customer.address}</p> : <></>}
                                <p><span><ion-icon name="call-outline"></ion-icon></span> {customer.phone_number}</p>
                                <p ><span className=""><ion-icon name="mail"></ion-icon></span>  {customer.user.email}</p>

                            </div>
                        </div>
                    </div>
                    <div className="customer__specialty--delete-btn column">

                        <div className="center ">
                            {
                                mCPressure
                                    ? <>
                                        <div className="btn__customer--div is-align-content-space-between">
                                            <div className="">
                                                <div>
                                                    <button className="btn__customers button is-small is-link" onClick={() => navigate(`/appointments`)}>Appts</button>
                                                </div>
                                            </div>
                                            <div className="">
                                                <div>
                                                    <button className="btn__customers button is-small is-danger mt-1" onClick={(evt) => confirmDelete(evt, customer)}>Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    : <></>
                            }
                        </div>
                    </div>
                </div>

            </section>
        </div >
    </>

}