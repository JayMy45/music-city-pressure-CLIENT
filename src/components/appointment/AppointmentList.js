import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAppointments } from "../../managers/AppointmentManager"
import { getCustomers } from "../../managers/CustomerManager"
import { getCurrentEmployee, getEmployees } from "../../managers/EmployeeManager"
import { getProgressions } from "../../managers/ProgressManager"
import { Appointment } from "./Appointment"
import "./Appointment.css"

export const AppointmentList = () => {
    const [appointments, setAppointments] = useState([])
    const [appt, setAppt] = useState([])
    const [progression, setProgression] = useState([])
    const [customers, setCustomer] = useState([])
    const [employee, setEmployee] = useState([])
    const [currentEmployee, setCurrentEmployee] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState(currentEmployee.full_name);
    const [buttonFilter, setButtonFilter] = useState(false)


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

    useEffect(() => {
        getAppointments()
            .then(data => { setAppt(data) })
    }, [])

    // if a Admin/SuperUser or Employee/mCPressure is logged in update currentEmployee
    useEffect(() => {
        if (superUser || mCPressure) {
            getCurrentEmployee()
                .then(data => { setCurrentEmployee(data) })
        }
    }, [superUser, mCPressure])

    const fetchAppointments = () => {
        getAppointments()
            .then(data => setAppointments(data))
    }

    useEffect(() => {
        fetchAppointments()
    }, [])

    useEffect(() => {
        getProgressions().then(data => setProgression(data))
    }, [])

    useEffect(() => {
        getCustomers().then(setCustomer)
    }, [])

    return <>
        <section className="mt-5 ml-5 mc__appointment--list">
            {buttonFilter ? <h1 className="is-title is-size-3 mb-2"><span className="is-italic">{currentEmployee.full_name}</span> Appointments</h1> : <h1 className="is-title is-size-3 mb-2">Appointments</h1>}

            <button className="button is-info is-default" onClick={() => { navigate({ pathname: "/appointments/create" }) }}><span className="">Schedule Appointment</span></button>
            <div className="btn__btn--section1">
                <>
                    <div>

                        {
                            superUser
                                ? <>
                                    <div className="box mt-3 ml-1 my__appointment--dropdown">
                                        <div className="center">
                                            <h2>Filter by Employee</h2>
                                        </div>
                                        <div className="center mt-2">
                                            <select name='employee' className="dropdown my__appointment--dropdown" onChange={(e) => {
                                                const selectedEmployeeId = e.target.value;
                                                setSelectedEmployee(e.target.value);
                                                navigate({ pathname: `/appointments/my/${selectedEmployeeId}` });
                                            }} value={currentEmployee.full_name}>
                                                <option>Select a Employee</option>
                                                {
                                                    // alphabetize employees by full_name
                                                    employee.sort((a, b) => {
                                                        if (a.full_name < b.full_name) return -1;
                                                        if (a.full_name > b.full_name) return 1;
                                                        return 0;
                                                    }).map(emp => {
                                                        if (emp.id !== currentEmployee.id) {
                                                            return <option value={`${emp.id}`} className="" key={`assignedEmployees--${emp.id}`}>{emp.full_name}</option>
                                                        }
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </>
                                : <></>
                        }
                    </div>
                    <div>
                        {
                            mCPressure
                                ? <>
                                    <button className="btn btn__appointments button ml-4 mt-1 is-text" onClick={() => { navigate({ pathname: `/appointments/my/${currentEmployee.id}` }) }}>My Appointments</button>
                                </> : <></>
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
                        appointments.map(appointment => <Appointment key={`appointment--${appointment.id}`}
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
