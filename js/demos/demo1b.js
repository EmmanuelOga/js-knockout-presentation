$(function(){
  var $widget = $("#widget2");

  if (!$widget.length) return;

  var $from         = $widget.find(".from");
  var $to           = $widget.find(".to");
  var $buttonMonth  = $widget.find(".month");
  var $buttonWeek   = $widget.find(".week");
  var $buttonAll    = $widget.find(".all");
  var $buttonProfit = $widget.find("button:last");

  var min = $from.val(), max = $to.val();
  var monthAgo = "01/31/2013";
  var weekAgo  = "02/24/2013";

  // Refresh button states.
  var markSelectedRange = function() {
    $buttonMonth.removeClass("selected")
    $buttonWeek.removeClass("selected")
    $buttonAll.removeClass("selected");

    if ($from.val() == min      && $to.val() == max) $buttonAll.addClass("selected");
    if ($from.val() == monthAgo && $to.val() == max) $buttonMonth.addClass("selected");
    if ($from.val() == weekAgo  && $to.val() == max) $buttonWeek.addClass("selected");
  }

  $buttonMonth.on("click", function(ev){
    $from.val(monthAgo); $to.val(max);
    markSelectedRange();
  });

  $buttonWeek.on("click", function(ev){
    $from.val(weekAgo); $to.val(max);
    markSelectedRange();
  });

  $buttonAll.on("click", function(ev){
    $from.val(min); $to.val(max);
    markSelectedRange();
  });

  $buttonProfit.on("click", function(ev){
    var range = $widget.find("button.selected:first").attr("class");
    alert(range);
  });

  $from.on("keyup", markSelectedRange);
  $to.on("keyup", markSelectedRange);

  markSelectedRange();
});
