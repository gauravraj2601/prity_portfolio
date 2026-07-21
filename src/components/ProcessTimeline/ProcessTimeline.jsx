import React from "react";
import "./ProcessTimeline.css";

export default function ProcessTimeline() {
  const steps = [
    {
      num: "01",
      title: "Contact Me",
      desc: "Book through WhatsApp or a simple phone call."
    },
    {
      num: "02",
      title: "Consultation",
      desc: "Discuss your outfit, skin type, themes, and desired custom look."
    },
    {
      num: "03",
      title: "Makeup Session",
      desc: "Relax as I deliver a professional makeover using premium products."
    },
    {
      num: "04",
      title: "Shine with Confidence ✨",
      desc: "Look and feel your absolute best on your special day."
    }
  ];

  return (
    <section className="timeline-section section" id="how-i-work">
      <div className="container">
        <span className="section-subtitle">The Experience</span>
        <h2 className="section-title">How I Work</h2>

        <div className="timeline-flow">
          {steps.map((step, index) => (
            <div className="timeline-card" key={step.title}>
              <div className="timeline-number-wrapper">
                <span className="timeline-number">{step.num}</span>
              </div>
              <h3 className="timeline-card-title">{step.title}</h3>
              <p className="timeline-card-desc">{step.desc}</p>
              
              {index < steps.length - 1 && (
                <div className="timeline-arrow">➔</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
