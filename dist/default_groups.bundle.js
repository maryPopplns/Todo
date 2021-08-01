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
/* harmony export */   "ADD_GROUP_INPUT": () => (/* binding */ ADD_GROUP_INPUT),
/* harmony export */   "RENDER_TASK": () => (/* binding */ RENDER_TASK),
/* harmony export */   "REMOVE_CURRENT_GROUP": () => (/* binding */ REMOVE_CURRENT_GROUP),
/* harmony export */   "RENDER_ADD_TASK_BUTTON": () => (/* binding */ RENDER_ADD_TASK_BUTTON),
/* harmony export */   "RENDER_ADD_TASK_FORM": () => (/* binding */ RENDER_ADD_TASK_FORM),
/* harmony export */   "REMOVE_ADD_TASK_FORM": () => (/* binding */ REMOVE_ADD_TASK_FORM)
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
  const MAIN = document.createElement("main");
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

  document.body.append(MAIN);
  MAIN.append(NAV_CONTAINER);
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

const RENDER_TASK = (task, tasks_container) => {
  const TASK_CONTAINER = document.createElement("div");

  TASK_CONTAINER.classList = "task";

  tasks_container.append(TASK_CONTAINER);
};

const REMOVE_CURRENT_GROUP = () => {
  const TASK_CONTAINER = [
    ...document.getElementsByClassName("tasks_container"),
  ];
  if (TASK_CONTAINER.length !== 0) {
    TASK_CONTAINER[0].remove();
  }
};

const RENDER_ADD_TASK_BUTTON = (group_name, task_container) => {
  const BUTTON = document.createElement("div");
  const PLUS_ICON = document.createElement("i");

  BUTTON.setAttribute("data-add-task", group_name);
  BUTTON.classList = "add_task_button";
  PLUS_ICON.classList = "fas fa-plus add_task_icon";

  task_container.append(BUTTON);
  BUTTON.append(PLUS_ICON);

  return BUTTON;
};

const RENDER_ADD_TASK_FORM = () => {
  const CURRRENT_CONTAINER = document.getElementById("task_form_container");

  if (CURRRENT_CONTAINER === null) {
    document.getElementsByTagName("header")[0].style.filter = "blur(.4em)";
    document.getElementsByTagName("main")[0].style.filter = "blur(.4em)";

    const TASK_FORM_CONTAINER = document.createElement("div");
    const TASK_FORM = document.createElement("form");
    const LABEL_INPUT = document.createElement("input");
    const PRIORITY_INPUT = document.createElement("select");
    const DUE_DATE_INPUT = document.createElement("input");
    const NOTES_INPUT = document.createElement("input");
    const CANCEL_APPLY_CONTAINER = document.createElement("div");
    const CANCEL_ADD_TASK = document.createElement("i");
    const APPLY_ADD_TASK = document.createElement("i");
    const INPUTS = [LABEL_INPUT, PRIORITY_INPUT, DUE_DATE_INPUT, NOTES_INPUT];
    const IDS = [
      "label_input",
      "priority_input",
      "due_date_input",
      "notes_input",
    ];
    const INNERTEXT = ["* Label", "Priority", "Due date", "Notes"];
    const PRIORITY_OPTIONS = ["low", "medium", "high"];

    TASK_FORM_CONTAINER.id = "task_form_container";
    TASK_FORM.id = "add_task_form";
    for (let i = 0; i < 4; i++) {
      INPUTS[i].id = IDS[i];
      INPUTS[i].setAttribute("name", IDS[i]);
      INPUTS[i].classList = "task_input";
      if (i !== 1) {
        INPUTS[i].setAttribute("type", "text");
      }
      if (i === 2) {
        INPUTS[i].setAttribute("type", "date");
      }
    }
    DUE_DATE_INPUT.setAttribute("placeholder", "ex: 2021/12/25");
    CANCEL_ADD_TASK.classList = "far fa-times-circle";
    CANCEL_ADD_TASK.id = "cancel_add_task_icon";
    APPLY_ADD_TASK.classList = "far fa-check-circle";
    APPLY_ADD_TASK.id = "apply_add_task_icon";
    CANCEL_APPLY_CONTAINER.id = "cancel_apply_container";

    APPLY_ADD_TASK.addEventListener("click", _event_listeners_js__WEBPACK_IMPORTED_MODULE_1__.APPLY_ADD_TASK_HANDLER);
    CANCEL_ADD_TASK.addEventListener("click", _event_listeners_js__WEBPACK_IMPORTED_MODULE_1__.CANCEL_ADD_TASK_HANDLER);

    document.body.append(TASK_FORM_CONTAINER);
    TASK_FORM_CONTAINER.append(TASK_FORM);
    for (let i = 0; i < 4; i++) {
      const INPUT_CONTAINER = document.createElement("div");
      const LABEL = document.createElement("label");

      INPUT_CONTAINER.classList = "task_input_container";
      LABEL.setAttribute("for", IDS[i]);
      LABEL.classList = "task_input_label";
      LABEL.innerText = INNERTEXT[i];

      TASK_FORM.append(INPUT_CONTAINER);
      INPUT_CONTAINER.append(LABEL);
      INPUT_CONTAINER.append(INPUTS[i]);
    }
    for (let i = 0; i < 3; i++) {
      const OPTION = document.createElement("option");
      OPTION.setAttribute("value", PRIORITY_OPTIONS[i]);
      OPTION.innerText = PRIORITY_OPTIONS[i];
      PRIORITY_INPUT.append(OPTION);
    }
    TASK_FORM.append(CANCEL_APPLY_CONTAINER);
    CANCEL_APPLY_CONTAINER.append(CANCEL_ADD_TASK);
    CANCEL_APPLY_CONTAINER.append(APPLY_ADD_TASK);
    LABEL_INPUT.focus();
  }
};

const REMOVE_ADD_TASK_FORM = () => {
  const ADD_TASK_FORM = document.getElementById("task_form_container");
  ADD_TASK_FORM.remove();
  document.getElementsByTagName("header")[0].style.filter = "";
  document.getElementsByTagName("main")[0].style.filter = "";
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
/* harmony export */   "ATTACH_RENDER_GROUP_LISTENER": () => (/* binding */ ATTACH_RENDER_GROUP_LISTENER),
/* harmony export */   "CANCEL_ADD_TASK_HANDLER": () => (/* binding */ CANCEL_ADD_TASK_HANDLER),
/* harmony export */   "APPLY_ADD_TASK_HANDLER": () => (/* binding */ APPLY_ADD_TASK_HANDLER)
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
      const CURRRENT_CONTAINER = document.getElementById("task_form_container");

      if (CURRRENT_CONTAINER === null) {
        document.getElementById("add_group").style.display = "none";
        document.getElementById("add_group_form").style.display = "flex";
        document.getElementById("add_group_input").focus();
      }
    });
  })();

  const CANCEL_NEW_GROUP_ICON = (() => {
    const CANCEL_BUTTON = document.getElementById("cancel_group_icon");

    CANCEL_BUTTON.addEventListener("click", () => {
      const CURRRENT_CONTAINER = document.getElementById("task_form_container");

      if (CURRRENT_CONTAINER === null) {
        document.getElementById("add_group").style.display = "flex";
        document.getElementById("add_group_form").style.display = "none";
      }
    });
  })();

  const SUBMIT_NEW_GROUP_ICON = (() => {
    const SUBMIT_BUTTON = document.getElementById("submit_group_icon");

    SUBMIT_BUTTON.addEventListener("click", () => {
      const CURRRENT_CONTAINER = document.getElementById("task_form_container");

      if (CURRRENT_CONTAINER === null) {
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
        INPUT_FIELD.style.backgroundColor = "white";
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
    const CURRRENT_CONTAINER = document.getElementById("task_form_container");

    if (CURRRENT_CONTAINER === null) {
      const TARGET_DATA_GROUP = event.target.getAttribute("data-group");
      delete _app_js__WEBPACK_IMPORTED_MODULE_1__.groups[TARGET_DATA_GROUP];
      (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.RENDER_NAV_BAR_GROUPS)();
      (0,_app_js__WEBPACK_IMPORTED_MODULE_1__.SET_STORAGE)();
    }
  });
};

const ATTACH_RENDER_GROUP_LISTENER = (input_element) => {
  input_element.addEventListener("click", (event) => {
    const CURRRENT_CONTAINER = document.getElementById("task_form_container");

    if (CURRRENT_CONTAINER === null) {
      (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.REMOVE_CURRENT_GROUP)();

      const GROUP_NAME = event.target.getAttribute("data-group-text");
      const TASKS_CONTAINER = document.createElement("div");

      const ADD_TASK_ICON = (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.RENDER_ADD_TASK_BUTTON)(GROUP_NAME, TASKS_CONTAINER);
      ADD_TASK_ICON.addEventListener("click", (event) => {
        (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.RENDER_ADD_TASK_FORM)();
        const GROUP_NAME = event.currentTarget.getAttribute("data-add-task");

        // const TASK_LIST = groups[GROUP_NAME];
      });

      const TASKS = _app_js__WEBPACK_IMPORTED_MODULE_1__.groups[GROUP_NAME].map((task) => {
        (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.RENDER_TASK)(task, TASKS_CONTAINER);
      });

      TASKS_CONTAINER.classList = "tasks_container";
      TASKS_CONTAINER.setAttribute("data-group-tasks", GROUP_NAME);

      document.getElementsByTagName("main")[0].append(TASKS_CONTAINER);
    }
  });
};

const CANCEL_ADD_TASK_HANDLER = () => {
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.REMOVE_ADD_TASK_FORM)();
};

const APPLY_ADD_TASK_HANDLER = () => {
  const LABEL = document.getElementById("label_input");
  const PRIORITY = document.getElementById("priority_input");
  const DUE_DATE = document.getElementById("due_date_input");
  const NOTES = document.getElementById("notes_input");

  console.log(LABEL);
  console.log(PRIORITY);
  console.log(DUE_DATE);
  console.log(NOTES);
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

    // <-due date->
    const DAYS_DUE_FROM_TODAY = [0, 7, 14];
    const TODAY = new Date();
    const YEAR = TODAY.getFullYear();
    const MONTH = TODAY.getMonth();
    const DAY = TODAY.getDate();

    // <-priorities->
    const PRIORITY = ["low", "medium", "high"];

    for (let i = 0; i < 3; i++) {
      _app_js__WEBPACK_IMPORTED_MODULE_0__.groups[name].push(
        new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task(
          tasks[i],
          PRIORITY[i],
          new Date(YEAR, MONTH, DAY + DAYS_DUE_FROM_TODAY[i])
        )
      );
    }
  };
  DEFAULT_ITERATOR("school", SCHOOL);
  DEFAULT_ITERATOR("gym", GYM);
  DEFAULT_ITERATOR("coding", CODING);
  DEFAULT_ITERATOR("groceries", GROCERIES);
  DEFAULT_ITERATOR("movies", MOVIES);
  DEFAULT_ITERATOR("candy", CANDY);
  DEFAULT_ITERATOR("distro", DISTRO);

  (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_1__.RENDER_NAV_BAR_GROUPS)();
  window.localStorage.setItem("groups", JSON.stringify(_app_js__WEBPACK_IMPORTED_MODULE_0__.groups));

  console.log(_app_js__WEBPACK_IMPORTED_MODULE_0__.groups);
} else {
  (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_1__.RENDER_NAV_BAR_GROUPS)();
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL3V1aWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ieXRlc1RvVXVpZC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL3JuZy1icm93c2VyLmpzIiwid2VicGFjazovL3RvZG8vLi9ub2RlX21vZHVsZXMvdXVpZC92MS5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL3V1aWQvdjQuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9kb20vZG9tLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvZG9tL2V2ZW50X2xpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2hlbHBlcnMvZGVmYXVsdF9ncm91cHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsU0FBUyxtQkFBTyxDQUFDLHVDQUFNO0FBQ3ZCLFNBQVMsbUJBQU8sQ0FBQyx1Q0FBTTs7QUFFdkI7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQ0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsUUFBUTtBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ2pDQSxVQUFVLG1CQUFPLENBQUMseURBQVc7QUFDN0Isa0JBQWtCLG1CQUFPLENBQUMsaUVBQW1COztBQUU3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUNBQW1DO0FBQ25DOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUM1R0EsVUFBVSxtQkFBTyxDQUFDLHlEQUFXO0FBQzdCLGtCQUFrQixtQkFBTyxDQUFDLGlFQUFtQjs7QUFFN0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUJrQzs7QUFFbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsd0NBQUk7QUFDbEI7QUFDQTs7QUFFcUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1QkY7QUFNTDs7QUFFOUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLDJDQUFNO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUksaUZBQTRCO0FBQ2hDLElBQUksaUZBQTRCOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZDQUE2Qyx1RUFBc0I7QUFDbkUsOENBQThDLHdFQUF1Qjs7QUFFckU7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFjRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9RZ0I7QUFDOEI7O0FBRWhEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsVUFBVSwyQ0FBTTtBQUNoQjtBQUNBLFVBQVUsOERBQXFCO0FBQy9CO0FBQ0E7QUFDQSxVQUFVLG9EQUFXO0FBQ3JCO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQ0FBaUMsMkNBQU07O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixrQkFBa0I7QUFDakQ7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGtCQUFrQjtBQUNqRDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLDJDQUFNO0FBQ25CLE1BQU0sOERBQXFCO0FBQzNCLE1BQU0sb0RBQVc7QUFDakI7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTSw2REFBb0I7O0FBRTFCO0FBQ0E7O0FBRUEsNEJBQTRCLCtEQUFzQjtBQUNsRDtBQUNBLFFBQVEsNkRBQW9CO0FBQzVCOztBQUVBO0FBQ0EsT0FBTzs7QUFFUCxvQkFBb0IsMkNBQU07QUFDMUIsUUFBUSxvREFBVztBQUNuQixPQUFPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLEVBQUUsNkRBQW9CO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFRRTs7Ozs7OztVQzdLRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsZ0NBQWdDLFlBQVk7V0FDNUM7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7QUNOeUM7QUFDYTs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksMkNBQU07O0FBRVY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsbUJBQW1CLE9BQU87QUFDMUIsTUFBTSwyQ0FBTTtBQUNaLFlBQVkseUNBQUk7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFFLGtFQUFxQjtBQUN2Qix1REFBdUQsMkNBQU07O0FBRTdELGNBQWMsMkNBQU07QUFDcEIsQ0FBQztBQUNELEVBQUUsa0VBQXFCO0FBQ3ZCIiwiZmlsZSI6ImRlZmF1bHRfZ3JvdXBzLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB2MSA9IHJlcXVpcmUoJy4vdjEnKTtcbnZhciB2NCA9IHJlcXVpcmUoJy4vdjQnKTtcblxudmFyIHV1aWQgPSB2NDtcbnV1aWQudjEgPSB2MTtcbnV1aWQudjQgPSB2NDtcblxubW9kdWxlLmV4cG9ydHMgPSB1dWlkO1xuIiwiLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG52YXIgYnl0ZVRvSGV4ID0gW107XG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG59XG5cbmZ1bmN0aW9uIGJ5dGVzVG9VdWlkKGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gb2Zmc2V0IHx8IDA7XG4gIHZhciBidGggPSBieXRlVG9IZXg7XG4gIC8vIGpvaW4gdXNlZCB0byBmaXggbWVtb3J5IGlzc3VlIGNhdXNlZCBieSBjb25jYXRlbmF0aW9uOiBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMTc1I2M0XG4gIHJldHVybiAoW1xuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dXG4gIF0pLmpvaW4oJycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ5dGVzVG9VdWlkO1xuIiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gIEluIHRoZVxuLy8gYnJvd3NlciB0aGlzIGlzIGEgbGl0dGxlIGNvbXBsaWNhdGVkIGR1ZSB0byB1bmtub3duIHF1YWxpdHkgb2YgTWF0aC5yYW5kb20oKVxuLy8gYW5kIGluY29uc2lzdGVudCBzdXBwb3J0IGZvciB0aGUgYGNyeXB0b2AgQVBJLiAgV2UgZG8gdGhlIGJlc3Qgd2UgY2FuIHZpYVxuLy8gZmVhdHVyZS1kZXRlY3Rpb25cblxuLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvXG4vLyBpbXBsZW1lbnRhdGlvbi4gQWxzbywgZmluZCB0aGUgY29tcGxldGUgaW1wbGVtZW50YXRpb24gb2YgY3J5cHRvIG9uIElFMTEuXG52YXIgZ2V0UmFuZG9tVmFsdWVzID0gKHR5cGVvZihjcnlwdG8pICE9ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0bykpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZihtc0NyeXB0bykgIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5tc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT0gJ2Z1bmN0aW9uJyAmJiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChtc0NyeXB0bykpO1xuXG5pZiAoZ2V0UmFuZG9tVmFsdWVzKSB7XG4gIC8vIFdIQVRXRyBjcnlwdG8gUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xuICB2YXIgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdoYXR3Z1JORygpIHtcbiAgICBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xuICAgIHJldHVybiBybmRzODtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIE1hdGgucmFuZG9tKCktYmFzZWQgKFJORylcbiAgLy9cbiAgLy8gSWYgYWxsIGVsc2UgZmFpbHMsIHVzZSBNYXRoLnJhbmRvbSgpLiAgSXQncyBmYXN0LCBidXQgaXMgb2YgdW5zcGVjaWZpZWRcbiAgLy8gcXVhbGl0eS5cbiAgdmFyIHJuZHMgPSBuZXcgQXJyYXkoMTYpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWF0aFJORygpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IDE2OyBpKyspIHtcbiAgICAgIGlmICgoaSAmIDB4MDMpID09PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcbiAgICB9XG5cbiAgICByZXR1cm4gcm5kcztcbiAgfTtcbn1cbiIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7XG5cbi8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxudmFyIF9ub2RlSWQ7XG52YXIgX2Nsb2Nrc2VxO1xuXG4vLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbnZhciBfbGFzdE1TZWNzID0gMDtcbnZhciBfbGFzdE5TZWNzID0gMDtcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCBmb3IgQVBJIGRldGFpbHNcbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICB2YXIgYiA9IGJ1ZiB8fCBbXTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIG5vZGUgPSBvcHRpb25zLm5vZGUgfHwgX25vZGVJZDtcbiAgdmFyIGNsb2Nrc2VxID0gb3B0aW9ucy5jbG9ja3NlcSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jbG9ja3NlcSA6IF9jbG9ja3NlcTtcblxuICAvLyBub2RlIGFuZCBjbG9ja3NlcSBuZWVkIHRvIGJlIGluaXRpYWxpemVkIHRvIHJhbmRvbSB2YWx1ZXMgaWYgdGhleSdyZSBub3RcbiAgLy8gc3BlY2lmaWVkLiAgV2UgZG8gdGhpcyBsYXppbHkgdG8gbWluaW1pemUgaXNzdWVzIHJlbGF0ZWQgdG8gaW5zdWZmaWNpZW50XG4gIC8vIHN5c3RlbSBlbnRyb3B5LiAgU2VlICMxODlcbiAgaWYgKG5vZGUgPT0gbnVsbCB8fCBjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgdmFyIHNlZWRCeXRlcyA9IHJuZygpO1xuICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjUsIGNyZWF0ZSBhbmQgNDgtYml0IG5vZGUgaWQsICg0NyByYW5kb20gYml0cyArIG11bHRpY2FzdCBiaXQgPSAxKVxuICAgICAgbm9kZSA9IF9ub2RlSWQgPSBbXG4gICAgICAgIHNlZWRCeXRlc1swXSB8IDB4MDEsXG4gICAgICAgIHNlZWRCeXRlc1sxXSwgc2VlZEJ5dGVzWzJdLCBzZWVkQnl0ZXNbM10sIHNlZWRCeXRlc1s0XSwgc2VlZEJ5dGVzWzVdXG4gICAgICBdO1xuICAgIH1cbiAgICBpZiAoY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuMi4yLCByYW5kb21pemUgKDE0IGJpdCkgY2xvY2tzZXFcbiAgICAgIGNsb2Nrc2VxID0gX2Nsb2Nrc2VxID0gKHNlZWRCeXRlc1s2XSA8PCA4IHwgc2VlZEJ5dGVzWzddKSAmIDB4M2ZmZjtcbiAgICB9XG4gIH1cblxuICAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzb1xuICAvLyB0aW1lIGlzIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cbiAgdmFyIG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tc2VjcyA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gIC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcbiAgdmFyIG5zZWNzID0gb3B0aW9ucy5uc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxO1xuXG4gIC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcbiAgdmFyIGR0ID0gKG1zZWNzIC0gX2xhc3RNU2VjcykgKyAobnNlY3MgLSBfbGFzdE5TZWNzKS8xMDAwMDtcblxuICAvLyBQZXIgNC4yLjEuMiwgQnVtcCBjbG9ja3NlcSBvbiBjbG9jayByZWdyZXNzaW9uXG4gIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gIH1cblxuICAvLyBSZXNldCBuc2VjcyBpZiBjbG9jayByZWdyZXNzZXMgKG5ldyBjbG9ja3NlcSkgb3Igd2UndmUgbW92ZWQgb250byBhIG5ld1xuICAvLyB0aW1lIGludGVydmFsXG4gIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbnNlY3MgPSAwO1xuICB9XG5cbiAgLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuICBpZiAobnNlY3MgPj0gMTAwMDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3V1aWQudjEoKTogQ2FuXFwndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWMnKTtcbiAgfVxuXG4gIF9sYXN0TVNlY3MgPSBtc2VjcztcbiAgX2xhc3ROU2VjcyA9IG5zZWNzO1xuICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcblxuICAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcbiAgbXNlY3MgKz0gMTIyMTkyOTI4MDAwMDA7XG5cbiAgLy8gYHRpbWVfbG93YFxuICB2YXIgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdGwgJiAweGZmO1xuXG4gIC8vIGB0aW1lX21pZGBcbiAgdmFyIHRtaCA9IChtc2VjcyAvIDB4MTAwMDAwMDAwICogMTAwMDApICYgMHhmZmZmZmZmO1xuICBiW2krK10gPSB0bWggPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bWggJiAweGZmO1xuXG4gIC8vIGB0aW1lX2hpZ2hfYW5kX3ZlcnNpb25gXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMjQgJiAweGYgfCAweDEwOyAvLyBpbmNsdWRlIHZlcnNpb25cbiAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7XG5cbiAgLy8gYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgIChQZXIgNC4yLjIgLSBpbmNsdWRlIHZhcmlhbnQpXG4gIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDtcblxuICAvLyBgY2xvY2tfc2VxX2xvd2BcbiAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmO1xuXG4gIC8vIGBub2RlYFxuICBmb3IgKHZhciBuID0gMDsgbiA8IDY7ICsrbikge1xuICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgfVxuXG4gIHJldHVybiBidWYgPyBidWYgOiBieXRlc1RvVXVpZChiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2MTtcbiIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gIGlmICh0eXBlb2Yob3B0aW9ucykgPT0gJ3N0cmluZycpIHtcbiAgICBidWYgPSBvcHRpb25zID09PSAnYmluYXJ5JyA/IG5ldyBBcnJheSgxNikgOiBudWxsO1xuICAgIG9wdGlvbnMgPSBudWxsO1xuICB9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTtcblxuICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG4gIHJuZHNbNl0gPSAocm5kc1s2XSAmIDB4MGYpIHwgMHg0MDtcbiAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xuXG4gIC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuICBpZiAoYnVmKSB7XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IDE2OyArK2lpKSB7XG4gICAgICBidWZbaSArIGlpXSA9IHJuZHNbaWldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYgfHwgYnl0ZXNUb1V1aWQocm5kcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjQ7XG4iLCJpbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSBcInV1aWRcIjtcblxubGV0IGdyb3VwcyA9IHt9O1xuXG5pZiAod2luZG93LmxvY2FsU3RvcmFnZS5sZW5ndGggIT09IDApIHtcbiAgY29uc3QgTE9DQUxfU1RPUkFHRV9HUk9VUFMgPSBKU09OLnBhcnNlKFxuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImdyb3Vwc1wiKVxuICApO1xuICBncm91cHMgPSBMT0NBTF9TVE9SQUdFX0dST1VQUztcbn1cblxuLy8gd2luZG93LmxvY2FsU3RvcmFnZS5jbGVhcigpO1xuXG5jb25zdCBTRVRfU1RPUkFHRSA9ICgpID0+IHtcbiAgd2luZG93LmxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJncm91cHNcIiwgSlNPTi5zdHJpbmdpZnkoZ3JvdXBzKSk7XG59O1xuXG5jb25zdCBUYXNrID0gY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihsYWJlbCA9IFwiXCIsIHByaW9yaXR5ID0gXCJsb3dcIiwgZHVlX2RhdGUgPSBcIlwiLCBub3RlcyA9IFwiXCIpIHtcbiAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMuZHVlX2RhdGUgPSBkdWVfZGF0ZTtcbiAgICB0aGlzLm5vdGVzID0gbm90ZXM7XG4gICAgdGhpcy5pZCA9IHV1aWQoKTtcbiAgfVxufTtcblxuZXhwb3J0IHsgZ3JvdXBzLCBTRVRfU1RPUkFHRSwgVGFzayB9O1xuIiwiaW1wb3J0IHsgZ3JvdXBzIH0gZnJvbSBcIi4uL2FwcC5qc1wiO1xuaW1wb3J0IHtcbiAgQVRUQUNIX0RFTEVURV9HUk9VUF9MSVNURU5FUixcbiAgQVRUQUNIX1JFTkRFUl9HUk9VUF9MSVNURU5FUixcbiAgQ0FOQ0VMX0FERF9UQVNLX0hBTkRMRVIsXG4gIEFQUExZX0FERF9UQVNLX0hBTkRMRVIsXG59IGZyb20gXCIuL2V2ZW50X2xpc3RlbmVycy5qc1wiO1xuXG5jb25zdCBNRVRBX0RBVEEgPSAoKSA9PiB7XG4gIGNvbnN0IEZPTlRfQVdFU09NRSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG4gIEZPTlRfQVdFU09NRS5zZXRBdHRyaWJ1dGUoXCJyZWxcIiwgXCJzdHlsZXNoZWV0XCIpO1xuICBGT05UX0FXRVNPTUUuc2V0QXR0cmlidXRlKFxuICAgIFwiaHJlZlwiLFxuICAgIFwiaHR0cHM6Ly91c2UuZm9udGF3ZXNvbWUuY29tL3JlbGVhc2VzL3Y1LjE1LjMvY3NzL2FsbC5jc3NcIlxuICApO1xuICBGT05UX0FXRVNPTUUuc2V0QXR0cmlidXRlKFxuICAgIFwiaW50ZWdyaXR5XCIsXG4gICAgXCJzaGEzODQtU1pYeFg0d2hKNzkvZ0Vyd2NPWWYreldMZUpkWS9xcHVxQzRjQWE5ck9HVXN0UG9tdHFwdU5XVDl3ZFBFbjJma1wiXG4gICk7XG4gIEZPTlRfQVdFU09NRS5zZXRBdHRyaWJ1dGUoXCJjcm9zc29yaWdpblwiLCBcImFub255bW91c1wiKTtcblxuICBkb2N1bWVudC5oZWFkLmFwcGVuZChGT05UX0FXRVNPTUUpO1xufTtcblxuY29uc3QgTUVOVV9CVVRUT04gPSAoKSA9PiB7XG4gIGNvbnN0IEhBTUJVUkdFUl9NRU5VX0JVVFRPTiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGNvbnN0IEhBTUJVUkdFUl9CVVRUT05fSUNPTiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuXG4gIEhBTUJVUkdFUl9NRU5VX0JVVFRPTi5pZCA9IFwiaGFtYnVyZ2VyX21lbnVfYnV0dG9uXCI7XG4gIEhBTUJVUkdFUl9CVVRUT05fSUNPTi5jbGFzc0xpc3QgPSBcImZhcyBmYS1hbGlnbi1qdXN0aWZ5XCI7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmQoSEFNQlVSR0VSX01FTlVfQlVUVE9OKTtcbiAgSEFNQlVSR0VSX01FTlVfQlVUVE9OLmFwcGVuZChIQU1CVVJHRVJfQlVUVE9OX0lDT04pO1xufTtcblxuY29uc3QgSEVBREVSID0gKCkgPT4ge1xuICBjb25zdCBIRUFERVJfQ09OVEFJTkVSID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgY29uc3QgTkFWX0JBUl9URVhUID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuXG4gIE5BVl9CQVJfVEVYVC5pbm5lclRleHQgPSBcIlRhc2sgTWFzdGVyXCI7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmQoSEVBREVSX0NPTlRBSU5FUik7XG4gIEhFQURFUl9DT05UQUlORVIuYXBwZW5kKE5BVl9CQVJfVEVYVCk7XG59O1xuXG5jb25zdCBOQVZfQkFSID0gKCkgPT4ge1xuICBjb25zdCBNQUlOID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm1haW5cIik7XG4gIGNvbnN0IE5BVl9DT05UQUlORVIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibmF2XCIpO1xuICBjb25zdCBEVUVfQ09OVEFJTkVSID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9sXCIpO1xuICBjb25zdCBEVUVfSEVBRElORyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgY29uc3QgRFVFX1RPREFZID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBjb25zdCBEVUVfVEhJU19XRUVLID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBjb25zdCBEVUVfVEhJU19NT05USCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgY29uc3QgR1JPVVBfQ09OVEFJTkVSID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgR1JPVVBfSEVBRElORyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgY29uc3QgR1JPVVBfTElTVCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvbFwiKTtcblxuICBOQVZfQ09OVEFJTkVSLmlkID0gXCJuYXZfY29udGFpbmVyXCI7XG4gIERVRV9DT05UQUlORVIuaWQgPSBcImR1ZV9jb250YWluZXJcIjtcbiAgRFVFX0hFQURJTkcuaWQgPSBcImR1ZV9oZWFkaW5nXCI7XG4gIERVRV9UT0RBWS5pZCA9IFwiZHVlX3RvZGF5XCI7XG4gIERVRV9USElTX1dFRUsuaWQgPSBcImR1ZV90aGlzX3dlZWtcIjtcbiAgRFVFX1RISVNfTU9OVEguaWQgPSBcImR1ZV90aGlzX21vbnRoXCI7XG4gIEdST1VQX0NPTlRBSU5FUi5pZCA9IFwiZ3JvdXBfY29udGFpbmVyXCI7XG4gIEdST1VQX0hFQURJTkcuaWQgPSBcImdyb3VwX2hlYWRpbmdcIjtcbiAgR1JPVVBfTElTVC5pZCA9IFwidGFza19ncm91cF9jb250YWluZXJcIjtcblxuICBjb25zdCBUSU1FX1BFUklPRF9WSUVXID0gW0RVRV9UT0RBWSwgRFVFX1RISVNfV0VFSywgRFVFX1RISVNfTU9OVEhdLm1hcChcbiAgICAoZWxlbWVudCkgPT4gKGVsZW1lbnQuY2xhc3NMaXN0ID0gXCJ0aW1lX3BlcmlvZHNcIilcbiAgKTtcblxuICBEVUVfSEVBRElORy5pbm5lclRleHQgPSBcIkR1ZVwiO1xuICBEVUVfVE9EQVkuaW5uZXJUZXh0ID0gXCJUb2RheVwiO1xuICBEVUVfVEhJU19XRUVLLmlubmVyVGV4dCA9IFwiV2Vla1wiO1xuICBEVUVfVEhJU19NT05USC5pbm5lclRleHQgPSBcIk1vbnRoXCI7XG4gIEdST1VQX0hFQURJTkcuaW5uZXJUZXh0ID0gXCJHcm91cHNcIjtcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZChNQUlOKTtcbiAgTUFJTi5hcHBlbmQoTkFWX0NPTlRBSU5FUik7XG4gIE5BVl9DT05UQUlORVIuYXBwZW5kKERVRV9DT05UQUlORVIpO1xuICBEVUVfQ09OVEFJTkVSLmFwcGVuZChEVUVfSEVBRElORyk7XG4gIERVRV9DT05UQUlORVIuYXBwZW5kKERVRV9UT0RBWSk7XG4gIERVRV9DT05UQUlORVIuYXBwZW5kKERVRV9USElTX1dFRUspO1xuICBEVUVfQ09OVEFJTkVSLmFwcGVuZChEVUVfVEhJU19NT05USCk7XG4gIE5BVl9DT05UQUlORVIuYXBwZW5kKEdST1VQX0NPTlRBSU5FUik7XG4gIEdST1VQX0NPTlRBSU5FUi5hcHBlbmQoR1JPVVBfSEVBRElORyk7XG4gIEdST1VQX0NPTlRBSU5FUi5hcHBlbmQoR1JPVVBfTElTVCk7XG5cbiAgY29uc3QgQUREX0dST1VQX0JVVFRPTiA9ICgoKSA9PiB7XG4gICAgY29uc3QgQUREX0dST1VQX0JVVFRPTiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgY29uc3QgQUREX0dST1VQX1BMVVNfSUNPTiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuXG4gICAgQUREX0dST1VQX0JVVFRPTi5pZCA9IFwiYWRkX2dyb3VwXCI7XG4gICAgQUREX0dST1VQX0JVVFRPTi5pbm5lclRleHQgPSBcImdyb3VwXCI7XG4gICAgQUREX0dST1VQX1BMVVNfSUNPTi5pZCA9IFwiYWRkX2dyb3VwX3BsdXNfc2lnblwiO1xuICAgIEFERF9HUk9VUF9QTFVTX0lDT04uY2xhc3NMaXN0ID0gXCJmYXMgZmEtcGx1cy1jaXJjbGVcIjtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ3JvdXBfY29udGFpbmVyXCIpLmFwcGVuZChBRERfR1JPVVBfQlVUVE9OKTtcbiAgICBBRERfR1JPVVBfQlVUVE9OLnByZXBlbmQoQUREX0dST1VQX1BMVVNfSUNPTik7XG4gIH0pKCk7XG59O1xuXG5jb25zdCBSRU5ERVJfTkFWX0JBUl9HUk9VUFMgPSAoKSA9PiB7XG4gIGNvbnN0IFJFTU9WRV9BTExfR1JPVVBTID0gW1xuICAgIC4uLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza19ncm91cF9jb250YWluZXJcIikuY2hpbGRyZW4sXG4gIF0ubWFwKChub2RlKSA9PiBub2RlLnJlbW92ZSgpKTtcblxuICBjb25zdCBHUk9VUFNfQ09OVEFJTkVSID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrX2dyb3VwX2NvbnRhaW5lclwiKTtcbiAgZm9yIChsZXQgcHJvcCBpbiBncm91cHMpIHtcbiAgICBjb25zdCBHUk9VUCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICBjb25zdCBURVhUID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgIGNvbnN0IFRSQVNIID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG5cbiAgICBHUk9VUC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWdyb3VwLWNvbnRhaW5lclwiLCBwcm9wKTtcbiAgICBHUk9VUC5jbGFzc0xpc3QgPSBcIm5hdl9iYXJfZ3JvdXBcIjtcbiAgICBURVhULnNldEF0dHJpYnV0ZShcImRhdGEtZ3JvdXAtdGV4dFwiLCBwcm9wKTtcbiAgICBURVhULmlubmVyVGV4dCA9IHByb3A7XG4gICAgVEVYVC5jbGFzc0xpc3QgPSBcImluZGl2aWR1YWxfZ3JvdXBfaGVhZGluZ1wiO1xuICAgIFRSQVNILmNsYXNzTGlzdCA9IFwiZGVsZXRlX2dyb3VwIGZhIGZhLXRyYXNoXCI7XG4gICAgVFJBU0guc2V0QXR0cmlidXRlKFwiZGF0YS1ncm91cFwiLCBwcm9wKTtcbiAgICBUUkFTSC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG5cbiAgICBBVFRBQ0hfREVMRVRFX0dST1VQX0xJU1RFTkVSKFRSQVNIKTtcbiAgICBBVFRBQ0hfUkVOREVSX0dST1VQX0xJU1RFTkVSKFRFWFQpO1xuXG4gICAgR1JPVVBTX0NPTlRBSU5FUi5hcHBlbmQoR1JPVVApO1xuICAgIEdST1VQLmFwcGVuZChURVhUKTtcbiAgICBHUk9VUC5hcHBlbmQoVFJBU0gpO1xuICB9XG59O1xuXG5jb25zdCBBRERfR1JPVVBfSU5QVVQgPSAoKSA9PiB7XG4gIGNvbnN0IEdST1VQX0NPTlRBSU5FUiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ3JvdXBfY29udGFpbmVyXCIpO1xuICBjb25zdCBGT1JNID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gIGNvbnN0IENBTkNFTCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuICBjb25zdCBJTlBVVCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgY29uc3QgU1VCTUlUID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG5cbiAgRk9STS5pZCA9IFwiYWRkX2dyb3VwX2Zvcm1cIjtcbiAgQ0FOQ0VMLmlkID0gXCJjYW5jZWxfZ3JvdXBfaWNvblwiO1xuICBDQU5DRUwuY2xhc3NMaXN0ID0gXCJmYXMgZmEtd2luZG93LWNsb3NlXCI7XG4gIElOUFVULmlkID0gXCJhZGRfZ3JvdXBfaW5wdXRcIjtcbiAgU1VCTUlULmNsYXNzTGlzdCA9IFwiZmFzIGZhLXNpZ24taW4tYWx0XCI7XG4gIFNVQk1JVC5pZCA9IFwic3VibWl0X2dyb3VwX2ljb25cIjtcblxuICBHUk9VUF9DT05UQUlORVIuYXBwZW5kKEZPUk0pO1xuICBGT1JNLmFwcGVuZChDQU5DRUwpO1xuICBGT1JNLmFwcGVuZChJTlBVVCk7XG4gIEZPUk0uYXBwZW5kKFNVQk1JVCk7XG59O1xuXG5jb25zdCBSRU5ERVJfVEFTSyA9ICh0YXNrLCB0YXNrc19jb250YWluZXIpID0+IHtcbiAgY29uc3QgVEFTS19DT05UQUlORVIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gIFRBU0tfQ09OVEFJTkVSLmNsYXNzTGlzdCA9IFwidGFza1wiO1xuXG4gIHRhc2tzX2NvbnRhaW5lci5hcHBlbmQoVEFTS19DT05UQUlORVIpO1xufTtcblxuY29uc3QgUkVNT1ZFX0NVUlJFTlRfR1JPVVAgPSAoKSA9PiB7XG4gIGNvbnN0IFRBU0tfQ09OVEFJTkVSID0gW1xuICAgIC4uLmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0YXNrc19jb250YWluZXJcIiksXG4gIF07XG4gIGlmIChUQVNLX0NPTlRBSU5FUi5sZW5ndGggIT09IDApIHtcbiAgICBUQVNLX0NPTlRBSU5FUlswXS5yZW1vdmUoKTtcbiAgfVxufTtcblxuY29uc3QgUkVOREVSX0FERF9UQVNLX0JVVFRPTiA9IChncm91cF9uYW1lLCB0YXNrX2NvbnRhaW5lcikgPT4ge1xuICBjb25zdCBCVVRUT04gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBQTFVTX0lDT04gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcblxuICBCVVRUT04uc2V0QXR0cmlidXRlKFwiZGF0YS1hZGQtdGFza1wiLCBncm91cF9uYW1lKTtcbiAgQlVUVE9OLmNsYXNzTGlzdCA9IFwiYWRkX3Rhc2tfYnV0dG9uXCI7XG4gIFBMVVNfSUNPTi5jbGFzc0xpc3QgPSBcImZhcyBmYS1wbHVzIGFkZF90YXNrX2ljb25cIjtcblxuICB0YXNrX2NvbnRhaW5lci5hcHBlbmQoQlVUVE9OKTtcbiAgQlVUVE9OLmFwcGVuZChQTFVTX0lDT04pO1xuXG4gIHJldHVybiBCVVRUT047XG59O1xuXG5jb25zdCBSRU5ERVJfQUREX1RBU0tfRk9STSA9ICgpID0+IHtcbiAgY29uc3QgQ1VSUlJFTlRfQ09OVEFJTkVSID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrX2Zvcm1fY29udGFpbmVyXCIpO1xuXG4gIGlmIChDVVJSUkVOVF9DT05UQUlORVIgPT09IG51bGwpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRlclwiKVswXS5zdHlsZS5maWx0ZXIgPSBcImJsdXIoLjRlbSlcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIm1haW5cIilbMF0uc3R5bGUuZmlsdGVyID0gXCJibHVyKC40ZW0pXCI7XG5cbiAgICBjb25zdCBUQVNLX0ZPUk1fQ09OVEFJTkVSID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBUQVNLX0ZPUk0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgICBjb25zdCBMQUJFTF9JTlBVVCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBjb25zdCBQUklPUklUWV9JTlBVVCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XG4gICAgY29uc3QgRFVFX0RBVEVfSU5QVVQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgY29uc3QgTk9URVNfSU5QVVQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgY29uc3QgQ0FOQ0VMX0FQUExZX0NPTlRBSU5FUiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgQ0FOQ0VMX0FERF9UQVNLID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gICAgY29uc3QgQVBQTFlfQUREX1RBU0sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgICBjb25zdCBJTlBVVFMgPSBbTEFCRUxfSU5QVVQsIFBSSU9SSVRZX0lOUFVULCBEVUVfREFURV9JTlBVVCwgTk9URVNfSU5QVVRdO1xuICAgIGNvbnN0IElEUyA9IFtcbiAgICAgIFwibGFiZWxfaW5wdXRcIixcbiAgICAgIFwicHJpb3JpdHlfaW5wdXRcIixcbiAgICAgIFwiZHVlX2RhdGVfaW5wdXRcIixcbiAgICAgIFwibm90ZXNfaW5wdXRcIixcbiAgICBdO1xuICAgIGNvbnN0IElOTkVSVEVYVCA9IFtcIiogTGFiZWxcIiwgXCJQcmlvcml0eVwiLCBcIkR1ZSBkYXRlXCIsIFwiTm90ZXNcIl07XG4gICAgY29uc3QgUFJJT1JJVFlfT1BUSU9OUyA9IFtcImxvd1wiLCBcIm1lZGl1bVwiLCBcImhpZ2hcIl07XG5cbiAgICBUQVNLX0ZPUk1fQ09OVEFJTkVSLmlkID0gXCJ0YXNrX2Zvcm1fY29udGFpbmVyXCI7XG4gICAgVEFTS19GT1JNLmlkID0gXCJhZGRfdGFza19mb3JtXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgIElOUFVUU1tpXS5pZCA9IElEU1tpXTtcbiAgICAgIElOUFVUU1tpXS5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIElEU1tpXSk7XG4gICAgICBJTlBVVFNbaV0uY2xhc3NMaXN0ID0gXCJ0YXNrX2lucHV0XCI7XG4gICAgICBpZiAoaSAhPT0gMSkge1xuICAgICAgICBJTlBVVFNbaV0uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gICAgICB9XG4gICAgICBpZiAoaSA9PT0gMikge1xuICAgICAgICBJTlBVVFNbaV0uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImRhdGVcIik7XG4gICAgICB9XG4gICAgfVxuICAgIERVRV9EQVRFX0lOUFVULnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiZXg6IDIwMjEvMTIvMjVcIik7XG4gICAgQ0FOQ0VMX0FERF9UQVNLLmNsYXNzTGlzdCA9IFwiZmFyIGZhLXRpbWVzLWNpcmNsZVwiO1xuICAgIENBTkNFTF9BRERfVEFTSy5pZCA9IFwiY2FuY2VsX2FkZF90YXNrX2ljb25cIjtcbiAgICBBUFBMWV9BRERfVEFTSy5jbGFzc0xpc3QgPSBcImZhciBmYS1jaGVjay1jaXJjbGVcIjtcbiAgICBBUFBMWV9BRERfVEFTSy5pZCA9IFwiYXBwbHlfYWRkX3Rhc2tfaWNvblwiO1xuICAgIENBTkNFTF9BUFBMWV9DT05UQUlORVIuaWQgPSBcImNhbmNlbF9hcHBseV9jb250YWluZXJcIjtcblxuICAgIEFQUExZX0FERF9UQVNLLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBBUFBMWV9BRERfVEFTS19IQU5ETEVSKTtcbiAgICBDQU5DRUxfQUREX1RBU0suYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIENBTkNFTF9BRERfVEFTS19IQU5ETEVSKTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKFRBU0tfRk9STV9DT05UQUlORVIpO1xuICAgIFRBU0tfRk9STV9DT05UQUlORVIuYXBwZW5kKFRBU0tfRk9STSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgIGNvbnN0IElOUFVUX0NPTlRBSU5FUiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjb25zdCBMQUJFTCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcblxuICAgICAgSU5QVVRfQ09OVEFJTkVSLmNsYXNzTGlzdCA9IFwidGFza19pbnB1dF9jb250YWluZXJcIjtcbiAgICAgIExBQkVMLnNldEF0dHJpYnV0ZShcImZvclwiLCBJRFNbaV0pO1xuICAgICAgTEFCRUwuY2xhc3NMaXN0ID0gXCJ0YXNrX2lucHV0X2xhYmVsXCI7XG4gICAgICBMQUJFTC5pbm5lclRleHQgPSBJTk5FUlRFWFRbaV07XG5cbiAgICAgIFRBU0tfRk9STS5hcHBlbmQoSU5QVVRfQ09OVEFJTkVSKTtcbiAgICAgIElOUFVUX0NPTlRBSU5FUi5hcHBlbmQoTEFCRUwpO1xuICAgICAgSU5QVVRfQ09OVEFJTkVSLmFwcGVuZChJTlBVVFNbaV0pO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgY29uc3QgT1BUSU9OID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgIE9QVElPTi5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBQUklPUklUWV9PUFRJT05TW2ldKTtcbiAgICAgIE9QVElPTi5pbm5lclRleHQgPSBQUklPUklUWV9PUFRJT05TW2ldO1xuICAgICAgUFJJT1JJVFlfSU5QVVQuYXBwZW5kKE9QVElPTik7XG4gICAgfVxuICAgIFRBU0tfRk9STS5hcHBlbmQoQ0FOQ0VMX0FQUExZX0NPTlRBSU5FUik7XG4gICAgQ0FOQ0VMX0FQUExZX0NPTlRBSU5FUi5hcHBlbmQoQ0FOQ0VMX0FERF9UQVNLKTtcbiAgICBDQU5DRUxfQVBQTFlfQ09OVEFJTkVSLmFwcGVuZChBUFBMWV9BRERfVEFTSyk7XG4gICAgTEFCRUxfSU5QVVQuZm9jdXMoKTtcbiAgfVxufTtcblxuY29uc3QgUkVNT1ZFX0FERF9UQVNLX0ZPUk0gPSAoKSA9PiB7XG4gIGNvbnN0IEFERF9UQVNLX0ZPUk0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tfZm9ybV9jb250YWluZXJcIik7XG4gIEFERF9UQVNLX0ZPUk0ucmVtb3ZlKCk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZGVyXCIpWzBdLnN0eWxlLmZpbHRlciA9IFwiXCI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibWFpblwiKVswXS5zdHlsZS5maWx0ZXIgPSBcIlwiO1xufTtcblxuZXhwb3J0IHtcbiAgSEVBREVSLFxuICBNRVRBX0RBVEEsXG4gIE5BVl9CQVIsXG4gIE1FTlVfQlVUVE9OLFxuICBSRU5ERVJfTkFWX0JBUl9HUk9VUFMsXG4gIEFERF9HUk9VUF9JTlBVVCxcbiAgUkVOREVSX1RBU0ssXG4gIFJFTU9WRV9DVVJSRU5UX0dST1VQLFxuICBSRU5ERVJfQUREX1RBU0tfQlVUVE9OLFxuICBSRU5ERVJfQUREX1RBU0tfRk9STSxcbiAgUkVNT1ZFX0FERF9UQVNLX0ZPUk0sXG59O1xuIiwiaW1wb3J0IHtcbiAgQUREX0dST1VQX0lOUFVUX0hBTkRMRVIsXG4gIFJFTU9WRV9DVVJSRU5UX0dST1VQLFxuICBSRU5ERVJfTkFWX0JBUl9HUk9VUFMsXG4gIFJFTkRFUl9UQVNLLFxuICBSRU5ERVJfQUREX1RBU0tfQlVUVE9OLFxuICBSRU5ERVJfQUREX1RBU0tfRk9STSxcbiAgUkVNT1ZFX0FERF9UQVNLX0ZPUk0sXG59IGZyb20gXCIuL2RvbS5qc1wiO1xuaW1wb3J0IHsgZ3JvdXBzLCBTRVRfU1RPUkFHRSB9IGZyb20gXCIuLi9hcHAuanNcIjtcblxuY29uc3QgRVZFTlRfTElTVEVORVJTID0gKCkgPT4ge1xuICBjb25zdCBIQU1CVVJHRVJfTUVOVSA9ICgoKSA9PiB7XG4gICAgY29uc3QgTUVOVV9CVVRUT04gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhhbWJ1cmdlcl9tZW51X2J1dHRvblwiKTtcblxuICAgIE1FTlVfQlVUVE9OLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBOQVZfTUVOVSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2X2NvbnRhaW5lclwiKTtcbiAgICAgIE5BVl9NRU5VLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICBNRU5VX0JVVFRPTi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfSk7XG4gIH0pKCk7XG5cbiAgY29uc3QgQUREX0dST1VQX0JVVFRPTiA9ICgoKSA9PiB7XG4gICAgY29uc3QgQUREX0JVVFRPTiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX2dyb3VwXCIpO1xuXG4gICAgQUREX0JVVFRPTi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgQ1VSUlJFTlRfQ09OVEFJTkVSID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrX2Zvcm1fY29udGFpbmVyXCIpO1xuXG4gICAgICBpZiAoQ1VSUlJFTlRfQ09OVEFJTkVSID09PSBudWxsKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX2dyb3VwXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRfZ3JvdXBfZm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX2dyb3VwX2lucHV0XCIpLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pKCk7XG5cbiAgY29uc3QgQ0FOQ0VMX05FV19HUk9VUF9JQ09OID0gKCgpID0+IHtcbiAgICBjb25zdCBDQU5DRUxfQlVUVE9OID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW5jZWxfZ3JvdXBfaWNvblwiKTtcblxuICAgIENBTkNFTF9CVVRUT04uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IENVUlJSRU5UX0NPTlRBSU5FUiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza19mb3JtX2NvbnRhaW5lclwiKTtcblxuICAgICAgaWYgKENVUlJSRU5UX0NPTlRBSU5FUiA9PT0gbnVsbCkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9ncm91cFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX2dyb3VwX2Zvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgfVxuICAgIH0pO1xuICB9KSgpO1xuXG4gIGNvbnN0IFNVQk1JVF9ORVdfR1JPVVBfSUNPTiA9ICgoKSA9PiB7XG4gICAgY29uc3QgU1VCTUlUX0JVVFRPTiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0X2dyb3VwX2ljb25cIik7XG5cbiAgICBTVUJNSVRfQlVUVE9OLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBDVVJSUkVOVF9DT05UQUlORVIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tfZm9ybV9jb250YWluZXJcIik7XG5cbiAgICAgIGlmIChDVVJSUkVOVF9DT05UQUlORVIgPT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgSU5QVVRfVEVYVCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX2dyb3VwX2lucHV0XCIpLnZhbHVlO1xuICAgICAgICBjb25zdCBJTlBVVF9GSUVMRCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX2dyb3VwX2lucHV0XCIpO1xuICAgICAgICBpZiAoSU5QVVRfVEVYVCA9PT0gXCJcIikge1xuICAgICAgICAgIElOUFVUX0ZJRUxELnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmdiKDE4MSwgNDAsIDQwKVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdyb3Vwc1tJTlBVVF9URVhUXSA9IFtdO1xuICAgICAgICAgIElOUFVUX0ZJRUxELnZhbHVlID0gXCJcIjtcbiAgICAgICAgICBSRU5ERVJfTkFWX0JBUl9HUk9VUFMoKTtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9ncm91cFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRfZ3JvdXBfZm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgU0VUX1NUT1JBR0UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KSgpO1xuXG4gIGNvbnN0IEdST1VQX0lOUFVUX1ZBTElEQVRJT04gPSAoKCkgPT4ge1xuICAgIGNvbnN0IElOUFVUX0ZJRUxEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRfZ3JvdXBfaW5wdXRcIik7XG5cbiAgICBJTlBVVF9GSUVMRC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgSU5QVVRfVEVYVCA9IElOUFVUX0ZJRUxELnZhbHVlO1xuICAgICAgY29uc3QgR1JPVVBTID0gT2JqZWN0LmtleXMoZ3JvdXBzKTtcblxuICAgICAgaWYgKEdST1VQUy5pbmNsdWRlcyhJTlBVVF9URVhUKSkge1xuICAgICAgICBJTlBVVF9GSUVMRC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYigxODEsIDQwLCA0MClcIjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRfZ3JvdXBfaWNvblwiKS5zdHlsZS52aXNpYmlsaXR5ID1cbiAgICAgICAgICBcImhpZGRlblwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgSU5QVVRfRklFTEQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ3aGl0ZVwiO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Ym1pdF9ncm91cF9pY29uXCIpLnN0eWxlLnZpc2liaWxpdHkgPVxuICAgICAgICAgIFwidmlzaWJsZVwiO1xuICAgICAgfVxuICAgIH0pO1xuICB9KSgpO1xufTtcblxuY29uc3QgQVRUQUNIX0RFTEVURV9HUk9VUF9MSVNURU5FUiA9IChpbnB1dF9lbGVtZW50KSA9PiB7XG4gIGlucHV0X2VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgVEFSR0VUX0RBVEFfR1JPVVAgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1ncm91cFwiKTtcbiAgICBjb25zdCBHUk9VUF9DT05UQUlORVIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYFtkYXRhLWdyb3VwLWNvbnRhaW5lcj0ke1RBUkdFVF9EQVRBX0dST1VQfV1gXG4gICAgKTtcbiAgICBHUk9VUF9DT05UQUlORVIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjOWIyNTI1ZTZcIjtcbiAgfSk7XG5cbiAgaW5wdXRfZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBUQVJHRVRfREFUQV9HUk9VUCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWdyb3VwXCIpO1xuICAgIGNvbnN0IEdST1VQX0NPTlRBSU5FUiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgW2RhdGEtZ3JvdXAtY29udGFpbmVyPSR7VEFSR0VUX0RBVEFfR1JPVVB9XWBcbiAgICApO1xuICAgIEdST1VQX0NPTlRBSU5FUi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMyOGJkYTdcIjtcbiAgfSk7XG5cbiAgaW5wdXRfZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgQ1VSUlJFTlRfQ09OVEFJTkVSID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrX2Zvcm1fY29udGFpbmVyXCIpO1xuXG4gICAgaWYgKENVUlJSRU5UX0NPTlRBSU5FUiA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgVEFSR0VUX0RBVEFfR1JPVVAgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1ncm91cFwiKTtcbiAgICAgIGRlbGV0ZSBncm91cHNbVEFSR0VUX0RBVEFfR1JPVVBdO1xuICAgICAgUkVOREVSX05BVl9CQVJfR1JPVVBTKCk7XG4gICAgICBTRVRfU1RPUkFHRSgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCBBVFRBQ0hfUkVOREVSX0dST1VQX0xJU1RFTkVSID0gKGlucHV0X2VsZW1lbnQpID0+IHtcbiAgaW5wdXRfZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgQ1VSUlJFTlRfQ09OVEFJTkVSID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrX2Zvcm1fY29udGFpbmVyXCIpO1xuXG4gICAgaWYgKENVUlJSRU5UX0NPTlRBSU5FUiA9PT0gbnVsbCkge1xuICAgICAgUkVNT1ZFX0NVUlJFTlRfR1JPVVAoKTtcblxuICAgICAgY29uc3QgR1JPVVBfTkFNRSA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWdyb3VwLXRleHRcIik7XG4gICAgICBjb25zdCBUQVNLU19DT05UQUlORVIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICBjb25zdCBBRERfVEFTS19JQ09OID0gUkVOREVSX0FERF9UQVNLX0JVVFRPTihHUk9VUF9OQU1FLCBUQVNLU19DT05UQUlORVIpO1xuICAgICAgQUREX1RBU0tfSUNPTi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgIFJFTkRFUl9BRERfVEFTS19GT1JNKCk7XG4gICAgICAgIGNvbnN0IEdST1VQX05BTUUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtYWRkLXRhc2tcIik7XG5cbiAgICAgICAgLy8gY29uc3QgVEFTS19MSVNUID0gZ3JvdXBzW0dST1VQX05BTUVdO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IFRBU0tTID0gZ3JvdXBzW0dST1VQX05BTUVdLm1hcCgodGFzaykgPT4ge1xuICAgICAgICBSRU5ERVJfVEFTSyh0YXNrLCBUQVNLU19DT05UQUlORVIpO1xuICAgICAgfSk7XG5cbiAgICAgIFRBU0tTX0NPTlRBSU5FUi5jbGFzc0xpc3QgPSBcInRhc2tzX2NvbnRhaW5lclwiO1xuICAgICAgVEFTS1NfQ09OVEFJTkVSLnNldEF0dHJpYnV0ZShcImRhdGEtZ3JvdXAtdGFza3NcIiwgR1JPVVBfTkFNRSk7XG5cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibWFpblwiKVswXS5hcHBlbmQoVEFTS1NfQ09OVEFJTkVSKTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgQ0FOQ0VMX0FERF9UQVNLX0hBTkRMRVIgPSAoKSA9PiB7XG4gIFJFTU9WRV9BRERfVEFTS19GT1JNKCk7XG59O1xuXG5jb25zdCBBUFBMWV9BRERfVEFTS19IQU5ETEVSID0gKCkgPT4ge1xuICBjb25zdCBMQUJFTCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFiZWxfaW5wdXRcIik7XG4gIGNvbnN0IFBSSU9SSVRZID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eV9pbnB1dFwiKTtcbiAgY29uc3QgRFVFX0RBVEUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZV9kYXRlX2lucHV0XCIpO1xuICBjb25zdCBOT1RFUyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm90ZXNfaW5wdXRcIik7XG5cbiAgY29uc29sZS5sb2coTEFCRUwpO1xuICBjb25zb2xlLmxvZyhQUklPUklUWSk7XG4gIGNvbnNvbGUubG9nKERVRV9EQVRFKTtcbiAgY29uc29sZS5sb2coTk9URVMpO1xufTtcblxuZXhwb3J0IHtcbiAgRVZFTlRfTElTVEVORVJTLFxuICBBVFRBQ0hfREVMRVRFX0dST1VQX0xJU1RFTkVSLFxuICBBVFRBQ0hfUkVOREVSX0dST1VQX0xJU1RFTkVSLFxuICBDQU5DRUxfQUREX1RBU0tfSEFORExFUixcbiAgQVBQTFlfQUREX1RBU0tfSEFORExFUixcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ3JvdXBzLCBUYXNrIH0gZnJvbSBcIi4uL2FwcC5qc1wiO1xuaW1wb3J0IHsgUkVOREVSX05BVl9CQVJfR1JPVVBTIH0gZnJvbSBcIi4uL2RvbS9kb20uanNcIjtcblxuaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UubGVuZ3RoID09PSAwKSB7XG4gIGNvbnN0IFNDSE9PTCA9IFtcIm1hdGhcIiwgXCJzY2llbmNlXCIsIFwiaGlzdG9yeVwiXTtcbiAgY29uc3QgR1lNID0gW1wiY2hlc3RcIiwgXCJiYWNrXCIsIFwibGVnc1wiXTtcbiAgY29uc3QgQ09ESU5HID0gW1wiZ2l0XCIsIFwiamF2YXNjcmlwdFwiLCBcInB5dGhvblwiXTtcbiAgY29uc3QgR1JPQ0VSSUVTID0gW1wiYXBwbGVzXCIsIFwiYmFuYW5hc1wiLCBcIm1pbGtcIl07XG4gIGNvbnN0IE1PVklFUyA9IFtcImZpZ2h0IGNsdWJcIiwgXCJzdGFyIHdhcnNcIiwgXCJqYXdzXCJdO1xuICBjb25zdCBDQU5EWSA9IFtcImNob2NvbGF0ZVwiLCBcInNuaWNrZXJzXCIsIFwic291ciBwYXRjaCBraWRzXCJdO1xuICBjb25zdCBESVNUUk8gPSBbXCJ1YnVudHVcIiwgXCJkZWJpYW5cIiwgXCJhcmNoXCJdO1xuXG4gIGNvbnN0IERFRkFVTFRfSVRFUkFUT1IgPSAobmFtZSwgdGFza3MpID0+IHtcbiAgICBncm91cHNbbmFtZV0gPSBbXTtcblxuICAgIC8vIDwtZHVlIGRhdGUtPlxuICAgIGNvbnN0IERBWVNfRFVFX0ZST01fVE9EQVkgPSBbMCwgNywgMTRdO1xuICAgIGNvbnN0IFRPREFZID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCBZRUFSID0gVE9EQVkuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCBNT05USCA9IFRPREFZLmdldE1vbnRoKCk7XG4gICAgY29uc3QgREFZID0gVE9EQVkuZ2V0RGF0ZSgpO1xuXG4gICAgLy8gPC1wcmlvcml0aWVzLT5cbiAgICBjb25zdCBQUklPUklUWSA9IFtcImxvd1wiLCBcIm1lZGl1bVwiLCBcImhpZ2hcIl07XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgZ3JvdXBzW25hbWVdLnB1c2goXG4gICAgICAgIG5ldyBUYXNrKFxuICAgICAgICAgIHRhc2tzW2ldLFxuICAgICAgICAgIFBSSU9SSVRZW2ldLFxuICAgICAgICAgIG5ldyBEYXRlKFlFQVIsIE1PTlRILCBEQVkgKyBEQVlTX0RVRV9GUk9NX1RPREFZW2ldKVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfTtcbiAgREVGQVVMVF9JVEVSQVRPUihcInNjaG9vbFwiLCBTQ0hPT0wpO1xuICBERUZBVUxUX0lURVJBVE9SKFwiZ3ltXCIsIEdZTSk7XG4gIERFRkFVTFRfSVRFUkFUT1IoXCJjb2RpbmdcIiwgQ09ESU5HKTtcbiAgREVGQVVMVF9JVEVSQVRPUihcImdyb2Nlcmllc1wiLCBHUk9DRVJJRVMpO1xuICBERUZBVUxUX0lURVJBVE9SKFwibW92aWVzXCIsIE1PVklFUyk7XG4gIERFRkFVTFRfSVRFUkFUT1IoXCJjYW5keVwiLCBDQU5EWSk7XG4gIERFRkFVTFRfSVRFUkFUT1IoXCJkaXN0cm9cIiwgRElTVFJPKTtcblxuICBSRU5ERVJfTkFWX0JBUl9HUk9VUFMoKTtcbiAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZ3JvdXBzXCIsIEpTT04uc3RyaW5naWZ5KGdyb3VwcykpO1xuXG4gIGNvbnNvbGUubG9nKGdyb3Vwcyk7XG59IGVsc2Uge1xuICBSRU5ERVJfTkFWX0JBUl9HUk9VUFMoKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=