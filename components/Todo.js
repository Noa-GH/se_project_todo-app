class Todo {
  constructor(data, templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._dueDate = new Date(data.date);
    this._element = this._getTemplate();
    this._todoNameEl = this._element.querySelector(".todo__name");
    this._todoCheckboxEl = this._element.querySelector(".todo__completed");
    this._todoLabel = this._element.querySelector(".todo__label");
    this._todoDate = this._element.querySelector(".todo__date");
    this._todoDeleteBtn = this._element.querySelector(".todo__delete-btn");
    // Set up the todo content and event listeners
    this._setEventListeners();
    this._populateTodo();
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    return template.content.querySelector(".todo").cloneNode(true);
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._element.remove();
    });
  }

  _populateTodo() {
    this._todoNameEl.textContent = this._data.name;

    this._todoCheckboxEl.checked = this._data.completed;

    // Set id and for attributes
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);

    // Set due date if it exists
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

  getView() {
    return this._element;
  }
}

export default Todo;
