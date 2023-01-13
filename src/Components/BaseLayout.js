import React from 'react'
//hook necesario para inicializar la maquina 
import {useMachine} from "@xstate/react"
import bookingMachine from '../Machines/BookingMachine'

const BaseLayout = () => {

//inicializar la maquina
const [state, send] = useMachine(bookingMachine)

// state: informacion de la maquina en el momento 
// send: enviar trasiciones 

console.log("nuestra maquina", state);
console.log("estado en el que me encuentro", state.matches("inicial"));
console.log("estado en el que no me encuentro", state.matches("tickets"));
console.log("eventos", state.can("START"));
console.log("eventos", state.nextEvents);
  return (
    <div>
      Hola
    </div>
  )
}

export default BaseLayout
