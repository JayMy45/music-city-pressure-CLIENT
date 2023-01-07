import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getEquipments } from "../../managers/EquipmentManager"
import { getServiceById, saveEditedService } from "../../managers/ServiceManager"

export const UpdateService = () => {

    const navigate = useNavigate()
    const { serviceId } = useParams()
    const [equipments, setEquipments] = useState([])
    const [checkedOptions, setCheckedOptions] = useState(new Set())
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

    const showWidget = (clickEvent) => {
        clickEvent.preventDefault()
        let widget = window.cloudinary.createUploadWidget({
            cloudName: `dp04hh5pz`,
            uploadPreset: `gv9plrcj`
        },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log(result.info.url)
                    const copy = structuredClone(currentService)
                    copy.image = result.info.url
                    setCurrentService(copy)
                }
            });
        widget.open()
    }

    return <>
        <form>
            <h2>Hellow UPDATE Worldie</h2>
            <div>
                <div>
                    <label> <span><em>current service selection</em> {currentService.name}</span></label>
                </div>
            </div>
            <div>
                <label>Description</label>
                <input type="text" name="description" required autoFocus className=""
                    value={currentService.description}
                    placeholder={currentService.description}
                    onChange={changeServiceState} />
            </div>
            <div>
                <div>
                    <label>Label</label>
                </div>
                <input type="text" name="label" required autoFocus className=""
                    value={currentService.label}
                    onChange={changeServiceState} />
            </div>
            <div>
                <div>
                    {
                        currentService.image !== ""
                            ? <figure className="service__image is-size-4"><img src={currentService.image} alt="preview" /></figure>
                            : <></>
                    }
                </div>
                <button
                    onClick={(clickEvent) => showWidget(clickEvent)}
                    className="btn btn-primary">
                    Update Image
                </button>
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

            <div>
                <button type="submit" onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const service = {

                        id: currentService.id,
                        name: currentService.name,
                        label: currentService.label,
                        image: currentService.image,
                        description: currentService.description,
                        details: currentService.details,
                        tools: Array.from(checkedOptions),
                        price: parseFloat(currentService.price)
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