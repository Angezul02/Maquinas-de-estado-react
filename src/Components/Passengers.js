import React, { useState } from 'react';
import './Passengers.css';
// se pasa el state a passengers
export const Passengers = ({ state, send }) => {
  const [value, changeValue] = useState('');

  const onChangeInput = (e) => {
    changeValue(e.target.value);
  }

  const goToTicket = () => {
    send('DONE')
  }
// al hacer submit-evita que se haga un refresh , pone el valor en un strig vacio
  const submit = (e) => {
    e.preventDefault();
    //enviar el evento ADD , y en el segundo parámetro el nuevo pasajero 
    send('ADD', { newPassenger: value })
    changeValue('');
  }
// se saca el context del state
  const { passengers } = state.context;

  return (
    <form onSubmit={submit} className='Passengers'>
      <p className='Passengers-title title'>Agrega a las personas que van a volar ✈️</p>

      {/* mapear el array de passengers */}
      
      {passengers.map((person, idx) => <p className='text' key={`person-${idx}`}>{person}</p>)}
      <input 
        id="name" 
        name="name" 
        type="text" 
        placeholder='Escribe el nombre completo' 
        required 
        value={value} 
        onChange={onChangeInput}
      />
      <div className='Passengers-buttons'>
        <button 
          className='Passengers-add button-secondary'
          type="submit"
        >
          Agregar Pasajero
        </button>
        <button
          className='Passenger-pay button'
          type="button"
          onClick={goToTicket}
        >
          Ver mi ticket
        </button>
      </div>
    </form>
  );
};