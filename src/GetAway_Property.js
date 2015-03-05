GetAway_Property.prototype.constructor = GetAway_Property;

GetAway_Property.searchInProgress = null;

/**
 * Constructor - requires the property id.
 *
 * @constructor
 * @param propertyId
 */
function GetAway_Property(propertyId) {
  this.setId(propertyId);


}


/**
 * Initialise a new property given a json object.
 * @param jsonObject
 */
GetAway_Property.initialiseFromJsonObject = function(jsonObject) {

  var property = new GetAway_Property(jsonObject.id);

  if(jsonObject["name"]) {
    property.setName(jsonObject["name"]);
  }

  if(jsonObject["rooms"]) {
    var rooms = jsonObject["rooms"];

    if(rooms["bedrooms"]) {
      var bedrooms = rooms["bedrooms"];
      property.setNumberOfDoubleBedrooms(bedrooms["double"]);
      property.setNumberOfTwinBedrooms(bedrooms["twin"]);
      property.setNumberOfSingleBedrooms(bedrooms["single"]);
      property.setNumberOfPutAwayBeds(bedrooms["putaway"]);
    }
  }

  if(jsonObject["maxSleepingCapacity"]) {
    property.setMaximumSleepingCapacity(jsonObject["maxSleepingCapacity"]);
  }

  // Read photos
  if(jsonObject["ownerPropertyInformation"]) {
    var ownerPropertyInformation = jsonObject["ownerPropertyInformation"];
    if(ownerPropertyInformation["photos"]) {
      var photos = ownerPropertyInformation["photos"];
      photos = photos.map(function(photoJsonObject) {
        return new GetAway_Photo(
          photoJsonObject["id"], photoJsonObject["small-size-url"], photoJsonObject["medium-size-url"],
          photoJsonObject["large-size-url"], photoJsonObject["original-size-url"]
        );
      });
      property.setPhotos(photos);
    }
  }

  return property;
};


/**
 * Get the id of this property.
 *
 * @returns {Number}
 */
GetAway_Property.prototype.getId = function() {
  return parseInt(this.id);
};

/**
 * Set the id of this property.
 *
 * @param id
 */
GetAway_Property.prototype.setId = function(id) {
  // TODO: Validate the id is an integer > 0
  this.id = id;
};


/**
 * Get the name of this property.
 *
 * @returns {string}
 */
GetAway_Property.prototype.getName = function() {
  return this.name;
};

/**
 * Set the name of this property.
 *
 * @param name
 */
GetAway_Property.prototype.setName = function(name) {
  this.name = name;
};



/**
 * Get the number of double bedrooms provided by this property.
 *
 * @returns {number}
 */
GetAway_Property.prototype.getNumberOfDoubleBedrooms = function() {
  return this.numberOfDoubleBedrooms;
};


/**
 * Set the number of double bedrooms provided by this property.
 *
 * @param numberOfDoubleBedrooms
 */
GetAway_Property.prototype.setNumberOfDoubleBedrooms = function(numberOfDoubleBedrooms) {
  this.numberOfDoubleBedrooms = numberOfDoubleBedrooms;
};


/**
 * Get the number of twin bedrooms provided by this property.
 *
 * @returns {number}
 */
GetAway_Property.prototype.getNumberOfTwinBedrooms = function() {
  return this.numberOfTwinBedrooms;
};


/**
 * Set the number of twin bedrooms provided by this property.
 *
 * @param numberOfTwinBedrooms
 */
GetAway_Property.prototype.setNumberOfTwinBedrooms = function(numberOfTwinBedrooms) {
  this.numberOfTwinBedrooms = numberOfTwinBedrooms;
};


/**
 * Get the number of single bedrooms provided by this property.
 *
 * @returns {number}
 */
GetAway_Property.prototype.getNumberOfSingleBedrooms = function() {
  return this.numberOfSingleBedrooms;
};


/**
 * Set the number of single bedrooms provided by this property.
 *
 * @param numberOfSingleBedrooms
 */
GetAway_Property.prototype.setNumberOfSingleBedrooms = function(numberOfSingleBedrooms) {
  this.numberOfSingleBedrooms = numberOfSingleBedrooms;
};


/**
 * Get the number of put-away beds provided by this property.
 *
 * @returns {number}
 */
GetAway_Property.prototype.getNumberOfPutAwayBeds = function() {
  return this.numberOfPutAwayBeds;
};

/**
 * Set the number of put-away beds provided by this property.
 *
 * @param numberOfPutAwayBeds
 */
GetAway_Property.prototype.setNumberOfPutAwayBeds = function(numberOfPutAwayBeds) {
  this.numberOfPutAwayBeds = numberOfPutAwayBeds;
};


/**
 * Get the maximum sleeping capacity of this property.
 *
 * @returns {number}
 */
GetAway_Property.prototype.getMaximumSleepingCapacity = function() {
  return this.maximumSleepingCapacity;
};


/**
 * Set the maximum sleeping capacity of this property.
 *
 * @param maximumSleepingCapacity
 */
GetAway_Property.prototype.setMaximumSleepingCapacity = function(maximumSleepingCapacity) {
  this.maximumSleepingCapacity = maximumSleepingCapacity;
};



/**
 * Get the photos associated with this property.
 *
 * @returns {array}
 */
GetAway_Property.prototype.getPhotos = function() {
  return this.photos;
};


/**
 * Set the photos associated with this property.
 *
 * @param photos
 */
GetAway_Property.prototype.setPhotos = function(photos) {
  this.photos = photos;
};


/**
 * Get the nth photo of this property.
 *
 * @returns {GetAway_Photo|null}
 */
GetAway_Property.prototype.getPhoto = function(n) {
  return this.getPhotos()[n-1];
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
GetAway_Property.prototype.bookingQuote = function (
  calendarDayRange, numberOfAdults, numberOfChildren, numberOfInfants, numberOfPets, successCallback, failureCallback
  ) {

  // Ensure success and failure callbacks exist
  successCallback = !successCallback ? function () {
  } : successCallback;
  failureCallback = !failureCallback ? function () {
  } : failureCallback;

  var propertyId = this.getId();

  $.ajax({
    url: "https://get-away.com/api/rest/v1/property/" + propertyId + "/booking-quote?callback=?",
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
GetAway_Property.prototype.availability = function(calendarMonthRange, successCallback, failureCallback) {

  // Ensure success and failure callbacks exist
  successCallback = !successCallback ? function () {
  } : successCallback;
  failureCallback = !failureCallback ? function () {
  } : failureCallback;

  var propertyId = this.getId();

  $.ajax({
    url: 'https://get-away.com/api/rest/v1/property/' + propertyId + '/availability?jsoncallback=?',
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
GetAway_Property.prototype.colouredAvailability = function(calendarMonthRange, successCallback, failureCallback) {

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





/**
 * Search for properties.
 *
 * @param successCallback
 * @param failureCallback
 * @param noResultsCallback
 * @param searchCriteria
 */
GetAway_Property.search = function(
  searchCriteria, successCallback, failureCallback, noResultsCallback
  ) {

  // Abort any existing search in progress as we intend to replace it.
  if(GetAway_Property.searchInProgress) {
    GetAway_Property.searchInProgress.abort();
  }

  // Establish call backs
  successCallback = successCallback != null ? successCallback : function() {};
  failureCallback = failureCallback != null ? failureCallback : function() {};
  noResultsCallback = noResultsCallback != null ? noResultsCallback : function() {};

  GetAway_Property.searchInProgress = $.ajax({
    url: 'https://get-away.com/api/rest/v1/property/search-results?jsoncallback=?',
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
            return GetAway_Property.initialiseFromJsonObject(propertyJsonObject);
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
      GetAway_Property.searchInProgress = null;
    }
  });
};