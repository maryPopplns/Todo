/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDViIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IGdyb3VwcyA9IFtdO1xuXG5jb25zdCBHcm91cF9jbGFzcyA9IChpbnB1dF9sYWJlbCkgPT4ge1xuICBsZXQgdGFza3MgPSBbXTtcbiAgbGV0IHRhc2tfY291bnQgPSAwO1xuXG4gIGNvbnN0IFRhc2tfY2xhc3MgPSAoXG4gICAgaW5wdXRfdGl0bGUgPSBcIlwiLFxuICAgIGlucHV0X2R1ZV9kYXRlID0gXCJcIixcbiAgICBpbnB1dF9ub3RlcyA9IFwiXCJcbiAgKSA9PiB7XG4gICAgY29uc3QgQ09VTlQgPSB0YXNrX2NvdW50O1xuXG4gICAgY29uc3QgR0VUX0NPVU5UID0gKCkgPT4gQ09VTlQ7XG4gICAgY29uc3QgR0VUX1RJVExFID0gKCkgPT4gaW5wdXRfdGl0bGU7XG4gICAgY29uc3QgR0VUX0RVRV9EQVRFID0gKCkgPT4gaW5wdXRfZHVlX2RhdGU7XG4gICAgY29uc3QgR0VUX0lOUFVUX05PVEVTID0gKCkgPT4gaW5wdXRfbm90ZXM7XG5cbiAgICByZXR1cm4geyBHRVRfQ09VTlQsIEdFVF9USVRMRSwgR0VUX0RVRV9EQVRFLCBHRVRfSU5QVVRfTk9URVMgfTtcbiAgfTtcblxuICBjb25zdCBHRVRfVEFTS1MgPSAoKSA9PiB0YXNrcztcbiAgY29uc3QgR0VUX0xBQkVMID0gKCkgPT4gaW5wdXRfbGFiZWw7XG4gIGNvbnN0IEFERF9UQVNLID0gKGlucHV0X3RpdGxlLCBpbnB1dF9kdWVfZGF0ZSwgaW5wdXRfbm90ZXMpID0+IHtcbiAgICBjb25zdCBORVdfVEFTSyA9IFRhc2tfY2xhc3MoaW5wdXRfdGl0bGUsIGlucHV0X2R1ZV9kYXRlLCBpbnB1dF9ub3Rlcyk7XG4gICAgdGFza3MucHVzaChORVdfVEFTSyk7XG4gICAgdGFza19jb3VudCsrO1xuICB9O1xuXG4gIHJldHVybiB7IEdFVF9MQUJFTCwgR0VUX1RBU0tTLCBBRERfVEFTSyB9O1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=