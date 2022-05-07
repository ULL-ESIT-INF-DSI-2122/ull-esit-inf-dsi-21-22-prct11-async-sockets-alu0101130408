# Práctica 11:  Cliente y servidor para una aplicación de procesamiento de notas de texto
## Autor: Joel Francisco Escobar Socas
## Asignatura: Desarrollo de Sistemas Informáticos.
## Centro: Universidad de la Laguna.
### 2021/2022


## Introducción:

El objetivo de esta práctica es realizar un cliente y servidor que permita manejar y controlar las diferentes peticiones de la práctica 9 encargada de realizar una aplicación de procesamiento de notas de texto, es decir, añadir, eliminar, modificar, leer y listar. Para realizar esto debemos apoyarnos en el módulo `net` de Node.js que nos proporciona los Sockets.

Para ejecutar el código, tras ejecutar el comando tsc en la terminal, Se debe abrir dos terminales diferentes:

* Primero, en una terminal se debe ejecutar el servidor con el siguiente comando:
`node dist/server/server.js`

* Después en la segunda terminal (2da sesión), ejecutammos el cliente y como opcion por línea de comando la acción que queremos hacer en el sistema, por ejemplo si quisieramos añador una nota nueva:

`node dist/client/client.js add --user="Joel" --title="TituloNota" --body="este es el cuerpo" --color="Red"`


> Para acceder al informe de la práctica 11 piche [aquí]()

> Para acceder al informe a través de Github Pages, pinche [aquí]() o acceda a través del siguiente enlace: 

> Si desea acceder a la documentación de Typedoc puede acceder a través de la extensión Live Server ejecutando el siguiente.

> [Guión de la Práctica 11]() 


[![Tests](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101130408/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101130408/actions/workflows/node.js.yml)
<space><space>
[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101130408/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101130408?branch=main)
<space><space>
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101130408&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101130408)
<space><space>
---
ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101130408
ull-esit-inf-dsi-21-22-prct11-async-sockets-alu0101130408 created by GitHub Classroom

---
