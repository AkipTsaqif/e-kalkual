import { Box, TextField, Button, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { useSelector } from "react-redux";

const BarcodeKalibrasi = React.forwardRef((props, ref) => {
    const data = useSelector(state => state.persistedReducer.barcode);
    const user = useSelector(state => state.persistedReducer.auth.user);
    console.log(data);
    const theme = createTheme({
        typography: {
            h4: {
                fontWeight: "bold",
                letterSpacing: 0
            },
            h5: {
                fontWeight: "bold",
                letterSpacing: 0
            },
            h6: {
                letterSpacing: 0
            }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <div ref={ref}>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{
                        m: "auto auto", 
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        borderRadius: 3,
                        boxShadow: "0 1 4 rgba(0, 0, 0, 0.2)",
                        minHeight: `calc(100vh - 48px)`
                }}>
                    <Box display="flex" backgroundColor="white" width={0.7} justifyContent="center" alignItems="center" sx={{ 
                        pt: "2vh", 
                        pb: "2vh", 
                        borderTop: 1, borderLeft: 1, borderRight: 1,
                        borderColor: "rgba(0, 0, 0, 1)", 
                        borderWidth: 4
                    }}>
                        <Typography variant="h4">SUDAH DIKALIBRASI</Typography>
                    </Box>
                    <Box width={0.7} backgroundColor="white" sx={{
                        height: 'auto',
                        borderTop: 1, borderLeft: 1, borderRight: 1,
                        borderColor: "rgba(0, 0, 0, 1)", 
                        borderWidth: 4,
                        '& .MuiTextField-root': { m: 0 },
                        '& .MuiTypography-root.MuiTypography-body1': { fontWeight: "bold" }
                    }}>
                        <Box sx={{ pl: 2, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', alignItems: "center"}}>
                            <Typography sx={{ gridColumn: "1 / 3" }} variant="h6">Nama alat/mesin/sistem penunjang:</Typography>
                            <Typography sx={{ gridColumn: "3 / 5", borderLeft: 1, borderBottom: 1, borderWidth: 2, px: 2, backgroundColor: "rgb(200, 200, 200)" }} variant="h5">{data.NamaAlat}</Typography>
                            <Typography variant="h6">No kontrol:</Typography>
                            <Typography sx={{ gridColumn: "3 / 5", borderLeft: 1, borderBottom: 1, borderWidth: 2, px: 2, backgroundColor: "rgb(200, 200, 200)" }} variant="h5">{data.NoKontrol}</Typography>
                            <Typography variant="h6">Lokasi:</Typography>
                            <Typography sx={{ gridColumn: "3 / 5", borderLeft: 1, borderBottom: 1, borderWidth: 2, px: 2, backgroundColor: "rgb(200, 200, 200)" }} variant="h5">{data.Lokasi}</Typography>
                            <Typography variant="h6">Tanggal kalibrasi:</Typography>
                            <Typography sx={{ gridColumn: "3 / 5", borderLeft: 1, borderBottom: 1, borderWidth: 2, px: 2, backgroundColor: "rgb(200, 200, 200)" }} variant="h5">{data.TglKalkual}</Typography>
                            <Typography variant="h6">ED kalibrasi:</Typography>
                            <Typography sx={{ gridColumn: "3 / 5", borderLeft: 1, borderBottom: 1, borderWidth: 2, px: 2, backgroundColor: "rgb(200, 200, 200)" }} variant="h5">{data.EDKalkual}</Typography>
                            <Typography variant="h6">Approved by:</Typography>
                            <Typography sx={{ gridColumn: "3 / 5", borderLeft: 1, borderWidth: 2, px: 2, backgroundColor: "rgb(200, 200, 200)" }} variant="h5">{user}</Typography>
                        </Box>
                    </Box>
                    <Box display="flex" width={0.7} backgroundColor="white" justifyContent="center" alignItems="center" sx={{ 
                        pt: "2vh",  
                        border: 1,
                        borderColor: "rgba(0, 0, 0, 1)", 
                        borderWidth: 4
                    }}>
                        <Typography variant="h5">Request</Typography>
                    </Box>
                </Box>
            </div>
        </ThemeProvider>
    )
})

export default BarcodeKalibrasi;