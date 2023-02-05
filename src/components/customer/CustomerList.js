import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAppointments } from "../../managers/AppointmentManager"
import { getCustomers } from "../../managers/CustomerManager"
import { getCurrentEmployee, getEmployees } from "../../managers/EmployeeManager"
import { Customer } from "./Customer"
import "./Customer.css"

export const CustomerList = () => {
    const [appointments, setAppointments] = useState([])
    const [customers, setCustomer] = useState([])
    const [employee, setEmployee] = useState([])
    const [currentEmployee, setCurrentEmployee] = useState([])
    const [dropDown, setDropDown] = useState(false)

    const navigate = useNavigate()

    // store is_staff value for differential display
    const localMCUser = localStorage.getItem("is_staff")
    const mCPressure = JSON.parse(localMCUser)

    // store is_superuser value for differential display
    const mCSuperUser = localStorage.getItem("is_superuser")
    const superUser = JSON.parse(mCSuperUser)

    const fetchAppointments = () => {
        getAppointments()
            .then(data => setAppointments(data))
    }

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


    useEffect(() => {
        getCustomers().then(setCustomer)
    }, [])

    return <>
        <section className="mt-5 ml-5">
            <h1 className="is-title">Customers</h1>
            <div className="mb-3"><h3 className="is-italic"><span className="has-text-success-dark">†</span> denotes multiple properties</h3></div>
            <button className="button is-info is-default" onClick={() => { navigate({ pathname: "/customers/create" }) }}><span className="">Schedule Customer</span></button>

        </section>
        <article className="customer__list customers">

            <section className="mc__customer--list">
                <div className="columns is-multiline mt-5 is-3 is-variable is-centered">
                    {
                        customers.map(customer => <Customer key={`customer--${customer.id}`}
                            customer={customer}
                            employee={employee}
                            appointments={appointments}
                            fetchAppointments={fetchAppointments}
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