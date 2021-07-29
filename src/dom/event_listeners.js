import { ADD_GROUP_INPUT_HANDLER } from "./dom.js";
import { groups } from "../app.js";

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

  const ADD_GROUP_BUTTON = (() => {
    const ADD_BUTTON = document.getElementById("add_group");
    ADD_BUTTON.addEventListener("click", () => {
      document.getElementById("add_group").style.display = "none";
      document.getElementById("add_group_form").style.display = "flex";
      document.getElementById("add_group_input").focus();
    });
  })();

  const CANCEL_NEW_GROUP_ICON = (() => {
    const CANCEL_BUTTON = document.getElementById("cancel_group_icon");
    CANCEL_BUTTON.addEventListener("click", () => {
      document.getElementById("add_group").style.display = "flex";
      document.getElementById("add_group_form").style.display = "none";
    });
  })();

  const SUBMIT_NEW_GROUP_ICON = (() => {
    const SUBMIT_BUTTON = document.getElementById("submit_group_icon");
    SUBMIT_BUTTON.addEventListener("click", () => {
      document.getElementById("add_group").style.display = "flex";
      document.getElementById("add_group_form").style.display = "none";
    });
  })();

  const GROUP_INPUT_VALIDATION = (() => {
    const INPUT_FIELD = document.getElementById("add_group_input");
    INPUT_FIELD.addEventListener("keyup", () => {
      const INPUT_TEXT = INPUT_FIELD.value;
      const GROUPS = Object.keys(groups);

      if (GROUPS.includes(INPUT_TEXT)) {
        INPUT_FIELD.style.backgroundColor = "rgb(181, 40, 40)";
        document.getElementById("submit_group_icon").style.display = "none";
      } else {
        INPUT_FIELD.style.backgroundColor = "rgb(35, 179, 129)";
        document.getElementById("submit_group_icon").style.display = "block";
      }
    });
  })();
};

export { EVENT_LISTENERS };
