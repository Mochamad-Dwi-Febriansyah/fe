import { useEffect, useState } from "react";
import Edit from "../../assets/img/edit.png";
import Add from "../../assets/img/add.png";
import Trash from "../../assets/img/trash.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function KelolaKelas() {
  const [dkelas, setDkelas] = useState([{ nama_kelas: "", jumlah_siswa: "" }]);
  const navigate = useNavigate();

  const getDkelas = async () => {
    try {
      const data = await axios.get(
        "http://127.0.0.1:8000/api/kelolakelas?token=" +
          window.localStorage.getItem("token")
      );
      setDkelas(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/kelolakelas/${id}?token=` +
          window.localStorage.getItem("token")
      ); 
      getDkelas();
    } catch (error){
        console.log(error)
    }
  };
  useEffect(() => {
    getDkelas();
  }, []);

  return (
    <>
      <div className="content">
        <div className="title-box">
          <h1>Kelola Kelas</h1>
        </div>

        <div className="card-content">
          <div className="title-content">
            <span>Daftar Kelas</span>
            <span id="min">----</span>
          </div>
          <div className="box-content">
              <span className="add">
                <Link to="/dashboard/kelolakelas/tambah"><img srcSet={Add} alt="" /></Link>
              </span>
            <div className="content-container scroll">
              <table>
                <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Kelas</th>
                  <th>Jumlah Siswa</th>
                  <th>Status</th>
                </tr>
                </thead>
                {dkelas.map((dkelass, index) => (
                  <tbody key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{dkelass.nama_kelas}</td>
                    <td>{dkelass.jumlah_siswa}</td>
                    <td className="kotak-kotak">
                      <h6 className="br-3-hijau">
                        <Link to={"/dashboard/kelolakelas/"+dkelass.id+"/kelolauser"}>Kelola User</Link>
                      </h6>
                      <span className="edit">
                        <Link to={"/dashboard/kelolakelas/edit/"+dkelass.id}><img srcSet={Edit} alt="" /></Link>
                      </span>
                      <button
                        onClick={() => handleDelete(dkelass.id)}
                        className="delete"
                      >
                        <img srcSet={Trash} alt="" />{" "}
                      </button>
                    </td>
                  </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
