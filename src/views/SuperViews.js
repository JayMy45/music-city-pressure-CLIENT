import { Route, Routes } from "react-router-dom"
import { AppointmentCreate } from "../components/appointment/AppointmentCreate"
import { AppointmentList } from "../components/appointment/AppointmentList"
import { MyAppointment } from "../components/appointment/MyAppointment"
import { UpdateAppointment } from "../components/appointment/UpdateAppointment"
import { CustomerDetails } from "../components/customer/CustomerDetails"
import { CustomerList } from "../components/customer/CustomerList"
import { CustomerUpdate } from "../components/customer/CustomerUpdate"
import { EmployeeDetails } from "../components/employee/EmployeeDetails"
import { EmployeeList } from "../components/employee/EmployeeList"
import { EmployeeUpdate } from "../components/employee/EmployeeUpdate"
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
            <Route path="/employees/update/:employeeId" element={<EmployeeUpdate />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/:customerId" element={<CustomerDetails />} />
            <Route path="/customers/update/:customerId" element={<CustomerUpdate />} />
            <Route path="/services" element={<ServiceList />} />
            <Route path="/services/create" element={<ServiceCreate />} />
            <Route path="/services/:serviceId" element={<ServiceDetails />} />
            <Route path="/services/update/:serviceId" element={<UpdateService />} />
            <Route path="/appointments" element={<AppointmentList />} />
            <Route path="/appointments/my/:employeeId" element={<MyAppointment />} />
            <Route path="/appointments/customer/:customerId" element={<MyAppointment />} />
            <Route path="/appointments/create" element={<AppointmentCreate />} />
            <Route path="/appointments/update/:appointmentId" element={<UpdateAppointment />} />
        </Routes>
    </>
}