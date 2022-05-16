import {Document} from "mongoose";

/**
 * Interfaz que define el objeto que compone a usuario
 * @param nombre  es el nombre del usuario
 * @param apellidos es el apellido del usuario
 * @param email es el correo electronico del  usaurio
 * @param password es la contraseña de un usuario en el sistema
 */
export interface userInterface extends Document {
    nombre: string,
    apellidos: string,
    edad: number,
    email: string,
    password: string
}
