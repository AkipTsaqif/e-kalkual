import { Box, TextField, MenuItem, Button, Typography } from "@mui/material";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";

import Stack from '@mui/material/Stack';
import SendIcon from "@mui/icons-material/Send";
import Navbar from "../../Layout/Navbar";

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
    const data = useSelector(state => state.persistedReducer.requestScan);
    console.log(data);
    const [tipe, setTipe] = useState("");

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

    const tipeChangeHandler = (e) => {
        setTipe(e.target.value);
    }

    const submitHandler = () => {
        // otw disini
    }

    return (
        <Navbar>
            <ThemeProvider theme={theme}>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{
                    m: "auto auto", 
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    borderRadius: 3,
                    boxShadow: "0 1 4 rgba(0, 0, 0, 0.2)",
                    minHeight: `calc(100vh - 48px)`
                }}>
                    <Box display="flex" width={0.7} justifyContent="center" alignItems="center" sx={{ 
                        pt: "2vh", 
                        pb: "2vh", 
                        backgroundColor: "rgba(0, 0, 0, 0.8)", 
                        borderRadius: 3, 
                        borderTop: 1, 
                        borderBottom: 1, 
                        borderColor: "rgba(220, 220, 220, 0.8)", 
                        borderWidth: 2,
                        boxShadow: 5
                    }}>
                        <Typography variant="h5">Request Hasil Scan</Typography>
                    </Box>
                    <Box sx={{
                        backgroundColor: 'rgba(230, 233, 233, 0.99)',
                        mx: 'auto',
                        width: 0.6,
                        height: 'auto',
                        px: 5,
                        pb: 2,
                        '& .MuiTextField-root': { m: 1 },
                        borderRadius: 2,
                        boxShadow: 5
                    }}>
                        <Box sx={{ 
                            display: 'grid', 
                            gridTemplateColumns: 
                            'repeat(3, 1fr)', 
                            alignItems: "center",
                            "& .MuiInputBase-root.Mui-disabled": {
                                color: "gray",
                                fontWeight: "bold"
                            } 
                        }}>
                            <Typography variant="h6">Tipe Kalkual*:</Typography>
                            <TextField
                                sx={{ gridColumn: "span 2" }}
                                id="tipe"
                                select
                                required
                                label="Tipe Kalkual"
                                value={tipe}
                                onChange={tipeChangeHandler}
                                variant="outlined"
                                size="small"
                            >
                                {tipeKalibrasi.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Typography variant="h6">Nama alat:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} id="nama" value={!!data ? data.NamaAlat : ""} label="Nama Alat/Mesin/Sistem penunjang" size="small" disabled/>
                            <Typography variant="h6">Tipe alat:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} id="nama" value={!!data ? data.TipeAlat : ""} label="Tipe" size="small" disabled/>
                            <Typography variant="h6">No kontrol:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} id="nama" value={!!data ? data.NoKontrol : ""} label="No Kontrol" size="small" disabled/>
                            <Typography variant="h6">Departemen:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} id="nama" value={!!data ? data.Departemen : ""} label="Departemen Pemilik" size="small" disabled/>
                            <Typography variant="h6">Lokasi:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} id="nama" value={!!data ? data.Lokasi : ""} label="Lokasi" size="small" disabled/>
                            <Typography variant="h6">Tanggal kalkual:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} id="nama" value={!!data ? data.TglKalkual : ""} label="Tgl Kalibrasi/Kualifikasi" size="small" disabled/>
                            <Typography variant="h6">ED kalkual:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} id="nama" value={!!data ? data.EDKalkual : ""} label="ED Kalibrasi/Kualifikasi" size="small" disabled/>
                            <Typography variant="h6">Jenis kalkual:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} id="nama" value={!!data ? data.JenisKalkual : ""} label="Jenis Kalibrasi" size="small" disabled/>
                            <Typography variant="h6">Remarks:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} id="nama" label="Remarks" size="small"/>
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                            <Stack direction="row" spacing={2}>
                                <Button variant="outlined">Cancel</Button>
                                <Button variant="contained" onClick={submitHandler} endIcon={<SendIcon />}>Submit ke Approval</Button>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </ThemeProvider>
        </Navbar>
    )
}

export default ReqKalkualUser