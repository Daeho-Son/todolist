const clock = document.querySelector(".js-currentTime");

// 시계 정보를 클릭할 때 이벤트 - 날씨 정보로 전환
function handleClockClick() {
  const UNSHOWING = "unshowing";
  const SHOWING = "showing";
  clock.classList.add(UNSHOWING);
  weather.classList.add(SHOWING);
}

function getClock() {
  const date = new Date();
  const fullYear = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let dayOfTheWeek = date.getDay();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  switch (dayOfTheWeek) {
    case 1:
      dayOfTheWeek = "Mon";
      break;
    case 2:
      dayOfTheWeek = "Tue";
      break;
    case 3:
      dayOfTheWeek = "Wed";
      break;
    case 4:
      dayOfTheWeek = "Thu";
      break;
    case 5:
      dayOfTheWeek = "Fri";
      break;
    case 6:
      dayOfTheWeek = "Sat";
      break;
    case 0:
      dayOfTheWeek = "Sun";
      break;
  }
  month = month < 10 ? `0${month}` : `${month}`;
  day = day < 10 ? `0${day}` : `${day}`;
  hour = hour < 10 ? `0${hour}` : `${hour}`;
  minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  clock.innerHTML = `${fullYear}-${month}-${day} (${dayOfTheWeek})<br>&nbsp;&nbsp;&nbsp;&nbsp;${hour}:${minutes}:${seconds}`;
  clock.addEventListener("click", handleClockClick);
}

function init() {
  setInterval(getClock, 0);
}

init();
