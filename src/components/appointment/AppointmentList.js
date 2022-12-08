import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAppointments } from "../../managers/AppointmentManager"

export const AppointmentList = () => {
    const [appointments, setAppointments] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAppointments().then(data => setAppointments(data))
    }, [])
    // 'id', 'service_type','completed', 'consultation', 'request_details',
    return <>
        <header>
            <h1>Appointments</h1>
            <button className="" onClick={() => { navigate({ pathname: "/appointments/create" }) }}><span className="">Schedule Appointment</span></button>
        </header>
        <article className="appointments">
            {
                appointments.map(appointment => {
                    return <React.Fragment key={`appointment--${appointment.id}`}>
                        <div className="columns box columns" id="appointment__list" >
                            <section className="appointment column">
                                <div><h2><Link to={`/appointments/${appointment.id}`}>{appointment.service_type.name}</Link></h2></div>
                                <div className="appointment__description has-text-left"><span><strong>Description: </strong><em>{appointment.service_type.description}</em></span></div>
                                <div><footer>{appointment.request_date}</footer></div>
                            </section>
                            <div>
                                <button onClick={() => navigate(`/appointments/update/${appointment.id}`)}>Update Appointment</button>
                            </div>
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

    </>
}