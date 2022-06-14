import { TextField, Box, Button, MenuItem } from "@mui/material";
import { useState } from "react";
import Navbar from "../../Layout/Navbar";
import Stack from '@mui/material/Stack';
import styles from "./ApprovalQA.module.css";

const tipeKalibrasi = [
    {
        value: "AMR",
        label: "Alat/mesin/sistem penunjang rusak"
    },
    {
        value: "AMPP",
        label: "Alat/mesin/sistem penunjang perlu perbaikan"
    },
    {
        value: "AMK",
        label: "Alat/mesin/sistem penjunjang perlu dikalibrasi/kualifikasi"
    }
]

const ApprovalQA = () => {
    const [justifikasi, setJustifikasi] = useState("");

    const justifikasiChangeHandler = (e) => {
        setJustifikasi(e.target.value);
    }

    return (
        <div className={styles.card}>
            <Navbar>
                <section className={styles.card}>
                    <h3>Approve Kalkual QA</h3>
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
                    <TextField id="remarks" label="Remarks" multiline rows={5}/>
                    <TextField
                        id="tipe"
                        select
                        label="Pilih Justifikasi"
                        value={justifikasi}
                        onChange={justifikasiChangeHandler}
                        variant="outlined"
                    >
                    {tipeKalibrasi.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                    <TextField id="endDate" label="End date"/>
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                        <Stack direction="row" spacing={25}>
                            <Button variant="contained" color="success">Approve</Button>
                            <Button variant="outlined">Cancel</Button>
                        </Stack>
                    </Box>
                </Box>
            </Navbar>
        </div>
    )
}

export default ApprovalQA;