/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "groups": () => (/* binding */ groups)
/* harmony export */ });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7O0FDTkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWOztBQUVrQiIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJsZXQgZ3JvdXBzID0gW107XG5cbmNvbnN0IEdyb3VwX2NsYXNzID0gKGlucHV0X2xhYmVsKSA9PiB7XG4gIGxldCB0YXNrcyA9IFtdO1xuICBsZXQgdGFza19jb3VudCA9IDA7XG5cbiAgY29uc3QgVGFza19jbGFzcyA9IChcbiAgICBpbnB1dF90aXRsZSA9IFwiXCIsXG4gICAgaW5wdXRfZHVlX2RhdGUgPSBcIlwiLFxuICAgIGlucHV0X25vdGVzID0gXCJcIlxuICApID0+IHtcbiAgICBjb25zdCBDT1VOVCA9IHRhc2tfY291bnQ7XG5cbiAgICBjb25zdCBHRVRfQ09VTlQgPSAoKSA9PiBDT1VOVDtcbiAgICBjb25zdCBHRVRfVElUTEUgPSAoKSA9PiBpbnB1dF90aXRsZTtcbiAgICBjb25zdCBHRVRfRFVFX0RBVEUgPSAoKSA9PiBpbnB1dF9kdWVfZGF0ZTtcbiAgICBjb25zdCBHRVRfSU5QVVRfTk9URVMgPSAoKSA9PiBpbnB1dF9ub3RlcztcblxuICAgIHJldHVybiB7IEdFVF9DT1VOVCwgR0VUX1RJVExFLCBHRVRfRFVFX0RBVEUsIEdFVF9JTlBVVF9OT1RFUyB9O1xuICB9O1xuXG4gIGNvbnN0IEdFVF9UQVNLUyA9ICgpID0+IHRhc2tzO1xuICBjb25zdCBHRVRfTEFCRUwgPSAoKSA9PiBpbnB1dF9sYWJlbDtcbiAgY29uc3QgQUREX1RBU0sgPSAoaW5wdXRfdGl0bGUsIGlucHV0X2R1ZV9kYXRlLCBpbnB1dF9ub3RlcykgPT4ge1xuICAgIGNvbnN0IE5FV19UQVNLID0gVGFza19jbGFzcyhpbnB1dF90aXRsZSwgaW5wdXRfZHVlX2RhdGUsIGlucHV0X25vdGVzKTtcbiAgICB0YXNrcy5wdXNoKE5FV19UQVNLKTtcbiAgICB0YXNrX2NvdW50Kys7XG4gIH07XG5cbiAgcmV0dXJuIHsgR0VUX0xBQkVMLCBHRVRfVEFTS1MsIEFERF9UQVNLIH07XG59O1xuXG5leHBvcnQgeyBncm91cHMgfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=