import Sidebar from "../../elemen/Sidebar";
import Navbar from "../../elemen/Navbar";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddMapelElemen from "../../elemen/KelolaMapel/AddMapel.jsx";
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
          <AddMapelElemen />
        </div>
      </div>
    </>
  );
}
