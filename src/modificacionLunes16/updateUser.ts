import {MongoClient} from 'mongodb';
import {userInterface} from './user';

const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'dsi-assessment';

/**
 * conexion a la base de datos
 * @method connect permtie establece una coneion cliente a la base de datos
 */
MongoClient.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => {
  const db = client.db(dbName);
  return db.collection<userInterface>('users').updateOne({
    email: 'alu0101130408@ull.edu.es',
  }, {
    $set: {
      apellidos: 'Socas',
      edad: 20,
      password: '54321',
    },
  });
}).then((result) => {
  console.log(result.modifiedCount);
}).catch((error) => {
  console.log(error);
});
