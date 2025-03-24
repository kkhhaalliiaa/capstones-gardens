import React from "react";
import "../../public/css/Home.css";
import ContactForm from "./Form";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Grow Your Own, Save Our Planet</h1>
          <p>
            Join Community Gardens to learn how growing your own fruits and
            vegetables can
            <br />
            combat climate change and build food security in uncertain times.
          </p>
          <a href="/plants" className="btn">
            Get Started Today
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Grow Your Own?</h2>
        <div className="feature-cards">
          <div className="home-card">
            <div className="homecard-image">
              <img
                src="../../images/homegardens.jpeg"
                alt="Climate Impact"
              />
            </div>
            <div className="homecard-content">
              <h3>Combat Climate Change</h3>
              <p>
                Home gardens reduce food miles, carbon emissions, and packaging
                waste while creating green spaces that absorb CO2 and cool urban
                heat islands.
              </p>
              <a href="https://blkgrn.com/blogs/articles/how-home-gardens-are-helping-homeowners-combat-climate-change?srsltid=AfmBOoqzgkT6hm9MZXBygVUuq58a6y3nNyfb4Ohpoe7hPPSE0_ATeeqP">
                Read More
              </a>
            </div>
          </div>

          <div className="home-card">
            <div className="homecard-image">
              <img src="../../images/farmers.jpeg" alt="Food Security" />
            </div>
            <div className="homecard-content">
              <h3>Build Food Resilience</h3>
              <p>
                With rising tariffs and supply chain disruptions, growing your
                own food ensures access to fresh, nutritious produce regardless
                of market fluctuations.
              </p>
              <a href="https://www.localline.co/blog/tariffs-on-groceries-and-restaurants">
                Read More
              </a>
            </div>
          </div>

          <div className="home-card">
            <div className="homecard-image">
              <img src="../../images/community.jpeg" alt="Community" />
            </div>
            <div className="homecard-content">
              <h3>Strengthen Communities</h3>
              <p>
                Garden-sharing, seed swaps, and knowledge exchange build
                stronger, more resilient neighborhoods ready to face
                environmental challenges together.
              </p>
              <a href="https://www.ncagr.gov/divisions/marketing/farmers-markets-agricultural-centers/charlotte-regional-farmers-market">
                Read More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2 className="section-title">Our Mission</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Community Gardens is dedicated to empowering individuals and
              communities to take climate action through home gardening. In a
              world of unpredictable weather patterns and rising food costs, we
              believe that local food production is no longer just a hobby—it's
              a necessity.
            </p>
            <p>
              Our nonprofit provides free educational resources, hands-on
              workshops, and community support to help people of all ages and
              backgrounds grow their own fruits and vegetables, even in small
              spaces.
            </p>
            <p>
              Through partnerships with local schools, community centers, and
              climate organizations, we're building a movement of citizen
              gardeners committed to food sovereignty and climate resilience.
            </p>
          </div>
          <div className="about-image">
            <img src="../../images/mission.jpeg" alt="Community" />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Get Your Hands Dirty?</h2>
          <p>
            Join our next workshop to learn practical skills for starting your
            own garden, no matter how small your space.
            <br />
            From window sills to backyards, everyone can grow something!
          </p>
          <a href="/signup" className="btn">
            Join the community
          </a>
        </div>
      </section>

      <div className="section-divider-container">
        <span className="divider-text">Grow With Us</span>
      </div>

      {/* Contact Form Section */}
      <ContactForm />
    </div>
  );
};

export default Home;
