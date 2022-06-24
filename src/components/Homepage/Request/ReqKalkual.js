import { Box, TextField, MenuItem, Button } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast } from "react-toastify";
import DateFnsAdapter from '@date-io/date-fns';
import idLocale from 'date-fns/locale/id';

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

const Kalibrasi = () => {
    const username = useSelector(state => state.auth.user);
    const location = useLocation();
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
            })).then(() => navigate(-1));
        }).catch(e => {
            console.log(e);
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();

        // if ('value' in jenisKalibrasiRef.current.value) console.log(jenisKalibrasiRef.current.value)
        // else console.log("kosong");

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
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={localeMap[locale]}>
                                <DatePicker inputFormat="yyyy-MM-dd" label="Tanggal Kalkual" value={tanggal} onChange={tgl => setTanggal(tgl)} renderInput={params => <TextField {...params}/>}/>
                            </LocalizationProvider>
                        </div>
                        <div><TextField id="periodeKalkual" onChange={periodeChangeHandler} label="Periode Kalkual" size="small"/></div>
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={localeMap[locale]}>
                                <DatePicker inputFormat="yyyy-MM-dd" label="ED Kalkual" value={ed} onChange={tgl => setTanggal(tgl)} renderInput={params => <TextField {...params} id="edKalkual" size="small" variant="filled" sx={{fontWeight: 'bold'}} disabled/>}/>
                            </LocalizationProvider>
                        </div>
                        {location.state.kalibrasi !== null ? (location.state.kalibrasi ? <div><TextField id="jenis" label="Jenis Kalibrasi" inputRef={jenisKalibrasiRef} size="small"/></div> : <div></div>) : <div></div>}
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                            <Stack direction="row" spacing={2}>
                                <Button variant="outlined" >Cancel</Button>
                                <Button variant="contained" color="success">Save</Button>
                                <Button variant="contained" onClick={submitHandler} endIcon={<SendIcon />}>Submit ke Approval</Button>
                            </Stack>
                        </Box>
                        <div className={styles.div}>P</div>
                    </Box>
                
            </Navbar>
        </div>
    )
}

export default Kalibrasi;