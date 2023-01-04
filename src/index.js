let now = new Date();

let h3 = document.querySelector("h3");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let minuets = now.getMinutes();
let hours = now.getHours();
h3.innerHTML = `${day}, ${hours}:${minuets}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${searchInput.value}`;

  searchCity(searchInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function changeCelsius() {
  let currentCelsius = document.querySelector("#temperature");
  currentCelsius.innerHTML = 23;
}
let clickCelsius = document.querySelector("#current-temp-celsius");
clickCelsius.addEventListener("click", changeCelsius);

function changeFahrenheit() {
  let currentFahrenheit = document.querySelector("#temperature");
  currentFahrenheit.innerHTML = 63;
}
let clickFahrenheit = document.querySelector("#current-temp-fahrenheit");
clickFahrenheit.addEventListener("click", changeFahrenheit);

function searchCity(city) {
  let apiKey = "5f69166c92682e1352557cb04dbaf817";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response);
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class = "row">`;
  forecast.forEach(function (forecastDay, index) {
    console.log(forecastDay);
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `         <div class = "col-2">
                
                <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
                <div class = "weather-forecast-temperature">
                <span class = "weather-forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class = "weather-forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
                </div>
                </div> `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "de2c40e370d58e257faf07ba4ea95840";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response.data);
  let place = response.data.name;
  let weatherType = response.data.weather[0].description;
  let temperature = Math.round(response.data.main.temp);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);

  celsiusTemp = response.data.main.temp;

  let placeElement = document.querySelector("#place");
  let humidityElement = document.querySelector("#humidity");
  let temperatureElement = document.querySelector("#temperature");
  let windElement = document.querySelector("#windSpeed");
  let weatherTypeElement = document.querySelector("#description");
  let iconElement = document.querySelector(".mainEmoji");

  placeElement.innerHTML = `${place}`;
  temperatureElement.innerHTML = `${temperature}`;

  humidityElement.innerHTML = `${humidity}`;
  windElement.innerHTML = `${wind}`;
  weatherTypeElement.innerHTML = `${weatherType}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function exactLocation(position) {
  let apiKey = "5f69166c92682e1352557cb04dbaf817";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentPosition);

function showPosition(position) {
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${position.coords.latitude}${position.coords.longitude}`;
}

function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(exactLocation);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#current-temp-fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#current-temp-celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);

searchCity("London");
