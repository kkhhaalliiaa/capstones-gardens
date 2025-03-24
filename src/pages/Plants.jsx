import "../../public/css/PlantsPage.scss";
import React, { useState } from "react";
import PlantList from "../components/PlantList.jsx";
import Search from "../components/Search.jsx";
import DropdownFilter from "../components/DropdownFilter.jsx";

export default function Plants() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);

    // Save the search query to localStorage
    const savedSearches =
      JSON.parse(localStorage.getItem("savedSearches")) || [];
    savedSearches.push(searchQuery); // Add the new search query
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches)); // Save to localStorage
  };

  const handleFilter = (filterCriteria) => {
    setFilters(filterCriteria);
  };

  const openHelpModal = () => {
    setIsHelpModalOpen(true);
  };

  const closeHelpModal = () => {
    setIsHelpModalOpen(false);
  };

  const closeHelpModalOnOverlayClick = (e) => {
    if (e.target.classList.contains("help-modal-overlay")) {
      closeHelpModal();
    }
  };

  return (
    <div className="plants">
      <h1>Discover Our Plant Collection</h1>
      <div className="search-and-help">
        <Search onSearch={handleSearch} />
        <button className="help-button" onClick={openHelpModal}>
          Help
        </button>
      </div>
      <DropdownFilter onFilter={handleFilter} />
      <PlantList query={query} filters={filters} />

      {isHelpModalOpen && (
        <div
          className="help-modal-overlay"
          onClick={closeHelpModalOnOverlayClick}
        >
          <div className="help-modal">
            <span className="close-modal" onClick={closeHelpModal}>
              &times;
            </span>
            <h2>How to Use This Page</h2>
            <p>
              Welcome to the Plants page! Here are some tips to help you
              navigate:
            </p>
            <ul>
              <li>
                Use the search bar at the top to find specific plants by name.
              </li>
              <li>
                Use the dropdown filters to narrow down plants based on type,
                light requirements, USDA hardiness zone, water needs, and soil
                type.
              </li>
              <li>
                Click on a plant card to view more details about the plant.
              </li>
            </ul>
            <p>
              We also have an AI tool in the bottom-right corner of the page to
              assist you with any further questions.
            </p>
            <p>
              For specific inquiries, please visit our contact form on the
              homepage.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
