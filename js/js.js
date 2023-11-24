const addTodo = document.querySelector("#addTodo");
const taskTodo = document.querySelector("#taskTodo");
const dateTodo = document.querySelector("#dateTodo");
const alertBox = document.querySelector("#alertMessage");
const table = document.querySelector("#tbody");
const deleteAllTodo = document.querySelector("#deleteAllTodo");

const pending = document.querySelector("#pending-filter");
const completed = document.querySelector("#completed-filter");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function addTodoHandler() {
  const todo = {
    id: generateId(),
    taskName: taskTodo.value,
    dateTask: dateTodo.value,
    completed: false,
  };

  if (todo.taskName) {
    todos.push(todo);
    taskTodo.value = "";
    dateTodo.value = "";
    saveToLocalStorage();
    showTask();
    showAlert("Task Successfuly", "success");
  } else {
    showAlert("Task Faild", "error");
    showTask();
  }
}
addTodo.addEventListener("click", addTodoHandler);

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
function showAlert(message, type) {
  const p = document.createElement("p");
  p.innerText = message;
  type === "success"
    ? (p.style.background = "lime")
    : (p.style.background = "red");
  alertBox.append(p);
  setTimeout(() => {
    p.style.display = "none";
  }, 2000);
}

function generateId() {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
}
function showTask() {
  table.innerHTML = "";

  if (todos.length) {
    todos.forEach((todo) => {
      table.innerHTML += `
      <tr>
      <td>${todo.taskName}</td>
      <td>${todo.dateTask ? todo.dateTask : "No Date"}</td>
      <td>${todo.completed ? "Completed" : "Pending"}</td>
      <td>
        <button id="edit">Edit</button>
        <button id="do">Do</button>
        <button id="delete">Delete</button>
      </td>
      </tr>
      `;
    });
  } else {
    table.innerHTML = "<tr><td colspan='4'>Not Found Task</td></tr>";
  }
}
// function filterTask(e) {
//   const todos = JSON.parse(localStorage.getItem("todos")) || [];
//   const resultFilter = [];
//   if (e.target.dataset.pending === "pending") {
//     todos.forEach((todo) => {
//       todo.completed === false ? todo.style.display = "": null
//     });

//   } else if (e.target.dataset.pending === "compeleted") {
//     todos.forEach((todo) => {
//       return todo.completed === true;
//     });
//   }
// }

// pending.addEventListener("click", filterTask);
// completed.addEventListener("click", filterTask);

function deleteAllHandler() {
  if (todos.length) {
    todos = [];
    saveToLocalStorage();
    showTask()
    showAlert("All Todos Cleared Successfuly ", "success");
  } else {
    showAlert("No Todos to Clear", "error");
  }
  localStorage.clear("todos");
}
deleteAllTodo.addEventListener("click", deleteAllHandler);
