import React, { useState } from "react";
import "../../public/css/DropdownFilter.scss";

const DropdownFilter = ({ onFilter }) => {
  const [selectedLayer, setSelectedLayer] = useState("");
  const [selectedLightRequirement, setSelectedLightRequirement] = useState("");
  const [selectedHardinessZone, setSelectedHardinessZone] = useState("");
  const [selectedWaterRequirement, setSelectedWaterRequirement] = useState("");
  const [selectedSoilType, setSelectedSoilType] = useState("");

  const handleFilter = () => {
    onFilter({
      layer: selectedLayer,
      lightRequirement: selectedLightRequirement,
      hardinessZone: selectedHardinessZone,
      waterRequirement: selectedWaterRequirement,
      soilType: selectedSoilType,
    });
  };

  return (
    <div className="dropdown-filter">
      <label>
        Layer:
        <select
          value={selectedLayer}
          onChange={(e) => setSelectedLayer(e.target.value)}
        >
          <option value="">All</option>
          <option value="Vines">Vines</option>
          <option value="Trees">Trees</option>
          <option value="Tall trees">Tall trees</option>
          <option value="Herbs">Herbs</option>
          <option value="Roots">Roots</option>
        </select>
      </label>
      <label>
        Light Requirement:
        <select
          value={selectedLightRequirement}
          onChange={(e) => setSelectedLightRequirement(e.target.value)}
        >
          <option value="">All</option>
          <option value="Full sun">Full sun</option>
          <option value="Partial sun/shade">Partial sun/shade</option>
          <option value="Full shade">Full shade</option>
        </select>
      </label>
      <label>
        USDA Hardiness Zone(Planting Zone):
        <select
          value={selectedHardinessZone}
          onChange={(e) => setSelectedHardinessZone(e.target.value)}
        >
          <option value="">All</option>
          <option value="2-11">2-11</option>
          <option value="3-9">3-9</option>
          <option value="4-8">4-8</option>
          <option value="5-9">5-9</option>
        </select>
      </label>
      <label>
        Water Requirement:
        <select
          value={selectedWaterRequirement}
          onChange={(e) => setSelectedWaterRequirement(e.target.value)}
        >
          <option value="">All</option>
          <option value="Moist">Moist</option>
          <option value="Dry">Dry</option>
        </select>
      </label>
      <label>
        Soil Type:
        <select
          value={selectedSoilType}
          onChange={(e) => setSelectedSoilType(e.target.value)}
        >
          <option value="">All</option>
          <option value="Light (sandy)">Light (sandy)</option>
          <option value="Medium">Medium</option>
          <option value="Heavy (clay)">Heavy (clay)</option>
        </select>
      </label>
      <button onClick={handleFilter}>Apply Filter</button>
    </div>
  );
};

export default DropdownFilter;
