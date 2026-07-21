import React from "react";
import "./WhyChooseMe.css";

export default function WhyChooseMe() {
  const points = [
    {
      title: "Certified Professional",
      desc: "Professionally certified makeup artist trained in modern and classic beauty standards."
    },
    {
      title: "Personalized Looks",
      desc: "Every makeover is customized specifically for your features, skin type, and outfit."
    },
    {
      title: "Premium Products Only",
      desc: "We use only premium, high-quality international brands to ensure flawless, long-lasting wear."
    },
    {
      title: "Hygienic & Sanitized Tools",
      desc: "Strict hygiene protocols with thoroughly deep-cleaned and sanitized brushes and kits."
    },
    {
      title: "Affordable Packages",
      desc: "High-end luxury makeup finishes priced reasonably to fit your occasion budgets."
    },
    {
      title: "Home Service Available",
      desc: "Convenient travel options to deliver premium makeup services at your venue or comfort of home."
    },
    {
      title: "Friendly Experience",
      desc: "A warm, comfortable environment where we listen carefully to your styling requests."
    }
  ];

  return (
    <section className="why section" id="why-choose-me">
      <div className="container why-container">
        {/* Left Column: Heading and Intro */}
        <div className="why-info">
          <span className="section-subtitle">Why Choose Me</span>
          <h2 className="section-title why-title">Providing a Premium & Safe Makeover Experience</h2>
          <p className="why-desc">
            As a certified artist, I prioritize visual excellence, client comfort, and safety above all else. Here is how I promise to elevate your special day.
          </p>
          <div className="why-cta-wrapper">
            <a href="#contact-us" className="why-cta">Book Your Session</a>
          </div>
        </div>

        {/* Right Column: Key List Grid */}
        <div className="why-grid">
          {points.map((point, index) => (
            <div className="why-item" key={point.title}>
              <div className="why-check-circle">✔</div>
              <div className="why-item-content">
                <h3 className="why-item-title">{point.title}</h3>
                <p className="why-item-desc">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
