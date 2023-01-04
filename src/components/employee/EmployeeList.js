import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getEmployees } from "../../managers/EmployeeManager"
import { Employee } from "./Employee"
import "./Employee.css"

export const EmployeeList = () => {

    const [employees, setEmployees] = useState([])

    const mCSuperUser = localStorage.getItem("is_superuser")
    const superUser = JSON.parse(mCSuperUser)

    useEffect(() => {
        getEmployees()
            .then(setEmployees)
    }, [])



    return <>
        <button>Button</button>
        <div><h1>Employees</h1></div>
        <div>
            {
                employees.map(emp => <Employee key={`employee--${emp.id}`}
                    emp={emp}
                    superUser={superUser}
                />)
            }
        </div>
    </>
}
