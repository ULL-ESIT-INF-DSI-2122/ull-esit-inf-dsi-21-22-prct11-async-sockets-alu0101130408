// import {connect, model, Schema} from 'mongoose';
// import {userInterface} from '../modificacionLunes16/user';
// import validator from 'validator';
import {connectToDB} from '../modificacionLunes16/mongoose';
import {UserModel} from '../modificacionLunes16/userSchema';

/**
 * se conecta a la base de datos
 */
connectToDB();
/**
 * Se crea un usuario nuevo
 */
const newUser = new UserModel({
  nombre: 'Joel',
  apellidos: 'Escobar',
  edad: 23,
  email: 'alu010113000@ull.edu.es',
  password: '1234567',
});

/**
 * Se almacena en la base de datos
 * @method save permite guardar al usuario
 * @promise result permite controlar si ha sucedido algun error con la forma de guardar
 */
newUser.save().then((result) => {
  console.log(result);
}).catch((error)=> {
  console.log(error);
});
