import "../styles/BlogSection.css";

function BlogSection() {
  const posts = [
    {
      title: "How to choose the right saree fabric",
      date: "2026-01-15",
      excerpt:
        "A quick guide to picking silk, cotton, and blend sarees based on comfort and occasion.",
    },
    {
      title: "Kurti styling tips for everyday wear",
      date: "2026-02-05",
      excerpt:
        "Learn simple ways to pair kurtis with accessories and footwear for a polished look.",
    },
    {
      title: "Caring for blankets & bedding",
      date: "2026-03-12",
      excerpt:
        "Keep your bedding fresh with easy washing and storage tips.",
    },
  ];

  return (
    <section className="blog" id="blog">
      <div className="blog-inner">
        <h2>Blog</h2>
        <p className="blog-lead">
          Helpful articles on fabrics, styling, and caring for your favorite
          textiles.
        </p>

        <div className="blog-grid">
          {posts.map((p, idx) => (
            <article key={idx} className="blog-card">
              <div className="blog-date">{p.date}</div>
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
              <button className="blog-read" type="button">
                Read more
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;

