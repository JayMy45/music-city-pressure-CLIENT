import { Route, Routes } from "react-router-dom"
import { AppointmentCreate } from "../components/appointment/AppointmentCreate"
import { AppointmentList } from "../components/appointment/AppointmentList"
import { UpdateAppointment } from "../components/appointment/UpdateAppointment"
import { EmployeeDetails } from "../components/employee/EmployeeDetails"
import { EmployeeList } from "../components/employee/EmployeeList"
import { EmployeeUpdate } from "../components/employee/EmployeeUpdate"
import { ServiceCreate } from "../components/service/ServiceCreate"
import { ServiceDetails } from "../components/service/ServiceDetails"
import { ServiceList } from "../components/service/ServiceList"
import { UpdateService } from "../components/service/UpdateService"


export const EmployeeViews = () => {

    return <>
        <Routes>
            <Route path="/" element={<AppointmentList />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/employees/:employeeId" element={<EmployeeDetails />} />
            <Route path="/employees/update/:employeeId" element={<EmployeeUpdate />} />
            <Route path="/services" element={<ServiceList />} />
            <Route path="/services/create" element={<ServiceCreate />} />
            <Route path="/services/:serviceId" element={<ServiceDetails />} />
            <Route path="/services/update/:serviceId" element={<UpdateService />} />
            <Route path="/appointments" element={<AppointmentList />} />
            <Route path="/appointments/create" element={<AppointmentCreate />} />
            <Route path="/appointments/update/:appointmentId" element={<UpdateAppointment />} />
        </Routes>
    </>
}