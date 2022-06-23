import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from 'react';

import Navbar from "../Layout/Navbar";
import styles from "./Home.module.css";

const Home = () => {
    const navigate = useNavigate();
    const [isRequest, setIsRequest] = useState(false);
    const [isVerif, setIsVerif] = useState(false);

    return (
        <Navbar>
            <div>
                <section className={styles.card}>
                    <h1>E-Kalkual Home</h1>
                    <hr />
                    <div className={styles.actions}>
                        <Button variant="outlined" onClick={() => navigate("/dashboard")}>Dashboard Jadwal</Button>
                    </div>
                    <div className={styles.actions}>
                        <Button variant="outlined" onClick={() => {
                            setIsRequest(!isRequest);
                            if (isVerif) setIsVerif(!isVerif);
                        }}>Request Kalkual</Button>
                    </div>
                    <div className={styles.actions}>
                        <Button variant="outlined" onClick={() => {
                            setIsVerif(!isVerif);
                            if (isRequest) setIsRequest(!isRequest);
                        }}>Verifikasi TMB dan CWR</Button>
                    </div>
                    <hr />    
                </section>
                {isRequest ? <section className={styles.cardSubmenu}>
                    <div className={styles.actions}>
                        <Button variant="outlined" onClick={() => {navigate("/request/new", {state: {kalibrasi: true}})}}>Kalibrasi</Button>
                        <Button variant="outlined" onClick={() => {navigate("/request/new", {state: {kalibrasi: false}})}}>Kualifikasi</Button>
                    </div>
                </section> : <div />}
                {isVerif ? <section className={styles.cardSubmenu}>
                    <div className={styles.actions}>
                        <Button variant="outlined" onClick={() => {navigate("/verifikasi/periode")}}>Periode Verifikasi</Button>
                        <Button variant="outlined" onClick={() => {navigate("/verifikasi/timbangan")}}>Verifikasi Timbangan</Button>
                        <Button variant="outlined" onClick={() => {navigate("/verifikasi/timbangan")}}>Verifikasi Checkweigher</Button>
                    </div>
                </section> : <div />}
            </div>
            
        </Navbar>
    )
}

export default Home;