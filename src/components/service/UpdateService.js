import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getServiceById, saveEditedService } from "../../managers/ServiceManager"

export const UpdateService = () => {

    const navigate = useNavigate()
    const { serviceId } = useParams()

    const [currentService, setCurrentService] = useState({
        name: "",
        description: "",
        details: "",
        price: 0,
        equipment_id: 1
    })

    useEffect(() => {
        getServiceById(serviceId)
            .then(setCurrentService)
    })

    useEffect(() => {
        getServiceById(serviceId)
            .then(setCurrentService)
    }, [serviceId])

    const changeServiceState = (domEvent) => {
        // TODO: Complete the onChange function
        const value = domEvent.target.value
        setCurrentService({
            ...currentService,
            [domEvent.target.name]: value
        })
    }

    return <>
        <form>
            <h2>Hellow UPDATE Worldie</h2>
            {/* <div>
                <div>
                    <label>Update Service Name: <span><em>Current Service Selection</em> {currentAppt?.service_type?.name}</span></label>
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
            </div> */}


            {/* <div>
                <button type="submit" onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const service = {
                        id: currentService.id,
                        name: currentService.name,
                        description: currentService.description,
                        details: currentService.details,
                        price: currentService.price,
                        equipment_id: currentService.equipment_id
                    }

                    // Send POST request to your API
                    saveEditedService(service)
                        .then(() => navigate("/services"))
                }}
                    className="">Update Service</button>
            </div> */}

        </form>
    </>

}