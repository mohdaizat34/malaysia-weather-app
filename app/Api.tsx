import React, { useState, useEffect } from "react";
import axios from "axios";
import InputSelector from "./InputSelector";
import WeatherResult from "./WeatherResult";

const Api: React.FC = () => {
  const [locationType, setLocationType] = useState<string>("St");
  const [locations, setLocations] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `https://api.data.gov.my/weather/forecast?contains=${locationType}@location__location_id`
        );
        setLocations(response.data || []);
      } catch (err) {
        setError("Failed to fetch locations.");
      }
    };
    fetchLocations();
  }, [locationType]);

  const fetchForecast = async () => {
    if (!selectedLocation) {
      setError("Please select a location.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const query = `${selectedLocation}@location__location_id`;
      const response = await axios.get(
        `https://api.data.gov.my/weather/forecast?contains=${query}`
      );
      setForecast(response.data || []);
    } catch (err) {
      setError("Unable to fetch forecast data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <InputSelector
        locationType={locationType}
        selectedLocation={selectedLocation}
        locations={locations}
        onLocationTypeChange={(e) => setLocationType(e.target.value)}
        onLocationChange={(e) => setSelectedLocation(e.target.value)}
        onSubmit={(e) => {
          e.preventDefault();
          fetchForecast();
        }}
      />
      <WeatherResult forecast={forecast} loading={loading} error={error} />
    </div>
  );
};

export default Api;
