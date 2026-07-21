import React, { useState } from "react";
import "./PortfolioGrid.css";
import bridalImg from "../../assets/images/bridal_portfolio.png";
import partyImg from "../../assets/images/party_portfolio.png";
import engagementImg from "../../assets/images/engagement_portfolio.png";

// Reusable Before/After Slider Component
function BeforeAfterSlider({ afterImage, title }) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <div className="ba-slider-container">
      {/* After Image (Full background) */}
      <img src={afterImage} alt={`${title} After`} className="ba-image after-image" />
      <span className="ba-label label-after">AFTER (GLAM)</span>

      {/* Before Image (Clipped overlay using clip-path to prevent warping) */}
      <div 
        className="ba-before-wrapper" 
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`, width: "100%" }}
      >
        <img 
          src={afterImage} 
          alt={`${title} Before`} 
          className="ba-image before-image"
          style={{ 
            width: "100%", 
            height: "100%",
            objectFit: "cover",
            filter: "saturate(0.55) contrast(0.85) brightness(0.9) blur(0.2px)" 
          }} 
        />
        <span className="ba-label label-before">BEFORE</span>
      </div>

      {/* Slider Bar & Handle */}
      <div className="ba-slider-bar" style={{ left: `${sliderPosition}%` }}>
        <div className="ba-slider-handle">↔</div>
      </div>

      {/* Transparent Input Range */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="ba-range-input"
        aria-label="Before/After Slider"
      />
    </div>
  );
}

export default function PortfolioGrid() {
  const categories = ["All", "Bridal", "Party", "Engagement", "Reception", "Traditional", "HD Makeup"];
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(3);

  const portfolioItems = [
    {
      id: 1,
      title: "Royal Red Bridal Look",
      category: "Bridal",
      image: bridalImg
    },
    {
      id: 2,
      title: "Cocktail Glam Look",
      category: "Party",
      image: partyImg
    },
    {
      id: 3,
      title: "Soft Pastel Engagement Look",
      category: "Engagement",
      image: engagementImg
    },
    {
      id: 4,
      title: "Glitz & Gold Reception Look",
      category: "Reception",
      image: bridalImg
    },
    {
      id: 5,
      title: "Classic Traditional Makeover",
      category: "Traditional",
      image: bridalImg
    },
    {
      id: 6,
      title: "Flawless HD Portfolio Shoot",
      category: "HD Makeup",
      image: partyImg
    }
  ];

  // Filter items by category
  const filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setVisibleCount(3); // Reset visible items on category swap
  };

  return (
    <section className="portfolio section" id="portfolio">
      <div className="container">
        <span className="section-subtitle">My Transformations</span>
        <h2 className="section-title">Client Portfolio</h2>

        {/* Categories Tab Filter */}
        <div className="portfolio-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`portfolio-tab ${activeCategory === cat ? "active" : ""}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="portfolio-grid">
          {filteredItems.slice(0, visibleCount).map(item => (
            <div className="portfolio-card" key={item.id}>
              {/* Slider widget */}
              <BeforeAfterSlider afterImage={item.image} title={item.title} />
              
              <div className="portfolio-info">
                <span className="portfolio-category">{item.category}</span>
                <h3 className="portfolio-title">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredItems.length && (
          <div className="portfolio-load-more">
            <button className="load-more-btn" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
