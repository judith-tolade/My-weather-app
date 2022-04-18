let currentDate = new Date();
let date = document.querySelector("#date");

let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];
date.innerHTML = `${day} ${hours}:${minutes}`;

function searchCity(city) {
  let apiKey = "c0efafb3b4678b54c983a9d3289a0c0a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function submit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#search-city");
  cityElement.innerHTML = cityInput.value;

  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submit);

function changeToCelsius(event) {
  event.preventDefault();
  let celTemperature = document.querySelector("#temperature");
  celTemperature.innerHTML = "33";
}
function changeToFahrenheit(event) {
  event.preventDefault();
  let fahTemperature = document.querySelector("#temperature");
  fahTemperature.innerHTML = "66";
}
let clickCelsius = document.querySelector("#celsius-link");
clickCelsius.addEventListener("click", changeToCelsius);

let clickFahrenheit = document.querySelector("#fahrenheit-link");
clickFahrenheit.addEventListener("click", changeToFahrenheit);
//week 5
function displayTemperature(response) {
  let citySelector = document.querySelector("#city");
  citySelector.innerHTML = response.data.name;
  let tempSelector = document.querySelector("#temperature");
  tempSelector.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function showLocation(position) {
  let apiKey = "c0efafb3b4678b54c983a9d3289a0c0a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function displayLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentButton = document.querySelector("#current-search");
currentButton.addEventListener("click", displayLocation);

searchCity("Ibadan");
