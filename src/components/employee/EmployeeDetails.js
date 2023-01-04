import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getEmployeeById } from "../../managers/EmployeeManager"
import { EmployeeUpdate } from "./EmployeeUpdate"
import "./Employee.css"

export const EmployeeDetails = () => {

    const { employeeId } = useParams()
    const [clickStatus, updateClickStatus] = useState(false)
    const [employee, setEmployee] = useState({
        address: "",
        bio: "",
        phone_number: "",
        salary: ""
    })

    const navigate = useNavigate()

    const mCSuperUser = localStorage.getItem("is_superuser")
    const superUser = JSON.parse(mCSuperUser)

    const renderEmployee = () => {
        if (employeeId) {
            getEmployeeById(employeeId).then((res) => {
                setEmployee(res)
            })
        }
    }


    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    const formattedValue = formatter.format(employee.salary);


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
                <button className="" onClick={() => navigate(`/employees`)}>Back to Employees</button>
            </div>
            <div className="mc__employee center">
                <section className="mc__employee--details box is-centered mb-2 columns">
                    <div className="mr-3 column is-9">
                        <div className="">
                            <header className="center__left mb-4">
                                <h1 className="">{employee.full_name}</h1>
                            </header>
                            <figure>
                                <img src={employee.image} alt={`${employee.first_name}'s image`} />
                            </figure>
                            <div>
                                <p>Address: {employee.address}</p>
                                <p>Phone: {employee.phone_number}</p>
                                {
                                    superUser
                                        ? <><p>Current Salary: {formattedValue}</p></>
                                        : <></>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        {
                            superUser
                                ? <><button onClick={() => updateClickStatus(true)} className="center button btn__employee-details is-small mb-2">Update</button>
                                    <button className="button btn__employee-details is-small">Delete</button></>
                                : <></>
                        }
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
                />
                : defaultDisplay()
        }
    </main>
}