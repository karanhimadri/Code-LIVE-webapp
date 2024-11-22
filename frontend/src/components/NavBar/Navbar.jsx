import React from "react";
import { VscThreeBars } from "react-icons/vsc";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0 navbar-holder">
            <Link
              to="/"
              className="d-inline-flex link-body-emphasis text-decoration-none logo"
            >
              <div className="logo-holder">
                <img src="/live-streaming.png" alt="logo" />
              </div>
              <div>
                <h3 style={{ color: "black", fontFamily: "Impact, fantasy" }}>
                  CodeLIVE
                </h3>
                <p>
                  <span style={{ fontWeight: "600" }}>Code</span>
                  <b> LIVE, </b>
                  <span style={{ fontWeight: "600" }}>
                    Build Faster Together!
                  </span>
                </p>
              </div>
            </Link>
          </div>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 hk-nav-gesture">
            <li>
              <Link to="/" className="nav-link px-2 link-secondary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="nav-link px-2">
                Features
              </Link>
            </li>
            <li>
              <Link to="/" className="nav-link px-2">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/" className="nav-link px-2">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/" className="nav-link px-2">
                About
              </Link>
            </li>
          </ul>

          <div className="col-md-3 text-end navber-buttons">
            <button
              type="button"
              className="btn btn-outline-primary me-2 login-btn"
            >
              Login
            </button>
            <button type="button" className="btn btn-primary signup-btns">
              Sign-up
            </button>
            <div>
              <button
                style={{ marginLeft: "6px" }}
                type="button"
                className="btn btn-secondary three-bar"
              >
                <VscThreeBars />
              </button>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
