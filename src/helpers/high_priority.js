import { REMOVE_CURRENT_GROUP, RENDER_TASK } from "../dom/dom.js";
import { groups } from "../app.js";

const HIGH_PRIORITY_HANDLER = () => {
  REMOVE_CURRENT_GROUP();
  document.getElementById("header").innerText = "High Priority";

  const TASKS_CONTAINER = document.createElement("div");
  TASKS_CONTAINER.classList = "tasks_container";

  document.getElementsByTagName("main")[0].append(TASKS_CONTAINER);

  let tasks = [];
  for (let prop in groups) {
    groups[prop].map((task) => {
      if (task.priority === "high") {
        tasks.push(task);
      }
    });
  }
  tasks.map((task) => {
    RENDER_TASK(task, TASKS_CONTAINER);
  });
};

export { HIGH_PRIORITY_HANDLER };
