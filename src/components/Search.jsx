import React, { useState } from "react";
import "../../public/css/Search.scss";

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search for plants..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
