import { Link, useNavigate } from "react-router-dom";
import Arrow from "../../assets/img/arrow.png";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AddUser() {
  const navigate = useNavigate(); 
  const [data, setData] = useState({
    nama_mata_pelajaran: ""
  }); 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // console.log(data);
      await axios.post(
        "http://127.0.0.1:8000/api/kelolamapel/tambah?token=" +
          window.localStorage.getItem("token"),
        data
      );
      navigate("/dashboard/kelolamapel");
    } catch (error) {
      console.log(error);
    }
  };
 

  return (
    <>
      <div className="content">
        <div className="title-box">
          <h1>Kelola User</h1>
        </div>
        <div className="card-content">
          <div className="title-content">
            <span>Tambah Mata Pelajaran</span>
            <span id="min">----</span>
          </div>
          <div className="box-content">
            <span className="add">
              <Link to="/dashboard/kelolamapel">
                <img srcSet={Arrow} />
              </Link>
            </span> 
            <div className="form-container">
              <form action="" onSubmit={handleSubmit} className="f-05">
                <div className="input-form">
                  <label htmlFor="namaMapel">Nama Mata Pelajaran</label>
                  <input
                    type="text"
                    id="namaMapel"
                    onChange={(e) => {
                      setData({ ...data, nama_mata_pelajaran: e.target.value });
                    }}
                    value={data.nama_mata_pelajaran}
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
