import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Add from "../../assets/img/add.png";
import Back from "../../assets/img/arrow.png";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { USER } from "../../utils";
import Calendar from "../../assets/img/calendar.png";
import Folder from "../../assets/img/folder.png";
import Task from "../../assets/img/task.png";
import { eventWrapper } from "@testing-library/user-event/dist/utils"; 

export default function PertemuanByMapel() {
  const navigate = useNavigate();
  const [mapel, setMapel] = useState();
  const [message, setMessage] = useState();
  const { mapel_id } = useParams();
  const [pertemuan, setPertemuan] = useState();
  const [namaKelas, setNamaKelas] = useState();
  const [namaMapel, setNamaMapel] = useState();
  const [dt, setDt] = useState({
    pertemuan_ke: "",
    judul_pertemuan: "",
    tgl_pertemuan: "",
  });
  const [dataTugas, setDataTugas] = useState({
    pertemuan_id: "",
    judul_tugas: "",
    tugas_open: "",
    tugas_closed: "",
    deskripsi_tugas: "",
    file_tugas: "",
  });
  const [dataMateri, setDataMateri] = useState({
    pertemuan_id: "",
    judul_materi: "",
    file_materi: "",
  });
  // console.log(dataTugas)

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (USER().nisn == "admin") {
      const datauser = JSON.parse(window.localStorage.getItem("datad"));
      const dtpost = {
        kelas_id: datauser.kelas_id,
        pertemuan_ke: dt.pertemuan_ke,
        tgl_pertemuan: dt.tgl_pertemuan,
        judul_pertemuan: dt.judul_pertemuan,
      };
      const data = await axios.post(
        `http://127.0.0.1:8000/api/pertemuan/mapel/${mapel_id}/tambah?token=` +
          window.localStorage.getItem("token"),
        dtpost
      );
      setMessage(data.data.message);
      getAllPertemuanByMapel();
      // console.log(data);
    }
  };
  // console.log(window.localStorage.getItem("datad"))
  const getAllPertemuanByMapel = async () => {
    try {
      if (USER().nisn == "admin") {
        const datauser = JSON.parse(localStorage.getItem("datad"));
        const getkelasbyid = await axios.get(
          `http://127.0.0.1:8000/api/kelolakelas/${datauser.kelas_id}?token=` +
            window.localStorage.getItem("token")
        );
        const dtpost = {
          kelas_id: datauser.kelas_id,
        };
        const data = await axios.post(
          `http://127.0.0.1:8000/api/pertemuan/mapel/${mapel_id}?token=` +
            window.localStorage.getItem("token"),
          dtpost
        );
        console.log(data.data)
        setPertemuan(data.data);
        setNamaKelas(getkelasbyid.data.data.nama_kelas);
      } else if (USER().nisn != "admin") {
        const datauser = JSON.parse(localStorage.getItem("data"));
        const dtpost = {
          kelas_id: datauser.kelas_id,
        };
        const data = await axios.post(
          `http://127.0.0.1:8000/api/pertemuan/mapel/${mapel_id}?token=` +
            window.localStorage.getItem("token"),
          dtpost
        );
        // setNamaMapel(data.data[0].mapel.nama_mata_pelajaran);
        setPertemuan(data.data);
        setNamaKelas(datauser.nama_kelas);
      }
    } catch (error) {
      console.log(error);
    }
  };

  window.localStorage.setItem("nama_kelas", JSON.stringify(namaKelas));
  window.localStorage.setItem("nama_mapel", JSON.stringify(namaMapel));

  // console.log(dataTugas.file_tugas.name)
  const handleSubmitTugas = async (event) => {
    event.preventDefault();
    try {
      if (USER().nisn == "admin") {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const dtpost = {
          pertemuan_id: dataTugas.pertemuan_id,
          judul_tugas: dataTugas.judul_tugas,
          tugas_open: dataTugas.tugas_open,
          tugas_closed: dataTugas.tugas_closed,
          deskripsi_tugas: dataTugas.deskripsi_tugas,
          file_tugas: dataTugas.file_tugas,
        };
        const data = await axios.post(
          `http://127.0.0.1:8000/api/tugas?token=` +
            window.localStorage.getItem("token"),
          dtpost,config
        );
        setMessage(data.data.message);
        getAllPertemuanByMapel();
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitMateri = async (event) => {
    event.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      if (USER().nisn == "admin") {
        const dtpost = {
          pertemuan_id : dataMateri.pertemuan_id,
          judul_materi: dataMateri.judul_materi,
          file_materi: dataMateri.file_materi,
        };
        const data = await axios.post(
          `http://127.0.0.1:8000/api/materi?token=` +
            window.localStorage.getItem("token"),
          dtpost, config
        );
        setMessage(data.data.message);
        getAllPertemuanByMapel();
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const { mapel_idp } = useParams();
  const getTugas = async () => {
    try {
      const kelasid = window.localStorage.getItem("datad");
      const dtpost = {
        kelas_id: kelasid.id,
      };
      const data = await axios.post(
        `http://127.0.0.1:8000/api/tugas/mapel/${mapel_id}?token=` +
          window.localStorage.getItem("token"),
        dtpost
      );
    } catch (error) {}
  };

  const getNamaMapel = async () => {
    try {
      const data = await axios.get(
        `http://127.0.0.1:8000/api/kelolamapel/${mapel_id}?token=` +
          window.localStorage.getItem("token")
      );
      setNamaMapel(data.data.data.nama_mata_pelajaran);
    } catch (error) {
      console.log(error);
    }
  };

 
  // const [markAsDone, setMarkAsDone] = useState()
  // const clickHandleDoneTugas = async (id) => { 
  //   try {
  //     const datauser = JSON.parse(localStorage.getItem("data")); 
  //     const datapost = {
  //       tugas_id: id,
  //       siswa_id: datauser.id,
  //       status: '1'
  //     }
  //     const data = await axios.put(
  //       `http://127.0.0.1:8000/api/markasdone/upload?token=` +
  //           window.localStorage.getItem("token"),
  //         datapost
  //     )
  //       setMarkAsDone(data.data)
  //   } catch (error) {
      
  //   }
    
  // }; 

  useEffect(() => {
    getAllPertemuanByMapel();
    getNamaMapel();
  }, []);
  const das = useRef(null);
  const pertemuanRef = useRef(null);
  const tugasRef = useRef(null);
  const materiRef = useRef(null);

  useEffect(() => {
    if (USER().nisn == "admin") {
      const handleClick = () => {
        const tampil = document.getElementsByClassName("box-tambah-muncul")[0];
        tampil.classList.toggle("tampilnih");
      };
      const pertemuanRefClick = () => {
        const tampil = document.getElementsByClassName("form-pertemuan")[0];
        tampil.classList.toggle("tampilnih");
      };
      const tugasRefClick = () => {
        const tampil = document.getElementsByClassName("form-tugass")[0];
        tampil.classList.toggle("tampilnih");
      };
      const materiRefClick = () => {
        const tampil = document.getElementsByClassName("form-materi")[0];
        tampil.classList.toggle("tampilnih");
      };
      const ds = das.current;
      const prt = pertemuanRef.current;
      const tgs = tugasRef.current;
      const mtr = materiRef.current;
      ds.addEventListener("click", handleClick);
      prt.addEventListener("click", pertemuanRefClick);
      tgs.addEventListener("click", tugasRefClick);
      mtr.addEventListener("click", materiRefClick);
      return () => {
        ds.removeEventListener("click", handleClick);
        prt.removeEventListener("click", pertemuanRefClick);
        tgs.removeEventListener("click", tugasRefClick);
        mtr.removeEventListener("click", materiRefClick);
      };
    }
  }, []);
  // console.log(dt)
  return (
    <>
      <div className="content">
        <div className="title-box">
          <h1>
            Kelas {namaKelas}, {namaMapel}
          </h1>
        </div>

        <div className="card-content">
          <div className="title-content">
            <span>Daftar Pertemuan</span>
            <span id="min">----</span>
          </div>
          <div className="box-content">
            <span className="add" onClick={() => navigate(-1)}>
              <img srcSet={Back} alt="" />
            </span>
            {USER().nisn == "admin" && (
              <div className="box-aksi">
                <div className="box-tambah" id="tombol-tambah" ref={das}>
                  <img src={Add} alt="" />
                </div>
                <div className="box-tambah-muncul">
                  <div className="muncul-tugas-mapel">
                    <div className="item" ref={pertemuanRef}>
                      <span>Pertemuan</span>
                    </div>
                    <div className="item" ref={tugasRef}>
                      <span>Tugas</span>
                    </div>
                    <div className="item" ref={materiRef}>
                      <span>Materi</span>
                    </div>
                  </div>
                </div>

                <div className="form-container form-pertemuan">
                  <form action="" onSubmit={handleSubmit} className="f-05">
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
                        min="0"
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
                          setDt({ ...dt, judul_pertemuan: e.target.value });
                        }}
                        value={dt.judul_pertemuan}
                        required
                      />
                    </div>
                    <div className="button-form">
                      <button type="submit">Add</button>
                    </div>
                  </form>
                  <p>{message && message}</p>
                </div>
                <div className="form-container form-tugass">
                  <form action="" onSubmit={handleSubmitTugas}  className="f-05">
                    <div className="input-form">
                      <label htmlFor="pertemuan">Pertemuan Ke</label>
                      <select
                        id="pertemuan"
                        onChange={(e) => {
                          setDataTugas({
                            ...dataTugas,
                            pertemuan_id: e.target.value,
                          });
                        }}
                        value={dataTugas.pertemuan_id}
                      >
                        <option>--PILIH--</option>
                        {pertemuan &&
                          pertemuan.map((option, index) => (
                            <option value={option.id} key={index}>
                              Pertemuan Ke {option.pertemuan_ke}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="input-form">
                      <label htmlFor="judultugas">Judul Tugas</label>
                      <input
                        type="text"
                        id="judultugas"
                        onChange={(e) => {
                          setDataTugas({
                            ...dataTugas,
                            judul_tugas: e.target.value,
                          });
                        }}
                        value={dataTugas.judul_tugas}
                        required
                      />
                    </div>
                    <div className="input-form">
                      <label htmlFor="deskripsitugas">Deskripsi Tugas</label>
                      <input
                        type="text"
                        id="deskripsitugas"
                        onChange={(e) => {
                          setDataTugas({
                            ...dataTugas,
                            deskripsi_tugas: e.target.value,
                          });
                        }}
                        value={dataTugas.deskripsi_tugas}
                        required
                      />
                    </div>
                    <div className="input-form">
                      <label htmlFor="tugasopen">Tugas Open</label>
                      <input
                        type="date"
                        id="tugasopen"
                        onChange={(e) => {
                          setDataTugas({
                            ...dataTugas,
                            tugas_open: e.target.value,
                          });
                        }}
                        value={dataTugas.tugas_open}
                        required
                      />
                    </div>
                    <div className="input-form">
                      <label htmlFor="tugasclose">Tugas Close</label>
                      <input
                        type="date"
                        id="tugasclose"
                        onChange={(e) => {
                          setDataTugas({
                            ...dataTugas,
                            tugas_closed: e.target.value,
                          });
                        }}
                        value={dataTugas.tugas_closed}
                        required
                      />
                    </div>
                    <div className="input-form">
                      <label htmlFor="filetugas">File Tugas</label>
                      <input
                        type="file"
                        id="filetugas"
                        onChange={(e) => {
                          setDataTugas({
                            ...dataTugas,
                            file_tugas: e.target.files[0],
                          });
                        }}
                        required
                      />
                    </div>
                    <div className="button-form">
                      <button type="submit">Add</button>
                    </div>
                  </form>
                  <p>{message && message}</p>
                </div>
                <div className="form-container form-materi">
                  <form
                    action=""
                    onSubmit={handleSubmitMateri}
                    className="f-05"
                  >
                    <div className="input-form">
                    <label htmlFor="pertemuan">Pertemuan Ke</label>
                      <select
                        id="pertemuan"
                        onChange={(e) => {
                          setDataMateri({
                            ...dataMateri,
                            pertemuan_id: e.target.value,
                          });
                        }}
                        value={dataMateri.pertemuan_id}
                      >
                        <option>--PILIH--</option>
                        {pertemuan &&
                          pertemuan.map((option, index) => (
                            <option value={option.id} key={index}>
                              Pertemuan Ke {option.pertemuan_ke}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="input-form">
                      <label htmlFor="judulmateri">Judul Materi</label>
                      <input
                        type="text"
                        id="judulmateri"
                        onChange={(e) => {
                          setDataMateri({
                            ...dataMateri,
                            judul_materi: e.target.value,
                          });
                        }}
                        value={dataMateri.judul_tugas}
                        required
                      />
                    </div>
                    <div className="input-form">
                      <label htmlFor="filemateri">File Materi</label>
                      <input
                        type="file"
                        id="filemateri"
                        onChange={(e) => {
                          setDataMateri({
                            ...dataMateri,
                            file_materi: e.target.files[0]
                          });
                        }} 
                        required
                      />
                    </div>
                    <div className="button-form">
                      <button type="submit">Add</button>
                    </div>
                  </form>
                  <p>{message && message}</p>
                </div>
              </div>
            )}
            {/* {USER().nisn == "admin" && (
              <div className="form-container">
                <form action="" onSubmit={handleSubmit} className="f-05">
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
                      min="0"
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
            )} */}
            <div className="content-container">
              {pertemuan &&
                pertemuan.map((lists, index) => (
                  <div className="box-info" key={index}>
                    <div className="course">
                      <div className="courseman">
                        <div className="title">
                          {/* <Link
                            to={`/pertemuan/mapel/${mapel_id}/pertemuan/${list.pertemuan_ke}`}
                            className="link-pertemuan"
                          > */}
                          <h2 className="pertemuan-kelas">
                            Pertemuan {lists.pertemuan_ke} {lists.judul_pertemuan} &emsp; &emsp; {lists.tgl_pertemuan}
                          </h2>
                          {/* </Link> */}
                        </div>

                        <div className="courseman-isi">
                          <div className="isi">
                            <div className="mb-2">
                              <div className="isi-title">
                                {/* <Link
                              to={`/pertemuan/mapel/${mapel_id}/pertemuan/${list.pertemuan_ke}`}
                              className="link black"
                            ></Link> */}
                              </div>
                              {lists.tugas.map((list, index) => (
                                <div className="apaini" key={index}>
                                  <div className="d-flex gap2gap">
                                    <img src={Task} alt="" />
                                    <Link
                                      to={`/pertemuan/mapel/${mapel_id}/pertemuan/${lists.pertemuan_ke}/tugas/${list.id}`}
                                      className="link black"
                                    >
                                      <span>{list.judul_tugas}</span>
                                    </Link>
                                  </div>
                                  {/* <div className="isi-deskripsi">
                                    <div
                                      className="download"
                                      onClick={() => clickHandleDoneTugas(list.id)}
                                    >
                                      Done
                                    </div>
                                  </div> */}
                                </div>
                              ))}
                              {lists.materi.map((list, index) => (
                                <div className="apaini" key={index}>
                                  <div className="d-flex gap2gap">
                                    <img src={Folder} alt="" /> 
                                      <a href="" className="link-pertemuan" download={list.file_materi}>{list.judul_materi}  {list.file_materi}</a> 
                                  </div>
                                  {/* <div className="isi-deskripsi">
                                    <div
                                      className="download"
                                      // onClick={() => clickHandleDoneMateri(list.id)}
                                    >
                                    Done
                                    </div>
                                  </div> */}
                                </div>
                              ))}
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
      </div>
    </>
  );
}
