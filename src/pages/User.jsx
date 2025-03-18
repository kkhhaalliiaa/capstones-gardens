import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../public/css/User.scss";

const User = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login"); // Redirect to login if no user is found
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login after logout
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <section className="user">
        <div className="user-profile-pic">👤</div>
        <div className="user-info">
          <h2>{user.first_name} {user.last_name}</h2>
          <p>Username: {user.username}</p>
          <p>Email: user@example.com</p>
          <p>Phone: 123-456-7890</p>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </section>
      <div className="user-favorites">
        <div className="favorite"></div>
        <div className="favorite"></div>
        <div className="favorite"></div>
      </div>
    </>
  );
};

export default User;
