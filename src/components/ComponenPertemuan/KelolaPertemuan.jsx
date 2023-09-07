import Sidebar from "../../elemen/Sidebar";
import Navbar from "../../elemen/Navbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import KelolaPertemuanElemen from "../../elemen/KelolaPertemuan/KelolaPertemuan";
import { IsLoggedIn } from "../../utils";

export default function KelolaPertemuan() {
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
          <KelolaPertemuanElemen />
        </div>
      </div>
    </>
  );
}
