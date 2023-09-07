import React from 'react'
import Add from "../../assets/img/add.png";
import Back from "../../assets/img/arrow.png";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function KelolaKelasKelolaUser() {
    const navigate = useNavigate();
    const  { id } = useParams();
    const [namaKelas,setNamaKelas] = useState();
    const [user,setUser] = useState();
    const getUser = async (event) => {
        try {
            const data = await axios.get(`http://127.0.0.1:8000/api/kelolakelas/${id}/kelolauser?token=` +
            window.localStorage.getItem("token"))
            setUser(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getNamaKelas = async (event) => {
        try {
            const getkelasbyid = await axios.get(
              `http://127.0.0.1:8000/api/kelolakelas/${id}?token=` +
                window.localStorage.getItem("token")
            );
            setNamaKelas(getkelasbyid.data.data.nama_kelas);
           
          } catch (error) {
            console.log(error)
          }
        }; 

    useEffect(() => {
        getUser();
        getNamaKelas();
    },[]);
  return (
    <> 
      <div className="content">
        <div className="title-box">
          <h1>Kelola Kelas {namaKelas}</h1>
        </div>

        <div className="card-content">
          <div className="title-content">
            <span>Daftar Kelas</span>
            <span id="min">----</span>
          </div>
          <div className="box-content">
          <span className="add mr-5px" onClick={() => navigate(-1)}>
              <img srcSet={Back} alt="" />
            </span>
              <span className="add">
                <Link to="/dashboard/kelolakelas/tambah"><img srcSet={Add} alt="" /></Link>
              </span>
            <div className="content-container scroll">
              <table>
                <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Nisn</th>  
                </tr>
                </thead> 
                  <tbody>
                    {user && user.map((list,index) => (    
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{list.nama}</td>
                    <td>{list.nisn}</td> 
                  </tr>
                    ))}
                  </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 