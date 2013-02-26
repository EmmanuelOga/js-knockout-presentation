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

////////////////////////////////////////////////////////////////////////////////

$(function(){
  // Collect relevant DOM objects
  var $widget = $("#widget3");
  if (!$widget.length) return;

  var $from         = $widget.find(".from");
  var $to           = $widget.find(".to");
  var $buttonMonth  = $widget.find(".month");
  var $buttonWeek   = $widget.find(".week");
  var $buttonAll    = $widget.find(".all");
  var $buttonProfit = $widget.find("button:last");

  var ds = new DateSelector("01/01/2013", "02/31/2013");

  // Callback to handle all the updates.
  var updateDomWithDS = function(newRange) {
    return function() {
      if (newRange) {
        ds.setRange(newRange);
        $from.val(ds.from); $to.val(ds.to);
      } else {
        ds.from = $from.val(); ds.to = $to.val();
      }

      $buttonMonth.removeClass("selected");$buttonWeek.removeClass("selected");$buttonAll.removeClass("selected");

      if      (ds.inRange("week"))  $buttonWeek.addClass("selected");
      else if (ds.inRange("month")) $buttonMonth.addClass("selected");
      else if (ds.inRange("all"))   $buttonAll.addClass("selected");
    }
  };

  // Bind Date Selector to the DOM
  $buttonMonth.on("click", updateDomWithDS("month"));
  $buttonWeek.on("click", updateDomWithDS("week"));
  $buttonAll.on("click", updateDomWithDS("all"));
  $from.on("keyup", updateDomWithDS());
  $to.on("keyup", updateDomWithDS());
  $buttonProfit.on("click", function(ev){ alert("Range selected is: " + ds.currentRange()); });

  updateDomWithDS()(); // Initialize on load too.
});
