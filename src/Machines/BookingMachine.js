import { createMachine, assign } from "xstate";
import { fetchCountries } from "../Utils/api";
// maquina hija
const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      //invocar un servicio 
      invoke: {
        id: 'getCountries',
        src: () => fetchCountries,
        //propiedad que se llama cuando el request finalice de forma exitosa(se cumpla la promesa)
        onDone: {
          target: 'success',
          actions: assign({
            // en el contexto se guarda lo que retorne del request
            countries: (context, event) => event.data,
          })
        },
        //propiedad cuando finalice el request en caso de error
        onError: {
          target: 'failure',
          actions: assign({
            error: 'Fallo el request',
          })
        }
      }
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: "loading" },
      },
    },
  },
};

const bookingMachine = createMachine(
  {
    id: "buy plane tickets",
    initial: "initial",
    //setear el contexto inicial
    context: {
      //array de pasajeros, donde se guarda el nombre de los pasajeros
      passengers: [],
      // guardar pais seleccionado en la busqueda
      selectedCountry: "",
      countries: [],
      error: '',
    },
    states: {
      initial: {
        on: {
          START: {
            target: "search",
          },
        },
      },
      search: {
        // entry: "imprimirEntrada",  acciones de entrada
        // exit: "imprimirSalida", acciones de salida
        on: {
          CONTINUE: {
            target: "passengers",
            actions: assign({
              selectedCountry: (context, event) => event.selectedCountry,
            }),
          },
          CANCEL: "initial",
        },
        //se integra la maquina hija
        ...fillCountries,
      },
      tickets: {
        //se implementa una transicion atrazada 
        after: {
          5000: {
            target: 'initial',
            actions: 'cleanContext',
          }
        },
        on: {
          FINISH: "initial",
        },
      },
      passengers: {
        on: {
          DONE: {
            target: "tickets",
            //implementacion de una transicion protegida
            cond: "moreThanOnePassenger"
          },
          CANCEL: {
            //se agrega una accion de cleancontex para limpiar el contexto 
            target: "initial",
            actions: "cleanContext",
          },
          //evento ejecuta una accion para actualizar el contexto ejecutando una accion
          ADD: {
            target: "passengers",
            actions: assign((context, event) =>
              context.passengers.push(event.newPassenger)
            ),
          },
        },
      },
    },
  },
  {
    // actions: {
    //   imprimirEntrada: ()=>console.log("texto de entrada a search"),
    //   imprimirSalida: ()=>console.log("texto de salida del search")
    // }

    actions: {
      //accion para limpiar passengers
      cleanContext: assign({
        selectedCountry: "",
        passengers: [],
      }),
    },
    //funcion de la transision protegida
    guards: {
      moreThanOnePassenger: (context) => {
        return context.passengers.length > 0;
      }
    },
  }
);

export default bookingMachine;
