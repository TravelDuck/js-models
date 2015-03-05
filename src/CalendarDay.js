CalendarDay.prototype.constructor = CalendarDay;

/**
 * Constructor - requires a CalendarMonth and a day number.
 *
 * @constructor
 * @param calendarMonth
 * @param day
 */
function CalendarDay(calendarMonth, day) {
  this.setCalendarMonth(calendarMonth);
  this.setDay(day);
}

/**
 * Compare two given CalendarDays.
 *   a <  b -> -1
 *   a >  b -> +1
 *   a == b -> 0
 *
 * @param a
 * @param b
 * @returns {number}
 */
CalendarDay.compare = function (a, b) {

  // Check for null
  if (!a) {
    return -1;
  }
  if (!b) {
    return 1;
  }

  var aCalendarMonth = a.getCalendarMonth();
  var bCalendarMonth = b.getCalendarMonth();
  var calendarMonthComparison = CalendarMonth.compare(aCalendarMonth, bCalendarMonth);

  if (calendarMonthComparison == 0) {
    if (a.getDay() < b.getDay()) {
      return -1;
    } else if (a.getDay() > b.getDay()) {
      return 1;
    } else {
      return 0;
    }
  } else {
    return calendarMonthComparison;
  }
};

/**
 * Is this CalendarDay less than the given CalendarDay?
 *
 * @param testCalendarDay
 * @returns {boolean}
 */
CalendarDay.prototype.isLessThan = function (testCalendarDay) {
  return CalendarDay.compare(this, testCalendarDay) == -1;
};

/**
 * Is this CalendarDay greater than the given CalendarDay?
 *
 * @param testCalendarDay
 * @returns {boolean}
 */
CalendarDay.prototype.isGreaterThan = function (testCalendarDay) {
  return CalendarDay.compare(this, testCalendarDay) == 1;
};

/**
 * Is this CalendarDay equal to the given CalendarDay?
 *
 * @param testCalendarDay
 * @returns {boolean}
 */
CalendarDay.prototype.isEqualTo = function (testCalendarDay) {
  return CalendarDay.compare(this, testCalendarDay) == 0;
};


/**
 * Is this CalendarDay less than of equal to the given CalendarDay?
 *
 * @param testCalendarDay
 * @returns {boolean}
 */
CalendarDay.prototype.isLessThanOrEqualTo = function (testCalendarDay) {
  return CalendarDay.compare(this, testCalendarDay) <= 0;
};

/**
 * Is this CalendarDay greater than of equal to the given CalendarDay?
 *
 * @param testCalendarDay
 * @returns {boolean}
 */
CalendarDay.prototype.isGreaterThanOrEqualTo = function (testCalendarDay) {
  return CalendarDay.compare(this, testCalendarDay) >= 0;
};


/**
 * Get the CalendarMonth of this CalendarDay.
 *
 * @returns {CalendarMonth}
 */
CalendarDay.prototype.getCalendarMonth = function () {
  return this.calendarMonth;
};

/**
 * Set the CalendarMonth of this CalendarDay.
 *
 * @param calendarMonth
 */
CalendarDay.prototype.setCalendarMonth = function (calendarMonth) {
  this.calendarMonth = calendarMonth;
};

/**
 * Get the day of this CalendarMonth.
 *
 * @returns {Number}
 */
CalendarDay.prototype.getDay = function () {
  return parseInt(this.day);
};

/**
 * Set the day of this CalendarMonth.
 * @param day
 */
CalendarDay.prototype.setDay = function (day) {
  // TODO: Validate that the given day is in the calendarMonth.
  this.day = day;
};


/**
 * Get the month of this CalendarDay.
 *
 * @returns {Number}
 */
CalendarDay.prototype.getMonth = function () {
  return this.getCalendarMonth().getMonth();
};


/**
 * Get the year of tis CalendarDay.
 *
 * @returns {Number}
 */
CalendarDay.prototype.getYear = function () {
  return this.getCalendarMonth().getYear();
};

/**
 * Add the given number of days to this CalendarDay.
 *
 * @param days
 * @returns {CalendarDay}
 */
CalendarDay.prototype.plusDays = function (days) {
  var date = this.toDate();
  date = new Date(date.setDate(date.getDate() + parseInt(days)));
  return CalendarDay.fromDate(date);
};

/**
 * Add the given number of weeks to this CalendarDay.
 *
 * @param weeks
 * @returns {CalendarDay}
 */
CalendarDay.prototype.plusWeeks = function (weeks) {
  return this.plusDays(7 * weeks);
};

/**
 * Subtract the given number of days from this CalendarDay.
 *
 * @param days
 * @returns {CalendarDay}
 */
CalendarDay.prototype.minusDays = function (days) {
  return this.plusDays(-days);
};

/**
 * Subtract the given number of weeks from this CalendarDay.
 *
 * @param weeks
 * @returns {CalendarDay}
 */
CalendarDay.prototype.minusWeeks = function (weeks) {
  return this.minusDays(7 * weeks);
};



CalendarDay.prototype.toDayMonthCodeYear = function () {

  var monthCodes = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  var year = this.getYear();
  var month = this.getMonth();
  var day = this.getDay();

  return day + " " + monthCodes[month - 1] + " " + year;
};



/**
 * Represent this CalendarDay in the format DD/MM/YYYY.
 *
 * @returns {string}
 */
CalendarDay.prototype.toDayMonthYearString = function (divider) {

  // Ensure a divider value exists if one isn't provided.
  divider = divider == null ? "/" : divider;

  var year = this.getYear();
  var month = this.getMonth();
  var day = this.getDay();

  return day + divider + month + divider + year;
};

/**
 * Represent this CalendarDay in the format MM/DD/YYYY.
 *
 * @returns {string}
 */
CalendarDay.prototype.toMonthDayYearString = function () {

  // Ensure a divider value exists if one isn't provided.
  var divider = arguments[0] == null ? "/" : arguments[0];

  var year = this.getYear();
  var month = this.getMonth();
  var day = this.getDay();

  return month + divider + day + divider + year;
};

/**
 * Represent this CalendarDay in the format YYYY/MM/DD.
 *
 * @returns {string}
 */
CalendarDay.prototype.toYearMonthDayString = function () {

  // Ensure a divider value exists if one isn't provided.
  var divider = arguments[0] == null ? "/" : arguments[0];

  return this.getYear() + divider + this.getMonth() + divider + this.getDay();
};

/**
 * Represent this CalendarDay as a Date.
 *
 * @returns {Date}
 */
CalendarDay.prototype.toDate = function () {
  return new Date(this.getYear(), this.getMonth() - 1, this.getDay());
};

/**
 * Initialise a CalendarDay from a Date.
 *
 * @param date
 * @returns {CalendarDay}
 */
CalendarDay.fromDate = function (date) {
  return CalendarDay.fromYearMonthDay(date.getFullYear(), date.getMonth() + 1, date.getDate());
};

/**
 * Initialise a CalendarDay given the year, month and day.
 *
 * @param year
 * @param month
 * @param day
 * @returns {CalendarDay}
 */
CalendarDay.fromYearMonthDay = function (year, month, day) {
  return new CalendarDay(new CalendarMonth(year, month), day);
};

/**
 * Initialise a CalendarDay given the date as a string of the format YYYY/MM/DD.
 *
 * @param string
 * @returns {CalendarDay}
 */
CalendarDay.fromYearMonthDayString = function (string) {

  // Ensure a divider value exists if one isn't provided.
  var divider = arguments[1] == null ? "/" : arguments[1];

  var parts = string.split(divider);
  return CalendarDay.fromYearMonthDay(parts[0], parts[1], parts[2]);
};

/**
 * Initialise a CalendarDay given the date as a string of the format MM/DD/YYYY.
 *
 * @param string
 * @param divider
 * @returns {CalendarDay}
 */
CalendarDay.fromMonthDayYearString = function (string, divider) {

  // Ensure a divider value exists if one isn't provided.
  divider = divider == null ? "/" : divider;

  var parts = string.split(divider);
  return CalendarDay.fromYearMonthDay(parts[2], parts[0], parts[1]);
};

/**
 * Initialise a CalendarDay given the date as a string of the format DD/MM/YYYY.
 *
 * @param string
 * @param divider
 * @returns {CalendarDay}
 */
CalendarDay.fromDayMonthYearString = function (string, divider) {

  // Ensure a divider value exists if one isn't provided.
  divider = divider == null ? "/" : divider;

  var parts = string.split(divider);
  return CalendarDay.fromYearMonthDay(parts[2], parts[1], parts[0]);
};

/**
 * Initialise a new CalendarDay with today's date.
 *
 * @returns {CalendarDay}
 */
CalendarDay.today = function () {
  return CalendarDay.fromDate(new Date());
};

/**
 * Get the day of the week of this calendar day.
 *
 * @returns {DayOfWeek}
 */
CalendarDay.prototype.dayOfWeek = function () {
  return new DayOfWeek(this.toDate().getDay());
};