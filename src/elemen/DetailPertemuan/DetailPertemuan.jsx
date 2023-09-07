import React, { useState } from "react";
import Back from "../../assets/img/arrow.png";
import { useNavigate, useParams } from "react-router-dom"; 
import { useEffect} from "react"; 
import axios from "axios";
import { USER } from "../../utils";  
import Task from "../../assets/img/task.png";

export default function DetailPertemuan() {
  const navigate = useNavigate();
  const { mapel_id, pertemuan, tugas_id } = useParams();
  const [message, setMessage] = useState();
  const [messagefile, setMessageFile] = useState();
  const [tugas, setTugas] = useState();
  const [namaKelas, setNamaKelas] = useState();
  const [namaMapel, setNamaMapel] = useState();
  const [kondisiUpload, setKondisiUpload] = useState();

  // const das = useRef(null);
  // const tugasRef = useRef(null);
  // const materiRef = useRef(null);
  // const [dataTugas, setDataTugas] = useState({
  //   pertemuan_id: "",
  //   judul_tugas: "",
  //   tugas_open: "",
  //   tugas_closed: "",
  //   deskripsi_tugas: "",
  //   file_tugas: "",
  // });
 
  const getTugasbyPertemuan = async (event) => {
    try {
      if (USER().nisn === "admin") {
        const kelasid = JSON.parse(window.localStorage.getItem("datad"));
        const dtpost = {
          kelas_id: kelasid.kelas_id,
        };
        const data = await axios.post(
          `http://127.0.0.1:8000/api/tugas/mapel/${mapel_id}/pertemuan/${pertemuan}/tugas/${tugas_id}?token=` +
            window.localStorage.getItem("token"),
          dtpost
        );
        setTugas(data.data);
      } else if (USER().nisn != "admin") {
        const kelasid = JSON.parse(window.localStorage.getItem("data"));
        const dtpost = {
          kelas_id: kelasid.kelas_id,
        };
        const data = await axios.post(
          `http://127.0.0.1:8000/api/tugas/mapel/${mapel_id}/pertemuan/${pertemuan}/tugas/${tugas_id}?token=` +
            window.localStorage.getItem("token"),
          dtpost
        );
        setTugas(data.data);
      }

      // console.log(data.data)
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(tugas);
  useEffect(() => {
    setNamaKelas(JSON.parse(localStorage.getItem("nama_kelas")));
    setNamaMapel(JSON.parse(localStorage.getItem("nama_mapel")));
    getTugasbyPertemuan();
  }, []);
  // useEffect(() => {
  //   if(USER().nisn == "admin"){

  //     const handleClick = () => {
  //       const tampil = document.getElementsByClassName("box-tambah-muncul")[0];
  //       tampil.classList.toggle("tampilnih");
  //     };
  //     const tugasRefClick = () => {
  //       const tampil = document.getElementsByClassName("form-tugass")[0];
  //       tampil.classList.toggle("tampilnih");
  //     };
  //     const materiRefClick = () => {
  //       const tampil = document.getElementsByClassName("form-materi")[0];
  //       tampil.classList.toggle("tampilnih");
  //     };
  //     const ds = das.current;
  //     const tgs = tugasRef.current;
  //     const mtr = materiRef.current;
  //     ds.addEventListener("click", handleClick);
  //     tgs.addEventListener("click", tugasRefClick);
  //     mtr.addEventListener("click", materiRefClick);
  //     return () => {
  //       ds.removeEventListener("click", handleClick);
  //       tgs.removeEventListener("click", tugasRefClick);
  //       mtr.removeEventListener("click", materiRefClick);
  //     };
  //   }
  //   }, []);

  const [dataPengumpulan, setDataPengumpulan] = useState(); 
  // console.log(dataPengumpulan)
  const getDataPengumpulan = async () => {
    try {
      const storage = JSON.parse(window.localStorage.getItem("data"));
      const datapost = {
        kelas_id: storage.kelas_id,
        mapel_id: mapel_id,
        pertemuan_ke: pertemuan,
        siswa_id: storage.id,
        tugas_id: tugas_id,
      };
      // console.log(datapost)
      const data = await axios.post(
        `http://127.0.0.1:8000/api/pengumpulan_tugas?token=` +
          window.localStorage.getItem("token"),
        datapost
      );
      setDataPengumpulan(data.data);
      {
        data.data.message && setMessage(data.data.message);
      }
      // setMessagePengumpulan('Sudah Mengumpulkan');
    } catch (error) {
      console.log(error);
    }
  };

  const uploadTugasClick = () => {
    const tampil = document.getElementsByClassName("form-upload")[0];
    setTimeout(() => {
      tampil.classList.toggle("tampilnih");
    },500);
  };
  
  const dateTime = new Date();
  const dateNow = dateTime.getFullYear() + '-' + (dateTime.getMonth() + 1 ) + '-' + dateTime.getDate() +  " "+ dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds();

  const datauser = JSON.parse(localStorage.getItem("data")); 
  const [dataUploadPengumpulan, setDataUploadPengumpulan] = useState({
    siswa_id : datauser.id,
    pertemuan_ke: pertemuan,
    status_pengumpulan: "1",
    nilai_pengumpulan: "",
    telat_pengumpulan: "0",
    terakhir_diubah: dateNow,
    file_pengumpulan: "",
    keterangan_pengumpulan: "",
    kelas_id: datauser.kelas_id,
    mapel_id: mapel_id,
    tugas_id: tugas_id
  }); 

  // const handleSubmitTugas = async (event) => {
  //   event.preventDefault();
  //   try {
  //     if (USER().nisn == "admin") {
  //       const kelasid = JSON.parse(window.localStorage.getItem("datad"));
  //       const dttpost = {
  //         kelas_id: kelasid.kelas_id,
  //       };
  //       const id_pertemuan = await axios.post(
  //         `http://127.0.0.1:8000/api/pertemuan/mapel/${mapel_id}/pertemuan/${pertemuan}?token=` +
  //           window.localStorage.getItem("token"),
  //         dttpost
  //       );
  //       // console.log()
  //       const dtpost = {
  //         pertemuan_id: id_pertemuan.data.data_id_pertemuan,
  //         judul_tugas: dataTugas.judul_tugas,
  //         tugas_open: dataTugas.tugas_open,
  //         tugas_closed: dataTugas.tugas_closed,
  //         deskripsi_tugas: dataTugas.deskripsi_tugas,
  //         file_tugas: dataTugas.file_tugas,
  //       };
  //       const data = await axios.post(
  //         `http://127.0.0.1:8000/api/tugas?token=` +
  //           window.localStorage.getItem("token"),
  //         dtpost
  //       );
  //       setMessage(data.data.message);
  //       // console.log(data);
  //     }  
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
//   const [file, setFile] = useState('');
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
// }
// const [errors, setErrors] = useState([]);
//   const handleUploadTugas = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();

//     formData.append('siswa_id', datauser.id)
//     formData.append('kelas_id', datauser.kelas_id)
//     formData.append('mapel_id', mapel_id)
//     formData.append('tugas_id', tugas_id)
//     formData.append('pertemuan_ke', pertemuan)
//     formData.append('status_pengumpulan', "1")
//     formData.append('nilai_pengumpulan', "")
//     formData.append('telat_pengumpulan', "0")
//     formData.append('terakhir_diubah', dateNow)
//     formData.append('file_pengumpulan', file)
//     formData.append('keterangan_pengumpulan', "")
//     await axios.post(`http://127.0.0.1:8000/api/pengumpulan_tugas/upload?token=` +
//                 window.localStorage.getItem("token"),
//                 formData)
//                 .then(() => {
                
//                   //redirect to posts index
//                   window.location.reload();
  
//               })
//               .catch(error => {
                  
//                   //set errors response to state "errors"
//                   setErrors(error.response.data);
//               })
   
//   };  
  const handleUploadTugas = async (event) => {
    event.preventDefault();
    try { 
        if (dataUploadPengumpulan.file_pengumpulan == "") {
          setMessageFile("isi Data dulu");
          return false;
        }
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        try {
          const data = await axios.post(
            `http://127.0.0.1:8000/api/pengumpulan_tugas/upload?token=` +
              window.localStorage.getItem("token"),
              dataUploadPengumpulan, config
          );
          setMessage(data.data.message); 
            getDataPengumpulan(); 
            setTimeout(() => {
              window.location.reload();
            }, 1000);
        } catch (error) {
          console.log(error)
        }
    } catch (error) {
      console.log(error);
    }
  };  
  // setTimeout(() => {
    // const dateN = dateTime.getFullYear() + '-' + (dateTime.getMonth() + 1 ) + '-' + dateTime.getDate() +  " "+ dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds();
    // console.log(dateN9)
    // console.log(tugas && tugas.tugas_open)
    // }, 1000);
  const cekOpenTugas = async() => {  
    if (USER().nisn === "admin") {
      const kelasidadmin = JSON.parse(window.localStorage.getItem("datad"));
      const dtpost = {
        kelas_id: kelasidadmin.kelas_id,
      };
      const data = await axios.post(
        `http://127.0.0.1:8000/api/tugas/mapel/${mapel_id}/pertemuan/${pertemuan}/tugas/${tugas_id}?token=` +
        window.localStorage.getItem("token"),
        dtpost
        );
        if (data.data){
          const opendate = Date.parse(data.data.tugas_open)
          const f = new Date(opendate) 
          
          const dateN = dateTime.getFullYear() + '-' +0+ (dateTime.getMonth() + 1 ) + '-' + dateTime.getDate() +  " "+ dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds();
          const dates = Date.parse(dateN)
          const now = new Date(dates) 
    
          // if (d.getMonth() ==  f.getMonth()){
          //   console.log("oke")
          // } 
          // if (((d.getFullYear() == f.getFullYear()) && (d.getMonth() ==  f.getDate())) && d.getDate() > f.getDate()){
          //   console.log("Tugas Open")
          // } 
          if (now.getFullYear() == f.getFullYear()){ 
            if(now.getMonth() == f.getMonth()){
              if (now.getDate() == f.getDate()){
                console.log("tugas open")
              }else if (now.getDate() > f.getDate()){
                console.log("tugas sudah dibuka")
              }
            }
          } else{
            console.log("tugas belum dibuka")
          }
      }
    } else if(USER().nisn !== "admin"){
      const kelasiduser = JSON.parse(window.localStorage.getItem("data"));
      const dtpost = {
        kelas_id: kelasiduser.kelas_id,
      };
      const data = await axios.post(
        `http://127.0.0.1:8000/api/tugas/mapel/${mapel_id}/pertemuan/${pertemuan}/tugas/${tugas_id}?token=` +
        window.localStorage.getItem("token"),
        dtpost
        );
        if (data.data){
          const opendate = Date.parse(data.data.tugas_open)
          const to = new Date(opendate) 
          
          const dateN = dateTime.getFullYear() + '-' +0+ (dateTime.getMonth() + 1 ) + '-' + dateTime.getDate() +  " "+ dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds();
          const dates = Date.parse(dateN)
          const now = new Date(dates) 

          const closedate = Date.parse(data.data.tugas_closed)
          const tc = new Date(closedate)  

          to.setHours(0,0,0,0);
          now.setHours(0,0,0,0);
          tc.setHours(0,0,0,0);

          const oneDay = 24 * 60 * 60 * 1000;
          const diff =  now - to;
          const dayopen = Math.round(diff / oneDay);

          const difdayclose = tc-now
          const dayclose = Math.round(difdayclose / oneDay);
           
          // console.log("tugas dibuka ",dayopen , "hari") 
          // console.log("tugas ditutup ",dayclose , "hari") 

          if (dayopen < 0) {
            const data = {
              cek : 0,
              // message : `tugas belum dibuka, kurang${dayopen}hari lagi`
              message : `Tugas belum dibuka`
            };
            setKondisiUpload(data);
          } else if (dayopen >= 0 && dayclose >=0 ){
            const data = {
              cek : 1,
              // message : `tugas sudah dibuka ${dayopen} hari yang lalu, ditutup ${dayclose} hari lagi`
              message : `Tugas sudah dibuka`
            };
            setKondisiUpload(data);            
          } else if(dayclose < 0){
            const data = {
              cek : 0,
              // message : `Tugas sudah ditutup ${dayclose} hari yang lalu`
              message : `Tugas sudah ditutup`
            };
            setKondisiUpload(data);
          } 
      }
    }
  
  } 

  const [idpengumpulan_tugas, setidpengumpulan_tugas]=useState({
    id: ""
  }); 
  const handleHapusTugas = async (id) => {
    const tampil = document.getElementsByClassName("form-hapus")[0];
    setTimeout(() => {
      tampil.classList.toggle("tampilnih");
    },200);
    // console.log(id) 
    setidpengumpulan_tugas({...idpengumpulan_tugas, id: id})
  } 
  const [dataEditUploadPengumpulan, setDataEditUploadPengumpulan] = useState({  
    file_pengumpulan: "", 
    terakhir_diubah:dateNow, 
    keterangan_pengumpulan : ""
  }); 
  const handleEditTugas = async (id) => {
    const tampil = document.getElementsByClassName("form-edit")[0];
    setTimeout(() => {
      tampil.classList.toggle("tampilnih");
    },200); 
    setidpengumpulan_tugas({...idpengumpulan_tugas, id: id})
  } 
  const AksihandleEditTugas = async (event) =>{
    event.preventDefault();
    try {   
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
          const data = await axios.put(
            `http://127.0.0.1:8000/api/pengumpulan_tugas/${idpengumpulan_tugas.id}?token=` +
              window.localStorage.getItem("token"),
              dataEditUploadPengumpulan, config
          );
          setMessage(data.data.message); 
            getDataPengumpulan(); 
            setTimeout(() => {
              window.location.reload();
            }, 1000);  
    } catch (error) {
      console.log(error);
    } 
  } 
  const AksihandleHapusTugas = async (event)=>{
    event.preventDefault(); 
    try { 
      await axios.delete(`http://127.0.0.1:8000/api/pengumpulan_tugas/${idpengumpulan_tugas.id}?token=`+window.localStorage.getItem("token"));
      window.location.reload();
    } catch (error) {
      console.log(error)
    } 
  }; 
// console.log(dataUploadPengumpulan)
  useEffect(() => {  
    getDataPengumpulan();
    cekOpenTugas(); 
  }, []);

  return (
    <>
      <div className="content">
        <div className="title-box">
          <h1>
            Kelas {namaKelas}, {namaMapel}, Pertemuan {pertemuan}
          </h1>
        </div>

        <div className="card-content">
          <div className="title-content">
            <span>Detail Tugas</span>
            <span id="min">----</span>
          </div>
          <div className="box-content">
            <span className="add" onClick={() => navigate(-1)}>
              <img srcSet={Back} alt="" />
            </span>
            {/* {USER().nisn == "admin" && (
              <>
                <div className="box-aksi">
                  <div className="box-tambah" id="tombol-tambah" ref={das}>
                    <img src={Add} alt="" />
                  </div>
                  <div className="box-tambah-muncul">
                    <div className="muncul-tugas-mapel">
                      <div className="item" ref={tugasRef}>
                        <span>Tugas</span>
                      </div>
                      <div className="item" ref={materiRef}>
                        <span>Materi</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-container form-tugass">
                  <form action="" onSubmit={handleSubmitTugas} className="f-05">
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
                            file_tugas: e.target.value,
                          });
                        }}
                        value={dataTugas.file_tugas}
                        required
                      />
                    </div>
                    <div className="button-form">
                      <button type="submit">Add</button>
                    </div>
                  </form>
                  <p>{message && message}</p>
                </div>
              </>
            )} */}

            <div className="content-container">
              {tugas && 
                  <div className="box-info">
                    <div className="info-child">
                      <h1 className="title-child">{tugas.judul_tugas}</h1>
                      <span>Open : {tugas.tugas_open}</span>
                      <span>Closed : {tugas.tugas_closed}</span>
                      {kondisiUpload && kondisiUpload.cek == 0 && <div className="danger white my-1rem w-max-content">{kondisiUpload.message}</div>}
                      {kondisiUpload && kondisiUpload.cek == 1 &&<div className="warning white my-1rem w-max-content">{kondisiUpload.message}</div>}
                    </div>
                    <div className="info-child">
                      <div className="deskripsi">File Tugas :</div>
                      <div className="deskripsi mb-1 d-flex"> <img src={Task} alt="" /><a href={tugas.file_tugas} target="_blank" className="abu link-pertemuan" download>{tugas.file_tugas}</a></div>
                      <div className="deskripsi">Deskripsi Tugas :</div>
                      <div className="deskripsi">{tugas.deskripsi_tugas}</div>
                    </div>
                    <div className="info-child">
                      <h1 className="title-child">Pengumpulan</h1>
                      <table className="mb-1">
                        <thead>
                          <tr>
                            <th>Status Pengumpulan</th> 
                            {message && <td className="danger white">{message}</td>}
                            {dataPengumpulan && dataPengumpulan.status_pengumpulan == 0 && <td className="warning white">Belum Mengumpulkan</td>}
                            {dataPengumpulan && dataPengumpulan.status_pengumpulan == 1 && <td className="success white">Sudah Mengumpulkan</td>}
                            {dataPengumpulan && dataPengumpulan.status_pengumpulan == 2 && <td className="danger">Pending</td>}
                          </tr>
                        </thead>
                        <thead>
                          <tr>
                            <th>Nilai</th>
                            <td>{dataPengumpulan && dataPengumpulan.nilai_pengumpulan}</td>
                          </tr>
                        </thead>
                        {/* <thead>
                          <tr>
                            <th>Pengumpulan Telat</th>
                            <td className="status-danger">
                              {dataPengumpulan &&
                                dataPengumpulan.telat_pengumpulan}
                            </td>
                          </tr>
                        </thead> */}
                        <thead>
                          <tr>
                            <th>Terakhir di ubah</th>
                            <td>
                              {dataPengumpulan &&
                                dataPengumpulan.terakhir_diubah}
                            </td>
                          </tr>
                        </thead>
                        <thead>
                          <tr>
                            <th>File Pengumpulan</th>
                            <td>
                              {dataPengumpulan &&
                                dataPengumpulan.file_pengumpulan}
                            </td>
                          </tr>
                        </thead>
                        <thead>
                          <tr>
                            <th>Keterangan Pengumpulan</th>
                            <td>
                              {dataPengumpulan &&
                                dataPengumpulan.keterangan_pengumpulan}
                            </td>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                }
              <div className="form-tugas f-center">
                {message ? (
                  <>
                  {kondisiUpload && kondisiUpload.cek == 1 &&  <button
                      type="submit"
                      className="button-form"
                      onClick={uploadTugasClick}
                    >
                      Kirim Tugas
                    </button> }
                  {kondisiUpload && kondisiUpload.cek == 0 &&
                  <button
                  type="submit"
                  className="button-form"disabled
                  >
                  Kirim Tugas
                  </button>
                  }
                    {/* <button
                      type="submit"
                      className="button-form"
                      onClick={uploadTugasClick}
                    >
                      Kirim Tugasc
                    </button> */}
                  </>
                ) : (
                  <>
                    {/* <button type="submit" className="button-form" onClick={() => handleEditTugas(dataPengumpulan.id)}>
                      Edit Tugas
                    </button> */}
                    {/* <button type="submit" className="button-form" onClick={() => handleHapusTugas(dataPengumpulan.id)}>
                      Hapus Tugas
                    </button> */}
                    {kondisiUpload && kondisiUpload.cek == 1 &&  <button
                      type="submit"
                      className="button-form"
                      onClick={() => handleHapusTugas(dataPengumpulan.id)}
                    >
                      Hapus Tugas
                    </button> }
                  {kondisiUpload && kondisiUpload.cek == 0 &&
                  <button
                  type="submit"
                  className="button-form"disabled
                  >
                  Hapus Tugas
                  </button>}
                  </>
                )}
              </div>
              <div className="form-upload">
                <div className="form-upload-child">
                   <div className="">{messagefile && messagefile}</div>
                <form action="" onSubmit={handleUploadTugas}>
                  <div className="box-form"> 
                      <label htmlFor="uploadfile">Upload File</label>
                      {/* <input type="file"
                 onChange={handleFileChange}
                 {
                  ...errors.image && (
                      <div className="alert alert-danger mt-2">
                          {errors.image[0]}
                      </div>
                  )
              }
                        />  */}
                      <input type="file" name="uploadfile" id="uploadfile" 
                      onChange={(e) => {
                        setDataUploadPengumpulan({ ...dataUploadPengumpulan, file_pengumpulan: e.target.files[0] });
                        }} 
                        /> 
                  </div>
                  <div className="box-form">
                    <label htmlFor="">Keterangan <span className="span-kecil">* isi jika ada yang mau disampaikan</span></label>
                    <textarea name="" id="" cols="30" rows="7"                       
                    onChange={(e) => {
                        setDataUploadPengumpulan({ ...dataUploadPengumpulan, keterangan_pengumpulan: e.target.value });
                        }}
                        value={dataUploadPengumpulan.keterangan_pengumpulan}></textarea>
                  </div>
                  <div className="button-group">
                      <button type="submit" className="button-form">
                      Upload Tugas
                    </button>
                    <div className="div3"> 
                    <button type="reset" className="button-form">
                      Reset Tugas
                    </button> 
                    </div>
                  </div> 
                </form> 
                <div className="d-flex justify-content-center">
                    <button className="button-form" onClick={uploadTugasClick}>
                      Kembali
                    </button>
                </div>
                </div>
               
              </div>

              <div className="form-edit">
                <div className="form-upload-child">
                   <div className="">{messagefile && messagefile}</div>
                <form action="" onSubmit={AksihandleEditTugas}>
                  <div className="box-form"> 
                      <label htmlFor="uploadfile">Upload File</label> 
                      {/* {dataPengumpulan && <input type="text" value={dataPengumpulan.file_pengumpulan} readOnly/> } */}
                      <input type="file" name="" id="uploadfile" 
                      onChange={(e) => {
                        setDataEditUploadPengumpulan({ ...dataEditUploadPengumpulan, file_pengumpulan: e.target.files[0]});
                        }} 
                        />   
                        
                  </div>
                  <div className="box-form">
                    <label htmlFor="">Keterangan <span className="span-kecil">* isi jika ada yang mau disampaikan</span></label>
                    <textarea name="" id="" cols="30" rows="7"  onChange={(e) => {
                        setDataEditUploadPengumpulan({ ...dataEditUploadPengumpulan, keterangan_pengumpulan: e.target.value });
                        }}
                        value={dataEditUploadPengumpulan.keterangan_pengumpulan}></textarea>
                  </div>
                  <div className="button-group">
                      <button type="submit" className="button-form">
                      Upload Tugas
                    </button>
                    <div className="div3"> 
                    <button type="reset" className="button-form">
                      Reset Tugas
                    </button> 
                    </div>
                  </div> 
                </form> 
                <div className="d-flex justify-content-center">
                    <button className="button-form" onClick={handleEditTugas}>
                      Kembali
                    </button>
                </div>
                </div>
               
              </div>

              <div className="form-hapus"> 
                    <div className="form-upload-child">   
                      <div className="d-flex justify-content-center">
                          <button className="br-3-hijau" onClick={AksihandleHapusTugas}>
                            Ya
                          </button> 
                          <button className="br-3-merah" onClick={handleHapusTugas}>
                            Tidak
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
