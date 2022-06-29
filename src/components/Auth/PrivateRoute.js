import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";

const PrivateRoute = () => {
    const authorized = useSelector(state => state.persistedReducer.auth);
    const location = useLocation();

    if (!authorized.authorized && !authorized.isLoggedOut) {
        toast.error("Harap log in terlebih dahulu!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        })
        return <Navigate to="/" state={{ from: location }} />
    } else if (authorized.isLoggedOut) {
        toast.success("Berhasil log out!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        })
        return <Navigate to="/" state={{ from: location }} />
    }

    return <Outlet />
}

export default PrivateRoute;