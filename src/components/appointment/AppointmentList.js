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
        <header>
            <h1>Appointments</h1>
            <h3>{appointments.id}</h3>
            <button className="" onClick={() => { navigate({ pathname: "/appointments/create" }) }}><span className="">Schedule Appointment</span></button>
        </header>
        <article className="appointments">
            {
                customers.map(customer => {
                    return <h3 key={`customer--${customer.id}`}>Welcome back {customer.full_name}</h3>
                })
            }

            {
                appointments.map(appointment => {
                    return <React.Fragment key={`appointment--${appointment.id}`}>
                        <div className="" id="appointment__list" >
                            <section className="appointment__request">
                                <div></div>
                                {
                                    customers.map(customer => {
                                        return <header key={`customer--${customer.id}`}>
                                            <div>Service: <Link to={`/appointments/${appointment.id}`}>{appointment.service_type.name}</Link></div>
                                            <div>Details: {appointment.request_details}</div>
                                            <div>Address: {customer.address}</div>
                                        </header>
                                    })
                                }
                                <div><footer>Request Date: {appointment.request_date}</footer></div>
                                <div>
                                    <button onClick={() => navigate(`/appointments/update/${appointment.id}`)}>Update Appointment</button>
                                    <button onClick={(evt) => confirmDelete(evt, appointment)}>Delete</button>
                                </div>
                            </section>
                            {/* <div>
                                <div className="">
                                    <button className="btn__appointments button is-link is-small" onClick={() => navigate(`/appointments/${appointment.id}`)}>Update</button>
                                </div>
                                <div className="mt-1">
                                    <button className="btn__appointments button is-small is-danger" onClick={(evt) => { confirmDelete(evt, appointment) }}>Delete</button>
                                </div>
                            </div> */}
                        </div>
                    </React.Fragment>
                })
            }
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