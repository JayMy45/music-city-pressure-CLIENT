import { Route, Routes } from "react-router-dom"
import { AppointmentCreate } from "../components/appointment/AppointmentCreate"
import { AppointmentList } from "../components/appointment/AppointmentList"
import { UpdateAppointment } from "../components/appointment/UpdateAppointment"
import { Employee } from "../components/employee/Employee"
import { EmployeeDetails } from "../components/employee/EmployeeDetails"
import { EmployeeList } from "../components/employee/EmployeeList"
import { ServiceCreate } from "../components/service/ServiceCreate"
import { ServiceDetails } from "../components/service/ServiceDetails"
import { ServiceList } from "../components/service/ServiceList"
import { UpdateService } from "../components/service/UpdateService"


export const SuperViews = () => {

    return <>
        <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/employees/:employeeId" element={<EmployeeDetails />} />
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