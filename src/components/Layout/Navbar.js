import styles from "./Navbar.module.css";
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { useSignOut } from 'react-auth-kit';

const Navbar = (props) => {
    const navigate = useNavigate();
    const loc = useLocation();
    const logout = useSignOut();

    const [isHome, setIsHome] = useState(loc.pathname === '/home' ? true : false);

    return (
        <div className={styles.background}>
            <header className={styles.header}>
                <div className={styles.logo}>E-Kalkual</div>
                <nav>
                    <ul>
                        {isHome ? <div></div> : <Button variant="text" onClick={() => navigate(-1)}>Back</Button>}
                        <Button variant="text" onClick={() => logout()}>Logout</Button>
                    </ul>
                </nav>
            </header>
            <section>{props.children}</section>
        </div>
    )
}

export default Navbar