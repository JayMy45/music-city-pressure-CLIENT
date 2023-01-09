import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { createAppointment } from "../../managers/AppointmentManager";
import { getCurrentCustomer, getCustomers } from "../../managers/CustomerManager";
import { getCurrentEmployee, getEmployees } from "../../managers/EmployeeManager";
import { getServices } from "../../managers/ServiceManager"

export const AppointmentCreate = () => {

    const localMCUser = localStorage.getItem("is_staff")
    const mCPressure = JSON.parse(localMCUser)

    const mCSuperUser = localStorage.getItem("is_superuser")
    const superUser = JSON.parse(mCSuperUser)

    const navigate = useNavigate()
    const [services, setServices] = useState([])
    const [customers, setCustomers] = useState([])
    const [clickStatus, updateClickStatus] = useState(false)
    const [checkedOptions, setCheckedOptions] = useState(new Set())
    const [currentEmployee, setCurrentEmployee] = useState([])
    const [currentCustomer, setCurrentCustomer] = useState([])
    const [employees, setEmployees] = useState([])
    const [newAppointment, setNewAppointment] = useState({
        employee: [],
        customer: "",
        serviceTypeId: 0,
        requestDetails: "",
        requestDate: "",
        image: "",
        progress: 1,
        dateCompleted: ""
    })

    useEffect(() => {
        getServices()
            .then(data => { setServices(data) })
    }, [])

    useEffect(() => {
        getEmployees()
            .then(data => { setEmployees(data) })
    }, [])

    useEffect(() => {
        if (superUser || mCPressure) {
            getCurrentEmployee()
                .then(data => { setCurrentEmployee(data) })
        }
    }, [superUser, mCPressure])

    useEffect(() => {
        if (superUser || mCPressure) {
            getCustomers()
                .then(data => { setCustomers(data) })
        }
    }, [superUser, mCPressure])

    useEffect(() => {
        if (!mCPressure)
            getCurrentCustomer()
                .then(data => { setCurrentCustomer(data) })

    }, [mCPressure])

    const changeAppointmentState = (domEvent) => {
        // TODO: Complete the onChange function
        const value = domEvent.target.value
        setNewAppointment({
            ...newAppointment,
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
                    const copy = structuredClone(newAppointment)
                    copy.image = result.info.url
                    setNewAppointment(copy)
                }
            });
        widget.open()
    }

    // handles change of Checked Options
    const handleClaimChange = (e) => {
        // Call onChange function
        const copy = new Set(checkedOptions)
        if (copy.has(currentEmployee.id)) {
            copy.delete(currentEmployee.id)
        } else {
            copy.add(currentEmployee.id)
        }
        setCheckedOptions(copy)
        updateClickStatus(!clickStatus)
    }

    return <>
        <form className="mc__appointment--create box mt-5 mb-5">
            <h2 className="center title is-3">Schedule Your Appointment</h2>
            <div className="center mb-2">
                {
                    mCPressure || superUser
                        ? <h2>Welcome Back {currentEmployee.full_name}</h2>
                        : !mCPressure || !superUser
                            ? <h2>Welcome Back {currentCustomer.full_name}</h2>
                            : <></>
                }
            </div>

            {/* <div className="mb-5 mt-3 center">
                <div>
                    <h2 className="subtitle is-7">Hellow Creation Worldie</h2>
                </div>
            </div> */}

            {mCPressure ? <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label>Choose a Customer</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select name="customer" className="drop__down" onChange={changeAppointmentState} value={newAppointment.customer}>
                                    <option value={0}>Select Service Type</option>
                                    {
                                        customers.map(customer => {
                                            return <option value={`${customer.id}`} key={`customer--${customer.id}`}>{customer.full_name}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <></>}

            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label>Details about need</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <textarea type="text" name="requestDetails" required autoFocus className="textarea is-right" placeholder="Provide information about what your need."
                                value={newAppointment.requestDetails}
                                onChange={changeAppointmentState} >
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Image cloudinary widget */}
            <div className="field is-horizontal">
                <div className="field-label is-normal mt-3">
                    <button
                        onClick={(clickEvent) => showWidget(clickEvent)}
                        className="button is-primary is-small">
                        Add Image
                    </button>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control mt-4">
                            <div className="center">
                                {
                                    newAppointment.image !== ""
                                        ? <>
                                            <div className="box">
                                                <figure className="service__image is-size-4"><img src={newAppointment.image} alt="preview" /></figure>
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

            {/* Service type DropDown */}
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label>Choose a service</label>
                </div>

                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select name="serviceTypeId" className="drop__down" onChange={changeAppointmentState} value={newAppointment.serviceTypeId}>
                                    <option value={0}>Select Service Type</option>
                                    {
                                        services.map(service => {
                                            return <option value={`${service.id}`} key={`service--${service.id}`}>{service.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Request Date Calendar Input */}
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label>Request Date</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <input type="date" name="requestDate" required autoFocus className="input"
                                value={newAppointment.requestDate}
                                onChange={changeAppointmentState} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Employee or Admin/Superuser can assign or claim Appointments */}
            {
                mCPressure || superUser
                    ? <>
                        {
                            superUser
                                ? < div className="field is-horizontal">
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
                                </div>
                                : mCPressure && !superUser
                                    ? <>
                                        {!clickStatus
                                            ? <>
                                                <div>
                                                    <div>
                                                        <button className="btn__appt--claim button  is-small ml-2 mb-1" type="button" onClick={handleClaimChange}>Claim</button>
                                                    </div>
                                                    <div>
                                                        <span>Click Here to Claim This Appointment</span>
                                                    </div>
                                                </div>
                                            </>

                                            : <>
                                                <div>
                                                    <div>
                                                        <button className="btn__appt--claim button  is-small ml-2 mb-1" type="button" onClick={handleClaimChange}>undo</button>
                                                    </div>
                                                    <div>
                                                        <span>This appointment is yours <span>{`${currentEmployee?.user?.first_name}`}</span></span>
                                                    </div>
                                                </div>
                                            </>
                                        }

                                    </>
                                    : <></>
                        }
                    </>
                    : <>
                        {
                            mCPressure && !superUser
                                ? < div className="field is-horizontal">
                                    <div className="field-label is-normal mt-2">
                                        <label className="label">Employee</label>
                                        <h3 className="subtitle is-7"><em>assign yourself here</em></h3>
                                    </div>
                                    <div className="field-body mt-4 mb-5">
                                        <div className="field">
                                            <div className="control">
                                                <input className="mr-2" value={currentEmployee.id}
                                                    onChange={(e) => {
                                                        const copy = new Set(checkedOptions)
                                                        if (copy.has(currentEmployee.id)) {
                                                            copy.delete(currentEmployee.id)
                                                        } else {
                                                            copy.add(currentEmployee.id)
                                                        }
                                                        setCheckedOptions(copy)
                                                    }
                                                    } type="checkbox" />
                                                {currentEmployee.full_name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : <></>
                        }
                    </>
            }

            {/* Customer Create Appointment */}
            {!mCPressure ? <><div className="center mt-2">
                <button
                    className="button is-info"
                    type="submit"
                    onClick={evt => {
                        // Prevent form from being submitted
                        evt.preventDefault()

                        const appointment = {
                            customer: parseInt(currentCustomer.id),
                            request_details: newAppointment.requestDetails,
                            service_type: parseInt(newAppointment.serviceTypeId),
                            image: newAppointment.image,
                            scheduled: false,
                            progress: parseInt(newAppointment.progress),
                            request_date: newAppointment.requestDate,
                            completed: false,
                            consultation: false
                        }

                        // Send POST request to your API
                        createAppointment(appointment)
                            .then(() => navigate("/appointments"))
                    }}
                >Create Appointment</button>
            </div></> : <></>}

            {/* Employee can create Appointment and/or assign self */}
            {mCPressure && !superUser
                ?
                <>
                    <div className="center mt-2">
                        <button
                            className="button is-info"
                            type="submit"
                            onClick={evt => {
                                // Prevent form from being submitted
                                evt.preventDefault()

                                const appointment = {
                                    customer: parseInt(newAppointment.customer),
                                    request_details: newAppointment.requestDetails,
                                    service_type: parseInt(newAppointment.serviceTypeId),
                                    image: newAppointment.image,
                                    scheduled: false,
                                    progress: parseInt(newAppointment.progress),
                                    request_date: newAppointment.requestDate,
                                    completed: false,
                                    consultation: false,
                                };

                                if (checkedOptions) {
                                    appointment.employee = Array.from(checkedOptions);
                                }

                                // Send POST request to your API
                                createAppointment(appointment)
                                    .then(() => navigate("/appointments"))
                            }}
                        >Create Appointment</button>
                    </div>
                </>
                : <></>
            }

            {/* SuperUser create Appointment and assign employees including self */}
            {(superUser)
                ? <>
                    <div className="center mt-2">
                        <button
                            className="button is-info"
                            type="submit"
                            onClick={evt => {
                                // Prevent form from being submitted
                                evt.preventDefault()

                                const appointment = {
                                    customer: parseInt(newAppointment.customer),
                                    request_details: newAppointment.requestDetails,
                                    service_type: parseInt(newAppointment.serviceTypeId),
                                    image: newAppointment.image,
                                    scheduled: false,
                                    progress: parseInt(newAppointment.progress),
                                    request_date: newAppointment.requestDate,
                                    completed: false,
                                    consultation: false,
                                };

                                if (checkedOptions) {
                                    appointment.employee = Array.from(checkedOptions);
                                }

                                // Send POST request to your API
                                createAppointment(appointment)
                                    .then(() => navigate("/appointments"))
                            }}
                        >Create Appointment</button>
                    </div>
                </>
                : <></>}

        </form>
    </>
}