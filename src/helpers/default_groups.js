import { groups, Task } from "../app.js";
import { RENDER_NAV_BAR_GROUPS } from "../dom/dom.js";

window.localStorage.clear();

if (window.localStorage.length === 0) {
  // <-school->
  const DEFAULT_SCHOOL_GROUP = (() => {
    groups.school = [];
    groups.school.push(new Task("math"));
    groups.school.push(new Task("science"));
    groups.school.push(new Task("history"));
  })();

  // <-gym->
  const DEFAULT_GYM_GROUP = (() => {
    groups.gym = [];
    groups.gym.push(new Task("chest"));
    groups.gym.push(new Task("back"));
    groups.gym.push(new Task("legs"));
  })();

  // <********>
  const DEFAULT_GYM_GROUP1 = (() => {
    groups.a = [];
    groups.gym.push(new Task("chest"));
    groups.gym.push(new Task("back"));
    groups.gym.push(new Task("legs"));
  })();

  const DEFAULT_GYM_GROUP2 = (() => {
    groups.b = [];
    groups.gym.push(new Task("chest"));
    groups.gym.push(new Task("back"));
    groups.gym.push(new Task("legs"));
  })();

  const DEFAULT_GYM_GROUP3 = (() => {
    groups.c = [];
    groups.gym.push(new Task("chest"));
    groups.gym.push(new Task("back"));
    groups.gym.push(new Task("legs"));
  })();

  const DEFAULT_GYM_GROUP4 = (() => {
    groups.d = [];
    groups.gym.push(new Task("chest"));
    groups.gym.push(new Task("back"));
    groups.gym.push(new Task("legs"));
  })();

  const DEFAULT_GYM_GROUP5 = (() => {
    groups.e = [];
    groups.gym.push(new Task("chest"));
    groups.gym.push(new Task("back"));
    groups.gym.push(new Task("legs"));
  })();

  const DEFAULT_GYM_GROUP6 = (() => {
    groups.f = [];
    groups.gym.push(new Task("chest"));
    groups.gym.push(new Task("back"));
    groups.gym.push(new Task("legs"));
  })();
  // <********>

  RENDER_NAV_BAR_GROUPS();
  window.localStorage.setItem("groups", JSON.stringify(groups));
} else {
  RENDER_NAV_BAR_GROUPS();
}
