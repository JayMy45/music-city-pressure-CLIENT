import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getEquipments } from "../../managers/EquipmentManager";
import { createService } from "../../managers/ServiceManager";

export const ServiceCreate = () => {

    const navigate = useNavigate()
    const [equipments, setEquipment] = useState([])
    const [checkedOptions, setCheckedOptions] = useState(new Set())
    const [newService, setNewService] = useState({
        name: "",
        label: "",
        description: "",
        details: "",
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
            {/* <div>
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
            </div> */}

            <div>
                <label>Equipment Needed</label>
                <div>

                    {equipments.map(equip => (<div className="ml-2 mr-2" key={`equipment--${equip.id}`}>

                        <input className="mr-2" value={equip.id}
                            onChange={(e) => {
                                const copy = new Set(checkedOptions)
                                if (copy.has(equip.id)) {
                                    copy.delete(equip.id)
                                } else { copy.add(equip.id) }
                                setCheckedOptions(copy)
                            }
                            } type="checkbox" />
                        {equip.label}
                    </div>))
                    }
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
                        tools: Array.from(checkedOptions),
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