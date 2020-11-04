
var socket = io()
var etiquetaTicket = $('#lblNuevoTicket')
$('button').on('click', generarSiguienteTicket)

// Escuchas a eventos del servidor
socket.on('connect', function(){
    console.log('Hola :)');
})

socket.on('disconnect', function(){
    console.log('Adios :(');
})

socket.on('estadoActual', function(estado){
    etiquetaTicket.text(estado.ticket)
})


// Emisiones de eventos al servidor
function generarSiguienteTicket(){

    socket.emit('generarSiguienteTicket', null, function(siguienteTicket){

        etiquetaTicket.text(siguienteTicket)

    })
}