
/**
 * Objeto que define los colores que puede tomar una nota.
 */
export type ColorNotes = 'Red' | 'Green' | 'Blue' | 'Yellow';

/**
 * Clase encargada de definir la estructura de una nota de un usuario en el sistema.
 */
export class Note {
  /**
   * Constructor de la clase que define una nota (Note).
   * @param title Título de la nota
   * @param body Cuerpo que contiene la información de la Nota
   * @param color color de la nota que puede ser una de las opciones especificadas en  "ColorNotes"
   */
  constructor(private title: string, private body: string, private color: ColorNotes) {
    this.title = title;
    this.body = body;
    this.color = color;
  }

  /**
   * Método que obtiene el título de una nota
   * @returns devuelve el título de una nota
   */
  geTitle(): string {
    return this.title;
  }

  /**
  * Método que obtiene la informacion del cuerpo de una nota
  * @returns devuelve la información del cuerpo de una nota
  */
  getBody(): string {
    return this.body;
  }

  /**
  * Método que obtiene el color de una nota
  * @returns devuelve el color de una nota
  */
  getColor(): ColorNotes {
    return this.color;
  }


  /**
   * Método encargado de establecer un nuevo título a la nota
   * @param newTitle string que recibe la función que será el nuevo titulo que se quiere introducir
   */
  seTitle(newTitle: string): void {
    this.title = newTitle;
  }

  /**
   * Método encargado de establecer nueva información a la nota
   * @param newBody información que se quiere añadir en el cuerpo de la nota.
   */
  setBody(newBody: string): void {
    this.body = newBody;
  }

  /**
   * Método encargado de establecer un nuevo color a la nota
   * @param newColor nuevo color que se debe establecer en la nota y que debe estar en los colores posibles.
   */
  setColor(newColor: ColorNotes): void {
    this.color = newColor;
  }
  /**
   * Método que transforma a formato JSON una nota
   * @returns devuelve una nota en formato JSON.
   */
  noteToJSON():string {
    return '{\n\"title\": \"' + this.title + '\",\n\"body\": \"'+ this.body +
    '\",\n\"color\": \"' + this.color + '\"\n}';
  }
};

