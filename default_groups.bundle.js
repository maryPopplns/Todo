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
/* harmony export */   "RENDER_NAV_BAR_GROUPS": () => (/* binding */ RENDER_NAV_BAR_GROUPS),
/* harmony export */   "ADD_GROUP_INPUT": () => (/* binding */ ADD_GROUP_INPUT)
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

const ADD_GROUP_BUTTON = () => {
  const ADD_GROUP_BUTTON = document.createElement("button");
  const ADD_GROUP_PLUS_ICON = document.createElement("i");

  ADD_GROUP_BUTTON.id = "add_group";
  ADD_GROUP_BUTTON.innerText = "group";
  ADD_GROUP_PLUS_ICON.id = "add_group_plus_sign";
  ADD_GROUP_PLUS_ICON.classList = "fas fa-plus-circle";

  document.getElementById("group_container").append(ADD_GROUP_BUTTON);
  ADD_GROUP_BUTTON.prepend(ADD_GROUP_PLUS_ICON);
};

const NAV_BAR = () => {
  const NAV_CONTAINER = document.createElement("nav");
  const DUE_CONTAINER = document.createElement("ol");
  const DUE_HEADING = document.createElement("h2");
  const DUE_TODAY = document.createElement("li");
  const DUE_THIS_WEEK = document.createElement("li");
  const DUE_THIS_MONTH = document.createElement("li");
  const GROUP_CONTAINER = document.createElement("div");
  const GROUP_HEADING = document.createElement("h2");
  const GROUP_LIST = document.createElement("ol");

  NAV_CONTAINER.id = "nav_container";
  DUE_CONTAINER.id = "due_container";
  DUE_HEADING.id = "due_heading";
  DUE_TODAY.id = "due_today";
  DUE_THIS_WEEK.id = "due_this_week";
  DUE_THIS_MONTH.id = "due_this_month";
  GROUP_CONTAINER.id = "group_container";
  GROUP_HEADING.id = "group_heading";
  GROUP_LIST.id = "task_group_container";

  const TIME_PERIOD_VIEW = [DUE_TODAY, DUE_THIS_WEEK, DUE_THIS_MONTH].map(
    (element) => (element.classList = "time_periods")
  );

  DUE_HEADING.innerText = "Due";
  DUE_TODAY.innerText = "Today";
  DUE_THIS_WEEK.innerText = "Week";
  DUE_THIS_MONTH.innerText = "Month";
  GROUP_HEADING.innerText = "Groups";

  document.body.append(NAV_CONTAINER);
  NAV_CONTAINER.append(DUE_CONTAINER);
  DUE_CONTAINER.append(DUE_HEADING);
  DUE_CONTAINER.append(DUE_TODAY);
  DUE_CONTAINER.append(DUE_THIS_WEEK);
  DUE_CONTAINER.append(DUE_THIS_MONTH);
  NAV_CONTAINER.append(GROUP_CONTAINER);
  GROUP_CONTAINER.append(GROUP_HEADING);
  GROUP_CONTAINER.append(GROUP_LIST);
  ADD_GROUP_BUTTON();
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

const ADD_GROUP_INPUT = () => {
  const GROUP_CONTAINER = document.getElementById("group_container");
  const FORM = document.createElement("form");
  const INPUT = document.createElement("input");
  const SUBMIT = document.createElement("i");

  FORM.id = "add_group_form";
  INPUT.id = "add_group_input";
  SUBMIT.classList = "fas fa-sign-in-alt";
  SUBMIT.id = "submit_group_icon";

  GROUP_CONTAINER.append(FORM);
  FORM.append(INPUT);
  FORM.append(SUBMIT);

  // document.getElementById("add_group").remove();
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
} else {
  (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_1__.RENDER_NAV_BAR_GROUPS)();
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2RvbS9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaGVscGVycy9kZWZhdWx0X2dyb3Vwcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUV3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkJXOztBQUVuQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLDJDQUFNO0FBQ3pCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBU0U7Ozs7Ozs7VUNySUY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDTnlDO0FBQ2E7O0FBRXREO0FBQ0E7QUFDQTtBQUNBLElBQUksa0RBQWE7QUFDakIsSUFBSSx1REFBa0IsS0FBSyx5Q0FBSTtBQUMvQixJQUFJLHVEQUFrQixLQUFLLHlDQUFJO0FBQy9CLElBQUksdURBQWtCLEtBQUsseUNBQUk7QUFDL0IsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsSUFBSSwrQ0FBVTtBQUNkLElBQUksb0RBQWUsS0FBSyx5Q0FBSTtBQUM1QixJQUFJLG9EQUFlLEtBQUsseUNBQUk7QUFDNUIsSUFBSSxvREFBZSxLQUFLLHlDQUFJO0FBQzVCLEdBQUc7O0FBRUgsRUFBRSxrRUFBcUI7QUFDdkIsdURBQXVELDJDQUFNO0FBQzdELENBQUM7QUFDRCxFQUFFLGtFQUFxQjtBQUN2QiIsImZpbGUiOiJkZWZhdWx0X2dyb3Vwcy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgZ3JvdXBzID0ge307XG5cbmlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmxlbmd0aCAhPT0gMCkge1xuICBjb25zdCBMT0NBTF9TVE9SQUdFX0dST1VQUyA9IEpTT04ucGFyc2UoXG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZ3JvdXBzXCIpXG4gICk7XG4gIGdyb3VwcyA9IExPQ0FMX1NUT1JBR0VfR1JPVVBTO1xufVxuXG5jb25zdCBUYXNrID0gY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihsYWJlbCA9IFwiXCIsIHByaW9yaXR5ID0gXCJsb3dcIiwgZHVlX2RhdGUgPSBcIlwiLCBub3RlcyA9IFwiXCIpIHtcbiAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMuZHVlX2RhdGUgPSBkdWVfZGF0ZTtcbiAgICB0aGlzLm5vdGVzID0gbm90ZXM7XG4gICAgdGhpcy5kYXRlX2NyZWF0ZWQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgfVxufTtcblxuZXhwb3J0IHsgZ3JvdXBzLCBUYXNrIH07XG4iLCJpbXBvcnQgeyBncm91cHMgfSBmcm9tIFwiLi4vYXBwLmpzXCI7XG5cbmNvbnN0IE1FVEFfREFUQSA9ICgpID0+IHtcbiAgY29uc3QgRk9OVF9BV0VTT01FID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cbiAgRk9OVF9BV0VTT01FLnNldEF0dHJpYnV0ZShcInJlbFwiLCBcInN0eWxlc2hlZXRcIik7XG4gIEZPTlRfQVdFU09NRS5zZXRBdHRyaWJ1dGUoXG4gICAgXCJocmVmXCIsXG4gICAgXCJodHRwczovL3VzZS5mb250YXdlc29tZS5jb20vcmVsZWFzZXMvdjUuMTUuMy9jc3MvYWxsLmNzc1wiXG4gICk7XG4gIEZPTlRfQVdFU09NRS5zZXRBdHRyaWJ1dGUoXG4gICAgXCJpbnRlZ3JpdHlcIixcbiAgICBcInNoYTM4NC1TWlh4WDR3aEo3OS9nRXJ3Y09ZZit6V0xlSmRZL3FwdXFDNGNBYTlyT0dVc3RQb210cXB1TldUOXdkUEVuMmZrXCJcbiAgKTtcbiAgRk9OVF9BV0VTT01FLnNldEF0dHJpYnV0ZShcImNyb3Nzb3JpZ2luXCIsIFwiYW5vbnltb3VzXCIpO1xuXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kKEZPTlRfQVdFU09NRSk7XG59O1xuXG5jb25zdCBNRU5VX0JVVFRPTiA9ICgpID0+IHtcbiAgY29uc3QgSEFNQlVSR0VSX01FTlVfQlVUVE9OID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgY29uc3QgSEFNQlVSR0VSX0JVVFRPTl9JQ09OID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG5cbiAgSEFNQlVSR0VSX01FTlVfQlVUVE9OLmlkID0gXCJoYW1idXJnZXJfbWVudV9idXR0b25cIjtcbiAgSEFNQlVSR0VSX0JVVFRPTl9JQ09OLmNsYXNzTGlzdCA9IFwiZmFzIGZhLWFsaWduLWp1c3RpZnlcIjtcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZChIQU1CVVJHRVJfTUVOVV9CVVRUT04pO1xuICBIQU1CVVJHRVJfTUVOVV9CVVRUT04uYXBwZW5kKEhBTUJVUkdFUl9CVVRUT05fSUNPTik7XG59O1xuXG5jb25zdCBIRUFERVIgPSAoKSA9PiB7XG4gIGNvbnN0IEhFQURFUl9DT05UQUlORVIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICBjb25zdCBOQVZfQkFSX1RFWFQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG5cbiAgTkFWX0JBUl9URVhULmlubmVyVGV4dCA9IFwiVGFzayBNYXN0ZXJcIjtcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZChIRUFERVJfQ09OVEFJTkVSKTtcbiAgSEVBREVSX0NPTlRBSU5FUi5hcHBlbmQoTkFWX0JBUl9URVhUKTtcbn07XG5cbmNvbnN0IEFERF9HUk9VUF9CVVRUT04gPSAoKSA9PiB7XG4gIGNvbnN0IEFERF9HUk9VUF9CVVRUT04gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBjb25zdCBBRERfR1JPVVBfUExVU19JQ09OID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG5cbiAgQUREX0dST1VQX0JVVFRPTi5pZCA9IFwiYWRkX2dyb3VwXCI7XG4gIEFERF9HUk9VUF9CVVRUT04uaW5uZXJUZXh0ID0gXCJncm91cFwiO1xuICBBRERfR1JPVVBfUExVU19JQ09OLmlkID0gXCJhZGRfZ3JvdXBfcGx1c19zaWduXCI7XG4gIEFERF9HUk9VUF9QTFVTX0lDT04uY2xhc3NMaXN0ID0gXCJmYXMgZmEtcGx1cy1jaXJjbGVcIjtcblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdyb3VwX2NvbnRhaW5lclwiKS5hcHBlbmQoQUREX0dST1VQX0JVVFRPTik7XG4gIEFERF9HUk9VUF9CVVRUT04ucHJlcGVuZChBRERfR1JPVVBfUExVU19JQ09OKTtcbn07XG5cbmNvbnN0IE5BVl9CQVIgPSAoKSA9PiB7XG4gIGNvbnN0IE5BVl9DT05UQUlORVIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibmF2XCIpO1xuICBjb25zdCBEVUVfQ09OVEFJTkVSID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9sXCIpO1xuICBjb25zdCBEVUVfSEVBRElORyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgY29uc3QgRFVFX1RPREFZID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBjb25zdCBEVUVfVEhJU19XRUVLID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBjb25zdCBEVUVfVEhJU19NT05USCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgY29uc3QgR1JPVVBfQ09OVEFJTkVSID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgR1JPVVBfSEVBRElORyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgY29uc3QgR1JPVVBfTElTVCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvbFwiKTtcblxuICBOQVZfQ09OVEFJTkVSLmlkID0gXCJuYXZfY29udGFpbmVyXCI7XG4gIERVRV9DT05UQUlORVIuaWQgPSBcImR1ZV9jb250YWluZXJcIjtcbiAgRFVFX0hFQURJTkcuaWQgPSBcImR1ZV9oZWFkaW5nXCI7XG4gIERVRV9UT0RBWS5pZCA9IFwiZHVlX3RvZGF5XCI7XG4gIERVRV9USElTX1dFRUsuaWQgPSBcImR1ZV90aGlzX3dlZWtcIjtcbiAgRFVFX1RISVNfTU9OVEguaWQgPSBcImR1ZV90aGlzX21vbnRoXCI7XG4gIEdST1VQX0NPTlRBSU5FUi5pZCA9IFwiZ3JvdXBfY29udGFpbmVyXCI7XG4gIEdST1VQX0hFQURJTkcuaWQgPSBcImdyb3VwX2hlYWRpbmdcIjtcbiAgR1JPVVBfTElTVC5pZCA9IFwidGFza19ncm91cF9jb250YWluZXJcIjtcblxuICBjb25zdCBUSU1FX1BFUklPRF9WSUVXID0gW0RVRV9UT0RBWSwgRFVFX1RISVNfV0VFSywgRFVFX1RISVNfTU9OVEhdLm1hcChcbiAgICAoZWxlbWVudCkgPT4gKGVsZW1lbnQuY2xhc3NMaXN0ID0gXCJ0aW1lX3BlcmlvZHNcIilcbiAgKTtcblxuICBEVUVfSEVBRElORy5pbm5lclRleHQgPSBcIkR1ZVwiO1xuICBEVUVfVE9EQVkuaW5uZXJUZXh0ID0gXCJUb2RheVwiO1xuICBEVUVfVEhJU19XRUVLLmlubmVyVGV4dCA9IFwiV2Vla1wiO1xuICBEVUVfVEhJU19NT05USC5pbm5lclRleHQgPSBcIk1vbnRoXCI7XG4gIEdST1VQX0hFQURJTkcuaW5uZXJUZXh0ID0gXCJHcm91cHNcIjtcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZChOQVZfQ09OVEFJTkVSKTtcbiAgTkFWX0NPTlRBSU5FUi5hcHBlbmQoRFVFX0NPTlRBSU5FUik7XG4gIERVRV9DT05UQUlORVIuYXBwZW5kKERVRV9IRUFESU5HKTtcbiAgRFVFX0NPTlRBSU5FUi5hcHBlbmQoRFVFX1RPREFZKTtcbiAgRFVFX0NPTlRBSU5FUi5hcHBlbmQoRFVFX1RISVNfV0VFSyk7XG4gIERVRV9DT05UQUlORVIuYXBwZW5kKERVRV9USElTX01PTlRIKTtcbiAgTkFWX0NPTlRBSU5FUi5hcHBlbmQoR1JPVVBfQ09OVEFJTkVSKTtcbiAgR1JPVVBfQ09OVEFJTkVSLmFwcGVuZChHUk9VUF9IRUFESU5HKTtcbiAgR1JPVVBfQ09OVEFJTkVSLmFwcGVuZChHUk9VUF9MSVNUKTtcbiAgQUREX0dST1VQX0JVVFRPTigpO1xufTtcblxuY29uc3QgUkVOREVSX05BVl9CQVJfR1JPVVBTID0gKCkgPT4ge1xuICBjb25zdCBHUk9VUFNfQ09OVEFJTkVSID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrX2dyb3VwX2NvbnRhaW5lclwiKTtcbiAgZm9yIChsZXQgcHJvcCBpbiBncm91cHMpIHtcbiAgICBjb25zdCBHUk9VUCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblxuICAgIEdST1VQLmNsYXNzTGlzdCA9IFwibmF2X2Jhcl9ncm91cFwiO1xuICAgIEdST1VQLmlubmVyVGV4dCA9IHByb3A7XG5cbiAgICBHUk9VUFNfQ09OVEFJTkVSLmFwcGVuZChHUk9VUCk7XG4gIH1cbn07XG5cbmNvbnN0IEFERF9HUk9VUF9JTlBVVCA9ICgpID0+IHtcbiAgY29uc3QgR1JPVVBfQ09OVEFJTkVSID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJncm91cF9jb250YWluZXJcIik7XG4gIGNvbnN0IEZPUk0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgY29uc3QgSU5QVVQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gIGNvbnN0IFNVQk1JVCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuXG4gIEZPUk0uaWQgPSBcImFkZF9ncm91cF9mb3JtXCI7XG4gIElOUFVULmlkID0gXCJhZGRfZ3JvdXBfaW5wdXRcIjtcbiAgU1VCTUlULmNsYXNzTGlzdCA9IFwiZmFzIGZhLXNpZ24taW4tYWx0XCI7XG4gIFNVQk1JVC5pZCA9IFwic3VibWl0X2dyb3VwX2ljb25cIjtcblxuICBHUk9VUF9DT05UQUlORVIuYXBwZW5kKEZPUk0pO1xuICBGT1JNLmFwcGVuZChJTlBVVCk7XG4gIEZPUk0uYXBwZW5kKFNVQk1JVCk7XG5cbiAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRfZ3JvdXBcIikucmVtb3ZlKCk7XG59O1xuXG5leHBvcnQge1xuICBIRUFERVIsXG4gIE1FVEFfREFUQSxcbiAgTkFWX0JBUixcbiAgTUVOVV9CVVRUT04sXG4gIFJFTkRFUl9OQVZfQkFSX0dST1VQUyxcbiAgQUREX0dST1VQX0lOUFVULFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ3JvdXBzLCBUYXNrIH0gZnJvbSBcIi4uL2FwcC5qc1wiO1xuaW1wb3J0IHsgUkVOREVSX05BVl9CQVJfR1JPVVBTIH0gZnJvbSBcIi4uL2RvbS9kb20uanNcIjtcblxuaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UubGVuZ3RoID09PSAwKSB7XG4gIC8vIDwtc2Nob29sLT5cbiAgY29uc3QgREVGQVVMVF9TQ0hPT0xfR1JPVVAgPSAoKCkgPT4ge1xuICAgIGdyb3Vwcy5zY2hvb2wgPSBbXTtcbiAgICBncm91cHMuc2Nob29sLnB1c2gobmV3IFRhc2soXCJtYXRoXCIpKTtcbiAgICBncm91cHMuc2Nob29sLnB1c2gobmV3IFRhc2soXCJzY2llbmNlXCIpKTtcbiAgICBncm91cHMuc2Nob29sLnB1c2gobmV3IFRhc2soXCJoaXN0b3J5XCIpKTtcbiAgfSkoKTtcblxuICAvLyA8LWd5bS0+XG4gIGNvbnN0IERFRkFVTFRfR1lNX0dST1VQID0gKCgpID0+IHtcbiAgICBncm91cHMuZ3ltID0gW107XG4gICAgZ3JvdXBzLmd5bS5wdXNoKG5ldyBUYXNrKFwiY2hlc3RcIikpO1xuICAgIGdyb3Vwcy5neW0ucHVzaChuZXcgVGFzayhcImJhY2tcIikpO1xuICAgIGdyb3Vwcy5neW0ucHVzaChuZXcgVGFzayhcImxlZ3NcIikpO1xuICB9KSgpO1xuXG4gIFJFTkRFUl9OQVZfQkFSX0dST1VQUygpO1xuICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJncm91cHNcIiwgSlNPTi5zdHJpbmdpZnkoZ3JvdXBzKSk7XG59IGVsc2Uge1xuICBSRU5ERVJfTkFWX0JBUl9HUk9VUFMoKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=