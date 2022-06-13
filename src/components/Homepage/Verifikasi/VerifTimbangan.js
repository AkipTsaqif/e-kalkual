import { Box, TextField, MenuItem, Button } from "@mui/material";
import Stack from '@mui/material/Stack';

import Navbar from "../../Layout/Navbar";
import styles from "./VerifTimbangan.module.css";

const VerifTimbangan = () => {
    return (
        <div>
            <Navbar>
                <section className={styles.auth}>
                    <h3>Verifikasi Timbangan</h3>
                    <Box sx={{'& .MuiTextField-root': { m: 1, width: '50ch' }}}>
                        <div><TextField id="namaAlat" label="Nama Alat" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="status" label="Status Kalkual" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="noKontrol" label="No Kontrol" size="small" InputProps={{ readOnly: true }}/></div>
                        <div></div>
                        <div><TextField id="spekVerif" label="Spek Verifikasi" size="small"/></div>
                        <div></div>
                        <div><TextField id="nama" label="Tahun Pembelian" size="small"/></div>
                        <div><TextField id="nama" label="Departemen Pemilik" size="small"/></div>
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained">New</Button>
                                <Button variant="contained" color="success">Save</Button>
                                <Button variant="outlined">Clear</Button>
                            </Stack>
                        </Box>
                    </Box>
                </section>
            </Navbar>
        </div>
    )
}

export default VerifTimbangan;