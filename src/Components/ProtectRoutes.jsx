import { Outlet } from "react-router-dom";
import Login from './Login'
import { useContext } from "react";
import { loginContext } from "./ContextProvider/DataProvider";
import { useNavigate } from "react-router-dom";

const useAuth = () => {

    const navigate = useNavigate();

    const [login] = useContext(loginContext)

    const user = { loggedIn: login }
    return user && user.loggedIn;
}

const ProtectRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Login /> 
}

export default ProtectRoutes;