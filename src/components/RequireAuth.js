import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => { //Version A: whether the user is logged in or not :D
    const { auth } = useAuth();

    const location = useLocation();

    return (
        auth?.user ?
            <Outlet />
            :
            <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;

//the replace tells us that we will actually change their history from /login to the place where they just came from :D
//without the "state={{ from: location }} replace" part of the code allows us to go back.  Otherwise, it would keep 
//taking us to the login page when we clicked back :)
