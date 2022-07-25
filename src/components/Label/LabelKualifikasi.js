import { Box, TextField, Button, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Navbar from "../Layout/Navbar";

const LabelKualifikasi = () => {
	const navigate = useNavigate();
	const data = useSelector((state) => state.persistedReducer.label);
	console.log(data.ParameterUji);
	const theme = createTheme({
		typography: {
			h4: {
				fontWeight: "bold",
				letterSpacing: 0,
			},
			h5: {
				fontWeight: "bold",
				letterSpacing: 0,
			},
			h6: {
				letterSpacing: 0,
			},
		},
		components: {
			MuiButton: {
				styleOverrides: {
					text: {
						color: "black",
						fontWeight: "bold",
						fontFamily: "Arial",
						fontSize: "1.25rem",
						letterSpacing: "0.01rem",
					},
				},
			},
		},
	});

	return (
		<Navbar>
			<ThemeProvider theme={theme}>
				<Box
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					sx={{
						m: "auto auto",
						backgroundColor: "rgba(0, 0, 0, 0)",
						borderRadius: 3,
						boxShadow: "0 1 4 rgba(0, 0, 0, 0.2)",
						minHeight: `calc(100vh - 48px)`,
					}}
				>
					<Box
						display="flex"
						backgroundColor="white"
						width={0.95}
						justifyContent="center"
						alignItems="center"
						sx={{
							pt: "2vh",
							pb: "2vh",
							borderTop: 1,
							borderLeft: 1,
							borderRight: 1,
							borderColor: "rgba(0, 0, 0, 1)",
							borderWidth: 4,
						}}
					>
						<Typography variant="h5">KUALIFIKASI OPERASIONAL MESIN</Typography>
					</Box>
					<Box
						width={0.95}
						backgroundColor="white"
						sx={{
							height: "auto",
							borderTop: 1,
							borderLeft: 1,
							borderRight: 1,
							borderColor: "rgba(0, 0, 0, 1)",
							borderWidth: 4,
							"& .MuiTextField-root": { m: 0 },
							"& .MuiTypography-root.MuiTypography-body1": { fontWeight: "bold" },
							"& .MuiTableHead-root": { borderBottom: 1, borderWidth: 2 },
							"& .MuiTableBody-root": {
								borderBottom: 1,
								borderColor: "rgb(200, 200, 200)",
							},
							"& .MuiTableCell-root": { borderBottom: 0 },
						}}
					>
						<TableContainer>
							<Table size="small">
								<TableHead>
									<TableRow sx={{ "& th": { fontWeight: "bold" } }}>
										<TableCell align="center">No.</TableCell>
										<TableCell align="center">Parameter Uji</TableCell>
										<TableCell align="center">Hasil</TableCell>
										<TableCell align="center">Tanggal Kualifikasi</TableCell>
										<TableCell align="center">ED Kualifikasi</TableCell>
									</TableRow>
								</TableHead>
								<TableBody
									sx={{ backgroundColor: "rgb(200, 200, 200)", whiteSpace: "pre-line" }}
								>
									<TableRow sx={{ "& td": { fontWeight: "bold" } }}>
										<TableCell align="center">{data.NoIN}</TableCell>
										<TableCell align="center">{data.ParameterUji}</TableCell>
										<TableCell align="center">{data.Hasil}</TableCell>
										<TableCell align="center">
											{format(parseISO(data.TglKalkual), "dd-MM-yyyy")}
										</TableCell>
										<TableCell align="center">
											{format(parseISO(data.EDKalkual), "dd-MM-yyyy")}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
							<Box
								display="grid"
								px={1.5}
								sx={{
									gridTemplateColumns: "repeat(16, 1fr)",
									backgroundColor: "rgb(200, 200, 200)",
									borderTop: 1,
									borderColor: "rgb(00, 00, 00)",
									py: 0.5,
								}}
							>
								<Typography display="inline" sx={{ gridColumn: "10 / 13" }}>
									Approved ({!!data.TglApprove ? data.TglApprove : "-"}) by:{" "}
								</Typography>
								<Box display="flex" sx={{ gridColumn: "13 / 17", direction: "rtl" }}>
									<Typography sx={{ textAlign: "right" }}>
										{!!data.Approver ? data.Approver : "-"}
									</Typography>
								</Box>
							</Box>
						</TableContainer>
					</Box>
					<Box
						width={0.95}
						backgroundColor="rgb(200, 200, 200)"
						sx={{
							border: 1,
							borderColor: "rgba(0, 0, 0, 1)",
							borderWidth: "1px 4px 4px 4px",
							direction: "rtl",
						}}
					>
						<Button
							sx={{ mr: 1.5 }}
							variant="text"
							size="small"
							onClick={() => navigate("/request/user")}
						>
							Request
						</Button>
					</Box>
				</Box>
			</ThemeProvider>
		</Navbar>
	);
};

export default LabelKualifikasi;
