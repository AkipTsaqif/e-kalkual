import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from 'react' 
import { Checkbox } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography, Button } from "@mui/material";
import Box from '@mui/material/Box';
import { red } from '@mui/material/colors'
import Navbar from "../Layout/Navbar"
import styles from './DashboardJadwal.module.css'
import { parse } from 'date-fns';
import { useNavigate } from 'react-router';

import { uploadLaporanActions } from '../../store/upload-laporan';

const DashboardJadwal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dummy, setDummy] = useState([]);
    const [selectedData, setSelectedData] = useState({});
    const dashboard = {
        Option: "Dashboard"
    }

    const theme = createTheme({
        typography: {
            h3: {
                fontWeight: "bold",
                color: "white",
                letterSpacing: 0,
                textAlign: "center",
                marginTop: "2vh"
            }
        }
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
        const response = await fetch("https://localhost:44375/api/kalkual", {
            method: 'POST',
            body: JSON.stringify(dashboard),
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        }).then(resp => {
            resp.json().then(data => {
                const parsedData = JSON.parse(data).map((item, index) => {
                    return {
                        ...item,
                        id: index,
                        TglKalkual: item.TglKalkual.slice(0, 10),
                        EDKalkual: item.EDKalkual.slice(0, 10)
                    }
                });

                setDummy(parsedData);
            });
        }).catch(e => {
            console.log(e);
        });
    }

    useEffect(() => {
        getData(dashboard);
    }, [])

    useEffect(() => {
        if (!selectedData) tickStep();
    }, [selectedData])
 

    async function tickStep(val) {   
        const data = {
            Option: 'TickStep',
            NoIN: val.row.NoIN
        }

        if (selectedData.length !== 0) {
            const response = await fetch("https://localhost:44375/api/kalkual", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            }).then(resp => {
                resp.json().then(data => {
                    const parsedData = JSON.parse(data).map((item, index) => {
                        return {
                            ...item,
                            id: index,
                            TglKalkual: item.TglKalkual.slice(0, 10),
                            EDKalkual: item.EDKalkual.slice(0, 10)
                        }
                    });
                    
                    setDummy(parsedData);
                });
            }).catch(e => {
                console.log(e);
            });
        }
    }
    
    const columns = [
        { headerName: 'Release step', headerAlign: 'center', field: 'Step', width: 75, renderCell: (val) => {
            return <Checkbox onChange={() => {tickStep(val)}} disabled={val.row.Status === "In progress"} checked={val.row.Status === "In progress"}/>
        } },
        { headerName: 'IN*', headerAlign: 'center', field: 'NoIN', width: 100 },
        { headerName: 'Nama Alat/Mesin/Sistem Penunjang/Ruangan', headerAlign: 'center', field: 'Nama', width: 200 },
        { headerName: 'Tipe (Alat/Mesin/Sistem Penunjang)', headerAlign: 'center', field: 'Tipe', width: 150 },
        { headerName: 'No Kontrol', headerAlign: 'center', field: 'NoKontrol', width: 150 },
        { headerName: 'Departemen Pemilik', headerAlign: 'center', field: 'Departemen', width: 100 },
        { headerName: 'Lokasi', headerAlign: 'center', field: 'Lokasi', width: 75 },
        { headerName: 'Tanggal Kalkual', headerAlign: 'center', field: 'TglKalkual', width: 175 },
        { headerName: 'Frekuensi Kalkual (Umur Jatuh Tempo)', headerAlign: 'center', field: 'EDKalkual', width: 150 },
        { headerName: 'Jenis Kalkual (internal/eksternal)', headerAlign: 'center', field: 'JenisKalkual', width: 150 },
        { headerName: 'Status', headerAlign: 'center', field: 'Status', width: 100 },
    ];

    return (
        <div>
            <Navbar>
                <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.8)", borderRadius: 3, borderTop: 1, borderBottom: 1, borderColor: "rgba(220, 220, 220, 0.8)", borderWidth: 2}}>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h3">Dashboard</Typography>
                    </ThemeProvider>    
                    <hr />                    
                    <Box sx={{height: '100%', width: '95%', backgroundColor: 'lightgray', marginTop: '5vh', margin: 'auto auto', borderRadius: '5px',
                                '& .super-app-theme--1': {
                                    bgcolor: 'yellow'
                                },
                                '& .super-app-theme--2': {
                                    bgcolor: 'red'
                                },
                                '& .super-app-theme--3': {
                                    bgcolor: 'gray'
                                }
                            }}>

                        <DataGrid
                            getRowId={(dummy) => dummy.id}
                            columns={columns}
                            rows={dummy}
                            pageSizeOptions={[5, 10, 20, 50, 100]}
                            rowsPerPageOptions={[5, 10, 20, 50, 100]}
                            autoHeight={true}
                            onSelectionModelChange={id => {
                                const selectedID = new Set(id);
                                const selectedRowData = dummy.find(row => selectedID.has(row.id));
                                // setSelectedData(selectedRowData);
                                console.log(selectedRowData);
                                dispatch(uploadLaporanActions.inputLaporan(selectedRowData));
                                navigate('/approval/uploadlaporan');
                            }}
                            getRowClassName={(params) => `super-app-theme--${params.row.dueColor}`}
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
                    <Box m={3} display="flex" justifyContent="flex-end" alignItems="flex-end">
                        <Button variant="contained" color="success" type="button">Print Barcode</Button>
                    </Box>
                </Box>
            </Navbar>
        </div>
    )
}

export default DashboardJadwal