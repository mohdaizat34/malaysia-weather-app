"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { AppleCardsCarouselDemo } from "./CarouselCard";

interface Location {
  location_id: string;
  location_name: string;
}

interface ForecastData {
  location: Location;
  date: string;
  morning_forecast: string;
  afternoon_forecast: string;
  night_forecast: string;
  summary_forecast: string;
  summary_when: string;
  min_temp: number;
  max_temp: number;
}

export default function Home() {
  const [locationType, setLocationType] = useState<string>("St");
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch locations based on selected location type
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        console.log("Fetching locations with type:", locationType);
        const response = await axios.get(
          `https://api.data.gov.my/weather/forecast?contains=${locationType}@location__location_id`
        );
        const fetchedLocations = Array.isArray(response.data)
          ? response.data
          : [];

        const uniqueLocations = Array.from(
          new Map(
            fetchedLocations.map((forecast: ForecastData) => [
              forecast.location.location_id,
              forecast.location,
            ])
          ).values()
        );

        setLocations(uniqueLocations);
      } catch (err) {
        console.error("Error fetching locations:", err);
        setError("Failed to fetch locations.");
      }
    };

    fetchLocations();
  }, [locationType]);

  // Fetch forecast data for selected location
  const fetchForecast = async () => {
    if (!selectedLocation) {
      setError("Please select a location.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("Fetching forecast for location:", selectedLocation);
      const query = `${selectedLocation}@location__location_id`;

      const response = await axios.get(
        `https://api.data.gov.my/weather/forecast?contains=${query}`
      );
      const forecastData = response.data;

      // Filter forecast data to remove duplicates based on location_id and date
      const filteredForecastData = forecastData.filter(
        (value: ForecastData, index: number, self: ForecastData[]) =>
          index ===
          self.findIndex(
            (t) =>
              t.location.location_id === value.location.location_id &&
              t.date === value.date
          )
      );

      setForecast(filteredForecastData);
    } catch (err) {
      console.error("Error fetching forecast:", err);
      setError("Unable to fetch forecast data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchForecast();
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-semibold mb-8">Malaysia Weather Forecast</h1>

      {/* Location Type Selector */}
      <div className="mb-6 w-full max-w-xs">
        <label htmlFor="location-type" className="block text-sm mb-2">
          Filter by Location Type:
        </label>
        <select
          id="location-type"
          value={locationType}
          onChange={(e) => setLocationType(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="St">State</option>
          <option value="Rc">Recreation Centre</option>
          <option value="Ds">District</option>
          <option value="Tn">Town</option>
          <option value="Dv">Division</option>
        </select>
      </div>

      {/* Location Selector */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-4 mb-8 w-full max-w-xs"
      >
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a location</option>

          {locations
            .slice() // Create a shallow copy to avoid mutating the original array
            .sort((a, b) => a.location_name.localeCompare(b.location_name))
            .map((location) => (
              <option key={location.location_id} value={location.location_id}>
                {location.location_name}
              </option>
            ))}
        </select>

        <button
          type="submit"
          className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          Get Forecast
        </button>
      </form>

      {/* Loading State */}
      {loading && <p className="text-blue-500">Loading...</p>}

      {/* Error Messages */}
      {error && <p className="text-red-400">{error}</p>}

      {/* Render the Carousel with forecast data */}
      <div className="w-full p-0 m-0">
        <AppleCardsCarouselDemo forecast={forecast} />
      </div>
    </div>
  );
}
