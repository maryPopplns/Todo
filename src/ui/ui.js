const HEADER = () => {
  const HEADER_CONTAINER = document.createElement("header");
  const NAV_BAR_TOGGLE = document.createElement("button");
  const NAV_BAR_TEXT = document.createElement("h1");

  NAV_BAR_TOGGLE.id = "nav_bar_toggle";
  NAV_BAR_TEXT.innerText = "Task Master";

  document.body.append(HEADER_CONTAINER);
  HEADER_CONTAINER.append(NAV_BAR_TOGGLE);
  HEADER_CONTAINER.append(NAV_BAR_TEXT);
};

export { HEADER };
