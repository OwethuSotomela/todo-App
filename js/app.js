let todos = [];
let filter = "all";
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const taskCount = document.getElementById("task-count");

document.getElementById("add-btn").addEventListener("click", addTodo);
document.getElementById("export").addEventListener("click", exportTodos);
document.getElementById("toggle-theme").addEventListener("click", toggleTheme);
document.querySelectorAll(".filter").forEach(btn =>
  btn.addEventListener("click", () => setFilter(btn.dataset.filter))
);

function addTodo() {
  const text = input.value.trim();
  if (!text) return;

  todos.push({ id: Date.now(), text, completed: false });
  input.value = "";
  renderTodos();
}

function toggleComplete(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) todo.completed = !todo.completed;
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  renderTodos();
}

function setFilter(newFilter) {
  filter = newFilter;
  document.querySelectorAll(".filter").forEach(btn =>
    btn.classList.toggle("active", btn.dataset.filter === newFilter)
  );
  renderTodos();
}

function renderTodos() {
  list.innerHTML = "";

  const filtered = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  filtered.forEach(todo => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="${todo.completed ? "completed" : ""}" onclick="toggleComplete(${todo.id})">
        ${todo.text}
      </span>
      <span>
        <i class="fa-solid fa-trash red" onclick="deleteTodo(${todo.id})"></i>
      </span>
    `;
    list.appendChild(li);
  });

  const completedCount = todos.filter(t => t.completed).length;
  taskCount.textContent = `${completedCount} / ${todos.length} tasks completed`;
}

function exportTodos() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(todos));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "todos.json");
  downloadAnchor.click();
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}