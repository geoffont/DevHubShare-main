import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Headermain/Header";
import HomePage from "../components/HomePage/HomePage";
import Sidebar from "../components/Sidebar/Sidebar";
import "../App.css";

export default function Home() {
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
          <HomePage />
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
