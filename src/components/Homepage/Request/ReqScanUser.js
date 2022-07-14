import { Box, TextField, MenuItem, Button, Typography } from "@mui/material";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QrReader } from "react-qr-reader";

import Navbar from "../../Layout/Navbar";

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

    const alatMesinChangeHandler = (e) => {
        setAlatMesin(e.target.value);
    }

    return (
        <Navbar>
            <ThemeProvider theme={theme}>
                <Box display="none">
                    <QrReader onResult={(res, err) => {
                        if (!!res) {
                            let split = res.text.split("-");
                            console.log("id: " + split[0] + "\n" + "no kontrol: " + split[1]);
                        }
                    }} />
                </Box>
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
                        <Typography variant="h5">Hasil Scan</Typography>
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
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: "center"}}>
                            <Typography variant="h6">Nama:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} value="test" id="nama" label="Nama Alat/Mesin/Sistem Penunjang/Ruangan" size="small" disabled/>
                            <Typography variant="h6">Tipe:</Typography>
                            <TextField
                                sx={{ gridColumn: "span 2" }}
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
                            <Typography variant="h6">No kontrol:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} id="nama" label="No Kontrol" size="small" disabled/>
                            <Typography variant="h6">Lokasi:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} id="nama" label="Lokasi" size="small" disabled/>
                            <Typography variant="h6">Tanggal kalkual:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} id="nama" label="Tgl Kalibrasi/Kualifikasi" size="small" disabled/>
                            <Typography variant="h6">ED kalkual:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} id="nama" label="ED Kalibrasi/Kualifikasi" size="small" disabled/>
                        </Box>
                        <Box display="flex" justifyContent="center" marginTop={2}>
                                <Button variant="contained" color="success">Request</Button>
                        </Box>
                    </Box>
                </Box>
            </ThemeProvider>
        </Navbar>
    )
}

export default ReqScanUser;