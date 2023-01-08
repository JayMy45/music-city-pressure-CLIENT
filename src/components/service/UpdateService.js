import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getEquipments } from "../../managers/EquipmentManager"
import { getServiceById, saveEditedService } from "../../managers/ServiceManager"
import "./Service.css"

export const UpdateService = () => {

    const navigate = useNavigate()
    const { serviceId } = useParams()
    const [equipments, setEquipments] = useState([])
    const [checkedOptions, setCheckedOptions] = useState(new Set())
    const [currentService, setCurrentService] = useState({
        name: "",
        label: "",
        description: "",
        details: "",
        tools: [],
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
        <form className="mc__service--update box px-6 py-6 mt-5 mb-5">

            <div className="center mb-2">
                <h2 className="title is-1">Update Service</h2>
            </div>

            <div className="">
                <div className="mb-5 mt-3 center">
                    <div>
                        <h2 className="subtitle is-6"><span><strong>Selected Service: </strong> {currentService.name}</span></h2>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label>Label</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input type="text" name="label" required autoFocus className="input"
                                    value={currentService.label}
                                    onChange={changeServiceState} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal mt-3">
                        <label>Description</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control mt-4">
                                <textarea type="text" name="description" required className="textarea is-right"
                                    value={currentService.description}
                                    placeholder={currentService.description}
                                    onChange={changeServiceState} >

                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal mt-3">
                        <button
                            onClick={(clickEvent) => showWidget(clickEvent)}
                            className="button is-primary is-small">
                            Update Image
                        </button>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control mt-4"></div>
                            <div className="center">
                                {
                                    currentService.image !== ""
                                        ? <figure className="service__image is-size-4"><img src={currentService.image} alt="preview" /></figure>
                                        : <></>
                                }
                            </div>

                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal mt-2">
                        <label>Details</label>
                    </div>
                    <div className="field-body mt-2">
                        <div className="field">
                            <div className="control">
                                <textarea type="text" name="details" required autoFocus className="textarea"
                                    value={currentService.details}
                                    placeholder={currentService.details}
                                    onChange={changeServiceState} >

                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="field is-horizontal">
                    <div className="field-label is-normal mt-2">
                        <label>Price</label>
                    </div>
                    <div className="field-body mt-2">
                        <div className="field">
                            <div className="control">
                                <input type="number" name="price" required className="input is-focused"
                                    value={currentService.price}
                                    placeholder={currentService.price}
                                    onChange={changeServiceState} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Tools:</label>
                    </div>
                    <div className="field-body mt-2">
                        <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                    {/* <span className="">Update Tools:</span> */}
                                    {
                                        equipments.map(equip => (<div className="ml-2 mr-2" key={`equipment--${equip.id}`}>
                                            <input
                                                type="checkbox"
                                                className="mr-2"
                                                defaultChecked={currentService.tools.some(tool => tool.id === equip.id)}
                                                value={equip.id}
                                                onChange={(e) => {
                                                    const copy = new Set(checkedOptions)
                                                    if (copy.has(equip.id)) {
                                                        copy.delete(equip.id)
                                                    } else { copy.add(equip.id) }
                                                    setCheckedOptions(copy)
                                                }}
                                            />
                                            {equip.label}
                                        </div>))
                                    }
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="center">
                    <button className="button is-info" type="submit" onClick={evt => {
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
                    >Update Service</button>
                </div>
            </div>

        </form>
    </>

}