import { useEffect, useState } from "react";
import Edit from "../../assets/img/edit.png";
import Add from "../../assets/img/add.png";
import Trash from "../../assets/img/trash.png";
import Back from "../../assets/img/arrow.png";
import B5 from "../../assets/img/b5.jpg";
import TKJ from "../../assets/img/tkj.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function KelolaMapel() {
  const { id } = useParams();
  const [mapel, setMapel] = useState([{ nama_mata_pelajaran: "" }]);
  const navigate = useNavigate();

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
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/kelolamapel/${id}?token=` +
          window.localStorage.getItem("token")
      ); 
      getMapel();
    } catch (error){
        console.log(error)
    }
  };
  // const getIdMapel = async (id) => {
  //   try {
  //     axios
  //     .get(`http://127.0.0.1:8000/api/kelolamapel/${id}?token=`+window.localStorage.getItem("token"))
  //     .then(res => {
  //       console.log(res.data.data)
  //     })
  //   } catch(error){
  //     console.log(error)
  //   }
  // };
  useEffect(() => {
    getMapel();
  }, []);

  return (
    <>
      <div className="content">
        <div className="title-box">
          <h1>Kelola Mata Pelajaran</h1>
        </div>

        <div className="card-content">
          <div className="title-content">
            <span>Daftar Mata Pelajaran</span>
            <span id="min">----</span>
          </div>
          <div className="box-content">
            <span className="add">
              <Link to="/dashboard/kelolamapel/tambah">
                <img srcSet={Add} alt="" />
              </Link>
            </span>
            <div className="content-container">
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Status</th>
                  </tr>
                </thead>

                {mapel.map((mpl, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{mpl.nama_mata_pelajaran}</td>
                      <td className="kotak-kotak">
                        <span className="edit">
                          <Link to={"/dashboard/kelolamapel/edit/" + mpl.id}>
                            <img srcSet={Edit} alt="" />
                          </Link>
                        </span>
                        <button
                          onClick={() => handleDelete(mpl.id)}
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
  );
}
