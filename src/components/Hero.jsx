import "../styles/Hero.css";
import heroImage from "../assets/images/hero.png";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-left">
        <span className="tag">NEW COLLECTION 2026</span>

        <h1>
          Style That <br />
          Speaks for You
        </h1>


        <p>
          Discover premium clothing, sarees, kurtis, shirts,
          blankets and home essentials from
          Saptakoshi Cloth Center.
        </p>

        <div className="hero-buttons">
          <button className="shop-btn">Shop Now</button>

          <button className="collection-btn">View Collection</button>
        </div>
      </div>


      <div className="hero-right">
        <img src={heroImage} alt="Hero" />
      </div>

    </section>
  );
}

export default Hero;