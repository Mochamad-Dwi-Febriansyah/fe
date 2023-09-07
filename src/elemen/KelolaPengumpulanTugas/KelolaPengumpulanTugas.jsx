import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { USER } from "../../utils";
import Add from "../../assets/img/add.png";
import { useNavigate, useParams } from "react-router-dom";

export default function KelolaPengumpulanTugas() {
  const navigate = useNavigate();
  const [kelas, setKelas] = useState();
  const [namaKelas, setNamaKelas] = useState();
  const [mapel, setMapel] = useState();
  const [pertemuan, setPertemuan] = useState();
  const [namaMapel, setNamaMapel] = useState();
  const [tugasOption, setTugasOption] = useState();
  const [yangsudahUpload, setYangsudahUpload] = useState();
  const [dataOptionPertemuan, setDataOptionPertemuan] = useState({
    pertemuan_ke: "",
  });

  window.localStorage.removeItem("nama_mapel");
  window.localStorage.removeItem("nama_kelas");

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
  // console.log(mapel)
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
      // console.log(data.data);
      setPertemuan(null);
      setTugasOption(null);
      setYangsudahUpload(null);
    } catch (error) {}
  };
  const filterMapel = async (mapel_id) => {
    try {
      const getnamamapel = await axios.get(
        `http://127.0.0.1:8000/api/kelolamapel/${mapel_id}?token=` +
          window.localStorage.getItem("token")
      );
      setNamaMapel(getnamamapel.data.data.nama_mata_pelajaran);
      const data = {
        mapel_id: mapel_id,
      };
      window.localStorage.setItem("data_mapel", JSON.stringify(data));
      const datauser = JSON.parse(localStorage.getItem("datad"));
      const datapost = {
        kelas_id: datauser.kelas_id,
      };
      // console.log(window.localStorage);
      const datapertemuan = await axios.post(
        `http://127.0.0.1:8000/api/pertemuan/mapel/${mapel_id}?token=` +
          window.localStorage.getItem("token"),
        datapost
      );

      setPertemuan(datapertemuan.data);
      setTugasOption(null);
      setYangsudahUpload(null);
    } catch (error) {
      console.log(error);
    }
  };
  const filterPertemuan = async (pertemuan_ke) => {
    try {
      const datakelas = JSON.parse(localStorage.getItem("datad"));
      const datamapel = JSON.parse(localStorage.getItem("data_mapel"));
      const datapost = {
        kelas_id: datakelas.kelas_id,
      };
      const datapertemuan = await axios.post(
        `http://127.0.0.1:8000/api/tugas/mapel/${datamapel.mapel_id}/pertemuan/${pertemuan_ke}?token=` +
          window.localStorage.getItem("token"),
        datapost
      );
      const dataprt = {
        pertemuan_ke: pertemuan_ke,
      };
      setTugasOption(datapertemuan.data);
      window.localStorage.setItem("data_pertemuan", JSON.stringify(dataprt));
      // console.log(datapertemuan.data);
    } catch (error) {}
  };
  const getDatapengumpulan = async (id) => {
    try {
      const data = {
        tugas_id: id,
      };
      window.localStorage.setItem("data_tugas", JSON.stringify(data));
      const datakelas = JSON.parse(localStorage.getItem("datad"));
      const datamapel = JSON.parse(localStorage.getItem("data_mapel"));
      const datapertemuan = JSON.parse(localStorage.getItem("data_pertemuan"));
      const datapost = {
        mapel_id: datamapel.mapel_id,
        pertemuan_ke: datapertemuan.pertemuan_ke,
        kelas_id: datakelas.kelas_id,
        tugas_id: id,
      };
      const datapengumpulan = await axios.post(
        `http://127.0.0.1:8000/api/pengumpulan_tugas/getalltugas?token=` +
          window.localStorage.getItem("token"),
        datapost
      );
      setYangsudahUpload(datapengumpulan.data);
      // console.log(datapengumpulan.data);
      // console.log(yangsudahUpload) 
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(window.localStorage)
  const [idpengumpulan_tugas, setidpengumpulan_tugas]=useState({
    id: ""
  });
  const handleEditNilai = async (id) => {
    const tampil = document.getElementsByClassName("form-upload")[0];
    setTimeout(() => {
      tampil.classList.toggle("tampilnih");
    },200);
    // console.log(id) 
    setidpengumpulan_tugas({...idpengumpulan_tugas, id: id})
  }
  // console.log(idpengumpulan_tugas)
  const [DataUploadEditNilai, setDataUploadEditNilai] = useState({ 
    nilai_pengumpulan: "", 
  });
  const handleUploadEditNilai = async (event) => {
    event.preventDefault();
    try { 
      await axios.put(`http://127.0.0.1:8000/api/pengumpulan_tugas/edit/${idpengumpulan_tugas.id}?token=`+window.localStorage.getItem("token"),DataUploadEditNilai);
      navigate('/pengumpulantugas');
      handleEditNilai();
      getDatapengumpulan();
    } catch (error) {
      console.log(error)
    } 
  };
  useEffect(() => {
    getDkelas();
    // {list.telat_pengumpulan ? () : ()} 
  }, []);
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
            <span>Daftar Hadir</span>
            <span id="min">----</span>
          </div>
          <div className="box-content">
            {/* <span className="add">
              <Link to="/dashboard/pertemuan/tambah">
                <img srcSet={Add} alt="" />
              </Link>
            </span> */}
            <div className="form-container">
              <div className="button-form">
                {kelas &&
                  kelas.map((list, index) => (
                    <button onClick={() => filterKelas(list.id)} key={index}>
                      {list.nama_kelas}
                    </button>
                  ))}
              </div>
            </div>

            <div className="button-form">
              {mapel &&
                mapel.map((list, index) => (
                  <button
                    onClick={() => filterMapel(list.mapel_id)}
                    key={index}
                  >
                    {list.mapel.nama_mata_pelajaran}
                  </button>
                ))}
            </div>
            <div className="button-form">
              {pertemuan &&
                pertemuan.map((option, index) => (
                  <button
                    onClick={() => filterPertemuan(option.pertemuan_ke)}
                    key={index}
                  >
                    Pertemuan {option.pertemuan_ke}
                  </button>
                ))}
            </div>
            {/* {pertemuan && (
              <div className="input-form button-form">

                <select
                  id="pertemuan"
                  onChange={(e) => {
                    setDataOptionPertemuan({
                      ...dataOptionPertemuan,
                      pertemuan_ke: e.target.value,
                    });
                  }}
                  value={dataOptionPertemuan.pertemuan_ke}
                >
                  <option>--pilih--</option>
                  {pertemuan &&
                    pertemuan.map((option, index) => (
                      <option
                        onClick={() => filterPertemuan(option.pertemuan_ke)}
                        key={index}
                      > 
                        Pertemuan {option.pertemuan_ke}
                      </option>
                    ))}
                </select>
              </div>
            )} */}
            <div className="button-form">
              {tugasOption &&
                tugasOption.map((list, index) => (
                  <button 
                    onClick={() => getDatapengumpulan(list.id)}
                    key={index} 
                  >
                    {list.judul_tugas}
                  </button>
                ))}
            </div>
            {/* <div className="button-form">
              {pertemuan &&
                pertemuan.map((list, index) => (
                  <button onClick={() => filterMapel(list.id)}  key={index}>{list.pertemuan_ke}</button>
                ))}
            </div> */}
            <div className="content-container scroll">
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>NISN</th>
                    <th>Nama</th>
                    <th>File Pengumpulan</th>
                    <th>Keterangan Pengumpulan</th>
                    <th>Nilai</th>
                    <th>Terakhir Diubah</th>
                    <th>Status Pengumpulan</th>
                    {/* <th>Telat</th> */}
                  </tr>
                </thead>

                {yangsudahUpload &&
                  yangsudahUpload.map((list, index) => (
                    <tbody key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{list.siswa?.nisn}</td> 
                        <td>{list.siswa?.nama}</td> 
                        <td>
                          <a href=""
                            download={list.file_pengumpulan}
                          >
                            <button>{list.file_pengumpulan}</button>
                          </a>
                        </td>
                        <td>{list.keterangan_pengumpulan}</td>
                        {/* <td>{list.nilai_pengumpula}</td> */}
                        <td>{list.nilai_pengumpulan ? <>{list.nilai_pengumpulan}<button  onClick={() => handleEditNilai(list.id)}  className="br-3-hijau f-right" >e</button></> : <>0<button onClick={() => handleEditNilai(list.id)}  className="br-3-hijau f-right" >e</button></>}
 
                        {/* <div className="form-upload"> 
                          <form action="" className="d-flex flex-wrap" onSubmit={handleUploadTugas}>
                            <label htmlFor="uploadfile">Upload File</label>
                            <input type="file" name="" id="uploadfile" 
                            onChange={(e) => {
                              setDataUploadPengumpulan({ ...dataUploadPengumpulan, file_pengumpulan: e.target.value });
                            }}
                            value={dataUploadPengumpulan.file_pengumpulan}
                            /> 
                              <button type="submit" className="button-form">
                                b
                              </button> 
                          </form> 
                        </div> */}
                        </td>
                        <td>{list.terakhir_diubah}</td> 
                        <td  className="no-padding white">
                        {list.status_pengumpulan == 0 && <div className="warning">Belum Mengumpulkan</div>} 
                        {list.status_pengumpulan == 1 && <div className="success">Sudah Mengumpulkan</div>} 
                        {list.status_pengumpulan == 2 && <div className="danger">Pending</div>} 
                        </td>
                        {/* <td className="no-padding white">
                        {list.telat_pengumpulan == 0 && <div className="danger">Telat</div>} 
                        {list.telat_pengumpulan == 1 && <div className="success">Tepat Waktu</div>} 
                        </td> */}
                      </tr>
                    </tbody>
                  ))}
              </table>
              <div className="form-upload">
                <div className="form-upload-child">
                   {/* <div className="">{messagefile && messagefile}</div> */}
                <form action="" onSubmit={handleUploadEditNilai}>
                  <div className="box-form"> 
                      <label htmlFor="uploadfile">Upload File</label>
                      <input type="text" name="" id="uploadfile" 
                      onChange={(e) => {
                        setDataUploadEditNilai({ ...DataUploadEditNilai, nilai_pengumpulan: e.target.value });
                        }}
                        value={DataUploadEditNilai.nilai_pengumpulan}
                        /> 
                  </div> 
                  <div className="button-group">
                      <button type="submit" className="br-3-merah">
                      u
                    </button> 
                  </div> 
                </form> 
                     
                <div className="d-flex justify-content-center">
                    <button className="br-3-hijau " onClick={handleEditNilai}>
                      c
                    </button>
                </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
