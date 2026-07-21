import React,{useState,useEffect,useRef} from "react";
import {FaWhatsapp} from "react-icons/fa";
import "./HeroSlider.css";

export default function HeroSlider () {
  const images=[
    "https://tanyaaroramakeovers.com/wp-content/uploads/2026/02/2-scaled-e1771396982311.jpg",
    "https://tanyaaroramakeovers.com/wp-content/uploads/2026/02/website-20-scaled-e1771400314936.jpg"
  ];

  const [currentIndex,setCurrentIndex]=useState(0);
  const fullTitle="Every Face Has a Story. Let's Make Yours Beautiful.";
  const [displayedTitle,setDisplayedTitle]=useState("");
  const [isTyping,setIsTyping]=useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer=setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex+1)%images.length);
    },6000); // Change image every 6 seconds

    return () => clearInterval(timer);
  },[images.length]);

  useEffect(() => {
    let interval;
    let index = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset and start typewriter when entering viewport
          clearInterval(interval);
          index = 0;
          setDisplayedTitle("");
          setIsTyping(true);

          interval = setInterval(() => {
            setDisplayedTitle(fullTitle.slice(0, index + 1));
            index++;
            if (index >= fullTitle.length) {
              clearInterval(interval);
              setIsTyping(false);
            }
          }, 70);
        } else {
          // Reset state when leaving viewport so it's fresh for next time
          clearInterval(interval);
          setDisplayedTitle("");
          setIsTyping(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="hero-slider" ref={heroRef}>
      {/* Background Slides */}
      {images.map((imgUrl,index) => (
        <div
          key={imgUrl}
          className={`slider-slide ${index===currentIndex? "active":""}`}
          style={{
            backgroundImage: `url(${imgUrl})`,
            animationDuration: "20000ms"
          }}
        />
      ))}

      {/* Dark Overlay */}
      <div className="slider-overlay" />

      {/* Content Container */}
      <div className="slider-content">
        <span className="slider-badge">Hi, I'm Prity Sah</span>
        <h1 className="slider-title">
          {displayedTitle}
          {isTyping&&<span className="typewriter-cursor">|</span>}
        </h1>
        <p className="slider-subtitle">
          Whether it's your wedding, engagement, reception, or a special celebration, I'm here to create a look that brings out your natural beauty.
        </p>

        {/* Navigation Buttons */}
        <div className="slider-actions">
          <a href="#contact-us" className="hero-btn btn-primary">Book Appointment</a>
          <a href="#portfolio" className="hero-btn btn-secondary">View Portfolio</a>
          <a href="#meet-prity" className="hero-btn btn-outline">About Me</a>
        </div>
      </div>

      {/* Floating WhatsApp Widget */}
      <div className="whatsapp-widget">
        <a
          href="https://wa.me/+919304424087?text=Hello,%20I'd%20like%20to%20inquire%20about%20makeup%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-container"
        >
          <div className="whatsapp-text">
            Let's Create <strong>Your Look</strong>
          </div>
          <div className="whatsapp-icon-btn">
            <FaWhatsapp className="wa-icon" />
          </div>
        </a>
      </div>
    </div>
  );
}
