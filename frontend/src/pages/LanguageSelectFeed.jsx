import React from "react";
import Header from "../components/Headermain/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import FeedSelected from "../components/FeedPost/FeedSelected";
import Footer from "../components/Footer";
import "../App.css";

export default function LanguageSelectFeed() {
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
          <FeedSelected />
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
