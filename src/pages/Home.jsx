import HeroSlider from "../components/HeroSlider/HeroSlider";
import AboutMe from "../components/AboutMe/AboutMe";
import Services from "../components/Services/Services";
import WhyChooseMe from "../components/WhyChooseMe/WhyChooseMe";
import PortfolioGrid from "../components/PortfolioGrid/PortfolioGrid";
import ProcessTimeline from "../components/ProcessTimeline/ProcessTimeline";
import Testimonials from "../components/Testimonials/Testimonials";
import InstagramFeed from "../components/InstagramFeed/InstagramFeed";
import ContactFooter from "../components/ContactFooter/ContactFooter";
import "./Home.css";

export default function Home () {
  return (
    <div className="home">
      {/* 1. Hero Banner */}
      <HeroSlider />

      {/* 2. About Me */}
      <AboutMe />

      {/* 3. Services (Cards) */}
      <Services />

      {/* 4. Why Choose Me */}
      <WhyChooseMe />

      {/* 5. Portfolio Grid (Before/After comparison) */}
      <PortfolioGrid />

      {/* 6. Process Timeline (4-step work flow) */}
      <ProcessTimeline />

      {/* 7. Client Reviews / Testimonials */}
      <Testimonials />

      {/* 8. Instagram Journey Feed */}
      <InstagramFeed />

      {/* 9. Contact Section & Map + Footer */}
      <ContactFooter />
    </div>
  );
}