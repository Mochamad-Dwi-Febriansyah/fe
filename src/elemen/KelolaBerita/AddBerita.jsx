import { Link, useNavigate } from "react-router-dom";
import Arrow from "../../assets/img/arrow.png";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AddBerita() {
  const navigate = useNavigate(); 
  const [message, setMessage] = useState();
  const [data, setData] = useState({
    judul_berita: "",
    isi_berita: "", 
  }); 
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (data.judul_berita == "" || data.isi_berita == "") {
      setMessage("isi Data dulu");
      return false;
    }
    try {
      // console.log(data);
      const res = await axios.post(
        "http://127.0.0.1:8000/api/kelolaberita/tambah?token=" +
          window.localStorage.getItem("token"),
        data
      ); 
      navigate("/dashboard/kelolaberita");
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
          <h1>Kelola Berita</h1>
        </div>
        <div className="card-content">
          <div className="title-content">
            <span>Tambah Berita</span>
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
                  <label htmlFor="judulBerita">Judul Berita</label>
                  <input
                    type="text"
                    id="judulBerita"
                    onChange={(e) => {
                      setData({ ...data, judul_berita: e.target.value });
                    }}
                    value={data.judul_berita}
                  />
                </div>
                <div className="input-form">
                  <label htmlFor="isiBerita">Isi Berita</label>
                  <input
                    type="text"
                    id="isiBerita"
                    onChange={(e) => {
                      setData({ ...data, isi_berita: e.target.value });
                    }}
                    value={data.isi_berita}
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
