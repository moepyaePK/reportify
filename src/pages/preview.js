import { useNavigate } from "react-router-dom";
import React from "react";
import ReportifyLogo from '../assets/ReportifyLogo.png';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/preview.css";
import image1 from "../assets/page1.png"
import image2 from "../assets/page2.png"
import image3 from "../assets/page3.png"

function Preview() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login"); // Redirects to the login page
    };

    return (
        <div>
            <nav className="navbar" style={{ backgroundColor: '#b80a21' }}>
                <div className="container-fluid">
                    <a className="navbar-brand d-flex align-items-center" href="preview.html">
                        <img
                            src={ReportifyLogo}
                            alt="Reportify Logo"
                            width="80"
                            height="40"
                            className="d-inline-block me-2"
                        />
                        <span className="text-white">Reportify</span>
                    </a>
                    <button
                        type="button"
                        className="btn btn-danger btn-lg ms-auto" // Align to right and make bigger
                        onClick={handleLoginClick}
                    >
                        Log In
                    </button>
                </div>
            </nav>

            {/* Carousel */}
            <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                    ></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            src={image3}
                            className="d-block w-100"
                            alt="First Slide"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src={image2}
                            className="d-block w-100"
                            alt="Second Slide"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src={image1}
                            className="d-block w-100"
                            alt="Third Slide"
                        />
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="intro-box p-4 border rounded">
        <p className="text-center mb-0">
        Welcome to Reprotify – your go-to platform for efficiently reporting incidents with ease and precision. Whether it's a road hazard, environmental concern, or safety issue, Reprotify empowers users to take action by marking the exact location on the map, categorizing the type of incident, and indicating its critical level. Our goal is to simplify incident reporting and ensure that your concerns are documented and visible to the right authorities. Join us in making communities safer and more responsive through Reprotify!        </p>
    </div>
        </div>
    );
}

export default Preview;
