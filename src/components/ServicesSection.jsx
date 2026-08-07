import "../styles/ServicesSection.css";

function ServicesSection() {
  const services = [
    {
      title: "Fabric Advice",
      text: "Get recommendations for fabric type, comfort, and usage.",
    },
    {
      title: "Curated Collections",
      text: "Seasonal updates with trending sarees, kurtis, and home textiles.",
    },
    {
      title: "Gift & Occasion Picks",
      text: "Help choosing the right outfit or fabric for special days.",
    },
    {
      title: "Quality Assurance",
      text: "We focus on quality and provide guidance so you shop confidently.",
    },
  ];

  return (
    <section className="services" id="services">
      <div className="services-inner">
        <h2>Services</h2>
        <p className="services-lead">
          Everything you need for a smooth shopping experience—before and
          after you choose.
        </p>

        <div className="services-grid">
          {services.map((s, idx) => (
            <div key={idx} className="service-card">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;

