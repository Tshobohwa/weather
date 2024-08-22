"use strict";

const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const forecastContainer = document.getElementById("forecast-container");
const nextWeeksContainer = document.getElementById("next-weeks-container");

const API_KEY = "E4L9XDTZ8UTALV2644XPE5Z24";

const calculateFromFareneightToCelcius = (fareneights) => {
  const celcius = ((fareneights - 32) * 5) / 9;
  return celcius.toFixed(0);
};

const renderNextWeekDaysWeather = (days) => {
  let nextWeeksHTML = ``;
  days.forEach((day) => {
    nextWeeksHTML =
      nextWeeksHTML +
      `
          <div class="next-week-day">
        <p class="next-week-day-date">${new Date(
          day.datetime
        ).toLocaleDateString()}</p>
        <p class="text-lg">${calculateFromFareneightToCelcius(
          day.feelslike
        )} °C</p>
        <footer class="next-week-day-footer">
          <div class="next-week-footer-div">
            <img src="./assets/wind.png" alt="" class="details-icon" />
            <p>${day.windspeed}km/h</p>
          </div>
          <div class="next-week-footer-div">
            <img src="./assets/humidity.png" alt="" class="details-icon" />
            <p>${day.humidity}%</p>
          </div>
        </footer>
      </div>
`;
  });
  nextWeeksContainer.innerHTML = nextWeeksHTML;
};

const renderWeatherForecast = (weather) => {
  const { days } = weather;
  const today = days[0];
  const twoNextWeeks = days.filter((day) => day !== today);
  renderNextWeekDaysWeather(twoNextWeeks);

  forecastContainer.innerHTML = `
    
        <div class="main-forecast">
          <header class="forecast-header">
            <p class="address">${weather.address}</p>
            <p class="date">${new Date().toLocaleDateString()}</p>
          </header>
          <p class="main-temp">${calculateFromFareneightToCelcius(
            today.feelslike
          )} °C</p>
          <footer class="forecast-footer">
            <p class="date">min: ${calculateFromFareneightToCelcius(
              today.feelslikemin
            )} °C</p>
            <p class="date">max: ${calculateFromFareneightToCelcius(
              today.feelslikemax
            )} °C</p>

          </footer>
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

const getWeatherByAddress = async (address) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${address}/?key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    renderWeatherForecast(data);
    return data;
  } catch (error) {
    return { error: error.message };
  }
};

searchButton.addEventListener("click", () =>
  getWeatherByAddress(searchInput.value)
);

getWeatherByAddress(`Kigali`);
