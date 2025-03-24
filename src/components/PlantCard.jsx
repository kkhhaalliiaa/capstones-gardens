import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import DOMPurify from "dompurify";
import "../../public/css/PlantCard.scss";

const PlantCard = ({ plant }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleFavorite = () => {
    const favoritedPlants =
      JSON.parse(localStorage.getItem("favoritedPlants")) || [];
    if (isFavorite) {
      const updatedFavorites = favoritedPlants.filter((p) => p.id !== plant.id);
      localStorage.setItem("favoritedPlants", JSON.stringify(updatedFavorites));
    } else {
      favoritedPlants.push(plant);
      localStorage.setItem("favoritedPlants", JSON.stringify(favoritedPlants));
    }
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    const favoritedPlants =
      JSON.parse(localStorage.getItem("favoritedPlants")) || [];
    setIsFavorite(favoritedPlants.some((p) => p.id === plant.id));
  }, [plant.id]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <>
      <div className="plant-card" onClick={openModal}>
        {plant.images && plant.images.thumb && (
          <img
            src={DOMPurify.sanitize(plant.images.thumb)} // Sanitize image URL
            alt={DOMPurify.sanitize(plant.name)} // Sanitize alt text
            className="plant-image"
          />
        )}
        <div className="plant-name">{DOMPurify.sanitize(plant.name)}</div>{" "}
        {/* Sanitize plant name */}
      </div>

      {isModalOpen && (
        <div
          className={`modal-overlay ${isModalOpen ? "active" : ""}`}
          onClick={handleOverlayClick} // Close modal when clicking outside
        >
          <div className="modal-content">
            <span className="close-modal" onClick={closeModal}>
              &times;
            </span>
            <h2>{plant.name}</h2>
            <span className="favorite-icon" onClick={toggleFavorite}>
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </span>
            <p>
              <strong>Scientific Name:</strong> {plant.scientific_name}
            </p>
            {plant.description && (
              <p>
                <strong>Description:</strong> {plant.description}
              </p>
            )}
            <p>
              <strong>Type:</strong> {plant.type}
            </p>
            {plant.data && plant.data.length > 0 && (
              <div>
                <h3>Additional Information</h3>
                {plant.data.map((item, index) => (
                  <p key={index}>
                    <strong>{item.key}:</strong>{" "}
                    {item.key === "Wikipedia" ||
                    item.key === "Plants For A Future" ? (
                      <a
                        href={item.value}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PlantCard;
