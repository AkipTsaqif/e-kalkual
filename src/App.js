import './App.css';
import Login from './components/Auth/Login';
import Home from './components/Homepage/Home';
import { Routes, Route } from 'react-router-dom';
import DashboardJadwal from './components/Homepage/DashboardJadwal';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="dashboard" element={<DashboardJadwal />} />
      </Routes>   
  );
}

export default App;
