let groups = [];

const Group_class = (input_label) => {
  let tasks = [];
  let task_count = 0;

  const Task_class = (
    input_title = "",
    input_due_date = "",
    input_notes = ""
  ) => {
    const COUNT = task_count;

    const GET_COUNT = () => COUNT;
    const GET_TITLE = () => input_title;
    const GET_DUE_DATE = () => input_due_date;
    const GET_INPUT_NOTES = () => input_notes;

    return { GET_COUNT, GET_TITLE, GET_DUE_DATE, GET_INPUT_NOTES };
  };

  const GET_TASKS = () => tasks;
  const GET_LABEL = () => input_label;
  const ADD_TASK = (input_title, input_due_date, input_notes) => {
    const NEW_TASK = Task_class(input_title, input_due_date, input_notes);
    tasks.push(NEW_TASK);
    task_count++;
  };

  return { GET_LABEL, GET_TASKS, ADD_TASK };
};
