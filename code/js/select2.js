$(".selectpicker").click(function(event) {
    console.log(event)
    $('.selectpicker').selectpicker();
    console.log("option clicked");
    console.log($('select[name=countrySelection]').val(1));
    console.log($('.selectpicker').selectpicker('refresh'));
})
