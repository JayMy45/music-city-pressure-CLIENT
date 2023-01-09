import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getServiceById } from "../../managers/ServiceManager"

export const ServiceDetails = () => {

    const { serviceId } = useParams()
    const [service, setCurrentService] = useState({
        details: "",
    })
    const navigate = useNavigate()

    // function uses serviceId to set State
    useEffect(() => {
        getServiceById(serviceId).then(data => setCurrentService(data))
    }, [serviceId])



    // whenever serviceId changes renderServe is called usually entire function contains: {renderGame()}, [gameId])

    return <>
        <article className="box mc__service--details mt-5 mb-5">
            <div>
                <h1 className="title is-1 center">{service.name}</h1>
                <div className="subtitle is-4 center">
                    <h2><span className="">Service Details </span></h2>
                </div>
                <div className="columns">
                    <div className="column">

                        <figure className="image is-square">
                            <img className="" src={service.image} alt="" />
                        </figure>

                    </div>
                    <div className="mt-4 column">
                        <div>
                            {service.details}
                        </div>
                    </div>
                </div>
                <div>

                    <div>
                        <p>Starting at ${service.price}</p>
                        <p>Make an appointment today. A <Link to={`/employees`}>technician</Link> will call about a consultation</p>

                    </div>
                    <div>
                        <button className="button mt-3 center is-info" onClick={() => navigate("/services")}>Back To Services</button>
                    </div>
                </div>
            </div>
        </article>
    </>

}