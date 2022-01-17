const todoinput = document.querySelector("#todo-input");
const addBtn = document.querySelector(".addbtn");
const todoList = document.querySelector(".todo");
const filter = document.querySelector(".filter");
const modal = document.querySelector(".modal");
const modalAction = document.querySelector(".modal-action");

addBtn.addEventListener("click", todoadd);
filter.addEventListener("click", filtertodo);
modalAction.addEventListener("click", modalaction);
document.addEventListener("DOMContentLoaded", getlocaltodolist);

function todoadd(e) {
  e.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-list");
  todoDiv.addEventListener("click", check);
  const content = `<li class="todo-tittle">${todoinput.value}</li>
  <span class="edit"><i class="far fa-edit"></i></span>
  <span class="remove"><i class="far fa-trash-alt"></i></span>
  <span class="check"><i class="far fa-circle"></i></span>`;
  todoDiv.innerHTML = content;
  todoList.appendChild(todoDiv);
  savelocaltodolist(todoinput.value);
  todoinput.value = "";
}

function check(e) {
  const classList = [...e.target.classList];
  const target = e.target;
  const todo = e.target.parentElement.parentElement;
  if (classList[1] === "fa-trash-alt") {
    todo.classList.add("removing");
    modal.style.visibility = "visible";
    modalAction.style.transform = "translateY(0vh)";
  } else if (classList[1] === "fa-circle") {
    target.classList.replace("fa-circle", "fa-check-circle");
    todo.classList.add("complete");
  } else if (classList[1] === "fa-edit") {
    edit(e);
  } else if (classList[1] === "fa-check-circle") {
    target.classList.replace("fa-check-circle", "fa-circle");
    todo.classList.remove("complete");
  } else if (classList[1] === "fa-save") {
    save(e);
  }
}

function modalaction(e) {
  const todo = document.querySelector(".removing");
  const classList = [...e.target.classList];
  if (classList[0] === "delete") {
    modalAction.style.transform = "translateY(-100vh)";
    modal.style.visibility = "hidden";
    removelocaltodolist(todo);
    todo.remove();
  } else if (classList[0] === "cancel") {
    todo.classList.remove("removing");
    modalAction.style.transform = "translateY(-100vh)";
    modal.style.visibility = "hidden";
  }
}

function edit(e) {
  const todoDiv = e.target.parentElement.parentElement;
  const todoValue = e.target.parentElement.previousElementSibling.innerHTML;
  todoDiv.classList.add("editing");
  const content = `<li class="todo-tittle"><input type="text" id="todo-list-input" value="${todoValue}"></li>
    <span class="save" title="save"><i class="far fa-save"></i></span>`;
  todoDiv.innerHTML = content;
}

function save(e) {
  const todoDiv = e.target.parentElement.parentElement;
  const todoInputvalue = document.querySelector("#todo-list-input").value;
  todoDiv.classList.remove("editing");
  const content = `<li class="todo-tittle">${todoInputvalue}</li>
    <span class="edit"><i class="far fa-edit"></i></span>
    <span class="remove"><i class="far fa-trash-alt"></i></span>
    <span class="check"><i class="far fa-circle"></i></span>`;
  todoDiv.innerHTML = content;
}

function filtertodo(e) {
  const targetValue = e.target.value;
  const alltodolist = [...document.getElementsByClassName("todo-list")];
  if (targetValue === "complete") {
    alltodolist.forEach((todo) => {
      if (!todo.classList.contains("complete")) {
        todo.style.display = "none";
      } else {
        todo.style.display = "flex";
      }
    });
  } else if (targetValue === "notcomplete") {
    alltodolist.forEach((todo) => {
      if (todo.classList.contains("complete")) {
        todo.style.display = "none";
      } else {
        todo.style.display = "flex";
      }
    });
  } else {
    alltodolist.forEach((todo) => {
      todo.style.display = "flex";
    });
  }
}

function savelocaltodolist(todo) {
  let savedtodo = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedtodo.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedtodo));
}

function getlocaltodolist() {
  let savedtodo = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  console.log(savedtodo);
  savedtodo.forEach((todos) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-list");
    todoDiv.addEventListener("click", check);
    const content = `<li class="todo-tittle">${todos}</li>
  <span class="edit"><i class="far fa-edit"></i></span>
  <span class="remove"><i class="far fa-trash-alt"></i></span>
  <span class="check"><i class="far fa-circle"></i></span>`;
    todoDiv.innerHTML = content;
    todoList.appendChild(todoDiv);
  });
}

function removelocaltodolist(todo) {
  let savedtodo = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const filtertodolist = savedtodo.filter((t) => {
    return t != todo.children[0].innerHTML;
  });
  console.log(filtertodolist);
  localStorage.setItem("todos", JSON.stringify(filtertodolist));
}
