"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

interface ForecastData {
  date: string;
  min_temp: number;
  max_temp: number;
  summary_forecast: string;
}

interface AppleCardsCarouselDemoProps {
  forecast: ForecastData[];
}

export const AppleCardsCarouselDemo: React.FC<AppleCardsCarouselDemoProps> = ({
  forecast,
}) => {
  const cards = forecast.map((forecastItem, index) => {
    // Determine the image based on the forecast summary
    const imageSrc = /ribut/i.test(forecastItem.summary_forecast)
      ? "/rain.jpg"
      : "/sunny.jpg";

    return (
      <Card
        key={index}
        card={{
          category: `${forecastItem.summary_forecast}`, // Add a default category or modify as needed
          title: `Weather on ${forecastItem.date}`,
          content: (
            <div className="p-4">
              <p>
                <strong>Min Temp:</strong> {forecastItem.min_temp}°C
              </p>
              <p>
                <strong>Max Temp:</strong> {forecastItem.max_temp}°C
              </p>
            </div>
          ),
          src: imageSrc,
        }}
        index={index}
      />
    );
  });

  return (
    <div className="w-full h-full py-20">
      <h2 className="text-center max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold  font-sans">
        7-Day Weather Prediction
      </h2>
      <Carousel items={cards} />
    </div>
  );
};
