import { Box, TextField, MenuItem, Button } from "@mui/material";
import { useState } from "react";
import Navbar from "../../Layout/Navbar";
import styles from "./ReqScanUser.module.css";

const DUMMY_MESIN = [
    {
        value: "CRT",
        label: "Cartoning"
    },
    {
        value: "DMR",
        label: "Drum Mixer"
    },
    {
        value: "GRN",
        label: "Granulator"
    },
    {
        value: "STN",
        label: "Storage Tank"
    },
    {
        value: "WRP",
        label: "Wrapping"
    },
]

const ReqScanUser = () => {
    const [alatMesin, setAlatMesin] = useState("");
    const alatMesinChangeHandler = (e) => {
        setAlatMesin(e.target.value);
    }

    return (
        <div>
            <Navbar>
                <section className={styles.auth}>
                    <h3>Form Request Kalkual dari Scan Barcode</h3>
                </section>

                    <Box sx={{
                        backgroundColor: 'background.paper',
                        ml: 'auto',
                        mr: 'auto',
                        maxWidth: '35rem',
                        height: 'auto',
                        pl: '3.5rem',
                        pt: '2rem',
                        '& .MuiTextField-root': { m: 1, width: '30rem' }
                    }}>
                        <div><TextField id="nama" label="Nama Alat/Mesin/Sistem Penunjang/Ruangan" size="small" InputProps={{ readOnly: true }}/></div>
                        <TextField
                            id="tipe"
                            select
                            label="Tipe Alat/Mesin/Sistem Penunjang/Ruangan"
                            value={alatMesin}
                            onChange={alatMesinChangeHandler}
                            variant="outlined"
                        >
                            {DUMMY_MESIN.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <div><TextField id="nama" label="No Kontrol" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="nama" label="Lokasi" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="nama" label="Tgl Kalibrasi/Kualifikasi" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="nama" label="ED Kalibrasi/Kualifikasi" size="small" InputProps={{ readOnly: true }}/></div>
                        <Box display="flex" justifyContent="center">
                                <Button variant="contained" color="success">Request</Button>
                        </Box>
                    </Box>
                
            </Navbar>
        </div>
    )
}

export default ReqScanUser;