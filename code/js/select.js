function select() {

    $("#selectCountry").change(function(){
        var $option = $(this).find("option:selected");
        var value = $option.val();
        console.log(value);

        currentID = value;

        updateBar(barData, currentYear, currentID)
        updateRadar(radarData, currentYear, currentID)
        document.getElementById("titleBar").innerHTML = "Emissions (MtCO2e) per gas in " + currentCountry + ", " + currentYear;
        document.getElementById("titleRadar").innerHTML = "Emissions (%) per sector in " + currentCountry + ", " + currentYear;
    })

};
