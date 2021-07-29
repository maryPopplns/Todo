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
/* harmony export */   "Task": () => (/* binding */ Task)
/* harmony export */ });
let groups = {};

if (window.localStorage.length !== 0) {
  const LOCAL_STORAGE_GROUPS = JSON.parse(
    window.localStorage.getItem("groups")
  );
  groups = LOCAL_STORAGE_GROUPS;
}

const Task = class {
  constructor(label = "", priority = "low", due_date = "", notes = "") {
    this.label = label;
    this.priority = priority;
    this.due_date = due_date;
    this.notes = notes;
    this.date_created = new Date().getTime();
  }
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
  for (let prop in _app_js__WEBPACK_IMPORTED_MODULE_0__.groups) {
    const GROUP = document.createElement("li");

    GROUP.innerText = prop;

    GROUPS_CONTAINER.append(GROUP);
  }
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
/*!***************************************!*\
  !*** ./src/helpers/default_groups.js ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.js */ "./src/app.js");
/* harmony import */ var _dom_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom/dom.js */ "./src/dom/dom.js");



if (window.localStorage.length === 0) {
  // <-school->
  const DEFAULT_SCHOOL_GROUP = (() => {
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.school = [];
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.school.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("math"));
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.school.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("science"));
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.school.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("history"));
  })();

  // <-gym->
  const DEFAULT_GYM_GROUP = (() => {
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.gym = [];
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.gym.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("chest"));
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.gym.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("back"));
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.gym.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("legs"));
  })();

  (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_1__.RENDER_NAV_BAR_GROUPS)();
  window.localStorage.setItem("groups", JSON.stringify(_app_js__WEBPACK_IMPORTED_MODULE_0__.groups));
  console.log("no local");
} else {
  (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_1__.RENDER_NAV_BAR_GROUPS)();
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2RvbS9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaGVscGVycy9kZWZhdWx0X2dyb3Vwcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUV3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQlc7O0FBRW5DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQiwyQ0FBTTtBQUN6Qjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRTBFOzs7Ozs7O1VDN0YxRTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7QUNOeUM7QUFDYTs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0EsSUFBSSxrREFBYTtBQUNqQixJQUFJLHVEQUFrQixLQUFLLHlDQUFJO0FBQy9CLElBQUksdURBQWtCLEtBQUsseUNBQUk7QUFDL0IsSUFBSSx1REFBa0IsS0FBSyx5Q0FBSTtBQUMvQixHQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFJLCtDQUFVO0FBQ2QsSUFBSSxvREFBZSxLQUFLLHlDQUFJO0FBQzVCLElBQUksb0RBQWUsS0FBSyx5Q0FBSTtBQUM1QixJQUFJLG9EQUFlLEtBQUsseUNBQUk7QUFDNUIsR0FBRzs7QUFFSCxFQUFFLGtFQUFxQjtBQUN2Qix1REFBdUQsMkNBQU07QUFDN0Q7QUFDQSxDQUFDO0FBQ0QsRUFBRSxrRUFBcUI7QUFDdkIiLCJmaWxlIjoiZGVmYXVsdF9ncm91cHMuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IGdyb3VwcyA9IHt9O1xuXG5pZiAod2luZG93LmxvY2FsU3RvcmFnZS5sZW5ndGggIT09IDApIHtcbiAgY29uc3QgTE9DQUxfU1RPUkFHRV9HUk9VUFMgPSBKU09OLnBhcnNlKFxuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImdyb3Vwc1wiKVxuICApO1xuICBncm91cHMgPSBMT0NBTF9TVE9SQUdFX0dST1VQUztcbn1cblxuY29uc3QgVGFzayA9IGNsYXNzIHtcbiAgY29uc3RydWN0b3IobGFiZWwgPSBcIlwiLCBwcmlvcml0eSA9IFwibG93XCIsIGR1ZV9kYXRlID0gXCJcIiwgbm90ZXMgPSBcIlwiKSB7XG4gICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB0aGlzLmR1ZV9kYXRlID0gZHVlX2RhdGU7XG4gICAgdGhpcy5ub3RlcyA9IG5vdGVzO1xuICAgIHRoaXMuZGF0ZV9jcmVhdGVkID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIH1cbn07XG5cbmV4cG9ydCB7IGdyb3VwcywgVGFzayB9O1xuIiwiaW1wb3J0IHsgZ3JvdXBzIH0gZnJvbSBcIi4uL2FwcC5qc1wiO1xuXG5jb25zdCBNRVRBX0RBVEEgPSAoKSA9PiB7XG4gIGNvbnN0IEZPTlRfQVdFU09NRSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG4gIEZPTlRfQVdFU09NRS5zZXRBdHRyaWJ1dGUoXCJyZWxcIiwgXCJzdHlsZXNoZWV0XCIpO1xuICBGT05UX0FXRVNPTUUuc2V0QXR0cmlidXRlKFxuICAgIFwiaHJlZlwiLFxuICAgIFwiaHR0cHM6Ly91c2UuZm9udGF3ZXNvbWUuY29tL3JlbGVhc2VzL3Y1LjE1LjMvY3NzL2FsbC5jc3NcIlxuICApO1xuICBGT05UX0FXRVNPTUUuc2V0QXR0cmlidXRlKFxuICAgIFwiaW50ZWdyaXR5XCIsXG4gICAgXCJzaGEzODQtU1pYeFg0d2hKNzkvZ0Vyd2NPWWYreldMZUpkWS9xcHVxQzRjQWE5ck9HVXN0UG9tdHFwdU5XVDl3ZFBFbjJma1wiXG4gICk7XG4gIEZPTlRfQVdFU09NRS5zZXRBdHRyaWJ1dGUoXCJjcm9zc29yaWdpblwiLCBcImFub255bW91c1wiKTtcblxuICBkb2N1bWVudC5oZWFkLmFwcGVuZChGT05UX0FXRVNPTUUpO1xufTtcblxuY29uc3QgTUVOVV9CVVRUT04gPSAoKSA9PiB7XG4gIGNvbnN0IEhBTUJVUkdFUl9NRU5VX0JVVFRPTiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGNvbnN0IEhBTUJVUkdFUl9CVVRUT05fSUNPTiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuXG4gIEhBTUJVUkdFUl9NRU5VX0JVVFRPTi5pZCA9IFwiaGFtYnVyZ2VyX21lbnVfYnV0dG9uXCI7XG4gIEhBTUJVUkdFUl9CVVRUT05fSUNPTi5jbGFzc0xpc3QgPSBcImZhcyBmYS1hbGlnbi1qdXN0aWZ5XCI7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmQoSEFNQlVSR0VSX01FTlVfQlVUVE9OKTtcbiAgSEFNQlVSR0VSX01FTlVfQlVUVE9OLmFwcGVuZChIQU1CVVJHRVJfQlVUVE9OX0lDT04pO1xufTtcblxuY29uc3QgSEVBREVSID0gKCkgPT4ge1xuICBjb25zdCBIRUFERVJfQ09OVEFJTkVSID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgY29uc3QgTkFWX0JBUl9URVhUID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuXG4gIE5BVl9CQVJfVEVYVC5pbm5lclRleHQgPSBcIlRhc2sgTWFzdGVyXCI7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmQoSEVBREVSX0NPTlRBSU5FUik7XG4gIEhFQURFUl9DT05UQUlORVIuYXBwZW5kKE5BVl9CQVJfVEVYVCk7XG59O1xuXG5jb25zdCBOQVZfQkFSID0gKCkgPT4ge1xuICBjb25zdCBOQVZfQ09OVEFJTkVSID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm5hdlwiKTtcbiAgY29uc3QgRFVFX0NPTlRBSU5FUiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvbFwiKTtcbiAgY29uc3QgRFVFX1RPREFZID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBjb25zdCBEVUVfVEhJU19XRUVLID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBjb25zdCBEVUVfVEhJU19NT05USCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgY29uc3QgR1JPVVBfQ09OVEFJTkVSID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgR1JPVVBfTElTVCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvbFwiKTtcbiAgY29uc3QgQUREX0dST1VQX0JVVFRPTiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGNvbnN0IEFERF9HUk9VUF9QTFVTX0lDT04gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcblxuICBOQVZfQ09OVEFJTkVSLmlkID0gXCJuYXZfY29udGFpbmVyXCI7XG4gIERVRV9DT05UQUlORVIuaWQgPSBcImR1ZV9jb250YWluZXJcIjtcbiAgRFVFX1RPREFZLmlkID0gXCJkdWVfdG9kYXlcIjtcbiAgRFVFX1RISVNfV0VFSy5pZCA9IFwiZHVlX3RoaXNfd2Vla1wiO1xuICBEVUVfVEhJU19NT05USC5pZCA9IFwiZHVlX3RoaXNfbW9udGhcIjtcbiAgR1JPVVBfQ09OVEFJTkVSLmlkID0gXCJncm91cF9jb250YWluZXJcIjtcbiAgR1JPVVBfTElTVC5pZCA9IFwidGFza19ncm91cF9jb250YWluZXJcIjtcbiAgQUREX0dST1VQX0JVVFRPTi5pZCA9IFwiYWRkX2dyb3VwXCI7XG4gIEFERF9HUk9VUF9QTFVTX0lDT04uaWQgPSBcImFkZF9ncm91cF9wbHVzX3NpZ25cIjtcblxuICBjb25zdCBUSU1FX1BFUklPRF9WSUVXID0gW0RVRV9UT0RBWSwgRFVFX1RISVNfV0VFSywgRFVFX1RISVNfTU9OVEhdLm1hcChcbiAgICAoZWxlbWVudCkgPT4gKGVsZW1lbnQuY2xhc3NMaXN0ID0gXCJ0aW1lX3BlcmlvZHNcIilcbiAgKTtcbiAgQUREX0dST1VQX1BMVVNfSUNPTi5jbGFzc0xpc3QgPSBcImZhcyBmYS1wbHVzLWNpcmNsZVwiO1xuXG4gIERVRV9UT0RBWS5pbm5lclRleHQgPSBcIlRvZGF5XCI7XG4gIERVRV9USElTX1dFRUsuaW5uZXJUZXh0ID0gXCJXZWVrXCI7XG4gIERVRV9USElTX01PTlRILmlubmVyVGV4dCA9IFwiTW9udGhcIjtcbiAgQUREX0dST1VQX0JVVFRPTi5pbm5lclRleHQgPSBcImdyb3VwXCI7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmQoTkFWX0NPTlRBSU5FUik7XG4gIE5BVl9DT05UQUlORVIuYXBwZW5kKERVRV9DT05UQUlORVIpO1xuICBEVUVfQ09OVEFJTkVSLmFwcGVuZChEVUVfVE9EQVkpO1xuICBEVUVfQ09OVEFJTkVSLmFwcGVuZChEVUVfVEhJU19XRUVLKTtcbiAgRFVFX0NPTlRBSU5FUi5hcHBlbmQoRFVFX1RISVNfTU9OVEgpO1xuICBOQVZfQ09OVEFJTkVSLmFwcGVuZChHUk9VUF9DT05UQUlORVIpO1xuICBHUk9VUF9DT05UQUlORVIuYXBwZW5kKEdST1VQX0xJU1QpO1xuICBHUk9VUF9DT05UQUlORVIuYXBwZW5kKEFERF9HUk9VUF9CVVRUT04pO1xuICBBRERfR1JPVVBfQlVUVE9OLnByZXBlbmQoQUREX0dST1VQX1BMVVNfSUNPTik7XG59O1xuXG5jb25zdCBSRU5ERVJfTkFWX0JBUl9HUk9VUFMgPSAoKSA9PiB7XG4gIGNvbnN0IEdST1VQU19DT05UQUlORVIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tfZ3JvdXBfY29udGFpbmVyXCIpO1xuICBmb3IgKGxldCBwcm9wIGluIGdyb3Vwcykge1xuICAgIGNvbnN0IEdST1VQID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuXG4gICAgR1JPVVAuaW5uZXJUZXh0ID0gcHJvcDtcblxuICAgIEdST1VQU19DT05UQUlORVIuYXBwZW5kKEdST1VQKTtcbiAgfVxufTtcblxuZXhwb3J0IHsgSEVBREVSLCBNRVRBX0RBVEEsIE5BVl9CQVIsIE1FTlVfQlVUVE9OLCBSRU5ERVJfTkFWX0JBUl9HUk9VUFMgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ3JvdXBzLCBUYXNrIH0gZnJvbSBcIi4uL2FwcC5qc1wiO1xuaW1wb3J0IHsgUkVOREVSX05BVl9CQVJfR1JPVVBTIH0gZnJvbSBcIi4uL2RvbS9kb20uanNcIjtcblxuaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UubGVuZ3RoID09PSAwKSB7XG4gIC8vIDwtc2Nob29sLT5cbiAgY29uc3QgREVGQVVMVF9TQ0hPT0xfR1JPVVAgPSAoKCkgPT4ge1xuICAgIGdyb3Vwcy5zY2hvb2wgPSBbXTtcbiAgICBncm91cHMuc2Nob29sLnB1c2gobmV3IFRhc2soXCJtYXRoXCIpKTtcbiAgICBncm91cHMuc2Nob29sLnB1c2gobmV3IFRhc2soXCJzY2llbmNlXCIpKTtcbiAgICBncm91cHMuc2Nob29sLnB1c2gobmV3IFRhc2soXCJoaXN0b3J5XCIpKTtcbiAgfSkoKTtcblxuICAvLyA8LWd5bS0+XG4gIGNvbnN0IERFRkFVTFRfR1lNX0dST1VQID0gKCgpID0+IHtcbiAgICBncm91cHMuZ3ltID0gW107XG4gICAgZ3JvdXBzLmd5bS5wdXNoKG5ldyBUYXNrKFwiY2hlc3RcIikpO1xuICAgIGdyb3Vwcy5neW0ucHVzaChuZXcgVGFzayhcImJhY2tcIikpO1xuICAgIGdyb3Vwcy5neW0ucHVzaChuZXcgVGFzayhcImxlZ3NcIikpO1xuICB9KSgpO1xuXG4gIFJFTkRFUl9OQVZfQkFSX0dST1VQUygpO1xuICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJncm91cHNcIiwgSlNPTi5zdHJpbmdpZnkoZ3JvdXBzKSk7XG4gIGNvbnNvbGUubG9nKFwibm8gbG9jYWxcIik7XG59IGVsc2Uge1xuICBSRU5ERVJfTkFWX0JBUl9HUk9VUFMoKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=