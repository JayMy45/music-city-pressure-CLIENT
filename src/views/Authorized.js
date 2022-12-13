import { Navigate, Outlet } from "react-router-dom"
import { CustomerViews } from "./CustomerView"
import { EmployeeViews } from "./EmployeeViews"

// export const Authorized = () => {


//     if (localStorage.getItem("mc_token")) {
//         return <Outlet />
//     }
//     return <Navigate to='/login' replace />
// }


export const Authorized = () => {
    const mCStaffUser = localStorage.getItem("is_staff")
    const mCStaff = JSON.parse(mCStaffUser)

    if (localStorage.getItem("mc_token") && mCStaff) {
        return <><Outlet /> <EmployeeViews /></>

    } else if (localStorage.getItem("mc_token") && !mCStaff) {
        return <><Outlet /><CustomerViews /></>
    }
    return <Navigate to='/login' replace />
}