/**
* Felicia van Gastel
* 11096187
*
* main.js
* main script that gets the data and makes the charts
*
* programmeerproject
* june 2018
**/

// set up global variables
var mapData;
var emissionData;
var currentYear = 1990;
var currentID;

// load the 3 json files
window.onload = function() {
    d3.queue()
        .defer(d3.json, "data/world_countries.json")
        .defer(d3.json, "data/total-greenhouse-gas-emissions.json")
        .defer(d3.json, "data/newData/emissions-by-gas.json")
        .defer(d3.json, "data/newData/emissions-by-sector-percentages.json")
        .awaitAll(function(error, data){getData(error, data)});
};

// stores the collected data in the global variables
function getData(error, data) {
    if (error) throw error;

    // storing the data with data 2006 as initial data
    mapData = data[0];
    emissionData = data[1];
    barData = data[2];
    radarData = data[3];

    // call other visualization functions
    makeMap(currentYear, mapData, emissionData);
    makeBar(barData);
    makeRadar(radarData);
};
