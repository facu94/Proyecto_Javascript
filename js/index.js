// Hemos omitido los acentos en los comentarios por compatibilidad
//Define las variables que necesites
var eventos= new Object;
var hoy;
var proximos = new Array;
var pasados = new Array;
var htmlProximos = "";
var htmlPasados = "";



$(document).ready(function () {

  //Carga los datos que estan en el JSON (info.json) usando AJAX
  function getEventos() {
    return $.ajax({
       type: 'GET',
       url: 'http://localhost:3000/eventos',
       dataType: 'json',
       success: function(result){
         //Guarda el resultado en variables
          eventos= result;
       },
       error: function(){
         alert("No se pudo conectar con: http://localhost:3000/eventos");
       }
   });
  }

  //Obtener fecha hoy
  function getHoy() {
   return $.ajax({
     type: 'GET',
     url: 'http://localhost:3000/fechaActual',
     dataType: 'json',
     success: function(result){
         hoy= new Date(result.fecha);

     },
     error:function(){
         alert("No se pudo conectar con: http://localhost:3000/fechaActual");
         hoy= new Date();

       }
   });
  }

  $.when(getEventos(), getHoy()).done(function(a1, a2){
        //Clasifica los eventos segun la fecha actual del JSON
          clasificaEventos(eventos, hoy);
          proximos = ordenarPorFecha(proximos);
          pasados = ordenarPorFecha(pasados);
 //Crea un string que contenga el HTML que describe el detalle del evento
 //Recorre el arreglo y concatena el HTML para cada evento
 //Modifica el DOM agregando el html generado
      for (var i = proximos.length - 1; i >= proximos.length-2; i--) {
          htmlProximos = htmlProximos + '<div class="caja col-sm-5">';
          htmlProximos = htmlProximos + '<a id="link" href="detalle.html?id='+proximos[i].id+'">';
          htmlProximos = htmlProximos + proximos[i].nombre;
          htmlProximos = htmlProximos + '</a>';
          htmlProximos = htmlProximos + '<p id="fecha">';
          htmlProximos = htmlProximos + proximos[i].fecha;
          htmlProximos = htmlProximos + '</p>';
          htmlProximos = htmlProximos + '<p>';
          htmlProximos = htmlProximos + proximos[i].descripcion;
          htmlProximos = htmlProximos + '</p>';
          htmlProximos = htmlProximos + '</div>';
          if (i==proximos.length-1) {
             htmlProximos = htmlProximos +'<div class="col-sm-2"></div>';
          }
      }

          //Extrae solo dos eventos Proximos
          document.getElementById("proximos").innerHTML = htmlProximos;
 //Crea un string que contenga el HTML que describe el detalle del evento
 //Recorre el arreglo y concatena el HTML para cada evento
 //Modifica el DOM agregando el html generado
      for (var i = 0; i <= 1; i++) {
          htmlPasados = htmlPasados + '<div class="caja col-sm-5">';
          htmlPasados = htmlPasados + '<a id="link" href="detalle.html?id='+pasados[i].id+'">';
          htmlPasados = htmlPasados + pasados[i].nombre;
          htmlPasados = htmlPasados + '</a>';
          htmlPasados = htmlPasados + '<p id="fecha">';
          htmlPasados = htmlPasados + pasados[i].fecha;
          htmlPasados = htmlPasados + '</p>';
          htmlPasados = htmlPasados + '<p>';
          htmlPasados = htmlPasados + pasados[i].descripcion;
          htmlPasados = htmlPasados + '</p>';
          htmlPasados = htmlPasados + '</div>';
          if (i==0) {
             htmlPasados = htmlPasados +'<div class="col-sm-2"></div>';
          }
      }
          //Extrae solo dos eventos Pasados
          document.getElementById("pasados").innerHTML = htmlPasados;
  });
});

//Iterar entre eventos y clasificarlos
function clasificaEventos(eventos, hoy) {
   var eventoFecha;
  for(var x=0; x<7; x++){
    eventoFecha = new Date(eventos[x].fecha);
    if (eventoFecha>hoy) {
      proximos.push(eventos[x]);
    }
    else {
     pasados.push(eventos[x]);
    }
  }
}


//Ordena los eventos segun la fecha (los mas cercanos primero)
function ordenarPorFecha(array_a_ordenar){
  var mayor;
  var ordenMayor;
  var arrayOrdenada = new Array;

  while (array_a_ordenar.length>0){
    for(var x=0; x<array_a_ordenar.length; x++){
      if (x==0) {
        mayor=array_a_ordenar[x];
        ordenMayor = x;
      }
      if (array_a_ordenar[x].fecha>mayor.fecha) {
        mayor = array_a_ordenar[x];
        ordenMayor = x;
      }
      if (x == (array_a_ordenar.length - 1)){
        arrayOrdenada.push(array_a_ordenar[ordenMayor]);
        array_a_ordenar.splice(ordenMayor,1);
          }
     }
  }
  return arrayOrdenada;
}
