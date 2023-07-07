import React from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAppDispatch} from "../app/redux/store";
import {setTriggerModal} from "../app/redux/persistSlice";

function RequireAuth() {
    const user = localStorage.getItem('user');
    const location = useLocation();
    const dispatch = useAppDispatch();
    
    if (!user) {
        dispatch(setTriggerModal(true));
        return <Navigate to='/' state={{from: location}}/>
    }

    return <Outlet/>
}

export default RequireAuth;