// Select elements
const form = document.querySelector("form");           // Form element
const input = document.getElementById("inputvalue");   // Input field
const todoList = document.getElementById("todo-list"); // Todo list container

// Load saved todos from localStorage (or start with empty list)
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Function: Display all todos
function renderTodos() {
  todoList.innerHTML = ""; // Clear old list

  // Loop through todos and show each
  todos.forEach((todo, index) => {
    const div = document.createElement("div");
    div.textContent = todo + " "; // Add text

    // Create delete button
    const btn = document.createElement("button");
    btn.textContent = "Delete";

    // Delete action
    btn.onclick = () => {
      todos.splice(index, 1); // Remove from array
      saveTodos();            // Save new list
      renderTodos();          // Refresh display
    };

    // Add button to todo item
    div.appendChild(btn);
    // Add todo item to list
    todoList.appendChild(div);
  });
}

// Function: Save todos in localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Event: Add new todo
form.onsubmit = function (e) {
  e.preventDefault(); // Stop page reload

  const value = input.value.trim(); // Get text
  if (value && !todos.includes(value)) { // Check: not empty, no duplicates
    todos.push(value);   // Add todo
    saveTodos();         // Save it
    renderTodos();       // Show it
    input.value = "";    // Clear input
  }
};

// Show todos when page loads
renderTodos();
