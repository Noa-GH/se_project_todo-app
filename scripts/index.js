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
//TODO  Define the necessary selectors and handlers for the components

const todos = initialTodos;
const selector = ".counter__text";
const containerSelector = ".todos__list";
const popupSelector = "#add-todo-popup";

const todoCounter = new TodoCounter(todos, selector);

console.log("Selector:", selector);
console.log("Todos:", todos);
console.log("Container Selector:", containerSelector);
const section = new Section((items, renderer), containerSelector);
const popup = new Popup(popupSelector);
const popupWithForm = new PopupWithForm({ formSubmitHandler, popupSelector });

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
