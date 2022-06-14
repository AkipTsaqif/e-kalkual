import { Box, TextField, MenuItem, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Stack from '@mui/material/Stack';
import { useState, useEffect } from "react";

import Navbar from "../../Layout/Navbar";
import styles from "./ApprovalLaporan.module.css";

const ApprovalLaporan = () => {
    return (
        <div>
            <Navbar>
                <section className={styles.card}>
                    <h3>Form Approval Laporan Kalkual</h3>
                </section>

                    <Box sx={{
                        backgroundColor: 'background.paper',
                        ml: 'auto',
                        mr: 'auto',
                        maxWidth: '35rem',
                        height: 'auto',
                        pl: '3.5rem',
                        pt: '2rem',
                        '& .MuiTextField-root': { m: 1, width: '30rem' }
                    }}>
                        <div><TextField id="userID" label="User ID" size="small"/></div>
                        <div><TextField id="noIN" label="No IN" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="tipe" label="Tipe Kalkual" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="nama" label="Nama Alat/Mesin/Sistem Penunjang" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="noKontrol" label="No Kontrol" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="departemen" label="Departemen Pemilik" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="lokasi" label="Lokasi" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="nama" label="Tgl Kalibrasi/Kualifikasi" size="small"/></div>
                        <div><TextField id="nama" label="ED Kalibrasi/Kualifikasi" size="small" InputProps={{ readOnly: true }}/></div>
                        <div><TextField id="nama" label="Jenis Kalibrasi" size="small" InputProps={{ readOnly: true }}/></div>
                        <Button variant="outlined" component="label">Upload File<input type="file" hidden />
                        <Button variant="contained" color="success">Save</Button>
                        </Button>
                        <div><TextField id="vendor" label="Vendor" size="small"/></div>
                        <div><TextField id="biaya" label="Biaya" size="small"/></div>
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                            <Stack direction="row" spacing={2}>
                                <Button variant="outlined">Cancel</Button>
                                <Button variant="contained" endIcon={<SendIcon />}>Submit ke Approval</Button>
                            </Stack>
                        </Box>
                    </Box>
                
            </Navbar>
        </div>
    )
}

export default ApprovalLaporan;