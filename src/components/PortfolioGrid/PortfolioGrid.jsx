import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {FaImages} from "react-icons/fa";
import "./PortfolioGrid.css";
import bridalImg from "../../assets/images/bridal_portfolio.png";
import partyImg from "../../assets/images/party_portfolio.png";
import engagementImg from "../../assets/images/engagement_portfolio.png";

const API_BASE_URL=import.meta.env.VITE_API_URL||"https://server-prity-portfolio.onrender.com";

// Premium Stacked Photo Card Slider Component (Bidirectional Left-Right & Right-Left)
function StackedPhotoSlider ({photos,fallbackImage,title}) {
  const [sliderPosition,setSliderPosition]=useState(0); // -100 to +100 (0 = center)
  const [currentIndex,setCurrentIndex]=useState(0);
  const [slideDirection,setSlideDirection]=useState(""); // "right" or "left"

  const imageList=photos&&photos.length>0? photos:[fallbackImage];
  const frontPhoto=imageList[currentIndex%imageList.length];

  const handleSliderChange=(e) => {
    const val=Number(e.target.value);
    setSliderPosition(val);

    // Slide Right -> Next photo
    if (val>=75&&imageList.length>1&&!slideDirection) {
      setSlideDirection("right");
      setTimeout(() => {
        setCurrentIndex((prev) => (prev+1)%imageList.length);
        setSliderPosition(0);
        setSlideDirection("");
      },350);
    }
    // Slide Left -> Previous photo
    else if (val<=-75&&imageList.length>1&&!slideDirection) {
      setSlideDirection("left");
      setTimeout(() => {
        setCurrentIndex((prev) => (prev-1+imageList.length)%imageList.length);
        setSliderPosition(0);
        setSlideDirection("");
      },350);
    }
  };

  const handleResetSlider=() => {
    if (!slideDirection) {
      setSliderPosition(0);
    }
  };

  // Convert position -100..100 to percentage for handle placement (0 = 50%)
  const handleLeftPercentage=50+sliderPosition*0.45;

  return (
    <div className="stacked-photo-container">
      {/* Background Stacked Card Layers (Underneath) */}
      {[1,2,3,4].map((layerIndex) => {
        const picSrc=imageList[(currentIndex+layerIndex)%imageList.length]||fallbackImage;
        return (
          <div
            key={layerIndex}
            className={`stacked-card-bg stack-layer-${layerIndex}`}
          >
            <img src={picSrc} alt={`${title} layer ${layerIndex}`} />
          </div>
        );
      })}

      {/* Front Main Card (Animates dynamically left or right) */}
      <div
        className={`stacked-card-front ${slideDirection==="right"
          ? "sliding-out-right"
          :slideDirection==="left"
            ? "sliding-out-left"
            :""
          }`}
        style={{
          transform: `translateX(${sliderPosition*3.2}px) rotate(${sliderPosition*0.15}deg)`,
          opacity: 1-Math.abs(sliderPosition)*0.007,
        }}
      >
        <img src={frontPhoto} alt={title} />
      </div>

      {/* Interactive Drag Handle for Multi-Photo Stack */}
      {imageList.length>1&&(
        <>
          <div className="stack-slider-handle" style={{left: `calc(${handleLeftPercentage}% - 18px)`}}>
            ↔
          </div>
          <input
            type="range"
            min="-100"
            max="100"
            value={sliderPosition}
            onChange={handleSliderChange}
            onMouseUp={handleResetSlider}
            onTouchEnd={handleResetSlider}
            onClick={(e) => e.stopPropagation()}
            className="stack-range-input"
            aria-label="Slide photo stack left or right"
          />
        </>
      )}
    </div>
  );
}

export default function PortfolioGrid () {
  const categories=["All","Bridal","Party","Engagement","Reception","Traditional","HD Makeup"];
  const navigate=useNavigate();

  const [activeCategory,setActiveCategory]=useState("All");
  const [visibleCount,setVisibleCount]=useState(3);
  const [uploadedItems,setUploadedItems]=useState([]);

  useEffect(() => {
    const fetchImagesFromBackend=async () => {
      try {
        const response=await fetch(`${API_BASE_URL}/api/portfolio_images`);
        if (response.ok) {
          const data=await response.json();
          const formatted=data.map((item) => {
            const allPhotoUrls=item.images&&item.images.length>0
              ? item.images.map(img => img.image_url)
              :[item.image_url];
            return {
              ...item,
              id: item._id,
              image: allPhotoUrls[0],
              allPhotos: allPhotoUrls,
              isBeforeAfter: Boolean(item.isBeforeAfter),
            };
          });
          setUploadedItems(formatted);
          return;
        }
      } catch (e) {
        console.warn("Backend API /api/images not reachable for PortfolioGrid:",e);
      }
    };

    fetchImagesFromBackend();
  },[]);

  const portfolioItems=[
    {
      id: 1,
      title: "Royal Red Bridal Look",
      category: "Bridal",
      description: "Exquisite royal red bridal makeover with HD flawless base and bold lip accent.",
      image: bridalImg,
      allPhotos: [bridalImg]
    },
    {
      id: 2,
      title: "Cocktail Glam Look",
      category: "Party",
      description: "Chic shimmer eyes with soft nude lips designed for glamorous evening parties.",
      image: partyImg,
      allPhotos: [partyImg]
    },
    {
      id: 3,
      title: "Soft Pastel Engagement Look",
      category: "Engagement",
      description: "Subtle peach and pink pastel hues highlighting natural radiance for ring ceremony.",
      image: engagementImg,
      allPhotos: [engagementImg]
    },
    {
      id: 4,
      title: "Glitz & Gold Reception Look",
      category: "Reception",
      description: "Dazzling golden eye glow paired with sophisticated hair styling for reception night.",
      image: bridalImg,
      allPhotos: [bridalImg]
    },
    {
      id: 5,
      title: "Classic Traditional Makeover",
      category: "Traditional",
      description: "Timeless traditional makeover celebrating cultural elegance and graceful contours.",
      image: bridalImg,
      allPhotos: [bridalImg]
    },
    {
      id: 6,
      title: "Flawless HD Portfolio Shoot",
      category: "HD Makeup",
      description: "High-definition camera ready studio look created for high-resolution portfolio photography.",
      image: partyImg,
      allPhotos: [partyImg]
    }
  ];

  // Combine code-level items with uploaded items (uploaded show after)
  const combinedItems=[...uploadedItems,...portfolioItems];

  // Filter items by category
  const filteredItems=activeCategory==="All"
    ? combinedItems
    :combinedItems.filter(item => item.category===activeCategory);

  const handleLoadMore=() => {
    setVisibleCount(prev => prev+3);
  };

  const handleCategoryChange=(cat) => {
    setActiveCategory(cat);
    setVisibleCount(3); // Reset visible items on category swap
  };

  const handleCardClick=(item) => {
    navigate(`/portfolio/${item.id}`);
  };

  return (
    <section className="portfolio section" id="portfolio">
      <div className="container">
        <span className="section-subtitle">My Transformations</span>
        <h2 className="section-title">Client Portfolio</h2>

        {/* Categories Tab Filter */}
        <div className="portfolio-tabs">
          {categories?.map(cat => (
            <button
              key={cat}
              className={`portfolio-tab ${activeCategory===cat? "active":""}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="portfolio-grid">
          {filteredItems.slice(0,visibleCount).map(item => {
            const photoCount=item.allPhotos? item.allPhotos.length:1;
            return (
              <div
                className="portfolio-card clickable-portfolio-card"
                key={item.id}
                onClick={() => handleCardClick(item)}
              >
                {/* Render StackedPhotoSlider when isBeforeAfter is false */}
                {item.isBeforeAfter? (
                  <StackedPhotoSlider photos={item.allPhotos} fallbackImage={item.image} title={item.title} />
                ):(
                  <div className="standard-portfolio-img-wrapper" style={{position: "relative",width: "100%",height: "380px",overflow: "hidden",borderRadius: "18px"}}>
                    <img src={item.image} alt={item.title} style={{width: "100%",height: "100%",objectFit: "cover"}} />
                  </div>
                )}

                {photoCount>1&&(
                  <div className="multi-photo-badge">
                    <FaImages /> {photoCount} Photos
                  </div>
                )}

                <div className="portfolio-info">
                  <span className="portfolio-category">{item.category}</span>
                  <h3 className="portfolio-title">{item.title}</h3>
                  {item.description&&<p className="portfolio-description">{item.description}</p>}
                  <span className="view-gallery-hint">Click to view full gallery →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {visibleCount<filteredItems.length&&(
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
