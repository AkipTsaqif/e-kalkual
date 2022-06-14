import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import Navbar from "../../Layout/Navbar"
import styles from "./DashboardSPVUser.module.css"

const DashboardSPVUser = () => {
    const columns = [
        { headerName: 'No', headerAlign: 'center', field: 'No', width: 75 },
        { headerName: 'Nama Alat', headerAlign: 'center', field: 'Nama', width: 200 },
        { headerName: 'Tipe Kalkual', headerAlign: 'center', field: 'Tipe', width: 200 },
        { headerName: 'No Kontrol', headerAlign: 'center', field: 'NoKontrol', width: 100 },
        { headerName: 'Lokasi', headerAlign: 'center', field: 'Lokasi', width: 75 },
        { headerName: 'ED Kalibrasi/Kualifikasi', headerAlign: 'center', field: 'EDKalkual', width: 175 },
        { headerName: 'Remarks', headerAlign: 'center', field: 'Remarks', width: 150 },
    ];

    const rows = [
        { No: '1', Nama: '-', Tipe: '-', NoKontrol: '-', Lokasi: '-', EDKalkual: '-', Remarks: 'Testestes'},
    ]

    return (
        <div>
            <Navbar>
                <div className={styles.card}>
                    <h1>DASHBOARD OUTSTANDING SUPERVISOR USER</h1>
                    <div style={{ height: '100%', width: '100%' }}>
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
                                    lineHeight: 1
                                },
                                '& .MuiDataGrid-cell': {
                                    border: '1px solid #000000'
                                }
                            }}
                        />
                    </div>
                </div>
            </Navbar>
        </div>
    )
}

export default DashboardSPVUser;