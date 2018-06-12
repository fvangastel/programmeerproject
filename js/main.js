/**
* Felicia van Gastel
* 11096187
*
* main.js
* main script that gets the data and makes the charts
*
**/

// set up global variables
var totalCO2;

// load the 3 json files
window.onload = function() {
    d3.queue()
        .defer(d3.json, "data/world_countries.json")
        .defer(d3.json, "data/totalCO2emissions.json")
        .awaitAll(function(error, data){getData(error, data)});
};

// stores the collected data in the global variables
function getData(error, data) {
    if (error) throw error;

    // storing the data with data 2006 as initial data
    mapData = data[0];
    comissionData = data[1];
    
    console.log(mapData);
    console.log(comissionData);

    // call other visualization functions
    makeMap(mapData, comissionData);
};
