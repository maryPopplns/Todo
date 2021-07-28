let groups = [];

const Group_class = (input_label) => {
  let label = input_label;
  let notes = [];

  const Note_class = (input_title, input_due_date) => {
    let title = input_title;
    let due_date = input_due_date;

    const GET_TITLE = () => title;
    const GET_DUE_DATE = () => due_date;

    return { GET_TITLE, GET_DUE_DATE };
  };

  const GET_NOTES = () => notes;
  const GET_LABEL = () => label;
  const CHANGE_LABEL = (input_label) => (label = input_label);

  return { GET_LABEL, GET_NOTES, CHANGE_LABEL };
};
