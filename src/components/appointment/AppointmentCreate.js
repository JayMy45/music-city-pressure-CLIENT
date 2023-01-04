import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { createAppointment } from "../../managers/AppointmentManager";
import { getServices } from "../../managers/ServiceManager"

export const AppointmentCreate = () => {

    const navigate = useNavigate()
    const [services, setServices] = useState([])
    const [newAppointment, setNewAppointment] = useState({
        requestDetails: "",
        serviceTypeId: 0,
        progress: 1,
        requestDate: "",
        consultation: false
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
        <h2>Hellow Creation Worldie</h2>
        <form className="box">
            <div>
                <div>
                    <label>Details about need</label>
                </div>
                <input type="text" name="requestDetails" required autoFocus className=""
                    value={newAppointment.requestDetails}
                    onChange={changeAppointmentState} />
            </div>
            <div>
                <label>Choose a service</label>
                <select name="serviceTypeId" className="drop__down" onChange={changeAppointmentState} value={newAppointment.serviceTypeId}>
                    <option value={0}>Select Service Type</option>
                    {
                        services.map(service => {
                            return <option value={`${service.id}`} key={`service--${service.id}`}>{service.name}</option>
                        })
                    }
                </select>
            </div>
            <div>
                <div>
                    <label>Date Services Needed</label>
                </div>
                <input type="date" name="requestDate" required autoFocus className=""
                    value={newAppointment.requestDate}
                    onChange={changeAppointmentState} />
            </div>

            <div>
                <button
                    onClick={(clickEvent) => showWidget(clickEvent)}
                    className="btn btn-primary">
                    Add Image
                </button>
            </div>

            <div>
                <button type="submit" onClick={evt => {
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
                    className="">Create Appointment</button>
            </div>

        </form>
    </>
}