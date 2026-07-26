import React,{useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {FaPhoneAlt,FaBars,FaTimes} from "react-icons/fa";
import logoImg from "../../assets/images/logo3.png";
import "./Navbar.css";

export default function Navbar () {
  const [isOpen,setIsOpen]=useState(false);
  const [activeLink,setActiveLink]=useState("Home");
  const location = useLocation();

  const navLinks=[
    {name: "Home",href: "#home"},
    {name: "Meet Prity",href: "#meet-prity"},
    {name: "Portfolio",href: "#portfolio"},
    {name: "What we offer",href: "#what-we-offer"},
    {name: "Blog",href: "#blog"},
    {name: "Contact Us",href: "#contact-us"}
  ];

  const handleLinkClick=(name) => {
    setActiveLink(name);
    setIsOpen(false);
  };

  const getLinkTarget = (href) => {
    if (location.pathname === "/admin") {
      return href.startsWith("#") ? "/" + href : href;
    }
    return href;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <Link to={location.pathname === "/admin" ? "/" : "#home"} className="navbar-logo" onClick={() => handleLinkClick("Home")}>
          <img src={logoImg} alt="PritySah Makeovers" />
        </Link>

        {/* Hamburger Menu Icon */}
        <div className="navbar-menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen? <FaTimes />:<FaBars />}
        </div>

        {/* Navigation Links */}
        <ul className={`navbar-links ${isOpen? "active":""}`}>
          {navLinks.map((link) => (
            <li key={link.name} className="navbar-item">
              <Link
                to={getLinkTarget(link.href)}
                className={`navbar-link ${activeLink===link.name? "active":""}`}
                onClick={() => handleLinkClick(link.name)}
              >
                {link.name}
              </Link>
            </li>
          ))}
          {/* Mobile-only Phone Contact */}
          <li className="navbar-item mobile-only-contact">
            <a href="tel:9304424087" className="navbar-phone-mobile">
              <FaPhoneAlt className="phone-icon-mob" />
              <div>
                <span className="phone-label-mob">NEED MAKEUP?</span>
                <span className="phone-number-mob">9304424087</span>
              </div>
            </a>
          </li>
        </ul>

        {/* Phone Contact Section (Desktop) */}
        <div className="navbar-contact">
          <a href="tel:9304424087" className="navbar-phone">
            <div className="phone-icon-wrapper">
              <FaPhoneAlt className="phone-icon" />
            </div>
            <div className="phone-info">
              <span className="phone-label">NEED MAKEUP?</span>
              <span className="phone-number">9304424087</span>
            </div>
          </a>
        </div>
      </div>
    </nav>
  );
}
