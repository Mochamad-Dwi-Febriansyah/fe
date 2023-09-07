import Sidebar from "../../elemen/Sidebar";
import Navbar from "../../elemen/Navbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import KelolaPengumpulanTugasElemen from "../../elemen/KelolaPengumpulanTugas/KelolaPengumpulanTugas";
import { IsLoggedIn } from "../../utils";

export default function KelolaPengumpulanTugas() {
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
          <KelolaPengumpulanTugasElemen />
        </div>
      </div>
    </>
  );
}
