import Todo from "./Todo.js";

class TodoList {
  constructor({ todos, containerSelector, counterSelector }) {
    this._todos = todos;
    this._container = document.querySelector(containerSelector);
    this._counter = document.querySelector(counterSelector);
  }

  // Add a new todo to the list
  addTodo(todoData) {
    const todoElement = this._createTodoElement(todoData);
    this._container.prepend(todoElement);
    this._updateCounter();
  }

  // Remove a todo from the list
  _handleDeleteTodo(todoId) {
    // Remove from data array
    this._todos = this._todos.filter((todo) => todo.id !== todoId);
    this._updateCounter();
  }

  // Toggle todo completion status
  _handleToggleTodo(todoId) {
    const todo = this._todos.find((todo) => todo.id === todoId);
    if (todo) {
      todo.completed = !todo.completed;
      this._updateCounter();
    }
  }

  // Create a single todo element with event handlers
  _createTodoElement(todoData) {
    const todo = new Todo(todoData, "#todo-template");
    const todoElement = todo.getView();

    // Add delete handler
    const deleteBtn = todoElement.querySelector(".todo__delete-btn");
    deleteBtn.addEventListener("click", () => {
      todoElement.remove();
      this._handleDeleteTodo(todoData.id);
    });

    // Add checkbox toggle handler
    const checkbox = todoElement.querySelector(".todo__completed");
    checkbox.addEventListener("change", () => {
      this._handleToggleTodo(todoData.id);
    });

    return todoElement;
  }

  // Update the counter text
  _updateCounter() {
    const completedCount = this._todos.filter((todo) => todo.completed).length;
    const totalCount = this._todos.length;
    this._counter.textContent = `Showing ${completedCount} out of ${totalCount} completed`;
  }

  // Render all initial todos
  renderItems() {
    this._todos.forEach((todoData) => {
      const todoElement = this._createTodoElement(todoData);
      this._container.append(todoElement);
    });
    this._updateCounter();
  }
}

export default TodoList;
