import { useState } from "react";

const IsLoggedIn = () => {
  return localStorage.getItem("token") ? true : false;
};

const USER = () => {
  return  JSON.parse(localStorage.getItem('data'));
}

export { IsLoggedIn , USER};

