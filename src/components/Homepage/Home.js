import { Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";

import Navbar from "../Layout/Navbar";

const Home = () => {
	const theme = createTheme({
		typography: {
			h3: {
				fontWeight: "bold",
				color: "white",
				letterSpacing: 0,
				marginLeft: "2vw",
				marginRight: "2vw",
				marginTop: "2vh",
				marginBottom: "2vh",
			},
		},
	});

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
					width={1}
					textAlign="center"
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
					<ThemeProvider theme={theme}>
						<Typography variant="h3">E-Kalkual Home</Typography>
					</ThemeProvider>
				</Box>
			</Box>
		</Navbar>
	);
};

export default Home;
