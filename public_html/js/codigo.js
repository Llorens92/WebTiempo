$(document).ready(function () {
    var ciudades = new Array();
    $("datalist>option").each(function (i, ciudad) {
        ciudades[i] = $(ciudad).attr("value");
    });
    localStorage.setItem("prueba", JSON.stringify(ciudades));
    $(".divsdias").each(function (i, dia) {
        $(dia).css("display", "none");
    });
    $("#siguientesDias").css("display", "none");
    $("#anterioresDias").css("display", "none");
});
function cargarTiempo() {
    guarda();
    var ciudad = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + $("input[name=ciudades]").val() + "&lang=es&mode=xml&units=metric&cnt=16&&appid=8ee3ae12c9b976817444cfad6c6add4f";
    $.get(ciudad, function (data) {
        $("#nombreCiudad").html('<p id="textoCiudad"> Usted está viendo el tiempo de ' + $("input[name=ciudades]").val() + '</p>');
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
                    $("#dia" + i).css("border", "solid 3px #ec971f");
                    $("#dia" + i).attr("onclick", "cargarTiempoHoras(" + fecha + ")");
                    if (i < 8) {
                        $("#dia" + i).css("display", "inline-block");
                    } else {
                        $("#dia" + i).css("display", "none");
                    }
                });
        $("#siguientesDias").css("display", "inline-block");
        $("#anterioresDias").css("display", "none");
        $("#tiempoHoras").css("display", "none");
        $("#nombreDia").css("display", "none");
    });
}

function cargarTiempoHoras(fecha) {
    $("#tiempoHoras").html("");
    $("#tiempoHoras").css("display", "inline-block");
    fecha = moment(fecha);
    var fechaAux = fecha.format("DD-MM-YYYY");
    fecha = fecha.format("YYYY-MM-DD");
    $("#nombreDia").html('<p id="textoCiudad"> Usted está viendo el tiempo del día ' + fechaAux + '</p>');
    $("#nombreDia").css("display", "inline-block");
    var ciudadHoras = "http://api.openweathermap.org/data/2.5/forecast?q=" + $("input[name=ciudades]").val() + "&lang=es&mode=xml&units=metric&cnt=40&&appid=8ee3ae12c9b976817444cfad6c6add4f";
    $.get(ciudadHoras, function (data) {
        var tiempo = "";
        var boolean = true;
        var contador = 0;
        $(data).find("forecast>time").each(
                function (i, dia) {
                    var fecha2 = moment($(dia).attr("from"), "YYYY-MM-DDTHH:mm:ss", "es");
                    var fechaComp = fecha2.format("YYYY-MM-DD");
                    if (fecha !== fechaComp) {
                        if (i % 2 === 0) {
                            boolean = true;
                        } else {
                            boolean = false;
                        }
                    }
                    if (fecha === fechaComp) {
                        if (contador === 0) {
                            if (i === contador) {
                                tiempo += '<div class="parejaHoras col-md-3 col-sm-6 col-xs-12">';
                            } else if (i % 2 === 0) {
                                tiempo += '</div><div class="parejaHoras col-md-3 col-sm-6 col-xs-12">';
                            }
                            tiempo += '<div class="horas">';
                            tiempo += '<p class="fecha">' + fecha2.format("HH:mm") + "</p>";
                            tiempo += '<img class="imgsdias" src="http://openweathermap.org/img/w/' + $(dia).find("symbol").attr("var") + '.png">';
                            tiempo += '<p class="tiempo">' + $(dia).find("symbol").attr("name") + "</p>";
                            tiempo += '<p class="tempMax">' + parseInt($(dia).find("temperature").attr("max"), 10) + 'ºC </p>';
                            tiempo += '<p class="tempMin">' + parseInt($(dia).find("temperature").attr("min"), 10) + 'ºC </p>';
                            tiempo += '</div>';
                        } else if (boolean === true) {
                            if (i === contador) {
                                tiempo += '<div class="parejaHoras col-md-3 col-sm-6 col-xs-12">';
                            } else if (i % 2 !== 0) {
                                tiempo += '</div><div class="parejaHoras col-md-3 col-sm-6 col-xs-12">';
                            }
                            tiempo += '<div class="horas">';
                            tiempo += '<p class="fecha">' + fecha2.format("HH:mm") + "</p>";
                            tiempo += '<img class="imgsdias" src="http://openweathermap.org/img/w/' + $(dia).find("symbol").attr("var") + '.png">';
                            tiempo += '<p class="tiempo">' + $(dia).find("symbol").attr("name") + "</p>";
                            tiempo += '<p class="tempMax">' + parseInt($(dia).find("temperature").attr("max"), 10) + 'ºC </p>';
                            tiempo += '<p class="tempMin">' + parseInt($(dia).find("temperature").attr("min"), 10) + 'ºC </p>';
                            tiempo += '</div>';
                        } else {
                            if (i === contador) {
                                tiempo += '<div class="parejaHoras col-md-3 col-sm-6 col-xs-12">';
                            } else if (i % 2 === 0) {
                                tiempo += '</div><div class="parejaHoras col-md-3 col-sm-6 col-xs-12">';
                            }
                            tiempo += '<div class="horas" id="hora' + i + '">';
                            tiempo += '<p class="fecha">' + fecha2.format("HH:mm") + "</p>";
                            tiempo += '<img class="imgsdias" src="http://openweathermap.org/img/w/' + $(dia).find("symbol").attr("var") + '.png">';
                            tiempo += '<p class="tiempo">' + $(dia).find("symbol").attr("name") + "</p>";
                            tiempo += '<p class="tempMax">' + parseInt($(dia).find("temperature").attr("max"), 10) + 'ºC </p>';
                            tiempo += '<p class="tempMin">' + parseInt($(dia).find("temperature").attr("min"), 10) + 'ºC </p>';
                            tiempo += '</div>';
                        }
                    } else {
                        contador++;
                    }
                });
        $("#tiempoHoras").html(tiempo);
    });
}

function verSig8dias() {
    for (var i = 0; i < 16; i++) {
        if (i < 8) {
            $("#dia" + i).css("display", "none");
        } else {
            $("#dia" + i).css("display", "inline-block");
        }
    }
    $("#siguientesDias").css("display", "none");
    $("#anterioresDias").css("display", "inline-block");
}

function verAnt8dias() {
    for (var i = 0; i < 16; i++) {
        if (i < 8) {
            $("#dia" + i).css("display", "inline-block");
        } else {
            $("#dia" + i).css("display", "none");
        }
    }
    $("#siguientesDias").css("display", "inline-block");
    $("#anterioresDias").css("display", "none");
}

function recuperarArray() {
    return JSON.parse(localStorage.getItem("prueba"));
}
function guarda() {
    var salir = false;
    var guardar = recuperarArray();
    for (var i = 0; i < guardar.length && !salir; i++) {
        if ($("input[name=ciudades]").val() === guardar[i]) {
            salir = true;
        }
    }
    if (!salir) {
        guardar[guardar.length] = $("input[name=ciudades]").val();
        localStorage.setItem("prueba", JSON.stringify(guardar));
        var nuevaciudad = '<option value="' + $("input[name=ciudades]").val() + '">';
        $("datalist[id=ciudades]").append(nuevaciudad);
    }
}