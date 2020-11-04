const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl()

io.on('connection', (client) => {

    console.log('Usuario conectado');
    client.emit('estadoActual', {
        ticket: ticketControl.obtenerActual(),
        ultimosAtendidos: ticketControl.ultimosAtendidos
    })

    client.on('generarSiguienteTicket', (data, callback) => {

        const siguienteTicket = ticketControl.generarTicket()
        callback(siguienteTicket)
        
    })

    client.on('atenderTicket', (data, callback) => {

        if(!data.escritorio) return callback({ok: false, err: 'No se ha especificado un escritorio'})

        resp = ticketControl.atenderTicket(data.escritorio)

        callback(resp)

        if(resp.ok)
            client.broadcast.emit('ultimosAtendidos', ticketControl.ultimosAtendidos)
        
    })

});