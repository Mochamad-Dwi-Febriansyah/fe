import { Link } from "react-router-dom";
import Add from "../../assets/img/add.png";
import B5 from "../../assets/img/b5.jpg";
import { useEffect, useState } from "react";
import axios, { all } from "axios";
import { USER } from "../../utils";

export default function Pertemuan() {
  const [message, setMessage] = useState();
  const [mapel, setMapel] = useState([{ kelas: "", mapel: "" }]);
  const [allmapel, setAllMapel] = useState();
  const [kelas, setKelas] = useState();
  const [namaKelas, setNamaKelas] = useState();
  const [dtKls, setDtKls] = useState({
    id: "",
  });
  const [dt, setDt] = useState({
    mapel_id: "",
  });
  // console.log(mapel)
  // console.log(window.localStorage);

  const getMapel = async () => {
    try {
      if (USER().nisn == "admin") {
        const firstkelas = await axios.get(
          "http://127.0.0.1:8000/api/kelolakelas/first?token=" +
            window.localStorage.getItem("token")
        );
        // const datauser = JSON.parse(localStorage.getItem("data"));
        // console.log(datauser)
        const kelas_id = {
          kelas_id: firstkelas.data.id,
        };
        // window.localStorage.setItem("datad", JSON.stringify(kelas_id));
        const data = await axios.post(
          "http://127.0.0.1:8000/api/kelolakelasmapel?token=" +
            window.localStorage.getItem("token"),
          kelas_id
        );
        window.localStorage.setItem("datad", JSON.stringify(kelas_id));
        setNamaKelas(firstkelas.data.nama_kelas);
        setMapel(data.data);
      } else if (USER().nisn != "admin") {
        const getData = JSON.parse(window.localStorage.getItem("data"));
        const kelas_id = {
          kelas_id: getData.kelas_id,
        };
        // window.localStorage.setItem("datad", JSON.stringify(kelas_id));
        const data = await axios.post(
          "http://127.0.0.1:8000/api/kelolakelasmapel?token=" +
            window.localStorage.getItem("token"),
          kelas_id
        );
        setNamaKelas(getData.nama_kelas);
        setMapel(data.data); 
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (dt.mapel_id == "") {
      setMessage("Pilih Mapel dulu");
      return false;
    }
    try {
      const datauser = JSON.parse(localStorage.getItem("datad"));
      // console.log(datauser)
      const dtpost = {
        kelas_id: datauser.kelas_id,
        mapel_id: dt.mapel_id,
      };
      const data = await axios.post(
        "http://127.0.0.1:8000/api/kelolakelasmapel/tambah?token=" +
          window.localStorage.getItem("token"),
        dtpost
      );
      setMessage(data.data.message);
      filterKelas(datauser.kelas_id);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllMapel = async () => {
    try {
      const data = await axios.get(
        "http://127.0.0.1:8000/api/kelolamapel?token=" +
          window.localStorage.getItem("token")
      );
      setAllMapel(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getDkelas = async () => {
    try {
      const data = await axios.get(
        "http://127.0.0.1:8000/api/kelolakelas?token=" +
          window.localStorage.getItem("token")
      );
      setKelas(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterKelas = async (id) => {
    try {
      const getkelasbyid = await axios.get(
        `http://127.0.0.1:8000/api/kelolakelas/${id}?token=` +
          window.localStorage.getItem("token")
      );
      setNamaKelas(getkelasbyid.data.data.nama_kelas);
      const user = {
        kelas_id: id,
      };
      window.localStorage.setItem("datad", JSON.stringify(user));
      const dtpost = {
        kelas_id: id,
      };
      const data = await axios.post(
        "http://127.0.0.1:8000/api/kelolakelasmapel?token=" +
          window.localStorage.getItem("token"),
        dtpost
      );
      
      setMapel(data.data);
    } catch (error) {}
  };
  
  // console.log(window.localStorage)
  useEffect(() => {
    getMapel();
    getAllMapel();
    getDkelas();
  }, []);
  return (
    <>
      <div className="content">
        <div className="title-box">
          <h1>Kelas {namaKelas}</h1>
        </div>

        <div className="card-content">
          <div className="title-content">
            <span>Daftar Pertemuan</span>
            <span id="min">----</span>
          </div>
          <div className="box-content">
            {/* <span className="add">
              <Link to="/dashboard/pertemuan/tambah">
                <img srcSet={Add} alt="" />
              </Link>
            </span> */}
            {USER().nisn == "admin" && (
              <>
                <div className="form-container">
                  <div className="button-form">
                    {kelas &&
                      kelas.map((list, index) => (
                        <button
                          onClick={() => filterKelas(list.id)}
                          key={index}
                        >
                          {list.nama_kelas}
                        </button>
                      ))}
                  </div>
                  {/* <p>{message && message}</p> */}
                </div>

                <div className="form-container">
                  <form action="" onSubmit={handleSubmit}>
                    <div className="input-form">
                      <label htmlFor="mapel">Mata Pelajaran</label>
                      <select
                      id="mapel"
                        onChange={(e) => {
                          setDt({ ...dt, mapel_id: e.target.value });
                        }}
                        value={dt.mapel_id}
                      >
                        <option>-- PILIH --</option>
                        {allmapel &&
                          allmapel.map((list, index) => (
                            <option value={list.id} key={index}>
                              {list.nama_mata_pelajaran}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="button-form">
                      <button type="submit">Add</button>
                    </div>
                  </form>
                  <p>{message && message}</p>
                </div>
              </>
            )}
            <div className="content-container">
              {mapel &&
                mapel.map((list, index) => (
                  <div className="content-card-item" key={index}>
                    <div className="image">
                      <img srcSet={B5} alt="" />
                    </div>
                    <div className="decription">
                      <span>{list.mapel?.nama_mata_pelajaran}</span>
                    </div>
                    <div className="button">
                      <Link
                        to={"/pertemuan/mapel/" + list.mapel_id}
                        className="black"
                      >
                        Lihat Selengkapnya...
                      </Link>
                    </div>
                  </div>
                ))}
                
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
