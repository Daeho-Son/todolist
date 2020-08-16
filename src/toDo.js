const addTaskForm = document.querySelector(".addTask .js-addTaskForm"),
  addTaskInput = document.querySelector(".addTask .js-addTaskInput");
const toDoList = document.querySelector(".main .js-toDoList"),
  toDoCompleted = document.querySelector(".main .js-toDoCompleted");
const completedText = document.querySelector(".main .completedContainer");

const TODO_LIST = "toDoList",
  TODO_COMPLETED = "toDoCompleted",
  UNSHOWING = "unshowing";

let listToDoList = [];
let listToDoCompleted = [];

function handleImousedown(event) {
  const ul = event.target.parentNode.parentNode.className;
  if (ul === "js-toDoList") {
    event.target.classList.remove("far");
    event.target.classList.remove("fa-check-circle");
    event.target.classList.add("fas");
    event.target.classList.add("fa-check-circle");
  } else {
    event.target.classList.remove("fas");
    event.target.classList.remove("fa-check-circle");
    event.target.classList.add("far");
    event.target.classList.add("fa-circle");
  }
}

function handleImouseleave(event) {
  const ul = event.target.parentNode.parentNode.className;
  if (ul === "js-toDoList") {
    event.target.classList.remove("fas");
    event.target.classList.remove("fa-check-circle");
    event.target.classList.add("far");
    event.target.classList.add("fa-circle");
  } else {
    event.target.classList.remove("far");
    event.target.classList.remove("fa-circle");
    event.target.classList.add("fas");
    event.target.classList.add("fa-check-circle");
  }
}

function handleImouseenter(event) {
  const ul = event.target.parentNode.parentNode.className;
  if (ul === "js-toDoList") {
    event.target.classList.remove("fa-circle");
    event.target.classList.add("fa-check-circle");
  }
}

function handleIClick(event) {
  const li = event.target.parentNode;
  const ul = li.parentNode.className;
  if (ul === "js-toDoList") {
    toDoList.removeChild(li);
    toDoCompleted.appendChild(li);
    const completed = listToDoList.filter((element) => {
      return element.id === event.target.parentNode.id;
    });
    listToDoCompleted.push(completed[0]);
    const clearListTodoList = listToDoList.filter((element) => {
      return element.id !== event.target.parentNode.id;
    });
    listToDoList = clearListTodoList;
  }
  if (ul === "js-toDoCompleted") {
    toDoCompleted.removeChild(li);
    toDoList.appendChild(li);
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

function handleLicontextmenu(event) {}

function handleLiDbclick(event) {
  const ul = event.target.parentNode.className;
  const i = event.target.firstChild;
  if (ul === "js-toDoList") {
    listToDoList = listToDoList.filter((element) => {
      return element.id !== i.parentNode.id;
    });
  }
  if (ul === "js-toDoCompleted") {
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

function saveTask() {
  localStorage.setItem(TODO_LIST, JSON.stringify(listToDoList));
  localStorage.setItem(TODO_COMPLETED, JSON.stringify(listToDoCompleted));
  // 완료 목록이 비어있으면 완료 Container가 사라짐.
  if (toDoCompleted.children.length === 0) {
    completedText.classList.add(UNSHOWING);
  } else {
    completedText.classList.remove(UNSHOWING);
  }
}

function paintTask(task, task_id, status) {
  const li = document.createElement("li");
  const i = document.createElement("i");
  const span = document.createElement("span");
  li.id = task_id;
  span.innerHTML = task;
  li.appendChild(i);
  li.appendChild(span);
  li.setAttribute("title", "더블 클릭 시 삭제됩니다.");
  const taskObj = {
    id: task_id,
    task: task,
  };
  li.addEventListener("dblclick", handleLiDbclick);
  li.addEventListener("contextmenu", handleLicontextmenu);
  i.addEventListener("click", handleIClick);
  i.addEventListener("mouseenter", handleImouseenter);
  i.addEventListener("mouseleave", handleImouseleave);
  i.addEventListener("mousedown", handleImousedown);

  switch (status) {
    case undefined:
    case TODO_LIST:
      i.classList.add("far");
      i.classList.add("fa-circle");
      i.setAttribute("title", "완료 | 작업을 완료 및 미완료 간에 전환합니다.");
      toDoList.appendChild(li);
      listToDoList.push(taskObj);
      break;
    case TODO_COMPLETED:
      i.classList.add("fas");
      i.classList.add("fa-check-circle");
      i.setAttribute(
        "title",
        "완료 취소 | 작업을 완료 및 미완료 간에 전환합니다."
      );
      toDoCompleted.appendChild(li);
      listToDoCompleted.push(taskObj);
      break;
  }
  saveTask();
}

function handleSubmit() {
  event.preventDefault();
  if (addTaskInput.value !== "") {
    const task = addTaskInput.value;
    const id = uuidv4();
    paintTask(task, id);
    addTaskInput.value = "";
  }
}

function loadTask() {
  const toDoList = localStorage.getItem(TODO_LIST);
  const toDoCompleted = localStorage.getItem(TODO_COMPLETED);
  if (toDoList !== null) {
    const parsedToDoList = JSON.parse(toDoList);
    parsedToDoList.forEach((element) => {
      paintTask(element.task, element.id, TODO_LIST);
    });
  }
  if (toDoCompleted !== null) {
    const parsedToDoCompleted = JSON.parse(toDoCompleted);
    parsedToDoCompleted.forEach((element) => {
      paintTask(element.task, element.id, TODO_COMPLETED);
    });
  }
}

function init() {
  loadTask();
  addTaskForm.addEventListener("submit", handleSubmit);
}
init();
