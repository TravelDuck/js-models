CalendarDayRange.prototype.constructor = CalendarDayRange;

/**
 * Constructor - construct a new CalendarDayRange given the start CalendarDay and end CalendarDay.
 *
 * @param startCalendarDay
 * @param endCalendarDay
 * @constructor
 */
function CalendarDayRange(startCalendarDay, endCalendarDay) {
  this.setStartCalendarDay(startCalendarDay);
  this.setEndCalendarDay(endCalendarDay);
}

/**
 * Get the start CalendarDay of this CalendarDayRange.
 *
 * @returns {Amount}
 */
CalendarDayRange.prototype.getStartCalendarDay = function () {
  return this.startCalendarDay;
};

/**
 * Set the start CalendarDay of this CalendarDayRange.
 * @param startCalendarDay
 */
CalendarDayRange.prototype.setStartCalendarDay = function (startCalendarDay) {
  this.startCalendarDay = startCalendarDay;
};

/**
 * Get the end CalendarDay of this CalendarDayRange.
 * @returns {Amount}
 */
CalendarDayRange.prototype.getEndCalendarDay = function () {
  return this.endCalendarDay;
};

/**
 * Set the end CalendarDay of this CalendarDayRange.
 * @param endCalendarDay
 */
CalendarDayRange.prototype.setEndCalendarDay = function (endCalendarDay) {
  this.endCalendarDay = endCalendarDay;
};

/**
 * Is the given testCalendarDay in this CalendarDayRange? (Between start CalendarDay and end CalendarDay)
 *
 * @param testCalendarDay
 * @returns {boolean}
 */
CalendarDayRange.prototype.inRange = function (testCalendarDay) {
  return testCalendarDay.isGreaterThanOrEqualTo(this.getStartCalendarDay()) &&
    testCalendarDay.isLessThanOrEqualTo(this.getEndCalendarDay());
};

/**
 * Get an array containing all CalendarDays between (and including) the start CalendarDay and
 * end CalendarDay of this CalendarDayRange.
 *
 * @returns {Array}
 */
CalendarDayRange.prototype.getArrayOfAllCalendarDays = function () {
  var calendarDays = [];

  if(!this.getStartCalendarDay() || !this.getEndCalendarDay()){
    return calendarDays;
  }

  var currentCalendarDay = this.getStartCalendarDay();
  while (currentCalendarDay.isLessThanOrEqualTo(this.getEndCalendarDay())) {

    calendarDays.push(currentCalendarDay);

    // Next day
    currentCalendarDay = currentCalendarDay.plusDays(1);
  }

  return calendarDays;
};

/**
 * Get an array containing all CalendarDays between (including) the start CalendarDay and
 * (excluding) end CalendarDay of this CalendarDayRange. (Excludes the )
 *
 * @returns {Array}
 */
CalendarDayRange.prototype.getArrayOfAllCalendarDaysExcludingEndCalendarDay = function () {
  var calendarDays = this.getArrayOfAllCalendarDays();
  calendarDays.remove(this.getEndCalendarDay());
  return calendarDays;
};


/**
 * Count the number of days in this CalendarDayRange.
 *
 * @returns {number}
 */
CalendarDayRange.prototype.countDays = function () {
  var start = this.getStartCalendarDay().toDate().getTime();
  var end = this.getEndCalendarDay().toDate().getTime();

  var oneDay = 1000 * 60 * 60 * 24;

  var difference = end - start;

  return Math.round(difference / oneDay) + 1;
};


/**
 * Count the number of nights in this CalendarDayRange.
 *
 * @returns {number}
 */
CalendarDayRange.prototype.countNights = function () {
  return this.countDays() - 1;
};