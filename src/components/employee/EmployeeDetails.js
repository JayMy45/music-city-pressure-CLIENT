import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteEmployee, getEmployeeById, getEmployees } from "../../managers/EmployeeManager"
import { EmployeeUpdate } from "./EmployeeUpdate"
import "./Employee.css"

export const EmployeeDetails = () => {

    const { employeeId } = useParams()
    const [clickStatus, updateClickStatus] = useState(false)
    const [employee, setEmployee] = useState({
        address: "",
        bio: "",
        phone_number: "",
        salary: "",
        specialty: []
    })

    const navigate = useNavigate()

    const mCSuperUser = localStorage.getItem("is_superuser")
    const superUser = JSON.parse(mCSuperUser)

    const localMCUser = localStorage.getItem("is_staff")
    const mCPressure = JSON.parse(mCSuperUser)

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    const formattedValue = formatter.format(employee.salary);

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




    const defaultDisplay = () => {
        return <>
            <div>
                <h1 className=" ml-5 mt-3">Employee Details</h1>
            </div>
            <div className="mt-5 mb-5 ml-5 ">
                {mCPressure || superUser
                    ? <button className="button is-small is-rounded is-dark ml-5" onClick={() => navigate(`/employees`)}>Back to Employees</button>
                    : <button className="button is-small is-rounded is-dark ml-5" onClick={() => navigate(`/appointments`)}>Back to Appointments</button>}
            </div>
            <div className="mc__employee center">
                <section className="mc__employee--details box is-centered mb-2 columns">
                    <div className="mr-3 column center is-8">
                        <div className="">
                            <header className="center__left mb-4">
                                <h1 className="">{employee.full_name}</h1>
                            </header>
                            <figure>
                                <img src={employee.image} alt={`${employee.first_name}'s image`} />
                            </figure>
                            <div>
                                {
                                    mCPressure || superUser
                                        ? <>
                                            <p>Address: {employee.address}</p>
                                            <p>Phone: {employee.phone_number}</p>
                                        </>
                                        : <>
                                            <p>Bio: {employee.bio}</p>
                                        </>
                                }
                                {
                                    superUser
                                        ? <><p>Current Salary: {formattedValue}</p></>
                                        : <></>
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="column">
                            {
                                mCPressure || superUser
                                    ? <div className="mb-4">
                                        <button onClick={() => updateClickStatus(true)} className="center button btn__employee-details is-small mb-2">Update</button>
                                        {
                                            superUser
                                                ? <>
                                                    <button className="center button btn__employee-details is-small" onClick={() => { }}>Delete</button></>
                                                : <></>
                                        }
                                    </div>
                                    : <></>
                            }
                            <div>
                                <h2 className="center is-size-4"><strong><u>Specialties</u></strong></h2>
                                {
                                    employee.specialty.map(special => {
                                        return <div key={`specialty--${special.id}`}>
                                            <p className="center">{special.label}</p>
                                        </div>
                                    })
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
                ? <EmployeeUpdate
                    employee={employee}
                    updateClickStatus={updateClickStatus}
                    changeEmployeeState={changeEmployeeState}
                    superUser={superUser}
                    formattedValue={formattedValue}
                />
                : defaultDisplay()
        }
    </main>
}