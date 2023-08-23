import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-expand-md navbar-expand-sm ">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            style={{ padding: "20px", fontSize: "2rem" }}
          >
            noteKeep
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
