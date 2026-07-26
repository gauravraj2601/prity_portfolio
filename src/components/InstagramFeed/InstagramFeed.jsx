import React,{useState,useEffect} from "react";
import {FaInstagram,FaPlay,FaHeart,FaComment} from "react-icons/fa";
import "./InstagramFeed.css";
import img1 from "../../assets/images/bridal_portfolio.png";
import img2 from "../../assets/images/party_portfolio.png";
import img3 from "../../assets/images/engagement_portfolio.png";

const API_BASE_URL=import.meta.env.VITE_API_URL||"https://server-prity-portfolio.onrender.com";

export default function InstagramFeed () {
  const [reels,setReels]=useState([]);

  // Fetch Reels from GET /api/reels
  useEffect(() => {
    const fetchReelsFromBackend=async () => {
      try {
        const response=await fetch(`${API_BASE_URL}/api/reels`);
        if (response.ok) {
          const data=await response.json();
          if (data&&data.length>0) {
            setReels(data);
          }
        }
      } catch (e) {
        console.warn("Backend API /api/reels not reachable for InstagramFeed:",e);
      }
    };

    fetchReelsFromBackend();
  },[]);

  // Default fallback feed items if database has no reels yet
  const defaultFeedItems=[
    {id: 1,type: "reel",cover_image_url: img1,likes_count: "142",comments_count: "28",reel_url: "https://www.instagram.com/artistprity70023?igsh=czdveDdhM3p5cTls"},
    {id: 2,type: "photo",cover_image_url: img2,likes_count: "98",comments_count: "12",reel_url: "https://www.instagram.com/artistprity70023?igsh=czdveDdhM3p5cTls"},
    {id: 3,type: "photo",cover_image_url: img3,likes_count: "156",comments_count: "31",reel_url: "https://www.instagram.com/artistprity70023?igsh=czdveDdhM3p5cTls"},
    {id: 4,type: "reel",cover_image_url: img2,likes_count: "210",comments_count: "45",reel_url: "https://www.instagram.com/artistprity70023?igsh=czdveDdhM3p5cTls"},
    {id: 5,type: "photo",cover_image_url: img1,likes_count: "115",comments_count: "19",reel_url: "https://www.instagram.com/artistprity70023?igsh=czdveDdhM3p5cTls"},
    {id: 6,type: "reel",cover_image_url: img3,likes_count: "188",comments_count: "22",reel_url: "https://www.instagram.com/artistprity70023?igsh=czdveDdhM3p5cTls"}
  ];

  const displayFeed=reels.length>0? reels:defaultFeedItems;

  return (
    <section className="instagram section" id="instagram-feed">
      <div className="container">
        <span className="section-subtitle">Social Updates</span>
        <h2 className="section-title">Follow My Journey</h2>
        <p className="instagram-desc">
          Latest transformations, behind-the-scenes, bridal reels, and client makeovers on my official channel.
        </p>

        <div className="instagram-grid">
          {displayFeed?.map((item) => (
            <div key={item._id||item.id} className="instagram-card">
              <img src={item.cover_image_url} alt={item.caption||"Instagram Reel Cover"} className="instagram-img" />

              {/* Reel Icon Badge */}
              <div className="insta-badge-type">
                <FaPlay className="badge-play-icon" />
              </div>

              {/* Hover Overlay */}
              <div className="instagram-overlay">
                {item.caption&&<p className="instagram-caption">{item.caption}</p>}
                <div className="instagram-stats">
                  <span className="stat-item">
                    <FaHeart className="stat-icon" /> {item.likes_count||"0"}
                  </span>
                  <span className="stat-item">
                    <FaComment className="stat-icon" /> {item.comments_count||"0"}
                  </span>
                </div>
                <a
                  href={item.reel_url||"https://www.instagram.com/artistprity70023?igsh=czdveDdhM3p5cTls"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram-follow-badge"
                >
                  <FaInstagram className="insta-follow-icon" />
                  <span>View Post</span>
                </a>
              </div>
            </div>
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
