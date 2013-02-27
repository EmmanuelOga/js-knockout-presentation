function DateSelector(from, to) {
  this.from = from;
  this.to = to;
  this.knownRanges = {
    week:    { from: moment(to).subtract('days', 7).format("MM/DD/YYYY"), to: to },
    month:   { from: moment(to).subtract('days', 30).format("MM/DD/YYYY"), to: to },
    all:     { from: from, to: to }
  };
}

DateSelector.prototype.setRange = function(name) {
  var range = this.knownRanges[name];
  this.from = range.from;
  this.to = range.to;
};

DateSelector.prototype.inRange = function(name) {
  var range = this.knownRanges[name];
  return range.from === this.from && range.to === this.to;
};

DateSelector.prototype.currentRange = function(name) {
  for (key in this.knownRanges)
    if (this.inRange(key))
      return key;
};

