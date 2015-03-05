// Initialize CalendarMonth
CalendarMonth.prototype.constructor = CalendarMonth;

// Constants
CalendarMonth.monthsInAYear = 12;
CalendarMonth.min = 1;
CalendarMonth.max = CalendarMonth.min + CalendarMonth.monthsInAYear - 1;
CalendarMonth.minYear = 2013;

/**
 *  CalendarMonth constructor. Throws an exception if the given month or year is invalid.
 *
 *  @param year
 *  @param month
 */
function CalendarMonth(year, month) {
  this.setMonth(month);
  this.setYear(year);
}

/**
 * Compare two given CalendarMonths.
 *   a <  b -> -1
 *   a >  b -> +1
 *   a == b -> 0
 *
 * @param a
 * @param b
 * @returns {number}
 */
CalendarMonth.compare = function(a, b) {
  if (a.getYear() < b.getYear() || (a.getYear() == b.getYear() && a.getMonth() < b.getMonth())) {
    return -1;
  } else if (a.getYear() > b.getYear() || (a.getYear() == b.getYear() && a.getMonth() > b.getMonth())) {
    return 1;
  } else {
    return 0;
  }
};

/**
 * Is this CalendarMonth less than the given CalendarMonth?
 *
 * @param testCalendarMonth
 * @returns {boolean}
 */
CalendarMonth.prototype.isLessThan = function(testCalendarMonth) {
  return CalendarMonth.compare(this, testCalendarMonth) == -1;
};

/**
 * Is this CalendarMonth greater than the given CalendarMonth?
 *
 * @param testCalendarMonth
 * @returns {boolean}
 */
CalendarMonth.prototype.isGreaterThan = function(testCalendarMonth) {
  return CalendarMonth.compare(this, testCalendarMonth) == 1;
};

/**
 * Is this CalendarMonth equal to the given CalendarMonth?
 *
 * @param testCalendarMonth
 * @returns {boolean}
 */
CalendarMonth.prototype.isEqualTo = function(testCalendarMonth) {
  return CalendarMonth.compare(this, testCalendarMonth) == 0;
};


/**
 * Is this CalendarMonth less than of equal to the given CalendarMonth?
 *
 * @param testCalendarMonth
 * @returns {boolean}
 */
CalendarMonth.prototype.isLessThanOrEqualTo = function(testCalendarMonth) {
  return CalendarMonth.compare(this, testCalendarMonth) <= 0;
};

/**
 * Is this CalendarMonth greater than of equal to the given CalendarMonth?
 *
 * @param testCalendarMonth
 * @returns {boolean}
 */
CalendarMonth.prototype.isGreaterThanOrEqualTo = function(testCalendarMonth) {
  return CalendarMonth.compare(this, testCalendarMonth) >= 0;
};


/**
 *  Is the inputted value a valid month. Accepts integers from 1 - 12, everything else is rejected.
 *
 *  @param month
 */
CalendarMonth.validateMonth = function (month) {
  var intRegex = /^\d+$/;
  var isInteger = intRegex.test(month);
  var tooSmall = month < CalendarMonth.min;
  var tooBig = month > CalendarMonth.max;

  if (!isInteger || tooSmall || tooBig) {
    throw 'CalendarMonth must be an integer between ' + CalendarMonth.min + ' and ' + CalendarMonth.max + '.';
  }
};

/**
 *  Is the inputted value a valid year. Accepts integers >= 2013, everything else is rejected.
 *
 *  @param year
 */
CalendarMonth.validateYear = function(year) {
  var intRegex = /^\d+$/;
  var isInteger = intRegex.test(year);
  var tooSmall = year < CalendarMonth.minYear;

  if (!isInteger || tooSmall) {
    throw 'Year must be an integer greater then ' + CalendarMonth.minYear + '.';
  }
};

/**
 * Get this CalendarMonth's month as a number.
 *
 * @returns {Number}
 */
CalendarMonth.prototype.getMonth = function() {
  return parseInt(this.month);
};

/**
 * Set this CalendarMonth's month.
 *
 * @param month
 */
CalendarMonth.prototype.setMonth = function(month) {
  CalendarMonth.validateMonth(month);
  this.month = month;
};

/**
 * Get the name of this month.
 *
 * @returns {String}
 */
CalendarMonth.prototype.name = function() {
  var monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  return monthNames[this.getMonth() - 1];
};

/**
 * Get this CalendarMonth's year as a number.
 *
 * @returns {Number}
 */
CalendarMonth.prototype.getYear = function () {
  return parseInt(this.year);
};

/**
 * Set this CalendarMonth's year.
 *
 * @param year
 */
CalendarMonth.prototype.setYear = function (year) {
  CalendarMonth.validateYear(year);
  this.year = year;
};

/**
 * Add the given number of months to this CalendarMonth.
 *
 * @param numberOfMonths
 * @returns {CalendarMonth}
 */
CalendarMonth.prototype.plusMonths = function (numberOfMonths) {

  var yearsToAdd = Math.floor((this.getMonth() - 1 + numberOfMonths) /
    CalendarMonth.monthsInAYear);
  var newYear = this.getYear() + yearsToAdd;

  var newMonth = this.getMonth() - 1 + numberOfMonths;
  while (newMonth < 0) {
    newMonth += CalendarMonth.monthsInAYear;
  }
  newMonth %= CalendarMonth.monthsInAYear;
  newMonth++;

  return new CalendarMonth(newYear, newMonth);
};

/**
 * Minus the given number of months to this CalendarMonth.
 *
 * @param numberOfMonths
 * @returns {CalendarMonth}
 */
CalendarMonth.prototype.minusMonths = function (numberOfMonths) {
  return this.plusMonths(-numberOfMonths);
};

/**
 * Get the next CalendarMonth (one month after the current).
 *
 * @returns {CalendarMonth}
 */
CalendarMonth.prototype.next = function () {
  return this.plusMonths(1);
};

/**
 * Get the previous CalendarMonth (one month before the current).
 *
 * @returns {CalendarMonth}
 */
CalendarMonth.prototype.previous = function () {
  return this.minusMonths(1);
};

/**
 * Generate an array of CalendarMonth's starting at startCalendarMonth for the given numberOfMonths.
 *
 * @param startCalendarMonth
 * @param numberOfMonths
 * @returns {Array}
 */
CalendarMonth.generateArrayOfCalendarMonths = function (startCalendarMonth, numberOfMonths) {
  var months = [];

  for (var i = 0; i < numberOfMonths; i++) {
    months[i] = startCalendarMonth.plusMonths(i);
  }

  return months;
};

/**
 * Calculate the number of months between the start CalendarMonth and the end CalendarMonth.
 *
 * @param startCalendarMonth
 * @param endCalendarMonth
 * @returns {number}
 */
CalendarMonth.numberOfMonthsBetween = function (startCalendarMonth, endCalendarMonth) {
  var months = (endCalendarMonth.getYear() - startCalendarMonth.getYear()) * CalendarMonth.monthsInAYear;

  months += endCalendarMonth.getMonth() - startCalendarMonth.getMonth();

  return months + 1;
};

/**
 * Initialise a new CalendarMonth for this month.
 *
 * @returns {CalendarMonth}
 */
CalendarMonth.currentMonth = function (){
  return CalendarDay.today().getCalendarMonth();
};

/**
 * Represent this CalendarMonth as a string.
 *
 * @returns {string}
 */
CalendarMonth.prototype.toYearMonthString = function() {
  var divider = arguments[0] == null ? "/" : arguments[0];
  return this.getYear() + divider + this.getMonth();
};

/**
 * Get the number of days in this CalendarMonth.
 *
 * @returns {number}
 */
CalendarMonth.prototype.daysInMonth = function() {
  return new Date(this.getYear(), this.getMonth(), 0).getDate();
};

/**
 * Get the first CalendarDay of this CalendarMonth.
 *
 * @returns {CalendarDay}
 */
CalendarMonth.prototype.firstCalendarDay = function () {
  return new CalendarDay(this, 1);
};

/**
 * Get the last CalendarDay of this CalendarMonth.
 *
 * @returns {CalendarDay}
 */
CalendarMonth.prototype.lastCalendarDay = function () {
  return new CalendarDay(this, this.daysInMonth());
};

/**
 * Calendar day range of days in this month.
 *
 * @returns {CalendarDayRange}
 */
CalendarMonth.prototype.calendarDayRange = function () {
  return new CalendarDayRange(this.firstCalendarDay(), this.lastCalendarDay());
};

/**
 * Get the days in this month.
 *
 * @returns {Array}
 */
CalendarMonth.prototype.days = function () {
  return this.calendarDayRange().getArrayOfAllCalendarDays();
};
