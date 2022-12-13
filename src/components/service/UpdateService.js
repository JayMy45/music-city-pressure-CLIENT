import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getServiceById } from "../../managers/ServiceManager"

export const UpdateService = () => {

    const navigate = useNavigate()
    const { serviceId } = useSearchParams()

    const [currentService, setCurrentService] = useState({

    })
    useEffect(() => {
        getServiceById(serviceId)
            .then(setCurrentService)
    })

    return <></>
}