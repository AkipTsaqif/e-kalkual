import { Box, TextField, Button, Typography, Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Navbar from "../../Layout/Navbar";

const ApprovalTnC = () => {
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
                fontWeight: "bold",
                letterSpacing: 0,
                textAlign: "center",
                fontSize: 20
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
                    <Box display="flex" width={0.75} justifyContent="center" alignItems="center" sx={{ pt: "2vh", pb: "2vh", backgroundColor: "rgba(0, 0, 0, 0.8)", borderRadius: 3, borderTop: 1, borderBottom: 1, borderColor: "rgba(220, 220, 220, 0.8)", borderWidth: 2, boxShadow: 5}}>
                        <Typography variant="h5">Approve Hasil Timbangan/Checkweigher</Typography>
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
                            <Typography variant="h6">Nama alat:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} id="namaAlat" label="Nama alat" size="small" InputProps={{ readOnly: true }}/>
                            <Typography variant="h6">Status kalkual:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} id="status" label="Status kalkual" size="small" InputProps={{ readOnly: true }}/>
                            <Typography variant="h6">No kontrol:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} id="noKontrol" label="No kontrol" size="small" InputProps={{ readOnly: true }}/>
                            <Box sx={{ gridColumn: "span 3", mt: 4 }} />
                            <Typography variant="h6">Spek verifikasi:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} id="spekVerif" label="Spek verifikasi" size="small"/>
                            <Box sx={{ gridColumn: "span 3", mt: 4 }}/>
                            <Typography sx={{ gridColumn: "span 3" }} variant="body2">Hasil:</Typography>
                            <Typography variant="h6">Zero check:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} id="zeroCheck" label="Zero check" size="small"/>
                            <Typography variant="h6">Hasil pengukuran:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} id="hasil" label="Hasil pengukuran" size="small"/>
                            <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2, gridColumn: "span 3" }}>
                                <Stack direction="row" spacing={8}>
                                    <Button variant="contained" color="success">Approve</Button>
                                    <Button variant="contained" color="error">Cancel</Button>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </ThemeProvider>
        </Navbar>
    )
}

export default ApprovalTnC;