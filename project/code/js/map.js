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

var totalYears = 43;
var widthMap = 800
var heightMap = 400

currentID = "WLD";
currentYear = "1990";

var color = d3.scaleThreshold()
    .domain([50000, 100000, 250000, 500000, 1000000, 2500000, 5000000,
      7500000, 10000000])
    .range(colorbrewer.Reds[9]);

var projection = d3.geoMercator()
                   .scale(130)
                   .translate( [widthMap / 2, heightMap / 1.5]);

var path = d3.geoPath().projection(projection);

function makeMap (mapData, emissionData) {

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

    var mapTip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                if (d.properties.value == 0 || NaN) {
                    return d.properties.name + "<br>" +
                        "<span>" + "No data" + "</span>";
                }
                else {
                    return d.properties.name + "<br>" +
                        "<span>" + d3.format(",")(d.properties.value) + "</span>";
                }
            });

    svgMap.call(mapTip);

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
        .style("stroke","slategrey")
        .style('stroke-width', 0.3)
        .on('mouseover',function(d){
          mapTip.show(d);
          d3.select(this)
            .style("opacity", 0.8)
            .style("stroke","slategrey")
            .style("stroke-width", 3);
        })
        .on('mouseout', function(d){
          mapTip.hide(d);
          d3.select(this)
            .style("opacity", 1.0)
            .style("stroke","slategrey")
            .style("stroke-width",0.3);
        })
        .on('click', function(d){
          currentID = d.id;
          currentCountry = d.properties.name;
          updateBar(barData, currentYear, currentID)
          updateRadar(radarData, currentYear, currentID)
        });
      makeSlider();
      makeLegend();
}

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
      .labels(d3.legendHelpers.thresholdLabels)
      .orient("horizontal")
      .labelFormat(d3.format(","))
      .scale(threshold);

    g.call(legend);
}

// function that updates the map
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

                    // color country grey if no data
                    d3.select("#" + mapID)
                      .style("fill", function(){
                          if (emission == 0 || NaN) {
                              return 'lightgray';
                          }
                          else {
                              return color(emission);
                          }
                      });
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
      });

    // update title map
    document.getElementById("titleMap").innerHTML = "Annual greenhouse gas emissions (ktCO2e) per country, " + currentYear;
}
