import { createMachine } from 'xstate';
// maquina de estado paralela
// se indica mendiante un type que son maquinas paralelas
const fileMachine = createMachine({
  id: 'archivos',
  type: 'parallel',
  states: {
    upload: {
      initial: 'inicial',
      states: {
        inicial: {
          on: {
            INIT_UPLOAD: { target: 'cargando' }
          }
        },
        cargando: {
          on: {
            UPLOAD_COMPLETE: { target: 'terminado' }
          }
        },
        terminado: {}
      }
    },
    download: {
      initial: 'inicial',
      states: {
        inicial: {
          on: {
            INIT_DOWNLOAD: { target: 'cargando' }
          }
        },
        cargando: {
          on: {
            DOWNLOAD_COMPLETE: { target: 'terminado' }
          }
        },
        terminado: {}
      }
    }
  }
});
