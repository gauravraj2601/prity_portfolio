import React from "react";
import {FaInstagram,FaPlay,FaHeart,FaComment} from "react-icons/fa";
import "./InstagramFeed.css";
import img1 from "../../assets/images/bridal_portfolio.png";
import img2 from "../../assets/images/party_portfolio.png";
import img3 from "../../assets/images/engagement_portfolio.png";

export default function InstagramFeed () {
  // Mock Feed Items reusing generated images
  const feedItems=[
    {id: 1,type: "reel",img: img1,likes: "142",comments: "28"},
    {id: 2,type: "photo",img: img2,likes: "98",comments: "12"},
    {id: 3,type: "photo",img: img3,likes: "156",comments: "31"},
    {id: 4,type: "reel",img: img2,likes: "210",comments: "45"},
    {id: 5,type: "photo",img: img1,likes: "115",comments: "19"},
    {id: 6,type: "reel",img: img3,likes: "188",comments: "22"}
  ];

  return (
    <section className="instagram section" id="instagram-feed">
      <div className="container">
        <span className="section-subtitle">Social Updates</span>
        <h2 className="section-title">Follow My Journey</h2>
        <p className="instagram-desc">
          Latest transformations, behind-the-scenes, bridal reels, and client makeovers on my official channel.
        </p>

        <div className="instagram-grid">
          {feedItems.map((item) => (
            <a
              key={item.id}
              href="https://instagram.com/prity_sah_makeovers"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-card"
            >
              <img src={item.img} alt="Instagram Post Mock" className="instagram-img" />

              {/* Type Badge (Reel icon) */}
              {item.type==="reel"&&(
                <div className="insta-badge-type">
                  <FaPlay className="badge-play-icon" />
                </div>
              )}

              {/* Hover Stats Overlay */}
              <div className="instagram-overlay">
                <div className="instagram-stats">
                  <span className="stat-item"><FaHeart className="stat-icon" /> {item.likes}</span>
                  <span className="stat-item"><FaComment className="stat-icon" /> {item.comments}</span>
                </div>
                <div className="instagram-follow-badge">
                  <FaInstagram className="insta-follow-icon" />
                  <span>View Post</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="instagram-btn-wrapper">
          <a
            href="https://www.instagram.com/artistprity70023?igsh=czdveDdhM3p5cTls"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-btn"
          >
            <FaInstagram className="btn-insta-icon" />
            <span>Follow @Makeover_with_prity</span>
          </a>
        </div>
      </div>
    </section>
  );
}
