import express from 'express';
import {join} from 'path';
import {createSpawn} from './execmd';

const app = express();

app.use(express.static(join(__dirname, '../execmd')));
console.log(`${__dirname}`);
app.get('/modificacion_lunes9/execmd', (req, res) => {
  if (!req.query.title) {
    res.send({
      error: '<h1>404</h1>',
    });
    /*
  } else {
    createSpawn(req.query.commandos as string, (err, data) => {
      if (err) {
        console.log(`no se ha podido acceder`);
      } else {
        console.log(`aqui va la funcionalidad`);
      }
    });
  }
});*/

app.listen(3000, () => {
  console.log('Estableciendo conexion en el puerto 3000');
});