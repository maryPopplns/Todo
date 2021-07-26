const META_DATA = (() => {
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
})();

const HEADER = () => {
  const HEADER_CONTAINER = document.createElement("header");
  const NAV_BAR_TOGGLE = document.createElement("button");
  const NAV_BAR_TEXT = document.createElement("h1");
  const NAV_BAR_ICON = document.createElement("i");

  NAV_BAR_TOGGLE.id = "nav_bar_toggle";
  NAV_BAR_TEXT.innerText = "Task Master";
  NAV_BAR_ICON.classList = "fas fa-align-justify";

  document.body.append(HEADER_CONTAINER);
  HEADER_CONTAINER.append(NAV_BAR_TOGGLE);
  NAV_BAR_TOGGLE.append(NAV_BAR_ICON);
  HEADER_CONTAINER.append(NAV_BAR_TEXT);
};

export { HEADER };
