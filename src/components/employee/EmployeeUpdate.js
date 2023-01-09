import { useNavigate } from "react-router-dom"
import "./Employee.css"


export const EmployeeUpdate = ({ updateClickStatus, employee, changeEmployeeState, superUser, formattedValue }) => {

    const navigate = useNavigate()

    return <>
        <form className="mc__employee--update box mt-5 mb-5 px-6 py-6">

            <div className="center">
                <h2 className="title is-2 mb-3">Update Employee</h2>
            </div>

            <div className="field is-horizontal mt-3">
                <div className="field-label is-normal mt-3">
                    <label className="">Address: </label>
                </div>
                <div className="field-body mt-3">
                    <div className="field">
                        <div className="control">
                            <input type="text" name="address" required autoFocus className="input is-primary"
                                value={employee.address}
                                onChange={changeEmployeeState} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="field is-horizontal ">
                <div className="field-label is-normal mt-3">
                    <label>Update Bio</label>
                </div>
                <div className="field-body mt-3">
                    <div className="field">
                        <div className="control">
                            <textarea type="text" name="bio" required autoFocus className="textarea is-right is-link"
                                value={employee.bio}
                                onChange={changeEmployeeState}>
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>


            <div className="field is-horizontal ">
                <div className="field-label is-normal mt-3">
                    <label>Phone #:</label>
                </div>
                <div className="field-body mt-3">
                    <div className="field">
                        <div className="control">
                            <input type="text" name="phone_number" required autoFocus className="input is-primary"
                                value={employee.phone_number}
                                onChange={changeEmployeeState} />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {
                    superUser
                        ? <>
                            <div className="field is-horizontal mt-2">
                                <div className="field-label is-normal mt-3">
                                    <label>Salary</label>
                                </div>
                                <div className="field-body mt-3">
                                    <div className="field">
                                        <div className="control">
                                            <input type="number" name="salary" required autoFocus className="input is-primary"
                                                value={employee.salary}
                                                onChange={changeEmployeeState} />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                        : <></>
                }
            </div>
            <div className="center mt-5">
                <button className="button btn__employee--update is-small mt-2 is-dark mr-2" onClick={() => updateClickStatus(false)}>Update {employee.full_name} Info</button>
                <button className="button btn__employee--update is-small mt-2 is-outlined is-dark" onClick={() => navigate(`/employees`)}>Back to Employees</button>
                {
                    employee.specialty.label
                }
            </div>
        </form >
    </>
}