
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getEmployeeById } from "../../managers/EmployeeManager"
import "./Employee.css"
import { EmployeeUpdate } from "./EmployeeUpdate"
import { EmpUpdate } from "./EmpUpdate"

export const Employee = ({ emp, superUser }) => {

    const { employeeId } = useParams()
    const [clickStatus, updateClickStatus] = useState(false)
    const [specialty, setSpecialty] = useState()
    const [employee, setEmployee] = useState({
        address: "",
        bio: "",
        phone_number: "",
        salary: "",
        specialty: []
    })

    const renderEmployee = () => {
        if (employeeId) {
            getEmployeeById(employeeId).then((res) => {
                setEmployee(res)
            })
        }
    }

    useEffect(() => {
        renderEmployee()
    }, [employeeId])

    const changeEmployeeState = (domEvent) => {
        // TODO: Complete the onChange function
        const value = domEvent.target.value
        setEmployee({
            ...employee,
            [domEvent.target.name]: value
        })
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    const formattedValue = formatter.format(emp.salary);

    const defaultDisplay = () => {
        return <>
            <div className="is-4-desktop">
                <section className="employee__list box mb-3">
                    <div className="columns">
                        <div className="column is-8 center">
                            <div className="">
                                <header className="center__left mb-2">
                                    <h2 className="title"><Link to={`/employees/${emp.id}`} >{emp.full_name}</Link></h2>
                                </header>
                                <div className="">
                                    <p>Address: {emp.address}</p>
                                    <p>Phone: {emp.phone_number}</p>
                                    <p>Email: {emp.user.email}</p>
                                    {
                                        superUser
                                            ? <><p>Current Salary: {formattedValue}</p></>
                                            : <></>
                                    }
                                    <div>
                                        <button onClick={() => updateClickStatus(true)}>Update</button>

                                    </div>
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
                                            <button onClick={() => { }}>Remove</button>
                                        </>
                                        : <></>
                                }
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </>
    }
    return <main>
        {
            clickStatus
                ? <EmpUpdate
                    currentEmployee={emp}
                    employee={employee}
                    superUser={superUser}
                    updateClickStatus={updateClickStatus}
                    changeEmployeeState={changeEmployeeState}
                    formattedValue={formattedValue}
                />
                : defaultDisplay()
        }
    </main>
}