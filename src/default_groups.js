import { groups } from "./app.js";
import { RENDER_NAV_BAR_GROUPS } from "./dom/dom.js";

if (window.localStorage.length === 0) {
  // <-school->
  const DEFAULT_SCHOOL_GROUP = (() => {})();

  // <-gym->
  const DEFAULT_GYM_GROUP = (() => {})();

  // RENDER_NAV_BAR_GROUPS();
  // window.localStorage.setItem("groups", JSON.stringify(groups));
} else {
  // const LOCAL_STORAGE_GROUPS = JSON.parse(
  //   window.localStorage.getItem("groups")
  // );
  //
  // RENDER_NAV_BAR_GROUPS();
  // <-copy local data to groups->
}
