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
/* harmony export */   "SET_STORAGE": () => (/* binding */ SET_STORAGE),
/* harmony export */   "Task": () => (/* binding */ Task)
/* harmony export */ });
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
/* harmony import */ var _event_listeners_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event_listeners.js */ "./src/dom/event_listeners.js");



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

  const ADD_GROUP_BUTTON = (() => {
    const ADD_GROUP_BUTTON = document.createElement("button");
    const ADD_GROUP_PLUS_ICON = document.createElement("i");

    ADD_GROUP_BUTTON.id = "add_group";
    ADD_GROUP_BUTTON.innerText = "group";
    ADD_GROUP_PLUS_ICON.id = "add_group_plus_sign";
    ADD_GROUP_PLUS_ICON.classList = "fas fa-plus-circle";

    document.getElementById("group_container").append(ADD_GROUP_BUTTON);
    ADD_GROUP_BUTTON.prepend(ADD_GROUP_PLUS_ICON);
  })();
};

const RENDER_NAV_BAR_GROUPS = () => {
  const REMOVE_ALL_GROUPS = [
    ...document.getElementById("task_group_container").children,
  ].map((node) => node.remove());

  const GROUPS_CONTAINER = document.getElementById("task_group_container");
  for (let prop in _app_js__WEBPACK_IMPORTED_MODULE_0__.groups) {
    const GROUP = document.createElement("li");
    const TEXT = document.createElement("div");
    const TRASH = document.createElement("i");

    GROUP.setAttribute("data-group-container", prop);
    GROUP.classList = "nav_bar_group";
    TEXT.innerText = prop;
    TEXT.id = "group_heading";
    TRASH.classList = "delete_group fa fa-trash";
    TRASH.setAttribute("data-group", prop);
    TRASH.setAttribute("aria-hidden", "true");

    (0,_event_listeners_js__WEBPACK_IMPORTED_MODULE_1__.ATTACH_DELETE_GROUP_LISTENER)(TRASH);
    (0,_event_listeners_js__WEBPACK_IMPORTED_MODULE_1__.ATTACH_RENDER_GROUP_LISTENER)(GROUP);

    GROUPS_CONTAINER.append(GROUP);
    GROUP.append(TEXT);
    GROUP.append(TRASH);
  }
};

const ADD_GROUP_INPUT = () => {
  const GROUP_CONTAINER = document.getElementById("group_container");
  const FORM = document.createElement("form");
  const CANCEL = document.createElement("i");
  const INPUT = document.createElement("input");
  const SUBMIT = document.createElement("i");

  FORM.id = "add_group_form";
  CANCEL.id = "cancel_group_icon";
  CANCEL.classList = "fas fa-window-close";
  INPUT.id = "add_group_input";
  SUBMIT.classList = "fas fa-sign-in-alt";
  SUBMIT.id = "submit_group_icon";

  GROUP_CONTAINER.append(FORM);
  FORM.append(CANCEL);
  FORM.append(INPUT);
  FORM.append(SUBMIT);
};




/***/ }),

/***/ "./src/dom/event_listeners.js":
/*!************************************!*\
  !*** ./src/dom/event_listeners.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EVENT_LISTENERS": () => (/* binding */ EVENT_LISTENERS),
/* harmony export */   "ATTACH_DELETE_GROUP_LISTENER": () => (/* binding */ ATTACH_DELETE_GROUP_LISTENER),
/* harmony export */   "ATTACH_RENDER_GROUP_LISTENER": () => (/* binding */ ATTACH_RENDER_GROUP_LISTENER)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/dom/dom.js");
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.js */ "./src/app.js");



const EVENT_LISTENERS = () => {
  const HAMBURGER_MENU = (() => {
    const MENU_BUTTON = document.getElementById("hamburger_menu_button");

    MENU_BUTTON.addEventListener("click", () => {
      const NAV_MENU = document.getElementById("nav_container");
      NAV_MENU.style.display = "block";
      MENU_BUTTON.style.display = "none";
    });
  })();

  const ADD_GROUP_BUTTON = (() => {
    const ADD_BUTTON = document.getElementById("add_group");

    ADD_BUTTON.addEventListener("click", () => {
      document.getElementById("add_group").style.display = "none";
      document.getElementById("add_group_form").style.display = "flex";
      document.getElementById("add_group_input").focus();
    });
  })();

  const CANCEL_NEW_GROUP_ICON = (() => {
    const CANCEL_BUTTON = document.getElementById("cancel_group_icon");

    CANCEL_BUTTON.addEventListener("click", () => {
      document.getElementById("add_group").style.display = "flex";
      document.getElementById("add_group_form").style.display = "none";
    });
  })();

  const SUBMIT_NEW_GROUP_ICON = (() => {
    const SUBMIT_BUTTON = document.getElementById("submit_group_icon");

    SUBMIT_BUTTON.addEventListener("click", () => {
      const INPUT_TEXT = document.getElementById("add_group_input").value;
      _app_js__WEBPACK_IMPORTED_MODULE_1__.groups[INPUT_TEXT] = [];
      document.getElementById("add_group_input").value = "";
      (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.RENDER_NAV_BAR_GROUPS)();
      document.getElementById("add_group").style.display = "flex";
      document.getElementById("add_group_form").style.display = "none";
      (0,_app_js__WEBPACK_IMPORTED_MODULE_1__.SET_STORAGE)();
    });
  })();

  const GROUP_INPUT_VALIDATION = (() => {
    const INPUT_FIELD = document.getElementById("add_group_input");

    INPUT_FIELD.addEventListener("keyup", () => {
      const INPUT_TEXT = INPUT_FIELD.value;
      const GROUPS = Object.keys(_app_js__WEBPACK_IMPORTED_MODULE_1__.groups);

      if (GROUPS.includes(INPUT_TEXT)) {
        INPUT_FIELD.style.backgroundColor = "rgb(181, 40, 40)";
        document.getElementById("submit_group_icon").style.visibility =
          "hidden";
      } else {
        INPUT_FIELD.style.backgroundColor = "rgb(35, 179, 129)";
        document.getElementById("submit_group_icon").style.visibility =
          "visible";
      }
    });
  })();
};

const ATTACH_DELETE_GROUP_LISTENER = (input_element) => {
  input_element.addEventListener("mouseenter", (event) => {
    const TARGET_DATA_GROUP = event.target.getAttribute("data-group");
    const GROUP_CONTAINER = document.querySelector(
      `[data-group-container=${TARGET_DATA_GROUP}]`
    );
    GROUP_CONTAINER.style.backgroundColor = "#b52828";
  });

  input_element.addEventListener("mouseleave", (event) => {
    const TARGET_DATA_GROUP = event.target.getAttribute("data-group");
    const GROUP_CONTAINER = document.querySelector(
      `[data-group-container=${TARGET_DATA_GROUP}]`
    );
    GROUP_CONTAINER.style.backgroundColor = "#28bda7";
  });

  input_element.addEventListener("click", (event) => {
    const TARGET_DATA_GROUP = event.target.getAttribute("data-group");
    delete _app_js__WEBPACK_IMPORTED_MODULE_1__.groups[TARGET_DATA_GROUP];
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.RENDER_NAV_BAR_GROUPS)();
    (0,_app_js__WEBPACK_IMPORTED_MODULE_1__.SET_STORAGE)();
  });
};

const ATTACH_RENDER_GROUP_LISTENER = (input_element) => {
  input_element.addEventListener("click", (event) => {
    console.log(event);
    console.log(_app_js__WEBPACK_IMPORTED_MODULE_1__.groups);
    // window.localStorage.clear();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2RvbS9kb20uanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9kb20vZXZlbnRfbGlzdGVuZXJzLmpzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2hlbHBlcnMvZGVmYXVsdF9ncm91cHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUJGO0FBSUw7O0FBRTlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLDJDQUFNO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLGlGQUE0QjtBQUNoQyxJQUFJLGlGQUE0Qjs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBU0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxSndFO0FBQzFCOztBQUVoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNLDJDQUFNO0FBQ1o7QUFDQSxNQUFNLDhEQUFxQjtBQUMzQjtBQUNBO0FBQ0EsTUFBTSxvREFBVztBQUNqQixLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQ0FBaUMsMkNBQU07O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixrQkFBa0I7QUFDakQ7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGtCQUFrQjtBQUNqRDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsV0FBVywyQ0FBTTtBQUNqQixJQUFJLDhEQUFxQjtBQUN6QixJQUFJLG9EQUFXO0FBQ2YsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiwyQ0FBTTtBQUN0QjtBQUNBLEdBQUc7QUFDSDs7QUFNRTs7Ozs7OztVQ3hHRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7QUNOeUM7QUFDYTs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0EsSUFBSSxrREFBYTtBQUNqQixJQUFJLHVEQUFrQixLQUFLLHlDQUFJO0FBQy9CLElBQUksdURBQWtCLEtBQUsseUNBQUk7QUFDL0IsSUFBSSx1REFBa0IsS0FBSyx5Q0FBSTtBQUMvQixHQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFJLCtDQUFVO0FBQ2QsSUFBSSxvREFBZSxLQUFLLHlDQUFJO0FBQzVCLElBQUksb0RBQWUsS0FBSyx5Q0FBSTtBQUM1QixJQUFJLG9EQUFlLEtBQUsseUNBQUk7QUFDNUIsR0FBRzs7QUFFSCxFQUFFLGtFQUFxQjtBQUN2Qix1REFBdUQsMkNBQU07QUFDN0QsQ0FBQztBQUNELEVBQUUsa0VBQXFCO0FBQ3ZCIiwiZmlsZSI6ImRlZmF1bHRfZ3JvdXBzLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBncm91cHMgPSB7fTtcblxuaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UubGVuZ3RoICE9PSAwKSB7XG4gIGNvbnN0IExPQ0FMX1NUT1JBR0VfR1JPVVBTID0gSlNPTi5wYXJzZShcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJncm91cHNcIilcbiAgKTtcbiAgZ3JvdXBzID0gTE9DQUxfU1RPUkFHRV9HUk9VUFM7XG59XG5cbndpbmRvdy5sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcblxuY29uc3QgU0VUX1NUT1JBR0UgPSAoKSA9PiB7XG4gIHdpbmRvdy5sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZ3JvdXBzXCIsIEpTT04uc3RyaW5naWZ5KGdyb3VwcykpO1xufTtcblxuY29uc3QgVGFzayA9IGNsYXNzIHtcbiAgY29uc3RydWN0b3IobGFiZWwgPSBcIlwiLCBwcmlvcml0eSA9IFwibG93XCIsIGR1ZV9kYXRlID0gXCJcIiwgbm90ZXMgPSBcIlwiKSB7XG4gICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB0aGlzLmR1ZV9kYXRlID0gZHVlX2RhdGU7XG4gICAgdGhpcy5ub3RlcyA9IG5vdGVzO1xuICAgIHRoaXMuZGF0ZV9jcmVhdGVkID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIH1cbn07XG5cbmV4cG9ydCB7IGdyb3VwcywgU0VUX1NUT1JBR0UsIFRhc2sgfTtcbiIsImltcG9ydCB7IGdyb3VwcyB9IGZyb20gXCIuLi9hcHAuanNcIjtcbmltcG9ydCB7XG4gIEFUVEFDSF9ERUxFVEVfR1JPVVBfTElTVEVORVIsXG4gIEFUVEFDSF9SRU5ERVJfR1JPVVBfTElTVEVORVIsXG59IGZyb20gXCIuL2V2ZW50X2xpc3RlbmVycy5qc1wiO1xuXG5jb25zdCBNRVRBX0RBVEEgPSAoKSA9PiB7XG4gIGNvbnN0IEZPTlRfQVdFU09NRSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG4gIEZPTlRfQVdFU09NRS5zZXRBdHRyaWJ1dGUoXCJyZWxcIiwgXCJzdHlsZXNoZWV0XCIpO1xuICBGT05UX0FXRVNPTUUuc2V0QXR0cmlidXRlKFxuICAgIFwiaHJlZlwiLFxuICAgIFwiaHR0cHM6Ly91c2UuZm9udGF3ZXNvbWUuY29tL3JlbGVhc2VzL3Y1LjE1LjMvY3NzL2FsbC5jc3NcIlxuICApO1xuICBGT05UX0FXRVNPTUUuc2V0QXR0cmlidXRlKFxuICAgIFwiaW50ZWdyaXR5XCIsXG4gICAgXCJzaGEzODQtU1pYeFg0d2hKNzkvZ0Vyd2NPWWYreldMZUpkWS9xcHVxQzRjQWE5ck9HVXN0UG9tdHFwdU5XVDl3ZFBFbjJma1wiXG4gICk7XG4gIEZPTlRfQVdFU09NRS5zZXRBdHRyaWJ1dGUoXCJjcm9zc29yaWdpblwiLCBcImFub255bW91c1wiKTtcblxuICBkb2N1bWVudC5oZWFkLmFwcGVuZChGT05UX0FXRVNPTUUpO1xufTtcblxuY29uc3QgTUVOVV9CVVRUT04gPSAoKSA9PiB7XG4gIGNvbnN0IEhBTUJVUkdFUl9NRU5VX0JVVFRPTiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGNvbnN0IEhBTUJVUkdFUl9CVVRUT05fSUNPTiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuXG4gIEhBTUJVUkdFUl9NRU5VX0JVVFRPTi5pZCA9IFwiaGFtYnVyZ2VyX21lbnVfYnV0dG9uXCI7XG4gIEhBTUJVUkdFUl9CVVRUT05fSUNPTi5jbGFzc0xpc3QgPSBcImZhcyBmYS1hbGlnbi1qdXN0aWZ5XCI7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmQoSEFNQlVSR0VSX01FTlVfQlVUVE9OKTtcbiAgSEFNQlVSR0VSX01FTlVfQlVUVE9OLmFwcGVuZChIQU1CVVJHRVJfQlVUVE9OX0lDT04pO1xufTtcblxuY29uc3QgSEVBREVSID0gKCkgPT4ge1xuICBjb25zdCBIRUFERVJfQ09OVEFJTkVSID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgY29uc3QgTkFWX0JBUl9URVhUID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuXG4gIE5BVl9CQVJfVEVYVC5pbm5lclRleHQgPSBcIlRhc2sgTWFzdGVyXCI7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmQoSEVBREVSX0NPTlRBSU5FUik7XG4gIEhFQURFUl9DT05UQUlORVIuYXBwZW5kKE5BVl9CQVJfVEVYVCk7XG59O1xuXG5jb25zdCBOQVZfQkFSID0gKCkgPT4ge1xuICBjb25zdCBOQVZfQ09OVEFJTkVSID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm5hdlwiKTtcbiAgY29uc3QgRFVFX0NPTlRBSU5FUiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvbFwiKTtcbiAgY29uc3QgRFVFX0hFQURJTkcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gIGNvbnN0IERVRV9UT0RBWSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgY29uc3QgRFVFX1RISVNfV0VFSyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgY29uc3QgRFVFX1RISVNfTU9OVEggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gIGNvbnN0IEdST1VQX0NPTlRBSU5FUiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IEdST1VQX0hFQURJTkcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gIGNvbnN0IEdST1VQX0xJU1QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib2xcIik7XG5cbiAgTkFWX0NPTlRBSU5FUi5pZCA9IFwibmF2X2NvbnRhaW5lclwiO1xuICBEVUVfQ09OVEFJTkVSLmlkID0gXCJkdWVfY29udGFpbmVyXCI7XG4gIERVRV9IRUFESU5HLmlkID0gXCJkdWVfaGVhZGluZ1wiO1xuICBEVUVfVE9EQVkuaWQgPSBcImR1ZV90b2RheVwiO1xuICBEVUVfVEhJU19XRUVLLmlkID0gXCJkdWVfdGhpc193ZWVrXCI7XG4gIERVRV9USElTX01PTlRILmlkID0gXCJkdWVfdGhpc19tb250aFwiO1xuICBHUk9VUF9DT05UQUlORVIuaWQgPSBcImdyb3VwX2NvbnRhaW5lclwiO1xuICBHUk9VUF9IRUFESU5HLmlkID0gXCJncm91cF9oZWFkaW5nXCI7XG4gIEdST1VQX0xJU1QuaWQgPSBcInRhc2tfZ3JvdXBfY29udGFpbmVyXCI7XG5cbiAgY29uc3QgVElNRV9QRVJJT0RfVklFVyA9IFtEVUVfVE9EQVksIERVRV9USElTX1dFRUssIERVRV9USElTX01PTlRIXS5tYXAoXG4gICAgKGVsZW1lbnQpID0+IChlbGVtZW50LmNsYXNzTGlzdCA9IFwidGltZV9wZXJpb2RzXCIpXG4gICk7XG5cbiAgRFVFX0hFQURJTkcuaW5uZXJUZXh0ID0gXCJEdWVcIjtcbiAgRFVFX1RPREFZLmlubmVyVGV4dCA9IFwiVG9kYXlcIjtcbiAgRFVFX1RISVNfV0VFSy5pbm5lclRleHQgPSBcIldlZWtcIjtcbiAgRFVFX1RISVNfTU9OVEguaW5uZXJUZXh0ID0gXCJNb250aFwiO1xuICBHUk9VUF9IRUFESU5HLmlubmVyVGV4dCA9IFwiR3JvdXBzXCI7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmQoTkFWX0NPTlRBSU5FUik7XG4gIE5BVl9DT05UQUlORVIuYXBwZW5kKERVRV9DT05UQUlORVIpO1xuICBEVUVfQ09OVEFJTkVSLmFwcGVuZChEVUVfSEVBRElORyk7XG4gIERVRV9DT05UQUlORVIuYXBwZW5kKERVRV9UT0RBWSk7XG4gIERVRV9DT05UQUlORVIuYXBwZW5kKERVRV9USElTX1dFRUspO1xuICBEVUVfQ09OVEFJTkVSLmFwcGVuZChEVUVfVEhJU19NT05USCk7XG4gIE5BVl9DT05UQUlORVIuYXBwZW5kKEdST1VQX0NPTlRBSU5FUik7XG4gIEdST1VQX0NPTlRBSU5FUi5hcHBlbmQoR1JPVVBfSEVBRElORyk7XG4gIEdST1VQX0NPTlRBSU5FUi5hcHBlbmQoR1JPVVBfTElTVCk7XG5cbiAgY29uc3QgQUREX0dST1VQX0JVVFRPTiA9ICgoKSA9PiB7XG4gICAgY29uc3QgQUREX0dST1VQX0JVVFRPTiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgY29uc3QgQUREX0dST1VQX1BMVVNfSUNPTiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuXG4gICAgQUREX0dST1VQX0JVVFRPTi5pZCA9IFwiYWRkX2dyb3VwXCI7XG4gICAgQUREX0dST1VQX0JVVFRPTi5pbm5lclRleHQgPSBcImdyb3VwXCI7XG4gICAgQUREX0dST1VQX1BMVVNfSUNPTi5pZCA9IFwiYWRkX2dyb3VwX3BsdXNfc2lnblwiO1xuICAgIEFERF9HUk9VUF9QTFVTX0lDT04uY2xhc3NMaXN0ID0gXCJmYXMgZmEtcGx1cy1jaXJjbGVcIjtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ3JvdXBfY29udGFpbmVyXCIpLmFwcGVuZChBRERfR1JPVVBfQlVUVE9OKTtcbiAgICBBRERfR1JPVVBfQlVUVE9OLnByZXBlbmQoQUREX0dST1VQX1BMVVNfSUNPTik7XG4gIH0pKCk7XG59O1xuXG5jb25zdCBSRU5ERVJfTkFWX0JBUl9HUk9VUFMgPSAoKSA9PiB7XG4gIGNvbnN0IFJFTU9WRV9BTExfR1JPVVBTID0gW1xuICAgIC4uLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza19ncm91cF9jb250YWluZXJcIikuY2hpbGRyZW4sXG4gIF0ubWFwKChub2RlKSA9PiBub2RlLnJlbW92ZSgpKTtcblxuICBjb25zdCBHUk9VUFNfQ09OVEFJTkVSID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrX2dyb3VwX2NvbnRhaW5lclwiKTtcbiAgZm9yIChsZXQgcHJvcCBpbiBncm91cHMpIHtcbiAgICBjb25zdCBHUk9VUCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICBjb25zdCBURVhUID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBUUkFTSCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuXG4gICAgR1JPVVAuc2V0QXR0cmlidXRlKFwiZGF0YS1ncm91cC1jb250YWluZXJcIiwgcHJvcCk7XG4gICAgR1JPVVAuY2xhc3NMaXN0ID0gXCJuYXZfYmFyX2dyb3VwXCI7XG4gICAgVEVYVC5pbm5lclRleHQgPSBwcm9wO1xuICAgIFRFWFQuaWQgPSBcImdyb3VwX2hlYWRpbmdcIjtcbiAgICBUUkFTSC5jbGFzc0xpc3QgPSBcImRlbGV0ZV9ncm91cCBmYSBmYS10cmFzaFwiO1xuICAgIFRSQVNILnNldEF0dHJpYnV0ZShcImRhdGEtZ3JvdXBcIiwgcHJvcCk7XG4gICAgVFJBU0guc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuXG4gICAgQVRUQUNIX0RFTEVURV9HUk9VUF9MSVNURU5FUihUUkFTSCk7XG4gICAgQVRUQUNIX1JFTkRFUl9HUk9VUF9MSVNURU5FUihHUk9VUCk7XG5cbiAgICBHUk9VUFNfQ09OVEFJTkVSLmFwcGVuZChHUk9VUCk7XG4gICAgR1JPVVAuYXBwZW5kKFRFWFQpO1xuICAgIEdST1VQLmFwcGVuZChUUkFTSCk7XG4gIH1cbn07XG5cbmNvbnN0IEFERF9HUk9VUF9JTlBVVCA9ICgpID0+IHtcbiAgY29uc3QgR1JPVVBfQ09OVEFJTkVSID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJncm91cF9jb250YWluZXJcIik7XG4gIGNvbnN0IEZPUk0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgY29uc3QgQ0FOQ0VMID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gIGNvbnN0IElOUFVUID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBjb25zdCBTVUJNSVQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcblxuICBGT1JNLmlkID0gXCJhZGRfZ3JvdXBfZm9ybVwiO1xuICBDQU5DRUwuaWQgPSBcImNhbmNlbF9ncm91cF9pY29uXCI7XG4gIENBTkNFTC5jbGFzc0xpc3QgPSBcImZhcyBmYS13aW5kb3ctY2xvc2VcIjtcbiAgSU5QVVQuaWQgPSBcImFkZF9ncm91cF9pbnB1dFwiO1xuICBTVUJNSVQuY2xhc3NMaXN0ID0gXCJmYXMgZmEtc2lnbi1pbi1hbHRcIjtcbiAgU1VCTUlULmlkID0gXCJzdWJtaXRfZ3JvdXBfaWNvblwiO1xuXG4gIEdST1VQX0NPTlRBSU5FUi5hcHBlbmQoRk9STSk7XG4gIEZPUk0uYXBwZW5kKENBTkNFTCk7XG4gIEZPUk0uYXBwZW5kKElOUFVUKTtcbiAgRk9STS5hcHBlbmQoU1VCTUlUKTtcbn07XG5cbmV4cG9ydCB7XG4gIEhFQURFUixcbiAgTUVUQV9EQVRBLFxuICBOQVZfQkFSLFxuICBNRU5VX0JVVFRPTixcbiAgUkVOREVSX05BVl9CQVJfR1JPVVBTLFxuICBBRERfR1JPVVBfSU5QVVQsXG59O1xuIiwiaW1wb3J0IHsgQUREX0dST1VQX0lOUFVUX0hBTkRMRVIsIFJFTkRFUl9OQVZfQkFSX0dST1VQUyB9IGZyb20gXCIuL2RvbS5qc1wiO1xuaW1wb3J0IHsgZ3JvdXBzLCBTRVRfU1RPUkFHRSB9IGZyb20gXCIuLi9hcHAuanNcIjtcblxuY29uc3QgRVZFTlRfTElTVEVORVJTID0gKCkgPT4ge1xuICBjb25zdCBIQU1CVVJHRVJfTUVOVSA9ICgoKSA9PiB7XG4gICAgY29uc3QgTUVOVV9CVVRUT04gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhhbWJ1cmdlcl9tZW51X2J1dHRvblwiKTtcblxuICAgIE1FTlVfQlVUVE9OLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBOQVZfTUVOVSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2X2NvbnRhaW5lclwiKTtcbiAgICAgIE5BVl9NRU5VLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICBNRU5VX0JVVFRPTi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfSk7XG4gIH0pKCk7XG5cbiAgY29uc3QgQUREX0dST1VQX0JVVFRPTiA9ICgoKSA9PiB7XG4gICAgY29uc3QgQUREX0JVVFRPTiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX2dyb3VwXCIpO1xuXG4gICAgQUREX0JVVFRPTi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRfZ3JvdXBcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRfZ3JvdXBfZm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9ncm91cF9pbnB1dFwiKS5mb2N1cygpO1xuICAgIH0pO1xuICB9KSgpO1xuXG4gIGNvbnN0IENBTkNFTF9ORVdfR1JPVVBfSUNPTiA9ICgoKSA9PiB7XG4gICAgY29uc3QgQ0FOQ0VMX0JVVFRPTiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FuY2VsX2dyb3VwX2ljb25cIik7XG5cbiAgICBDQU5DRUxfQlVUVE9OLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9ncm91cFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9ncm91cF9mb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9KTtcbiAgfSkoKTtcblxuICBjb25zdCBTVUJNSVRfTkVXX0dST1VQX0lDT04gPSAoKCkgPT4ge1xuICAgIGNvbnN0IFNVQk1JVF9CVVRUT04gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Ym1pdF9ncm91cF9pY29uXCIpO1xuXG4gICAgU1VCTUlUX0JVVFRPTi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgSU5QVVRfVEVYVCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX2dyb3VwX2lucHV0XCIpLnZhbHVlO1xuICAgICAgZ3JvdXBzW0lOUFVUX1RFWFRdID0gW107XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9ncm91cF9pbnB1dFwiKS52YWx1ZSA9IFwiXCI7XG4gICAgICBSRU5ERVJfTkFWX0JBUl9HUk9VUFMoKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX2dyb3VwXCIpLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX2dyb3VwX2Zvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgU0VUX1NUT1JBR0UoKTtcbiAgICB9KTtcbiAgfSkoKTtcblxuICBjb25zdCBHUk9VUF9JTlBVVF9WQUxJREFUSU9OID0gKCgpID0+IHtcbiAgICBjb25zdCBJTlBVVF9GSUVMRCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX2dyb3VwX2lucHV0XCIpO1xuXG4gICAgSU5QVVRfRklFTEQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IElOUFVUX1RFWFQgPSBJTlBVVF9GSUVMRC52YWx1ZTtcbiAgICAgIGNvbnN0IEdST1VQUyA9IE9iamVjdC5rZXlzKGdyb3Vwcyk7XG5cbiAgICAgIGlmIChHUk9VUFMuaW5jbHVkZXMoSU5QVVRfVEVYVCkpIHtcbiAgICAgICAgSU5QVVRfRklFTEQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2IoMTgxLCA0MCwgNDApXCI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0X2dyb3VwX2ljb25cIikuc3R5bGUudmlzaWJpbGl0eSA9XG4gICAgICAgICAgXCJoaWRkZW5cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIElOUFVUX0ZJRUxELnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmdiKDM1LCAxNzksIDEyOSlcIjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRfZ3JvdXBfaWNvblwiKS5zdHlsZS52aXNpYmlsaXR5ID1cbiAgICAgICAgICBcInZpc2libGVcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkoKTtcbn07XG5cbmNvbnN0IEFUVEFDSF9ERUxFVEVfR1JPVVBfTElTVEVORVIgPSAoaW5wdXRfZWxlbWVudCkgPT4ge1xuICBpbnB1dF9lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IFRBUkdFVF9EQVRBX0dST1VQID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtZ3JvdXBcIik7XG4gICAgY29uc3QgR1JPVVBfQ09OVEFJTkVSID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGBbZGF0YS1ncm91cC1jb250YWluZXI9JHtUQVJHRVRfREFUQV9HUk9VUH1dYFxuICAgICk7XG4gICAgR1JPVVBfQ09OVEFJTkVSLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI2I1MjgyOFwiO1xuICB9KTtcblxuICBpbnB1dF9lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IFRBUkdFVF9EQVRBX0dST1VQID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtZ3JvdXBcIik7XG4gICAgY29uc3QgR1JPVVBfQ09OVEFJTkVSID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGBbZGF0YS1ncm91cC1jb250YWluZXI9JHtUQVJHRVRfREFUQV9HUk9VUH1dYFxuICAgICk7XG4gICAgR1JPVVBfQ09OVEFJTkVSLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzI4YmRhN1wiO1xuICB9KTtcblxuICBpbnB1dF9lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBUQVJHRVRfREFUQV9HUk9VUCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWdyb3VwXCIpO1xuICAgIGRlbGV0ZSBncm91cHNbVEFSR0VUX0RBVEFfR1JPVVBdO1xuICAgIFJFTkRFUl9OQVZfQkFSX0dST1VQUygpO1xuICAgIFNFVF9TVE9SQUdFKCk7XG4gIH0pO1xufTtcblxuY29uc3QgQVRUQUNIX1JFTkRFUl9HUk9VUF9MSVNURU5FUiA9IChpbnB1dF9lbGVtZW50KSA9PiB7XG4gIGlucHV0X2VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICBjb25zb2xlLmxvZyhncm91cHMpO1xuICAgIC8vIHdpbmRvdy5sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgfSk7XG59O1xuXG5leHBvcnQge1xuICBFVkVOVF9MSVNURU5FUlMsXG4gIEFUVEFDSF9ERUxFVEVfR1JPVVBfTElTVEVORVIsXG4gIEFUVEFDSF9SRU5ERVJfR1JPVVBfTElTVEVORVIsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBncm91cHMsIFRhc2sgfSBmcm9tIFwiLi4vYXBwLmpzXCI7XG5pbXBvcnQgeyBSRU5ERVJfTkFWX0JBUl9HUk9VUFMgfSBmcm9tIFwiLi4vZG9tL2RvbS5qc1wiO1xuXG5pZiAod2luZG93LmxvY2FsU3RvcmFnZS5sZW5ndGggPT09IDApIHtcbiAgLy8gPC1zY2hvb2wtPlxuICBjb25zdCBERUZBVUxUX1NDSE9PTF9HUk9VUCA9ICgoKSA9PiB7XG4gICAgZ3JvdXBzLnNjaG9vbCA9IFtdO1xuICAgIGdyb3Vwcy5zY2hvb2wucHVzaChuZXcgVGFzayhcIm1hdGhcIikpO1xuICAgIGdyb3Vwcy5zY2hvb2wucHVzaChuZXcgVGFzayhcInNjaWVuY2VcIikpO1xuICAgIGdyb3Vwcy5zY2hvb2wucHVzaChuZXcgVGFzayhcImhpc3RvcnlcIikpO1xuICB9KSgpO1xuXG4gIC8vIDwtZ3ltLT5cbiAgY29uc3QgREVGQVVMVF9HWU1fR1JPVVAgPSAoKCkgPT4ge1xuICAgIGdyb3Vwcy5neW0gPSBbXTtcbiAgICBncm91cHMuZ3ltLnB1c2gobmV3IFRhc2soXCJjaGVzdFwiKSk7XG4gICAgZ3JvdXBzLmd5bS5wdXNoKG5ldyBUYXNrKFwiYmFja1wiKSk7XG4gICAgZ3JvdXBzLmd5bS5wdXNoKG5ldyBUYXNrKFwibGVnc1wiKSk7XG4gIH0pKCk7XG5cbiAgUkVOREVSX05BVl9CQVJfR1JPVVBTKCk7XG4gIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImdyb3Vwc1wiLCBKU09OLnN0cmluZ2lmeShncm91cHMpKTtcbn0gZWxzZSB7XG4gIFJFTkRFUl9OQVZfQkFSX0dST1VQUygpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==