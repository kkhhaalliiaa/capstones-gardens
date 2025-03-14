import React from "react";
import "../../public/css/User.scss";

const User = () => {
  return (
    <>
      <section className="user">
        <div className="user-profile-pic">hello</div>
        <div className="user-info">
          <h2>User Name</h2>
          <p>Email: user@example.com</p>
          <p>Phone: 123-456-7890</p>
          <button className="logout-btn">Logout</button>
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
