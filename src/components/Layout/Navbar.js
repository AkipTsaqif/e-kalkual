import styles from "./Navbar.module.css";
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { Button, Toolbar, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { toast } from "react-toastify";

import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';

import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import ScaleIcon from '@mui/icons-material/Scale';
import BuildIcon from '@mui/icons-material/Build';
import EngineeringIcon from '@mui/icons-material/Engineering';

const Navbar = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loc = useLocation();
    const auth = useSelector(state => state.persistedReducer.auth);

    const [isHome, setIsHome] = useState(loc.pathname === '/home' ? true : false);
    const [menuRequest, setMenuRequest] = React.useState(false);
    const [menuVerifikasi, setMenuVerifikasi] = React.useState(false);

    var str = auth.user.split(" ");
    var strArr = str[0] + " " + str[str.length - 1];
    var matches = strArr.match(/\b(\w)/g);
    var acronym = matches.join('');

    const theme = createTheme({
        typography: {
            h6: {
                fontWeight: "bold",
                color: "white",
                letterSpacing: 0
            }
        }
    });

    const reqSubmenuHandler = () => {
        setMenuRequest(!menuRequest);
    }

    const verifSubmenuHandler = () => {
        setMenuVerifikasi(!menuVerifikasi);
    }

    return (
        <Box className={styles.background} display="flex" flexDirection="column" sx={{ minHeight: "100vh", maxWidth: "100vw" }}>
            <Box position="fixed" minWidth="100vw" zIndex={1} sx={{ borderBottom: 1, borderBottomColor: "rgba(220, 220, 220, 0.8)", borderBottomWidth: 2}}>
                <header className={styles.header}>
                    <div className={styles.logo}>E-Kalkual</div>
                    <nav>
                        <ul>
                            {isHome ? <div></div> : <Button variant="text" onClick={() => navigate(-1)}>Back</Button>}
                            <Button variant="text" onClick={() => {
                                dispatch(authActions.logout());
                                navigate("/");
                                toast.success("Berhasil log out!", {
                                    position: "top-center",
                                    autoClose: 2000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined
                                });
                            }}>Logout</Button>
                        </ul>
                    </nav>
                </header>
            </Box>
            <Box flex={1} display="flex">
                <Box position="fixed" display="flex" flexDirection="column" zIndex={1} top={48} minHeight="100vh" sx={{backgroundColor: "rgba(0,0,0,0.8)", minWidth: 240, maxWidth: 240, borderRight: 1, borderRightWidth: 2, borderColor: "rgba(220, 220, 220, 0.8)"}}>
                    <Box>
                        <Divider light={true} variant="fullWidth" sx={{ bgcolor: "rgba(220, 220, 220, 0.8)", borderBottomWidth: 2 }}/>
                        <ThemeProvider theme={theme}>
                            <Typography variant="h6" sx={{ ml: 4, mt: 2, mb: -1 }}>Selamat datang,</Typography>
                            <CardHeader avatar={
                                <Avatar sx={{ bgcolor: "gray" }}>
                                    <Typography>{acronym}</Typography>
                                </Avatar>
                            } title={<Typography variant="h6" sx={{ wordWrap: "break-word" }}>{strArr}</Typography>}/>   
                        </ThemeProvider>
                        <Divider light={true} variant="fullWidth" sx={{ bgcolor: "rgba(220, 220, 220, 0.8)", borderBottomWidth: 2 }}/>
                    </Box>
                    <Box>
                        <List sx={{
                            maxHeight: '70vh', 
                            overflowY: 'auto', 
                            '&::-webkit-scrollbar': { 
                                width: '0.3em' 
                            }, 
                            '&::-webkit-scrollbar-track': { 
                                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: 'rgba(220, 220, 220, 0.4)',
                                outline: '1px solid slategrey',
                                borderRadius: 2
                            }}} >
                            <ListItemButton onClick={() => navigate("/home")}>
                                <ListItemIcon style={{minWidth: '40px', color: "white"}}>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary='Home' primaryTypographyProps={{
                                    fontSize: 20,
                                    color: "white",
                                    letterSpacing: 0,
                                }}/>
                            </ListItemButton>
                            <ListItemButton onClick={() => navigate("/dashboard")}>
                                <ListItemIcon style={{minWidth: '40px', color: "white"}}>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary='Dashboard' primaryTypographyProps={{
                                    fontSize: 20,
                                    color: "white",
                                    letterSpacing: 0,
                                }}/>
                            </ListItemButton>
                            <ListItemButton onClick={reqSubmenuHandler}>
                                <ListItemIcon style={{minWidth: '40px', color: "white"}}>
                                    <RequestQuoteIcon />
                                </ListItemIcon>
                                <ListItemText primary='Request' primaryTypographyProps={{
                                    fontSize: 20,
                                    color: "white",
                                    letterSpacing: 0,
                                }}/>
                                {menuRequest ? <ExpandLess style={{color: "white"}}/> : <ExpandMore style={{color: "white"}}/>}
                            </ListItemButton>
                            <Collapse in={menuRequest} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton onClick={() => navigate("/request/new", {state: {kalibrasi: true}})} sx={{ pl: 7 }}>
                                        <ListItemIcon style={{minWidth: '40px', color: "white"}}>
                                            <BuildIcon style={{fontSize: 18}}/>
                                        </ListItemIcon>
                                        <ListItemText primary="Kalibrasi" primaryTypographyProps={{
                                            fontSize: 18,
                                            color: "white",
                                            letterSpacing: 0,
                                        }}/>
                                    </ListItemButton>
                                    <ListItemButton onClick={() => navigate("/request/new", {state: {kalibrasi: false}})} sx={{ pl: 7 }}>
                                        <ListItemIcon style={{minWidth: '40px', color: "white"}}>
                                            <EngineeringIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Kualifikasi" primaryTypographyProps={{
                                            fontSize: 20,
                                            color: "white",
                                            letterSpacing: 0,
                                        }}/>
                                    </ListItemButton>
                                </List>
                            </Collapse>
                            <ListItemButton onClick={verifSubmenuHandler}>
                                <ListItemIcon style={{minWidth: '40px', color: "white"}}>
                                    <AssignmentTurnedInIcon />
                                </ListItemIcon>
                                <ListItemText primary='Verifikasi' primaryTypographyProps={{
                                    fontSize: 20,
                                    color: "white",
                                    letterSpacing: 0,
                                }}/>
                                {menuVerifikasi ? <ExpandLess style={{color: "white"}}/> : <ExpandMore style={{color: "white"}}/>}
                            </ListItemButton>
                            <Collapse in={menuVerifikasi} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton onClick={() => {navigate("/verifikasi/periode")}} sx={{ pl: 7 }}>
                                        <ListItemIcon style={{minWidth: '40px', color: "white"}}>
                                            <EventRepeatIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Periode Verifikasi" primaryTypographyProps={{
                                            fontSize: 20,
                                            color: "white",
                                            letterSpacing: 0,
                                        }}/>
                                    </ListItemButton>
                                    <ListItemButton onClick={() => {navigate("/verifikasi/timbangan", {state: {tipe: "timbangan"}})}} sx={{ pl: 7 }}>
                                        <ListItemIcon style={{minWidth: '40px', color: "white"}}>
                                            <ScaleIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Verifikasi Timbangan" primaryTypographyProps={{
                                            fontSize: 20,
                                            color: "white",
                                            letterSpacing: 0,
                                        }}/>
                                    </ListItemButton>
                                    <ListItemButton onClick={() => {navigate("/verifikasi/timbangan", {state: {tipe: "checkweigher"}})}} sx={{ pl: 7 }}>
                                        <ListItemIcon style={{minWidth: '40px', color: "white"}}>
                                            <ScaleIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Verifikasi Checkweigher" primaryTypographyProps={{
                                            fontSize: 20,
                                            color: "white",
                                            letterSpacing: 0,
                                        }}/>
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </List>
                    </Box>
                </Box>
                <Box flex={1} paddingLeft={30} marginTop={6} overflow="auto">
                    <section>{props.children}</section>
                </Box>
            </Box>
        </Box>
    )
}

export default Navbar