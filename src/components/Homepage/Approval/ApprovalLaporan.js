import {
	Box,
	TextField,
	Button,
	Typography,
	LinearProgress,
	Radio,
	RadioGroup,
	FormControl,
	FormControlLabel,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { useState, useRef, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { approvalSchema } from "../../../utils/validationSchema";
import { uploadLaporanActions } from "../../../store/upload-laporan";

import LoadingButton from "@mui/lab/LoadingButton";
import Navbar from "../../Layout/Navbar";
import axios from "axios";

const ApprovalLaporan = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const data = useSelector((state) => state.persistedReducer.uploadLaporan);
	const user = useSelector((state) => state.persistedReducer.auth.user);

	const [uploadedFile, setUploadedFile] = useState(null);
	const [files, setFiles] = useState({ Files: [], FileNames: [] });
	const [progress, setProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);
	const [hasil, setHasil] = useState("MS");

	const vendorRef = useRef();
	const biayaRef = useRef();
	const parameterRef = useRef();

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
			body1: {
				letterSpacing: 0,
				fontWeight: "bold",
			},
			body2: {
				letterSpacing: 0.2,
				fontSize: 15,
				fontWeight: "bold",
			},
		},
	});

	const formik = useFormik({
		initialValues: {
			vendor: "",
			biaya: "",
		},
		validationSchema: data.JenisKalkual === "Eksternal" ? approvalSchema : null,
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: (val) => {
			submitLaporanHandler();
			// testArr();
		},
	});

	const saveFileHandler = (file) => {
		setUploadedFile(file);
	};

	const cvtob64 = () => {
		var reader = new FileReader();
		reader.readAsDataURL(uploadedFile);
		reader.onload = function () {
			// console.log(reader.result.split(',')[1]);
			setFiles((file) => ({
				...file,
				Files: [...file["Files"], reader.result.split(",")[1]],
				FileNames: [...file["FileNames"], uploadedFile.name],
			}));
		};
		reader.onerror = function (error) {
			console.log("Error: ", error);
		};

		setUploadedFile(null);
	};

	useEffect(() => console.log(uploadedFile), [uploadedFile]);

	const submitLaporanHandler = async () => {
		if (
			!!(uploadedFile !== null) ||
			!!(!!(files.Files.length === 0) && !!(files.FileNames.length === 0))
		)
			toast.error("File laporan kosong, harap upload lalu tekan tombol ADD", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		else {
			try {
				setProgress(0);

				const res = await axios
					.post(
						"https://portal.bintang7.com/Kalkual/api/upload",
						{
							...files,
							NoIN: data.NoIN,
							Vendor:
								data.JenisKalkual === "Eksternal" ? vendorRef.current.value : null,
							Biaya: data.JenisKalkual === "Eksternal" ? biayaRef.current.value : null,
							ParameterUji: !!(data.Jenis === "Kualifikasi")
								? parameterRef.current.value
								: null,
							Hasil: hasil,
							Approvee: user,
						},
						{
							headers: {
								"Content-Type": "application/json",
							},
							onUploadProgress: (e) => {
								setIsUploading(true);
								const totalLength = e.lengthComputable
									? e.total
									: e.target.getResponseHeader("content-length") ||
									  e.target.getResponseHeader("x-decompressed-content-length");
								setProgress(Math.round((100 * e.loaded) / totalLength));
							},
						}
					)
					.then((resp) => console.log(resp.data));

				toast.success("Data kalkual berhasil di submit!", {
					position: "top-center",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					onOpen: () => setIsUploading(false),
					onClose: () => navigate("/home"),
				});
			} catch (e) {
				console.log(e);
				toast.error("Gagal mengupload file laporan!", {
					position: "top-center",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					onOpen: () => {
						setIsUploading(false);
					},
				});
			}
		}
	};

	const hasilChangeHandler = (e) => {
		setHasil(e.target.value);
	};

	const removeFile = (id) => {
		let filter = {
			FileNames: files.FileNames.filter((el) => el !== id),
			Files: files.Files.filter(
				(el, index) => index !== files.FileNames.indexOf(id)
			),
		};
		setFiles(filter);
		setUploadedFile(null);
		console.log(filter);
	};

	return (
		<div>
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
							<Typography variant="h5">Form Approval Kalkual</Typography>
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
							<form onSubmit={formik.handleSubmit}>
								<Box
									mt={1}
									sx={{
										display: "grid",
										gridTemplateColumns: "repeat(17, 1fr)",
										alignItems: "center",
										rowGap: 0.5,
									}}
								>
									<Typography sx={{ gridColumn: "1 / 4" }} variant="h6">
										User ID:
									</Typography>
									<TextField
										sx={{ gridColumn: "4 / 9" }}
										id="userID"
										label="User ID"
										value={user}
										size="small"
										disabled
									/>
									<Typography sx={{ gridColumn: "1 / 4" }} variant="h6">
										No IN:
									</Typography>
									<TextField
										sx={{ gridColumn: "4 / 9" }}
										id="noIN"
										label="No IN"
										value={data.NoIN}
										size="small"
										disabled
									/>
									<Typography sx={{ gridColumn: "1 / 4" }} variant="h6">
										Tipe kalkual:
									</Typography>
									<TextField
										sx={{ gridColumn: "4 / 9" }}
										id="tipe"
										label="Tipe Kalkual"
										value={data.TipeKalkual}
										size="small"
										disabled
									/>
									<Typography sx={{ gridColumn: "1 / 4" }} variant="h6">
										Nama alat:
									</Typography>
									<TextField
										sx={{ gridColumn: "4 / 9" }}
										id="nama"
										label="Nama Alat/Mesin/Sistem Penunjang"
										value={data.NamaAlat}
										size="small"
										disabled
									/>
									<Typography sx={{ gridColumn: "1 / 4" }} variant="h6">
										No kontrol:
									</Typography>
									<TextField
										sx={{ gridColumn: "4 / 9" }}
										id="noKontrol"
										label="No Kontrol"
										value={data.NoKontrol}
										size="small"
										disabled
									/>
									<Typography sx={{ gridColumn: "10 / 13", gridRow: "1" }} variant="h6">
										Departemen:
									</Typography>
									<TextField
										sx={{ gridColumn: "13 / 18", gridRow: "1" }}
										id="departemen"
										label="Departemen Pemilik"
										value={data.Departemen}
										size="small"
										disabled
									/>
									<Typography sx={{ gridColumn: "10 / 13", gridRow: "2" }} variant="h6">
										Lokasi:
									</Typography>
									<TextField
										sx={{ gridColumn: "13 / 18", gridRow: "2" }}
										id="lokasi"
										label="Lokasi"
										value={data.Lokasi}
										size="small"
										disabled
									/>
									<Typography sx={{ gridColumn: "10 / 13", gridRow: "3" }} variant="h6">
										Tanggal kalkual:
									</Typography>
									<TextField
										sx={{ gridColumn: "13 / 18", gridRow: "3" }}
										id="tgl"
										label="Tgl Kalibrasi/Kualifikasi"
										value={data.TglKalkual}
										size="small"
									/>
									<Typography sx={{ gridColumn: "10 / 13", gridRow: "4" }} variant="h6">
										ED kalkual:
									</Typography>
									<TextField
										sx={{ gridColumn: "13 / 18", gridRow: "4" }}
										id="ed"
										label="ED Kalibrasi/Kualifikasi"
										value={data.EDKalkual}
										size="small"
										disabled
									/>
									<Typography sx={{ gridColumn: "10 / 13", gridRow: "5" }} variant="h6">
										Jenis kalkual:
									</Typography>
									<TextField
										sx={{ gridColumn: "13 / 18", gridRow: "5" }}
										id="jenis"
										label="Jenis Kalibrasi"
										value={data.JenisKalkual}
										size="small"
										disabled
									/>
									{!!(data.Jenis === "Kualifikasi") ? (
										<>
											<Typography sx={{ gridColumn: "1 / 4", gridRow: "6" }} variant="h6">
												Parameter uji:
											</Typography>
											<TextField
												sx={{ gridColumn: "4 / 18", gridRow: "6" }}
												required
												inputRef={parameterRef}
												id="parameter"
												label="Input parameter uji"
												size="small"
												minRows={3}
												multiline
											/>
										</>
									) : (
										<></>
									)}
									<Typography sx={{ gridColumn: "1 / 4", gridRow: "7" }} variant="h6">
										Hasil:
									</Typography>
									<Box
										display="flex"
										justifyContent="space-between"
										sx={{
											gridColumn: "4 / 18",
											gridRow: "7",
											"& .MuiFormControlLabel-root.MuiFormControlLabel-labelPlacementEnd":
												{ marginRight: "40px" },
										}}
									>
										<FormControl>
											<RadioGroup row value={hasil} onChange={hasilChangeHandler}>
												<FormControlLabel
													value="MS"
													control={<Radio />}
													label="MS - Memenuhi Syarat"
												/>
												<FormControlLabel
													value="TMS"
													control={<Radio />}
													label="TMS - Tidak Memenuhi Syarat"
												/>
											</RadioGroup>
										</FormControl>
									</Box>
									<Typography sx={{ gridColumn: "1 / 4", gridRow: "8" }} variant="h6">
										Berkas laporan:
									</Typography>
									<Box
										alignItems="center"
										display="grid"
										sx={{
											gridColumn: "4 / 18",
											gridRow: "8",
											gridTemplateColumns: "repeat(8, 1fr)",
											rowGap: 1,
										}}
									>
										<Button
											sx={{ gridColumn: "2 / 4", gridRow: "1" }}
											variant="outlined"
											component="label"
											disabled={isUploading ? true : false}
										>
											Upload File
											<input
												onChange={(e) => {
													saveFileHandler(e.target.files[0]);
													e.target.value = null;
												}}
												type="file"
												hidden
											/>
										</Button>
										<Button
											sx={{ gridColumn: "6 / 8", gridRow: "1" }}
											variant="contained"
											onClick={cvtob64}
											color="success"
											disabled={isUploading ? true : false}
										>
											Add
										</Button>
										<LinearProgress
											sx={{ gridColumn: "1 / 9", gridRow: "2" }}
											variant="determinate"
											value={progress}
										/>
									</Box>
									<Typography
										sx={{ gridColumn: "4 / 18", gridRow: "9", ml: 1 }}
										variant="body1"
									>
										Berkas terpilih: {uploadedFile ? uploadedFile.name : "-"}
									</Typography>
									<Box
										py={1}
										display="grid"
										sx={{
											backgroundColor: "rgba(231,234,234,0.99)",
											boxShadow: 1,
											border: 1,
											borderColor: "rgba(60, 60, 60, 0.6)",
											gridColumn: "4 / 18",
											gridRow: "10",
											gridTemplateColumns: "repeat(16, 1fr)",
											rowGap: 0.5,
											"& .MuiButton-root": {
												minHeight: 0,
												minWidth: 30,
												p: 0,
											},
										}}
									>
										<Typography variant="body1" sx={{ ml: 1, gridColumn: "1 / 9" }}>
											Berkas laporan:
										</Typography>
										{files.FileNames.map((items, id) => (
											<Fragment key={items}>
												<Typography
													sx={{ gridColumn: "2 / 14", gutterBottom: false, ml: 2 }}
													variant="body1"
												>
													{id + 1}. {items}
												</Typography>
												<Button
													variant="contained"
													color="error"
													size="small"
													sx={{
														gridColumn: "1 / 2",
														gridRow: id + 2,
														mx: 1,
													}}
													onClick={() => removeFile(items)}
												>
													X
												</Button>
											</Fragment>
										))}
									</Box>
									{data.JenisKalkual === "Eksternal" ? (
										<>
											<Typography sx={{ gridColumn: "1 / 4", gridRow: "11" }} variant="h6">
												Input vendor:
											</Typography>
											<TextField
												sx={{ gridColumn: "4 / 9", gridRow: "11" }}
												autoComplete="off"
												value={formik.values.vendor}
												onChange={formik.handleChange}
												error={formik.touched.vendor && Boolean(formik.errors.vendor)}
												helperText={formik.touched.vendor && formik.errors.vendor}
												inputRef={vendorRef}
												id="vendor"
												name="vendor"
												label="Masukkan vendor"
												size="small"
											/>
											<Typography
												sx={{ gridColumn: "10 / 13", gridRow: "11" }}
												variant="h6"
											>
												Input biaya:
											</Typography>
											<TextField
												sx={{ gridColumn: "13 / 18", gridRow: "11" }}
												autoComplete="off"
												value={formik.values.biaya}
												onChange={formik.handleChange}
												error={formik.touched.biaya && Boolean(formik.errors.biaya)}
												helperText={formik.touched.biaya && formik.errors.biaya}
												inputRef={biayaRef}
												id="biaya"
												name="biaya"
												label="Masukkan biaya"
												size="small"
											/>
										</>
									) : (
										<></>
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
											disabled={isUploading}
											variant="contained"
											color="error"
											onClick={() => {
												dispatch(uploadLaporanActions.cancelLaporan());
												navigate("/dashboard");
											}}
										>
											Cancel
										</Button>
										<LoadingButton
											loading={isUploading}
											loadingPosition="end"
											variant="contained"
											endIcon={<SendIcon />}
											type="submit"
											disabled={isUploading}
										>
											Submit ke Approval
										</LoadingButton>
									</Stack>
								</Box>
							</form>
						</Stack>
					</Box>
				</ThemeProvider>
			</Navbar>
		</div>
	);
};

export default ApprovalLaporan;
