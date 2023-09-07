import React from "react";
import Back from "../../assets/img/arrow.png";
import { useNavigate } from "react-router-dom";

export default function DetailPertemuan() {
  const navigate = useNavigate();

  return (
    <>
      <div className="content">
        <div className="title-box">
          <h1>Kelas</h1>
        </div>

        <div className="card-content">
          <div className="title-content">
            <span>Daftar Hadir</span>
            <span id="min">----</span>
          </div>
          <div className="box-content">
            <span className="add" onClick={() => navigate(-1)}>
              <img srcSet={Back} alt="" />
            </span>
            <div className="content-container">
              <div className="box-info">
                <div className="info-child">
                  <h1 className="title-child">Tugas Routing</h1>
                  <span>Open : 13-02-2023</span>
                  <span>Closed : 13-02-2024</span>
                </div>
                <div className="info-child">
                  <div className="deskripsi">
                    Berikan contoh penggunaan topologi dalam dunia kerja. MINIMAL 40
                  </div>
                </div>
                <div className="info-child">
                  <h1 className="title-child">Pengumpulan</h1>
                  <form action="">
                    <table  className="mb-1">
                      <thead>
                        <tr>
                          <th>Status Pengumpulan</th>
                          <td>Sudah Mengumpulkan</td>
                        </tr>
                      </thead>
                      <thead>
                        <tr>
                          <th>Nilai</th>
                          <td>98</td>
                        </tr>
                      </thead>
                      <thead>
                        <tr>
                          <th>Pengumpulan Telat</th>
                          <td>-</td>
                        </tr>
                      </thead>
                      <thead>
                        <tr>
                          <th>Terakhir di ubah</th>
                          <td>Rabu, 21-09-2023, 12:31 </td>
                        </tr>
                      </thead>
                      <thead>
                        <tr>
                          <th>File Pengumpulan</th>
                          <td>tugas_2.docs</td>
                        </tr>
                      </thead>
                    </table>
                    <div className="form-tugas f-center">
                      <button type="submit" className="button-form">
                        Kirim Tugas
                      </button>
                      <button type="submit" className="button-form">
                        Edit Tugas
                      </button>
                      <button type="submit" className="button-form">
                        Hapus Tugas
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
