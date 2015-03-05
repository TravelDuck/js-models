CalendarMonthRange.prototype.constructor = CalendarMonthRange;

/**
 * Constructor - construct a new CalendarMonthRange given the start CalendarMonth and end CalendarMonth.
 *
 * @param startCalendarMonth
 * @param endCalendarMonth
 * @constructor
 */
function CalendarMonthRange(startCalendarMonth, endCalendarMonth) {
  this.setStartCalendarMonth(startCalendarMonth);
  this.setEndCalendarMonth(endCalendarMonth);
}

/**
 * Get the start CalendarMonth of this CalendarMonthRange.
 *
 * @returns {CalendarMonth}
 */
CalendarMonthRange.prototype.getStartCalendarMonth = function () {
  return this.startCalendarMonth;
};

/**
 * Set the start CalendarMonth of this CalendarMonthRange.
 * @param startCalendarMonth
 */
CalendarMonthRange.prototype.setStartCalendarMonth = function (startCalendarMonth) {
  this.startCalendarMonth = startCalendarMonth;
};

/**
 * Get the end CalendarMonth of this CalendarMonthRange.
 * @returns {CalendarMonth}
 */
CalendarMonthRange.prototype.getEndCalendarMonth = function () {
  return this.endCalendarMonth;
};

/**
 * Set the end CalendarMonth of this CalendarMonthRange.
 * @param endCalendarMonth
 */
CalendarMonthRange.prototype.setEndCalendarMonth = function (endCalendarMonth) {
  this.endCalendarMonth = endCalendarMonth;
};

/**
 * Is the given testCalendarMonth in this CalendarMonthRange? (Between start CalendarMonth and end CalendarMonth)
 *
 * @param testCalendarMonth
 * @returns {boolean}
 */
CalendarMonthRange.prototype.inRange = function (testCalendarMonth) {
  return testCalendarMonth.isGreaterThanOrEqualTo(this.getStartCalendarMonth()) &&
    testCalendarMonth.isLessThanOrEqualTo(this.getEndCalendarMonth());
};

/**
 * Get an array containing all CalendarMonths between (and including) the start CalendarMonth and
 * end CalendarMonth of this CalendarMonthRange.
 *
 * @returns {Array}
 */
CalendarMonthRange.prototype.getArrayOfAllCalendarMonths = function () {
  var CalendarMonths = [];

  var currentCalendarMonth = this.getStartCalendarMonth();
  while (currentCalendarMonth.isLessThanOrEqualTo(this.getEndCalendarMonth())) {

    CalendarMonths.push(currentCalendarMonth);

    // Next day
    currentCalendarMonth = currentCalendarMonth.next();
  }

  return CalendarMonths;
};