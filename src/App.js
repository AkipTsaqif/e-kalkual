import styles from './App.css';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/Auth/PrivateRoute';

import Login from './components/Auth/Login';
import Home from './components/Homepage/Home';
import Sidebar from './components/Layout/Sidebar';
import DashboardJadwal from './components/Homepage/DashboardJadwal';
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
        <Route path="sidebar" element={<Sidebar />}/>
        <Route element={<PrivateRoute />}>
          <Route path='home' element={<Home />} />
          <Route path='dashboard' element={<DashboardJadwal />} />
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
        </Route>
      </Routes>   
    </div>
  );
}

export default App;
