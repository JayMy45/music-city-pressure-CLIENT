import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const EmployeeUpdate = ({ updateClickStatus, employee, changeEmployeeState }) => {

    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()


    return <>
        <div>
            <button className="button is-small" onClick={() => updateClickStatus(false)}>Back to {employee.full_name}</button>
        </div>
        <section className="box">
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
                <div>
                    <label>Update Salary</label>
                </div>
                <input type="text" name="salary" required autoFocus className=""
                    value={employee.salary}
                    onChange={changeEmployeeState} />
            </div>
        </section>

    </>
}