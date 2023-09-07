import { useEffect, useState } from "react";
import Edit from "../../assets/img/edit.png";
import Add from "../../assets/img/add.png";
import Trash from "../../assets/img/trash.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function KelolaUser() {
  const [dsiswa, setDsiswa] = useState([{ nisn: "", nama: "" }]);
  const navigate = useNavigate();

  const getDsiswa = async () => {
    try {
      const data = await axios.get(
        "http://127.0.0.1:8000/api/kelolauser?token=" +
          window.localStorage.getItem("token")
      );
      setDsiswa(data.data)
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(dsiswa.kelas)
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/kelolauser/${id}?token=` +
          window.localStorage.getItem("token")
      ); 
      getDsiswa();
    } catch (error){
        console.log(error)
    }
  };

  useEffect(() => {
    getDsiswa();
  }, []);

  return (
    <>
      <div className="content">
        <div className="title-box">
          <h1>Kelola User</h1>
        </div>

        <div className="card-content">
          <div className="title-content">
            <span>Daftar Hadir</span>
            <span id="min">----</span>
          </div>
          <div className="box-content">
              <span className="add">
                <Link to="/dashboard/kelolauser/tambah"><img srcSet={Add} alt="" /></Link>
              </span>
            <div className="content-container scroll">
              <table>
                <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Nisn</th> 
                  <th>Nama Kelas</th> 
                  <th>Status</th>
                </tr>
                </thead>
                
                {dsiswa.map((dsiswas, index) => (
                  <tbody key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{dsiswas.nama}</td>
                    <td>{dsiswas.nisn}</td>
                    <td>{dsiswas.kelas?.nama_kelas}</td>
                    <td className="kotak-kotak">
                      <span className="edit">
                        <Link to={"/dashboard/kelolauser/edit/"+dsiswas.id}><img srcSet={Edit} alt="" /></Link>
                      </span>
                      <button
                        onClick={() => handleDelete(dsiswas.id)}
                        className="delete"
                      >
                        <img srcSet={Trash} alt="" />
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
