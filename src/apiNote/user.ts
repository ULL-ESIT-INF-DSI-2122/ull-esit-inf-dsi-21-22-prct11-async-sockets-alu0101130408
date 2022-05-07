import {Note, ColorNotes} from './note';
import * as fs from 'fs';
import * as chalk from 'chalk';

/**
 * Clase encargada de especificar a los usuarios y sus operaciones en el sistema.
 */
export class User {
  constructor() { }


  /**
   * Método encargado de añadir una nueva nueva nota al sistema
   * @param user Usuario que quiere añadir la nota
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
      console.log(chalk.default.green('Nota creada correctamente!'));
    } else {
      console.log(chalk.default.red('La Nota ya existe'));
      finish = false;
    }
    return finish;
  }

  /**
   * Método encargado de eliminar una nota del sistema
   * @param user usuario que desea eliminar una nota de su sistema
   * @param title titulo de la nota que quiere eliminar
   * @returns devuelve el flag que define si se realizo la operacion con o sin problemas.
   */
  deleteNote(user: string, title: string): boolean {
    let finish: boolean = true;
    if (fs.existsSync(`database/${user}/${title}.json`)== true) {
      fs.rmSync(`database/${user}/${title}.json`);
      console.log(chalk.default.green('Nota eliminada correctamente!'));
    } else {
      console.log(chalk.default.red('La nota no se ha podido eliminar'));
      finish = false;
    }
    return finish;
  }

  /**
   * Método encargado de modificar los valores de una nota del sistema
   * @param user usuario que desea modificar una de sus notas
   * @param title titulo de la nota que desea modificar
   * @param bodyToModify nuevo cuerpo que quiere sustituir
   * @param colorToModify nuevo color que se quiere sustituir
   * @returns devuelve un lag que analiza si hubo problemas o no con la operación
   */
  modifyNote(user: string, title: string, bodyToModify: string, colorToModify: string): boolean {
    let finish: boolean = true;
    if (fs.existsSync(`database/${user}/${title}.json`) == true) {
      const nota = new Note(title, bodyToModify, colorToModify as ColorNotes);
      if (fs.existsSync(`db/${user}/${title}.json`) == false) {
        fs.writeFileSync(`database/${user}/${title}.json`, nota.noteToJSON());
        console.log(chalk.default.green('Nota modificada correctamente!'));
      }
    } else {
      console.log(chalk.default.red('No existe la nota a modificar'));
      finish = false;
    }
    return finish;
  }
  /**
   * Método encargado de leer una nota dada por el usuario.
   * @param user usuario que quiere leer su nota
   * @param title titulo de la nota a leer
   * @returns devuelve el valor de la nota  y maneja el flag correspondiente de la operacion
   */
  readNote(user: string, title: string): Note | boolean {
    let finish: boolean = false;
    if (fs.existsSync(`database/${user}/${title}.json`) == true) {
      const info = fs.readFileSync(`database/${user}/${title}.json`);
      const notaFormatJson = JSON.parse(info.toString());
      const nota = new Note(notaFormatJson.title, notaFormatJson.body, notaFormatJson.color);
      return nota;
    } else {
      console.log(chalk.default.red(`La nota a leer no existe`));
      finish = true;
    }
    return finish;
  }

  /**
   * Método encargado de listar las notas de un usuario
   * @param user usuario que quiere listar todas sus notas
   * @returns devuelve la lista de las notas que contiene
   */
  listNoteUser(user: string): Note[] {
    const listNotes: Note[] = [];
    fs.readdirSync(`database/${user}`).forEach((nota) => {
      const content = fs.readFileSync(`database/${user}/${nota}`);
      const notaFormatJson = JSON.parse(content.toString());
      const notes = new Note(notaFormatJson.title, notaFormatJson.body, notaFormatJson.color);
      listNotes.push(notes);
    });
    return listNotes;
  }
}
