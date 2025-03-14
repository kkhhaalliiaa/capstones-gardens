import React, { useEffect, useState } from "react";
import PlantCard from "./PlantCard";

const PlantList = ({ query }) => {
  const [data, setData] = useState({ plants: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/api/listPlants?q=${query}`)
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

  if (loading) return <div>Loading plants...</div>;
  if (error) return <div>Error loading plants: {error}</div>;

  return (
    <div className="plants-container">
      {data.plants && data.plants.length > 0 ? (
        data.plants.map((plant) => <PlantCard key={plant.id} plant={plant} />)
      ) : (
        <p>No plants found.</p>
      )}
    </div>
  );
};

export default PlantList;
