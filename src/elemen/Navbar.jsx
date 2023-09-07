import Hamburger from "../assets/img/hamburger.png";
import User from "../assets/img/user.png";
import PowerOff from "../assets/img/power-off.png";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const [dateno, setDateno] = useState();
  const dateTime = new Date();
  const dateNow = dateTime.getFullYear() + '-' + (dateTime.getMonth() + 1 ) + '-' + dateTime.getDate() +  " "+ dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds();
  setTimeout(() => {
    setDateno(dateNow)
  },1000);

  const [dataMe, setDataMe] = useState({
    id: "",
    nisn: "",
    nama: "",
  });

  const getDataMe = () => {
    var data = JSON.parse(localStorage.getItem("data"));
    setDataMe(data);
  };

  const ref = useRef(null);
  const reff = useRef(null);
  const profil = useRef(null);
  useEffect(() => {
    const handleClick = (event) => {
      const sidebar = document.getElementsByClassName("sidebar")[0];
      sidebar.classList.toggle("hide");
    };
    const handleClickk = () => {
      const sidebar = document.getElementsByClassName("sidebar")[0];
      sidebar.classList.toggle("hidesmall");
    };
    const profilClick = () => {
      const dropdownItem = document.getElementsByClassName(
        "description-dropdown"
      )[0];
      dropdownItem.classList.toggle("tampil");
    };
    const menu = ref.current;
    const menusmall = reff.current;
    const profi = profil.current;
    menu.addEventListener("click", handleClick);
    menusmall.addEventListener("click", handleClickk);
    profi.addEventListener("click", profilClick);
    return () => {
      menu.removeEventListener("click", handleClick);
      menusmall.removeEventListener("click", handleClickk);
      profi.removeEventListener("click", profilClick);
    };
  }, []);

  useEffect(() => {
    getDataMe();
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="menu-box-button">
          <div id="menu-button" ref={ref}>
            <img src={Hamburger} alt="" />
          </div>
          <div id="menu-button-small" ref={reff}>
            <img src={Hamburger} alt="" />
          </div>
        </div>
        <div className="menu-navigasi">
          {/* <div className="list-item">
            <span className="description">
              <Link to="/logout">Logout</Link>
            </span>
          </div> */}
          {/* <div className="list-item">
            <span className="description">{dataMe.nama}</span>
          </div> */}
          {/* <div className="list-item">
            <span className="description">Username</span>
          </div> */}
           <div className="list-item">
            <span>{dateno}</span>
          </div>

          <div className="list-item">
            <span className="description" id="description-profil" ref={profil}>
            {dataMe.nama}
            </span>
            <div className="description-dropdown">
              {/* <div className="dropdown-item">
                <img src={User} alt="" />
                <span className="description-desc">Edit Profil</span>
              </div> */}
              <div className="dropdown-item">
                <Link to="/edit" className="d-flex">
                  <img src={User} alt="" />
                  <span className="description-desc black">Edit Profil</span>
                </Link>
              </div>
              <div className="dropdown-item">
                <Link to="/logout" className="d-flex">
                  <img src={PowerOff} alt="" />
                  <span className="description-desc black">Logout</span>
                </Link>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </>
  );
}
