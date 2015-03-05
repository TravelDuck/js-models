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