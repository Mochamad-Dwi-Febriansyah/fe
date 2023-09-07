import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogoSmk from "../assets/img/logo smk.png";

export default function Login() {

  const redirect = useNavigate();

  const [message, setMessage] = useState('');
  const [data,setData] = useState({
    nisn: '',
    nama: ''
  });

  const handleSubmit =  async (event) => {
    event.preventDefault();
    if (data.nisn=="" || data.nama==""){
      const datamessage = {
         message : 'Silahkan Isi Data Dengan Tepat',
         status : 0
      };
      setMessage(datamessage);
      return false;
    }
    try {
      const dt = await axios.post("http://127.0.0.1:8000/api/login", data) 
      const datamessage = {
        message : 'Berhasil Login Halaman Akan Dialihkan',
        status : 1
     };
     setMessage(datamessage); 
      // console.log(dt)
      if (dt.data.data.nisn == 'admin') {
        const user = {
          id : dt.data.data.id,
          nisn : dt.data.data.nisn,
          nama : dt.data.data.nama,
        }
        window.localStorage.setItem("token", dt.data.data.login_tokens); 
        window.localStorage.setItem("data", JSON.stringify(user)); 
      } else if (dt.data.data.nisn != 'admin') {
        const user = {
          id : dt.data.data.id,
          nisn : dt.data.data.nisn,
          nama : dt.data.data.nama,
          kelas_id : dt.data.data.kelas.id,
          nama_kelas : dt.data.data.kelas.nama_kelas
        }
        window.localStorage.setItem("token", dt.data.data.login_tokens); 
        window.localStorage.setItem("data", JSON.stringify(user)); 
      }
      
      // console.log(window.localStorage)
      setTimeout(() => {
        redirect("/dashboard");  
      },2000);
    } catch (error) {
      setMessage(error.response.data);
      // console.log(error)
    }
  };
  useEffect(() => {

  },[]);

  return (
    <>
    
      <div className="container-login"> 
        <div className="blur">
          <div className="message-login"> 
              {message.status == 0 && <div className="title bg-danger">{message.message}</div>}
              {message.status == 1 &&<div className="title bg-success">{message.message}</div>}
          </div>
          <div className="login-container">
            <div className="box-title">
              <img src={LogoSmk} alt="" />
              <span>LOGIN E-LEARN</span>
            </div>
            <form action="" onSubmit={handleSubmit}>
              <div className="box-login">
                <label>Nisn</label>
                <input
                  type="text"
                  id=""
                  placeholder="Nisn.."
                  onChange={(e) => {setData({...data,nisn: e.target.value});}}
                  value={data.nisn}
                  // required
                />
              </div>
              <div className="box-login">
                <label>Nama</label>
                <input
                  type="text"
                  id=""
                  placeholder="Nama.."
                  onChange={(e) => { setData({...data,nama: e.target.value});}}
                  value={data.nama}
                  // required
                />
              </div>
              <div className="box-submit">
                <button type="submit">LOGIN</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
