import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { loginContext } from "./ContextProvider/DataProvider";

const useAuth = () => {


    const [login] = useContext(loginContext)

    const user = { loggedIn: login }
    return user && user.loggedIn;
}

const ProtectRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to='/' />
}

export default ProtectRoutes;