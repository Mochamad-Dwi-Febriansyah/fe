import Sidebar from "../../elemen/Sidebar";
import Navbar from "../../elemen/Navbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PertemuanElemen from "../../elemen/Pertemuan/Pertemuan";
import { IsLoggedIn } from "../../utils";

export default function Pertemuan() {
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
          <PertemuanElemen />
        </div>
      </div>
    </>
  );
}
