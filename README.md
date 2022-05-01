# Title prct10

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-DanyVitale/actions/workflows/test.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-DanyVitale/actions/workflows/test.js.yml)
[![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-DanyVitale/actions/workflows/coveralls.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-DanyVitale/actions/workflows/coveralls.yml)
[![Sonar-Cloud](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-DanyVitale/actions/workflows/sonarcloud.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-DanyVitale/actions/workflows/sonarcloud.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct10-async-fs-process-DanyVitale&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct10-async-fs-process-DanyVitale)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct10-async-fs-process-DanyVitale&metric=coverage)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct10-async-fs-process-DanyVitale)

## **ÍNDICE**   
1. [INTRODUCCIÓN](#id1)
2. [DESARROLLO](#id2)  
  2.1 [EJERCICIO 1](#id3)  
  2.2 [EJERCICIO 2](#id4)  
  2.3 [EJERCICIO 3](#id5)  
3. [CONCLUSIONES](#id6)

## **INTRODUCCIÓN**<a name="id1"></a>

## **DESARROLLO**<a name="id2"></a>

### **EJERCICIO 1**<a name="id3"></a>



```typescript
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```

Dado el programa se realizará una traza de ejecución mostrando, paso a paso, el contenido de la pila de llamadas, el registro de eventos de la API y la cola de manejadores, además de lo que se muestra por la consola. 

Paso inicial: se inicia el programa con el nombre del fichero que se quiere observar.
- Pila de llamadas: '[]'
- Registro de eventos de la API: '[]'
- Cola de manejadores: '[]'
- Consola: '[]'

Paso 1:
- Pila de llamadas: '[]'
- Registro de eventos de la API: '[]'
- Cola de manejadores: '[]'
- Consola: '[]'

Paso 2: se llama a la función 'access' con los parámetros 'filename' y 'constants.F_OK'
- Pila de llamadas: '[access, main]'
- Registro de eventos de la API: '[]'
- Cola de manejadores: '[]'
- Consola: '[]'

Paso 3: sale access de la pila de llamadas y entra en la cola de manejadores
- Pila de llamadas: '[main]'
- Registro de eventos de la API: '[callback of access]'
- Cola de manejadores: '[]'
- Consola: '[]'

Paso 4: gracias a la ausencia de errores, se llama a la función 'constants.F_OK'
- Pila de llamadas: '[main]'
- Registro de eventos de la API: '[]'
- Cola de manejadores: '[access]'
- Consola: '[]'

Paso 5: entra callback de access y sale el main de la pila de llamadas
- Pila de llamadas: '[callback of access]'
- Registro de eventos de la API: '[]'
- Cola de manejadores: '[]'
- Consola: '[]'

Paso 6: gracias a la ausencia de errores, se llama a la función 'constants.F_OK' y se muestra por la consola que el fichero existe y se está observando
- Pila de llamadas: '[watcher.on, callback of access x 2]'
- Registro de eventos de la API: '[]'
- Cola de manejadores: '[]'
- Consola: '['Starting to watch file helloworld.txt']'

Paso 7: se muestra por la consola que el fichero ya no está observado
- Pila de llamadas: '[]'
- Registro de eventos de la API: '[]'
- Cola de manejadores: '[]'
- Consola: '['File helloworld.txt is no longer watched']'

Paso 8: se llama a la función 'watcher.on' con los parámetros 'change' y '() => {}' y se muestra por la consola que el fichero se ha modificado
- Pila de llamadas: '[watcher.on]'
- Registro de eventos de la API: '[]'
- Cola de manejadores: '[]'
- Consola: '[File helloworld.txt has been modified somehow]'

Una vez hecho lo anterior, se procede con la resolución de algunas preguntas:
- ¿Qué hace la función ```access```? La función ```access``` comprueba los permisos de acceso de un fichero dado. Los permisos de acceso existentes son:
  - ```constants.F_OK```: comprueba si el fichero existe
  - ```constants.R_OK```: comprueba si el fichero tiene permisos de lectura
  - ```constants.W_OK```: comprueba si el fichero tiene permisos de escritura
  - ```constants.X_OK```: comprueba si el fichero tiene permisos de ejecución
- ¿Qué hace la función ```constants```? La función ```constants``` contiene constantes que representan los permisos de acceso de un fichero previamente mencionados.

### **EJERCICIO 2**<a name="id4"></a>










### **EJERCICIO 2**<a name="id4"></a>

### **EJERCICIO 3**<a name="id5"></a>

## CONCLUSIONES<a name="id6"></a>