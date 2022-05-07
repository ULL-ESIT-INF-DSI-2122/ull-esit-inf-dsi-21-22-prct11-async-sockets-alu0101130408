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

Introduccion

Como se ha mencionado se debera hacer uso de X módulos a demás de los módulos necesarios que ya se han visto. Los módulos utilizados en este proyecto por mi parte han sido:

* **Name1**: Para llevar a cabo la implementación de una base de datos en un fichero *.JSON* que almacene las notas del usuario.
* **Name2**: Para manejar la visualización con diferentes estilos, formatos y colores la ejecucion de nuestro código.

<br/><br/>

## 2. Desarrollo. <a name="id2"></a>

La estructura que se ha adoptado en este proyecto es la siguiente:

* **Carpeta/** : descripcion:
  * *archivo1.ts*: descripcion
  * *archivo2.ts*: descripcion

* **carpeta/**: descripcion.

A continuación vamos a explicar de forma más detallada estos directorios y ficheros que conforman el proyecto:

### 2.1. Clase Note. <a name="id21"></a>

La clase `1` es la encargada de descripcion.

Para especificar el color que puede tener una nota, definimos un objeto que solo puede contener un color de entre todos los que se pueden implementar.

```TypeScript
export type ColorNotes = 'Red' | 'Green' | 'Blue' | 'Yellow';
```
Para implementar la nota definimos la estructura básica que ha de tener,es decir, el titulo de la nota (*string*), el cuerpo de la nota (*string*) y el color de la nota (*ColorNote*).

Posteriormente se definen los métodos de acceso necesarios *Getters y Setter* para poder acceder o obtener los valores de estos atributos privados. Además de estos métodos tambien definimos por un lado **printTitle** que dependiendo del color de la nota que se introdujo a través de un string, muestra por consola a través de chark el titulo con el color que se introdujo. Por otro lado la función **printBody** realiza la misma idea pero con el cuerpo de la nota.

```TypeScript
code
```
Para realizar las pruebas unitarias desarrolladas en la metodologia TDD sobre esta clase `Note`, se define instancian los objetos de la clase nota y se comprueban los métodos de acceso *Getters y Setters*.

```TypeScript
test
```
<br/><br/>

### 2.2. Clase User. <a name="id22"></a>

```
code
```


```
test
```

<br/><br/>


### 2.3. Clase Event. <a name="id23"></a>

```
code
```


```
test
```

<br/><br/>

### 2.4. Fichero Client.ts. <a name="id24"></a>
```
code
```


```
test
```

<br/><br/>

### 2.5. Fichero Server.ts. <a name="id25"></a>
```
code
```


```
test
```

<br/><br/>

### 2.6. Fichero Type.ts. <a name="id26"></a>
```
code
```


```
test
```

<br/><br/>


## 3. Dificultades. <a name="id3"></a>

Dentro de las dificultades encontradas dentro de esta práctica, me gustaría resaltar:

* dificultad 1
```

```

* dificultad 2

## 4. Conclusión. <a name="id4"></a>

Los objetivos que se han propuesto y se han cumplido son:

* 1
* 2.
* 3
* 4


De esta forma se ha realizado todos estos objetivos a través del uso de clases, y de diversos modulos que aportan funcionalidad como lowdb, chark y yargs.

## 5. Referencias. <a name="id5"></a>
1. [Github](http://github.com)
2. [Repositorio de la Pŕactica](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101130408.git)
3. [Guión de la Pŕactica 10](https://ull-esit-inf-dsi-2122.github.io/prct10-async-fs-process/)
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
