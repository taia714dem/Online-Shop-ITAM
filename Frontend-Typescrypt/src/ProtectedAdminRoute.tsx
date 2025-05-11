import { FC, ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import {Loading} from "./Loading"
import { Context } from "./main";

interface ProtectedRouteProps{
    children: ReactNode;
}

const ProtectedAdminRoute: FC<ProtectedRouteProps>=({children})=>{
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
        return <Navigate to='/adminEntrance' />
    }
    if(store.user.role!='admin'){
        return <div style={{color: 'white',
            fontSize: 24,
            fontWeight: 600,
            padding: 10
        }}>Доступ запрещён</div>
    } else{
        return <>{children}</>
    }
    
}

export default ProtectedAdminRoute;