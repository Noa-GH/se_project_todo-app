class Section {
  constructor(items, renderer, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const cardElement = this._renderer(item);
      this._container.appendChild(cardElement);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;
