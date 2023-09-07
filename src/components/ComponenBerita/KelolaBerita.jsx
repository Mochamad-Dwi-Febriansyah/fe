import Sidebar from "../../elemen/Sidebar";
import Navbar from "../../elemen/Navbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import KelolaBeritaElemen from "../../elemen/KelolaBerita/KelolaBerita";
import { IsLoggedIn } from "../../utils";

export default function KelolaBerita() {
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
          <KelolaBeritaElemen />
        </div>
      </div>
    </>
  );
}
