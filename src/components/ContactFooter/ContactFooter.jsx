import React from "react";
import { Link } from "react-router-dom";
import {FaPhoneAlt,FaWhatsapp,FaInstagram,FaEnvelope,FaMapMarkerAlt,FaYoutube} from "react-icons/fa";
import "./ContactFooter.css";

export default function ContactFooter () {
  const currentYear=new Date().getFullYear();

  return (
    <footer className="footer-contact" id="contact-us">
      {/* 1. CTA Banner Section */}
      <div className="cta-banner">
        <div className="container cta-container">
          <h2 className="cta-title">Ready for Your Dream Look?</h2>
          <p className="cta-desc">
            Let's create a makeup style that makes you feel confident, beautiful, and unforgettable.
          </p>
          <a
            href="https://wa.me/+919304424087?text=Hello%20Prity,%20I'd%20like%20to%20book%20a%20makeup%20appointment."
            target="_blank"
            rel="noopener noreferrer"
            className="cta-book-btn"
          >
            Book Appointment
          </a>
        </div>
      </div>

      {/* 2. Contact Info & Map Grid */}
      <div className="footer-details section">
        <div className="container footer-grid">
          {/* Left Column: Contact info cards */}
          <div className="footer-info">
            <h3 className="footer-section-title">Get In Touch</h3>
            <p className="footer-info-intro">
              Whether you are a bride-to-be or want to look elegant for a celebration, feel free to connect via WhatsApp, call, or email.
            </p>

            <div className="contact-list">
              <a href="tel:9304424087" className="contact-item-link">
                <div className="contact-icon-box"><FaPhoneAlt /></div>
                <div className="contact-item-text">
                  <span className="contact-label">Call Me</span>
                  <span className="contact-value">+91 9304424087</span>
                </div>
              </a>

              <a
                href="https://wa.me/+919304424087?text=Hello%20Prity!"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item-link"
              >
                <div className="contact-icon-box wa-box"><FaWhatsapp /></div>
                <div className="contact-item-text">
                  <span className="contact-label">WhatsApp</span>
                  <span className="contact-value">+91 9304424087</span>
                </div>
              </a>

              <a
                href="https://www.instagram.com/artistprity70023?igsh=czdveDdhM3p5cTls"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item-link"
              >
                <div className="contact-icon-box insta-box"><FaInstagram /></div>
                <div className="contact-item-text">
                  <span className="contact-label">Instagram</span>
                  <span className="contact-value">@Makeover_with_prity</span>
                </div>
              </a>
              <a
                href="https://www.youtube.com/@pritysah7480"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item-link"
              >
                <div className="contact-icon-box wa-box"><FaYoutube /></div>
                <div className="contact-item-text">
                  <span className="contact-label">Youtube</span>
                  <span className="contact-value">@Makeover_with_prity</span>
                </div>
              </a>

              <a href="mailto:pritysahmakeovers@gmail.com" className="contact-item-link">
                <div className="contact-icon-box"><FaEnvelope /></div>
                <div className="contact-item-text">
                  <span className="contact-label">Email Address</span>
                  <span className="contact-value">pritysahmakeovers@gmail.com</span>
                </div>
              </a>

              <div className="contact-item-link no-hover">
                <div className="contact-icon-box"><FaMapMarkerAlt /></div>
                <div className="contact-item-text">
                  <span className="contact-label">Available In</span>
                  <span className="contact-value">Delhi, Muzaffarpur, Sitamarhi & Nearby Areas (By Appointment)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Location Card */}
          <div className="footer-map-container">
            <h3 className="footer-section-title">Our Location</h3>
            <div className="google-map-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d630.6736883147373!2d85.5116901355592!3d26.59627369141286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ecf12546e48e4d%3A0xfa56038af33d2527!2sBazar%20Samiti%2C%20Bihar%20843302!5e0!3m2!1sen!2sin!4v1784562384254!5m2!1sen!2sin"
                width="100%"
                height="320"
                style={{border: 0,borderRadius: "12px"}}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Prity Sah Makeup Studio Pune Map"
              />

            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Footer Credits */}
      <div className="footer-credits">
        <div className="container credits-container">
          <p className="copyright">&copy; {currentYear} Prity Sah Makeovers. All Rights Reserved.</p>
          <div className="footer-bottom-links" style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            <span className="developer">Designed with passion for visual excellence</span>
            <span className="divider" style={{ opacity: 0.4 }}>|</span>
            <Link to="/admin" className="admin-link-footer" style={{ color: "var(--gold-light, #E5C16E)", fontWeight: "500", textDecoration: "underline", transition: "color 0.3s" }}>Admin Panel</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
