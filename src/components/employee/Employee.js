
import { useState } from "react"
import { Link } from "react-router-dom"
import "./Employee.css"

export const Employee = ({ emp, superUser }) => {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    const formattedValue = formatter.format(emp.salary);

    return <>
        <div><h1>Employees</h1></div>
        <div>
            <section className="employee__list box mb-2">
                <div className="mt-3">
                    <header>
                        <h2><Link to={`/employees/${emp.id}`} >{emp.full_name}</Link></h2>
                    </header>
                    <div>
                        <p>Address: {emp.address}</p>
                        <p>Phone: {emp.phone_number}</p>
                        {
                            superUser
                                ? <><p>Current Salary: {formattedValue}</p></>
                                : <></>
                        }
                        {
                            superUser
                                ? <><button>Update</button></>
                                : <></>
                        }

                    </div>
                </div>
            </section>
        </div>
    </>
}