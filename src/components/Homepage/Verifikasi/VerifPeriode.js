import { Box, TextField, Button, Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

import Navbar from "../../Layout/Navbar";

const VerifPeriode = () => {
    const [lockPeriode, setLockPeriode] = useState(true);

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
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{
                        m: "auto auto", 
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        borderRadius: 3,
                        boxShadow: "0 1 4 rgba(0, 0, 0, 0.2)",
                        minHeight: `calc(100vh - 48px)`
                    }}>
                        <Box display="flex" width={0.6} justifyContent="center" alignItems="center" sx={{ 
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
                            boxShadow: 5,
                            '& .MuiTextField-root': { m: 2 },
                            '& .MuiTypography-root.MuiTypography-body1': { fontWeight: "bold" }
                        }}>
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: "center"}}>
                                <Typography variant="h6">Periode verifikasi:</Typography>
                                <TextField sx={{ gridColumn: "span 2" }} disabled={lockPeriode} type="number" id="periode" label="Periode verifikasi" size="small" InputProps={{
                                    endAdornment: <InputAdornment position="end" >jam</InputAdornment>
                                }}/>
                            </Box>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" color="success">Save</Button>
                                    <Button variant="outlined" onClick={() => setLockPeriode(false)}>Edit</Button>
                                    <Button variant="contained" color="error" onClick={() => setLockPeriode(true)}>Cancel</Button>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                </ThemeProvider>
            </Navbar>
        </div>
    )
}

export default VerifPeriode;