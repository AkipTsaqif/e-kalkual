import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { approvalKalkualActions } from "../../../store/approval-kalkual";
import { parse, format, parseISO } from "date-fns";

import axios from "axios";
import Navbar from "../../Layout/Navbar";

const DashboardSPVUser = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [dummy, setDummy] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

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
	});

	let no = 0;
	const getData = async () => {
		setIsLoading(true);
		try {
			const response = await axios
				.post("https://portal.bintang7.com/Kalkual/api/kalkual", {
					Option: "Dashboard User",
				})
				.then((res) => {
					const parsedData = JSON.parse(res.data).map((item, index) => {
						return {
							...item,
							id: index,
							No: (no += 1),
							EDKalkual: item.EDKalkual.slice(0, 10),
						};
					});
					setDummy(parsedData);
					setIsLoading(false);
				});
		} catch (e) {
			console.log(e);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const columns = [
		{ headerName: "No", headerAlign: "center", field: "No", width: 5 },
		{ headerName: "Nama Alat", headerAlign: "center", field: "Nama", width: 350 },
		{
			headerName: "Tipe Kalkual",
			headerAlign: "center",
			field: "TipeKalkual",
			width: 120,
		},
		{
			headerName: "No Kontrol",
			headerAlign: "center",
			field: "NoKontrol",
			width: 150,
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
			headerName: "ED Kalkual",
			headerAlign: "center",
			field: "EDKalkual",
			width: 120,
			type: "date",
			valueFormatter: (params) => format(parseISO(params?.value), "dd-MM-yyyy"),
		},
		{
			headerName: "Remarks",
			headerAlign: "center",
			field: "Remarks",
			width: 200,
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
						<Typography variant="h5">DASHBOARD OUTSTANDING USER</Typography>
						<hr />
						<Box
							sx={{
								height: "496px",
								width: "95%",
								backgroundColor: "lightgray",
								marginTop: "5vh",
								margin: "auto auto",
								borderRadius: "5px",
							}}
						>
							<DataGrid
								getRowId={(data) => data.id}
								columns={columns}
								rows={dummy}
								pageSize={10}
								rowsPerPageOptions={[10]}
								headerHeight={55}
								rowHeight={35}
								loading={isLoading}
								disableColumnSelector={true}
								disableDensitySelector={true}
								components={{ Toolbar: GridToolbar }}
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
									// setSelectedData(selectedRowData);
									console.log(selectedRowData);
									dispatch(approvalKalkualActions.selectApproval(selectedRowData.NoIN));
									navigate("/approval/user");
								}}
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
						<Box marginTop="5vh" />
					</Box>
				</Box>
			</ThemeProvider>
		</Navbar>
	);
};

export default DashboardSPVUser;
