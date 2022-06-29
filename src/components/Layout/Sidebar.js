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
import Navbar from './Navbar';

const Sidebar = () => {
    const [menuRequest, setMenuRequest] = React.useState(false);
    const [menuVerifikasi, setMenuVerifikasi] = React.useState(false);

    const reqSubmenuHandler = () => {
        setMenuRequest(!menuRequest);
    }

    const verifSubmenuHandler = () => {
        setMenuVerifikasi(!menuVerifikasi);
    }

    return (
        <Navbar>
            
        </Navbar>
    )   
}

export default Sidebar;