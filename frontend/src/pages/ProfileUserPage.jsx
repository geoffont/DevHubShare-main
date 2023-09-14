import React from "react";
import Header from "../components/Headermain/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import ProfileUser from "../components/profilComponents/ProfileUser";
import Footer from "../components/Footer";
import "../App.css";

export default function ProfileUserPage() {
  return (
    <div className="parent">
      <div className="header">
        <Header />
      </div>
      <div className="middle">
        <div className="side">
          <Sidebar />
        </div>
        <div className="content">
          <ProfileUser />
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
