import React, { useEffect, useState } from "react";
import PlantCard from "./PlantCard";

const PlantList = ({ query, filters }) => {
  const [data, setData] = useState({ plants: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3002/api/listPlants?q=${query}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setData(data || { plants: [] });
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching plant data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [query]);

  const filteredPlants = data.plants.filter((plant) => {
    return (
      (!filters.type || plant.type.includes(filters.type)) &&
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

  if (loading) return <div>Loading plants...</div>;
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
