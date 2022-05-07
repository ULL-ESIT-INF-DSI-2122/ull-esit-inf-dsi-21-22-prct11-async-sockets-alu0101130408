/**
 * Este fichero se encarga de definir la funcionalidad del cliente, en este caso realiza las peticiones al servidor y procesa las respuestas obtenidas
 */
import * as yargs from 'yargs';
import * as chalk from 'chalk';
import {RequestType} from '../type';
import {connect} from 'net';
import {MessageEventEmitterClient} from './event';
/**
 * Se establece conexión con el metodo connect de net de node.js
 */
const client = connect({port: 60300});
const clientMSEC = new MessageEventEmitterClient(client);

/**
 * Se gestiona la información obtenida por parte de la clase EventEmitter
 */
clientMSEC.on('message', (message)=>{
  switch (message.type) {
    case 'add':
      if (message.success) {
        console.log(chalk.default.green('Nota añadida'));
      } else {
        console.log(chalk.default.red('No se pudo añadir la nota'));
      }
      break;
    case 'delete':
      if (message.success) {
        console.log(chalk.default.green('Nota eliminada'));
      } else {
        console.log(chalk.default.red('No se puedo eliminar la nota'));
      }
      break;
    case 'modify':
      if (message.success) {
        console.log(chalk.default.green('Nota modificada'));
      } else {
        console.log(chalk.default.red('No se puedo modificar la nota'));
      }
      break;
    case 'read':
      if (message.success) {
        const nota = message.notes[0];
        const noteObject = JSON.parse(nota);

        switch (noteObject.color) {
          case 'Red':
            console.log(chalk.default.red(`title: ` + noteObject.title));
            console.log(chalk.default.red(`body: ` + noteObject.body));
            break;
          case 'Blue':
            console.log(chalk.default.blue(`title: ` + noteObject.title));
            console.log(chalk.default.blue(`body: ` + noteObject.body));
            break;
          case 'Green':
            console.log(chalk.default.green(`title: ` + noteObject.title));
            console.log(chalk.default.green(`body: ` + noteObject.body));
            break;
          case 'Yellow':
            console.log(chalk.default.yellow(`title: ` + noteObject.title));
            console.log(chalk.default.yellow(`body: ` + noteObject.body));
            break;
          default:
            console.log(` No es un color válido en el sistema`);
            break;
        }
      } else {
        console.log(chalk.default.red('No se pudo leer la nota'));
      }
      break;
    case 'list':
      if (message.success) {
        const info: string[] = message.notes;

        info.forEach( (item) => {
          const noteObject = JSON.parse(item);
          switch (noteObject.color) {
            case 'Red':
              console.log(chalk.default.red(noteObject.title));
              break;
            case 'Blue':
              console.log(chalk.default.blue(noteObject.title));
              break;
            case 'Green':
              console.log(chalk.default.green(noteObject.title));
              break;
            case 'Yellow':
              console.log(chalk.default.yellow(noteObject.title));

              break;
            default:
              console.log(` No es un color válido en el sistema`);
              break;
          }
        });
      } else {
        console.log(chalk.default.red('No se pudo listar las notas'));
      }
      break;
    default:
      console.log(chalk.default.red('No es una opcion soportada'));
      break;
  }
});

/**
 * Interacción del usuario por línea de comando.
 */

/**
 * Implementación del comando `add`, se encarga de añadir una nueva nota
 * @param user usuario que quiere añadir
 * @param title  titulo de la nota que se quiere añadir
 * @param body cuerpo que contiene la informacion de la nota que se desea añadir
 * @param color color de la nota.
 */
yargs.command({
  command: 'add',
  describe: 'Añadir una nueva nota al sistema',
  builder: {
    user: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Cuerpo',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color',
      demandOption: true,
      type: 'string',
    },

  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      const inputData: RequestType = {
        type: 'add',
        user: argv.user,
        title: argv.title,
        body: argv.body,
        color: argv.color,
      };
      client.write(`${JSON.stringify(inputData)}\n`);
    } else {
      console.log(chalk.default.red(`Error: Los argumentos no son válidos`));
    }
  },
});

/**
 * Implementación del comando `delete`, que se encarga de eliminar una nota existente
 * @param user usuario que desea realizar el comando
 * @param title titulo de la nota que se desea eliminar
 */
yargs.command({
  command: 'delete',
  describe: 'Elimina una nota del sistema',
  builder: {
    user: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      const inputData: RequestType = {
        type: 'delete',
        user: argv.user,
        title: argv.title,
      };
      client.write(`${JSON.stringify(inputData)}\n`);
    } else {
      console.log(chalk.default.red(`Error: Los argumentos no son válidos`));
    }
  },
});

/**
 * Implementación del comando `modify` que se encarga de modificar los valores de una nota existente.
 * @param user usuario que quiere modificar su nota
 * @param title titulo de la nota que se quiere modificar
 * @param body nuevo cuerpo que se va a modificar sobre el cuerpo actual de la nota
 * @param color nuevo color que se va a modificar reemplazando al color actual.
 */
yargs.command({
  command: 'modify',
  describe: 'Modificar del cuerpo de nota del sistema',
  builder: {
    user: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Cuerpo',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      const inputData: RequestType = {
        type: 'modify',
        user: argv.user,
        title: argv.title,
        body: argv.body,
        color: argv.color,
      };
      client.write(`${JSON.stringify(inputData)}\n`);
    } else {
      console.log(chalk.default.red(`Error: Los argumentos no son válidos`));
    }
  },
});


/**
 * Implementación del comando `read` que se encarga de leer la nota de un usuario del sistema.
 * @param user usuario del que se desea leer la nota
 * @param title titulo de la nota que se desea leer.
 */
yargs.command({
  command: 'read',
  describe: 'Lee una nota del sistema',
  builder: {
    user: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      const inputData: RequestType = {
        type: 'read',
        user: argv.user,
        title: argv.title,
      };
      client.write(`${JSON.stringify(inputData)}\n`);
    } else {
      console.log(chalk.default.red(`Error: Los argumentos no son válidos`));
    }
  },
});

/**
 * Implementación del comando `list` que se encarga de listar todas las notas de un usuario especifico
 * @param user usuario del que se desea listar las notas.
 */
yargs.command({
  command: 'list',
  describe: 'Lista las notas del usuario',
  builder: {
    user: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      const inputData: RequestType = {
        type: 'list',
        user: argv.user,
      };
      console.log(chalk.default.grey(`Notas del usuario: ${argv.user}`));
      client.write(`${JSON.stringify(inputData)}\n`);
    } else {
      console.log(chalk.default.red(`Error: Los argumentos no son válidos`));
    }
  },
});


yargs.parse();
