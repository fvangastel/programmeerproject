/*
* Felicia van Gastel
* 11096187
*
* barchart.js
* script for barchart using json datafile.
*
* programmeerproject
* june 2018
*
* source: https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4
*/

// set the dimensions and margins of the graph
var marginBar = {top: 20, right: 20, bottom: 30, left: 60},
    widthBar = 350 - marginBar.left - marginBar.right,
    heightBar = 250 - marginBar.top - marginBar.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, widthBar])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([heightBar, 0]);

// set up the axis
var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y);

// set svg of the bar as global variable
var svgBar;

function makeBar (barData) {

  // append svg object for the barchart
  svgBar = d3.select("#barchart").append("svg")
      .attr("width", widthBar + marginBar.left + marginBar.right)
      .attr("height", heightBar + marginBar.top + marginBar.bottom)
    .append("g")
      .attr("transform",
            "translate(" + marginBar.left + "," + marginBar.top + ")");

    var array = [];

    let keys = Object.keys(barData[1990].WLD);

    for (i = 1; i < keys.length; i++){
        array.push({"name": keys[i], "emission": Number((barData[1990].WLD[keys[i]]).replace(",", "."))})
    };

    // scale the range of the data in the domains
    x.domain(array.map(function(d) { return d.name; }));
    y.domain([0, d3.max(array, function(d) { return d.emission; })]);

    // initialize tip to create interactivity of bars
    var barTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-10, 0])
        .html(function(d) {
          return (d.name) + "<br><span>" + d3.format(",.0f")(d.emission) + " (" + (d3.format(".2%")(d.emission/d3.sum(array.map(function(v){ return v.emission; })))) +  ")" + "</span>";
      });

    // call tip
    svgBar.call(barTip);

    // append the rectangles for the bar chart
    svgBar.selectAll(".bar")
        .data(array)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.name); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.emission); })
        .attr("height", function(d) { return heightBar - y(d.emission); })
        .on('mouseover', barTip.show) // interactivity of the bars
        .on('mouseout', barTip.hide)
        .attr("fill", function(d){
            if (d.name == "CO2"){
                return "#40004b"
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
};

function updateBar (barData, currentYear, currentID){

    // update bar if data is available
    try {

        // set up an empty array
        var array = [];

        // get keys of current country
        let keys = Object.keys(barData[currentYear][currentID]);

        // put data of current country in an array
        for (i = 1; i < keys.length; i++){
            array.push({"name": keys[i], "emission": Number((barData[currentYear][currentID][keys[i]]).replace(",", "."))})

        // remove possible text
        svgBar.select("text.noData").remove();

        // set right opacity
        svgBar.selectAll(".bar")
          .style("opacity", 1)

        // update y axis
        y.domain([0, d3.max(array, function(d) { return d.emission; })]);

        d3.select(".yAxis")
          .transition()
          .duration(1000)
          .call(yAxis)

        // use new data to update bars
        var bars = svgBar.selectAll(".bar")
            .data(array)

        bars
            .transition().duration(1000)
            .attr("y", function(d) { return y(d.emission); })
            .attr("height", function(d) { return heightBar - y(d.emission); });
    };

    // show text if data is not available
    } catch (e) {

        // remove possible text
        svgBar.select("text.noData").remove();
        svgBar.selectAll(".bar")
          .style("opacity", 1)

        // add text
        svgBar.append("text")
         .attr("class", "noData")
         .text("No data available")
         .style("font-size", "20px")
         .attr("y", 100)
         .attr("x", 30);

        // set up new opacity
        svgBar.selectAll(".bar")
          .style("opacity", 0.5)
    };

  // change title
  document.getElementById("titleBar").innerHTML = "Emissions (MtCO2e) per gas in <br>" + currentCountry + ", " + currentYear;
};
