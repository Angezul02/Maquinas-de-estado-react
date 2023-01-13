import React from 'react';
import './Tickets.css';

export const Tickets = ({ send, context }) => {
  const finish = () => {
    send('FINISH')
  };

  return (
    <div className='Tickets'>
      <p className='Tickets-description description'>Gracias por volar con book a fly 💚</p>
      <div className='Tickets-ticket'>
        <div className='Tickets-country'>{context.selectedCountry }</div>
        <div className='Tickets-passengers'>
          <span>✈</span>
          {/* se realiza el map al array de passengers , como segundo parametro se coloca un 
          idx para ponerlo como key  */}
          {context.passengers.map((person, idx) => {
            return <p key={idx}>{person}</p>
          })}
        </div>
      </div>
      <button onClick={finish} className='Tickets-finalizar button'>Finalizar</button>
    </div>
  );
}; 