

import React from 'react'
import { Navigate, Outlet} from 'react-router-dom';
import UserService from './service/UserService';





const ProtectedRoutes = () => {

   // UserService.isAdmin;

   // const navigate = useNavigate();
   // let isLoggedIn = localStorage.getItem("isLoggedIn");
    console.log("LoginStattus");
  const suthenticateStatus = UserService.isAuthenticated;

    if(suthenticateStatus===true ){
        console.log(suthenticateStatus)
        return <Outlet />
    }else{
        console.log("Hello******* Authentication");
       // return navigate('/login', { state: { from: window.location.pathname } });
        return <Navigate to="/login" />;
           
    }


    // return(
    //     <>
    //         <div>Hello Welcome Routes</div>
    //         <Outlet/>
    //     </>
    // )

    


  
}

export default ProtectedRoutes

