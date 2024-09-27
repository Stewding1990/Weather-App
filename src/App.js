import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';  // Ensure this path is correct
import axios from 'axios';

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null); // To handle error messages

  const fetchWeather = async (city) => {
    const API_KEY = process.env.REACT_APP_API_KEY;  
    try {
      setError(null); // Clear any previous errors
      console.log(`Fetching weather for ${city}`);  
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log(response.data);  
      setWeather(response.data);
      document.body.style.backgroundImage = getBackgroundImage(response.data.weather[0].main);
      console.log(response.data.weather[0].main.toLowerCase());
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError('City not found. Please try again.');
      setWeather(null); // Clear previous weather data if there’s an error
    }
  };

  const getBackgroundImage = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'url("/images/weather/clear.jpg")';
      case 'clouds':
        return 'url("/images/weather/clouds.jpg")';
      case 'rain':
        return 'url("/images/weather/rain.jpg")';
      case 'thunderstorm':
        return 'url("/images/weather/thunderstorm.jpg")';
      case 'snow':
        return 'url("/images/weather/snow.jpg")';
      case 'mist':
        return 'url("/images/weather/mist.jpg")';
      default:
        return 'url("/images/weather/default.jpg")'; // Default image for rare conditions
    }
  };  
  
  return (
    <div className="App">
      <h1>Weather App</h1>
      <SearchBar onSearch={fetchWeather} />
      {error && <p className="error">{error}</p>} {/* Display error if present */}
      {weather && (
        <div className="weather-info show">
          <h2>{weather.name}</h2>
          <img
            className="weather-icon"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
