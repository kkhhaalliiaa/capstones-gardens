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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(searchQuery); // Trigger search on Enter key press
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress} 
        placeholder="Search for plants..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
