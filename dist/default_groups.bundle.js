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

    GROUP.classList = "nav_bar_group";
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



window.localStorage.clear();

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

  // <********>
  const DEFAULT_GYM_GROUP1 = (() => {
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.a = [];
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.gym.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("chest"));
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.gym.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("back"));
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.gym.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("legs"));
  })();

  const DEFAULT_GYM_GROUP2 = (() => {
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.b = [];
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.gym.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("chest"));
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.gym.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("back"));
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.gym.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("legs"));
  })();

  const DEFAULT_GYM_GROUP3 = (() => {
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.c = [];
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.gym.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("chest"));
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.gym.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("back"));
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.gym.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("legs"));
  })();

  const DEFAULT_GYM_GROUP4 = (() => {
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.d = [];
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.gym.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("chest"));
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.gym.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("back"));
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.gym.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("legs"));
  })();

  const DEFAULT_GYM_GROUP5 = (() => {
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.e = [];
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.gym.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("chest"));
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.gym.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("back"));
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.gym.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("legs"));
  })();

  const DEFAULT_GYM_GROUP6 = (() => {
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.f = [];
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.gym.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("chest"));
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.gym.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("back"));
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups.gym.push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task("legs"));
  })();
  // <********>

  (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_1__.RENDER_NAV_BAR_GROUPS)();
  window.localStorage.setItem("groups", JSON.stringify(_app_js__WEBPACK_IMPORTED_MODULE_0__.groups));
} else {
  (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_1__.RENDER_NAV_BAR_GROUPS)();
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2RvbS9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaGVscGVycy9kZWZhdWx0X2dyb3Vwcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUV3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQlc7O0FBRW5DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQiwyQ0FBTTtBQUN6Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFMEU7Ozs7Ozs7VUM5RjFFO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ055QztBQUNhOztBQUV0RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGtEQUFhO0FBQ2pCLElBQUksdURBQWtCLEtBQUsseUNBQUk7QUFDL0IsSUFBSSx1REFBa0IsS0FBSyx5Q0FBSTtBQUMvQixJQUFJLHVEQUFrQixLQUFLLHlDQUFJO0FBQy9CLEdBQUc7O0FBRUg7QUFDQTtBQUNBLElBQUksK0NBQVU7QUFDZCxJQUFJLG9EQUFlLEtBQUsseUNBQUk7QUFDNUIsSUFBSSxvREFBZSxLQUFLLHlDQUFJO0FBQzVCLElBQUksb0RBQWUsS0FBSyx5Q0FBSTtBQUM1QixHQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFJLDZDQUFRO0FBQ1osSUFBSSxvREFBZSxLQUFLLHlDQUFJO0FBQzVCLElBQUksb0RBQWUsS0FBSyx5Q0FBSTtBQUM1QixJQUFJLG9EQUFlLEtBQUsseUNBQUk7QUFDNUIsR0FBRzs7QUFFSDtBQUNBLElBQUksNkNBQVE7QUFDWixJQUFJLG9EQUFlLEtBQUsseUNBQUk7QUFDNUIsSUFBSSxvREFBZSxLQUFLLHlDQUFJO0FBQzVCLElBQUksb0RBQWUsS0FBSyx5Q0FBSTtBQUM1QixHQUFHOztBQUVIO0FBQ0EsSUFBSSw2Q0FBUTtBQUNaLElBQUksb0RBQWUsS0FBSyx5Q0FBSTtBQUM1QixJQUFJLG9EQUFlLEtBQUsseUNBQUk7QUFDNUIsSUFBSSxvREFBZSxLQUFLLHlDQUFJO0FBQzVCLEdBQUc7O0FBRUg7QUFDQSxJQUFJLDZDQUFRO0FBQ1osSUFBSSxvREFBZSxLQUFLLHlDQUFJO0FBQzVCLElBQUksb0RBQWUsS0FBSyx5Q0FBSTtBQUM1QixJQUFJLG9EQUFlLEtBQUsseUNBQUk7QUFDNUIsR0FBRzs7QUFFSDtBQUNBLElBQUksNkNBQVE7QUFDWixJQUFJLG9EQUFlLEtBQUsseUNBQUk7QUFDNUIsSUFBSSxvREFBZSxLQUFLLHlDQUFJO0FBQzVCLElBQUksb0RBQWUsS0FBSyx5Q0FBSTtBQUM1QixHQUFHOztBQUVIO0FBQ0EsSUFBSSw2Q0FBUTtBQUNaLElBQUksb0RBQWUsS0FBSyx5Q0FBSTtBQUM1QixJQUFJLG9EQUFlLEtBQUsseUNBQUk7QUFDNUIsSUFBSSxvREFBZSxLQUFLLHlDQUFJO0FBQzVCLEdBQUc7QUFDSDs7QUFFQSxFQUFFLGtFQUFxQjtBQUN2Qix1REFBdUQsMkNBQU07QUFDN0QsQ0FBQztBQUNELEVBQUUsa0VBQXFCO0FBQ3ZCIiwiZmlsZSI6ImRlZmF1bHRfZ3JvdXBzLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBncm91cHMgPSB7fTtcblxuaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UubGVuZ3RoICE9PSAwKSB7XG4gIGNvbnN0IExPQ0FMX1NUT1JBR0VfR1JPVVBTID0gSlNPTi5wYXJzZShcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJncm91cHNcIilcbiAgKTtcbiAgZ3JvdXBzID0gTE9DQUxfU1RPUkFHRV9HUk9VUFM7XG59XG5cbmNvbnN0IFRhc2sgPSBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKGxhYmVsID0gXCJcIiwgcHJpb3JpdHkgPSBcImxvd1wiLCBkdWVfZGF0ZSA9IFwiXCIsIG5vdGVzID0gXCJcIikge1xuICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgdGhpcy5kdWVfZGF0ZSA9IGR1ZV9kYXRlO1xuICAgIHRoaXMubm90ZXMgPSBub3RlcztcbiAgICB0aGlzLmRhdGVfY3JlYXRlZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9XG59O1xuXG5leHBvcnQgeyBncm91cHMsIFRhc2sgfTtcbiIsImltcG9ydCB7IGdyb3VwcyB9IGZyb20gXCIuLi9hcHAuanNcIjtcblxuY29uc3QgTUVUQV9EQVRBID0gKCkgPT4ge1xuICBjb25zdCBGT05UX0FXRVNPTUUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuICBGT05UX0FXRVNPTUUuc2V0QXR0cmlidXRlKFwicmVsXCIsIFwic3R5bGVzaGVldFwiKTtcbiAgRk9OVF9BV0VTT01FLnNldEF0dHJpYnV0ZShcbiAgICBcImhyZWZcIixcbiAgICBcImh0dHBzOi8vdXNlLmZvbnRhd2Vzb21lLmNvbS9yZWxlYXNlcy92NS4xNS4zL2Nzcy9hbGwuY3NzXCJcbiAgKTtcbiAgRk9OVF9BV0VTT01FLnNldEF0dHJpYnV0ZShcbiAgICBcImludGVncml0eVwiLFxuICAgIFwic2hhMzg0LVNaWHhYNHdoSjc5L2dFcndjT1lmK3pXTGVKZFkvcXB1cUM0Y0FhOXJPR1VzdFBvbXRxcHVOV1Q5d2RQRW4yZmtcIlxuICApO1xuICBGT05UX0FXRVNPTUUuc2V0QXR0cmlidXRlKFwiY3Jvc3NvcmlnaW5cIiwgXCJhbm9ueW1vdXNcIik7XG5cbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmQoRk9OVF9BV0VTT01FKTtcbn07XG5cbmNvbnN0IE1FTlVfQlVUVE9OID0gKCkgPT4ge1xuICBjb25zdCBIQU1CVVJHRVJfTUVOVV9CVVRUT04gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBjb25zdCBIQU1CVVJHRVJfQlVUVE9OX0lDT04gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcblxuICBIQU1CVVJHRVJfTUVOVV9CVVRUT04uaWQgPSBcImhhbWJ1cmdlcl9tZW51X2J1dHRvblwiO1xuICBIQU1CVVJHRVJfQlVUVE9OX0lDT04uY2xhc3NMaXN0ID0gXCJmYXMgZmEtYWxpZ24tanVzdGlmeVwiO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kKEhBTUJVUkdFUl9NRU5VX0JVVFRPTik7XG4gIEhBTUJVUkdFUl9NRU5VX0JVVFRPTi5hcHBlbmQoSEFNQlVSR0VSX0JVVFRPTl9JQ09OKTtcbn07XG5cbmNvbnN0IEhFQURFUiA9ICgpID0+IHtcbiAgY29uc3QgSEVBREVSX0NPTlRBSU5FUiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gIGNvbnN0IE5BVl9CQVJfVEVYVCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcblxuICBOQVZfQkFSX1RFWFQuaW5uZXJUZXh0ID0gXCJUYXNrIE1hc3RlclwiO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kKEhFQURFUl9DT05UQUlORVIpO1xuICBIRUFERVJfQ09OVEFJTkVSLmFwcGVuZChOQVZfQkFSX1RFWFQpO1xufTtcblxuY29uc3QgTkFWX0JBUiA9ICgpID0+IHtcbiAgY29uc3QgTkFWX0NPTlRBSU5FUiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJuYXZcIik7XG4gIGNvbnN0IERVRV9DT05UQUlORVIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib2xcIik7XG4gIGNvbnN0IERVRV9UT0RBWSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgY29uc3QgRFVFX1RISVNfV0VFSyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgY29uc3QgRFVFX1RISVNfTU9OVEggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gIGNvbnN0IEdST1VQX0NPTlRBSU5FUiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IEdST1VQX0xJU1QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib2xcIik7XG4gIGNvbnN0IEFERF9HUk9VUF9CVVRUT04gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBjb25zdCBBRERfR1JPVVBfUExVU19JQ09OID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG5cbiAgTkFWX0NPTlRBSU5FUi5pZCA9IFwibmF2X2NvbnRhaW5lclwiO1xuICBEVUVfQ09OVEFJTkVSLmlkID0gXCJkdWVfY29udGFpbmVyXCI7XG4gIERVRV9UT0RBWS5pZCA9IFwiZHVlX3RvZGF5XCI7XG4gIERVRV9USElTX1dFRUsuaWQgPSBcImR1ZV90aGlzX3dlZWtcIjtcbiAgRFVFX1RISVNfTU9OVEguaWQgPSBcImR1ZV90aGlzX21vbnRoXCI7XG4gIEdST1VQX0NPTlRBSU5FUi5pZCA9IFwiZ3JvdXBfY29udGFpbmVyXCI7XG4gIEdST1VQX0xJU1QuaWQgPSBcInRhc2tfZ3JvdXBfY29udGFpbmVyXCI7XG4gIEFERF9HUk9VUF9CVVRUT04uaWQgPSBcImFkZF9ncm91cFwiO1xuICBBRERfR1JPVVBfUExVU19JQ09OLmlkID0gXCJhZGRfZ3JvdXBfcGx1c19zaWduXCI7XG5cbiAgY29uc3QgVElNRV9QRVJJT0RfVklFVyA9IFtEVUVfVE9EQVksIERVRV9USElTX1dFRUssIERVRV9USElTX01PTlRIXS5tYXAoXG4gICAgKGVsZW1lbnQpID0+IChlbGVtZW50LmNsYXNzTGlzdCA9IFwidGltZV9wZXJpb2RzXCIpXG4gICk7XG4gIEFERF9HUk9VUF9QTFVTX0lDT04uY2xhc3NMaXN0ID0gXCJmYXMgZmEtcGx1cy1jaXJjbGVcIjtcblxuICBEVUVfVE9EQVkuaW5uZXJUZXh0ID0gXCJUb2RheVwiO1xuICBEVUVfVEhJU19XRUVLLmlubmVyVGV4dCA9IFwiV2Vla1wiO1xuICBEVUVfVEhJU19NT05USC5pbm5lclRleHQgPSBcIk1vbnRoXCI7XG4gIEFERF9HUk9VUF9CVVRUT04uaW5uZXJUZXh0ID0gXCJncm91cFwiO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kKE5BVl9DT05UQUlORVIpO1xuICBOQVZfQ09OVEFJTkVSLmFwcGVuZChEVUVfQ09OVEFJTkVSKTtcbiAgRFVFX0NPTlRBSU5FUi5hcHBlbmQoRFVFX1RPREFZKTtcbiAgRFVFX0NPTlRBSU5FUi5hcHBlbmQoRFVFX1RISVNfV0VFSyk7XG4gIERVRV9DT05UQUlORVIuYXBwZW5kKERVRV9USElTX01PTlRIKTtcbiAgTkFWX0NPTlRBSU5FUi5hcHBlbmQoR1JPVVBfQ09OVEFJTkVSKTtcbiAgR1JPVVBfQ09OVEFJTkVSLmFwcGVuZChHUk9VUF9MSVNUKTtcbiAgR1JPVVBfQ09OVEFJTkVSLmFwcGVuZChBRERfR1JPVVBfQlVUVE9OKTtcbiAgQUREX0dST1VQX0JVVFRPTi5wcmVwZW5kKEFERF9HUk9VUF9QTFVTX0lDT04pO1xufTtcblxuY29uc3QgUkVOREVSX05BVl9CQVJfR1JPVVBTID0gKCkgPT4ge1xuICBjb25zdCBHUk9VUFNfQ09OVEFJTkVSID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrX2dyb3VwX2NvbnRhaW5lclwiKTtcbiAgZm9yIChsZXQgcHJvcCBpbiBncm91cHMpIHtcbiAgICBjb25zdCBHUk9VUCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblxuICAgIEdST1VQLmNsYXNzTGlzdCA9IFwibmF2X2Jhcl9ncm91cFwiO1xuICAgIEdST1VQLmlubmVyVGV4dCA9IHByb3A7XG5cbiAgICBHUk9VUFNfQ09OVEFJTkVSLmFwcGVuZChHUk9VUCk7XG4gIH1cbn07XG5cbmV4cG9ydCB7IEhFQURFUiwgTUVUQV9EQVRBLCBOQVZfQkFSLCBNRU5VX0JVVFRPTiwgUkVOREVSX05BVl9CQVJfR1JPVVBTIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdyb3VwcywgVGFzayB9IGZyb20gXCIuLi9hcHAuanNcIjtcbmltcG9ydCB7IFJFTkRFUl9OQVZfQkFSX0dST1VQUyB9IGZyb20gXCIuLi9kb20vZG9tLmpzXCI7XG5cbndpbmRvdy5sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcblxuaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UubGVuZ3RoID09PSAwKSB7XG4gIC8vIDwtc2Nob29sLT5cbiAgY29uc3QgREVGQVVMVF9TQ0hPT0xfR1JPVVAgPSAoKCkgPT4ge1xuICAgIGdyb3Vwcy5zY2hvb2wgPSBbXTtcbiAgICBncm91cHMuc2Nob29sLnB1c2gobmV3IFRhc2soXCJtYXRoXCIpKTtcbiAgICBncm91cHMuc2Nob29sLnB1c2gobmV3IFRhc2soXCJzY2llbmNlXCIpKTtcbiAgICBncm91cHMuc2Nob29sLnB1c2gobmV3IFRhc2soXCJoaXN0b3J5XCIpKTtcbiAgfSkoKTtcblxuICAvLyA8LWd5bS0+XG4gIGNvbnN0IERFRkFVTFRfR1lNX0dST1VQID0gKCgpID0+IHtcbiAgICBncm91cHMuZ3ltID0gW107XG4gICAgZ3JvdXBzLmd5bS5wdXNoKG5ldyBUYXNrKFwiY2hlc3RcIikpO1xuICAgIGdyb3Vwcy5neW0ucHVzaChuZXcgVGFzayhcImJhY2tcIikpO1xuICAgIGdyb3Vwcy5neW0ucHVzaChuZXcgVGFzayhcImxlZ3NcIikpO1xuICB9KSgpO1xuXG4gIC8vIDwqKioqKioqKj5cbiAgY29uc3QgREVGQVVMVF9HWU1fR1JPVVAxID0gKCgpID0+IHtcbiAgICBncm91cHMuYSA9IFtdO1xuICAgIGdyb3Vwcy5neW0ucHVzaChuZXcgVGFzayhcImNoZXN0XCIpKTtcbiAgICBncm91cHMuZ3ltLnB1c2gobmV3IFRhc2soXCJiYWNrXCIpKTtcbiAgICBncm91cHMuZ3ltLnB1c2gobmV3IFRhc2soXCJsZWdzXCIpKTtcbiAgfSkoKTtcblxuICBjb25zdCBERUZBVUxUX0dZTV9HUk9VUDIgPSAoKCkgPT4ge1xuICAgIGdyb3Vwcy5iID0gW107XG4gICAgZ3JvdXBzLmd5bS5wdXNoKG5ldyBUYXNrKFwiY2hlc3RcIikpO1xuICAgIGdyb3Vwcy5neW0ucHVzaChuZXcgVGFzayhcImJhY2tcIikpO1xuICAgIGdyb3Vwcy5neW0ucHVzaChuZXcgVGFzayhcImxlZ3NcIikpO1xuICB9KSgpO1xuXG4gIGNvbnN0IERFRkFVTFRfR1lNX0dST1VQMyA9ICgoKSA9PiB7XG4gICAgZ3JvdXBzLmMgPSBbXTtcbiAgICBncm91cHMuZ3ltLnB1c2gobmV3IFRhc2soXCJjaGVzdFwiKSk7XG4gICAgZ3JvdXBzLmd5bS5wdXNoKG5ldyBUYXNrKFwiYmFja1wiKSk7XG4gICAgZ3JvdXBzLmd5bS5wdXNoKG5ldyBUYXNrKFwibGVnc1wiKSk7XG4gIH0pKCk7XG5cbiAgY29uc3QgREVGQVVMVF9HWU1fR1JPVVA0ID0gKCgpID0+IHtcbiAgICBncm91cHMuZCA9IFtdO1xuICAgIGdyb3Vwcy5neW0ucHVzaChuZXcgVGFzayhcImNoZXN0XCIpKTtcbiAgICBncm91cHMuZ3ltLnB1c2gobmV3IFRhc2soXCJiYWNrXCIpKTtcbiAgICBncm91cHMuZ3ltLnB1c2gobmV3IFRhc2soXCJsZWdzXCIpKTtcbiAgfSkoKTtcblxuICBjb25zdCBERUZBVUxUX0dZTV9HUk9VUDUgPSAoKCkgPT4ge1xuICAgIGdyb3Vwcy5lID0gW107XG4gICAgZ3JvdXBzLmd5bS5wdXNoKG5ldyBUYXNrKFwiY2hlc3RcIikpO1xuICAgIGdyb3Vwcy5neW0ucHVzaChuZXcgVGFzayhcImJhY2tcIikpO1xuICAgIGdyb3Vwcy5neW0ucHVzaChuZXcgVGFzayhcImxlZ3NcIikpO1xuICB9KSgpO1xuXG4gIGNvbnN0IERFRkFVTFRfR1lNX0dST1VQNiA9ICgoKSA9PiB7XG4gICAgZ3JvdXBzLmYgPSBbXTtcbiAgICBncm91cHMuZ3ltLnB1c2gobmV3IFRhc2soXCJjaGVzdFwiKSk7XG4gICAgZ3JvdXBzLmd5bS5wdXNoKG5ldyBUYXNrKFwiYmFja1wiKSk7XG4gICAgZ3JvdXBzLmd5bS5wdXNoKG5ldyBUYXNrKFwibGVnc1wiKSk7XG4gIH0pKCk7XG4gIC8vIDwqKioqKioqKj5cblxuICBSRU5ERVJfTkFWX0JBUl9HUk9VUFMoKTtcbiAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZ3JvdXBzXCIsIEpTT04uc3RyaW5naWZ5KGdyb3VwcykpO1xufSBlbHNlIHtcbiAgUkVOREVSX05BVl9CQVJfR1JPVVBTKCk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9