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