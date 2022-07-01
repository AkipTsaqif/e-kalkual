import { Box, TextField, MenuItem, Button, FormControl, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import SendIcon from "@mui/icons-material/Send";
import Stack from '@mui/material/Stack';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Navbar from "../../Layout/Navbar";
import styles from "./ApprovalLaporan.module.css";
import axios from "axios";

const ApprovalLaporan = () => {
    const data = useSelector(state => state.persistedReducer.uploadLaporan);
    const user = useSelector(state => state.persistedReducer.auth.user);
    const [file, setFile] = useState({});

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

    const DisabledBoldTextField = withStyles({
        root: {
            "& .MuiInputBase-root.Mui-disabled": {
                color: "gray",
                fontWeight: "bold"
            }
        }
      })(TextField);

    const saveFileHandler = async () => {        
        try {
            const res = await axios.post("https://localhost:44375/api/upload", file);
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }

    const cvtob64 = (file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader.result.split(',')[1]);
            setFile({
                file: reader.result.split(',')[1],
                filename: file.name,
                NoIN: data.NoIN
            });
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    return (
        <div>
            <Navbar>
                <ThemeProvider theme={theme}>
                    <Box display="flex" width={0.75} justifyContent="center" alignItems="center" sx={{ m: "auto auto", pt: "2vh", pb: "2vh", backgroundColor: "rgba(0, 0, 0, 0.8)", borderRadius: 3, borderTop: 1, borderBottom: 1, borderColor: "rgba(220, 220, 220, 0.8)", borderWidth: 2}}>
                        <Typography variant="h5">Form Approval Kalkual</Typography>
                    </Box>
                    <Stack sx={{
                        backgroundColor: 'rgba(230,233,233,0.99)',
                        mx: 'auto',
                        maxWidth: '60%',
                        height: 'auto',
                        px: '5vw',
                        pi: '2vh',
                        pb: 3,
                        '& .MuiTextField-root': { m: 1 }
                    }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: "center"}}>
                            <Typography variant="h6">User ID:</Typography>
                            <FormControl sx={{ mt: "3vh", gridColumn: "span 2" }}><DisabledBoldTextField id="userID" label="User ID" value={user} size="small" disabled/></FormControl>
                            <Typography variant="h6">No IN:</Typography>
                            <DisabledBoldTextField sx={{ mt: "3vh", gridColumn: "span 2" }} id="noIN" label="No IN" value={data.NoIN} size="small" disabled/>
                            <Typography variant="h6">Tipe Kalkual:</Typography>
                            <DisabledBoldTextField sx={{ mt: "3vh", gridColumn: "span 2" }} id="tipe" label="Tipe Kalkual" value={data.TipeKalkual} size="small" disabled/>
                            <Typography variant="h6">Nama Alat:</Typography>
                            <DisabledBoldTextField sx={{ mt: "3vh", gridColumn: "span 2" }} id="nama" label="Nama Alat/Mesin/Sistem Penunjang" value={data.NamaAlat} size="small" disabled/>
                            <Typography variant="h6">No Kontrol:</Typography>
                            <DisabledBoldTextField sx={{ mt: "3vh", gridColumn: "span 2" }} id="noKontrol" label="No Kontrol" value={data.NoKontrol} size="small" disabled/>
                            <Typography variant="h6">Departemen:</Typography>
                            <DisabledBoldTextField sx={{ mt: "3vh", gridColumn: "span 2" }} id="departemen" label="Departemen Pemilik" value={data.Departemen} size="small" disabled/>
                            <Typography variant="h6">Lokasi:</Typography>
                            <DisabledBoldTextField sx={{ mt: "3vh", gridColumn: "span 2" }} id="lokasi" label="Lokasi" value={data.Lokasi} size="small" disabled/>
                            <Typography variant="h6">Tanggal Kalkual:</Typography>
                            <DisabledBoldTextField sx={{ mt: "3vh", gridColumn: "span 2" }} id="tgl" label="Tgl Kalibrasi/Kualifikasi" value={data.TglKalkual} size="small"/>
                            <Typography variant="h6">ED Kalkual:</Typography>
                            <DisabledBoldTextField sx={{ mt: "3vh", gridColumn: "span 2" }} id="ed" label="ED Kalibrasi/Kualifikasi" value={data.EDKalkual} size="small" disabled/>
                            <Typography variant="h6">Jenis Kalkual:</Typography>
                            <DisabledBoldTextField sx={{ mt: "3vh", gridColumn: "span 2" }} id="jenis" label="Jenis Kalibrasi" value={data.JenisKalkual} size="small" disabled/>
                            <Typography variant="h6">File Laporan:</Typography>
                            <Box sx={{ display: "flex", gridColumn: "span 2" }}>     
                                <DisabledBoldTextField sx={{ flex: 1 }} value={file ? file.filename : ""} id="file" label="File laporan" size="small" disabled/>
                                <Box sx={{ mt: "10px", mr: 1}}>
                                    <Button sx={{mx: "10px",}} variant="outlined" component="label">Upload File<input onChange={(e) => cvtob64(e.target.files[0])} type="file" hidden /></Button>
                                    <Button variant="contained" onClick={saveFileHandler} color="success">Save</Button>
                                </Box>
                            </Box>
                            {data.JenisKalkual === "Eksternal" 
                                ? <>
                                <Typography variant="h6">Input Vendor:</Typography>
                                <TextField sx={{gridColumn: "span 2"}} id="vendor" label="Vendor" size="small"/>
                                <Typography variant="h6">Input Biaya:</Typography>
                                <TextField sx={{gridColumn: "span 2"}} id="biaya" label="Biaya" size="small"/></> 
                                : <></>}
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                            <Stack direction="row" spacing={2}>
                                <Button variant="outlined">Cancel</Button>
                                <Button variant="contained" endIcon={<SendIcon />}>Submit ke Approval</Button>
                            </Stack>
                        </Box>  
                    </Stack>
                </ThemeProvider>
            </Navbar>
        </div>
    )
}

export default ApprovalLaporan;