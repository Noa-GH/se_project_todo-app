// Imports from external libraries and internal modules

import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import FormValidator from "../components/FormValidator.js";
import Todo from "../components/Todo.js";
import { initialTodos, validationConfig } from "../utils/constants.js";

// DOM Elements

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const FormValidatorInstance = new FormValidator(validationConfig, addTodoForm);
FormValidatorInstance.enableValidation();

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

  const todo = new Todo(todoData, "#todo-template");
  todosList.append(todo.getView());

  // resetValidation() {
  //   this._formElement.reset();
  //   this._inputList.forEach((inputElement) => {
  //     this._hideInputError(inputElement);
  //   });
  //   this._toggleButtonState();
  // }
  
// initialTodos();
