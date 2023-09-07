import React from "react";
import Add from "../../assets/img/add.png";
import Edit from "../../assets/img/edit.png";
import Trash from "../../assets/img/trash.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function KelolaPertemuan() {
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [kelas, setKelas] = useState();
  const [mapel, setMapel] = useState();
  const [dt, setDt] = useState({
    kelas_id: "",
    mapel_id: "",
    pertemuan_ke: "",
    tgl_pertemuan: "",
    title_pertemuan: "",
  });
 
  const [filter, setFilter] = useState({
    idkelas: "",
    idmapel: ""
  });

  const [pertemuan, setPertemuan] = useState();

  const getKelas = async () => {
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

  const getMapel = async () => {
    try {
      const data = await axios.get(
        "http://127.0.0.1:8000/api/kelolamapel?token=" +
          window.localStorage.getItem("token")
      );
      setMapel(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (dt.kelas_id == "" || dt.mapel_id == "") {
      setMessage("isi Kelas atau Mapel dulu");
      return false;
    }
    try {
      const data = await axios.post(
        "http://127.0.0.1:8000/api/pertemuan/tambah?token=" +
          window.localStorage.getItem("token"),
        dt
      );
      setMessage(data.data.message);
      getPertemuan();
    } catch (error) {
      console.log(error);
    }
  };

  const filterHandler = async (event) => {
    event.preventDefault();
    if (filter.idkelas=="" && filter.idmapel==""){
      getPertemuan();
      return false;
    }
    try {
      const data = await axios.post(
        "http://127.0.0.1:8000/api/pertemuan?token=" +
          window.localStorage.getItem("token"),
        filter
      );
      setPertemuan(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPertemuan = async () => {
    try {
      const data = await axios.get(
        "http://127.0.0.1:8000/api/pertemuan?token=" +
          window.localStorage.getItem("token")
      );
      setPertemuan(data.data);
    } catch (error) {
      console.log(error);
    }
  }; 

  const handleDelete = async (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    getKelas();
    getMapel();

    getPertemuan();
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
              <Link to="/dashboard/pertemuan/tambah">
                <img srcSet={Add} alt="" />
              </Link>
            </span>

             <div className="form-container">
              <form action="" onSubmit={handleSubmit}>
                <div className="input-form">
                  <label htmlFor="kelas">Kelas</label>
                  <select
                  id="kelas"
                    onChange={(e) => {
                      setDt({ ...dt, kelas_id: e.target.value });
                    }}
                    value={dt.kelas_id}
                  >
                    <option>-- PILIH --</option>
                    {kelas &&
                      kelas.map((list, index) => (
                        <option value={list.id} key={index}>
                          {list.nama_kelas}
                        </option>
                      ))}
                  </select>
                </div>
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
                    {mapel &&
                      mapel.map((list, index) => (
                        <option value={list.id} key={index}>
                          {list.nama_mata_pelajaran}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="input-form">
                  <label htmlFor="pertemuan">Pertemuan Ke</label>
                  <input
                    type="number"
                    id="pertemuan"
                    onChange={(e) => {
                      setDt({ ...dt, pertemuan_ke: e.target.value });
                    }}
                    value={dt.pertemuan_ke}
                    required
                  />
                </div>
                <div className="input-form">
                  <label htmlFor="tanggal">Tanggal</label>
                  <input
                    type="date"
                    id="tanggal"
                    onChange={(e) => {
                      setDt({ ...dt, tgl_pertemuan: e.target.value });
                    }}
                    value={dt.tgl_pertemuan}
                    required
                  />
                </div>
                <div className="input-form">
                  <label htmlFor="title">Judul Pertemuan</label>
                  <input
                    type="text"
                    id="title"
                    onChange={(e) => {
                      setDt({ ...dt, title_pertemuan: e.target.value });
                    }}
                    value={dt.title_pertemuan}
                    required
                  />
                </div>
                <div className="input-form"></div>
                <div className="button-form">
                  <button type="submit">Add</button>
                </div>
              </form>
              <p>{message && message}</p>
            </div>

            <div className="form-container">
              <form action="" onSubmit={filterHandler}>
                <div className="input-form">
                  <label htmlFor="filterKelas">Filter Kelas</label>
                  <select
                  id="filterKelas"
                    onChange={(e) => {
                      setFilter({ ...filter, idkelas: e.target.value });
                    }}
                    value={filter.idkelas}
                  >
                    <option value="">-- PILIH --</option>
                    {kelas &&
                      kelas.map((list, index) => (
                        <option value={list.id} key={index}>
                          {list.nama_kelas}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="input-form">
                  <label htmlFor="filterMapel">Filter Mata Pelajaran</label>
                  <select
                  id="filterMapel"
                    onChange={(e) => {
                      setFilter({ ...filter, idmapel: e.target.value });
                    }}
                    value={filter.idmapel}
                  >
                    <option value="">-- PILIH --</option>
                    {mapel &&
                      mapel.map((list, index) => (
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
            </div> 

            <div className="content-container scroll">
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>kelas</th>
                    <th>Mapel</th>
                    <th>Pertemuan Ke</th>
                    <th>Tanggal Pertemuan</th>
                    <th>Tema</th>
                    <th>Status</th>
                  </tr>
                </thead>

                {pertemuan &&
                  pertemuan.map((list, index) => (
                    <tbody key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{list.kelas?.nama_kelas}</td>
                        <td>{list.mapel?.nama_mata_pelajaran}</td>
                        <td>{list.pertemuan_ke}</td>
                        <td>{list.tgl_pertemuan}</td>
                        <td>{list.title_pertemuan}</td>
                        <td className="kotak-kotak">
                          <span className="edit">
                            <Link to={"/dashboard/kelolauser/edit/" + list.id}>
                              <img srcSet={Edit} alt="" />
                            </Link>
                          </span>
                          <button
                            onClick={() => handleDelete(list.id)}
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

        {/* iui */}
        {/* <div className="card-content">
          <div className="title-content">
            <span>Oke</span>
            <span id="min">----</span>
          </div>
          <div className="box-content">
            <div className="box-content">
              <div className="content-container">
                {pertemuan &&
                  pertemuan.map((list, index) => (
                    <div className="box-info" key={index}>
                      <div className="course">
                        <div className="courseman">
                          <div className="title">
                            <h3>
                              Pertemuan Ke {list.pertemuan_ke}{" "}
                              {list.tgl_pertemuan}
                            </h3>
                          </div>
                          <div className="isi">
                            <div className="isi-title">
                              <img src="assets/img/power-off.png" alt="" />{" "}
                              Pengkabelan
                            </div>
                            <div className="isi-deskripsi">
                              <div className="download">download materi</div>
                              <div className="deskripsi">
                                Materi pengkabelan beserta tugas
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
