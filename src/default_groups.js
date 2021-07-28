import { groups, Group_class } from "./app.js";
import { RENDER_GROUPS } from "./dom/dom.js";

// if local storage has groups saved, load those
// otherwise load default groups

const DEFAULT_SCHOOL_GROUP = () => {
  const GROUP = Group_class("school");

  GROUP.ADD_TASK("math homework");
  GROUP.ADD_TASK("read chapter 2 of History book");
  GROUP.ADD_TASK("write Enlish paper");

  groups.push(GROUP);
};

const DEFAULT_GYM_GROUP = () => {
  const GROUP = Group_class("gym");

  GROUP.ADD_TASK("warm up");
  GROUP.ADD_TASK("train");
  GROUP.ADD_TASK("warm down");

  groups.push(GROUP);
};

DEFAULT_SCHOOL_GROUP();
DEFAULT_GYM_GROUP();

RENDER_GROUPS();
