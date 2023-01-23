import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteAppointment, saveEditedAppointment, unAssign } from "../../managers/AppointmentManager"
import moment from "moment";
import "./Appointment.css"



export const Appointment = ({ appointment, fetchAppointments, progression, employee, superUser, mCPressure, currentEmployee, dropdown, setDropDown }) => {


    const navigate = useNavigate()
    const [checkedOptions, setCheckedOptions] = useState(new Set())
    const [clickStatus, updateClickStatus] = useState(false)
    const [assignClick, updateAssignClick] = useState(false)
    const [currentAppointment, setCurrentAppointment] = useState({
        request_date: "",
        progress: parseInt(appointment.progress.id)
    })

    //  handles confirmation of deletion via a popup
    const confirmDelete = (evt, appointment) => {
        // whenever confirmed by clicking OK/Cancel window.confirm() returns boolean 
        let text = 'Are you sure you want to delete'
        window.confirm(text)
            ? deleteAppointment(appointment.id)
                .then(fetchAppointments)
            : <></>
    }

    const changeProgressState = (domEvent) => {
        // TODO: Complete the onChange function
        const value = domEvent.target.value
        setCurrentAppointment({
            ...currentAppointment,
            [domEvent.target.name]: value
        })
    }

    const renderProgressBar = (appointment) => {
        return (
            <div className="">
                <div className="appt__media--width appt__progress grid center">
                    {
                        appointment.progress.id === 1 || appointment.progress.id === 2
                            ? <span className="mb-3 mt-2">Progress</span>
                            : <span className="is-capitalized mb-2 is-size-8">{appointment.progress.label}</span>

                    }
                </div>

                <div>
                    {
                        appointment.progress.id !== 1
                            ? <progress className={`mb-2 ${appointment.progress.class_name}`} value={`${appointment.progress.percent}`} max="100"></progress>
                            : <></>
                    }
                </div>
            </div>
        )
    }

    const handleClaimChange = (e) => {
        // Call onChange function
        const copy = new Set(checkedOptions)
        if (copy.has(currentEmployee.id)) {
            copy.delete(currentEmployee.id)
        } else {
            copy.add(currentEmployee.id)
        }
        setCheckedOptions(copy)
        updateClickStatus(!clickStatus)
    }

    const handleClaimClick = (e) => {
        // Call onClick function
        e.preventDefault()

        const employeeAssign = {
            id: appointment.id,
            service_type: appointment.service_type.id,
            progress: parseInt(appointment.progress.id),
            request_date: appointment.request_date,
            scheduled: appointment.scheduled,
            confirm: appointment.confirm,
            consultation: appointment.consultation,
            employee: Array.from(checkedOptions),
            request_details: appointment.request_details,
            completed: appointment.completed
        }

        // Send POST request to your API
        saveEditedAppointment(employeeAssign)
            .then(setCheckedOptions(new Set()))
            .then(fetchAppointments)

    }

    // deletes an assigned technician be sending appointmentId and employee_pks to server.
    const handleDeleteClick = (e, appointment) => {
        e.preventDefault();
        // sets checkOptions to id/pk or clicked option
        if (checkedOptions.size > 0) {
            const copy = new Set(checkedOptions);
            checkedOptions.forEach(option => copy.add(option));
            setCheckedOptions(copy);

            const unAssignEmployee = {
                employee_pks: Array.from(copy), //use the updated copy of checkedOptions
            }

            // Pass the appointment id and employee_pks as separate arguments
            unAssign(appointment.id, unAssignEmployee)
                .then(fetchAppointments)
                .then(updateAssignClick(false))
                //* resets checkOptions so data wont interfere with new requests
                .then(setCheckedOptions(new Set()))

        } else {
            alert("No employees were chosen to unassign. Please select an employee.");
            updateAssignClick(false)
        }
    }





    return <React.Fragment key={`appointment--${appointment.id}`}>
        <div className="appointment__request is-4-tablet is-4-desktop mx-1 column">
            <div className="card ">
                <div className="">
                    {
                        superUser
                            ? <>
                                <div className="pt-1 pl-1">
                                    <div className="mt-1 ml-3">
                                        <header>Customer: {appointment.customer.full_name}</header>
                                        <div>
                                            {assignClick ? <button onClick={(e) => handleDeleteClick(e, appointment)}>UnAssign</button>
                                                : Array.isArray(appointment.employee) && appointment.employee.length > 0
                                                    ? <button className="button is-small is-light" onClick={() => updateAssignClick(true)}>Re-assign?</button>
                                                    : <></>}
                                        </div>
                                    </div>
                                </div>
                            </>
                            : mCPressure
                                ? <>
                                    <div className="pt-1 pl-1"><div className="mt-1 ml-3"><header>Customer: {appointment.customer.full_name}</header></div></div>
                                </>
                                : <></>
                    }

                </div>

                <div className="pt-2 pl-2 mr-2">
                    {
                        Array.isArray(appointment.employee) && appointment.employee.length > 0
                            ? (
                                <>
                                    {assignClick ? <div className="ml-2 mb-1">
                                        Update Assigned Technician(s):{" "}
                                        {
                                            appointment.employee.map((employ, index) => (
                                                // checkboxes to remove assigned technicians (ONLY superUsers)
                                                <div className="ml-2 mr-2" key={`employee--${employ.id}`}>
                                                    <input className="mr-2" value={employ.id}
                                                        onChange={(e) => {
                                                            const copy = new Set(checkedOptions)
                                                            if (copy.has(employ.id)) {
                                                                copy.delete(employ.id)
                                                            } else { copy.add(employ.id) }
                                                            setCheckedOptions(copy)
                                                        }
                                                        } type="checkbox" />
                                                    <span><Link to={`/employees/${employ.id}`}>{employ.full_name}</Link></span>
                                                    {index < appointment.employee.length - 1 ? ", " : ""}
                                                </div>

                                            ))
                                        }
                                    </div>
                                        : <div className="ml-2 mb-1">
                                            Technician:{" "}
                                            {
                                                appointment.employee.map((employ, index) => (
                                                    <React.Fragment key={`employee--${employ.id}`}>
                                                        <Link to={`/employees/${employ.id}`}>
                                                            {employ.full_name}
                                                        </Link>
                                                        {index < appointment.employee.length - 1 ? ", " : ""}
                                                    </React.Fragment>
                                                ))
                                            }
                                        </div>}
                                </>
                            )
                            : (
                                mCPressure && !superUser
                                    ? <>
                                        {
                                            !clickStatus
                                                ? <button className="btn__appt--claim button  is-small ml-2 mb-1" onClick={handleClaimChange}>Claim</button>
                                                : <>
                                                    <button className="btn__appt--claim button  is-small  is-danger ml-2 mb-1" onClick={handleClaimClick}>Confirm</button>
                                                    <button className="btn__appt--claim button is-small is-outlined mr-1" onClick={handleClaimChange}>undo</button>

                                                    <span className="is-size-7">CONFIRM to claim, <span className="is-italic has-text-weight-bold	">{currentEmployee.user.first_name}</span></span>!

                                                </>
                                        }
                                    </>
                                    : superUser
                                        ? <>

                                            {employee.map(special =>
                                            (
                                                <div className="ml-2 mr-2" key={`specialty--${special.id}`}>
                                                    <input className="mr-2" value={special.id}
                                                        onChange={(e) => {
                                                            const copy = new Set(checkedOptions)
                                                            if (copy.has(special.id)) {
                                                                copy.delete(special.id)
                                                            } else { copy.add(special.id) }
                                                            setCheckedOptions(copy)
                                                        }
                                                        } type="checkbox" />
                                                    <span><Link to={`/employees/${special.id}`}>{special.user.first_name}</Link></span>
                                                </div>
                                            ))
                                            }
                                            <div>
                                                <button type="submit" className="ml-2 mb-1" onClick={(evt) => {
                                                    evt.preventDefault()

                                                    const employeeAssign = {
                                                        id: appointment.id,
                                                        service_type: appointment.service_type.id,
                                                        progress: parseInt(appointment.progress.id),
                                                        request_date: appointment.request_date,
                                                        scheduled: appointment.scheduled,
                                                        confirm: appointment.confirm,
                                                        consultation: appointment.consultation,
                                                        employee: Array.from(checkedOptions),
                                                        request_details: appointment.request_details,
                                                        completed: appointment.completed
                                                    }

                                                    // Send POST request to your API
                                                    saveEditedAppointment(employeeAssign)
                                                        .then(fetchAppointments)
                                                        .then(setCheckedOptions(new Set()))
                                                }}>Assign</button>
                                                <div>
                                                </div>
                                            </div>

                                        </>
                                        : <></>
                            )
                    }
                </div>
                <div className="card-image has-text-centered pt-2 px-2">
                    <figure className="image is-4by3">
                        <img src={appointment.image} alt="Customer House" />
                    </figure>
                </div>
                <div className="card-content pb-1">
                    <section className="is-centered media columns center py-2">
                        {/* handles delete and update buttons */}
                        {
                            (appointment.progress.id <= 2)
                                ? <div className="media-left column mr-2 ml-5">
                                    <div>
                                        <button className="btn__appt-list button is-small " onClick={() => navigate(`/appointments/update/${appointment.id}`)}>
                                            <span className="icon">
                                                <i className="fa-solid fa-wrench"></i>
                                            </span>
                                            <span>Update</span>
                                        </button>
                                    </div>
                                    <div className="mt-1">
                                        <button className="btn__appt-list button is-small" onClick={(evt) => confirmDelete(evt, appointment)}>
                                            <span className="icon">
                                                <i className="fa-regular fa-trash-can"></i>
                                            </span>
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                                : !mCPressure
                                    ? <div className=""><h2 className="center mt-4 ml-1 mr-2">Your Service is ongoing</h2></div>
                                    : <div className="media-left column mr-2 ml-5">
                                        <div>
                                            <button className="btn__appt-list button is-small " onClick={() => navigate(`/appointments/update/${appointment.id}`)}>
                                                <span className="icon">
                                                    <i className="fa-solid fa-wrench"></i>
                                                </span>
                                                <span>Update</span>
                                            </button>
                                        </div>
                                        <div className="mt-1">
                                            <button className="btn__appt-list button is-small" onClick={(evt) => confirmDelete(evt, appointment)}>
                                                <span className="icon">
                                                    <i className="fa-regular fa-trash-can"></i>
                                                </span>
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    </div>

                        }
                        {/* Progress div */}
                        <div className="notification column mr-5 ml-4 mt-2 mb-2">
                            {
                                mCPressure
                                    ? <>
                                        <div className="ml-2 mb-2">
                                            <div className="is-size-8">Current Progress:</div>
                                            <div><strong className="is-capitalized">{appointment.progress.label}</strong></div>
                                            <select name="progress" className="drop__down" onChange={changeProgressState} value={currentAppointment.progress.label}>
                                                {
                                                    progression.map(progress => {
                                                        return <option value={`${progress.id}`} className="center" key={`progress--${progress.id}`}>{progress.label}</option>
                                                    })
                                                }
                                            </select>
                                            <button type="submit" className="has-background-primary-light has-text-black-dark" onClick={evt => {
                                                // Prevent form from being submitted
                                                evt.preventDefault()

                                                const progressionChange = {
                                                    id: appointment.id,
                                                    service_type: appointment.service_type.id,
                                                    progress: currentAppointment.progress,
                                                    request_date: appointment.request_date,
                                                    scheduled: appointment.scheduled,
                                                    confirm: appointment.confirm,
                                                    consultation: appointment.consultation,
                                                    request_details: appointment.request_details,
                                                    completed: appointment.completed
                                                }

                                                // Send POST request to your API
                                                saveEditedAppointment(progressionChange)
                                                    .then(fetchAppointments)
                                            }}><strong>confirm</strong></button>
                                        </div>

                                    </>
                                    : <>
                                        {
                                            renderProgressBar(appointment)
                                        }
                                    </>
                            }
                        </div>
                    </section>
                    <section className="">
                        <p className=""><strong>Service:</strong> <Link to={`/services/${appointment.service_type.id}`}>{appointment.service_type.name}</Link></p>
                        <div className="paragraph">
                            <p><strong>Details:</strong></p>
                            <p>{appointment.request_details}</p>
                        </div>
                        <p><strong>Address:</strong> {appointment.customer.address}</p>
                        {
                            (appointment.scheduled && appointment.progress.id === 2)
                                ? <>
                                    <div>
                                        <div>

                                            <footer className="card-footer py-2 mt-2 has-text-grey center"><strong>Service Date Scheduled for:</strong><div className="ml-3">{moment(`${appointment.request_date}`).format("L")}</div></footer>
                                        </div>
                                        <div>
                                            <button className="btn__appt-list button is-small is-light appt__calendar" type="submit"
                                                onClick={evt => {
                                                    // Prevent form from being submitted
                                                    evt.preventDefault()

                                                    const reScheduleChange = {
                                                        id: appointment.id,
                                                        service_type: appointment.service_type.id,
                                                        progress: 1,
                                                        request_date: appointment.request_date,
                                                        scheduled: false,
                                                        consultation: appointment.consultation,
                                                        confirm: false,
                                                        request_details: appointment.request_details,
                                                        completed: appointment.completed
                                                    }

                                                    // Send POST request to your API
                                                    saveEditedAppointment(reScheduleChange)
                                                        .then(fetchAppointments)
                                                }}
                                            >
                                                <span><i className="fa-regular fa-calendar-days"></i></span>
                                                <span className="appt__font ml-2">Reschedule Service Date</span>
                                            </button>
                                        </div>
                                    </div>
                                </>
                                : <footer className="card-footer py-2 mt-2 has-text-grey center">
                                    {
                                        appointment.progress.id < 3
                                            ? <div><em>Request Date:</em><div className="ml-3">{moment(`${appointment.request_date}`).format("L")}</div></div>
                                            : <em>{mCPressure
                                                ? `Service for ${appointment.customer.full_name} is`
                                                : "Your Service is"} <span className="is-uppercase">{appointment.progress.label} </span></em>
                                    }
                                </footer>
                        }

                        <footer className="card-footer py-2 mt-2 has-text-grey item center">
                            {
                                mCPressure && appointment.progress.id < 3
                                    ? <div>
                                        <input type="date" name="request_date" required className="center__text appt__calendar"
                                            onChange={changeProgressState} />
                                        <div>
                                            <button className="btn__appt-list button is-small is-black appt__calendar"
                                                onClick={evt => {
                                                    // Prevent form from being submitted
                                                    evt.preventDefault()

                                                    const scheduleChange = {
                                                        id: appointment.id,
                                                        service_type: appointment.service_type.id,
                                                        progress: appointment.progress.id,
                                                        request_date: currentAppointment.request_date,
                                                        scheduled: true,
                                                        confirm: false,
                                                        consultation: appointment.consultation,
                                                        request_details: appointment.request_details,
                                                        completed: appointment.completed
                                                    }

                                                    // Send POST request to your API
                                                    saveEditedAppointment(scheduleChange)
                                                        .then(fetchAppointments)
                                                }}
                                            >
                                                <span><i className="fa-regular fa-calendar-days"></i></span>
                                                <span className="appt__font ml-2">Schedule</span>
                                            </button>
                                        </div>
                                    </div>
                                    : <></>
                            }
                        </footer>
                        {
                            (!appointment.confirm && appointment.scheduled)

                                ? <footer className="h-10">
                                    <div>
                                        <button className="btn__appt-list button is-fullwidth is-danger appt__calendar"
                                            onClick={evt => {
                                                // Prevent form from being submitted
                                                evt.preventDefault()

                                                const confirmDate = {
                                                    id: appointment.id,
                                                    service_type: appointment.service_type.id,
                                                    progress: 2,
                                                    request_date: appointment.request_date,
                                                    scheduled: appointment.scheduled,
                                                    consultation: appointment.consultation,
                                                    request_details: appointment.request_details,
                                                    completed: appointment.completed,
                                                    confirm: true
                                                }

                                                // Send POST request to your API
                                                saveEditedAppointment(confirmDate)
                                                    .then(fetchAppointments)
                                            }}
                                        >
                                            <span><i className="fa-regular fa-calendar-days"></i></span>
                                            <span className="appt__font ml-2">Confirm Date</span>
                                        </button>
                                    </div>

                                </footer>
                                : <></>
                        }
                    </section>
                </div>


            </div>
        </div>

    </React.Fragment>
}