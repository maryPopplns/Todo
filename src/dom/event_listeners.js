import {
  ADD_GROUP_INPUT_HANDLER,
  REMOVE_CURRENT_GROUP,
  RENDER_NAV_BAR_GROUPS,
  RENDER_TASK,
  RENDER_ADD_TASK_BUTTON,
} from "./dom.js";
import { groups, SET_STORAGE } from "../app.js";

const EVENT_LISTENERS = () => {
  const HAMBURGER_MENU = (() => {
    const MENU_BUTTON = document.getElementById("hamburger_menu_button");

    MENU_BUTTON.addEventListener("click", () => {
      const NAV_MENU = document.getElementById("nav_container");
      NAV_MENU.style.display = "block";
      MENU_BUTTON.style.display = "none";
    });
  })();

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
      const INPUT_TEXT = document.getElementById("add_group_input").value;
      const INPUT_FIELD = document.getElementById("add_group_input");
      if (INPUT_TEXT === "") {
        INPUT_FIELD.style.backgroundColor = "rgb(181, 40, 40)";
      } else {
        groups[INPUT_TEXT] = [];
        INPUT_FIELD.value = "";
        RENDER_NAV_BAR_GROUPS();
        document.getElementById("add_group").style.display = "flex";
        document.getElementById("add_group_form").style.display = "none";
        SET_STORAGE();
      }
    });
  })();

  const GROUP_INPUT_VALIDATION = (() => {
    const INPUT_FIELD = document.getElementById("add_group_input");

    INPUT_FIELD.addEventListener("keyup", () => {
      const INPUT_TEXT = INPUT_FIELD.value;
      const GROUPS = Object.keys(groups);

      if (GROUPS.includes(INPUT_TEXT)) {
        INPUT_FIELD.style.backgroundColor = "rgb(181, 40, 40)";
        document.getElementById("submit_group_icon").style.visibility =
          "hidden";
      } else {
        INPUT_FIELD.style.backgroundColor = "rgb(35, 179, 129)";
        document.getElementById("submit_group_icon").style.visibility =
          "visible";
      }
    });
  })();
};

const ATTACH_DELETE_GROUP_LISTENER = (input_element) => {
  input_element.addEventListener("mouseenter", (event) => {
    const TARGET_DATA_GROUP = event.target.getAttribute("data-group");
    const GROUP_CONTAINER = document.querySelector(
      `[data-group-container=${TARGET_DATA_GROUP}]`
    );
    GROUP_CONTAINER.style.backgroundColor = "#9b2525e6";
  });

  input_element.addEventListener("mouseleave", (event) => {
    const TARGET_DATA_GROUP = event.target.getAttribute("data-group");
    const GROUP_CONTAINER = document.querySelector(
      `[data-group-container=${TARGET_DATA_GROUP}]`
    );
    GROUP_CONTAINER.style.backgroundColor = "#28bda7";
  });

  input_element.addEventListener("click", (event) => {
    const TARGET_DATA_GROUP = event.target.getAttribute("data-group");
    delete groups[TARGET_DATA_GROUP];
    RENDER_NAV_BAR_GROUPS();
    SET_STORAGE();
  });
};

const ATTACH_RENDER_GROUP_LISTENER = (input_element) => {
  input_element.addEventListener("click", (event) => {
    REMOVE_CURRENT_GROUP();

    const GROUP_NAME = event.target.getAttribute("data-group-text");
    const TASKS_CONTAINER = document.createElement("div");

    RENDER_ADD_TASK_BUTTON(GROUP_NAME, TASKS_CONTAINER);

    const TASKS = groups[GROUP_NAME].map((task) => {
      RENDER_TASK(task, TASKS_CONTAINER);
    });

    TASKS_CONTAINER.classList = "tasks_container";
    TASKS_CONTAINER.setAttribute("data-group-tasks", GROUP_NAME);

    document.getElementsByTagName("main")[0].append(TASKS_CONTAINER);
  });
};

export {
  EVENT_LISTENERS,
  ATTACH_DELETE_GROUP_LISTENER,
  ATTACH_RENDER_GROUP_LISTENER,
};
