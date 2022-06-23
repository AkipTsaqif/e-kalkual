import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from 'react' 
import { Checkbox } from '@mui/material';
import { red } from '@mui/material/colors'
import Navbar from "../Layout/Navbar"
import styles from './DashboardJadwal.module.css'

const DashboardJadwal = () => {
    const [dummy, setDummy] = useState([]);
    const [selectedData, setSelectedData] = useState({});
    const dashboard = {
        Option: "Dashboard"
    }

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
                        TglKalkual: item.TglKalkual
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
 
    useEffect(() => {
        // tickStep(
        console.log(selectedData);
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
                console.log(resp);
                resp.json().then(data => {
                    const parsedData = JSON.parse(data).map((item, index) => {
                        return {
                            ...item,
                            id: index
                        }
                    });
                    
                    setDummy(parsedData);
                });
            }).catch(e => {
                console.log(e);
            });
        }
    }

    const testcb = (val) => {
        console.log(val.row.NoIN);
    }
    
    const columns = [
        { headerName: 'Release step', headerAlign: 'center', field: 'Step', width: 75, renderCell: (val) => {
            console.log(val.row.Status === "In progress");
            return <Checkbox onChange={() => {tickStep(val)}} disabled={val.row.Status === "In progress"} checked={val.row.Status === "In progress"}/>
        } },
        { headerName: 'IN*', headerAlign: 'center', field: 'NoIN', width: 150 },
        { headerName: 'Nama Alat/Mesin/Sistem Penunjang/Ruangan', headerAlign: 'center', field: 'Nama', width: 200 },
        { headerName: 'Tipe (Alat/Mesin/Sistem Penunjang)', headerAlign: 'center', field: 'Tipe', width: 200 },
        { headerName: 'No Kontrol', headerAlign: 'center', field: 'NoKontrol', width: 100 },
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
                <div className={styles.card}>
                    <h1>DASHBOARD JADWAL</h1>
                    <hr />                    
                    <div style={{ height: '100%', width: '95%', backgroundColor: 'lightgray', marginTop: '5vh', margin: 'auto auto', borderRadius: '5px' }}>
                        <DataGrid
                            getRowId={(dummy) => dummy.id}
                            columns={columns}
                            rows={dummy}
                            // onSelectionModelChange={id => {
                            //     const selectedID = new Set(id);
                            //     const selectedRowData = dummy.find(row => selectedID.has(row.id));
                            //     setSelectedData(selectedRowData);
                            //     console.log(selectedRowData);
                            // }}
                            pageSize={5}
                            pageSizeOptions={[5, 10, 20, 50, 100]}
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
                    </div>
                    <div className={styles.actions}>
                        <button type="button">Print Barcode</button>
                    </div>
                </div>
            </Navbar>
        </div>
    )
}

export default DashboardJadwal