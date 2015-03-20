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