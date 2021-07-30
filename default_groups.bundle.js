/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/uuid/index.js":
/*!************************************!*\
  !*** ./node_modules/uuid/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var v1 = __webpack_require__(/*! ./v1 */ "./node_modules/uuid/v1.js");
var v4 = __webpack_require__(/*! ./v4 */ "./node_modules/uuid/v4.js");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/***/ ((module) => {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/***/ ((module) => {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "./node_modules/uuid/v1.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "groups": () => (/* binding */ groups),
/* harmony export */   "SET_STORAGE": () => (/* binding */ SET_STORAGE),
/* harmony export */   "Task": () => (/* binding */ Task)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);


let groups = {};

if (window.localStorage.length !== 0) {
  const LOCAL_STORAGE_GROUPS = JSON.parse(
    window.localStorage.getItem("groups")
  );
  groups = LOCAL_STORAGE_GROUPS;
}

// window.localStorage.clear();

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
    this.id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)();
  }
};




/***/ }),

/***/ "./src/dom/dom.js":
/*!************************!*\
  !*** ./src/dom/dom.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
    const TEXT = document.createElement("h3");
    const TRASH = document.createElement("i");

    GROUP.setAttribute("data-group-container", prop);
    GROUP.classList = "nav_bar_group";
    TEXT.setAttribute("data-group-text", prop);
    TEXT.innerText = prop;
    TEXT.classList = "individual_group_heading";
    TRASH.classList = "delete_group fa fa-trash";
    TRASH.setAttribute("data-group", prop);
    TRASH.setAttribute("aria-hidden", "true");

    (0,_event_listeners_js__WEBPACK_IMPORTED_MODULE_1__.ATTACH_DELETE_GROUP_LISTENER)(TRASH);
    (0,_event_listeners_js__WEBPACK_IMPORTED_MODULE_1__.ATTACH_RENDER_GROUP_LISTENER)(TEXT);

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

"use strict";
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
      const INPUT_FIELD = document.getElementById("add_group_input");
      if (INPUT_TEXT === "") {
        INPUT_FIELD.style.backgroundColor = "rgb(181, 40, 40)";
      } else {
        _app_js__WEBPACK_IMPORTED_MODULE_1__.groups[INPUT_TEXT] = [];
        INPUT_FIELD.value = "";
        (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.RENDER_NAV_BAR_GROUPS)();
        document.getElementById("add_group").style.display = "flex";
        document.getElementById("add_group_form").style.display = "none";
        (0,_app_js__WEBPACK_IMPORTED_MODULE_1__.SET_STORAGE)();
      }
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
    GROUP_CONTAINER.style.backgroundColor = "#9b2525e6";
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
    const TARGET_DATA_GROUP_TASKS =
      _app_js__WEBPACK_IMPORTED_MODULE_1__.groups[event.target.getAttribute("data-group-text")];
    console.log(TARGET_DATA_GROUP_TASKS);
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***************************************!*\
  !*** ./src/helpers/default_groups.js ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app.js */ "./src/app.js");
/* harmony import */ var _dom_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom/dom.js */ "./src/dom/dom.js");



if (window.localStorage.length === 0) {
  const SCHOOL = ["math", "science", "history"];
  const GYM = ["chest", "back", "legs"];
  const CODING = ["git", "javascript", "python"];
  const GROCERIES = ["apples", "bananas", "milk"];
  const MOVIES = ["fight club", "star wars", "jaws"];
  const CANDY = ["chocolate", "snickers", "sour patch kids"];
  const DISTRO = ["ubuntu", "debian", "arch"];

  const DEFAULT_ITERATOR = (name, tasks) => {
    _app_js__WEBPACK_IMPORTED_MODULE_0__.groups[name] = [];
    for (let i = 0; i < 3; i++) {
      _app_js__WEBPACK_IMPORTED_MODULE_0__.groups[name].push(new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task(tasks[i]));
    }
  };
  DEFAULT_ITERATOR("school", SCHOOL);
  DEFAULT_ITERATOR("gym", GYM);
  DEFAULT_ITERATOR("coding", CODING);
  DEFAULT_ITERATOR("groceries", GROCERIES);
  DEFAULT_ITERATOR("movies", MOVIES);
  DEFAULT_ITERATOR("candy", CANDY);
  DEFAULT_ITERATOR("distro", DISTRO);

  window.localStorage.clear();

  (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_1__.RENDER_NAV_BAR_GROUPS)();
  window.localStorage.setItem("groups", JSON.stringify(_app_js__WEBPACK_IMPORTED_MODULE_0__.groups));
} else {
  (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_1__.RENDER_NAV_BAR_GROUPS)();
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL3V1aWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ieXRlc1RvVXVpZC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL3JuZy1icm93c2VyLmpzIiwid2VicGFjazovL3RvZG8vLi9ub2RlX21vZHVsZXMvdXVpZC92MS5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL3V1aWQvdjQuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9kb20vZG9tLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvZG9tL2V2ZW50X2xpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2hlbHBlcnMvZGVmYXVsdF9ncm91cHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsU0FBUyxtQkFBTyxDQUFDLHVDQUFNO0FBQ3ZCLFNBQVMsbUJBQU8sQ0FBQyx1Q0FBTTs7QUFFdkI7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7QUNOeUM7QUFDYTs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksMkNBQU07QUFDVixtQkFBbUIsT0FBTztBQUMxQixNQUFNLDJDQUFNLGdCQUFnQix5Q0FBSTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsRUFBRSxrRUFBcUI7QUFDdkIsdURBQXVELDJDQUFNO0FBQzdELENBQUM7QUFDRCxFQUFFLGtFQUFxQjtBQUN2QiIsImZpbGUiOiJkZWZhdWx0X2dyb3Vwcy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdjEgPSByZXF1aXJlKCcuL3YxJyk7XG52YXIgdjQgPSByZXF1aXJlKCcuL3Y0Jyk7XG5cbnZhciB1dWlkID0gdjQ7XG51dWlkLnYxID0gdjE7XG51dWlkLnY0ID0gdjQ7XG5cbm1vZHVsZS5leHBvcnRzID0gdXVpZDtcbiIsIi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xudmFyIGJ5dGVUb0hleCA9IFtdO1xuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xufVxuXG5mdW5jdGlvbiBieXRlc1RvVXVpZChidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IG9mZnNldCB8fCAwO1xuICB2YXIgYnRoID0gYnl0ZVRvSGV4O1xuICAvLyBqb2luIHVzZWQgdG8gZml4IG1lbW9yeSBpc3N1ZSBjYXVzZWQgYnkgY29uY2F0ZW5hdGlvbjogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzE3NSNjNFxuICByZXR1cm4gKFtcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXVxuICBdKS5qb2luKCcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBieXRlc1RvVXVpZDtcbiIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBJbiB0aGVcbi8vIGJyb3dzZXIgdGhpcyBpcyBhIGxpdHRsZSBjb21wbGljYXRlZCBkdWUgdG8gdW5rbm93biBxdWFsaXR5IG9mIE1hdGgucmFuZG9tKClcbi8vIGFuZCBpbmNvbnNpc3RlbnQgc3VwcG9ydCBmb3IgdGhlIGBjcnlwdG9gIEFQSS4gIFdlIGRvIHRoZSBiZXN0IHdlIGNhbiB2aWFcbi8vIGZlYXR1cmUtZGV0ZWN0aW9uXG5cbi8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0b1xuLy8gaW1wbGVtZW50YXRpb24uIEFsc28sIGZpbmQgdGhlIGNvbXBsZXRlIGltcGxlbWVudGF0aW9uIG9mIGNyeXB0byBvbiBJRTExLlxudmFyIGdldFJhbmRvbVZhbHVlcyA9ICh0eXBlb2YoY3J5cHRvKSAhPSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YobXNDcnlwdG8pICE9ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cubXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09ICdmdW5jdGlvbicgJiYgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQobXNDcnlwdG8pKTtcblxuaWYgKGdldFJhbmRvbVZhbHVlcykge1xuICAvLyBXSEFUV0cgY3J5cHRvIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cbiAgdmFyIHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3aGF0d2dSTkcoKSB7XG4gICAgZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbiAgICByZXR1cm4gcm5kczg7XG4gIH07XG59IGVsc2Uge1xuICAvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG4gIC8vXG4gIC8vIElmIGFsbCBlbHNlIGZhaWxzLCB1c2UgTWF0aC5yYW5kb20oKS4gIEl0J3MgZmFzdCwgYnV0IGlzIG9mIHVuc3BlY2lmaWVkXG4gIC8vIHF1YWxpdHkuXG4gIHZhciBybmRzID0gbmV3IEFycmF5KDE2KTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1hdGhSTkcoKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIHI7IGkgPCAxNjsgaSsrKSB7XG4gICAgICBpZiAoKGkgJiAweDAzKSA9PT0gMCkgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcbiAgICAgIHJuZHNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJuZHM7XG4gIH07XG59XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG4vLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4vL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbi8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbnZhciBfbm9kZUlkO1xudmFyIF9jbG9ja3NlcTtcblxuLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG52YXIgX2xhc3RNU2VjcyA9IDA7XG52YXIgX2xhc3ROU2VjcyA9IDA7XG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQgZm9yIEFQSSBkZXRhaWxzXG5mdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgdmFyIGIgPSBidWYgfHwgW107XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7XG5cbiAgLy8gbm9kZSBhbmQgY2xvY2tzZXEgbmVlZCB0byBiZSBpbml0aWFsaXplZCB0byByYW5kb20gdmFsdWVzIGlmIHRoZXkncmUgbm90XG4gIC8vIHNwZWNpZmllZC4gIFdlIGRvIHRoaXMgbGF6aWx5IHRvIG1pbmltaXplIGlzc3VlcyByZWxhdGVkIHRvIGluc3VmZmljaWVudFxuICAvLyBzeXN0ZW0gZW50cm9weS4gIFNlZSAjMTg5XG4gIGlmIChub2RlID09IG51bGwgfHwgY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgIHZhciBzZWVkQnl0ZXMgPSBybmcoKTtcbiAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbiAgICAgIG5vZGUgPSBfbm9kZUlkID0gW1xuICAgICAgICBzZWVkQnl0ZXNbMF0gfCAweDAxLFxuICAgICAgICBzZWVkQnl0ZXNbMV0sIHNlZWRCeXRlc1syXSwgc2VlZEJ5dGVzWzNdLCBzZWVkQnl0ZXNbNF0sIHNlZWRCeXRlc1s1XVxuICAgICAgXTtcbiAgICB9XG4gICAgaWYgKGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG4gICAgICBjbG9ja3NlcSA9IF9jbG9ja3NlcSA9IChzZWVkQnl0ZXNbNl0gPDwgOCB8IHNlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG4gICAgfVxuICB9XG5cbiAgLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG4gIHZhciBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTtcblxuICAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG4gIHZhciBkdCA9IChtc2VjcyAtIF9sYXN0TVNlY3MpICsgKG5zZWNzIC0gX2xhc3ROU2VjcykvMTAwMDA7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9XG5cbiAgLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgLy8gdGltZSBpbnRlcnZhbFxuICBpZiAoKGR0IDwgMCB8fCBtc2VjcyA+IF9sYXN0TVNlY3MpICYmIG9wdGlvbnMubnNlY3MgPT09IHVuZGVmaW5lZCkge1xuICAgIG5zZWNzID0gMDtcbiAgfVxuXG4gIC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcbiAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1dWlkLnYxKCk6IENhblxcJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjJyk7XG4gIH1cblxuICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7XG5cbiAgLy8gUGVyIDQuMS40IC0gQ29udmVydCBmcm9tIHVuaXggZXBvY2ggdG8gR3JlZ29yaWFuIGVwb2NoXG4gIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwO1xuXG4gIC8vIGB0aW1lX2xvd2BcbiAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjtcblxuICAvLyBgdGltZV9taWRgXG4gIHZhciB0bWggPSAobXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwKSAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjtcblxuICAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmO1xuXG4gIC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgLy8gYGNsb2NrX3NlcV9sb3dgXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcblxuICAvLyBgbm9kZWBcbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyArK24pIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cblxuICByZXR1cm4gYnVmID8gYnVmIDogYnl0ZXNUb1V1aWQoYik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjE7XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgYnVmID0gb3B0aW9ucyA9PT0gJ2JpbmFyeScgPyBuZXcgQXJyYXkoMTYpIDogbnVsbDtcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7XG5cbiAgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XG4gIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcblxuICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgaWYgKGJ1Zikge1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgKytpaSkge1xuICAgICAgYnVmW2kgKyBpaV0gPSBybmRzW2lpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmIHx8IGJ5dGVzVG9VdWlkKHJuZHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHY0O1xuIiwiaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gXCJ1dWlkXCI7XG5cbmxldCBncm91cHMgPSB7fTtcblxuaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UubGVuZ3RoICE9PSAwKSB7XG4gIGNvbnN0IExPQ0FMX1NUT1JBR0VfR1JPVVBTID0gSlNPTi5wYXJzZShcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJncm91cHNcIilcbiAgKTtcbiAgZ3JvdXBzID0gTE9DQUxfU1RPUkFHRV9HUk9VUFM7XG59XG5cbi8vIHdpbmRvdy5sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcblxuY29uc3QgU0VUX1NUT1JBR0UgPSAoKSA9PiB7XG4gIHdpbmRvdy5sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZ3JvdXBzXCIsIEpTT04uc3RyaW5naWZ5KGdyb3VwcykpO1xufTtcblxuY29uc3QgVGFzayA9IGNsYXNzIHtcbiAgY29uc3RydWN0b3IobGFiZWwgPSBcIlwiLCBwcmlvcml0eSA9IFwibG93XCIsIGR1ZV9kYXRlID0gXCJcIiwgbm90ZXMgPSBcIlwiKSB7XG4gICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICB0aGlzLmR1ZV9kYXRlID0gZHVlX2RhdGU7XG4gICAgdGhpcy5ub3RlcyA9IG5vdGVzO1xuICAgIHRoaXMuaWQgPSB1dWlkKCk7XG4gIH1cbn07XG5cbmV4cG9ydCB7IGdyb3VwcywgU0VUX1NUT1JBR0UsIFRhc2sgfTtcbiIsImltcG9ydCB7IGdyb3VwcyB9IGZyb20gXCIuLi9hcHAuanNcIjtcbmltcG9ydCB7XG4gIEFUVEFDSF9ERUxFVEVfR1JPVVBfTElTVEVORVIsXG4gIEFUVEFDSF9SRU5ERVJfR1JPVVBfTElTVEVORVIsXG59IGZyb20gXCIuL2V2ZW50X2xpc3RlbmVycy5qc1wiO1xuXG5jb25zdCBNRVRBX0RBVEEgPSAoKSA9PiB7XG4gIGNvbnN0IEZPTlRfQVdFU09NRSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG4gIEZPTlRfQVdFU09NRS5zZXRBdHRyaWJ1dGUoXCJyZWxcIiwgXCJzdHlsZXNoZWV0XCIpO1xuICBGT05UX0FXRVNPTUUuc2V0QXR0cmlidXRlKFxuICAgIFwiaHJlZlwiLFxuICAgIFwiaHR0cHM6Ly91c2UuZm9udGF3ZXNvbWUuY29tL3JlbGVhc2VzL3Y1LjE1LjMvY3NzL2FsbC5jc3NcIlxuICApO1xuICBGT05UX0FXRVNPTUUuc2V0QXR0cmlidXRlKFxuICAgIFwiaW50ZWdyaXR5XCIsXG4gICAgXCJzaGEzODQtU1pYeFg0d2hKNzkvZ0Vyd2NPWWYreldMZUpkWS9xcHVxQzRjQWE5ck9HVXN0UG9tdHFwdU5XVDl3ZFBFbjJma1wiXG4gICk7XG4gIEZPTlRfQVdFU09NRS5zZXRBdHRyaWJ1dGUoXCJjcm9zc29yaWdpblwiLCBcImFub255bW91c1wiKTtcblxuICBkb2N1bWVudC5oZWFkLmFwcGVuZChGT05UX0FXRVNPTUUpO1xufTtcblxuY29uc3QgTUVOVV9CVVRUT04gPSAoKSA9PiB7XG4gIGNvbnN0IEhBTUJVUkdFUl9NRU5VX0JVVFRPTiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGNvbnN0IEhBTUJVUkdFUl9CVVRUT05fSUNPTiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuXG4gIEhBTUJVUkdFUl9NRU5VX0JVVFRPTi5pZCA9IFwiaGFtYnVyZ2VyX21lbnVfYnV0dG9uXCI7XG4gIEhBTUJVUkdFUl9CVVRUT05fSUNPTi5jbGFzc0xpc3QgPSBcImZhcyBmYS1hbGlnbi1qdXN0aWZ5XCI7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmQoSEFNQlVSR0VSX01FTlVfQlVUVE9OKTtcbiAgSEFNQlVSR0VSX01FTlVfQlVUVE9OLmFwcGVuZChIQU1CVVJHRVJfQlVUVE9OX0lDT04pO1xufTtcblxuY29uc3QgSEVBREVSID0gKCkgPT4ge1xuICBjb25zdCBIRUFERVJfQ09OVEFJTkVSID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgY29uc3QgTkFWX0JBUl9URVhUID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuXG4gIE5BVl9CQVJfVEVYVC5pbm5lclRleHQgPSBcIlRhc2sgTWFzdGVyXCI7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmQoSEVBREVSX0NPTlRBSU5FUik7XG4gIEhFQURFUl9DT05UQUlORVIuYXBwZW5kKE5BVl9CQVJfVEVYVCk7XG59O1xuXG5jb25zdCBOQVZfQkFSID0gKCkgPT4ge1xuICBjb25zdCBOQVZfQ09OVEFJTkVSID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm5hdlwiKTtcbiAgY29uc3QgRFVFX0NPTlRBSU5FUiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvbFwiKTtcbiAgY29uc3QgRFVFX0hFQURJTkcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gIGNvbnN0IERVRV9UT0RBWSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgY29uc3QgRFVFX1RISVNfV0VFSyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgY29uc3QgRFVFX1RISVNfTU9OVEggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gIGNvbnN0IEdST1VQX0NPTlRBSU5FUiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IEdST1VQX0hFQURJTkcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gIGNvbnN0IEdST1VQX0xJU1QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib2xcIik7XG5cbiAgTkFWX0NPTlRBSU5FUi5pZCA9IFwibmF2X2NvbnRhaW5lclwiO1xuICBEVUVfQ09OVEFJTkVSLmlkID0gXCJkdWVfY29udGFpbmVyXCI7XG4gIERVRV9IRUFESU5HLmlkID0gXCJkdWVfaGVhZGluZ1wiO1xuICBEVUVfVE9EQVkuaWQgPSBcImR1ZV90b2RheVwiO1xuICBEVUVfVEhJU19XRUVLLmlkID0gXCJkdWVfdGhpc193ZWVrXCI7XG4gIERVRV9USElTX01PTlRILmlkID0gXCJkdWVfdGhpc19tb250aFwiO1xuICBHUk9VUF9DT05UQUlORVIuaWQgPSBcImdyb3VwX2NvbnRhaW5lclwiO1xuICBHUk9VUF9IRUFESU5HLmlkID0gXCJncm91cF9oZWFkaW5nXCI7XG4gIEdST1VQX0xJU1QuaWQgPSBcInRhc2tfZ3JvdXBfY29udGFpbmVyXCI7XG5cbiAgY29uc3QgVElNRV9QRVJJT0RfVklFVyA9IFtEVUVfVE9EQVksIERVRV9USElTX1dFRUssIERVRV9USElTX01PTlRIXS5tYXAoXG4gICAgKGVsZW1lbnQpID0+IChlbGVtZW50LmNsYXNzTGlzdCA9IFwidGltZV9wZXJpb2RzXCIpXG4gICk7XG5cbiAgRFVFX0hFQURJTkcuaW5uZXJUZXh0ID0gXCJEdWVcIjtcbiAgRFVFX1RPREFZLmlubmVyVGV4dCA9IFwiVG9kYXlcIjtcbiAgRFVFX1RISVNfV0VFSy5pbm5lclRleHQgPSBcIldlZWtcIjtcbiAgRFVFX1RISVNfTU9OVEguaW5uZXJUZXh0ID0gXCJNb250aFwiO1xuICBHUk9VUF9IRUFESU5HLmlubmVyVGV4dCA9IFwiR3JvdXBzXCI7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmQoTkFWX0NPTlRBSU5FUik7XG4gIE5BVl9DT05UQUlORVIuYXBwZW5kKERVRV9DT05UQUlORVIpO1xuICBEVUVfQ09OVEFJTkVSLmFwcGVuZChEVUVfSEVBRElORyk7XG4gIERVRV9DT05UQUlORVIuYXBwZW5kKERVRV9UT0RBWSk7XG4gIERVRV9DT05UQUlORVIuYXBwZW5kKERVRV9USElTX1dFRUspO1xuICBEVUVfQ09OVEFJTkVSLmFwcGVuZChEVUVfVEhJU19NT05USCk7XG4gIE5BVl9DT05UQUlORVIuYXBwZW5kKEdST1VQX0NPTlRBSU5FUik7XG4gIEdST1VQX0NPTlRBSU5FUi5hcHBlbmQoR1JPVVBfSEVBRElORyk7XG4gIEdST1VQX0NPTlRBSU5FUi5hcHBlbmQoR1JPVVBfTElTVCk7XG5cbiAgY29uc3QgQUREX0dST1VQX0JVVFRPTiA9ICgoKSA9PiB7XG4gICAgY29uc3QgQUREX0dST1VQX0JVVFRPTiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgY29uc3QgQUREX0dST1VQX1BMVVNfSUNPTiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuXG4gICAgQUREX0dST1VQX0JVVFRPTi5pZCA9IFwiYWRkX2dyb3VwXCI7XG4gICAgQUREX0dST1VQX0JVVFRPTi5pbm5lclRleHQgPSBcImdyb3VwXCI7XG4gICAgQUREX0dST1VQX1BMVVNfSUNPTi5pZCA9IFwiYWRkX2dyb3VwX3BsdXNfc2lnblwiO1xuICAgIEFERF9HUk9VUF9QTFVTX0lDT04uY2xhc3NMaXN0ID0gXCJmYXMgZmEtcGx1cy1jaXJjbGVcIjtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ3JvdXBfY29udGFpbmVyXCIpLmFwcGVuZChBRERfR1JPVVBfQlVUVE9OKTtcbiAgICBBRERfR1JPVVBfQlVUVE9OLnByZXBlbmQoQUREX0dST1VQX1BMVVNfSUNPTik7XG4gIH0pKCk7XG59O1xuXG5jb25zdCBSRU5ERVJfTkFWX0JBUl9HUk9VUFMgPSAoKSA9PiB7XG4gIGNvbnN0IFJFTU9WRV9BTExfR1JPVVBTID0gW1xuICAgIC4uLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza19ncm91cF9jb250YWluZXJcIikuY2hpbGRyZW4sXG4gIF0ubWFwKChub2RlKSA9PiBub2RlLnJlbW92ZSgpKTtcblxuICBjb25zdCBHUk9VUFNfQ09OVEFJTkVSID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrX2dyb3VwX2NvbnRhaW5lclwiKTtcbiAgZm9yIChsZXQgcHJvcCBpbiBncm91cHMpIHtcbiAgICBjb25zdCBHUk9VUCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICBjb25zdCBURVhUID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgIGNvbnN0IFRSQVNIID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG5cbiAgICBHUk9VUC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWdyb3VwLWNvbnRhaW5lclwiLCBwcm9wKTtcbiAgICBHUk9VUC5jbGFzc0xpc3QgPSBcIm5hdl9iYXJfZ3JvdXBcIjtcbiAgICBURVhULnNldEF0dHJpYnV0ZShcImRhdGEtZ3JvdXAtdGV4dFwiLCBwcm9wKTtcbiAgICBURVhULmlubmVyVGV4dCA9IHByb3A7XG4gICAgVEVYVC5jbGFzc0xpc3QgPSBcImluZGl2aWR1YWxfZ3JvdXBfaGVhZGluZ1wiO1xuICAgIFRSQVNILmNsYXNzTGlzdCA9IFwiZGVsZXRlX2dyb3VwIGZhIGZhLXRyYXNoXCI7XG4gICAgVFJBU0guc2V0QXR0cmlidXRlKFwiZGF0YS1ncm91cFwiLCBwcm9wKTtcbiAgICBUUkFTSC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG5cbiAgICBBVFRBQ0hfREVMRVRFX0dST1VQX0xJU1RFTkVSKFRSQVNIKTtcbiAgICBBVFRBQ0hfUkVOREVSX0dST1VQX0xJU1RFTkVSKFRFWFQpO1xuXG4gICAgR1JPVVBTX0NPTlRBSU5FUi5hcHBlbmQoR1JPVVApO1xuICAgIEdST1VQLmFwcGVuZChURVhUKTtcbiAgICBHUk9VUC5hcHBlbmQoVFJBU0gpO1xuICB9XG59O1xuXG5jb25zdCBBRERfR1JPVVBfSU5QVVQgPSAoKSA9PiB7XG4gIGNvbnN0IEdST1VQX0NPTlRBSU5FUiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ3JvdXBfY29udGFpbmVyXCIpO1xuICBjb25zdCBGT1JNID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gIGNvbnN0IENBTkNFTCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuICBjb25zdCBJTlBVVCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgY29uc3QgU1VCTUlUID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG5cbiAgRk9STS5pZCA9IFwiYWRkX2dyb3VwX2Zvcm1cIjtcbiAgQ0FOQ0VMLmlkID0gXCJjYW5jZWxfZ3JvdXBfaWNvblwiO1xuICBDQU5DRUwuY2xhc3NMaXN0ID0gXCJmYXMgZmEtd2luZG93LWNsb3NlXCI7XG4gIElOUFVULmlkID0gXCJhZGRfZ3JvdXBfaW5wdXRcIjtcbiAgU1VCTUlULmNsYXNzTGlzdCA9IFwiZmFzIGZhLXNpZ24taW4tYWx0XCI7XG4gIFNVQk1JVC5pZCA9IFwic3VibWl0X2dyb3VwX2ljb25cIjtcblxuICBHUk9VUF9DT05UQUlORVIuYXBwZW5kKEZPUk0pO1xuICBGT1JNLmFwcGVuZChDQU5DRUwpO1xuICBGT1JNLmFwcGVuZChJTlBVVCk7XG4gIEZPUk0uYXBwZW5kKFNVQk1JVCk7XG59O1xuXG5leHBvcnQge1xuICBIRUFERVIsXG4gIE1FVEFfREFUQSxcbiAgTkFWX0JBUixcbiAgTUVOVV9CVVRUT04sXG4gIFJFTkRFUl9OQVZfQkFSX0dST1VQUyxcbiAgQUREX0dST1VQX0lOUFVULFxufTtcbiIsImltcG9ydCB7IEFERF9HUk9VUF9JTlBVVF9IQU5ETEVSLCBSRU5ERVJfTkFWX0JBUl9HUk9VUFMgfSBmcm9tIFwiLi9kb20uanNcIjtcbmltcG9ydCB7IGdyb3VwcywgU0VUX1NUT1JBR0UgfSBmcm9tIFwiLi4vYXBwLmpzXCI7XG5cbmNvbnN0IEVWRU5UX0xJU1RFTkVSUyA9ICgpID0+IHtcbiAgY29uc3QgSEFNQlVSR0VSX01FTlUgPSAoKCkgPT4ge1xuICAgIGNvbnN0IE1FTlVfQlVUVE9OID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoYW1idXJnZXJfbWVudV9idXR0b25cIik7XG5cbiAgICBNRU5VX0JVVFRPTi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgTkFWX01FTlUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdl9jb250YWluZXJcIik7XG4gICAgICBOQVZfTUVOVS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgTUVOVV9CVVRUT04uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH0pO1xuICB9KSgpO1xuXG4gIGNvbnN0IEFERF9HUk9VUF9CVVRUT04gPSAoKCkgPT4ge1xuICAgIGNvbnN0IEFERF9CVVRUT04gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9ncm91cFwiKTtcblxuICAgIEFERF9CVVRUT04uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX2dyb3VwXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX2dyb3VwX2Zvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRfZ3JvdXBfaW5wdXRcIikuZm9jdXMoKTtcbiAgICB9KTtcbiAgfSkoKTtcblxuICBjb25zdCBDQU5DRUxfTkVXX0dST1VQX0lDT04gPSAoKCkgPT4ge1xuICAgIGNvbnN0IENBTkNFTF9CVVRUT04gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbmNlbF9ncm91cF9pY29uXCIpO1xuXG4gICAgQ0FOQ0VMX0JVVFRPTi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRfZ3JvdXBcIikuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRfZ3JvdXBfZm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfSk7XG4gIH0pKCk7XG5cbiAgY29uc3QgU1VCTUlUX05FV19HUk9VUF9JQ09OID0gKCgpID0+IHtcbiAgICBjb25zdCBTVUJNSVRfQlVUVE9OID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRfZ3JvdXBfaWNvblwiKTtcblxuICAgIFNVQk1JVF9CVVRUT04uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IElOUFVUX1RFWFQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9ncm91cF9pbnB1dFwiKS52YWx1ZTtcbiAgICAgIGNvbnN0IElOUFVUX0ZJRUxEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRfZ3JvdXBfaW5wdXRcIik7XG4gICAgICBpZiAoSU5QVVRfVEVYVCA9PT0gXCJcIikge1xuICAgICAgICBJTlBVVF9GSUVMRC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYigxODEsIDQwLCA0MClcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdyb3Vwc1tJTlBVVF9URVhUXSA9IFtdO1xuICAgICAgICBJTlBVVF9GSUVMRC52YWx1ZSA9IFwiXCI7XG4gICAgICAgIFJFTkRFUl9OQVZfQkFSX0dST1VQUygpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9ncm91cFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX2dyb3VwX2Zvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBTRVRfU1RPUkFHRSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KSgpO1xuXG4gIGNvbnN0IEdST1VQX0lOUFVUX1ZBTElEQVRJT04gPSAoKCkgPT4ge1xuICAgIGNvbnN0IElOUFVUX0ZJRUxEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRfZ3JvdXBfaW5wdXRcIik7XG5cbiAgICBJTlBVVF9GSUVMRC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgSU5QVVRfVEVYVCA9IElOUFVUX0ZJRUxELnZhbHVlO1xuICAgICAgY29uc3QgR1JPVVBTID0gT2JqZWN0LmtleXMoZ3JvdXBzKTtcblxuICAgICAgaWYgKEdST1VQUy5pbmNsdWRlcyhJTlBVVF9URVhUKSkge1xuICAgICAgICBJTlBVVF9GSUVMRC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYigxODEsIDQwLCA0MClcIjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRfZ3JvdXBfaWNvblwiKS5zdHlsZS52aXNpYmlsaXR5ID1cbiAgICAgICAgICBcImhpZGRlblwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgSU5QVVRfRklFTEQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2IoMzUsIDE3OSwgMTI5KVwiO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Ym1pdF9ncm91cF9pY29uXCIpLnN0eWxlLnZpc2liaWxpdHkgPVxuICAgICAgICAgIFwidmlzaWJsZVwiO1xuICAgICAgfVxuICAgIH0pO1xuICB9KSgpO1xufTtcblxuY29uc3QgQVRUQUNIX0RFTEVURV9HUk9VUF9MSVNURU5FUiA9IChpbnB1dF9lbGVtZW50KSA9PiB7XG4gIGlucHV0X2VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgVEFSR0VUX0RBVEFfR1JPVVAgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1ncm91cFwiKTtcbiAgICBjb25zdCBHUk9VUF9DT05UQUlORVIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYFtkYXRhLWdyb3VwLWNvbnRhaW5lcj0ke1RBUkdFVF9EQVRBX0dST1VQfV1gXG4gICAgKTtcbiAgICBHUk9VUF9DT05UQUlORVIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjOWIyNTI1ZTZcIjtcbiAgfSk7XG5cbiAgaW5wdXRfZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBUQVJHRVRfREFUQV9HUk9VUCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWdyb3VwXCIpO1xuICAgIGNvbnN0IEdST1VQX0NPTlRBSU5FUiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgW2RhdGEtZ3JvdXAtY29udGFpbmVyPSR7VEFSR0VUX0RBVEFfR1JPVVB9XWBcbiAgICApO1xuICAgIEdST1VQX0NPTlRBSU5FUi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMyOGJkYTdcIjtcbiAgfSk7XG5cbiAgaW5wdXRfZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgVEFSR0VUX0RBVEFfR1JPVVAgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1ncm91cFwiKTtcbiAgICBkZWxldGUgZ3JvdXBzW1RBUkdFVF9EQVRBX0dST1VQXTtcbiAgICBSRU5ERVJfTkFWX0JBUl9HUk9VUFMoKTtcbiAgICBTRVRfU1RPUkFHRSgpO1xuICB9KTtcbn07XG5cbmNvbnN0IEFUVEFDSF9SRU5ERVJfR1JPVVBfTElTVEVORVIgPSAoaW5wdXRfZWxlbWVudCkgPT4ge1xuICBpbnB1dF9lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBUQVJHRVRfREFUQV9HUk9VUF9UQVNLUyA9XG4gICAgICBncm91cHNbZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtZ3JvdXAtdGV4dFwiKV07XG4gICAgY29uc29sZS5sb2coVEFSR0VUX0RBVEFfR1JPVVBfVEFTS1MpO1xuICB9KTtcbn07XG5cbmV4cG9ydCB7XG4gIEVWRU5UX0xJU1RFTkVSUyxcbiAgQVRUQUNIX0RFTEVURV9HUk9VUF9MSVNURU5FUixcbiAgQVRUQUNIX1JFTkRFUl9HUk9VUF9MSVNURU5FUixcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ3JvdXBzLCBUYXNrIH0gZnJvbSBcIi4uL2FwcC5qc1wiO1xuaW1wb3J0IHsgUkVOREVSX05BVl9CQVJfR1JPVVBTIH0gZnJvbSBcIi4uL2RvbS9kb20uanNcIjtcblxuaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UubGVuZ3RoID09PSAwKSB7XG4gIGNvbnN0IFNDSE9PTCA9IFtcIm1hdGhcIiwgXCJzY2llbmNlXCIsIFwiaGlzdG9yeVwiXTtcbiAgY29uc3QgR1lNID0gW1wiY2hlc3RcIiwgXCJiYWNrXCIsIFwibGVnc1wiXTtcbiAgY29uc3QgQ09ESU5HID0gW1wiZ2l0XCIsIFwiamF2YXNjcmlwdFwiLCBcInB5dGhvblwiXTtcbiAgY29uc3QgR1JPQ0VSSUVTID0gW1wiYXBwbGVzXCIsIFwiYmFuYW5hc1wiLCBcIm1pbGtcIl07XG4gIGNvbnN0IE1PVklFUyA9IFtcImZpZ2h0IGNsdWJcIiwgXCJzdGFyIHdhcnNcIiwgXCJqYXdzXCJdO1xuICBjb25zdCBDQU5EWSA9IFtcImNob2NvbGF0ZVwiLCBcInNuaWNrZXJzXCIsIFwic291ciBwYXRjaCBraWRzXCJdO1xuICBjb25zdCBESVNUUk8gPSBbXCJ1YnVudHVcIiwgXCJkZWJpYW5cIiwgXCJhcmNoXCJdO1xuXG4gIGNvbnN0IERFRkFVTFRfSVRFUkFUT1IgPSAobmFtZSwgdGFza3MpID0+IHtcbiAgICBncm91cHNbbmFtZV0gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgZ3JvdXBzW25hbWVdLnB1c2gobmV3IFRhc2sodGFza3NbaV0pKTtcbiAgICB9XG4gIH07XG4gIERFRkFVTFRfSVRFUkFUT1IoXCJzY2hvb2xcIiwgU0NIT09MKTtcbiAgREVGQVVMVF9JVEVSQVRPUihcImd5bVwiLCBHWU0pO1xuICBERUZBVUxUX0lURVJBVE9SKFwiY29kaW5nXCIsIENPRElORyk7XG4gIERFRkFVTFRfSVRFUkFUT1IoXCJncm9jZXJpZXNcIiwgR1JPQ0VSSUVTKTtcbiAgREVGQVVMVF9JVEVSQVRPUihcIm1vdmllc1wiLCBNT1ZJRVMpO1xuICBERUZBVUxUX0lURVJBVE9SKFwiY2FuZHlcIiwgQ0FORFkpO1xuICBERUZBVUxUX0lURVJBVE9SKFwiZGlzdHJvXCIsIERJU1RSTyk7XG5cbiAgd2luZG93LmxvY2FsU3RvcmFnZS5jbGVhcigpO1xuXG4gIFJFTkRFUl9OQVZfQkFSX0dST1VQUygpO1xuICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJncm91cHNcIiwgSlNPTi5zdHJpbmdpZnkoZ3JvdXBzKSk7XG59IGVsc2Uge1xuICBSRU5ERVJfTkFWX0JBUl9HUk9VUFMoKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=