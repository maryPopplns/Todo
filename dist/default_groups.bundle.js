/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/default_groups.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.js */ "./src/app.js");


_app_js__WEBPACK_IMPORTED_MODULE_0__.groups.push("one");
_app_js__WEBPACK_IMPORTED_MODULE_0__.groups.push("two");
_app_js__WEBPACK_IMPORTED_MODULE_0__.groups.push("three");

console.log(_app_js__WEBPACK_IMPORTED_MODULE_0__.groups);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9kZWZhdWx0X2dyb3Vwcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7QUFDVjs7QUFFa0I7Ozs7Ozs7VUNoQ2xCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7O0FDTmtDOztBQUVsQyxnREFBVztBQUNYLGdEQUFXO0FBQ1gsZ0RBQVc7O0FBRVgsWUFBWSwyQ0FBTSIsImZpbGUiOiJkZWZhdWx0X2dyb3Vwcy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgZ3JvdXBzID0gW107XG5cbmNvbnN0IEdyb3VwX2NsYXNzID0gKGlucHV0X2xhYmVsKSA9PiB7XG4gIGxldCB0YXNrcyA9IFtdO1xuICBsZXQgdGFza19jb3VudCA9IDA7XG5cbiAgY29uc3QgVGFza19jbGFzcyA9IChcbiAgICBpbnB1dF90aXRsZSA9IFwiXCIsXG4gICAgaW5wdXRfZHVlX2RhdGUgPSBcIlwiLFxuICAgIGlucHV0X25vdGVzID0gXCJcIlxuICApID0+IHtcbiAgICBjb25zdCBDT1VOVCA9IHRhc2tfY291bnQ7XG5cbiAgICBjb25zdCBHRVRfQ09VTlQgPSAoKSA9PiBDT1VOVDtcbiAgICBjb25zdCBHRVRfVElUTEUgPSAoKSA9PiBpbnB1dF90aXRsZTtcbiAgICBjb25zdCBHRVRfRFVFX0RBVEUgPSAoKSA9PiBpbnB1dF9kdWVfZGF0ZTtcbiAgICBjb25zdCBHRVRfSU5QVVRfTk9URVMgPSAoKSA9PiBpbnB1dF9ub3RlcztcblxuICAgIHJldHVybiB7IEdFVF9DT1VOVCwgR0VUX1RJVExFLCBHRVRfRFVFX0RBVEUsIEdFVF9JTlBVVF9OT1RFUyB9O1xuICB9O1xuXG4gIGNvbnN0IEdFVF9UQVNLUyA9ICgpID0+IHRhc2tzO1xuICBjb25zdCBHRVRfTEFCRUwgPSAoKSA9PiBpbnB1dF9sYWJlbDtcbiAgY29uc3QgQUREX1RBU0sgPSAoaW5wdXRfdGl0bGUsIGlucHV0X2R1ZV9kYXRlLCBpbnB1dF9ub3RlcykgPT4ge1xuICAgIGNvbnN0IE5FV19UQVNLID0gVGFza19jbGFzcyhpbnB1dF90aXRsZSwgaW5wdXRfZHVlX2RhdGUsIGlucHV0X25vdGVzKTtcbiAgICB0YXNrcy5wdXNoKE5FV19UQVNLKTtcbiAgICB0YXNrX2NvdW50Kys7XG4gIH07XG5cbiAgcmV0dXJuIHsgR0VUX0xBQkVMLCBHRVRfVEFTS1MsIEFERF9UQVNLIH07XG59O1xuXG5leHBvcnQgeyBncm91cHMgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ3JvdXBzIH0gZnJvbSBcIi4vYXBwLmpzXCI7XG5cbmdyb3Vwcy5wdXNoKFwib25lXCIpO1xuZ3JvdXBzLnB1c2goXCJ0d29cIik7XG5ncm91cHMucHVzaChcInRocmVlXCIpO1xuXG5jb25zb2xlLmxvZyhncm91cHMpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==