import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getEmployeeById, saveEditedEmployee } from "../../managers/EmployeeManager"
import { getSpecialties } from "../../managers/SpeciatlyManager"
import "./Employee.css"


export const EmployeeUpdate = () => {

    const { employeeId } = useParams()
    const [checkedOptions, setCheckedOptions] = useState(new Set())
    const [specialty, setSpecialty] = useState([])
    // const [currentSpecialty, setCurrentSpecialty] = useState([])
    const [employee, setEmployee] = useState({
        address: "",
        bio: "",
        image: "",
        phone_number: "",
        salary: "",
        specialty: []
    })


    // useEffect(() => {
    //     getSpecialtyById(employeeId)
    //         .then(setCurrentSpecialty)
    // }, [employeeId])

    const navigate = useNavigate()

    const mCSuperUser = localStorage.getItem("is_superuser")
    const superUser = JSON.parse(mCSuperUser)

    const localMCUser = localStorage.getItem("is_staff")
    const mCPressure = JSON.parse(localMCUser)


    const changeEmployeeState = (domEvent) => {
        // TODO: Complete the onChange function
        const value = domEvent.target.value
        setEmployee({
            ...employee,
            [domEvent.target.name]: value
        })
    }

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

    useEffect(() => {
        if (superUser || mCPressure) {
            getSpecialties()
                .then(data => { setSpecialty(data) })
        }
    }, [superUser, mCPressure])

    const showWidget = (clickEvent) => {
        clickEvent.preventDefault()
        let widget = window.cloudinary.createUploadWidget({
            cloudName: `dp04hh5pz`,
            uploadPreset: `gv9plrcj`
        },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log(result.info.url)
                    const copy = structuredClone(employee)
                    copy.image = result.info.url
                    setEmployee(copy)
                }
            });
        widget.open()
    }



    return <>
        <div className="mt-5" id="navbar__space">
            <h1 className=" ml-5 mt-5">Update Employee </h1>
        </div>
        <div>
            <div className="mt-5 mb-5 ml-5 ">
                <div>
                    <button className="btn__employee--update__1 button is-small is-dark ml-5" onClick={() => navigate(`/employees`)}>Back to Employees</button>
                </div>
                <div>
                    <button className="btn__employee--update__1 button is-small is-dark ml-5 mt-1" onClick={() => navigate(`/appointments`)}>Back to Appointments</button>
                </div>
            </div>
        </div>

        <form className="mc__employee--update box mt-5 mb-5 px-6 py-6">

            <div className="center box">
                <h2 className="title is-2 mb-3">{employee.full_name}</h2>
            </div>

            <div className="field is-horizontal mt-3">
                <div className="field-label is-normal mt-3">
                    <label className="">Address: </label>
                </div>
                <div className="field-body mt-3">
                    <div className="field">
                        <div className="control">
                            <input type="text" name="address" required className="input is-primary"
                                value={employee.address}
                                onChange={changeEmployeeState} />
                        </div>
                    </div>
                </div>
            </div>



            <div className="field is-horizontal ">
                <div className="field-label is-normal mt-3">
                    <label>Update Bio</label>
                </div>
                <div className="field-body mt-3">
                    <div className="field">
                        <div className="control">
                            <textarea type="text" name="bio" required className="textarea is-right is-link"
                                value={employee.bio}
                                onChange={changeEmployeeState}>
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label is-normal mt-3">
                    <button
                        onClick={(clickEvent) => showWidget(clickEvent)}
                        className="button is-primary is-small">
                        Update Image
                    </button>
                </div>
            </div>
            <div className="field-body">
                <div className="field">
                    <div className="control mt-4"></div>
                    <div className="center">
                        {
                            employee.image !== ""
                                ? <>
                                    <div className="box">
                                        <figure className="service__image is-size-4"><img src={employee.image} alt="A portrait of Employee" /></figure>
                                        <div className="center"><h4 className="subtitle is-7">image preview</h4></div>
                                    </div>
                                </>
                                : <>Image Will Preview Here</>
                        }
                    </div>
                </div>
            </div>

            <div className="field is-horizontal ">
                <div className="field-label is-normal mt-3">
                    <label>Phone #:</label>
                </div>
                <div className="field-body mt-3">
                    <div className="field">
                        <div className="control">
                            <input type="text" name="phone_number" required className="input is-primary"
                                value={employee.phone_number}
                                onChange={changeEmployeeState} />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {
                    superUser
                        ? <>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Specialty:</label>
                                </div>
                                <div className="field-body mt-2">
                                    <div className="field">
                                        <div className="control">
                                            <label className="checkbox">
                                                {
                                                    specialty.map(special => (<div className="ml-2 mr-2" key={`specialty--${special.id}`}>
                                                        <input
                                                            type="checkbox"
                                                            className="mr-2"
                                                            defaultChecked={employee.specialty.some(spec => spec.id === special.id)}
                                                            value={special.id}
                                                            onChange={(e) => {
                                                                const copy = new Set(checkedOptions)
                                                                if (copy.has(special.id)) {
                                                                    copy.delete(special.id)
                                                                } else { copy.add(special.id) }
                                                                setCheckedOptions(copy)
                                                            }}
                                                        />
                                                        {special.label}
                                                    </div>))
                                                }
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal mt-2">
                                <div className="field-label is-normal mt-3">
                                    <label>Salary</label>
                                </div>
                                <div className="field-body mt-3">
                                    <div className="field">
                                        <div className="control">
                                            <input type="number" name="salary" required className="input is-primary"
                                                value={employee.salary}
                                                onChange={changeEmployeeState} />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                        : <></>
                }
            </div>
            <div className="center mt-5">
                <button className="button btn__employee--update is-small mt-2 is-dark mr-2" onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const employeeInformation = {

                        id: employee.id,
                        address: employee.address,
                        bio: employee.bio,
                        image: employee.image,
                        phone_number: employee.phone_number,
                        specialty: Array.from(checkedOptions),
                        salary: employee.salary
                    }

                    // Send POST request to your API
                    saveEditedEmployee(employeeInformation)
                        .then(() => navigate("/employees"))
                }}>Update {employee.full_name} Info</button>
                <button className="button btn__employee--update is-small mt-2 is-outlined is-dark" onClick={() => navigate(`/employees`)}>Back to Employees</button>
                {
                    employee.specialty.label
                }
            </div>
        </form >
    </>
}
