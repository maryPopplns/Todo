import { ADD_GROUP_INPUT_HANDLER } from "./dom.js";

const EVENT_LISTENERS = () => {
  const HAMBURGER_MENU = (() => {
    const MENU_BUTTON = document.getElementById("hamburger_menu_button");
    MENU_BUTTON.addEventListener("click", () => {
      const NAV_MENU = document.getElementById("nav_container");
      NAV_MENU.style.display = "block";
      MENU_BUTTON.style.display = "none";
    });
  })();

  // <-due days->

  const ADD_GROUP = (() => {
    const ADD_BUTTON = document.getElementById("add_group");
    ADD_BUTTON.addEventListener("click", ADD_GROUP_INPUT_HANDLER);
  })();
};

export { EVENT_LISTENERS };
