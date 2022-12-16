import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAppointmentById, saveEditedAppointment } from "../../managers/AppointmentManager"
import { getServices } from "../../managers/ServiceManager"

export const UpdateAppointment = () => {

    const { appointmentId } = useParams()


    const navigate = useNavigate()
    const [services, setServices] = useState([])
    const [currentAppt, setCurrentAppt] = useState({
        service_type_id: 0,
        progress: 0,
        request_date: "",
        date_completion: "",
        request_details: "",
        consultation: false,
        completed: false,
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
                    <label>Update Service Needed: <span><em>Current Service Selection</em> {currentAppt?.service_type?.name}</span></label>
                </div>
                <select name="service_type_id" className="drop__down" onChange={changeAppointmentState} value={currentAppt.service_type_id}>
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
                <input type="date" name="request_date" required autoFocus className=""
                    value={currentAppt.request_date}
                    onChange={changeAppointmentState} />
            </div>

            <div>
                <label>consultation</label>
                <input type="checkbox" />
            </div>


            <div>
                <label>Request Details</label>
                <input type="text" name="request_details" required autoFocus className=""
                    value={currentAppt.request_details}
                    placeholder={currentAppt.request_details}
                    onChange={changeAppointmentState} />
            </div>


            <div>
                <button type="submit" onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const appointment = {
                        id: currentAppt.id,
                        service_type: currentAppt.service_type_id,
                        request_date: currentAppt.request_date,
                        consultation: currentAppt.consultation,
                        request_details: currentAppt.request_details
                    }

                    // Send POST request to your API
                    saveEditedAppointment(appointment)
                        .then(() => navigate("/appointments"))
                }}
                    className="">Update Appointment</button>
            </div>

            <div>
                {
                    currentAppt?.user?.is_staff
                        ? <>work</>
                        : <>workit</>
                }

                <button onClick={() => navigate(`/appointments`)} >Back to Appointments</button>
            </div>
        </form>
    </>

}