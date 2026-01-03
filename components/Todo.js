class Todo {
  constructor(data, templateSelector, handleCheck, handleDelete) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._dueDate = new Date(data.date);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;

    this._element = this._getTemplate();
    this._todoNameEl = this._element.querySelector(".todo__name");
    this._todoCheckboxEl = this._element.querySelector(".todo__completed");
    this._todoLabel = this._element.querySelector(".todo__label");
    this._todoDate = this._element.querySelector(".todo__date");
    this._deleteBtn = this._element.querySelector(".todo__delete-btn");

    this._populateTodo();
    this._setEventListeners();
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    return template.content.querySelector(".todo").cloneNode(true);
  }

  _populateTodo() {
    this._todoNameEl.textContent = this._data.name;
    this._todoCheckboxEl.checked = this._data.completed;

    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);

    if (!isNaN(this._dueDate)) {
      this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`;
    }
  }

  _setEventListeners() {
    // Checkbox change event
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = this._todoCheckboxEl.checked;
      this._handleCheck(this._data.completed);
    });

    // Delete button event (if exists)
    if (this._deleteBtn) {
      this._deleteBtn.addEventListener("click", () => {
        this._handleDelete(this._data.id);
      });
    }
  }

  isCompleted() {
    return this._data.completed;
  }

  // Method to remove element from DOM
  remove() {
    this._element.remove();
  }

  getId() {
    return this._data.id;
  }

  getView() {
    return this._element;
  }
}

export default Todo;
