import React, { useEffect, useState } from "react";
import PlantCard from "./PlantCard";
import Lottie from "lottie-react";
import animationData from "../../public/Animation - 1742346932775.json"; // Import Lottie JSON file
import "./PlantList.css"; // Import CSS file for styling

const PlantList = ({ query, filters }) => {
  const [data, setData] = useState({ plants: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(
      `"https://ismael-capstones-gardens.vercel.app"-1h6s.onrender.com/api/listPlants?q=${query}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setData(data || { plants: [] });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching plant data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [query]);

  const filteredPlants = data.plants.filter((plant) => {
    return (
      (!filters.layer ||
        plant.data.some(
          (item) => item.key === "Layer" && item.value.includes(filters.layer)
        )) &&
      (!filters.lightRequirement ||
        plant.data.some(
          (item) =>
            item.key === "Light requirement" &&
            item.value.includes(filters.lightRequirement)
        )) &&
      (!filters.hardinessZone ||
        plant.data.some(
          (item) =>
            item.key === "USDA Hardiness zone" &&
            item.value.includes(filters.hardinessZone)
        )) &&
      (!filters.waterRequirement ||
        plant.data.some(
          (item) =>
            item.key === "Water requirement" &&
            item.value.includes(filters.waterRequirement)
        )) &&
      (!filters.soilType ||
        plant.data.some(
          (item) =>
            item.key === "Soil type" && item.value.includes(filters.soilType)
        ))
    );
  });

  if (loading)
    return (
      <div className="loading-container">
        <Lottie
          animationData={animationData}
          style={{ height: 200, width: 200 }}
        />
      </div>
    );
  if (error) return <div>Error loading plants: {error}</div>;

  return (
    <div className="plants-container">
      {filteredPlants && filteredPlants.length > 0 ? (
        filteredPlants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))
      ) : (
        <p>No plants found.</p>
      )}
    </div>
  );
};

export default PlantList;
