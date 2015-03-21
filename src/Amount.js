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