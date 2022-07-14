import { Box, TextField, Button, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { useSelector } from "react-redux";
import Barcode from 'react-barcode';
import { QRCodeSVG } from "qrcode.react";

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
                    <Box display="flex" backgroundColor="white" width={0.8} justifyContent="center" alignItems="center" sx={{ 
                        pt: "2vh", 
                        pb: "2vh", 
                        borderTop: 1, borderLeft: 1, borderRight: 1,
                        borderColor: "rgba(0, 0, 0, 1)", 
                        borderWidth: 4
                    }}>
                        <Typography variant="h4">SUDAH DIKALIBRASI</Typography>
                    </Box>
                    <Box width={0.8} backgroundColor="white" sx={{
                        height: 'auto',
                        borderTop: 1, borderLeft: 1, borderRight: 1,
                        borderColor: "rgba(0, 0, 0, 1)", 
                        borderWidth: 4,
                        '& .MuiTextField-root': { m: 0 },
                        '& .MuiTypography-root.MuiTypography-body1': { fontWeight: "bold" }
                    }}>
                        <Box sx={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(9, 1fr)', 
                            gridTemplateAreas: `"qr qr text text text value value value value"
                            "qr qr text text text value value value value"
                            "qr qr text text text value value value value"
                            "qr qr text text text value value value value"
                            "qr qr text text text value value value value"
                            "qr qr text text text value value value value"`, 
                            alignItems: "center"}}>
                            <Box sx={{ gridArea: 'qr', borderRight: 1, borderWeight: 4 }}>
                                <QRCodeSVG includeMargin="true" value={data ? data.RequestID + "-" + data.NoKontrol : ""} size={195} level="L"/>
                            </Box>
                            <Typography sx={{ gridColumn: "3 / 6", pl: 2, borderLeft: 1, borderWeight: 4 }} variant="h6">Nama:</Typography>
                            <Typography sx={{ gridColumn: "6 / 10", borderLeft: 1, borderBottom: 1, borderWidth: 2, px: 2, backgroundColor: "rgb(200, 200, 200)" }} variant="h5">{data.NamaAlat}</Typography>
                            <Typography sx={{ gridColumn: "3 / 6", pl: 2, borderLeft: 1, borderWeight: 4 }} variant="h6">No kontrol:</Typography>
                            <Typography sx={{ gridColumn: "6 / 10", borderLeft: 1, borderBottom: 1, borderWidth: 2, px: 2, backgroundColor: "rgb(200, 200, 200)" }} variant="h5">{data.NoKontrol}</Typography>
                            <Typography sx={{ gridColumn: "3 / 6", pl: 2, borderLeft: 1, borderWeight: 4 }} variant="h6">Lokasi:</Typography>
                            <Typography sx={{ gridColumn: "6 / 10", borderLeft: 1, borderBottom: 1, borderWidth: 2, px: 2, backgroundColor: "rgb(200, 200, 200)" }} variant="h5">{data.Lokasi}</Typography>
                            <Typography sx={{ gridColumn: "3 / 6", pl: 2, borderLeft: 1, borderWeight: 4 }} variant="h6">Tanggal kalibrasi:</Typography>
                            <Typography sx={{ gridColumn: "6 / 10", borderLeft: 1, borderBottom: 1, borderWidth: 2, px: 2, backgroundColor: "rgb(200, 200, 200)" }} variant="h5">{data.TglKalkual}</Typography>
                            <Typography sx={{ gridColumn: "3 / 6", pl: 2, borderLeft: 1, borderWeight: 4 }} variant="h6">ED kalibrasi:</Typography>
                            <Typography sx={{ gridColumn: "6 / 10", borderLeft: 1, borderBottom: 1, borderWidth: 2, px: 2, backgroundColor: "rgb(200, 200, 200)" }} variant="h5">{data.EDKalkual}</Typography>
                            <Typography sx={{ gridColumn: "3 / 6", pl: 2, borderLeft: 1, borderWeight: 4 }} variant="h6">Approved ({data.TglApprove}) by:</Typography>
                            <Typography sx={{ gridColumn: "6 / 10", borderLeft: 1, borderWidth: 2, px: 2, backgroundColor: "rgb(200, 200, 200)" }} variant="h5">{data.Approver}</Typography>
                        </Box>
                    </Box>
                    <Box display="flex" width={0.8} backgroundColor="white" justifyContent="center" alignItems="center" sx={{ 
                        pt: "2vh",  
                        border: 1,
                        borderColor: "rgba(0, 0, 0, 1)", 
                        borderWidth: 4
                    }}>
                        <Typography variant="h5">Request</Typography>
                    </Box>
                    {/* <Barcode width={0.6} height={80} displayValue="true" value={data ? (data.RequestID).toString() : ""} /> */}
                    
                </Box>
            </div>
        </ThemeProvider>
    )
})

export default BarcodeKalibrasi;