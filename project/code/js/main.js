/**
* Felicia van Gastel
* 11096187
*
* main.js
* main script that gets the data and calls the functions to make the charts
*
* programmeerproject
* june 2018
**/

// set up global variables
var mapData;
var emissionData;
var barData;
var radarData;
var currentYear = "1990";
var currentCountry = "World";
var currentID = "WLD";

/*
* Function that loads the data files
*/
window.onload = function() {
    d3.queue()
      .defer(d3.json, "project/data/world_countries.json")
      .defer(d3.json, "project/data/emissions-totals.json")
      .defer(d3.json, "project/data/emissions-by-gas.json")
      .defer(d3.json, "project/data/emissions-by-sector-percentages.json")
      .awaitAll(function(error, data){getData(error, data)});
}

/*
* Function that stores the collected data in the global variables
*/
function getData(error, data) {
    if (error) throw error;

    // storing the data with data 2006 as initial data
    mapData = data[0];
    emissionData = data[1];
    barData = data[2];
    radarData = data[3];

    // call other visualization functions
    makeMap(mapData, emissionData);
    makeBar(barData);
    makeRadar(radarData, currentYear, currentID);
    makeSlider();
    select();
}
