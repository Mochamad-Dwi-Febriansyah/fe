import Sidebar from "../../elemen/Sidebar";
import Navbar from "../../elemen/Navbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import KelolaUserElemen from "../../elemen/KelolaUser/KelolaUser";
import { IsLoggedIn } from "../../utils";

export default function KelolaUser() {
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
          <KelolaUserElemen />
        </div>
      </div>
    </>
  );
}
