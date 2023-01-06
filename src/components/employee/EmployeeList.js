import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getEmployees } from "../../managers/EmployeeManager"
import { Employee } from "./Employee"
import "./Employee.css"

export const EmployeeList = () => {

    const [employees, setEmployees] = useState([])

    const localMCUser = localStorage.getItem("is_staff")
    const mCPressure = JSON.parse(localMCUser)

    const mCSuperUser = localStorage.getItem("is_superuser")
    const superUser = JSON.parse(mCSuperUser)

    useEffect(() => {
        getEmployees()
            .then(setEmployees)
    }, [])



    return <>
        <div className="mb-3 ml-5">
            {
                mCPressure || superUser
                    ? <h1>Employees</h1>
                    : <h1>Technicians</h1>
            }
        </div>
        <div className="mt-5">
            {

                employees.map(emp => <Employee key={`employee--${emp.id}`}
                    emp={emp}
                    mCPressure={mCPressure}
                    superUser={superUser}
                />)
            }
        </div>
    </>
}
