import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import "./Auth.css"


export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            username: username.current.value,
            password: password.current.value
        }
        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("mc_token", res.token);
                    localStorage.setItem("is_staff", res.staff);
                    localStorage.setItem("is_superuser", res.supervisor)
                    navigate("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (

        <main className="container--login mt-5">


            <header className="mt-5" id="navbar__space">
                <div className="mt-5">
                    <h1 className="ml-5 mt-5"></h1>
                </div>
            </header>
            <header className="mt-5" id="navbar__space">
                <div className="mt-5">
                    <h1 className="ml-5 mt-5"></h1>
                </div>
            </header>

            <dialog className="dialog dialog--auth mt-5" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Music City Pressure</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputUsername"> Username </label>
                        <input ref={username} type="username" id="username" className="form-control" placeholder="Enter your Username" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
                    </fieldset>
                    <fieldset style={{ textAlign: "left" }}>
                        <button className="btn btn-1 btn-sep icon-send" type="submit">Sign In</button>
                    </fieldset>
                    <section className="">
                        <div className="mb-5 mt-2">
                            <Link to="/register">Not a member yet?</Link>
                        </div>
                    </section>
                </form>
            </section>

            <div className="hero is-medium has-background-white">
                <div className="hero-body">
                    <section className="link--register mb-5">
                        <div className="columns ">
                            <div className="column center">
                                <div className="">
                                    <div className="">
                                        <Link to="/register/employee">Employee Registration</Link>
                                    </div>

                                    <div className="">
                                        <Link to="/register/supervisor">Supervisor Registration</Link>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </section>
                </div>
            </div>

        </main>
    )
}
