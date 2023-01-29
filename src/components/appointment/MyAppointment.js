import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAppointmentByEmployeeId } from "../../managers/AppointmentManager"

export const MyAppointment = () => {

    const { employeeId } = useParams()
    const [myAppointments, setMyAppointments] = useState([])

    const renderAppointmentByEmpId = useCallback(() => {
        if (employeeId) {
            getAppointmentByEmployeeId(employeeId).then((res) => {
                setMyAppointments(res)
            })
        }
    }, [employeeId])

    useEffect(() => {
        renderAppointmentByEmpId()
    }, [renderAppointmentByEmpId])

    return <></>
}