import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteService, getServices } from "../../managers/ServiceManager"
import "./Service.css"

export const ServiceList = () => {

    const [services, setServices] = useState([])
    const navigate = useNavigate()

    const localMCUser = localStorage.getItem("is_staff")
    const mCPressure = JSON.parse(localMCUser)

    useEffect(() => {
        getServices().then(data => setServices(data))
    }, [])

    const confirmDelete = (evt, service) => {
        // whenever confirmed by clicking OK/Cancel window.confirm() returns boolean 
        let text = 'Are you sure you want to delete'
        window.confirm(text)
            ? deleteService(service.id)
                .then(() => getServices()
                    .then(data => setServices(data)))
            : <></>
    }

    return <>
        <header>
            <h1>Services</h1>
            <div><button className="" onClick={() => { navigate({ pathname: "/appointments/create" }) }}><span className="">Schedule Appointment</span></button></div>
            <div><button className="" onClick={() => { navigate({ pathname: "/services/create" }) }}><span className="">Create Service</span></button></div>
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
                            {
                                mCPressure
                                    ? <>
                                        <button className="button is-uppercase is-small" onClick={() => navigate(`/services/update/${service.id}`)}>Update</button>
                                        <button className="button is-uppercase is-small is-danger" onClick={(evt) => confirmDelete(evt, service)}>Delete</button>
                                    </>
                                    : <></>
                            }
                        </div>
                    </React.Fragment>
                })
            }
        </article>

    </>
}