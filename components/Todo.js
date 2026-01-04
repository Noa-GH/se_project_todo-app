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
    // #region agent log
    if (this._deleteBtn) {
      const hiddenSpan = this._deleteBtn.querySelector('.visually-hidden');
      const spanStyle = hiddenSpan ? window.getComputedStyle(hiddenSpan) : null;
      fetch('http://127.0.0.1:7242/ingest/7ef22521-9441-4cfb-a2c3-55a9c6752bfc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Todo.js:_populateTodo',message:'Delete button DOM analysis post-fix',data:{hasVisuallyHiddenSpan:!!hiddenSpan,spanDisplay:hiddenSpan ? spanStyle.display : null,spanPosition:hiddenSpan ? spanStyle.position : null,spanWidth:hiddenSpan ? spanStyle.width : null,spanHeight:hiddenSpan ? spanStyle.height : null,spanOverflow:hiddenSpan ? spanStyle.overflow : null},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    }
    // #endregion
  }

  _setEventListeners() {
    // Checkbox change event
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = this._todoCheckboxEl.checked;
      this._handleCheck(this._data.completed);
    });

    // Delete button event (if exists)
    if (this._deleteBtn) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/7ef22521-9441-4cfb-a2c3-55a9c6752bfc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Todo.js:_setEventListeners',message:'Delete button found in DOM',data:{buttonExists:true,computedStyleDisplay:window.getComputedStyle(this._deleteBtn).display,computedStyleBeforeContent:window.getComputedStyle(this._deleteBtn,'::before').content},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      this._deleteBtn.addEventListener("click", () => {
        this._handleDelete(this._data.id);
      });
    }
  }
  
  // Return data once completed
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
