import React from 'react'
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from '../../../firebase';
import { Navigate, Outlet } from 'react-router-dom';
const PrivateRoutes = () => {
  const [user, loading, error] = useAuthState(auth);  
  
  if(loading){
    return<p style={{
        fontSize: 40,
        textAlign: 'center',
        position: 'absolute',
        top:'50%',
        left:'50%',
        transform: 'translate(-50%, -50%)',
      }}>Loading...</p>;
  }
  else if(!user || error){
    return <Navigate to="/" replace />;
  }
  else{
    return <Outlet />;
  }
};

export default PrivateRoutes
