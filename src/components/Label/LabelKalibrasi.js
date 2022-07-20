import { Box, TextField, Button, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

import Navbar from "../Layout/Navbar";

const LabelKalibrasi = () => {
    const navigate = useNavigate();
    const data = useSelector(state => state.persistedReducer.label);

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
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    text: {
                        color: "black",
                        fontWeight: "bold", 
                        fontFamily: "Arial", 
                        fontSize: "1.5rem", 
                        letterSpacing: "0.01rem"
                    }
                }
            }
        }
    });

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
                    <Box display="flex" backgroundColor="white" width={0.95} justifyContent="center" alignItems="center" sx={{ 
                        pt: "2vh", 
                        pb: "2vh", 
                        borderTop: 1, borderLeft: 1, borderRight: 1,
                        borderColor: "rgba(0, 0, 0, 1)", 
                        borderWidth: 4
                    }}>
                        <Typography variant="h4">SUDAH DIKALIBRASI</Typography>
                    </Box>
                    <Box width={0.95} backgroundColor="white" sx={{
                        height: 'auto',
                        borderTop: 1, borderLeft: 1, borderRight: 1,
                        borderColor: "rgba(0, 0, 0, 1)", 
                        borderWidth: 4,
                        '& .MuiTextField-root': { m: 0 },
                        '& .MuiTypography-root.MuiTypography-body1': { fontWeight: "bold" }
                    }}>
                        <Box sx={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(7, 1fr)', 
                            gridTemplateAreas: `"text text text value value value value"
                            "text text text value value value value"
                            "text text text value value value value"
                            "text text text value value value value"
                            "text text text value value value value"
                            "text text text value value value value"`, 
                            alignItems: "center"}}>
                            {/* <Box sx={{ gridArea: 'qr', borderRight: 1, borderWeight: 4 }}>
                                <QRCodeSVG includeMargin="true" value={data ? data.RequestID + "-" + data.NoKontrol : ""} size={195} level="L"/>
                            </Box> */}
                            <Typography sx={{ gridColumn: "1 / 4", pl: 2 }} variant="h6">Nama:</Typography>
                            <Typography sx={{ gridColumn: "4 / 8", borderLeft: 1, borderBottom: 1, borderWidth: 2, px: 2, backgroundColor: "rgb(200, 200, 200)" }} variant="h5">{data.NamaAlat}</Typography>
                            <Typography sx={{ gridColumn: "1 / 4", pl: 2 }} variant="h6">No kontrol:</Typography>
                            <Typography sx={{ gridColumn: "4 / 8", borderLeft: 1, borderBottom: 1, borderWidth: 2, px: 2, backgroundColor: "rgb(200, 200, 200)" }} variant="h5">{data.NoKontrol}</Typography>
                            <Typography sx={{ gridColumn: "1 / 4", pl: 2 }} variant="h6">Lokasi:</Typography>
                            <Typography sx={{ gridColumn: "4 / 8", borderLeft: 1, borderBottom: 1, borderWidth: 2, px: 2, backgroundColor: "rgb(200, 200, 200)" }} variant="h5">{data.Lokasi}</Typography>
                            <Typography sx={{ gridColumn: "1 / 4", pl: 2 }} variant="h6">Tanggal kalibrasi:</Typography>
                            <Typography sx={{ gridColumn: "4 / 8", borderLeft: 1, borderBottom: 1, borderWidth: 2, px: 2, backgroundColor: "rgb(200, 200, 200)" }} variant="h5">{format(parseISO(data.TglKalkual), "dd-MM-yyyy")}</Typography>
                            <Typography sx={{ gridColumn: "1 / 4", pl: 2 }} variant="h6">ED kalibrasi:</Typography>
                            <Typography sx={{ gridColumn: "4 / 8", borderLeft: 1, borderBottom: 1, borderWidth: 2, px: 2, backgroundColor: "rgb(200, 200, 200)" }} variant="h5">{format(parseISO(data.EDKalkual), "dd-MM-yyyy")}</Typography>
                            <Typography sx={{ gridColumn: "1 / 4", pl: 2 }} variant="h6">Approved ({!!data.TglApprove ? data.TglApprove : "-"}) by:</Typography>
                            <Typography sx={{ gridColumn: "4 / 8", borderLeft: 1, borderWidth: 2, px: 2, backgroundColor: "rgb(200, 200, 200)" }} variant="h5">{!!data.Approver ? data.Approver : "-"}</Typography>
                        </Box>
                    </Box>
                    <Box display="flex" width={0.95} backgroundColor="white" justifyContent="center" alignItems="center" sx={{ 
                        pt: "2vh",  
                        border: 1,
                        borderColor: "rgba(0, 0, 0, 1)", 
                        borderWidth: 4
                    }}>
                        <Button variant="text" size="large" onClick={() => navigate("/request/user")}>Request</Button>
                    </Box>
                </Box>
            </ThemeProvider>
        </Navbar>
    )
}

export default LabelKalibrasi;