// Hemos omitido los acentos en los comentarios por compatibilidad
const errorObligatorio = 'Este campo es obligatorio';
const errorEmail = 'Campo inválido';
const errorContrasena ='Debe tener al menos 7 caracteres';
const errorConfirmacion = 'No coincide con contraseña';


function validar(formulario) {
	if (formulario.nombres.value==null||formulario.nombres.value=="") {
		document.getElementById("errorNombres").innerHTML = errorObligatorio;		
	}
  //Expresion regular del correo
	if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formulario.email.value))) {
		document.getElementById("errorEmail").innerHTML = errorEmail;
	}

	if (formulario.contrasena.value.length<7) {
		document.getElementById("errorContrasena").innerHTML = errorContrasena;
	}

	if (formulario.contrasena.value !== formulario.confirmacion.value) {
		document.getElementById("errorConfirmacion").innerHTML = errorConfirmacion;
	}

	if (formulario.tipo.value == -1) {
		document.getElementById("errorTipo").innerHTML = errorObligatorio;	
	}

	if (! formulario.acepto.checked) {
		document.getElementById("errorAcepto").innerHTML = errorObligatorio;
	}
	
	return;
}
