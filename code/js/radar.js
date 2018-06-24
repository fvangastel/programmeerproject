/*
* Felicia van Gastel
* 11096187
*
* radar.js
* script for radar chart using json datafile.
*
* programmeerproject
* june 2018
*/

var g;
var allAxis;
var total;

// set up width and height for svg
var widthSvg = 300,
    heightSvg = 300;

// make svg
var svg = d3.select("#radar")
    .append('svg')
    .attr("width", widthSvg)
    .attr("height", heightSvg);

// set up configutation for the radar chart
var cfg = {
    radius: 5,
    w: 200,
    h: 200,
    factor: 1,
    factorLegend: .85,
    levels: 5,
    maxValue: 100,
    radians: 2 * Math.PI,
    opacityArea: 0.5,
    ToRight: 5,
    TranslateX: 80,
    TranslateY: 30,
    ExtraWidthX: 150,
    ExtraWidthY: 150,
    color: d3.scaleOrdinal().range(["#6F257F", "#CA0D59"])
};

function makeRadar (radarData) {

    // put current dict data in an array
    var keys = Object.keys(radarData[2006].NLD);
    array = [];

    for (i = 1; i < keys.length; i++){
        array.push({"name": keys[i], "value": Number((radarData[2006].NLD[keys[i]]).replace(",", "."))})
    };

    // console.log(array)

    // create names for axis
    allAxis = (array.map(function(i){return i.name}));

    // indicate number of names
    total = allAxis.length;

    var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
    // var Format = d3.format('%');
    d3.select("#radar").select("svg").remove();

    // set up the radar
    g = d3.select("#radar")
      .append("svg")
      .attr("width", cfg.w+cfg.ExtraWidthX)
      .attr("height", cfg.h+cfg.ExtraWidthY)
      .append("g")
      .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");

    // initialize tooltip
    var tooltip;

    // create circular segments
    for (var j = 0; j < cfg.levels; j++){
         var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
         g.selectAll(".levels")
          .data(allAxis)
          .enter()
          .append("svg:line")
          .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
          .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
          .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
          .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
          .attr("class", "line")
          .style("stroke", "grey")
          .style("stroke-opacity", "0.75")
          .style("stroke-width", "0.3px")
          .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
    }

    // set up legend of levels
    for (var j = 0; j < cfg.levels; j++){
        var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
        g.selectAll(".levels")
         .data([1]) //dummy data
         .enter()
         .append("svg:text")
         .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
         .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
         .attr("class", "legend")
         .style("font-family", "sans-serif")
         .style("font-size", "10px")
         .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
         .attr("fill", "#737373")
         .text((j+1)*100/cfg.levels);
    }

    series = 0;

    // create the axis
    var axis = g.selectAll(".axis")
      .data(allAxis)
      .enter()
      .append("g")
      .attr("class", "axis");

    // append lines between the axis
    axis.append("line")
      .attr("x1", cfg.w/2)
      .attr("y1", cfg.h/2)
      .attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
      .attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
      .attr("class", "line")
      .style("stroke", "grey")
      .style("stroke-width", "1px");

    // append text to axis
    axis.append("text")
      .attr("class", "legend")
      .text(function(d){return d})
      .style("font-family", "sans-serif")
      .style("font-size", "11px")
      .attr("text-anchor", "middle")
      .attr("dy", "1.5em")
      .attr("transform", function(d, i){return "translate(0, -10)"})
      .attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-60*Math.sin(i*cfg.radians/total);})
      .attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});

    var dataValues = [];

    //
    array.forEach(function(y, x){

        //set up nodes with correct coordinates
        g.selectAll(".nodes")
         .data([array], function(){

            console.log(y); //  een object
            console.log(x); // objectnr

            dataValues.push([
               cfg.w/2*(1-(parseFloat(Math.max(y.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(x*cfg.radians/total)),
               cfg.h/2*(1-(parseFloat(Math.max(y.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(x*cfg.radians/total))
             ]);
         });

        // dataValues.push(dataValues[0]);

         console.log(dataValues);

         // set up the area between the nodes
         g.selectAll(".area")
          .data([dataValues])
          .enter()
          .append("polygon")
          .attr("class", "radar-chart-serie"+series)
          .style("stroke-width", "2px")
          .style("stroke", cfg.color(series))
          .attr("points",function(d) {
            var str="";
            for (var pti=0;pti<d.length; pti++){
                str=str+d[pti][0] + "," + d[pti][1] + " ";
            }
            console.log(str);
            return str;
          })
          .style("fill", function(){return cfg.color(series)})
          .style("fill-opacity", cfg.opacityArea)
          .on('mouseover', function (d){
             console.log(d);
             z = "polygon."+d3.select(this).attr("class");
             g.selectAll("polygon")
              .transition(200)
              .style("fill-opacity", 0.1);
             g.selectAll(z)
              .transition(200)
              .style("fill-opacity", .7);
                 })
          .on('mouseout', function(){
             g.selectAll("polygon")
              .transition(200)
              .style("fill-opacity", cfg.opacityArea);
          });
      // series++;

      });
   // series=0;

   var tooltip = d3.select("body").append("div").attr("class", "toolTip");
       array.forEach(function(y, x){

         g.selectAll(".nodes")
         .data([array]).enter() // data is volledige array met objecten, klopt
         .append("svg:circle")
         .attr("class", "radar-chart-serie"+series)
         .attr('r', cfg.radius)
         .attr("alt", function(){
           console.log(y); // loop die langs objecten loopt, klopt
           return Math.max(y.value, 0)})
         .attr("cx", function(){
           console.log(y); // loop die langs objecten loopt, klopt
           console.log(x); // objectnummer, klopt
           dataValues.push([
           cfg.w/2*(1-(parseFloat(Math.max(y.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(x*cfg.radians/total)),
           cfg.h/2*(1-(parseFloat(Math.max(y.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(x*cfg.radians/total))
         ]);
         return cfg.w/2*(1-(Math.max(y.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(x*cfg.radians/total));
         })
         .attr("cy", function(){
           return cfg.h/2*(1-(Math.max(y.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(x*cfg.radians/total));
         })
         .attr("data-id", function(){return y.name})
         .style("fill", "#fff")
         .style("stroke-width", "2px")
         .style("stroke", cfg.color(series)).style("fill-opacity", .9)
         .on('mouseover', function (){
           console.log(y.name)
               tooltip
                 .style("left", d3.event.pageX - 40 + "px")
                 .style("top", d3.event.pageY - 80 + "px")
                 .style("display", "inline-block")
         				.html((y.name) + "<br><span>" + d3.format(".2f")(y.value) + "%" + "</span>");
               })
       		.on("mouseout", function(d){ tooltip.style("display", "none");});

         // series++;
       });
     };

  function updateRadar(radarData, currentYear, currentID){

    array = [];
    var keys = Object.keys(radarData[currentYear][currentID]);

    for (i = 1; i < keys.length; i++){
        array.push({"name": keys[i], "value": Number((radarData[currentYear][currentID][keys[i]]).replace(",", "."))})
    };

    console.log(array);

    var dataValues = [];

    //
    array.forEach(function(y, x){

        //set up nodes with correct coordinates
        g.selectAll(".nodes")
         .data([array], function(){

            console.log(y); //  een object
            console.log(x); // objectnr

            dataValues.push([
               cfg.w/2*(1-(parseFloat(Math.max(y.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(x*cfg.radians/total)),
               cfg.h/2*(1-(parseFloat(Math.max(y.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(x*cfg.radians/total))
             ]);
         });

        // dataValues.push(dataValues[0]);

         console.log(dataValues);

         // set up the area between the nodes
         g.selectAll(".area")
          .data([dataValues])
          .enter()
          .select("polygon")
          .attr("class", "radar-chart-serie"+series)
          .style("stroke-width", "2px")
          .style("stroke", cfg.color(series))
          .attr("points",function(d) {
            var str="";
            for (var pti=0;pti<d.length; pti++){
                str=str+d[pti][0] + "," + d[pti][1] + " ";
            }
            console.log(str);
            return str;
          })
          .style("fill", function(){return cfg.color(series)})
          .style("fill-opacity", cfg.opacityArea)
          .on('mouseover', function (d){
             console.log(d);
             z = "polygon."+d3.select(this).attr("class");
             g.selectAll("polygon")
              .transition(200)
              .style("fill-opacity", 0.1);
             g.selectAll(z)
              .transition(200)
              .style("fill-opacity", .7);
                 })
          .on('mouseout', function(){
             g.selectAll("polygon")
              .transition(200)
              .style("fill-opacity", cfg.opacityArea);
        });
      // series++;

    });
    // series=0;

    var tooltip = d3.select("body").select("div").attr("class", "toolTip");

       array.forEach(function(y, x){

         g.selectAll(".nodes")
         .data([array]).enter() // data is volledige array met objecten, klopt
         .select (".circle")
         .attr("class", "radar-chart-serie"+series)
         .attr('r', cfg.radius)
         .attr("alt", function(){
           console.log(y); // loop die langs objecten loopt, klopt
           return Math.max(y.value, 0)})
         .attr("cx", function(){
           console.log(y); // loop die langs objecten loopt, klopt
           console.log(x); // objectnummer, klopt
           dataValues.push([
           cfg.w/2*(1-(parseFloat(Math.max(y.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(x*cfg.radians/total)),
           cfg.h/2*(1-(parseFloat(Math.max(y.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(x*cfg.radians/total))
         ]);
         return cfg.w/2*(1-(Math.max(y.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(x*cfg.radians/total));
         })
         .attr("cy", function(){
           return cfg.h/2*(1-(Math.max(y.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(x*cfg.radians/total));
         })
         .attr("data-id", function(){return y.name})
         .style("fill", "#fff")
         .style("stroke-width", "2px")
         .style("stroke", cfg.color(series)).style("fill-opacity", .9)
         .on('mouseover', function (){
           console.log(y.name)
               tooltip
                 .style("left", d3.event.pageX - 40 + "px")
                 .style("top", d3.event.pageY - 80 + "px")
                 .style("display", "inline-block")
                .html((y.name) + "<br><span>" + d3.format(".2f")(y.value) + "%" + "</span>");
               })
          .on("mouseout", function(d){ tooltip.style("display", "none");});


  });

};
