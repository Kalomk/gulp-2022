import * as projectFunctions from "./modules/functions.js";

projectFunctions.isWebp();

const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? "placeholder undefined";
  const items = data.map((item) => {
    let cls = "";
    if (item.id == selectedId) {
      text = item.value;
      cls = "selected";
    }
    return ` <li class="select_item ${cls}"data-type="item" data-id="${item.id}">${item.value}</li>`;
  });
  return ` <input type="hidden"class="hidden_input">
        <div class="select_backdrop"data-type="backdrop"></div>
        <div class="select_input"data-type="input">
             <span data-type="value">${text}</span>
             <img src="/img/down-arrow.svg"alt="arrow"data-type="arrow"class="select_arrow">
        </div>
        <div class="select_dropdown">
             <ul class="select_list">
                  ${items.join("")}
                  <ul></div>`;
};

class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;
    this.render();
    this.setup();
  }
  render() {
    const { placeholder, data } = this.options;
    this.$el.classList.add("select");
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);
  }
  setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener("click", this.clickHandler);
    this.$arrow = this.$el.querySelector('[data-type="arrow"]');
    this.$value = this.$el.querySelector('[data-type="value"]');
  }

  clickHandler(e) {
    const { type } = e.target.dataset;
    if (type === "input") {
      this.toggle();
    } else if (type === "item") {
      const id = e.target.dataset.id;
      this.select(id);
    } else if (type === "backdrop") {
      this.close();
    }
  }
  get isOpen() {
    return this.$el.classList.contains("open");
  }
  get current() {
    return this.options.data.find((item) => (item.id = this.selectedId));
  }
  select(id) {
    this.selectedId = id;
    this.$value.textContent = this.current.value;
    this.$el
      .querySelectorAll('[data-type="item"]')
      .forEach((el) => el.classList.remove("selected"));
    this.$el.querySelector(`[data-id="${id}"]`).classList.add("selected");
    this.options.onSelect ? this.options.onSelect(this.current) : null;
    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }
  open() {
    this.$el.classList.add("open");
    this.$arrow.classList.add("open");
  }

  close() {
    this.$el.classList.remove("open");
    this.$arrow.classList.remove("open");
  }
  destroy() {
    this.$el.removeEventListener("click", this.clickHandler);
    this.$el.innerHTML = "";
  }
}

const select = new Select("#select", {
  placeholder: "chose element",
  selectedId: "1",
  data: [
    { id: "1", value: "list element 1" },
    { id: "2", value: "list element 2" },
    { id: "3", value: "list element 3" },
    { id: "4", value: "list element 4" },
    { id: "5", value: "list element 5" },
    { id: "6", value: "list element 6" },
  ],
  onSelect(item) {
    const input = document.querySelector(".hidden_input");

    input.value = item.value;
  },
});
