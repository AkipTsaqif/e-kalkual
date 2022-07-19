import React, { useRef, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { toast } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from "@mui/icons-material/Send";

import axios from "axios";
import styles from "./Login.module.css";

const Login = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [uname, setUname] = useState("");
    const [token, setToken] = useState("");
    const [expiry, setExpiry] = useState("");
    const [isFetching, setIsFetching] = useState(false);

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
            body1: {
                fontWeight: "bold",
                color: "white",
                letterSpacing: 0
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
        },
        palette: {
            action: {
                disabledBackground: "rgb(210, 210, 210)"
            }
        }
    });

    const fetchUser = useCallback(async (username, password) => {
        setIsFetching(true);
        const response = await axios.post("https://localhost:44375/api/auth", {
                UserAD: username,
                Password: password
            }).then(res => {
                setIsFetching(false);
                if (res.data === null) toast.error("Password tidak benar!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                })
                else if (res.data[0].hasOwnProperty('Status')) {
                    toast.error("Username tidak terdaftar di dalam sistem! Silahkan menghubungi tim IT.", {
                        position: "top-center",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                    })
                }
                else {
                    setUname(res.data[0].Username);
                    setToken(res.data[0].Token);
                    setExpiry(res.data[0].ExpiresIn);
                }
            }).catch(e => {
                console.log(e);
            });
    }, []);

    useEffect(() => {
        if (uname) {
            dispatch(authActions.login({
                Username: uname,
                Token: token,
                ExpiresIn: expiry
            }));
            toast.success("Berhasil masuk sebagai    " + '\n' + uname, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            navigate("/home");
        }
    }, [uname])

    const submitHandler = () => { 
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        fetchUser(username, password);
    }

    return (
        <ThemeProvider theme={theme}>
            <Box className={styles.background} display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ 
                // background: styles.background,
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
                    <Typography variant="h4">Login</Typography>
                    <Box marginTop="2vh" />
                    <Divider light={true} variant="fullWidth" sx={{ bgcolor: "rgba(220, 220, 220, 0.8)", borderBottomWidth: 2 }}/>
                    <Box marginBottom="2vh" />
                    <form onSubmit={e => {
                        e.preventDefault();
                        submitHandler()
                    }}>
                        <Box marginBottom="2vh">
                            <Typography htmlFor="username" variant="body1">Username</Typography>
                            <TextField sx={{ width: "25vw" }} fullWidth type="text" id="username" inputRef={usernameRef} size="small"/>
                        </Box>
                        <Box marginBottom="3vh">
                            <Typography htmlFor="password" variant="body1">Password</Typography>
                            <TextField sx={{ width: "25vw" }} type="password" id="password" inputRef={passwordRef} size="small"/>
                        </Box>
                        <Box marginBottom="2vh">
                            <LoadingButton loading={isFetching} loadingPosition="end" type="submit" variant="contained" endIcon={<SendIcon />} disabled={isFetching}>Login</LoadingButton>
                        </Box>
                    </form>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default Login;