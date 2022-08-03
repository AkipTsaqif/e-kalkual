import {
	DataGrid,
	GridToolbar,
	GridFilterModel,
	GridFilterInputSingleSelect,
} from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { Checkbox } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography, Button } from "@mui/material";

import ReactToPrint from "react-to-print";
import Box from "@mui/material/Box";

import Navbar from "../Layout/Navbar";
import QRCode from "../QR/QRCode";

import { parse, format, parseISO } from "date-fns";
import { useNavigate } from "react-router";

import { uploadLaporanActions } from "../../store/upload-laporan";
import { labelActions } from "../../store/label-gen";
import { object } from "yup/lib/locale";

// const DueColorValue = (props) => {
// 	const { item, applyValue, focusElementRef } = props;
// 	const [status, setStatus] = useState("");

// 	const statusChangeHandler = (e) => {
// 		setStatus(e.target.value);
// 	};

// 	return (
// 		<Box
// 			sx={{
// 				display: "inline-flex",
// 				flexDirection: "row",
// 				alignItems: "center",
// 				height: 48,
// 				pl: "20px",
// 			}}
// 		>
// 			<TextField
// 				size="small"
// 				select
// 				label="Value"
// 				onChange={tipeChangeHandler}
// 				variant="outlined"
// 				inputRef={tipeKalkualRef}
// 			></TextField>
// 		</Box>
// 	);
// };

// DueColorValue.propTypes = {
// 	applyValue: propTypes.func.isRequired,
// 	focusElementRef: propTypes.oneOfType([
// 		PropTypes.func,
// 		PropTypes.shape({
// 			current: PropTypes.any.isRequired,
// 		}),
// 	]),
// 	item: PropTypes.shape({
// 		columnField: PropTypes.string.isRequired,
// 		id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
// 		operatorValue: PropTypes.string,
// 		value: PropTypes.any,
// 	}).isRequired,
// };

const DashboardJadwal = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [dummy, setDummy] = useState([]);
	const [selectedData, setSelectedData] = useState({});
	const [btnBarcode, setBtnBarcode] = useState(false);
	const [rowColor, setRowColor] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const barcodeRef = useRef();

	const dashboard = {
		Option: "Dashboard",
	};

	const theme = createTheme({
		typography: {
			h5: {
				fontWeight: "bold",
				color: "white",
				letterSpacing: 0,
				textAlign: "center",
				marginTop: "2vh",
			},
		},
		palette: {
			action: {
				disabledBackground: "rgba(230, 233, 233, 0.99)",
				// disabled: "black"
			},
		},
		components: {
			MuiDataGrid: {
				styleOverrides: {
					row: {
						"&.Mui-selected": {
							backgroundColor: rowColor,
							borderColor: "blue",
						},
						"&:hover": {
							backgroundColor: "rgb(180, 180, 180)",
						},
					},
				},
			},
		},
	});

	// const fetchRequest = useCallback(async () => {
	//     const reponse = await fetch("https://e-kalkual-default-rtdb.asia-southeast1.firebasedatabase.app/request.json")
	//     const data = await reponse.json()

	//     const loadedRequest = [];

	//     console.log("ini data dari db")
	//     console.log(data);
	//     for (const key in data) {
	//         loadedRequest.push({
	//             ...data[key],
	//             id: key
	//         })

	//     }
	//     console.log("yg ini data setelah jadi array")
	//     console.log(loadedRequest)

	//     // setDummy(loadedRequest);
	// })

	async function getData(dashboard) {
		setIsLoading(true);
		const response = await fetch(
			"https://portal.bintang7.com/Kalkual/api/kalkual",
			{
				method: "POST",
				body: JSON.stringify(dashboard),
				headers: {
					"Content-Type": "application/json",
					Accept: "*/*",
				},
			}
		)
			.then((resp) => {
				resp.json().then((data) => {
					const parsedData = JSON.parse(data).map((item, index) => {
						return {
							...item,
							id: index,
						};
					});

					setDummy(parsedData);
					setIsLoading(false);
				});
			})
			.catch((e) => {
				console.log(e);
				setIsLoading(false);
			});
	}

	useEffect(() => {
		getData(dashboard);
	}, []);

	async function tickStep(val) {
		const data = {
			Option: "TickStep",
			NoIN: val.row.NoIN,
		};

		const response = await fetch(
			"https://portal.bintang7.com/Kalkual/api/kalkual",
			{
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					Accept: "*/*",
				},
			}
		)
			.then((resp) => {
				resp.json().then((data) => {
					const parsedData = JSON.parse(data).map((item, index) => {
						return {
							...item,
							id: index,
							TglKalkual: item.TglKalkual.slice(0, 10),
							EDKalkual: item.EDKalkual.slice(0, 10),
						};
					});

					setDummy(parsedData);
				});
			})
			.catch((e) => {
				console.log(e);
			});
	}

	const columns = [
		{
			headerName: "Release step",
			headerAlign: "center",
			field: "Step",
			filterable: false,
			width: 75,
			renderCell: (val) => {
				return (
					<Checkbox
						onChange={() => {
							tickStep(val);
						}}
						disabled={
							val.row.Status === "In progress" || val.row.Status === "Completed"
						}
						checked={
							val.row.Status === "In progress" || val.row.Status === "Completed"
						}
					/>
				);
			},
		},
		{ headerName: "IN*", headerAlign: "center", field: "NoIN", width: 150 },
		{
			headerName: "Nama Alat/Mesin/Sistem Penunjang/Ruangan",
			headerAlign: "center",
			field: "Nama",
			width: 200,
		},
		{
			headerName: "Tipe (Alat/Mesin/Sistem Penunjang)",
			headerAlign: "center",
			field: "Tipe",
			width: 150,
		},
		{
			headerName: "No Kontrol",
			headerAlign: "center",
			field: "NoKontrol",
			width: 150,
		},
		{
			headerName: "Departemen Pemilik",
			headerAlign: "center",
			field: "Departemen",
			width: 100,
		},
		{
			headerName: "Lokasi",
			headerAlign: "center",
			field: "Lokasi",
			width: 75,
			type: "singleSelect",
			valueOptions: ["PLG", "CKR"],
		},
		{
			headerName: "Tanggal Kalkual",
			headerAlign: "center",
			field: "TglKalkual",
			width: 175,
			type: "date",
			valueFormatter: (params) => format(parseISO(params?.value), "dd-MM-yyyy"),
		},
		{
			headerName: "Frekuensi Kalkual (Umur Jatuh Tempo)",
			headerAlign: "center",
			field: "EDKalkual",
			width: 150,
			type: "date",
			valueFormatter: (params) => format(parseISO(params?.value), "dd-MM-yyyy"),
		},
		{
			headerName: "Jenis Kalkual (internal/eksternal)",
			headerAlign: "center",
			field: "JenisKalkual",
			width: 150,
			type: "singleSelect",
			valueOptions: ["Internal", "Eksternal"],
		},
		{
			headerName: "Status",
			headerAlign: "center",
			field: "Status",
			width: 100,
			type: "singleSelect",
			valueOptions:
				typeof dummy !== "undefined" && dummy.length > 0
					? dummy
							.map((obj) => obj.Status)
							.filter((value, index, self) => self.indexOf(value) === index)
							.filter((obj) => obj)
					: "ERROR",
		},
		{
			headerName: "Urgensi",
			field: "dueColor",
			hide: true,
			type: "singleSelect",
			valueOptions:
				typeof dummy !== "undefined" && dummy.length > 0
					? dummy
							.map((obj) => obj.dueColor)
							.filter((value, index, self) => self.indexOf(value) === index)
							.filter((obj) => obj)
					: "ERROR",
		},
	];

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
						width={1}
						sx={{
							backgroundColor: "rgba(0, 0, 0, 0.8)",
							borderRadius: 3,
							borderTop: 1,
							borderBottom: 1,
							borderColor: "rgba(220, 220, 220, 0.8)",
							borderWidth: 2,
							boxShadow: 5,
						}}
					>
						<Typography variant="h5">Dashboard</Typography>
						<hr />
						<Box
							sx={{
								height: "515px",
								width: "95%",
								backgroundColor: "lightgray",
								marginTop: "5vh",
								margin: "auto auto",
								borderRadius: "5px",
								"& .super-app-theme--Moderate": {
									bgcolor: "yellow",
								},
								"& .super-app-theme--Urgent": {
									bgcolor: "rgb(226, 0, 0)",
									color: "rgb(246, 246, 246)",
								},
								"& .super-app-theme--Expired": {
									bgcolor: "gray",
								},
								"& .super-app-theme--Done": {
									bgcolor: "green",
									color: "rgb(246, 246, 246)",
								},
							}}
						>
							<DataGrid
								getRowId={(dummy) => dummy.id}
								columns={columns}
								rows={dummy}
								pageSize={10}
								rowsPerPageOptions={[10]}
								rowHeight={35}
								headerHeight={55}
								loading={isLoading}
								components={{ Toolbar: GridToolbar }}
								disableColumnSelector={true}
								disableDensitySelector={true}
								componentsProps={{
									filterPanel: {
										columnsSort: "asc",
										filterFormProps: {
											columnInputProps: {
												variant: "outlined",
												size: "small",
												sx: { mt: "auto" },
											},
											operatorInputProps: {
												variant: "outlined",
												size: "small",
												sx: { mt: "auto" },
											},
											valueInputProps: {
												variant: "outlined",
												size: "small",
											},
										},
										sx: {
											// Customize inputs using css selectors
											"& .MuiDataGrid-filterForm": { px: 2 },
											"& .MuiDataGrid-filterFormLinkOperatorInput": { mr: 2 },
											"& .MuiDataGrid-filterFormColumnInput": { mr: 2, width: 150 },
											"& .MuiDataGrid-filterFormOperatorInput": { mr: 2 },
											"& .MuiDataGrid-filterFormValueInput": { width: 200 },
										},
									},
								}}
								onSelectionModelChange={(id) => {
									const selectedID = new Set(id);
									const selectedRowData = dummy.find((row) => selectedID.has(row.id));
									setSelectedData(selectedRowData);
									console.log(selectedRowData);

									if (selectedRowData.Status === "In progress") {
										dispatch(uploadLaporanActions.inputLaporan(selectedRowData));
										navigate("/approval/uploadlaporan");
									}

									if (selectedRowData.Status === "Completed") {
										setBtnBarcode(true);
										dispatch(labelActions.generateQR(selectedRowData.NoIN));
									} else setBtnBarcode(false);

									if (selectedRowData.dueColor === "light")
										setRowColor("rgb(210, 210, 210)");
									else if (selectedRowData.dueColor === "moderate")
										setRowColor("rgb(200, 200, 0)");
									else if (selectedRowData.dueColor === "urgent")
										setRowColor("rgb(230, 0, 0)");
									else if (selectedRowData.dueColor === "expired")
										setRowColor("rgb(210, 210, 210)");
									else if (selectedRowData.dueColor === "done")
										setRowColor("rgb(25, 170, 0)");
								}}
								getRowClassName={(params) => `super-app-theme--${params.row.dueColor}`}
								sx={{
									"& .MuiDataGrid-columnHeaderTitle": {
										textOverflow: "clip",
										whiteSpace: "break-spaces",
										lineHeight: 1,
										fontWeight: "bold",
									},
									"& .MuiDataGrid-cell": {
										border: "1px solid #000000",
									},
								}}
							/>
						</Box>
						<Box
							mb={2.2}
							mt={1}
							mr={3.5}
							display="flex"
							justifyContent="flex-end"
							alignItems="flex-end"
						>
							<ReactToPrint
								trigger={() => (
									<Button
										variant="contained"
										color="success"
										type="button"
										disabled={!btnBarcode}
									>
										Print Barcode
									</Button>
								)}
								content={() => barcodeRef.current}
							/>
						</Box>
						<div style={{ display: "none" }}>
							<QRCode ref={barcodeRef} />
						</div>
					</Box>
				</Box>
			</ThemeProvider>
		</Navbar>
	);
};

export default DashboardJadwal;
