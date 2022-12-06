import { useEffect, useState } from "react"
import { getServices } from "../../managers/ServiceManager"

export const AppointmentCreate = () => {

    const [services, setServices] = useState([])
    const [newAppointment, setNewAppointment] = useState({
        requestDetails: "",
        serviceTypeId: 0,
        requestDate: "",
        dateCompleted: "",
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


    return <>
        <h2>Hellow Appointment Worldie</h2>
        <form>
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
                <select name="serviceTypeId" className="drop__down" onClick={changeAppointmentState}>
                    <option value={0}>Select Service Type</option>
                    {
                        services.map(service => {
                            return <option value={`${service.id}`} key={`service--${service.id}`}>{service.name}</option>
                        })
                    }
                </select>
            </div>
        </form>
    </>
}