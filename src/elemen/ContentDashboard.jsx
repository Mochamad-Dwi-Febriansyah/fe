import User from '../assets/img/user.png';
import PowerOff from '../assets/img/power-off.png';
import B5 from '../assets/img/b5.jpg'; 
import { useEffect, useState } from 'react'; 
import axios from 'axios';


export default function ContentDashboard() {
  const [nama, setNama] = useState();
  const [berita, setBerita] = useState();

  const getBerita = async (event) => {
    try {
        const data = await axios.get(
            "http://127.0.0.1:8000/api/kelolaberita?token=" +
            window.localStorage.getItem("token")
        );
        setBerita(data.data);
    } catch (error) {
        console.log(error)
    }
};
useEffect(() => {  
    getBerita();
    const datauser = JSON.parse(localStorage.getItem("data"));
    setNama(datauser.nama)
  },[]);
  return (
    <>
    <div className="content">
          <div className="title-box">
            <h1>Dashboard Hi, {nama}</h1>
          </div>
          <div className="card-box">
            <div className="card-item">
              <div className="description">
                <span>Absensi</span>
                <h3>60</h3>
              </div>
              <img srcSet={User} alt="" />
            </div>
            <div className="card-item green">
              <div className="description">
                <span>Absensi</span>
                <h3>60</h3>
              </div>
              <img srcSet={PowerOff} alt="" />
            </div>
            <div className="card-item">
              <div className="description">
                <span>Absensi</span>
                <h3>60</h3>
              </div>
              <img srcSet={User} alt="" />
            </div> 
          </div>

          <div className="card-content">
            <div className="title-content">
              <span>Informasi Pembelajaran</span>
              <span id="min">----</span>
            </div>
            <div className="box-content">
              <div className="content-container">
{berita && berita.map((list,index) => (
                <div className="content-card-item" key={index}>
                  <div className="image"><img srcSet={B5} alt="" /></div>
                  <div className="decription">
                    <span>{list.judul_berita}</span>
                  </div>
                  <div className="button">Lihat Selengkapnya</div>
                </div> 
))}
              </div>
            </div>
          </div>


        </div>
    </>
  )
}
