import React from "react";
import Header from "../components/Headermain/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import ProfileUserRegistered from "../components/registeredProfile/ProfileUserRegistered";
import Footer from "../components/Footer";
import "../App.css";

export default function ProfileUserRegisteredPage() {
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
          <ProfileUserRegistered />
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
