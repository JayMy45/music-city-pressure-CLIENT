
import { Link } from "react-router-dom"
import { deleteEmployee } from "../../managers/EmployeeManager"
import { Appointment } from "../appointment/Appointment"
import "./Employee.css"

export const Employee = ({ emp, superUser, mCPressure, fetchEmployees }) => {

    //  handles confirmation of deletion via a popup
    const confirmDelete = (evt, employee) => {
        // whenever confirmed by clicking OK/Cancel window.confirm() returns boolean 
        let text = 'Are you sure you want to delete'
        window.confirm(text)
            ? deleteEmployee(employee.id)
                .then(fetchEmployees)
            : <></>
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    const formattedValue = formatter.format(emp.salary);


    return <>

        <div className="is-4-desktop">
            <section className="employee__list box mb-3">
                <div className="columns">
                    <div className="column is-8 center">
                        <div className="">
                            <header className="center__left mb-2">
                                <div>
                                    <h2 className="title">
                                        <Link to={`/employees/${emp.id}`} >{emp.full_name}</Link>
                                    </h2>
                                </div>
                                <div>
                                    {superUser
                                        ? <>
                                            {
                                                emp.user.is_superuser
                                                    ? <div>
                                                        <h3 className="has-text-danger">*</h3>
                                                    </div>
                                                    : <></>
                                            }
                                        </>
                                        : <></>
                                    }
                                </div>
                            </header>
                            <div className="">
                                {superUser ? <p>Address: {emp.address}</p> : <></>}

                                <p>Phone: {emp.phone_number}</p>
                                <p>Email: {emp.user.email}</p>
                                {
                                    superUser
                                        ? <><p>Current Salary: {formattedValue}</p></>
                                        : <></>
                                }

                            </div>
                        </div>

                    </div>
                    <div className="employee__specialty--delete-btn column">
                        <div>
                            <h2 className="center is-size-7"><strong><u>Specialties</u></strong></h2>
                            {
                                emp.specialty.map(special => {
                                    return <div key={`specialty--${special.id}`}>
                                        <p className="center is-size-7">{special.label}</p>
                                    </div>
                                })
                            }
                        </div>
                        <div className="center is-flex">
                            {
                                superUser
                                    ? <>
                                        <div>
                                            <button onClick={(evt) => confirmDelete(evt, emp)}>Remove</button>
                                        </div>
                                    </>
                                    : <></>
                            }
                        </div>
                    </div>
                </div>

            </section>
        </div >
    </>

}