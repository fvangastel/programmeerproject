function select() {

    $("#selectCountry").change(function(){
        var $option = $(this).find("option:selected");
        currentID = $option.val();
        currentCountry = $option.text();
        updateBar(barData, currentYear, currentID);
        updateRadar(radarData, currentYear, currentID);
})}

function makeSlider () {

    // put in a slider to slide over the years
    var slider = d3.sliderHorizontal()
      .min(1990)
      .max(2012)
      .step(1)
      .width(800)
      .tickFormat(d3.format(""))
      .on('onchange', val => {
          currentYear = val;
          updateMap(currentYear);
          updateBar(barData, currentYear, currentID);
          updateRadar(radarData, currentYear, currentID);
      });

    var g = d3.select("#sliderMap").append("svg")
      .attr("width", 1000)
      .attr("height", 75)
      .append("g")
      .attr("transform", "translate(50,20)");

    g.call(slider);
}
