var socket = io()
var audio = new Audio('audio/new-ticket.mp3')

socket.on('connect', function(){
    console.log('Conectado');
})

socket.on('estadoActual', function(estado){
    mostrarUltimosAtendidos(estado.ultimosAtendidos)
})

socket.on('ultimosAtendidos', function(ultimosAtendidos){
    mostrarUltimosAtendidos(ultimosAtendidos)
    audio.play()
})

function mostrarUltimosAtendidos(ultimosAtendidos) {
    
    ultimosAtendidos.forEach((ticket, i) => {
        
        $('#lblTicket'+ (i+1)).text('Ticket ' + ticket.numero)
        $('#lblEscritorio'+ (i+1)).text('Escritorio ' + ticket.escritorio)

    });

}