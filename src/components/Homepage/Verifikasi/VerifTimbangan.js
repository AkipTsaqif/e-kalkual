import { Box, TextField, MenuItem, Button, Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../../Layout/Navbar";
import styles from "./VerifTimbangan.module.css";

const VerifTimbangan = () => {
    const location = useLocation();

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
        <div>
            <Navbar>
                <ThemeProvider theme={theme}>
                    <Box display="flex" width={0.6} justifyContent="center" alignItems="center" sx={{ m: "auto auto", pt: "2vh", pb: "2vh", backgroundColor: "rgba(0, 0, 0, 0.8)", borderRadius: 3, borderTop: 1, borderBottom: 1, borderColor: "rgba(220, 220, 220, 0.8)", borderWidth: 2}}>
                        {location.state.tipe == "timbangan"
                            ? <Typography variant="h5">Verifikasi Timbangan</Typography>
                            : <Typography variant="h5">Verifikasi Checkweigher</Typography>}
                    </Box>
                    <Box sx={{
                        backgroundColor: 'rgba(230, 233, 233, 0.99)',
                        mx: 'auto',
                        width: 0.5,
                        height: 'auto',
                        px: 5,
                        pb: 2,
                        borderRadius: 2,
                        '& .MuiTextField-root': { m: 1 },
                    }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: "center"}}>
                            <Typography variant="h6">Nama alat:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} id="namaAlat" label="Nama alat" size="small" InputProps={{ readOnly: true }}/>
                            <Typography variant="h6">Status kalkual:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} id="status" label="Status kalkual" size="small" InputProps={{ readOnly: true }}/>
                            <Typography variant="h6">No Kontrol:</Typography>
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
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained">New</Button>
                                <Button variant="contained" color="success">Save</Button>
                                <Button variant="outlined">Clear</Button>
                            </Stack>
                        </Box>
                    </Box>
                </ThemeProvider>
            </Navbar>
        </div>
    )
}

export default VerifTimbangan;