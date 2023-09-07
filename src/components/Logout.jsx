// import React from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function Logout() {
  const redirect = useNavigate();

  useEffect(() => {
    try {
      axios.post(
        "http://127.0.0.1:8000/api/logout?token=" +
          window.localStorage.getItem("token")
      );
      window.localStorage.clear();
      // console.log(window.localStorage.getItem("token"));
      setTimeout(() => {
        redirect("/");
      },600);
    } catch (error) {
      console.log(error);
    } 
  });
}
