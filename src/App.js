import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/css/style.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import KelolaUser from "./components/ComponenUser/KelolaUser";
import Logout from "./components/Logout";
import AddUser from "./components/ComponenUser/AddUser";
import AddMapel from "./components/ComponenMapel/AddMapel";
import AddKelas from "./components/ComponenKelas/AddKelas";
import EditUser from "./components/ComponenUser/EditUser";
import EditMapel from "./components/ComponenMapel/EditMapel";
import KelolaMapel from "./components/ComponenMapel/KelolaMapel";
import KelolaKelas from "./components/ComponenKelas/KelolaKelas";
import KelolaKelasKelolaUser from "./components/ComponenKelas/KelolaKelasKelolaUser";

import KelolaBerita from "./components/ComponenBerita/KelolaBerita";
import AddBerita from "./components/ComponenBerita/AddBerita.jsx";

import KelolaPertemuan from "./components/ComponenPertemuan/KelolaPertemuan";

import PengumpulanTugas from "./components/ComponenPengumpulanTugas/KelolaPengumpulanTugas";

import Pertemuan from "./components/Pertemuan/Pertemuan";
import GetPertemuan from "./components/PertemuanByMapel/PertemuanByMapel";
import GetDetailPertemuan from "./components/DetailPertemuan/DetailPertemuan";
import { USER } from "./utils";

function App() { 
  // console.log(USER())
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<Dashboard />} />
      
          { USER() && USER().nisn === "admin" && (
            <>
              <Route path="/dashboard/kelolauser" element={<KelolaUser />} />
              <Route path="/dashboard/kelolauser/tambah" element={<AddUser />} />
              <Route path="/dashboard/kelolauser/edit/:id" element={<EditUser />} />

              <Route path="/dashboard/kelolaberita" element={<KelolaBerita />} />
              <Route path="/dashboard/kelolaberita/tambah" element={<AddBerita />} />

              <Route path="/dashboard/kelolamapel" element={<KelolaMapel />} />
              <Route  path="/dashboard/kelolamapel/tambah"  element={<AddMapel />} />
              <Route  path="/dashboard/kelolamapel/edit/:id"  element={<EditMapel />} />

              <Route path="/dashboard/kelolakelas" element={<KelolaKelas />} />
              <Route path="/dashboard/kelolakelas/:id/kelolauser" element={<KelolaKelasKelolaUser />} />
              <Route path="/dashboard/kelolakelas/tambah" element={<AddKelas />} />

              <Route path="/dashboard/kelolapertemuan" element={<KelolaPertemuan />} />

              <Route path="/pengumpulantugas" element={<PengumpulanTugas />} />

            </>
          )}

          <Route path="/pertemuan" element={<Pertemuan />} />
          <Route path="/pertemuan/mapel/:mapel_id" element={<GetPertemuan />} />

          <Route path="/pertemuan/mapel/:mapel_id/pertemuan/:pertemuan/tugas/:tugas_id" element={<GetDetailPertemuan />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
