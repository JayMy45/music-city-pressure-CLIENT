import { Outlet, Route, Routes } from "react-router-dom"
import { AppointmentCreate } from "../components/appointment/AppointmentCreate"
import { AppointmentList } from "../components/appointment/AppointmentList"
import { UpdateAppointment } from "../components/appointment/UpdateAppointment"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { ServiceDetails } from "../components/service/ServiceDetails"
import { ServiceList } from "../components/service/ServiceList"
import { UpdateService } from "../components/service/UpdateService"
import { Authorized } from "./Authorized"



export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<Authorized />}>
                {/* <Route path="/" element={<></>} /> */}
                {/* <Route path="/services" element={<ServiceList />} />
                <Route path="/services/:serviceId" element={<ServiceDetails />} />
                <Route path="/services/update/:serviceId" element={<UpdateService />} />
                <Route path="/appointments" element={<AppointmentList />} />
                <Route path="/appointments/create" element={<AppointmentCreate />} />
                <Route path="/appointments/update/:appointmentId" element={<UpdateAppointment />} /> */}
            </Route>
        </Routes>
    </>
}