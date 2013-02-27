describe("DateSelector", function() {
  var dateSelector;

  beforeEach(function() {
    dateSelector = new DateSelector("01/01/2013", "28/02/2013")
  });

  it("defaults to showing the whole range", function() {
    expect(dateSelector.currentRange()).toEqual("all");
  });

  it("allows changing ranges", function() {
    expect(dateSelector.inRange("all")).toEqual(true);
    expect(dateSelector.inRange("week")).toEqual(false);
    expect(dateSelector.currentRange()).toEqual("all");

    dateSelector.setRange("week");

    expect(dateSelector.inRange("all")).toEqual(false);
    expect(dateSelector.inRange("week")).toEqual(true);
    expect(dateSelector.currentRange()).toEqual("week");
  });
});
