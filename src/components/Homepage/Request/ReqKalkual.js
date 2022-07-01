import { Box, TextField, MenuItem, Button, Typography } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast } from "react-toastify";
import DateFnsAdapter from '@date-io/date-fns';
import idLocale from 'date-fns/locale/id';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import SendIcon from "@mui/icons-material/Send";
import Stack from '@mui/material/Stack';
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestNewActions } from "../../../store/request-new";
import { useLocation, useNavigate } from "react-router-dom";

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

const theme = createTheme({
    typography: {
        h5: {
            fontWeight: "bold",
            color: "white",
            letterSpacing: 0,
            textAlign: "center"
        },
        h6: {
            letterSpacing: 0
        }
    }
});

const Kalibrasi = () => {
    const username = useSelector(state => state.persistedReducer.auth.user);
    const savedRequest = useSelector(state => state.persistedReducer.requestNew.saveRequest);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isKalibrasi, setIsKalibrasi] = useState(true);
    const [tipe, setTipe] = useState("");
    const [alatMesin, setAlatMesin] = useState("");
    const [isRuangan, setIsRuangan] = useState(false);
    const [tanggal, setTanggal] = useState(new Date());
    const [periode, setPeriode] = useState(0);
    const [ed, setEd] = useState("");
    
    const locale = 'id';
    const localeMap = {
        id: idLocale
    }

    const dateFns = new DateFnsAdapter({ locale: localeMap.id });

    const noINRef = useRef();
    const tipeKalkualRef = useRef();
    const namaRef = useRef();
    const tipeAlatRef = useRef();
    const noKontrolRef = useRef();
    const tahunRef = useRef();
    const departemenRef = useRef();
    const lokasiRef = useRef();
    const jenisKalibrasiRef = useRef();

    useEffect(() => {
        setEd(dateFns.addMonths(tanggal, periode));
    }, [periode, tanggal])

    useEffect(() => {
        console.log(savedRequest);
    }, [savedRequest])

    const periodeChangeHandler = (e) => {
        setPeriode(e.target.value);
    }

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

    const inputtedData = () => {
        const request = {
            Option: "Insert",
            NoIN: noINRef.current.value,
            TipeKalkual: tipeKalkualRef.current.value,
            Nama: namaRef.current.value,
            Tipe: tipeAlatRef.current.value,
            NoKontrol: noKontrolRef.current.value,
            TahunPembelian: tahunRef.current.value,
            Departemen: departemenRef.current.value,
            Lokasi: lokasiRef.current.value,
            TglKalkual: tanggal,
            EDKalkual: ed,
            JenisKalkual: location.state.kalibrasi !== null ? (location.state.kalibrasi ? jenisKalibrasiRef.current.value : "") : ""
        }

        return request;
    }

    async function postRequest(req) {
        const response = await fetch("https://localhost:44375/api/kalkual", {
            method: 'POST',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        }).then(resp => {
            resp.json().then(data => toast.success("Request kalkual berhasil!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })).then(() => navigate("/dashboard"));
        }).catch(e => {
            console.log(e);
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();

        // if ('value' in jenisKalibrasiRef.current.value) console.log(jenisKalibrasiRef.current.value)
        // else console.log("kosong");

        postRequest(inputtedData());
    }

    const saveHandler = (e) => {
        e.preventDefault();
        dispatch(requestNewActions.saveRequest(inputtedData()));
    }

    return (
        <Navbar>
            <ThemeProvider theme={theme}>
                <Box display="flex" width={0.75} justifyContent="center" alignItems="center" sx={{ m: "auto auto", pt: "2vh", pb: "2vh", backgroundColor: "rgba(0, 0, 0, 0.8)", borderRadius: 3, borderTop: 1, borderBottom: 1, borderColor: "rgba(220, 220, 220, 0.8)", borderWidth: 2}}>
                    <Typography variant="h5">Form Registrasi Kalkual QA Khusus Alat/Mesin/Sistem Penunjang/Ruangan Baru</Typography>
                </Box>
                <Stack sx={{
                    backgroundColor: 'rgba(230, 233, 233, 0.99)',
                    mx: 'auto',
                    maxWidth: 0.6,
                    height: 'auto',
                    px: 5,
                    pb: 2,
                    '& .MuiTextField-root': { m: 1 }
                }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: "center"}}>
                        <Typography variant="h6">User ID:</Typography>
                        <TextField sx={{ gridColumn: "span 2" }} id="userID" label="User ID" size="small" variant="filled" value={username} disabled/>
                        <Typography variant="h6">No IN:</Typography>
                        <TextField autoComplete="off" sx={{ gridColumn: "span 2" }} id="noIN" label="No IN" inputRef={noINRef} size="small"/>
                        <Typography variant="h6">Tipe Kalkual:</Typography>
                        <TextField sx={{ gridColumn: "span 2" }}
                            size="small"
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
                        <Typography variant="h6">Nama Alat:</Typography>
                        <TextField autoComplete="off" sx={{ gridColumn: "span 2" }} id="nama" label="Nama Alat/Mesin/Sistem Penunjang/Ruangan" inputRef={namaRef} size="small"/>
                        <Typography variant="h6">Tipe Alat:</Typography>
                        <TextField autoComplete="off" sx={{ gridColumn: "span 2" }}
                            size="small"
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
                        <Typography variant="h6">No Kontrol:</Typography>
                        <TextField autoComplete="off" sx={{ gridColumn: "span 2" }} id="noKontrol" label="No Kontrol" inputRef={noKontrolRef} size="small" variant={isRuangan ? "filled" : "outlined"} disabled={isRuangan}/>
                        <Typography variant="h6">Tahun Pembelian:</Typography>
                        <TextField autoComplete="off" sx={{ gridColumn: "span 2" }} id="tahun" label="Tahun Pembelian" inputRef={tahunRef} size="small" variant={isRuangan ? "filled" : "outlined"} disabled={isRuangan}/>
                        <Typography variant="h6">Departemen:</Typography>
                        <TextField autoComplete="off" sx={{ gridColumn: "span 2" }} id="departemen" label="Departemen Pemilik" inputRef={departemenRef} size="small"/>
                        <Typography variant="h6">Lokasi:</Typography>
                        <TextField autoComplete="off" sx={{ gridColumn: "span 2" }} id="lokasi" label="Lokasi" inputRef={lokasiRef} size="small"/>
                        <Typography variant="h6">Tanggal Kalkual:</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={localeMap[locale]}>
                            <DatePicker inputFormat="yyyy-MM-dd" label="Tanggal Kalkual" value={tanggal} onChange={tgl => setTanggal(tgl)} renderInput={params => <TextField {...params} size="small" sx={{ gridColumn: "span 2" }}/>}/>
                        </LocalizationProvider>
                        <Typography variant="h6">Periode Kalkual:</Typography>
                        <TextField autoComplete="off" sx={{ gridColumn: "span 2" }} id="periodeKalkual" onChange={periodeChangeHandler} label="Periode Kalkual" size="small"/>
                        <Typography variant="h6">ED Kalkual:</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={localeMap[locale]}>
                            <DatePicker inputFormat="yyyy-MM-dd" label="ED Kalkual" value={ed} onChange={tgl => setTanggal(tgl)} renderInput={params => <TextField {...params} sx={{ gridColumn: "span 2" }} id="edKalkual" size="small" variant="filled" disabled/>}/>
                        </LocalizationProvider>
                        {location.state.kalibrasi !== null ? 
                            (location.state.kalibrasi ? 
                                <><Typography variant="h6">Jenis Kalkual:</Typography>
                                <TextField sx={{ gridColumn: "span 2" }} id="jenis" label="Jenis Kalibrasi" inputRef={jenisKalibrasiRef} size="small"/></>
                            : <div></div>) 
                        : <div></div>}
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                        <Stack direction="row" spacing={2}>
                            <Button variant="outlined" onClick={() => navigate("/home")} >Cancel</Button>
                            <Button variant="contained" onClick={saveHandler} color="success">Save</Button>
                            <Button variant="contained" onClick={submitHandler} endIcon={<SendIcon />}>Submit ke Approval</Button>
                        </Stack>
                    </Box>
                </Stack>
            </ThemeProvider>
        </Navbar>
    )
}

export default Kalibrasi;