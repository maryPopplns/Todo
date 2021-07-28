const EVENT_LISTENERS = () => {
  // <-hamburger menu->
  const MENU_BUTTON = document.getElementById("hamburger_menu_button");
  MENU_BUTTON.addEventListener("click", () => {
    const NAV_MENU = document.getElementById("nav_container");
    NAV_MENU.style.display = "block";
    MENU_BUTTON.style.display = "none";
  });

  // <-due days->
};

export { EVENT_LISTENERS };
