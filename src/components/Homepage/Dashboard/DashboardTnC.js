import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Typography } from '@mui/material';

import Navbar from "../../Layout/Navbar";
import styles from "./DashboardQA.module.css";

const DashboardTnC = () => {
    const theme = createTheme({
        typography: {
            h5: {
                fontWeight: "bold",
                color: "white",
                letterSpacing: 0,
                textAlign: "center",
                marginTop: "2vh"
            }
        },
        palette: {
            action: {
                disabledBackground: "rgba(230, 233, 233, 0.99)",
                // disabled: "black"
            }
        }
    });

    const columns = [
        { headerName: 'No', headerAlign: 'center', field: 'No', width: 75 },
        { headerName: 'Nama TMB/CWR', headerAlign: 'center', field: 'Nama', width: 350 },
        { headerName: 'No Kontrol', headerAlign: 'center', field: 'NoKontrol', width: 150 },
        { headerName: 'Time Stamp Request', headerAlign: 'center', field: 'TimeStamp', width: 175 },
        { headerName: 'Username', headerAlign: 'center', field: 'Username', width: 175 },
        { headerName: 'Lokasi', headerAlign: 'center', field: 'Lokasi', width: 140 },
    ];

    const rows = [
        { No: '1', Nama: '-', NoKontrol: '-', TimeStamp: '-', Username: 'A Keep', Lokasi: '-'},
    ]

    return (
        <Navbar>
            <ThemeProvider theme={theme}>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{
                    m: "auto auto", 
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    borderRadius: 3,
                    boxShadow: "0 1 4 rgba(0, 0, 0, 0.2)",
                    minHeight: `calc(100vh - 48px)`
                }}>
                    <Box width={1} sx={{ 
                        backgroundColor: "rgba(0, 0, 0, 0.8)", 
                        borderRadius: 3, 
                        borderTop: 1, 
                        borderBottom: 1, 
                        borderColor: "rgba(220, 220, 220, 0.8)", 
                        borderWidth: 2,
                        boxShadow: 5
                    }}>
                        <Typography variant="h5">DASHBOARD OUTSTANDING TMB DAN CWR</Typography>
                        <hr/>
                        <Box sx={{ height: '100%', width: '95%', backgroundColor: 'lightgray', marginTop: "5vh", margin: 'auto auto', borderRadius: '5px' }}>
                            <DataGrid
                                getRowId={(data) => data.NoKontrol}
                                columns={columns}
                                rows={rows}
                                pageSize={5}
                                pageSizeOptions={[5, 10, 20, 50, 100]}
                                checkBoxSelection
                                autoHeight={true}
                                sx={{
                                    '& .MuiDataGrid-columnHeaderTitle': {
                                        textOverflow: "clip",
                                        whiteSpace: "break-spaces",
                                        lineHeight: 1,
                                        fontWeight: "bold",
                                    },
                                    '& .MuiDataGrid-cell': {
                                        border: '1px solid #000000'
                                    }
                                }}
                            />
                        </Box>
                        <Box marginTop="5vh" />
                    </Box>
                </Box>
            </ThemeProvider>
        </Navbar>
    )
}

export default DashboardTnC;