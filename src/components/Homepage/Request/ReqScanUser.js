import { Box, Backdrop, CircularProgress } from "@mui/material";
import { QrReader } from "react-qr-reader";
import { labelActions } from "../../../store/label-gen";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import axios from "axios";
import Navbar from "../../Layout/Navbar";

const ReqScanUser = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const scanHandler = async (scannedData) => {
		console.log(scannedData);
		const response = await axios
			.post("https://portal.bintang7.com/Kalkual/api/kalkual", {
				Option: "Get Scanned Data",
				NoIN: scannedData.text,
			})
			.then((resp) => {
				let parsedData = JSON.parse(resp.data);
				console.log(parsedData);
				dispatch(labelActions.generateLabel(...parsedData));
				// setData(...parsedData);
				if (parsedData[0].Jenis === "Kalibrasi") navigate("/label/kalibrasi");
				else if (parsedData[0].Jenis === "Kualifikasi")
					navigate("/label/kualifikasi");
				setLoading(false);
			});
	};

	return (
		<Navbar>
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
					border={1}
					sx={{
						borderWidth: 5,
						backgroundColor: "rgba(0, 0, 0, 0.8)",
						borderColor: "rgba(220, 220, 220, 0.8)",
						boxShadow: 5,
					}}
				>
					<QrReader
						constraints={{
							facingMode: "environment",
						}}
						onResult={(res, err) => {
							if (!!res) {
								scanHandler(res);
								setLoading(true);
							}
						}}
						containerStyle={{ width: "600px" }}
					/>
				</Box>
			</Box>
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</Navbar>
	);
};

export default ReqScanUser;
