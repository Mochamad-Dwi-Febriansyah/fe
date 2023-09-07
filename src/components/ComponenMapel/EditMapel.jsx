import Sidebar from "../../elemen/Sidebar";
import Navbar from "../../elemen/Navbar";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditMapelElemen from "../../elemen/KelolaMapel/EditMapel.jsx";
import axios from "axios";
import { IsLoggedIn } from "../../utils";

export default function KelolaMapel() {
  const {id} = useParams();
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
          <EditMapelElemen />
        </div>
      </div>
    </>
  );
}
