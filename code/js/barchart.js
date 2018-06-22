/*
* Felicia van Gastel
* 11096187
*
* barchart.js
* script for barchart using json file.
*
* programmeerproject
* june 2018
*/

// TO DO:
// - informatie bij de assen zetten

// set the dimensions and margins of the graph
var marginBar = {top: 20, right: 20, bottom: 30, left: 60},
    widthBar = 350 - marginBar.left - marginBar.right,
    heightBar = 300 - marginBar.top - marginBar.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, widthBar])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([heightBar, 0]);

var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y);

var svgBar;
var array;

function makeBar (barData) {

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  svgBar = d3.select("#barchart").append("svg")
      .attr("width", widthBar + marginBar.left + marginBar.right)
      .attr("height", heightBar + marginBar.top + marginBar.bottom)
    .append("g")
      .attr("transform",
            "translate(" + marginBar.left + "," + marginBar.top + ")");

    var keys = Object.keys(barData[1990].WLD);
    array = [];

    for (i = 1; i < keys.length; i++){
        array.push({"name": keys[i], "emission": Number((barData[1990].WLD[keys[i]]).replace(",", "."))})
    };


    // Scale the range of the data in the domains
    x.domain(array.map(function(d) { return d.name; }));
    y.domain([0, d3.max(array, function(d) { return d.emission; })]);

    // initialize tip to create interactivity of bars
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          return d3.format(".2%")(d.emission/d3.sum(array.map(function(v){ return v.emission; })));
      });

    // Call tip
    svgBar.call(tip);

    // append the rectangles for the bar chart
    svgBar.selectAll(".bar")
        .data(array)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.name); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.emission); })
        .attr("height", function(d) { return heightBar - y(d.emission); })
        .on('mouseover', tip.show) // interactivity of the bars
        .on('mouseout', tip.hide)
        .attr("fill", function(d){
            if (d.name == "CO2"){
                return "#b2182b"
            };
            if (d.name == "CH4"){
                return "#1b7837";
            };
            if (d.name == "N2O"){
                return "#4575b4"
            };
            if (d.name == "F-GAS"){
                return "#fec44f"
            };
        });

    // add the x Axis
    svgBar.append("g")
    	  .attr("class", "xAxis")
        .attr("transform", "translate(0," + heightBar + ")")
        .call(xAxis);

    // add the y Axis
    svgBar.append("g")
        .attr("class", "yAxis")
        .call(yAxis);

  // });
};

function updateBar (barData, currentYear, currentID){

  array = [];

  var keys = Object.keys(barData[currentYear][currentID]);

  for (i = 1; i < keys.length; i++){
      array.push({"name": keys[i], "emission": Number((barData[currentYear][currentID][keys[i]]).replace(",", "."))})
  };

  y.domain([0, d3.max(array, function(d) { return d.emission; })]);

  d3.select(".yAxis")
    .transition()
    .duration(1000)
    .call(yAxis)

  var bars = svgBar.selectAll(".bar")
      .data(array)

  bars
      .transition().duration(1000)
      .attr("y", function(d) { return y(d.emission); })
      .attr("height", function(d) { return heightBar - y(d.emission); });
};
