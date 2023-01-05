import { Route, Routes } from "react-router-dom"
import { AppointmentCreate } from "../components/appointment/AppointmentCreate"
import { AppointmentList } from "../components/appointment/AppointmentList"
import { UpdateAppointment } from "../components/appointment/UpdateAppointment"
import { EmployeeDetails } from "../components/employee/EmployeeDetails"
import { EmployeeList } from "../components/employee/EmployeeList"
import { ServiceDetails } from "../components/service/ServiceDetails"
import { ServiceList } from "../components/service/ServiceList"
import { UpdateService } from "../components/service/UpdateService"


export const CustomerViews = () => {

    return <>
        <Routes>
            <Route path="/" element={<ServiceList />} />
            <Route path="/services" element={<ServiceList />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/employees/:employeeId" element={<EmployeeDetails />} />
            <Route path="/services/:serviceId" element={<ServiceDetails />} />
            <Route path="/services/update/:serviceId" element={<UpdateService />} />
            <Route path="/appointments" element={<AppointmentList />} />
            <Route path="/appointments/create" element={<AppointmentCreate />} />
            <Route path="/appointments/update/:appointmentId" element={<UpdateAppointment />} />
        </Routes>
    </>
}