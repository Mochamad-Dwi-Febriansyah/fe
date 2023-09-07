import Close from "../assets/img/close.png";
import Youtube from "../assets/img/Youtube.svg";
import Frame from "../assets/img/Frame 10.png";
import DashboardSvg from "../assets/img/dahboard.svg";
import Analytics from "../assets/img/analytics.svg";
import Category from "../assets/img/category.svg";
import Team from "../assets/img/team.svg";
import Explore from "../assets/img/explore.svg";
import Events from "../assets/img/event.svg";
import Historys from "../assets/img/history.svg";
import Setting from "../assets/img/setting.svg";
import "../utils";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { USER } from "../utils";

// import logo from "../assets/img";

export default function Sidebar() {
  const refff = useRef(null);
  useEffect(() => {
    const handleClick = (event) => {
      const sidebar = document.getElementsByClassName("sidebar")[0];
      sidebar.classList.remove("hidesmall");
    };
    const menu = refff.current;
    menu.addEventListener("click", handleClick);
    return () => {
      menu.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <div className="sidebar">
        <div className="header">
          <div className="list-item">
            <div id="menu-button-close" ref={refff}>
              <img src={Close} alt="" />
            </div>
          </div>
          <div className="list-item">
            <img src={Youtube} alt="" className="icon" srcSet="" />
            <span className="description-header">E-Learning</span>
          </div>
          <div className="illustration">
            <img src={Frame} alt="" />
          </div>
        </div>
        <div className="main">
          {USER().nisn == "admin" ? (
            <>
              <div className="list-item">
                <Link to="/dashboard" className="hoverbackground">
                  <img src={DashboardSvg} alt="" className="icon" />
                  <span className="description">Dashboard</span>
                </Link>
              </div>
              <div className="list-item">
                <Link to="/dashboard/kelolaberita" className="hoverbackground">
                  <img src={Explore} alt="" className="icon" />
                  <span className="description">Kelola Berita</span>
                </Link>
              </div> 
              <div className="list-item">
                <Link to="/dashboard/kelolauser" className="hoverbackground">
                  <img src={Team} alt="" className="icon" />
                  <span className="description">Kelola User</span>
                </Link>
              </div> 
              <div className="list-item">
                <Link to="/dashboard/kelolamapel" className="hoverbackground">
                  <img src={Analytics} alt="" className="icon" />
                  <span className="description">Kelola Mata Pelajaran</span>
                </Link>
              </div> 
              <div className="list-item">
                <Link to="/dashboard/kelolakelas" className="hoverbackground">
                  <img src={Category} alt="" className="icon" />
                  <span className="description">Kelola Kelas</span>
                </Link>
              </div>
              {/* <div className="list-item">
              <img src={Events} alt="" className="icon" />
              <span className="description"><Link to="/dashboard/kelolapertemuan">Pertemuan</Link></span>
              </div>
              <div className="list-item">
              <img src={Events} alt="" className="icon" />
              <span className="description"><Link to="/dashboard/kelolapertemuan/detail">Detail Pertemuan</Link></span>
            </div>  */}
            <div className="list-item">
              <Link to="/pertemuan" className="hoverbackground">
                <img src={Events} alt="" className="icon" />
                <span className="description">Pertemuan</span>
              </Link>
            </div>
            <div className="list-item">
              <Link to="/pengumpulantugas" className="hoverbackground">
                <img src={Events} alt="" className="icon" />
                <span className="description">Pengumpulan Tugas</span>
              </Link>
            </div>
            </>
          ) : (
            <>
            <div className="list-item">
              <Link to="/dashboard" className="hoverbackground">
                <img src={DashboardSvg} alt="" className="icon" />
                <span className="description">Dashboard</span>
              </Link>
            </div>
            <div className="list-item">
              <Link to="/pertemuan" className="hoverbackground">
                <img src={Events} alt="" className="icon" />
                <span className="description">Pertemuan</span>
              </Link>
            </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
