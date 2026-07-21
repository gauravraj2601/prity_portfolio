import aboutImg from "../../assets/images/about_prity.png";
import "./AboutMe.css";

export default function AboutMe () {
  return (
    <section className="about section" id="meet-prity">
      <div className="container about-container">
        {/* Left: Picture Frame */}
        <div className="about-image-wrapper">
          <div className="about-image-border">
            <img src={aboutImg} alt="Prity Sah - Professional Makeup Artist" className="about-image" />
          </div>
        </div>

        {/* Right: Bio Content */}
        <div className="about-content">
          <span className="section-subtitle">Hello & Welcome</span>
          <h2 className="section-title about-title">Hi, I'm Prity Sah</h2>

          <div className="about-text">
            <p className="highlight-para">
              Recently certified as a Professional Makeup Artist, I'm passionate about helping every client look and feel their absolute best.
            </p>
            <p>
              From elegant bridal looks to glamorous party makeup, I focus on enhancing your natural beauty using premium products and techniques learned through professional training.
            </p>
            <p>
              Every face is unique, and every makeover is personalized with care, creativity, and attention to detail.
            </p>
          </div>

          <div className="about-badges">
            <div className="about-badge">
              <span className="badge-number">100%</span>
              <span className="badge-label">Personalized Care</span>
            </div>
            <div className="about-badge">
              <span className="badge-number">Premium</span>
              <span className="badge-label">Quality Products</span>
            </div>
            <div className="about-badge">
              <span className="badge-number">Certified</span>
              <span className="badge-label">Professional training</span>
            </div>
          </div>

          <a href="#contact-us" className="about-cta">Let's Connect</a>
        </div>
      </div>
    </section>
  );
}
