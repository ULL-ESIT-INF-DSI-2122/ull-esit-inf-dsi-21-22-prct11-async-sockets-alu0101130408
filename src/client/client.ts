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
        console.log(chalk.red('No se pudo eliminar la nota'));
      }
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

yargs.parse();
