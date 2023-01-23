import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteService, getServices } from "../../managers/ServiceManager"
import "./Service.css"

export const ServiceList = () => {

    const [services, setServices] = useState([])
    const navigate = useNavigate()

    const localMCUser = localStorage.getItem("is_staff")
    const mCPressure = JSON.parse(localMCUser)

    // store is_superuser value for differential display
    const mCSuperUser = localStorage.getItem("is_superuser")
    const superUser = JSON.parse(mCSuperUser)

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
        <header className="mt-5" id="navbar__space">
            <div className="mt-5">
                <h1 className="ml-5 mt-5">Services</h1>
            </div>
            <div className="ml-5 mt-3">
                <div>
                    <button className="btn__service--details is-outlined button is-small" onClick={() => { navigate({ pathname: "/appointments/create" }) }}><span className="">Schedule Appointment</span></button>
                </div>
                {
                    mCPressure
                        ? <div><button className="btn__service--details button mt-1 is-info is-default" onClick={() => { navigate({ pathname: "/services/create" }) }}><span className="">Create New Service</span></button></div>
                        : <></>
                }
            </div>
        </header>
        <article className="">
            {
                services.map(service => {
                    return <React.Fragment key={`service--${service.id}`}>
                        <div className="columns box mt-2" id="service__list--details" >
                            <section className="service column">
                                <div><h2><Link to={`/services/${service.id}`}>{service.name}</Link></h2></div>
                                <div className="service__description has-text-left" style={{ textAlign: 'justify' }}><em>Brief Description: </em>{service.description}</div>
                            </section>
                            <div className="">
                                {
                                    mCPressure
                                        ? <>
                                            <button className="button is-uppercase is-small" onClick={() => navigate(`/services/update/${service.id}`)}>Update</button>
                                            <button className="button is-uppercase is-small is-danger" onClick={(evt) => confirmDelete(evt, service)}>Delete</button>
                                        </>
                                        : <></>
                                }
                                <div className="">
                                    <h3 className="mt-5 is-italic">Price Starting at ${service.price}</h3>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                })
            }
        </article>
        <section className="hero has-background-grey-light mt-4">
            <div className="hero-foot mt-2">
                <a className="">
                    <img src="https://res.cloudinary.com/dp04hh5pz/image/upload/v1673304763/qvybu8b0ojx40deg7yd5.png" alt="Site Logo" width="112" height="28" />
                </a>

            </div>
        </section>
    </>
}