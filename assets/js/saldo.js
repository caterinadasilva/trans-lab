$(document).ready(function() {
	bipsGuardadas();

	$("#ver-saldo").click(function(event) {
		event.preventDefault();

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
            saldo(respuesta);
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

function saldo(respuesta) {
	var box = $("<div>").addClass('box');
	var top = $("<div>").addClass('top');
	var lead = $("<p>").addClass('lead').text('Saldo total');
	var bot = $("<div>").addClass('bot');
	var saldo = $("<span>").text(respuesta.saldoTarjeta);
	top.append(lead);
	bot.append(saldo);
	box.append(top);
	box.append(bot);
    $("#saldo-total").html(box);
}