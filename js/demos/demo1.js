$(function(){
  var $widget = $("#widget1");

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

  $buttonMonth.on("click", function(ev){
    $buttonMonth.addClass("selected")
    $buttonWeek.removeClass("selected")
    $buttonAll.removeClass("selected");
    $from.val(monthAgo); $to.val(max);
  });

  $buttonWeek.on("click", function(ev){
    $buttonMonth.removeClass("selected")
    $buttonWeek.addClass("selected")
    $buttonAll.removeClass("selected")
    $from.val(weekAgo); $to.val(max);
  });

  $buttonAll.on("click", function(ev){
    $buttonMonth.removeClass("selected")
    $buttonWeek.removeClass("selected")
    $buttonAll.addClass("selected");
    $from.val(min); $to.val(max);
  });

  $buttonProfit.on("click", function(ev){
    var range = $widget.find("button.selected:first").attr("class");
    alert(range);
  });

  $buttonAll.trigger("click");
});
