import { useNavigate } from "react-router-dom";

import Navbar from "../Layout/Navbar";
import styles from "./Request.module.css";

const Request = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar>
                <div className={styles.card}>
                    <h1>REQUEST</h1>
                    <hr />
                    <div>
                        <div className={styles.actions}>
                            <button type="button" onClick={() => {navigate("/request/new", {state: {kalibrasi: true}})}}>Kalibrasi</button>
                        </div>
                        <div className={styles.actions}>
                            <button type="button" onClick={() => {navigate("/request/new", {state: {kalibrasi: false}})}}>Kualifikasi</button>
                        </div>
                    </div>
                </div>
            </Navbar>
        </div>
    )
}

export default Request;