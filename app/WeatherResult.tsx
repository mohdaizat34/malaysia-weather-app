import React from "react";

interface ForecastData {
  location: { location_id: string; location_name: string };
  date: string;
  morning_forecast: string;
  afternoon_forecast: string;
  night_forecast: string;
  summary_forecast: string;
  summary_when: string;
  min_temp: number;
  max_temp: number;
}

interface WeatherResultProps {
  forecast: ForecastData[];
  loading: boolean;
  error: string | null;
}

const WeatherResult: React.FC<WeatherResultProps> = ({
  forecast,
  loading,
  error,
}) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Weather Forecast for {forecast[0].location.location_name}</h2>
      <ul>
        {forecast.map((forecastItem, index) => (
          <li key={index}>
            <strong>Date: </strong>
            {forecastItem.date}
            <br />
            <strong>Morning: </strong>
            {forecastItem.morning_forecast}
            <br />
            <strong>Afternoon: </strong>
            {forecastItem.afternoon_forecast}
            <br />
            <strong>Night: </strong>
            {forecastItem.night_forecast}
            <br />
            <strong>Summary: </strong>
            {forecastItem.summary_forecast}
            <br />
            <strong>Min Temp: </strong>
            {forecastItem.min_temp}°C
            <br />
            <strong>Max Temp: </strong>
            {forecastItem.max_temp}°C
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherResult;
