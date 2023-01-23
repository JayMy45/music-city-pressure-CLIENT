import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCurrentEmployee, getEmployeeById } from "../../managers/EmployeeManager"
import "./Employee.css"

export const EmployeeDetails = () => {

    const { employeeId } = useParams()
    const [currentEmployee, setCurrentEmployee] = useState([])

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
    const mCPressure = JSON.parse(localMCUser)

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    const formattedValue = formatter.format(employee.salary);


    const renderEmployee = useCallback(() => {
        if (employeeId) {
            getEmployeeById(employeeId).then((res) => {
                setEmployee(res)
            })
        }
    }, [employeeId])

    useEffect(() => {
        renderEmployee()
    }, [renderEmployee])



    // if a Admin/SuperUser or Employee/mCPressure is logged in update currentEmployee
    useEffect(() => {
        if (superUser || mCPressure) {
            getCurrentEmployee()
                .then(data => { setCurrentEmployee(data) })
        }
    }, [superUser, mCPressure])



    // const defaultDisplay = () => {
    return <>
        <div className=" mt-5" id="navbar__space">
            <h1 className=" ml-5 mt-3">Employee Details</h1>
        </div>
        <div className="mt-5 mb-5 ml-5 ">
            <div><button className="btn__employee--update__1 button is-dark ml-5" onClick={() => navigate(`/employees`)}>Back to Employees</button></div>
            <div><button className="btn__employee--update__1 button is-dark ml-5 mt-1" onClick={() => navigate(`/appointments`)}>Appointments</button></div>
        </div>
        <div className="mc__employee center">
            <section className="mc__employee--details box is-centered mb-2 section">
                <div className="container">
                    <div className="columns">
                        <div className="mr-3 column center is-8">
                            <div className="">
                                <header className="center__left mb-4">
                                    <h1 className="">{employee.full_name}</h1>
                                </header>
                                <figure>
                                    <img src={employee.image} alt={`A portrait of ${employee.first_name}`} />
                                </figure>
                                <div>
                                    {
                                        mCPressure || superUser
                                            ? <>
                                                <p>Address: {employee.address}</p>
                                                <p>Phone: {employee.phone_number}</p>
                                            </>
                                            : <></>
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
                                    (employee.id === currentEmployee.id) || superUser
                                        ? <div className="mb-4">
                                            <button onClick={() => navigate(`/employees/update/${employee.id}`)} className="center button btn__employee-details is-small mb-2">Update</button>
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
                    </div>
                    <div>
                        <div>
                            <p><strong>About {employee?.user?.first_name}</strong></p>
                            <p style={{ textAlign: 'justify' }}>{employee.bio}</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
        <section className="hero has-background-grey-light mt-4">
            <div className="hero-foot">
                <div className="mt-2">
                    <a className="">
                        <img src="https://res.cloudinary.com/dp04hh5pz/image/upload/v1673304763/qvybu8b0ojx40deg7yd5.png" alt="Site Logo" width="112" height="28" />
                    </a>
                </div>
            </div>
        </section>
    </>
}
