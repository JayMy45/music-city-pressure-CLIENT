import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAppointmentById, saveEditedAppointment } from "../../managers/AppointmentManager"
import { getServices } from "../../managers/ServiceManager"

export const UpdateAppointment = () => {

    const { appointmentId } = useParams()

    const navigate = useNavigate()
    const [services, setServices] = useState([])
    const [currentAppt, setCurrentAppt] = useState({
        serviceTypeId: 0,
        progress: 0,
        requestDate: "",
        dateCompletion: "",
        requestDetails: "",
        consultation: false,
        completed: false
    })

    useEffect(() => {
        getServices()
            .then(setServices)
    }, [])

    //  Whenever appointmentId changes set CurrentAppt state
    useEffect(() => {
        getAppointmentById(appointmentId)
            .then(setCurrentAppt)
    }, [appointmentId])

    const changeAppointmentState = (domEvent) => {
        // TODO: Complete the onChange function
        const value = domEvent.target.value
        setCurrentAppt({
            ...currentAppt,
            [domEvent.target.name]: value
        })
    }

    return <>
        <form>
            <h2>Hellow UPDATE Worldie</h2>
            <div>
                <div>
                    <label>Update Service Needed:  Current Selection <span>{currentAppt?.service_type?.name}</span></label>
                </div>
                <select name="serviceTypeId" className="drop__down" onChange={changeAppointmentState} value={currentAppt.serviceTypeId}>
                    <option value={0}>Change Service Type</option>
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
                    onChange={changeAppointmentState} />
            </div>

            <div>
                <label>consultation</label>
                <input type="checkbox" />
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
                        id: currentAppt.id,
                        service_type: currentAppt.serviceTypeId,
                        request_date: currentAppt.requestDate,
                        consultation: currentAppt.consultation,
                        request_details: currentAppt.requestDetails
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