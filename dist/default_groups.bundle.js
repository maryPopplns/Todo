/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getTimezoneOffsetInMilliseconds)
/* harmony export */ });
/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/requiredArgs/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ requiredArgs)
/* harmony export */ });
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/differenceInCalendarDays/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/esm/differenceInCalendarDays/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ differenceInCalendarDays)
/* harmony export */ });
/* harmony import */ var _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/getTimezoneOffsetInMilliseconds/index.js */ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js");
/* harmony import */ var _startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../startOfDay/index.js */ "./node_modules/date-fns/esm/startOfDay/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



var MILLISECONDS_IN_DAY = 86400000;
/**
 * @name differenceInCalendarDays
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar days
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */

function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(2, arguments);
  var startOfDayLeft = (0,_startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDateLeft);
  var startOfDayRight = (0,_startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDateRight);
  var timestampLeft = startOfDayLeft.getTime() - (0,_lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(startOfDayLeft);
  var timestampRight = startOfDayRight.getTime() - (0,_lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(startOfDayRight); // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)

  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/differenceInDays/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/esm/differenceInDays/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ differenceInDays)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _differenceInCalendarDays_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../differenceInCalendarDays/index.js */ "./node_modules/date-fns/esm/differenceInCalendarDays/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


 // Like `compareAsc` but uses local time not UTC, which is needed
// for accurate equality comparisons of UTC timestamps that end up
// having the same representation in local time, e.g. one hour before
// DST ends vs. the instant that DST ends.

function compareLocalAsc(dateLeft, dateRight) {
  var diff = dateLeft.getFullYear() - dateRight.getFullYear() || dateLeft.getMonth() - dateRight.getMonth() || dateLeft.getDate() - dateRight.getDate() || dateLeft.getHours() - dateRight.getHours() || dateLeft.getMinutes() - dateRight.getMinutes() || dateLeft.getSeconds() - dateRight.getSeconds() || dateLeft.getMilliseconds() - dateRight.getMilliseconds();

  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1; // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}
/**
 * @name differenceInDays
 * @category Day Helpers
 * @summary Get the number of full days between the given dates.
 *
 * @description
 * Get the number of full day periods between two dates. Fractional days are
 * truncated towards zero.
 *
 * One "full day" is the distance between a local time in one day to the same
 * local time on the next or previous day. A full day can sometimes be less than
 * or more than 24 hours if a daylight savings change happens between two dates.
 *
 * To ignore DST and only measure exact 24-hour periods, use this instead:
 * `Math.floor(differenceInHours(dateLeft, dateRight)/24)|0`.
 *
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of full days according to the local timezone
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 365
 * // How many full days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 0
 * // How many full days are between
 * // 1 March 2020 0:00 and 1 June 2020 0:00 ?
 * // Note: because local time is used, the
 * // result will always be 92 days, even in
 * // time zones where DST starts and the
 * // period has only 92*24-1 hours.
 * const result = differenceInDays(
 *   new Date(2020, 5, 1),
 *   new Date(2020, 2, 1)
 * )
//=> 92
 */


function differenceInDays(dirtyDateLeft, dirtyDateRight) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(2, arguments);
  var dateLeft = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDateLeft);
  var dateRight = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDateRight);
  var sign = compareLocalAsc(dateLeft, dateRight);
  var difference = Math.abs((0,_differenceInCalendarDays_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(dateLeft, dateRight));
  dateLeft.setDate(dateLeft.getDate() - sign * difference); // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
  // If so, result must be decreased by 1 in absolute value

  var isLastDayNotFull = Number(compareLocalAsc(dateLeft, dateRight) === -sign);
  var result = sign * (difference - isLastDayNotFull); // Prevent negative zero

  return result === 0 ? 0 : result;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/startOfDay/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfDay/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfDay)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */

function startOfDay(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/toDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/toDate/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */

function toDate(argument) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

/***/ }),

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
/* harmony export */   "REMOVE_CURRENT_GROUP": () => (/* binding */ REMOVE_CURRENT_GROUP),
/* harmony export */   "RENDER_ADD_TASK_BUTTON": () => (/* binding */ RENDER_ADD_TASK_BUTTON),
/* harmony export */   "RENDER_ADD_TASK_FORM": () => (/* binding */ RENDER_ADD_TASK_FORM),
/* harmony export */   "REMOVE_ADD_TASK_FORM": () => (/* binding */ REMOVE_ADD_TASK_FORM),
/* harmony export */   "RENDER_GROUP": () => (/* binding */ RENDER_GROUP),
/* harmony export */   "RENDER_TASK": () => (/* binding */ RENDER_TASK)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/differenceInDays/index.js");
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
  const DUE_TODAY = document.createElement("li");
  const HIGH_PRIORITY = document.createElement("li");
  const GROUP_CONTAINER = document.createElement("div");
  const GROUP_HEADING = document.createElement("h2");
  const GROUP_LIST = document.createElement("ol");

  NAV_CONTAINER.id = "nav_container";
  DUE_CONTAINER.id = "due_container";
  DUE_TODAY.id = "due_today";
  HIGH_PRIORITY.id = "high_priority";
  GROUP_CONTAINER.id = "group_container";
  GROUP_HEADING.id = "group_heading";
  GROUP_LIST.id = "task_group_container";

  const TIME_PERIOD_VIEW = [DUE_TODAY, HIGH_PRIORITY].map(
    (element) => (element.classList = "important_tasks")
  );

  DUE_TODAY.innerText = "Due today";
  HIGH_PRIORITY.innerText = "High Priority";
  GROUP_HEADING.innerText = "Groups";

  document.body.append(MAIN);
  MAIN.append(NAV_CONTAINER);
  NAV_CONTAINER.append(DUE_CONTAINER);
  DUE_CONTAINER.append(DUE_TODAY);
  DUE_CONTAINER.append(HIGH_PRIORITY);
  NAV_CONTAINER.append(GROUP_CONTAINER);
  GROUP_CONTAINER.append(GROUP_HEADING);
  GROUP_CONTAINER.append(GROUP_LIST);

  (0,_event_listeners_js__WEBPACK_IMPORTED_MODULE_1__.ATTACH_DUE_TODAY_LISTENER)(DUE_TODAY);
  (0,_event_listeners_js__WEBPACK_IMPORTED_MODULE_1__.ATTACH_HIGH_PRIORITY_LISTENER)(HIGH_PRIORITY);

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
  // debugger;
  const LABEL_VALUE = task.label;
  const PRIORITY_VALUE = task.priority;
  const DUE_DATE_VALUE = task.due_date.slice(0, 10);
  const YEAR = DUE_DATE_VALUE.slice(0, 4);
  const MONTH = DUE_DATE_VALUE.slice(5, 7);
  const DAY = DUE_DATE_VALUE.slice(8, 10);
  const NOTES_VALUE = task.notes;
  const ID = task.id;

  let difference, due;

  DUE_DATE_VALUE === ""
    ? (difference = 0)
    : (difference = (0,date_fns__WEBPACK_IMPORTED_MODULE_2__.default)(
        new Date(YEAR, MONTH - 1, DAY),
        new Date()
      ));

  if (difference === 0) {
    due = "Today";
  } else if (difference === 1) {
    due = "Tomorrow";
  } else {
    due = `${difference} days`;
  }

  const TASK_CONTAINER = document.createElement("div");
  const LABEL = document.createElement("h2");
  const PRIORITY = document.createElement("div");
  const DUE_CONTAINER = document.createElement("div");
  const DUE_LABEL = document.createElement("div");
  const DUE_DATE = document.createElement("div");
  const NOTES_CONTAINER = document.createElement("div");
  const NOTES_LABEL = document.createElement("div");
  const NOTES = document.createElement("div");
  const DELETE_TASK_ICON = document.createElement("i");

  TASK_CONTAINER.classList = "task";
  TASK_CONTAINER.setAttribute("data-id", ID);
  LABEL.classList = "task_label";
  DUE_CONTAINER.classList = "due_container";
  NOTES_CONTAINER.classList = "notes_container";
  NOTES.classList = "note";
  DELETE_TASK_ICON.classList = "delete_task_icon fa fa-trash";
  DELETE_TASK_ICON.id = ID;
  if (NOTES_VALUE === "") {
    NOTES_CONTAINER.style.visibility = "hidden";
  }

  LABEL.innerText = LABEL_VALUE;
  DUE_LABEL.innerText = "Due:";
  DUE_DATE.innerText = due;
  NOTES_LABEL.innerText = "Notes:";
  NOTES.innerText = NOTES_VALUE;

  (0,_event_listeners_js__WEBPACK_IMPORTED_MODULE_1__.ATTACH_DELETE_TASK_LISTENER)(DELETE_TASK_ICON);

  tasks_container.append(TASK_CONTAINER);
  TASK_CONTAINER.append(LABEL);
  TASK_CONTAINER.append(DUE_CONTAINER);
  DUE_CONTAINER.append(DUE_LABEL);
  DUE_CONTAINER.append(DUE_DATE);
  TASK_CONTAINER.append(NOTES_CONTAINER);
  NOTES_CONTAINER.append(NOTES_LABEL);
  NOTES_CONTAINER.append(NOTES);
  TASK_CONTAINER.append(DELETE_TASK_ICON);
};

const RENDER_GROUP = (event, name) => {
  const GROUP_NAME = name || event.target.getAttribute("data-group-text");
  const TASKS_CONTAINER = document.createElement("div");

  const ADD_TASK_ICON = RENDER_ADD_TASK_BUTTON(GROUP_NAME, TASKS_CONTAINER);

  (0,_event_listeners_js__WEBPACK_IMPORTED_MODULE_1__.ATTACH_ADD_TASK_LISTENER)(ADD_TASK_ICON);

  const TASKS = _app_js__WEBPACK_IMPORTED_MODULE_0__.groups[GROUP_NAME].map((task) => {
    RENDER_TASK(task, TASKS_CONTAINER);
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
/* harmony export */   "ATTACH_ADD_TASK_LISTENER": () => (/* binding */ ATTACH_ADD_TASK_LISTENER),
/* harmony export */   "ATTACH_DELETE_TASK_LISTENER": () => (/* binding */ ATTACH_DELETE_TASK_LISTENER),
/* harmony export */   "ATTACH_DUE_TODAY_LISTENER": () => (/* binding */ ATTACH_DUE_TODAY_LISTENER),
/* harmony export */   "ATTACH_HIGH_PRIORITY_LISTENER": () => (/* binding */ ATTACH_HIGH_PRIORITY_LISTENER)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/dom/dom.js");
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.js */ "./src/app.js");
/* harmony import */ var _helpers_due_today_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/due_today.js */ "./src/helpers/due_today.js");
/* harmony import */ var _helpers_high_priority_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/high_priority.js */ "./src/helpers/high_priority.js");






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
        INPUT_FIELD.style.backgroundColor = "#984141";
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
    GROUP_CONTAINER.style.backgroundColor = "#984141";
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

    const YEAR = DUE_DATE_VALUE.slice(0, 4);
    const MONTH = DUE_DATE_VALUE.slice(5, 7);
    const DAY = DUE_DATE_VALUE.slice(8, 10);
    let due;
    DUE_DATE_VALUE === "" ? (due = "") : (due = `${YEAR}_${MONTH}_${DAY}`);

    const NEW_TASK = new _app_js__WEBPACK_IMPORTED_MODULE_1__.Task(LABEL_VALUE, PRIORITY_VALUE, due, NOTES_VALUE);

    _app_js__WEBPACK_IMPORTED_MODULE_1__.groups[GROUP_NAME].push(NEW_TASK);

    (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.REMOVE_ADD_TASK_FORM)();
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.REMOVE_CURRENT_GROUP)();
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.RENDER_GROUP)(null, GROUP_NAME);
    (0,_app_js__WEBPACK_IMPORTED_MODULE_1__.SET_STORAGE)();
  });
};

const ATTACH_DELETE_TASK_LISTENER = (icon) => {
  icon.addEventListener("click", (event) => {
    const TASK_ID = event.target.id;
    let group;
    for (let prop in _app_js__WEBPACK_IMPORTED_MODULE_1__.groups) {
      _app_js__WEBPACK_IMPORTED_MODULE_1__.groups[prop].map((task) => {
        if (task.id === TASK_ID) {
          group = prop;
        }
      });
      _app_js__WEBPACK_IMPORTED_MODULE_1__.groups[prop] = _app_js__WEBPACK_IMPORTED_MODULE_1__.groups[prop].filter((task) => task.id !== TASK_ID);
    }
    if (document.getElementById("header").innerText === "Due today") {
      (0,_helpers_due_today_js__WEBPACK_IMPORTED_MODULE_2__.DUE_TODAY_HANDLER)();
    } else if (
      document.getElementById("header").innerText === "High Priority"
    ) {
      (0,_helpers_high_priority_js__WEBPACK_IMPORTED_MODULE_3__.HIGH_PRIORITY_HANDLER)();
    } else {
      (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.REMOVE_CURRENT_GROUP)();
      (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.RENDER_GROUP)(null, group);
    }
    (0,_app_js__WEBPACK_IMPORTED_MODULE_1__.SET_STORAGE)();
  });
};

const ATTACH_DUE_TODAY_LISTENER = (due_today_element) => {
  due_today_element.addEventListener("click", _helpers_due_today_js__WEBPACK_IMPORTED_MODULE_2__.DUE_TODAY_HANDLER);
};

const ATTACH_HIGH_PRIORITY_LISTENER = (high_priority_element) => {
  high_priority_element.addEventListener("click", _helpers_high_priority_js__WEBPACK_IMPORTED_MODULE_3__.HIGH_PRIORITY_HANDLER);
};




/***/ }),

/***/ "./src/helpers/due_today.js":
/*!**********************************!*\
  !*** ./src/helpers/due_today.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DUE_TODAY_HANDLER": () => (/* binding */ DUE_TODAY_HANDLER)
/* harmony export */ });
/* harmony import */ var _dom_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/dom.js */ "./src/dom/dom.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/differenceInDays/index.js");
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.js */ "./src/app.js");




const DUE_TODAY_HANDLER = () => {
  document.getElementById("header").innerText = "Due today";
  (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_0__.REMOVE_CURRENT_GROUP)();
  let tasks = [];

  const TASKS_CONTAINER = document.createElement("div");
  TASKS_CONTAINER.classList = "tasks_container";

  document.getElementsByTagName("main")[0].append(TASKS_CONTAINER);

  for (let prop in _app_js__WEBPACK_IMPORTED_MODULE_1__.groups) {
    _app_js__WEBPACK_IMPORTED_MODULE_1__.groups[prop].map((task) => {
      const DUE_DATE = task.due_date;
      const YEAR = DUE_DATE.slice(0, 4);
      const MONTH = DUE_DATE.slice(5, 7);
      const DAY = DUE_DATE.slice(8, 10);

      const DIFFERENCE = (0,date_fns__WEBPACK_IMPORTED_MODULE_2__.default)(
        new Date(YEAR, MONTH - 1, DAY),
        new Date()
      );
      if (DIFFERENCE === 0) {
        tasks.push(task);
      }
    });
  }

  tasks.map((task) => {
    (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_0__.RENDER_TASK)(task, TASKS_CONTAINER);
  });
};




/***/ }),

/***/ "./src/helpers/high_priority.js":
/*!**************************************!*\
  !*** ./src/helpers/high_priority.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HIGH_PRIORITY_HANDLER": () => (/* binding */ HIGH_PRIORITY_HANDLER)
/* harmony export */ });
/* harmony import */ var _dom_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/dom.js */ "./src/dom/dom.js");
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.js */ "./src/app.js");



const HIGH_PRIORITY_HANDLER = () => {
  (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_0__.REMOVE_CURRENT_GROUP)();
  document.getElementById("header").innerText = "High Priority";

  const TASKS_CONTAINER = document.createElement("div");
  TASKS_CONTAINER.classList = "tasks_container";

  document.getElementsByTagName("main")[0].append(TASKS_CONTAINER);

  let tasks = [];
  for (let prop in _app_js__WEBPACK_IMPORTED_MODULE_1__.groups) {
    _app_js__WEBPACK_IMPORTED_MODULE_1__.groups[prop].map((task) => {
      if (task.priority === "high") {
        tasks.push(task);
      }
    });
  }
  tasks.map((task) => {
    (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_0__.RENDER_TASK)(task, TASKS_CONTAINER);
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
      if (i === 2) {
        _app_js__WEBPACK_IMPORTED_MODULE_0__.groups[name].push(
          new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task(
            tasks[i],
            PRIORITY[i],
            new Date(YEAR, MONTH, DAY + DAYS_DUE_FROM_TODAY[i]),
            "scroll to see the rest of the note"
          )
        );
      } else {
        _app_js__WEBPACK_IMPORTED_MODULE_0__.groups[name].push(
          new _app_js__WEBPACK_IMPORTED_MODULE_0__.Task(
            tasks[i],
            PRIORITY[i],
            new Date(YEAR, MONTH, DAY + DAYS_DUE_FROM_TODAY[i])
          )
        );
      }
    }
  };
  DEFAULT_ITERATOR("school", SCHOOL);
  DEFAULT_ITERATOR("gym", GYM);
  DEFAULT_ITERATOR("coding", CODING);
  DEFAULT_ITERATOR("groceries", GROCERIES);

  (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_1__.RENDER_NAV_BAR_GROUPS)();
  window.localStorage.setItem("groups", JSON.stringify(_app_js__WEBPACK_IMPORTED_MODULE_0__.groups));

  console.log(_app_js__WEBPACK_IMPORTED_MODULE_0__.groups);
} else {
  (0,_dom_dom_js__WEBPACK_IMPORTED_MODULE_1__.RENDER_NAV_BAR_GROUPS)();
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBRSxrRUFBcUI7QUFDdkIsdURBQXVELDJDQUFNOztBQUU3RCxjQUFjLDJDQUFNO0FBQ3BCLEVBQUU7QUFDRixFQUFFLGtFQUFxQjtBQUN2QiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9kaWZmZXJlbmNlSW5DYWxlbmRhckRheXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vZGlmZmVyZW5jZUluRGF5cy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9zdGFydE9mRGF5L2luZGV4LmpzIiwid2VicGFjazovL3RvZG8vLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL3RvRGF0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL3V1aWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ieXRlc1RvVXVpZC5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL3JuZy1icm93c2VyLmpzIiwid2VicGFjazovL3RvZG8vLi9ub2RlX21vZHVsZXMvdXVpZC92MS5qcyIsIndlYnBhY2s6Ly90b2RvLy4vbm9kZV9tb2R1bGVzL3V1aWQvdjQuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9kb20vZG9tLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvZG9tL2V2ZW50X2xpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2hlbHBlcnMvZHVlX3RvZGF5LmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvaGVscGVycy9oaWdoX3ByaW9yaXR5LmpzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaGVscGVycy9kZWZhdWx0X2dyb3Vwcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEdvb2dsZSBDaHJvbWUgYXMgb2YgNjcuMC4zMzk2Ljg3IGludHJvZHVjZWQgdGltZXpvbmVzIHdpdGggb2Zmc2V0IHRoYXQgaW5jbHVkZXMgc2Vjb25kcy5cbiAqIFRoZXkgdXN1YWxseSBhcHBlYXIgZm9yIGRhdGVzIHRoYXQgZGVub3RlIHRpbWUgYmVmb3JlIHRoZSB0aW1lem9uZXMgd2VyZSBpbnRyb2R1Y2VkXG4gKiAoZS5nLiBmb3IgJ0V1cm9wZS9QcmFndWUnIHRpbWV6b25lIHRoZSBvZmZzZXQgaXMgR01UKzAwOjU3OjQ0IGJlZm9yZSAxIE9jdG9iZXIgMTg5MVxuICogYW5kIEdNVCswMTowMDowMCBhZnRlciB0aGF0IGRhdGUpXG4gKlxuICogRGF0ZSNnZXRUaW1lem9uZU9mZnNldCByZXR1cm5zIHRoZSBvZmZzZXQgaW4gbWludXRlcyBhbmQgd291bGQgcmV0dXJuIDU3IGZvciB0aGUgZXhhbXBsZSBhYm92ZSxcbiAqIHdoaWNoIHdvdWxkIGxlYWQgdG8gaW5jb3JyZWN0IGNhbGN1bGF0aW9ucy5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHRpbWV6b25lIG9mZnNldCBpbiBtaWxsaXNlY29uZHMgdGhhdCB0YWtlcyBzZWNvbmRzIGluIGFjY291bnQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMoZGF0ZSkge1xuICB2YXIgdXRjRGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSwgZGF0ZS5nZXRIb3VycygpLCBkYXRlLmdldE1pbnV0ZXMoKSwgZGF0ZS5nZXRTZWNvbmRzKCksIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkpKTtcbiAgdXRjRGF0ZS5zZXRVVENGdWxsWWVhcihkYXRlLmdldEZ1bGxZZWFyKCkpO1xuICByZXR1cm4gZGF0ZS5nZXRUaW1lKCkgLSB1dGNEYXRlLmdldFRpbWUoKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1aXJlZEFyZ3MocmVxdWlyZWQsIGFyZ3MpIHtcbiAgaWYgKGFyZ3MubGVuZ3RoIDwgcmVxdWlyZWQpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHJlcXVpcmVkICsgJyBhcmd1bWVudCcgKyAocmVxdWlyZWQgPiAxID8gJ3MnIDogJycpICsgJyByZXF1aXJlZCwgYnV0IG9ubHkgJyArIGFyZ3MubGVuZ3RoICsgJyBwcmVzZW50Jyk7XG4gIH1cbn0iLCJpbXBvcnQgZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyBmcm9tIFwiLi4vX2xpYi9nZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzL2luZGV4LmpzXCI7XG5pbXBvcnQgc3RhcnRPZkRheSBmcm9tIFwiLi4vc3RhcnRPZkRheS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbnZhciBNSUxMSVNFQ09ORFNfSU5fREFZID0gODY0MDAwMDA7XG4vKipcbiAqIEBuYW1lIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5c1xuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBHZXQgdGhlIG51bWJlciBvZiBjYWxlbmRhciBkYXlzIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgZGF5cyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy4gVGhpcyBtZWFucyB0aGF0IHRoZSB0aW1lcyBhcmUgcmVtb3ZlZFxuICogZnJvbSB0aGUgZGF0ZXMgYW5kIHRoZW4gdGhlIGRpZmZlcmVuY2UgaW4gZGF5cyBpcyBjYWxjdWxhdGVkLlxuICpcbiAqICMjIyB2Mi4wLjAgYnJlYWtpbmcgY2hhbmdlczpcbiAqXG4gKiAtIFtDaGFuZ2VzIHRoYXQgYXJlIGNvbW1vbiBmb3IgdGhlIHdob2xlIGxpYnJhcnldKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VwZ3JhZGVHdWlkZS5tZCNDb21tb24tQ2hhbmdlcykuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgbGF0ZXIgZGF0ZVxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIGVhcmxpZXIgZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBjYWxlbmRhciBkYXlzXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDIgYXJndW1lbnRzIHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IGNhbGVuZGFyIGRheXMgYXJlIGJldHdlZW5cbiAqIC8vIDIgSnVseSAyMDExIDIzOjAwOjAwIGFuZCAyIEp1bHkgMjAxMiAwMDowMDowMD9cbiAqIGNvbnN0IHJlc3VsdCA9IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhcbiAqICAgbmV3IERhdGUoMjAxMiwgNiwgMiwgMCwgMCksXG4gKiAgIG5ldyBEYXRlKDIwMTEsIDYsIDIsIDIzLCAwKVxuICogKVxuICogLy89PiAzNjZcbiAqIC8vIEhvdyBtYW55IGNhbGVuZGFyIGRheXMgYXJlIGJldHdlZW5cbiAqIC8vIDIgSnVseSAyMDExIDIzOjU5OjAwIGFuZCAzIEp1bHkgMjAxMSAwMDowMTowMD9cbiAqIGNvbnN0IHJlc3VsdCA9IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhcbiAqICAgbmV3IERhdGUoMjAxMSwgNiwgMywgMCwgMSksXG4gKiAgIG5ldyBEYXRlKDIwMTEsIDYsIDIsIDIzLCA1OSlcbiAqIClcbiAqIC8vPT4gMVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICByZXF1aXJlZEFyZ3MoMiwgYXJndW1lbnRzKTtcbiAgdmFyIHN0YXJ0T2ZEYXlMZWZ0ID0gc3RhcnRPZkRheShkaXJ0eURhdGVMZWZ0KTtcbiAgdmFyIHN0YXJ0T2ZEYXlSaWdodCA9IHN0YXJ0T2ZEYXkoZGlydHlEYXRlUmlnaHQpO1xuICB2YXIgdGltZXN0YW1wTGVmdCA9IHN0YXJ0T2ZEYXlMZWZ0LmdldFRpbWUoKSAtIGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMoc3RhcnRPZkRheUxlZnQpO1xuICB2YXIgdGltZXN0YW1wUmlnaHQgPSBzdGFydE9mRGF5UmlnaHQuZ2V0VGltZSgpIC0gZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyhzdGFydE9mRGF5UmlnaHQpOyAvLyBSb3VuZCB0aGUgbnVtYmVyIG9mIGRheXMgdG8gdGhlIG5lYXJlc3QgaW50ZWdlclxuICAvLyBiZWNhdXNlIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGluIGEgZGF5IGlzIG5vdCBjb25zdGFudFxuICAvLyAoZS5nLiBpdCdzIGRpZmZlcmVudCBpbiB0aGUgZGF5IG9mIHRoZSBkYXlsaWdodCBzYXZpbmcgdGltZSBjbG9jayBzaGlmdClcblxuICByZXR1cm4gTWF0aC5yb3VuZCgodGltZXN0YW1wTGVmdCAtIHRpbWVzdGFtcFJpZ2h0KSAvIE1JTExJU0VDT05EU19JTl9EQVkpO1xufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyBmcm9tIFwiLi4vZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiOyAvLyBMaWtlIGBjb21wYXJlQXNjYCBidXQgdXNlcyBsb2NhbCB0aW1lIG5vdCBVVEMsIHdoaWNoIGlzIG5lZWRlZFxuLy8gZm9yIGFjY3VyYXRlIGVxdWFsaXR5IGNvbXBhcmlzb25zIG9mIFVUQyB0aW1lc3RhbXBzIHRoYXQgZW5kIHVwXG4vLyBoYXZpbmcgdGhlIHNhbWUgcmVwcmVzZW50YXRpb24gaW4gbG9jYWwgdGltZSwgZS5nLiBvbmUgaG91ciBiZWZvcmVcbi8vIERTVCBlbmRzIHZzLiB0aGUgaW5zdGFudCB0aGF0IERTVCBlbmRzLlxuXG5mdW5jdGlvbiBjb21wYXJlTG9jYWxBc2MoZGF0ZUxlZnQsIGRhdGVSaWdodCkge1xuICB2YXIgZGlmZiA9IGRhdGVMZWZ0LmdldEZ1bGxZZWFyKCkgLSBkYXRlUmlnaHQuZ2V0RnVsbFllYXIoKSB8fCBkYXRlTGVmdC5nZXRNb250aCgpIC0gZGF0ZVJpZ2h0LmdldE1vbnRoKCkgfHwgZGF0ZUxlZnQuZ2V0RGF0ZSgpIC0gZGF0ZVJpZ2h0LmdldERhdGUoKSB8fCBkYXRlTGVmdC5nZXRIb3VycygpIC0gZGF0ZVJpZ2h0LmdldEhvdXJzKCkgfHwgZGF0ZUxlZnQuZ2V0TWludXRlcygpIC0gZGF0ZVJpZ2h0LmdldE1pbnV0ZXMoKSB8fCBkYXRlTGVmdC5nZXRTZWNvbmRzKCkgLSBkYXRlUmlnaHQuZ2V0U2Vjb25kcygpIHx8IGRhdGVMZWZ0LmdldE1pbGxpc2Vjb25kcygpIC0gZGF0ZVJpZ2h0LmdldE1pbGxpc2Vjb25kcygpO1xuXG4gIGlmIChkaWZmIDwgMCkge1xuICAgIHJldHVybiAtMTtcbiAgfSBlbHNlIGlmIChkaWZmID4gMCkge1xuICAgIHJldHVybiAxOyAvLyBSZXR1cm4gMCBpZiBkaWZmIGlzIDA7IHJldHVybiBOYU4gaWYgZGlmZiBpcyBOYU5cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZGlmZjtcbiAgfVxufVxuLyoqXG4gKiBAbmFtZSBkaWZmZXJlbmNlSW5EYXlzXG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEdldCB0aGUgbnVtYmVyIG9mIGZ1bGwgZGF5cyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEdldCB0aGUgbnVtYmVyIG9mIGZ1bGwgZGF5IHBlcmlvZHMgYmV0d2VlbiB0d28gZGF0ZXMuIEZyYWN0aW9uYWwgZGF5cyBhcmVcbiAqIHRydW5jYXRlZCB0b3dhcmRzIHplcm8uXG4gKlxuICogT25lIFwiZnVsbCBkYXlcIiBpcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiBhIGxvY2FsIHRpbWUgaW4gb25lIGRheSB0byB0aGUgc2FtZVxuICogbG9jYWwgdGltZSBvbiB0aGUgbmV4dCBvciBwcmV2aW91cyBkYXkuIEEgZnVsbCBkYXkgY2FuIHNvbWV0aW1lcyBiZSBsZXNzIHRoYW5cbiAqIG9yIG1vcmUgdGhhbiAyNCBob3VycyBpZiBhIGRheWxpZ2h0IHNhdmluZ3MgY2hhbmdlIGhhcHBlbnMgYmV0d2VlbiB0d28gZGF0ZXMuXG4gKlxuICogVG8gaWdub3JlIERTVCBhbmQgb25seSBtZWFzdXJlIGV4YWN0IDI0LWhvdXIgcGVyaW9kcywgdXNlIHRoaXMgaW5zdGVhZDpcbiAqIGBNYXRoLmZsb29yKGRpZmZlcmVuY2VJbkhvdXJzKGRhdGVMZWZ0LCBkYXRlUmlnaHQpLzI0KXwwYC5cbiAqXG4gKlxuICogIyMjIHYyLjAuMCBicmVha2luZyBjaGFuZ2VzOlxuICpcbiAqIC0gW0NoYW5nZXMgdGhhdCBhcmUgY29tbW9uIGZvciB0aGUgd2hvbGUgbGlicmFyeV0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdXBncmFkZUd1aWRlLm1kI0NvbW1vbi1DaGFuZ2VzKS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBsYXRlciBkYXRlXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgZWFybGllciBkYXRlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgbnVtYmVyIG9mIGZ1bGwgZGF5cyBhY2NvcmRpbmcgdG8gdGhlIGxvY2FsIHRpbWV6b25lXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDIgYXJndW1lbnRzIHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEhvdyBtYW55IGZ1bGwgZGF5cyBhcmUgYmV0d2VlblxuICogLy8gMiBKdWx5IDIwMTEgMjM6MDA6MDAgYW5kIDIgSnVseSAyMDEyIDAwOjAwOjAwP1xuICogY29uc3QgcmVzdWx0ID0gZGlmZmVyZW5jZUluRGF5cyhcbiAqICAgbmV3IERhdGUoMjAxMiwgNiwgMiwgMCwgMCksXG4gKiAgIG5ldyBEYXRlKDIwMTEsIDYsIDIsIDIzLCAwKVxuICogKVxuICogLy89PiAzNjVcbiAqIC8vIEhvdyBtYW55IGZ1bGwgZGF5cyBhcmUgYmV0d2VlblxuICogLy8gMiBKdWx5IDIwMTEgMjM6NTk6MDAgYW5kIDMgSnVseSAyMDExIDAwOjAxOjAwP1xuICogY29uc3QgcmVzdWx0ID0gZGlmZmVyZW5jZUluRGF5cyhcbiAqICAgbmV3IERhdGUoMjAxMSwgNiwgMywgMCwgMSksXG4gKiAgIG5ldyBEYXRlKDIwMTEsIDYsIDIsIDIzLCA1OSlcbiAqIClcbiAqIC8vPT4gMFxuICogLy8gSG93IG1hbnkgZnVsbCBkYXlzIGFyZSBiZXR3ZWVuXG4gKiAvLyAxIE1hcmNoIDIwMjAgMDowMCBhbmQgMSBKdW5lIDIwMjAgMDowMCA/XG4gKiAvLyBOb3RlOiBiZWNhdXNlIGxvY2FsIHRpbWUgaXMgdXNlZCwgdGhlXG4gKiAvLyByZXN1bHQgd2lsbCBhbHdheXMgYmUgOTIgZGF5cywgZXZlbiBpblxuICogLy8gdGltZSB6b25lcyB3aGVyZSBEU1Qgc3RhcnRzIGFuZCB0aGVcbiAqIC8vIHBlcmlvZCBoYXMgb25seSA5MioyNC0xIGhvdXJzLlxuICogY29uc3QgcmVzdWx0ID0gZGlmZmVyZW5jZUluRGF5cyhcbiAqICAgbmV3IERhdGUoMjAyMCwgNSwgMSksXG4gKiAgIG5ldyBEYXRlKDIwMjAsIDIsIDEpXG4gKiApXG4vLz0+IDkyXG4gKi9cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaWZmZXJlbmNlSW5EYXlzKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHJlcXVpcmVkQXJncygyLCBhcmd1bWVudHMpO1xuICB2YXIgZGF0ZUxlZnQgPSB0b0RhdGUoZGlydHlEYXRlTGVmdCk7XG4gIHZhciBkYXRlUmlnaHQgPSB0b0RhdGUoZGlydHlEYXRlUmlnaHQpO1xuICB2YXIgc2lnbiA9IGNvbXBhcmVMb2NhbEFzYyhkYXRlTGVmdCwgZGF0ZVJpZ2h0KTtcbiAgdmFyIGRpZmZlcmVuY2UgPSBNYXRoLmFicyhkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF0ZUxlZnQsIGRhdGVSaWdodCkpO1xuICBkYXRlTGVmdC5zZXREYXRlKGRhdGVMZWZ0LmdldERhdGUoKSAtIHNpZ24gKiBkaWZmZXJlbmNlKTsgLy8gTWF0aC5hYnMoZGlmZiBpbiBmdWxsIGRheXMgLSBkaWZmIGluIGNhbGVuZGFyIGRheXMpID09PSAxIGlmIGxhc3QgY2FsZW5kYXIgZGF5IGlzIG5vdCBmdWxsXG4gIC8vIElmIHNvLCByZXN1bHQgbXVzdCBiZSBkZWNyZWFzZWQgYnkgMSBpbiBhYnNvbHV0ZSB2YWx1ZVxuXG4gIHZhciBpc0xhc3REYXlOb3RGdWxsID0gTnVtYmVyKGNvbXBhcmVMb2NhbEFzYyhkYXRlTGVmdCwgZGF0ZVJpZ2h0KSA9PT0gLXNpZ24pO1xuICB2YXIgcmVzdWx0ID0gc2lnbiAqIChkaWZmZXJlbmNlIC0gaXNMYXN0RGF5Tm90RnVsbCk7IC8vIFByZXZlbnQgbmVnYXRpdmUgemVyb1xuXG4gIHJldHVybiByZXN1bHQgPT09IDAgPyAwIDogcmVzdWx0O1xufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgc3RhcnRPZkRheVxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgZGF5IGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSBkYXkgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiAjIyMgdjIuMC4wIGJyZWFraW5nIGNoYW5nZXM6XG4gKlxuICogLSBbQ2hhbmdlcyB0aGF0IGFyZSBjb21tb24gZm9yIHRoZSB3aG9sZSBsaWJyYXJ5XShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91cGdyYWRlR3VpZGUubWQjQ29tbW9uLUNoYW5nZXMpLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGUgLSB0aGUgb3JpZ2luYWwgZGF0ZVxuICogQHJldHVybnMge0RhdGV9IHRoZSBzdGFydCBvZiBhIGRheVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIGRheSBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gVHVlIFNlcCAwMiAyMDE0IDAwOjAwOjAwXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RhcnRPZkRheShkaXJ0eURhdGUpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBkYXRlO1xufSIsImltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIHRvRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgaXRzIGNsb25lLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhIG51bWJlciwgaXQgaXMgdHJlYXRlZCBhcyBhIHRpbWVzdGFtcC5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgbm9uZSBvZiB0aGUgYWJvdmUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIEludmFsaWQgRGF0ZS5cbiAqXG4gKiAqKk5vdGUqKjogKmFsbCogRGF0ZSBhcmd1bWVudHMgcGFzc2VkIHRvIGFueSAqZGF0ZS1mbnMqIGZ1bmN0aW9uIGlzIHByb2Nlc3NlZCBieSBgdG9EYXRlYC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBhcmd1bWVudCAtIHRoZSB2YWx1ZSB0byBjb252ZXJ0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHBhcnNlZCBkYXRlIGluIHRoZSBsb2NhbCB0aW1lIHpvbmVcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDbG9uZSB0aGUgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZShuZXcgRGF0ZSgyMDE0LCAxLCAxMSwgMTEsIDMwLCAzMCkpXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHRoZSB0aW1lc3RhbXAgdG8gZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZSgxMzkyMDk4NDMwMDAwKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b0RhdGUoYXJndW1lbnQpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBhcmdTdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnQpOyAvLyBDbG9uZSB0aGUgZGF0ZVxuXG4gIGlmIChhcmd1bWVudCBpbnN0YW5jZW9mIERhdGUgfHwgdHlwZW9mIGFyZ3VtZW50ID09PSAnb2JqZWN0JyAmJiBhcmdTdHIgPT09ICdbb2JqZWN0IERhdGVdJykge1xuICAgIC8vIFByZXZlbnQgdGhlIGRhdGUgdG8gbG9zZSB0aGUgbWlsbGlzZWNvbmRzIHdoZW4gcGFzc2VkIHRvIG5ldyBEYXRlKCkgaW4gSUUxMFxuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudC5nZXRUaW1lKCkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudCA9PT0gJ251bWJlcicgfHwgYXJnU3RyID09PSAnW29iamVjdCBOdW1iZXJdJykge1xuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCh0eXBlb2YgYXJndW1lbnQgPT09ICdzdHJpbmcnIHx8IGFyZ1N0ciA9PT0gJ1tvYmplY3QgU3RyaW5nXScpICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcIlN0YXJ0aW5nIHdpdGggdjIuMC4wLWJldGEuMSBkYXRlLWZucyBkb2Vzbid0IGFjY2VwdCBzdHJpbmdzIGFzIGRhdGUgYXJndW1lbnRzLiBQbGVhc2UgdXNlIGBwYXJzZUlTT2AgdG8gcGFyc2Ugc3RyaW5ncy4gU2VlOiBodHRwczovL2dpdC5pby9manVsZVwiKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcblxuICAgICAgY29uc29sZS53YXJuKG5ldyBFcnJvcigpLnN0YWNrKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgfVxufSIsInZhciB2MSA9IHJlcXVpcmUoJy4vdjEnKTtcbnZhciB2NCA9IHJlcXVpcmUoJy4vdjQnKTtcblxudmFyIHV1aWQgPSB2NDtcbnV1aWQudjEgPSB2MTtcbnV1aWQudjQgPSB2NDtcblxubW9kdWxlLmV4cG9ydHMgPSB1dWlkO1xuIiwiLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG52YXIgYnl0ZVRvSGV4ID0gW107XG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG59XG5cbmZ1bmN0aW9uIGJ5dGVzVG9VdWlkKGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gb2Zmc2V0IHx8IDA7XG4gIHZhciBidGggPSBieXRlVG9IZXg7XG4gIC8vIGpvaW4gdXNlZCB0byBmaXggbWVtb3J5IGlzc3VlIGNhdXNlZCBieSBjb25jYXRlbmF0aW9uOiBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMTc1I2M0XG4gIHJldHVybiAoW1xuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dXG4gIF0pLmpvaW4oJycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ5dGVzVG9VdWlkO1xuIiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gIEluIHRoZVxuLy8gYnJvd3NlciB0aGlzIGlzIGEgbGl0dGxlIGNvbXBsaWNhdGVkIGR1ZSB0byB1bmtub3duIHF1YWxpdHkgb2YgTWF0aC5yYW5kb20oKVxuLy8gYW5kIGluY29uc2lzdGVudCBzdXBwb3J0IGZvciB0aGUgYGNyeXB0b2AgQVBJLiAgV2UgZG8gdGhlIGJlc3Qgd2UgY2FuIHZpYVxuLy8gZmVhdHVyZS1kZXRlY3Rpb25cblxuLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvXG4vLyBpbXBsZW1lbnRhdGlvbi4gQWxzbywgZmluZCB0aGUgY29tcGxldGUgaW1wbGVtZW50YXRpb24gb2YgY3J5cHRvIG9uIElFMTEuXG52YXIgZ2V0UmFuZG9tVmFsdWVzID0gKHR5cGVvZihjcnlwdG8pICE9ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0bykpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZihtc0NyeXB0bykgIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5tc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT0gJ2Z1bmN0aW9uJyAmJiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChtc0NyeXB0bykpO1xuXG5pZiAoZ2V0UmFuZG9tVmFsdWVzKSB7XG4gIC8vIFdIQVRXRyBjcnlwdG8gUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xuICB2YXIgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdoYXR3Z1JORygpIHtcbiAgICBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xuICAgIHJldHVybiBybmRzODtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIE1hdGgucmFuZG9tKCktYmFzZWQgKFJORylcbiAgLy9cbiAgLy8gSWYgYWxsIGVsc2UgZmFpbHMsIHVzZSBNYXRoLnJhbmRvbSgpLiAgSXQncyBmYXN0LCBidXQgaXMgb2YgdW5zcGVjaWZpZWRcbiAgLy8gcXVhbGl0eS5cbiAgdmFyIHJuZHMgPSBuZXcgQXJyYXkoMTYpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWF0aFJORygpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IDE2OyBpKyspIHtcbiAgICAgIGlmICgoaSAmIDB4MDMpID09PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcbiAgICB9XG5cbiAgICByZXR1cm4gcm5kcztcbiAgfTtcbn1cbiIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7XG5cbi8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxudmFyIF9ub2RlSWQ7XG52YXIgX2Nsb2Nrc2VxO1xuXG4vLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbnZhciBfbGFzdE1TZWNzID0gMDtcbnZhciBfbGFzdE5TZWNzID0gMDtcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCBmb3IgQVBJIGRldGFpbHNcbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICB2YXIgYiA9IGJ1ZiB8fCBbXTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIG5vZGUgPSBvcHRpb25zLm5vZGUgfHwgX25vZGVJZDtcbiAgdmFyIGNsb2Nrc2VxID0gb3B0aW9ucy5jbG9ja3NlcSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jbG9ja3NlcSA6IF9jbG9ja3NlcTtcblxuICAvLyBub2RlIGFuZCBjbG9ja3NlcSBuZWVkIHRvIGJlIGluaXRpYWxpemVkIHRvIHJhbmRvbSB2YWx1ZXMgaWYgdGhleSdyZSBub3RcbiAgLy8gc3BlY2lmaWVkLiAgV2UgZG8gdGhpcyBsYXppbHkgdG8gbWluaW1pemUgaXNzdWVzIHJlbGF0ZWQgdG8gaW5zdWZmaWNpZW50XG4gIC8vIHN5c3RlbSBlbnRyb3B5LiAgU2VlICMxODlcbiAgaWYgKG5vZGUgPT0gbnVsbCB8fCBjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgdmFyIHNlZWRCeXRlcyA9IHJuZygpO1xuICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjUsIGNyZWF0ZSBhbmQgNDgtYml0IG5vZGUgaWQsICg0NyByYW5kb20gYml0cyArIG11bHRpY2FzdCBiaXQgPSAxKVxuICAgICAgbm9kZSA9IF9ub2RlSWQgPSBbXG4gICAgICAgIHNlZWRCeXRlc1swXSB8IDB4MDEsXG4gICAgICAgIHNlZWRCeXRlc1sxXSwgc2VlZEJ5dGVzWzJdLCBzZWVkQnl0ZXNbM10sIHNlZWRCeXRlc1s0XSwgc2VlZEJ5dGVzWzVdXG4gICAgICBdO1xuICAgIH1cbiAgICBpZiAoY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuMi4yLCByYW5kb21pemUgKDE0IGJpdCkgY2xvY2tzZXFcbiAgICAgIGNsb2Nrc2VxID0gX2Nsb2Nrc2VxID0gKHNlZWRCeXRlc1s2XSA8PCA4IHwgc2VlZEJ5dGVzWzddKSAmIDB4M2ZmZjtcbiAgICB9XG4gIH1cblxuICAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzb1xuICAvLyB0aW1lIGlzIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cbiAgdmFyIG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tc2VjcyA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gIC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcbiAgdmFyIG5zZWNzID0gb3B0aW9ucy5uc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxO1xuXG4gIC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcbiAgdmFyIGR0ID0gKG1zZWNzIC0gX2xhc3RNU2VjcykgKyAobnNlY3MgLSBfbGFzdE5TZWNzKS8xMDAwMDtcblxuICAvLyBQZXIgNC4yLjEuMiwgQnVtcCBjbG9ja3NlcSBvbiBjbG9jayByZWdyZXNzaW9uXG4gIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gIH1cblxuICAvLyBSZXNldCBuc2VjcyBpZiBjbG9jayByZWdyZXNzZXMgKG5ldyBjbG9ja3NlcSkgb3Igd2UndmUgbW92ZWQgb250byBhIG5ld1xuICAvLyB0aW1lIGludGVydmFsXG4gIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbnNlY3MgPSAwO1xuICB9XG5cbiAgLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuICBpZiAobnNlY3MgPj0gMTAwMDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3V1aWQudjEoKTogQ2FuXFwndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWMnKTtcbiAgfVxuXG4gIF9sYXN0TVNlY3MgPSBtc2VjcztcbiAgX2xhc3ROU2VjcyA9IG5zZWNzO1xuICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcblxuICAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcbiAgbXNlY3MgKz0gMTIyMTkyOTI4MDAwMDA7XG5cbiAgLy8gYHRpbWVfbG93YFxuICB2YXIgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdGwgJiAweGZmO1xuXG4gIC8vIGB0aW1lX21pZGBcbiAgdmFyIHRtaCA9IChtc2VjcyAvIDB4MTAwMDAwMDAwICogMTAwMDApICYgMHhmZmZmZmZmO1xuICBiW2krK10gPSB0bWggPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bWggJiAweGZmO1xuXG4gIC8vIGB0aW1lX2hpZ2hfYW5kX3ZlcnNpb25gXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMjQgJiAweGYgfCAweDEwOyAvLyBpbmNsdWRlIHZlcnNpb25cbiAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7XG5cbiAgLy8gYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgIChQZXIgNC4yLjIgLSBpbmNsdWRlIHZhcmlhbnQpXG4gIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDtcblxuICAvLyBgY2xvY2tfc2VxX2xvd2BcbiAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmO1xuXG4gIC8vIGBub2RlYFxuICBmb3IgKHZhciBuID0gMDsgbiA8IDY7ICsrbikge1xuICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgfVxuXG4gIHJldHVybiBidWYgPyBidWYgOiBieXRlc1RvVXVpZChiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2MTtcbiIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gIGlmICh0eXBlb2Yob3B0aW9ucykgPT0gJ3N0cmluZycpIHtcbiAgICBidWYgPSBvcHRpb25zID09PSAnYmluYXJ5JyA/IG5ldyBBcnJheSgxNikgOiBudWxsO1xuICAgIG9wdGlvbnMgPSBudWxsO1xuICB9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTtcblxuICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG4gIHJuZHNbNl0gPSAocm5kc1s2XSAmIDB4MGYpIHwgMHg0MDtcbiAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xuXG4gIC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuICBpZiAoYnVmKSB7XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IDE2OyArK2lpKSB7XG4gICAgICBidWZbaSArIGlpXSA9IHJuZHNbaWldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYgfHwgYnl0ZXNUb1V1aWQocm5kcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjQ7XG4iLCJpbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSBcInV1aWRcIjtcblxubGV0IGdyb3VwcyA9IHt9O1xuXG5pZiAod2luZG93LmxvY2FsU3RvcmFnZS5sZW5ndGggIT09IDApIHtcbiAgY29uc3QgTE9DQUxfU1RPUkFHRV9HUk9VUFMgPSBKU09OLnBhcnNlKFxuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImdyb3Vwc1wiKVxuICApO1xuICBncm91cHMgPSBMT0NBTF9TVE9SQUdFX0dST1VQUztcbn1cblxuLy8gd2luZG93LmxvY2FsU3RvcmFnZS5jbGVhcigpO1xuXG5jb25zdCBTRVRfU1RPUkFHRSA9ICgpID0+IHtcbiAgd2luZG93LmxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJncm91cHNcIiwgSlNPTi5zdHJpbmdpZnkoZ3JvdXBzKSk7XG59O1xuXG5jb25zdCBUYXNrID0gY2xhc3Mge1xuICBjb25zdHJ1Y3RvcihsYWJlbCA9IFwiXCIsIHByaW9yaXR5ID0gXCJsb3dcIiwgZHVlX2RhdGUgPSBcIlwiLCBub3RlcyA9IFwiXCIpIHtcbiAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMuZHVlX2RhdGUgPSBkdWVfZGF0ZTtcbiAgICB0aGlzLm5vdGVzID0gbm90ZXM7XG4gICAgdGhpcy5pZCA9IHV1aWQoKTtcbiAgfVxufTtcblxuZXhwb3J0IHsgZ3JvdXBzLCBTRVRfU1RPUkFHRSwgVGFzayB9O1xuIiwiaW1wb3J0IHsgZGlmZmVyZW5jZUluRGF5cyB9IGZyb20gXCJkYXRlLWZuc1wiO1xuaW1wb3J0IHsgZ3JvdXBzIH0gZnJvbSBcIi4uL2FwcC5qc1wiO1xuaW1wb3J0IHtcbiAgQVRUQUNIX0RFTEVURV9HUk9VUF9MSVNURU5FUixcbiAgQVRUQUNIX1JFTkRFUl9HUk9VUF9MSVNURU5FUixcbiAgQ0FOQ0VMX0FERF9UQVNLLFxuICBBUFBMWV9BRERfVEFTSyxcbiAgQVRUQUNIX0FERF9UQVNLX0xJU1RFTkVSLFxuICBBVFRBQ0hfREVMRVRFX1RBU0tfTElTVEVORVIsXG4gIEFUVEFDSF9EVUVfVE9EQVlfTElTVEVORVIsXG4gIEFUVEFDSF9ISUdIX1BSSU9SSVRZX0xJU1RFTkVSLFxufSBmcm9tIFwiLi9ldmVudF9saXN0ZW5lcnMuanNcIjtcblxuY29uc3QgTUVUQV9EQVRBID0gKCkgPT4ge1xuICBjb25zdCBGT05UX0FXRVNPTUUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuICBGT05UX0FXRVNPTUUuc2V0QXR0cmlidXRlKFwicmVsXCIsIFwic3R5bGVzaGVldFwiKTtcbiAgRk9OVF9BV0VTT01FLnNldEF0dHJpYnV0ZShcbiAgICBcImhyZWZcIixcbiAgICBcImh0dHBzOi8vdXNlLmZvbnRhd2Vzb21lLmNvbS9yZWxlYXNlcy92NS4xNS4zL2Nzcy9hbGwuY3NzXCJcbiAgKTtcbiAgRk9OVF9BV0VTT01FLnNldEF0dHJpYnV0ZShcbiAgICBcImludGVncml0eVwiLFxuICAgIFwic2hhMzg0LVNaWHhYNHdoSjc5L2dFcndjT1lmK3pXTGVKZFkvcXB1cUM0Y0FhOXJPR1VzdFBvbXRxcHVOV1Q5d2RQRW4yZmtcIlxuICApO1xuICBGT05UX0FXRVNPTUUuc2V0QXR0cmlidXRlKFwiY3Jvc3NvcmlnaW5cIiwgXCJhbm9ueW1vdXNcIik7XG5cbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmQoRk9OVF9BV0VTT01FKTtcbn07XG5cbmNvbnN0IE1FTlVfQlVUVE9OID0gKCkgPT4ge1xuICBjb25zdCBIQU1CVVJHRVJfTUVOVV9CVVRUT04gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBjb25zdCBIQU1CVVJHRVJfQlVUVE9OX0lDT04gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcblxuICBIQU1CVVJHRVJfTUVOVV9CVVRUT04uaWQgPSBcImhhbWJ1cmdlcl9tZW51X2J1dHRvblwiO1xuICBIQU1CVVJHRVJfQlVUVE9OX0lDT04uY2xhc3NMaXN0ID0gXCJmYXMgZmEtYWxpZ24tanVzdGlmeVwiO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kKEhBTUJVUkdFUl9NRU5VX0JVVFRPTik7XG4gIEhBTUJVUkdFUl9NRU5VX0JVVFRPTi5hcHBlbmQoSEFNQlVSR0VSX0JVVFRPTl9JQ09OKTtcbn07XG5cbmNvbnN0IEhFQURFUiA9ICgpID0+IHtcbiAgY29uc3QgSEVBREVSX0NPTlRBSU5FUiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gIGNvbnN0IE5BVl9CQVJfVEVYVCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcblxuICBOQVZfQkFSX1RFWFQuaW5uZXJUZXh0ID0gXCJUYXNrIE1hc3RlclwiO1xuICBOQVZfQkFSX1RFWFQuaWQgPSBcImhlYWRlclwiO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kKEhFQURFUl9DT05UQUlORVIpO1xuICBIRUFERVJfQ09OVEFJTkVSLmFwcGVuZChOQVZfQkFSX1RFWFQpO1xufTtcblxuY29uc3QgTkFWX0JBUiA9ICgpID0+IHtcbiAgY29uc3QgTUFJTiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJtYWluXCIpO1xuICBjb25zdCBOQVZfQ09OVEFJTkVSID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm5hdlwiKTtcbiAgY29uc3QgRFVFX0NPTlRBSU5FUiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvbFwiKTtcbiAgY29uc3QgRFVFX1RPREFZID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBjb25zdCBISUdIX1BSSU9SSVRZID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBjb25zdCBHUk9VUF9DT05UQUlORVIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBHUk9VUF9IRUFESU5HID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICBjb25zdCBHUk9VUF9MSVNUID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9sXCIpO1xuXG4gIE5BVl9DT05UQUlORVIuaWQgPSBcIm5hdl9jb250YWluZXJcIjtcbiAgRFVFX0NPTlRBSU5FUi5pZCA9IFwiZHVlX2NvbnRhaW5lclwiO1xuICBEVUVfVE9EQVkuaWQgPSBcImR1ZV90b2RheVwiO1xuICBISUdIX1BSSU9SSVRZLmlkID0gXCJoaWdoX3ByaW9yaXR5XCI7XG4gIEdST1VQX0NPTlRBSU5FUi5pZCA9IFwiZ3JvdXBfY29udGFpbmVyXCI7XG4gIEdST1VQX0hFQURJTkcuaWQgPSBcImdyb3VwX2hlYWRpbmdcIjtcbiAgR1JPVVBfTElTVC5pZCA9IFwidGFza19ncm91cF9jb250YWluZXJcIjtcblxuICBjb25zdCBUSU1FX1BFUklPRF9WSUVXID0gW0RVRV9UT0RBWSwgSElHSF9QUklPUklUWV0ubWFwKFxuICAgIChlbGVtZW50KSA9PiAoZWxlbWVudC5jbGFzc0xpc3QgPSBcImltcG9ydGFudF90YXNrc1wiKVxuICApO1xuXG4gIERVRV9UT0RBWS5pbm5lclRleHQgPSBcIkR1ZSB0b2RheVwiO1xuICBISUdIX1BSSU9SSVRZLmlubmVyVGV4dCA9IFwiSGlnaCBQcmlvcml0eVwiO1xuICBHUk9VUF9IRUFESU5HLmlubmVyVGV4dCA9IFwiR3JvdXBzXCI7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmQoTUFJTik7XG4gIE1BSU4uYXBwZW5kKE5BVl9DT05UQUlORVIpO1xuICBOQVZfQ09OVEFJTkVSLmFwcGVuZChEVUVfQ09OVEFJTkVSKTtcbiAgRFVFX0NPTlRBSU5FUi5hcHBlbmQoRFVFX1RPREFZKTtcbiAgRFVFX0NPTlRBSU5FUi5hcHBlbmQoSElHSF9QUklPUklUWSk7XG4gIE5BVl9DT05UQUlORVIuYXBwZW5kKEdST1VQX0NPTlRBSU5FUik7XG4gIEdST1VQX0NPTlRBSU5FUi5hcHBlbmQoR1JPVVBfSEVBRElORyk7XG4gIEdST1VQX0NPTlRBSU5FUi5hcHBlbmQoR1JPVVBfTElTVCk7XG5cbiAgQVRUQUNIX0RVRV9UT0RBWV9MSVNURU5FUihEVUVfVE9EQVkpO1xuICBBVFRBQ0hfSElHSF9QUklPUklUWV9MSVNURU5FUihISUdIX1BSSU9SSVRZKTtcblxuICBjb25zdCBBRERfR1JPVVBfQlVUVE9OID0gKCgpID0+IHtcbiAgICBjb25zdCBBRERfR1JPVVBfQlVUVE9OID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjb25zdCBBRERfR1JPVVBfUExVU19JQ09OID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG5cbiAgICBBRERfR1JPVVBfQlVUVE9OLmlkID0gXCJhZGRfZ3JvdXBcIjtcbiAgICBBRERfR1JPVVBfQlVUVE9OLmlubmVyVGV4dCA9IFwiZ3JvdXBcIjtcbiAgICBBRERfR1JPVVBfUExVU19JQ09OLmlkID0gXCJhZGRfZ3JvdXBfcGx1c19zaWduXCI7XG4gICAgQUREX0dST1VQX1BMVVNfSUNPTi5jbGFzc0xpc3QgPSBcImZhcyBmYS1wbHVzLWNpcmNsZVwiO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJncm91cF9jb250YWluZXJcIikuYXBwZW5kKEFERF9HUk9VUF9CVVRUT04pO1xuICAgIEFERF9HUk9VUF9CVVRUT04ucHJlcGVuZChBRERfR1JPVVBfUExVU19JQ09OKTtcbiAgfSkoKTtcbn07XG5cbmNvbnN0IFJFTkRFUl9OQVZfQkFSX0dST1VQUyA9ICgpID0+IHtcbiAgY29uc3QgUkVNT1ZFX0FMTF9HUk9VUFMgPSBbXG4gICAgLi4uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrX2dyb3VwX2NvbnRhaW5lclwiKS5jaGlsZHJlbixcbiAgXS5tYXAoKG5vZGUpID0+IG5vZGUucmVtb3ZlKCkpO1xuXG4gIGNvbnN0IEdST1VQU19DT05UQUlORVIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tfZ3JvdXBfY29udGFpbmVyXCIpO1xuICBmb3IgKGxldCBwcm9wIGluIGdyb3Vwcykge1xuICAgIGNvbnN0IEdST1VQID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgIGNvbnN0IFRFWFQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgY29uc3QgVFJBU0ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcblxuICAgIEdST1VQLnNldEF0dHJpYnV0ZShcImRhdGEtZ3JvdXAtY29udGFpbmVyXCIsIHByb3ApO1xuICAgIEdST1VQLmNsYXNzTGlzdCA9IFwibmF2X2Jhcl9ncm91cFwiO1xuICAgIFRFWFQuc2V0QXR0cmlidXRlKFwiZGF0YS1ncm91cC10ZXh0XCIsIHByb3ApO1xuICAgIFRFWFQuaW5uZXJUZXh0ID0gcHJvcDtcbiAgICBURVhULmNsYXNzTGlzdCA9IFwiaW5kaXZpZHVhbF9ncm91cF9oZWFkaW5nXCI7XG4gICAgVFJBU0guY2xhc3NMaXN0ID0gXCJkZWxldGVfZ3JvdXAgZmEgZmEtdHJhc2hcIjtcbiAgICBUUkFTSC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWdyb3VwXCIsIHByb3ApO1xuICAgIFRSQVNILnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcblxuICAgIEFUVEFDSF9ERUxFVEVfR1JPVVBfTElTVEVORVIoVFJBU0gpO1xuICAgIEFUVEFDSF9SRU5ERVJfR1JPVVBfTElTVEVORVIoVEVYVCk7XG5cbiAgICBHUk9VUFNfQ09OVEFJTkVSLmFwcGVuZChHUk9VUCk7XG4gICAgR1JPVVAuYXBwZW5kKFRFWFQpO1xuICAgIEdST1VQLmFwcGVuZChUUkFTSCk7XG4gIH1cbn07XG5cbmNvbnN0IEFERF9HUk9VUF9JTlBVVCA9ICgpID0+IHtcbiAgY29uc3QgR1JPVVBfQ09OVEFJTkVSID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJncm91cF9jb250YWluZXJcIik7XG4gIGNvbnN0IEZPUk0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgY29uc3QgQ0FOQ0VMID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gIGNvbnN0IElOUFVUID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBjb25zdCBTVUJNSVQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcblxuICBGT1JNLmlkID0gXCJhZGRfZ3JvdXBfZm9ybVwiO1xuICBDQU5DRUwuaWQgPSBcImNhbmNlbF9ncm91cF9pY29uXCI7XG4gIENBTkNFTC5jbGFzc0xpc3QgPSBcImZhcyBmYS13aW5kb3ctY2xvc2VcIjtcbiAgSU5QVVQuaWQgPSBcImFkZF9ncm91cF9pbnB1dFwiO1xuICBTVUJNSVQuY2xhc3NMaXN0ID0gXCJmYXMgZmEtc2lnbi1pbi1hbHRcIjtcbiAgU1VCTUlULmlkID0gXCJzdWJtaXRfZ3JvdXBfaWNvblwiO1xuXG4gIEdST1VQX0NPTlRBSU5FUi5hcHBlbmQoRk9STSk7XG4gIEZPUk0uYXBwZW5kKENBTkNFTCk7XG4gIEZPUk0uYXBwZW5kKElOUFVUKTtcbiAgRk9STS5hcHBlbmQoU1VCTUlUKTtcbn07XG5cbmNvbnN0IFJFTkRFUl9UQVNLID0gKHRhc2ssIHRhc2tzX2NvbnRhaW5lcikgPT4ge1xuICAvLyBkZWJ1Z2dlcjtcbiAgY29uc3QgTEFCRUxfVkFMVUUgPSB0YXNrLmxhYmVsO1xuICBjb25zdCBQUklPUklUWV9WQUxVRSA9IHRhc2sucHJpb3JpdHk7XG4gIGNvbnN0IERVRV9EQVRFX1ZBTFVFID0gdGFzay5kdWVfZGF0ZS5zbGljZSgwLCAxMCk7XG4gIGNvbnN0IFlFQVIgPSBEVUVfREFURV9WQUxVRS5zbGljZSgwLCA0KTtcbiAgY29uc3QgTU9OVEggPSBEVUVfREFURV9WQUxVRS5zbGljZSg1LCA3KTtcbiAgY29uc3QgREFZID0gRFVFX0RBVEVfVkFMVUUuc2xpY2UoOCwgMTApO1xuICBjb25zdCBOT1RFU19WQUxVRSA9IHRhc2subm90ZXM7XG4gIGNvbnN0IElEID0gdGFzay5pZDtcblxuICBsZXQgZGlmZmVyZW5jZSwgZHVlO1xuXG4gIERVRV9EQVRFX1ZBTFVFID09PSBcIlwiXG4gICAgPyAoZGlmZmVyZW5jZSA9IDApXG4gICAgOiAoZGlmZmVyZW5jZSA9IGRpZmZlcmVuY2VJbkRheXMoXG4gICAgICAgIG5ldyBEYXRlKFlFQVIsIE1PTlRIIC0gMSwgREFZKSxcbiAgICAgICAgbmV3IERhdGUoKVxuICAgICAgKSk7XG5cbiAgaWYgKGRpZmZlcmVuY2UgPT09IDApIHtcbiAgICBkdWUgPSBcIlRvZGF5XCI7XG4gIH0gZWxzZSBpZiAoZGlmZmVyZW5jZSA9PT0gMSkge1xuICAgIGR1ZSA9IFwiVG9tb3Jyb3dcIjtcbiAgfSBlbHNlIHtcbiAgICBkdWUgPSBgJHtkaWZmZXJlbmNlfSBkYXlzYDtcbiAgfVxuXG4gIGNvbnN0IFRBU0tfQ09OVEFJTkVSID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgTEFCRUwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gIGNvbnN0IFBSSU9SSVRZID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgRFVFX0NPTlRBSU5FUiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IERVRV9MQUJFTCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IERVRV9EQVRFID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgTk9URVNfQ09OVEFJTkVSID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgTk9URVNfTEFCRUwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBOT1RFUyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IERFTEVURV9UQVNLX0lDT04gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcblxuICBUQVNLX0NPTlRBSU5FUi5jbGFzc0xpc3QgPSBcInRhc2tcIjtcbiAgVEFTS19DT05UQUlORVIuc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBJRCk7XG4gIExBQkVMLmNsYXNzTGlzdCA9IFwidGFza19sYWJlbFwiO1xuICBEVUVfQ09OVEFJTkVSLmNsYXNzTGlzdCA9IFwiZHVlX2NvbnRhaW5lclwiO1xuICBOT1RFU19DT05UQUlORVIuY2xhc3NMaXN0ID0gXCJub3Rlc19jb250YWluZXJcIjtcbiAgTk9URVMuY2xhc3NMaXN0ID0gXCJub3RlXCI7XG4gIERFTEVURV9UQVNLX0lDT04uY2xhc3NMaXN0ID0gXCJkZWxldGVfdGFza19pY29uIGZhIGZhLXRyYXNoXCI7XG4gIERFTEVURV9UQVNLX0lDT04uaWQgPSBJRDtcbiAgaWYgKE5PVEVTX1ZBTFVFID09PSBcIlwiKSB7XG4gICAgTk9URVNfQ09OVEFJTkVSLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICB9XG5cbiAgTEFCRUwuaW5uZXJUZXh0ID0gTEFCRUxfVkFMVUU7XG4gIERVRV9MQUJFTC5pbm5lclRleHQgPSBcIkR1ZTpcIjtcbiAgRFVFX0RBVEUuaW5uZXJUZXh0ID0gZHVlO1xuICBOT1RFU19MQUJFTC5pbm5lclRleHQgPSBcIk5vdGVzOlwiO1xuICBOT1RFUy5pbm5lclRleHQgPSBOT1RFU19WQUxVRTtcblxuICBBVFRBQ0hfREVMRVRFX1RBU0tfTElTVEVORVIoREVMRVRFX1RBU0tfSUNPTik7XG5cbiAgdGFza3NfY29udGFpbmVyLmFwcGVuZChUQVNLX0NPTlRBSU5FUik7XG4gIFRBU0tfQ09OVEFJTkVSLmFwcGVuZChMQUJFTCk7XG4gIFRBU0tfQ09OVEFJTkVSLmFwcGVuZChEVUVfQ09OVEFJTkVSKTtcbiAgRFVFX0NPTlRBSU5FUi5hcHBlbmQoRFVFX0xBQkVMKTtcbiAgRFVFX0NPTlRBSU5FUi5hcHBlbmQoRFVFX0RBVEUpO1xuICBUQVNLX0NPTlRBSU5FUi5hcHBlbmQoTk9URVNfQ09OVEFJTkVSKTtcbiAgTk9URVNfQ09OVEFJTkVSLmFwcGVuZChOT1RFU19MQUJFTCk7XG4gIE5PVEVTX0NPTlRBSU5FUi5hcHBlbmQoTk9URVMpO1xuICBUQVNLX0NPTlRBSU5FUi5hcHBlbmQoREVMRVRFX1RBU0tfSUNPTik7XG59O1xuXG5jb25zdCBSRU5ERVJfR1JPVVAgPSAoZXZlbnQsIG5hbWUpID0+IHtcbiAgY29uc3QgR1JPVVBfTkFNRSA9IG5hbWUgfHwgZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtZ3JvdXAtdGV4dFwiKTtcbiAgY29uc3QgVEFTS1NfQ09OVEFJTkVSID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICBjb25zdCBBRERfVEFTS19JQ09OID0gUkVOREVSX0FERF9UQVNLX0JVVFRPTihHUk9VUF9OQU1FLCBUQVNLU19DT05UQUlORVIpO1xuXG4gIEFUVEFDSF9BRERfVEFTS19MSVNURU5FUihBRERfVEFTS19JQ09OKTtcblxuICBjb25zdCBUQVNLUyA9IGdyb3Vwc1tHUk9VUF9OQU1FXS5tYXAoKHRhc2spID0+IHtcbiAgICBSRU5ERVJfVEFTSyh0YXNrLCBUQVNLU19DT05UQUlORVIpO1xuICB9KTtcblxuICBUQVNLU19DT05UQUlORVIuY2xhc3NMaXN0ID0gXCJ0YXNrc19jb250YWluZXJcIjtcbiAgVEFTS1NfQ09OVEFJTkVSLnNldEF0dHJpYnV0ZShcImRhdGEtZ3JvdXAtdGFza3NcIiwgR1JPVVBfTkFNRSk7XG5cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJtYWluXCIpWzBdLmFwcGVuZChUQVNLU19DT05UQUlORVIpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlYWRlclwiKS5pbm5lclRleHQgPSBHUk9VUF9OQU1FO1xufTtcblxuY29uc3QgUkVNT1ZFX0NVUlJFTlRfR1JPVVAgPSAoKSA9PiB7XG4gIGNvbnN0IFRBU0tfQ09OVEFJTkVSID0gW1xuICAgIC4uLmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0YXNrc19jb250YWluZXJcIiksXG4gIF07XG4gIGlmIChUQVNLX0NPTlRBSU5FUi5sZW5ndGggIT09IDApIHtcbiAgICBUQVNLX0NPTlRBSU5FUlswXS5yZW1vdmUoKTtcbiAgfVxufTtcblxuY29uc3QgUkVOREVSX0FERF9UQVNLX0JVVFRPTiA9IChncm91cF9uYW1lLCB0YXNrX2NvbnRhaW5lcikgPT4ge1xuICBjb25zdCBCVVRUT04gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBQTFVTX0lDT04gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcblxuICBCVVRUT04uc2V0QXR0cmlidXRlKFwiZGF0YS1hZGQtdGFza1wiLCBncm91cF9uYW1lKTtcbiAgQlVUVE9OLmNsYXNzTGlzdCA9IFwidGFzayBhZGRfdGFza19idXR0b25cIjtcbiAgUExVU19JQ09OLmNsYXNzTGlzdCA9IFwiZmFzIGZhLXBsdXMgYWRkX3Rhc2tfaWNvblwiO1xuXG4gIHRhc2tfY29udGFpbmVyLmFwcGVuZChCVVRUT04pO1xuICBCVVRUT04uYXBwZW5kKFBMVVNfSUNPTik7XG5cbiAgcmV0dXJuIEJVVFRPTjtcbn07XG5cbmNvbnN0IFJFTkRFUl9BRERfVEFTS19GT1JNID0gKGdyb3VwX25hbWUpID0+IHtcbiAgY29uc3QgQ1VSUlJFTlRfQ09OVEFJTkVSID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrX2Zvcm1fY29udGFpbmVyXCIpO1xuXG4gIGlmIChDVVJSUkVOVF9DT05UQUlORVIgPT09IG51bGwpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRlclwiKVswXS5zdHlsZS5maWx0ZXIgPSBcImJsdXIoLjRlbSlcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIm1haW5cIilbMF0uc3R5bGUuZmlsdGVyID0gXCJibHVyKC40ZW0pXCI7XG5cbiAgICBjb25zdCBUQVNLX0ZPUk1fQ09OVEFJTkVSID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBUQVNLX0ZPUk0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgICBjb25zdCBMQUJFTF9JTlBVVCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBjb25zdCBQUklPUklUWV9JTlBVVCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XG4gICAgY29uc3QgRFVFX0RBVEVfSU5QVVQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgY29uc3QgTk9URVNfSU5QVVQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgY29uc3QgQ0FOQ0VMX0FQUExZX0NPTlRBSU5FUiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgQ0FOQ0VMX0FERF9UQVNLX0lDT04gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgICBjb25zdCBBUFBMWV9BRERfVEFTS19JQ09OID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gICAgY29uc3QgSU5QVVRTID0gW0xBQkVMX0lOUFVULCBQUklPUklUWV9JTlBVVCwgRFVFX0RBVEVfSU5QVVQsIE5PVEVTX0lOUFVUXTtcbiAgICBjb25zdCBJRFMgPSBbXG4gICAgICBcImxhYmVsX2lucHV0XCIsXG4gICAgICBcInByaW9yaXR5X2lucHV0XCIsXG4gICAgICBcImR1ZV9kYXRlX2lucHV0XCIsXG4gICAgICBcIm5vdGVzX2lucHV0XCIsXG4gICAgXTtcbiAgICBjb25zdCBJTk5FUlRFWFQgPSBbXCJMYWJlbFwiLCBcIlByaW9yaXR5XCIsIFwiRHVlIGRhdGVcIiwgXCJOb3Rlc1wiXTtcbiAgICBjb25zdCBQUklPUklUWV9PUFRJT05TID0gW1wibG93XCIsIFwibWVkaXVtXCIsIFwiaGlnaFwiXTtcblxuICAgIFRBU0tfRk9STV9DT05UQUlORVIuaWQgPSBcInRhc2tfZm9ybV9jb250YWluZXJcIjtcbiAgICBUQVNLX0ZPUk1fQ09OVEFJTkVSLnNldEF0dHJpYnV0ZShcImRhdGEtZ3JvdXBcIiwgZ3JvdXBfbmFtZSk7XG4gICAgVEFTS19GT1JNLmlkID0gXCJhZGRfdGFza19mb3JtXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgIElOUFVUU1tpXS5pZCA9IElEU1tpXTtcbiAgICAgIElOUFVUU1tpXS5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIElEU1tpXSk7XG4gICAgICBJTlBVVFNbaV0uY2xhc3NMaXN0ID0gXCJ0YXNrX2lucHV0XCI7XG4gICAgICBpZiAoaSAhPT0gMSkge1xuICAgICAgICBJTlBVVFNbaV0uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gICAgICB9XG4gICAgICBpZiAoaSA9PT0gMikge1xuICAgICAgICBJTlBVVFNbaV0uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImRhdGVcIik7XG4gICAgICB9XG4gICAgfVxuICAgIENBTkNFTF9BRERfVEFTS19JQ09OLmNsYXNzTGlzdCA9IFwiZmFyIGZhLXRpbWVzLWNpcmNsZVwiO1xuICAgIENBTkNFTF9BRERfVEFTS19JQ09OLmlkID0gXCJjYW5jZWxfYWRkX3Rhc2tfaWNvblwiO1xuICAgIEFQUExZX0FERF9UQVNLX0lDT04uY2xhc3NMaXN0ID0gXCJmYXIgZmEtY2hlY2stY2lyY2xlXCI7XG4gICAgQVBQTFlfQUREX1RBU0tfSUNPTi5pZCA9IFwiYXBwbHlfYWRkX3Rhc2tfaWNvblwiO1xuICAgIENBTkNFTF9BUFBMWV9DT05UQUlORVIuaWQgPSBcImNhbmNlbF9hcHBseV9jb250YWluZXJcIjtcblxuICAgIEFQUExZX0FERF9UQVNLKEFQUExZX0FERF9UQVNLX0lDT04pO1xuICAgIENBTkNFTF9BRERfVEFTSyhDQU5DRUxfQUREX1RBU0tfSUNPTik7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZChUQVNLX0ZPUk1fQ09OVEFJTkVSKTtcbiAgICBUQVNLX0ZPUk1fQ09OVEFJTkVSLmFwcGVuZChUQVNLX0ZPUk0pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICBjb25zdCBJTlBVVF9DT05UQUlORVIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY29uc3QgTEFCRUwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG5cbiAgICAgIElOUFVUX0NPTlRBSU5FUi5jbGFzc0xpc3QgPSBcInRhc2tfaW5wdXRfY29udGFpbmVyXCI7XG4gICAgICBMQUJFTC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgSURTW2ldKTtcbiAgICAgIExBQkVMLmNsYXNzTGlzdCA9IFwidGFza19pbnB1dF9sYWJlbFwiO1xuICAgICAgTEFCRUwuaW5uZXJUZXh0ID0gSU5ORVJURVhUW2ldO1xuXG4gICAgICBUQVNLX0ZPUk0uYXBwZW5kKElOUFVUX0NPTlRBSU5FUik7XG4gICAgICBJTlBVVF9DT05UQUlORVIuYXBwZW5kKExBQkVMKTtcbiAgICAgIElOUFVUX0NPTlRBSU5FUi5hcHBlbmQoSU5QVVRTW2ldKTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIGNvbnN0IE9QVElPTiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICBPUFRJT04uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgUFJJT1JJVFlfT1BUSU9OU1tpXSk7XG4gICAgICBPUFRJT04uaW5uZXJUZXh0ID0gUFJJT1JJVFlfT1BUSU9OU1tpXTtcbiAgICAgIFBSSU9SSVRZX0lOUFVULmFwcGVuZChPUFRJT04pO1xuICAgIH1cbiAgICBUQVNLX0ZPUk0uYXBwZW5kKENBTkNFTF9BUFBMWV9DT05UQUlORVIpO1xuICAgIENBTkNFTF9BUFBMWV9DT05UQUlORVIuYXBwZW5kKENBTkNFTF9BRERfVEFTS19JQ09OKTtcbiAgICBDQU5DRUxfQVBQTFlfQ09OVEFJTkVSLmFwcGVuZChBUFBMWV9BRERfVEFTS19JQ09OKTtcbiAgICBMQUJFTF9JTlBVVC5mb2N1cygpO1xuICB9XG59O1xuXG5jb25zdCBSRU1PVkVfQUREX1RBU0tfRk9STSA9ICgpID0+IHtcbiAgY29uc3QgQUREX1RBU0tfRk9STSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza19mb3JtX2NvbnRhaW5lclwiKTtcbiAgQUREX1RBU0tfRk9STS5yZW1vdmUoKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkZXJcIilbMF0uc3R5bGUuZmlsdGVyID0gXCJcIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJtYWluXCIpWzBdLnN0eWxlLmZpbHRlciA9IFwiXCI7XG59O1xuXG5leHBvcnQge1xuICBIRUFERVIsXG4gIE1FVEFfREFUQSxcbiAgTkFWX0JBUixcbiAgTUVOVV9CVVRUT04sXG4gIFJFTkRFUl9OQVZfQkFSX0dST1VQUyxcbiAgQUREX0dST1VQX0lOUFVULFxuICBSRU1PVkVfQ1VSUkVOVF9HUk9VUCxcbiAgUkVOREVSX0FERF9UQVNLX0JVVFRPTixcbiAgUkVOREVSX0FERF9UQVNLX0ZPUk0sXG4gIFJFTU9WRV9BRERfVEFTS19GT1JNLFxuICBSRU5ERVJfR1JPVVAsXG4gIFJFTkRFUl9UQVNLLFxufTtcbiIsImltcG9ydCB7IGRpZmZlcmVuY2VJbkRheXMgfSBmcm9tIFwiZGF0ZS1mbnNcIjtcbmltcG9ydCB7XG4gIEFERF9HUk9VUF9JTlBVVF9IQU5ETEVSLFxuICBSRU1PVkVfQ1VSUkVOVF9HUk9VUCxcbiAgUkVOREVSX05BVl9CQVJfR1JPVVBTLFxuICBSRU5ERVJfR1JPVVAsXG4gIFJFTkRFUl9BRERfVEFTS19CVVRUT04sXG4gIFJFTkRFUl9BRERfVEFTS19GT1JNLFxuICBSRU1PVkVfQUREX1RBU0tfRk9STSxcbiAgUkVOREVSX1RBU0ssXG59IGZyb20gXCIuL2RvbS5qc1wiO1xuaW1wb3J0IHsgZ3JvdXBzLCBUYXNrLCBTRVRfU1RPUkFHRSB9IGZyb20gXCIuLi9hcHAuanNcIjtcbmltcG9ydCB7IERVRV9UT0RBWV9IQU5ETEVSIH0gZnJvbSBcIi4uL2hlbHBlcnMvZHVlX3RvZGF5LmpzXCI7XG5pbXBvcnQgeyBISUdIX1BSSU9SSVRZX0hBTkRMRVIgfSBmcm9tIFwiLi4vaGVscGVycy9oaWdoX3ByaW9yaXR5LmpzXCI7XG5cbmNvbnN0IEVWRU5UX0xJU1RFTkVSUyA9ICgpID0+IHtcbiAgY29uc3QgSEFNQlVSR0VSX01FTlUgPSAoKCkgPT4ge1xuICAgIGNvbnN0IE1FTlVfQlVUVE9OID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoYW1idXJnZXJfbWVudV9idXR0b25cIik7XG5cbiAgICBNRU5VX0JVVFRPTi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgTkFWX01FTlUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdl9jb250YWluZXJcIik7XG4gICAgICBOQVZfTUVOVS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgTUVOVV9CVVRUT04uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH0pO1xuICB9KSgpO1xuXG4gIGNvbnN0IEFERF9HUk9VUF9CVVRUT04gPSAoKCkgPT4ge1xuICAgIGNvbnN0IEFERF9CVVRUT04gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9ncm91cFwiKTtcblxuICAgIEFERF9CVVRUT04uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IENVUlJSRU5UX0NPTlRBSU5FUiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza19mb3JtX2NvbnRhaW5lclwiKTtcblxuICAgICAgaWYgKENVUlJSRU5UX0NPTlRBSU5FUiA9PT0gbnVsbCkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9ncm91cFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX2dyb3VwX2Zvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9ncm91cF9pbnB1dFwiKS5mb2N1cygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KSgpO1xuXG4gIGNvbnN0IENBTkNFTF9ORVdfR1JPVVBfSUNPTiA9ICgoKSA9PiB7XG4gICAgY29uc3QgQ0FOQ0VMX0JVVFRPTiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FuY2VsX2dyb3VwX2ljb25cIik7XG5cbiAgICBDQU5DRUxfQlVUVE9OLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBDVVJSUkVOVF9DT05UQUlORVIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tfZm9ybV9jb250YWluZXJcIik7XG5cbiAgICAgIGlmIChDVVJSUkVOVF9DT05UQUlORVIgPT09IG51bGwpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRfZ3JvdXBcIikuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9ncm91cF9mb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkoKTtcblxuICBjb25zdCBTVUJNSVRfTkVXX0dST1VQX0lDT04gPSAoKCkgPT4ge1xuICAgIGNvbnN0IFNVQk1JVF9CVVRUT04gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Ym1pdF9ncm91cF9pY29uXCIpO1xuXG4gICAgU1VCTUlUX0JVVFRPTi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgQ1VSUlJFTlRfQ09OVEFJTkVSID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrX2Zvcm1fY29udGFpbmVyXCIpO1xuXG4gICAgICBpZiAoQ1VSUlJFTlRfQ09OVEFJTkVSID09PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IElOUFVUX1RFWFQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9ncm91cF9pbnB1dFwiKS52YWx1ZTtcbiAgICAgICAgY29uc3QgSU5QVVRfRklFTEQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9ncm91cF9pbnB1dFwiKTtcbiAgICAgICAgaWYgKElOUFVUX1RFWFQgPT09IFwiXCIpIHtcbiAgICAgICAgICBJTlBVVF9GSUVMRC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYigxODEsIDQwLCA0MClcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBncm91cHNbSU5QVVRfVEVYVF0gPSBbXTtcbiAgICAgICAgICBJTlBVVF9GSUVMRC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgUkVOREVSX05BVl9CQVJfR1JPVVBTKCk7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRfZ3JvdXBcIikuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX2dyb3VwX2Zvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgIFNFVF9TVE9SQUdFKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSkoKTtcblxuICBjb25zdCBHUk9VUF9JTlBVVF9WQUxJREFUSU9OID0gKCgpID0+IHtcbiAgICBjb25zdCBJTlBVVF9GSUVMRCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX2dyb3VwX2lucHV0XCIpO1xuXG4gICAgSU5QVVRfRklFTEQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsICgpID0+IHtcbiAgICAgIGNvbnN0IElOUFVUX1RFWFQgPSBJTlBVVF9GSUVMRC52YWx1ZTtcbiAgICAgIGNvbnN0IEdST1VQUyA9IE9iamVjdC5rZXlzKGdyb3Vwcyk7XG5cbiAgICAgIGlmIChHUk9VUFMuaW5jbHVkZXMoSU5QVVRfVEVYVCkpIHtcbiAgICAgICAgSU5QVVRfRklFTEQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjOTg0MTQxXCI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0X2dyb3VwX2ljb25cIikuc3R5bGUudmlzaWJpbGl0eSA9XG4gICAgICAgICAgXCJoaWRkZW5cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIElOUFVUX0ZJRUxELnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwid2hpdGVcIjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRfZ3JvdXBfaWNvblwiKS5zdHlsZS52aXNpYmlsaXR5ID1cbiAgICAgICAgICBcInZpc2libGVcIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkoKTtcbn07XG5cbmNvbnN0IEFUVEFDSF9ERUxFVEVfR1JPVVBfTElTVEVORVIgPSAoaW5wdXRfZWxlbWVudCkgPT4ge1xuICBpbnB1dF9lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IFRBUkdFVF9EQVRBX0dST1VQID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtZ3JvdXBcIik7XG4gICAgY29uc3QgR1JPVVBfQ09OVEFJTkVSID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGBbZGF0YS1ncm91cC1jb250YWluZXI9JHtUQVJHRVRfREFUQV9HUk9VUH1dYFxuICAgICk7XG4gICAgR1JPVVBfQ09OVEFJTkVSLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzk4NDE0MVwiO1xuICB9KTtcblxuICBpbnB1dF9lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IFRBUkdFVF9EQVRBX0dST1VQID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtZ3JvdXBcIik7XG4gICAgY29uc3QgR1JPVVBfQ09OVEFJTkVSID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGBbZGF0YS1ncm91cC1jb250YWluZXI9JHtUQVJHRVRfREFUQV9HUk9VUH1dYFxuICAgICk7XG4gICAgR1JPVVBfQ09OVEFJTkVSLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzI4YmRhN1wiO1xuICB9KTtcblxuICBpbnB1dF9lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBDVVJSUkVOVF9DT05UQUlORVIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tfZm9ybV9jb250YWluZXJcIik7XG5cbiAgICBpZiAoQ1VSUlJFTlRfQ09OVEFJTkVSID09PSBudWxsKSB7XG4gICAgICBjb25zdCBUQVJHRVRfREFUQV9HUk9VUCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWdyb3VwXCIpO1xuICAgICAgZGVsZXRlIGdyb3Vwc1tUQVJHRVRfREFUQV9HUk9VUF07XG4gICAgICBSRU5ERVJfTkFWX0JBUl9HUk9VUFMoKTtcbiAgICAgIFNFVF9TVE9SQUdFKCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IEFUVEFDSF9SRU5ERVJfR1JPVVBfTElTVEVORVIgPSAoaW5wdXRfZWxlbWVudCkgPT4ge1xuICBpbnB1dF9lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBDVVJSUkVOVF9DT05UQUlORVIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tfZm9ybV9jb250YWluZXJcIik7XG5cbiAgICBpZiAoQ1VSUlJFTlRfQ09OVEFJTkVSID09PSBudWxsKSB7XG4gICAgICBSRU1PVkVfQ1VSUkVOVF9HUk9VUCgpO1xuICAgICAgUkVOREVSX0dST1VQKGV2ZW50KTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgQVRUQUNIX0FERF9UQVNLX0xJU1RFTkVSID0gKGVsZW1lbnQpID0+IHtcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgR1JPVVBfTkFNRSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1hZGQtdGFza1wiKTtcbiAgICBSRU5ERVJfQUREX1RBU0tfRk9STShHUk9VUF9OQU1FKTtcbiAgfSk7XG59O1xuXG5jb25zdCBDQU5DRUxfQUREX1RBU0sgPSAoY2FuY2VsX2ljb24pID0+IHtcbiAgY2FuY2VsX2ljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBSRU1PVkVfQUREX1RBU0tfRk9STSgpO1xuICB9KTtcbn07XG5cbmNvbnN0IEFQUExZX0FERF9UQVNLID0gKGFwcGx5X2ljb24pID0+IHtcbiAgYXBwbHlfaWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IEdST1VQX05BTUUgPSBkb2N1bWVudFxuICAgICAgLmdldEVsZW1lbnRCeUlkKFwidGFza19mb3JtX2NvbnRhaW5lclwiKVxuICAgICAgLmdldEF0dHJpYnV0ZShcImRhdGEtZ3JvdXBcIik7XG4gICAgY29uc3QgTEFCRUxfVkFMVUUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhYmVsX2lucHV0XCIpLnZhbHVlO1xuICAgIGNvbnN0IFBSSU9SSVRZX1ZBTFVFID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eV9pbnB1dFwiKS52YWx1ZTtcbiAgICBjb25zdCBEVUVfREFURV9WQUxVRSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlX2RhdGVfaW5wdXRcIikudmFsdWU7XG4gICAgY29uc3QgTk9URVNfVkFMVUUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5vdGVzX2lucHV0XCIpLnZhbHVlO1xuXG4gICAgY29uc3QgWUVBUiA9IERVRV9EQVRFX1ZBTFVFLnNsaWNlKDAsIDQpO1xuICAgIGNvbnN0IE1PTlRIID0gRFVFX0RBVEVfVkFMVUUuc2xpY2UoNSwgNyk7XG4gICAgY29uc3QgREFZID0gRFVFX0RBVEVfVkFMVUUuc2xpY2UoOCwgMTApO1xuICAgIGxldCBkdWU7XG4gICAgRFVFX0RBVEVfVkFMVUUgPT09IFwiXCIgPyAoZHVlID0gXCJcIikgOiAoZHVlID0gYCR7WUVBUn1fJHtNT05USH1fJHtEQVl9YCk7XG5cbiAgICBjb25zdCBORVdfVEFTSyA9IG5ldyBUYXNrKExBQkVMX1ZBTFVFLCBQUklPUklUWV9WQUxVRSwgZHVlLCBOT1RFU19WQUxVRSk7XG5cbiAgICBncm91cHNbR1JPVVBfTkFNRV0ucHVzaChORVdfVEFTSyk7XG5cbiAgICBSRU1PVkVfQUREX1RBU0tfRk9STSgpO1xuICAgIFJFTU9WRV9DVVJSRU5UX0dST1VQKCk7XG4gICAgUkVOREVSX0dST1VQKG51bGwsIEdST1VQX05BTUUpO1xuICAgIFNFVF9TVE9SQUdFKCk7XG4gIH0pO1xufTtcblxuY29uc3QgQVRUQUNIX0RFTEVURV9UQVNLX0xJU1RFTkVSID0gKGljb24pID0+IHtcbiAgaWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgVEFTS19JRCA9IGV2ZW50LnRhcmdldC5pZDtcbiAgICBsZXQgZ3JvdXA7XG4gICAgZm9yIChsZXQgcHJvcCBpbiBncm91cHMpIHtcbiAgICAgIGdyb3Vwc1twcm9wXS5tYXAoKHRhc2spID0+IHtcbiAgICAgICAgaWYgKHRhc2suaWQgPT09IFRBU0tfSUQpIHtcbiAgICAgICAgICBncm91cCA9IHByb3A7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZ3JvdXBzW3Byb3BdID0gZ3JvdXBzW3Byb3BdLmZpbHRlcigodGFzaykgPT4gdGFzay5pZCAhPT0gVEFTS19JRCk7XG4gICAgfVxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlYWRlclwiKS5pbm5lclRleHQgPT09IFwiRHVlIHRvZGF5XCIpIHtcbiAgICAgIERVRV9UT0RBWV9IQU5ETEVSKCk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVhZGVyXCIpLmlubmVyVGV4dCA9PT0gXCJIaWdoIFByaW9yaXR5XCJcbiAgICApIHtcbiAgICAgIEhJR0hfUFJJT1JJVFlfSEFORExFUigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBSRU1PVkVfQ1VSUkVOVF9HUk9VUCgpO1xuICAgICAgUkVOREVSX0dST1VQKG51bGwsIGdyb3VwKTtcbiAgICB9XG4gICAgU0VUX1NUT1JBR0UoKTtcbiAgfSk7XG59O1xuXG5jb25zdCBBVFRBQ0hfRFVFX1RPREFZX0xJU1RFTkVSID0gKGR1ZV90b2RheV9lbGVtZW50KSA9PiB7XG4gIGR1ZV90b2RheV9lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBEVUVfVE9EQVlfSEFORExFUik7XG59O1xuXG5jb25zdCBBVFRBQ0hfSElHSF9QUklPUklUWV9MSVNURU5FUiA9IChoaWdoX3ByaW9yaXR5X2VsZW1lbnQpID0+IHtcbiAgaGlnaF9wcmlvcml0eV9lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBISUdIX1BSSU9SSVRZX0hBTkRMRVIpO1xufTtcblxuZXhwb3J0IHtcbiAgRVZFTlRfTElTVEVORVJTLFxuICBBVFRBQ0hfREVMRVRFX0dST1VQX0xJU1RFTkVSLFxuICBBVFRBQ0hfUkVOREVSX0dST1VQX0xJU1RFTkVSLFxuICBDQU5DRUxfQUREX1RBU0ssXG4gIEFQUExZX0FERF9UQVNLLFxuICBBVFRBQ0hfQUREX1RBU0tfTElTVEVORVIsXG4gIEFUVEFDSF9ERUxFVEVfVEFTS19MSVNURU5FUixcbiAgQVRUQUNIX0RVRV9UT0RBWV9MSVNURU5FUixcbiAgQVRUQUNIX0hJR0hfUFJJT1JJVFlfTElTVEVORVIsXG59O1xuIiwiaW1wb3J0IHsgUkVNT1ZFX0NVUlJFTlRfR1JPVVAsIFJFTkRFUl9UQVNLIH0gZnJvbSBcIi4uL2RvbS9kb20uanNcIjtcbmltcG9ydCB7IGRpZmZlcmVuY2VJbkRheXMgfSBmcm9tIFwiZGF0ZS1mbnNcIjtcbmltcG9ydCB7IGdyb3VwcyB9IGZyb20gXCIuLi9hcHAuanNcIjtcblxuY29uc3QgRFVFX1RPREFZX0hBTkRMRVIgPSAoKSA9PiB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVhZGVyXCIpLmlubmVyVGV4dCA9IFwiRHVlIHRvZGF5XCI7XG4gIFJFTU9WRV9DVVJSRU5UX0dST1VQKCk7XG4gIGxldCB0YXNrcyA9IFtdO1xuXG4gIGNvbnN0IFRBU0tTX0NPTlRBSU5FUiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIFRBU0tTX0NPTlRBSU5FUi5jbGFzc0xpc3QgPSBcInRhc2tzX2NvbnRhaW5lclwiO1xuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibWFpblwiKVswXS5hcHBlbmQoVEFTS1NfQ09OVEFJTkVSKTtcblxuICBmb3IgKGxldCBwcm9wIGluIGdyb3Vwcykge1xuICAgIGdyb3Vwc1twcm9wXS5tYXAoKHRhc2spID0+IHtcbiAgICAgIGNvbnN0IERVRV9EQVRFID0gdGFzay5kdWVfZGF0ZTtcbiAgICAgIGNvbnN0IFlFQVIgPSBEVUVfREFURS5zbGljZSgwLCA0KTtcbiAgICAgIGNvbnN0IE1PTlRIID0gRFVFX0RBVEUuc2xpY2UoNSwgNyk7XG4gICAgICBjb25zdCBEQVkgPSBEVUVfREFURS5zbGljZSg4LCAxMCk7XG5cbiAgICAgIGNvbnN0IERJRkZFUkVOQ0UgPSBkaWZmZXJlbmNlSW5EYXlzKFxuICAgICAgICBuZXcgRGF0ZShZRUFSLCBNT05USCAtIDEsIERBWSksXG4gICAgICAgIG5ldyBEYXRlKClcbiAgICAgICk7XG4gICAgICBpZiAoRElGRkVSRU5DRSA9PT0gMCkge1xuICAgICAgICB0YXNrcy5wdXNoKHRhc2spO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdGFza3MubWFwKCh0YXNrKSA9PiB7XG4gICAgUkVOREVSX1RBU0sodGFzaywgVEFTS1NfQ09OVEFJTkVSKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgeyBEVUVfVE9EQVlfSEFORExFUiB9O1xuIiwiaW1wb3J0IHsgUkVNT1ZFX0NVUlJFTlRfR1JPVVAsIFJFTkRFUl9UQVNLIH0gZnJvbSBcIi4uL2RvbS9kb20uanNcIjtcbmltcG9ydCB7IGdyb3VwcyB9IGZyb20gXCIuLi9hcHAuanNcIjtcblxuY29uc3QgSElHSF9QUklPUklUWV9IQU5ETEVSID0gKCkgPT4ge1xuICBSRU1PVkVfQ1VSUkVOVF9HUk9VUCgpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlYWRlclwiKS5pbm5lclRleHQgPSBcIkhpZ2ggUHJpb3JpdHlcIjtcblxuICBjb25zdCBUQVNLU19DT05UQUlORVIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBUQVNLU19DT05UQUlORVIuY2xhc3NMaXN0ID0gXCJ0YXNrc19jb250YWluZXJcIjtcblxuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcIm1haW5cIilbMF0uYXBwZW5kKFRBU0tTX0NPTlRBSU5FUik7XG5cbiAgbGV0IHRhc2tzID0gW107XG4gIGZvciAobGV0IHByb3AgaW4gZ3JvdXBzKSB7XG4gICAgZ3JvdXBzW3Byb3BdLm1hcCgodGFzaykgPT4ge1xuICAgICAgaWYgKHRhc2sucHJpb3JpdHkgPT09IFwiaGlnaFwiKSB7XG4gICAgICAgIHRhc2tzLnB1c2godGFzayk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgdGFza3MubWFwKCh0YXNrKSA9PiB7XG4gICAgUkVOREVSX1RBU0sodGFzaywgVEFTS1NfQ09OVEFJTkVSKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgeyBISUdIX1BSSU9SSVRZX0hBTkRMRVIgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBncm91cHMsIFRhc2sgfSBmcm9tIFwiLi4vYXBwLmpzXCI7XG5pbXBvcnQgeyBSRU5ERVJfTkFWX0JBUl9HUk9VUFMgfSBmcm9tIFwiLi4vZG9tL2RvbS5qc1wiO1xuXG5pZiAod2luZG93LmxvY2FsU3RvcmFnZS5sZW5ndGggPT09IDApIHtcbiAgY29uc3QgU0NIT09MID0gW1wibWF0aFwiLCBcInNjaWVuY2VcIiwgXCJoaXN0b3J5XCJdO1xuICBjb25zdCBHWU0gPSBbXCJjaGVzdFwiLCBcImJhY2tcIiwgXCJsZWdzXCJdO1xuICBjb25zdCBDT0RJTkcgPSBbXCJnaXRcIiwgXCJqYXZhc2NyaXB0XCIsIFwicHl0aG9uXCJdO1xuICBjb25zdCBHUk9DRVJJRVMgPSBbXCJhcHBsZXNcIiwgXCJiYW5hbmFzXCIsIFwibWlsa1wiXTtcblxuICBjb25zdCBERUZBVUxUX0lURVJBVE9SID0gKG5hbWUsIHRhc2tzKSA9PiB7XG4gICAgZ3JvdXBzW25hbWVdID0gW107XG5cbiAgICAvLyA8LWR1ZSBkYXRlLT5cbiAgICBjb25zdCBEQVlTX0RVRV9GUk9NX1RPREFZID0gWzAsIDcsIDE0XTtcbiAgICBjb25zdCBUT0RBWSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgWUVBUiA9IFRPREFZLmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgTU9OVEggPSBUT0RBWS5nZXRNb250aCgpO1xuICAgIGNvbnN0IERBWSA9IFRPREFZLmdldERhdGUoKTtcblxuICAgIC8vIDwtcHJpb3JpdGllcy0+XG4gICAgY29uc3QgUFJJT1JJVFkgPSBbXCJsb3dcIiwgXCJtZWRpdW1cIiwgXCJoaWdoXCJdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIGlmIChpID09PSAyKSB7XG4gICAgICAgIGdyb3Vwc1tuYW1lXS5wdXNoKFxuICAgICAgICAgIG5ldyBUYXNrKFxuICAgICAgICAgICAgdGFza3NbaV0sXG4gICAgICAgICAgICBQUklPUklUWVtpXSxcbiAgICAgICAgICAgIG5ldyBEYXRlKFlFQVIsIE1PTlRILCBEQVkgKyBEQVlTX0RVRV9GUk9NX1RPREFZW2ldKSxcbiAgICAgICAgICAgIFwic2Nyb2xsIHRvIHNlZSB0aGUgcmVzdCBvZiB0aGUgbm90ZVwiXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JvdXBzW25hbWVdLnB1c2goXG4gICAgICAgICAgbmV3IFRhc2soXG4gICAgICAgICAgICB0YXNrc1tpXSxcbiAgICAgICAgICAgIFBSSU9SSVRZW2ldLFxuICAgICAgICAgICAgbmV3IERhdGUoWUVBUiwgTU9OVEgsIERBWSArIERBWVNfRFVFX0ZST01fVE9EQVlbaV0pXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgREVGQVVMVF9JVEVSQVRPUihcInNjaG9vbFwiLCBTQ0hPT0wpO1xuICBERUZBVUxUX0lURVJBVE9SKFwiZ3ltXCIsIEdZTSk7XG4gIERFRkFVTFRfSVRFUkFUT1IoXCJjb2RpbmdcIiwgQ09ESU5HKTtcbiAgREVGQVVMVF9JVEVSQVRPUihcImdyb2Nlcmllc1wiLCBHUk9DRVJJRVMpO1xuXG4gIFJFTkRFUl9OQVZfQkFSX0dST1VQUygpO1xuICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJncm91cHNcIiwgSlNPTi5zdHJpbmdpZnkoZ3JvdXBzKSk7XG5cbiAgY29uc29sZS5sb2coZ3JvdXBzKTtcbn0gZWxzZSB7XG4gIFJFTkRFUl9OQVZfQkFSX0dST1VQUygpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9