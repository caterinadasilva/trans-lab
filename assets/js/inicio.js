$(document).ready(function() {
	//solo letras numeros @ y . en el input
	$(document).on('keypress', '#email-input', function (event) {
	    var regex = new RegExp("^[a-z0-9@.]+$");
	    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
	    if (!regex.test(key)) {
	        event.preventDefault();
	        return false;
	    }
	});
	//Solo numeros y máximo 8 caracteres en el input
	$(document).on('keypress', '#password-input', function (event) {
	    var regex = new RegExp("^[0-9]{1,8}$");
	    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
	    if (!regex.test(key)) {
	        event.preventDefault();
	        return false;
	    }
	});

	$("#iniciar-sesion").on("click", function(e){
	    var email = $("#email-input").val();
	    var password = $("#password-input").val();

	    if( email == "" || password == "" ){
	        alert("No puede ingresar un campo vacío")
	    }
	    if( email.indexOf('@') == -1 ){
	        alert("Ingrese un correo válido");
	    }
	    if( password.length > 8 ){
	        alert("Su contraseña debe ser máximo 8 caracteres.");
	        e.preventDefault();
	    }
	    if( password != "" && email.indexOf('@') != -1 ){
	        localStorage.setItem("email", email);
	    } else {
	        e.preventDefault();
	    }
	});
});