import React from "react";
import "./Services.css";

export default function Services () {
  const serviceList=[
    {
      icon: "💍",
      title: "Bridal Makeup",
      desc: "Traditional & modern bridal looks customized for your special day."
    },
    {
      icon: "👰",
      title: "Engagement Makeup",
      desc: "Soft glam or luxury glam according to your outfit."
    },
    {
      icon: "🎉",
      title: "Party Makeup",
      desc: "Perfect for birthdays, receptions, family events and celebrations."
    },
    {
      icon: "📸",
      title: "Photoshoot Makeup",
      desc: "Camera-ready makeup for professional photoshoots."
    },
    {
      icon: "💄",
      title: "HD Makeup",
      desc: "Flawless finish using professional HD products."
    },
    {
      icon: "✨",
      title: "Hairstyling",
      desc: "Elegant hairstyles to complete your look."
    }
  ];

  return (
    <section className="services section" id="what-we-offer">
      <div className="container">
        <span className="section-subtitle">What I Offer</span>
        <h2 className="section-title">My Makeup Services</h2>

        <div className="services-grid">
          {serviceList.map((service,index) => (
            <div className="service-card" key={service.title}>
              <div className="service-icon-wrapper">
                <span className="service-icon">{service.icon}</span>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>

              <a
                href={`https://wa.me/+919304424087?text=Hello%20Prity,%20I'm%20interested%20in%20inquiring%20about%20your%20${encodeURIComponent(service.title)}%20service.`}
                target="_blank"
                rel="noopener noreferrer"
                className="service-link"
              >
                Inquire Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
