import * as net from 'net';
import {spawn} from 'child_process';

export function server() {
  const servidor = net.createServer({allowHalfOpen: true}, (connection) => {
    console.log('Cliente conectado');
    let comando = '';
    connection.on('data', (dataChunk) => {
      comando += dataChunk;
    });
    connection.on('end', () => {
      console.log('se ha recibido la petición');
      const peticion = JSON.parse(comando);
      const cat = spawn(peticion.comando, peticion.argumentos);
      let salida = '';
      cat.stdout.on('data', (dataChunk) => {
        salida += dataChunk;
      });
      cat.on('close', (peticion) => {
        if (peticion == 0) {
          connection.write(`La ejecución del comando es: \n${salida}\n`, () => {
            connection.end();
          });
        } else {
          connection.write(`Se ha producido un error, puede ser debido a los parámetros del comando\n`, () => {
            connection.end();
          });
        }
      });
    });
    connection.on('error', (err) => {
      if (err) {
        console.log(`No se pudo establecer la conexion`);
      }
    });
    connection.on('close', () => {
      console.log('Un cliente se ha desconectado');
    });
  });

  servidor.listen(60300, () => {
    console.log('Esperando a que se conecte un cliente');
  });
}

server();
