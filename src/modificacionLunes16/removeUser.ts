import {MongoClient} from 'mongodb';
import {userInterface} from './user';

/**
 * conexion a la base de datos
 * @method connect permtie establece una coneion cliente a la base de datos
 */
const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'dsi-assessment';

MongoClient.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => {
  const db = client.db(dbName);
  return db.collection<userInterface>('users').deleteOne({
    email: 'alu0101130408@ull.edu.es',
  });
}).then((result) => {
  console.log(result.deletedCount);
}).catch((error) => {
  console.log(error);
});
