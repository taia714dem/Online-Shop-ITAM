import { FC, ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import {Loading} from "./Loading"
import { Context } from "./main";

interface ProtectedRouteProps{
    children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps>=({children})=>{
    const {store}=useContext(Context)
    const [isAuthChecked, setIsAuthChecked]=useState(false);
    useEffect(()=>{
        const checkAuth=async()=>{
            await store.checkAuth();
            setIsAuthChecked(true);
        }
        checkAuth()
    }, [store])
    if(!isAuthChecked){
        return <Loading />
    }
    if(!store.isAuth){
        return <Navigate to='/login' />
    }
    return <>{children}</>
}

export default ProtectedRoute;