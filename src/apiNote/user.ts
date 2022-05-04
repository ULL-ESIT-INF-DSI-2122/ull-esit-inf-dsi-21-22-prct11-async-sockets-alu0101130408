import {Note, ColorNotes} from './note';
import * as fs from 'fs';
import * as chalk from 'chalk';

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
  addNote(user: string, title: string, body: string, Color: ColorNotes): boolean {
    let finish: boolean = true;
    if (fs.existsSync(`db/${user}`) == false) {
      console.log('Creando el fichero del usuario');
      fs.mkdirSync(`db/${user}`, {recursive: true});
    }
    const nota = new Note(title, body, Color);
    if (fs.existsSync(`db/${user}/${title}.json`) == false) {
      fs.writeFileSync(`db/${user}/${title}.json`, nota.noteToJSON());
      console.log(chalk.green('Nota creada correctamente!'));
    } else {
      console.log(chalk.red('La Nota ya existe'));
      finish = false;
    }
    return finish;
  }

  /*
  modifyNote(title: string, bodyToModify: string): boolean {
    let finish: boolean = false;
    const check: [boolean, Note] = this.exist(title);
    if (check[0]) {
      const index = this.Notes.indexOf(check[1]);
      this.Notes[index].setBody(bodyToModify);
      finish = true;
      console.log(chalk.green.bold.inverse('Se ha modificado el cuerpo de la nota'));
    } else {
      console.log(chalk.red.bold.inverse('No existe la nota a modificar'));
    }
    return finish;
  }


  modifyNoteColor(title: string, colorToModify: ColorNotes): boolean {
    let finish: boolean = false;
    const check: [boolean, Note] = this.exist(title);
    if (check[0]) {
      const index = this.Notes.indexOf(check[1]);
      this.Notes[index].setColor(colorToModify);
      finish = true;
      console.log(chalk.green.bold.inverse('Se ha modificado el color de la nota'));
    } else {
      console.log(chalk.red.bold.inverse('No existe la nota a modificar'));
    }
    return finish;
  }


  deleteNote(title: string): boolean {
    let finish: boolean = false;
    const check: [boolean, Note] = this.exist(title);
    if (check[0]) {
      const index = this.Notes.indexOf(check[1]);
      if (index > -1) {
        this.Notes.splice(index, 1);
        finish = true;
        console.log(chalk.green.bold.inverse(`Se ha eliminado la nota con titulo ${title}`));
      }
    } else {
      console.log(chalk.red.bold.inverse('Ha introducido mal el titulo o no existe la nota con ese titulo'));
    }
    return finish;
  }

  printTitles(): void {
    console.log(">> Notas de " + this.userName + ":");
    this.Notes.forEach((item) => {
      item.printTitle();
    });
  }

  printNotes(title : string): void {
    const check: [boolean, Note] = this.exist(title);
    if (check[0]) {
      console.log(`────────────────────────────────`);
      check[1].printTitle();
      check[1].printBody();
      console.log(`────────────────────────────────`);
    } else {
      console.log(chalk.red.bold.inverse('Ha introducido mal el titulo o no existe la nota con ese titulo'));
    }
  }
  */
}
