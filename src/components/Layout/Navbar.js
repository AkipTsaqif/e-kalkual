import styles from "./Navbar.module.css";
import { useEffect, useState, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { Button, Toolbar, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { toast } from "react-toastify";

import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";

import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import ScaleIcon from "@mui/icons-material/Scale";
import BuildIcon from "@mui/icons-material/Build";
import EngineeringIcon from "@mui/icons-material/Engineering";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const loc = useLocation();
	const auth = useSelector((state) => state.persistedReducer.auth);

	const [isHome, setIsHome] = useState(loc.pathname === "/home" ? true : false);
	const [menuDashboard, setMenuDashboard] = React.useState(false);
	const [menuRequest, setMenuRequest] = React.useState(false);
	const [menuVerifikasi, setMenuVerifikasi] = React.useState(false);
	const [isHidden, setIsHidden] = React.useState(true);

	var str = auth.user.split(" ");
	var strArr = str[0] + " " + str[str.length - 1];
	var matches = strArr.match(/\b(\w)/g);
	var acronym = matches.join("");

	const theme = createTheme({
		typography: {
			h5: {
				fontWeight: "bold",
				color: "white",
				letterSpacing: 0,
			},
			h6: {
				fontWeight: "bold",
				color: "white",
				letterSpacing: 0,
			},
		},
		// palette: {
		// 	white: {
		// 		main: "#fff",
		// 		contrastText: "#000",
		// 	},
		// },
	});

	const dashboardSubmenuHandler = () => {
		setMenuDashboard(!menuDashboard);
	};

	const reqSubmenuHandler = () => {
		setMenuRequest(!menuRequest);
	};

	const verifSubmenuHandler = () => {
		setMenuVerifikasi(!menuVerifikasi);
	};

	const hideSidebarHandler = () => {
		setIsHidden(!isHidden);
	};

	return (
		<ThemeProvider theme={theme}>
			<Box
				className={styles.background}
				display="flex"
				flexDirection="column"
				sx={{ minHeight: "100vh", maxWidth: "100vw" }}
			>
				<Box
					position="fixed"
					minWidth="100vw"
					zIndex={1}
					sx={{
						borderBottom: 1,
						borderBottomColor: "rgba(220, 220, 220, 0.8)",
						borderBottomWidth: 2,
						boxShadow: 5,
					}}
				>
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						position="sticky"
						margin="auto auto"
						width="auto"
						height="3rem"
						sx={{
							backgroundColor: "rgba(0, 0, 0, 0.8)",
							boxShadow: 4,
							pl: {
								lg: 1,
								xs: 1,
							},
							pr: {
								lg: 8,
								xs: 4,
							},
							"& .MuiButton-root": {
								font: "inherit",
								fontWeight: "bold",
								color: "white",
							},
						}}
					>
						<IconButton onClick={hideSidebarHandler}>
							<MenuIcon sx={{ color: "white" }} />
						</IconButton>
						<Typography sx={{ flex: 1, ml: 4 }} variant="h5">
							E-Kalkual
						</Typography>
						{isHome ? (
							<div></div>
						) : (
							<Button variant="text" sx={{ mr: 3 }} onClick={() => navigate("/home")}>
								Back
							</Button>
						)}
						<Button
							variant="text"
							onClick={() => {
								dispatch(authActions.logout());
								navigate("/");
								toast.success("Berhasil log out!", {
									position: "top-center",
									autoClose: 2000,
									hideProgressBar: false,
									closeOnClick: true,
									pauseOnHover: true,
									draggable: true,
									progress: undefined,
								});
							}}
						>
							Logout
						</Button>
					</Box>
				</Box>
				<Box flex={1} display="flex">
					<Slide in={isHidden} direction="right" appear={false}>
						<Box
							position="fixed"
							display="flex"
							flexDirection="column"
							zIndex={1}
							top={48}
							minHeight="100vh"
							sx={{
								backgroundColor: "rgba(0,0,0,0.8)",
								minWidth: 225,
								maxWidth: 225,
								borderRight: 1,
								borderRightWidth: 2,
								borderColor: "rgba(220, 220, 220, 0.8)",
								boxShadow: 5,
							}}
						>
							<Box>
								<Divider
									light={true}
									variant="fullWidth"
									sx={{ bgcolor: "rgba(220, 220, 220, 0.8)", borderBottomWidth: 2 }}
								/>
								<Typography variant="h6" sx={{ ml: 4, mt: 2, mb: -1 }}>
									Selamat datang,
								</Typography>
								<CardHeader
									avatar={
										<Avatar sx={{ bgcolor: auth.profileColor }}>
											<Typography>{acronym}</Typography>
										</Avatar>
									}
									title={
										<Typography variant="h6" sx={{ wordWrap: "break-word" }}>
											{strArr}
										</Typography>
									}
								/>
								<Divider
									light={true}
									variant="fullWidth"
									sx={{ bgcolor: "rgba(220, 220, 220, 0.8)", borderBottomWidth: 2 }}
								/>
							</Box>
							<Box>
								<List
									sx={{
										maxHeight: "70vh",
										overflowY: "auto",
										"&::-webkit-scrollbar": {
											width: "0.3em",
										},
										"&::-webkit-scrollbar-track": {
											boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
											webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
										},
										"&::-webkit-scrollbar-thumb": {
											backgroundColor: "rgba(220, 220, 220, 0.4)",
											outline: "1px solid slategrey",
											borderRadius: 2,
										},
									}}
								>
									<ListItemButton onClick={() => navigate("/home")}>
										<ListItemIcon style={{ minWidth: "40px", color: "white" }}>
											<HomeIcon />
										</ListItemIcon>
										<ListItemText
											primary="Home"
											primaryTypographyProps={{
												fontSize: 20,
												color: "white",
												letterSpacing: 0,
											}}
										/>
									</ListItemButton>
									<ListItemButton onClick={dashboardSubmenuHandler}>
										<ListItemIcon style={{ minWidth: "40px", color: "white" }}>
											<DashboardIcon />
										</ListItemIcon>
										<ListItemText
											primary="Dashboard"
											primaryTypographyProps={{
												fontSize: 20,
												color: "white",
												letterSpacing: 0,
											}}
										/>
										{menuDashboard ? (
											<ExpandLess style={{ color: "white" }} />
										) : (
											<ExpandMore style={{ color: "white" }} />
										)}
									</ListItemButton>
									<Collapse in={menuDashboard} timeout="auto" unmountOnExit>
										<List component="div" disablePadding>
											<ListItemButton
												onClick={() => navigate("/dashboard")}
												sx={{ pl: 7 }}
											>
												<ListItemIcon style={{ minWidth: "40px", color: "white" }}>
													<DashboardIcon style={{ fontSize: 18 }} />
												</ListItemIcon>
												<ListItemText
													primary="Dashboard Jadwal"
													primaryTypographyProps={{
														fontSize: 18,
														color: "white",
														letterSpacing: 0,
													}}
												/>
											</ListItemButton>
											<ListItemButton
												onClick={() => navigate("/dashboard/qa")}
												sx={{ pl: 7 }}
											>
												<ListItemIcon style={{ minWidth: "40px", color: "white" }}>
													<DashboardIcon style={{ fontSize: 18 }} />
												</ListItemIcon>
												<ListItemText
													primary="Outstanding QA"
													primaryTypographyProps={{
														fontSize: 18,
														color: "white",
														letterSpacing: 0,
													}}
												/>
											</ListItemButton>
											<ListItemButton
												onClick={() => navigate("/dashboard/user")}
												sx={{ pl: 7 }}
											>
												<ListItemIcon style={{ minWidth: "40px", color: "white" }}>
													<DashboardIcon style={{ fontSize: 18 }} />
												</ListItemIcon>
												<ListItemText
													primary="Outstanding User"
													primaryTypographyProps={{
														fontSize: 18,
														color: "white",
														letterSpacing: 0,
													}}
												/>
											</ListItemButton>
											<ListItemButton
												onClick={() => navigate("/dashboard/tnc")}
												sx={{ pl: 7 }}
											>
												<ListItemIcon style={{ minWidth: "40px", color: "white" }}>
													<DashboardIcon style={{ fontSize: 18 }} />
												</ListItemIcon>
												<ListItemText
													primary="Outstanding TMB dan CWR"
													primaryTypographyProps={{
														fontSize: 18,
														color: "white",
														letterSpacing: 0,
													}}
												/>
											</ListItemButton>
										</List>
									</Collapse>
									<ListItemButton onClick={reqSubmenuHandler}>
										<ListItemIcon style={{ minWidth: "40px", color: "white" }}>
											<RequestQuoteIcon />
										</ListItemIcon>
										<ListItemText
											primary="Request"
											primaryTypographyProps={{
												fontSize: 20,
												color: "white",
												letterSpacing: 0,
											}}
										/>
										{menuRequest ? (
											<ExpandLess style={{ color: "white" }} />
										) : (
											<ExpandMore style={{ color: "white" }} />
										)}
									</ListItemButton>
									<Collapse in={menuRequest} timeout="auto" unmountOnExit>
										<List component="div" disablePadding>
											<ListItemButton
												onClick={() =>
													navigate("/request/new", { state: { kalibrasi: true } })
												}
												sx={{ pl: 7 }}
											>
												<ListItemIcon style={{ minWidth: "40px", color: "white" }}>
													<BuildIcon style={{ fontSize: 18 }} />
												</ListItemIcon>
												<ListItemText
													primary="Kalibrasi"
													primaryTypographyProps={{
														fontSize: 18,
														color: "white",
														letterSpacing: 0,
													}}
												/>
											</ListItemButton>
											<ListItemButton
												onClick={() =>
													navigate("/request/new", { state: { kalibrasi: false } })
												}
												sx={{ pl: 7 }}
											>
												<ListItemIcon style={{ minWidth: "40px", color: "white" }}>
													<EngineeringIcon style={{ fontSize: 18 }} />
												</ListItemIcon>
												<ListItemText
													primary="Kualifikasi"
													primaryTypographyProps={{
														fontSize: 18,
														color: "white",
														letterSpacing: 0,
													}}
												/>
											</ListItemButton>
											<ListItemButton
												onClick={() => navigate("/request/scan")}
												sx={{ pl: 7 }}
											>
												<ListItemIcon style={{ minWidth: "40px", color: "white" }}>
													<QrCodeScannerIcon style={{ fontSize: 18 }} />
												</ListItemIcon>
												<ListItemText
													primary="Scan"
													primaryTypographyProps={{
														fontSize: 18,
														color: "white",
														letterSpacing: 0,
													}}
												/>
											</ListItemButton>
										</List>
									</Collapse>
									<ListItemButton onClick={verifSubmenuHandler}>
										<ListItemIcon style={{ minWidth: "40px", color: "white" }}>
											<AssignmentTurnedInIcon />
										</ListItemIcon>
										<ListItemText
											primary="Verifikasi"
											primaryTypographyProps={{
												fontSize: 20,
												color: "white",
												letterSpacing: 0,
											}}
										/>
										{menuVerifikasi ? (
											<ExpandLess style={{ color: "white" }} />
										) : (
											<ExpandMore style={{ color: "white" }} />
										)}
									</ListItemButton>
									<Collapse in={menuVerifikasi} timeout="auto" unmountOnExit>
										<List component="div" disablePadding>
											<ListItemButton
												onClick={() => {
													navigate("/verifikasi/periode");
												}}
												sx={{ pl: 7 }}
											>
												<ListItemIcon style={{ minWidth: "40px", color: "white" }}>
													<EventRepeatIcon style={{ fontSize: 18 }} />
												</ListItemIcon>
												<ListItemText
													primary="Periode Verifikasi"
													primaryTypographyProps={{
														fontSize: 18,
														color: "white",
														letterSpacing: 0,
													}}
												/>
											</ListItemButton>
											<ListItemButton
												onClick={() => {
													navigate("/verifikasi/tnc", { state: { tipe: "timbangan" } });
												}}
												sx={{ pl: 7 }}
											>
												<ListItemIcon style={{ minWidth: "40px", color: "white" }}>
													<ScaleIcon style={{ fontSize: 18 }} />
												</ListItemIcon>
												<ListItemText
													primary="Verifikasi Timbangan"
													primaryTypographyProps={{
														fontSize: 18,
														color: "white",
														letterSpacing: 0,
													}}
												/>
											</ListItemButton>
											<ListItemButton
												onClick={() => {
													navigate("/verifikasi/tnc", { state: { tipe: "checkweigher" } });
												}}
												sx={{ pl: 7 }}
											>
												<ListItemIcon style={{ minWidth: "40px", color: "white" }}>
													<ScaleIcon style={{ fontSize: 18 }} />
												</ListItemIcon>
												<ListItemText
													primary="Verifikasi Checkweigher"
													primaryTypographyProps={{
														fontSize: 18,
														color: "white",
														letterSpacing: 0,
													}}
												/>
											</ListItemButton>
										</List>
									</Collapse>
								</List>
							</Box>
						</Box>
					</Slide>
					<Box
						flex={1}
						paddingLeft={isHidden ? 28.3 : 0}
						marginTop={6}
						overflow="auto"
						style={{
							transition: theme.transitions.create("all", {
								easing: theme.transitions.easing.easeInOut,
								duration: theme.transitions.duration.leavingScreen,
							}),
						}}
					>
						<Box>{props.children}</Box>
					</Box>
				</Box>
			</Box>
		</ThemeProvider>
	);
};

export default memo(Navbar);
