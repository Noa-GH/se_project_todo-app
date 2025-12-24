import Todo from "./Todo.js";

class TodoList {
  constructor({ todos, todoCounter }) {
    this._todos = todos;
    this._todoCounter = todoCounter; // Store the TodoCounter instance
  }

  // Add a new todo to the list
  addTodo(todoData) {
    // Add to data array
    this._todos.push(todoData);
    this._todoCounter.updateTotal(true); // Increment total
    if (todoData.completed) {
      this._todoCounter.updateCompleted(true); // Increment completed
    }
    return this.createTodoElement(todoData);
  }

  // Remove a todo from the list
  _handleDeleteTodo(todoId) {
    const todo = this._todos.find((t) => t.id === todoId);

    // Remove from data array
    this._todos = this._todos.filter((t) => t.id !== todoId);

    // Update counter
    if (todo.completed) {
      this._todoCounter.updateCompleted(false); // Decrement completed
    }
    this._todoCounter.updateTotal(false); // Decrement total
  }

  // Toggle todo completion status
  _handleToggleTodo(todoId) {
    const todo = this._todos.find((t) => t.id === todoId);
    if (todo) {
      todo.completed = !todo.completed;

      // Update counter
      this._todoCounter.updateCompleted(todo.completed); // true = increment, false = decrement
    }
  }

  // Create a single todo element with event handlers
  createTodoElement(todoData) {
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
}

export default TodoList;
