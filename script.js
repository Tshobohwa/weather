"use strict";

const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const forecastContainer = document.getElementById("forecast-container");

const API_KEY = "E4L9XDTZ8UTALV2644XPE5Z24";

const calculateFromFareneightToCelcius = (fareneights) => {
  const celcius = ((fareneights - 32) * 5) / 9;
  return celcius.toFixed(0);
};

const renderWeatherForecast = (weather) => {
  forecastContainer.innerHTML = `
    
        <div class="main-forecast">
          <header class="forecast-header">
            <p class="address">${weather.address}</p>
            <p class="date">${new Date().toLocaleDateString()}</p>
          </header>
          <p class="main-temp">${calculateFromFareneightToCelcius(
            weather.currentConditions.temp
          )} °C</p>
          <header class="forecast-footer">
            <p class="small-temp">min: 18 °C</p>
            <p class="small-temp">max: 26 °C</p>
          </header>
        </div>
        <div class="details-container">
          <div class="details">
            <div class="forecast-header">
              <p class="details-text">wind:</p>
              <img src="./assets/wind.png" alt="" class="details-icon" />
            </div>
            <p class="small-value">${
              weather.currentConditions.windspeed
            }<span>km/h</span></p>
          </div>
          <div class="details">
            <div class="forecast-header">
              <p class="details-text">humidity</p>
              <img src="./assets//humidity.png" class="details-icon" />
            </div>
            <p class="small-value">${weather.currentConditions.humidity.toFixed(
              1
            )}<span>%</span></p>
          </div>
        </div>

    `;
};

const getWeatherByCoords = async (address) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${address}/?key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    renderWeatherForecast(data);
    console.log(data);
    return data; // Return the weather data if successful
  } catch (error) {
    return { error: error.message }; // Handle the error case
  }
};

searchButton.addEventListener("click", () =>
  getWeatherByCoords(searchInput.value)
);

getWeatherByCoords(`Kigali`);
