const addTodo = document.querySelector("#addTodo");
const taskTodo = document.querySelector("#taskTodo");
const dateTodo = document.querySelector("#dateTodo");
const alertBox = document.querySelector("#alertMessage");
const table = document.querySelector("#tbody");

const todos = JSON.parse(localStorage.getItem("todos")) || [];

function addTodoHandler() {
  const todo = {
    id: generateId(),
    taskName: taskTodo.value,
    dateTask: dateTodo.value,
    completed: false,
  };

  if (todo.taskName) {
    table.innerHTML = "";
    todos.push(todo);
    taskTodo.value = "";
    dateTodo.value = "";
    saveToLocalStorage();
    showTask();
    showAlert("Task Successfuly", "success");
  } else {
    showAlert("Task Faild", "error");
    // showTask()
  }
}
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
  console.log(table);
  if (todos.length) {
    todos.forEach((todo) => {
      table.innerHTML += `
      <tr>
      <td>${todo.taskName}</td>
      <td>${todo.dateTask ? todo.dateTask : "No Date"}</td>
      <td>${todo.completed ? "Completed" : "Pending"}</td>
      <td><button>Edit</button><button>Do</button><button>Delete</button></td>
      </tr>
      `;
    });
  } else {
    table.innerHTML = "<tr><td>Not Found Task</td></tr>";
  }
}
addTodo.addEventListener("click", addTodoHandler);
