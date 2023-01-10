import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { RegisterSupervisor } from "../components/auth/Register Supervisor"
import { RegisterEmployee } from "../components/auth/RegisterEmployee"
import { Authorized } from "./Authorized"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/employee" element={<RegisterEmployee />} />
            <Route path="/register/supervisor" element={<RegisterSupervisor />} />
            <Route path="/*" element={<Authorized />}>
            </Route>
        </Routes>
    </>
}