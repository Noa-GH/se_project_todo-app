// Imports from external libraries and internal modules
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import FormValidator from "../components/FormValidator.js";
import TodoList from "../components/TodoList.js";
import { initialTodos, validationConfig } from "../utils/constants.js";

// DOM Elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");

// Initialize form validator
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

// Initialize todo list manager
const todoList = new TodoList({
  todos: initialTodos,
  containerSelector: ".todos__list",
  counterSelector: ".counter__text",
});

// Render initial todos
todoList.renderItems();

// Functions to open and close modals
const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// Event Listeners
addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

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

  // Add the new todo
  todoList.addTodo(todoData);

  // Reset form and close modal
  addTodoForm.reset();
  formValidator.resetValidation();
  closeModal(addTodoPopup);
});
