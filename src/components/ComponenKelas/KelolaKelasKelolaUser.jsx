import Sidebar from "../../elemen/Sidebar";
import Navbar from "../../elemen/Navbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import KelolaKelasUserElemen from "../../elemen/KelolaKelas/KelolaKelasKelolaUser.jsx";
import { IsLoggedIn } from "../../utils";

export default function KelolaKelasKelolaUser() {
  const redirect = useNavigate();
  useEffect(() => {
    !IsLoggedIn() && redirect('/');
  }, []);
  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="box">
          <Navbar />
          <KelolaKelasUserElemen />
        </div>
      </div>
    </>
  );
}
