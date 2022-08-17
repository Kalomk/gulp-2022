function accordion() {
  const items = document.querySelectorAll(".accordion_item-trigger");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      const parent = item.parentNode;
      if (parent.classList.contains("accordion_item-active")) {
        parent.classList.remove("accordion_item-active");
      } else {
        document
          .querySelectorAll(".accordion_item")
          .forEach((child) => child.classList.remove("accordion_item-active"));
        parent.classList.add("accordion_item-active");
      }
    });
  });
}
accordion();
