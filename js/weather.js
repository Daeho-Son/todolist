const weather = document.querySelector(".js-weather");

const COORDS = "coords";

// 날씨 정보를 더블클릭할 때 이벤트 - 시간 정보로 변함
function handleWeatherClick() {
  const SHOWING = "showing";
  const UNSHOWING = "unshowing";
  weather.classList.remove(SHOWING);
  clock.classList.remove(UNSHOWING);
}

// 가져온 위도와 경로를 이용해서 날씨정보를 가져옴
function getWheather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${secrets.WEATHER_API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = parseInt(json.main.temp, 10);
      const name = json.name;
      weather.innerHTML = `${temperature}ºC ${name}`;
    });
}

// Local Storage에 위도 경도를 저장
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// getCurrentPosition 에러
function handleGeoError() {
  console.log("handleGeoError");
}

// getCurrentPosition 성공
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

// 위도와 경도를 가져옴
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
    weather.addEventListener("click", handleWeatherClick);
  }
}

init();
