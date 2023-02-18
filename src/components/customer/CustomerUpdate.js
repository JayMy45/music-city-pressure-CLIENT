import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCustomerById } from "../../managers/CustomerManager"
import { deleteLocation } from "../../managers/LocationManager"
import "./Customer.css"

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

    const showWidget = (clickEvent) => {
        clickEvent.preventDefault()
        let widget = window.cloudinary.createUploadWidget({
            cloudName: `dp04hh5pz`,
            uploadPreset: `gv9plrcj`
        },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log(result.info.url)
                    const copy = structuredClone(customer)
                    copy.image = result.info.url
                    setCustomer(copy)
                }
            });
        widget.open()
    }

    const changeCustomerState = (domEvent) => {
        // TODO: Complete the onChange function
        const value = domEvent.target.value
        setCustomer({
            ...customer,
            [domEvent.target.name]: value
        })
    }

    //  handles confirmation of deletion via a popup
    const confirmLocationDelete = (evt, location) => {
        // whenever confirmed by clicking OK/Cancel window.confirm() returns boolean 
        let text = 'Are you sure you want to delete'
        window.confirm(text)
            ? deleteLocation(location.id)
                .then(renderCustomer)
            : <></>
    }

    return <>
        <section className="customer__list">
            <div>
                <h1 className="title is-size-3 ml-3">Update Customer</h1>
            </div>
            <div>
                <div className="mt-5 mb-5 ml-5">
                    <div>
                        <button className="btn__customer--update__1 button is-small has-background-light has-text-link-dark ml-5" onClick={() => navigate(`/customers`)}>Back to Customers</button>
                    </div>
                    <div>
                        <button className="btn__customer--update__1 button is-small has-background-light has-text-link-dark ml-5 mt-1" onClick={() => navigate(`/appointments`)}>Back to Appointments</button>
                    </div>
                </div>
            </div>
        </section>

        <form className="box px-6 py-6 mc__customer--update">
            <div className="">
                <div className="center">
                    <div>
                        <h2 className="title is-3">
                            <span>
                                <strong>Update {customer?.user?.first_name}'s Information</strong>
                                {customer.name}
                            </span>
                        </h2>
                    </div>
                </div>

                <div className="field is-horizontal mt-4">
                    <div className="field-label is-normal mt-3">
                        <button
                            onClick={(clickEvent) => showWidget(clickEvent)}
                            className="button is-primary is-small">
                            Update Image
                        </button>
                    </div>

                    <div className="field-body">
                        <div className="field">
                            <div className="control mt-4"></div>
                            <div className="center">
                                {
                                    customer.image !== ""
                                        ? <>
                                            <div className="box">
                                                <figure className="service__image is-size-4"><img src={customer.image} alt="preview" /></figure>
                                                <div className="center">
                                                    <h4 className="subtitle is-7">image preview</h4>
                                                </div>
                                            </div>
                                        </>
                                        : <>Image Will Preview Here</>
                                }
                            </div>

                        </div>
                    </div>
                </div>

                <div className="field is-horizontal mt-5">
                    <div className="field-label is-normal">
                        <label><strong>Address:</strong></label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                {
                                    customer.location.map((locate, index) => (
                                        <div key={`address--${locate.id}`} className="mt-2 center">
                                            <div className="">
                                                <span className="mr-1">
                                                    <ion-icon name="home"></ion-icon>
                                                    <sup>{index + 1}</sup>
                                                </span>
                                                <input type="text"
                                                    name="label"
                                                    required
                                                    style={{ width: 250 }}
                                                    className="input mr-2"
                                                    value={locate.street}
                                                    onChange={changeCustomerState} />
                                                <button className="button is-small mr-1 is-link">Update</button>
                                                <button className="button is-small is-danger" onClick={(evt) => confirmLocationDelete(evt, locate)}>Remove</button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="center mt-4">
                                <button className="button is-dark">Add New Address</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    </>
}