GetAway_Property_Booking_Request.prototype.constructor = GetAway_Property_Booking_Request;

function GetAway_Property_Booking_Request(property, dateRange) {
  this.property = property;
  this.dateRange = dateRange;
}


GetAway_Property_Booking_Request.prototype.submit = function(successCallback, failureCallback) {

  // Ensure success and failure callbacks exist
  successCallback = !successCallback ? function () {
  } : successCallback;
  failureCallback = !failureCallback ? function () {
  } : failureCallback;


  $.ajax({
    url: 'https://get-away.com/api/rest/v1/property/booking/request',
    type: 'POST',
    //dataType: 'json',
    crossDomain: true,
    cache: false,
    timeout: 10000,
    data: {
      "property-id": this.property.id,
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