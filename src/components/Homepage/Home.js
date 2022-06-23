import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from 'react';
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from '@mui/material/Card';
import CardContent from "@mui/material/CardContent";

import Navbar from "../Layout/Navbar";
import styles from "./Home.module.css";
import { blue } from "@mui/material/colors";

const Home = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const [isRequest, setIsRequest] = useState(false);
    const [isVerif, setIsVerif] = useState(false);

    const theme = createTheme({
        palette: {
            primary: {
                main: '#ffffff'
            }
        }
    });

    return (
        <Navbar>
            <div>
                <ThemeProvider theme={theme}>
                    <Card sx={{ maxWidth: "30vw", 
                                marginLeft: "5vw", 
                                marginTop: "5vh",
                                minHeight: "10vh",
                                paddingLeft: "1vw",
                                backgroundColor: "rgba(0, 0, 0, 0.8)",
                                borderRadius: "10px",
                                color: 'primary.main' }}>
                        <CardContent>
                            <h1 style={{marginBottom: "-3vh", marginTop: "-0.5vh"}}>Selamat datang,</h1>
                            <h1 style={{marginBottom: "-1.5vh"}}>{user}</h1>
                        </CardContent>
                    </Card>
                </ThemeProvider>
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