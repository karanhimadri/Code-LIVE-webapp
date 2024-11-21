import React from "react";
import { VscThreeBars } from "react-icons/vsc";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between     py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0 ">
            <a
              href="/"
              className="d-inline-flex link-body-emphasis text-decoration-none logo"
            >
              <div>
                <h3 style={{ color: "black" }}>CodeShare</h3>
                <p>
                  <span>Share Code</span>
                  <b> LIVE </b>
                  <span>with Developers</span>
                </p>
              </div>
            </a>
          </div>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="#" className="nav-link px-2 link-secondary">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2">
                About
              </a>
            </li>
          </ul>

          <div className="col-md-3 text-end navber-buttons">
            <button type="button" className="btn btn-outline-primary me-2 login-btn">
              Login
            </button>
            <button type="button" className="btn btn-primary signup-btn">
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
