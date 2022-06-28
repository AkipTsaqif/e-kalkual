import { Box, TextField, MenuItem, Button, FormControl } from "@mui/material";
import { withStyles } from "@mui/styles";
import SendIcon from "@mui/icons-material/Send";
import Stack from '@mui/material/Stack';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FileBase64 from 'react-file-base64';

import Navbar from "../../Layout/Navbar";
import styles from "./ApprovalLaporan.module.css";
import axios from "axios";

const ApprovalLaporan = () => {
    const data = useSelector(state => state.uploadLaporan);
    const [file, setFile] = useState({});
    console.log(file);

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

    useEffect(() => {
        console.log(file)
    }, [file])

    return (
        <div>
            <Navbar>
                <section className={styles.card}>
                    <h3>Form Approval Laporan Kalkual</h3>
                </section>

                    <Stack sx={{
                        backgroundColor: 'background.paper',
                        mx: 'auto',
                        maxWidth: '60%',
                        height: 'auto',
                        px: '5vw',
                        pi: '2vh',
                        pb: 3,
                        '& .MuiTextField-root': { m: 1 }
                    }}>
                        <FormControl sx={{ mt: "3vh" }}><DisabledBoldTextField id="userID" label="User ID" value={data.username} size="small" disabled/></FormControl>
                        <DisabledBoldTextField id="noIN" label="No IN" value={data.NoIN} size="small" disabled/>
                        <DisabledBoldTextField id="tipe" label="Tipe Kalkual" value={data.TipeKalkual} size="small" disabled/>
                        <DisabledBoldTextField id="nama" label="Nama Alat/Mesin/Sistem Penunjang" value={data.NamaAlat} size="small" disabled/>
                        <DisabledBoldTextField id="noKontrol" label="No Kontrol" value={data.NoKontrol} size="small" disabled/>
                        <DisabledBoldTextField id="departemen" label="Departemen Pemilik" value={data.Departemen} size="small" disabled/>
                        <DisabledBoldTextField id="lokasi" label="Lokasi" value={data.Lokasi} size="small" disabled/>
                        <DisabledBoldTextField id="tgl" label="Tgl Kalibrasi/Kualifikasi" value={data.TglKalkual} size="small"/>
                        <DisabledBoldTextField id="ed" label="ED Kalibrasi/Kualifikasi" value={data.EDKalkual} size="small" disabled/>
                        <DisabledBoldTextField id="jenis" label="Jenis Kalibrasi" value={data.JenisKalkual} size="small" disabled/>
                        <Box sx={{ display: "flex" }}>     
                            <DisabledBoldTextField sx={{ flex: 1 }} value={file ? file.filename : ""} id="file" label="File laporan" size="small" disabled/>
                            <Box sx={{ mt: "10px", mr: 1}}>

                                <Button sx={{mx: "10px",}} variant="outlined" component="label">Upload File<input onChange={(e) => cvtob64(e.target.files[0])} type="file" hidden /></Button>
                                <Button variant="contained" onClick={saveFileHandler} color="success">Save</Button>
                            </Box>
                        </Box>
                        {data.JenisKalkual === "Eksternal" ? <><TextField id="vendor" label="Vendor" size="small"/>
                        <TextField id="biaya" label="Biaya" size="small"/></> : <></>}
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                            <Stack direction="row" spacing={2}>
                                <Button variant="outlined">Cancel</Button>
                                <Button variant="contained" endIcon={<SendIcon />}>Submit ke Approval</Button>
                            </Stack>
                        </Box>
                        
                    </Stack>
                
            </Navbar>
        </div>
    )
}

export default ApprovalLaporan;