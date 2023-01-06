import { useEffect } from "react"
import { getEmployeeId } from "../../managers/EmployeeManager"
import "./Employee.css"

export const EmpUpdate = ({ updateClickStatus, employee, changeEmployeeState, superUser, currentEmployee, formattedValue }) => {

    useEffect(() => {
        // Fetch employee information from the server using the employeeId
        // For example: 
        getEmployeeId(currentEmployee)
            .then(response => response.json())
            .then(employeeData => {
                // Update the employee state with the new data
                changeEmployeeState(employeeData)
            })
    }, [currentEmployee, changeEmployeeState])
    //    getEmployeeById(employeeId)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error(`Error ${response.status}: ${response.statusText}`)
    //     }
    //     return response.json()
    //   })
    //   .then(employeeData => {
    //     // Update the employee state with the new data
    //     changeEmployeeState(employeeData)
    //   })
    //   .catch(error => {
    //     console.error(error)
    //   })

    return <>

        <section className="employee__update mb-3 box">
            <div className=" columns">
                <div className="column">
                    <div>
                        <div>
                            <label>Date Services Needed</label>
                        </div>
                        <input type="text" name="address" required autoFocus className=""
                            value={employee.address}
                            onChange={changeEmployeeState} />
                    </div>
                    <div>
                        <div>
                            <label>Update Bio</label>
                        </div>
                        <input type="text" name="bio" required autoFocus className=""
                            value={employee.bio}
                            onChange={changeEmployeeState} />
                    </div>
                    <div>
                        <div>
                            <label>Date Services Needed</label>
                        </div>
                        <input type="text" name="phone_number" required autoFocus className=""
                            value={employee.phone_number}
                            onChange={changeEmployeeState} />
                    </div>
                    <div>
                        {
                            superUser
                                ? <>
                                    <div>
                                        <label>Update Salary</label>
                                    </div>
                                    <span>$</span><input type="number" name="salary" required autoFocus className=""
                                        value={employee.salary}
                                        onChange={changeEmployeeState} />
                                </>
                                : <></>
                        }
                    </div>
                </div>
                <div className="column">
                    <button className="button is-small" onClick={() => updateClickStatus(false)}>Back to {employee.full_name}</button>
                    {
                        employee.specialty.label
                    }
                </div>
            </div>
        </section>

    </>
}