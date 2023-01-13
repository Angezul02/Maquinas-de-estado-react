import React from "react";
import { useMachine } from "@xstate/react";
import { Nav } from "../Components/Nav";
import { StepsLayout } from "./StepsLayout";
import bookingMachine from "../Machines/BookingMachine";
import "./BaseLayout.css";

export const BaseLayout = () => {
  //inicializar la maquina

  const [state, send] = useMachine(bookingMachine);
  // state: informacion de la maquina en el momento
  // send: enviar trasiciones

  console.log("nuestra maquina", state.value, state.context);

  return (
    <div className="BaseLayout">
      <Nav state={state} send={send} />
      {/* a través de los props se envia send que es la funcion para ejecutar una trasicion */}
      <StepsLayout state={state} send={send} />
    </div>
  );
};
