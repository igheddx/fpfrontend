
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "../../Pages/Dashboard";
import RunPolicy from "../../Pages/Policy";
import Orders from "../../Pages/Orders";
import Customers from "../../Pages/Customers";
import Login from "../../Pages/Logins/LoginHold1";
import Administration from "../../Pages/Admin/Administration";
import Privacy from "../../Pages/Privaycy/Privacy";

import ProfileComp from "../Profile/ProfileComp";
import TermsComdition from "../../Pages/TermsCondition/TermsCondition";
import PendingApproval from "../Approvers/PendingApproval";
import Profile from "../../Pages/Profile/Profile";
import Settings from "../../Pages/Settings/Settings";



const USER_TYPES = {
    PUBLIC: 'Public User',
    NORMAL_USER: "Normal User",
    ADMIN_USER: "Admin User",
    APPROVER_USER: "Approver User"
}

const CURRENT_USER_TYPE = USER_TYPES.PUBLIC;

function AppRoutes() {
    return (
     
            <Routes>
                
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/policy" element={<RunPolicy />}></Route>
                <Route path="/approval" element={<PendingApproval />}></Route>
                <Route path="/admin" element={<Administration />}></Route>
                
                <Route path="/profile" element={<Profile/>}></Route>
                <Route path="/privacy" element={<Privacy/>}></Route>
                <Route path="/tns" element={<TermsComdition/>}></Route>
                <Route path="/settings" element={<Settings/>}></Route>

                <Route path="/logout" element={<Login />}></Route>
                <Route path="/" element = {<div>Page Not Found</div>}></Route>
                
            
            </Routes>
        
    )
}

export default AppRoutes;

function PublicElement({children}) {
    return <>
    {children}
    </>
}

function AdminElement({children}) {
    if(CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER || CURRENT_USER_TYPE == USER_TYPES.NORMAL_USER){
        
        return <> {children}</>
    } else  {
        return <Navigate to={'/'} />
       
    }
}

function ApproverElement({children}) {
    if(CURRENT_USER_TYPE === USER_TYPES.APPROVER_USER) {
        
        return <> {children}</>
    } else  {
        return <Navigate to={'/'} />
    }
}