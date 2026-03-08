import React, { useState } from "react";
import PropTypes from "prop-types";
import Header from "./Headermain/Header";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer";
import "../App.css";

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-layout">
      <Header onMenuClick={() => setMobileOpen((prev) => !prev)} />
      <div className="app-main">
        <div className="app-sidebar">
          <Sidebar />
        </div>
        <Sidebar
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
          mobileOnly
        />
        <main className="app-content">{children}</main>
      </div>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
