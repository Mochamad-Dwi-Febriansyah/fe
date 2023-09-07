import Sidebar from "../../elemen/Sidebar";
import Navbar from "../../elemen/Navbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddUserElemen from "../../elemen/KelolaUser/AddUser";
import { IsLoggedIn } from "../../utils";

export default function AddUser() {
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
          <AddUserElemen />
        </div>
      </div>
    </>
  );
}
