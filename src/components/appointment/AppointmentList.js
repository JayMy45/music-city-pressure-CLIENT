import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteAppointment, getAppointments, saveEditedAppointment } from "../../managers/AppointmentManager"
import { getCustomers } from "../../managers/CustomerManager"
import { getProgressions } from "../../managers/ProgressManager"
import "./Appointment.css"

export const AppointmentList = () => {
    const [appointments, setAppointments] = useState([])
    const [progression, setProgression] = useState([])
    const [customers, setCustomer] = useState([])
    const navigate = useNavigate()

    const [currentAppointment, setCurrentAppointment] = useState({
        progress: 0
    })


    // store is_staff value for differential display
    const localMCUser = localStorage.getItem("is_staff")
    const mCPressure = JSON.parse(localMCUser)

    useEffect(() => {
        getAppointments().then(data => setAppointments(data))
    }, [])

    useEffect(() => {
        getProgressions().then(data => setProgression(data))
    }, [])

    useEffect(() => {
        getCustomers().then(setCustomer)
    }, [])

    useEffect(() => {
        getCustomers().then(setCustomer)
    }, [])

    const changeProgressState = (domEvent) => {
        // TODO: Complete the onChange function
        const value = domEvent.target.value
        setCurrentAppointment({
            ...currentAppointment,
            [domEvent.target.name]: value
        })
    }

    //  handles confirmation of deletion via a popup
    const confirmDelete = (evt, appointment) => {
        // whenever confirmed by clicking OK/Cancel window.confirm() returns boolean 
        let text = 'Are you sure you want to delete'
        window.confirm(text)
            ? deleteAppointment(appointment.id)
                .then(() => getAppointments()
                    .then(data => setAppointments(data)))
            : <></>
    }
    // 'id', 'service_type','completed', 'consultation', 'request_details',
    return <>
        <section>
            <h1 className="is-title mb-2">Appointments</h1>
            <button className="button is-info is-default" onClick={() => { navigate({ pathname: "/appointments/create" }) }}><span className="">Schedule Appointment</span></button>
        </section>
        <article className="appointments">
            <section className="mt-5">
                {
                    mCPressure
                        ? <></>
                        : <> {
                            customers.map(customer => {
                                return <h3 key={`customer--${customer.id}`}>Welcome back {customer.full_name}</h3>
                            })
                        }
                        </>
                }
            </section>
            <section className="">
                <div className="columns is-multiline mt-5 is-3 is-variable is-centered">
                    {
                        appointments.map(appointment => {
                            return <React.Fragment key={`appointment--${appointment.id}`}>
                                <div className="appointment__request is-4-tablet is-4-desktop mx-1 column">
                                    <div className="card ">
                                        {
                                            mCPressure
                                                ? <div className="pt-1 pl-1"><div className="mt-1 ml-1"><header><em>Customer Name:</em> {appointment.customer.full_name}</header></div></div>
                                                : <></>
                                        }
                                        <div className="card-image has-text-centered pt-2">
                                            <figure className="image is-4by3">
                                                <img src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCDeAQKGIjC916XeJAnv7JuDFj6GHoduUGKAZoFVVWJ4IkzHj0nRNvcdt_PjZ1tReaksMyOORmIwZwA_hBJr72xq9QP3Je&usqp=CAE" alt="" />
                                            </figure>
                                        </div>
                                        <div className="card-content pb-1">
                                            <section className="is-centered media columns py-2">
                                                <div className="media-left column mr-2 ml-5">
                                                    <div>
                                                        <button className="btn__appt-list button is-small " onClick={() => navigate(`/appointments/update/${appointment.id}`)}>
                                                            <span className="icon">
                                                                <i className="fa-solid fa-wrench"></i>
                                                            </span>
                                                            <span>Update</span>
                                                        </button>
                                                    </div>
                                                    <div className="mt-1">
                                                        <button className="btn__appt-list button is-small" onClick={(evt) => confirmDelete(evt, appointment)}>
                                                            <span className="icon">
                                                                <i className="fa-regular fa-trash-can"></i>
                                                            </span>
                                                            <span>Delete</span>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="notification column mr-5 ml-1 mt-3 ">
                                                    {
                                                        mCPressure
                                                            ? <>
                                                                <div>
                                                                    <div className="is-size-8">Current Progress:</div>
                                                                    <div><strong className="is-capitalized">{appointment.progress.label}</strong></div>
                                                                    <select name="progress" className="drop__down" onChange={changeProgressState} value={currentAppointment.progress.label}>
                                                                        <option value={0}>Update Progress</option>
                                                                        {
                                                                            progression.map(progress => {
                                                                                return <option value={`${progress.id}`} className="center__text" key={`progress--${progress.id}`}>{progress.label}</option>

                                                                            })
                                                                        }
                                                                    </select>
                                                                    <button className="is-small is-warning" onClick={evt => {
                                                                        // Prevent form from being submitted
                                                                        evt.preventDefault()

                                                                        const progressionChange = {
                                                                            id: appointment.id,
                                                                            service_type: appointment.service_type.id,
                                                                            progress: currentAppointment.progress,
                                                                            request_date: appointment.request_date,
                                                                            consultation: appointment.consultation,
                                                                            request_details: appointment.request_details,
                                                                            completed: appointment.completed
                                                                        }

                                                                        // Send POST request to your API
                                                                        saveEditedAppointment(progressionChange)
                                                                            .then(() => getAppointments()
                                                                                .then(data => setAppointments(data)))
                                                                    }}>confirm</button>
                                                                </div>

                                                            </>
                                                            : <>
                                                                <div className="appt__media--width appt__progress grid">
                                                                    {
                                                                        appointment.progress.id === 1 || appointment.progress.id === 2
                                                                            ? <span className="mb-3">Progress</span>
                                                                            : <span className="is-capitalized mb-3 is-size-8">{appointment.progress.label}</span>

                                                                    }
                                                                </div>
                                                                <div>
                                                                    {
                                                                        appointment.progress.id !== 1
                                                                            ? <progress className={`${appointment.progress.class_name}`} value={`${appointment.progress.percent}`} max="100"></progress>
                                                                            : <></>
                                                                    }
                                                                </div>
                                                            </>
                                                    }
                                                </div>
                                            </section>
                                            <section className="">
                                                <p className=""><strong>Service:</strong> <Link to={`/appointments/${appointment.id}`}>{appointment.service_type.name}</Link></p>
                                                <div className="paragraph">
                                                    <p><strong>Details:</strong></p>
                                                    <p>{appointment.request_details}</p>
                                                </div>
                                                <p><strong>Address:</strong> {appointment.customer.address}</p>
                                                <footer className="card-footer py-2 mt-2 has-text-grey item">

                                                    <div className="center"><em>Request Date:</em><span className="ml-2">{appointment.request_date}</span></div>

                                                    {
                                                        mCPressure
                                                            ? <div>
                                                                <div>
                                                                    <button className="btn__appt-list button is-small is-black">
                                                                        <span><i class="fa-regular fa-calendar-days"></i></span>
                                                                        <span className="appt__font ml-2">Schedule</span>
                                                                    </button>
                                                                </div>
                                                                <input type="date" name="request_date" required autoFocus className="center__text" />
                                                            </div>
                                                            : <></>
                                                    }
                                                </footer>
                                            </section>
                                        </div>


                                    </div>
                                </div>

                            </React.Fragment>
                        })
                    }
                </div>
            </section>
        </article >
    </>
}