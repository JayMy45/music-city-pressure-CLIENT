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
    const [progression, setProgression] = useState([])
    const [customers, setCustomer] = useState([])
    const [employee, setEmployee] = useState([])
    const [currentEmployee, setCurrentEmployee] = useState([])

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
        <section className="mt-5 ml-5">
            <h1 className="is-title mb-2">Appointments</h1>
            <button className="button is-info is-default" onClick={() => { navigate({ pathname: "/appointments/create" }) }}><span className="">Schedule Appointment</span></button>
        </section>
        <article className="appointments">
            <section className="mt-5">
                {
                    mCPressure
                        ? <></>
                        : <> {
                            customers.map(customer => {
                                return <h3 key={`customer--${customer.id}`}>Welcome back {customer.full_name}</h3>
                            })
                        }
                        </>
                }
            </section>
            <section className="">
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
                        />)
                    }

                </div>
            </section>
        </article >
    </>
}