import Sidebar from "../../elemen/Sidebar";
import Navbar from "../../elemen/Navbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddBeritaElemen from "../../elemen/KelolaBerita/AddBerita";
import { IsLoggedIn } from "../../utils";

export default function AddBerita() {
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
          <AddBeritaElemen />
        </div>
      </div>
    </>
  );
}
