import { TextField, Box, Button, MenuItem, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";

import Navbar from "../../Layout/Navbar";
import Stack from '@mui/material/Stack';
import styles from "./ApprovalQA.module.css";

const justifikasiList = [
    {
        value: "AMR",
        label: "Alat/mesin/sistem penunjang rusak"
    },
    {
        value: "AMPP",
        label: "Alat/mesin/sistem penunjang perlu perbaikan"
    },
    {
        value: "AMK",
        label: "Alat/mesin/sistem penjunjang perlu dikalibrasi/kualifikasi"
    }
]

const ApprovalQA = () => {
    const [justifikasi, setJustifikasi] = useState("");
    const [enableEndDate, setEnableEndDate] = useState(false);

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

    const justifikasiChangeHandler = (e) => {
        setJustifikasi(e.target.value);
    }

    useEffect(() => {
        console.log(justifikasi);
        if (justifikasi === "AMR") setEnableEndDate(true);
        else setEnableEndDate(false);
    }, [justifikasi])
    console.log(enableEndDate);
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
                    <Box display="flex" width={0.75} justifyContent="center" alignItems="center" sx={{ 
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
                        <Typography variant="h5">Approve Kalkual QA</Typography>
                    </Box>
                    <Box sx={{
                        backgroundColor: 'rgba(230,233,233,0.99)',
                        mx: 'auto',
                        width: '60%',
                        height: 'auto',
                        px: '5vw',
                        pi: '2vh',
                        pb: 3,
                        '& .MuiTextField-root': { m: 1 },
                        borderRadius: 2,
                        boxShadow: 5
                    }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: "center"}}>
                            <Typography variant="h6">Remarks:</Typography>
                            <TextField sx={{ mt: "3vh", gridColumn: "span 2" }} id="remarks" label="Remarks" multiline rows={5}/>
                            <Typography variant="h6">Pilih justifikasi:</Typography>
                            <TextField
                                id="tipe"
                                select
                                label="Pilih Justifikasi"
                                value={justifikasi}
                                onChange={justifikasiChangeHandler}
                                variant="outlined"
                                sx={{ mt: "3vh", gridColumn: "span 2" }}
                            >
                            {justifikasiList.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                            </TextField>
                            <Typography variant="h6">Tgl berakhir:</Typography>
                            <TextField sx={{ mt: "3vh", gridColumn: "span 2" }} id="endDate" label="End date" disabled={enableEndDate ? false : true}/>
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2, gridColumn: "span 3" }}>
                                <Stack direction="row" spacing={8}>
                                    <Button variant="contained" color="success">Approve</Button>
                                    <Button variant="outlined">Cancel</Button>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </ThemeProvider>
        </Navbar>
    )
}

export default ApprovalQA;