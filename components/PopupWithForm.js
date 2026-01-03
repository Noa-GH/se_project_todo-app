import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
  }

  _getInputValues() {
    const inputValues = {};
    this._form.querySelectorAll("input").forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }

  close() {
    super.close();
  }
}

export default PopupWithForm;
