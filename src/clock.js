const clock = document.querySelector(".js-currentTime");

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
      dayOfTheWeek = "월";
      break;
    case 2:
      dayOfTheWeek = "화";
      break;
    case 3:
      dayOfTheWeek = "수";
      break;
    case 4:
      dayOfTheWeek = "목";
      break;
    case 5:
      dayOfTheWeek = "금";
      break;
    case 6:
      dayOfTheWeek = "토";
      break;
    case 0:
      dayOfTheWeek = "일";
      break;
  }
  month = month < 10 ? `0${month}` : `${month}`;
  day = day < 10 ? `0${day}` : `${day}`;
  hour = hour < 10 ? `0${hour}` : `${hour}`;
  minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  clock.innerHTML = `${fullYear}-${month}-${day} (${dayOfTheWeek}) ${hour}:${minutes}:${seconds}`;
}

function init() {
  setInterval(getClock, 0);
}

init();
