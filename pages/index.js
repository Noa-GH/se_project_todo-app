import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import FormValidator from "../components/FormValidator.js";
import Todo from "../components/Todo.js";
import { initialTodos, validationConfig } from "../utils/constants.js";

// DOM Elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector("#add-todo-form");

// Manage todos array
let todos = [...initialTodos];

// Initialize TodoCounter
const todoCounter = new TodoCounter(todos, ".counter__text");

// Function to create a todo element
function createTodoElement(todoData) {
  const todo = new Todo(
    todoData,
    "#todo-template",
    // Handle checkbox change
    (isChecked) => {
      todoCounter.updateCompleted(isChecked);
    },
    // Handle delete
    (id) => {
      const todoIndex = todos.findIndex((t) => t.id === id);
      if (todoIndex !== -1) {
        const wasCompleted = todos[todoIndex].completed;
        todos.splice(todoIndex, 1);
        todoCounter.updateTotal(false);
        if (wasCompleted) {
          todoCounter.updateCompleted(false);
        }
        todo.remove();
      }
    }
  );

  return todo.getView();
}

// Initialize Section
const section = new Section(todos, createTodoElement, ".todos__list");

section.renderItems();

// Form validation
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

// Popup with form submission
const addTodoPopupInstance = new PopupWithForm(
  "#add-todo-popup",
  (inputValues) => {
    const date = new Date(inputValues.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const todoData = {
      id: uuidv4(),
      name: inputValues.name,
      date,
      completed: false,
    };

    // Add to todos array
    todos.push(todoData);

    // Create and add element
    const newTodoElement = createTodoElement(todoData);
    section.addItem(newTodoElement);

    // Update counter - increment total when adding a new todo
    todoCounter.updateTotal(true);

    addTodoPopupInstance.close();
  }
);

addTodoPopupInstance.setEventListeners();

// Open popup button
addTodoButton.addEventListener("click", () => {
  formValidator.resetValidation();
  addTodoPopupInstance.open();
});
