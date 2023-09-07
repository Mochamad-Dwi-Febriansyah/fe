import { Link, useNavigate } from "react-router-dom";
import Arrow from "../../assets/img/arrow.png";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AddKelas() {
  const navigate = useNavigate(); 
  const [message, setMessage] = useState();
  const [data, setData] = useState({
    nama_kelas: "",
    jumlah_siswa: "", 
  }); 
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (data.nama_kelas == "" || data.jumlah_siswa == "") {
      setMessage("isi Data dulu");
      return false;
    }
    try {
      // console.log(data);
      const res = await axios.post(
        "http://127.0.0.1:8000/api/kelolakelas/tambah?token=" +
          window.localStorage.getItem("token"),
        data
      );
      console.log(data)
      navigate("/dashboard/kelolakelas");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
 
  }, []);

  return (
    <>
      <div className="content">
        <div className="title-box">
          <h1>Kelola Kelas</h1>
        </div>
        <div className="card-content">
          <div className="title-content">
            <span>Tambah Kelas</span>
            <span id="min">----</span>
          </div>
          <div className="box-content">
            <span className="add">
              <Link to="/dashboard/kelolakelas">
                <img srcSet={Arrow} />
              </Link>
            </span>
            <div className="form-container">
              <p>{message&&message}</p>
              <form action="" onSubmit={handleSubmit} className="f-05">
                <div className="input-form">
                  <label htmlFor="namaKelas">Nama Kelas</label>
                  <input
                    type="text"
                    id="namaKelas"
                    onChange={(e) => {
                      setData({ ...data, nama_kelas: e.target.value });
                    }}
                    value={data.nama_kelas}
                  />
                </div>
                <div className="input-form">
                  <label htmlFor="jumlahSiswa">Jumlah Siswa</label>
                  <input
                    type="text"
                    id="jumlahSiswa"
                    onChange={(e) => {
                      setData({ ...data, jumlah_siswa: e.target.value });
                    }}
                    value={data.jumlah_siswa}
                  />
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
