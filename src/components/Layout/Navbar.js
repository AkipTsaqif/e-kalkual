import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = (props) => {
    return (
        <div className={styles.background}>
            <header className={styles.header}>
                <div className={styles.logo}>E-Kalkual</div>
                <nav>
                    <ul>
                        <Link to='/'>Logout</Link>
                    </ul>
                </nav>
            </header>
            <section>{props.children}</section>
        </div>
    )
}

export default Navbar