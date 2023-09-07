import Sidebar from "../../elemen/Sidebar";
import Navbar from "../../elemen/Navbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddKelasElemen from "../../elemen/KelolaKelas/AddKelas";
import { IsLoggedIn } from "../../utils";

export default function KelolaKelas() {
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
          <AddKelasElemen />
        </div>
      </div>
    </>
  );
}
