import { TextField, Box, Button } from "@mui/material";
import Navbar from "../../Layout/Navbar";
import Stack from '@mui/material/Stack';
import styles from "./ApprovalUser.module.css";

const ApprovalUser = () => {
    return (
        <div className={styles.card}>
            <Navbar>
                <section className={styles.card}>
                    <h3>Approve Kalkual User</h3>
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

export default ApprovalUser;