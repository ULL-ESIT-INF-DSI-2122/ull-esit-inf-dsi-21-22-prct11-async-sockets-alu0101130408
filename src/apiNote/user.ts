import {Note, ColorNotes} from './note';
import * as fs from 'fs';
// import * as chalk from 'chalk';

/**
 * Clase encargada de especificar los usuarios y sus operaciones en el sistema.
 */
export class User {
  /**
   * Constructor de la clase encargado de definir un usuario en el sistema
   * @param userName Nombre del usuario del sistema
   * @param Notes Array de notas que inicialmente no tendrá ninguna
   * @param DataBase base de datos donde se obtendra los datos y se actualizaran
   */
  constructor() { }


  /**
   * Método encargado de añadir una nueva nueva nota al sistema
   * @param title titulo de la nota nueva
   * @param body contiene la informacion del cuerpo
   * @param Color color de la nota definida en modulo Chark
   * @returns devuelve un booleano que define true si se ha añadido o false si ha pasado algo mal.
   */
  addNote(user: string, title: string, body: string, Color: string): boolean {
    let finish: boolean = true;
    if (fs.existsSync(`database/${user}`) == false) {
      console.log('Creando el fichero del usuario');
      fs.mkdirSync(`database/${user}`, {recursive: true});
    }
    const nota = new Note(title, body, Color as ColorNotes);
    if (fs.existsSync(`database/${user}/${title}.json`) == false) {
      fs.writeFileSync(`database/${user}/${title}.json`, nota.noteToJSON());
      console.log('Nota creada correctamente!');
    } else {
      console.log('La Nota ya existe');
      finish = false;
    }
    return finish;
  }

  deleteNote(user: string, title: string): boolean {
    let finish: boolean = true;
    if (fs.existsSync(`database/${user}/${title}.json`)== true) {
      fs.rmSync(`database/${user}/${title}.json`);
      console.log('Nota eliminada correctamente!');
    } else {
      console.log('La nota no se ha podido eliminar');
      finish = false;
    }
    return finish;
  }

  modifyNote(user: string, title: string, bodyToModify: string, colorToModify: string): boolean {
    let finish: boolean = true;
    if (fs.existsSync(`database/${user}/${title}.json`) == true) {
      const nota = new Note(title, bodyToModify, colorToModify as ColorNotes);
      if (fs.existsSync(`db/${user}/${title}.json`) == false) {
        fs.writeFileSync(`database/${user}/${title}.json`, nota.noteToJSON());
        console.log('Nota creada correctamente!');
      }
    } else {
      console.log('No existe la nota a modificar');
      finish = false;
    }
    return finish;
  }

  readNote(user: string, title: string): Note | boolean {
    let finish: boolean = false;
    if (fs.existsSync(`database/${user}/${title}.json`) == true) {
      const info = fs.readFileSync(`database/${user}/${title}.json`);
      const notaFormatJson = JSON.parse(info.toString());
      const nota = new Note(notaFormatJson.title, notaFormatJson.body, notaFormatJson.color);
      return nota;
    } else {
      console.log(`La nota a leer no existe`);
      finish = true;
    }
    return finish;
  }
}
