import React from "react";
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/FooterComponent/Footer";
import { Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout-container">
      <div className="navbar-layout">
        <Navbar />
      </div>
      <div className="outlet-layout">
        <Outlet /> {/* This will render the nested routes */}
      </div>
      <div className="footer-layout">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
