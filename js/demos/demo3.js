function DateSelectorVM(from, to) {
  this.from = ko.observable(from);
  this.to = ko.observable(to);
  this.knownRanges = {
    week:    { from: moment(to).subtract('days', 7).format("MM/DD/YYYY"), to: to },
    month:   { from: moment(to).subtract('days', 30).format("MM/DD/YYYY"), to: to },
    all:     { from: from, to: to }
  };
}

DateSelectorVM.prototype.setRange = function(name) {
  var range = this.knownRanges[name];
  this.from(range.from);
  this.to(range.to);
};

DateSelectorVM.prototype.inRange = function(name) {
  var range = this.knownRanges[name];
  return range.from === this.from() && range.to === this.to();
};

DateSelectorVM.prototype.currentRange = function(name) {
  for (key in this.knownRanges)
    if (this.inRange(key))
      return key;
};

$(function(){
  var ds = new DateSelectorVM("01/01/2013", "02/31/2013");
  var $widget = $("#widget4");

  if (!$widget.length) return;

  var koBind = function(selector, bindings) {
    ko.applyBindingsToNode($widget.find(selector).get(0), bindings, ds);
  }

  koBind(".from",  { value: ds.from , valueUpdate: 'afterkeydown' });
  koBind(".to",    { value: ds.to   , valueUpdate: 'afterkeydown' });

  koBind(".month", { click: function() { ds.setRange("month") }, css: { selected: ko.computed(function() { return ds.inRange("month"); }) }})
  koBind(".week",  { click: function() { ds.setRange("week")  }, css: { selected: ko.computed(function() { return ds.inRange("week"); }) }})
  koBind(".all",   { click: function() { ds.setRange("all")   }, css: { selected: ko.computed(function() { return ds.inRange("all"); }) }})

  koBind("button:last" , { click: function() { alert("Range selected is: " + ds.currentRange()); }})
});
