var contadorBip = 0;

$(document).ready(function() {
	// mostrar correo de usuario desde Localstorage
	emailStorage();

	// imprimir tarjetas guardadas
	tarjetasGuardadas();

	// nuevas tarjetas bip
	$("#calc-tarifa").click(function(event) {
		contadorBip++;
		var nuevaBip = $("#input-numero").val();
		console.log("Tarjeta n°: " + contadorBip);
		console.log("N° bip: " + nuevaBip);

		// Nuevo número de tarjeta
		$(".list-group").append('<li class="list-group-item" id="tarjeta' + contadorBip + '">' + nuevaBip  +'</li>');
		console.log(localStorage.nTarjeta);
		localStorage.setItem('nTarjeta', $('.list-group').html());
		event.preventDefault();
		$("#input-numero").val("");
	});
});

function emailStorage() {
	if (localStorage.email != "") {
		$("#user-email").html(localStorage.email);
	} else {
		$("#user-email").html("Correo desconocido");
	}
}

function tarjetasGuardadas() {
	if (localStorage.nTarjeta != "") {
		$('.list-group').html(localStorage.getItem('nTarjeta'));
	} 
}