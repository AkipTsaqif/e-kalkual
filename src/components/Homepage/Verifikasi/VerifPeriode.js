import { Box, TextField, MenuItem, Button, Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Navbar from "../../Layout/Navbar";
import styles from "./VerifPeriode.module.css";

const VerifPeriode = () => {
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

    return (
        <div>
            <Navbar>
                <ThemeProvider theme={theme}>
                    <Box display="flex" width={0.6} justifyContent="center" alignItems="center" sx={{ m: "auto auto", pt: "2vh", pb: "2vh", backgroundColor: "rgba(0, 0, 0, 0.8)", borderRadius: 3, borderTop: 1, borderBottom: 1, borderColor: "rgba(220, 220, 220, 0.8)", borderWidth: 2}}>
                        <Typography variant="h5">Ubah Periode Verifikasi</Typography>
                    </Box>
                    <Box sx={{
                        backgroundColor: 'rgba(230, 233, 233, 0.99)',
                        mx: 'auto',
                        width: 0.5,
                        height: 'auto',
                        px: 5,
                        pb: 2,
                        borderRadius: 2,
                        '& .MuiTextField-root': { m: 2 },
                        '& .MuiTypography-root.MuiTypography-body1': { fontWeight: "bold" }
                    }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: "center"}}>
                            <Typography variant="h6">Periode verifikasi:</Typography>
                            <TextField sx={{ gridColumn: "span 2" }} disabled type="number" id="periode" label="Periode verifikasi" size="small" InputProps={{
                                endAdornment: <InputAdornment position="end" >jam</InputAdornment>
                            }}/>
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" color="success">Save</Button>
                                <Button variant="outlined">Edit</Button>
                                <Button variant="outlined">Cancel</Button>
                            </Stack>
                        </Box>
                    </Box>
                </ThemeProvider>
            </Navbar>
        </div>
    )
}

export default VerifPeriode;