import {connect} from 'mongoose';
/**
 * Conexion a la base de datos de mongoDB
 * @method connect es un metodo que permite establecer la conexion con la base de datos en mongoDB
 * @promise then a través de una promesa nos indicamos que se establecio o no se establecio la conexion a la base de datos
*/

export function connectToDB() {
  connect('mongodb://127.0.0.1:27017/dsi-assessment', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).then(() => {
    console.log('Conexión a la base de datos completadas');
  }).catch(() => {
    console.log('Algun error ha sucedido en la base de datos');
  });
}

