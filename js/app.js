const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const exportLink = document.getElementById("exportLink");
const toggleTheme = document.getElementById("toggleTheme");
const filterButtons = document.querySelectorAll(".filter-btn");
const completedCount = document.getElementById("completedCount");
const totalCount = document.getElementById("totalCount");

let todos = [];

addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;
  const todo = { id: Date.now(), text, completed: false };
  todos.push(todo);
  todoInput.value = "";
  renderTodos();
}

function renderTodos(filter = "all") {
  todoList.innerHTML = "";

  let filtered = todos;
  if (filter === "active") {
    filtered = todos.filter(todo => !todo.completed);
  } else if (filter === "completed") {
    filtered = todos.filter(todo => todo.completed);
  }

  filtered.forEach(todo => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="${todo.completed ? "completed" : ""}" onclick="toggleComplete(${todo.id})">${todo.text}</span>
      <span>
        <i class="fas fa-trash red" onclick="deleteTodo(${todo.id})"></i>
      </span>
    `;
    todoList.appendChild(li);
  });

  completedCount.textContent = todos.filter(t => t.completed).length;
  totalCount.textContent = todos.length;
}

function toggleComplete(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

exportLink.addEventListener("click", () => {
  const data = JSON.stringify(todos, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  exportLink.href = url;
  exportLink.download = "todos.json";
});

toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

filterButtons.forEach(button =>
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");
    renderTodos(filter);
  })
);