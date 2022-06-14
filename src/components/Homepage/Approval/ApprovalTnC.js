import { Box, TextField, MenuItem, Button } from "@mui/material";

import Navbar from "../../Layout/Navbar";
import styles from "./ApprovalTnC.module.css";

const ApprovalTnC = () => {
    return (
        <div>
            <Navbar>
                <section className={styles.card}>
                    <h3>Verifikasi Timbangan</h3>
                    <Box sx={{'& .MuiTextField-root': { m: 1, width: '50ch' }}}>
                        <div><TextField id="namaAlat" label="Nama Alat" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="status" label="Status Kalkual" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="noKontrol" label="No Kontrol" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><br /></div>
                        <div><TextField id="spekVerif" label="Spek Verifikasi" size="small"/></div>
                        <div><br /></div>
                        <div><b>Hasil</b></div>
                        <div><TextField id="zeroCheck" label="Zero Check" size="small"/></div>
                        <div><TextField id="hasil" label="Hasil Pengukuran" size="small"/></div>
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                                <Button variant="contained" color="success">Approve</Button>
                        </Box>
                    </Box>
                </section>
            </Navbar>
        </div>
    )
}

export default ApprovalTnC;