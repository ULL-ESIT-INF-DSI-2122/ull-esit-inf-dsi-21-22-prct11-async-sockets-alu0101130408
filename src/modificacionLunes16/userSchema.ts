import {model, Schema} from 'mongoose';
import {userInterface} from '../modificacionLunes16/user';
import validator from 'validator';

/**
 * Esquema que define cómo se van a guardar los datos en la base de datos
 * @param nombre nombre del usuario (deberá comenzar por mayuscula y contener letras)
 * @param apellidos apellidos del usuario (deberá comenzar por mayuscula y contener letras)
 * @param edad edad del usuario (deberá ser un valor numerico)
 * @param email correo electronico del usuario (deberá estar en formato de correo electronico)
 * @param password contraseña del usuario (será string y puede contener cualquier valor)
 */
const userSchema = new Schema<userInterface>({
  nombre: {
    type: String,
    required: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('El nombre del usuario debe comenzar por mayusculas');
      } else if (!validator.isAlphanumeric(value)) {
        throw new Error('El nombre del usuario solo puede contender caracteres alfabéticos');
      }
    },
  },
  apellidos: {
    type: String,
    required: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('El apellido debe comenzar con una letra mayuscula');
      } else if (!validator.isAlphanumeric(value)) {
        throw new Error('los apellidos solo pueden contender letras del alfabeto');
      }
    },
  },
  edad: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: (value: string) => {
      if (!validator.isEmail(value)) {
        throw new Error('Necesitas que esté en formato de un correo electronico');
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
});

/**
 * Creamos un nuevo modelo a través del esquema especificado
 */
export const UserModel = model<userInterface>('User', userSchema);
