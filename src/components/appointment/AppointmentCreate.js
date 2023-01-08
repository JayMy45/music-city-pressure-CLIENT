import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { createAppointment } from "../../managers/AppointmentManager";
import { getServices } from "../../managers/ServiceManager"

export const AppointmentCreate = () => {

    const navigate = useNavigate()
    const [services, setServices] = useState([])
    const [newAppointment, setNewAppointment] = useState({

        employee: [],
        customer: "",
        serviceTypeId: 0,
        requestDetails: "",
        requestDate: "",
        image: "",
        progress: 1,
        dateCompleted: ""
    })

    useEffect(() => {
        getServices()
            .then(data => { setServices(data) })
    }, [])

    const changeAppointmentState = (domEvent) => {
        // TODO: Complete the onChange function
        const value = domEvent.target.value
        setNewAppointment({
            ...newAppointment,
            [domEvent.target.name]: value
        })
    }

    const showWidget = (clickEvent) => {
        clickEvent.preventDefault()
        let widget = window.cloudinary.createUploadWidget({
            cloudName: `dp04hh5pz`,
            uploadPreset: `gv9plrcj`
        },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log(result.info.url)
                    const copy = structuredClone(newAppointment)
                    copy.image = result.info.url
                    setNewAppointment(copy)
                }
            });
        widget.open()
    }

    return <>
        <form className="mc__appointment--create box">

            <div className="center mb-2">
                <h2>Hellow Creation Worldie</h2>
            </div>

            <div className="mb-5 mt-3 center">
                <div>
                    <h2 className="subtitle is-7">Hellow Creation Worldie</h2>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label>Details about need</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <textarea type="text" name="requestDetails" required autoFocus className="textarea is-right"
                                value={newAppointment.requestDetails}
                                onChange={changeAppointmentState} >
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label>Choose a service</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select name="serviceTypeId" className="drop__down" onChange={changeAppointmentState} value={newAppointment.serviceTypeId}>
                                    <option value={0}>Select Service Type</option>
                                    {
                                        services.map(service => {
                                            return <option value={`${service.id}`} key={`service--${service.id}`}>{service.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label>Request Date</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control"></div>
                        <input type="date" name="requestDate" required autoFocus className="input"
                            value={newAppointment.requestDate}
                            onChange={changeAppointmentState} />
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label is-normal mt-3">
                    <button
                        onClick={(clickEvent) => showWidget(clickEvent)}
                        className="button is-primary is-small">
                        Add Image
                    </button>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control mt-4">
                            <div className="center">
                                {
                                    newAppointment.image !== ""
                                        ? <>
                                            <div className="box">
                                                <figure className="service__image is-size-4"><img src={newAppointment.image} alt="preview" /></figure>
                                                <div className="center"><h4 className="subtitle is-7">image preview</h4></div>
                                            </div>
                                        </>
                                        : <>Image Will Preview Here</>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="center mt-2">
                <button
                    className="button is-info"
                    type="submit"
                    onClick={evt => {
                        // Prevent form from being submitted
                        evt.preventDefault()

                        const appointment = {
                            customer_id: newAppointment.customer,
                            request_details: newAppointment.requestDetails,
                            service_type: parseInt(newAppointment.serviceTypeId),
                            scheduled: false,
                            progress: parseInt(newAppointment.progress),
                            request_date: newAppointment.requestDate,
                            consultation: false
                        }

                        // Send POST request to your API
                        createAppointment(appointment)
                            .then(() => navigate("/appointments"))
                    }}
                >Create Appointment</button>
            </div>

        </form>
    </>
}