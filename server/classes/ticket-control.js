const fs = require('fs')

class Ticket {

    constructor(numero, escritorio) {

        this.numero = numero
        this.escritorio = escritorio

    }

}


class TicketControl{

    constructor(){

        this.ultimo = 0
        this.hoy = new Date().getDate()
        this.tickets = []
        this.ultimosAtendidos = []

        try {
            
            const data = require('../data/data.json')

            if( data.hoy == this.hoy ){

                this.ultimo = data.ultimo
                this.tickets = data.tickets
                this.ultimosAtendidos = data.ultimosAtendidos
                console.log('Datos recuperados de sesión anterior:', data);
                
            } else {
                
                reiniciarContador()
                console.log('Contador reiniciado, los datos almacenados no son de hoy:', data);

            }

        } catch (error) {
            
            if(error.message.startsWith('Cannot find module')) {
                this.reiniciarContador()
                console.log('No hay datos o estan corruptos, se procede a crear nueva sesión');
            }
            else {
                throw error
            }

        }

    }

    
    reiniciarContador(){
        
        this.ultimo = 0
        this.tickets = []
        this.ultimosAtendidos = []
        
        this.guardarArchivo()
        
    }

    
    generarTicket(){
        
        this.ultimo++

        let ticket = new Ticket(this.ultimo, null)
        this.tickets.push(ticket)

        this.guardarArchivo()

        return `Ticket ${this.ultimo}`
        
    }

    
    obtenerActual(){

        if(this.ultimo === 0)
            return 'Haz click en generar nuevo ticket.'
        else
            return `Ticket ${this.ultimo}`
        
    }


    atenderTicket( escritorio ){

        if(this.tickets.length === 0) return {ok: false, err: 'No quedan tickets por atender'}

        let atenderTicket = this.tickets.shift()
        atenderTicket.escritorio = escritorio
        
        this.ultimosAtendidos.unshift(atenderTicket)

        if(this.ultimosAtendidos.length > 4)
            this.ultimosAtendidos.pop()

        console.log('Ultimos 4:', this.ultimosAtendidos)

        this.guardarArchivo()

        return {ok: true, ticket: atenderTicket.numero }
    }

    
    guardarArchivo(){

        const data = JSON.stringify({
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosAtendidos: this.ultimosAtendidos
        })

        fs.writeFileSync('./server/data/data.json', data)

    }

}


module.exports = { TicketControl }