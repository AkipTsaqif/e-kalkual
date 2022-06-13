import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Navbar from "../Layout/Navbar";
import styles from "./Verifikasi.module.css";

const Verifikasi = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar>
                <div className={styles.card}>
                    <h1>VERIFIKASI TIMBANGAN {"&"} CHECKWEIGHER</h1>
                    <hr />
                    <div className={styles.actions}>
                        <div>
                            <button type="button" onClick={() => {navigate("/verifikasi/verifperiode")}}>Periode Verifikasi</button>
                        </div>
                        <div>
                            <button type="button" onClick={() => {navigate("/verifikasi/veriftimbangan")}}>Verifikasi Timbangan</button>
                        </div>
                        <div>
                            <button>Verifikasi Checkweigher</button>
                        </div>
                    </div>
                </div>
            </Navbar>
        </div>
    )
}

export default Verifikasi;