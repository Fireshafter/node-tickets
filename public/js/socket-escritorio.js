var socket = io()
var searchParams = new URLSearchParams(window.location.search)
var atendiendo = $('small')

if(!searchParams.has('escritorio'))
    window.history.back()

const escritorio = searchParams.get('escritorio')

$('h1').text('Escritorio ' + escritorio)

$('button').on('click', atenderTicket)


function atenderTicket(){

    socket.emit('atenderTicket', {escritorio: escritorio}, function(result){
        
        if(!result.ok){
            atendiendo.text('Nadie')
            alert('ERROR: ' + result.err)
        }

        else {

            atendiendo.text('Ticket ' + result.ticket)

        }

    })

}