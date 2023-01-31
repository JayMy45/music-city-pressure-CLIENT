import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAppointmentByEmployeeId } from "../../managers/AppointmentManager"
import { getCustomers } from "../../managers/CustomerManager"
import { getCurrentEmployee, getEmployees } from "../../managers/EmployeeManager"
import { getProgressions } from "../../managers/ProgressManager"
import { Appointment } from "./Appointment"

export const MyAppointment = () => {

    const { employeeId } = useParams()
    const [myAppointments, setMyAppointments] = useState([])

    //* Copy paste from AppointmentList  ALL STATE Except Appoinment

    const [appt, setAppt] = useState([])
    const [progression, setProgression] = useState([])
    const [customers, setCustomer] = useState([])
    const [employee, setEmployee] = useState([])
    const [currentEmployee, setCurrentEmployee] = useState([])
    const [buttonFilter, setButtonFilter] = useState(true)


    const navigate = useNavigate()

    // store is_staff value for differential display
    const localMCUser = localStorage.getItem("is_staff")
    const mCPressure = JSON.parse(localMCUser)

    // store is_superuser value for differential display
    const mCSuperUser = localStorage.getItem("is_superuser")
    const superUser = JSON.parse(mCSuperUser)

    useEffect(() => {
        getEmployees()
            .then(data => { setEmployee(data) })
    }, [])

    // if a Admin/SuperUser or Employee/mCPressure is logged in update currentEmployee
    useEffect(() => {
        if (superUser || mCPressure) {
            getCurrentEmployee()
                .then(data => { setCurrentEmployee(data) })
        }
    }, [superUser, mCPressure])


    const fetchAppointments = useCallback(() => {
        if (employeeId) {
            getAppointmentByEmployeeId(employeeId).then((res) => {
                setMyAppointments(res)
            })
        }
    }, [employeeId])

    useEffect(() => {
        fetchAppointments()
    }, [fetchAppointments])

    useEffect(() => {
        getProgressions().then(data => setProgression(data))
    }, [])

    useEffect(() => {
        getCustomers().then(setCustomer)
    }, [])

    return <>


        <section className="mt-5 ml-5">
            {buttonFilter ? <h1 className="is-title mb-2"><span className="is-italic">{currentEmployee.full_name}</span> Appointments</h1> : <h1 className="is-title mb-2">Appointments</h1>}

            <button className="button is-info is-default" onClick={() => { navigate({ pathname: "/appointments/create" }) }}><span className="">Schedule Appointment</span></button>
            <div className="btn__btn--section1 ">
                <>
                    <div>
                        {
                            mCPressure
                                ? <>
                                    <button className="btn btn__appointments button is-small mt-2 is-ghost" onClick={() => { navigate({ pathname: "/appointments" }) }}>All Appointments</button>

                                </> : <></>
                        }
                    </div>
                    <div>
                        {
                            superUser
                                ? <>
                                    <div className="box mt-3">
                                        <div>
                                            <h2>Filter by Employee</h2>
                                        </div>
                                        <div>
                                            <select name='employee' className="" onChange={(e) => {
                                                const selectedEmployeeId = e.target.value;
                                                navigate({ pathname: `/appointments/my/${selectedEmployeeId}` });
                                            }} value={currentEmployee.full_name}>
                                                {
                                                    employee.map(emp => {
                                                        return <option value={`${emp.id}`} className="" key={`assignedEmployees--${emp.id}`} >{emp.full_name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </>
                                : <></>
                        }
                    </div>
                </>
            </div>
        </section>
        <article className="appointments  ">
            <section className="mt-5 ml-5">
                {
                    mCPressure
                        ? <></>
                        : <> {
                            customers.map(customer => {
                                return <h3 key={`customer--${customer.id}`} className="is-italic">Welcome back {customer.full_name}</h3>
                            })
                        }
                        </>
                }
            </section>
            <section className="mc__appointment--list">
                <div className="columns is-multiline mt-5 is-3 is-variable is-centered">
                    {
                        myAppointments.map(appointment => <Appointment key={`appointment--${appointment.id}`}
                            appointment={appointment}
                            fetchAppointments={fetchAppointments}
                            employee={employee}
                            progression={progression}
                            mCPressure={mCPressure}
                            superUser={superUser}
                            currentEmployee={currentEmployee}
                            buttonFilter={buttonFilter}
                            setButtonFilter={setButtonFilter}
                            customer={customers.find(customer => customer.id === appointment.customerId)}
                        />)
                    }

                </div>
            </section>
        </article >
    </>
}