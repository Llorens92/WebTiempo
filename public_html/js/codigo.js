$(document).ready(function () {

});
function cargarTiempo() {
    guarda();
    var ciudad = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + $("input[name=ciudades]").val() + "&lang=es&mode=xml&units=metric&cnt=8&&appid=8ee3ae12c9b976817444cfad6c6add4f";
    $.get(ciudad, function (data) {
        $(data).find("forecast>time").each(
                function (i, dia) {
                    var tiempo = "";
                    var fecha = new Date($(dia).attr("day"));
                    switch (i) {
                        case 0:
                            tiempo += '<p class="diaSemana">Hoy</p>';
                            break;
                        case 1:
                            tiempo += '<p class="diaSemana">Mañana</p>';
                            break;
                        default:
                            switch (fecha.getDay()) {
                                case 0:
                                    tiempo += '<p class="diaSemana">Domingo</p>';
                                    break;
                                case 1:
                                    tiempo += '<p class="diaSemana">Lunes</p>';
                                    break;
                                case 2:
                                    tiempo += '<p class="diaSemana">Martes</p>';
                                    break;
                                case 3:
                                    tiempo += '<p class="diaSemana">Miércoles</p>';
                                    break;
                                case 4:
                                    tiempo += '<p class="diaSemana">Jueves</p>';
                                    break;
                                case 5:
                                    tiempo += '<p class="diaSemana">Viernes</p>';
                                    break;
                                case 6:
                                    tiempo += '<p class="diaSemana">Sábado</p>';
                                    break;
                            }
                    }
                    var fecha = moment($(dia).attr("day"), "YYYY-MM-DD", "es");
                    tiempo += '<p class="fecha">' + fecha.format("DD MMMM") + "</p>";
                    tiempo += '<img class="imgsdias" src="http://openweathermap.org/img/w/' + $(dia).find("symbol").attr("var") + '.png">';
                    tiempo += '<p class="tiempo">' + $(dia).find("symbol").attr("name") + "</p>";                    
                    tiempo += '<p class="tempMax">' + parseInt($(dia).find("temperature").attr("max"), 10) + 'ºC </p>';
                    tiempo += '<p class="tempMin">' + parseInt($(dia).find("temperature").attr("min"), 10) + 'ºC </p>';
                    $("#dia" + i).html(tiempo);
                    $("#dia" + i).css("border","solid 3px #ec971f");
                });
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