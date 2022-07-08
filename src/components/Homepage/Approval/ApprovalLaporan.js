import { Box, TextField, MenuItem, Button, FormControl, Typography, LinearProgress, FormHelperText } from "@mui/material";
import { withStyles } from "@mui/styles";
import SendIcon from "@mui/icons-material/Send";
import Stack from '@mui/material/Stack';
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import { useFormik, Form } from "formik";
import { approvalSchema } from "../../../utils/validationSchema";

import Navbar from "../../Layout/Navbar";
import styles from "./ApprovalLaporan.module.css";
import axios from "axios";

const ApprovalLaporan = () => {
    const navigate = useNavigate();
    const data = useSelector(state => state.persistedReducer.uploadLaporan);
    const user = useSelector(state => state.persistedReducer.auth.user);
    const [uploadedFile, setUploadedFile] = useState();
    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const vendorRef = useRef();
    const biayaRef = useRef();

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
            },
            body2: {
                letterSpacing: 0.2,
                fontSize: 15
            }
        }
    });

    const formik = useFormik({
        initialValues: {
            vendor: '',
            biaya: ''
        },
        validationSchema: approvalSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (val) => {
            submitLaporanHandler();
        }
    })

    const DisabledBoldTextField = withStyles({
        root: {
            "& .MuiInputBase-root.Mui-disabled": {
                color: "gray",
                fontWeight: "bold"
            }
        }
      })(TextField);

    const saveFileHandler = (file) => {
        setUploadedFile(file);
    }

    const cvtob64 = () => {
        var reader = new FileReader();
        reader.readAsDataURL(uploadedFile);
        reader.onload = function () {
            // console.log(reader.result.split(',')[1]);
            setFiles(files => [
                ...files,
                {file: reader.result.split(',')[1],
                filename: uploadedFile.name}
            ]);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    useEffect(() => {
        // console.log(files)
    }, [uploadedFile]);

    const submitLaporanHandler = async () => {
        try {
            setProgress(0);
            const formData = new FormData();
            for (const oneFile of files)
            formData.append("file", oneFile)
            
            // const res = await axios({
                //     method: 'POST',
                //     url: 'https://localhost:44375/api/upload',
                //     formData,
                //     headers: { 'Content-Type': 'multipart/form-data' }
                // })
                // console.log(res.data);
                
            console.log(files);
            const res = await axios.post("https://localhost:44375/api/upload", files, {
                onUploadProgress: (e) => {
                    setIsUploading(true);
                    const totalLength = e.lengthComputable ? e.total : e.target.getResponseHeader('content-length') || e.target.getResponseHeader('x-decompressed-content-length');
                    setProgress(Math.round((100 * e.loaded) / totalLength));
                }
            });
            console.log(res);
            toast.success("Data kalkual berhasil di submit!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onOpen: () => setIsUploading(false)
            });
        } catch (e) {
            console.log(e);
            toast.error("Gagal mengupload file laporan!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onOpen: () => {setIsUploading(false)}
            });
        }
    }

    return (
        <div>
            <Navbar>
                <ThemeProvider theme={theme}>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{
                        m: "auto auto", 
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        borderRadius: 3,
                        boxShadow: "0 1 4 rgba(0, 0, 0, 0.2)",
                        minHeight: `calc(100vh - 48px)`
                    }}>
                        
                        <Box display="flex" width={0.75} justifyContent="center" alignItems="center" sx={{ boxShadow: 5, m: "auto auto", pt: "2vh", pb: "2vh", backgroundColor: "rgba(0, 0, 0, 0.8)", borderRadius: 3, borderTop: 1, borderBottom: 1, borderColor: "rgba(220, 220, 220, 0.8)", borderWidth: 2}}>
                            <Typography variant="h5">Form Approval Kalkual</Typography>
                        </Box>
                        <Stack width={0.6} sx={{
                            backgroundColor: 'rgba(230,233,233,0.99)',
                            mx: 'auto',
                            maxWidth: '60%',
                            height: 'auto',
                            px: '5vw',
                            pi: '2vh',
                            pb: 3,
                            '& .MuiTextField-root': { m: 1 },
                            borderRadius: 2,
                            boxShadow: 5
                        }}>
                            <form onSubmit={formik.handleSubmit}>
                                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: "center"}}>
                                    <Typography variant="h6">User ID:</Typography>
                                    <FormControl sx={{ mt: "3vh", gridColumn: "span 2" }}><DisabledBoldTextField id="userID" label="User ID" value={user} size="small" disabled/></FormControl>
                                    <Typography variant="h6">No IN:</Typography>
                                    <DisabledBoldTextField sx={{ mt: "3vh", gridColumn: "span 2" }} id="noIN" label="No IN" value={data.NoIN} size="small" disabled/>
                                    <Typography variant="h6">Tipe kalkual:</Typography>
                                    <DisabledBoldTextField sx={{ mt: "3vh", gridColumn: "span 2" }} id="tipe" label="Tipe Kalkual" value={data.TipeKalkual} size="small" disabled/>
                                    <Typography variant="h6">Nama alat:</Typography>
                                    <DisabledBoldTextField sx={{ mt: "3vh", gridColumn: "span 2" }} id="nama" label="Nama Alat/Mesin/Sistem Penunjang" value={data.NamaAlat} size="small" disabled/>
                                    <Typography variant="h6">No kontrol:</Typography>
                                    <DisabledBoldTextField sx={{ mt: "3vh", gridColumn: "span 2" }} id="noKontrol" label="No Kontrol" value={data.NoKontrol} size="small" disabled/>
                                    <Typography variant="h6">Departemen:</Typography>
                                    <DisabledBoldTextField sx={{ mt: "3vh", gridColumn: "span 2" }} id="departemen" label="Departemen Pemilik" value={data.Departemen} size="small" disabled/>
                                    <Typography variant="h6">Lokasi:</Typography>
                                    <DisabledBoldTextField sx={{ mt: "3vh", gridColumn: "span 2" }} id="lokasi" label="Lokasi" value={data.Lokasi} size="small" disabled/>
                                    <Typography variant="h6">Tanggal kalkual:</Typography>
                                    <DisabledBoldTextField sx={{ mt: "3vh", gridColumn: "span 2" }} id="tgl" label="Tgl Kalibrasi/Kualifikasi" value={data.TglKalkual} size="small"/>
                                    <Typography variant="h6">ED kalkual:</Typography>
                                    <DisabledBoldTextField sx={{ mt: "3vh", gridColumn: "span 2" }} id="ed" label="ED Kalibrasi/Kualifikasi" value={data.EDKalkual} size="small" disabled/>
                                    <Typography variant="h6">Jenis kalkual:</Typography>
                                    <DisabledBoldTextField sx={{ mt: "3vh", gridColumn: "span 2" }} id="jenis" label="Jenis Kalibrasi" value={data.JenisKalkual} size="small" disabled/>
                                    <Typography variant="h6">File laporan:</Typography>
                                    <Box marginTop={1} marginBottom={1} justifyContent="space-evenly" alignItems="center" sx={{ display: "flex", gridColumn: "span 2" }}>     
                                        <Button variant="outlined" component="label" disabled={isUploading ? true : false}>Upload File<input onChange={(e) => saveFileHandler(e.target.files[0])} type="file" hidden /></Button>
                                        <Button variant="contained" onClick={cvtob64} color="success" disabled={isUploading ? true : false}>Add</Button>
                                    </Box>
                                    <LinearProgress sx={{ gridColumn: "2 / 4" }} variant="determinate" value={progress} />
                                    <Box marginTop={1} py={1} sx={{ backgroundColor: "rgba(231,234,234,0.99)", boxShadow: 1, gridColumn: "2 / 4" }}>
                                        {files.length > 0 && files.map((item, index) => 
                                            <Typography sx={{ ml: 1 }} key={item.filename} variant="body2">{index + 1}.  {item.filename}</Typography>
                                        )}
                                    </Box>
                                    {data.JenisKalkual === "Eksternal" 
                                        ? <>
                                        <Typography variant="h6">Input vendor:</Typography>
                                        <TextField sx={{gridColumn: "span 2"}} autoComplete="off" value={formik.values.vendor} onChange={formik.handleChange} error={formik.touched.vendor && Boolean(formik.errors.vendor)} helperText={formik.touched.vendor && formik.errors.vendor} inputRef={vendorRef} id="vendor" name="vendor" label="Vendor" size="small"/>
                                        <Typography variant="h6">Input biaya:</Typography>
                                        <TextField sx={{gridColumn: "span 2"}} autoComplete="off" value={formik.values.biaya} onChange={formik.handleChange} error={formik.touched.biaya && Boolean(formik.errors.biaya)} helperText={formik.touched.biaya && formik.errors.biaya} inputRef={biayaRef} id="biaya" name="biaya" label="Biaya" size="small"/></> 
                                        : <></>}
                                </Box>
                                <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                                    <Stack direction="row" spacing={2}>
                                        <Button variant="outlined">Cancel</Button>
                                        <Button variant="contained" endIcon={<SendIcon />} type="submit" disabled={isUploading ? true : false}>Submit ke Approval</Button>
                                    </Stack>
                                </Box>  
                            </form>
                        </Stack>
                    </Box>
                </ThemeProvider>
            </Navbar>
        </div>
    )
}

export default ApprovalLaporan;