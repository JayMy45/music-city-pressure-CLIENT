import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getServices } from "../managers/ServiceManager"

export const ServiceList = () => {
    const [services, setServices] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getServices().then(data => setServices(data))
    }, [])

    return <>
        <header>
            <h1>hellow worldie</h1>

        </header>
        <article className="services">
            {
                services.map(service => {
                    return <React.Fragment key={`game--${service.id}`}>
                        <div className="columns box columns" id="service__list">
                            <section className="service column">
                                <div><h2>Welcome: Service Details Below</h2></div>
                                <div className="game__title has-text-left">Organizer: {service.id}</div>
                                <div className="game__title has-text-left">Game: {service.id}</div>
                                <div className="game__players has-text-left">Description: {service.id}</div>
                            </section>
                            <div>
                                <div className="">
                                    <button className="btn__services button is-link is-small" onClick={() => navigate(`/services/${service.id}`)}>Update</button>
                                </div>
                                <div className="mt-1">
                                    {/* <button className="btn__services button is-small is-danger" onClick={(evt) => { confirmDelete(evt, service) }}>Delete</button> */}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                })
            }
        </article>

    </>
}