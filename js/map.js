/*
* Felicia van Gastel
* 11096187
*
* map.js
* script that makes the map
*
* source: http://bl.ocks.org/micahstubbs/8e15870eb432a21f0bc4d3d527b2d14f
*/

var currentYear = 1960;
var emissionById = {};
var comissionData
var mapData

function makeMap (mapData, comissionData) {

    var margin = {top: 0, right: 0, bottom: 0, left: 0},
                width = 900 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

    var color = d3.scaleThreshold()
        .domain([50000, 100000, 250000, 500000, 1000000, 2500000, 5000000,
          7500000, 10000000])
        .range(colorbrewer.Reds[9]);

    var path = d3.geoPath();

    var svg = d3.select("#map")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append('g')
                .attr('class', 'map');

    var projection = d3.geoMercator()
                       .scale(130)
                       .translate( [width / 2, height / 1.5]);

    var path = d3.geoPath().projection(projection);

    comissionData.forEach(function(d) {emissionById[d.id] = +d[1960]; });
    mapData.features.forEach(function(d) { d[1960] = emissionById[d.id] });

    console.log(emissionById);

    var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              console.log(d);
              return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>CO2 Emission: </strong><span class='details'>" + d3.format(",")(d[1960]) +"</span>";
            })

    svg.call(tip);

    svg.append("g")
        .attr("class", "countries")
      .selectAll("path")
        .data(mapData.features)
      .enter().append("path")
        .attr("d", path)
        .style("fill", function(d) { return color(emissionById[d.id]); })
        .style('stroke', 'white')
        .style('stroke-width', 1.5)
        // tooltips
          .style("stroke","white")
          .style('stroke-width', 0.3)
          .on('mouseover',function(d){
            tip.show(d);

    d3.select(this)
      .style("opacity", 0.8)
      .style("stroke","white")
      .style("stroke-width",3);
  })
      .on('mouseout', function(d){
        tip.hide(d);
        d3.select(this)
          .style("opacity", 1.0)
          .style("stroke","white")
          .style("stroke-width",0.3);
      });

    makeSlider();
    makeLegend();
};

function makeSlider () {
    // put in a slider to slide over the years
    var slider = d3.sliderHorizontal()
      .min(1960)
      .max(2014)
      .step(1)
      .width(800)
      .tickFormat(d3.format(""))
      .on('onchange', val => {
        currentYear = val;
        document.getElementById("title").innerHTML = "CO2 emissions for the year " + String(val);
        updateMap(currentYear);
      });

    var g = d3.select("#sliderMap").append("svg")
      .attr("width", 1000)
      .attr("height", 75)
      .append("g")
      .attr("transform", "translate(50,20)");

    g.call(slider);
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
      .cells(10)
      .orient('horizontal')
      .scale(threshold)
      .labelFormat(d3.format(","));

    g.call(legend);
};

function updateMap(currentYear, comissionData, mapData) {

    var map = d3.select("#map")
    console.log(comissionData);
    comissionData.forEach(function(d) {emissionById[d.id] = +d[currentYear]; });
    mapData.features.forEach(function(d) { d[currentYear] = emissionById[d.id] });
};
