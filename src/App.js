import styles from './App.css';
import Paper from '@mui/material/Paper';

import Login from './components/Auth/Login';
import Home from './components/Homepage/Home';
import { Routes, Route } from 'react-router-dom';
import DashboardJadwal from './components/Homepage/DashboardJadwal';
import Request from './components/Homepage/Request';
import Verifikasi from './components/Homepage/Verifikasi';
import ReqKalkual from './components/Homepage/Request/ReqKalkual';
import VerifPeriode from './components/Homepage/Verifikasi/VerifPeriode';
import VerifTimbangan from './components/Homepage/Verifikasi/VerifTimbangan';
import ReqScanUser from './components/Homepage/Request/ReqScanUser';
import ReqKalkualUser from './components/Homepage/Request/ReqKalkualUser';
import DashboardSPVUser from './components/Homepage/Dashboard/DashboardSPVUser';
import ApprovalUser from './components/Homepage/Approval/ApprovalUser';
import DashboardQA from './components/Homepage/Dashboard/DashboardQA';
import ApprovalQA from './components/Homepage/Approval/ApprovalQA';
import ApprovalLaporan from './components/Homepage/Approval/ApprovalLaporan';
import DashboardTnC from './components/Homepage/Dashboard/DashboardTnC';
import ApprovalTnC from './components/Homepage/Approval/ApprovalTnC';

function App() {
  return (
    <div className={styles.bg}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="dashboard" element={<DashboardJadwal />} />
        <Route path="request" element={<Request />} />
        <Route path="verifikasi" element={<Verifikasi />} />
        <Route path="request/new" element={<ReqKalkual />} />
        <Route path="verifikasi/periode" element={<VerifPeriode />} />
        <Route path="verifikasi/timbangan" element={<VerifTimbangan />} />
        <Route path="request/scanned" element={<ReqScanUser />} />
        <Route path="request/scanned/register" element={<ReqKalkualUser />} />
        <Route path="dashboard/user" element={<DashboardSPVUser />} />
        <Route path="approval/user" element={<ApprovalUser />} />
        <Route path="dashboard/qa" element={<DashboardQA />} />
        <Route path="approval/qa" element={<ApprovalQA />} />
        <Route path="approval/uploadlaporan" element={<ApprovalLaporan />} />
        <Route path="approval/timbangan" element={<ApprovalTnC />} />
        <Route path="dashboard/timbangan" element={<DashboardTnC />} />
      </Routes>   
    </div>
  );
}

export default App;
