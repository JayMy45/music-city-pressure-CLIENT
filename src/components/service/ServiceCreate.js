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
        image: "",
        description: "",
        details: "",
        price: 0
    })

    useEffect(() => {
        getEquipments()
            .then(data => { setEquipment(data) })
    }, [])

    const showWidget = (clickEvent) => {
        clickEvent.preventDefault()
        let widget = window.cloudinary.createUploadWidget({
            cloudName: `dp04hh5pz`,
            uploadPreset: `gv9plrcj`
        },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log(result.info.url)
                    const copy = structuredClone(newService)
                    copy.image = result.info.url
                    setNewService(copy)
                }
            });
        widget.open()
    }

    const changeServiceState = (domEvent) => {
        // TODO: Complete the onChange function
        const value = domEvent.target.value
        setNewService({
            ...newService,
            [domEvent.target.name]: value
        })
    }



    return <>
        <div className="mt-5" id="navbar__space">
            <h1 className=" ml-5 mt-5">Create Service </h1>
        </div>
        <div className="mt-1 mb-5 ml-5 ">
            <div>
                <button className="btn__service--details button is-small is-dark ml-5" onClick={() => navigate(`/services`)}>Back to Services</button>
            </div>
        </div>
        <form className="mc__service--create box  px-6 py-6 mt-5 mb-5">

            <div className="center mb-2">
                <h2 className="title is-1">New Service</h2>
            </div>

            <div className="mb-5 mt-3 center">
                <div>
                    <h2 className="subtitle is-7"><em>Use this form to create a new service</em></h2>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label>Name</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <input type="text" name="name" required className="input"
                                placeholder="What would you like to call your new service?"
                                value={newService.name}
                                onChange={changeServiceState} />

                        </div>
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label>Label</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control"></div>
                        <input type="text" name="label" required className="input" placeholder="What would you like to label your new service?"
                            value={newService.label}
                            onChange={changeServiceState} />
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label>Description</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <textarea type="text" name="description" required className="textarea is-right" placeholder="Briefly describe the service.  This will be loaded in a list of all services provided"
                                value={newService.description}
                                onChange={changeServiceState}>
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
                        <div className="control mt-4">
                            <div className="center">
                                {
                                    newService.image !== ""
                                        ? <>
                                            <div className="box">
                                                <figure className="service__image is-size-4"><img src={newService.image} alt="preview" /></figure>
                                                <div className="center"><h4 className="subtitle is-7">image preview</h4></div>
                                            </div>
                                        </>
                                        : <>Image Will Preview Here</>
                                }
                            </div>
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
                            <textarea type="text" name="details" required className="textarea is-right" placeholder="Describe new service in detail. This will be used on a details page when customer want to learn more about a given service."
                                value={newService.details}
                                onChange={changeServiceState} >

                            </textarea>

                        </div>
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Tools:</label>
                    <h3 className="subtitle is-7"><em>Can only be view by employees</em></h3>
                </div>
                <div className="field-body mt-2">
                    <div className="field">
                        <div className="control">
                            <label className="checkbox">
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
                            </label>
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
                            <input type="number" name="price" required className="input is-primary"
                                value={newService.price}
                                onChange={changeServiceState} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="center mt-2">
                <button type="submit"
                    className="button is-info"
                    onClick={evt => {
                        evt.preventDefault()
                        const service = {
                            name: newService.name,
                            label: newService.label,
                            image: newService.image,
                            description: newService.description,
                            details: newService.details,
                            tools: Array.from(checkedOptions),
                            price: parseFloat(newService.price)
                        }

                        // Send POST request to your API
                        createService(service)
                            .then(() => navigate("/services"))
                    }}
                >Create Service</button>
            </div>

        </form>
        <section className="hero has-background-grey-light mt-4">
            <div className="hero-foot mt-2">
                <a className="">
                    <img src="https://res.cloudinary.com/dp04hh5pz/image/upload/v1673304763/qvybu8b0ojx40deg7yd5.png" alt="Site Logo" width="112" height="28" />
                </a>

            </div>
        </section>
    </>
}