/*
* Felicia van Gastel
* 11096187
*
* map.js
* script that makes the map
*
* source: http://bl.ocks.org/micahstubbs/8e15870eb432a21f0bc4d3d527b2d14f
*/

function makeMap (mapData, comissionData) {

    var margin = {top: 0, right: 0, bottom: 0, left: 0},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

    // push necessary data into array and clean (possible) initial array
    var dataArray = [];
    dataArray.length = 0;

    comissionData.forEach(function(d) {
        dataArray.push(+d[2014]);
    });

    console.log(dataArray);

    var color = d3.scaleThreshold()
        .domain([500, 100000, 250000, 500000, 1000000, 2500000, 5000000,
          7500000, 10000000])
        .range(colorbrewer.Reds[9]);

    var path = d3.geoPath();

    var svg = d3.select("body")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append('g')
                .attr('class', 'map');

    var projection = d3.geoMercator()
                       .scale(130)
                      .translate( [width / 2, height / 1.5]);

    var path = d3.geoPath().projection(projection);

    var emissionById = {};

    comissionData.forEach(function(d) {emissionById[d.id] = +d[2014]; });
    mapData.features.forEach(function(d) { d[2014] = emissionById[d.id] });

    console.log(emissionById);

    var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              console.log(d);
              return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>CO2 Emission: </strong><span class='details'>" + (d[2014]) +"</span>";
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
        .style("opacity",0.8)
        // tooltips
          .style("stroke","white")
          .style('stroke-width', 0.3)
          .on('mouseover',function(d){
            tip.show(d);

            d3.select(this)
              .style("opacity", 1)
              .style("stroke","white")
              .style("stroke-width",3);
          })
          .on('mouseout', function(d){
            tip.hide(d);
            d3.select(this)
              .style("opacity", 0.8)
              .style("stroke","white")
              .style("stroke-width",0.3);
          });
}
