import Sidebar from "../../elemen/Sidebar";
import Navbar from "../../elemen/Navbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DetailPertemuanElemen from "../../elemen/DetailPertemuan/DetailPertemuan";
import { IsLoggedIn } from "../../utils";

export default function DetailPertemuan() {
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
          <DetailPertemuanElemen />
        </div>
      </div>
    </>
  );
}
