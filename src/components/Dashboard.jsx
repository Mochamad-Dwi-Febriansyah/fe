import Sidebar from "../elemen/Sidebar";
import Navbar from "../elemen/Navbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContentDashboard from "../elemen/ContentDashboard";
import { IsLoggedIn } from "../utils";


export default function Dashboard() {
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
          <ContentDashboard />
        </div>
      </div>
    </>
  );
}
