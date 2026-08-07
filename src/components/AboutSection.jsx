import "../styles/AboutSection.css";

function AboutSection() {
  return (
    <section className="about" id="about">
      <div className="about-inner">
        <h2>About Us</h2>
        <p className="about-lead">
          Saptakoshi Cloth Center has been trusted for over 25 years for
          quality fabrics, timeless designs, and helpful guidance.
        </p>

        <div className="about-grid">
          <div className="about-card">
            <h3>Quality First</h3>
            <p>
              We curate fabrics that feel premium and look great for every
              occasion.
            </p>
          </div>

          <div className="about-card">
            <h3>Curated Collections</h3>
            <p>
              From sarees to kurtis, our collection is updated with the latest
              trends.
            </p>
          </div>

          <div className="about-card">
            <h3>Trusted Guidance</h3>
            <p>
              Need help choosing? Our team is here to recommend the right fit
              and fabric.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

