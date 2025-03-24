import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react"; // Import Trash2 icon for the delete button
import "../../public/css/User.scss";
import PlantCard from "../components/PlantCard"; // Import PlantCard component

const User = () => {
  const [user, setUser] = useState(null);
  const [savedSearches, setSavedSearches] = useState([]);
  const [favoritedPlants, setFavoritedPlants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login"); // Redirect to login if no user is found
    }

    // Retrieve saved searches from localStorage
    const searches = JSON.parse(localStorage.getItem("savedSearches")) || [];
    setSavedSearches(searches);

    // Retrieve favorited plants from localStorage
    const favorites = JSON.parse(localStorage.getItem("favoritedPlants")) || [];
    setFavoritedPlants(favorites);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true }); // Redirect to login after logout
  };

  // Function to delete a saved search
  const handleDeleteSearch = (index) => {
    const updatedSearches = savedSearches.filter((_, i) => i !== index); // Remove the search at the specified index
    setSavedSearches(updatedSearches); // Update the state
    localStorage.setItem("savedSearches", JSON.stringify(updatedSearches)); // Update localStorage
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-container">
      <section className="user">
        <div className="user-profile-pic">👤</div>
        <div className="user-info">
          <h2>
            {user.first_name} {user.last_name}
          </h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>{" "}
          {/* Display the email from the user object */}
          <p>Phone: 123-456-7890</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>

      <section className="saved-searches">
        <h3>Saved Searches</h3>
        {savedSearches.length > 0 ? (
          <ul className="searches-list">
            {savedSearches.map((search, index) => (
              <li key={index} className="search-item">
                {search}
                <button
                  className="delete-search-btn"
                  onClick={() => handleDeleteSearch(index)} // Pass the index to delete
                >
                  <Trash2 size={16} /> {/* Delete icon */}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-searches">No saved searches found.</p>
        )}
      </section>

      <section className="favorited-plants">
        <h3>Favorited Plants</h3>
        {favoritedPlants.length > 0 ? (
          <div className="plants-grid">
            {favoritedPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        ) : (
          <p className="no-favorites">No favorited plants found.</p>
        )}
      </section>
    </div>
  );
};

export default User;
