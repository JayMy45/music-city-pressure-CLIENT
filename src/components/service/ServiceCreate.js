import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getEquipments } from "../../managers/EquipmentManager";
import { createService } from "../../managers/ServiceManager";

export const ServiceCreate = () => {

    const navigate = useNavigate()
    const [equipments, setEquipment] = useState([])
    const [newService, setNewService] = useState({
        name: "",
        label: "",
        description: "",
        details: "",
        equipment_id: 0,
        price: 0
    })

    useEffect(() => {
        getEquipments()
            .then(data => { setEquipment(data) })
    }, [])

    const changeServiceState = (domEvent) => {
        // TODO: Complete the onChange function
        const value = domEvent.target.value
        setNewService({
            ...newService,
            [domEvent.target.name]: value
        })
    }


    return <>
        <h2>Hellow Creation Worldie</h2>
        <form>
            <div>
                <div>
                    <label>New Service Name</label>
                </div>
                <input type="text" name="name" required autoFocus className=""
                    value={newService.name}
                    onChange={changeServiceState} />
            </div>
            <div>
                <div>
                    <label>Label</label>
                </div>
                <input type="text" name="label" required autoFocus className=""
                    value={newService.label}
                    onChange={changeServiceState} />
            </div>
            <div>
                <div>
                    <label>Description</label>
                </div>
                <input type="text" name="description" required autoFocus className=""
                    value={newService.description}
                    onChange={changeServiceState} />
            </div>
            <div>
                <div>
                    <label>Details</label>
                </div>
                <input type="text" name="details" required autoFocus className=""
                    value={newService.details}
                    onChange={changeServiceState} />
            </div>
            <div>
                <label>Equipment Needed</label>
                <div>
                    <select name="equipment_id" className="drop__down" onChange={changeServiceState} value={newService.equipment_id}>
                        <option value={0}>Choose equipment</option>
                        {
                            equipments.map(equip => {
                                return <option value={`${equip.id}`} key={`equip--${equip.id}`}>{equip.label}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div>
                <div>
                    <label>Price</label>
                </div>
                <input type="number" name="price" required autoFocus className=""
                    value={newService.price}
                    onChange={changeServiceState} />
            </div>
            <div>
                <button type="submit" onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const service = {
                        name: newService.name,
                        label: newService.label,
                        description: newService.description,
                        details: newService.details,
                        equipment_id: parseInt(newService.equipment_id),
                        price: parseFloat(newService.price)
                    }

                    // Send POST request to your API
                    createService(service)
                        .then(() => navigate("/services"))
                }}
                    className="">Create Service</button>
            </div>

        </form>
    </>
}