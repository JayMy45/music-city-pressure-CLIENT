
import { Link } from "react-router-dom"
import "./Employee.css"

export const Employee = ({ emp, superUser }) => {
    return <>
        Hellow Employee Worldie
        <div>
            <header><Link to={`/employees/${emp.id}`}>{emp.full_name}</Link></header>
            <section>
                <div className="mt-3">
                    <p>Bio: {emp.bio}</p>
                    <p>Address: {emp.address}</p>
                    <p>Phone: {emp.phone_number}</p>
                    {
                        superUser
                            ? <><p>Current Salary: {emp.salary}</p></>
                            : <></>
                    }

                </div>
            </section>
        </div>
    </>
}