import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteAppointment, getAppointments } from "../../managers/AppointmentManager"
import { getCustomers } from "../../managers/CustomerManager"
import "./Appointment.css"

export const AppointmentList = () => {
    const [appointments, setAppointments] = useState([])
    const [customers, setCustomer] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAppointments().then(data => setAppointments(data))
    }, [])

    useEffect(() => {
        getCustomers().then(setCustomer)
    }, [])

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
            <h1 className="is-title mb-3">Appointments</h1>
            <button className="button is-info is-default" onClick={() => { navigate({ pathname: "/appointments/create" }) }}><span className="">Schedule Appointment</span></button>
        </section>
        <article className="appointments">
            <section className="mt-5">
                {
                    customers.map(customer => {
                        return <h3 key={`customer--${customer.id}`}>Welcome back {customer.full_name}</h3>
                    })
                }
            </section>
            <section className="">
                <div className="columns mt-5 is-3 is-variable is-centered">
                    {
                        appointments.map(appointment => {
                            return <React.Fragment key={`appointment--${appointment.id}`}>
                                <div className="appointment__request is-4-tablet is-3-desktop">
                                    <div className="card">
                                        <div className="card-image has-text-centered px-6">
                                            <img src="" alt="" />
                                        </div>
                                        {
                                            customers.map(customer => {
                                                return <div className="card-content " key={`customer--${customer.id}`}>
                                                    <div className="media">
                                                        <div className="media-content mr-2">
                                                            <p className="">Service: <Link to={`/appointments/${appointment.id}`}>{appointment.service_type.name}</Link></p>
                                                            <p>Details: {appointment.request_details}</p>
                                                            <p>Address: {customer.address}</p>
                                                            <p className="mb-3">Request Date: {appointment.request_date}</p>
                                                        </div>
                                                        <div className="media-left ml-3">
                                                            <button className="button btn__appt-list mb-3 is-inverted is-black is-small column" onClick={() => navigate(`/appointments/update/${appointment.id}`)}>Update</button>
                                                            <button className="button btn__appt-list is-inverted is-black is-large" onClick={(evt) => confirmDelete(evt, appointment)}>
                                                                <span className="icon">
                                                                    <ion-icon name="trash-outline"></ion-icon>
                                                                </span>
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>

                            </React.Fragment>
                        })
                    }
                </div>
            </section>
        </article>

        {/* a way to distinguish if a persons a staff member  (???)
        {
            customers.map((c => {
                return <>
                    {c.user.is_staff
                        ? <h2>and you know this</h2>
                        : <h2>man</h2>}
                </>
            }))
        } */}

    </>
}