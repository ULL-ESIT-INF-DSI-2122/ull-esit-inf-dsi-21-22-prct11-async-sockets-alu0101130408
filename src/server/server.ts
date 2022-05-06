import * as net from 'net';
import {ResponseType} from '../type';
import {User} from '../apiNote/user';
import chalk from "chalk";

const noteOption = new User();

net.createServer({allowHalfOpen: true}, (connection) => {
  console.log(chalk.bgGreen.white('A client has connected.'));
  let wholeData = '';
  connection.on('data', (dataChunk) => {
    wholeData += dataChunk;

    let messageLimit = wholeData.indexOf("\n");
    while (messageLimit !== -1) {
      const message = wholeData.substring(0, messageLimit);
      wholeData = wholeData.substring(messageLimit + 1);
      connection.emit('request', JSON.parse(message));
      messageLimit = wholeData.indexOf('\n');
    }
  });

  connection.on('request', (message) => {
    console.log(chalk.bgWhite.magenta.bold('Peticion realizada >> ' + message.type));
    switch (message.type) {
      case 'add': {
        const status = noteOption.addNote(message.user, message.title, message.body, message.color);
        const responseData: ResponseType = {
          type: 'add',
          success: status,
        };
        connection.write(`${JSON.stringify(responseData)}\n`, (err) => {
          if (err) {
            console.error(err);
          } else {
            connection.end();
          }
        });
      }
        break;
      case 'delete': {
        const status = noteOption.deleteNote(message.user, message.title);
        const responseData: ResponseType = {
          type: 'delete',
          success: status,
        };
        connection.write(`${JSON.stringify(responseData)}\n`, (err) => {
          if (err) {
            console.error(err);
          } else {
            connection.end();
          }
        });
      }
        break;
      case 'modify': {
        const status = noteOption.modifyNote(message.user, message.title, message.body, message.color);
        const responseData: ResponseType = {
          type: 'modify',
          success: status,
        };
        connection.write(`${JSON.stringify(responseData)}\n`, (err) => {
          if (err) {
            console.error(err);
          } else {
            connection.end();
          }
        });
      }
        break;
      case 'read': {
        const status = noteOption.readNote(message.user, message.title);
        const responseData: ResponseType = {
          type: 'read',
          success: true,
        };
        if (typeof status === 'boolean') {
          responseData.success = false;
        } else {
          responseData.notes = [status.noteToJSON()];
        }
        connection.write(`${JSON.stringify(responseData)}\n`, (err) => {
          if (err) {
            console.error(err);
          } else {
            connection.end();
          }
        });
      }
        break;
      case 'list': {
        const salida = noteOption.listNoteUser(message.user);
        const salidaFormateada: string[]= [];
        salida.forEach((item) => {
          salidaFormateada.push(item.noteToJSON());
        });
        const responseData: ResponseType = {
          type: 'list',
          success: true,
          notes: salidaFormateada,
        };
        connection.write(`${JSON.stringify(responseData)}\n`, (err) => {
          if (err) {
            console.error(err);
          } else {
            connection.end();
          }
        });
      }
        break;
    }
  });

  connection.on('close', ()=>{
    console.log((chalk.bgGreen.black('Un cliente ha abandonado la sesión')));
  });
}).listen(60300, ()=>{
  console.log(chalk.bgGreen.black('Esperando un Cliente'));
});
