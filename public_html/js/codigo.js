$(document).ready(function () {

});
function cargarTiempo() {
    guarda();
    var ciudad = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + $("input[name=ciudades]").val() + "&mode=xml&units=metric&cnt=7&&appid=8ee3ae12c9b976817444cfad6c6add4f";
    var tiempo = "";    
    alert(ciudad);
    $.get(ciudad, function (data) {
        $(data).find("forecast>time").each(
                function (i, dia) {
                    tiempo += $(dia).find("symbol").attr("name") + " ";
                });
        $("#tiempo16dias").html(tiempo);
    });
}
function recuperarArray() {
    var guardar = localStorage.getItem("prueba");
    if (guardar === null)
        guardar = new Array();
    else
        guardar = JSON.parse(localStorage.getItem("prueba"));

    return guardar;
}
function guarda() {
    var guardar = recuperarArray();
    guardar[guardar.length] = $("#ciudades").val();
    localStorage.setItem("prueba", JSON.stringify(guardar));
}