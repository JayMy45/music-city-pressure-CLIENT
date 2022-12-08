import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
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
        <article>
            <h1 className="">{service.name}</h1>
            <div className="">
                <div className="">
                    <section className="">
                        <div><h2><span className="">More About: </span></h2></div>
                        <div>{service.details}</div>
                    </section>
                </div>
                <div>
                    <button onClick={() => navigate("/services")}>Back To Services</button>
                </div>
            </div>
        </article>
    </>

}