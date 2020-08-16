const main = document.querySelector(".main"),
  userIdForm = document.querySelector("header form"),
  userIdInput = document.querySelector("input"),
  userId = document.querySelector(".userId");

const USER_ID = "userId";

function logout(event) {
  userId.innerHTML = "";
  userId.title = "";
  localStorage.removeItem(USER_ID);
  askForName();
}

function handleUserIdSubmit(event) {
  event.preventDefault();
  const currentId = userIdInput.value;
  paintMain(currentId);
  localStorage.setItem(USER_ID, userIdInput.value);
  userIdInput.value = "";
}

// main을 보이지 않게 하고, input 이벤트를 호출
function askForName() {
  const SHOWING = "showing";
  main.classList.remove(SHOWING);
  userIdForm.classList.add(SHOWING);
  userIdForm.addEventListener("submit", handleUserIdSubmit);
}

function paintMain(currentId) {
  const SHOWING = "showing";
  userIdForm.classList.remove(SHOWING);
  main.classList.add(SHOWING);
  userId.innerHTML = `Welcome, <font color="black"><u>${currentId}</u></font>`;
  userId.title = "You will be logged out on double-click.";
}

// Local Storgae에 있는 userId의 값을 가져옴
function loadId() {
  const currentId = localStorage.getItem(USER_ID);
  // Local Staroge에 userId의 값을 확인
  if (currentId !== null) {
    paintMain(currentId);
  } else {
    askForName();
  }
}

function init() {
  loadId();
  userId.addEventListener("dblclick", logout);
}
init();
