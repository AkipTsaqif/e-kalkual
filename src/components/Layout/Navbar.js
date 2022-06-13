import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = (props) => {
    return (
        <div>
            <header className={styles.header}>
                <div className={styles.logo}>E-Kalkual</div>
                <nav>
                    <ul>
                        <Link to='/'>Logout</Link>
                    </ul>
                </nav>
            </header>
            <main className={styles.background}>{props.children}</main>
        </div>
    )
}

export default Navbar