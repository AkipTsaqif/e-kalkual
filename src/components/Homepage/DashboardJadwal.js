import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from 'react' 
import Navbar from "../Layout/Navbar"
import styles from './DashboardJadwal.module.css'

const DashboardJadwal = () => {
    // const data = useSelector(state => state.requestNew);
    // console.log(data);

    const [dummy, setDummy] = useState();

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

    // useEffect(() => {
    //     fetch("https://e-kalkual-default-rtdb.asia-southeast1.firebasedatabase.app/request.json")
    //     .then((data) => data.json()).then((data) => setDummy(data))
    // }, []);

    // console.log(dummy)
    // console.log(dummy.req1)

    // const baris = dummy.map((row) => {
    //     return {
    //         IN: row.noIN,
    //         Nama: row.nama,
    //         NoKontrol: row.noKontrol,
    //         Tipe: row.tipeAlat,
    //         Departemen: row.departemen,
    //         Lokasi: row.lokasi,
    //         TglKalibrasi: row.tglKalkual,
    //         FrekuensiKalibrasi: row.edKalkual
    //     }
    // })
    
    const columns = [
        { headerName: 'Release step', headerAlign: 'center', field: 'Step', width: 75 },
        { headerName: 'IN*', headerAlign: 'center', field: 'IN', width: 150 },
        { headerName: 'Nama Alat/Mesin/Sistem Penunjang/Ruangan', headerAlign: 'center', field: 'Nama', width: 200 },
        { headerName: 'Tipe (Alat/Mesin/Sistem Penunjang)', headerAlign: 'center', field: 'Tipe', width: 200 },
        { headerName: 'No Kontrol', headerAlign: 'center', field: 'NoKontrol', width: 100 },
        { headerName: 'Departemen Pemilik', headerAlign: 'center', field: 'Departemen', width: 100 },
        { headerName: 'Lokasi', headerAlign: 'center', field: 'Lokasi', width: 75 },
        { headerName: 'Tgl Kalibrasi/Kualifikasi', headerAlign: 'center', field: 'TglKalibrasi', width: 175 },
        { headerName: 'Frekuensi Kalibrasi/Kualifikasi (Umur Jatuh Tempo)', headerAlign: 'center', field: 'FrekuensiKalibrasi', width: 150 },
        { headerName: 'Jenis Kalibrasi/Kualifikasi (internal/eksternal)', headerAlign: 'center', field: 'JenisKalibrasi', width: 150 },
        { headerName: 'Status', headerAlign: 'center', field: 'Status', width: 100 },
    ];

    const rows = [
        { Step: '-', IN: '-', Nama: '-', Tipe: '-', NoKontrol: '-', Departemen: '-', Lokasi: '-', TglKalibrasi: '-', FrekuensiKalibrasi: '-', JenisKalibrasi: '-', Status: '-' },
    ]

    console.log(dummy)
    console.log(rows)

    return (
        <div>
            <Navbar>
                <div className={styles.card}>
                    <h1>DASHBOARD JADWAL</h1>
                    <div style={{ height: '100%', width: '100%' }}>
                        <DataGrid
                            getRowId={(dummy) => dummy.Nama}
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