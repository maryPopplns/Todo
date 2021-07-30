import { groups } from "../app.js";
import {
  ATTACH_DELETE_GROUP_LISTENER,
  ATTACH_RENDER_GROUP_LISTENER,
} from "./event_listeners.js";

const META_DATA = () => {
  const FONT_AWESOME = document.createElement("link");

  FONT_AWESOME.setAttribute("rel", "stylesheet");
  FONT_AWESOME.setAttribute(
    "href",
    "https://use.fontawesome.com/releases/v5.15.3/css/all.css"
  );
  FONT_AWESOME.setAttribute(
    "integrity",
    "sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk"
  );
  FONT_AWESOME.setAttribute("crossorigin", "anonymous");

  document.head.append(FONT_AWESOME);
};

const MENU_BUTTON = () => {
  const HAMBURGER_MENU_BUTTON = document.createElement("button");
  const HAMBURGER_BUTTON_ICON = document.createElement("i");

  HAMBURGER_MENU_BUTTON.id = "hamburger_menu_button";
  HAMBURGER_BUTTON_ICON.classList = "fas fa-align-justify";

  document.body.append(HAMBURGER_MENU_BUTTON);
  HAMBURGER_MENU_BUTTON.append(HAMBURGER_BUTTON_ICON);
};

const HEADER = () => {
  const HEADER_CONTAINER = document.createElement("header");
  const NAV_BAR_TEXT = document.createElement("h1");

  NAV_BAR_TEXT.innerText = "Task Master";

  document.body.append(HEADER_CONTAINER);
  HEADER_CONTAINER.append(NAV_BAR_TEXT);
};

const NAV_BAR = () => {
  const MAIN = document.createElement("main");
  const NAV_CONTAINER = document.createElement("nav");
  const DUE_CONTAINER = document.createElement("ol");
  const DUE_HEADING = document.createElement("h2");
  const DUE_TODAY = document.createElement("li");
  const DUE_THIS_WEEK = document.createElement("li");
  const DUE_THIS_MONTH = document.createElement("li");
  const GROUP_CONTAINER = document.createElement("div");
  const GROUP_HEADING = document.createElement("h2");
  const GROUP_LIST = document.createElement("ol");

  NAV_CONTAINER.id = "nav_container";
  DUE_CONTAINER.id = "due_container";
  DUE_HEADING.id = "due_heading";
  DUE_TODAY.id = "due_today";
  DUE_THIS_WEEK.id = "due_this_week";
  DUE_THIS_MONTH.id = "due_this_month";
  GROUP_CONTAINER.id = "group_container";
  GROUP_HEADING.id = "group_heading";
  GROUP_LIST.id = "task_group_container";

  const TIME_PERIOD_VIEW = [DUE_TODAY, DUE_THIS_WEEK, DUE_THIS_MONTH].map(
    (element) => (element.classList = "time_periods")
  );

  DUE_HEADING.innerText = "Due";
  DUE_TODAY.innerText = "Today";
  DUE_THIS_WEEK.innerText = "Week";
  DUE_THIS_MONTH.innerText = "Month";
  GROUP_HEADING.innerText = "Groups";

  document.body.append(MAIN);
  MAIN.append(NAV_CONTAINER);
  NAV_CONTAINER.append(DUE_CONTAINER);
  DUE_CONTAINER.append(DUE_HEADING);
  DUE_CONTAINER.append(DUE_TODAY);
  DUE_CONTAINER.append(DUE_THIS_WEEK);
  DUE_CONTAINER.append(DUE_THIS_MONTH);
  NAV_CONTAINER.append(GROUP_CONTAINER);
  GROUP_CONTAINER.append(GROUP_HEADING);
  GROUP_CONTAINER.append(GROUP_LIST);

  const ADD_GROUP_BUTTON = (() => {
    const ADD_GROUP_BUTTON = document.createElement("button");
    const ADD_GROUP_PLUS_ICON = document.createElement("i");

    ADD_GROUP_BUTTON.id = "add_group";
    ADD_GROUP_BUTTON.innerText = "group";
    ADD_GROUP_PLUS_ICON.id = "add_group_plus_sign";
    ADD_GROUP_PLUS_ICON.classList = "fas fa-plus-circle";

    document.getElementById("group_container").append(ADD_GROUP_BUTTON);
    ADD_GROUP_BUTTON.prepend(ADD_GROUP_PLUS_ICON);
  })();
};

const RENDER_NAV_BAR_GROUPS = () => {
  const REMOVE_ALL_GROUPS = [
    ...document.getElementById("task_group_container").children,
  ].map((node) => node.remove());

  const GROUPS_CONTAINER = document.getElementById("task_group_container");
  for (let prop in groups) {
    const GROUP = document.createElement("li");
    const TEXT = document.createElement("h3");
    const TRASH = document.createElement("i");

    GROUP.setAttribute("data-group-container", prop);
    GROUP.classList = "nav_bar_group";
    TEXT.setAttribute("data-group-text", prop);
    TEXT.innerText = prop;
    TEXT.classList = "individual_group_heading";
    TRASH.classList = "delete_group fa fa-trash";
    TRASH.setAttribute("data-group", prop);
    TRASH.setAttribute("aria-hidden", "true");

    ATTACH_DELETE_GROUP_LISTENER(TRASH);
    ATTACH_RENDER_GROUP_LISTENER(TEXT);

    GROUPS_CONTAINER.append(GROUP);
    GROUP.append(TEXT);
    GROUP.append(TRASH);
  }
};

const ADD_GROUP_INPUT = () => {
  const GROUP_CONTAINER = document.getElementById("group_container");
  const FORM = document.createElement("form");
  const CANCEL = document.createElement("i");
  const INPUT = document.createElement("input");
  const SUBMIT = document.createElement("i");

  FORM.id = "add_group_form";
  CANCEL.id = "cancel_group_icon";
  CANCEL.classList = "fas fa-window-close";
  INPUT.id = "add_group_input";
  SUBMIT.classList = "fas fa-sign-in-alt";
  SUBMIT.id = "submit_group_icon";

  GROUP_CONTAINER.append(FORM);
  FORM.append(CANCEL);
  FORM.append(INPUT);
  FORM.append(SUBMIT);
};

const RENDER_TASK = (task, tasks_container) => {
  const TASK_CONTAINER = document.createElement("div");

  TASK_CONTAINER.classList = "task";

  tasks_container.append(TASK_CONTAINER);
};

const REMOVE_CURRENT_GROUP = () => {
  console.log("remove");
};

export {
  HEADER,
  META_DATA,
  NAV_BAR,
  MENU_BUTTON,
  RENDER_NAV_BAR_GROUPS,
  ADD_GROUP_INPUT,
  RENDER_TASK,
  REMOVE_CURRENT_GROUP,
};
