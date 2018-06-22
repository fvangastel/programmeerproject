/*
* Felicia van Gastel
* 11096187
*
* map.js
* script that makes the map
*
* programmeerproject
* june 2018
*
* source: http://bl.ocks.org/micahstubbs/8e15870eb432a21f0bc4d3d527b2d14f
*/

// TO DO:
// NIEUWE DATA ERIN ZETTEN

var totalYears = 43;
var currentID = "WLD";
var currentCountry = "World";

var widthMap = 800
var heightMap = 400

var color = d3.scaleThreshold()
    .domain([50000, 100000, 250000, 500000, 1000000, 2500000, 5000000,
      7500000, 10000000])
    .range(colorbrewer.Reds[9]);

var projection = d3.geoMercator()
                   .scale(130)
                   .translate( [widthMap / 2, heightMap / 1.5]);

var path = d3.geoPath().projection(projection);

function makeMap (currentYear, mapData, emissionData) {

    // iterate over the data file and separate into name and population value
    for (var i = 0; i < emissionData.length; i++) {
        for (var j = 0; j < totalYears; j++) {

            var dataID = emissionData[i].id;
            var emission = emissionData[i].values[j].emission;
            var year = emissionData[i].values[j].year;

            // iteratue over the world data file and store country name in variable
            for (var k = 0; k < mapData.features.length; k++) {
                var mapID = mapData.features[k].id;

                // link the emission data if country names in the two files match
                if (dataID == mapID && year == currentYear) {
                    mapData.features[k].properties.value = emission;
                    mapData.features[k].properties.color = color(emission);
                    break;
                }
            }
        }
    }

    var svgMap = d3.select("#visualMap")
                .append("svg")
                .attr("width", widthMap)
                .attr("height", heightMap)
                .append('g')
                .attr('class', 'map');

    var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              if (d.properties.value == 0 || NaN) {
                  return "<strong>Country: </strong><span class='details'>" +
                      d.properties.name + "<br></span>" +
                      "<strong>Emission: </strong><span class='details'>" +
                      "No data" +"</span>";
              }
              else {
                  return "<strong>Country: </strong><span class='details'>" +
                      d.properties.name + "<br></span>" +
                      "<strong>Emission: </strong><span class='details'>" +
                      d3.format(",")(d.properties.value) +"</span>";
              }

            })

    svgMap.call(tip);

    svgMap.append("g")
        .attr("class", "countries")
      .selectAll("path")
        .data(mapData.features)
      .enter().append("path")
        .attr("d", path)
        .attr("id", function(d){
            return d.id})
        .style("fill", function(d){
            if (d.properties.value == 0 || NaN) {
                return "lightgray";
            }
            else {
                return color(d.properties.value);
            }
          })
        .style('stroke', 'slategrey')
        .style('stroke-width', 1.5)
        // tooltips
          .style("stroke","slategrey")
          .style('stroke-width', 0.3)
          .on('mouseover',function(d){
            tip.show(d);

    d3.select(this)
      .style("opacity", 0.8)
      .style("stroke","slategrey")
      .style("stroke-width",3);
  })
      .on('mouseout', function(d){
        tip.hide(d);
        d3.select(this)
          .style("opacity", 1.0)
          .style("stroke","slategrey")
          .style("stroke-width",0.3);
      })
      .on('click', function(d){
        currentID = d.id;
        currentCountry = d.properties.name;
        updateBar(barData, currentYear, currentID)
        document.getElementById("titleBar").innerHTML = "Emissions per gas in " + currentCountry + ", " + currentYear + " (ktCO2e)";
      });

    makeSlider();
    makeLegend();

};

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
        document.getElementById("titleMap").innerHTML = "Annual greenhouse gas emissions per country (ktCO2e), " + String(val);
        document.getElementById("titleBar").innerHTML = "Emissions per gas in " + currentCountry + ", " + String(val) + " (MtCO2e)";
        updateMap(currentYear);
        updateBar(barData, currentYear, currentID);
      });

    var g = d3.select("#sliderMap").append("svg")
      .attr("width", 1000)
      .attr("height", 75)
      .append("g")
      .attr("transform", "translate(50,20)");

    g.call(slider);
};

function makeLegend () {
    var threshold = d3.scaleThreshold()
      .domain([50, 100, 250, 500, 1000, 2500, 5000,
        7500, 10000])
      .range(colorbrewer.Reds[9]);

    var g = d3.select("#legendMap").append("svg")
      .attr("width", 1000)
      .attr("height", 50)
      .append("g")
      .attr("transform", "translate(30, 0)");

    var legend = d3.legendColor()
      .shapeWidth(90)
      .cells(10)
      .orient('horizontal')
      .scale(threshold)
      .labelFormat(d3.format(","));

    g.call(legend);
};

function updateMap(currentYear, barData) {

    // iterate over the emission data per country and per year
    for (var i = 0; i < emissionData.length; i++) {
        for (var j = 0; j < totalYears; j++) {

            // seperate the data of country in id, emission and year
            var dataID = emissionData[i].id;
            var emission = emissionData[i].values[j].emission;
            var year = emissionData[i].values[j].year;

            // iteratue over the map data file and store country id in variable
            for (var k = 0; k < mapData.features.length; k++) {
                var mapID = mapData.features[k].id;

                // link the emission data if country id's in the two files match
                if (dataID == mapID && year == currentYear) {
                    mapData.features[k].properties.value = emission;

                    d3.select("#" + mapID)
                        .style("fill", function(){
                            if (emission == 0 || NaN) {
                                return 'lightgray';
                            }
                            else {
                                return color(emission);
                            }
                        })
                    break;
                }
            }
          }
        }

        // update map colors
        d3.select("#" + mapID)
            .style("fill", function(){
                if (emission == 0 || NaN) {
                    return 'lightgray';
                }
                else {
                    return color(emission);
                }
            })
};

function searchbar(){

    $(".selectpicker").click(function(event) {
        $('.selectpicker').selectpicker();
        console.log("option clicked");
        console.log($('select[name=countrySelection]').val(1));
        console.log($('.selectpicker').selectpicker('refresh'));
    })

};

// function dropdownUpdate(){
//
//     // Create a dropdown
//     var dropdown = d3.select("#myDropdown")
//
//     dropdown.append("select")
//        .selectAll("option")
//        .data(nest)
//        .enter()
//        .append("option")
//        .attr("value", function(d){
//            return d.id;
//        })
//        .text(function(d){
//            return d.name;
//        })
//
//     // Run update function when dropdown selection changes
//    	dropdown.on('change', function(){
//
//         // Find which fruit was selected from the dropdown
//         var currentID = d3.select(this)
//             .select("select")
//             .property("value")
//
//         document.getElementById("titleMap").innerHTML = "Annual greenhouse gas emissions per country (MtCO2e), " + String(val);
//         document.getElementById("titleBar").innerHTML = "Emissions per gas in " + currentCountry + ", " + String(val) + " (MtCO2e)";
//
//         updateBar(barData, currentYear, currentID);
//
//     });
// };
