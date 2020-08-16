const addTaskForm = document.querySelector(".addTask .js-addTaskForm"),
  addTaskInput = document.querySelector(".addTask .js-addTaskInput");
const toDoList = document.querySelector(".main .js-toDoList"),
  toDoCompleted = document.querySelector(".main .js-toDoCompleted");

const TODO_LIST = "toDoList",
  TODO_COMPLETED = "toDoCompleted";
  UNSHOWING = "unshowing";

let listToDoList = [];
let listToDoCompleted = [];

function handleImousedown(event) {
  const i = event.target;
  const ul = event.target.parentNode.parentNode.className;
  if (ul === "js-toDoList") {
    i.classList.remove("far");
    i.classList.remove("fa-check-circle");
    i.classList.add("fas");
    i.classList.add("fa-check-circle");
  } else {
    i.classList.remove("fas");
    i.classList.add("far");
    i.classList.add("fa-circle");
  }
}

function handleImouseleave(event) {
  const i = event.target;
  const ul = event.target.parentNode.parentNode.className;
  if (ul === "js-toDoList") {
    i.classList.remove("fas");
    i.classList.remove("fa-check-circle");
    i.classList.add("far");
    i.classList.add("fa-circle");
  } else {
    i.classList.remove("far");
    i.classList.remove("fa-circle");
    i.classList.add("fas");
    i.classList.add("fa-check-circle");
  }
}

function handleImouseenter(event) {
  const i = event.target;
  const ul = event.target.parentNode.parentNode.className;
  if (ul === "js-toDoList") {
    i.classList.remove("fa-circle");
    i.classList.add("fa-check-circle");
  }
}

function handleIClick(event) {
  const li = event.target.parentNode;
  const ul = li.parentNode.className;
  if (ul === "js-toDoList") {
    toDoList.removeChild(li);
    toDoCompleted.appendChild(li);

    li.firstChild.title = "완료 취소 | 작업 완료 및 미완료 간에 전환합니다.";

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

    li.firstChild.title = "완료 | 작업 완료 및 미완료 간에 전환합니다.";

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
  const li = event.target;
  const ul = li.parentNode.className;
  const i = li.firstChild;
  if (ul === "js-toDoList") {
    toDoList.removeChild(li);
    listToDoList = listToDoList.filter((element) => {
      return element.id !== i.parentNode.id;
    });
  }
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

// 완료 목록이 비어있으면 완료 Container가 사라짐.
function checkCompleted() {
  if (toDoCompleted.children.length === 0) {
    toDoCompleted.parentNode.classList.add(UNSHOWING);
  } else {
    toDoCompleted.parentNode.classList.remove(UNSHOWING);
  }
}

function saveTask() {
  localStorage.setItem(TODO_LIST, JSON.stringify(listToDoList));
  localStorage.setItem(TODO_COMPLETED, JSON.stringify(listToDoCompleted));
  checkCompleted();
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
      i.title = "완료 | 작업을 완료 및 미완료 간에 전환합니다.";
      toDoList.appendChild(li);
      listToDoList.push(taskObj);
      break;
    case TODO_COMPLETED:
      i.classList.add("fas");
      i.classList.add("fa-check-circle");
      i.title = "완료 취소 | 작업을 완료 및 미완료 간에 전환합니다.";
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
  if (toDoCompleted !== null && toDoCompleted !== "[]") {
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
