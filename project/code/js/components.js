/*
* Felicia van Gastel
* 11096187
*
* components.js
* script containing functions for the select bar and slider
*
* programmeerproject
* june 2018
*
* source: https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4
*/

/*
* Updates the visualizations with selected country
*/
function select() {

    $("#selectCountry").change(function(){
        var $option = $(this).find("option:selected");
        currentID = $option.val();
        currentCountry = $option.text();
        updateBar(barData, currentYear, currentID);
        updateRadar(radarData, currentYear, currentID);
})}

/*
* Updates the visualizations with selected year
*/
function makeSlider () {

    // make a slider to slide over the years
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

    // put slider in svg
    var g = d3.select("#sliderMap").append("svg")
      .attr("width", 1000)
      .attr("height", 75)
      .append("g")
      .attr("transform", "translate(50,20)");

    g.call(slider);
}
