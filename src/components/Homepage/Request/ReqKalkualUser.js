import { Box, TextField, MenuItem, Button, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { labelActions } from "../../../store/label-gen";

import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import Navbar from "../../Layout/Navbar";

const tipeKalibrasi = [
	{
		value: "AR",
		label: "Alat Rusak",
	},
	{
		value: "APP",
		label: "Alat Perlu Perbaikan",
	},
	{
		value: "PA",
		label: "Perpindahan Alat",
	},
];

const ReqKalkualUser = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const data = useSelector((state) => state.persistedReducer.label);
	console.log(data);
	const [tipe, setTipe] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const remarksRef = useRef();

	const theme = createTheme({
		typography: {
			h5: {
				fontWeight: "bold",
				color: "white",
				letterSpacing: 0,
				textAlign: "center",
			},
			h6: {
				letterSpacing: 0,
				fontSize: 18,
			},
		},
	});

	const tipeChangeHandler = (e) => {
		setTipe(e.target.value);
	};

	const submitHandler = async () => {
		setIsLoading(true);
		try {
			const response = await axios
				.post("https://localhost:44375/api/kalkual", {
					...data,
					Option: "INSERT",
					Nama: data.NamaAlat,
					Tipe: data.TipeAlat,
					TipeKalkual: tipe,
					Remarks: remarksRef.current.value,
					Scan: "1",
				})
				.then((resp) =>
					toast.success("Request kalkual berhasil di submit!", {
						position: "top-center",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						onOpen: () => setIsLoading(false),
						onClose: () => navigate("/home"),
					})
				);
		} catch (e) {
			console.log(e);
			toast.error("Gagal melakukan request kalkual! Silahkan dicoba kembali", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				onOpen: () => {
					setIsLoading(false);
				},
			});
		}
	};

	const cancelHandler = (e) => {
		e.preventDefault();
		dispatch(labelActions.removeLabel());
		toast.info("Berhasil membatalkan request kalkual.", {
			position: "top-center",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			onOpen: () => navigate("/home"),
		});
	};

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
						width={0.95}
						justifyContent="center"
						alignItems="center"
						sx={{
							pt: "2vh",
							pb: "2vh",
							backgroundColor: "rgba(0, 0, 0, 0.8)",
							borderRadius: 3,
							borderTop: 1,
							borderBottom: 1,
							borderColor: "rgba(220, 220, 220, 0.8)",
							borderWidth: 2,
							boxShadow: 5,
						}}
					>
						<Typography variant="h5">Request Hasil Scan</Typography>
					</Box>
					<Box
						sx={{
							backgroundColor: "rgba(230, 233, 233, 0.99)",
							mx: "auto",
							width: 0.9,
							height: "auto",
							px: 5,
							pb: 2,
							"& .MuiTextField-root": { m: 1 },
							borderRadius: 2,
							boxShadow: 5,
						}}
					>
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: "repeat(17, 1fr)",
								gridTemplateRows: "repeat(5, 1fr)",
								alignItems: "center",
								"& .MuiInputBase-root.Mui-disabled": {
									color: "gray",
									fontWeight: "bold",
								},
							}}
						>
							<Typography sx={{ gridColumn: "1 / 4" }} variant="h6">
								Nama alat:
							</Typography>
							<TextField
								sx={{ gridColumn: "4 / 9" }}
								id="nama"
								value={!!data ? data.NamaAlat : ""}
								label="Nama Alat/Mesin/Sistem penunjang"
								size="small"
								disabled
							/>
							<Typography sx={{ gridColumn: "1 / 4" }} variant="h6">
								Tipe alat:
							</Typography>
							<TextField
								sx={{ gridColumn: "4 / 9" }}
								id="nama"
								value={!!data ? data.TipeAlat : ""}
								label="Tipe"
								size="small"
								disabled
							/>
							<Typography sx={{ gridColumn: "1 / 4" }} variant="h6">
								No kontrol:
							</Typography>
							<TextField
								sx={{ gridColumn: "4 / 9" }}
								id="nama"
								value={!!data ? data.NoKontrol : ""}
								label="No Kontrol"
								size="small"
								disabled
							/>
							<Typography sx={{ gridColumn: "1 / 4" }} variant="h6">
								Departemen:
							</Typography>
							<TextField
								sx={{ gridColumn: "4 / 9" }}
								id="nama"
								value={!!data ? data.Departemen : ""}
								label="Departemen Pemilik"
								size="small"
								disabled
							/>
							<Typography sx={{ gridColumn: "10 / 13", gridRow: "1" }} variant="h6">
								Lokasi:
							</Typography>
							<TextField
								sx={{ gridColumn: "13 / 18", gridRow: "1" }}
								id="nama"
								value={!!data ? data.Lokasi : ""}
								label="Lokasi"
								size="small"
								disabled
							/>
							<Typography sx={{ gridColumn: "10 / 13", gridRow: "2" }} variant="h6">
								Tanggal kalkual:
							</Typography>
							<TextField
								sx={{ gridColumn: "13 / 18", gridRow: "2" }}
								id="nama"
								value={!!data ? format(parseISO(data.TglKalkual), "dd-MM-yyyy") : ""}
								label="Tgl Kalibrasi/Kualifikasi"
								size="small"
								disabled
							/>
							<Typography sx={{ gridColumn: "10 / 13", gridRow: "3" }} variant="h6">
								ED kalkual:
							</Typography>
							<TextField
								sx={{ gridColumn: "13 / 18", gridRow: "3" }}
								id="nama"
								value={!!data ? format(parseISO(data.EDKalkual), "dd-MM-yyyy") : ""}
								label="ED Kalibrasi/Kualifikasi"
								size="small"
								disabled
							/>
							<Typography sx={{ gridColumn: "10 / 13", gridRow: "4" }} variant="h6">
								Jenis kalkual:
							</Typography>
							<TextField
								sx={{ gridColumn: "13 / 18", gridRow: "4" }}
								id="nama"
								value={!!data ? data.JenisKalkual : ""}
								label="Jenis Kalibrasi"
								size="small"
								disabled
							/>
						</Box>
						<Box
							display="grid"
							sx={{
								gridTemplateRows: "repeat(2, 1fr)",
								gridTemplateColumns: "repeat(17, 1fr)",
							}}
							alignItems="center"
						>
							<Typography sx={{ gridRow: "1", gridColumn: "1 / 4" }} variant="h6">
								Tipe Kalkual*:
							</Typography>
							<TextField
								sx={{ gridRow: "1", gridColumn: "4 / 18" }}
								id="tipe"
								select
								required
								label="Tipe Kalkual"
								value={tipe}
								onChange={tipeChangeHandler}
								variant="outlined"
								size="small"
							>
								{tipeKalibrasi.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<Typography sx={{ gridRow: "2", gridColumn: "1 / 4" }} variant="h6">
								Remarks:
							</Typography>
							<TextField
								id="nama"
								sx={{ gridRow: "2", gridColumn: "4 / 18" }}
								inputRef={remarksRef}
								label="Remarks"
								size="small"
							/>
						</Box>
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							sx={{ mt: 2 }}
						>
							<Stack direction="row" spacing={2}>
								<Button
									disabled={isLoading}
									variant="contained"
									color="error"
									onClick={cancelHandler}
								>
									Cancel
								</Button>
								<LoadingButton
									loading={isLoading}
									loadingPosition="end"
									disabled={isLoading}
									variant="contained"
									onClick={submitHandler}
									endIcon={<SendIcon />}
								>
									Submit ke Approval
								</LoadingButton>
							</Stack>
						</Box>
					</Box>
				</Box>
			</ThemeProvider>
		</Navbar>
	);
};

export default ReqKalkualUser;
