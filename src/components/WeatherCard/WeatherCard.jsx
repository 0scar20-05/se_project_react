import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContexts";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const isLoading = weatherData.temp.F === 999 || weatherData.temp.C === 999;

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOption =
    filteredOptions[0] ||
    defaultWeatherOptions[weatherData.isDay ? "day" : "night"];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {isLoading
          ? "Loading..."
          : `${weatherData.temp[currentTemperatureUnit]}°${currentTemperatureUnit}`}
      </p>
      <img
        src={weatherOption?.url}
        alt={`${weatherOption?.condition}`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
