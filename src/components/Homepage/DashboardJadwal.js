import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from 'react' 
import { Checkbox } from '@mui/material';

import Navbar from "../Layout/Navbar"
import styles from './DashboardJadwal.module.css'

const DashboardJadwal = () => {
    const [dummy, setDummy] = useState([]);

    const fetchRequest = useCallback(async () => {
        const reponse = await fetch("https://e-kalkual-default-rtdb.asia-southeast1.firebasedatabase.app/request.json")
        const data = await reponse.json()

        const loadedRequest = [];

        for (const key in data) {
            loadedRequest.push({
                ...data[key],
                id: key
            })
        }

        setDummy(loadedRequest);
    })

    useEffect(() => {
        fetchRequest();
    }, [])

    console.log(dummy)
    
    const columns = [
        { headerName: 'Release step', headerAlign: 'center', field: 'Step', width: 75, renderCell: () => {
            <Checkbox />
        } },
        { headerName: 'IN*', headerAlign: 'center', field: 'noIN', width: 150 },
        { headerName: 'Nama Alat/Mesin/Sistem Penunjang/Ruangan', headerAlign: 'center', field: 'nama', width: 200 },
        { headerName: 'Tipe (Alat/Mesin/Sistem Penunjang)', headerAlign: 'center', field: 'tipeAlat', width: 200 },
        { headerName: 'No Kontrol', headerAlign: 'center', field: 'noKontrol', width: 100 },
        { headerName: 'Departemen Pemilik', headerAlign: 'center', field: 'departemen', width: 100 },
        { headerName: 'Lokasi', headerAlign: 'center', field: 'lokasi', width: 75 },
        { headerName: 'Tgl Kalibrasi/Kualifikasi', headerAlign: 'center', field: 'tglKalkual', width: 175 },
        { headerName: 'Frekuensi Kalibrasi/Kualifikasi (Umur Jatuh Tempo)', headerAlign: 'center', field: 'EDKalibrasi', width: 150 },
        { headerName: 'Jenis Kalibrasi/Kualifikasi (internal/eksternal)', headerAlign: 'center', field: 'jenisKalibrasi', width: 150 },
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
                            getRowId={(dummy) => dummy.nama}
                            columns={columns}
                            rows={dummy}
                            pageSize={5}
                            pageSizeOptions={[5, 10, 20, 50, 100]}
                            autoHeight={true}
                            sx={{
                                '& .MuiDataGrid-columnHeaderTitle': {
                                    textOverflow: "clip",
                                    whiteSpace: "break-spaces",
                                    lineHeight: 1
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