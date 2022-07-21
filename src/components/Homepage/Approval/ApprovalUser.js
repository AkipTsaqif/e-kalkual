import { TextField, Box, Button, MenuItem, Typography, Modal, Fade, Backdrop, Divider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { approvalKalkualActions } from '../../../store/approval-kalkual';

import LoadingButton from '@mui/lab/LoadingButton'
import axios from "axios";
import Navbar from "../../Layout/Navbar";
import Stack from '@mui/material/Stack';
import SendIcon from "@mui/icons-material/Send";

const ApprovalUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.persistedReducer.auth.user);
    const data = useSelector(state => state.persistedReducer.approvalKalkual);

    const [modalStatus, setModalStatus] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    const usernameRef = useRef();
    const passwordRef = useRef();
    const remarksRef = useRef();

    const theme = createTheme({
        typography: {
            h4: {
                fontWeight: "bold",
                color: "white",
                letterSpacing: 0,
                textAlign: "center"
            },
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
                color: "white",
                letterSpacing: 0,
                fontSize: 16
            }
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        backgroundColor: "rgba(230, 233, 233, 0.95)"
                    }
                }
            }
        }
    });

    const reloginHandler = async () => {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        setIsFetching(true);
        const response = await axios.post("https://localhost:44375/api/auth", {
            UserAD: username,
            Password: password
        }).then(res => {
            if (res.data !== null) {
                if (res.data[0].Username === user) approveHandler(1);
                else 
                    toast.error("Anda tidak memiliki akses untuk melakukan hal ini. Silahkan kontak tim IT.", {
                        position: "top-center",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        onOpen: () => setIsFetching(false)
                    })
            } else if (res.data === null) {
                toast.error("Data yang dimasukkan salah. Harap periksa kembali.", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onOpen: () => setIsFetching(false)
                })
            }
        });
    }

    const approveHandler = async (status) => {
        if (status == 1) {
            const response = await axios.post("https://localhost:44375/api/kalkual", {
                Option: "Approve User",
                NoIN: data.NoIN,
                Remarks: remarksRef.current.value
            }).then((res) => {
                toast.success("Kalkual berhasil di approve!", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onOpen: () => setIsFetching(false),
                    onClose: navigate("/home")
                });
                console.log(res);
            }).catch(e => toast.error("Terdapat kendala dengan server, silahkan coba kembali", {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onOpen: () => setIsFetching(false)
            }))
        }
    }

    const handleOpen = (e) => {
        e.preventDefault();
        setModalStatus(true)
    };
    const handleClose = () => setModalStatus(false);

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
                        <Typography variant="h5">Approve Kalkual User</Typography>
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
                        <form onSubmit={handleOpen}>
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignItems: "center"}}>
                                <Typography variant="h6">Remarks:</Typography>
                                <TextField sx={{ mt: "3vh", gridColumn: "span 2" }} inputRef={remarksRef} id="remarks" label="Remarks" multiline rows={5}/>
                                <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2, gridColumn: "span 3" }}>
                                    <Stack direction="row" spacing={8}>
                                        <LoadingButton loading={modalStatus} loadingPosition="end" disabled={modalStatus} variant="contained" color="success" type="submit">Approve</LoadingButton>
                                        <Button disabled={modalStatus} variant="outlined" onClick={() => {
                                                dispatch(approvalKalkualActions.cancelApproval());
                                                navigate("/home");
                                            }}>Cancel</Button>
                                    </Stack>
                                </Box>
                            </Box>
                        </form>
                    </Box>
                </Box>
                <Modal open={modalStatus} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
                    <Fade in={modalStatus}>
                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ 
                            m: "auto auto", 
                            boxShadow: "0 1 4 rgba(0, 0, 0, 0.2)",
                            minHeight: "100vh"
                        }}>
                            <Box width="35vw" margin="auto auto" textAlign="center" sx={{ 
                                backgroundColor: "rgba(0, 0, 0, 0.8)", 
                                borderRadius: 3, 
                                border: 1,
                                borderColor: "rgba(220, 220, 220, 0.8)", 
                                borderWidth: 3,
                                boxShadow: 20
                            }} >
                                <Box marginTop="2vh"/>
                                <Typography variant="h4">Konfirmasi approval</Typography>
                                <Box marginTop="2vh" />
                                <Divider light={true} variant="fullWidth" sx={{ bgcolor: "rgba(220, 220, 220, 0.8)", borderBottomWidth: 2 }}/>
                                <Box marginBottom="2vh" />
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    reloginHandler()
                                }}>
                                    <Box marginBottom="2vh">
                                        <Typography htmlFor="username" variant="body2">Username</Typography>
                                        <TextField sx={{ width: "25vw" }} fullWidth type="text" id="username" inputRef={usernameRef} size="small"/>
                                    </Box>
                                    <Box marginBottom="3vh">
                                        <Typography htmlFor="password" variant="body2">Password</Typography>
                                        <TextField sx={{ width: "25vw" }} type="password" id="password" inputRef={passwordRef} size="small"/>
                                    </Box>
                                    <Box marginBottom="2vh">
                                        <LoadingButton loading={isFetching} loadingPosition="end" disabled={isFetching} type="submit" variant="contained" endIcon={<SendIcon />}>Konfirmasi</LoadingButton>
                                    </Box>
                                </form>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </ThemeProvider>
        </Navbar>
    )
}

export default ApprovalUser;