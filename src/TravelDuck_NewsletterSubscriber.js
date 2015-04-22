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
    error: failureCallback
  });
};