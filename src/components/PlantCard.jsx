import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
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
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <div className="plant-card" onClick={openModal}>
        {plant.images && plant.images.thumb && (
          <img
            src={plant.images.thumb}
            alt={plant.name}
            className="plant-image"
          />
        )}
        <div className="plant-name">{plant.name}</div>
      </div>

      {isModalOpen && (
        <div className={`modal-overlay ${isModalOpen ? "active" : ""}`}>
          <div className="modal-content">
            <span className="close-modal" onClick={closeModal}>
              &times;
            </span>
            <h2>{plant.name}</h2>
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
            <span className="favorite-icon" onClick={toggleFavorite}>
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default PlantCard;
