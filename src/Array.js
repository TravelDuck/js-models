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