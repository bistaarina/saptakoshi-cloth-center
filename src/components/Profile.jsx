import "../styles/Profile.css";

function Profile() {
  return (
    <section className="profile">
      <div className="profile-card">

        <img
          src="https://i.pravatar.cc/150"
          alt="Profile"
        />

        <h2>Welcome!</h2>

        <p>Email: example@gmail.com</p>

        <p>Orders: 0</p>

        <p>Wishlist Items: 0</p>

      </div>
    </section>
  );
}

export default Profile;