import * as yargs from 'yargs';
import chalk from "chalk";
import {RequestType} from '../type';
import {connect} from 'net';
import {MessageEventEmitterClient} from './event';

const client = connect({port: 60300});
const clientMSEC = new MessageEventEmitterClient(client);

clientMSEC.on('message', (message)=>{
  switch (message.type) {
    case 'add':
      if (message.success) {
        console.log(chalk.green('Nota añadida'));
      } else {
        console.log(chalk.red('No se pudo añadir la nota'));
      }
      break;
    case 'delete':
      if (message.success) {
        console.log(chalk.green('Nota eliminada'));
      } else {
        console.log(chalk.red('No se puedo eliminar la nota'));
      }
      break;
    case 'modify':
      if (message.success) {
        console.log(chalk.green('Nota modificada'));
      } else {
        console.log(chalk.red('No se puedo modificar la nota'));
      }
      break;
    case 'read':
      break;
    case 'list':
      break;
    default:
      console.log(chalk.red('No es una opcion soportada'));
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
      console.log(`Opcion: Añadir`);
      client.write(`${JSON.stringify(inputData)}\n`);
    } else {
      console.log(chalk.red(`Error: Los argumentos no son válidos`));
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
      console.log(`OPcion: Eliminar`);
      client.write(`${JSON.stringify(inputData)}\n`);
    } else {
      console.log(chalk.red(`Error: Los argumentos no son válidos`));
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
      console.log('Opcion: Modificar');
      client.write(`${JSON.stringify(inputData)}\n`);
    } else {
      console.log(chalk.red(`Error: Los argumentos no son válidos`));
    }
  },
});

yargs.parse();
