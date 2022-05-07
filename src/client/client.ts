import * as yargs from 'yargs';
import * as chalk from 'chalk';
import {RequestType} from '../type';
import {connect} from 'net';
import {MessageEventEmitterClient} from './event';

const client = connect({port: 60300});
const clientMSEC = new MessageEventEmitterClient(client);

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
