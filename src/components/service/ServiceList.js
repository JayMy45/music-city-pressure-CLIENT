import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getServices } from "../../managers/ServiceManager"
import "./Service.css"

export const ServiceList = () => {
    const [services, setServices] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getServices().then(data => setServices(data))
    }, [])

    return <>
        <header>
            <h1>Services</h1>
            <button className="" onClick={() => { navigate({ pathname: "/appointments/create" }) }}><span className="">Schedule Appointment</span></button>
        </header>
        <article className="">
            {
                services.map(service => {
                    return <React.Fragment key={`service--${service.id}`}>
                        <div className="columns box mt-2" id="service__list--details" >
                            <section className="service column">
                                <div><h2><Link to={`/services/${service.id}`}>{service.name}</Link></h2></div>
                                <div className="service__description has-text-left">Description: {service.description}</div>
                            </section>
                            {/* <div>
                                <div className="">
                                    <button className="btn__services button is-link is-small" onClick={() => navigate(`/services/${service.id}`)}>Update</button>
                                </div>
                                <div className="mt-1">
                                    <button className="btn__services button is-small is-danger" onClick={(evt) => { confirmDelete(evt, service) }}>Delete</button>
                                </div>
                            </div> */}
                        </div>
                    </React.Fragment>
                })
            }
        </article>

    </>
}