// Hemos omitido los acentos en los comentarios por compatibilidad
var eventos;
var htmlEvento = "";
var indiceEvento;

$(document).ready(function () {
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);
 //Esta es la instruccion para tomar el id del URL detalle.html?id=<identificador>
const eventoId = urlParams.get('id');

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
  //Guarda el resultado en una variable
  $.when(getEventos()).done(function(a1){
  //Busca el elemento en el arreglo
    for(x in eventos){
    if (eventos[x].id==eventoId) {
      indiceEvento= x;
    }
  }

  //Crea un string que contenga el HTML que describe el detalle del evento
        htmlEvento = htmlEvento + '<div class="caja col-sm-12 mt-3">';
		htmlEvento = htmlEvento + '<h2>';
        htmlEvento = htmlEvento + eventos[indiceEvento].nombre;
        htmlEvento = htmlEvento + '</h2>';
        htmlEvento = htmlEvento + '<p id="fecha">';
        htmlEvento = htmlEvento + eventos[indiceEvento].fecha+" - "+eventos[indiceEvento].lugar;
        htmlEvento = htmlEvento + '</p>';
        htmlEvento = htmlEvento + '<p>';
      	htmlEvento = htmlEvento + eventos[indiceEvento].descripcion;
        htmlEvento = htmlEvento + '</p>';
        htmlEvento = htmlEvento + '<p id="costo">';
        htmlEvento = htmlEvento + 'Costo: $' +eventos[indiceEvento].precio +'.00';
        htmlEvento = htmlEvento + '</p>';
        htmlEvento = htmlEvento + '<p id="costo">';
        htmlEvento = htmlEvento + 'Invitados: ' +eventos[indiceEvento].invitados;
        htmlEvento = htmlEvento + '</p>';
    	htmlEvento = htmlEvento + '</div>';
  //Modifica el DOM agregando el html generado dentro del div con id=evento
  		document.getElementById("evento").innerHTML = htmlEvento;
	});
});
