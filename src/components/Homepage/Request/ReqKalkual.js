import { Box, TextField, MenuItem, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Stack from '@mui/material/Stack';
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestNewActions } from "../../../store/request-new";
import { useLocation } from "react-router-dom";

import Navbar from "../../Layout/Navbar";
import styles from "./ReqKalkual.module.css";

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
    const username = useSelector(state => state.auth.user);
    const location = useLocation();

    const [isKalibrasi, setIsKalibrasi] = useState(true);
    const [tipe, setTipe] = useState("");
    const [alatMesin, setAlatMesin] = useState("");
    const [isRuangan, setIsRuangan] = useState(false);

    const noINRef = useRef();
    const tipeKalkualRef = useRef();
    const namaRef = useRef();
    const tipeAlatRef = useRef();
    const noKontrolRef = useRef();
    const tahunRef = useRef();
    const departemenRef = useRef();
    const lokasiRef = useRef();
    const tglKalkualRef = useRef();
    const edKalkualRef = useRef();
    const jenisKalibrasiRef = useRef();

    const tipeChangeHandler = (e) => {
        setTipe(e.target.value);

        if (e.target.value === "RB") {
            setIsRuangan(true);
        } else {
            setIsRuangan(false);
        }
    }

    const alatMesinChangeHandler = (e) => {
        setAlatMesin(e.target.value);
    }

    async function postRequest(req) {
        const response = await fetch("https://e-kalkual-default-rtdb.asia-southeast1.firebasedatabase.app/request.json", {
            method: 'POST',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();
        console.log(data);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const request = {
            noIN: noINRef.current.value,
            tipeKalkual: tipeKalkualRef.current.value,
            nama: namaRef.current.value,
            tipeAlat: tipeAlatRef.current.value,
            noKontrol: noKontrolRef.current.value,
            tahun: tahunRef.current.value,
            departemen: departemenRef.current.value,
            lokasi: lokasiRef.current.value,
            tglKalkual: tglKalkualRef.current.value,
            edKalkual: edKalkualRef.current.value,
            jenisKalibrasi: jenisKalibrasiRef.current.value
        }

        postRequest(request);
    }

    return (
        <div>
            <Navbar>
                <section className={styles.auth}>
                    <h3>Form registrasi tipe kalkual QA khusus tipe alat/mesin/sistem penunjang/ruangan baru</h3>
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
                        <div><TextField id="userID" label="User ID" size="small" variant="filled" value={username} disabled/></div>
                        <div><TextField id="noIN" label="No IN" inputRef={noINRef} size="small"/></div>
                        <TextField
                            id="tipeKalkual"
                            select
                            label="Tipe Kalkual"
                            value={tipe}
                            onChange={tipeChangeHandler}
                            variant="outlined"
                            inputRef={tipeKalkualRef}
                        >
                            {tipeKalibrasi.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <div><TextField id="nama" label="Nama Alat/Mesin/Sistem Penunjang/Ruangan" inputRef={namaRef} size="small"/></div>
                        <TextField
                            id="tipeAlat"
                            select
                            label="Tipe Alat/Mesin/Sistem Penunjang/Ruangan"
                            value={alatMesin}
                            onChange={alatMesinChangeHandler}
                            variant="outlined"
                            inputRef={tipeAlatRef}
                        >
                            {DUMMY_MESIN.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <div><TextField id="noKontrol" label="No Kontrol" inputRef={noKontrolRef} size="small" variant={isRuangan ? "filled" : "outlined"} disabled={isRuangan}/></div>
                        <div><TextField id="tahun" label="Tahun Pembelian" inputRef={tahunRef} size="small" variant={isRuangan ? "filled" : "outlined"} disabled={isRuangan}/></div>
                        <div><TextField id="departemen" label="Departemen Pemilik" inputRef={departemenRef} size="small"/></div>
                        <div><TextField id="lokasi" label="Lokasi" inputRef={lokasiRef} size="small"/></div>
                        <div><TextField id="tglKalkual" label="Tgl Kalibrasi/Kualifikasi" inputRef={tglKalkualRef} size="small"/></div>
                        <div><TextField id="edKalkual" label="ED Kalibrasi/Kualifikasi" inputRef={edKalkualRef} size="small"/></div>
                        {location.state.kalibrasi ? <div><TextField id="jenis" label="Jenis Kalibrasi" inputRef={jenisKalibrasiRef} size="small"/></div> : <div></div>}
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                            <Stack direction="row" spacing={2}>
                                <Button variant="outlined">Cancel</Button>
                                <Button variant="contained" color="success">Save</Button>
                                <Button variant="contained" onClick={submitHandler} endIcon={<SendIcon />}>Submit ke Approval</Button>
                            </Stack>
                        </Box>
                    </Box>
                
            </Navbar>
        </div>
    )
}

export default Kalibrasi;