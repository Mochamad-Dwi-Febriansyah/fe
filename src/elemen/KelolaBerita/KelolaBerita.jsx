import { useEffect, useState } from "react";
import Edit from "../../assets/img/edit.png";
import Add from "../../assets/img/add.png";
import Trash from "../../assets/img/trash.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function KelolaBerita() {
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

    const handleDelete  = async (id) =>{
        try {
            await axios.delete(
              `http://127.0.0.1:8000/api/kelolaberita/${id}?token=` +
                window.localStorage.getItem("token")
            ); 
            getBerita();
          } catch (error){
              console.log(error)
          }
        };  
    useEffect(() => {
        getBerita();
    },[]);
  return (
    <>
        <div className="content">
        <div className="title-box">
          <h1>Kelola Berita</h1>
        </div>

        <div className="card-content">
          <div className="title-content">
            <span>Daftar Berita</span>
            <span id="min">----</span>
          </div>
          <div className="box-content">
              <span className="add">
                <Link to="/dashboard/kelolaberita/tambah"><img srcSet={Add} alt="" /></Link>
              </span>
            <div className="content-container scroll">
              <table>
                <thead>
                <tr>
                  <th>No</th>
                  <th>Judul Berita</th>
                  <th>Isi Berita</th>
                  <th>Gambar Berita</th>
                  <th>Kategori Berita</th>
                  <th>Status</th>
                </tr>
                </thead>
                {berita && berita.map((list, index) => (
                  <tbody key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{list.judul_berita}</td>
                    <td>{list.isi_berita}</td>
                    <td>{list.gambar_berita}</td>
                    <td>{list.kategori_berita}</td>
                    <td className="kotak-kotak">
                      <span className="edit">
                        <Link to={"/dashboard/kelolaberita/edit/"+list.id}><img srcSet={Edit} alt="" /></Link>
                      </span>
                      <button
                        onClick={() => handleDelete(list.id)}
                        className="delete"
                      >
                        <img srcSet={Trash} alt="" />{" "}
                      </button>
                    </td>
                  </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
