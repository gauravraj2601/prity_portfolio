import React from "react";
import "./Testimonials.css";

export default function Testimonials() {
  const reviews = [
    {
      name: "Riya Sharma",
      role: "Engagement Bride",
      stars: 5,
      text: "Loved my engagement makeup. Natural yet elegant. Prity did a wonderful job matching the soft glam with my pastel lehenga."
    },
    {
      name: "Sneha Patel",
      role: "Party Makeover",
      stars: 5,
      text: "Very patient and understood exactly the look I wanted. She kept it fresh, clean, and customized to my facial details."
    },
    {
      name: "Anjali Deshmukh",
      role: "Bridal Client",
      stars: 5,
      text: "The bridal makeover was absolutely stunning. The HD products gave a flawless finish that lasted all night. Highly recommend Prity!"
    },
    {
      name: "Pooja Verma",
      role: "Festival Glam",
      stars: 5,
      text: "Her hairstyling and makeup was flawless. Everyone praised the look. Very professional and uses high-quality sanitised tools."
    }
  ];

  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <span className="section-subtitle">Real Experiences</span>
        <h2 className="section-title">My First Happy Clients</h2>

        <div className="testimonials-grid">
          {reviews.map((rev, index) => (
            <div className="testimonial-card" key={rev.name}>
              <div className="star-rating">
                {Array.from({ length: rev.stars }).map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
              <p className="testimonial-text">"{rev.text}"</p>
              <div className="testimonial-author">
                <h4 className="author-name">{rev.name}</h4>
                <span className="author-role">{rev.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
