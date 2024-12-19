import React from "react";

interface InputSelectorProps {
  locationType: string;
  selectedLocation: string;
  locations: { location_id: string; location_name: string }[];
  onLocationTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onLocationChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const InputSelector: React.FC<InputSelectorProps> = ({
  locationType,
  selectedLocation,
  locations,
  onLocationTypeChange,
  onLocationChange,
  onSubmit,
}) => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Malaysian Weather App</h1>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="location-type">Filter by Location Type: </label>
        <select
          id="location-type"
          value={locationType}
          onChange={onLocationTypeChange}
          style={{ padding: "8px", marginRight: "10px" }}
        >
          <option value="St">State</option>
          <option value="Rc">Recreation Centre</option>
          <option value="Ds">District</option>
          <option value="Tn">Town</option>
          <option value="Dv">Division</option>
        </select>
      </div>

      <form onSubmit={onSubmit}>
        <select
          value={selectedLocation}
          onChange={onLocationChange}
          style={{ padding: "8px", marginRight: "10px" }}
        >
          <option value="">Select a location</option>
          {locations.map((forecast, index) => (
            <option
              key={`${forecast.location_id}-${index}`}
              value={forecast.location_id}
            >
              {forecast.location_name}
            </option>
          ))}
        </select>

        <button type="submit" style={{ padding: "8px" }}>
          Get Forecast
        </button>
      </form>
    </div>
  );
};

export default InputSelector;
