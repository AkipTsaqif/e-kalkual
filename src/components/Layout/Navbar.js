import styles from "./Navbar.module.css";
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { Button, Toolbar } from "@mui/material";

import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

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

    const [isHome, setIsHome] = useState(loc.pathname === '/home' ? true : false);
    const [menuRequest, setMenuRequest] = React.useState(false);
    const [menuVerifikasi, setMenuVerifikasi] = React.useState(false);

    const reqSubmenuHandler = () => {
        setMenuRequest(!menuRequest);
    }

    const verifSubmenuHandler = () => {
        setMenuVerifikasi(!menuVerifikasi);
    }

    return (
        <div className={styles.background}>
            <header className={styles.header}>
                <div className={styles.logo}>E-Kalkual</div>
                <nav>
                    <ul>
                        {isHome ? <div></div> : <Button variant="text" onClick={() => navigate(-1)}>Back</Button>}
                        <Button variant="text" onClick={() => {
                            dispatch(authActions.logout());
                        }}>Logout</Button>
                    </ul>
                </nav>
            </header>
            
            <Box sx={{display: 'flex'}}>
                <AppBar position='absolute' sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                    <Drawer variant='permanent' sx={{width: '5vw', flexShrink: 0, [`& .MuiDrawer-paper`]: {width: 250, boxSizing: 'border-box', backgroundColor: "rgba(0, 0, 0, 0.8)"} }}>
                        <Box sx={{  }}>
                            <List>
                                <ListItemButton>
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
                                        <ListItemButton sx={{ pl: 7 }}>
                                            <ListItemIcon style={{minWidth: '40px', color: "white"}}>
                                                <BuildIcon style={{fontSize: 18}}/>
                                            </ListItemIcon>
                                            <ListItemText primary="Kalibrasi" primaryTypographyProps={{
                                                fontSize: 18,
                                                color: "white",
                                                letterSpacing: 0,
                                            }}/>
                                        </ListItemButton>
                                        <ListItemButton sx={{ pl: 7 }}>
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
                                        <ListItemButton sx={{ pl: 7 }}>
                                            <ListItemIcon style={{minWidth: '40px', color: "white"}}>
                                                <EventRepeatIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Periode Verifikasi" primaryTypographyProps={{
                                                fontSize: 20,
                                                color: "white",
                                                letterSpacing: 0,
                                            }}/>
                                        </ListItemButton>
                                        <ListItemButton sx={{ pl: 7 }}>
                                            <ListItemIcon style={{minWidth: '40px', color: "white"}}>
                                                <ScaleIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Verifikasi Timbangan" primaryTypographyProps={{
                                                fontSize: 20,
                                                color: "white",
                                                letterSpacing: 0,
                                            }}/>
                                        </ListItemButton>
                                        <ListItemButton sx={{ pl: 7 }}>
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
                    </Drawer>
                </AppBar>
            </Box>
            <section>{props.children}</section>
        </div>
    )
}

export default Navbar