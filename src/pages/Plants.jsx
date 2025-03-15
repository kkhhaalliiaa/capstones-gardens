import "../../public/css/PlantsPage.scss";
import React, { useState } from "react";
import PlantList from "../components/PlantList.jsx";
import Search from "../components/Search.jsx";
import DropdownFilter from "../components/DropdownFilter.jsx";

export default function Plants() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  const handleFilter = (filterCriteria) => {
    setFilters(filterCriteria);
  };

  return (
    <div className="plants">
      <h1>Plants</h1>
      <Search onSearch={handleSearch} />
      <DropdownFilter onFilter={handleFilter} />
      <PlantList query={query} filters={filters} />
    </div>
  );
}
