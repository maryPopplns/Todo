import { groups, Task } from "../app.js";
import { RENDER_NAV_BAR_GROUPS } from "../dom/dom.js";

if (window.localStorage.length === 0) {
  const SCHOOL = ["math", "science", "history"];
  const GYM = ["chest", "back", "legs"];
  const CODING = ["git", "javascript", "python"];
  const GROCERIES = ["apples", "bananas", "milk"];
  const MOVIES = ["fight club", "star wars", "jaws"];
  const CANDY = ["chocolate", "snickers", "sour patch kids"];
  const DISTRO = ["ubuntu", "debian", "arch"];

  const DEFAULT_ITERATOR = (name, tasks) => {
    groups[name] = [];
    for (let i = 0; i < 3; i++) {
      groups[name].push(new Task(tasks[i]));
    }
  };
  DEFAULT_ITERATOR("school", SCHOOL);
  DEFAULT_ITERATOR("gym", GYM);
  DEFAULT_ITERATOR("coding", CODING);
  DEFAULT_ITERATOR("groceries", GROCERIES);
  DEFAULT_ITERATOR("movies", MOVIES);
  DEFAULT_ITERATOR("candy", CANDY);
  DEFAULT_ITERATOR("distro", DISTRO);

  window.localStorage.clear();

  RENDER_NAV_BAR_GROUPS();
  window.localStorage.setItem("groups", JSON.stringify(groups));
} else {
  RENDER_NAV_BAR_GROUPS();
}
