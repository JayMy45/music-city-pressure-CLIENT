import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import Logo from "/Users/jeremymyers/workspace/level-up-CLIENT/level-up-react-CLIENT/src/logo192.png"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    const [isActive, setIsActive] = useState(false)
    const [activeDropDown, setActiveDropDown] = useState(false)

    const closeHamburger = () => {
        setIsActive(!isActive)
    }

    const handleDropDown = () => {
        setActiveDropDown(!activeDropDown)
    }

    const closeAll = () => {
        setIsActive(!isActive)
        setActiveDropDown(!activeDropDown)
    }



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
                                        <div className={`navbar-item has-dropdown ${activeDropDown ? 'is-active' : ""}`}>
                                            <div>
                                                <li className="navbar-item">
                                                    <Link onClick={handleDropDown} className="navbar-link is-arrowless">Appointments</Link>
                                                </li>
                                            </div>
                                            <div className="navbar-dropdown">
                                                <li className="navbar-item">
                                                    <Link to="/appointments" onClick={closeAll} className="">All Appointments</Link>
                                                </li>
                                                <li className="navbar-item">
                                                    <Link to="/appointments/create" onClick={closeAll} className="">Schedule Appointments</Link>
                                                </li>
                                            </div>
                                        </div>
                                        <div className="navbar-item">
                                            <li className="navbar__item">
                                                <Link to="/appointments" onClick={closeHamburger}>Appointments</Link>
                                            </li>
                                        </div>
                                        <div className="navbar-item">
                                            <li className="navbar__item">
                                                <Link to="/services" onClick={closeHamburger}>Services</Link>
                                            </li>
                                        </div>
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
            </div>
        </nav >
    )
}
