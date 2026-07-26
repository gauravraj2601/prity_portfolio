import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaShareAlt, FaTag, FaCalendarAlt, FaCompress, FaExpand } from "react-icons/fa";
import "./PortfolioDetails.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://server-prity-portfolio.onrender.com";

export default function PortfolioDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPortfolioDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/portfolio_images/${id}`);
        if (!response.ok) {
          throw new Error("Portfolio entry not found");
        }
        const data = await response.json();

        // Extract photos array
        const photos = data.images && data.images.length > 0
          ? data.images.map(img => img.image_url)
          : [data.image_url];

        setPortfolioData({
          ...data,
          photos,
        });
      } catch (err) {
        console.error("Error loading portfolio details:", err);
        setError("Unable to load portfolio details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPortfolioDetails();
    }
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: portfolioData?.title || "PritySah Makeovers Portfolio",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="portfolio-details-page loading-state">
        <div className="loading-spinner"></div>
        <p>Loading client portfolio gallery...</p>
      </div>
    );
  }

  if (error || !portfolioData) {
    return (
      <div className="portfolio-details-page error-state">
        <div className="error-card">
          <h2>Portfolio Not Found</h2>
          <p>{error || "The requested portfolio entry does not exist."}</p>
          <button className="back-btn-primary" onClick={() => navigate("/#portfolio")}>
            <FaArrowLeft /> Back to Client Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-details-page">
      {/* Header Banner */}
      <div className="details-header-banner">
        <div className="container">
          <Link to="/#portfolio" className="back-link-btn">
            <FaArrowLeft /> Back to Portfolio
          </Link>

          <div className="header-meta">
            <span className="details-category-tag">
              <FaTag /> {portfolioData.category}
            </span>
            {portfolioData.createdAt && (
              <span className="details-date">
                <FaCalendarAlt /> {new Date(portfolioData.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </span>
            )}
          </div>

          <h1 className="details-main-title">{portfolioData.title}</h1>
          {portfolioData.description && (
            <p className="details-description">{portfolioData.description}</p>
          )}

          <div className="details-actions-row">
            <button className="action-btn share-btn" onClick={handleShare}>
              <FaShareAlt /> {copied ? "Link Copied!" : "Share Gallery"}
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Masonry/Flexible Gallery */}
      <div className="container details-content-container">
        <div className="gallery-section-header">
          <h2>Gallery Showcase ({portfolioData.photos.length} Photo{portfolioData.photos.length > 1 ? "s" : ""})</h2>
          <p>Click any photo to expand into full screen view</p>
        </div>

        <div className="dynamic-masonry-grid">
          {portfolioData.photos.map((photoUrl, index) => (
            <div
              key={index}
              className="masonry-item"
              onClick={() => setSelectedImage(photoUrl)}
            >
              <img
                src={photoUrl}
                alt={`${portfolioData.title} photo ${index + 1}`}
                className="masonry-img"
                loading="lazy"
              />
              <div className="masonry-hover-overlay">
                <FaExpand className="expand-icon" />
                <span>View High-Res</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Fullscreen Viewing */}
      {selectedImage && (
        <div className="fullscreen-lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <button className="lightbox-close-btn" onClick={() => setSelectedImage(null)}>
            <FaCompress /> Close
          </button>
          <div className="lightbox-image-container" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Expanded View" className="lightbox-img" />
          </div>
        </div>
      )}
    </div>
  );
}
