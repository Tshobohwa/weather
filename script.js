"use strict";

const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const forecastContainer = document.getElementById("forecast-container");

const API_KEY = "E4L9XDTZ8UTALV2644XPE5Z24";

const calculateFromFareneightToCelcius = (fareneights) => {
  const celcius = ((value - 32) * 5) / 9;
  return celcius.toFixed(0);
};

const getWeatherByCoords = async (address) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${address}/?key=${API_KEY}`
    );

    // Check if the response is OK (status code 200–299)
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Weather Data:", data);
    return data; // Return the weather data if successful
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return { error: error.message }; // Handle the error case
  }
};

searchButton.addEventListener("click", () =>
  getWeatherByCoords(searchInput.value)
);

// Get current location of the user to display his local weather

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
  console.log("Geolocation is not supported by this browser.");
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  getWeatherByCoords(`${latitude}, ${longitude}`);
  console.log("Latitude: " + latitude + ", Longitude: " + longitude);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}
