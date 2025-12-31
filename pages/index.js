// Imports from external libraries and internal modules
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js"; // Changed from Popup to call PopupWithForm
import TodoCounter from "../components/TodoCounter.js";
import FormValidator from "../components/FormValidator.js";
import TodoList from "../components/TodoList.js";
import Todo from "../components/Todo.js";
import { initialTodos, validationConfig } from "../utils/constants.js";

// DOM Elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector("#add-todo-form");

// Initialize TodoCounter first (it just displays counts)
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

// Initialize TodoList (manages data and uses TodoCounter)
const todoList = new TodoList({
  todos: initialTodos,
  todoCounter: todoCounter,
});

// Initialize Section (handles rendering)
const section = new Section(
  initialTodos,
  (todoData) => {
    return todoList.createTodoElement(todoData);
  },
  ".todos__list"
);

// Render initial todos on page load
section.renderItems();

// Initialize form validator
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

// Reset the validation state when the popup is opened
formValidator.resetValidation();

// Initialize popup with form submit handler
const addTodoPopupInstance = new PopupWithForm(
  "#add-todo-popup", // Match the actual popup ID
  (inputValues) => {
    // Handle form submission
    const date = new Date(inputValues.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const todoData = {
      id: uuidv4(),
      name: inputValues.name,
      date,
      completed: false,
    };

    // Add the new todo
    const newTodoElement = todoList.addTodo(todoData);
    section.addItem(newTodoElement);

    // Reset validation and close
    addTodoPopupInstance.close();
  }
);

// Set up event listeners for the popup
addTodoPopupInstance.setEventListeners();

// Event Listener for opening modal
addTodoButton.addEventListener("click", () => {
  formValidator.resetValidation();
  addTodoPopupInstance.open();
});
