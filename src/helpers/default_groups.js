import { groups, Task } from "../app.js";
import { RENDER_NAV_BAR_GROUPS } from "../dom/dom.js";

if (window.localStorage.length === 0) {
  // <-school->
  const DEFAULT_SCHOOL_GROUP = (() => {
    const TASKS = ["math", "science", "history"];
    groups.school = [];
    for (let i = 0; i < TASKS.length; i++) {
      groups.school.push(new Task(TASKS[i]));
    }
  })();

  // <-gym->
  const DEFAULT_GYM_GROUP = (() => {
    const TASKS = ["chest", "back", "legs"];
    groups.gym = [];
    for (let i = 0; i < TASKS.length; i++) {
      groups.gym.push(new Task(TASKS[i]));
    }
  })();

  // <-coding->
  const DEFAULT_CODING_GROUP = (() => {
    const TASKS = ["git", "javascript", "python"];
    groups.coding = [];
    for (let i = 0; i < TASKS.length; i++) {
      groups.coding.push(new Task(TASKS[i]));
    }
  })();

  // <-groceries->
  const DEFAULT_GROCERIES_GROUP = (() => {
    const TASKS = ["apples", "bananas", "milk"];
    groups.groceries = [];
    for (let i = 0; i < TASKS.length; i++) {
      groups.groceries.push(new Task(TASKS[i]));
    }
  })();

  RENDER_NAV_BAR_GROUPS();
  window.localStorage.setItem("groups", JSON.stringify(groups));
} else {
  RENDER_NAV_BAR_GROUPS();
}
