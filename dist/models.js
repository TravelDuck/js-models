Amount.prototype.constructor = Amount;

/**
 * Constructor - requires a CalendarMonth and a day number.
 *
 * @constructor
 * @param value
 * @param currency
 */
function Amount(value, currency) {
  this.setValue(value);
  this.setCurrency(currency);
}


/**
 * Validate a given currency.
 *
 * @param currency
 */
Amount.validateCurrency = function(currency) {
  var allowedCurrencies = ["GBP"];

  if(!allowedCurrencies.contains(currency)) {
    throw "Invalid currency '" + currency + "'.";
  }
};

/**
 * Get the value of this Amount.
 *
 * @returns {number}
 */
Amount.prototype.getValue = function() {
  return this.value;
};


/**
 * Set the value of this Amount.
 *
 * @param value
 */
Amount.prototype.setValue = function(value) {
  this.value = value;
};

/**
 * Get the currency of this Amount.
 *
 * @returns {string}
 */
Amount.prototype.getCurrency = function() {
  return this.currency;
};

/**
 * Set the currency of this Amount.
 *
 * @param currency
 */
Amount.prototype.setCurrency = function(currency) {
  this.currency = currency;
};

Amount.prototype.symbol = function() {
  if(this.getCurrency() == "GBP") {
    return "&pound;";
  } else if(this.getCurrency() == "EUR") {
    return "&euro;";
  } else if(this.getCurrency() == "USD") {
    return "&#36;";
  } else {
    return null;
  }
};
/**
 * Are two given elements equal?
 *
 * @param e1
 * @param e2
 * @returns {boolean}
 */
Array.elementsAreEqual = function (e1, e2) {

  // Optional parameter - enforce elements are exactly equal.
  var exact = arguments[2] == null ? false : arguments[2];


  // Must be an exact match
  if (exact) {
    return e1 === e2;

    // More flexible match
  } else {

    // Should be of the same type to be considered
    if (typeof e1 == typeof e2) {

      // If current element provides an equal to function... use that.
      if (e1.isEqualTo) {
        return e1.isEqualTo(e2);
      }
    }

    // General comparison
    if(e1 == e2){
      return true;
    }

    return +e1 == +e2;
  }

};


/**
 * Does this array contain the given element e?
 *
 * @param e
 * @returns {boolean}
 */
Array.prototype.contains = function (e) {

  var exact = arguments[1] == null ? false : arguments[1];

  var i = this.length;
  while (i--) {

    if(Array.elementsAreEqual(this[i], e, exact)){
      return true;
    }
  }
  return false;
};

/**
 * Make every element in this array unique - remove duplicates.
 *
 * @returns {Array}
 */
Array.prototype.unique = function () {

  var unique = [];

  this.forEach(function(value) {
    if(!unique.contains(value)){
      unique.push(value);
    }
  });

  return unique;
};

/**
 * Remove an occurrences of obj in this Array. The exact flag states if the match must be exact or equivalent.
 *
 * @param e
 */
Array.prototype.remove = function (e) {

  var exact = arguments[1] == null ? false : arguments[1];


  var i = this.length;
  while (i--) {

    if(Array.elementsAreEqual(this[i], e, exact)){
      return this.splice(i, 1);
    }
  }

  // Nothing removed
  return this.splice(i, 1);
};

/**
 * Remove all occurrences of element e in this Array. The exact flag states if the match must be exact or equivalent.
 *
 * @param e
 */
Array.prototype.removeAll = function (e) {

  do {
    var lengthBeforeRemoval = this.length;
    this.remove(e);
    var lengthAfterRemoval = this.length;
  } while(lengthBeforeRemoval > lengthAfterRemoval);

};

/**
 * Subtract the given array a from this array.
 *
 * @param a
 * @returns {Array}
 */
Array.prototype.subtract = function (a) {
  var b = this;
  a.forEach(function (value) {
    if (b.contains(value)) {
      b.remove(value);
    }
  });

  return b;
};

/**
 * Clone this array.
 *
 * @returns {Array}
 */
Array.prototype.clone = function () {
  return this.slice(0);
};
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
  var calendarMonths = [];

  var currentCalendarMonth = this.getStartCalendarMonth();
  while (currentCalendarMonth.isLessThanOrEqualTo(this.getEndCalendarMonth())) {

    calendarMonths.push(currentCalendarMonth);

    // Next day
    currentCalendarMonth = currentCalendarMonth.next();
  }

  return calendarMonths;
};


/**
 * Convert this CalendarMonthRange to a CalendarDayRange.
 * i.e -> first CalendarDay of the start CalendarMonth ...to... last CalendarDay of end CalendarMonth.
 *
 * @returns {CalendarDayRange}
 */
CalendarMonthRange.prototype.toCalendarDayRange = function () {
  var firstCalendarMonth = this.getStartCalendarMonth();
  var lastCalendarMonth = this.getEndCalendarMonth();

  var firstCalendarDay = firstCalendarMonth.firstCalendarDay();
  var lastCalendarDay = lastCalendarMonth.lastCalendarDay();

  return new CalendarDayRange(firstCalendarDay, lastCalendarDay);
};


/**
 * Get an array containing all CalendarDays between (and including) the start CalendarMonth (first CalendarDay) and
 * end CalendarMonth (last CalendarDay) of this CalendarMonthRange.
 *
 * @returns {Array}
 */
CalendarMonthRange.prototype.getArrayOfAllCalendarDays = function () {
  var calendarDayRange = this.toCalendarDayRange();
  return calendarDayRange.getArrayOfAllCalendarDays();
};
DayOfWeek.prototype.constructor = DayOfWeek;


function DayOfWeek(number) {
  this.setNumber(number);
}

DayOfWeek.prototype.name = function () {
  var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return weekday[this.getNumber()];
};

DayOfWeek.prototype.twoLetterName = function () {
  return this.name().substr(0, 2);
};

DayOfWeek.prototype.getNumber = function() {
  return this.number;
};

DayOfWeek.prototype.setNumber = function(number) {
  this.number = number;
};

DayOfWeek.prototype.next = function() {
  return new DayOfWeek((this.getNumber() + 1) % 7);
};

DayOfWeek.prototype.previous = function() {
  return new DayOfWeek((this.getNumber() + 6) % 7);
};
TravelDuck_AvailabilityCalendar.prototype.constructor = TravelDuck_AvailabilityCalendar;

/**
 * Enum of modes a calendar can be in.
 *
 * @type {{DISPLAY: number, SELECT_START: number, SELECT_END: number}}
 */
TravelDuck_AvailabilityCalendar.Modes = {
  DISPLAY: 0,
  SELECT_START: 1,
  SELECT_END: 2
};

/**
 * Enum of change over days.
 *
 * @type {{MONDAY: number, TUESDAY: number, WEDNESDAY: number, THURSDAY: number, FRIDAY: number, SATURDAY: number, SUNDAY: number}}
 */
TravelDuck_AvailabilityCalendar.ChangeOverDays = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7
};

/**
 * Get the default settings of this calendar.
 */
TravelDuck_AvailabilityCalendar.DefaultSettings = function () {

  return {

    /** The central (pivot) month of this AvailabilityCalendar */
    centralCalendarMonth: CalendarMonth.currentMonth(),

    /** The number of months to display to the left / right of the central month */
    monthsToDisplayToLeft: 0,
    monthsToDisplayToRight: 0,

    /** The number of additional months to buffer (load availability) to the left / right of the central month */
    monthsToBufferToLeft: 2,
    monthsToBufferToRight: 2,

    changeOverDay: TravelDuck_AvailabilityCalendar.ChangeOverDays.SATURDAY,
    mode: TravelDuck_AvailabilityCalendar.Modes.DISPLAY,

    numberOfAdults: 1,
    numberOfChildren: 0,
    numberOfInfants: 0,
    numberOfPets: 0
  }
};


/**
 * Get the default functions of this calendar.
 */
TravelDuck_AvailabilityCalendar.DefaultFunctions = function () {
  return {

    /*
     * Update availability.
     */
    onUpdateAvailabilityStart: function () {
    },
    onUpdateAvailabilityComplete: function () {
    },
    onUpdateAvailabilityError: function () {
    },

    /*
     * Update calculated Amount.
     */
    onUpdateCalculatedAmountStart: function () {
    },
    onUpdateCalculatedAmountComplete: function () {
    },
    onUpdateCalculatedAmountError: function () {
    },
    onCalculatedAmountChange: function (amount) {
    },
    onCalculatedAmountReset: function () {
    },

    /*
     * Selected CalendarDayRange.
     */
    onSelectedCalendarDayRangeStartCalendarDayChange: function () {
    },
    onSelectedCalendarDayRangeStartCalendarDayReset: function () {
    },
    onSelectedCalendarDayRangeEndCalendarDayChange: function () {
    },
    onSelectedCalendarDayRangeEndCalendarDayReset: function () {
    },
    onSelectedCalendarDayRangeChange: function () {
    },
    onSelectedCalendarDayRangeReset: function () {
    },

    /*
     * Highlighted CalendarDayRange.
     */
    onHighlightedCalendarDayRangeStartCalendarDayChange: function () {
    },
    onHighlightedCalendarDayRangeStartCalendarDayReset: function () {
    },
    onHighlightedCalendarDayRangeEndCalendarDayChange: function () {
    },
    onHighlightedCalendarDayRangeEndCalendarDayReset: function () {
    },
    onHighlightedCalendarDayRangeChange: function () {
    },
    onHighlightedCalendarDayRangeReset: function () {
    }
  }
};


/**
 * Constructor
 *
 * @param displayElement
 * @param property
 * @param customSettings
 * @param customFunctions
 */
function TravelDuck_AvailabilityCalendar(displayElement, property, customSettings, customFunctions) {

  // Required settings
  this.setDisplayElement(displayElement);
  this.setProperty(property);

  // Generate settings to be used
  this.setSettings($.extend(
    {},
    TravelDuck_AvailabilityCalendar.DefaultSettings(),
    customSettings
  ));

  // Generate functions to be used
  this.setEventFunctions($.extend(
    {},
    TravelDuck_AvailabilityCalendar.DefaultFunctions(),
    customFunctions
  ));

  // Reset selected and highlighted ranges.
  this.resetSelectedCalendarDayRange();
  this.resetHighlightedCalendarDayRange();

  // Reset availability, state and colourings.
  this.resetAvailabilityAccordingToServer();
  this.resetCalendarDayStates();
  this.resetCalendarDayColourings();

  // Draw the calendar.
  this.draw();

  // Fetch availability.
  this.refresh();
}


/***********************************************************************************************************************
 * Getters and Setters
 **********************************************************************************************************************/


TravelDuck_AvailabilityCalendar.prototype.getNumberOfAdults = function () {
  return this.getSettings().numberOfAdults;
};

TravelDuck_AvailabilityCalendar.prototype.setNumberOfAdults = function (numberOfAdults) {
  this.getSettings().numberOfAdults = numberOfAdults;
  this.refreshCalculatedAmount();
};

TravelDuck_AvailabilityCalendar.prototype.getNumberOfChildren = function () {
  return this.getSettings().numberOfChildren;
};

TravelDuck_AvailabilityCalendar.prototype.setNumberOfChildren = function (numberOfChildren) {
  this.getSettings().numberOfChildren = numberOfChildren;
  this.refreshCalculatedAmount();
};

TravelDuck_AvailabilityCalendar.prototype.getNumberOfInfants = function () {
  return this.getSettings().numberOfInfants;
};

TravelDuck_AvailabilityCalendar.prototype.setNumberOfInfants = function (numberOfInfants) {
  this.getSettings().numberOfInfants = numberOfInfants;
  this.refreshCalculatedAmount();
};

TravelDuck_AvailabilityCalendar.prototype.getNumberOfPets = function () {
  return this.getSettings().numberOfPets;
};

TravelDuck_AvailabilityCalendar.prototype.setNumberOfPets = function (numberOfPets) {
  this.getSettings().numberOfPets = numberOfPets;
  this.refreshCalculatedAmount();
};




/**
 * Get the element used to display this AvailabilityCalendar.
 *
 * @returns {*}
 */
TravelDuck_AvailabilityCalendar.prototype.getDisplayElement = function () {
  return this.displayElement;
};

/**
 * Set the element used to display this AvailabilityCalendar.
 *
 * @param displayElement
 */
TravelDuck_AvailabilityCalendar.prototype.setDisplayElement = function (displayElement) {
  this.displayElement = displayElement;
};

/**
 * Get the property which this calendar displays the availability of.
 *
 * @return  TravelDuck_Property
 */
TravelDuck_AvailabilityCalendar.prototype.getProperty = function () {
  return this.property;
};

/**
 * Set the property which this calendar displays the availability of.
 *
 * @param property
 */
TravelDuck_AvailabilityCalendar.prototype.setProperty = function (property) {
  this.property = property;
};

/**
 * Get the settings this AvailabilityCalendar should use.
 *
 * @returns {*}
 */
TravelDuck_AvailabilityCalendar.prototype.getSettings = function () {
  return this.settings;
};

/**
 * Set the settings this AvailabilityCalendar should use.
 *
 * @param settings
 */
TravelDuck_AvailabilityCalendar.prototype.setSettings = function (settings) {
  this.settings = settings;
};

/**
 * Get the event functions this AvailabilityCalendar should use.
 *
 * @returns {*}
 */
TravelDuck_AvailabilityCalendar.prototype.getEventFunctions = function () {
  return this.functions;
};

/**
 * Set the event function this AvailabilityCalendar should use.
 *
 * @param functions
 */
TravelDuck_AvailabilityCalendar.prototype.setEventFunctions = function (functions) {
  this.functions = functions;
};


/**
 * Get the start CalendarDay of the selected CalendarDayRange of this AvailabilityCalendar.
 *
 * @returns {CalendarDayRange}
 */
TravelDuck_AvailabilityCalendar.prototype.getSelectedCalendarDayRangeStartCalendarDay = function () {
  return this.selectedCalendarDayRangeStartCalendarDay;
};

/**
 * Set the start CalendarDay of the selected CalendarDayRange of this AvailabilityCalendar.
 *
 * @param startCalendarDay
 */
TravelDuck_AvailabilityCalendar.prototype.setSelectedCalendarDayRangeStartCalendarDay = function (startCalendarDay) {
  this.selectedCalendarDayRangeStartCalendarDay = startCalendarDay;

  // Trigger change selected CalendarDayRange start CalendarDay event.
  this.getEventFunctions().onSelectedCalendarDayRangeStartCalendarDayChange();

  // Trigger selected CalendarDayRange change.
  if (this.getSelectedCalendarDayRangeEndCalendarDay()) {
    this.selectedCalendarDayRangeChanged();
  }
};

/**
 * Reset the start CalendarDay of the selected CalendarDayRange of this AvailabilityCalendar.
 */
TravelDuck_AvailabilityCalendar.prototype.resetSelectedCalendarDayRangeStartCalendarDay = function () {
  this.selectedCalendarDayRangeStartCalendarDay = null;

  // Trigger reset selected CalendarDayRange start CalendarDay event.
  var suppressEventTrigger = arguments[0];
  if (!suppressEventTrigger) {
    this.getEventFunctions().onSelectedCalendarDayRangeStartCalendarDayReset();
  }

  // Trigger selected CalendarDayRange change.
  if (this.getSelectedCalendarDayRangeEndCalendarDay()) {
    this.selectedCalendarDayRangeChanged();
  }
};

/**
 * Get the end CalendarDay of the selected CalendarDayRange of this AvailabilityCalendar.
 *
 * @returns {CalendarDayRange}
 */
TravelDuck_AvailabilityCalendar.prototype.getSelectedCalendarDayRangeEndCalendarDay = function () {
  return this.selectedCalendarDayRangeEndCalendarDay;
};

/**
 * Set the end CalendarDay of the selected CalendarDayRange of this AvailabilityCalendar.
 *
 * @param endCalendarDay
 */
TravelDuck_AvailabilityCalendar.prototype.setSelectedCalendarDayRangeEndCalendarDay = function (endCalendarDay) {
  this.selectedCalendarDayRangeEndCalendarDay = endCalendarDay;

  // Trigger change selected CalendarDayRange end CalendarDay event.
  this.getEventFunctions().onSelectedCalendarDayRangeEndCalendarDayChange();

  // Trigger selected CalendarDayRange change.
  if (this.getSelectedCalendarDayRangeStartCalendarDay()) {
    this.selectedCalendarDayRangeChanged();
  }
};

/**
 * Reset the end CalendarDay of the selected CalendarDayRange of this AvailabilityCalendar.
 */
TravelDuck_AvailabilityCalendar.prototype.resetSelectedCalendarDayRangeEndCalendarDay = function () {
  this.selectedCalendarDayRangeEndCalendarDay = null;

  // Trigger reset selected CalendarDayRange end CalendarDay event.
  var suppressEventTrigger = arguments[0];
  if (!suppressEventTrigger) {
    this.getEventFunctions().onSelectedCalendarDayRangeEndCalendarDayReset();
  }

  // Trigger selected CalendarDayRange change.
  if (this.getSelectedCalendarDayRangeStartCalendarDay()) {
    this.selectedCalendarDayRangeChanged();
  }
};

/**
 * Get the selected CalendarDayRange of this AvailabilityCalendar.
 *
 * @returns {CalendarDayRange}
 */
TravelDuck_AvailabilityCalendar.prototype.getSelectedCalendarDayRange = function () {

  // Return null if incomplete range.
  if (!this.getSelectedCalendarDayRangeStartCalendarDay() || !this.getSelectedCalendarDayRangeEndCalendarDay()) {
    return null;
  }

  return new CalendarDayRange(
    this.getSelectedCalendarDayRangeStartCalendarDay(), this.getSelectedCalendarDayRangeEndCalendarDay()
  );
};

/**
 * Set the selected CalendarDayRange of this AvailabilityCalendar.
 *
 * @param calendarDayRange
 */
TravelDuck_AvailabilityCalendar.prototype.setSelectedCalendarDayRange = function (calendarDayRange) {

  // Reset the selected CalendarDayRange start and end CalendarDays - suppress event triggers.
  var suppressResetEventTriggers = true;
  this.resetSelectedCalendarDayRangeStartCalendarDay(suppressResetEventTriggers);
  this.resetSelectedCalendarDayRangeEndCalendarDay(suppressResetEventTriggers);

  this.setSelectedCalendarDayRangeStartCalendarDay(calendarDayRange.getStartCalendarDay());
  this.setSelectedCalendarDayRangeEndCalendarDay(calendarDayRange.getEndCalendarDay());
};

/**
 * Reset the selected CalendarDayRange of this AvailabilityCalendar.
 */
TravelDuck_AvailabilityCalendar.prototype.resetSelectedCalendarDayRange = function () {
  this.resetSelectedCalendarDayRangeStartCalendarDay();
  this.resetSelectedCalendarDayRangeEndCalendarDay();

  // Trigger reset selected CalendarDayRange event.
  var suppressEventTrigger = arguments[0];
  if (!suppressEventTrigger) {
    this.getEventFunctions().onSelectedCalendarDayRangeReset();
  }
};


/**
 * This function is called when the selected CalendarDayRange is changed.
 */
TravelDuck_AvailabilityCalendar.prototype.selectedCalendarDayRangeChanged = function () {

  // Trigger event function.
  this.getEventFunctions().onSelectedCalendarDayRangeChange();

  this.refreshCalculatedAmount();
};

/**
 * Get the start CalendarDay of the highlighted CalendarDayRange of this AvailabilityCalendar.
 *
 * @returns {CalendarDayRange}
 */
TravelDuck_AvailabilityCalendar.prototype.getHighlightedCalendarDayRangeStartCalendarDay = function () {
  return this.highlightedCalendarDayRangeStartCalendarDay;
};

/**
 * Set the start CalendarDay of the highlighted CalendarDayRange of this AvailabilityCalendar.
 *
 * @param startCalendarDay
 */
TravelDuck_AvailabilityCalendar.prototype.setHighlightedCalendarDayRangeStartCalendarDay = function (startCalendarDay) {
  this.highlightedCalendarDayRangeStartCalendarDay = startCalendarDay;

  // Trigger change highlighted CalendarDayRange start CalendarDay event.
  this.getEventFunctions().onHighlightedCalendarDayRangeStartCalendarDayChange();

  // Trigger highlighted CalendarDayRange change.
  if (this.getHighlightedCalendarDayRangeEndCalendarDay()) {
    this.highlightedCalendarDayRangeChanged();
  }
};

/**
 * Reset the start CalendarDay of the highlighted CalendarDayRange of this AvailabilityCalendar.
 */
TravelDuck_AvailabilityCalendar.prototype.resetHighlightedCalendarDayRangeStartCalendarDay = function () {
  this.highlightedCalendarDayRangeStartCalendarDay = null;

  // Trigger reset highlighted CalendarDayRange start CalendarDay event.
  var suppressEventTrigger = arguments[0];
  if (!suppressEventTrigger) {
    this.getEventFunctions().onHighlightedCalendarDayRangeStartCalendarDayReset();
  }

  // Trigger highlighted CalendarDayRange change.
  if (this.getHighlightedCalendarDayRangeEndCalendarDay()) {
    this.highlightedCalendarDayRangeChanged();
  }
};

/**
 * Get the end CalendarDay of the highlighted CalendarDayRange of this AvailabilityCalendar.
 *
 * @returns {CalendarDayRange}
 */
TravelDuck_AvailabilityCalendar.prototype.getHighlightedCalendarDayRangeEndCalendarDay = function () {
  return this.highlightedCalendarDayRangeEndCalendarDay;
};

/**
 * Set the end CalendarDay of the highlighted CalendarDayRange of this AvailabilityCalendar.
 *
 * @param endCalendarDay
 */
TravelDuck_AvailabilityCalendar.prototype.setHighlightedCalendarDayRangeEndCalendarDay = function (endCalendarDay) {
  this.highlightedCalendarDayRangeEndCalendarDay = endCalendarDay;

  // Trigger change highlighted CalendarDayRange end CalendarDay event.
  this.getEventFunctions().onHighlightedCalendarDayRangeEndCalendarDayChange();

  // Trigger highlighted CalendarDayRange change.
  if (this.getHighlightedCalendarDayRangeStartCalendarDay()) {
    this.highlightedCalendarDayRangeChanged();
  }
};

/**
 * Reset the end CalendarDay of the highlighted CalendarDayRange of this AvailabilityCalendar.
 */
TravelDuck_AvailabilityCalendar.prototype.resetHighlightedCalendarDayRangeEndCalendarDay = function () {
  this.highlightedCalendarDayRangeEndCalendarDay = null;

  // Trigger reset highlighted CalendarDayRange end CalendarDay event.
  var suppressEventTrigger = arguments[0];
  if (!suppressEventTrigger) {
    this.getEventFunctions().onHighlightedCalendarDayRangeEndCalendarDayReset();
  }

  // Trigger highlighted CalendarDayRange change.
  if (this.getHighlightedCalendarDayRangeStartCalendarDay()) {
    this.highlightedCalendarDayRangeChanged();
  }
};

/**
 * Get the highlighted CalendarDayRange of this AvailabilityCalendar.
 *
 * @returns {CalendarDayRange}
 */
TravelDuck_AvailabilityCalendar.prototype.getHighlightedCalendarDayRange = function () {

  // Return null if incomplete range.
  if (!this.getHighlightedCalendarDayRangeStartCalendarDay() || !this.getHighlightedCalendarDayRangeEndCalendarDay()) {
    return null;
  }

  return new CalendarDayRange(
    this.getHighlightedCalendarDayRangeStartCalendarDay(), this.getHighlightedCalendarDayRangeEndCalendarDay()
  );
};

/**
 * Set the highlighted CalendarDayRange of this AvailabilityCalendar.
 */
TravelDuck_AvailabilityCalendar.prototype.setHighlightedCalendarDayRange = function (calendarDayRange) {

  // Reset the highlighted CalendarDayRange start and end CalendarDays - suppress event triggers.
  var suppressResetEventTriggers = true;
  this.resetHighlightedCalendarDayRangeStartCalendarDay(suppressResetEventTriggers);
  this.resetHighlightedCalendarDayRangeEndCalendarDay(suppressResetEventTriggers);

  this.setHighlightedCalendarDayRangeStartCalendarDay(calendarDayRange.getStartCalendarDay());
  this.setHighlightedCalendarDayRangeEndCalendarDay(calendarDayRange.getEndCalendarDay());
};

/**
 * Reset the highlighted CalendarDayRange of this AvailabilityCalendar.
 */
TravelDuck_AvailabilityCalendar.prototype.resetHighlightedCalendarDayRange = function () {
  this.resetHighlightedCalendarDayRangeStartCalendarDay();
  this.resetHighlightedCalendarDayRangeEndCalendarDay();

  // Trigger reset highlighted CalendarDayRange event.
  var suppressEventTrigger = arguments[0];
  if (!suppressEventTrigger) {
    this.getEventFunctions().onHighlightedCalendarDayRangeReset();
  }
};

/**
 * This function is called when the highlighted CalendarDayRange is changed.
 */
TravelDuck_AvailabilityCalendar.prototype.highlightedCalendarDayRangeChanged = function () {

  // Trigger event function.
  this.getEventFunctions().onHighlightedCalendarDayRangeChange();

};

/**
 * Get the calculated Amount for the selected CalendarDayRange according to the server.
 *
 * @returns {Amount}
 */
TravelDuck_AvailabilityCalendar.prototype.getCalculatedAmountAccordingToServer = function () {
  return this.calculatedAmount;
};


/**
 * Refresh the calculated amount - if appropriate
 */
TravelDuck_AvailabilityCalendar.prototype.refreshCalculatedAmount = function () {
  // Only load amount from server when we have a valid range.
  if (this.getSelectedCalendarDayRange()) {
    this.loadCalculatedAmountAccordingToServer(function () {

    }, function () {

    });
  }
};

/**
 * Set the calculated Amount for the selected CalendarDayRange according to the server.
 *
 * @param calculatedAmount
 */
TravelDuck_AvailabilityCalendar.prototype.setCalculatedAmountAccordingToServer = function (calculatedAmount) {
  this.calculatedAmount = calculatedAmount;

  // Trigger calculated Amount changed event.
  this.getEventFunctions().onCalculatedAmountChange(calculatedAmount);
};

/**
 * Reset the calculated Amount for the selected CalendarDayRange according to the server (make null).
 */
TravelDuck_AvailabilityCalendar.prototype.resetCalculatedAmountAccordingToServer = function () {
  this.calculatedAmount = null;

  // Trigger calculated Amount reset event.
  this.getEventFunctions().onCalculatedAmountReset();
};


/***********************************************************************************************************************
 * Calculations
 **********************************************************************************************************************/

/**
 * Calculate the number of months this AvailabilityCalendar should display. (>= 1)
 * Assumes at least 1 month will be displayed (acts as pivot point) with months to be displayed to the left and the
 * right of the pivot month.
 *
 * @returns {number}
 */
TravelDuck_AvailabilityCalendar.prototype.calculateNumberOfMonthsToDisplay = function () {
  var monthsToDisplayToLeft = parseInt(this.getSettings().monthsToDisplayToLeft);
  var monthsToDisplayToRight = parseInt(this.getSettings().monthsToDisplayToRight);
  return monthsToDisplayToLeft + monthsToDisplayToRight + 1;
};

/**
 * Get the number of months this calendar will load from the server.
 *
 * @return  number
 */
TravelDuck_AvailabilityCalendar.prototype.getNumberOfMonthsToLoad = function () {
  var monthsToLeft = parseInt(this.getSettings().monthsToDisplayToLeft);
  var monthsToRight = parseInt(this.getSettings().monthsToDisplayToRight);
  return monthsToLeft + monthsToRight + 5;
};

/**
 * Get the first CalendarMonth (left most) to be displayed.
 *
 * @returns {CalendarMonth}
 */
TravelDuck_AvailabilityCalendar.prototype.firstCalendarMonthToDisplay = function () {
  var mainCalendarMonth = this.getSettings().centralCalendarMonth;
  var monthsToDisplayToLeft = this.getSettings().monthsToDisplayToLeft;
  return mainCalendarMonth.minusMonths(monthsToDisplayToLeft);
};

/**
 * Get the last CalendarMonth (right most) to be displayed.
 *
 * @returns {CalendarMonth}
 */
TravelDuck_AvailabilityCalendar.prototype.lastCalendarMonthToDisplay = function () {
  var mainCalendarMonth = this.getSettings().centralCalendarMonth;
  var monthsToRight = this.getSettings().monthsToDisplayToRight;
  return mainCalendarMonth.plusMonths(monthsToRight);
};

/**
 * Get the CalendarMonthRange to display the availability for.
 *
 * @returns {CalendarMonthRange}
 */
TravelDuck_AvailabilityCalendar.prototype.calendarMonthRangeToLoad = function () {
  return new CalendarMonthRange(this.firstCalendarMonthToDisplay(), this.lastCalendarMonthToDisplay());
};

/**
 * Get the first CalendarMonth to load the availability for.
 *
 * @returns {CalendarMonth}
 */
TravelDuck_AvailabilityCalendar.prototype.firstCalendarMonthToLoad = function () {
  var mainCalendarMonth = this.getSettings().centralCalendarMonth;
  var monthsToLeft = this.getSettings().monthsToDisplayToLeft;
  return mainCalendarMonth.minusMonths(monthsToLeft + 2);
};

/**
 * Get the last CalendarMonth to load the availability for.
 *
 * @returns {CalendarMonth}
 */
TravelDuck_AvailabilityCalendar.prototype.lastCalendarMonthToLoad = function () {
  var mainCalendarMonth = this.getSettings().centralCalendarMonth;
  var monthsToRight = this.getSettings().monthsToDisplayToRight;
  return mainCalendarMonth.plusMonths(monthsToRight + 2);
};

/**
 * Get the CalendarMonthRange to load the availability for.
 *
 * @returns {CalendarMonthRange}
 */
TravelDuck_AvailabilityCalendar.prototype.calendarMonthRangeToLoad = function () {
  return new CalendarMonthRange(this.firstCalendarMonthToLoad(), this.lastCalendarMonthToLoad());
};

/**
 * Get the greatest Calendar it is possible to select.
 *
 * @returns {CalendarDay}
 */
TravelDuck_AvailabilityCalendar.prototype.greatestSelectableCalendarDay = function () {

  var $this = this;

  if (!$this.getSelectedCalendarDayRangeStartCalendarDay()) {
    return null;
  }

  var greatestSelectableDay = null;

  // Find the first unavailable after the selected day.
  this.unavailableAccordingToServerCalendarDays.forEach(function (calendarDay) {
    if (calendarDay.isGreaterThan($this.getSelectedCalendarDayRangeStartCalendarDay())) {

      if (!greatestSelectableDay) {
        greatestSelectableDay = calendarDay;
      }

      if (calendarDay.isLessThan(greatestSelectableDay)) {
        greatestSelectableDay = calendarDay;
      }

    }
  });

  // No Unavailable day - Limit by greatest available day.
  if (!greatestSelectableDay) {
    greatestSelectableDay = $this.getSelectedCalendarDayRangeStartCalendarDay();

    this.availableAccordingToServerCalendarDays.forEach(function (calendarDay) {
      if (calendarDay.isGreaterThan(greatestSelectableDay)) {
        greatestSelectableDay = calendarDay;
      }
    });

    greatestSelectableDay = greatestSelectableDay.plusDays(1);
  }


  return greatestSelectableDay;
};


/***********************************************************************************************************************
 * Availability and colouring
 **********************************************************************************************************************/

/**
 * Reset the availability according to the server.
 */
TravelDuck_AvailabilityCalendar.prototype.resetAvailabilityAccordingToServer = function () {
  this.availableAccordingToServerCalendarDays = [];
  this.unavailableAccordingToServerCalendarDays = [];
};

/**
 * Load the availability according to the server.
 *
 * @param successCallback
 * @param failureCallback
 */
TravelDuck_AvailabilityCalendar.prototype.
  loadAvailabilityAccordingToServer = function (successCallback, failureCallback) {

  // Ensure success and failure callbacks exist
  successCallback = !successCallback ? function () {
  } : successCallback;
  failureCallback = !failureCallback ? function () {
  } : failureCallback;

  var $this = this;

  // Load the availability
  var property = this.getProperty();
  property.availability(this.calendarMonthRangeToLoad(), function (availability) {

    // --------------------------------------------
    // Availability successfully loaded from server
    // --------------------------------------------

    // Clear previous availability once we have the new availability.
    $this.resetAvailabilityAccordingToServer();

    //noinspection JSUnresolvedVariable
    $this.availableAccordingToServerCalendarDays = availability.available;
    //noinspection JSUnresolvedVariable
    $this.unavailableAccordingToServerCalendarDays = availability.unavailable;

    // Availability was successfully loaded - processing errors may have occurred (check log).
    successCallback();

  }, failureCallback);
};

/**
 * Reset the CalendarDay states. That is, no days are considered available, unavailable, selected or highlighted.
 */
TravelDuck_AvailabilityCalendar.prototype.resetCalendarDayStates = function () {

  this.allAvailableCalendarDays = [];

  this.availableCalendarDays = [];
  this.unavailableCalendarDays = [];
  this.selectedCalendarDays = [];
  this.highlightedCalendarDays = [];
};

/**
 * Generate the state which each calendar day should be considered to have.
 */
TravelDuck_AvailabilityCalendar.prototype.generateCalendarDayStates = function () {

  // Reset existing states.
  this.resetCalendarDayStates();

  /*
   * Priority of state allocation - removes state allocation conflicts.
   *
   * (Highest) -> Highlighted
   *           -> Selected
   *           -> Unavailable
   * (lowest)  -> Available
   *
   */

  if (this.getHighlightedCalendarDayRange()) {
    this.highlightedCalendarDays = this.getHighlightedCalendarDayRange().getArrayOfAllCalendarDaysExcludingEndCalendarDay();
  }

  if (this.getSelectedCalendarDayRange()) {
    this.selectedCalendarDays = this.getSelectedCalendarDayRange().getArrayOfAllCalendarDaysExcludingEndCalendarDay();
  }

  /*
   * Must be cloned to prevent interference with server loaded data.
   * Must be made unique to prevent interference from subsequent requests.
   */
  this.unavailableCalendarDays = this.unavailableAccordingToServerCalendarDays.clone().unique();
  this.availableCalendarDays = this.availableAccordingToServerCalendarDays.clone().unique();
  this.allAvailableCalendarDays = this.availableCalendarDays.clone();

  // Enforce display precedence - remove state conflicts.
  this.selectedCalendarDays.subtract(this.highlightedCalendarDays);
  this.unavailableCalendarDays.subtract(this.highlightedCalendarDays);
  this.unavailableCalendarDays.subtract(this.selectedCalendarDays);
  this.availableCalendarDays.subtract(this.highlightedCalendarDays);
  this.availableCalendarDays.subtract(this.selectedCalendarDays);
  this.availableCalendarDays.subtract(this.unavailableCalendarDays);
};


/**
 * Reset (clear) the colouring of the CalendarDays. That is, no days have been assigned any colouring.
 */
TravelDuck_AvailabilityCalendar.prototype.resetCalendarDayColourings = function () {

  this.availableToAvailableColouredCalendarDays = [];
  this.availableToUnavailableColouredCalendarDays = [];
  this.availableToHighlightedColouredCalendarDays = [];
  this.availableToSelectedColouredCalendarDays = [];
  this.availableToUnknownColouredCalendarDays = [];

  this.unavailableToAvailableColouredCalendarDays = [];
  this.unavailableToUnavailableColouredCalendarDays = [];
  this.unavailableToHighlightedColouredCalendarDays = [];
  this.unavailableToSelectedColouredCalendarDays = [];
  this.unavailableToUnknownColouredCalendarDays = [];

  this.highlightedToAvailableColouredCalendarDays = [];
  this.highlightedToUnavailableColouredCalendarDays = [];
  this.highlightedToHighlightedColouredCalendarDays = [];
  this.highlightedToSelectedColouredCalendarDays = [];
  this.highlightedToUnknownColouredCalendarDays = [];

  this.selectedToAvailableColouredCalendarDays = [];
  this.selectedToUnavailableColouredCalendarDays = [];
  this.selectedToHighlightedColouredCalendarDays = [];
  this.selectedToSelectedColouredCalendarDays = [];
  this.selectedToUnknownColouredCalendarDays = [];

  this.unknownToAvailableColouredCalendarDays = [];
  this.unknownToUnavailableColouredCalendarDays = [];
  this.unknownToHighlightedColouredCalendarDays = [];
  this.unknownToSelectedColouredCalendarDays = [];
  this.unknownToUnknownColouredCalendarDays = [];
};

/**
 * Generate the colouring of the CalendarDays to be displayed.
 * PRECONDITION: There are no state allocation conflicts. Each CalendarDay belongs to exactly one state.
 */
TravelDuck_AvailabilityCalendar.prototype.generateCalendarDayColourings = function () {

  var $this = this;

  // Reset existing colourings.
  this.resetCalendarDayColourings();

  var months = this.calendarMonthRangeToLoad().getArrayOfAllCalendarMonths();

  // Foreach calendar month given
  months.forEach(function (calendarMonth) {
    var daysInMonth = calendarMonth.daysInMonth();

    // For each day in this month
    for (var day = 1; day <= daysInMonth; day++) {
      var currentDay = new CalendarDay(calendarMonth, day);
      var previousDay = currentDay.minusDays(1);

      var currentDayIsAvailable = $this.availableCalendarDays.contains(currentDay);
      var previousDayIsAvailable = $this.availableCalendarDays.contains(previousDay);

      var currentDayIsUnavailable = $this.unavailableCalendarDays.contains(currentDay);
      var previousDayIsUnavailable = $this.unavailableCalendarDays.contains(previousDay);

      var currentDayIsSelected = $this.selectedCalendarDays.contains(currentDay);
      var previousDayIsSelected = $this.selectedCalendarDays.contains(previousDay);

      var currentDayIsHighlighted = $this.highlightedCalendarDays.contains(currentDay);
      var previousDayIsHighlighted = $this.highlightedCalendarDays.contains(previousDay);

      var currentDayIsUnknown = !(currentDayIsAvailable || currentDayIsUnavailable || currentDayIsSelected || currentDayIsHighlighted);
      var previousDayIsUnknown = !(previousDayIsAvailable || previousDayIsUnavailable || previousDayIsSelected || previousDayIsHighlighted);


      // ----------------
      // Available to ...
      // ----------------
      if (previousDayIsAvailable) {

        // Available
        if (currentDayIsAvailable) {
          $this.availableToAvailableColouredCalendarDays.push(currentDay);

          // Unavailable
        } else if (currentDayIsUnavailable) {
          $this.availableToUnavailableColouredCalendarDays.push(currentDay);

          // Highlighted
        } else if (currentDayIsHighlighted) {
          $this.availableToHighlightedColouredCalendarDays.push(currentDay);

          // Selected
        } else if (currentDayIsSelected) {
          $this.availableToSelectedColouredCalendarDays.push(currentDay);

          // Unknown
        } else if (currentDayIsUnknown) {
          $this.availableToUnknownColouredCalendarDays.push(currentDay);
        }

        // ------------------
        // Unavailable to ...
        // ------------------
      } else if (previousDayIsUnavailable) {

        // Available
        if (currentDayIsAvailable) {
          $this.unavailableToAvailableColouredCalendarDays.push(currentDay);

          // Unavailable
        } else if (currentDayIsUnavailable) {
          $this.unavailableToUnavailableColouredCalendarDays.push(currentDay);

          // Highlighted
        } else if (currentDayIsHighlighted) {
          $this.unavailableToHighlightedColouredCalendarDays.push(currentDay);

          // Selected
        } else if (currentDayIsSelected) {
          $this.unavailableToSelectedColouredCalendarDays.push(currentDay);

          // Unknown
        } else if (currentDayIsUnknown) {
          $this.unavailableToUnknownColouredCalendarDays.push(currentDay);
        }

        // ------------------
        // Highlighted to ...
        // ------------------
      } else if (previousDayIsHighlighted) {

        // Available
        if ($this.availableCalendarDays.contains(currentDay)) {
          $this.highlightedToAvailableColouredCalendarDays.push(currentDay);

          // Unavailable
        } else if (currentDayIsUnavailable) {
          $this.highlightedToUnavailableColouredCalendarDays.push(currentDay);

          // Highlighted
        } else if (currentDayIsHighlighted) {
          $this.highlightedToHighlightedColouredCalendarDays.push(currentDay);

          // Selected
        } else if (currentDayIsSelected) {
          $this.highlightedToSelectedColouredCalendarDays.push(currentDay);

          // Unknown
        } else if (currentDayIsUnknown) {
          $this.highlightedToUnknownColouredCalendarDays.push(currentDay);
        }

        // ---------------
        // Selected to ...
        // ---------------
      } else if (previousDayIsSelected) {

        // Available
        if ($this.availableCalendarDays.contains(currentDay)) {
          $this.selectedToAvailableColouredCalendarDays.push(currentDay);

          // Unavailable
        } else if (currentDayIsUnavailable) {
          $this.selectedToUnavailableColouredCalendarDays.push(currentDay);

          // Highlighted
        } else if (currentDayIsHighlighted) {
          $this.selectedToHighlightedColouredCalendarDays.push(currentDay);

          // Selected
        } else if (currentDayIsSelected) {
          $this.selectedToSelectedColouredCalendarDays.push(currentDay);

          // Unknown
        } else if (currentDayIsUnknown) {
          $this.selectedToUnknownColouredCalendarDays.push(currentDay);
        }


        // ---------------
        // Unknown to ...
        // ---------------
      } else if (previousDayIsUnknown) {

        // Available
        if ($this.availableCalendarDays.contains(currentDay)) {
          $this.unknownToAvailableColouredCalendarDays.push(currentDay);

          // Unavailable
        } else if (currentDayIsUnavailable) {
          $this.unknownToUnavailableColouredCalendarDays.push(currentDay);

          // Highlighted
        } else if (currentDayIsHighlighted) {
          $this.unknownToHighlightedColouredCalendarDays.push(currentDay);

          // Selected
        } else if (currentDayIsSelected) {
          $this.unknownToSelectedColouredCalendarDays.push(currentDay);

          // Unknown
        } else if (currentDayIsUnknown) {
          $this.unknownToUnknownColouredCalendarDays.push(currentDay);
        }
      }

    }
  });

};

/**
 * Reset which CalendarDays which are selectable.
 */
TravelDuck_AvailabilityCalendar.prototype.resetCalendarDaySelectability = function () {

  this.selectableCalendarDays = [];
};

/**
 * Generate the CalendarDay selectability.
 */
TravelDuck_AvailabilityCalendar.prototype.generateCalendarDaySelectability = function () {

  var $this = this;

  // Reset existing selectability.
  this.resetCalendarDaySelectability();

  var months = this.calendarMonthRangeToLoad().getArrayOfAllCalendarMonths();

  var greatestSelectableCalendarDay = this.greatestSelectableCalendarDay();

  // Foreach calendar month given
  months.forEach(function (calendarMonth) {
    var daysInMonth = calendarMonth.daysInMonth();

    // For each day in this month
    for (var day = 1; day <= daysInMonth; day++) {

      var currentDay = new CalendarDay(calendarMonth, day);
      var previous = currentDay.minusDays(1);

      var currentDayIsAvailable = $this.allAvailableCalendarDays.contains(currentDay);
      var previousDayIsAvailable = $this.allAvailableCalendarDays.contains(previous);


      var selectableAccordingToModeAndAvailability = false;

      // Select start mode.
      if ($this.getSettings().mode == TravelDuck_AvailabilityCalendar.Modes.SELECT_START) {
        selectableAccordingToModeAndAvailability = currentDayIsAvailable;

        // Select end mode.
      } else if ($this.getSettings().mode == TravelDuck_AvailabilityCalendar.Modes.SELECT_END) {
        selectableAccordingToModeAndAvailability = previousDayIsAvailable &&
          currentDay.isGreaterThan($this.getSelectedCalendarDayRangeStartCalendarDay()) &&
          currentDay.isLessThanOrEqualTo(greatestSelectableCalendarDay);
      }


      if (selectableAccordingToModeAndAvailability) {
        $this.selectableCalendarDays.push(currentDay);
      }

    }
  });

};


/**
 * Update the availability of this AvailabilityCalendar.
 *
 * @param successCallback
 * @param failureCallback
 */
TravelDuck_AvailabilityCalendar.prototype.updateAvailability = function (successCallback, failureCallback) {

  // Ensure success and failure callbacks exist
  successCallback = !successCallback ? function () {
  } : successCallback;
  failureCallback = !failureCallback ? function () {
  } : failureCallback;

  var $this = this;

  // Trigger start availability update event.
  this.getEventFunctions().onUpdateAvailabilityStart();

  // Fetch the availability.
  this.loadAvailabilityAccordingToServer(function () {

    // Trigger complete availability update event.
    $this.getEventFunctions().onUpdateAvailabilityComplete();

    successCallback();
  }, function () {

    // Trigger availability update error event.
    $this.getEventFunctions().onUpdateAvailabilityError();

    failureCallback();
  });
};


/***********************************************************************************************************************
 * Calculated Amount
 **********************************************************************************************************************/


/**
 * Load the calculated price for the selected CalendarDayRange.
 */
TravelDuck_AvailabilityCalendar.prototype.loadCalculatedAmountAccordingToServer = function (successCallback, failureCallback) {

  // Ensure success and failure callbacks exist
  successCallback = !successCallback ? function () {
  } : successCallback;
  failureCallback = !failureCallback ? function () {
  } : failureCallback;

  var $this = this;

  var selectedCalendarDayRange = this.getSelectedCalendarDayRange();

  // Only attempt to load the calculated price if we have a valid selected CalendarDayRange.
  if (selectedCalendarDayRange) {

    // Trigger update calculated Amount start event.
    this.getEventFunctions().onUpdateCalculatedAmountStart();

    this.getProperty().calculatedPrice(
      selectedCalendarDayRange, this.getNumberOfAdults(), this.getNumberOfChildren(), this.getNumberOfInfants(),
      this.getNumberOfPets(), function (response) {

        $this.setCalculatedAmountAccordingToServer(response);

        // Trigger update calculated Amount start event.
        $this.getEventFunctions().onUpdateCalculatedAmountComplete();

        successCallback();
      }, function () {

        // Trigger update calculated Amount error event.
        $this.getEventFunctions().onUpdateCalculatedAmountError();

        failureCallback();
      });

  } else {

    this.setCalculatedAmountAccordingToServer(null);


    failureCallback();
  }

};


/***********************************************************************************************************************
 * Mode selection
 **********************************************************************************************************************/

/**
 * Put this AvailabilityCalendar into DISPLAY mode. Shows the availability of the property but does not allow the user
 * to select dates.
 */
TravelDuck_AvailabilityCalendar.prototype.changeModeToDisplay = function () {
  this.getSettings().mode = TravelDuck_AvailabilityCalendar.Modes.DISPLAY;

  this.resetHighlightedCalendarDayRange();

  // Render changes.
  this.draw();
};

/**
 * Put this AvailabilityCalendar into SELECT_START mode. Allows the selection of a start CalendarDay for the selected
 * CalendarDayRange.
 */
TravelDuck_AvailabilityCalendar.prototype.changeModeToSelectStart = function () {
  this.getSettings().mode = TravelDuck_AvailabilityCalendar.Modes.SELECT_START;

  // Clear any existing selected CalendarDayRange.
  this.resetSelectedCalendarDayRange();

  // Render changes.
  this.draw();
};

/**
 * Put this AvailabilityCalendar into SELECT_END mode. Allows the selection of an end CalendarDay for the selected
 * CalendarDayRange.
 */
TravelDuck_AvailabilityCalendar.prototype.changeModeToSelectEnd = function () {
  this.getSettings().mode = TravelDuck_AvailabilityCalendar.Modes.SELECT_END;

  // We must have a start date before we can select an end date.
  if (!this.getSelectedCalendarDayRangeStartCalendarDay()) {
    throw "Cannot enter SELECT_END mode without a selected start CalendarDay.";
  }

  // Render changes.
  this.draw();
};


/**
 * Refresh this AvailabilityCalendar.
 */
TravelDuck_AvailabilityCalendar.prototype.refresh = function () {

  // Ensure success and failure callbacks exist
  var successCallback = !arguments[0] ? function () {
  } : arguments[0];
  var failureCallback = !arguments[1] ? function () {
  } : arguments[1];

  var $this = this;

  // Update the availability.
  this.updateAvailability(function () {

    // Render the new availability once we have updated it.
    $this.draw();

    successCallback();
  }, failureCallback());

};


/**
 * Draw the AvailabilityCalendar using jQuery ui date picker.
 */
TravelDuck_AvailabilityCalendar.prototype.draw = function () {

  var $this = this;

  /**
   * beforeShowDay function. Each day should be coloured according to which
   * array it belongs to.
   *
   * @param date
   * @returns {Array}
   */
  var beforeShowDay = function (date) {

    var calendarDay = CalendarDay.fromDate(date);

    var selectable = $this.selectableCalendarDays.contains(calendarDay);

    var classes = "ui-datepicker-day";

    // Available to ...
    if ($this.availableToAvailableColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " available-to-available"];
    } else if ($this.availableToUnavailableColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " available-to-unavailable"];
    } else if ($this.availableToHighlightedColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " available-to-highlighted"];
    } else if ($this.availableToSelectedColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " available-to-selected"];
    } else if ($this.availableToUnknownColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " availableToUnknown"];

      // Unavailable to ...
    } else if ($this.unavailableToAvailableColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " unavailable-to-available"];
    } else if ($this.unavailableToUnavailableColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " unavailable-to-unavailable"];
    } else if ($this.unavailableToHighlightedColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " unavailable-to-highlighted"];
    } else if ($this.unavailableToSelectedColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " unavailable-to-selected"];
    } else if ($this.unavailableToUnknownColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " unavailable-to-unknown"];

      // Highlighted to ...
    } else if ($this.highlightedToAvailableColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " highlighted-to-available"];
    } else if ($this.highlightedToUnavailableColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " highlighted-to-unavailable"];
    } else if ($this.highlightedToHighlightedColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " highlighted-to-highlighted"];
    } else if ($this.highlightedToSelectedColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " highlighted-to-selected"];
    } else if ($this.highlightedToUnknownColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " highlighted-to-unknown"];

      // Selected to ...
    } else if ($this.selectedToAvailableColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " selected-to-available"];
    } else if ($this.selectedToUnavailableColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " selected-to-unavailable"];
    } else if ($this.selectedToHighlightedColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " selected-to-highlighted"];
    } else if ($this.selectedToSelectedColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " selected-to-selected"];
    } else if ($this.selectedToUnknownColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " selected-to-unknown"];

      // Unknown to ...
    } else if ($this.unknownToAvailableColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " unknown-to-available"];
    } else if ($this.unknownToUnavailableColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " unknown-to-unavailable"];
    } else if ($this.unknownToHighlightedColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " unknown-to-highlighted"];
    } else if ($this.unknownToSelectedColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " unknown-to-selected"];
    } else if ($this.unknownToUnknownColouredCalendarDays.contains(calendarDay)) {
      return [selectable, classes + " unknown-to-unknown"];

      // Error
    } else {
      return [false];
    }


  };


  // Before we render the days - ensure we have an up to date colouring.
  this.generateCalendarDayStates();
  this.generateCalendarDayColourings();
  this.generateCalendarDaySelectability();


  var displayElement = $(this.getDisplayElement());

  // Date picker has already been initialized - just refresh it
  if (this.datePickerHasBeenInitialized) {
    displayElement.datepicker('refresh');

    // Initialize the date picker.
  } else {

    // Display the date picker
    displayElement.datepicker({

      dateFormat: 'yy/mm/dd',
      numberOfMonths: this.calculateNumberOfMonthsToDisplay(),
      firstDay: this.getSettings().changeOverDay,
      defaultDate: new CalendarDay(this.firstCalendarMonthToDisplay(), 1).toDate(),
      minDate: 0,

      // Colour dates before showing them.
      beforeShowDay: beforeShowDay,

      // Month or year is changed
      onChangeMonthYear: function (year, month) {
        $this.getSettings().centralCalendarMonth = new CalendarMonth(year, month);
        $this.draw();
        $this.refresh();
      },

      onSelect: function (dateString) {

        var calendarDay = CalendarDay.fromYearMonthDayString(dateString);

        switch ($this.getSettings().mode) {

          // Select start mode
          case TravelDuck_AvailabilityCalendar.Modes.SELECT_START:
            $this.setSelectedCalendarDayRangeStartCalendarDay(calendarDay);
            $this.changeModeToSelectEnd();
            break;

          // Select end mode
          case TravelDuck_AvailabilityCalendar.Modes.SELECT_END:
            $this.setSelectedCalendarDayRangeEndCalendarDay(calendarDay);
            $this.changeModeToDisplay();
            break;
        }

      }
    });

    this.datePickerHasBeenInitialized = true;
  }

  // Attach mouse events.
  $this.attachMouseEventsToDatepicker();

  // Correct styling
  $(displayElement).find('.ui-state-highlight').removeClass('ui-state-highlight');
  $(displayElement).find('.ui-state-active').removeClass('ui-state-active').removeClass('ui-state-hover');
};

/**
 * Attach the required mouse events to the jQuery ui date picker.
 */
TravelDuck_AvailabilityCalendar.prototype.attachMouseEventsToDatepicker = function () {
  var $this = this;

  if ($this.getSettings().mode == TravelDuck_AvailabilityCalendar.Modes.SELECT_END) {

    setTimeout(function () {

      $(".ui-state-default").on("mouseover", function () {

        // Extract the date we've hovered over - a proper hook would be appreciated!
        var day = $(this).text();
        var monthString = $(".ui-datepicker-month", $(this).parent().parent().parent().parent().parent()).text();
        var year = $(".ui-datepicker-year", $(this).parent().parent().parent().parent().parent()).text();
        var date = new Date(Date.parse(day + " " + monthString + " " + year));
        var calendarDay = CalendarDay.fromDate(date);

        // Only update if the date has changed.
        if (!calendarDay.isEqualTo($this.getHighlightedCalendarDayRangeEndCalendarDay())) {

          // Limit highlighting past the greatest selectable day.
          var greatestSelectableCalendarDay = $this.greatestSelectableCalendarDay();
          if (calendarDay.isGreaterThan(greatestSelectableCalendarDay) && greatestSelectableCalendarDay) {
            calendarDay = greatestSelectableCalendarDay;
          }

          // Update the highlighted range.
          $this.setHighlightedCalendarDayRange(new CalendarDayRange(
            $this.getSelectedCalendarDayRangeStartCalendarDay(), calendarDay
          ));

          // Draw changes.
          $this.draw();
        }

      });

    }, 0);
  }
};
TravelDuck_NewsletterSubscriber.prototype.constructor = TravelDuck_NewsletterSubscriber;


/**
 * Construct a Newsletter Subscriber.
 *
 * @constructor
 * @param email
 */
function TravelDuck_NewsletterSubscriber(email) {
  this.email = email
}


/**
 * Subscribe the given email address to the TravelDuck newsletter.
 *
 * @param emailAddress
 * @param successCallback
 * @param failureCallback
 */
TravelDuck_NewsletterSubscriber.subscribeEmailAddress = function(emailAddress, successCallback, failureCallback) {
  $.ajax({
    url: "https://travelduck.co/api/rest/v1/newsletter/subscribe",
    type: "POST",
    dataType: 'json',
    crossDomain: true,
    cache: false,
    timeout: 10000,
    data: {
      "email": emailAddress
    },
    success: successCallback,
    error: function(jqXHR, textStatus) {
      var errors = [];
      var message = "An error occurred";
      if(textStatus == "error") {
        errors = jqXHR["responseJSON"]["errors"];
        message = errors[0]["message"];
      }
      failureCallback(message, errors);
    }
  });
};
TravelDuck_Photo.prototype.constructor = TravelDuck_Photo;


/**
 * Construct an Image.
 *
 * @constructor
 * @param id
 * @param smallSizeUrl
 * @param mediumSizeUrl
 * @param largeSizeUrl
 * @param originalSizeUrl
 * @param title
 * @param description
 */
function TravelDuck_Photo(id, smallSizeUrl, mediumSizeUrl, largeSizeUrl, originalSizeUrl, title, description) {
  this.id = id;
  this.title = title;
  this.description = description;
  this.smallSizeUrl = smallSizeUrl;
  this.mediumSizeUrl = mediumSizeUrl;
  this.largeSizeUrl = largeSizeUrl;
  this.originalSizeUrl = originalSizeUrl;
}
TravelDuck_Property.prototype.constructor = TravelDuck_Property;

TravelDuck_Property.searchInProgress = null;

/**
 * Constructor - requires the property id.
 *
 * @constructor
 * @param propertyId
 */
function TravelDuck_Property(propertyId) {
  this.setAttributes([]);
  this.setId(propertyId);
}

TravelDuck_Property.initialiseFromApi = function(propertyId, successCallback, failureCallback) {
  var property = new TravelDuck_Property(propertyId);
  property.readFromApi(successCallback, failureCallback);
};

TravelDuck_Property.prototype.getAttributes = function() {
  return this.attributes;
};

TravelDuck_Property.prototype.setAttributes = function(attributes) {
  this.attributes = attributes;
};

TravelDuck_Property.prototype.getAttribute = function(key) {
  return this.attributes[key];
};

TravelDuck_Property.prototype.setAttribute = function(key, value) {
  this.attributes[key] = value;
};


/**
 * Get the id of this property.
 *
 * @returns {Number}
 */
TravelDuck_Property.prototype.getId = function() {
  return parseInt(this.getAttribute("id"));
};


/**
 * Set the id of this property.
 *
 * @param id
 */
TravelDuck_Property.prototype.setId = function(id) {
  this.setAttribute("id", id);
};


/**
 * Get the name of this property.
 *
 * @returns {string}
 */
TravelDuck_Property.prototype.getName = function() {
  return this.getAttribute("name")
};


/**
 * Set the name of this property.
 *
 * @param {string} name
 */
TravelDuck_Property.prototype.setName = function(name) {
  this.setAttribute("name", name);
};


/**
 * Get the change over DayOfWeek of this Property.
 *
 * @returns {DayOfWeek}
 */
TravelDuck_Property.prototype.getChangeOverDay = function() {
  return new DayOfWeek(this.getAttribute("change-over-day"));
};


/**
 * Set the change over DayOfWeek of this Property.
 *
 * @param {DayOfWeek} changeOverDay
 */
TravelDuck_Property.prototype.setChangeOverDay = function(changeOverDay) {
  this.setAttribute("change-over-day", changeOverDay.getNumber());
};


/**
 * Get the booking mode of this Property.
 *
 * @returns {string}
 */
TravelDuck_Property.prototype.getBookingMode = function() {
  return this.getAttribute("booking-mode");
};


/**
 * Set he booking mode of this Property.
 *
 * @param bookingMode
 */
TravelDuck_Property.prototype.setBookingMode = function(bookingMode) {
  this.setAttribute("booking-mode", bookingMode);
};



/**
 * Read Property from the API.
 *
 * @param successCallback
 * @param failureCallback
 */
TravelDuck_Property.prototype.readFromApi = function(successCallback, failureCallback) {

  // Ensure success and failure callbacks exist
  successCallback = !successCallback ? function () {
  } : successCallback;
  failureCallback = !failureCallback ? function () {
  } : failureCallback;

  var property = this;

  $.ajax({
    url: "https://travelduck.co/api/rest/v1/property/" + property.getId() + "?callback=?",
    type: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    cache: false,
    timeout: 10000,
    success: function (response) {

      // Check for error
      if (response.errors.length > 0) {
        failureCallback();
        return;
      }

      if(response) {
        var data = response.payload;
        if(data) {
          property.setAttributes(data);
          successCallback(property);
        } else {
          successCallback(null);
        }
      } else {
        successCallback(null);
      }

    },
    error: function () {
      failureCallback();
    }
  });
};


/**
 * Calculate the price to rent this property between the given start Date and given end Date. Assumes prices are in GBP.
 *
 * @param calendarDayRange
 * @param successCallback
 * @param failureCallback
 * @param numberOfAdults
 * @param numberOfChildren
 * @param numberOfInfants
 * @param numberOfPets
 */
TravelDuck_Property.prototype.bookingQuote = function (
  calendarDayRange, numberOfAdults, numberOfChildren, numberOfInfants, numberOfPets, successCallback, failureCallback
  ) {

  // Ensure success and failure callbacks exist
  successCallback = !successCallback ? function () {
  } : successCallback;
  failureCallback = !failureCallback ? function () {
  } : failureCallback;

  var propertyId = this.getId();

  $.ajax({
    url: "https://travelduck.co/api/rest/v1/property/" + propertyId + "/booking-quote?callback=?",
    type: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    cache: false,
    timeout: 10000,
    data: {
      "number-of-adults": numberOfAdults,
      "number-of-children": numberOfChildren,
      "number-of-infants": numberOfInfants,
      "number-of-pets": numberOfPets,
      "currency": "GBP",
      "start-date": calendarDayRange.getStartCalendarDay().toYearMonthDayString(),
      "end-date": calendarDayRange.getEndCalendarDay().toYearMonthDayString()
    },
    success: function (response) {

      // Check for error
      if (response.errors.length > 0) {
        failureCallback();
        return;
      }

      if(response) {
        var prices = response.payload;
        if(prices) {
          var rentalPrice = new Amount(prices["rental-price"].value.toFixed(2), prices["rental-price"].currency);
          var moneyHandlingFee = new Amount(prices["money-handling-fee"].value.toFixed(2), prices["money-handling-fee"].currency);
          var totalPrice = new Amount(prices["total-price"].value.toFixed(2), prices["total-price"].currency);
          successCallback(totalPrice, rentalPrice, moneyHandlingFee);
        } else {
          successCallback(null);
        }
      } else {
        successCallback(null);
      }

    },
    error: function () {
      failureCallback();
    }
  });
};


/**
 * Fetch the availability of this property for the given CalendarMonthRange.
 *
 * @param calendarMonthRange
 * @param successCallback
 * @param failureCallback
 */
TravelDuck_Property.prototype.availability = function(calendarMonthRange, successCallback, failureCallback) {

  // Ensure success and failure callbacks exist
  successCallback = !successCallback ? function () {
  } : successCallback;
  failureCallback = !failureCallback ? function () {
  } : failureCallback;

  var propertyId = this.getId();

  $.ajax({
    url: 'https://travelduck.co/api/rest/v1/property/' + propertyId + '/availability?jsoncallback=?',
    type: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    cache: false,
    timeout: 10000,
    data: {
      "start-date": calendarMonthRange.getStartCalendarMonth().firstCalendarDay().toYearMonthDayString(),
      "end-date": calendarMonthRange.getEndCalendarMonth().lastCalendarDay().toYearMonthDayString()
    },
    success: function (response) {

      // Check for error
      if (response.errors.length > 0) {
        failureCallback();
        return;
      }


      var available = response.payload.available.map(function(dateAsStr) {
        return CalendarDay.fromYearMonthDayString(dateAsStr, "-");
      });

      var unavailable = response.payload.unavailable.map(function(dateAsStr) {
        return CalendarDay.fromYearMonthDayString(dateAsStr, "-");
      });

      var availability = {
        available: available,
        unavailable: unavailable
      };

      successCallback(availability);
    },
    error: failureCallback
  });
};


/**
 * Fetch the coloured availability of this property for the given CalendarMonthRange.
 *
 * @param calendarMonthRange
 * @param successCallback
 * @param failureCallback
 */
TravelDuck_Property.prototype.colouredAvailability = function(calendarMonthRange, successCallback, failureCallback) {

  var months = calendarMonthRange.getArrayOfAllCalendarMonths();


  this.availability(calendarMonthRange, function(availability) {

    var colouring = {
      availableToAvailable: [],
      availableToUnavailable: [],
      availableToUnknown: [],
      unavailableToAvailable: [],
      unavailableToUnavailable: [],
      unavailableToUnknown: [],
      unknownToAvailable: [],
      unknownToUnavailable: [],
      unknownToUnknown: []
    };


    months.forEach(function(calendarMonth) {

      var daysInMonth = calendarMonth.daysInMonth();

      for(var day = 1; day <= daysInMonth; day++) {

        var currentDay = new CalendarDay(calendarMonth, day);
        var previousDay = currentDay.minusDays(1);

        var currentDayIsAvailable = availability.available.contains(currentDay);
        var previousDayIsAvailable = availability.available.contains(previousDay);

        var currentDayIsUnavailable = availability.unavailable.contains(currentDay);
        var previousDayIsUnavailable = availability.unavailable.contains(previousDay);

        var currentDayIsUnknown = !(currentDayIsAvailable || currentDayIsUnavailable);
        var previousDayIsUnknown = !(previousDayIsAvailable || previousDayIsUnavailable);


        // ----------------
        // Available to ...
        // ----------------
        if(previousDayIsAvailable) {

          // Available
          if(currentDayIsAvailable) {
            colouring.availableToAvailable.push(currentDay);

            // Unavailable
          } else if(currentDayIsUnavailable) {
            colouring.availableToUnavailable.push(currentDay);

            // Unknown
          } else if(currentDayIsUnknown) {
            colouring.availableToUnknown.push(currentDay);
          }

          // ------------------
          // Unavailable to ...
          // ------------------
        } else if(previousDayIsUnavailable) {

          // Available
          if (currentDayIsAvailable) {
            colouring.unavailableToAvailable.push(currentDay);

            // Unavailable
          } else if(currentDayIsUnavailable) {
            colouring.unavailableToUnavailable.push(currentDay);

            // Unknown
          } else if(currentDayIsUnknown) {
            colouring.unavailableToUnknown.push(currentDay);
          }


          // ---------------
          // Unknown to ...
          // ---------------
        } else if(previousDayIsUnknown) {

          // Available
          if(currentDayIsAvailable) {
            colouring.unknownToAvailable.push(currentDay);

            // Unavailable
          } else if(currentDayIsUnavailable) {
            colouring.unknownToUnavailable.push(currentDay);

            // Unknown
          } else if(currentDayIsUnknown) {
            colouring.unknownToUnknown.push(currentDay);
          }
        }

      }
    });

    successCallback(colouring, availability);
  }, failureCallback);

};


TravelDuck_Property.boundarySearch = function(
  successCallback, failureCallback, top, left, bottom, right, numberOfResults, page
  ) {

  // Abort any existing search in progress as we intend to replace it.
  if(TravelDuck_Property.searchInProgress) {
    TravelDuck_Property.searchInProgress.abort();
  }

  // Establish call backs
  successCallback = successCallback != null ? successCallback : function() {};
  failureCallback = failureCallback != null ? failureCallback : function() {};

  TravelDuck_Property.searchInProgress = $.ajax({
    url: 'https://travelduck.co/api/rest/v1/property/search/boundary?jsoncallback=?',
    type: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    cache: false,
    timeout: 10000,
    data: {
      "top": top,
      "left": left,
      "bottom": bottom,
      "right": right,
      "numberOfResults": numberOfResults,
      "page": page
    },
    success: function (response) {

      // Check for error
      if (response.errors.length > 0) {
        failureCallback();
        return;
      }

      successCallback(response.payload);
    },
    error: function (jqXHR, textStatus) {

      // For any error other than abort mark as a failure.
      if(textStatus != "abort") {
        failureCallback();
      }
    },
    complete: function() {
      TravelDuck_Property.searchInProgress = null;
    }
  });

};


/**
 * Search for properties.
 *
 * @param successCallback
 * @param failureCallback
 * @param noResultsCallback
 * @param searchCriteria
 */
TravelDuck_Property.search = function(
  searchCriteria, successCallback, failureCallback, noResultsCallback
  ) {

  // Abort any existing search in progress as we intend to replace it.
  if(TravelDuck_Property.searchInProgress) {
    TravelDuck_Property.searchInProgress.abort();
  }

  // Establish call backs
  successCallback = successCallback != null ? successCallback : function() {};
  failureCallback = failureCallback != null ? failureCallback : function() {};
  noResultsCallback = noResultsCallback != null ? noResultsCallback : function() {};

  TravelDuck_Property.searchInProgress = $.ajax({
    url: 'https://travelduck.co/api/rest/v1/property/search-results?jsoncallback=?',
    type: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    cache: false,
    timeout: 10000,
    data: searchCriteria,
    success: function (response) {

      var properties = response.properties;

      if(Object.prototype.toString.call(properties) === '[object Array]') {

        if(properties.length == 0) {
          noResultsCallback();
        } else {

          properties = properties.map(function(propertyJsonObject) {
            return TravelDuck_Property.initialiseFromJsonObject(propertyJsonObject);
          });

          successCallback(response.searchIdentifier, properties);
        }

      } else {
        failureCallback();
      }
    },
    error: function (jqXHR, textStatus) {

      // For any error other than abort mark as a failure.
      if(textStatus != "abort") {
        failureCallback();
      }
    },
    complete: function() {
      TravelDuck_Property.searchInProgress = null;
    }
  });
};
TravelDuck_Property_Booking_Request.prototype.constructor = TravelDuck_Property_Booking_Request;

function TravelDuck_Property_Booking_Request(property, dateRange) {
  this.property = property;
  this.dateRange = dateRange;
}


TravelDuck_Property_Booking_Request.prototype.submit = function(successCallback, failureCallback) {

  // Ensure success and failure callbacks exist
  successCallback = !successCallback ? function () {
  } : successCallback;
  failureCallback = !failureCallback ? function () {
  } : failureCallback;


  $.ajax({
    url: 'https://travelduck.co/api/rest/v1/property/booking/request',
    type: 'POST',
    //dataType: 'json',
    crossDomain: true,
    cache: false,
    timeout: 10000,
    data: {
      "property-id": this.property.getId(),
      "start-date": this.dateRange.getStartCalendarDay().toYearMonthDayString(),
      "end-date": this.dateRange.getEndCalendarDay().toYearMonthDayString()
    },
    success: function(response) {

      // Check for error
      if (response.errors.length > 0) {
        failureCallback();
        return;
      }

      successCallback(response.payload);
    },
    error: failureCallback
  });

};
TravelDuck_Property_Booking_Guest.prototype.constructor = TravelDuck_Property_Booking_Guest;

function TravelDuck_Property_Booking_Guest(propertyId) {
  this.setId(propertyId);
}