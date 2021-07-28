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
/* harmony export */   "groups": () => (/* binding */ groups),
/* harmony export */   "Group_class": () => (/* binding */ Group_class)
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




/***/ }),

/***/ "./src/dom/dom.js":
/*!************************!*\
  !*** ./src/dom/dom.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HEADER": () => (/* binding */ HEADER),
/* harmony export */   "META_DATA": () => (/* binding */ META_DATA),
/* harmony export */   "NAV_BAR": () => (/* binding */ NAV_BAR),
/* harmony export */   "MENU_BUTTON": () => (/* binding */ MENU_BUTTON),
/* harmony export */   "RENDER_NAV_BAR_GROUPS": () => (/* binding */ RENDER_NAV_BAR_GROUPS)
/* harmony export */ });
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.js */ "./src/app.js");


const META_DATA = () => {
  const FONT_AWESOME = document.createElement("link");

  FONT_AWESOME.setAttribute("rel", "stylesheet");
  FONT_AWESOME.setAttribute(
    "href",
    "https://use.fontawesome.com/releases/v5.15.3/css/all.css"
  );
  FONT_AWESOME.setAttribute(
    "integrity",
    "sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk"
  );
  FONT_AWESOME.setAttribute("crossorigin", "anonymous");

  document.head.append(FONT_AWESOME);
};

const MENU_BUTTON = () => {
  const HAMBURGER_MENU_BUTTON = document.createElement("button");
  const HAMBURGER_BUTTON_ICON = document.createElement("i");

  HAMBURGER_MENU_BUTTON.id = "hamburger_menu_button";
  HAMBURGER_BUTTON_ICON.classList = "fas fa-align-justify";

  document.body.append(HAMBURGER_MENU_BUTTON);
  HAMBURGER_MENU_BUTTON.append(HAMBURGER_BUTTON_ICON);
};

const HEADER = () => {
  const HEADER_CONTAINER = document.createElement("header");
  const NAV_BAR_TEXT = document.createElement("h1");

  NAV_BAR_TEXT.innerText = "Task Master";

  document.body.append(HEADER_CONTAINER);
  HEADER_CONTAINER.append(NAV_BAR_TEXT);
};

const NAV_BAR = () => {
  const NAV_CONTAINER = document.createElement("nav");
  const DUE_CONTAINER = document.createElement("ol");
  const DUE_TODAY = document.createElement("li");
  const DUE_THIS_WEEK = document.createElement("li");
  const DUE_THIS_MONTH = document.createElement("li");
  const GROUP_CONTAINER = document.createElement("div");
  const GROUP_LIST = document.createElement("ol");
  const ADD_GROUP_BUTTON = document.createElement("button");
  const ADD_GROUP_PLUS_ICON = document.createElement("i");

  NAV_CONTAINER.id = "nav_container";
  DUE_CONTAINER.id = "due_container";
  DUE_TODAY.id = "due_today";
  DUE_THIS_WEEK.id = "due_this_week";
  DUE_THIS_MONTH.id = "due_this_month";
  GROUP_CONTAINER.id = "group_container";
  GROUP_LIST.id = "task_group_container";
  ADD_GROUP_BUTTON.id = "add_group";
  ADD_GROUP_PLUS_ICON.id = "add_group_plus_sign";

  const TIME_PERIOD_VIEW = [DUE_TODAY, DUE_THIS_WEEK, DUE_THIS_MONTH].map(
    (element) => (element.classList = "time_periods")
  );
  ADD_GROUP_PLUS_ICON.classList = "fas fa-plus-circle";

  DUE_TODAY.innerText = "Today";
  DUE_THIS_WEEK.innerText = "Week";
  DUE_THIS_MONTH.innerText = "Month";
  ADD_GROUP_BUTTON.innerText = "group";

  document.body.append(NAV_CONTAINER);
  NAV_CONTAINER.append(DUE_CONTAINER);
  DUE_CONTAINER.append(DUE_TODAY);
  DUE_CONTAINER.append(DUE_THIS_WEEK);
  DUE_CONTAINER.append(DUE_THIS_MONTH);
  NAV_CONTAINER.append(GROUP_CONTAINER);
  GROUP_CONTAINER.append(GROUP_LIST);
  GROUP_CONTAINER.append(ADD_GROUP_BUTTON);
  ADD_GROUP_BUTTON.prepend(ADD_GROUP_PLUS_ICON);
};

const RENDER_NAV_BAR_GROUPS = () => {
  const GROUPS_CONTAINER = document.getElementById("task_group_container");
  _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.map((group) => {
    const GROUP_LABEL = group.GET_LABEL();
    const LI = document.createElement("li");

    LI.innerText = GROUP_LABEL;
    LI.classList = "group_list";

    GROUPS_CONTAINER.append(LI);
  });
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
/* harmony import */ var _dom_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/dom.js */ "./src/dom/dom.js");



// if local storage has groups saved, load those
// otherwise load default groups

// myStorage.setItem("groups", JSON.stringify(groups));
// let mine = JSON.parse(myStorage.getItem("groups"));
// console.log(mine);

const LOCAL_STROAGE = window.localStorage;

if (LOCAL_STROAGE.length === 0) {
  console.log("length = 0");
}

const DEFAULT_SCHOOL_GROUP = () => {
  const GROUP = (0,_app_js__WEBPACK_IMPORTED_MODULE_0__.Group_class)("school");

  GROUP.ADD_TASK("math homework");
  GROUP.ADD_TASK("read chapter 2 of History book");
  GROUP.ADD_TASK("write Enlish paper");

  _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.push(GROUP);
};

const DEFAULT_GYM_GROUP = () => {
  const GROUP = (0,_app_js__WEBPACK_IMPORTED_MODULE_0__.Group_class)("gym");

  GROUP.ADD_TASK("warm up");
  GROUP.ADD_TASK("train");
  GROUP.ADD_TASK("warm down");

  _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.push(GROUP);
};

// <-only run these if there is no local storage->
// DEFAULT_SCHOOL_GROUP();
// DEFAULT_GYM_GROUP();
// <-only run these if there is no local storage->

// RENDER_NAV_BAR_GROUPS();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2RvbS9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvZGVmYXVsdF9ncm91cHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7O0FBRStCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9CSTs7QUFFbkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRSwrQ0FBVTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFMEU7Ozs7Ozs7VUMvRjFFO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ04rQztBQUNNOztBQUVyRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0Isb0RBQVc7O0FBRTNCO0FBQ0E7QUFDQTs7QUFFQSxFQUFFLGdEQUFXO0FBQ2I7O0FBRUE7QUFDQSxnQkFBZ0Isb0RBQVc7O0FBRTNCO0FBQ0E7QUFDQTs7QUFFQSxFQUFFLGdEQUFXO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiZGVmYXVsdF9ncm91cHMuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IGdyb3VwcyA9IFtdO1xuXG5jb25zdCBHcm91cF9jbGFzcyA9IChpbnB1dF9sYWJlbCkgPT4ge1xuICBsZXQgdGFza3MgPSBbXTtcbiAgbGV0IHRhc2tfY291bnQgPSAwO1xuXG4gIGNvbnN0IFRhc2tfY2xhc3MgPSAoXG4gICAgaW5wdXRfdGl0bGUgPSBcIlwiLFxuICAgIGlucHV0X2R1ZV9kYXRlID0gXCJcIixcbiAgICBpbnB1dF9ub3RlcyA9IFwiXCJcbiAgKSA9PiB7XG4gICAgY29uc3QgQ09VTlQgPSB0YXNrX2NvdW50O1xuICAgIGNvbnN0IEdFVF9DT1VOVCA9ICgpID0+IENPVU5UO1xuICAgIGNvbnN0IEdFVF9USVRMRSA9ICgpID0+IGlucHV0X3RpdGxlO1xuICAgIGNvbnN0IEdFVF9EVUVfREFURSA9ICgpID0+IGlucHV0X2R1ZV9kYXRlO1xuICAgIGNvbnN0IEdFVF9JTlBVVF9OT1RFUyA9ICgpID0+IGlucHV0X25vdGVzO1xuXG4gICAgcmV0dXJuIHsgR0VUX0NPVU5ULCBHRVRfVElUTEUsIEdFVF9EVUVfREFURSwgR0VUX0lOUFVUX05PVEVTIH07XG4gIH07XG5cbiAgY29uc3QgR0VUX1RBU0tTID0gKCkgPT4gdGFza3M7XG4gIGNvbnN0IEdFVF9MQUJFTCA9ICgpID0+IGlucHV0X2xhYmVsO1xuICBjb25zdCBBRERfVEFTSyA9IChpbnB1dF90aXRsZSwgaW5wdXRfZHVlX2RhdGUsIGlucHV0X25vdGVzKSA9PiB7XG4gICAgY29uc3QgTkVXX1RBU0sgPSBUYXNrX2NsYXNzKGlucHV0X3RpdGxlLCBpbnB1dF9kdWVfZGF0ZSwgaW5wdXRfbm90ZXMpO1xuICAgIHRhc2tzLnB1c2goTkVXX1RBU0spO1xuICAgIHRhc2tfY291bnQrKztcbiAgfTtcblxuICByZXR1cm4geyBHRVRfTEFCRUwsIEdFVF9UQVNLUywgQUREX1RBU0sgfTtcbn07XG5cbmV4cG9ydCB7IGdyb3VwcywgR3JvdXBfY2xhc3MgfTtcbiIsImltcG9ydCB7IGdyb3VwcyB9IGZyb20gXCIuLi9hcHAuanNcIjtcblxuY29uc3QgTUVUQV9EQVRBID0gKCkgPT4ge1xuICBjb25zdCBGT05UX0FXRVNPTUUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuICBGT05UX0FXRVNPTUUuc2V0QXR0cmlidXRlKFwicmVsXCIsIFwic3R5bGVzaGVldFwiKTtcbiAgRk9OVF9BV0VTT01FLnNldEF0dHJpYnV0ZShcbiAgICBcImhyZWZcIixcbiAgICBcImh0dHBzOi8vdXNlLmZvbnRhd2Vzb21lLmNvbS9yZWxlYXNlcy92NS4xNS4zL2Nzcy9hbGwuY3NzXCJcbiAgKTtcbiAgRk9OVF9BV0VTT01FLnNldEF0dHJpYnV0ZShcbiAgICBcImludGVncml0eVwiLFxuICAgIFwic2hhMzg0LVNaWHhYNHdoSjc5L2dFcndjT1lmK3pXTGVKZFkvcXB1cUM0Y0FhOXJPR1VzdFBvbXRxcHVOV1Q5d2RQRW4yZmtcIlxuICApO1xuICBGT05UX0FXRVNPTUUuc2V0QXR0cmlidXRlKFwiY3Jvc3NvcmlnaW5cIiwgXCJhbm9ueW1vdXNcIik7XG5cbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmQoRk9OVF9BV0VTT01FKTtcbn07XG5cbmNvbnN0IE1FTlVfQlVUVE9OID0gKCkgPT4ge1xuICBjb25zdCBIQU1CVVJHRVJfTUVOVV9CVVRUT04gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBjb25zdCBIQU1CVVJHRVJfQlVUVE9OX0lDT04gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcblxuICBIQU1CVVJHRVJfTUVOVV9CVVRUT04uaWQgPSBcImhhbWJ1cmdlcl9tZW51X2J1dHRvblwiO1xuICBIQU1CVVJHRVJfQlVUVE9OX0lDT04uY2xhc3NMaXN0ID0gXCJmYXMgZmEtYWxpZ24tanVzdGlmeVwiO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kKEhBTUJVUkdFUl9NRU5VX0JVVFRPTik7XG4gIEhBTUJVUkdFUl9NRU5VX0JVVFRPTi5hcHBlbmQoSEFNQlVSR0VSX0JVVFRPTl9JQ09OKTtcbn07XG5cbmNvbnN0IEhFQURFUiA9ICgpID0+IHtcbiAgY29uc3QgSEVBREVSX0NPTlRBSU5FUiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gIGNvbnN0IE5BVl9CQVJfVEVYVCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcblxuICBOQVZfQkFSX1RFWFQuaW5uZXJUZXh0ID0gXCJUYXNrIE1hc3RlclwiO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kKEhFQURFUl9DT05UQUlORVIpO1xuICBIRUFERVJfQ09OVEFJTkVSLmFwcGVuZChOQVZfQkFSX1RFWFQpO1xufTtcblxuY29uc3QgTkFWX0JBUiA9ICgpID0+IHtcbiAgY29uc3QgTkFWX0NPTlRBSU5FUiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJuYXZcIik7XG4gIGNvbnN0IERVRV9DT05UQUlORVIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib2xcIik7XG4gIGNvbnN0IERVRV9UT0RBWSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgY29uc3QgRFVFX1RISVNfV0VFSyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgY29uc3QgRFVFX1RISVNfTU9OVEggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gIGNvbnN0IEdST1VQX0NPTlRBSU5FUiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IEdST1VQX0xJU1QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib2xcIik7XG4gIGNvbnN0IEFERF9HUk9VUF9CVVRUT04gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBjb25zdCBBRERfR1JPVVBfUExVU19JQ09OID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG5cbiAgTkFWX0NPTlRBSU5FUi5pZCA9IFwibmF2X2NvbnRhaW5lclwiO1xuICBEVUVfQ09OVEFJTkVSLmlkID0gXCJkdWVfY29udGFpbmVyXCI7XG4gIERVRV9UT0RBWS5pZCA9IFwiZHVlX3RvZGF5XCI7XG4gIERVRV9USElTX1dFRUsuaWQgPSBcImR1ZV90aGlzX3dlZWtcIjtcbiAgRFVFX1RISVNfTU9OVEguaWQgPSBcImR1ZV90aGlzX21vbnRoXCI7XG4gIEdST1VQX0NPTlRBSU5FUi5pZCA9IFwiZ3JvdXBfY29udGFpbmVyXCI7XG4gIEdST1VQX0xJU1QuaWQgPSBcInRhc2tfZ3JvdXBfY29udGFpbmVyXCI7XG4gIEFERF9HUk9VUF9CVVRUT04uaWQgPSBcImFkZF9ncm91cFwiO1xuICBBRERfR1JPVVBfUExVU19JQ09OLmlkID0gXCJhZGRfZ3JvdXBfcGx1c19zaWduXCI7XG5cbiAgY29uc3QgVElNRV9QRVJJT0RfVklFVyA9IFtEVUVfVE9EQVksIERVRV9USElTX1dFRUssIERVRV9USElTX01PTlRIXS5tYXAoXG4gICAgKGVsZW1lbnQpID0+IChlbGVtZW50LmNsYXNzTGlzdCA9IFwidGltZV9wZXJpb2RzXCIpXG4gICk7XG4gIEFERF9HUk9VUF9QTFVTX0lDT04uY2xhc3NMaXN0ID0gXCJmYXMgZmEtcGx1cy1jaXJjbGVcIjtcblxuICBEVUVfVE9EQVkuaW5uZXJUZXh0ID0gXCJUb2RheVwiO1xuICBEVUVfVEhJU19XRUVLLmlubmVyVGV4dCA9IFwiV2Vla1wiO1xuICBEVUVfVEhJU19NT05USC5pbm5lclRleHQgPSBcIk1vbnRoXCI7XG4gIEFERF9HUk9VUF9CVVRUT04uaW5uZXJUZXh0ID0gXCJncm91cFwiO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kKE5BVl9DT05UQUlORVIpO1xuICBOQVZfQ09OVEFJTkVSLmFwcGVuZChEVUVfQ09OVEFJTkVSKTtcbiAgRFVFX0NPTlRBSU5FUi5hcHBlbmQoRFVFX1RPREFZKTtcbiAgRFVFX0NPTlRBSU5FUi5hcHBlbmQoRFVFX1RISVNfV0VFSyk7XG4gIERVRV9DT05UQUlORVIuYXBwZW5kKERVRV9USElTX01PTlRIKTtcbiAgTkFWX0NPTlRBSU5FUi5hcHBlbmQoR1JPVVBfQ09OVEFJTkVSKTtcbiAgR1JPVVBfQ09OVEFJTkVSLmFwcGVuZChHUk9VUF9MSVNUKTtcbiAgR1JPVVBfQ09OVEFJTkVSLmFwcGVuZChBRERfR1JPVVBfQlVUVE9OKTtcbiAgQUREX0dST1VQX0JVVFRPTi5wcmVwZW5kKEFERF9HUk9VUF9QTFVTX0lDT04pO1xufTtcblxuY29uc3QgUkVOREVSX05BVl9CQVJfR1JPVVBTID0gKCkgPT4ge1xuICBjb25zdCBHUk9VUFNfQ09OVEFJTkVSID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrX2dyb3VwX2NvbnRhaW5lclwiKTtcbiAgZ3JvdXBzLm1hcCgoZ3JvdXApID0+IHtcbiAgICBjb25zdCBHUk9VUF9MQUJFTCA9IGdyb3VwLkdFVF9MQUJFTCgpO1xuICAgIGNvbnN0IExJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuXG4gICAgTEkuaW5uZXJUZXh0ID0gR1JPVVBfTEFCRUw7XG4gICAgTEkuY2xhc3NMaXN0ID0gXCJncm91cF9saXN0XCI7XG5cbiAgICBHUk9VUFNfQ09OVEFJTkVSLmFwcGVuZChMSSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IHsgSEVBREVSLCBNRVRBX0RBVEEsIE5BVl9CQVIsIE1FTlVfQlVUVE9OLCBSRU5ERVJfTkFWX0JBUl9HUk9VUFMgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ3JvdXBzLCBHcm91cF9jbGFzcyB9IGZyb20gXCIuL2FwcC5qc1wiO1xuaW1wb3J0IHsgUkVOREVSX05BVl9CQVJfR1JPVVBTIH0gZnJvbSBcIi4vZG9tL2RvbS5qc1wiO1xuXG4vLyBpZiBsb2NhbCBzdG9yYWdlIGhhcyBncm91cHMgc2F2ZWQsIGxvYWQgdGhvc2Vcbi8vIG90aGVyd2lzZSBsb2FkIGRlZmF1bHQgZ3JvdXBzXG5cbi8vIG15U3RvcmFnZS5zZXRJdGVtKFwiZ3JvdXBzXCIsIEpTT04uc3RyaW5naWZ5KGdyb3VwcykpO1xuLy8gbGV0IG1pbmUgPSBKU09OLnBhcnNlKG15U3RvcmFnZS5nZXRJdGVtKFwiZ3JvdXBzXCIpKTtcbi8vIGNvbnNvbGUubG9nKG1pbmUpO1xuXG5jb25zdCBMT0NBTF9TVFJPQUdFID0gd2luZG93LmxvY2FsU3RvcmFnZTtcblxuaWYgKExPQ0FMX1NUUk9BR0UubGVuZ3RoID09PSAwKSB7XG4gIGNvbnNvbGUubG9nKFwibGVuZ3RoID0gMFwiKTtcbn1cblxuY29uc3QgREVGQVVMVF9TQ0hPT0xfR1JPVVAgPSAoKSA9PiB7XG4gIGNvbnN0IEdST1VQID0gR3JvdXBfY2xhc3MoXCJzY2hvb2xcIik7XG5cbiAgR1JPVVAuQUREX1RBU0soXCJtYXRoIGhvbWV3b3JrXCIpO1xuICBHUk9VUC5BRERfVEFTSyhcInJlYWQgY2hhcHRlciAyIG9mIEhpc3RvcnkgYm9va1wiKTtcbiAgR1JPVVAuQUREX1RBU0soXCJ3cml0ZSBFbmxpc2ggcGFwZXJcIik7XG5cbiAgZ3JvdXBzLnB1c2goR1JPVVApO1xufTtcblxuY29uc3QgREVGQVVMVF9HWU1fR1JPVVAgPSAoKSA9PiB7XG4gIGNvbnN0IEdST1VQID0gR3JvdXBfY2xhc3MoXCJneW1cIik7XG5cbiAgR1JPVVAuQUREX1RBU0soXCJ3YXJtIHVwXCIpO1xuICBHUk9VUC5BRERfVEFTSyhcInRyYWluXCIpO1xuICBHUk9VUC5BRERfVEFTSyhcIndhcm0gZG93blwiKTtcblxuICBncm91cHMucHVzaChHUk9VUCk7XG59O1xuXG4vLyA8LW9ubHkgcnVuIHRoZXNlIGlmIHRoZXJlIGlzIG5vIGxvY2FsIHN0b3JhZ2UtPlxuLy8gREVGQVVMVF9TQ0hPT0xfR1JPVVAoKTtcbi8vIERFRkFVTFRfR1lNX0dST1VQKCk7XG4vLyA8LW9ubHkgcnVuIHRoZXNlIGlmIHRoZXJlIGlzIG5vIGxvY2FsIHN0b3JhZ2UtPlxuXG4vLyBSRU5ERVJfTkFWX0JBUl9HUk9VUFMoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=