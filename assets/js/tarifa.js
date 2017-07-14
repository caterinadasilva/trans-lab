$(document).ready(function() {
	bipsGuardadas();
	var tarifa;

	$("#calc-tarifa").click(function(event) {
		event.preventDefault();

		// Elección de tarifa
		if ( $("#selectHorario").val() != null ) {
			tarifa = $("#selectHorario").val();
            console.log(tarifa);
    		costoPasaje();
		} else {
			alert("Elija una tarifa.")
		}

		// Ingreso de número bip
		if ( $("#input-numero").val() != "" && $("#selectBip").val() == null ) {
			var valor = $("#input-numero").val();
			console.log(valor);
		} else if ( $("#input-numero").val() == "" && $("#selectBip").val() != null ) {
			var valor = $("#selectBip").val();
			console.log(valor);
		}

		$.ajax({
            url : 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json',
            type : 'GET',
            datatype : 'json',
            data : {'bip': valor}
        })
        .done(function(respuesta){
            console.log("success");
            console.log(respuesta);
            saldoFinal(respuesta);
        })
        .fail(function(){
            console.log("error");
			alert("Ingrese una tarjeta");
        })
	});

});

function bipsGuardadas() {
	if (localStorage.bipStorage != "") {
		$(".bip-storage").append(localStorage.getItem('bipStorage'));
	} 
}

function costoPasaje() {
	tarifa = $("#selectHorario").val();
	var box = $("<div>").addClass('box');
	var top = $("<div>").addClass('top');
	var lead = $("<p>").addClass('lead').text('Costo Pasaje');
	var bot = $("<div>").addClass('bot');
	var saldo = $("<span>").text("$" + tarifa);
	top.append(lead);
	bot.append(saldo);
	box.append(top);
	box.append(bot);
    $("#costo-pasaje").html(box);
}

function saldoFinal(respuesta) {
	tarifa = $("#selectHorario").val();
	// Calculo de saldo final
	var saldoSinPeso = respuesta.saldoTarjeta.substr(1);
	console.log(saldoSinPeso);
	var saldoSinPunto = saldoSinPeso.split(".").join("");
	console.log(saldoSinPunto);

	var saldoTotal = parseInt(saldoSinPunto) - parseInt(tarifa);
	console.log(saldoTotal);

	// Impresión de respuesta
	var box = $("<div>").addClass('box');
	var top = $("<div>").addClass('top');
	var lead = $("<p>").addClass('lead').text('Saldo final');
	var bot = $("<div>").addClass('bot');
	var saldo = $("<span>").text("$" + saldoTotal);
	top.append(lead);
	bot.append(saldo);
	box.append(top);
	box.append(bot);
    $("#saldo-final").html(box);

}