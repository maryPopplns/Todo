import { differenceInDays } from "date-fns";
import {
  ADD_GROUP_INPUT_HANDLER,
  REMOVE_CURRENT_GROUP,
  RENDER_NAV_BAR_GROUPS,
  RENDER_GROUP,
  RENDER_ADD_TASK_BUTTON,
  RENDER_ADD_TASK_FORM,
  REMOVE_ADD_TASK_FORM,
  RENDER_TASK,
} from "./dom.js";
import { groups, Task, SET_STORAGE } from "../app.js";
import { DUE_TODAY_HANDLER } from "../helpers/due_today.js";
import { HIGH_PRIORITY_HANDLER } from "../helpers/high_priority.js";

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
      const CURRRENT_CONTAINER = document.getElementById("task_form_container");

      if (CURRRENT_CONTAINER === null) {
        document.getElementById("add_group").style.display = "none";
        document.getElementById("add_group_form").style.display = "flex";
        document.getElementById("add_group_input").focus();
      }
    });
  })();

  const CANCEL_NEW_GROUP_ICON = (() => {
    const CANCEL_BUTTON = document.getElementById("cancel_group_icon");

    CANCEL_BUTTON.addEventListener("click", () => {
      const CURRRENT_CONTAINER = document.getElementById("task_form_container");

      if (CURRRENT_CONTAINER === null) {
        document.getElementById("add_group").style.display = "flex";
        document.getElementById("add_group_form").style.display = "none";
      }
    });
  })();

  const SUBMIT_NEW_GROUP_ICON = (() => {
    const SUBMIT_BUTTON = document.getElementById("submit_group_icon");

    SUBMIT_BUTTON.addEventListener("click", () => {
      const CURRRENT_CONTAINER = document.getElementById("task_form_container");

      if (CURRRENT_CONTAINER === null) {
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
      }
    });
  })();

  const GROUP_INPUT_VALIDATION = (() => {
    const INPUT_FIELD = document.getElementById("add_group_input");

    INPUT_FIELD.addEventListener("keyup", () => {
      const INPUT_TEXT = INPUT_FIELD.value;
      const GROUPS = Object.keys(groups);

      if (GROUPS.includes(INPUT_TEXT)) {
        INPUT_FIELD.style.backgroundColor = "#984141";
        document.getElementById("submit_group_icon").style.visibility =
          "hidden";
      } else {
        INPUT_FIELD.style.backgroundColor = "white";
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
    GROUP_CONTAINER.style.backgroundColor = "#984141";
  });

  input_element.addEventListener("mouseleave", (event) => {
    const TARGET_DATA_GROUP = event.target.getAttribute("data-group");
    const GROUP_CONTAINER = document.querySelector(
      `[data-group-container=${TARGET_DATA_GROUP}]`
    );
    GROUP_CONTAINER.style.backgroundColor = "#28bda7";
  });

  input_element.addEventListener("click", (event) => {
    const CURRRENT_CONTAINER = document.getElementById("task_form_container");

    if (CURRRENT_CONTAINER === null) {
      const TARGET_DATA_GROUP = event.target.getAttribute("data-group");
      delete groups[TARGET_DATA_GROUP];
      RENDER_NAV_BAR_GROUPS();
      SET_STORAGE();
    }
  });
};

const ATTACH_RENDER_GROUP_LISTENER = (input_element) => {
  input_element.addEventListener("click", (event) => {
    const CURRRENT_CONTAINER = document.getElementById("task_form_container");

    if (CURRRENT_CONTAINER === null) {
      REMOVE_CURRENT_GROUP();
      RENDER_GROUP(event);
    }
  });
};

const ATTACH_ADD_TASK_LISTENER = (element) => {
  element.addEventListener("click", (event) => {
    const GROUP_NAME = event.currentTarget.getAttribute("data-add-task");
    RENDER_ADD_TASK_FORM(GROUP_NAME);
  });
};

const CANCEL_ADD_TASK = (cancel_icon) => {
  cancel_icon.addEventListener("click", () => {
    REMOVE_ADD_TASK_FORM();
  });
};

const APPLY_ADD_TASK = (apply_icon) => {
  apply_icon.addEventListener("click", () => {
    const GROUP_NAME = document
      .getElementById("task_form_container")
      .getAttribute("data-group");
    const LABEL_VALUE = document.getElementById("label_input").value;
    const PRIORITY_VALUE = document.getElementById("priority_input").value;
    const DUE_DATE_VALUE = document.getElementById("due_date_input").value;
    const NOTES_VALUE = document.getElementById("notes_input").value;

    const YEAR = DUE_DATE_VALUE.slice(0, 4);
    const MONTH = DUE_DATE_VALUE.slice(5, 7);
    const DAY = DUE_DATE_VALUE.slice(8, 10);
    let due;
    DUE_DATE_VALUE === "" ? (due = "") : (due = `${YEAR}_${MONTH}_${DAY}`);

    const NEW_TASK = new Task(LABEL_VALUE, PRIORITY_VALUE, due, NOTES_VALUE);

    groups[GROUP_NAME].push(NEW_TASK);

    REMOVE_ADD_TASK_FORM();
    REMOVE_CURRENT_GROUP();
    RENDER_GROUP(null, GROUP_NAME);
    SET_STORAGE();
  });
};

const ATTACH_DELETE_TASK_LISTENER = (icon) => {
  icon.addEventListener("click", (event) => {
    const TASK_ID = event.target.id;
    let group;
    for (let prop in groups) {
      groups[prop].map((task) => {
        if (task.id === TASK_ID) {
          group = prop;
        }
      });
      groups[prop] = groups[prop].filter((task) => task.id !== TASK_ID);
    }
    if (document.getElementById("header").innerText === "Due today") {
      DUE_TODAY_HANDLER();
    } else if (
      document.getElementById("header").innerText === "High Priority"
    ) {
      HIGH_PRIORITY_HANDLER();
    } else {
      REMOVE_CURRENT_GROUP();
      RENDER_GROUP(null, group);
    }
    SET_STORAGE();
  });
};

const ATTACH_DUE_TODAY_LISTENER = (due_today_element) => {
  due_today_element.addEventListener("click", DUE_TODAY_HANDLER);
};

const ATTACH_HIGH_PRIORITY_LISTENER = (high_priority_element) => {
  high_priority_element.addEventListener("click", HIGH_PRIORITY_HANDLER);
};

export {
  EVENT_LISTENERS,
  ATTACH_DELETE_GROUP_LISTENER,
  ATTACH_RENDER_GROUP_LISTENER,
  CANCEL_ADD_TASK,
  APPLY_ADD_TASK,
  ATTACH_ADD_TASK_LISTENER,
  ATTACH_DELETE_TASK_LISTENER,
  ATTACH_DUE_TODAY_LISTENER,
  ATTACH_HIGH_PRIORITY_LISTENER,
};
