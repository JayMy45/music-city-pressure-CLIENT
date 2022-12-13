import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getEquipments } from "../../managers/EquipmentManager"
import { getServiceById, getServices, saveEditedService } from "../../managers/ServiceManager"

export const UpdateService = () => {

    const navigate = useNavigate()
    const { serviceId } = useParams()
    const [equipments, setEquipments] = useState([])
    const [currentService, setCurrentService] = useState({
        name: "",
        description: "",
        details: "",
        price: 0,
        equipment_id: 0
    })


    useEffect(() => {
        getEquipments()
            .then(setEquipments)
    }, [])


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
            <div>
                <div>
                    <label> <span><em>current service selection</em> {currentService.name}</span></label>
                </div>

            </div>
            {/* <div>
                <label>Update Request Date</label>
                <input type="date" name="request_date" required autoFocus className=""
                    value={currentService.request_date}
                    onChange={changeServiceState} />
            </div> */}

            {/* <div>
                <label>consultation</label>
                <input type="checkbox" />
            </div> */}


            <div>
                <label>Description</label>
                <input type="text" name="description" required autoFocus className=""
                    value={currentService.description}
                    placeholder={currentService.description}
                    onChange={changeServiceState} />
            </div>

            <div>
                <label>Request Details</label>
                <input type="text" name="details" required autoFocus className=""
                    value={currentService.details}
                    placeholder={currentService.details}
                    onChange={changeServiceState} />
            </div>
            <div>
                <label>Price</label>
                <input type="text" name="price" required autoFocus className=""
                    value={currentService.price}
                    placeholder={currentService.price}
                    onChange={changeServiceState} />
            </div>

            <div>
                <div>
                    <label> <span><em>current service selection</em> {currentService.equipment_id}</span></label>
                </div>C
                <select name="equipment_id" className="drop__down" onChange={changeServiceState} value={currentService.id}>
                    <option value={0}>Change Service Type</option>
                    {
                        equipments.map(equipment => {
                            return <option value={`${equipment.id}`} key={`equipment--${equipment.id}`}>{equipment.label}</option>
                        })
                    }
                </select>
            </div>

            <div>
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
            </div>

        </form>
    </>

}