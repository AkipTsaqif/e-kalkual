import './App.css';
import Login from './components/Auth/Login';
import Home from './components/Homepage/Home';
import { Routes, Route } from 'react-router-dom';
import DashboardJadwal from './components/Homepage/DashboardJadwal';
import Request from './components/Homepage/Request';
import Verifikasi from './components/Homepage/Verifikasi';
import Kalibrasi from './components/Homepage/Request/Kalibrasi';
import VerifPeriode from './components/Homepage/Verifikasi/VerifPeriode';
import VerifTimbangan from './components/Homepage/Verifikasi/VerifTimbangan';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="dashboard" element={<DashboardJadwal />} />
        <Route path="request" element={<Request />} />
        <Route path="verifikasi" element={<Verifikasi />} />
        <Route path="request/kalibrasi" element={<Kalibrasi />} />
        <Route path="verifikasi/verifperiode" element={<VerifPeriode />} />
        <Route path="verifikasi/veriftimbangan" element={<VerifTimbangan />} />
      </Routes>   
  );
}

export default App;
