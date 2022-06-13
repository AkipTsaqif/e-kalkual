import { useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import styles from "./Home.module.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <Navbar>
            <div className={styles.background}>
                <section className={styles.card}>
                    <div className={styles.actions}>
                        <button type="button" onClick={() => navigate("/dashboard")}>Dashboard Jadwal</button>
                    </div>
                    <div className={styles.actions}>
                        <button type="button">Request</button>
                    </div>
                    <div className={styles.actions}>
                        <button type="button">Verifikasi TMB dan CWR</button>
                    </div>
                </section>
            </div>
            
        </Navbar>
    )
}

export default Home;