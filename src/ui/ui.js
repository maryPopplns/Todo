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

const TOGGLE_BUTTON = () => {
  const NAV_BAR_TOGGLE = document.createElement("button");
  const NAV_BAR_ICON = document.createElement("i");

  NAV_BAR_TOGGLE.id = "nav_bar_toggle_button";
  NAV_BAR_ICON.classList = "fas fa-align-justify";

  document.body.append(NAV_BAR_TOGGLE);
  NAV_BAR_TOGGLE.append(NAV_BAR_ICON);
};

const HEADER = () => {
  const HEADER_CONTAINER = document.createElement("header");
  const NAV_BAR_TEXT = document.createElement("h1");

  NAV_BAR_TEXT.innerText = "Task Master";

  document.body.append(HEADER_CONTAINER);
  HEADER_CONTAINER.append(NAV_BAR_TEXT);
};

const NAV_BAR = () => {
  const NAV_CONTAINER = document.createElement("nav");
  const DUE_CONTAINER = document.createElement("ol");
  const DUE_TODAY = document.createElement("li");
  const DUE_THIS_WEEK = document.createElement("li");
  const DUE_THIS_MONTH = document.createElement("li");
  const GROUP_CONTAINER = document.createElement("div");
  const GROUP_LIST = document.createElement("ol");
  const ADD_GROUP_BUTTON = document.createElement("button");
  const ADD_GROUP_PLUS_ICON = document.createElement("i");

  NAV_CONTAINER.id = "nav_container";
  DUE_CONTAINER.id = "due_container";
  DUE_TODAY.id = "due_today";
  DUE_THIS_WEEK.id = "due_this_week";
  DUE_THIS_MONTH.id = "due_this_month";
  GROUP_CONTAINER.id = "group_container";
  GROUP_LIST.id = "task_group_container";
  ADD_GROUP_BUTTON.id = "add_group";
  ADD_GROUP_PLUS_ICON.id = "add_group_plus_sign";

  const TIME_PERIOD_VIEW = [DUE_TODAY, DUE_THIS_WEEK, DUE_THIS_MONTH].map(
    (element) => (element.classList = "time_periods")
  );
  ADD_GROUP_PLUS_ICON.classList = "fas fa-plus-circle";

  DUE_TODAY.innerText = "Today";
  DUE_THIS_WEEK.innerText = "Week";
  DUE_THIS_MONTH.innerText = "Month";
  ADD_GROUP_BUTTON.innerText = "group";

  document.body.append(NAV_CONTAINER);
  NAV_CONTAINER.append(DUE_CONTAINER);
  DUE_CONTAINER.append(DUE_TODAY);
  DUE_CONTAINER.append(DUE_THIS_WEEK);
  DUE_CONTAINER.append(DUE_THIS_MONTH);
  NAV_CONTAINER.append(GROUP_CONTAINER);
  GROUP_CONTAINER.append(GROUP_LIST);
  GROUP_CONTAINER.append(ADD_GROUP_BUTTON);
  ADD_GROUP_BUTTON.prepend(ADD_GROUP_PLUS_ICON);
};

export { HEADER, META_DATA, NAV_BAR, TOGGLE_BUTTON };