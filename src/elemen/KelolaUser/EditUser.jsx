import { Link, useNavigate, useParams } from "react-router-dom";
import Arrow from "../../assets/img/arrow.png";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditUser() {
  const navigate = useNavigate();
  const [data, setData] = useState(
    {
      nisn: "",
      nama: "",
      kelas_id: "",
    }
  );
  const [kelas, setKelas] = useState([
    {
      id: "",
      nama_kelas: "",
    },
  ]);
  const { id } = useParams();

  const handleSubmitUpdate = async (event) => {
    event.preventDefault();
    try {
      // console.log(data);
      await axios.put(`http://127.0.0.1:8000/api/kelolauser/edit/${id}?token=`+window.localStorage.getItem("token"),data);
      navigate('/dashboard/kelolauser');
    } catch (error) {
      console.log(error);
    }
  };
  const getUserById = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/kelolauser/${id}?token=` +
      window.localStorage.getItem("token")
      );

      setData({
        nisn : response.data.data.nisn,
        nama : response.data.data.nama,
        nisn : response.data.data.nisn,
        kelas_id : response.data.data.kelas.id
  });
};

const getKelas = async () => {
  try {
    const dasta = await axios.get(
      "http://127.0.0.1:8000/api/kelolakelas?token=" +
        window.localStorage.getItem("token")
    );
    setKelas(dasta.data); 
  } catch (error) {
    console.log(error);
  }
};
// console.log(data)

  useEffect(() => {
    getUserById();
    getKelas();
  }, []);

  return (
    <>
      <div className="content">
        <div className="title-box">
          <h1>Kelola User</h1>
        </div>

        <div className="card-content">
          <div className="title-content">
            <span>Tambah Siswa</span>
            <span id="min">----</span>
          </div>
          <div className="box-content">
            <span className="add">
              <Link to="/dashboard/kelolauser">
                <img srcSet={Arrow} />
              </Link>
            </span>
            <div className="form-container">
              <form action="" onSubmit={handleSubmitUpdate}>
                <div className="input-form">
                  <label htmlFor="nisn">NISN</label>
                  <input
                    type="text"
                    id="nisn"
                    onChange={(e) => {
                      setData({ ...data, nisn: e.target.value });
                    }}
                    value={data.nisn}
                  />
                </div>
                <div className="input-form">
                  <label htmlFor="nama">Nama</label>
                  <input
                    type="text"
                    id="nama"
                    onChange={(e) => {
                      setData({ ...data, nama: e.target.value });
                    }}
                    value={data.nama}
                  />
                </div>
                <div className="input-form">
                  <label htmlFor="kelas">kelas</label>
                  <select
                  id="kelas"
                    onChange={(e) => {
                      setData({ ...data, kelas_id: e.target.value });
                    }}
                    value={data.kelas_id}
                  >{kelas && kelas.map((kls , index) => (
                    <option value={kls.id} key={index}>{kls.nama_kelas}</option>
                  ))}
                  </select>
                </div>
                <div className="button-form">
                  <button type="submit">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
