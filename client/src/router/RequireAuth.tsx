import React from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {toast} from "react-toastify";

function RequireAuth() {
    const user = localStorage.getItem('user');
    const location = useLocation();
    
    if (!user) {
        toast.error('You must be logged in to view checkout');
        return <Navigate to='/' state={{from: location}}/>
    }

    return <Outlet/>
}

export default RequireAuth;