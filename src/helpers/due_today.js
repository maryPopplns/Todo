import { REMOVE_CURRENT_GROUP, RENDER_TASK } from "../dom/dom.js";
import { differenceInDays } from "date-fns";
import { groups } from "../app.js";

const DUE_TODAY_HANDLER = () => {
  document.getElementById("header").innerText = "Due today";
  REMOVE_CURRENT_GROUP();
  let tasks = [];

  const TASKS_CONTAINER = document.createElement("div");
  TASKS_CONTAINER.classList = "tasks_container";

  document.getElementsByTagName("main")[0].append(TASKS_CONTAINER);

  for (let prop in groups) {
    groups[prop].map((task) => {
      const DUE_DATE = task.due_date;
      const YEAR = DUE_DATE.slice(0, 4);
      const MONTH = DUE_DATE.slice(5, 7);
      const DAY = DUE_DATE.slice(8, 10);

      const DIFFERENCE = differenceInDays(
        new Date(YEAR, MONTH - 1, DAY),
        new Date()
      );
      if (DIFFERENCE === 0) {
        tasks.push(task);
      }
    });
  }

  tasks.map((task) => {
    RENDER_TASK(task, TASKS_CONTAINER);
  });
};

export { DUE_TODAY_HANDLER };
