import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography, Button } from "@mui/material";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import axios from "axios";

import { approvalKalkualActions } from '../../../store/approval-kalkual';

import Navbar from "../../Layout/Navbar"
import styles from "./DashboardQA.module.css"

const DashboardQA = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dummy, setDummy] = useState([]);

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

    let no = 0;
    const getData = async () => {
        try {
            const res = await axios.post("https://localhost:44375/api/kalkual", {
                Option: "Dashboard QA"
            });

            const parsedData = JSON.parse(res.data).map((item, index) => {
                return {
                    ...item,
                    id: index,
                    No: no += 1,
                    TglKalkual: item.TglKalkual.slice(0, 10),
                    EDKalkual: item.EDKalkual.slice(0, 10)
                }
            });

            console.log(parsedData);
            setDummy(parsedData);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const columns = [
        { headerName: 'No', headerAlign: 'center', field: 'No', width: 5 },
        { headerName: 'Nama Alat', headerAlign: 'center', field: 'Nama', width: 150 },
        { headerName: 'Tipe Kalkual', headerAlign: 'center', field: 'TipeKalkual', width: 100 },
        { headerName: 'No Kontrol', headerAlign: 'center', field: 'NoKontrol', width: 150 },
        { headerName: 'Dept Pemilik', headerAlign: 'center', field: 'Departemen', width: 75 },
        { headerName: 'Lokasi', headerAlign: 'center', field: 'Lokasi', width: 75 },
        { headerName: 'Site', headerAlign: 'center', field: 'Site', width: 75 },
        { headerName: 'Tgl Kalkual', headerAlign: 'center', field: 'TglKalkual', width: 100 },
        { headerName: 'ED Kalkual', headerAlign: 'center', field: 'EDKalkual', width: 100 },
        { headerName: 'Remarks', headerAlign: 'center', field: 'Remarks', width: 190 },
    ];

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
                        <Typography variant="h5">DASHBOARD OUTSTANDING QA</Typography>
                        <hr/>
                        <Box sx={{ height: '100%', width: '95%', backgroundColor: 'lightgray', marginTop: "5vh", margin: 'auto auto', borderRadius: '5px' }}>
                            <DataGrid
                                getRowId={(data) => data.id}
                                columns={columns}
                                rows={dummy}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                headerHeight={55}
                                rowHeight={36}
                                autoHeight
                                onSelectionModelChange={id => {
                                    const selectedID = new Set(id);
                                    const selectedRowData = dummy.find(row => selectedID.has(row.id));
                                    // setSelectedData(selectedRowData);
                                    console.log(selectedRowData);
                                    dispatch(approvalKalkualActions.selectApproval(selectedRowData.NoIN));
                                    navigate('/approval/qa');
                                }}
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

export default DashboardQA;