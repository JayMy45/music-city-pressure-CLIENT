import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import Logo from "/Users/jeremymyers/workspace/level-up-CLIENT/level-up-react-CLIENT/src/logo192.png"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    const [isActive, setIsActive] = useState(false)
    const [activeDropDown1, setActiveDropDown1] = useState(false)
    const [activeDropDown2, setActiveDropDown2] = useState(false)

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



    return (
        <nav className="navbar has-shadow is-warning mb-5 is-fixed-top" role="navigation" aria-label="dropdown navigation">

            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    {/* <img src={Logo} height="3rem" alt="React Logo" /> <h1 className="title is-4 ml-3">Level UP</h1> */}
                </a>

                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                {/* <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" id="burger" onClick={toggleMenu}> */}
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
                                            mCPressure || superUser
                                                ? <div className="navbar-item">
                                                    <li className="navbar__item">
                                                        <Link to="/Employees" onClick={closeHamburger}>Employees</Link>
                                                    </li>
                                                </div>
                                                : <div className="navbar-item">
                                                    <li className="navbar__item">
                                                        <Link to="/employees" onClick={closeHamburger}>Technicians</Link>
                                                    </li>
                                                </div>
                                        }
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
                                                            <Link to="/services" onClick={closeHamburger}>Services</Link>
                                                        </li>
                                                    </div>
                                                </>
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
                                    <div>
                                        <div className="navbar-item">
                                            <div className="navbar-item">
                                                <ul className="nav-item">
                                                    <Link className="nav-link is-link" to="/login" onClick={closeHamburger}>Login</Link>
                                                </ul>
                                            </div>
                                            <div className="navbar-item">
                                                <ul className="nav-item">
                                                    <Link className="nav-link is-link" to="/register" onClick={closeHamburger}>Register</Link>
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
