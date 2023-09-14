import React from "react";
import Header from "../components/Headermain/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import MyPosts from "../components/MyPosts/MyPosts";
import Footer from "../components/Footer";
import "../App.css";

export default function MyPostsPage() {
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
          <MyPosts />
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
