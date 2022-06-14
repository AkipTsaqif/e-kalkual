import { Box, TextField, MenuItem, Button } from "@mui/material";
import { useState } from "react";
import Stack from '@mui/material/Stack';
import SendIcon from "@mui/icons-material/Send";
import Navbar from "../../Layout/Navbar";
import styles from "./ReqScanUser.module.css";

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

const ReqKalkualUser = () => {
    const [tipe, setTipe] = useState("");
    const tipeChangeHandler = (e) => {
        setTipe(e.target.value);
    }

    return (
        <div>
            <Navbar>
                <section className={styles.auth}>
                    <h3>Form Registrasi Tipe Kalkual User</h3>
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
                        <div><TextField id="nama" label="Nama Alat/Mesin/Sistem penunjang" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="nama" label="Tipe" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="nama" label="No Kontrol" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="nama" label="Departemen Pemilik" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="nama" label="Lokasi" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="nama" label="Tgl Kalibrasi/Kualifikasi" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="nama" label="ED Kalibrasi/Kualifikasi" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="nama" label="Jenis Kalibrasi" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="nama" label="Remarks" size="small"/></div>
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                            <Stack direction="row" spacing={2}>
                                <Button variant="outlined">Cancel</Button>
                                <Button variant="contained" color="success">Save</Button>
                                <Button variant="contained" endIcon={<SendIcon />}>Submit ke Approval</Button>
                            </Stack>
                        </Box>
                    </Box>
                
            </Navbar>
        </div>
    )
}

export default ReqKalkualUser