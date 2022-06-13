import { Box, TextField, MenuItem, Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';

import Navbar from "../../Layout/Navbar";
import styles from "./VerifPeriode.module.css";

const VerifPeriode = () => {
    return (
        <div>
            <Navbar>
                <section className={styles.auth}>
                    <TextField id="periode" label="Periode verifikasi" size="small" InputProps={{
                        endAdornment: <InputAdornment position="end">jam</InputAdornment>
                    }}/>
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" color="success">Save</Button>
                            <Button variant="outlined">Edit</Button>
                            <Button variant="outlined">Cancel</Button>
                        </Stack>
                    </Box>
                </section>
            </Navbar>
        </div>
    )
}

export default VerifPeriode;