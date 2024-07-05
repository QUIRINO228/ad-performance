import React from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className=" navbar navbar-expand-lg navbar-expand-md navbar-dark bg-primary">
            <div className="container-lg">
                <a className="navbar-brand m-2" href="#">
                    Navbar
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to="/dashboard" className="nav-link">
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link">
                                About Us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/ad-info" className="nav-link">
                                Ad Info
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

)
    ;
};

export default Navbar;
