import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAppointmentById, saveEditedAppointment } from "../../managers/AppointmentManager"
import { getServices } from "../../managers/ServiceManager"

export const UpdateAppointment = () => {

    const { appointmentId } = useParams()
    const [services, setServices] = useState([])
    const [currentAppt, setCurrentAppt] = useState([])
    const [newAppointment, setNewAppointment] = useState({
        serviceTypeId: 0,
        progress: 0,
        requestDate: "",
        dateCompletion: "",
        requestDetails: "",
        consultation: false,
        completed: false

    })

    const navigate = useNavigate()

    useEffect(() => {
        getServices()
            .then(data => { setServices(data) })
    }, [])

    // Whenever appointmentId changes useEffect invokes this function
    const renderAppointment = () => {
        if (appointmentId) {
            // A single appointment is GET and currentAppointments is set to response
            getAppointmentById(appointmentId).then((res) => {
                setCurrentAppt(res)
            })
        }
    }

    //  Whenever appointmentId changes renderAppointment() function is invoked
    useEffect(() => {
        renderAppointment()
    }, [appointmentId])

    const changeAppointmentState = (domEvent) => {
        // TODO: Complete the onChange function
        const value = domEvent.target.value
        setNewAppointment({
            ...newAppointment,
            [domEvent.target.name]: value
        })
    }

    return <>
        <form>
            <h2>Hellow UPDATE Worldie</h2>
            <div>
                <label>Update Service Needed:</label>
                <select name="serviceTypeId" className="drop__down" onChange={changeAppointmentState} value={currentAppt.serviceTypeId}>
                    <option value={0}>{currentAppt?.service_type?.name}</option>
                    {
                        services.map(service => {
                            return <option value={`${service.id}`} key={`service--${service.id}`}>{service.name}</option>
                        })
                    }
                </select>
            </div>
            <div>
                <label>Update Request Date</label>
                <input type="date" name="requestDate" required autoFocus className=""
                    value={newAppointment.request_date}
                    placeholder={currentAppt.request_date}
                    onChange={changeAppointmentState} />
            </div>

            <div>
                <label>consultation</label>
                <input />
            </div>


            <div>
                <label>Request Details</label>
                <input type="text" name="requestDetails" required autoFocus className=""
                    value={currentAppt.requestDetails}
                    placeholder={currentAppt.request_details}
                    onChange={changeAppointmentState} />
            </div>


            <div>
                <button type="submit" onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const appointment = {
                        id: newAppointment.id,
                        service_type: newAppointment.serviceTypeId,
                        request_date: newAppointment.requestDate,
                        consultation: newAppointment.consultation,
                        request_details: newAppointment.request_details
                    }

                    // Send POST request to your API
                    saveEditedAppointment(appointment)
                        .then(() => navigate("/appointments"))
                }}
                    className="">Update Appointment</button>
            </div>

            <div>
                <button onClick={() => navigate(`/appointments`)} >Back to Appointments</button>
            </div>
        </form>
    </>

}