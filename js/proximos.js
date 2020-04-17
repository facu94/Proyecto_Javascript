// Hemos omitido los acentos en los comentarios por compatibilidad

//Define las variables que necesites
var eventos= new Object;
var hoy;
var proximos = new Array;
var htmlProximos = "";

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
        //Selecciona los eventos que sean posteriores a la fecha actual del JSON
         clasificaEventos(eventos, hoy);
        //Ordena los eventos segun la fecha (los mas cercanos primero)
         proximos = ordenarPorFecha(proximos);


		for (var i = proximos.length - 1; i >= 0; i--) {
          htmlProximos = htmlProximos + '<div class="caja col-sm-12 mt-3">';
		  htmlProximos = htmlProximos + '<a id="link" href="detalle.html?id='+proximos[i].id+'">';
          htmlProximos = htmlProximos + proximos[i].nombre;
          htmlProximos = htmlProximos + '</a>';
          htmlProximos = htmlProximos + '<p id="fecha">';
          htmlProximos = htmlProximos + proximos[i].fecha+" - "+proximos[i].lugar;
          htmlProximos = htmlProximos + '</p>';
          htmlProximos = htmlProximos + '<p>';
          htmlProximos = htmlProximos + proximos[i].descripcion;
          htmlProximos = htmlProximos + '</p>';
          htmlProximos = htmlProximos + '<p id="costo">';
          htmlProximos = htmlProximos + 'Costo: $' +proximos[i].precio +'.00';
          htmlProximos = htmlProximos + '</p>';
          htmlProximos = htmlProximos + '</div>';
      	}

  //Crea un string que contenga el HTML que describe el detalle del evento
  //Recorre el arreglo y concatena el HTML para cada evento
  //Modifica el DOM agregando el html generado dentro del div con id=evento
        document.getElementById("proximos").innerHTML = htmlProximos;
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