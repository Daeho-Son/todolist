const body = document.querySelector("body");

const MIN_COUNT = 1,
  MAX_COUNT = 5;

function paintBgImg(num) {
  window.onload = function () {
    const divBg = document.createElement("div");
    divBg.style.backgroundImage = `url('images/${num}.jpg')`;
    divBg.style.backgroundRepeat = "no-repeat";
    divBg.style.backgroundSize = "cover";
    divBg.style.backgroundPosition = "center center";
    divBg.classList.add("bgImage");
    body.appendChild(divBg);
  };
}

function getRandomNum() {
  const num = Math.floor(Math.random() * (MAX_COUNT - MIN_COUNT + 1)) + 1;
  return num;
}

function init() {
  const randomNum = getRandomNum();
  paintBgImg(randomNum);
}

init();
