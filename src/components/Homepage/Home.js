import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Layout/Navbar";
import styles from "./Home.module.css";

const Home = () => {
    const navigate = useNavigate();
    const uname = useSelector(state => state.auth.user);

    console.log(uname);

    return (
        <Navbar>
            <div>
                <section className={styles.card}>
                    <div className={styles.actions}>
                        <button type="button" onClick={() => navigate("/dashboard")}>Dashboard Jadwal</button>
                    </div>
                    <div className={styles.actions}>
                        <button type="button" onClick={() => navigate("/request")}>Request</button>
                    </div>
                    <div className={styles.actions}>
                        <button type="button" onClick={() => navigate("/verifikasi")}>Verifikasi TMB dan CWR</button>
                    </div>
                </section>
            </div>
            
        </Navbar>
    )
}

export default Home;