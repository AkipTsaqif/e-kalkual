import styles from "./Navbar.module.css";
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { Box, Button } from "@mui/material";

const Navbar = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loc = useLocation();

    const [isHome, setIsHome] = useState(loc.pathname === '/home' ? true : false);

    return (
        <div className={styles.background}>
            <header className={styles.header}>
                <div className={styles.logo}>E-Kalkual</div>
                <nav>
                    <ul>
                        {isHome ? <div></div> : <Button variant="text" onClick={() => navigate(-1)}>Back</Button>}
                        <Button variant="text" onClick={() => {
                            dispatch(authActions.logout());
                        }}>Logout</Button>
                    </ul>
                </nav>
            </header>
            <section>{props.children}</section>
        </div>
    )
}

export default Navbar