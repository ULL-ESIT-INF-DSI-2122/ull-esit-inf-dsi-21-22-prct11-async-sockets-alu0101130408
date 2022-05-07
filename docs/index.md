# Práctica 11 - Cliente y servidor para una aplicación de procesamiento de notas de texto.
# Desarrollo de Sistemas Informáticos
# Universidad de la Laguna

### Autor:  
  * Joel Francisco Escobar Socas - alu0101130408@ull.edu.es


### Índice:

1. [Introducción y objetivos.](#id1)

2. [Desarrollo.](#id2)
      
  2.1. [Clase Note.](#id21)

  2.2. [Clase User.](#id22)

  2.3. [Clase Event](#id23)
  
  2.4. [Fichero Client.ts .](#id24)

  2.5. [Fichero Server.ts](#id25)
  
  2.6. [Fichero type.ts](#id26)

3. [Dificultades.](#id3)

4. [Conclusión.](#id4)

5. [Referencias.](#id5)

<br/><br/>

## 1. Introducción y objetivos. <a name="id1"></a>

El objetivo de esta práctica es realizar un cliente y servidor que permita manejar y controlar las diferentes peticiones de la práctica 9 encargada de realizar una aplicación de procesamiento de notas de texto, es decir, añadir, eliminar, modificar, leer y listar. Para realizar esto debemos apoyarnos en el módulo `net` de Node.js que nos proporciona los Sockets.

Como se ha mencionado se debera hacer uso del módulo net para  a demás de los módulos necesarios que ya se han visto. Los módulos utilizados en este proyecto por mi parte han sido:

* **Net**: Para llevar a cabo la conexión cliente-servidor y el manejo de datos por parte del mismo.
* **Yargs**: Para obtener por linea de comando las diferentes acciones que se podrán realizar. Añadir, modificar, eliminar, listar y leer.
* **Chalk**: Para manejar la visualización con diferentes estilos, formatos y colores la ejecucion de nuestro código.

<br/><br/>

## 2. Desarrollo. <a name="id2"></a>

La estructura que se ha adoptado en este proyecto es la siguiente:

* **apiNote/** : Recoge toda la funcionalidad encargada de definir la forma de una nota y las operaciones de un usuario.
  * *note.ts*: Implementa la estructura de una nota en el sistema, es decir, titulo, cuerpo y color.
  * *user.ts*: Implementa para un usuario dado las opeeraciones que puede realizar, añadir, modificar, eliminar, leer y listar.

* **client/**: Carpeta que recoge la manipulacion de mensajes y la implementacion del cliente.
  * **client.ts**: implementa la conexion del cliente y como se procesa las peticiones.
  * **event.ts**: implementa el manejo de los mensajes fraccionados.

* **server/**: Carpeta que implementa el servidor.
  * **server.ts**: implementa el servidor y el manejo de las peticiones al mismo.

* **type.ts**: Fichero que implementa las peticiones y respuestas en la aplicación.

A continuación vamos a explicar de forma más detallada estos directorios y ficheros que conforman el proyecto:

### 2.1. Clase Note. <a name="id21"></a>

La clase `Note` es la encargada de descripcion.

Para especificar el color que puede tener una nota, definimos un objeto que solo puede contener un color de entre todos los que se pueden implementar.

```TypeScript
export type ColorNotes = 'Red' | 'Green' | 'Blue' | 'Yellow';
```
Para implementar la nota definimos la estructura básica que ha de tener,es decir, el titulo de la nota (*string*), el cuerpo de la nota (*string*) y el color de la nota (*ColorNote*).

Posteriormente se definen los métodos de acceso necesarios *Getters y Setter* para poder acceder o obtener los valores de estos atributos privados. Y un método denominado `noteToJsoN` que transforma una nota a un objeto en formato JSON para poder manejar la información en los diversos formatos necesarios para manejar las peticiones.

```TypeScript

export type ColorNotes = 'Red' | 'Green' | 'Blue' | 'Yellow';

export class Note {

  constructor(private title: string, private body: string, private color: ColorNotes) {
    this.title = title;
    this.body = body;
    this.color = color;
  }

  geTitle(): string {
    return this.title;
  }

  getBody(): string {
    return this.body;
  }

  getColor(): ColorNotes {
    return this.color;
  }

  seTitle(newTitle: string): void {
    this.title = newTitle;
  }

  setBody(newBody: string): void {
    this.body = newBody;
  }

  setColor(newColor: ColorNotes): void {
    this.color = newColor;
  }

  noteToJSON():string {
    return '{\n\"title\": \"' + this.title + '\",\n\"body\": \"'+ this.body +
    '\",\n\"color\": \"' + this.color + '\"\n}';
  }
};


```
Para realizar las pruebas unitarias desarrolladas en la metodologia TDD sobre esta clase `Note`, se define instancian los objetos de la clase nota y se comprueban los métodos de acceso *Getters y Setters*.

```TypeScript
import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/apiNote/note';

const firstNote: Note = new Note('Primera Nota', 'Esta es la primera nota', 'Red');
const secondNote: Note = new Note('Segunda Nota', 'Esta es la segunda nota', 'Yellow');
const thirdNote: Note = new Note('Tercera Nota', 'Esta es la tercera nota', 'Green');
const fourthNote: Note = new Note('Cuarta Nota', 'Esta es la cuarta nota', 'Blue');

describe('Pruebas Unitarias de la Clase Note', ()=> {
  it('Prueba de instancia de la clase Note', () =>{
    expect(firstNote).to.exist;
    expect(firstNote).not.null;
    expect(secondNote).to.exist;
    expect(secondNote).not.null;
    expect(thirdNote).to.exist;
    expect(thirdNote).not.null;
    expect(fourthNote).to.exist;
    expect(fourthNote).not.null;
  });
  it('Prueba de metodos de acceso "Getters" de la clase Note', () =>{
    expect(firstNote.geTitle()).to.be.eql('Primera Nota');
    expect(secondNote.geTitle()).to.be.eql('Segunda Nota');
    expect(thirdNote.geTitle()).to.be.eql('Tercera Nota');
    expect(fourthNote.geTitle()).to.be.eql('Cuarta Nota');

    expect(firstNote.getBody()).to.be.eql('Esta es la primera nota');
    expect(secondNote.getBody()).to.be.eql('Esta es la segunda nota');
    expect(thirdNote.getBody()).to.be.eql('Esta es la tercera nota');
    expect(fourthNote.getBody()).to.be.eql('Esta es la cuarta nota');

    expect(firstNote.getColor()).to.be.eql('Red');
    expect(secondNote.getColor()).to.be.eql('Yellow');
    expect(thirdNote.getColor()).to.be.eql('Green');
    expect(fourthNote.getColor()).to.be.eql('Blue');
  });

  it('Prueba de metodos de acceso "Setters" de la clase Note', () =>{
    firstNote.seTitle('Nota Actualizada');
    expect(firstNote.geTitle()).to.be.eql('Nota Actualizada');

    secondNote.setBody('Se ha actualizado el valor de la segunda nota');
    expect(secondNote.getBody()).to.be.eql('Se ha actualizado el valor de la segunda nota');

    fourthNote.setColor('Yellow');
    expect(fourthNote.getColor()).to.be.eql('Yellow');
  });
});

```
<br/><br/>

### 2.2. Clase User. <a name="id22"></a>

Se ha modificado la clase `User` puesto que antes utilizabamos el módulo lowdb para realizar la gestion de la base de datos. Ahora para realizar este funcionamiento he utilizado los módulos de Node.JS de `fs` y `child_process` para almacenar en directorios y realizar el manejo de la base de datos.
Esta clase es la encargada de especificar las operaciones que pueden hacer los usuarios en la base de datos, estas operaciones son:

Por un lado, añadir una nueva nota al sistema, esta operacion la realizamos con la funcion `addNote` de la clase User. que recibe el usuario, el titulo, cuerpo y color de la nota. este metodo devolvera un flag, *finish* que comprueba si se ha insertado la nota o no (true o false respectivamente). COmprobamos que exista el usuario en la base de datos a través de **fs.existsSync** en caso de que no exista entonces se crea el fichero del usuario a través de **fs.mkdirSync**, en caso de que exista el usuario en el sistema, simplemente creamos una nueva nota con el titulo, el cuerpo y el color que se ha pasado y comprobamos despues que esta nota no exista en caso de no existir pues escribimos esta nota en formato JSON y en caso de que exista devolvemos el mensaje de error y colocamos a el flag como error, es decir, a false.

Para el caso de querer eliminar una nota (`deleteNote`), operamos de la misma forma que en caso de querer añadir, pero esa¡ta vez tras la comprobamos en caso de que exista el fichero entonces hacemos uso de `fs.rmSync` que elimina un fichero y comprobamos que se ha eliminado. En caso afirmativo devolvemos true en el flag y en caso negativo, false.

Para modificar una nota en el método `modifyNote` comprobamos que exista la nota en la base de datos y creamos una nueva nota que escribimos en la base de datos en formato JSON.

Para leer una nota en la funcion `readNote`, como se ha hecho hasta ahora comprobamos que la nota introducida exista, en caso afirmativo, almacenamos en una variable el contenido de la nota que leemos a través de `fs.readFileSync`, luego lo cambiamos a formato JSON y creamos una nueva nota con los argumentos que acabamos de obtener y devolvemos la nota en el metodo en caso de que surja algún problema, cambiamos el flag a false y lo devolvemos en la funcion indicando que ha sucedido algun error.

Para listar todas las notas de un usuario creamos el método `listNoteUser` el cual devuelve un array de nota. Para buscarlo, comprobamos que existe el directorio del usuario con todas sus notas, posteriormente recorremos todas las carpetas del usuario y sacamos su contenido como se hizo en el caso de leer posteriormente lo colocamos en el formato adecuado, creamos el objeto nota y lo introducimos en la lista de notas y devolvemos esta lista. ç


```TypeScript
import {Note, ColorNotes} from './note';
import * as fs from 'fs';
import * as chalk from 'chalk';

export class User {

  constructor() { }

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

```
Para la realizacion de los test he creado un usuario denominado `user1` y he probado a utilizar los diferentes métodos y hacer que comprueben en caso de que no existan notas o que se hayan eliminado si se puede operar con esos valores, poniendo a prueba el código desarrollado.

```TypeScript
import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/apiNote/note';
import {User} from '../src//apiNote/user';
import * as fs from 'fs';

describe('Test De instancia de User', () => {
  const user1 = new User();
  it('Test que comprueba si se puede añadir una nueva nota', () => {
    user1.addNote('Test', 'TDD', 'Esta es la prueba unitaria de un test', 'Blue');
    expect(fs.existsSync('database/Test/TDD.json')).true;
  });

  it('Comprobacion de fallo si la nota ya existe', () => {
    expect(user1.addNote('Test', 'TDD', 'Esta es la prueba unitaria de un test', 'Blue')).to.be.false;
  });

  it('Test que comprueba si se puede modificar una nota', () => {
    user1.modifyNote('Test', 'TDD', 'Se ha modificado el contenido', 'Yellow');
    expect(fs.existsSync('database/Test/TDD.json')).true;
    const information = fs.readFileSync('database/Test/TDD.json');
    expect(information.toString()).to.be.eql('{\n\"title\": \"TDD' + '\",\n\"body\": \"Se ha modificado el contenido'+ '\",\n\"color\": \"Yellow' + '\"\n}');
  });

  it('Test que comprueba si se puede listar las notas de un usuario', () => {
    user1.addNote('Test', 'TDD_2', 'Esta es una nota de para probar que se lista', 'Red');

    const nota1 = new Note('TDD', 'Se ha modificado el contenido', 'Yellow');
    const nota2 = new Note('TDD_2', 'Esta es una nota de para probar que se lista', 'Red');
    expect(user1.listNoteUser('Test')).to.be.eql([nota1, nota2]);
  });

  it('Test que comprueba si se puede leer una nota en el sistema', () => {
    const nota1 = new Note('TDD', 'Se ha modificado el contenido', 'Yellow');
    expect(user1.readNote('Test', 'TDD')).to.be.eql(nota1);
  });

  it('Test que comprueba si se puede eliminar una nota del sistema', () => {
    user1.deleteNote('Test', 'TDD');
    user1.deleteNote('Test', 'TDD_2');

    expect(fs.existsSync('database/Test/TDD.json')).false;
    expect(fs.existsSync('db/Test/TDD_2.json')).false;
  });

  it('Test que comprueba el error al modificar una nota no existente', () => {
    expect(user1.modifyNote('Test', 'TDD', 'Esta es una nota de prueba modificada', 'Blue')).to.be.false;
  });

  it('Test que comprueba el error al leer una nota que no existe', () => {
    expect(user1.readNote('Test', 'TDD')).to.be.true;
  });

  it('Test que comprueba si da error al eliminar una nota no existente', () => {
    expect(user1.deleteNote('Test', 'TDD')).to.be.false;
  });
});

```

<br/><br/>


### 2.3. Clase Event. <a name="id23"></a>

Esta clase `MessageEventEmmitterClient` Esta clase obtiene como parámetro la conexión que hemos establecido previamente y hereda de EventEmitter. La funcionalidad de esta es recoger todos los trozos de mensaje que se envien al servidor hasta que encontremos el carácter de parada que será \n . Esos trozos son los dataChunk, que se van agrupando en wholeData.

Una vez encontrado ese caracter de salto de línea emitimos un evento que, en este caso hemos denominado message. Este evento emitido será manejado posteriormente en el fichero note.ts. Principalmente el funcionamiento de esta clase es que dado el caso hipotetico de que se envie un mensaje fraccionado, es decir, por partes debido por ejemplo, a que ha habido un error en la conexión entonces se puede obtener los trozos perdido y formar el mensaje completo. 

```TypeScript

import {EventEmitter} from 'events';

export class MessageEventEmitterClient extends EventEmitter {
  constructor(connection: EventEmitter) {
    super();

    let wholeData = '';
    connection.on('data', (dataChunk) => {
      wholeData += dataChunk;

      let messageLimit = wholeData.indexOf('\n');
      while (messageLimit !== -1) {
        const message = wholeData.substring(0, messageLimit);
        wholeData = wholeData.substring(messageLimit + 1);
        this.emit('message', JSON.parse(message));
        messageLimit = wholeData.indexOf('\n');
      }
    });
  }
}

```
Para probar esta clase instanciamos un objeto encargado de la conexión y testeamos que se produzca una petición de tipo `add` en caso de que ocurra esperamos que success de true y que no haya ocurrido ningun error y que al emitir el mensaje nos de por partes este mismo mensaje.

```TypeScript
import 'mocha';
import {expect} from 'chai';
import {EventEmitter} from 'events';
import {MessageEventEmitterClient} from '../src/client/event';

describe('MessageEventEmitterClient', () => {
  it('Emision de un mensaje cliente', (done) => {
    const socket = new EventEmitter();
    const client = new MessageEventEmitterClient(socket);

    client.on('message', (message) => {
      expect(message).to.be.eql({'type': 'add', 'success': true});
      done();
    });

    socket.emit('data', '{"type": "add"');
    socket.emit('data', ', "success": true}');
    socket.emit('data', '\n');
  });
});

```

<br/><br/>

### 2.4. Fichero Client.ts. <a name="id24"></a>

Para definir el cliente de la aplicación, lo primero es establecer una conexión con el servidor de la API en el puerto **60300** con el método connect de `net`. De esta forma en client se ha almacenado el socket encargado de la comunicación.

Luego con el módulo `yargs` definimos los comandos necesarios para realizar acciones en nuestra aplicación. Estos comando son los mismo que en la práctica 9 y tal y como hemos mencionado anteriormente estos serán añadir, eliminar, modificar, leer y listar notas en el sistema. dentro de estos comandos **yargs** tras analizar previamente que el valor introducido es string, es decir lo que se espera, entonces creamos un objeto JSON que recoge el tipo de peticion y dentro especificamos la información de la peticion que será enviada al servidor. De forma obligatoria tenemos que especificar el tipo de peticion y el usuario que la realiza. Una vez todo esto ha sido definido enviamos a través del comando `write` la peticion, sin embargo, antes debemos cambiar su formato a estring para esto uso el método `stringify` y con el identificador `\n` especificamos que el mensaje de ha terminado, terminando por realizar la parte de petición del patrón `petición-respuesta`. 

Tras haber enviado esta petición se debe esperar a que el servidor la procese y devuelva una respuesta. Esta respuesta se manejará con la clase `MessageEventEmitterClient` que comentamos con anterioridad. Una vez obtenida la respuesta en el evento `message` analizamos el tipo de respuesta devuelto a través de un swtich-case, gracias al atributo *type* de message. Dependiendo del tipo de respuesta entonces mostramos si se ha podido realizar la gestion de las notas o para cada tipo de mensaje leemos la nota o no.

```TypeScript
import * as yargs from 'yargs';
import * as chalk from 'chalk';
import {RequestType} from '../type';
import {connect} from 'net';
import {MessageEventEmitterClient} from './event';

const client = connect({port: 60300});
const clientMSEC = new MessageEventEmitterClient(client);

clientMSEC.on('message', (message)=>{
  switch (message.type) {
    case 'add':
      if (message.success) {
        console.log(chalk.default.green('Nota añadida'));
      } else {
        console.log(chalk.default.red('No se pudo añadir la nota'));
      }
      break;
    case 'delete':
      if (message.success) {
        console.log(chalk.default.green('Nota eliminada'));
      } else {
        console.log(chalk.default.red('No se puedo eliminar la nota'));
      }
      break;
    case 'modify':
      if (message.success) {
        console.log(chalk.default.green('Nota modificada'));
      } else {
        console.log(chalk.default.red('No se puedo modificar la nota'));
      }
      break;
    case 'read':
      if (message.success) {
        const nota = message.notes[0];
        const noteObject = JSON.parse(nota);

        switch (noteObject.color) {
          case 'Red':
            console.log(chalk.default.red(`title: ` + noteObject.title));
            console.log(chalk.default.red(`body: ` + noteObject.body));
            break;
          case 'Blue':
            console.log(chalk.default.blue(`title: ` + noteObject.title));
            console.log(chalk.default.blue(`body: ` + noteObject.body));
            break;
          case 'Green':
            console.log(chalk.default.green(`title: ` + noteObject.title));
            console.log(chalk.default.green(`body: ` + noteObject.body));
            break;
          case 'Yellow':
            console.log(chalk.default.yellow(`title: ` + noteObject.title));
            console.log(chalk.default.yellow(`body: ` + noteObject.body));
            break;
          default:
            console.log(` No es un color válido en el sistema`);
            break;
        }
      } else {
        console.log(chalk.default.red('No se pudo leer la nota'));
      }
      break;
    case 'list':
      if (message.success) {
        const info: string[] = message.notes;

        info.forEach( (item) => {
          const noteObject = JSON.parse(item);
          switch (noteObject.color) {
            case 'Red':
              console.log(chalk.default.red(noteObject.title));
              break;
            case 'Blue':
              console.log(chalk.default.blue(noteObject.title));
              break;
            case 'Green':
              console.log(chalk.default.green(noteObject.title));
              break;
            case 'Yellow':
              console.log(chalk.default.yellow(noteObject.title));

              break;
            default:
              console.log(` No es un color válido en el sistema`);
              break;
          }
        });
      } else {
        console.log(chalk.default.red('No se pudo listar las notas'));
      }
      break;
    default:
      console.log(chalk.default.red('No es una opcion soportada'));
      break;
  }
});

yargs.command({
  command: 'add',
  describe: 'Añadir una nueva nota al sistema',
  builder: {
    user: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Cuerpo',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color',
      demandOption: true,
      type: 'string',
    },

  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      const inputData: RequestType = {
        type: 'add',
        user: argv.user,
        title: argv.title,
        body: argv.body,
        color: argv.color,
      };
      client.write(`${JSON.stringify(inputData)}\n`);
    } else {
      console.log(chalk.default.red(`Error: Los argumentos no son válidos`));
    }
  },
});

yargs.command({
  command: 'delete',
  describe: 'Elimina una nota del sistema',
  builder: {
    user: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      const inputData: RequestType = {
        type: 'delete',
        user: argv.user,
        title: argv.title,
      };
      client.write(`${JSON.stringify(inputData)}\n`);
    } else {
      console.log(chalk.default.red(`Error: Los argumentos no son válidos`));
    }
  },
});

yargs.command({
  command: 'modify',
  describe: 'Modificar del cuerpo de nota del sistema',
  builder: {
    user: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Cuerpo',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      const inputData: RequestType = {
        type: 'modify',
        user: argv.user,
        title: argv.title,
        body: argv.body,
        color: argv.color,
      };
      client.write(`${JSON.stringify(inputData)}\n`);
    } else {
      console.log(chalk.default.red(`Error: Los argumentos no son válidos`));
    }
  },
});


yargs.command({
  command: 'read',
  describe: 'Lee una nota del sistema',
  builder: {
    user: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      const inputData: RequestType = {
        type: 'read',
        user: argv.user,
        title: argv.title,
      };
      client.write(`${JSON.stringify(inputData)}\n`);
    } else {
      console.log(chalk.default.red(`Error: Los argumentos no son válidos`));
    }
  },
});


yargs.command({
  command: 'list',
  describe: 'Lista las notas del usuario',
  builder: {
    user: {
      describe: 'Usuario',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      const inputData: RequestType = {
        type: 'list',
        user: argv.user,
      };
      console.log(chalk.default.grey(`Notas del usuario: ${argv.user}`));
      client.write(`${JSON.stringify(inputData)}\n`);
    } else {
      console.log(chalk.default.red(`Error: Los argumentos no son válidos`));
    }
  },
});


yargs.parse();

```

<br/><br/>

### 2.5. Fichero Server.ts. <a name="id25"></a>

Para implementación del servidor en el fichero `server.ts`. Primero analizamos si se ha establecido una conexión, en caso de que exista una conexión  y se haya conectado algún cliente tratamos de recoger los fragmentos de mensajes enviados por el cliente. Una vez obtenemos el mensaje del cliente enviamos un evento `request` junto a la información en formato JSON.

A continuación, atendemos el evento Request analizandolo con un `switch-case` en su propiedad `type` que recoge el objeto JSON y dependiendo de lo que se quera hacer realizamos la accion oportuna. Si por ejemplo, se quisiera añadir una nueva nota por parte del cliente en el objeto JSON se deberia de recibir el titulo, cuerpo y color de la nota. Por lo que llamamos a la función `addNote` y le pasamos estos parámetros. En caso de que se haya añadido status contendra un true y en caso negativo un false, en resumen, dirá si se ha realizado el comando sin errores o por otro lado ha surgido algún error.

 Creamos un objeto de tipo `ResponseType` que representa la estructura de que será enviada como respuesta desde parte del servidor. Y dentro de este, establecemos como valores el tipo de accion realizada y el estado de su realización. En caso de que la función devuelva una nota o un listado, tenemos también un atributo formado por un array de strings destinado para almacenarlos. 

 Una vez este tipo de dato ha sido creado lo enviamos al cliente a través del método `write` y al igual que se hizo en el cliente se pasa esta peticion a string a través de `stringfy` seguido de un `\n`. 

 Si al enviar la petición no ha habido ningún error cerramos la conexión del cliente con el servidor. Si el cliente quiere hacer una nueva petición deberá crear una nueva conexión. Con esto ya cumpliriamos la parte de respuesta del patrón petición-respuesta.

```TypeScript
import * as net from 'net';
import {ResponseType} from '../type';
import {User} from '../apiNote/user';
import chalk from "chalk";

const noteOption = new User();

net.createServer({allowHalfOpen: true}, (connection) => {
  console.log(chalk.bgGreen.white('A client has connected.'));
  let wholeData = '';
  connection.on('data', (dataChunk) => {
    wholeData += dataChunk;

    let messageLimit = wholeData.indexOf("\n");
    while (messageLimit !== -1) {
      const message = wholeData.substring(0, messageLimit);
      wholeData = wholeData.substring(messageLimit + 1);
      connection.emit('request', JSON.parse(message));
      messageLimit = wholeData.indexOf('\n');
    }
  });

  connection.on('request', (message) => {
    console.log(chalk.bgWhite.magenta.bold('Peticion realizada >> ' + message.type));
    switch (message.type) {
      case 'add': {
        const status = noteOption.addNote(message.user, message.title, message.body, message.color);
        const responseData: ResponseType = {
          type: 'add',
          success: status,
        };
        connection.write(`${JSON.stringify(responseData)}\n`, (err) => {
          if (err) {
            console.error(err);
          } else {
            connection.end();
          }
        });
      }
        break;
      case 'delete': {
        const status = noteOption.deleteNote(message.user, message.title);
        const responseData: ResponseType = {
          type: 'delete',
          success: status,
        };
        connection.write(`${JSON.stringify(responseData)}\n`, (err) => {
          if (err) {
            console.error(err);
          } else {
            connection.end();
          }
        });
      }
        break;
      case 'modify': {
        const status = noteOption.modifyNote(message.user, message.title, message.body, message.color);
        const responseData: ResponseType = {
          type: 'modify',
          success: status,
        };
        connection.write(`${JSON.stringify(responseData)}\n`, (err) => {
          if (err) {
            console.error(err);
          } else {
            connection.end();
          }
        });
      }
        break;
      case 'read': {
        const status = noteOption.readNote(message.user, message.title);
        const responseData: ResponseType = {
          type: 'read',
          success: true,
        };
        if (typeof status === 'boolean') {
          responseData.success = false;
        } else {
          responseData.notes = [status.noteToJSON()];
        }
        connection.write(`${JSON.stringify(responseData)}\n`, (err) => {
          if (err) {
            console.error(err);
          } else {
            connection.end();
          }
        });
      }
        break;
      case 'list': {
        const salida = noteOption.listNoteUser(message.user);
        const salidaFormateada: string[]= [];
        salida.forEach((item) => {
          salidaFormateada.push(item.noteToJSON());
        });
        const responseData: ResponseType = {
          type: 'list',
          success: true,
          notes: salidaFormateada,
        };
        connection.write(`${JSON.stringify(responseData)}\n`, (err) => {
          if (err) {
            console.error(err);
          } else {
            connection.end();
          }
        });
      }
        break;
    }
  });

  connection.on('close', ()=>{
    console.log((chalk.bgGreen.black('Un cliente ha abandonado la sesión')));
  });
}).listen(60300, ()=>{
  console.log(chalk.bgGreen.black('Esperando un Cliente'));
});

```

<br/><br/>

### 2.6. Fichero Type.ts. <a name="id26"></a>

En este fichero nos encontramos con la definición de dos objetos que implementarán nuestras peticiones en la conexión de cliente-servidor. de esta forma, `RequestType` implementa el tipo de dato para las peticiones del cliente y especifica las operaciones posibles y especifica los parámetros necesarios y aquellos con (**?**) que dependiendo de la petición podrán ser obligatorios o no.  Y en `ResponseType` implementamos la estructura que tendrá una respuesta por parte del servidor.Básicamente devolverá de forma obligatoria el tipo de operacion realizada, un flag que se encargará de determinar si hubo exito en la operacion o no y un array de notas encargado de almacenar las posibles notas. Dependiendo del tipo de operaciones

```TypeScript

export type RequestType = {
  type: 'add' | 'modify' | 'delete' | 'read' | 'list';
  user: string;
  title?: string;
  body?: string;
  color?: string;
}

export type ResponseType = {
  type: 'add' | 'modify' | 'delete' | 'read' | 'list';
  success: boolean;
  notes?: string[];
}

```

<br/><br/>


## 3. Dificultades. <a name="id3"></a>

Dentro de las dificultades encontradas dentro de esta práctica, me gustaría resaltar:

* A la hora de visualizar con el color de la nota a través de chalk el color correspondiente, mi idea principal era utilizar el método **keyword** del modulo chalk el cual como primer argumento recibe el color y como segundo el texto, de esta forma podria haber realizado `Chalk.keyword(noteObjet.color)(noteObject.title)` y visualizar de esta forma como quiseramos.
```
TypeError: chalk.keyword is not a function
    at MessageEventEmitterClient.<anonymous> (/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101130408/dist/client/client.js:58:35)
    at MessageEventEmitterClient.emit (node:events:526:28)
    at Socket.<anonymous> (/home/usuario/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101130408/dist/client/event.js:15:22)
    at Socket.emit (node:events:526:28)
    at addChunk (node:internal/streams/readable:324:12)
    at readableAddChunk (node:internal/streams/readable:297:9)
    at Socket.Readable.push (node:internal/streams/readable:234:10)
    at TCP.onStreamRead (node:internal/stream_base_commons:190:23)

Node.js v17.5.0

```

Sin embargo, como se puede ver nos da un error, por ello como solucion implementé un switch analizando el color de la nota y visualizando en un color dado dependiendo de este el titulo y cuerpo, etc... 

* Por si, no he tenido más problemas relacionados con la implementacion puesto que a través de los apuntes de clase y de la teoría buscada se ha resuelto todas las especificaciones que nos solicitaban en las práticas.

<br/><br/>

## 4. Conclusión. <a name="id4"></a>

Los objetivos que se han propuesto y se han cumplido son:

* 1. La aplicación de notas deberá permitir que múltiples usuarios interactúen con ella
* 2. Una nota estará formada, como mínimo, por un título, un cuerpo y un color (rojo, verde, azul o amarillo).
* 3. Cada usuario tendrá su propia lista de notas, con la que podrá llevar a cabo las siguientes operaciones.
* 4. Permitira dar añadir, eliminar, modificar, listar, leer.
* 5. Todos los mensajes informativos se mostrarán con color verde, mientras que los mensajes de error se mostrarán con color rojo. A través de chalk.
* 6. El servidor es responsable de hacer persistente la lista de notas de cada usuario.
* 7. Un usuario solo puede interactuar con la aplicación de procesamiento de notas de texto a través de la línea de comandos del cliente. Los diferentes comandos, opciones de los mismos, así como manejadores asociados a cada uno de ellos deben gestionarse mediante el uso del paquete yargs.


De esta forma se ha realizado todos estos objetivos a través del uso de clases, y de diversos modulos que aportan funcionalidad como lowdb, chark y yargs.

> Nota: Me gustaría comentar que se ha optado por rediseñar la base de datos puesto que tal y como me comento el profesorado de la asignatura en la práctica 9. No tengo la estructura solicitada en la base de datos. Esto es que en la práctica 9 tenia un fichero con el nombre_del_usuario.json y dentro tenia objetos en formato JSON con las notas de los usuarios. Cuando realmente solicitaban que en la base de datos se encontrarán directorio con el nombre del usuario y dentro de esto diversos fichero que contienen las notas del mismo. Por lo que he decidido rediseñar este directorio `database` y manejarlo a través del módulo `fs (filesystrem)` que proporciona Node.JS.

<br/><br/>

## 5. Referencias. <a name="id5"></a>
1. [Github](http://github.com)
2. [Repositorio de la Pŕactica](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101130408.git)
3. [Guión de la Pŕactica 11](https://ull-esit-inf-dsi-2122.github.io/prct11-async-sockets/)
4. [Documentación GitHub Actions](https://docs.github.com/en/actions)
5. [Documentación Istanbul](https://istanbul.js.org/)
6. [Documentación Coveralls](https://coveralls.io/)
7. [Documentación de TypeDoc.](https://typedoc.org/)
8. [Documentación de Mocha.](https://mochajs.org/)
9. [Documentación de Chai.](https://www.chaijs.com/)
10. [Documentacion sobre el modulo LowDB](https://www.npmjs.com/package/lowdb)
11. [Documentacion sobre el modulo Yargs](https://www.npmjs.com/package/yargs)
12. [Documentacion sobre el modulo Chark](https://www.npmjs.com/package/chalk)
13. [Documentacion sobre el uso de filesystem de node.js](https://nodejs.org/dist/latest-v17.x/docs/api/fs.html#synchronous-api)
14. [Documentacion de child process](https://nodejs.org/api/child_process.html)
15. [Documentacion de la libreria Math](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
16. [Documentacion sobre el uso de fylesync](https://www.geeksforgeeks.org/node-js-fs-readdirsync-method/)
17. [Documentacion sobre como crear tablas en Markdown](https://limni.net/crear-tablas-markdown-tableflip/)
18. [APIs de CallBacks para interactuar con el sistema de ficheros](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#callback-api)
19. [APIs asincrona para crear procesos](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#asynchronous-process-creation)
20. [Funcion access de fs ](https://es.acervolima.com/node-js-metodo-fs-access/)
21. [Objeto constat](https://www.geeksforgeeks.org/node-js-fs-access-method/)
22. [Expresiones regulares en JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions)
23. [Pipe en Node.JS](https://guru99.es/node-js-streams-filestream-pipes/)
24. [Documentacion de Stream en Node.js](https://nodejs.org/api/stream.html)
25. [Documentacion de Callbacks](https://nodejs.org/dist/latest/docs/api/fs.html#fs_callback_api)
26. [Serielización y deserializacion en Node.JS](https://www.estradawebgroup.com/Post/Serializacion-y-deserializacion-JSON-con-C-/4232)
27. [chalk.keyword uso](https://stackoverflow.com/questions/58389081/typescript-error-when-dynamically-setting-color-for-chalk-package)
