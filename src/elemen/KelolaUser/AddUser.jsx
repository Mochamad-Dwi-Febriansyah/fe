import { Link, useNavigate } from "react-router-dom";
import Arrow from "../../assets/img/arrow.png";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AddUser() {
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [kelas, setKelas] = useState([
    {
      id: "",
      nama_kelas: "",
    },
  ]);
  const [data, setData] = useState({
    nisn: "",
    nama: "",
    kelas_id: "",
  }); 
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    if (data.kelas_id == ""){
      setMessage("kelas_id not null");
      return false
    }
    try {
      // console.log(data);
      await axios.post(
        "http://127.0.0.1:8000/api/kelolauser/tambah?token=" +
          window.localStorage.getItem("token"),
        data
      );
      navigate("/dashboard/kelolauser"); 
    } catch (error) {
      console.log(error);
    }
  };

  const getKelas = async () => {
    try {
      const dasta = await axios.get(
        "http://127.0.0.1:8000/api/kelolakelas?token=" +
          window.localStorage.getItem("token")
      );
      setKelas(dasta.data);
    } catch (error) {
      console.log(error);
    }
  }; 
  useEffect(() => {
    getKelas();
  }, []);

  return (
    <>
      <div className="content">
        <div className="title-box">
          <h1>Kelola User</h1>
        </div>
        <div className="card-content">
          <div className="title-content">
            <span>Tambah Siswa</span>
            <span id="min">----</span>
          </div>
          <div className="box-content">
            <span className="add">
              <Link to="/dashboard/kelolauser">
                <img srcSet={Arrow} />
              </Link>
            </span>
            <div className="form-container">
              <form action="" onSubmit={handleSubmit} className="f-05">
                <div className="input-form">
                  <label htmlFor="nisn">NISN</label>
                  <input
                    type="text"
                    id="nisn"
                    onChange={(e) => {
                      setData({ ...data, nisn: e.target.value });
                    }}
                    value={data.nisn} required
                  />
                </div>
                <div className="input-form">
                  <label htmlFor="nama">Nama</label>
                  <input
                    type="text"
                    id="nama"
                    onChange={(e) => {
                      setData({ ...data, nama: e.target.value });
                    }}
                    value={data.nama} required
                  />
                </div>
                <div className="input-form">
                  <label htmlFor="kelas">kelas</label>
                  <p>{message && message}</p>
                  <select
                  id="kelas"
                    onChange={(e) => {
                      setData({ ...data, kelas_id: e.target.value });
                    }} value={data.kelas_id} 
                  >
                    <option>--pilih--</option>
                    {kelas.map((option, index) => (
                      <option value={option.id} key={index}>{option.nama_kelas}</option>
                    ))}
                  </select>
                </div>
                <div className="button-form">
                  <button type="submit">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
