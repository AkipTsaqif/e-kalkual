import { Box, TextField, MenuItem, Button, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestNewActions } from "../../../store/request-new";
import { useLocation, useNavigate } from "react-router-dom";
import idLocale from "date-fns/locale/id";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import parseISO from "date-fns/parseISO";
import { format } from "date-fns";

import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

import axios from "axios";
import Navbar from "../../Layout/Navbar";

const tipeKalibrasi = [
	{
		value: "AB",
		label: "Alat Baru",
	},
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

const tipeKualifikasi = [
	{
		value: "MB",
		label: "Mesin Baru",
	},
	{
		value: "RB",
		label: "Ruangan Baru",
	},
	{
		value: "MR",
		label: "Mesin Rusak",
	},
	{
		value: "MPP",
		label: "Mesin Perlu Perbaikan",
	},
	{
		value: "PM",
		label: "Perpindahan Mesin",
	},
];

const DUMMY_MESIN = [
	{
		value: "CRT",
		label: "Cartoning",
	},
	{
		value: "DMR",
		label: "Drum Mixer",
	},
	{
		value: "GRN",
		label: "Granulator",
	},
	{
		value: "STN",
		label: "Storage Tank",
	},
	{
		value: "WRP",
		label: "Wrapping",
	},
];

const DUMMY_ALAT = [
	{
		value: "AMR",
		label: "Amperemeter",
	},
	{
		value: "ANT",
		label: "Anak Timbangan",
	},
	{
		value: "DSM",
		label: "Densitymeter",
	},
	{
		value: "OVN",
		label: "Oven",
	},
	{
		value: "PSG",
		label: "Pressure Gauge",
	},
];

const LOKASI_DD = [
	{
		value: "PLG",
		label: "Pulogadung",
	},
	{
		value: "CKR",
		label: "Cikarang",
	},
];

const JENIS_KALIBRASI = [
	{
		value: "Internal",
		label: "Internal",
	},
	{
		value: "Eksternal",
		label: "Eksternal",
	},
];

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
	// components: {
	//     MuiInputBase: {
	//         styleOverrides: {
	//             root: {
	//                 height: '50px'
	//             }
	//         }
	//     }
	// }
});

const Kalibrasi = () => {
	const username = useSelector((state) => state.persistedReducer.auth.user);
	const savedRequest = useSelector((state) => state.persistedReducer.requestNew);
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [tipe, setTipe] = useState("");
	const [noIN, setNoIN] = useState("");
	const [alatMesin, setAlatMesin] = useState("");
	const [lokasi, setLokasi] = useState("PLG");
	const [jenisKalibrasi, setJenisKalibrasi] = useState("Internal");
	const [isRuangan, setIsRuangan] = useState(false);
	const [tanggal, setTanggal] = useState(savedRequest.TglKalkual);
	const [periode, setPeriode] = useState(savedRequest.Periode);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingNoIN, setIsLoadingNoIN] = useState(false);

	const locale = "id";
	const localeMap = {
		id: idLocale,
	};

	const tipeKalkualRef = useRef();
	const namaRef = useRef();
	const tipeAlatRef = useRef();
	const noKontrolRef = useRef();
	const tahunRef = useRef();
	const departemenRef = useRef();
	const lokasiRef = useRef();
	const jenisKalibrasiRef = useRef();

	useEffect(() => {
		// setEd(dateFns.addMonths(savedRequest.TglKalkual, periode));

		dispatch(
			requestNewActions.calcEndDate({ TglKalkual: tanggal, Periode: periode })
		);
	}, [periode, tanggal]);

	const periodeChangeHandler = (e) => {
		setPeriode(e.target.value);
	};

	const tipeChangeHandler = (e) => {
		setTipe(e.target.value);

		if (e.target.value === "RB") {
			setIsRuangan(true);
		} else {
			setIsRuangan(false);
		}
	};

	const alatMesinChangeHandler = (e) => {
		setAlatMesin(e.target.value);
	};

	const lokasiChangeHandler = (e) => {
		setLokasi(e.target.value);
	};

	const jenisKalibrasiHandler = (e) => {
		setJenisKalibrasi(e.target.value);
	};

	const inputtedData = () => {
		const request = {
			Option: "Insert",
			NoIN: noIN,
			TipeKalkual: tipeKalkualRef.current.value,
			Nama: namaRef.current.value,
			Tipe: tipeAlatRef.current.value,
			Jenis:
				location.state.kalibrasi !== null
					? location.state.kalibrasi
						? "Kalibrasi"
						: "Kualifikasi"
					: null,
			NoKontrol: noKontrolRef.current.value,
			TahunPembelian: tahunRef.current.value,
			Departemen: departemenRef.current.value,
			Lokasi: lokasiRef.current.value,
			TglKalkual: savedRequest.TglKalkual,
			Periode: savedRequest.Periode,
			EDKalkual: format(savedRequest.EDKalkual, "yyyy-MM-dd"),
			JenisKalkual:
				location.state.kalibrasi !== null
					? location.state.kalibrasi
						? jenisKalibrasiRef.current.value
						: "Internal"
					: "Internal",
		};

		return request;
	};

	async function postRequest(req) {
		console.log(req);
		const response = await axios
			.post("https://portal.bintang7.com/Kalkual/api/kalkual", req, {
				onUploadProgress: (e) => {
					setIsLoading(true);
				},
			})
			.then((resp) => {
				setIsLoading(false);
				console.log(resp);
				toast.success("Request kalkual berhasil!", {
					position: "top-center",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				navigate("/dashboard");
			})
			.catch((e) => {
				console.log(e);
				toast.error("Terdapat kendala dengan server. Silahkan dicoba kembali.", {
					position: "top-center",
					autoClose: 4000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					onClose: () => setIsLoading(false),
				});
			});
	}

	const getNoIN = async () => {
		setIsLoadingNoIN(true);
		const response = await axios
			.post("https://portal.bintang7.com/Kalkual/api/kalkual", {
				Option: "Generate Next NoIN",
				EDKalkual: format(
					!!savedRequest.EDKalkual ? savedRequest.EDKalkual : new Date(),
					"yyyy-MM-dd"
				),
				JenisKalkual:
					location.state.kalibrasi !== null
						? location.state.kalibrasi
							? !!jenisKalibrasiRef.current.value
								? jenisKalibrasiRef.current.value
								: "Internal"
							: "Internal"
						: "Internal",
			})
			.then((resp) => {
				setNoIN(JSON.parse(resp.data)[0].NoIN);
				setIsLoadingNoIN(false);
			});
	};

	useEffect(() => {
		getNoIN();
	}, [savedRequest.EDKalkual, jenisKalibrasi]);

	useEffect(() => {
		console.log("noIN: " + noIN);
	}, [noIN]);

	const submitHandler = (e) => {
		e.preventDefault();

		// if ('value' in jenisKalibrasiRef.current.value) console.log(jenisKalibrasiRef.current.value)
		// else console.log("kosong");

		postRequest(inputtedData());
		dispatch(requestNewActions.removeRequest());
	};

	const saveHandler = (e) => {
		e.preventDefault();
		dispatch(requestNewActions.saveRequest(inputtedData()));
	};

	const cancelHandler = (e) => {
		e.preventDefault();
		dispatch(requestNewActions.removeRequest());
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
	console.log(savedRequest.NoIN);
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
						<Typography variant="h5">
							Form Registrasi Kalkual QA Khusus Alat/Mesin/Sistem Penunjang/Ruangan
							Baru
						</Typography>
					</Box>
					<Stack
						sx={{
							backgroundColor: "rgba(230, 233, 233, 0.99)",
							mx: "auto",
							width: 0.9,
							height: "auto",
							px: 5,
							pb: 2,
							"& .MuiTextField-root": { my: 0.5 },
							"& .MuiInputBase-root.Mui-disabled": {
								color: "gray",
								fontWeight: "bold",
							},
							borderRadius: 2,
							boxShadow: 5,
						}}
					>
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: "repeat(17, 1fr)",
								gridTemplateRows: "repeat(7, 1fr)",
								alignItems: "center",
							}}
						>
							<Typography sx={{ gridColumn: "1 / 4" }} variant="h6">
								User ID:
							</Typography>
							<TextField
								sx={{ gridColumn: "4 / 9" }}
								id="userID"
								label="User ID"
								size="small"
								variant="filled"
								value={username}
								disabled
							/>
							<Typography sx={{ gridColumn: "1 / 4" }} variant="h6">
								No IN:
							</Typography>
							<TextField
								autoComplete="off"
								sx={{ gridColumn: "4 / 9" }}
								multiline
								value={!!savedRequest.NoIN ? savedRequest.NoIN : noIN}
								id="noIN"
								label="No IN"
								variant="filled"
								size="small"
								disabled
							/>
							<Typography sx={{ gridColumn: "1 / 4" }} variant="h6">
								Tipe Kalkual:
							</Typography>
							<TextField
								sx={{ gridColumn: "4 / 9" }}
								size="small"
								id="tipeKalkual"
								select
								label="Tipe Kalkual"
								defaultValue={!savedRequest ? tipe : savedRequest.TipeKalkual}
								onChange={tipeChangeHandler}
								variant="outlined"
								inputRef={tipeKalkualRef}
							>
								{location.state.kalibrasi
									? tipeKalibrasi.map((option) => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
									  ))
									: tipeKualifikasi.map((option) => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
									  ))}
							</TextField>
							<Typography sx={{ gridColumn: "1 / 4" }} variant="h6">
								Nama Alat:
							</Typography>
							<TextField
								autoComplete="off"
								sx={{ gridColumn: "4 / 9" }}
								defaultValue={savedRequest.NamaAlat}
								id="nama"
								label="Nama Alat/Mesin/Sistem Penunjang/Ruangan"
								inputRef={namaRef}
								size="small"
							/>
							<Typography sx={{ gridColumn: "1 / 4" }} variant="h6">
								Tipe Alat:
							</Typography>
							<TextField
								autoComplete="off"
								sx={{ gridColumn: "4 / 9" }}
								size="small"
								id="tipeAlat"
								select
								label="Tipe Alat/Mesin/Sistem Penunjang/Ruangan"
								defaultValue={!savedRequest ? alatMesin : savedRequest.TipeAlat}
								onChange={alatMesinChangeHandler}
								variant="outlined"
								inputRef={tipeAlatRef}
							>
								{DUMMY_MESIN.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<Typography sx={{ gridColumn: "1 / 4" }} variant="h6">
								No Kontrol:
							</Typography>
							<TextField
								autoComplete="off"
								sx={{ gridColumn: "4 / 9" }}
								defaultValue={savedRequest.NoKontrol}
								id="noKontrol"
								label="No Kontrol"
								inputRef={noKontrolRef}
								size="small"
								variant={isRuangan ? "filled" : "outlined"}
								disabled={isRuangan}
							/>
							<Typography sx={{ gridColumn: "1 / 4" }} variant="h6">
								Tahun Pembelian:
							</Typography>
							<TextField
								autoComplete="off"
								sx={{ gridColumn: "4 / 9" }}
								defaultValue={savedRequest.Tahun}
								id="tahun"
								label="Tahun Pembelian"
								inputRef={tahunRef}
								size="small"
								variant={isRuangan ? "filled" : "outlined"}
								disabled={isRuangan}
							/>
							<Typography sx={{ gridColumn: "10 / 13", gridRow: "1" }} variant="h6">
								Departemen:
							</Typography>
							<TextField
								autoComplete="off"
								sx={{ gridColumn: "13 / 18", gridRow: "1" }}
								defaultValue={savedRequest.Departemen}
								id="departemen"
								label="Departemen Pemilik"
								inputRef={departemenRef}
								size="small"
							/>
							<Typography sx={{ gridColumn: "10 / 13", gridRow: "2" }} variant="h6">
								Lokasi:
							</Typography>
							<TextField
								autoComplete="off"
								sx={{ gridColumn: "13 / 18", gridRow: "2" }}
								defaultValue={!savedRequest ? lokasi : savedRequest.Lokasi}
								id="lokasi"
								label="Lokasi"
								inputRef={lokasiRef}
								size="small"
								variant="outlined"
								select
								onChange={lokasiChangeHandler}
							>
								{LOKASI_DD.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<Typography sx={{ gridColumn: "10 / 13", gridRow: "3" }} variant="h6">
								Tanggal Kalkual:
							</Typography>
							<LocalizationProvider
								dateAdapter={AdapterDateFns}
								adapterLocale={localeMap[locale]}
							>
								<DatePicker
									inputFormat="dd-MM-yyyy"
									label="Tanggal Kalkual"
									value={savedRequest.TglKalkual}
									onChange={(tgl) => setTanggal(format(new Date(tgl), "yyyy-MM-dd"))}
									renderInput={(params) => (
										<TextField
											{...params}
											size="small"
											sx={{ gridColumn: "13 / 18", gridRow: "3" }}
										/>
									)}
								/>
							</LocalizationProvider>
							<Typography sx={{ gridColumn: "10 / 13", gridRow: "4" }} variant="h6">
								Periode Kalkual:
							</Typography>
							<TextField
								autoComplete="off"
								sx={{ gridColumn: "13 / 18", gridRow: "4" }}
								defaultValue={savedRequest.Periode}
								id="periodeKalkual"
								onChange={periodeChangeHandler}
								label="Periode Kalkual"
								size="small"
							/>
							<Typography sx={{ gridColumn: "10 / 13", gridRow: "5" }} variant="h6">
								ED Kalkual:
							</Typography>
							<LocalizationProvider
								dateAdapter={AdapterDateFns}
								adapterLocale={localeMap[locale]}
							>
								<DatePicker
									inputFormat="dd-MM-yyyy"
									label="ED Kalkual"
									value={savedRequest.EDKalkual}
									onChange={(tgl) => setTanggal(tgl)}
									renderInput={(params) => (
										<TextField
											{...params}
											sx={{ gridColumn: "13 / 18", gridRow: "5" }}
											id="edKalkual"
											size="small"
											variant="filled"
											disabled
										/>
									)}
								/>
							</LocalizationProvider>
							{location.state.kalibrasi !== null ? (
								location.state.kalibrasi ? (
									<>
										<Typography sx={{ gridColumn: "10 / 13", gridRow: "6" }} variant="h6">
											Jenis Kalibrasi:
										</Typography>
										<TextField
											autoComplete="off"
											sx={{ gridColumn: "13 / 18", gridRow: "6" }}
											defaultValue={
												!savedRequest ? jenisKalibrasi : savedRequest.JenisKalkual
											}
											id="jenis"
											label="Jenis Kalibrasi"
											inputRef={jenisKalibrasiRef}
											size="small"
											select
											onChange={jenisKalibrasiHandler}
										>
											{JENIS_KALIBRASI.map((option) => (
												<MenuItem key={option.value} value={option.value}>
													{option.label}
												</MenuItem>
											))}
										</TextField>
									</>
								) : (
									<div></div>
								)
							) : (
								<div></div>
							)}
						</Box>
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							sx={{ mt: 2 }}
						>
							<Stack direction="row" spacing={2}>
								<Button
									variant="contained"
									color="error"
									onClick={cancelHandler}
									disabled={isLoading}
								>
									Cancel
								</Button>
								<Button
									variant="contained"
									onClick={saveHandler}
									color="success"
									disabled={isLoadingNoIN}
								>
									Save
								</Button>
								<LoadingButton
									loading={isLoading}
									loadingPosition="end"
									variant="contained"
									onClick={submitHandler}
									endIcon={<SendIcon />}
									disabled={isLoading || isLoadingNoIN}
								>
									Submit ke Approval
								</LoadingButton>
							</Stack>
						</Box>
					</Stack>
				</Box>
			</ThemeProvider>
		</Navbar>
	);
};

export default Kalibrasi;
