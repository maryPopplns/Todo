let groups = {};

if (window.localStorage.length !== 0) {
  const LOCAL_STORAGE_GROUPS = JSON.parse(
    window.localStorage.getItem("groups")
  );
  groups = LOCAL_STORAGE_GROUPS;
}

window.localStorage.clear();

const SET_STORAGE = () => {
  window.localStorage.clear();
  window.localStorage.setItem("groups", JSON.stringify(groups));
};

const Task = class {
  constructor(label = "", priority = "low", due_date = "", notes = "") {
    this.label = label;
    this.priority = priority;
    this.due_date = due_date;
    this.notes = notes;
    this.date_created = new Date().getTime();
  }
};

export { groups, SET_STORAGE, Task };
