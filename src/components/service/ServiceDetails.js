import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getServiceById } from "../../managers/ServiceManager"

export const ServiceDetails = () => {

    const { serviceId } = useParams()
    const [service, setCurrentService] = useState({
        details: "",
    })

    // function uses serviceId to set State
    const renderService = () => {
        if (serviceId) {
            getServiceById(serviceId).then((res) => {
                setCurrentService(res)
            })
        }
    }

    // whenever serviceId changes renderServe is called usually entire function contains: {renderGame()}, [gameId])
    useEffect(() => { renderService() })

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
            </div>
        </article>
    </>

}