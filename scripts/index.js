// Imports from external libraries and internal modules
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import TodoList from "../components/TodoList.js";
import { initialTodos, validationConfig } from "../utils/constants.js";

// DOM Elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");

// Initialize TodoCounter first (it just displays, doesn't need other components)
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

// Initialize TodoList (it manages data and uses TodoCounter)
const todoList = new TodoList({
  todos: initialTodos,
  todoCounter: todoCounter, // Pass TodoCounter to TodoList
});

// Initialize Section (it handles rendering)
const section = new Section({
  items: initialTodos,
  renderer: (todoData) => {
    // This function creates a todo element with all event listeners
    return todoList._createTodoElement(todoData);
  },
  containerSelector: ".todos__list",
});

// Render initial todos on page load
section.renderItems();

// Initialize form validator
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

// Initialize popup (we'll use this instead of manual openModal/closeModal)
const addTodoPopupInstance = new Popup("#add-todo-popup");

// Event Listeners for opening/closing modal
addTodoButton.addEventListener("click", () => {
  addTodoPopupInstance.open();
});

addTodoCloseBtn.addEventListener("click", () => {
  addTodoPopupInstance.close();
});

// Form submit handler
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const todoData = {
    id: uuidv4(),
    name,
    date,
    completed: false,
  };

  // Add the new todo (TodoList updates counter, returns element)
  const newTodoElement = todoList.addTodo(todoData);

  // Section adds element to DOM
  section.addItem(newTodoElement);

  // Reset form and close modal
  addTodoForm.reset();
  formValidator.resetValidation();
  addTodoPopupInstance.close();
});
