import { Route, Routes } from "react-router-dom"
import { AppointmentList } from "../components/appointment/AppointmentList"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { ServiceDetails } from "../components/service/ServiceDetails"
import { ServiceList } from "../components/service/ServiceList"
import { Authorized } from "./Authorized"



export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<></>} />
                <Route path="/services" element={<ServiceList />} />
                <Route path="/services/:serviceId" element={<ServiceDetails />} />
                <Route path="/appointments" element={<AppointmentList />} />
            </Route>
        </Routes>
    </>
}
