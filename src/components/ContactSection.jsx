import "../styles/ContactSection.css";

function ContactSection() {
  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <h2>Contact Us</h2>
        <p className="contact-subtitle">
          Have a question or want help choosing the right fabric? Reach out
          anytime.
        </p>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <label className="field">
            <span>Name</span>
            <input type="text" placeholder="Your name" required />
          </label>

          <label className="field">
            <span>Email</span>
            <input type="email" placeholder="you@example.com" required />
          </label>

          <label className="field">
            <span>Message</span>
            <textarea placeholder="Write your message" rows={5} required />
          </label>

          <button className="contact-btn" type="submit">
            Send Message
          </button>
        </form>

        <div className="contact-info">
          <div className="contact-pill">📞 +977 9812345678</div>
          <div className="contact-pill">✉️ support@saptakoshi.com</div>
          <div className="contact-pill">📍 Biratnagar, Nepal</div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;

