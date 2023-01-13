import React, { useState } from 'react';
import './Search.css';

export const Search = ({ state, send }) => {
  const [flight, setFlight] = useState('');

  const goToPassengers = () => {
    //se envia en el segundo parametro un objeto que es el evento 
    send('CONTINUE', { selectedCountry: flight })
  }

  const handleSelectChange = (event) => {
    setFlight(event.target.value);
  };
// se llama el state que trae la respuesta de los paises
  const options = state.context.countries;

  return (
    <div className='Search'>
      <p className='Search-title title'>Busca tu destino</p>
      <select id="country" className='Search-select' value={flight} onChange={handleSelectChange}>
        <option value="" disabled defaultValue>Escoge un país</option>
        {/* se realiza el map del array de paises con sus atributos .name.common */}
        {options.map((option) => <option value={option.name.common} key={option.name.common}>{option.name.common}</option>)}
      </select>
      <button onClick={goToPassengers} disabled={flight === ''} className='Search-continue button'>Continuar</button>
    </div>
  );
}; 