const addTaskForm = document.querySelector(".addTask .js-addTaskForm"),
  addTaskInput = document.querySelector(".addTask .js-addTaskInput");
const toDoList = document.querySelector(".main .js-toDoList"),
  toDoCompleted = document.querySelector(".main .js-toDoCompleted"),
  completedText = document.querySelector(".completedContainer .competedText");

const TODO_LIST = "toDoList",
  TODO_COMPLETED = "toDoCompleted",
  STAR_STATUS = "starStatus";

let listToDoList = [];
let listToDoCompleted = [];

// // star 아이콘을 클릭할 때 이벤트
// function handleStarIconClick(event) {
//   event.
// }

// task의 맨 앞 아이콘 위에서 마우스를 클릭할 때 이벤트
function handleCompleteIconmousedown(event) {
  const i = event.target;
  const ul = event.target.parentNode.parentNode.className;
  // toDoList일 때
  if (ul === "js-toDoList") {
    i.classList.remove("far");
    i.classList.remove("fa-check-circle");
    i.classList.add("fas");
    i.classList.add("fa-check-circle");
  }
  // toDoCompleted일 때
  if (ul === "js-toDoCompleted") {
    i.classList.remove("fas");
    i.classList.add("far");
    i.classList.add("fa-circle");
  }
}

// task 맨 앞 아이콘에서 마우스가 떠날 때 이벤트
function handleCompleteIconMouseleave(event) {
  const i = event.target;
  const ul = event.target.parentNode.parentNode.className;
  // toDoList일 때
  if (ul === "js-toDoList") {
    i.classList.remove("fas");
    i.classList.remove("fa-check-circle");
    i.classList.add("far");
    i.classList.add("fa-circle");
  }
  // toDoCompleted일 때
  if (ul === "js-toDoCompleted") {
    i.classList.remove("far");
    i.classList.remove("fa-circle");
    i.classList.add("fas");
    i.classList.add("fa-check-circle");
  }
}

// task의 맨 앞 아이콘 위에 마우스를 올릴 때 이벤트
function handleCompleteIconMouseenter(event) {
  const i = event.target;
  const ul = event.target.parentNode.parentNode.className;
  // toDoList일 때
  if (ul === "js-toDoList") {
    i.classList.remove("fa-circle");
    i.classList.add("fa-check-circle");
  }
}

// task의 맨 앞에 있는 아이콘 클릭 할 때 이벤트 - 완료상태 전환
function handleCompleteIconClick(event) {
  const li = event.target.parentNode;
  const ul = li.parentNode.className;
  const text = li.children[2].textContent;
  // toDoList에 있는 task를 클릭
  if (ul === "js-toDoList") {
    toDoList.removeChild(li);
    toDoCompleted.appendChild(li);
    li.firstChild.title = "완료 취소 | 작업 완료 및 미완료 간에 전환합니다.";
    li.children[2].innerHTML = `<strike>${text}</strike>`;
    const completed = listToDoList.filter((element) => {
      return element.id === event.target.parentNode.id;
    });
    listToDoCompleted.push(completed[0]);
    const clearListTodoList = listToDoList.filter((element) => {
      return element.id !== event.target.parentNode.id;
    });
    listToDoList = clearListTodoList;
  }
  // toDoCompleted에 있는 task를 클릭
  if (ul === "js-toDoCompleted") {
    toDoCompleted.removeChild(li);
    toDoList.appendChild(li);
    li.firstChild.title = "완료 | 작업 완료 및 미완료 간에 전환합니다.";
    li.children[2].innerHTML = text;
    const uncompleted = listToDoCompleted.filter((element) => {
      return element.id === event.target.parentNode.id;
    });
    listToDoList.push(uncompleted[0]);
    const clearListTodoCompleted = listToDoCompleted.filter((element) => {
      return element.id !== event.target.parentNode.id;
    });
    listToDoCompleted = clearListTodoCompleted;
  }

  saveTask();
}

// 모든 task에서 오른쪽 마우스 클릭 할 때 이벤트
function handleTaskSlotContextmenu(event) {}

// 모든 task를 더블 클릭 할 때 이벤트 - task 제거
function handleTaskSlotDbclick(event) {
  const li = event.target;
  const ul = li.parentNode.className;
  const i = li.firstChild;
  // toDoList의 task를 더블클릭
  if (ul === "js-toDoList") {
    toDoList.removeChild(li);
    listToDoList = listToDoList.filter((element) => {
      return element.id !== i.parentNode.id;
    });
  }
  // toDoCompleted의 task를 더블클릭
  if (ul === "js-toDoCompleted") {
    toDoCompleted.removeChild(li);
    listToDoCompleted = listToDoCompleted.filter((element) => {
      return element.id !== i.parentNode.id;
    });
  }
  saveTask();
}

// uuidv4 생성
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

// toDoCompleted에 값의 여부에 따라 Display: None, Block 전환
function checkCompleted() {
  if (toDoCompleted.children.length === 0) {
    toDoCompleted.parentNode.classList.remove(SHOWING);
  } else {
    toDoCompleted.parentNode.classList.add(SHOWING);
  }
}

// task를 Local Storage에 저장
function saveTask() {
  localStorage.setItem(TODO_LIST, JSON.stringify(listToDoList));
  localStorage.setItem(TODO_COMPLETED, JSON.stringify(listToDoCompleted));
  checkCompleted();
}

// lacalStorage에 있는 task를 화면에 표시
function paintTask(task, task_id, status, starStatus) {
  // taskSlot : task가 들어가는 박스
  // completeIcon : complete 상태를 토글 할 수 있는 icon
  // taskText : task 내용
  // star : 중요한 내용을 표시해주는 icon
  const taskSlot = document.createElement("li");
  const completeIcon = document.createElement("i");
  const taskText = document.createElement("span");
  // const starIcon = document.createElement("i");
  taskSlot.id = task_id;
  taskSlot.classList.add("task");
  taskSlot.setAttribute("title", "더블 클릭 시 삭제됩니다.");
  taskSlot.appendChild(completeIcon);
  taskSlot.appendChild(taskText);
  // taskSlot.appendChild(starIcon);
  const taskObj = {
    id: task_id,
    task: task,
    // starStatus: starStatus,
  };
  taskSlot.addEventListener("dblclick", handleTaskSlotDbclick);
  taskSlot.addEventListener("contextmenu", handleTaskSlotContextmenu);
  completeIcon.addEventListener("click", handleCompleteIconClick);
  completeIcon.addEventListener("mouseenter", handleCompleteIconMouseenter);
  completeIcon.addEventListener("mouseleave", handleCompleteIconMouseleave);
  completeIcon.addEventListener("mousedown", handleCompleteIconmousedown);
  // starIcon.addEventListener("click", handleStarIconClick);

  // console.log(starStatus);
  // switch (starStatus) {
  //   case star:
  //     alert("나다");
  //     starIcon.classList.add("far");
  //     starIcon.classList.add("fa-star");
  //     starIcon.setAttribute("title", "중요로 표시");
  //     break;
    // case starred:
    //   starIcon.classList.add("fas");
    //   starIcon.classList.add("fa-star");
    //   starIcon.setAttribute("title", "중요도 제거");
    //   break;
  // }

  switch (status) {
    case undefined:
    case TODO_LIST:
      taskText.innerHTML = `${task}`;
      completeIcon.classList.add("far");
      completeIcon.classList.add("fa-circle");
      completeIcon.title = "완료 | 작업을 완료 및 미완료 간에 전환합니다.";
      toDoList.appendChild(taskSlot);
      listToDoList.push(taskObj);
      break;
    case TODO_COMPLETED:
      taskText.innerHTML = `<strike>${task}</strike>`;
      completeIcon.classList.add("fas");
      completeIcon.classList.add("fa-check-circle");
      completeIcon.title = "완료 취소 | 작업을 완료 및 미완료 간에 전환합니다.";
      toDoCompleted.appendChild(taskSlot);
      listToDoCompleted.push(taskObj);
      break;
  }
  saveTask();
}

// 작업추가 input에 값을 입력하고 엔터
function handleSubmit() {
  event.preventDefault();
  if (addTaskInput.value !== "") {
    const task = addTaskInput.value;
    const id = uuidv4();
    // const starStatus = "star";
    paintTask(task, id, undefined);
    addTaskInput.value = "";
  }
}

// localStorage에서 task 존재 여부 확인.
function loadTask() {
  const toDoList = localStorage.getItem(TODO_LIST);
  const toDoCompleted = localStorage.getItem(TODO_COMPLETED);
  if (toDoList !== null) {
    const parsedToDoList = JSON.parse(toDoList);
    parsedToDoList.forEach((element) => {
      paintTask(element.task, element.id, TODO_LIST);
    });
  }
  if (toDoCompleted !== null && toDoCompleted !== "[]") {
    const parsedToDoCompleted = JSON.parse(toDoCompleted);
    parsedToDoCompleted.forEach((element) => {
      paintTask(element.task, element.id, TODO_COMPLETED);
    });
  }
}

function init() {
  // alert(
  //   `          ########## 사용 설명서 ##########\n1. 사용자 이름을 클릭하면 로그아웃 됩니다.\n2. task를 더블 클릭하면 task가 삭제됩니다.\n3. task 맨 앞의 아이콘을 누르면 완료됨으로 전환됩니다.\n4. 아무데나 마우스를 올리고 있으면 설명이 나옵니다.`
  // );
  loadTask();
  addTaskForm.addEventListener("submit", handleSubmit);
}

init();

/* 
toDoList : 현재 활성화 중인 task
toDoCompleted : 완료된 task
*/
