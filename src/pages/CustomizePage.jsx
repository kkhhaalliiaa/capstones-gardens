import React, { useState } from "react";
import axios from "axios";
import "../../public/css/Customize.scss";

const CustomizePage = () => {
  const [plant, setPlant] = useState("");
  const [zone, setZone] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await axios.post("http://localhost:3002/api/customize", {
        plant,
        zone,
      });

      const cleanedResponse = res.data.response
        .replace(/```json|```/g, "")
        .trim();

      setResponse(JSON.parse(cleanedResponse));
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse({
        error: "Failed to generate instructions. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customize-page">
      <div className="customize-container">
        <h1>Customize Your Gardening Plan</h1>
        <form onSubmit={handleSubmit} className="customize-form">
          <label htmlFor="plant">
            Plant Name:
            <input
              type="text"
              id="plant"
              value={plant}
              onChange={(e) => setPlant(e.target.value)}
              placeholder="Enter the plant you want to grow"
              required
            />
          </label>
          <label htmlFor="zone">
            USDA Hardiness Zone(Planting Zone):
            <input
              type="text"
              id="zone"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              placeholder="Enter your USDA hardiness zone"
              required
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Get Instructions"}
          </button>
        </form>
        {response && (
          <div className="customize-response">
            <h2>Instructions & Recommendations</h2>
            {response.error ? (
              <p>{response.error}</p>
            ) : (
              <>
                <div className="instruction-box">
                  <h3>Soil Preparation</h3>
                  <ul>
                    {response.soilPreparation.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
                <div className="instruction-box">
                  <h3>Watering Schedule</h3>
                  <ul>
                    {response.wateringSchedule.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
                <div className="instruction-box">
                  <h3>Sunlight Requirements</h3>
                  <ul>
                    {response.sunlightRequirements.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
                <div className="instruction-box">
                  <h3>Planting Instructions</h3>
                  <ul>
                    {response.plantingInstructions.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
                <div className="instruction-box">
                  <h3>Maintenance Tips</h3>
                  <ul>
                    {response.maintenanceTips.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
                <div className="instruction-box">
                  <h3>Companion Plants</h3>
                  <ul>
                    {response.companionPlants.map((plant, index) => (
                      <li key={index}>{plant}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizePage;
