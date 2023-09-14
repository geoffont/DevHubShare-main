import React from "react";
import Header from "../components/Headermain/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import SignIn from "../components/SignIn";
import Footer from "../components/Footer";
import "../App.css";

export default function SignInPage() {
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
          <SignIn />
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
