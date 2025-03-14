import "../../public/css/plants.scss";
import React, { useState } from "react";
import PlantList from "../components/PlantList.jsx";
import Search from "../components/Search.jsx";

export default function Plants() {
  const [query, setQuery] = useState("");

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  return (
    <div className="plants">
      <h1>Plants</h1>
      <Search onSearch={handleSearch} />
      <PlantList query={query} />
    </div>
  );
}
