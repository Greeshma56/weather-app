const apiKey = "57ec33cd1315215839771b837b87cf38"; 

document.getElementById("searchBtn").addEventListener("click", getWeather);

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherInfo = document.getElementById("weatherInfo");

  if (city === "") {
    weatherInfo.innerHTML = "<p>Please enter a city name 🌆</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  console.log("Requesting:", city);
  console.log("URL:", url);

  try {
    const response = await fetch(url);
    console.log("Response status:", response.status);
    if (!response.ok) throw new Error("City not found or invalid API key");

    const data = await response.json();
    console.log("Data:", data);

    const { name, sys, main, weather, wind } = data;
    changeBackground(weather[0].main);

    const iconCode = weather[0].icon; // icon code from API
const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

weatherInfo.innerHTML = `
  <h2>${name}, ${sys.country}</h2>
  <img src="${iconUrl}" alt="Weather Icon" style="width:100px; height:100px;">
  <h3>${weather[0].main} (${weather[0].description})</h3>
  <p>🌡️ Temperature: ${main.temp}°C</p>
  <p>💧 Humidity: ${main.humidity}%</p>
  <p>💨 Wind Speed: ${wind.speed} m/s</p>
`;

  } catch (error) {
    console.error("Error:", error);
    weatherInfo.innerHTML = "<p>❌ City not found or API error. Check console.</p>";
  }
}
function changeBackground(weatherType) {
  const body = document.body;

  switch (weatherType) {
    case "Clear":
      body.style.background = "linear-gradient(135deg, #FFD700, #FFA500)"; // sunny
      break;
    case "Clouds":
      body.style.background = "linear-gradient(135deg, #A1C4FD, #C2E9FB)"; // cloudy
      break;
    case "Rain":
      body.style.background = "linear-gradient(135deg, #4B79A1, #283E51)"; // rainy
      break;
    case "Thunderstorm":
      body.style.background = "linear-gradient(135deg, #232526, #414345)"; // stormy
      break;
    case "Snow":
      body.style.background = "linear-gradient(135deg, #E0EAFC, #CFDEF3)"; // snowy
      break;
    case "Mist":
    case "Fog":
      body.style.background = "linear-gradient(135deg, #757F9A, #D7DDE8)"; // foggy
      break;
    default:
      body.style.background = "linear-gradient(135deg, #74ABE2, #5563DE)"; // default
  }
}
function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function successCallback(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const { name, sys, main, weather, wind } = data;
      changeBackground(weather[0].main);

      const iconCode = weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      const weatherInfo = document.getElementById("weatherInfo");
      weatherInfo.innerHTML = `
        <h2>${name}, ${sys.country}</h2>
        <img src="${iconUrl}" alt="Weather Icon" style="width:100px; height:100px;">
        <h3>${weather[0].main} (${weather[0].description})</h3>
        <p>🌡️ Temperature: ${main.temp}°C</p>
        <p>💧 Humidity: ${main.humidity}%</p>
        <p>💨 Wind Speed: ${wind.speed} m/s</p>
      `;
    })
    .catch(error => {
      alert("Error fetching weather data!");
      console.error(error);
    });
}

function errorCallback(error) {
  alert("Unable to retrieve your location. Please allow location access.");
}
