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
  const NAV_BAR_LIST = document.createElement("ol");
  const DUE_TODAY = document.createElement("li");
  const DUE_THIS_WEEK = document.createElement("li");
  const GROUP_TITLE = document.createElement("h2");
  const GROUP_CONTAINER = document.createElement("ol");
  const GROUP_GROUP = document.createElement("button");
  const PLUS_ICON = document.createElement("i");

  NAV_CONTAINER.id = "nav_container";
  NAV_BAR_LIST.id = "nav_bar_list";
  DUE_TODAY.id = "due_today";
  DUE_THIS_WEEK.id = "due_this_week";
  GROUP_TITLE.id = "group_title";
  GROUP_CONTAINER.id = "task_group_container";
  GROUP_GROUP.id = "add_group";
  PLUS_ICON.id = "add_group_plus_sign";

  const VISIBLE_NAV_ITEMS = [
    DUE_TODAY,
    DUE_THIS_WEEK,
    GROUP_TITLE,
    GROUP_CONTAINER,
    GROUP_GROUP,
  ].map((element) => (element.classList = "nav_item"));
  PLUS_ICON.classList = "fas fa-plus-circle";

  DUE_TODAY.innerText = "Today";
  DUE_THIS_WEEK.innerText = "Week";
  GROUP_TITLE.innerText = "Groups";
  GROUP_GROUP.innerText = "group";

  document.body.append(NAV_CONTAINER);
  NAV_CONTAINER.append(NAV_BAR_LIST);
  NAV_BAR_LIST.append(DUE_TODAY);
  NAV_BAR_LIST.append(DUE_THIS_WEEK);
  NAV_BAR_LIST.append(GROUP_TITLE);
  NAV_BAR_LIST.append(GROUP_CONTAINER);
  NAV_BAR_LIST.append(GROUP_GROUP);
  GROUP_GROUP.prepend(PLUS_ICON);
};

export { HEADER, META_DATA, NAV_BAR, TOGGLE_BUTTON };
