function select() {

    $("#selectCountry").change(function(){
        var $option = $(this).find("option:selected");
        currentID = $option.val();
        currentCountry = $option.text();

        updateBar(barData, currentYear, currentID);
        makeRadar(radarData, currentYear, currentID);
})};
