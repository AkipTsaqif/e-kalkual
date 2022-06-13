import { Box, TextField, MenuItem, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Stack from '@mui/material/Stack';
import { useState, useEffect } from "react";

import Navbar from "../../Layout/Navbar";
import styles from "./Kalibrasi.module.css";

const tipeKalibrasi = [
    {
        value: "AB",
        label: "Alat Baru"
    },
    {
        value: "AR",
        label: "Alat Rusak"
    },
    {
        value: "APP",
        label: "Alat Perlu Perbaikan"
    },
    {
        value: "PA",
        label: "Perpindahan Alat"
    },
    {
        value: "MB",
        label: "Mesin Baru"
    },
    {
        value: "RB",
        label: "Ruangan Baru"
    },
    {
        value: "MR",
        label: "Mesin Rusak"
    },
    {
        value: "MPP",
        label: "Mesin Perlu Perbaikan"
    },
    {
        value: "PM",
        label: "Perpindahan Mesin"
    },
]

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

const DUMMY_ALAT = [
    {
        value: "AMR",
        label: "Amperemeter"
    },
    {
        value: "ANT",
        label: "Anak Timbangan"
    },
    {
        value: "DSM",
        label: "Densitymeter"
    },
    {
        value: "OVN",
        label: "Oven"
    },
    {
        value: "PSG",
        label: "Pressure Gauge"
    },
]

const Kalibrasi = () => {
    const [tipe, setTipe] = useState("");
    const [alatMesin, setAlatMesin] = useState("");

    const tipeChangeHandler = (e) => {
        setTipe(e.target.value);
    }

    const alatMesinChangeHandler = (e) => {
        setAlatMesin(e.target.value);
    }

    console.log(tipe);

    return (
        <div>
            <Navbar>
                <section className={styles.auth}>
                    <h3>Form registrasi tipe kalkual QA khusus tipe alat/mesin/sistem penunjang/ruangan baru</h3>
                    <Box sx={{'& .MuiTextField-root': { m: 1, width: '50ch' }}}>
                        <div><TextField id="userID" label="User ID" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="noIN" label="No IN" size="small"/></div>
                        <TextField
                            id="tipe"
                            select
                            label="Tipe Kalkual"
                            value={tipe}
                            onChange={tipeChangeHandler}
                            variant="outlined"
                        >
                            {tipeKalibrasi.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <div><TextField id="nama" label="Nama Alat/Mesin/Sistem Penunjang/Ruangan" size="small"/></div>
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
                        <div><TextField id="nama" label="No Kontrol" size="small"/></div>
                        <div><TextField id="nama" label="Tahun Pembelian" size="small"/></div>
                        <div><TextField id="nama" label="Departemen Pemilik" size="small"/></div>
                        <div><TextField id="nama" label="Lokasi" size="small"/></div>
                        <div><TextField id="nama" label="Tgl Kalibrasi/Kualifikasi" size="small"/></div>
                        <div><TextField id="nama" label="ED Kalibrasi/Kualifikasi" size="small"/></div>
                        <div><TextField id="nama" label="Jenis Kalibrasi" size="small"/></div>
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                            <Stack direction="row" spacing={2}>
                                <Button variant="outlined">Cancel</Button>
                                <Button variant="contained" color="success">Save</Button>
                                <Button variant="contained" endIcon={<SendIcon />}>Submit ke Approval</Button>
                            </Stack>
                        </Box>
                    </Box>
                </section>
            </Navbar>
        </div>
    )
}

export default Kalibrasi;