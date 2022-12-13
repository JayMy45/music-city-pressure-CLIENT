import { Navigate, Outlet } from "react-router-dom"
import { CustomerViews } from "./CustomerView"
import { EmployeeViews } from "./EmployeeViews"


export const Authorized = () => {
    // get is_staff value from local storage
    const mCStaffUser = localStorage.getItem("is_staff")
    const mCStaff = JSON.parse(mCStaffUser)

    // if both a authorized token and the user is a staff member display EmployeeViews
    if (localStorage.getItem("mc_token") && mCStaff) {
        return <><Outlet /> <EmployeeViews /></>

        // if User is authorized (token) but not a staff member display CustomerViews
    } else if (localStorage.getItem("mc_token") && !mCStaff) {
        return <><Outlet /><CustomerViews /></>
    }

    return <Navigate to='/login' replace />
}