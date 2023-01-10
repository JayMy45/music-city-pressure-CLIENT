import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
// import "./Auth.css"

export const RegisterSupervisor = () => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const bio = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const email = useRef()
    const address = useRef()
    const phone_number = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()



    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "address": address.current.value,
                "phone_number": phone_number.current.value,
                "bio": bio.current.value,
                "password": password.current.value,
                "salary": 130000,
                "account_type": "employee",
                "super_type": "supervisor",
                "email": email.current.value
            }

            registerUser(newUser)
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("mc_token", res.token)
                        localStorage.setItem("is_staff", res.staff);
                        localStorage.setItem("is_superuser", res.supervisor)
                        navigate("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>
            <header className="mt-5" id="navbar__space">
                <div className="mt-5">
                    <h1 className="ml-5 mt-5"></h1>
                </div>

            </header> <header className="mt-5" id="navbar__space">
                <div className="mt-5">
                    <h1 className="ml-5 mt-5"></h1>
                </div>

            </header>
            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Supervisor Registration</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputUsername">Username</label>
                    <input ref={username} type="text" name="username" className="form-control" placeholder="Username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email </label>
                    <input ref={email} type="text" name="email" className="form-control" placeholder="Email" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="address"> Address </label>
                    <input ref={address} type="text" name="address" className="form-control" placeholder="Address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="phone_number"> Phone </label>
                    <input ref={phone_number} type="text" name="phone_number" className="form-control" placeholder="Phone Number" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Bio </label>
                    <textarea ref={bio} name="bio" className="textarea form-control" placeholder="Tells us about yourself..." />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}
