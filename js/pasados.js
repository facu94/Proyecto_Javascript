//Define las variables que necesites
var eventos= new Object;
var hoy;
var pasados = new Array;
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
  		//Selecciona los eventos que sean anteriores a la fecha actual del JSON
  		clasificaEventos(eventos, hoy);
  		//Ordena los eventos segun la fecha
        pasados = ordenarPorFecha(pasados);

  //Crea un string que contenga el HTML que describe el detalle del evento
  //Recorre el arreglo y concatena el HTML para cada evento
  //Modifica el DOM agregando el html generado
		for (var i = 0; i <= pasados.length-1; i++) {
          htmlPasados = htmlPasados + '<div class="caja col-sm-12 mt-3">';
          htmlPasados = htmlPasados + '<a id="link" href="detalle.html?id='+pasados[i].id+'">';
          htmlPasados = htmlPasados + pasados[i].nombre;
          htmlPasados = htmlPasados + '</a>';
          htmlPasados = htmlPasados + '<p id="fecha">';
          htmlPasados = htmlPasados + pasados[i].fecha+" - "+pasados[i].lugar;
          htmlPasados = htmlPasados + '</p>';
          htmlPasados = htmlPasados + '<p>';
          htmlPasados = htmlPasados + pasados[i].descripcion;
          htmlPasados = htmlPasados + '</p>';
          htmlPasados = htmlPasados + '<p id="costo">';
          htmlPasados = htmlPasados + 'Invitados: ' +pasados[i].invitados;
          htmlPasados = htmlPasados + '</p>';
          htmlPasados = htmlPasados + '</div>';
      	}
       document.getElementById("pasados").innerHTML = htmlPasados;
	});
});

//Iterar entre eventos y clasificarlos
function clasificaEventos(eventos, hoy) {
   var eventoFecha;
  for(var x=0; x<7; x++){
    eventoFecha = new Date(eventos[x].fecha);
    if (eventoFecha<hoy) {
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