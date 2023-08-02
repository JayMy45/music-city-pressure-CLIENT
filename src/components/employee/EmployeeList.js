import { useEffect, useState } from "react"
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

    const fetchEmployees = () => {
        getEmployees()
            .then(data => setEmployees(data))
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    return <>
        <div id="navbar__space">
            {
                mCPressure || superUser
                    ? <>
                        <h1 className="title mb-3 ml-5 mt-3">Employees</h1>

                        {
                            superUser
                                ? <h4 className="ml-5 is-size-7 is-italic"><span className="has-text-danger">*</span> denotes supervisor</h4>
                                : <></>
                        }
                    </>
                    : <h1 className="mb-3 ml-5 mt-3">Technicians</h1>
            }
        </div>

        <div className="mt-5">
            {
                //sort employees by full_name before sending information as props
                employees.sort((a, b) => {
                    if (a.full_name < b.full_name) return -1;
                    if (a.full_name > b.full_name) return 1;
                    return 0;
                }).map(emp => <Employee key={`employee--${emp.id}`}
                    emp={emp}
                    mCPressure={mCPressure}
                    superUser={superUser}
                    fetchEmployees={fetchEmployees}
                />)
            }
        </div>

    </>
}
