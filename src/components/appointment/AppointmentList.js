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
            <h1 className="is-title mb-2">Appointments</h1>
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
                                <div className="appointment__request is-4-tablet is-3-desktop mb-6">
                                    <div className="card">

                                        {
                                            customers.map(customer => {
                                                return <div className="card-content" key={`customer--${customer.id}`}>
                                                    <div className="card-image has-text-centered px-7 mb-3">
                                                        <figure className="image is-5by4">
                                                            <img src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCDeAQKGIjC916XeJAnv7JuDFj6GHoduUGKAZoFVVWJ4IkzHj0nRNvcdt_PjZ1tReaksMyOORmIwZwA_hBJr72xq9QP3Je&usqp=CAE" alt="" />
                                                        </figure>
                                                    </div>
                                                    <div className="media">
                                                        <div className="media-content mr-3 mt-5" >
                                                            <p className=""><strong>Service:</strong> <Link to={`/appointments/${appointment.id}`}>{appointment.service_type.name}</Link></p>
                                                            <div className="paragraph">
                                                                <p><strong>Details:</strong> {appointment.request_details}</p>
                                                            </div>
                                                            <p><strong>Address:</strong> {customer.address}</p>
                                                            <footer className="mb-3 mt-2"><em>Request Date:</em> {appointment.request_date}</footer>
                                                        </div>
                                                        <div className="media-left ml-3 mt-5">
                                                            <div>
                                                                <button className="button  mb-1" onClick={() => navigate(`/appointments/update/${appointment.id}`)}>
                                                                    <span className="icon">
                                                                        <ion-icon name="repeat-outline"></ion-icon>
                                                                    </span>
                                                                    <span>Update</span>
                                                                </button>
                                                            </div>
                                                            <div className="appt__progress">
                                                                <h4>Progress</h4>
                                                            </div>

                                                            <div>
                                                                <button className="button is-inverted is-black is-large ml-5" onClick={(evt) => confirmDelete(evt, appointment)}>
                                                                    <span className="icon">
                                                                        <ion-icon name="trash-outline"></ion-icon>
                                                                    </span>
                                                                </button>
                                                            </div>
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