import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getCurrentCustomer } from "../../managers/CustomerManager"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    const [isActive, setIsActive] = useState(false)
    const [activeDropDown1, setActiveDropDown1] = useState(false)
    const [activeDropDown2, setActiveDropDown2] = useState(false)
    const [currentCustomer, setCurrentCustomer] = useState([])


    const mCToken = localStorage.getItem("mc_token")

    const localMCUser = localStorage.getItem("is_staff")
    const mCPressure = JSON.parse(localMCUser)

    const mCSuperUser = localStorage.getItem("is_superuser")
    const superUser = JSON.parse(mCSuperUser)

    const closeHamburger = () => {
        setIsActive(!isActive)
    }

    const handleDropDown1 = () => {
        setActiveDropDown1(!activeDropDown1);
        setActiveDropDown2(false);
    }

    const handleDropDown2 = () => {
        setActiveDropDown1(false); // Close the first dropdown
        setActiveDropDown2(!activeDropDown2);
    }

    const closeAll1 = () => {
        setIsActive(!isActive)
        setActiveDropDown1(!activeDropDown1)
    }
    const closeAll2 = () => {
        setIsActive(!isActive)
        setActiveDropDown2(!activeDropDown2)
    }

    const handleDropdownClose = (event) => {
        if (event.target.className !== 'navbar-item has-dropdown is-active' && event.target.className !== 'navbar-link is-arrowless') {
            setActiveDropDown1(false);
            setActiveDropDown2(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleDropdownClose);
        return () => window.removeEventListener('click', handleDropdownClose);
    });

    useEffect(() => {
        if (!mCPressure && mCToken)
            getCurrentCustomer()
                .then(data => { setCurrentCustomer(data) })

    }, [mCPressure])

    return (
        <nav className="navbar has-shadow is-dark mb-5 is-fixed-top" role="navigation" aria-label="dropdown navigation">
            <div className="navbar-brand">
                <div>
                    <div className="navbar-item mt-4">
                        {mCPressure && superUser
                            ? <div>
                                <h2><span className="has-text-danger ml-3 mt-5 is-size-5"><span>Admin</span></span></h2>
                            </div>
                            : mCPressure && !superUser
                                ? <h2><span className="has-text-warning is-size-6 ml-3 is-italic">EmployeeView</span></h2>
                                : mCToken
                                    ? <><h2><span className="has-text-white is-size-6 ml-3">Welcome back <span className="is-italic is-size-5">{currentCustomer.full_name}</span></span></h2></>
                                    : <></>
                        }

                        <div className="">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a
                                onClick={closeHamburger}
                                role="button"
                                className={`navbar-burger burger ${isActive ? 'is-active' : ""}`}
                                aria-label="menu navigation"
                                aria-expanded="false"
                                data-target="navbarBasicExample"
                            >
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' : ""}`} >
                <div className="navbar-end ">
                    <div className="navbar-item ">
                        {
                            (localStorage.getItem("mc_token") !== null) ?
                                <div>
                                    <ul className="navbar-item">
                                        <div className={`navbar-item has-dropdown ${activeDropDown1 ? 'is-active' : ""}`}>
                                            <div>
                                                <li className="navbar-item">
                                                    <Link onClick={handleDropDown1} className="navbar-link is-arrowless">Appointments</Link>
                                                </li>
                                            </div>
                                            <div className="navbar-dropdown">
                                                <li className="navbar-item">
                                                    <Link to="/appointments" onClick={closeAll1} className="">All Appointments</Link>
                                                </li>
                                                <li className="navbar-item">
                                                    <Link to="/appointments/create" onClick={closeAll1} className="">Schedule Appointments</Link>
                                                </li>
                                            </div>
                                        </div>
                                        {
                                            mCPressure
                                                ? (< div className={`navbar-item has-dropdown ${activeDropDown2 ? 'is-active' : ""}`}>
                                                    <div>
                                                        <li className="navbar-item">
                                                            <Link onClick={handleDropDown2} className="navbar-link is-arrowless">Services</Link>
                                                        </li>
                                                    </div>
                                                    <div className="navbar-dropdown">
                                                        <li className="navbar-item">
                                                            <Link to="/services" onClick={closeAll2} className="">All Services</Link>
                                                        </li>
                                                        <li className="navbar-item">
                                                            <Link to="/services/create" onClick={closeAll2} className="">Create New Service</Link>
                                                        </li>
                                                    </div>
                                                </div>
                                                )
                                                : <>
                                                    <div>
                                                        <li className="navbar-item">
                                                            <Link className="has-text-light" to="/services" onClick={closeHamburger}><span>Services</span></Link>
                                                        </li>
                                                    </div>
                                                </>
                                        }
                                        {
                                            mCPressure || superUser
                                                ? <div className="navbar-item">
                                                    <li className="navbar__item">
                                                        <Link className="has-text-light" to="/Employees" onClick={closeHamburger}><span>Employees</span></Link>
                                                    </li>
                                                </div>
                                                : <div className="navbar-item">
                                                    <li className="navbar__item">
                                                        <Link className="has-text-light" to="/employees" onClick={closeHamburger}><span>Technicians</span></Link>
                                                    </li>
                                                </div>
                                        }

                                    </ul>
                                </div>

                                : <></>
                        }
                    </div>
                    <div className="is-flex is-vcentered mr-4 ">
                        {
                            (localStorage.getItem("mc_token") !== null) ?
                                <li className="navbar-item">
                                    <button className="nav-link fakeLink is-link"
                                        onClick={() => {
                                            closeHamburger();
                                            localStorage.removeItem("mc_token");
                                            localStorage.removeItem("is_staff");
                                            localStorage.removeItem("user_id");
                                            localStorage.removeItem("is_superuser")
                                            navigate('/login')
                                        }}
                                    >Logout</button>
                                </li> :
                                <>
                                    <div className={`navbar__tokenless navbar-menu ${isActive ? 'is-active' : ""}`}>
                                        <div className="navbar-item">
                                            <div className="navbar-item">
                                                <ul className="nav-item">
                                                    <Link className="nav-link has-text-light" to="/login" onClick={closeHamburger}>Login</Link>
                                                </ul>
                                            </div>
                                            <div className="navbar-item">
                                                <ul className="nav-item">
                                                    <Link className="nav-link has-text-light" to="/register" onClick={closeHamburger}>Register</Link>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div >
        </nav >
    )
}
