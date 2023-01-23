import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getAppointmentById, saveEditedAppointment } from "../../managers/AppointmentManager"
import { getServices } from "../../managers/ServiceManager"

export const UpdateAppointment = () => {

    const { appointmentId } = useParams()

    const localMCUser = localStorage.getItem("is_staff")
    const mCPressure = JSON.parse(localMCUser)

    const mCSuperUser = localStorage.getItem("is_superuser")
    const superUser = JSON.parse(mCSuperUser)

    const navigate = useNavigate()

    const [services, setServices] = useState([])
    const [currentAppt, setCurrentAppt] = useState({
        service_type: 0,
        request_details: "",
        request_date: "",
        progress: 0,
        image: "",
        confirm: false,
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

    // cloudinary widget
    const showWidget = (clickEvent) => {
        clickEvent.preventDefault()
        let widget = window.cloudinary.createUploadWidget({
            cloudName: `dp04hh5pz`,
            uploadPreset: `gv9plrcj`
        },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log(result.info.url)
                    const copy = structuredClone(currentAppt)
                    copy.image = result.info.url
                    setCurrentAppt(copy)
                }
            });
        widget.open()
    }

    return <>
        <form className="mc__appointment--update box mt-5 mb-5 py-6 px-6">
            <div className="center">
                <h2 className="title is-2">UPDATE Your Appointment</h2>
            </div>

            <div>
                <h2 className="center subtitle is-6 mt-2 is-italic"><em>Current Service Selection</em><Link to={`/services/${currentAppt?.service_type?.id}`}><span className="ml-1">{currentAppt?.service_type?.name}</span></Link></h2>
            </div>

            <div className="field is-horizontal ">
                <div className="field-label is-normal">
                    <label className="">Update Request Date</label>
                </div>
                <div className="field-body mt-3">
                    <div className="field">
                        <div className="control">
                            <input type="date" name="request_date" required autoFocus className="input"
                                value={currentAppt.request_date}
                                onChange={changeAppointmentState} />
                        </div>
                    </div>
                </div>
            </div>

            {/* update employees assigned to appointments */}
            {/* <div className="field is-horizontal">
                <div className="field-label is-normal mt-2">
                    <label className="label">Employees</label>
                    <h3 className="subtitle is-7"><em>Assign Employee(s) to an Appointment</em></h3>
                </div>

                <div className="field-body mt-4 mb-5">
                    <div className="field">
                        <div className="control">
                            <label className="checkbox">
                                {employees.map(emp => (<div className="ml-2 mr-2" key={`employee--${emp.id}`}>

                                    <input className="mr-2" value={emp.id}
                                        onChange={(e) => {
                                            const copy = new Set(checkedOptions)
                                            if (copy.has(emp.id)) {
                                                copy.delete(emp.id)
                                            } else { copy.add(emp.id) }
                                            setCheckedOptions(copy)
                                        }
                                        } type="checkbox" />
                                    {emp.full_name}
                                </div>))
                                }
                            </label>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Add Image cloudinary widget */}
            <div className="field is-horizontal mb-3 mt-3">
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
                                    currentAppt.image !== ""
                                        ? <>
                                            <div className="box">
                                                <figure className="service__image is-size-4"><img src={currentAppt.image} alt="preview" /></figure>
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
                <div className="field-label is-normal ">
                    <label className="mb">Request Details</label>
                </div>
                <div className="field-body mt-3">
                    <div className="field">
                        <div className="control">
                            <textarea type="text" name="request_details" required autoFocus className="textarea is-right"
                                value={currentAppt.request_details}
                                placeholder={currentAppt.request_details}
                                onChange={changeAppointmentState} >
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>


            <div className="center mt-5">
                <div>
                    <button
                        className="button is-outlined is-dark"
                        type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const appointment = {
                                id: currentAppt.id,
                                service_type: parseInt(currentAppt.service_type.id),
                                request_details: currentAppt.request_details,
                                request_date: currentAppt.request_date,
                                progress: parseInt(currentAppt.progress.id),
                                scheduled: currentAppt.scheduled,
                                confirm: currentAppt.confirm,
                                consultation: currentAppt.consultation,
                                completed: currentAppt.completed,
                                image: currentAppt.image,
                                confirm: currentAppt.confirm
                            }

                            // Send POST request to your API
                            saveEditedAppointment(appointment)
                                .then(() => navigate("/appointments"))
                        }}
                    >Update Appointment</button>
                </div>

                <div>
                    <button className="button is-outlined is-dark ml-3" type="button" onClick={() => navigate(`/appointments`)} >Back to Appointments</button>
                </div>
            </div>

        </form>
    </>

}