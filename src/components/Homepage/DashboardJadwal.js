import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import Navbar from "../Layout/Navbar"
import styles from './DashboardJadwal.module.css'

const DashboardJadwal = () => {
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

    return (
        <div>
            <Navbar>
                <div className={styles.card}>
                    <h1>DASHBOARD JADWAL</h1>
                    <div style={{ height: '100%', width: '100%' }}>
                        <DataGrid
                            getRowId={(data) => data.Step}
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