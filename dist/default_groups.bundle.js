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
/* harmony export */   "REMOVE_ADD_TASK_FORM": () => (/* binding */ REMOVE_ADD_TASK_FORM),
/* harmony export */   "RENDER_GROUP": () => (/* binding */ RENDER_GROUP)
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
  NAV_BAR_TEXT.id = "header";

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
  const GROUP_CONTAINER = document.createElement("div");
  const GROUP_HEADING = document.createElement("h2");
  const GROUP_LIST = document.createElement("ol");

  NAV_CONTAINER.id = "nav_container";
  DUE_CONTAINER.id = "due_container";
  DUE_HEADING.id = "due_heading";
  DUE_TODAY.id = "due_today";
  DUE_THIS_WEEK.id = "due_this_week";
  GROUP_CONTAINER.id = "group_container";
  GROUP_HEADING.id = "group_heading";
  GROUP_LIST.id = "task_group_container";

  const TIME_PERIOD_VIEW = [DUE_TODAY, DUE_THIS_WEEK].map(
    (element) => (element.classList = "time_periods")
  );

  DUE_HEADING.innerText = "Due";
  DUE_TODAY.innerText = "Today";
  DUE_THIS_WEEK.innerText = "Week";
  GROUP_HEADING.innerText = "Groups";

  document.body.append(MAIN);
  MAIN.append(NAV_CONTAINER);
  NAV_CONTAINER.append(DUE_CONTAINER);
  DUE_CONTAINER.append(DUE_HEADING);
  DUE_CONTAINER.append(DUE_TODAY);
  DUE_CONTAINER.append(DUE_THIS_WEEK);
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
  const LABEL_VALUE = task.label;
  const PRIORITY_VALUE = task.priority;
  const DUE_DATE_VALUE = task.due_date;
  const TODAY = new Date().toISOString();
  const NOTES_VALUE = task.notes;
  const ID = task.id;

  const TASK_CONTAINER = document.createElement("div");
  const LABEL = document.createElement("h2");
  const PRIORITY = document.createElement("div");
  const DUE_DATE = document.createElement("div");
  const NOTES = document.createElement("div");
  const DELETE_TASK_ICON = document.createElement("i");

  TASK_CONTAINER.classList = "task";
  TASK_CONTAINER.setAttribute("data-id", ID);
  // LABEL.classList = "";
  // let difference = differenceInDays(TODAY, DUE_DATE_VALUE);
  console.log(DUE_DATE_VALUE);

  tasks_container.append(TASK_CONTAINER);
};

const RENDER_GROUP = (event, name) => {
  const GROUP_NAME = name || event.target.getAttribute("data-group-text");
  const TASKS_CONTAINER = document.createElement("div");

  const ADD_TASK_ICON = RENDER_ADD_TASK_BUTTON(GROUP_NAME, TASKS_CONTAINER);

  (0,_event_listeners_js__WEBPACK_IMPORTED_MODULE_1__.ATTACH_ADD_TASK_LISTENER)(ADD_TASK_ICON);

  const TASKS = _app_js__WEBPACK_IMPORTED_MODULE_0__.groups[GROUP_NAME].map((task) => {
    RENDER_TASK(task, TASKS_CONTAINER);
    task;
  });

  TASKS_CONTAINER.classList = "tasks_container";
  TASKS_CONTAINER.setAttribute("data-group-tasks", GROUP_NAME);

  document.getElementsByTagName("main")[0].append(TASKS_CONTAINER);
  document.getElementById("header").innerText = GROUP_NAME;
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
  BUTTON.classList = "task add_task_button";
  PLUS_ICON.classList = "fas fa-plus add_task_icon";

  task_container.append(BUTTON);
  BUTTON.append(PLUS_ICON);

  return BUTTON;
};

const RENDER_ADD_TASK_FORM = (group_name) => {
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
    const CANCEL_ADD_TASK_ICON = document.createElement("i");
    const APPLY_ADD_TASK_ICON = document.createElement("i");
    const INPUTS = [LABEL_INPUT, PRIORITY_INPUT, DUE_DATE_INPUT, NOTES_INPUT];
    const IDS = [
      "label_input",
      "priority_input",
      "due_date_input",
      "notes_input",
    ];
    const INNERTEXT = ["Label", "Priority", "Due date", "Notes"];
    const PRIORITY_OPTIONS = ["low", "medium", "high"];

    TASK_FORM_CONTAINER.id = "task_form_container";
    TASK_FORM_CONTAINER.setAttribute("data-group", group_name);
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
    CANCEL_ADD_TASK_ICON.classList = "far fa-times-circle";
    CANCEL_ADD_TASK_ICON.id = "cancel_add_task_icon";
    APPLY_ADD_TASK_ICON.classList = "far fa-check-circle";
    APPLY_ADD_TASK_ICON.id = "apply_add_task_icon";
    CANCEL_APPLY_CONTAINER.id = "cancel_apply_container";

    (0,_event_listeners_js__WEBPACK_IMPORTED_MODULE_1__.APPLY_ADD_TASK)(APPLY_ADD_TASK_ICON);
    (0,_event_listeners_js__WEBPACK_IMPORTED_MODULE_1__.CANCEL_ADD_TASK)(CANCEL_ADD_TASK_ICON);

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
    CANCEL_APPLY_CONTAINER.append(CANCEL_ADD_TASK_ICON);
    CANCEL_APPLY_CONTAINER.append(APPLY_ADD_TASK_ICON);
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
/* harmony export */   "CANCEL_ADD_TASK": () => (/* binding */ CANCEL_ADD_TASK),
/* harmony export */   "APPLY_ADD_TASK": () => (/* binding */ APPLY_ADD_TASK),
/* harmony export */   "ATTACH_ADD_TASK_LISTENER": () => (/* binding */ ATTACH_ADD_TASK_LISTENER)
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
      (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.RENDER_GROUP)(event);
    }
  });
};

const ATTACH_ADD_TASK_LISTENER = (element) => {
  element.addEventListener("click", (event) => {
    const GROUP_NAME = event.currentTarget.getAttribute("data-add-task");
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.RENDER_ADD_TASK_FORM)(GROUP_NAME);
  });
};

const CANCEL_ADD_TASK = (cancel_icon) => {
  cancel_icon.addEventListener("click", () => {
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.REMOVE_ADD_TASK_FORM)();
  });
};

const APPLY_ADD_TASK = (apply_icon) => {
  apply_icon.addEventListener("click", () => {
    const GROUP_NAME = document
      .getElementById("task_form_container")
      .getAttribute("data-group");
    const LABEL_VALUE = document.getElementById("label_input").value;
    const PRIORITY_VALUE = document.getElementById("priority_input").value;
    const DUE_DATE_VALUE = document.getElementById("due_date_input").value;
    const NOTES_VALUE = document.getElementById("notes_input").value;

    // const YEAR = DUE_DATE_VALUE.slice(0, 4);
    // const MONTH = DUE_DATE_VALUE.slice(5, 7);
    // const DAY = DUE_DATE_VALUE.slice(8, 10);
    // let due;
    // DUE_DATE_VALUE === "" ? (due = "") : (due = new Date(YEAR, MONTH, DAY));

    const NEW_TASK = new _app_js__WEBPACK_IMPORTED_MODULE_1__.Task(
      LABEL_VALUE,
      PRIORITY_VALUE,
      DUE_DATE_VALUE,
      NOTES_VALUE
    );

    _app_js__WEBPACK_IMPORTED_MODULE_1__.groups[GROUP_NAME].push(NEW_TASK);

    (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.REMOVE_ADD_TASK_FORM)();
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.REMOVE_CURRENT_GROUP)();
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.RENDER_GROUP)(null, GROUP_NAME);
    (0,_app_js__WEBPACK_IMPORTED_MODULE_1__.SET_STORAGE)();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUF1RCwyQ0FBTTs7QUFFN0QsY0FBYywyQ0FBTTtBQUNwQixFQUFFO0FBQ0YsRUFBRSxrRUFBcUI7QUFDdkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL3V1aWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ieXRlc1RvVXVpZC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL3JuZy1icm93c2VyLmpzIiwid2VicGFjazovL3RvZG8vLi9ub2RlX21vZHVsZXMvdXVpZC92MS5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL3V1aWQvdjQuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9kb20vZG9tLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvZG9tL2V2ZW50X2xpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2hlbHBlcnMvZGVmYXVsdF9ncm91cHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIHYxID0gcmVxdWlyZSgnLi92MScpO1xudmFyIHY0ID0gcmVxdWlyZSgnLi92NCcpO1xuXG52YXIgdXVpZCA9IHY0O1xudXVpZC52MSA9IHYxO1xudXVpZC52NCA9IHY0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV1aWQ7XG4iLCIvKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cbnZhciBieXRlVG9IZXggPSBbXTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcbn1cblxuZnVuY3Rpb24gYnl0ZXNUb1V1aWQoYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBvZmZzZXQgfHwgMDtcbiAgdmFyIGJ0aCA9IGJ5dGVUb0hleDtcbiAgLy8gam9pbiB1c2VkIHRvIGZpeCBtZW1vcnkgaXNzdWUgY2F1c2VkIGJ5IGNvbmNhdGVuYXRpb246IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMxNzUjYzRcbiAgcmV0dXJuIChbXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV1cbiAgXSkuam9pbignJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnl0ZXNUb1V1aWQ7XG4iLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgSW4gdGhlXG4vLyBicm93c2VyIHRoaXMgaXMgYSBsaXR0bGUgY29tcGxpY2F0ZWQgZHVlIHRvIHVua25vd24gcXVhbGl0eSBvZiBNYXRoLnJhbmRvbSgpXG4vLyBhbmQgaW5jb25zaXN0ZW50IHN1cHBvcnQgZm9yIHRoZSBgY3J5cHRvYCBBUEkuICBXZSBkbyB0aGUgYmVzdCB3ZSBjYW4gdmlhXG4vLyBmZWF0dXJlLWRldGVjdGlvblxuXG4vLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG9cbi8vIGltcGxlbWVudGF0aW9uLiBBbHNvLCBmaW5kIHRoZSBjb21wbGV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBjcnlwdG8gb24gSUUxMS5cbnZhciBnZXRSYW5kb21WYWx1ZXMgPSAodHlwZW9mKGNyeXB0bykgIT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mKG1zQ3J5cHRvKSAhPSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93Lm1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PSAnZnVuY3Rpb24nICYmIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKG1zQ3J5cHRvKSk7XG5cbmlmIChnZXRSYW5kb21WYWx1ZXMpIHtcbiAgLy8gV0hBVFdHIGNyeXB0byBSTkcgLSBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvQ3J5cHRvXG4gIHZhciBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd2hhdHdnUk5HKCkge1xuICAgIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG4gICAgcmV0dXJuIHJuZHM4O1xuICB9O1xufSBlbHNlIHtcbiAgLy8gTWF0aC5yYW5kb20oKS1iYXNlZCAoUk5HKVxuICAvL1xuICAvLyBJZiBhbGwgZWxzZSBmYWlscywgdXNlIE1hdGgucmFuZG9tKCkuICBJdCdzIGZhc3QsIGJ1dCBpcyBvZiB1bnNwZWNpZmllZFxuICAvLyBxdWFsaXR5LlxuICB2YXIgcm5kcyA9IG5ldyBBcnJheSgxNik7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtYXRoUk5HKCkge1xuICAgIGZvciAodmFyIGkgPSAwLCByOyBpIDwgMTY7IGkrKykge1xuICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XG4gICAgICBybmRzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xuICAgIH1cblxuICAgIHJldHVybiBybmRzO1xuICB9O1xufVxuIiwidmFyIHJuZyA9IHJlcXVpcmUoJy4vbGliL3JuZycpO1xudmFyIGJ5dGVzVG9VdWlkID0gcmVxdWlyZSgnLi9saWIvYnl0ZXNUb1V1aWQnKTtcblxuLy8gKipgdjEoKWAgLSBHZW5lcmF0ZSB0aW1lLWJhc2VkIFVVSUQqKlxuLy9cbi8vIEluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9MaW9zSy9VVUlELmpzXG4vLyBhbmQgaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L3V1aWQuaHRtbFxuXG52YXIgX25vZGVJZDtcbnZhciBfY2xvY2tzZXE7XG5cbi8vIFByZXZpb3VzIHV1aWQgY3JlYXRpb24gdGltZVxudmFyIF9sYXN0TVNlY3MgPSAwO1xudmFyIF9sYXN0TlNlY3MgPSAwO1xuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkIGZvciBBUEkgZGV0YWlsc1xuZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gIHZhciBiID0gYnVmIHx8IFtdO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxO1xuXG4gIC8vIG5vZGUgYW5kIGNsb2Nrc2VxIG5lZWQgdG8gYmUgaW5pdGlhbGl6ZWQgdG8gcmFuZG9tIHZhbHVlcyBpZiB0aGV5J3JlIG5vdFxuICAvLyBzcGVjaWZpZWQuICBXZSBkbyB0aGlzIGxhemlseSB0byBtaW5pbWl6ZSBpc3N1ZXMgcmVsYXRlZCB0byBpbnN1ZmZpY2llbnRcbiAgLy8gc3lzdGVtIGVudHJvcHkuICBTZWUgIzE4OVxuICBpZiAobm9kZSA9PSBudWxsIHx8IGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICB2YXIgc2VlZEJ5dGVzID0gcm5nKCk7XG4gICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG4gICAgICBub2RlID0gX25vZGVJZCA9IFtcbiAgICAgICAgc2VlZEJ5dGVzWzBdIHwgMHgwMSxcbiAgICAgICAgc2VlZEJ5dGVzWzFdLCBzZWVkQnl0ZXNbMl0sIHNlZWRCeXRlc1szXSwgc2VlZEJ5dGVzWzRdLCBzZWVkQnl0ZXNbNV1cbiAgICAgIF07XG4gICAgfVxuICAgIGlmIChjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxuICAgICAgY2xvY2tzZXEgPSBfY2xvY2tzZXEgPSAoc2VlZEJ5dGVzWzZdIDw8IDggfCBzZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuICB2YXIgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1zZWNzIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7XG5cbiAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICB2YXIgZHQgPSAobXNlY3MgLSBfbGFzdE1TZWNzKSArIChuc2VjcyAtIF9sYXN0TlNlY3MpLzEwMDAwO1xuXG4gIC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cbiAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09PSB1bmRlZmluZWQpIHtcbiAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgfVxuXG4gIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH1cblxuICAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXVpZC52MSgpOiBDYW5cXCd0IGNyZWF0ZSBtb3JlIHRoYW4gMTBNIHV1aWRzL3NlYycpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxO1xuXG4gIC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDtcblxuICAvLyBgdGltZV9sb3dgXG4gIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfbWlkYFxuICB2YXIgdG1oID0gKG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCkgJiAweGZmZmZmZmY7XG4gIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRtaCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcbiAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjtcblxuICAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcbiAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwO1xuXG4gIC8vIGBjbG9ja19zZXFfbG93YFxuICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7XG5cbiAgLy8gYG5vZGVgXG4gIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgKytuKSB7XG4gICAgYltpICsgbl0gPSBub2RlW25dO1xuICB9XG5cbiAgcmV0dXJuIGJ1ZiA/IGJ1ZiA6IGJ5dGVzVG9VdWlkKGIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHYxO1xuIiwidmFyIHJuZyA9IHJlcXVpcmUoJy4vbGliL3JuZycpO1xudmFyIGJ5dGVzVG9VdWlkID0gcmVxdWlyZSgnLi9saWIvYnl0ZXNUb1V1aWQnKTtcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG5cbiAgaWYgKHR5cGVvZihvcHRpb25zKSA9PSAnc3RyaW5nJykge1xuICAgIGJ1ZiA9IG9wdGlvbnMgPT09ICdiaW5hcnknID8gbmV3IEFycmF5KDE2KSA6IG51bGw7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpO1xuXG4gIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XG5cbiAgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG4gIGlmIChidWYpIHtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgMTY7ICsraWkpIHtcbiAgICAgIGJ1ZltpICsgaWldID0gcm5kc1tpaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZiB8fCBieXRlc1RvVXVpZChybmRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2NDtcbiIsImltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tIFwidXVpZFwiO1xuXG5sZXQgZ3JvdXBzID0ge307XG5cbmlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmxlbmd0aCAhPT0gMCkge1xuICBjb25zdCBMT0NBTF9TVE9SQUdFX0dST1VQUyA9IEpTT04ucGFyc2UoXG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZ3JvdXBzXCIpXG4gICk7XG4gIGdyb3VwcyA9IExPQ0FMX1NUT1JBR0VfR1JPVVBTO1xufVxuXG4vLyB3aW5kb3cubG9jYWxTdG9yYWdlLmNsZWFyKCk7XG5cbmNvbnN0IFNFVF9TVE9SQUdFID0gKCkgPT4ge1xuICB3aW5kb3cubG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImdyb3Vwc1wiLCBKU09OLnN0cmluZ2lmeShncm91cHMpKTtcbn07XG5cbmNvbnN0IFRhc2sgPSBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKGxhYmVsID0gXCJcIiwgcHJpb3JpdHkgPSBcImxvd1wiLCBkdWVfZGF0ZSA9IFwiXCIsIG5vdGVzID0gXCJcIikge1xuICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgdGhpcy5kdWVfZGF0ZSA9IGR1ZV9kYXRlO1xuICAgIHRoaXMubm90ZXMgPSBub3RlcztcbiAgICB0aGlzLmlkID0gdXVpZCgpO1xuICB9XG59O1xuXG5leHBvcnQgeyBncm91cHMsIFNFVF9TVE9SQUdFLCBUYXNrIH07XG4iLCJpbXBvcnQgeyBkaWZmZXJlbmNlSW5EYXlzIH0gZnJvbSBcImRhdGUtZm5zXCI7XG5pbXBvcnQgeyBncm91cHMgfSBmcm9tIFwiLi4vYXBwLmpzXCI7XG5pbXBvcnQge1xuICBBVFRBQ0hfREVMRVRFX0dST1VQX0xJU1RFTkVSLFxuICBBVFRBQ0hfUkVOREVSX0dST1VQX0xJU1RFTkVSLFxuICBDQU5DRUxfQUREX1RBU0ssXG4gIEFQUExZX0FERF9UQVNLLFxuICBBVFRBQ0hfQUREX1RBU0tfTElTVEVORVIsXG59IGZyb20gXCIuL2V2ZW50X2xpc3RlbmVycy5qc1wiO1xuXG5jb25zdCBNRVRBX0RBVEEgPSAoKSA9PiB7XG4gIGNvbnN0IEZPTlRfQVdFU09NRSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG4gIEZPTlRfQVdFU09NRS5zZXRBdHRyaWJ1dGUoXCJyZWxcIiwgXCJzdHlsZXNoZWV0XCIpO1xuICBGT05UX0FXRVNPTUUuc2V0QXR0cmlidXRlKFxuICAgIFwiaHJlZlwiLFxuICAgIFwiaHR0cHM6Ly91c2UuZm9udGF3ZXNvbWUuY29tL3JlbGVhc2VzL3Y1LjE1LjMvY3NzL2FsbC5jc3NcIlxuICApO1xuICBGT05UX0FXRVNPTUUuc2V0QXR0cmlidXRlKFxuICAgIFwiaW50ZWdyaXR5XCIsXG4gICAgXCJzaGEzODQtU1pYeFg0d2hKNzkvZ0Vyd2NPWWYreldMZUpkWS9xcHVxQzRjQWE5ck9HVXN0UG9tdHFwdU5XVDl3ZFBFbjJma1wiXG4gICk7XG4gIEZPTlRfQVdFU09NRS5zZXRBdHRyaWJ1dGUoXCJjcm9zc29yaWdpblwiLCBcImFub255bW91c1wiKTtcblxuICBkb2N1bWVudC5oZWFkLmFwcGVuZChGT05UX0FXRVNPTUUpO1xufTtcblxuY29uc3QgTUVOVV9CVVRUT04gPSAoKSA9PiB7XG4gIGNvbnN0IEhBTUJVUkdFUl9NRU5VX0JVVFRPTiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGNvbnN0IEhBTUJVUkdFUl9CVVRUT05fSUNPTiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuXG4gIEhBTUJVUkdFUl9NRU5VX0JVVFRPTi5pZCA9IFwiaGFtYnVyZ2VyX21lbnVfYnV0dG9uXCI7XG4gIEhBTUJVUkdFUl9CVVRUT05fSUNPTi5jbGFzc0xpc3QgPSBcImZhcyBmYS1hbGlnbi1qdXN0aWZ5XCI7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmQoSEFNQlVSR0VSX01FTlVfQlVUVE9OKTtcbiAgSEFNQlVSR0VSX01FTlVfQlVUVE9OLmFwcGVuZChIQU1CVVJHRVJfQlVUVE9OX0lDT04pO1xufTtcblxuY29uc3QgSEVBREVSID0gKCkgPT4ge1xuICBjb25zdCBIRUFERVJfQ09OVEFJTkVSID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgY29uc3QgTkFWX0JBUl9URVhUID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuXG4gIE5BVl9CQVJfVEVYVC5pbm5lclRleHQgPSBcIlRhc2sgTWFzdGVyXCI7XG4gIE5BVl9CQVJfVEVYVC5pZCA9IFwiaGVhZGVyXCI7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmQoSEVBREVSX0NPTlRBSU5FUik7XG4gIEhFQURFUl9DT05UQUlORVIuYXBwZW5kKE5BVl9CQVJfVEVYVCk7XG59O1xuXG5jb25zdCBOQVZfQkFSID0gKCkgPT4ge1xuICBjb25zdCBNQUlOID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm1haW5cIik7XG4gIGNvbnN0IE5BVl9DT05UQUlORVIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibmF2XCIpO1xuICBjb25zdCBEVUVfQ09OVEFJTkVSID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9sXCIpO1xuICBjb25zdCBEVUVfSEVBRElORyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgY29uc3QgRFVFX1RPREFZID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBjb25zdCBEVUVfVEhJU19XRUVLID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBjb25zdCBHUk9VUF9DT05UQUlORVIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBHUk9VUF9IRUFESU5HID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICBjb25zdCBHUk9VUF9MSVNUID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9sXCIpO1xuXG4gIE5BVl9DT05UQUlORVIuaWQgPSBcIm5hdl9jb250YWluZXJcIjtcbiAgRFVFX0NPTlRBSU5FUi5pZCA9IFwiZHVlX2NvbnRhaW5lclwiO1xuICBEVUVfSEVBRElORy5pZCA9IFwiZHVlX2hlYWRpbmdcIjtcbiAgRFVFX1RPREFZLmlkID0gXCJkdWVfdG9kYXlcIjtcbiAgRFVFX1RISVNfV0VFSy5pZCA9IFwiZHVlX3RoaXNfd2Vla1wiO1xuICBHUk9VUF9DT05UQUlORVIuaWQgPSBcImdyb3VwX2NvbnRhaW5lclwiO1xuICBHUk9VUF9IRUFESU5HLmlkID0gXCJncm91cF9oZWFkaW5nXCI7XG4gIEdST1VQX0xJU1QuaWQgPSBcInRhc2tfZ3JvdXBfY29udGFpbmVyXCI7XG5cbiAgY29uc3QgVElNRV9QRVJJT0RfVklFVyA9IFtEVUVfVE9EQVksIERVRV9USElTX1dFRUtdLm1hcChcbiAgICAoZWxlbWVudCkgPT4gKGVsZW1lbnQuY2xhc3NMaXN0ID0gXCJ0aW1lX3BlcmlvZHNcIilcbiAgKTtcblxuICBEVUVfSEVBRElORy5pbm5lclRleHQgPSBcIkR1ZVwiO1xuICBEVUVfVE9EQVkuaW5uZXJUZXh0ID0gXCJUb2RheVwiO1xuICBEVUVfVEhJU19XRUVLLmlubmVyVGV4dCA9IFwiV2Vla1wiO1xuICBHUk9VUF9IRUFESU5HLmlubmVyVGV4dCA9IFwiR3JvdXBzXCI7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmQoTUFJTik7XG4gIE1BSU4uYXBwZW5kKE5BVl9DT05UQUlORVIpO1xuICBOQVZfQ09OVEFJTkVSLmFwcGVuZChEVUVfQ09OVEFJTkVSKTtcbiAgRFVFX0NPTlRBSU5FUi5hcHBlbmQoRFVFX0hFQURJTkcpO1xuICBEVUVfQ09OVEFJTkVSLmFwcGVuZChEVUVfVE9EQVkpO1xuICBEVUVfQ09OVEFJTkVSLmFwcGVuZChEVUVfVEhJU19XRUVLKTtcbiAgTkFWX0NPTlRBSU5FUi5hcHBlbmQoR1JPVVBfQ09OVEFJTkVSKTtcbiAgR1JPVVBfQ09OVEFJTkVSLmFwcGVuZChHUk9VUF9IRUFESU5HKTtcbiAgR1JPVVBfQ09OVEFJTkVSLmFwcGVuZChHUk9VUF9MSVNUKTtcblxuICBjb25zdCBBRERfR1JPVVBfQlVUVE9OID0gKCgpID0+IHtcbiAgICBjb25zdCBBRERfR1JPVVBfQlVUVE9OID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjb25zdCBBRERfR1JPVVBfUExVU19JQ09OID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG5cbiAgICBBRERfR1JPVVBfQlVUVE9OLmlkID0gXCJhZGRfZ3JvdXBcIjtcbiAgICBBRERfR1JPVVBfQlVUVE9OLmlubmVyVGV4dCA9IFwiZ3JvdXBcIjtcbiAgICBBRERfR1JPVVBfUExVU19JQ09OLmlkID0gXCJhZGRfZ3JvdXBfcGx1c19zaWduXCI7XG4gICAgQUREX0dST1VQX1BMVVNfSUNPTi5jbGFzc0xpc3QgPSBcImZhcyBmYS1wbHVzLWNpcmNsZVwiO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJncm91cF9jb250YWluZXJcIikuYXBwZW5kKEFERF9HUk9VUF9CVVRUT04pO1xuICAgIEFERF9HUk9VUF9CVVRUT04ucHJlcGVuZChBRERfR1JPVVBfUExVU19JQ09OKTtcbiAgfSkoKTtcbn07XG5cbmNvbnN0IFJFTkRFUl9OQVZfQkFSX0dST1VQUyA9ICgpID0+IHtcbiAgY29uc3QgUkVNT1ZFX0FMTF9HUk9VUFMgPSBbXG4gICAgLi4uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrX2dyb3VwX2NvbnRhaW5lclwiKS5jaGlsZHJlbixcbiAgXS5tYXAoKG5vZGUpID0+IG5vZGUucmVtb3ZlKCkpO1xuXG4gIGNvbnN0IEdST1VQU19DT05UQUlORVIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tfZ3JvdXBfY29udGFpbmVyXCIpO1xuICBmb3IgKGxldCBwcm9wIGluIGdyb3Vwcykge1xuICAgIGNvbnN0IEdST1VQID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgIGNvbnN0IFRFWFQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgY29uc3QgVFJBU0ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcblxuICAgIEdST1VQLnNldEF0dHJpYnV0ZShcImRhdGEtZ3JvdXAtY29udGFpbmVyXCIsIHByb3ApO1xuICAgIEdST1VQLmNsYXNzTGlzdCA9IFwibmF2X2Jhcl9ncm91cFwiO1xuICAgIFRFWFQuc2V0QXR0cmlidXRlKFwiZGF0YS1ncm91cC10ZXh0XCIsIHByb3ApO1xuICAgIFRFWFQuaW5uZXJUZXh0ID0gcHJvcDtcbiAgICBURVhULmNsYXNzTGlzdCA9IFwiaW5kaXZpZHVhbF9ncm91cF9oZWFkaW5nXCI7XG4gICAgVFJBU0guY2xhc3NMaXN0ID0gXCJkZWxldGVfZ3JvdXAgZmEgZmEtdHJhc2hcIjtcbiAgICBUUkFTSC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWdyb3VwXCIsIHByb3ApO1xuICAgIFRSQVNILnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcblxuICAgIEFUVEFDSF9ERUxFVEVfR1JPVVBfTElTVEVORVIoVFJBU0gpO1xuICAgIEFUVEFDSF9SRU5ERVJfR1JPVVBfTElTVEVORVIoVEVYVCk7XG5cbiAgICBHUk9VUFNfQ09OVEFJTkVSLmFwcGVuZChHUk9VUCk7XG4gICAgR1JPVVAuYXBwZW5kKFRFWFQpO1xuICAgIEdST1VQLmFwcGVuZChUUkFTSCk7XG4gIH1cbn07XG5cbmNvbnN0IEFERF9HUk9VUF9JTlBVVCA9ICgpID0+IHtcbiAgY29uc3QgR1JPVVBfQ09OVEFJTkVSID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJncm91cF9jb250YWluZXJcIik7XG4gIGNvbnN0IEZPUk0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgY29uc3QgQ0FOQ0VMID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gIGNvbnN0IElOUFVUID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBjb25zdCBTVUJNSVQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcblxuICBGT1JNLmlkID0gXCJhZGRfZ3JvdXBfZm9ybVwiO1xuICBDQU5DRUwuaWQgPSBcImNhbmNlbF9ncm91cF9pY29uXCI7XG4gIENBTkNFTC5jbGFzc0xpc3QgPSBcImZhcyBmYS13aW5kb3ctY2xvc2VcIjtcbiAgSU5QVVQuaWQgPSBcImFkZF9ncm91cF9pbnB1dFwiO1xuICBTVUJNSVQuY2xhc3NMaXN0ID0gXCJmYXMgZmEtc2lnbi1pbi1hbHRcIjtcbiAgU1VCTUlULmlkID0gXCJzdWJtaXRfZ3JvdXBfaWNvblwiO1xuXG4gIEdST1VQX0NPTlRBSU5FUi5hcHBlbmQoRk9STSk7XG4gIEZPUk0uYXBwZW5kKENBTkNFTCk7XG4gIEZPUk0uYXBwZW5kKElOUFVUKTtcbiAgRk9STS5hcHBlbmQoU1VCTUlUKTtcbn07XG5cbmNvbnN0IFJFTkRFUl9UQVNLID0gKHRhc2ssIHRhc2tzX2NvbnRhaW5lcikgPT4ge1xuICBjb25zdCBMQUJFTF9WQUxVRSA9IHRhc2subGFiZWw7XG4gIGNvbnN0IFBSSU9SSVRZX1ZBTFVFID0gdGFzay5wcmlvcml0eTtcbiAgY29uc3QgRFVFX0RBVEVfVkFMVUUgPSB0YXNrLmR1ZV9kYXRlO1xuICBjb25zdCBUT0RBWSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbiAgY29uc3QgTk9URVNfVkFMVUUgPSB0YXNrLm5vdGVzO1xuICBjb25zdCBJRCA9IHRhc2suaWQ7XG5cbiAgY29uc3QgVEFTS19DT05UQUlORVIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBMQUJFTCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgY29uc3QgUFJJT1JJVFkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBEVUVfREFURSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IE5PVEVTID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgREVMRVRFX1RBU0tfSUNPTiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuXG4gIFRBU0tfQ09OVEFJTkVSLmNsYXNzTGlzdCA9IFwidGFza1wiO1xuICBUQVNLX0NPTlRBSU5FUi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIsIElEKTtcbiAgLy8gTEFCRUwuY2xhc3NMaXN0ID0gXCJcIjtcbiAgLy8gbGV0IGRpZmZlcmVuY2UgPSBkaWZmZXJlbmNlSW5EYXlzKFRPREFZLCBEVUVfREFURV9WQUxVRSk7XG4gIGNvbnNvbGUubG9nKERVRV9EQVRFX1ZBTFVFKTtcblxuICB0YXNrc19jb250YWluZXIuYXBwZW5kKFRBU0tfQ09OVEFJTkVSKTtcbn07XG5cbmNvbnN0IFJFTkRFUl9HUk9VUCA9IChldmVudCwgbmFtZSkgPT4ge1xuICBjb25zdCBHUk9VUF9OQU1FID0gbmFtZSB8fCBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1ncm91cC10ZXh0XCIpO1xuICBjb25zdCBUQVNLU19DT05UQUlORVIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gIGNvbnN0IEFERF9UQVNLX0lDT04gPSBSRU5ERVJfQUREX1RBU0tfQlVUVE9OKEdST1VQX05BTUUsIFRBU0tTX0NPTlRBSU5FUik7XG5cbiAgQVRUQUNIX0FERF9UQVNLX0xJU1RFTkVSKEFERF9UQVNLX0lDT04pO1xuXG4gIGNvbnN0IFRBU0tTID0gZ3JvdXBzW0dST1VQX05BTUVdLm1hcCgodGFzaykgPT4ge1xuICAgIFJFTkRFUl9UQVNLKHRhc2ssIFRBU0tTX0NPTlRBSU5FUik7XG4gICAgdGFzaztcbiAgfSk7XG5cbiAgVEFTS1NfQ09OVEFJTkVSLmNsYXNzTGlzdCA9IFwidGFza3NfY29udGFpbmVyXCI7XG4gIFRBU0tTX0NPTlRBSU5FUi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWdyb3VwLXRhc2tzXCIsIEdST1VQX05BTUUpO1xuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibWFpblwiKVswXS5hcHBlbmQoVEFTS1NfQ09OVEFJTkVSKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZWFkZXJcIikuaW5uZXJUZXh0ID0gR1JPVVBfTkFNRTtcbn07XG5cbmNvbnN0IFJFTU9WRV9DVVJSRU5UX0dST1VQID0gKCkgPT4ge1xuICBjb25zdCBUQVNLX0NPTlRBSU5FUiA9IFtcbiAgICAuLi5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidGFza3NfY29udGFpbmVyXCIpLFxuICBdO1xuICBpZiAoVEFTS19DT05UQUlORVIubGVuZ3RoICE9PSAwKSB7XG4gICAgVEFTS19DT05UQUlORVJbMF0ucmVtb3ZlKCk7XG4gIH1cbn07XG5cbmNvbnN0IFJFTkRFUl9BRERfVEFTS19CVVRUT04gPSAoZ3JvdXBfbmFtZSwgdGFza19jb250YWluZXIpID0+IHtcbiAgY29uc3QgQlVUVE9OID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgUExVU19JQ09OID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG5cbiAgQlVUVE9OLnNldEF0dHJpYnV0ZShcImRhdGEtYWRkLXRhc2tcIiwgZ3JvdXBfbmFtZSk7XG4gIEJVVFRPTi5jbGFzc0xpc3QgPSBcInRhc2sgYWRkX3Rhc2tfYnV0dG9uXCI7XG4gIFBMVVNfSUNPTi5jbGFzc0xpc3QgPSBcImZhcyBmYS1wbHVzIGFkZF90YXNrX2ljb25cIjtcblxuICB0YXNrX2NvbnRhaW5lci5hcHBlbmQoQlVUVE9OKTtcbiAgQlVUVE9OLmFwcGVuZChQTFVTX0lDT04pO1xuXG4gIHJldHVybiBCVVRUT047XG59O1xuXG5jb25zdCBSRU5ERVJfQUREX1RBU0tfRk9STSA9IChncm91cF9uYW1lKSA9PiB7XG4gIGNvbnN0IENVUlJSRU5UX0NPTlRBSU5FUiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza19mb3JtX2NvbnRhaW5lclwiKTtcblxuICBpZiAoQ1VSUlJFTlRfQ09OVEFJTkVSID09PSBudWxsKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkZXJcIilbMF0uc3R5bGUuZmlsdGVyID0gXCJibHVyKC40ZW0pXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJtYWluXCIpWzBdLnN0eWxlLmZpbHRlciA9IFwiYmx1ciguNGVtKVwiO1xuXG4gICAgY29uc3QgVEFTS19GT1JNX0NPTlRBSU5FUiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgVEFTS19GT1JNID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gICAgY29uc3QgTEFCRUxfSU5QVVQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgY29uc3QgUFJJT1JJVFlfSU5QVVQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xuICAgIGNvbnN0IERVRV9EQVRFX0lOUFVUID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGNvbnN0IE5PVEVTX0lOUFVUID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGNvbnN0IENBTkNFTF9BUFBMWV9DT05UQUlORVIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IENBTkNFTF9BRERfVEFTS19JQ09OID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gICAgY29uc3QgQVBQTFlfQUREX1RBU0tfSUNPTiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuICAgIGNvbnN0IElOUFVUUyA9IFtMQUJFTF9JTlBVVCwgUFJJT1JJVFlfSU5QVVQsIERVRV9EQVRFX0lOUFVULCBOT1RFU19JTlBVVF07XG4gICAgY29uc3QgSURTID0gW1xuICAgICAgXCJsYWJlbF9pbnB1dFwiLFxuICAgICAgXCJwcmlvcml0eV9pbnB1dFwiLFxuICAgICAgXCJkdWVfZGF0ZV9pbnB1dFwiLFxuICAgICAgXCJub3Rlc19pbnB1dFwiLFxuICAgIF07XG4gICAgY29uc3QgSU5ORVJURVhUID0gW1wiTGFiZWxcIiwgXCJQcmlvcml0eVwiLCBcIkR1ZSBkYXRlXCIsIFwiTm90ZXNcIl07XG4gICAgY29uc3QgUFJJT1JJVFlfT1BUSU9OUyA9IFtcImxvd1wiLCBcIm1lZGl1bVwiLCBcImhpZ2hcIl07XG5cbiAgICBUQVNLX0ZPUk1fQ09OVEFJTkVSLmlkID0gXCJ0YXNrX2Zvcm1fY29udGFpbmVyXCI7XG4gICAgVEFTS19GT1JNX0NPTlRBSU5FUi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWdyb3VwXCIsIGdyb3VwX25hbWUpO1xuICAgIFRBU0tfRk9STS5pZCA9IFwiYWRkX3Rhc2tfZm9ybVwiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICBJTlBVVFNbaV0uaWQgPSBJRFNbaV07XG4gICAgICBJTlBVVFNbaV0uc2V0QXR0cmlidXRlKFwibmFtZVwiLCBJRFNbaV0pO1xuICAgICAgSU5QVVRTW2ldLmNsYXNzTGlzdCA9IFwidGFza19pbnB1dFwiO1xuICAgICAgaWYgKGkgIT09IDEpIHtcbiAgICAgICAgSU5QVVRTW2ldLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGkgPT09IDIpIHtcbiAgICAgICAgSU5QVVRTW2ldLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJkYXRlXCIpO1xuICAgICAgfVxuICAgIH1cbiAgICBDQU5DRUxfQUREX1RBU0tfSUNPTi5jbGFzc0xpc3QgPSBcImZhciBmYS10aW1lcy1jaXJjbGVcIjtcbiAgICBDQU5DRUxfQUREX1RBU0tfSUNPTi5pZCA9IFwiY2FuY2VsX2FkZF90YXNrX2ljb25cIjtcbiAgICBBUFBMWV9BRERfVEFTS19JQ09OLmNsYXNzTGlzdCA9IFwiZmFyIGZhLWNoZWNrLWNpcmNsZVwiO1xuICAgIEFQUExZX0FERF9UQVNLX0lDT04uaWQgPSBcImFwcGx5X2FkZF90YXNrX2ljb25cIjtcbiAgICBDQU5DRUxfQVBQTFlfQ09OVEFJTkVSLmlkID0gXCJjYW5jZWxfYXBwbHlfY29udGFpbmVyXCI7XG5cbiAgICBBUFBMWV9BRERfVEFTSyhBUFBMWV9BRERfVEFTS19JQ09OKTtcbiAgICBDQU5DRUxfQUREX1RBU0soQ0FOQ0VMX0FERF9UQVNLX0lDT04pO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoVEFTS19GT1JNX0NPTlRBSU5FUik7XG4gICAgVEFTS19GT1JNX0NPTlRBSU5FUi5hcHBlbmQoVEFTS19GT1JNKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgY29uc3QgSU5QVVRfQ09OVEFJTkVSID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNvbnN0IExBQkVMID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuXG4gICAgICBJTlBVVF9DT05UQUlORVIuY2xhc3NMaXN0ID0gXCJ0YXNrX2lucHV0X2NvbnRhaW5lclwiO1xuICAgICAgTEFCRUwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIElEU1tpXSk7XG4gICAgICBMQUJFTC5jbGFzc0xpc3QgPSBcInRhc2tfaW5wdXRfbGFiZWxcIjtcbiAgICAgIExBQkVMLmlubmVyVGV4dCA9IElOTkVSVEVYVFtpXTtcblxuICAgICAgVEFTS19GT1JNLmFwcGVuZChJTlBVVF9DT05UQUlORVIpO1xuICAgICAgSU5QVVRfQ09OVEFJTkVSLmFwcGVuZChMQUJFTCk7XG4gICAgICBJTlBVVF9DT05UQUlORVIuYXBwZW5kKElOUFVUU1tpXSk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICBjb25zdCBPUFRJT04gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgT1BUSU9OLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFBSSU9SSVRZX09QVElPTlNbaV0pO1xuICAgICAgT1BUSU9OLmlubmVyVGV4dCA9IFBSSU9SSVRZX09QVElPTlNbaV07XG4gICAgICBQUklPUklUWV9JTlBVVC5hcHBlbmQoT1BUSU9OKTtcbiAgICB9XG4gICAgVEFTS19GT1JNLmFwcGVuZChDQU5DRUxfQVBQTFlfQ09OVEFJTkVSKTtcbiAgICBDQU5DRUxfQVBQTFlfQ09OVEFJTkVSLmFwcGVuZChDQU5DRUxfQUREX1RBU0tfSUNPTik7XG4gICAgQ0FOQ0VMX0FQUExZX0NPTlRBSU5FUi5hcHBlbmQoQVBQTFlfQUREX1RBU0tfSUNPTik7XG4gICAgTEFCRUxfSU5QVVQuZm9jdXMoKTtcbiAgfVxufTtcblxuY29uc3QgUkVNT1ZFX0FERF9UQVNLX0ZPUk0gPSAoKSA9PiB7XG4gIGNvbnN0IEFERF9UQVNLX0ZPUk0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tfZm9ybV9jb250YWluZXJcIik7XG4gIEFERF9UQVNLX0ZPUk0ucmVtb3ZlKCk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZGVyXCIpWzBdLnN0eWxlLmZpbHRlciA9IFwiXCI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibWFpblwiKVswXS5zdHlsZS5maWx0ZXIgPSBcIlwiO1xufTtcblxuZXhwb3J0IHtcbiAgSEVBREVSLFxuICBNRVRBX0RBVEEsXG4gIE5BVl9CQVIsXG4gIE1FTlVfQlVUVE9OLFxuICBSRU5ERVJfTkFWX0JBUl9HUk9VUFMsXG4gIEFERF9HUk9VUF9JTlBVVCxcbiAgUkVOREVSX1RBU0ssXG4gIFJFTU9WRV9DVVJSRU5UX0dST1VQLFxuICBSRU5ERVJfQUREX1RBU0tfQlVUVE9OLFxuICBSRU5ERVJfQUREX1RBU0tfRk9STSxcbiAgUkVNT1ZFX0FERF9UQVNLX0ZPUk0sXG4gIFJFTkRFUl9HUk9VUCxcbn07XG4iLCJpbXBvcnQge1xuICBBRERfR1JPVVBfSU5QVVRfSEFORExFUixcbiAgUkVNT1ZFX0NVUlJFTlRfR1JPVVAsXG4gIFJFTkRFUl9OQVZfQkFSX0dST1VQUyxcbiAgUkVOREVSX0dST1VQLFxuICBSRU5ERVJfVEFTSyxcbiAgUkVOREVSX0FERF9UQVNLX0JVVFRPTixcbiAgUkVOREVSX0FERF9UQVNLX0ZPUk0sXG4gIFJFTU9WRV9BRERfVEFTS19GT1JNLFxufSBmcm9tIFwiLi9kb20uanNcIjtcbmltcG9ydCB7IGdyb3VwcywgVGFzaywgU0VUX1NUT1JBR0UgfSBmcm9tIFwiLi4vYXBwLmpzXCI7XG5cbmNvbnN0IEVWRU5UX0xJU1RFTkVSUyA9ICgpID0+IHtcbiAgY29uc3QgSEFNQlVSR0VSX01FTlUgPSAoKCkgPT4ge1xuICAgIGNvbnN0IE1FTlVfQlVUVE9OID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoYW1idXJnZXJfbWVudV9idXR0b25cIik7XG5cbiAgICBNRU5VX0JVVFRPTi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgTkFWX01FTlUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdl9jb250YWluZXJcIik7XG4gICAgICBOQVZfTUVOVS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgTUVOVV9CVVRUT04uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH0pO1xuICB9KSgpO1xuXG4gIGNvbnN0IEFERF9HUk9VUF9CVVRUT04gPSAoKCkgPT4ge1xuICAgIGNvbnN0IEFERF9CVVRUT04gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9ncm91cFwiKTtcblxuICAgIEFERF9CVVRUT04uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IENVUlJSRU5UX0NPTlRBSU5FUiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza19mb3JtX2NvbnRhaW5lclwiKTtcblxuICAgICAgaWYgKENVUlJSRU5UX0NPTlRBSU5FUiA9PT0gbnVsbCkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9ncm91cFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX2dyb3VwX2Zvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9ncm91cF9pbnB1dFwiKS5mb2N1cygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KSgpO1xuXG4gIGNvbnN0IENBTkNFTF9ORVdfR1JPVVBfSUNPTiA9ICgoKSA9PiB7XG4gICAgY29uc3QgQ0FOQ0VMX0JVVFRPTiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FuY2VsX2dyb3VwX2ljb25cIik7XG5cbiAgICBDQU5DRUxfQlVUVE9OLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBDVVJSUkVOVF9DT05UQUlORVIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tfZm9ybV9jb250YWluZXJcIik7XG5cbiAgICAgIGlmIChDVVJSUkVOVF9DT05UQUlORVIgPT09IG51bGwpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRfZ3JvdXBcIikuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9ncm91cF9mb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkoKTtcblxuICBjb25zdCBTVUJNSVRfTkVXX0dST1VQX0lDT04gPSAoKCkgPT4ge1xuICAgIGNvbnN0IFNVQk1JVF9CVVRUT04gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Ym1pdF9ncm91cF9pY29uXCIpO1xuXG4gICAgU1VCTUlUX0JVVFRPTi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgQ1VSUlJFTlRfQ09OVEFJTkVSID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrX2Zvcm1fY29udGFpbmVyXCIpO1xuXG4gICAgICBpZiAoQ1VSUlJFTlRfQ09OVEFJTkVSID09PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IElOUFVUX1RFWFQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9ncm91cF9pbnB1dFwiKS52YWx1ZTtcbiAgICAgICAgY29uc3QgSU5QVVRfRklFTEQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9ncm91cF9pbnB1dFwiKTtcbiAgICAgICAgaWYgKElOUFVUX1RFWFQgPT09IFwiXCIpIHtcbiAgICAgICAgICBJTlBVVF9GSUVMRC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYigxODEsIDQwLCA0MClcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBncm91cHNbSU5QVVRfVEVYVF0gPSBbXTtcbiAgICAgICAgICBJTlBVVF9GSUVMRC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgUkVOREVSX05BVl9CQVJfR1JPVVBTKCk7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRfZ3JvdXBcIikuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX2dyb3VwX2Zvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgIFNFVF9TVE9SQUdFKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSkoKTtcblxuICBjb25zdCBHUk9VUF9JTlBVVF9WQUxJREFUSU9OID0gKCgpID0+IHtcbiAgICBjb25zdCBJTlBVVF9GSUVMRCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX2dyb3VwX2lucHV0XCIpO1xuXG4gICAgSU5QVVRfRklFTEQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IElOUFVUX1RFWFQgPSBJTlBVVF9GSUVMRC52YWx1ZTtcbiAgICAgIGNvbnN0IEdST1VQUyA9IE9iamVjdC5rZXlzKGdyb3Vwcyk7XG5cbiAgICAgIGlmIChHUk9VUFMuaW5jbHVkZXMoSU5QVVRfVEVYVCkpIHtcbiAgICAgICAgSU5QVVRfRklFTEQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2IoMTgxLCA0MCwgNDApXCI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0X2dyb3VwX2ljb25cIikuc3R5bGUudmlzaWJpbGl0eSA9XG4gICAgICAgICAgXCJoaWRkZW5cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIElOUFVUX0ZJRUxELnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRfZ3JvdXBfaWNvblwiKS5zdHlsZS52aXNpYmlsaXR5ID1cbiAgICAgICAgICBcInZpc2libGVcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkoKTtcbn07XG5cbmNvbnN0IEFUVEFDSF9ERUxFVEVfR1JPVVBfTElTVEVORVIgPSAoaW5wdXRfZWxlbWVudCkgPT4ge1xuICBpbnB1dF9lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IFRBUkdFVF9EQVRBX0dST1VQID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtZ3JvdXBcIik7XG4gICAgY29uc3QgR1JPVVBfQ09OVEFJTkVSID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGBbZGF0YS1ncm91cC1jb250YWluZXI9JHtUQVJHRVRfREFUQV9HUk9VUH1dYFxuICAgICk7XG4gICAgR1JPVVBfQ09OVEFJTkVSLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzliMjUyNWU2XCI7XG4gIH0pO1xuXG4gIGlucHV0X2VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgVEFSR0VUX0RBVEFfR1JPVVAgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1ncm91cFwiKTtcbiAgICBjb25zdCBHUk9VUF9DT05UQUlORVIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYFtkYXRhLWdyb3VwLWNvbnRhaW5lcj0ke1RBUkdFVF9EQVRBX0dST1VQfV1gXG4gICAgKTtcbiAgICBHUk9VUF9DT05UQUlORVIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjMjhiZGE3XCI7XG4gIH0pO1xuXG4gIGlucHV0X2VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IENVUlJSRU5UX0NPTlRBSU5FUiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza19mb3JtX2NvbnRhaW5lclwiKTtcblxuICAgIGlmIChDVVJSUkVOVF9DT05UQUlORVIgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IFRBUkdFVF9EQVRBX0dST1VQID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtZ3JvdXBcIik7XG4gICAgICBkZWxldGUgZ3JvdXBzW1RBUkdFVF9EQVRBX0dST1VQXTtcbiAgICAgIFJFTkRFUl9OQVZfQkFSX0dST1VQUygpO1xuICAgICAgU0VUX1NUT1JBR0UoKTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgQVRUQUNIX1JFTkRFUl9HUk9VUF9MSVNURU5FUiA9IChpbnB1dF9lbGVtZW50KSA9PiB7XG4gIGlucHV0X2VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IENVUlJSRU5UX0NPTlRBSU5FUiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza19mb3JtX2NvbnRhaW5lclwiKTtcblxuICAgIGlmIChDVVJSUkVOVF9DT05UQUlORVIgPT09IG51bGwpIHtcbiAgICAgIFJFTU9WRV9DVVJSRU5UX0dST1VQKCk7XG4gICAgICBSRU5ERVJfR1JPVVAoZXZlbnQpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCBBVFRBQ0hfQUREX1RBU0tfTElTVEVORVIgPSAoZWxlbWVudCkgPT4ge1xuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBHUk9VUF9OQU1FID0gZXZlbnQuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWFkZC10YXNrXCIpO1xuICAgIFJFTkRFUl9BRERfVEFTS19GT1JNKEdST1VQX05BTUUpO1xuICB9KTtcbn07XG5cbmNvbnN0IENBTkNFTF9BRERfVEFTSyA9IChjYW5jZWxfaWNvbikgPT4ge1xuICBjYW5jZWxfaWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIFJFTU9WRV9BRERfVEFTS19GT1JNKCk7XG4gIH0pO1xufTtcblxuY29uc3QgQVBQTFlfQUREX1RBU0sgPSAoYXBwbHlfaWNvbikgPT4ge1xuICBhcHBseV9pY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29uc3QgR1JPVVBfTkFNRSA9IGRvY3VtZW50XG4gICAgICAuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrX2Zvcm1fY29udGFpbmVyXCIpXG4gICAgICAuZ2V0QXR0cmlidXRlKFwiZGF0YS1ncm91cFwiKTtcbiAgICBjb25zdCBMQUJFTF9WQUxVRSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFiZWxfaW5wdXRcIikudmFsdWU7XG4gICAgY29uc3QgUFJJT1JJVFlfVkFMVUUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5X2lucHV0XCIpLnZhbHVlO1xuICAgIGNvbnN0IERVRV9EQVRFX1ZBTFVFID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWVfZGF0ZV9pbnB1dFwiKS52YWx1ZTtcbiAgICBjb25zdCBOT1RFU19WQUxVRSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm90ZXNfaW5wdXRcIikudmFsdWU7XG5cbiAgICAvLyBjb25zdCBZRUFSID0gRFVFX0RBVEVfVkFMVUUuc2xpY2UoMCwgNCk7XG4gICAgLy8gY29uc3QgTU9OVEggPSBEVUVfREFURV9WQUxVRS5zbGljZSg1LCA3KTtcbiAgICAvLyBjb25zdCBEQVkgPSBEVUVfREFURV9WQUxVRS5zbGljZSg4LCAxMCk7XG4gICAgLy8gbGV0IGR1ZTtcbiAgICAvLyBEVUVfREFURV9WQUxVRSA9PT0gXCJcIiA/IChkdWUgPSBcIlwiKSA6IChkdWUgPSBuZXcgRGF0ZShZRUFSLCBNT05USCwgREFZKSk7XG5cbiAgICBjb25zdCBORVdfVEFTSyA9IG5ldyBUYXNrKFxuICAgICAgTEFCRUxfVkFMVUUsXG4gICAgICBQUklPUklUWV9WQUxVRSxcbiAgICAgIERVRV9EQVRFX1ZBTFVFLFxuICAgICAgTk9URVNfVkFMVUVcbiAgICApO1xuXG4gICAgZ3JvdXBzW0dST1VQX05BTUVdLnB1c2goTkVXX1RBU0spO1xuXG4gICAgUkVNT1ZFX0FERF9UQVNLX0ZPUk0oKTtcbiAgICBSRU1PVkVfQ1VSUkVOVF9HUk9VUCgpO1xuICAgIFJFTkRFUl9HUk9VUChudWxsLCBHUk9VUF9OQU1FKTtcbiAgICBTRVRfU1RPUkFHRSgpO1xuICB9KTtcbn07XG5cbmV4cG9ydCB7XG4gIEVWRU5UX0xJU1RFTkVSUyxcbiAgQVRUQUNIX0RFTEVURV9HUk9VUF9MSVNURU5FUixcbiAgQVRUQUNIX1JFTkRFUl9HUk9VUF9MSVNURU5FUixcbiAgQ0FOQ0VMX0FERF9UQVNLLFxuICBBUFBMWV9BRERfVEFTSyxcbiAgQVRUQUNIX0FERF9UQVNLX0xJU1RFTkVSLFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBncm91cHMsIFRhc2sgfSBmcm9tIFwiLi4vYXBwLmpzXCI7XG5pbXBvcnQgeyBSRU5ERVJfTkFWX0JBUl9HUk9VUFMgfSBmcm9tIFwiLi4vZG9tL2RvbS5qc1wiO1xuXG5pZiAod2luZG93LmxvY2FsU3RvcmFnZS5sZW5ndGggPT09IDApIHtcbiAgY29uc3QgU0NIT09MID0gW1wibWF0aFwiLCBcInNjaWVuY2VcIiwgXCJoaXN0b3J5XCJdO1xuICBjb25zdCBHWU0gPSBbXCJjaGVzdFwiLCBcImJhY2tcIiwgXCJsZWdzXCJdO1xuICBjb25zdCBDT0RJTkcgPSBbXCJnaXRcIiwgXCJqYXZhc2NyaXB0XCIsIFwicHl0aG9uXCJdO1xuICBjb25zdCBHUk9DRVJJRVMgPSBbXCJhcHBsZXNcIiwgXCJiYW5hbmFzXCIsIFwibWlsa1wiXTtcbiAgY29uc3QgTU9WSUVTID0gW1wiZmlnaHQgY2x1YlwiLCBcInN0YXIgd2Fyc1wiLCBcImphd3NcIl07XG4gIGNvbnN0IENBTkRZID0gW1wiY2hvY29sYXRlXCIsIFwic25pY2tlcnNcIiwgXCJzb3VyIHBhdGNoIGtpZHNcIl07XG4gIGNvbnN0IERJU1RSTyA9IFtcInVidW50dVwiLCBcImRlYmlhblwiLCBcImFyY2hcIl07XG5cbiAgY29uc3QgREVGQVVMVF9JVEVSQVRPUiA9IChuYW1lLCB0YXNrcykgPT4ge1xuICAgIGdyb3Vwc1tuYW1lXSA9IFtdO1xuXG4gICAgLy8gPC1kdWUgZGF0ZS0+XG4gICAgY29uc3QgREFZU19EVUVfRlJPTV9UT0RBWSA9IFswLCA3LCAxNF07XG4gICAgY29uc3QgVE9EQVkgPSBuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IFlFQVIgPSBUT0RBWS5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IE1PTlRIID0gVE9EQVkuZ2V0TW9udGgoKTtcbiAgICBjb25zdCBEQVkgPSBUT0RBWS5nZXREYXRlKCk7XG5cbiAgICAvLyA8LXByaW9yaXRpZXMtPlxuICAgIGNvbnN0IFBSSU9SSVRZID0gW1wibG93XCIsIFwibWVkaXVtXCIsIFwiaGlnaFwiXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICBncm91cHNbbmFtZV0ucHVzaChcbiAgICAgICAgbmV3IFRhc2soXG4gICAgICAgICAgdGFza3NbaV0sXG4gICAgICAgICAgUFJJT1JJVFlbaV0sXG4gICAgICAgICAgbmV3IERhdGUoWUVBUiwgTU9OVEgsIERBWSArIERBWVNfRFVFX0ZST01fVE9EQVlbaV0pXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9O1xuICBERUZBVUxUX0lURVJBVE9SKFwic2Nob29sXCIsIFNDSE9PTCk7XG4gIERFRkFVTFRfSVRFUkFUT1IoXCJneW1cIiwgR1lNKTtcbiAgREVGQVVMVF9JVEVSQVRPUihcImNvZGluZ1wiLCBDT0RJTkcpO1xuICBERUZBVUxUX0lURVJBVE9SKFwiZ3JvY2VyaWVzXCIsIEdST0NFUklFUyk7XG4gIERFRkFVTFRfSVRFUkFUT1IoXCJtb3ZpZXNcIiwgTU9WSUVTKTtcbiAgREVGQVVMVF9JVEVSQVRPUihcImNhbmR5XCIsIENBTkRZKTtcbiAgREVGQVVMVF9JVEVSQVRPUihcImRpc3Ryb1wiLCBESVNUUk8pO1xuXG4gIFJFTkRFUl9OQVZfQkFSX0dST1VQUygpO1xuICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJncm91cHNcIiwgSlNPTi5zdHJpbmdpZnkoZ3JvdXBzKSk7XG5cbiAgY29uc29sZS5sb2coZ3JvdXBzKTtcbn0gZWxzZSB7XG4gIFJFTkRFUl9OQVZfQkFSX0dST1VQUygpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9