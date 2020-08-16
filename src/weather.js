const weather = document.querySelector(".js-weather");

const API_KEY = "e43f02c62ef4162611a82d7fd05a175a";

const COORDS = "coords";

function getWheather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = parseInt(json.main.temp, 10);
      const name = json.name;
      weather.innerHTML = `${temperature}º @ ${name}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoError() {
  console.log("handleGeoError");
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWheather(latitude, longitude);
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function init() {
  const loadCoords = localStorage.getItem(COORDS);
  if (loadCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadCoords);
    getWheather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

init();
