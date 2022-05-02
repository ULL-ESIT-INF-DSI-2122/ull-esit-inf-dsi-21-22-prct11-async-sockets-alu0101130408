
import * as net from 'net';
export function client() {
  if (process.argv.length < 3) {
    console.log('Se debe especificar algun comando');
  } else {
    const cliente = net.connect({port: 60300});

    const peticion = {
      comando: process.argv[2],
      argumentos: [``],
    };
    console.log(`conexión establecida`);

    if (process.argv.length > 3) {
      peticion.argumentos = process.argv.splice(3);
    }
    cliente.write(JSON.stringify(peticion), () => {
      cliente.end();
    });

    let data = '';
    cliente.on('data', (dataChunk) => {
      data += dataChunk;
    });

    cliente.on('end', () => {
      console.log(`Conexión finalizada`);
      console.log(data);
    });

    cliente.on('error', (err) => {
      console.log(`No se pudo establecer la conexion`);
    });
  }
}
client();
